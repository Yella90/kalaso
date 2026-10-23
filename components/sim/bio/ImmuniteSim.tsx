'use client';

import { useState } from 'react';
import type { Dictionary } from '@/lib/i18n';
import { fmt, Readout, Slider } from '../Slider';

type First = 'maladie' | 'vaccin';

const DAYS = 80;
const W = 340;
const H = 190;
// Échelle logarithmique : de 0,1 à 1 000 unités d’anticorps.
const LOG_MIN = -1;
const LOG_MAX = 3;
const toX = (d: number) => 34 + (d / DAYS) * (W - 44);
const toY = (a: number) => 10 + ((LOG_MAX - Math.log10(Math.max(a, 0.1))) / (LOG_MAX - LOG_MIN)) * (H - 32);

/** Réponse : rien avant le délai, montée jusqu’au pic, puis lente décroissance vers un niveau résiduel. */
function response(day: number, start: number, rise: number, peak: number, decay: number, residual: number) {
  const x = day - start;
  if (x < 0) return 0;
  if (x < rise) return peak * (x / rise) ** 2;
  return residual + (peak - residual) * Math.exp(-(x - rise) / decay);
}

/** Réponses immunitaires primaire et secondaire, vaccin et sérum. */
export function ImmuniteSim({ t }: { t: Dictionary['sims']['immunite'] }) {
  const [second, setSecond] = useState(40);
  const [first, setFirst] = useState<First>('maladie');
  const [serum, setSerum] = useState(false);

  const primaryPeak = first === 'vaccin' ? 6 : 10;
  const secondaryPeak = 250;
  const antibodies = (d: number) =>
    response(d, 5, 9, primaryPeak, 10, 1) + response(d, second + 2, 4, secondaryPeak, 25, 20);
  const serumLevel = (d: number) => 60 * Math.exp(-d / 10);

  const curve = (f: (d: number) => number) =>
    Array.from({ length: DAYS + 1 }, (_, d) => `${toX(d).toFixed(1)},${toY(f(d)).toFixed(1)}`).join(' ');

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)]">
      <div className="rounded-2xl border border-line bg-surface p-2">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={t.title}>
          {[0.1, 1, 10, 100, 1000].map((a) => (
            <g key={a}>
              <line x1="34" y1={toY(a).toFixed(1)} x2={W - 10} y2={toY(a).toFixed(1)} stroke="#e3e7ef" />
              <text x="2" y={(toY(a) + 4).toFixed(1)} fontSize="10" fill="#586179">{a}</text>
            </g>
          ))}
          {[0, 20, 40, 60, 80].map((d) => (
            <text key={d} x={(toX(d) - 5).toFixed(1)} y={H - 6} fontSize="10" fill="#586179">{d}</text>
          ))}
          <line x1={toX(0).toFixed(1)} y1="10" x2={toX(0).toFixed(1)} y2={H - 22} stroke="#e8793a" strokeDasharray="3 3" />
          <line x1={toX(second).toFixed(1)} y1="10" x2={toX(second).toFixed(1)} y2={H - 22} stroke="#e0533d" strokeDasharray="3 3" />
          {serum && <polyline points={curve(serumLevel)} fill="none" stroke="#8e6cc6" strokeWidth="2" strokeDasharray="5 4" />}
          <polyline points={curve(antibodies)} fill="none" stroke="#2f6fd6" strokeWidth="2.5" />
          <text x={W - 50} y={H - 18} fontSize="10" fill="#586179">{t.axisTime}</text>
        </svg>
      </div>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-2" role="group" aria-label={t.first}>
          {(['maladie', 'vaccin'] as First[]).map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={first === f}
              onClick={() => setFirst(f)}
              className={`rounded-lg border-2 px-2 py-2 text-sm font-bold ${first === f ? 'border-ink bg-ink text-on-ink' : 'border-line bg-surface'}`}
            >
              {t.firsts[f]}
            </button>
          ))}
        </div>
        <Slider label={t.second} value={second} min={20} max={60} step={1} onChange={setSecond} />
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={serum} onChange={(e) => setSerum(e.target.checked)} className="h-5 w-5" />
          {t.serum}
        </label>
        {serum && <p className="text-sm text-muted">{t.serumNote}</p>}
        <dl className="grid grid-cols-2 gap-2">
          <Readout label={t.primaryPeak} value={fmt(primaryPeak)} />
          <Readout label={t.secondaryPeak} value={fmt(secondaryPeak)} strong />
          <Readout label={t.ratio} value={`× ${fmt(secondaryPeak / primaryPeak, 0)}`} />
        </dl>
      </div>
    </div>
  );
}
