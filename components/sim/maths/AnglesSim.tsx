'use client';

import { useState } from 'react';
import type { Dictionary } from '@/lib/i18n';
import { PredictChallenges } from '../PredictChallenges';
import { fmt, Readout, Slider } from '../Slider';
import { DragSvg, frame, Tab, type P } from './kit';

type T = Dictionary['sims']['angles'];
type Mode = 'inscrit' | 'polygone' | 'triangle';
const f = frame({ xmin: -6, xmax: 6, ymin: -6, ymax: 6, w: 420 });
const R = 4.5;

const onCircle = (deg: number): P => [R * Math.cos((deg * Math.PI) / 180), R * Math.sin((deg * Math.PI) / 180)];
const angleAt = (v: P, p: P, q: P) => {
  const a = Math.atan2(p[1] - v[1], p[0] - v[0]);
  const b = Math.atan2(q[1] - v[1], q[0] - v[0]);
  let d = Math.abs(a - b);
  if (d > Math.PI) d = 2 * Math.PI - d;
  return (d * 180) / Math.PI;
};
const toDeg = (p: P) => ((Math.atan2(p[1], p[0]) * 180) / Math.PI + 360) % 360;

/** Angles inscrits et au centre, polygones réguliers, somme des angles d’un triangle. */
export function AnglesSim({ t, predict }: { t: T; predict: Dictionary['lesson']['predict'] }) {
  const [mode, setMode] = useState<Mode>('inscrit');
  const [aDeg, setADeg] = useState(200);
  const [bDeg, setBDeg] = useState(320);
  const [mDeg, setMDeg] = useState(90);
  const [n, setN] = useState(6);
  const [tri, setTri] = useState<P[]>([[-4, -3], [4, -2], [1, 4]]);

  const A = onCircle(aDeg);
  const B = onCircle(bDeg);
  const M = onCircle(mDeg);
  const O: P = [0, 0];
  const inscribed = angleAt(M, A, B);
  const central = angleAt(O, A, B);
  const XY = (p: P) => `${f.X(p[0])},${f.Y(p[1])}`;

  function drag(id: string, p: P) {
    if (mode === 'triangle') {
      setTri((q) => q.map((x, i) => (String(i) === id ? p : x)));
      return;
    }
    const d = toDeg(p);
    if (id === 'A') setADeg(d);
    if (id === 'B') setBDeg(d);
    if (id === 'M') setMDeg(d);
  }

  const angles = tri.map((v, i) => angleAt(v, tri[(i + 1) % 3], tri[(i + 2) % 3]));
  const poly = Array.from({ length: n }, (_, i) => onCircle(90 + (i * 360) / n));

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-2">
        {(['inscrit', 'polygone', 'triangle'] as Mode[]).map((k) => (
          <Tab key={k} on={mode === k} onClick={() => setMode(k)}>
            {t.modes[k]}
          </Tab>
        ))}
      </div>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="rounded-2xl border border-line bg-surface p-2">
          <DragSvg f={f} label={t.title} onDrag={drag} snap={mode === 'triangle' ? 1 : 0}>
            {(grab) => (
              <>
                {mode !== 'triangle' && <circle cx={f.X(0)} cy={f.Y(0)} r={R * f.s} fill="none" stroke="#0f172a" strokeWidth="2" />}
                {mode === 'inscrit' && (
                  <>
                    <polyline points={[A, O, B].map(XY).join(' ')} fill="none" stroke="#2563eb" strokeWidth="2.5" />
                    <polyline points={[A, M, B].map(XY).join(' ')} fill="none" stroke="#f59e0b" strokeWidth="2.5" />
                    <circle cx={f.X(0)} cy={f.Y(0)} r="4" fill="#2563eb" />
                    <text x={f.X(0) + 8} y={f.Y(0) + 16} fontSize="13" fontWeight="700" fill="#2563eb">O</text>
                    {(['A', 'B', 'M'] as const).map((id) => {
                      const p = id === 'A' ? A : id === 'B' ? B : M;
                      return (
                        <g key={id}>
                          <circle cx={f.X(p[0])} cy={f.Y(p[1])} r="10" fill={id === 'M' ? '#f59e0b' : '#0f172a'} fillOpacity="0.3" stroke={id === 'M' ? '#f59e0b' : '#0f172a'} strokeWidth="2.5" style={{ cursor: 'grab' }} onPointerDown={grab(id)} />
                          <text x={f.X(p[0] * 1.15)} y={f.Y(p[1] * 1.15) + 5} fontSize="14" fontWeight="700" textAnchor="middle">{id}</text>
                        </g>
                      );
                    })}
                  </>
                )}
                {mode === 'polygone' && (
                  <>
                    <polygon points={poly.map(XY).join(' ')} fill="#fde68a" fillOpacity="0.5" stroke="#b45309" strokeWidth="2.5" />
                    {poly.map((p, i) => (
                      <line key={i} x1={f.X(0)} y1={f.Y(0)} x2={f.X(p[0])} y2={f.Y(p[1])} stroke="#94a3b8" strokeDasharray="3 4" />
                    ))}
                  </>
                )}
                {mode === 'triangle' && (
                  <>
                    <polygon points={tri.map(XY).join(' ')} fill="#dbeafe" stroke="#1d4ed8" strokeWidth="2.5" />
                    {tri.map((p, i) => (
                      <g key={i}>
                        <circle cx={f.X(p[0])} cy={f.Y(p[1])} r="10" fill="#1d4ed8" fillOpacity="0.3" stroke="#1d4ed8" strokeWidth="2.5" style={{ cursor: 'grab' }} onPointerDown={grab(String(i))} />
                        <text x={f.X(p[0])} y={f.Y(p[1]) - 14} fontSize="13" fontWeight="700" textAnchor="middle">{fmt(angles[i], 1)}°</text>
                      </g>
                    ))}
                  </>
                )}
              </>
            )}
          </DragSvg>
          <p className="px-2 pt-1 text-sm text-muted">{t.help[mode]}</p>
        </div>
        <div className="flex flex-col gap-3">
          {mode === 'inscrit' && (
            <dl className="grid grid-cols-2 gap-2">
              <Readout label={t.inscribed} value={fmt(inscribed, 1)} unit="°" strong />
              <Readout label={t.central} value={fmt(central, 1)} unit="°" />
            </dl>
          )}
          {mode === 'polygone' && (
            <>
              <Slider label={t.sides} value={n} min={3} max={12} step={1} onChange={setN} />
              <dl className="grid grid-cols-2 gap-2">
                <Readout label={t.centralPoly} value={fmt(360 / n, 2)} unit="°" />
                <Readout label={t.interior} value={fmt(((n - 2) * 180) / n, 2)} unit="°" strong />
                <Readout label={t.sum} value={fmt((n - 2) * 180, 0)} unit="°" />
              </dl>
            </>
          )}
          {mode === 'triangle' && (
            <dl className="grid grid-cols-2 gap-2">
              <Readout label={t.sum} value={fmt(angles[0] + angles[1] + angles[2], 1)} unit="°" strong />
            </dl>
          )}
          <p className="rounded-xl bg-paper px-3 py-2 text-sm">{t.notes[mode]}</p>
        </div>
      </div>
      <PredictChallenges challenges={t.challenges.map((ch) => ({ ...ch, choices: [...ch.choices] }))} t={predict} />
    </div>
  );
}
