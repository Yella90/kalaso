import type { ReactNode } from 'react';

// Éléments communs des scènes d’aventure : décor sahélien, apparitions progressives,
// bulle du personnage et fête à chaque mission réussie. Animations en CSS pur
// (légères pour les téléphones), coupées si l’élève a demandé moins d’animations.

export const SCENE_W = 800;
export const SCENE_H = 320;

export interface SceneProps {
  /** Nombre de missions réussies. */
  step: number;
  total: number;
  /** Bulle du personnage : mission en cours, ou message de fin. */
  say: string;
  /** Augmente à chaque réussite : relance la fête. */
  celebrate: number;
}

const CSS = `
.k-reveal { transition: opacity .9s ease, transform .9s cubic-bezier(.2,1.4,.4,1); transform-box: fill-box; transform-origin: center bottom; }
.k-reveal[data-on="false"] { opacity: 0; transform: scale(.4) translateY(20px); pointer-events: none; }
.k-float { animation: k-float 3.2s ease-in-out infinite; transform-box: fill-box; }
.k-bob { animation: k-bob 1.4s ease-in-out infinite; transform-box: fill-box; }
.k-spin { animation: k-spin 1.2s linear infinite; transform-box: fill-box; transform-origin: center; }
.k-spin-slow { animation: k-spin 6s linear infinite; transform-box: fill-box; transform-origin: center; }
.k-flow { stroke-dasharray: 3 12; animation: k-flow .8s linear infinite; }
.k-flow-slow { stroke-dasharray: 2 14; animation: k-flow 1.6s linear infinite; }
.k-drop { animation: k-drop 1.1s ease-in infinite; transform-box: fill-box; }
.k-blink { animation: k-blink 1.6s ease-in-out infinite; }
.k-sway { animation: k-sway 4s ease-in-out infinite; transform-box: fill-box; transform-origin: center bottom; }
.k-buzz { animation: k-buzz 2.6s ease-in-out infinite; transform-box: fill-box; }
.k-drive { animation: k-drive 7s linear infinite; }
.k-rays { animation: k-rays 3s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
.k-party > * { animation: k-party 1.6s ease-out forwards; transform-box: fill-box; transform-origin: center; }
.k-wave { animation: k-wave 1.2s ease-in-out infinite; transform-box: fill-box; transform-origin: 0% 100%; }
@keyframes k-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-6px) } }
@keyframes k-bob { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-3px) } }
@keyframes k-spin { to { transform: rotate(360deg) } }
@keyframes k-flow { to { stroke-dashoffset: -30 } }
@keyframes k-drop { 0% { transform: translateY(-8px); opacity: 0 } 20% { opacity: 1 } 100% { transform: translateY(26px); opacity: 0 } }
@keyframes k-blink { 0%,100% { opacity: 1 } 50% { opacity: .35 } }
@keyframes k-sway { 0%,100% { transform: rotate(-2deg) } 50% { transform: rotate(2deg) } }
@keyframes k-buzz { 0% { transform: translate(0,0) } 25% { transform: translate(14px,-8px) } 50% { transform: translate(4px,6px) } 75% { transform: translate(-12px,-4px) } 100% { transform: translate(0,0) } }
@keyframes k-drive { 0% { transform: translateX(-160px) } 100% { transform: translateX(960px) } }
@keyframes k-rays { 0%,100% { transform: scale(1); opacity: .55 } 50% { transform: scale(1.12); opacity: .9 } }
@keyframes k-party { 0% { transform: translate(0,0) scale(.3); opacity: 1 } 100% { transform: translate(var(--dx), var(--dy)) scale(1) rotate(200deg); opacity: 0 } }
@keyframes k-wave { 0%,100% { transform: rotate(0) } 50% { transform: rotate(-24deg) } }
@media (prefers-reduced-motion: reduce) {
  .k-float, .k-bob, .k-spin, .k-spin-slow, .k-flow, .k-flow-slow, .k-drop, .k-blink, .k-sway, .k-buzz, .k-drive, .k-rays, .k-wave { animation: none; }
  .k-party { display: none; }
}
`;

/** Apparaît (avec un petit rebond) quand la mission correspondante est réussie. */
export function Reveal({ on, children }: { on: boolean; children: ReactNode }) {
  return (
    <g className="k-reveal" data-on={on}>
      {children}
    </g>
  );
}

export function Sky({ id, night = false }: { id: string; night?: boolean }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-ciel`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={night ? '#1e3a5f' : '#8fd0f2'} />
          <stop offset="100%" stopColor={night ? '#f59e0b' : '#fde8c4'} />
        </linearGradient>
      </defs>
      <rect width={SCENE_W} height={SCENE_H} fill={`url(#${id}-ciel)`} />
    </>
  );
}

export function Sun({ x = 690, y = 62 }: { x?: number; y?: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r="46" fill="#fde047" className="k-rays" opacity="0.6" />
      <circle cx={x} cy={y} r="30" fill="#facc15" />
    </g>
  );
}

export function Cloud({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="k-float" fill="#fff" opacity="0.9">
        <ellipse cx="0" cy="0" rx="34" ry="14" />
        <ellipse cx="22" cy="-8" rx="22" ry="14" />
        <ellipse cx="-20" cy="-4" rx="18" ry="11" />
      </g>
    </g>
  );
}

