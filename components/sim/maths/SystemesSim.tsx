'use client';

import { useState } from 'react';
import type { Dictionary } from '@/lib/i18n';
import { PredictChallenges } from '../PredictChallenges';
import { fmt, Slider } from '../Slider';
import { frame, Grid } from './kit';

type T = Dictionary['sims']['systemes'];
const f = frame({ xmin: -8, xmax: 8, ymin: -8, ymax: 8, w: 420 });

/** Système de deux équations : deux droites, leur point d’intersection et la méthode. */
export function SystemesSim({ t, predict }: { t: T; predict: Dictionary['lesson']['predict'] }) {
  const [e1, setE1] = useState({ a: 1, b: 1, c: 5 });
  const [e2, setE2] = useState({ a: 2, b: -1, c: 1 });
  const det = e1.a * e2.b - e2.a * e1.b;
  const x = det ? (e1.c * e2.b - e2.c * e1.b) / det : NaN;
  const y = det ? (e1.a * e2.c - e2.a * e1.c) / det : NaN;
  const same = !det && e1.a * e2.c === e2.a * e1.c && e1.b * e2.c === e2.b * e1.c;

  const segment = ({ a, b, c }: { a: number; b: number; c: number }) => {
    // ax + by = c, tracé sur le cadre.
    if (b !== 0) return [f.xmin, f.xmax].map((xx) => [xx, (c - a * xx) / b] as [number, number]);
    if (a !== 0) return [[c / a, f.ymin], [c / a, f.ymax]] as [number, number][];
    return null;
  };
  const term = (v: number, s: string, first: boolean) => (v === 0 ? '' : `${v < 0 ? ' − ' : first ? '' : ' + '}${Math.abs(v) === 1 ? '' : Math.abs(v)}${s}`);
  const eq = (e: { a: number; b: number; c: number }) => `${term(e.a, 'x', true)}${term(e.b, 'y', e.a === 0)} = ${e.c}`;

  const sliders = (e: typeof e1, set: (v: typeof e1) => void, name: string) => (
    <div className="rounded-xl border border-line p-3">
      <p className="text-sm font-bold">
        {name} : {eq(e)}
      </p>
      {(['a', 'b', 'c'] as const).map((k) => (
        <Slider key={k} label={k} value={e[k]} min={-6} max={6} step={1} onChange={(v) => set({ ...e, [k]: v })} />
      ))}
    </div>
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="rounded-2xl border border-line bg-surface p-2">
          <svg viewBox={`0 0 ${f.w} ${f.h}`} className="h-auto w-full" role="img" aria-label={t.title}>
            <Grid f={f} />
            {[{ e: e1, c: '#dc2626' }, { e: e2, c: '#2563eb' }].map(({ e, c }, i) => {
              const s = segment(e);
              return s ? <line key={i} x1={f.X(s[0][0])} y1={f.Y(s[0][1])} x2={f.X(s[1][0])} y2={f.Y(s[1][1])} stroke={c} strokeWidth="3" /> : null;
            })}
            {Number.isFinite(x) && Math.abs(x) <= 8 && Math.abs(y) <= 8 && (
              <g>
                <line x1={f.X(x)} x2={f.X(x)} y1={f.Y(y)} y2={f.Y(0)} stroke="#16a34a" strokeDasharray="3 3" />
                <line x1={f.X(x)} x2={f.X(0)} y1={f.Y(y)} y2={f.Y(y)} stroke="#16a34a" strokeDasharray="3 3" />
                <circle cx={f.X(x)} cy={f.Y(y)} r="7" fill="#16a34a" stroke="#fff" strokeWidth="2" />
              </g>
            )}
          </svg>
        </div>
        <div className="flex flex-col gap-3">
          {sliders(e1, setE1, '(D₁)')}
          {sliders(e2, setE2, '(D₂)')}
        </div>
      </div>
      <div className="rounded-xl bg-ink px-4 py-3 text-on-ink">
        <p className="font-bold">
          {Number.isFinite(x) ? `${t.solution} : x = ${fmt(x, 3)} ; y = ${fmt(y, 3)}` : same ? t.infinite : t.none}
        </p>
        <p className="mt-1 text-sm text-on-ink-muted">
          {t.determinant} : {e1.a} × ({e2.b}) − {e2.a} × ({e1.b}) = {det}. {det ? t.detNonZero : t.detZero}
        </p>
      </div>
      <PredictChallenges challenges={t.challenges.map((ch) => ({ ...ch, choices: [...ch.choices] }))} t={predict} />
    </div>
  );
}
