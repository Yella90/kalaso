'use client';

import { useState } from 'react';
import type { Dictionary } from '@/lib/i18n';
import { PredictChallenges } from '../PredictChallenges';
import { fmt, Readout, Slider } from '../Slider';
import { frame, Grid, Tab } from './kit';

type T = Dictionary['sims']['exponentielle'];
type Mode = 'courbes' | 'differentielle';
const f = frame({ xmin: -4, xmax: 5, ymin: -3, ymax: 6, w: 500 });

function path(fn: (x: number) => number, x0 = f.xmin, x1 = f.xmax) {
  const out: string[] = [];
  for (let k = 0; k <= 300; k++) {
    const x = x0 + (k / 300) * (x1 - x0);
    const y = fn(x);
    if (Number.isFinite(y) && y > f.ymin - 1 && y < f.ymax + 1) out.push(`${out.length ? 'L' : 'M'}${f.X(x).toFixed(1)} ${f.Y(y).toFixed(1)}`);
    else if (out.length) break;
  }
  return out.join(' ');
}

/** Exponentielle et logarithme ; équation différentielle y′ = a·y avec champ de directions et méthode d’Euler. */
export function ExponentielleSim({ t, predict }: { t: T; predict: Dictionary['lesson']['predict'] }) {
  const [mode, setMode] = useState<Mode>('courbes');
  const [x0, setX0] = useState(1);
  const [a, setA] = useState(0.5);
  const [y0, setY0] = useState(1);
  const [h, setH] = useState(0.5);

  // Euler : y(n+1) = y(n) + h·a·y(n), en partant de (0 ; y0).
  const euler: [number, number][] = [[0, y0]];
  while (euler[euler.length - 1][0] < f.xmax) {
    const [x, y] = euler[euler.length - 1];
    euler.push([x + h, y + h * a * y]);
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-2">
        {(['courbes', 'differentielle'] as Mode[]).map((k) => (
          <Tab key={k} on={mode === k} onClick={() => setMode(k)}>
            {t.modes[k]}
          </Tab>
        ))}
      </div>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="rounded-2xl border border-line bg-surface p-2">
          <svg viewBox={`0 0 ${f.w} ${f.h}`} className="h-auto w-full" role="img" aria-label={t.title}>
            <Grid f={f} />
            {mode === 'courbes' ? (
              <>
                <path d={path((x) => x)} stroke="#cbd5e1" strokeDasharray="5 4" fill="none" />
                <path d={path(Math.exp)} stroke="#dc2626" strokeWidth="3" fill="none" />
                <path d={path(Math.log, 0.01, f.xmax)} stroke="#2563eb" strokeWidth="3" fill="none" />
                {/* Tangente à exp au point d’abscisse x0 : pente e^x0. */}
                <path d={path((x) => Math.exp(x0) * (x - x0) + Math.exp(x0))} stroke="#f59e0b" strokeWidth="2" fill="none" />
                <circle cx={f.X(x0)} cy={f.Y(Math.exp(x0))} r="6" fill="#dc2626" />
                {x0 > 0 && <circle cx={f.X(x0)} cy={f.Y(Math.log(x0))} r="6" fill="#2563eb" />}
                <text x={f.X(1.6)} y={f.Y(5.3)} fontSize="14" fontWeight="700" fill="#dc2626">exp</text>
                <text x={f.X(4.2)} y={f.Y(1.7)} fontSize="14" fontWeight="700" fill="#2563eb">ln</text>
              </>
            ) : (
              <>
                {/* Champ de directions : en chaque point, la pente vaut a·y. */}
                {Array.from({ length: 10 }, (_, i) =>
                  Array.from({ length: 10 }, (_, j) => {
                    const x = f.xmin + 0.5 + i * 0.9;
                    const y = f.ymin + 0.5 + j * 0.9;
                    const s = a * y;
                    const len = 0.32 / Math.sqrt(1 + s * s);
                    return <line key={`${i}-${j}`} x1={f.X(x - len)} y1={f.Y(y - s * len)} x2={f.X(x + len)} y2={f.Y(y + s * len)} stroke="#94a3b8" strokeWidth="1.5" />;
                  }),
                )}
                <path d={path((x) => y0 * Math.exp(a * x))} stroke="#16a34a" strokeWidth="3" fill="none" />
                <polyline points={euler.map(([x, y]) => `${f.X(x)},${f.Y(Math.max(f.ymin - 1, Math.min(f.ymax + 1, y)))}`).join(' ')} fill="none" stroke="#f59e0b" strokeWidth="2" />
                {euler.map(([x, y], i) => (y <= f.ymax ? <circle key={i} cx={f.X(x)} cy={f.Y(y)} r="3" fill="#f59e0b" /> : null))}
                <circle cx={f.X(0)} cy={f.Y(y0)} r="6" fill="#16a34a" />
              </>
            )}
          </svg>
          <p className="px-2 text-sm text-muted">{mode === 'courbes' ? t.legendCurves : t.legendDiff}</p>
        </div>
        <div className="flex flex-col gap-3">
          {mode === 'courbes' ? (
            <>
              <Slider label="x₀" value={x0} min={-3} max={4} step={0.1} onChange={setX0} />
              <dl className="grid grid-cols-2 gap-2">
                <Readout label="e^x₀" value={fmt(Math.exp(x0), 3)} strong />
                <Readout label="ln x₀" value={x0 > 0 ? fmt(Math.log(x0), 3) : '—'} />
                <Readout label={t.slope} value={fmt(Math.exp(x0), 3)} />
              </dl>
            </>
          ) : (
            <>
              <Slider label="a" value={a} min={-1.5} max={1.5} step={0.1} onChange={setA} />
              <Slider label="y(0)" value={y0} min={-2} max={3} step={0.5} onChange={setY0} />
              <Slider label={t.step} value={h} min={0.1} max={1} step={0.1} onChange={setH} />
              <dl className="grid grid-cols-2 gap-2">
                <Readout label="y(2) exact" value={fmt(y0 * Math.exp(2 * a), 3)} strong />
                <Readout label="y(2) Euler" value={fmt(euler.find(([x]) => Math.abs(x - 2) < 1e-6)?.[1] ?? NaN, 3)} />
              </dl>
            </>
          )}
          <p className="rounded-xl bg-paper px-3 py-2 text-sm">{t.notes[mode]}</p>
        </div>
      </div>
      <PredictChallenges challenges={t.challenges.map((ch) => ({ ...ch, choices: [...ch.choices] }))} t={predict} />
    </div>
  );
}
