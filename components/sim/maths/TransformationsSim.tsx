'use client';

import { useRef, useState } from 'react';
import type { Dictionary } from '@/lib/i18n';
import { PredictChallenges } from '../PredictChallenges';
import { fmt, Readout, Slider } from '../Slider';

type T = Dictionary['sims']['transformations'];
type Kind = 'translation' | 'centrale' | 'axiale' | 'rotation' | 'homothetie';
type P = [number, number];

const N = 7;
const S = 26;
const W = 2 * N * S;
const X = (x: number) => (x + N) * S;
const Y = (y: number) => (N - y) * S;

// Un petit drapeau, pas symétrique : on voit tout de suite s’il a été retourné.
const FLAG: P[] = [[0, 0], [0, 4], [2.5, 3.2], [0.8, 2.6], [0.8, 0]];

function apply(kind: Kind, p: P, o: P, a: P, b: P, angle: number, k: number): P {
  switch (kind) {
    case 'translation':
      return [p[0] + a[0] - o[0], p[1] + a[1] - o[1]];
    case 'centrale':
      return [2 * o[0] - p[0], 2 * o[1] - p[1]];
    case 'axiale': {
      // Symétrie par rapport à la droite (ab).
      const dx = b[0] - a[0];
      const dy = b[1] - a[1];
      const l2 = dx * dx + dy * dy || 1;
      const t = ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / l2;
      const h: P = [a[0] + t * dx, a[1] + t * dy];
      return [2 * h[0] - p[0], 2 * h[1] - p[1]];
    }
    case 'rotation': {
      const r = (angle * Math.PI) / 180;
      const x = p[0] - o[0];
      const y = p[1] - o[1];
      return [o[0] + x * Math.cos(r) - y * Math.sin(r), o[1] + x * Math.sin(r) + y * Math.cos(r)];
    }
    case 'homothetie':
      return [o[0] + k * (p[0] - o[0]), o[1] + k * (p[1] - o[1])];
  }
}

function area(poly: P[]) {
  let s = 0;
  poly.forEach((p, i) => {
    const q = poly[(i + 1) % poly.length];
    s += p[0] * q[1] - q[0] * p[1];
  });
  return s / 2;
}

