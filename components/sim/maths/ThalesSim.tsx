'use client';

import { useState } from 'react';
import type { Dictionary } from '@/lib/i18n';
import { PredictChallenges } from '../PredictChallenges';
import { fmt, Readout, Slider } from '../Slider';
import { DragSvg, dist, frame, Grid, Handle, type P } from './kit';

type T = Dictionary['sims']['thales'];
const f = frame({ xmin: -2, xmax: 12, ymin: -5, ymax: 8, w: 540 });

/** Théorème de Thalès : une parallèle à (BC) coupe [AB] et [AC] dans le même rapport. */
export function ThalesSim({ t, predict }: { t: T; predict: Dictionary['lesson']['predict'] }) {
  const A: P = [0, 0];
  const [B, setB] = useState<P>([9, 6]);
  const [C, setC] = useState<P>([10, -3]);
  const [k, setK] = useState(0.5);
  const [parallel, setParallel] = useState(true);
  const [offset, setOffset] = useState(0);

  // M sur (AB) au rapport k ; N sur (AC) : au même rapport si (MN) // (BC), sinon décalé.
  const M: P = [k * B[0], k * B[1]];
  const kn = parallel ? k : Math.max(0.05, Math.min(1.5, k + offset));
  const N: P = [kn * C[0], kn * C[1]];
  const AM = dist(A, M);
  const AB = dist(A, B);
  const AN = dist(A, N);
  const AC = dist(A, C);
  const MN = dist(M, N);
  const BC = dist(B, C);
  const line = (p: P, q: P, ext = 1.6) => `M${f.X(p[0])} ${f.Y(p[1])} L${f.X(p[0] + (q[0] - p[0]) * ext)} ${f.Y(p[1] + (q[1] - p[1]) * ext)}`;

  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="rounded-2xl border border-line bg-surface p-2">
          <DragSvg f={f} label={t.title} onDrag={(id, p) => (id === 'B' ? setB(p) : setC(p))}>
            {(grab) => (
              <>
                <Grid f={f} axes={false} />
                <path d={line(A, B)} stroke="#94a3b8" strokeWidth="1.5" />
                <path d={line(A, C)} stroke="#94a3b8" strokeWidth="1.5" />
                <polygon points={[A, B, C].map((p) => `${f.X(p[0])},${f.Y(p[1])}`).join(' ')} fill="#dbeafe" fillOpacity="0.6" stroke="#1d4ed8" strokeWidth="2.5" />
                <polygon points={[A, M, N].map((p) => `${f.X(p[0])},${f.Y(p[1])}`).join(' ')} fill="#fde68a" fillOpacity="0.7" stroke="#b45309" strokeWidth="2.5" />
                <line x1={f.X(M[0])} y1={f.Y(M[1])} x2={f.X(N[0])} y2={f.Y(N[1])} stroke={parallel ? '#16a34a' : '#dc2626'} strokeWidth="3.5" />
                <text x={f.X(A[0]) - 14} y={f.Y(A[1]) + 5} fontSize="15" fontWeight="700">A</text>
                <text x={f.X(M[0]) - 8} y={f.Y(M[1]) - 10} fontSize="14" fontWeight="700" fill="#b45309">M</text>
                <text x={f.X(N[0]) - 6} y={f.Y(N[1]) + 20} fontSize="14" fontWeight="700" fill="#b45309">N</text>
                <Handle f={f} p={B} color="#1d4ed8" onDown={grab('B')} label="B" />
                <Handle f={f} p={C} color="#1d4ed8" onDown={grab('C')} label="C" />
              </>
            )}
          </DragSvg>
          <p className="px-2 pt-1 text-sm text-muted">{t.help}</p>
        </div>
        <div className="flex flex-col gap-3">
          <Slider label={t.position} value={k} min={0.1} max={1.5} step={0.05} onChange={setK} />
          <label className="flex items-center gap-1.5 text-sm">
            <input type="checkbox" checked={parallel} onChange={(e) => setParallel(e.target.checked)} className="h-4 w-4" />
            {t.parallel}
          </label>
          {!parallel && <Slider label={t.offset} value={offset} min={-0.4} max={0.4} step={0.05} onChange={setOffset} />}
          <dl className="grid grid-cols-1 gap-2">
            <Readout label="AM / AB" value={fmt(AM / AB, 3)} />
            <Readout label="AN / AC" value={fmt(AN / AC, 3)} />
            <Readout label="MN / BC" value={fmt(MN / BC, 3)} />
          </dl>
          <p className={`rounded-xl px-3 py-2 text-sm font-bold ${parallel ? 'bg-good-soft text-good' : 'bg-paper'}`}>{parallel ? t.equalRatios : t.notParallel}</p>
        </div>
      </div>
      <PredictChallenges challenges={t.challenges.map((ch) => ({ ...ch, choices: [...ch.choices] }))} t={predict} />
    </div>
  );
}
