'use client';

import { useState } from 'react';
import type { Dictionary } from '@/lib/i18n';
import { PredictChallenges } from '../PredictChallenges';
import { fmt, Readout } from '../Slider';
import { DragSvg, frame, Grid, Handle, type P } from './kit';

type T = Dictionary['sims']['regression'];
const f = frame({ xmin: 0, xmax: 12, ymin: 0, ymax: 12, w: 460 });

// Exemple : engrais (x, en sacs) et récolte de mil (y, en centaines de kg).
const START: P[] = [[1, 2.5], [2, 3], [3, 4.5], [4, 4.5], [5, 6], [6, 6.5], [7, 7.5], [8, 8.5]];

/** Nuage de points, point moyen et droite des moindres carrés ; on déplace les points. */
export function RegressionSim({ t, predict }: { t: T; predict: Dictionary['lesson']['predict'] }) {
  const [pts, setPts] = useState<P[]>(START);
  const n = pts.length;
  const mx = pts.reduce((s, p) => s + p[0], 0) / n;
  const my = pts.reduce((s, p) => s + p[1], 0) / n;
  const cov = pts.reduce((s, p) => s + (p[0] - mx) * (p[1] - my), 0) / n;
  const vx = pts.reduce((s, p) => s + (p[0] - mx) ** 2, 0) / n;
  const vy = pts.reduce((s, p) => s + (p[1] - my) ** 2, 0) / n;
  const a = vx ? cov / vx : 0;
  const b = my - a * mx;
  const r = vx && vy ? cov / Math.sqrt(vx * vy) : 0;

  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="rounded-2xl border border-line bg-surface p-2">
          <DragSvg f={f} label={t.title} snap={0.5} onDrag={(id, p) => setPts((q) => q.map((x, i) => (String(i) === id ? p : x)))}>
            {(grab) => (
              <>
                <Grid f={f} />
                <line x1={f.X(0)} y1={f.Y(b)} x2={f.X(12)} y2={f.Y(a * 12 + b)} stroke="#dc2626" strokeWidth="2.5" />
                {pts.map((p, i) => (
                  <line key={`r${i}`} x1={f.X(p[0])} y1={f.Y(p[1])} x2={f.X(p[0])} y2={f.Y(a * p[0] + b)} stroke="#f59e0b" strokeDasharray="3 3" />
                ))}
                {pts.map((p, i) => (
                  <Handle key={i} f={f} p={p} color="#1d4ed8" onDown={grab(String(i))} />
                ))}
                <circle cx={f.X(mx)} cy={f.Y(my)} r="7" fill="#16a34a" stroke="#fff" strokeWidth="2" />
                <text x={f.X(mx) + 9} y={f.Y(my) + 18} fontSize="13" fontWeight="700" fill="#16a34a">G</text>
              </>
            )}
          </DragSvg>
          <p className="px-2 pt-1 text-sm text-muted">{t.help}</p>
        </div>
        <div className="flex flex-col gap-3">
          <dl className="grid grid-cols-2 gap-2">
            <Readout label={t.mean} value={`(${fmt(mx, 2)} ; ${fmt(my, 2)})`} />
            <Readout label="cov(x, y)" value={fmt(cov, 3)} />
            <Readout label="a" value={fmt(a, 3)} strong />
            <Readout label="b" value={fmt(b, 3)} strong />
            <Readout label="r" value={fmt(r, 3)} />
            <Readout label={t.estimate} value={fmt(a * 10 + b, 2)} />
          </dl>
          <p className="rounded-xl bg-ink px-4 py-3 font-serif text-lg text-on-ink">y = {fmt(a, 3)} x {b < 0 ? '−' : '+'} {fmt(Math.abs(b), 3)}</p>
          <p className="rounded-xl bg-paper px-3 py-2 text-sm">{Math.abs(r) > 0.87 ? t.strong : Math.abs(r) > 0.5 ? t.medium : t.weak}</p>
          <button type="button" onClick={() => setPts(START)} className="self-start text-sm underline">
            {t.reset}
          </button>
        </div>
      </div>
      <PredictChallenges challenges={t.challenges.map((ch) => ({ ...ch, choices: [...ch.choices] }))} t={predict} />
    </div>
  );
}
