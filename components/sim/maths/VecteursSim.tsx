'use client';

import { useRef, useState } from 'react';
import type { Dictionary } from '@/lib/i18n';
import { PredictChallenges } from '../PredictChallenges';
import { fmt, Readout, Slider } from '../Slider';

type T = Dictionary['sims']['vecteurs'];
type Mode = 'somme' | 'produit' | 'barycentre';
type P = [number, number];

const N = 6; // le repère va de -6 à 6
const S = 30; // pixels par unité
const W = 2 * N * S;
const X = (x: number) => (x + N) * S;
const Y = (y: number) => (N - y) * S;

function Arrow({ from, to, color, label, width = 3, dashed }: { from: P; to: P; color: string; label?: string; width?: number; dashed?: boolean }) {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const len = Math.hypot(dx, dy);
  if (len < 1e-6) return null;
  const ux = dx / len;
  const uy = dy / len;
  const tip: P = [X(to[0]), Y(to[1])];
  const head = 0.35;
  const l: P = [X(to[0] - head * ux + head * 0.5 * uy), Y(to[1] - head * uy - head * 0.5 * ux)];
  const r: P = [X(to[0] - head * ux - head * 0.5 * uy), Y(to[1] - head * uy + head * 0.5 * ux)];
  return (
    <g>
      <line x1={X(from[0])} y1={Y(from[1])} x2={X(to[0] - head * 0.6 * ux)} y2={Y(to[1] - head * 0.6 * uy)} stroke={color} strokeWidth={width} strokeDasharray={dashed ? '6 5' : undefined} />
      <path d={`M${tip[0]} ${tip[1]} L${l[0]} ${l[1]} L${r[0]} ${r[1]} Z`} fill={color} />
      {label && (
        <text x={X((from[0] + to[0]) / 2) + 8} y={Y((from[1] + to[1]) / 2) - 8} fontSize="15" fontWeight="700" fill={color}>
          {label}
        </text>
      )}
    </g>
  );
}

function Grid() {
  return (
    <g>
      {Array.from({ length: 2 * N + 1 }, (_, k) => (
        <g key={k}>
          <line x1={k * S} x2={k * S} y1="0" y2={W} stroke={k === N ? '#64748b' : '#e2e8f0'} />
          <line y1={k * S} y2={k * S} x1="0" x2={W} stroke={k === N ? '#64748b' : '#e2e8f0'} />
        </g>
      ))}
      <text x={X(N) - 4} y={Y(0) - 4} fontSize="10" textAnchor="end" fill="#64748b">x</text>
      <text x={X(0) + 4} y="10" fontSize="10" fill="#64748b">y</text>
    </g>
  );
}

