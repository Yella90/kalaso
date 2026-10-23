'use client';

import { useState } from 'react';
import type { Dictionary } from '@/lib/i18n';
import { fmt, Readout, Slider } from '../Slider';

// Survie relative des génotypes en zone de paludisme (ordre de grandeur).
const FITNESS = { AA: 0.85, AS: 1, SS: 0.2 };
const GENERATIONS = 20;
const W = 340;
const H = 150;

function nextQ(q: number, selection: boolean): number {
  if (!selection) return q;
  const p = 1 - q;
  const mean = p * p * FITNESS.AA + 2 * p * q * FITNESS.AS + q * q * FITNESS.SS;
  return (q * q * FITNESS.SS + p * q * FITNESS.AS) / mean;
}

/** Fréquences de Hardy-Weinberg et effet de la sélection (drépanocytose et paludisme). */
export function HardyWeinbergSim({ t }: { t: Dictionary['sims']['hardy-weinberg'] }) {
  const [q0, setQ0] = useState(0.1);
  const [selection, setSelection] = useState(false);
  const [history, setHistory] = useState<number[] | null>(null);

  const q = history ? history[history.length - 1] : q0;
  const p = 1 - q;
  const bars = [
    { label: 'AA', value: p * p, color: '#4a8fd6' },
    { label: 'AS', value: 2 * p * q, color: '#8e6cc6' },
    { label: 'SS', value: q * q, color: '#e0533d' },
  ];

  function run() {
    const list = history ?? [q0];
    let current = list[list.length - 1];
    const out = [...list];
    for (let g = 0; g < GENERATIONS; g++) {
      current = nextQ(current, selection);
      out.push(current);
    }
    setHistory(out);
  }

  const points = (history ?? [q0]).map((v, i, arr) => {
    const x = arr.length > 1 ? (i / (arr.length - 1)) * (W - 30) + 25 : 25;
    return `${x.toFixed(1)},${(H - 15 - v * (H - 30)).toFixed(1)}`;
  });

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)]">
      <div className="flex flex-col gap-4">
        <div className="rounded-2xl border border-line bg-surface p-4">
          <p className="text-sm font-bold text-muted">{t.genotypes}</p>
          <div className="mt-3 flex h-40 items-end gap-4">
            {bars.map((b) => (
              <div key={b.label} className="flex flex-1 flex-col items-center gap-1">
                <span className="font-serif font-bold tabular-nums">{fmt(b.value * 100, 1)} %</span>
                <div className="w-full rounded-t-lg" style={{ height: `${Math.max(b.value * 104, 2)}px`, background: b.color }} />
                <span className="font-serif text-lg font-bold">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
        {history && history.length > 1 && (
          <div className="rounded-2xl border border-line bg-surface p-2">
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="q">
              <line x1="25" y1={H - 15} x2={W - 5} y2={H - 15} stroke="#1a2340" />
              <line x1="25" y1="15" x2="25" y2={H - 15} stroke="#1a2340" />
              <text x="4" y="20" fontSize="11" fill="#586179">1</text>
              <text x="4" y={H - 12} fontSize="11" fill="#586179">0</text>
              <text x={W - 70} y={H - 2} fontSize="11" fill="#586179">{t.generation}</text>
              <polyline points={points.join(' ')} fill="none" stroke="#e0533d" strokeWidth="2.5" />
            </svg>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <Slider label={t.q} value={q0} min={0} max={1} step={0.01} onChange={(v) => { setQ0(v); setHistory(null); }} />
        <label className="flex items-start gap-3 rounded-xl border-2 border-line p-3">
          <input type="checkbox" checked={selection} onChange={(e) => { setSelection(e.target.checked); setHistory(null); }} className="mt-1 h-5 w-5" />
          <span>
            <span className="font-bold">{t.selection}</span>
            <span className="block text-sm text-muted">{t.selectionNote}</span>
          </span>
        </label>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={run} className="rounded-full bg-ink px-5 py-2 font-bold text-on-ink">
            {t.run}
          </button>
          {history && (
            <button type="button" onClick={() => setHistory(null)} className="rounded-full border-2 border-line px-5 py-2 font-bold">
              {t.reset}
            </button>
          )}
        </div>
        <dl className="grid grid-cols-2 gap-2">
          <Readout label="q (S)" value={fmt(q, 3)} strong />
          <Readout label="p (A)" value={fmt(p, 3)} />
          {history && <Readout label={t.generation} value={String(history.length - 1)} />}
        </dl>
        <p className="text-muted">{selection ? t.equilibrium : t.noSelection}</p>
      </div>
    </div>
  );
}
