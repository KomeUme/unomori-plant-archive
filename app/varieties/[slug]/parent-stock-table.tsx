'use client';

import { Fragment, useEffect, useMemo, useRef, useState, type PointerEvent } from 'react';
import {
  getCurrentAttachedOffsetCount,
  getCurrentBreedingReadyPlantCount,
  getCurrentHeldPlantCount,
  getCurrentRootedPlantCount,
  getLatestAnnualNewOffsetCount,
  getLatestAnnualSoldCount,
  getManagedPotCount,
  getManagementNumberGroup,
  getOffsetsPerBreedingPlant,
  type ParentStock,
} from '../../data';
import { siteHref } from '../../site-url';

type SortKey = 'id' | 'currentHeldPlantCount' | 'breedingReadyPlantCount' | 'offsetsPerBreedingPlant';
type SortDirection = 'asc' | 'desc';

const numberOrDash = (value: number | null) => value === null ? '—' : value;

const compare = (a: number | null, b: number | null, direction: SortDirection) => {
  if (a === null && b === null) return 0;
  if (a === null) return 1;
  if (b === null) return -1;
  return direction === 'asc' ? a - b : b - a;
};

const valueForSort = (stock: ParentStock, key: Exclude<SortKey, 'id'>) => {
  if (key === 'currentHeldPlantCount') return getCurrentHeldPlantCount(stock);
  if (key === 'breedingReadyPlantCount') return getCurrentBreedingReadyPlantCount(stock);
  return getOffsetsPerBreedingPlant(stock);
};

type ParentStockGroup = {
  primary: string | null;
  prefix: string | null;
  stocks: ParentStock[];
};

type TablePointerState = {
  pointerId: number | null;
  startX: number;
  startY: number;
  scrollLeft: number;
  startedAt: number;
  moved: boolean;
  stockId: string | null;
};

type ImagePanState = {
  pointerId: number | null;
  startX: number;
  startY: number;
  originX: number;
  originY: number;
};

const clickDurationLimit = 500;
const dragDistanceLimit = 8;

const sortOptions: Array<{ key: SortKey; label: string }> = [
  { key: 'id', label: '管理番号順' },
  { key: 'currentHeldPlantCount', label: '保有株数順' },
  { key: 'breedingReadyPlantCount', label: '繁殖可能株順' },
  { key: 'offsetsPerBreedingPlant', label: '1株あたり年間子株順' },
];