/** Translation, symétries, rotation et homothétie appliquées à un drapeau. */
export function TransformationsSim({ t, predict }: { t: T; predict: Dictionary['lesson']['predict'] }) {
  const [kind, setKind] = useState<Kind>('rotation');
  const [o, setO] = useState<P>([0, -1]);
  const [a, setA] = useState<P>([3, -2]);
  const [b, setB] = useState<P>([3, 3]);
  const [angle, setAngle] = useState(90);
  const [k, setK] = useState(2);
  const [shift, setShift] = useState<P>([-4, -1]);
  const svg = useRef<SVGSVGElement>(null);
  const drag = useRef<string | null>(null);

  const fig: P[] = FLAG.map((p) => [p[0] + shift[0], p[1] + shift[1]]);
  // Pour la translation, le vecteur va de o à a.
  const img = fig.map((p) => apply(kind, p, o, a, b, angle, k));
  const ratio = Math.abs(area(img) / area(fig));
  const sameOrientation = Math.sign(area(img)) === Math.sign(area(fig));
  const side = (q: P[]) => Math.hypot(q[1][0] - q[0][0], q[1][1] - q[0][1]);

  function move(e: React.PointerEvent) {
    const el = svg.current;
    if (!el || !drag.current) return;
    const r = el.getBoundingClientRect();
    const p: P = [Math.round(((e.clientX - r.left) / r.width) * 2 * N - N), Math.round(N - ((e.clientY - r.top) / r.height) * 2 * N)];
    const c: P = [Math.max(-N, Math.min(N, p[0])), Math.max(-N, Math.min(N, p[1]))];
    if (drag.current === 'o') setO(c);
    else if (drag.current === 'a') setA(c);
    else if (drag.current === 'b') setB(c);
    else if (drag.current === 'fig') setShift(c);
  }
  const grab = (id: string) => (e: React.PointerEvent) => {
    drag.current = id;
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };
  const poly = (q: P[]) => q.map((p) => `${X(p[0])},${Y(p[1])}`).join(' ');

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-2">
        {(['translation', 'centrale', 'axiale', 'rotation', 'homothetie'] as Kind[]).map((m) => (
          <button
            key={m}
            type="button"
            aria-pressed={kind === m}
            onClick={() => setKind(m)}
            className={`rounded-full border-2 px-3 py-1 text-sm font-bold ${kind === m ? 'border-ink bg-ink text-on-ink' : 'border-line bg-surface'}`}
          >
            {t.kinds[m]}
          </button>
        ))}
      </div>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="rounded-2xl border border-line bg-surface p-2">
          <svg ref={svg} viewBox={`0 0 ${W} ${W}`} className="h-auto w-full touch-none select-none" role="img" aria-label={t.title} onPointerMove={move} onPointerUp={() => (drag.current = null)}>
            {Array.from({ length: 2 * N + 1 }, (_, i) => (
              <g key={i}>
                <line x1={i * S} x2={i * S} y1="0" y2={W} stroke={i === N ? '#94a3b8' : '#eef2f7'} />
                <line y1={i * S} y2={i * S} x1="0" x2={W} stroke={i === N ? '#94a3b8' : '#eef2f7'} />
              </g>
            ))}
            {kind === 'axiale' && (() => {
              const dx = b[0] - a[0];
              const dy = b[1] - a[1];
              return <line x1={X(a[0] - dx * 10)} y1={Y(a[1] - dy * 10)} x2={X(a[0] + dx * 10)} y2={Y(a[1] + dy * 10)} stroke="#7c3aed" strokeWidth="2.5" />;
            })()}
            {kind === 'translation' && (
              <line x1={X(o[0])} y1={Y(o[1])} x2={X(a[0])} y2={Y(a[1])} stroke="#7c3aed" strokeWidth="3" markerEnd="url(#fl-tr)" />
            )}
            <defs>
              <marker id="fl-tr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#7c3aed" /></marker>
            </defs>
            {/* Liens entre chaque point et son image. */}
            {fig.map((p, i) => (
              <line key={i} x1={X(p[0])} y1={Y(p[1])} x2={X(img[i][0])} y2={Y(img[i][1])} stroke="#cbd5e1" strokeDasharray="3 4" />
            ))}
            {kind === 'rotation' && fig.slice(0, 1).map((p, i) => <line key={i} x1={X(o[0])} y1={Y(o[1])} x2={X(p[0])} y2={Y(p[1])} stroke="#f59e0b" strokeDasharray="4 3" />)}
            <polygon points={poly(fig)} fill="#2563eb" fillOpacity="0.7" stroke="#1e3a8a" strokeWidth="2" style={{ cursor: 'grab' }} onPointerDown={grab('fig')} />
            <polygon points={poly(img)} fill="#f97316" fillOpacity="0.7" stroke="#9a3412" strokeWidth="2" />
            <text x={X(fig[1][0]) - 4} y={Y(fig[1][1]) - 6} fontSize="13" fontWeight="700" fill="#1e3a8a" textAnchor="end">F</text>
            <text x={X(img[1][0]) + 4} y={Y(img[1][1]) - 6} fontSize="13" fontWeight="700" fill="#9a3412">F′</text>
            {(kind === 'translation' || kind === 'centrale' || kind === 'rotation' || kind === 'homothetie') && (
              <g>
                <circle cx={X(o[0])} cy={Y(o[1])} r="9" fill="#7c3aed" stroke="#fff" strokeWidth="2" style={{ cursor: 'grab' }} onPointerDown={grab('o')} />
                <text x={X(o[0]) + 11} y={Y(o[1]) + 16} fontSize="13" fontWeight="700" fill="#7c3aed">O</text>
              </g>
            )}
            {(kind === 'axiale' || kind === 'translation') && (
              <circle cx={X(a[0])} cy={Y(a[1])} r="9" fill="#7c3aed" fillOpacity="0.4" stroke="#7c3aed" strokeWidth="2" style={{ cursor: 'grab' }} onPointerDown={grab('a')} />
            )}
            {kind === 'axiale' && <circle cx={X(b[0])} cy={Y(b[1])} r="9" fill="#7c3aed" fillOpacity="0.4" stroke="#7c3aed" strokeWidth="2" style={{ cursor: 'grab' }} onPointerDown={grab('b')} />}
          </svg>
          <p className="px-2 pt-1 text-sm text-muted">{t.help[kind]}</p>
        </div>
        <div className="flex flex-col gap-3">
          {kind === 'rotation' && <Slider label={t.angle} value={angle} min={-180} max={180} step={15} unit="°" onChange={setAngle} />}
          {kind === 'homothetie' && <Slider label={t.ratio} value={k} min={-3} max={3} step={0.5} onChange={setK} />}
          <dl className="grid grid-cols-2 gap-2">
            <Readout label={t.sideFig} value={fmt(side(fig), 2)} />
            <Readout label={t.sideImg} value={fmt(side(img), 2)} />
            <Readout label={t.areaRatio} value={fmt(ratio, 2)} strong />
            <Readout label={t.orientation} value={sameOrientation ? t.kept : t.reversed} />
          </dl>
          <p className="rounded-xl bg-paper px-3 py-2 text-sm">{t.notes[kind]}</p>
        </div>
      </div>
      <PredictChallenges challenges={t.challenges.map((c) => ({ ...c, choices: [...c.choices] }))} t={predict} />
    </div>
  );
}
