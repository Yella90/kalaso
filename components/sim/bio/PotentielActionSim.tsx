'use client';

import { useState } from 'react';
import type { Dictionary } from '@/lib/i18n';
import { Readout, Slider } from '../Slider';

const THRESHOLD = 20;
const W = 340;
const H = 200;
const T_MAX = 50; // ms
const V_MIN = -90;
const V_MAX = 40;
const STIM_START = 5;
const STIM_END = 45;

const toX = (t: number) => 30 + (t / T_MAX) * (W - 40);
const toY = (v: number) => 10 + ((V_MAX - v) / (V_MAX - V_MIN)) * (H - 30);

/** Écart au potentiel de repos d’un potentiel d’action commencé il y a dt ms. */
function spike(dt: number): number {
  if (dt < 0 || dt > 3) return 0;
  if (dt < 0.5) return (dt / 0.5) * 100; // dépolarisation : −70 → +30 mV
  if (dt < 1.5) return 100 - ((dt - 0.5) / 1) * 110; // repolarisation jusqu’à −80 mV
  return -10 + ((dt - 1.5) / 1.5) * 10; // hyperpolarisation, retour à −70 mV
}

/** Potentiels d’action : seuil, tout ou rien, codage de l’intensité en fréquence. */
export function PotentielActionSim({ t }: { t: Dictionary['sims']['potentiel-action'] }) {
  const [intensity, setIntensity] = useState(40);
  const above = intensity >= THRESHOLD;
  // Fréquence croissante avec l’intensité, limitée par la période réfractaire (≈ 2,5 ms).
  const frequency = above ? Math.min(50 + (intensity - THRESHOLD) * 4, 400) : 0;
  const starts: number[] = [];
  if (above) {
    for (let s = STIM_START; s < STIM_END; s += 1000 / frequency) starts.push(s);
  }

  const points: string[] = [];
  for (let k = 0; k <= 500; k++) {
    const time = (k / 500) * T_MAX;
    let v = -70;
    if (above) for (const s of starts) v += spike(time - s);
    else if (time >= STIM_START && time <= STIM_END) v += (intensity / THRESHOLD) * 12 * Math.min(1, (time - STIM_START) / 2);
    points.push(`${toX(time).toFixed(1)},${toY(v).toFixed(1)}`);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)]">
      <div className="rounded-2xl border border-line bg-[#0f172a] p-2">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={t.title}>
          {[30, 0, -70].map((v) => (
            <g key={v}>
              <line x1="30" y1={toY(v).toFixed(1)} x2={W - 10} y2={toY(v).toFixed(1)} stroke="#334155" strokeDasharray={v === -70 ? '4 3' : undefined} />
              <text x="2" y={(toY(v) + 4).toFixed(1)} fontSize="10" fill="#94a3b8">{v}</text>
            </g>
          ))}
          <line x1="30" y1={toY(-70 + 15).toFixed(1)} x2={W - 10} y2={toY(-70 + 15).toFixed(1)} stroke="#f59e0b" strokeDasharray="2 4" />
          <text x={W - 60} y={(toY(-55) - 4).toFixed(1)} fontSize="10" fill="#f59e0b">{t.threshold}</text>
          <rect x={toX(STIM_START).toFixed(1)} y={H - 16} width={(toX(STIM_END) - toX(STIM_START)).toFixed(1)} height="5" fill="#22d3ee" opacity="0.6" />
          <polyline points={points.join(' ')} fill="none" stroke="#4ade80" strokeWidth="1.8" />
          <text x={W - 70} y={H - 2} fontSize="10" fill="#94a3b8">{t.axisTime}</text>
          <text x="32" y="10" fontSize="10" fill="#94a3b8">{t.axisPotential}</text>
        </svg>
      </div>
      <div className="flex flex-col gap-4">
        <Slider label={t.intensity} value={intensity} min={0} max={100} step={1} unit="%" onChange={setIntensity} />
        <p className={above ? 'font-bold' : 'text-muted'}>{above ? t.above : t.below}</p>
        <dl className="grid grid-cols-2 gap-2">
          <Readout label={t.frequency} value={String(Math.round(frequency))} unit="Hz" strong />
          <Readout label={t.count} value={String(starts.length)} />
          <Readout label={t.amplitude} value={above ? '100' : '0'} unit="mV" />
        </dl>
      </div>
    </div>
  );
}
