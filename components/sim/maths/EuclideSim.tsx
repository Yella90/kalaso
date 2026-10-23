'use client';

import { useState } from 'react';
import type { Dictionary } from '@/lib/i18n';
import { PredictChallenges } from '../PredictChallenges';
import { Slider } from '../Slider';

type T = Dictionary['sims']['euclide'];

const COLORS = ['#3b82f6', '#f59e0b', '#22c55e', '#ef4444', '#a855f7', '#14b8a6', '#eab308'];

/** Algorithme d’Euclide : on pave un rectangle a × b par les plus grands carrés possibles. */
export function EuclideSim({ t, predict }: { t: T; predict: Dictionary['lesson']['predict'] }) {
  const [a, setA] = useState(84);
  const [b, setB] = useState(36);
  const [shown, setShown] = useState(99);

  // Étapes de l’algorithme et carrés du pavage.
  const steps: { a: number; b: number; q: number; r: number }[] = [];
  let x = Math.max(a, b);
  let y = Math.min(a, b);
  while (y > 0) {
    steps.push({ a: x, b: y, q: Math.floor(x / y), r: x % y });
    [x, y] = [y, x % y];
  }
  const pgcd = x;

  const W = Math.max(a, b);
  const H = Math.min(a, b);
  const scale = 520 / W;
  const squares: { x: number; y: number; s: number; level: number }[] = [];
  let ox = 0;
  let oy = 0;
  let w = W;
  let h = H;
  let level = 0;
  while (w > 0 && h > 0 && squares.length < 200) {
    if (w >= h) {
      const q = Math.floor(w / h);
      for (let i = 0; i < q; i++) squares.push({ x: ox + i * h, y: oy, s: h, level });
      ox += q * h;
      w -= q * h;
    } else {
      const q = Math.floor(h / w);
      for (let i = 0; i < q; i++) squares.push({ x: ox, y: oy + i * w, s: w, level });
      oy += q * w;
      h -= q * w;
    }
    level++;
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="rounded-2xl border border-line bg-surface p-3">
          <svg viewBox={`-2 -2 ${W * scale + 4} ${H * scale + 4}`} className="h-auto w-full" role="img" aria-label={t.title}>
            <rect x="0" y="0" width={W * scale} height={H * scale} fill="#f8fafc" stroke="#0f172a" strokeWidth="2" />
            {squares
              .filter((s) => s.level < shown)
              .map((s, i) => (
                <rect key={i} x={s.x * scale} y={s.y * scale} width={s.s * scale} height={s.s * scale} fill={COLORS[s.level % COLORS.length]} fillOpacity="0.55" stroke="#0f172a" strokeWidth="1.5" />
              ))}
          </svg>
          <p className="mt-2 text-sm text-muted">{t.help}</p>
        </div>
        <div className="flex flex-col gap-3">
          <Slider label="a" value={a} min={2} max={150} step={1} onChange={(v) => { setA(v); setShown(99); }} />
          <Slider label="b" value={b} min={1} max={150} step={1} onChange={(v) => { setB(v); setShown(99); }} />
          <div className="flex gap-2">
            <button type="button" onClick={() => setShown(1)} className="rounded-full border-2 border-line px-3 py-1 text-sm font-bold">
              {t.restart}
            </button>
            <button type="button" onClick={() => setShown((s) => Math.min(steps.length, s >= 99 ? 1 : s + 1))} className="rounded-full bg-ink px-4 py-1 text-sm font-bold text-on-ink">
              {t.next}
            </button>
          </div>
          <ol className="space-y-1 rounded-xl bg-paper px-4 py-3 font-mono text-sm">
            {steps.slice(0, Math.min(shown, steps.length)).map((s, i) => (
              <li key={i} style={{ color: COLORS[i % COLORS.length] }}>
                {s.a} = {s.q} × {s.b} + {s.r}
              </li>
            ))}
          </ol>
          <p className="rounded-xl bg-ink px-4 py-3 font-serif text-xl text-on-ink">
            PGCD({a} ; {b}) = {shown >= steps.length ? pgcd : '?'}
          </p>
          {shown >= steps.length && (
            <p className="text-sm text-muted">
              PPCM = {(a * b) / pgcd}. {pgcd === 1 ? t.coprime : ''}
            </p>
          )}
        </div>
      </div>
      <PredictChallenges challenges={t.challenges.map((ch) => ({ ...ch, choices: [...ch.choices] }))} t={predict} />
    </div>
  );
}
