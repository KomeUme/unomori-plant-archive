'use client';

import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { siteHref } from '../../site-url';
import { useImageZoom } from '../../use-image-zoom';

type ParentStockDetailImageProps = {
  image: string;
  displayName: string | null;
  stockId: string;
};

export function ParentStockDetailImage({ image, displayName, stockId }: ParentStockDetailImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    zoom,
    offset,
    isPanning,
    changeZoom,
    reset: resetView,
    onPointerDown: startPan,
    onPointerMove: movePan,
    onPointerUp: finishPan,
    onPointerCancel: cancelPan,
    onWheel: zoomWithWheel,
  } = useImageZoom();

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

  return <>
    <button className="stock-detail-image-button" type="button" aria-label={`${stockId}の親株写真を拡大表示`} onClick={openImage}>
      <img src={siteHref(image)} alt={`${stockId}${displayName ? ` ${displayName}` : ''} 親株写真`} />
      <span className="stock-detail-image-zoom" aria-hidden="true">⌕</span>
    </button>
    {isOpen && typeof document !== 'undefined' ? createPortal(
      <div className="image-modal-backdrop stock-detail-image-modal" role="dialog" aria-modal="true" aria-label={`${stockId}の親株写真`} onPointerDown={(event) => { if (event.target === event.currentTarget) closeImage(); }}>
        <div className="image-modal-content">
          <button type="button" className="image-modal-close" aria-label="画像表示を閉じる" onClick={closeImage}>×</button>
          <div className={`image-modal-stage${zoom > 1 ? ' is-zoomed' : ''}${isPanning ? ' is-panning' : ''}`} onWheel={zoomWithWheel} onPointerDown={(event) => { if (event.target === event.currentTarget) { closeImage(); return; } startPan(event); }} onPointerMove={movePan} onPointerUp={finishPan} onPointerCancel={cancelPan} onDoubleClick={resetView}>
            <img className="stock-detail-image-modal-image" src={siteHref(image)} alt={`${stockId} 親株写真`} style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})` }} />
          </div>
          <div className="stock-detail-image-modal-footer"><div className="image-modal-controls" aria-label="画像の表示倍率"><button type="button" aria-label="縮小" onClick={() => changeZoom(-.2)} disabled={zoom <= 1}>−</button><span>{Math.round(zoom * 100)}%</span><button type="button" aria-label="拡大" onClick={() => changeZoom(.2)} disabled={zoom >= 4}>＋</button><button type="button" className="image-modal-reset" onClick={resetView}>リセット</button></div></div>
        </div>
      </div>
    , document.body) : null}
  </>;
}
