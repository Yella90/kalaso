'use client';

import { useState } from 'react';
import type { Dictionary } from '@/lib/i18n';
import { fmt, Readout, Slider } from '../Slider';

type Cell = 'animale' | 'vegetale';

const INSIDE = 9; // g/L de NaCl : concentration équivalente du contenu cellulaire
const LYSIS = 4.5; // en dessous, le globule rouge éclate

const r2 = (v: number) => Math.round(v * 100) / 100;

/** Contour d’un globule ratatiné : un cercle aux bords dentelés. */
function crenated(cx: number, cy: number, r: number, depth: number) {
  const points: string[] = [];
  for (let k = 0; k < 48; k++) {
    const a = (k / 48) * 2 * Math.PI;
    const rr = r - (k % 2 ? depth : 0);
    points.push(`${r2(cx + rr * Math.cos(a))},${r2(cy + rr * Math.sin(a))}`);
  }
  return points.join(' ');
}

/** Flèches d’eau, vers la cellule (entrée) ou vers l’extérieur (sortie). */
function Arrows({ dir }: { dir: 1 | -1 | 0 }) {
  if (dir === 0) return null;
  const angles = [0, 60, 120, 180, 240, 300];
  return (
    <g stroke="#2a7fc4" strokeWidth="3" fill="#2a7fc4">
      {angles.map((deg) => {
        const a = (deg * Math.PI) / 180;
        const outer = 150;
        const inner = 118;
        const [from, to] = dir === 1 ? [outer, inner] : [inner, outer];
        const x1 = r2(170 + from * Math.cos(a));
        const y1 = r2(150 + from * Math.sin(a));
        const x2 = r2(170 + to * Math.cos(a));
        const y2 = r2(150 + to * Math.sin(a));
        const hx = r2(x2 - 8 * Math.cos(a) * dir);
        const hy = r2(y2 - 8 * Math.sin(a) * dir);
        return (
          <g key={deg}>
            <line x1={x1} y1={y1} x2={hx} y2={hy} />
            <circle cx={x2} cy={y2} r="4" stroke="none" />
          </g>
        );
      })}
    </g>
  );
}

/** Osmose : un globule rouge ou une cellule végétale dans une eau plus ou moins salée. */
export function OsmoseSim({ t }: { t: Dictionary['sims']['osmose'] }) {
  const [cell, setCell] = useState<Cell>('animale');
  const [salt, setSalt] = useState(9);

  const medium = salt < INSIDE - 0.4 ? 'hypo' : salt > INSIDE + 0.4 ? 'hyper' : 'iso';
  const dir: 1 | -1 | 0 = medium === 'hypo' ? 1 : medium === 'hyper' ? -1 : 0;
  // Volume relatif : l’eau entre ou sort jusqu’à égaliser les concentrations (modèle simplifié).
  const ratio = INSIDE / Math.max(salt, 0.5);

  let state: keyof Dictionary['sims']['osmose']['states'];
  let volume: number;
  if (cell === 'animale') {
    volume = Math.min(ratio, 2);
    state = salt < LYSIS ? 'hemolyse' : medium === 'hypo' ? 'gonflee' : medium === 'hyper' ? 'crenelee' : 'normale';
  } else {
    // La paroi empêche la cellule de gonfler : seule la vacuole se rétracte en milieu hypertonique.
    volume = Math.min(ratio, 1);
    state = medium === 'hyper' ? 'plasmolysee' : medium === 'hypo' ? 'turgescente' : 'normale';
  }

  const radius = r2(70 * Math.cbrt(volume));

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)]">
      <div className="rounded-2xl border border-line bg-[#e8f3fb] p-2">
        <svg viewBox="0 0 340 300" className="w-full" role="img" aria-label={`${t.state} ${t.states[state]}`}>
          {cell === 'animale' ? (
            state === 'hemolyse' ? (
              <g>
                {[0, 1, 2, 3, 4, 5].map((k) => {
                  const a = (k / 6) * 2 * Math.PI + 0.3;
                  return (
                    <path
                      key={k}
                      d={`M${r2(170 + 95 * Math.cos(a))} ${r2(150 + 95 * Math.sin(a))} q ${r2(20 * Math.cos(a + 1.2))} ${r2(20 * Math.sin(a + 1.2))} ${r2(40 * Math.cos(a + 0.6))} ${r2(40 * Math.sin(a + 0.6))}`}
                      fill="none"
                      stroke="#c0392b"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                  );
                })}
                <circle cx="170" cy="150" r="80" fill="#f6c1b8" opacity="0.35" />
              </g>
            ) : state === 'crenelee' ? (
              <polygon points={crenated(170, 150, radius, Math.min(10, (salt - INSIDE) * 1.2))} fill="#e74c3c" stroke="#a93226" strokeWidth="3" />
            ) : (
              <g>
                <circle cx="170" cy="150" r={radius} fill="#e74c3c" stroke="#a93226" strokeWidth="3" />
                <ellipse cx="170" cy="150" rx={r2(radius * 0.45)} ry={r2(radius * 0.3)} fill="#c0392b" opacity="0.5" />
              </g>
            )
          ) : (
            <g>
              <rect x="60" y="45" width="220" height="210" rx="14" fill="#d9f2c7" stroke="#4d8c2a" strokeWidth="6" />
              {(() => {
                const s = Math.sqrt(volume);
                const w = r2(204 * s);
                const h = r2(194 * s);
                return (
                  <g>
                    <rect x={r2(170 - w / 2)} y={r2(150 - h / 2)} width={w} height={h} rx="16" fill="#9ed36a" stroke="#2f6b12" strokeWidth="2" />
                    <rect x={r2(170 - w / 2 + 18)} y={r2(150 - h / 2 + 18)} width={r2(Math.max(w - 36, 10))} height={r2(Math.max(h - 36, 10))} rx="12" fill="#c8e7f6" stroke="#6a9fb5" strokeWidth="1.5" />
                    <circle cx={r2(170 - w / 2 + 30)} cy={r2(150 - h / 2 + 30)} r="11" fill="#7d5ba6" />
                  </g>
                );
              })()}
            </g>
          )}
          <Arrows dir={state === 'hemolyse' ? 0 : dir} />
        </svg>
      </div>

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-2">
          {(['animale', 'vegetale'] as Cell[]).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={cell === c}
              onClick={() => setCell(c)}
              className={`rounded-lg border-2 px-2 py-2 text-sm font-bold ${cell === c ? 'border-ink bg-ink text-on-ink' : 'border-line bg-surface'}`}
            >
              {t.cells[c]}
            </button>
          ))}
        </div>
        <Slider label={t.outside} value={salt} min={0} max={30} step={0.5} unit="g/L" onChange={setSalt} />
        <p className="text-sm text-muted">{t.inside}</p>
        <dl className="grid grid-cols-2 gap-2">
          <Readout label={t.medium} value={t.media[medium]} strong />
          <Readout label={t.water} value={dir === 1 ? t.waterIn : dir === -1 ? t.waterOut : t.waterNone} />
          <Readout label={t.state} value={t.states[state]} />
          <Readout label={t.volume} value={state === 'hemolyse' ? '—' : `${fmt(volume * 100, 0)} %`} />
        </dl>
      </div>
    </div>
  );
}
