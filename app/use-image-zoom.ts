'use client';

import { useRef, useState, type PointerEvent, type WheelEvent } from 'react';

type Point = { x: number; y: number };

type PanState = {
  pointerId: number | null;
  startX: number;
  startY: number;
  originX: number;
  originY: number;
};

type PinchState = {
  startDistance: number;
  startZoom: number;
};

const minimumZoom = 1;
const maximumZoom = 4;
const emptyPanState = (): PanState => ({ pointerId: null, startX: 0, startY: 0, originX: 0, originY: 0 });
const clampZoom = (value: number) => Math.min(maximumZoom, Math.max(minimumZoom, Number(value.toFixed(2))));
const distanceBetween = (first: Point, second: Point) => Math.hypot(second.x - first.x, second.y - first.y);

export function useImageZoom() {
  const [zoom, setZoom] = useState(minimumZoom);
  const [offset, setOffset] = useState<Point>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const panStateRef = useRef<PanState>(emptyPanState());
  const activePointersRef = useRef(new Map<number, Point>());
  const pinchStateRef = useRef<PinchState | null>(null);

  const reset = () => {
    setZoom(minimumZoom);
    setOffset({ x: 0, y: 0 });
    setIsPanning(false);
    panStateRef.current = emptyPanState();
    activePointersRef.current.clear();
    pinchStateRef.current = null;
  };

  const setZoomValue = (value: number) => {
    const nextZoom = clampZoom(value);
    setZoom(nextZoom);
    if (nextZoom === minimumZoom) setOffset({ x: 0, y: 0 });
    return nextZoom;
  };

  const changeZoom = (amount: number) => setZoom((currentZoom) => {
    const nextZoom = clampZoom(currentZoom + amount);
    if (nextZoom === minimumZoom) setOffset({ x: 0, y: 0 });
    return nextZoom;
  });

  const beginPinch = () => {
    const points = [...activePointersRef.current.values()];
    if (points.length < 2) return;
    pinchStateRef.current = { startDistance: distanceBetween(points[0], points[1]), startZoom: zoom };
    panStateRef.current = emptyPanState();
    setIsPanning(true);
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;

    event.currentTarget.setPointerCapture(event.pointerId);
    activePointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (activePointersRef.current.size >= 2) {
      beginPinch();
      event.preventDefault();
      return;
    }

    if (zoom <= minimumZoom) return;
    panStateRef.current = { pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, originX: offset.x, originY: offset.y };
    setIsPanning(true);
    event.preventDefault();
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!activePointersRef.current.has(event.pointerId)) return;
    activePointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (activePointersRef.current.size >= 2) {
      if (!pinchStateRef.current) beginPinch();
      const pinchState = pinchStateRef.current;
      const points = [...activePointersRef.current.values()];
      if (!pinchState || points.length < 2 || pinchState.startDistance === 0) return;

      setZoomValue(pinchState.startZoom * (distanceBetween(points[0], points[1]) / pinchState.startDistance));
      event.preventDefault();
      return;
    }

    const panState = panStateRef.current;
    if (panState.pointerId !== event.pointerId) return;
    setOffset({ x: panState.originX + event.clientX - panState.startX, y: panState.originY + event.clientY - panState.startY });
    event.preventDefault();
  };

  const finishPointer = (event: PointerEvent<HTMLDivElement>) => {
    if (!activePointersRef.current.has(event.pointerId)) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);

    const wasPinching = activePointersRef.current.size >= 2;
    activePointersRef.current.delete(event.pointerId);

    if (wasPinching) {
      pinchStateRef.current = null;
      const remainingPointer = [...activePointersRef.current.entries()][0];
      if (remainingPointer && zoom > minimumZoom) {
        const [pointerId, point] = remainingPointer;
        panStateRef.current = { pointerId, startX: point.x, startY: point.y, originX: offset.x, originY: offset.y };
        setIsPanning(true);
      } else {
        panStateRef.current = emptyPanState();
        setIsPanning(false);
      }
      return;
    }

    if (panStateRef.current.pointerId === event.pointerId) panStateRef.current = emptyPanState();
    setIsPanning(false);
  };

  const onWheel = (event: WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    changeZoom(event.deltaY < 0 ? .2 : -.2);
  };

  return { zoom, offset, isPanning, changeZoom, reset, onPointerDown, onPointerMove, onPointerUp: finishPointer, onPointerCancel: finishPointer, onWheel };
}
