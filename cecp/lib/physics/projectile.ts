// lib/physics/projectile.ts
// ============================================================
//  Moteur physique — Projectile dans le champ de pesanteur
//  Source : DAVID DIARRA Pracbac — Sciences Physiques T.S.E / T.S.EXP
//  Aucune dependance React / Next — testable en isolation.
// ============================================================

/** Constante de gravite par defaut (m/s2). */
export const G_EARTH = 9.81;

/** Parametres d'un tir de projectile. */
export interface ProjectileParams {
  v0: number;
  alpha: number;
  g: number;
  h0: number;
}

/** Etat complet du projectile a un instant donne. */
export interface ProjectileState {
  t: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export const deg2rad = (deg: number): number => (deg * Math.PI) / 180;
export const rad2deg = (rad: number): number => (rad * 180) / Math.PI;

export function initialState(p: ProjectileParams): ProjectileState {
  return {
    t: 0,
    x: 0,
    y: p.h0,
    vx: p.v0 * Math.cos(p.alpha),
    vy: p.v0 * Math.sin(p.alpha),
  };
}

export function step(
  s: ProjectileState,
  dt: number,
  p: ProjectileParams,
): ProjectileState {
  const vy = s.vy - p.g * dt;
  return {
    t: s.t + dt,
    x: s.x + s.vx * dt,
    y: s.y + vy * dt,
    vx: s.vx,
    vy,
  };
}

export function trajectoryAt(
  p: ProjectileParams,
  t: number,
): { x: number; y: number } {
  return {
    x: p.v0 * Math.cos(p.alpha) * t,
    y: p.h0 + p.v0 * Math.sin(p.alpha) * t - 0.5 * p.g * t * t,
  };
}

export function velocityAt(
  p: ProjectileParams,
  t: number,
): { vx: number; vy: number } {
  return {
    vx: p.v0 * Math.cos(p.alpha),
    vy: p.v0 * Math.sin(p.alpha) - p.g * t,
  };
}

/** Etat exact (position + vitesse) a l'instant t, par la solution analytique. */
export function stateAt(p: ProjectileParams, t: number): ProjectileState {
  const { x, y } = trajectoryAt(p, t);
  const { vx, vy } = velocityAt(p, t);
  return { t, x, y, vx, vy };
}

/**
 * Vitesse initiale v0 necessaire pour que la trajectoire passe par le point
 * (x, y), pour un angle de tir alpha donne. Renvoie null si c'est impossible
 * avec cet angle (cible au-dessus de la droite de tir).
 *   y = -g.x^2 / (2.v0^2.cos^2(alpha)) + tan(alpha).x + h0
 */
export function speedToHit(
  x: number,
  y: number,
  alpha: number,
  g: number,
  h0: number,
): number | null {
  const cosA = Math.cos(alpha);
  const denom = 2 * cosA * cosA * (Math.tan(alpha) * x + h0 - y);
  if (x <= 0 || denom <= 0) return null;
  return Math.sqrt((g * x * x) / denom);
}

export function trajectoryY(p: ProjectileParams, x: number): number {
  const cosA = Math.cos(p.alpha);
  return (
    (-p.g / (2 * p.v0 * p.v0 * cosA * cosA)) * x * x +
    Math.tan(p.alpha) * x +
    p.h0
  );
}

export function flightTime(p: ProjectileParams): number {
  const vy0 = p.v0 * Math.sin(p.alpha);
  const disc = vy0 * vy0 + 2 * p.g * p.h0;
  if (disc < 0) return 0;
  return (vy0 + Math.sqrt(disc)) / p.g;
}

export function range(p: ProjectileParams): number {
  return p.v0 * Math.cos(p.alpha) * flightTime(p);
}

export function maxHeight(p: ProjectileParams): number {
  const vy0 = p.v0 * Math.sin(p.alpha);
  return p.h0 + (vy0 * vy0) / (2 * p.g);
}

export function timeToApex(p: ProjectileParams): number {
  return (p.v0 * Math.sin(p.alpha)) / p.g;
}

export function speedAt(p: ProjectileParams, t: number): number {
  const { vx, vy } = velocityAt(p, t);
  return Math.sqrt(vx * vx + vy * vy);
}

export function sampleTrajectory(
  p: ProjectileParams,
  samples = 200,
): { x: number; y: number }[] {
  const T = flightTime(p);
  if (T <= 0 || samples < 2) return [];
  const out: { x: number; y: number }[] = [];
  for (let i = 0; i < samples; i++) {
    const t = (T * i) / (samples - 1);
    out.push(trajectoryAt(p, t));
  }
  return out;
}

export function sampleTimeSeries(
  p: ProjectileParams,
  samples = 200,
): ProjectileState[] {
  const T = flightTime(p);
  if (T <= 0 || samples < 2) return [];
  const out: ProjectileState[] = [];
  for (let i = 0; i < samples; i++) {
    const t = (T * i) / (samples - 1);
    const { x, y } = trajectoryAt(p, t);
    const { vx, vy } = velocityAt(p, t);
    out.push({ t, x, y, vx, vy });
  }
  return out;
}