export function ParentStockTable({ stocks }: { stocks: ParentStock[] }) {
  const [sortKey, setSortKey] = useState<SortKey>('id');
  const [direction, setDirection] = useState<SortDirection>('asc');
  const [isDragging, setIsDragging] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [imageZoom, setImageZoom] = useState(1);
  const [imageOffset, setImageOffset] = useState({ x: 0, y: 0 });
  const [isImagePanning, setIsImagePanning] = useState(false);
  const tableWrapRef = useRef<HTMLDivElement>(null);
  const pointerStateRef = useRef<TablePointerState>({ pointerId: null, startX: 0, startY: 0, scrollLeft: 0, startedAt: 0, moved: false, stockId: null });
  const suppressRowClickRef = useRef(false);
  const imagePanRef = useRef<ImagePanState>({ pointerId: null, startX: 0, startY: 0, originX: 0, originY: 0 });

  const groupedStocks = useMemo(() => {
    const groupMap = new Map<string, ParentStockGroup>();
    stocks.forEach((stock) => {
      const { primary, prefix } = getManagementNumberGroup(stock.id);
      const key = `${primary}-${prefix}`;
      const group = groupMap.get(key) ?? { primary, prefix, stocks: [] };
      group.stocks.push(stock);
      groupMap.set(key, group);
    });

    const orderStocks = (a: ParentStock, b: ParentStock) => {
      if (sortKey === 'id') return direction === 'asc' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
      const result = compare(valueForSort(a, sortKey), valueForSort(b, sortKey), direction);
      return result || a.id.localeCompare(b.id);
    };

    if (sortKey !== 'id') return [{ primary: null, prefix: null, stocks: [...stocks].sort(orderStocks) }];

    return [...groupMap.values()]
      .sort((a, b) => {
        const aPriority = a.primary === 'U' ? 0 : 1;
        const bPriority = b.primary === 'U' ? 0 : 1;
        return aPriority - bPriority || (a.primary ?? '').localeCompare(b.primary ?? '') || (a.prefix ?? '').localeCompare(b.prefix ?? '');
      })
      .map((group) => ({ ...group, stocks: group.stocks.sort(orderStocks) }));
  }, [direction, sortKey, stocks]);

  const imageStocks = useMemo(() => groupedStocks
    .flatMap((group) => group.stocks)
    .filter((stock): stock is ParentStock & { image: string } => Boolean(stock.image)), [groupedStocks]);
  const selectedImageIndex = imageStocks.findIndex((stock) => stock.id === selectedImageId);
  const selectedImage = selectedImageIndex >= 0 ? imageStocks[selectedImageIndex] : null;

  const changeSort = (key: SortKey) => {
    if (sortKey === key) setDirection((value) => value === 'asc' ? 'desc' : 'asc');
    else {
      setSortKey(key);
      setDirection(key === 'id' ? 'asc' : 'desc');
    }
  };

  const buttonLabel = (key: SortKey, text: string) => `${text}${sortKey === key ? direction === 'asc' ? ' ↑' : ' ↓' : ''}`;
  const openDetail = (id: string) => { window.location.assign(siteHref(`/mothers/${id}`)); };
  const openImage = (stock: ParentStock) => {
    if (!stock.image) return;
    setImageZoom(1);
    setImageOffset({ x: 0, y: 0 });
    setSelectedImageId(stock.id);
  };
  const closeImage = () => setSelectedImageId(null);
  const showImageAt = (index: number) => {
    const nextImage = imageStocks[index];
    if (!nextImage) return;
    resetImageView();
    setSelectedImageId(nextImage.id);
  };
  const changeImageZoom = (amount: number) => setImageZoom((zoom) => {
    const nextZoom = Math.min(4, Math.max(1, Number((zoom + amount).toFixed(2))));
    if (nextZoom === 1) setImageOffset({ x: 0, y: 0 });
    return nextZoom;
  });
  const resetImageView = () => {
    setImageZoom(1);
    setImageOffset({ x: 0, y: 0 });
  };

  useEffect(() => {
    if (!selectedImage) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeImage();
      if (event.key === 'ArrowLeft') showImageAt(selectedImageIndex - 1);
      if (event.key === 'ArrowRight') showImageAt(selectedImageIndex + 1);
    };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', closeOnKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', closeOnKey);
    };
  }, [selectedImage, selectedImageIndex, imageStocks]);

  useEffect(() => {
    if (!selectedImage) return;

    const frame = window.requestAnimationFrame(() => {
      const row = document.querySelector<HTMLTableRowElement>(`tr[data-stock-id="${selectedImage.id}"]`);
      if (!row) return;
      const rowBounds = row.getBoundingClientRect();
      const rowCenter = rowBounds.top + rowBounds.height / 2;
      const upperLimit = window.innerHeight * .22;
      const lowerLimit = window.innerHeight * .78;
      if (rowCenter < upperLimit || rowCenter > lowerLimit) {
        window.scrollTo({ top: window.scrollY + rowCenter - window.innerHeight / 2, behavior: 'smooth' });
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [selectedImage?.id]);

  const startImagePan = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || imageZoom <= 1) return;
    imagePanRef.current = { pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, originX: imageOffset.x, originY: imageOffset.y };
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsImagePanning(true);
  };

  const moveImagePan = (event: PointerEvent<HTMLDivElement>) => {
    const panState = imagePanRef.current;
    if (panState.pointerId !== event.pointerId) return;
    setImageOffset({ x: panState.originX + event.clientX - panState.startX, y: panState.originY + event.clientY - panState.startY });
    event.preventDefault();
  };

  const finishImagePan = (event: PointerEvent<HTMLDivElement>) => {
    const panState = imagePanRef.current;
    if (panState.pointerId !== event.pointerId) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    imagePanRef.current = { pointerId: null, startX: 0, startY: 0, originX: 0, originY: 0 };
    setIsImagePanning(false);
  };

  const startTableDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    const tableWrap = tableWrapRef.current;
    if (!tableWrap || tableWrap.scrollWidth <= tableWrap.clientWidth) return;

    suppressRowClickRef.current = false;
    const stockId = (event.target as HTMLElement).closest<HTMLTableRowElement>('[data-stock-id]')?.dataset.stockId ?? null;
    pointerStateRef.current = { pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, scrollLeft: tableWrap.scrollLeft, startedAt: Date.now(), moved: false, stockId };
    tableWrap.setPointerCapture(event.pointerId);
  };

  const moveTableDrag = (event: PointerEvent<HTMLDivElement>) => {
    const pointerState = pointerStateRef.current;
    const tableWrap = tableWrapRef.current;
    if (!tableWrap || pointerState.pointerId !== event.pointerId) return;

    const horizontalDistance = event.clientX - pointerState.startX;
    const verticalDistance = event.clientY - pointerState.startY;
    if (Math.max(Math.abs(horizontalDistance), Math.abs(verticalDistance)) < dragDistanceLimit) return;

    pointerState.moved = true;
    if (Math.abs(horizontalDistance) >= Math.abs(verticalDistance)) {
      setIsDragging(true);
      tableWrap.scrollLeft = pointerState.scrollLeft - horizontalDistance;
      event.preventDefault();
    }
  };

  const finishTableDrag = (event: PointerEvent<HTMLDivElement>) => {
    const pointerState = pointerStateRef.current;
    if (pointerState.pointerId !== event.pointerId) return;

    const isShortClick = !pointerState.moved && Date.now() - pointerState.startedAt < clickDurationLimit;
    if (pointerState.stockId) {
      suppressRowClickRef.current = true;
      if (isShortClick) openDetail(pointerState.stockId);
    }
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    pointerStateRef.current = { pointerId: null, startX: 0, startY: 0, scrollLeft: 0, startedAt: 0, moved: false, stockId: null };
    setIsDragging(false);
  };

  return <>
    <div className="sort-bar parent-stock-sort-bar" aria-label="親株一覧の並び替え"><p>表示順</p><div>{sortOptions.map(({ key, label }) => <button type="button" key={key} className={sortKey === key ? 'is-active' : ''} aria-pressed={sortKey === key} onClick={() => changeSort(key)}>{buttonLabel(key, label)}</button>)}</div></div>
    <div ref={tableWrapRef} className={`pedigree-table-wrap${isDragging ? ' is-dragging' : ''}`} onPointerDown={startTableDrag} onPointerMove={moveTableDrag} onPointerUp={finishTableDrag} onPointerCancel={finishTableDrag} onDragStart={(event) => event.preventDefault()}>
      <table className="pedigree-table">
      <thead><tr>
        <th>親株ID</th>
        <th>血統名・由来</th><th>親株写真</th><th>特徴・選抜理由</th>
        <th>現在保有株数</th>
        <th>管理鉢数</th>
        <th>主株・独立株</th><th>未分離子株</th>
        <th>繁殖可能株</th>
        <th>最新年の子株発生</th>
        <th>最新年の販売</th>
        <th>1株あたり年間子株</th>
        <th>備考</th>
      </tr></thead>
      <tbody>{groupedStocks.map((group) => <Fragment key={`${group.primary}-${group.prefix}`}>
        {group.primary && group.prefix ? <tr className="management-group-row"><th colSpan={13} scope="rowgroup"><span>{group.primary}系</span><b>管理記号 {group.prefix}</b><em>{group.stocks.length}株</em></th></tr> : null}
        {group.stocks.map((stock) => <tr key={stock.id} data-stock-id={stock.id} className="stock-table-row" role="link" tabIndex={0} aria-label={`${stock.id}の詳細を開く`} onClick={(event) => {
          if (suppressRowClickRef.current) {
            event.preventDefault();
            suppressRowClickRef.current = false;
            return;
          }
          openDetail(stock.id);
        }} onDoubleClick={(event) => {
          if (suppressRowClickRef.current) {
            event.preventDefault();
            suppressRowClickRef.current = false;
            return;
          }
          openDetail(stock.id);
        }} onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openDetail(stock.id); }
        }}>
          <td><span className="stock-id-link">{stock.id}</span></td>
          <td><strong>{stock.lineageName}</strong><span className="cell-subtext">{stock.origin}</span></td>
          <td>{stock.image ? <button type="button" className="stock-table-image" aria-label={`${stock.id}の親株写真を拡大表示`} onPointerDown={(event) => event.stopPropagation()} onClick={(event) => { event.stopPropagation(); openImage(stock); }} onDoubleClick={(event) => event.stopPropagation()} onKeyDown={(event) => event.stopPropagation()}><img src={siteHref(stock.image)} alt={`${stock.id} 親株写真`} /><span className="stock-table-zoom" aria-hidden="true">⌕</span></button> : <span className="image-pending">未登録</span>}</td>
          <td className="selection-cell">{stock.selectionReason}</td>
          <td>{numberOrDash(getCurrentHeldPlantCount(stock))}</td><td>{numberOrDash(getManagedPotCount(stock))}</td><td>{numberOrDash(getCurrentRootedPlantCount(stock))}</td><td>{numberOrDash(getCurrentAttachedOffsetCount(stock))}</td>
          <td>{numberOrDash(getCurrentBreedingReadyPlantCount(stock))}</td><td>{numberOrDash(getLatestAnnualNewOffsetCount(stock))}</td><td>{numberOrDash(getLatestAnnualSoldCount(stock))}</td><td>{numberOrDash(getOffsetsPerBreedingPlant(stock))}</td>
          <td className="notes-cell">{stock.notes}</td>
        </tr>)}
      </Fragment>)}</tbody>
      </table>
    </div>
    {selectedImage ? <div className="image-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="image-modal-title" onPointerDown={(event) => { if (event.target === event.currentTarget) closeImage(); }}>
      <div className="image-modal-content">
        <button type="button" className="image-modal-close" aria-label="画像表示を閉じる" onClick={closeImage}>×</button>
        <div className="image-modal-heading"><span id="image-modal-title">{selectedImage.id} / 親株写真</span><p>{selectedImageIndex + 1} / {imageStocks.length}　ホイールで拡大・縮小、拡大後はドラッグで移動</p></div>
        <div className={`image-modal-stage${imageZoom > 1 ? ' is-zoomed' : ''}${isImagePanning ? ' is-panning' : ''}`} onWheel={(event) => { event.preventDefault(); changeImageZoom(event.deltaY < 0 ? .2 : -.2); }} onPointerDown={startImagePan} onPointerMove={moveImagePan} onPointerUp={finishImagePan} onPointerCancel={finishImagePan} onDoubleClick={resetImageView}>
          {imageStocks.length > 1 ? <><button type="button" className="image-modal-nav image-modal-nav-prev" aria-label="前の親株写真" onPointerDown={(event) => event.stopPropagation()} onClick={() => showImageAt(selectedImageIndex - 1)} disabled={selectedImageIndex === 0}>←</button><button type="button" className="image-modal-nav image-modal-nav-next" aria-label="次の親株写真" onPointerDown={(event) => event.stopPropagation()} onClick={() => showImageAt(selectedImageIndex + 1)} disabled={selectedImageIndex === imageStocks.length - 1}>→</button></> : null}
          <img src={siteHref(selectedImage.image)} alt={`${selectedImage.id} 親株写真`} style={{ transform: `translate(${imageOffset.x}px, ${imageOffset.y}px) scale(${imageZoom})` }} />
        </div>
        <div className="image-modal-footer"><div className="image-modal-controls" aria-label="画像の表示倍率"><button type="button" aria-label="縮小" onClick={() => changeImageZoom(-.2)} disabled={imageZoom <= 1}>−</button><span>{Math.round(imageZoom * 100)}%</span><button type="button" aria-label="拡大" onClick={() => changeImageZoom(.2)} disabled={imageZoom >= 4}>＋</button><button type="button" className="image-modal-reset" onClick={resetImageView}>リセット</button></div><a className="image-modal-detail-link" href={siteHref(`/mothers/${selectedImage.id}`)}>{selectedImage.id} 詳細ページ <b aria-hidden="true">→</b></a></div>
      </div>
    </div> : null}
  </>;
}
