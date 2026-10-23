import type { ReactNode } from 'react';

// Éléments communs des schémas : légende reliée à un point par un trait fin.

export const INK = '#1a2340';
export const MUTED = '#586179';

export function Label({
  x, y, tx, ty, children, anchor = 'start',
}: {
  x: number;
  y: number;
  tx: number;
  ty: number;
  children: ReactNode;
  anchor?: 'start' | 'middle' | 'end';
}) {
  return (
    <g>
      <line x1={x} y1={y} x2={tx} y2={ty} stroke={MUTED} strokeWidth="0.8" />
      <circle cx={x} cy={y} r="1.6" fill={INK} />
      <text x={tx + (anchor === 'start' ? 3 : anchor === 'end' ? -3 : 0)} y={ty + 4} fontSize="11" fill={INK} textAnchor={anchor}>
        {children}
      </text>
    </g>
  );
}

export function Svg({ w, h, title, children }: { w: number; h: number; title: string; children: ReactNode }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="mx-auto h-auto w-full max-w-xl" role="img" aria-label={title}>
      <title>{title}</title>
      {children}
    </svg>
  );
}
