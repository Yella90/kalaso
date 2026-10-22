'use client';

import { useEffect } from 'react';

/** Installe le service worker en production (en développement, il gênerait le rechargement à chaud). */
export function ServiceWorker() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production' || !('serviceWorker' in navigator)) return;
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Sans service worker, le site marche normalement, seulement pas hors ligne.
    });
  }, []);
  return null;
}