/** Vecteurs du plan : somme, produit par un réel, colinéarité, produit scalaire, barycentre. */
export function VecteursSim({ t, predict }: { t: T; predict: Dictionary['lesson']['predict'] }) {
  const [mode, setMode] = useState<Mode>('somme');
  const [u, setU] = useState<P>([3, 1]);
  const [v, setV] = useState<P>([1, 3]);
  const [k, setK] = useState(2);
  const [pts, setPts] = useState<P[]>([[-4, -2], [4, -3], [1, 4]]);
  const [w, setW] = useState([1, 1, 1]);
  const svg = useRef<SVGSVGElement>(null);
  const drag = useRef<string | null>(null);

  function move(e: React.PointerEvent) {
    const el = svg.current;
    if (!el || !drag.current) return;
    const r = el.getBoundingClientRect();
    const p: P = [Math.round(((e.clientX - r.left) / r.width) * 2 * N - N), Math.round(N - ((e.clientY - r.top) / r.height) * 2 * N)];
    const c: P = [Math.max(-N, Math.min(N, p[0])), Math.max(-N, Math.min(N, p[1]))];
    if (drag.current === 'u') setU(c);
    else if (drag.current === 'v') setV(c);
    else {
      const i = Number(drag.current);
      setPts((q) => q.map((x, j) => (j === i ? c : x)));
    }
  }

  const handle = (id: string, at: P, color: string) => (
    <circle
      cx={X(at[0])}
      cy={Y(at[1])}
      r="11"
      fill={color}
      fillOpacity="0.25"
      stroke={color}
      strokeWidth="2"
      style={{ cursor: 'grab' }}
      onPointerDown={(e) => {
        drag.current = id;
        (e.target as Element).setPointerCapture?.(e.pointerId);
      }}
    />
  );

  const sum: P = [u[0] + v[0], u[1] + v[1]];
  const det = u[0] * v[1] - u[1] * v[0];
  const dot = u[0] * v[0] + u[1] * v[1];
  const nu = Math.hypot(...u);
  const nv = Math.hypot(...v);
  const angle = nu && nv ? (Math.acos(Math.max(-1, Math.min(1, dot / (nu * nv)))) * 180) / Math.PI : 0;
  const wsum = w[0] + w[1] + w[2];
  const G: P | null = Math.abs(wsum) > 1e-9 ? [(w[0] * pts[0][0] + w[1] * pts[1][0] + w[2] * pts[2][0]) / wsum, (w[0] * pts[0][1] + w[1] * pts[1][1] + w[2] * pts[2][1]) / wsum] : null;
  const coord = (p: P) => `(${fmt(p[0], 2)} ; ${fmt(p[1], 2)})`;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-2">
        {(['somme', 'produit', 'barycentre'] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            aria-pressed={mode === m}
            onClick={() => setMode(m)}
            className={`rounded-full border-2 px-3 py-1 text-sm font-bold ${mode === m ? 'border-ink bg-ink text-on-ink' : 'border-line bg-surface'}`}
          >
            {t.modes[m]}
          </button>
        ))}
      </div>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="rounded-2xl border border-line bg-surface p-2">
          <svg
            ref={svg}
            viewBox={`0 0 ${W} ${W}`}
            className="h-auto w-full touch-none select-none"
            role="img"
            aria-label={t.title}
            onPointerMove={move}
            onPointerUp={() => (drag.current = null)}
          >
            <Grid />
            {mode === 'somme' && (
              <>
                <Arrow from={u} to={sum} color="#2563eb" dashed width={2} />
                <Arrow from={v} to={sum} color="#dc2626" dashed width={2} />
                <Arrow from={[0, 0]} to={sum} color="#16a34a" label="u + v" width={4} />
                <Arrow from={[0, 0]} to={u} color="#dc2626" label="u" />
                <Arrow from={[0, 0]} to={v} color="#2563eb" label="v" />
                {handle('u', u, '#dc2626')}
                {handle('v', v, '#2563eb')}
              </>
            )}
            {mode === 'produit' && (
              <>
                <Arrow from={[0, 0]} to={[k * u[0], k * u[1]]} color="#16a34a" label={`${fmt(k, 1)}·u`} width={4} />
                <Arrow from={[0, 0]} to={u} color="#dc2626" label="u" />
                <Arrow from={[0, 0]} to={v} color="#2563eb" label="v" />
                {handle('u', u, '#dc2626')}
                {handle('v', v, '#2563eb')}
              </>
            )}
            {mode === 'barycentre' && (
              <>
                <path d={`M${X(pts[0][0])} ${Y(pts[0][1])} L${X(pts[1][0])} ${Y(pts[1][1])} L${X(pts[2][0])} ${Y(pts[2][1])} Z`} fill="#fde68a" fillOpacity="0.35" stroke="#a16207" />
                {G && pts.map((p, i) => <line key={i} x1={X(G[0])} y1={Y(G[1])} x2={X(p[0])} y2={Y(p[1])} stroke="#94a3b8" strokeDasharray="3 3" />)}
                {pts.map((p, i) => (
                  <g key={i}>
                    <circle cx={X(p[0])} cy={Y(p[1])} r={5 + Math.abs(w[i]) * 2.5} fill={w[i] >= 0 ? '#2563eb' : '#dc2626'} fillOpacity="0.8" />
                    <text x={X(p[0]) + 12} y={Y(p[1]) - 10} fontSize="14" fontWeight="700" fill="#1e293b">
                      {'ABC'[i]} ({fmt(w[i], 1)})
                    </text>
                    {handle(String(i), p, '#1e293b')}
                  </g>
                ))}
                {G && G.every((c) => Math.abs(c) <= N) && (
                  <g>
                    <circle cx={X(G[0])} cy={Y(G[1])} r="8" fill="#16a34a" stroke="#fff" strokeWidth="2" />
                    <text x={X(G[0]) + 12} y={Y(G[1]) + 16} fontSize="14" fontWeight="700" fill="#16a34a">G</text>
                  </g>
                )}
              </>
            )}
          </svg>
          <p className="px-2 pt-1 text-sm text-muted">{mode === 'barycentre' ? t.dragPoints : t.dragTips}</p>
        </div>

        <div className="flex flex-col gap-3">
          {mode !== 'barycentre' ? (
            <>
              <dl className="grid grid-cols-2 gap-2">
                <Readout label="u" value={coord(u)} />
                <Readout label="v" value={coord(v)} />
                {mode === 'somme' ? <Readout label="u + v" value={coord(sum)} strong /> : <Readout label={`${fmt(k, 1)}·u`} value={coord([k * u[0], k * u[1]])} strong />}
                <Readout label="det(u, v)" value={fmt(det, 2)} />
                <Readout label="u · v" value={fmt(dot, 2)} />
                <Readout label={t.angle} value={fmt(angle, 1)} unit="°" />
                <Readout label="‖u‖" value={fmt(nu, 2)} />
                <Readout label="‖v‖" value={fmt(nv, 2)} />
              </dl>
              {mode === 'produit' && <Slider label={t.k} value={k} min={-3} max={3} step={0.5} onChange={setK} />}
              <p className="rounded-xl bg-paper px-3 py-2 text-sm">
                {det === 0 ? t.colinear : dot === 0 ? t.orthogonal : t.general}
              </p>
            </>
          ) : (
            <>
              {['A', 'B', 'C'].map((name, i) => (
                <Slider key={name} label={`${t.weight} ${name}`} value={w[i]} min={-2} max={5} step={0.5} onChange={(x) => setW((q) => q.map((y, j) => (j === i ? x : y)))} />
              ))}
              <dl className="grid grid-cols-2 gap-2">
                <Readout label={t.weightSum} value={fmt(wsum, 1)} />
                <Readout label="G" value={G ? coord(G) : '—'} strong />
              </dl>
              <p className="rounded-xl bg-paper px-3 py-2 text-sm">{G ? t.baryFormula : t.noBary}</p>
            </>
          )}
        </div>
      </div>
      <PredictChallenges challenges={t.challenges.map((c) => ({ ...c, choices: [...c.choices] }))} t={predict} />
    </div>
  );
}
