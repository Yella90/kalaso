'use client';

import { useEffect, useId, useRef, useState } from 'react';
import type { Dictionary } from '@/lib/i18n';
import type { Diagram, DiagramElement, LabelPos } from '@/lib/lessons/types';
import { usePrefersReducedMotion } from '@/components/sim/usePrefersReducedMotion';

// Schémas repris du site cecp (physique-3d) : fond sombre, comme un tableau noir,
// ou figure de manuel (`paper`), trait noir sur fond clair.
const FONT = 'sans-serif';

const BOARD = {
  width: 800, padding: 60, bg: '#0f172a', grid: true, font: FONT,
  line: '#94a3b8', accent: '#22d3ee', point: '#f59e0b', text: '#e2e8f0', angle: '#f472b6', block: '#475569', blockText: '#fff',
};
const PAPER = {
  width: 700, padding: 40, bg: '#faf8f0', grid: false, font: 'Georgia, serif',
  line: '#0f172a', accent: '#0f172a', point: '#0f172a', text: '#0f172a', angle: '#0f172a', block: '#e5e7eb', blockText: '#0f172a',
};
type Palette = typeof BOARD;

/** Arrondi à 2 décimales : le serveur et le téléphone écrivent alors les mêmes coordonnées. */
const r2 = (v: number) => Math.round(v * 100) / 100;

