'use client';

import { useState } from 'react';
import type { Dictionary } from '@/lib/i18n';
import { PredictChallenges } from '../PredictChallenges';
import { fmt, Readout } from '../Slider';
import { DragSvg, dist, frame, Grid, Handle, type P } from './kit';

type T = Dictionary['sims']['pythagore'];
const f = frame({ xmin: -8, xmax: 10, ymin: -7, ymax: 11, w: 540 });

/** Carré construit vers l’extérieur du triangle sur le côté [pq]. */
function square(p: P, q: P, g: P): P[] {
  const dx = q[0] - p[0];
  const dy = q[1] - p[1];
  let n: P = [-dy, dx];
  const mid: P = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
  if ((g[0] - mid[0]) * n[0] + (g[1] - mid[1]) * n[1] > 0) n = [dy, -dx];
  return [p, q, [q[0] + n[0], q[1] + n[1]], [p[0] + n[0], p[1] + n[1]]];
}

/** Théorème de Pythagore : les carrés construits sur les côtés d’un triangle. */
export function PythagoreSim({ t, predict }: { t: T; predict: Dictionary['lesson']['predict'] }) {
  const [A, setA] = useState<P>([4, 0]);
  const [B, setB] = useState<P>([0, 3]);
  const [C, setC] = useState<P>([0, 0]);
  const [free, setFree] = useState(false);

  const g: P = [(A[0] + B[0] + C[0]) / 3, (A[1] + B[1] + C[1]) / 3];
  const a = dist(B, C);
  const b = dist(A, C);
  const c = dist(A, B);
  const cosC = (a * a + b * b - c * c) / (2 * a * b || 1);
  const angleC = (Math.acos(Math.max(-1, Math.min(1, cosC))) * 180) / Math.PI;
  const right = Math.abs(a * a + b * b - c * c) < 1e-6;
  const poly = (q: P[]) => q.map((p) => `${f.X(p[0])},${f.Y(p[1])}`).join(' ');

  function drag(id: string, p: P) {
    if (!free) {
      // Triangle rectangle en C : A reste sur l’axe horizontal, B sur l’axe vertical.
      if (id === 'A') setA([p[0] === 0 ? 1 : p[0], 0]);
      if (id === 'B') setB([0, p[1] === 0 ? 1 : p[1]]);
      return;
    }
    if (id === 'A') setA(p);
    if (id === 'B') setB(p);
    if (id === 'C') setC(p);
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="rounded-2xl border border-line bg-surface p-2">
          <DragSvg f={f} label={t.title} onDrag={drag}>
            {(grab) => (
              <>
                <Grid f={f} axes={false} />
                <polygon points={poly(square(B, C, g))} fill="#3b82f6" fillOpacity="0.35" stroke="#1d4ed8" strokeWidth="2" />
                <polygon points={poly(square(A, C, g))} fill="#22c55e" fillOpacity="0.35" stroke="#15803d" strokeWidth="2" />
                <polygon points={poly(square(A, B, g))} fill="#f59e0b" fillOpacity="0.35" stroke="#b45309" strokeWidth="2" />
                <polygon points={poly([A, B, C])} fill="#fff" stroke="#0f172a" strokeWidth="2.5" />
                {right && (
                  <path
                    d={`M${f.X(C[0] + 0.6 * Math.sign(A[0] - C[0] || 1))} ${f.Y(C[1])} v ${-f.s * 0.6 * Math.sign(B[1] - C[1] || 1)} h ${-f.s * 0.6 * Math.sign(A[0] - C[0] || 1)}`}
                    fill="none"
                    stroke="#0f172a"
                    strokeWidth="1.5"
                  />
                )}
                {[
                  { q: square(B, C, g), v: a * a, c: '#1d4ed8' },
                  { q: square(A, C, g), v: b * b, c: '#15803d' },
                  { q: square(A, B, g), v: c * c, c: '#b45309' },
                ].map(({ q, v, c: col }, i) => {
                  const cx = (q[0][0] + q[2][0]) / 2;
                  const cy = (q[0][1] + q[2][1]) / 2;
                  return (
                    <text key={i} x={f.X(cx)} y={f.Y(cy) + 5} fontSize="15" fontWeight="700" textAnchor="middle" fill={col}>
                      {fmt(v, 1)}
                    </text>
                  );
                })}
                <Handle f={f} p={A} color="#0f172a" onDown={grab('A')} label="A" />
                <Handle f={f} p={B} color="#0f172a" onDown={grab('B')} label="B" />
                {free ? <Handle f={f} p={C} color="#0f172a" onDown={grab('C')} label="C" /> : <text x={f.X(C[0]) - 16} y={f.Y(C[1]) + 18} fontSize="14" fontWeight="700">C</text>}
              </>
            )}
          </DragSvg>
          <p className="px-2 pt-1 text-sm text-muted">{free ? t.helpFree : t.helpRight}</p>
        </div>
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-1.5 text-sm">
            <input type="checkbox" checked={free} onChange={(e) => setFree(e.target.checked)} className="h-4 w-4" />
            {t.free}
          </label>
          <dl className="grid grid-cols-2 gap-2">
            <Readout label="BC = a" value={fmt(a, 2)} />
            <Readout label="AC = b" value={fmt(b, 2)} />
            <Readout label="AB = c" value={fmt(c, 2)} />
            <Readout label={t.angleC} value={fmt(angleC, 1)} unit="°" />
            <Readout label="a² + b²" value={fmt(a * a + b * b, 2)} strong />
            <Readout label="c²" value={fmt(c * c, 2)} strong />
          </dl>
          <p className={`rounded-xl px-3 py-2 text-sm font-bold ${right ? 'bg-good-soft text-good' : 'bg-paper'}`}>
            {right ? t.equal : a * a + b * b > c * c ? t.acute : t.obtuse}
          </p>
        </div>
      </div>
      <PredictChallenges challenges={t.challenges.map((ch) => ({ ...ch, choices: [...ch.choices] }))} t={predict} />
    </div>
  );
}
