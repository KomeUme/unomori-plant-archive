'use client';

import { useEffect } from 'react';

export function CareGuideHashFocus() {
  useEffect(() => {
    const targetId = window.location.hash.slice(1);
    if (!targetId) return;

    const frame = window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'auto', block: 'center', inline: 'nearest' });
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  return null;
}
