'use client';

import { useSyncExternalStore } from 'react';

// Progression de l'élève, gardée dans le navigateur : elle marche hors ligne et sans compte.
// Quand l'élève est connecté, elle est aussi envoyée au serveur (voir lib/progress/sync.ts).

export interface Progress {
  /** Missions réussies, par aventure. */
  adventures: Record<string, string[]>;
  /** Meilleur score par quiz de chapitre (clé « classe/matière/chapitre »). */
  quizzes: Record<string, { score: number; total: number; at: number }>;
  /** Chapitres ouverts, avec la date de la dernière visite. */
  chapters: Record<string, number>;
}

const KEY = 'kalanso:progress:v1';
const EVENT = 'kalanso:progress';
const EMPTY: Progress = { adventures: {}, quizzes: {}, chapters: {} };

let cache: { raw: string | null; value: Progress } = { raw: null, value: EMPTY };

function read(): Progress {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(KEY);
  } catch {
    return cache.value;
  }
  if (raw === cache.raw) return cache.value;
  let value = EMPTY;
  try {
    value = raw ? { ...EMPTY, ...(JSON.parse(raw) as Partial<Progress>) } : EMPTY;
  } catch {
    value = EMPTY;
  }
  cache = { raw, value };
  return value;
}

function write(update: (p: Progress) => Progress) {
  const next = update(read());
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Navigation privée ou stockage plein : la progression reste valable pour cette page.
    cache = { raw: cache.raw, value: next };
  }
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener('storage', onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener('storage', onChange);
  };
}

export function useProgress(): Progress {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}

export function getProgressSnapshot(): Progress {
  return read();
}

export function replaceProgress(progress: Progress) {
  write(() => progress);
}

export function completeMission(adventureId: string, missionId: string) {
  write((p) => {
    const done = p.adventures[adventureId] ?? [];
    if (done.includes(missionId)) return p;
    return { ...p, adventures: { ...p.adventures, [adventureId]: [...done, missionId] } };
  });
}

export function resetAdventure(adventureId: string) {
  write((p) => {
    const adventures = { ...p.adventures };
    delete adventures[adventureId];
    return { ...p, adventures };
  });
}

export function recordQuiz(key: string, score: number, total: number) {
  write((p) => {
    const best = p.quizzes[key];
    if (best && best.score / best.total >= score / total) return p;
    return { ...p, quizzes: { ...p.quizzes, [key]: { score, total, at: Date.now() } } };
  });
}

export function markChapterVisited(key: string) {
  write((p) => ({ ...p, chapters: { ...p.chapters, [key]: Date.now() } }));
}
