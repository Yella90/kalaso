'use client';

import { useState } from 'react';
import type { Dictionary } from '@/lib/i18n';
import { PredictChallenges } from '../PredictChallenges';
import { fmt, Readout, Slider } from '../Slider';
import { frame, Grid, Tab } from './kit';

type T = Dictionary['sims']['integrales'];
type Fn = 'carre' | 'racine' | 'inverse' | 'sinus' | 'exp';

const FNS: Record<Fn, { f: (x: number) => number; F: (x: number) => number; label: string; min: number }> = {
  carre: { f: (x) => x * x, F: (x) => (x * x * x) / 3, label: 'x²', min: -3 },
  racine: { f: (x) => Math.sqrt(Math.max(0, x)), F: (x) => (2 / 3) * Math.pow(Math.max(0, x), 1.5), label: '√x', min: 0 },
  inverse: { f: (x) => 1 / x, F: (x) => Math.log(x), label: '1/x', min: 0.2 },
  sinus: { f: (x) => Math.sin(x), F: (x) => -Math.cos(x), label: 'sin x', min: -3 },
  exp: { f: (x) => Math.exp(x / 2), F: (x) => 2 * Math.exp(x / 2), label: 'e^(x/2)', min: -3 },
};
const fr = frame({ xmin: -3.5, xmax: 4.5, ymin: -2, ymax: 9, w: 520 });

/** Aire sous une courbe : rectangles de Riemann et valeur exacte par une primitive. */
export function IntegralesSim({ t, predict }: { t: T; predict: Dictionary['lesson']['predict'] }) {
  const [fn, setFn] = useState<Fn>('carre');
  const [a, setA] = useState(0);
  const [b, setB] = useState(2);
  const [n, setN] = useState(6);
  const [method, setMethod] = useState<'gauche' | 'milieu' | 'droite'>('gauche');
  const { f, F, label, min } = FNS[fn];
  const lo = Math.max(min, Math.min(a, b));
  const hi = Math.max(lo + 0.1, Math.max(a, b));
  const dx = (hi - lo) / n;
  const rects = Array.from({ length: n }, (_, i) => {
    const x0 = lo + i * dx;
    const xs = method === 'gauche' ? x0 : method === 'milieu' ? x0 + dx / 2 : x0 + dx;
    return { x0, h: f(xs) };
  });
  const approx = rects.reduce((s, r) => s + r.h * dx, 0);
  const exact = F(hi) - F(lo);

  const pts: string[] = [];
  for (let k = 0; k <= 300; k++) {
    const x = Math.max(min, fr.xmin) + (k / 300) * (fr.xmax - Math.max(min, fr.xmin));
    const y = f(x);
    if (Number.isFinite(y) && y < fr.ymax + 2 && y > fr.ymin - 2) pts.push(`${pts.length ? 'L' : 'M'}${fr.X(x).toFixed(1)} ${fr.Y(y).toFixed(1)}`);
  }
  const area: string[] = [];
  for (let k = 0; k <= 100; k++) {
    const x = lo + (k / 100) * (hi - lo);
    area.push(`${fr.X(x).toFixed(1)},${fr.Y(Math.max(fr.ymin, Math.min(fr.ymax, f(x)))).toFixed(1)}`);
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-2">
        {(Object.keys(FNS) as Fn[]).map((k) => (
          <Tab key={k} on={fn === k} onClick={() => { setFn(k); setA(Math.max(FNS[k].min, 0) || FNS[k].min); }}>
            f(x) = {FNS[k].label}
          </Tab>
        ))}
      </div>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="rounded-2xl border border-line bg-surface p-2">
          <svg viewBox={`0 0 ${fr.w} ${fr.h}`} className="h-auto w-full" role="img" aria-label={t.title}>
            <Grid f={fr} />
            <polygon points={`${fr.X(lo)},${fr.Y(0)} ${area.join(' ')} ${fr.X(hi)},${fr.Y(0)}`} fill="#22c55e" fillOpacity="0.25" />
            {rects.map((r, i) => (
              <rect
                key={i}
                x={fr.X(r.x0)}
                y={Math.min(fr.Y(r.h), fr.Y(0))}
                width={dx * fr.s}
                height={Math.abs(fr.Y(r.h) - fr.Y(0))}
                fill={r.h >= 0 ? '#3b82f6' : '#ef4444'}
                fillOpacity="0.35"
                stroke={r.h >= 0 ? '#1d4ed8' : '#b91c1c'}
              />
            ))}
            <path d={pts.join(' ')} fill="none" stroke="#0f172a" strokeWidth="2.5" />
            {[lo, hi].map((x, i) => (
              <g key={i}>
                <line x1={fr.X(x)} x2={fr.X(x)} y1="0" y2={fr.h} stroke="#f59e0b" strokeDasharray="5 4" />
                <text x={fr.X(x)} y="14" fontSize="13" fontWeight="700" textAnchor="middle" fill="#b45309">{i ? 'b' : 'a'}</text>
              </g>
            ))}
          </svg>
        </div>
        <div className="flex flex-col gap-3">
          <Slider label="a" value={a} min={min} max={4} step={0.1} onChange={setA} />
          <Slider label="b" value={b} min={min} max={4} step={0.1} onChange={setB} />
          <Slider label={t.rectangles} value={n} min={1} max={60} step={1} onChange={setN} />
          <div className="flex flex-wrap gap-2">
            {(['gauche', 'milieu', 'droite'] as const).map((m) => (
              <Tab key={m} on={method === m} onClick={() => setMethod(m)}>
                {t.methods[m]}
              </Tab>
            ))}
          </div>
          <dl className="grid grid-cols-2 gap-2">
            <Readout label={t.approx} value={fmt(approx, 4)} />
            <Readout label={t.exact} value={fmt(exact, 4)} strong />
            <Readout label={t.error} value={fmt(Math.abs(approx - exact), 4)} />
          </dl>
          <p className="rounded-xl bg-paper px-3 py-2 text-sm">{t.note}</p>
        </div>
      </div>
      <PredictChallenges challenges={t.challenges.map((ch) => ({ ...ch, choices: [...ch.choices] }))} t={predict} />
    </div>
  );
}
