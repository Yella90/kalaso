'use client';

import { useState, useSyncExternalStore } from 'react';
import { format, type Dictionary } from '@/lib/i18n';

type State = { kind: 'idle' } | { kind: 'saving'; done: number } | { kind: 'saved' } | { kind: 'failed' };

const subscribe = () => () => {};

/** Télécharge toutes les pages d'une matière pour que le service worker les garde hors ligne. */
export function OfflineSaver({ urls, t }: { urls: string[]; t: Dictionary['offline'] }) {
  const [state, setState] = useState<State>({ kind: 'idle' });
  const supported = useSyncExternalStore(subscribe, () => 'serviceWorker' in navigator && Boolean(navigator.serviceWorker.controller), () => false);

  if (!supported) return null;

  async function save() {
    setState({ kind: 'saving', done: 0 });
    try {
      // Une page à la fois : on ne sature pas une connexion lente.
      for (let i = 0; i < urls.length; i++) {
        const response = await fetch(urls[i], { headers: { accept: 'text/html' } });
        if (!response.ok) throw new Error(String(response.status));
        await response.text();
        setState({ kind: 'saving', done: i + 1 });
      }
      setState({ kind: 'saved' });
    } catch {
      setState({ kind: 'failed' });
    }
  }

  return (
    <div className="mt-4 rounded-xl border border-line bg-surface p-4" aria-live="polite">
      <p className="font-bold">{t.saveTitle}</p>
      {state.kind === 'idle' && (
        <button type="button" onClick={save} className="mt-2 rounded-full bg-ink px-4 py-2 font-bold text-on-ink hover:bg-ink-soft">
          {format(t.save, { n: urls.length })}
        </button>
      )}
      {state.kind === 'saving' && <p className="mt-2 text-muted">{format(t.saving, { n: state.done, total: urls.length })}</p>}
      {state.kind === 'saved' && <p className="mt-2 font-bold text-good">{format(t.saved, { n: urls.length })}</p>}
      {state.kind === 'failed' && (
        <p className="mt-2 font-bold text-alert-ink">
          {t.failed}{' '}
          <button type="button" onClick={save} className="underline">
            {t.retry}
          </button>
        </p>
      )}
    </div>
  );
}
