'use client';

import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { siteHref } from '../site-url';
import { useImageZoom } from '../use-image-zoom';

export function AnnualCareChart() {
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

  const openChart = () => {
    resetView();
    setIsOpen(true);
  };

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
    <figure className="agave-annual-graph">
      <button type="button" className="annual-chart-button" aria-label="年間育成早見表を拡大表示" onClick={openChart}>
        <img src={siteHref('/agave-annual-care-chart.jpg')} alt="サボテン、アガベ、夏型コーデックスの年間育成早見表。月ごとの育成状態、水やり頻度、植え替え適期、遮光率、肥料の目安を示す。" />
      </button>
    </figure>
    {isOpen && typeof document !== 'undefined' ? createPortal(
      <div className="image-modal-backdrop annual-chart-modal stock-detail-image-modal" role="dialog" aria-modal="true" aria-label="年間育成早見表" onPointerDown={(event) => { if (event.target === event.currentTarget) setIsOpen(false); }}>
        <div className="image-modal-content">
          <button type="button" className="image-modal-close" aria-label="年間育成早見表を閉じる" onClick={() => setIsOpen(false)}>×</button>
          <div className={`image-modal-stage${zoom > 1 ? ' is-zoomed' : ''}${isPanning ? ' is-panning' : ''}`} onWheel={zoomWithWheel} onPointerDown={startPan} onPointerMove={movePan} onPointerUp={finishPan} onPointerCancel={cancelPan} onDoubleClick={resetView}>
            <img className="stock-detail-image-modal-image" src={siteHref('/agave-annual-care-chart.jpg')} alt="年間育成早見表" style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})` }} />
          </div>
          <div className="stock-detail-image-modal-footer"><div className="image-modal-controls" aria-label="画像の表示倍率"><button type="button" aria-label="縮小" onClick={() => changeZoom(-.2)} disabled={zoom <= 1}>−</button><span>{Math.round(zoom * 100)}%</span><button type="button" aria-label="拡大" onClick={() => changeZoom(.2)} disabled={zoom >= 4}>＋</button><button type="button" className="image-modal-reset" onClick={resetView}>リセット</button></div></div>
        </div>
      </div>,
      document.body,
    ) : null}
  </>;
}
