'use client';

import { useState } from 'react';
import type { Dictionary } from '@/lib/i18n';
import { fmt, Readout, Slider } from '../Slider';
import { usePrefersReducedMotion } from '../usePrefersReducedMotion';

type Factor = 'lumiere' | 'co2' | 'temperature';

/** Vitesse de photosynthèse (bulles de O₂ par minute) selon la lumière, le CO₂ et la température. */
function rate(light: number, co2: number, temp: number): number {
  const pmax = 10 + 50 * (co2 / 100); // plafond fixé par le CO₂
  const lightPart = light / (light + 25); // saturation par la lumière
  let thermal = Math.exp(-(((Math.min(temp, 30) - 30) / 12) ** 2)); // enzymes : optimum vers 30 °C
  if (temp > 35) thermal *= Math.max(0, 1 - (temp - 35) / 10); // dénaturation au-delà
  return pmax * lightPart * thermal;
}

const W = 340;
const H = 150;

/** Facteurs de la photosynthèse chez l’élodée : lumière, dioxyde de carbone, température. */
export function PhotosyntheseSim({ t }: { t: Dictionary['sims']['photosynthese'] }) {
  const [light, setLight] = useState(40);
  const [co2, setCo2] = useState(50);
  const [temp, setTemp] = useState(25);
  const reduced = usePrefersReducedMotion();

  const r = rate(light, co2, temp);
  // Facteur limitant : celui dont une petite hausse augmente le plus la vitesse.
  const gains: Record<Factor, number> = {
    lumiere: rate(Math.min(light + 10, 100), co2, temp) - r,
    co2: rate(light, Math.min(co2 + 10, 100), temp) - r,
    temperature: temp < 30 ? rate(light, co2, Math.min(temp + 5, 30)) - r : temp > 32 ? rate(light, co2, temp - 5) - r : 0,
  };
  const limiting = (Object.keys(gains) as Factor[]).reduce((a, b) => (gains[b] > gains[a] ? b : a));

  const curve = Array.from({ length: 51 }, (_, k) => {
    const l = k * 2;
    return `${(30 + (l / 100) * (W - 40)).toFixed(1)},${(H - 20 - (rate(l, co2, temp) / 60) * (H - 35)).toFixed(1)}`;
  }).join(' ');
  const bubbles = Math.round(r / 6);
  const duration = r > 0.5 ? Math.max(1.2, 6 - r / 12) : 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)]">
      <div className="flex flex-col gap-3">
        <div className="rounded-2xl border border-line bg-[#e8f3fb] p-2">
          <svg viewBox="0 0 340 220" className="w-full" role="img" aria-label={`${fmt(r, 0)} ${t.unit}`}>
            <circle cx="300" cy="35" r={8 + light / 6} fill="#f7c948" opacity={0.3 + light / 150} />
            <rect x="90" y="40" width="160" height="170" rx="10" fill="#cfe8f7" stroke="#6a9fb5" strokeWidth="3" />
            <path d="M170 205 C 165 160, 175 130, 168 90" stroke="#3f7f2a" strokeWidth="5" fill="none" />
            {[100, 120, 140, 160, 180].map((y, i) => (
              <g key={y}>
                <ellipse cx={i % 2 ? 182 : 156} cy={y} rx="14" ry="5" fill="#5fa33d" transform={`rotate(${i % 2 ? -25 : 25} ${i % 2 ? 182 : 156} ${y})`} />
              </g>
            ))}
            {Array.from({ length: bubbles }, (_, k) => (
              <circle key={k} cx={166 + (k % 3) * 3} cy={88 - k * 6} r="3.5" fill="#fff" stroke="#6a9fb5">
                {!reduced && duration > 0 && (
                  <animate attributeName="cy" from="88" to="45" dur={`${duration}s`} begin={`${(k * duration) / Math.max(bubbles, 1)}s`} repeatCount="indefinite" />
                )}
              </circle>
            ))}
          </svg>
        </div>
        <div className="rounded-2xl border border-line bg-surface p-2">
          <p className="px-1 text-xs font-bold text-muted">{t.curve}</p>
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={t.curve}>
            <line x1="30" y1={H - 20} x2={W - 10} y2={H - 20} stroke="#1a2340" />
            <line x1="30" y1="10" x2="30" y2={H - 20} stroke="#1a2340" />
            <polyline points={curve} fill="none" stroke="#3f7f2a" strokeWidth="2.5" />
            <circle cx={(30 + (light / 100) * (W - 40)).toFixed(1)} cy={(H - 20 - (r / 60) * (H - 35)).toFixed(1)} r="5" fill="#e8793a" />
            <text x={W - 60} y={H - 6} fontSize="10" fill="#586179">{t.light}</text>
          </svg>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Slider label={t.light} value={light} min={0} max={100} step={1} unit="%" onChange={setLight} />
        <Slider label={t.co2} value={co2} min={0} max={100} step={1} unit="%" onChange={setCo2} />
        <Slider label={t.temperature} value={temp} min={0} max={45} step={1} unit="°C" onChange={setTemp} />
        <dl className="grid grid-cols-2 gap-2">
          <Readout label={t.rate} value={fmt(r, 0)} unit={t.unit} strong />
          <Readout label={t.limiting} value={t.factors[limiting]} />
        </dl>
      </div>
    </div>
  );
}
