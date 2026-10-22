'use client';

import { useEffect } from 'react';
import { getProgressSnapshot, replaceProgress, useProgress, type Progress } from './store';

/** Fusionne deux progressions sans rien perdre : union des missions, meilleur score, visite la plus récente. */
export function mergeProgress(a: Progress, b: Partial<Progress> | null): Progress {
  if (!b) return a;
  const adventures: Progress['adventures'] = { ...a.adventures };
  for (const [id, missions] of Object.entries(b.adventures ?? {})) {
    adventures[id] = [...new Set([...(adventures[id] ?? []), ...missions])];
  }
  const quizzes: Progress['quizzes'] = { ...a.quizzes };
  for (const [key, q] of Object.entries(b.quizzes ?? {})) {
    const mine = quizzes[key];
    if (!mine || q.score / q.total > mine.score / mine.total) quizzes[key] = q;
  }
  const chapters: Progress['chapters'] = { ...a.chapters };
  for (const [key, at] of Object.entries(b.chapters ?? {})) chapters[key] = Math.max(chapters[key] ?? 0, at);
  return { adventures, quizzes, chapters };
}

const SYNCED = 'kalanso:progress-synced';
let loggedIn: boolean | null = null;
let timer: ReturnType<typeof setTimeout> | undefined;

async function pullOnce() {
  try {
    if (window.sessionStorage.getItem(SYNCED)) {
      loggedIn = window.sessionStorage.getItem(SYNCED) === 'oui';
      return;
    }
  } catch {
    // sessionStorage indisponible : on synchronise quand même.
  }
  try {
    const response = await fetch('/api/progress', { cache: 'no-store' });
    loggedIn = response.ok;
    if (response.ok) {
      const { data } = (await response.json()) as { data: Partial<Progress> | null };
      const merged = mergeProgress(getProgressSnapshot(), data);
      replaceProgress(merged);
      await push(merged);
    }
    window.sessionStorage.setItem(SYNCED, loggedIn ? 'oui' : 'non');
  } catch {
    // Hors ligne : on réessaiera au prochain chargement.
  }
}

async function push(progress: Progress) {
  if (!loggedIn) return;
  try {
    const response = await fetch('/api/progress', {
      method: 'PUT',
      body: JSON.stringify(progress),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.status === 401) loggedIn = false;
  } catch {
    // Hors ligne : la progression reste dans le navigateur et repartira à la prochaine modification.
  }
}

/**
 * Synchronise la progression avec le compte de l'élève, s'il est connecté.
 * `loggedInHint` vient du serveur (page « Mon espace ») : il force une nouvelle synchronisation
 * juste après une connexion ou une déconnexion.
 */
export function ProgressSync({ loggedInHint }: { loggedInHint?: boolean }) {
  const progress = useProgress();

  useEffect(() => {
    if (loggedInHint !== undefined) {
      let cached: string | null = null;
      try {
        cached = window.sessionStorage.getItem(SYNCED);
      } catch {
        cached = null;
      }
      if (cached !== (loggedInHint ? 'oui' : 'non')) resetSyncFlag();
    }
    void pullOnce();
  }, [loggedInHint]);

  useEffect(() => {
    if (!loggedIn) return;
    clearTimeout(timer);
    timer = setTimeout(() => void push(progress), 2000);
  }, [progress]);

  return null;
}

/** À appeler à la connexion ou à la déconnexion, pour refaire la synchronisation. */
export function resetSyncFlag() {
  try {
    window.sessionStorage.removeItem(SYNCED);
  } catch {
    // ignoré
  }
  loggedIn = null;
}
