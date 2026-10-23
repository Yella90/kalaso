'use client';

import { useRef, type ReactNode } from 'react';

// Outils communs des simulations de maths : repère quadrillé et points qu’on fait glisser.

export type P = [number, number];

export interface Frame {
  xmin: number;
  xmax: number;
  ymin: number;
  ymax: number;
  /** Largeur du dessin en pixels (la hauteur suit les proportions). */
  w: number;
}

export function frame(f: Frame) {
  const s = f.w / (f.xmax - f.xmin);
  const h = (f.ymax - f.ymin) * s;
  return {
    ...f,
    h,
    s,
    X: (x: number) => (x - f.xmin) * s,
    Y: (y: number) => (f.ymax - y) * s,
  };
}
export type Fr = ReturnType<typeof frame>;

export function Grid({ f, step = 1, axes = true, labels = true }: { f: Fr; step?: number; axes?: boolean; labels?: boolean }) {
  const xs: number[] = [];
  for (let x = Math.ceil(f.xmin / step) * step; x <= f.xmax + 1e-9; x += step) xs.push(+x.toFixed(6));
  const ys: number[] = [];
  for (let y = Math.ceil(f.ymin / step) * step; y <= f.ymax + 1e-9; y += step) ys.push(+y.toFixed(6));
  return (
    <g>
      {xs.map((x) => (
        <line key={`x${x}`} x1={f.X(x)} x2={f.X(x)} y1="0" y2={f.h} stroke={axes && x === 0 ? '#64748b' : '#e8edf3'} />
      ))}
      {ys.map((y) => (
        <line key={`y${y}`} y1={f.Y(y)} y2={f.Y(y)} x1="0" x2={f.w} stroke={axes && y === 0 ? '#64748b' : '#e8edf3'} />
      ))}
      {labels && axes &&
        xs
          .filter((x) => x !== 0 && Math.abs(x / step) % 2 === 0)
          .map((x) => (
            <text key={`lx${x}`} x={f.X(x)} y={Math.min(f.h - 3, f.Y(0) + 13)} fontSize="10" textAnchor="middle" fill="#64748b">
              {x}
            </text>
          ))}
      {labels && axes &&
        ys
          .filter((y) => y !== 0 && Math.abs(y / step) % 2 === 0)
          .map((y) => (
            <text key={`ly${y}`} x={Math.max(3, f.X(0) - 4)} y={f.Y(y) + 3} fontSize="10" textAnchor="end" fill="#64748b">
              {y}
            </text>
          ))}
    </g>
  );
}

/** Dessin SVG dont on peut faire glisser des points (coordonnées du repère, arrondies au pas). */
export function DragSvg({
  f,
  label,
  onDrag,
  snap = 1,
  children,
}: {
  f: Fr;
  label: string;
  onDrag: (id: string, p: P) => void;
  snap?: number;
  children: (grab: (id: string) => (e: React.PointerEvent) => void) => ReactNode;
}) {
  const svg = useRef<SVGSVGElement>(null);
  const active = useRef<string | null>(null);
  const grab = (id: string) => (e: React.PointerEvent) => {
    active.current = id;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    e.stopPropagation();
  };
  function move(e: React.PointerEvent) {
    const el = svg.current;
    if (!el || !active.current) return;
    const r = el.getBoundingClientRect();
    const x = f.xmin + ((e.clientX - r.left) / r.width) * (f.xmax - f.xmin);
    const y = f.ymax - ((e.clientY - r.top) / r.height) * (f.ymax - f.ymin);
    const rd = (v: number) => (snap ? Math.round(v / snap) * snap : v);
    onDrag(active.current, [Math.max(f.xmin, Math.min(f.xmax, rd(x))), Math.max(f.ymin, Math.min(f.ymax, rd(y)))]);
  }
  return (
    <svg ref={svg} viewBox={`0 0 ${f.w} ${f.h}`} className="h-auto w-full touch-none select-none" role="img" aria-label={label} onPointerMove={move} onPointerUp={() => (active.current = null)}>
      {children(grab)}
    </svg>
  );
}

export function Handle({ f, p, color, onDown, label }: { f: Fr; p: P; color: string; onDown: (e: React.PointerEvent) => void; label?: string }) {
  return (
    <g>
      <circle cx={f.X(p[0])} cy={f.Y(p[1])} r="10" fill={color} fillOpacity="0.25" stroke={color} strokeWidth="2.5" style={{ cursor: 'grab' }} onPointerDown={onDown} />
      <circle cx={f.X(p[0])} cy={f.Y(p[1])} r="3" fill={color} pointerEvents="none" />
      {label && (
        <text x={f.X(p[0]) + 12} y={f.Y(p[1]) - 10} fontSize="14" fontWeight="700" fill={color} pointerEvents="none">
          {label}
        </text>
      )}
    </g>
  );
}

export const dist = (a: P, b: P) => Math.hypot(a[0] - b[0], a[1] - b[1]);

/** Bouton d’onglet commun. */
export function Tab({ on, onClick, children }: { on: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`rounded-full border-2 px-3 py-1 text-sm font-bold ${on ? 'border-ink bg-ink text-on-ink' : 'border-line bg-surface'}`}
    >
      {children}
    </button>
  );
}
