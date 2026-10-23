'use client';

import { useEffect, useRef } from 'react';

/**
 * Appelle `callback(dt)` a chaque image (dt en secondes, plafonne a 50 ms)
 * tant que `active` est vrai. Le callback le plus recent est toujours utilise.
 */
export function useAnimationFrame(callback: (dt: number) => void, active = true) {
  const cb = useRef(callback);
  cb.current = callback;

  useEffect(() => {
    if (!active) return;
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      cb.current(dt);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [active]);
}
