'use client';

import { useRef, useState } from 'react';
import type { Dictionary } from '@/lib/i18n';
import { PredictChallenges } from '../PredictChallenges';
import { fmt, Readout, Slider } from '../Slider';

type T = Dictionary['sims']['statistique'];

const PRESETS: Record<'notes' | 'egales' | 'dispersees', number[]> = {
  notes: [8, 12, 10, 15, 9, 12, 14, 11, 7, 12, 13, 10, 6, 16, 11],
  egales: [10, 10, 11, 10, 9, 10, 11, 9, 10, 10],
  dispersees: [2, 18, 5, 15, 3, 19, 8, 12, 1, 17],
};

const W = 600;
const H = 220;
const X = (v: number) => 30 + (v / 20) * (W - 60);
const BASE = 150;

function quantile(sorted: number[], q: number) {
  // Quartiles « à la française » : première valeur dont le rang dépasse q × N.
  const n = sorted.length;
  return sorted[Math.max(0, Math.ceil(q * n) - 1)];
}

/** Série statistique : nuage de points modifiable, moyenne, médiane, quartiles, écart type, histogramme. */
export function StatistiqueSim({ t, predict }: { t: T; predict: Dictionary['lesson']['predict'] }) {
  const [data, setData] = useState<number[]>(PRESETS.notes);
  const [width, setWidth] = useState(4);
  const svg = useRef<SVGSVGElement>(null);

  const n = data.length;
  const sorted = [...data].sort((a, b) => a - b);
  const mean = n ? data.reduce((s, v) => s + v, 0) / n : 0;
  const median = n ? (n % 2 ? sorted[(n - 1) / 2] : (sorted[n / 2 - 1] + sorted[n / 2]) / 2) : 0;
  const counts = new Map<number, number>();
  data.forEach((v) => counts.set(v, (counts.get(v) ?? 0) + 1));
  const maxCount = Math.max(0, ...counts.values());
  const modes = [...counts.entries()].filter(([, c]) => c === maxCount).map(([v]) => v).sort((a, b) => a - b);
  const variance = n ? data.reduce((s, v) => s + (v - mean) ** 2, 0) / n : 0;
  const sd = Math.sqrt(variance);
  const q1 = n ? quantile(sorted, 0.25) : 0;
  const q3 = n ? quantile(sorted, 0.75) : 0;

  function add(e: React.MouseEvent) {
    const el = svg.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const v = Math.round((((e.clientX - r.left) / r.width) * W - 30) / ((W - 60) / 20));
    if (v >= 0 && v <= 20) setData((d) => [...d, v]);
  }
  function remove(v: number) {
    setData((d) => {
      const i = d.lastIndexOf(v);
      return i < 0 ? d : [...d.slice(0, i), ...d.slice(i + 1)];
    });
  }

  // Histogramme par classes de largeur choisie.
  const classes = Array.from({ length: Math.ceil(21 / width) }, (_, i) => {
    const lo = i * width;
    const hi = Math.min(21, lo + width);
    return { lo, hi, n: data.filter((v) => v >= lo && v < hi).length };
  });
  const hmax = Math.max(1, ...classes.map((c) => c.n));

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-2">
        {(Object.keys(PRESETS) as (keyof typeof PRESETS)[]).map((p) => (
          <button key={p} type="button" onClick={() => setData(PRESETS[p])} className="rounded-full border-2 border-line bg-surface px-3 py-1 text-sm font-bold hover:border-ink">
            {t.presets[p]}
          </button>
        ))}
        <button type="button" onClick={() => setData((d) => [...d, 20])} className="rounded-full border-2 border-line bg-surface px-3 py-1 text-sm font-bold hover:border-ink">
          {t.addExtreme}
        </button>
        <button type="button" onClick={() => setData([])} className="text-sm text-muted underline">
          {t.clear}
        </button>
      </div>

      <div className="rounded-2xl border border-line bg-surface p-2">
        <svg ref={svg} viewBox={`0 0 ${W} ${H}`} className="h-auto w-full select-none" role="img" aria-label={t.title}>
          <rect x="0" y="0" width={W} height={BASE + 10} fill="transparent" onClick={add} style={{ cursor: 'copy' }} />
          <line x1={X(0)} x2={X(20)} y1={BASE} y2={BASE} stroke="#1e293b" strokeWidth="2" />
          {Array.from({ length: 21 }, (_, v) => (
            <g key={v}>
              <line x1={X(v)} x2={X(v)} y1={BASE} y2={BASE + 6} stroke="#1e293b" />
              {v % 2 === 0 && <text x={X(v)} y={BASE + 20} fontSize="11" textAnchor="middle" fill="#475569">{v}</text>}
            </g>
          ))}
          {/* Points empilés : un point par valeur. */}
          {[...counts.entries()].map(([v, c]) =>
            Array.from({ length: c }, (_, k) => (
              <circle key={`${v}-${k}`} cx={X(v)} cy={BASE - 9 - k * 14} r="6" fill="#2563eb" onClick={() => remove(v)} style={{ cursor: 'pointer' }} />
            )),
          )}
          {n > 0 && (
            <g>
              {/* Boîte à moustaches. */}
              <line x1={X(sorted[0])} x2={X(sorted[n - 1])} y1={BASE + 44} y2={BASE + 44} stroke="#475569" />
              <rect x={X(q1)} y={BASE + 34} width={Math.max(1, X(q3) - X(q1))} height="20" fill="#e0e7ff" stroke="#4338ca" />
              <line x1={X(median)} x2={X(median)} y1={BASE + 34} y2={BASE + 54} stroke="#16a34a" strokeWidth="3" />
              <line x1={X(median)} x2={X(median)} y1="10" y2={BASE} stroke="#16a34a" strokeWidth="2" strokeDasharray="4 4" />
              <path d={`M${X(mean)} ${BASE + 2} l -7 12 h 14 Z`} fill="#dc2626" />
              <text x={X(mean)} y="14" fontSize="11" fontWeight="700" textAnchor="middle" fill="#dc2626">x̄</text>
            </g>
          )}
        </svg>
        <p className="px-2 text-sm text-muted">{t.help}</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <dl className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          <Readout label={t.count} value={String(n)} />
          <Readout label={t.mean} value={fmt(mean, 2)} strong />
          <Readout label={t.median} value={fmt(median, 1)} />
          <Readout label={t.mode} value={modes.length > 3 ? '—' : modes.join(' ; ')} />
          <Readout label={t.range} value={n ? fmt(sorted[n - 1] - sorted[0], 0) : '0'} />
          <Readout label={t.sd} value={fmt(sd, 2)} />
          <Readout label="Q1" value={fmt(q1, 0)} />
          <Readout label="Q3" value={fmt(q3, 0)} />
        </dl>
        <div className="rounded-2xl border border-line bg-surface p-3">
          <p className="text-sm font-bold text-muted">{t.histogram}</p>
          <svg viewBox="0 0 300 130" className="h-auto w-full" role="img" aria-label={t.histogram}>
            {classes.map((c, i) => {
              const x0 = 10 + (c.lo / 21) * 280;
              const w = ((c.hi - c.lo) / 21) * 280;
              const h = (c.n / hmax) * 100;
              return (
                <g key={i}>
                  <rect x={x0} y={110 - h} width={w - 1} height={h} fill="#f59e0b" />
                  <text x={x0 + w / 2} y={106 - h} fontSize="10" textAnchor="middle" fill="currentColor">{c.n || ''}</text>
                  <text x={x0} y="124" fontSize="9" fill="#64748b">{c.lo}</text>
                </g>
              );
            })}
          </svg>
          <Slider label={t.classWidth} value={width} min={1} max={7} step={1} onChange={setWidth} />
        </div>
      </div>
      <PredictChallenges challenges={t.challenges.map((c) => ({ ...c, choices: [...c.choices] }))} t={predict} />
    </div>
  );
}
