'use client';

/**
 * Outils communs des simulations animees avec `motion`.
 *
 * Principe : le temps de la simulation est une MotionValue. Les positions,
 * angles et courbes en sont deduits (useDerived) et branches directement sur
 * les attributs SVG des composants `motion.*`. A chaque image, seul le DOM
 * concerne est mis a jour : aucun re-rendu React, d'ou une animation fluide
 * meme sur un telephone modeste.
 */

import { useCallback, useEffect, useRef } from 'react';
import { useAnimationFrame, useMotionValue, type MotionValue } from 'motion/react';

/**
 * Horloge de simulation (en secondes de simulation).
 * Avance seulement quand `running` est vrai ; `speed` = secondes simulees par seconde reelle.
 * `onTick(dt)` est appele a chaque image (dt en secondes simulees), avant la mise a jour de t.
 */
export function useSimClock(running: boolean, speed = 1, onTick?: (dt: number, t: number) => void) {
  const t = useMotionValue(0);
  const state = useRef({ running, speed, onTick });
  state.current = { running, speed, onTick };

  useAnimationFrame((_, delta) => {
    const s = state.current;
    if (!s.running) return;
    // delta en ms, plafonne pour eviter les sauts apres un changement d'onglet
    const dt = (Math.min(delta, 50) / 1000) * s.speed;
    s.onTick?.(dt, t.get());
    t.set(t.get() + dt);
  });

  const reset = useCallback(() => t.set(0), [t]);
  return { t, reset };
}

/**
 * MotionValue derivee d'une autre : recalculee a chaque changement de `src`
 * et chaque fois que `key` change (parametres modifies par l'eleve).
 */
export function useDerived<T>(src: MotionValue<number>, compute: (v: number) => T, key: unknown): MotionValue<T> {
  const fn = useRef(compute);
  fn.current = compute;
  // Valeur initiale arrondie : le serveur et le navigateur doivent produire exactement le meme HTML
  const out = useMotionValue<T>(stable(compute(stable(src.get()))));

  useEffect(() => {
    out.set(fn.current(src.get()));
  }, [key, out, src]);

  useEffect(() => src.on('change', (v) => out.set(fn.current(v))), [src, out]);

  return out;
}

/** Arrondi a 1e-3 des nombres (evite les ecarts de derniere decimale entre serveur et navigateur) */
function stable<T>(v: T): T {
  return (typeof v === 'number' ? Math.round(v * 1000) / 1000 : v) as T;
}

/** Texte HTML mis a jour a chaque image sans re-rendu React */
export function LiveText({ value, format, className }: {
  value: MotionValue<number>; format: (v: number) => string; className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const fmt = useRef(format);
  fmt.current = format;
  useEffect(() => {
    const upd = (v: number) => { if (ref.current) ref.current.textContent = fmt.current(v); };
    upd(value.get());
    return value.on('change', upd);
  }, [value]);
  return <span ref={ref} className={className} />;
}

/** Texte SVG mis a jour a chaque image sans re-rendu React */
export function LiveSvgText({ value, format, ...props }: {
  value: MotionValue<number>; format: (v: number) => string;
} & Omit<React.SVGProps<SVGTextElement>, 'ref'>) {
  const ref = useRef<SVGTextElement>(null);
  const fmt = useRef(format);
  fmt.current = format;
  useEffect(() => {
    const upd = (v: number) => { if (ref.current) ref.current.textContent = fmt.current(v); };
    upd(value.get());
    return value.on('change', upd);
  }, [value]);
  return <text ref={ref} {...props} />;
}

/**
 * Construit le chemin SVG d'une fonction echantillonnee.
 * `xs` : abscisses ecran ; `f(i)` : ordonnee ecran du point i.
 */
export function polyline(n: number, x: (i: number) => number, y: (i: number) => number): string {
  let d = '';
  for (let i = 0; i < n; i++) {
    const X = x(i), Y = y(i);
    if (!Number.isFinite(X) || !Number.isFinite(Y)) continue;
    d += `${d ? 'L' : 'M'}${X.toFixed(1)},${Y.toFixed(1)}`;
  }
  return d || 'M0,0';
}

/** Cadre SVG commun (fond sombre, coins arrondis, responsive) */
export function SimSvg({ width, height, children, label }: {
  width: number; height: number; children: React.ReactNode; label: string;
}) {
  return (
    <div className="rounded-lg bg-slate-950 border border-slate-800 overflow-hidden">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto block" role="img" aria-label={label}>
        {children}
      </svg>
    </div>
  );
}

/** Petit graphique "oscilloscope" : axes + legende ; les courbes sont passees en enfants */
export function ScopeFrame({ x, y, w, h, label }: { x: number; y: number; w: number; h: number; label?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={6} fill="#0b1222" stroke="#1e293b" />
      {[0.25, 0.5, 0.75].map((k) => (
        <line key={k} x1={x + w * k} x2={x + w * k} y1={y} y2={y + h} stroke="#1e293b" strokeDasharray="2 4" />
      ))}
      <line x1={x} x2={x + w} y1={y + h / 2} y2={y + h / 2} stroke="#334155" />
      {label && <text x={x + 8} y={y + 14} fill="#64748b" fontSize={11}>{label}</text>}
    </g>
  );
}

const SUP: Record<string, string> = { '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };

/** Notation scientifique a la francaise : 1,25·10¹⁷ */
export function sci(x: number, digits = 2): string {
  if (x === 0 || !Number.isFinite(x)) return String(x);
  const e = Math.floor(Math.log10(Math.abs(x)));
  const m = x / 10 ** e;
  const mant = m.toFixed(digits).replace('.', ',');
  return e === 0 ? mant : `${mant}·10${String(e).split('').map((c) => SUP[c] ?? c).join('')}`;
}
