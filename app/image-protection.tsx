'use client';

import { useEffect } from 'react';

export function ImageProtection() {
  useEffect(() => {
    const isImage = (target: EventTarget | null) => target instanceof HTMLImageElement;
    const preventImageMenu = (event: MouseEvent) => {
      if (isImage(event.target)) event.preventDefault();
    };
    const preventImageDrag = (event: DragEvent) => {
      if (isImage(event.target)) event.preventDefault();
    };

    document.addEventListener('contextmenu', preventImageMenu);
    document.addEventListener('dragstart', preventImageDrag);
    return () => {
      document.removeEventListener('contextmenu', preventImageMenu);
      document.removeEventListener('dragstart', preventImageDrag);
    };
  }, []);

  return null;
}
