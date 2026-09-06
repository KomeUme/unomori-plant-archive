'use client';

import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { siteHref } from '../../site-url';

type ImagePanState = {
  pointerId: number | null;
  startX: number;
  startY: number;
  originX: number;
  originY: number;
};

type ParentStockDetailImageProps = {
  image: string;
  lineageName: string;
  stockId: string;
};

export function ParentStockDetailImage({ image, lineageName, stockId }: ParentStockDetailImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const panStateRef = useRef<ImagePanState>({ pointerId: null, startX: 0, startY: 0, originX: 0, originY: 0 });

  const resetView = () => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  const changeZoom = (amount: number) => setZoom((currentZoom) => {
    const nextZoom = Math.min(4, Math.max(1, Number((currentZoom + amount).toFixed(2))));
    if (nextZoom === 1) setOffset({ x: 0, y: 0 });
    return nextZoom;
  });

  const openImage = () => {
    resetView();
    setIsOpen(true);
  };

  const closeImage = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen]);

  const startPan = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || zoom <= 1) return;
    panStateRef.current = { pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, originX: offset.x, originY: offset.y };
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsPanning(true);
  };

  const movePan = (event: PointerEvent<HTMLDivElement>) => {
    const panState = panStateRef.current;
    if (panState.pointerId !== event.pointerId) return;
    setOffset({ x: panState.originX + event.clientX - panState.startX, y: panState.originY + event.clientY - panState.startY });
    event.preventDefault();
  };

  const finishPan = (event: PointerEvent<HTMLDivElement>) => {
    const panState = panStateRef.current;
    if (panState.pointerId !== event.pointerId) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    panStateRef.current = { pointerId: null, startX: 0, startY: 0, originX: 0, originY: 0 };
    setIsPanning(false);
  };

  return <>
    <button className="stock-detail-image-button" type="button" aria-label={`${stockId}の親株写真を拡大表示`} onClick={openImage}>
      <img src={siteHref(image)} alt={`${stockId} ${lineageName}`} />
      <span className="stock-detail-image-zoom" aria-hidden="true">⌕</span>
    </button>
    {isOpen ? <div className="image-modal-backdrop stock-detail-image-modal" role="dialog" aria-modal="true" aria-label={`${stockId}の親株写真`} onPointerDown={(event) => { if (event.target === event.currentTarget) closeImage(); }}>
      <div className="image-modal-content">
        <button type="button" className="image-modal-close" aria-label="画像表示を閉じる" onClick={closeImage}>×</button>
        <div className={`image-modal-stage${zoom > 1 ? ' is-zoomed' : ''}${isPanning ? ' is-panning' : ''}`} onWheel={(event) => { event.preventDefault(); changeZoom(event.deltaY < 0 ? .2 : -.2); }} onPointerDown={startPan} onPointerMove={movePan} onPointerUp={finishPan} onPointerCancel={finishPan} onDoubleClick={resetView}>
          <img className="stock-detail-image-modal-image" src={siteHref(image)} alt={`${stockId} 親株写真`} style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})` }} />
        </div>
        <div className="stock-detail-image-modal-footer"><div className="image-modal-controls" aria-label="画像の表示倍率"><button type="button" aria-label="縮小" onClick={() => changeZoom(-.2)} disabled={zoom <= 1}>−</button><span>{Math.round(zoom * 100)}%</span><button type="button" aria-label="拡大" onClick={() => changeZoom(.2)} disabled={zoom >= 4}>＋</button><button type="button" className="image-modal-reset" onClick={resetView}>リセット</button></div></div>
      </div>
    </div> : null}
  </>;
}