export function Ground({ y = 250, color = '#d9a066' }: { y?: number; color?: string }) {
  return (
    <>
      <path d={`M0 ${y} Q 200 ${y - 14} 400 ${y} T ${SCENE_W} ${y} V ${SCENE_H} H 0 Z`} fill={color} />
      <path d={`M0 ${y + 18} Q 260 ${y + 8} 520 ${y + 20} T ${SCENE_W} ${y + 16} V ${SCENE_H} H 0 Z`} fill="#000" opacity="0.06" />
    </>
  );
}

/** Baobab stylisé : un repère familier du paysage malien. */
export function Baobab({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-14 0 Q -10 -40 -16 -70 L 16 -70 Q 10 -40 14 0 Z" fill="#8b5a3c" />
      <g stroke="#8b5a3c" strokeWidth="7" strokeLinecap="round" fill="none">
        <path d="M-10 -66 Q -30 -86 -44 -88" />
        <path d="M10 -66 Q 30 -90 46 -92" />
        <path d="M0 -70 Q 2 -92 -6 -104" />
      </g>
      <g className="k-sway">
        <ellipse cx="-44" cy="-94" rx="22" ry="11" fill="#5f8f3a" />
        <ellipse cx="46" cy="-98" rx="24" ry="12" fill="#5f8f3a" />
        <ellipse cx="-4" cy="-110" rx="26" ry="13" fill="#6aa84f" />
      </g>
    </g>
  );
}

export function Hut({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-26" y="-36" width="52" height="36" fill="#c98b56" />
      <path d="M-34 -34 L 0 -66 L 34 -34 Z" fill="#a0632e" />
      <rect x="-7" y="-20" width="14" height="20" fill="#5b3a1e" />
    </g>
  );
}

/** Personnage qui parle : corps simple, tenue colorée, main qui salue. */
export function Person({
  x,
  y,
  shirt = '#e0533d',
  skin = '#7c4a2d',
  scarf,
  wave = false,
  s = 1,
}: {
  x: number;
  y: number;
  shirt?: string;
  skin?: string;
  scarf?: string;
  wave?: boolean;
  s?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="k-bob">
      <path d="M-7 0 L -5 -26 M 7 0 L 5 -26" stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />
      <path d="M-14 -24 Q 0 -30 14 -24 L 12 -58 Q 0 -64 -12 -58 Z" fill={shirt} />
      <path d="M-12 -54 L -22 -32" stroke={skin} strokeWidth="5" strokeLinecap="round" />
      <g className={wave ? 'k-wave' : undefined}>
        <path d="M12 -54 L 26 -72" stroke={skin} strokeWidth="5" strokeLinecap="round" />
      </g>
      <circle cx="0" cy="-70" r="10" fill={skin} />
      {scarf && <path d="M-11 -74 Q 0 -90 11 -74 Q 0 -78 -11 -74 Z" fill={scarf} />}
      </g>
    </g>
  );
}

/** Bulle de dialogue, reliée au personnage. */
export function Bubble({ x, y, text, w = 300 }: { x: number; y: number; text: string; w?: number }) {
  // Coupe le texte en deux lignes au plus.
  const words = text.split(' ');
  const lines: string[] = [''];
  for (const word of words) {
    const cur = lines[lines.length - 1];
    if ((cur + ' ' + word).trim().length > w / 9.4 && lines.length < 2) lines.push(word);
    else lines[lines.length - 1] = (cur + ' ' + word).trim();
  }
  const h = 20 + lines.length * 22;
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="k-float">
      <rect x="0" y={-h} width={w} height={h} rx="14" fill="#fff" stroke="#1e293b" strokeWidth="2" />
      <path d={`M18 -1 L 6 16 L 34 -1 Z`} fill="#fff" stroke="#1e293b" strokeWidth="2" strokeLinejoin="round" />
      <path d="M17 -2 H 35" stroke="#fff" strokeWidth="4" />
      {lines.map((l, i) => (
        <text key={i} x="14" y={-h + 28 + i * 22} fontSize="17" fontWeight="700" fill="#1e293b">
          {l}
        </text>
      ))}
      </g>
    </g>
  );
}

/** Fête : des confettis jaillissent à chaque mission réussie. */
export function Party({ n, x = 400, y = 160 }: { n: number; x?: number; y?: number }) {
  if (n === 0) return null;
  const colors = ['#facc15', '#22c55e', '#3b82f6', '#ef4444', '#a855f7', '#f97316'];
  return (
    <g className="k-party" transform={`translate(${x} ${y})`} aria-hidden="true">
      {Array.from({ length: 26 }, (_, i) => {
        const a = (i / 26) * Math.PI * 2;
        const r = 110 + (i % 5) * 26;
        return (
          <rect
            key={i}
            x="-4"
            y="-4"
            width={i % 3 ? 8 : 12}
            height={i % 3 ? 8 : 5}
            rx="2"
            fill={colors[i % colors.length]}
            style={{ ['--dx' as string]: `${Math.round(Math.cos(a) * r)}px`, ['--dy' as string]: `${Math.round(Math.sin(a) * r * 0.7)}px` }}
          />
        );
      })}
    </g>
  );
}

export function SceneSvg({ label, children }: { label: string; children: ReactNode }) {
  return (
    <svg viewBox={`0 0 ${SCENE_W} ${SCENE_H}`} className="h-auto w-full" role="img" aria-label={label}>
      <style>{CSS}</style>
      {children}
    </svg>
  );
}
