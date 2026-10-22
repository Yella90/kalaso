'use client';

import { useState } from 'react';
import { format, type Dictionary } from '@/lib/i18n';
import { fmt, Readout, Slider } from './Slider';

type Kind = 'affine' | 'second';

const W = 360;
const H = 360;
const RANGE = 10; // le repère va de -10 à 10 sur chaque axe

const toX = (x: number) => ((x + RANGE) / (2 * RANGE)) * W;
const toY = (y: number) => H - ((y + RANGE) / (2 * RANGE)) * H;

/** Signe écrit proprement : « + 3 », « − 2 ». */
function term(value: number, suffix: string, first = false): string {
  if (value === 0) return '';
  const sign = value < 0 ? '−' : first ? '' : '+';
  const abs = Math.abs(value);
  const coef = suffix && abs === 1 ? '' : fmt(abs);
  return `${first ? sign : ` ${sign} `}${coef}${suffix}`;
}

/** Fonctions affines et du second degré : courbe, racines, sommet, sens de variation. */
export function FunctionSim({ t }: { t: Dictionary['sims']['fonction'] }) {
  const [kind, setKind] = useState<Kind>('second');
  const [a, setA] = useState(1);
  const [b, setB] = useState(-2);
  const [c, setC] = useState(-3);

  const f = (x: number) => (kind === 'affine' ? a * x + b : a * x * x + b * x + c);
  const formula =
    kind === 'affine'
      ? `f(x) = ${term(a, 'x', true) || ''}${term(b, '', a === 0) || (a === 0 ? '0' : '')}`
      : `f(x) = ${term(a, 'x²', true)}${term(b, 'x', a === 0)}${term(c, '', a === 0 && b === 0) || (a === 0 && b === 0 ? '0' : '')}`;

  // Courbe échantillonnée ; on coupe le tracé quand il sort largement du cadre.
  const points: string[] = [];
  let pen = false;
  for (let k = 0; k <= 200; k++) {
    const x = -RANGE + (k / 200) * 2 * RANGE;
    const y = f(x);
    if (Math.abs(y) > RANGE * 4) {
      pen = false;
      continue;
    }
    points.push(`${pen ? 'L' : 'M'}${toX(x).toFixed(1)} ${toY(y).toFixed(1)}`);
    pen = true;
  }

  let roots: number[] = [];
  let delta: number | null = null;
  let vertex: { x: number; y: number } | null = null;
  if (kind === 'affine') {
    if (a !== 0) roots = [-b / a];
  } else if (a !== 0) {
    delta = b * b - 4 * a * c;
    vertex = { x: -b / (2 * a), y: f(-b / (2 * a)) };
    if (delta > 0) roots = [(-b - Math.sqrt(delta)) / (2 * a), (-b + Math.sqrt(delta)) / (2 * a)].sort((p, q) => p - q);
    else if (delta === 0) roots = [-b / (2 * a)];
  }

  const variation =
    kind === 'affine'
      ? a > 0
        ? t.increasing
        : a < 0
          ? t.decreasing
          : t.constant
      : a > 0
        ? format(t.parabolaUp, { x: fmt(vertex?.x ?? 0) })
        : a < 0
          ? format(t.parabolaDown, { x: fmt(vertex?.x ?? 0) })
          : t.notSecond;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)]">
      <div className="rounded-2xl border border-line bg-surface p-2">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={formula}>
          {Array.from({ length: 2 * RANGE + 1 }, (_, k) => k - RANGE).map((v) => (
            <g key={v} stroke="#d7dce6" strokeWidth={v === 0 ? 0 : 1}>
              <line x1={toX(v)} y1={0} x2={toX(v)} y2={H} />
              <line x1={0} y1={toY(v)} x2={W} y2={toY(v)} />
            </g>
          ))}
          <line x1={0} y1={toY(0)} x2={W} y2={toY(0)} stroke="#1a2340" strokeWidth="1.5" />
          <line x1={toX(0)} y1={0} x2={toX(0)} y2={H} stroke="#1a2340" strokeWidth="1.5" />
          {[5, 10].flatMap((v) => [v, -v]).map((v) => (
            <text key={v} x={toX(v)} y={toY(0) + 14} textAnchor="middle" fontSize="10" fill="#586179">
              {v}
            </text>
          ))}
          <path d={points.join(' ')} fill="none" stroke="var(--subject, #3a4fd6)" strokeWidth="3" />
          {roots
            .filter((r) => Math.abs(r) <= RANGE)
            .map((r) => (
              <circle key={r} cx={toX(r)} cy={toY(0)} r="5" fill="#e8793a" />
            ))}
          {vertex && Math.abs(vertex.x) <= RANGE && Math.abs(vertex.y) <= RANGE && (
            <circle cx={toX(vertex.x)} cy={toY(vertex.y)} r="5" fill="#1a2340" stroke="#fff" strokeWidth="1.5" />
          )}
        </svg>
      </div>

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-2">
          {(['affine', 'second'] as Kind[]).map((k) => (
            <button
              key={k}
              type="button"
              aria-pressed={kind === k}
              onClick={() => setKind(k)}
              className={`rounded-lg border-2 px-2 py-2 text-sm font-bold ${kind === k ? 'border-ink bg-ink text-on-ink' : 'border-line bg-surface'}`}
            >
              {t.kinds[k]}
            </button>
          ))}
        </div>
        <p className="rounded-xl bg-ink px-4 py-3 font-serif text-2xl font-bold text-on-ink">{formula}</p>
        <Slider label="a" value={a} min={-5} max={5} step={0.5} onChange={setA} />
        <Slider label="b" value={b} min={-10} max={10} step={0.5} onChange={setB} />
        {kind === 'second' && <Slider label="c" value={c} min={-10} max={10} step={0.5} onChange={setC} />}
        <dl className="grid grid-cols-2 gap-2">
          <Readout
            label={t.roots}
            value={roots.length ? roots.map((r) => fmt(r)).join(' ; ') : t.none}
            strong
          />
          {kind === 'second' && delta !== null && <Readout label="Δ = b² − 4ac" value={fmt(delta)} />}
          {vertex && <Readout label={t.vertex} value={`(${fmt(vertex.x)} ; ${fmt(vertex.y)})`} />}
          <Readout label="f(0)" value={fmt(f(0))} />
        </dl>
        <p className="text-muted">{variation}</p>
      </div>
    </div>
  );
}
