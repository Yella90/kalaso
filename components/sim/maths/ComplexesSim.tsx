'use client';

import { useState } from 'react';
import type { Dictionary } from '@/lib/i18n';
import { PredictChallenges } from '../PredictChallenges';
import { fmt, Readout, Slider } from '../Slider';
import { DragSvg, frame, Grid, Handle, Tab, type P } from './kit';

type T = Dictionary['sims']['complexes'];
type Mode = 'somme' | 'produit' | 'puissances' | 'racines';
const f = frame({ xmin: -6, xmax: 6, ymin: -6, ymax: 6, w: 440 });

const mod = (z: P) => Math.hypot(z[0], z[1]);
const arg = (z: P) => (Math.atan2(z[1], z[0]) * 180) / Math.PI;
const mul = (a: P, b: P): P => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
const txt = (z: P) => {
  const re = fmt(Math.abs(z[0]) < 1e-9 ? 0 : z[0], 2);
  const im = Math.abs(z[1]) < 1e-9 ? 0 : z[1];
  return `${re} ${im < 0 ? '−' : '+'} ${fmt(Math.abs(im), 2)} i`;
};

function Vec({ z, from = [0, 0], color, label }: { z: P; from?: P; color: string; label: string }) {
  return (
    <g>
      <line x1={f.X(from[0])} y1={f.Y(from[1])} x2={f.X(z[0])} y2={f.Y(z[1])} stroke={color} strokeWidth="3" />
      <circle cx={f.X(z[0])} cy={f.Y(z[1])} r="5" fill={color} />
      <text x={f.X(z[0]) + 8} y={f.Y(z[1]) - 8} fontSize="14" fontWeight="700" fill={color}>
        {label}
      </text>
    </g>
  );
}

/** Nombres complexes dans le plan : somme, produit (rotation et agrandissement), puissances, racines n-ièmes. */
export function ComplexesSim({ t, predict }: { t: T; predict: Dictionary['lesson']['predict'] }) {
  const [mode, setMode] = useState<Mode>('produit');
  const [z, setZ] = useState<P>([2, 1]);
  const [w, setW] = useState<P>([1, 1]);
  const [n, setN] = useState(5);
  const snap = 0.5;

  const sum: P = [z[0] + w[0], z[1] + w[1]];
  const prod = mul(z, w);
  const powers: P[] = [[1, 0]];
  for (let k = 1; k <= n; k++) powers.push(mul(powers[k - 1], z));
  const roots: P[] = Array.from({ length: n }, (_, k) => [Math.cos((2 * Math.PI * k) / n), Math.sin((2 * Math.PI * k) / n)].map((v) => v * 3) as P);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-2">
        {(['somme', 'produit', 'puissances', 'racines'] as Mode[]).map((k) => (
          <Tab key={k} on={mode === k} onClick={() => setMode(k)}>
            {t.modes[k]}
          </Tab>
        ))}
      </div>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="rounded-2xl border border-line bg-surface p-2">
          <DragSvg f={f} label={t.title} snap={snap} onDrag={(id, p) => (id === 'z' ? setZ(p) : setW(p))}>
            {(grab) => (
              <>
                <Grid f={f} />
                <text x={f.w - 6} y={f.Y(0) - 6} fontSize="11" textAnchor="end" fill="#64748b">Re</text>
                <text x={f.X(0) + 6} y="12" fontSize="11" fill="#64748b">Im</text>
                {mode === 'racines' && (
                  <>
                    <circle cx={f.X(0)} cy={f.Y(0)} r={3 * f.s} fill="none" stroke="#cbd5e1" strokeDasharray="4 4" />
                    <polygon points={roots.map((r) => `${f.X(r[0])},${f.Y(r[1])}`).join(' ')} fill="#fde68a" fillOpacity="0.5" stroke="#b45309" strokeWidth="2" />
                    {roots.map((r, k) => (
                      <circle key={k} cx={f.X(r[0])} cy={f.Y(r[1])} r="6" fill="#b45309" />
                    ))}
                  </>
                )}
                {mode === 'somme' && (
                  <>
                    <line x1={f.X(z[0])} y1={f.Y(z[1])} x2={f.X(sum[0])} y2={f.Y(sum[1])} stroke="#2563eb" strokeDasharray="5 4" />
                    <line x1={f.X(w[0])} y1={f.Y(w[1])} x2={f.X(sum[0])} y2={f.Y(sum[1])} stroke="#dc2626" strokeDasharray="5 4" />
                    <Vec z={sum} color="#16a34a" label="z + w" />
                  </>
                )}
                {mode === 'produit' && Math.abs(prod[0]) <= 6 && Math.abs(prod[1]) <= 6 && <Vec z={prod} color="#16a34a" label="z·w" />}
                {mode === 'puissances' &&
                  powers.map((p, k) =>
                    Math.abs(p[0]) <= 6 && Math.abs(p[1]) <= 6 ? (
                      <g key={k}>
                        {k > 0 && <line x1={f.X(powers[k - 1][0])} y1={f.Y(powers[k - 1][1])} x2={f.X(p[0])} y2={f.Y(p[1])} stroke="#a855f7" strokeWidth="1.5" />}
                        <circle cx={f.X(p[0])} cy={f.Y(p[1])} r="5" fill="#a855f7" />
                        <text x={f.X(p[0]) + 7} y={f.Y(p[1]) + 14} fontSize="11" fill="#7e22ce">z{'⁰¹²³⁴⁵⁶⁷⁸⁹'[k] ?? k}</text>
                      </g>
                    ) : null,
                  )}
                {mode !== 'racines' && (
                  <>
                    <Vec z={z} color="#dc2626" label="z" />
                    <Handle f={f} p={z} color="#dc2626" onDown={grab('z')} />
                    {(mode === 'somme' || mode === 'produit') && (
                      <>
                        <Vec z={w} color="#2563eb" label="w" />
                        <Handle f={f} p={w} color="#2563eb" onDown={grab('w')} />
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </DragSvg>
        </div>
        <div className="flex flex-col gap-3">
          {mode !== 'racines' ? (
            <dl className="grid grid-cols-1 gap-2">
              <Readout label="z" value={txt(z)} />
              <Readout label={t.modArg + ' z'} value={`${fmt(mod(z), 3)} ; ${fmt(arg(z), 1)}°`} />
              {(mode === 'somme' || mode === 'produit') && <Readout label="w" value={txt(w)} />}
              {(mode === 'somme' || mode === 'produit') && <Readout label={t.modArg + ' w'} value={`${fmt(mod(w), 3)} ; ${fmt(arg(w), 1)}°`} />}
              {mode === 'somme' && <Readout label="z + w" value={txt(sum)} strong />}
              {mode === 'produit' && <Readout label="z · w" value={txt(prod)} strong />}
              {mode === 'produit' && <Readout label={t.modArg + ' z·w'} value={`${fmt(mod(prod), 3)} ; ${fmt(arg(prod), 1)}°`} />}
              {mode === 'puissances' && <Readout label={`z^${n}`} value={txt(powers[n])} strong />}
            </dl>
          ) : (
            <p className="rounded-xl bg-paper px-3 py-2 text-sm">{t.rootsText}</p>
          )}
          {(mode === 'puissances' || mode === 'racines') && <Slider label="n" value={n} min={2} max={10} step={1} onChange={setN} />}
          <p className="rounded-xl bg-paper px-3 py-2 text-sm">{t.notes[mode]}</p>
        </div>
      </div>
      <PredictChallenges challenges={t.challenges.map((ch) => ({ ...ch, choices: [...ch.choices] }))} t={predict} />
    </div>
  );
}
