'use client';

import { useState } from 'react';
import type { Dictionary } from '@/lib/i18n';
import { PredictChallenges } from '../PredictChallenges';
import { fmt, Readout, Slider } from '../Slider';
import { frame, Grid } from './kit';

type T = Dictionary['sims']['coniques'];
const f = frame({ xmin: -8, xmax: 8, ymin: -6, ymax: 6, w: 520 });

/**
 * Conique définie par un foyer F(c ; 0), sa directrice x = d et son excentricité e :
 * MF = e × distance(M, directrice). Ellipse si e < 1, parabole si e = 1, hyperbole si e > 1.
 */
export function ConiquesSim({ t, predict }: { t: T; predict: Dictionary['lesson']['predict'] }) {
  const [e, setE] = useState(0.6);
  const [p, setP] = useState(3); // distance foyer–directrice
  const [theta, setTheta] = useState(60);

  // Équation polaire de foyer F à l’origine, directrice x = p : r = e·p / (1 + e cos θ).
  const F: [number, number] = [0, 0];
  const point = (deg: number) => {
    const th = (deg * Math.PI) / 180;
    const r = (e * p) / (1 + e * Math.cos(th));
    return r > 0 && r < 60 ? ([r * Math.cos(th), r * Math.sin(th)] as [number, number]) : null;
  };
  const branch: string[] = [];
  let pen = false;
  for (let k = 0; k <= 720; k++) {
    const q = point(k / 2);
    if (q && Math.abs(q[0]) < 30 && Math.abs(q[1]) < 30) {
      branch.push(`${pen ? 'L' : 'M'}${f.X(q[0]).toFixed(1)} ${f.Y(q[1]).toFixed(1)}`);
      pen = true;
    } else pen = false;
  }
  const M = point(theta);
  const kind = e < 0.999 ? t.ellipse : e <= 1.001 ? t.parabola : t.hyperbola;
  const MF = M ? Math.hypot(M[0], M[1]) : NaN;
  const MD = M ? Math.abs(p - M[0]) : NaN;

  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="rounded-2xl border border-line bg-surface p-2">
          <svg viewBox={`0 0 ${f.w} ${f.h}`} className="h-auto w-full" role="img" aria-label={t.title}>
            <Grid f={f} />
            <line x1={f.X(p)} x2={f.X(p)} y1="0" y2={f.h} stroke="#7c3aed" strokeWidth="2.5" />
            <text x={f.X(p) + 6} y="16" fontSize="12" fontWeight="700" fill="#7c3aed">{t.directrix}</text>
            <path d={branch.join(' ')} fill="none" stroke="#dc2626" strokeWidth="3" />
            <circle cx={f.X(F[0])} cy={f.Y(F[1])} r="6" fill="#0f172a" />
            <text x={f.X(F[0]) - 8} y={f.Y(F[1]) + 20} fontSize="13" fontWeight="700">F</text>
            {M && (
              <g>
                <line x1={f.X(M[0])} y1={f.Y(M[1])} x2={f.X(0)} y2={f.Y(0)} stroke="#16a34a" strokeWidth="2" />
                <line x1={f.X(M[0])} y1={f.Y(M[1])} x2={f.X(p)} y2={f.Y(M[1])} stroke="#f59e0b" strokeWidth="2" />
                <circle cx={f.X(M[0])} cy={f.Y(M[1])} r="7" fill="#dc2626" stroke="#fff" strokeWidth="2" />
                <text x={f.X(M[0]) + 9} y={f.Y(M[1]) - 9} fontSize="13" fontWeight="700" fill="#dc2626">M</text>
              </g>
            )}
          </svg>
        </div>
        <div className="flex flex-col gap-3">
          <Slider label={t.eccentricity} value={e} min={0.1} max={2} step={0.05} onChange={setE} />
          <Slider label={t.distance} value={p} min={1} max={6} step={0.5} onChange={setP} />
          <Slider label={t.pointM} value={theta} min={0} max={359} step={1} unit="°" onChange={setTheta} />
          <p className="rounded-xl bg-ink px-4 py-3 font-serif text-xl text-on-ink">{kind}</p>
          <dl className="grid grid-cols-2 gap-2">
            <Readout label="MF" value={M ? fmt(MF, 2) : '—'} />
            <Readout label={t.md} value={M ? fmt(MD, 2) : '—'} />
            <Readout label="MF ÷ MD" value={M ? fmt(MF / MD, 3) : '—'} strong />
          </dl>
          <p className="text-sm text-muted">{t.note}</p>
        </div>
      </div>
      <PredictChallenges challenges={t.challenges.map((ch) => ({ ...ch, choices: [...ch.choices] }))} t={predict} />
    </div>
  );
}