export function ExerciseDiagram({ diagram, t }: { diagram: Diagram; t: Dictionary['lesson'] }) {
  const { width, height, groundLevel = 0, elements, animation } = diagram;
  const markerId = `arrow-${useId().replace(/:/g, '')}`;
  const reduced = usePrefersReducedMotion();
  const p = diagram.paper ? PAPER : BOARD;
  const SVG_WIDTH = p.width;
  const PADDING = p.padding;

  const scale = diagram.paper ? Math.min((SVG_WIDTH - PADDING * 2) / width, 380 / height) : (SVG_WIDTH - PADDING * 2) / width;
  const svgHeight = r2(height * scale + PADDING * 2);
  const h: Helpers = {
    x: (x: number) => r2(PADDING + x * scale),
    y: (y: number) => r2(svgHeight - PADDING - (y - groundLevel) * scale),
    len: (l: number) => r2(l * scale),
    marker: `url(#${markerId})`,
    p,
    svgWidth: SVG_WIDTH,
  };

  // Animation : on parcourt les positions précalculées.
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const raf = useRef<number | null>(null);
  useEffect(() => {
    if (!playing || !animation) return;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setTime((prev) => {
        const next = prev + dt;
        if (next >= animation.duration) {
          setPlaying(false);
          return animation.duration;
        }
        return next;
      });
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, [playing, animation]);

  const frames = animation?.frames ?? [];
  const frame = frames.length
    ? frames[Math.min(frames.length - 1, Math.round((time / animation!.duration) * (frames.length - 1)))]
    : null;
  const ended = animation ? time >= animation.duration : false;

  return (
    <figure className="mt-3">
      <div className="overflow-x-auto rounded-xl p-2" style={{ background: p.bg }}>
        <svg viewBox={`0 0 ${SVG_WIDTH} ${svgHeight}`} className="h-auto w-full min-w-[22rem]" role="img">
          <defs>
            <marker id={markerId} markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="context-stroke" />
            </marker>
          </defs>
          {p.grid && (
            <g opacity={0.15}>
              {Array.from({ length: Math.ceil(width) + 1 }, (_, i) => (
                <line key={`x${i}`} x1={h.x(i)} y1={PADDING} x2={h.x(i)} y2={r2(svgHeight - PADDING)} stroke="#334155" strokeWidth={0.5} />
              ))}
              {Array.from({ length: Math.ceil(height) + 1 }, (_, i) => (
                <line key={`y${i}`} x1={PADDING} y1={h.y(i + groundLevel)} x2={SVG_WIDTH - PADDING} y2={h.y(i + groundLevel)} stroke="#334155" strokeWidth={0.5} />
              ))}
            </g>
          )}
          {elements.map((el, i) => (
            <Element key={i} el={el} h={h} />
          ))}
          {animation?.trail && (
            <polyline
              points={animation.trail.map((p) => `${h.x(p.x)},${h.y(p.y)}`).join(' ')}
              fill="none"
              stroke={animation.color ?? (diagram.paper ? '#dc2626' : '#f59e0b')}
              strokeWidth={1.5}
              strokeDasharray="4 3"
              opacity={0.5}
            />
          )}
          {frame && (
            <circle
              cx={h.x(frame.x)} cy={h.y(frame.y)} r={animation!.radius ?? 6}
              fill={animation!.color ?? (diagram.paper ? '#dc2626' : '#f59e0b')} stroke="#0f172a" strokeWidth={2}
            />
          )}
        </svg>
      </div>
      {animation && !reduced && (
        <div className="mt-2 flex justify-center gap-2">
          <button
            type="button"
            onClick={() => {
              if (ended) setTime(0);
              setPlaying((p) => !p);
            }}
            className="rounded-full bg-ink px-4 py-1.5 text-sm font-bold text-on-ink"
          >
            {playing ? t.pause : ended ? t.replay : t.play}
          </button>
        </div>
      )}
    </figure>
  );
}

interface Helpers {
  x: (x: number) => number;
  y: (y: number) => number;
  len: (l: number) => number;
  marker: string;
  p: Palette;
  svgWidth: number;
}

function labelOffset(pos?: LabelPos): { dx: number; dy: number; anchor: 'start' | 'middle' | 'end' } {
  switch (pos) {
    case 'top': return { dx: 0, dy: -12, anchor: 'middle' };
    case 'bottom': return { dx: 0, dy: 18, anchor: 'middle' };
    case 'left': return { dx: -12, dy: 4, anchor: 'end' };
    case 'right': return { dx: 12, dy: 4, anchor: 'start' };
    case 'top-left': return { dx: -10, dy: -10, anchor: 'end' };
    case 'top-right': return { dx: 10, dy: -10, anchor: 'start' };
    case 'bottom-left': return { dx: -10, dy: 16, anchor: 'end' };
    case 'bottom-right': return { dx: 10, dy: 16, anchor: 'start' };
    default: return { dx: 0, dy: 5, anchor: 'middle' };
  }
}

function arcPath(cx: number, cy: number, r: number, start: number, end: number) {
  const x1 = r2(cx + r * Math.cos(start));
  const y1 = r2(cy - r * Math.sin(start));
  const x2 = r2(cx + r * Math.cos(end));
  const y2 = r2(cy - r * Math.sin(end));
  const largeArc = Math.abs(end - start) > Math.PI ? 1 : 0;
  const sweep = end > start ? 0 : 1;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} ${sweep} ${x2} ${y2}`;
}

function Element({ el, h }: { el: DiagramElement; h: Helpers }) {
  const { p } = h;
  switch (el.type) {
    case 'line':
      return (
        <line
          x1={h.x(el.x1)} y1={h.y(el.y1)} x2={h.x(el.x2)} y2={h.y(el.y2)}
          stroke={el.color ?? p.line} strokeWidth={el.width ?? 1.5} strokeDasharray={el.dashed ? '5 4' : undefined}
        />
      );
    case 'circle':
      return (
        <circle
          cx={h.x(el.cx)} cy={h.y(el.cy)} r={h.len(el.r)}
          fill={el.fill ?? 'none'} stroke={el.color ?? p.line} strokeWidth={1.5} strokeDasharray={el.dashed ? '5 4' : undefined}
        />
      );
    case 'arc':
      return (
        <path d={arcPath(h.x(el.cx), h.y(el.cy), h.len(el.r), el.startAngle, el.endAngle)} fill="none" stroke={el.color ?? p.accent} strokeWidth={el.width ?? 2} />
      );
    case 'point':
    case 'dot': {
      const { dx, dy, anchor } = labelOffset(el.labelPos);
      const color = el.color ?? p.point;
      return (
        <g>
          <circle cx={h.x(el.x)} cy={h.y(el.y)} r={el.type === 'dot' ? (el.radius ?? 3.5) : 4} fill={color} stroke="#0f172a" strokeWidth={1} />
          {el.label && (
            <text
              x={r2(h.x(el.x) + dx)} y={r2(h.y(el.y) + dy)} fill={color} fontSize={14} fontWeight={700} fontFamily={p.font}
              fontStyle={h.p === PAPER ? 'italic' : undefined} textAnchor={anchor}
            >
              {el.label}
            </text>
          )}
        </g>
      );
    }
    case 'hatch': {
      const count = el.count ?? 20;
      return (
        <g opacity={0.4}>
          {Array.from({ length: count }, (_, j) => {
            const f = j / (count - 1);
            const x = el.x1 + (el.x2 - el.x1) * f;
            const y = el.y1 + (el.y2 - el.y1) * f;
            return <line key={j} x1={h.x(x)} y1={h.y(y)} x2={h.x(x - 0.15)} y2={h.y(y - 0.25)} stroke={p.line} strokeWidth={1} />;
          })}
        </g>
      );
    }
    case 'arrow':
      return (
        <g>
          <line x1={h.x(el.x1)} y1={h.y(el.y1)} x2={h.x(el.x2)} y2={h.y(el.y2)} stroke={el.color ?? p.accent} strokeWidth={el.width ?? 2} markerEnd={h.marker} />
          {el.label && (
            <text
              x={r2((h.x(el.x1) + h.x(el.x2)) / 2)} y={r2((h.y(el.y1) + h.y(el.y2)) / 2 - 6)}
              fill={el.color ?? p.accent} fontSize={13} fontWeight={700} textAnchor="middle" fontFamily={p.font}
            >
              {el.label}
            </text>
          )}
        </g>
      );
    case 'text':
      return (
        <text
          x={h.x(el.x)} y={h.y(el.y)} fill={el.color ?? p.text} fontSize={el.size ?? 13} fontWeight={600}
          textAnchor={el.anchor ?? 'middle'} fontFamily={p.font} fontStyle={el.italic ? 'italic' : undefined}
        >
          {el.text}
        </text>
      );
    case 'block': {
      const w = h.len(el.w);
      const bh = h.len(el.h);
      return (
        <g transform={`rotate(${r2(-((el.angle ?? 0) * 180) / Math.PI)} ${h.x(el.x)} ${h.y(el.y)})`}>
          <rect x={r2(h.x(el.x) - w / 2)} y={r2(h.y(el.y) - bh / 2)} width={w} height={bh} fill={el.color ?? p.block} stroke={h.p === PAPER ? '#0f172a' : '#64748b'} strokeWidth={1} />
          {el.label && (
            <text x={h.x(el.x)} y={r2(h.y(el.y) + 4)} fill={p.blockText} fontSize={11} fontWeight={700} textAnchor="middle" fontFamily={FONT}>
              {el.label}
            </text>
          )}
        </g>
      );
    }
    case 'angle': {
      const cx = h.x(el.cx);
      const cy = h.y(el.cy);
      const r = h.len(el.r);
      const mid = (el.startAngle + el.endAngle) / 2;
      return (
        <g>
          <path d={arcPath(cx, cy, r, el.startAngle, el.endAngle)} fill="none" stroke={el.color ?? p.angle} strokeWidth={2} />
          {el.label && (
            <text
              x={r2(cx + (r + 15) * Math.cos(mid))} y={r2(cy - (r + 15) * Math.sin(mid) + 4)}
              fill={el.color ?? p.angle} fontSize={14} fontWeight={700} textAnchor="middle" fontFamily={p.font}
            >
              {el.label}
            </text>
          )}
        </g>
      );
    }
    case 'ground':
      return <line x1={0} y1={h.y(el.y)} x2={h.svgWidth} y2={h.y(el.y)} stroke={el.color ?? '#475569'} strokeWidth={2} />;
    case 'axes': {
      const ox = h.x(el.origin?.x ?? 0);
      const oy = h.y(el.origin?.y ?? 0);
      const lx = h.len(el.lengthX);
      const ly = h.len(el.lengthY);
      return (
        <g>
          <line x1={ox} y1={oy} x2={r2(ox + lx)} y2={oy} stroke="#22d3ee" strokeWidth={1.5} markerEnd={h.marker} />
          <line x1={ox} y1={oy} x2={ox} y2={r2(oy - ly)} stroke="#f59e0b" strokeWidth={1.5} markerEnd={h.marker} />
          {el.labelX && (
            <text x={r2(ox + lx + 10)} y={r2(oy + 4)} fill="#22d3ee" fontSize={13} fontWeight={700} fontFamily={FONT}>
              {el.labelX}
            </text>
          )}
          {el.labelY && (
            <text x={ox} y={r2(oy - ly - 8)} fill="#f59e0b" fontSize={13} fontWeight={700} textAnchor="middle" fontFamily={FONT}>
              {el.labelY}
            </text>
          )}
        </g>
      );
    }
  }
}
