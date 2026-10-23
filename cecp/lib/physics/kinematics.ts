// lib/physics/kinematics.ts
// ============================================================
//  Moteur physique - Mouvement du centre d'inertie
//  Source : DAVID DIARRA Prebac - Sciences Physiques T.S.E / T.S.EXP
//  Chapitre 1 : cinematique, dynamique et energie
// ============================================================

export type MotionType = 'MRU' | 'MRUV' | 'MCU';

// ------------------------------------------------------------
//  1. Mouvement rectiligne uniforme (MRU)
//     x(t) = x0 + v.t
// ------------------------------------------------------------
export interface MRUParams {
  x0: number;   // position initiale (m)
  v: number;    // vitesse constante (m/s)
}

export function mruPosition(p: MRUParams, t: number): number {
  return p.x0 + p.v * t;
}

// ------------------------------------------------------------
//  2. Mouvement rectiligne uniformement varie (MRUV)
//     x(t) = (1/2) a.t^2 + v0.t + x0
//     v(t) = a.t + v0
// ------------------------------------------------------------
export interface MRUVParams {
  x0: number;   // position initiale (m)
  v0: number;   // vitesse initiale (m/s)
  a: number;    // acceleration constante (m/s2)
}

export function mruvPosition(p: MRUVParams, t: number): number {
  return 0.5 * p.a * t * t + p.v0 * t + p.x0;
}

export function mruvVelocity(p: MRUVParams, t: number): number {
  return p.a * t + p.v0;
}

/** Relation liant espaces, vitesses et acceleration (independante du temps) */
export function mruvRelation(p: MRUVParams, x: number): number {
  // v^2 - v0^2 = 2.a.(x - x0)
  return p.v0 * p.v0 + 2 * p.a * (x - p.x0);
}

/** Temps au bout duquel la vitesse s'annule (v = 0) */
export function mruvStoppingTime(p: MRUVParams): number | null {
  if (p.a === 0) return null;
  const t = -p.v0 / p.a;
  return t > 0 ? t : null;
}

/**
 * Distance parcourue jusqu'a l'arret (freinage) : d = v0^2 / (2.|a|).
 * Renvoie null si le mobile ne s'arrete pas (a et v0 de meme signe, ou a = 0).
 */
export function mruvStoppingDistance(p: MRUVParams): number | null {
  if (p.a === 0 || p.v0 * p.a > 0) return null;
  return (p.v0 * p.v0) / (2 * Math.abs(p.a));
}

/** Instant ou le mobile atteint l'abscisse x (premiere solution positive). */
export function mruvTimeToReach(p: MRUVParams, x: number): number | null {
  const dx = x - p.x0;
  if (p.a === 0) {
    if (p.v0 === 0) return null;
    const t = dx / p.v0;
    return t >= 0 ? t : null;
  }
  const disc = p.v0 * p.v0 + 2 * p.a * dx;
  if (disc < 0) return null;
  const r = Math.sqrt(disc);
  const ts = [(-p.v0 + r) / p.a, (-p.v0 - r) / p.a].filter((t) => t >= 0);
  return ts.length ? Math.min(...ts) : null;
}

// ------------------------------------------------------------
//  3. Mouvement circulaire uniforme (MCU)
//     v = R.omega
//     T = 2.pi / omega
//     f = 1 / T
//     a_N = v^2 / R = R.omega^2
// ------------------------------------------------------------
export interface MCUParams {
  R: number;       // rayon (m)
  omega: number;   // vitesse angulaire (rad/s)
  theta0?: number; // angle initial (rad), defaut 0
}

export function mcuAngle(p: MCUParams, t: number): number {
  return (p.theta0 ?? 0) + p.omega * t;
}

export function mcuLinearSpeed(p: MCUParams): number {
  return p.R * p.omega;
}

export function mcuPeriod(p: MCUParams): number {
  return (2 * Math.PI) / p.omega;
}

export function mcuFrequency(p: MCUParams): number {
  return 1 / mcuPeriod(p);
}

/** Acceleration centripete (norme) */
export function mcuCentripetalAcceleration(p: MCUParams): number {
  return p.R * p.omega * p.omega;
}

// ------------------------------------------------------------
//  4. Travail et energie
// ------------------------------------------------------------

/** Travail du poids entre deux altitudes z1 et z2 (m) */
export function workOfWeight(m: number, g: number, z1: number, z2: number): number {
  return m * g * (z1 - z2);
}

/** Travail d'une force constante sur un deplacement rectiligne */
export function workOfForce(F: number, d: number, alpha = 0): number {
  return F * d * Math.cos(alpha);
}

/** Energie cinetique (J) */
export function kineticEnergy(m: number, v: number): number {
  return 0.5 * m * v * v;
}

/**
 * Theoreme de l'energie cinetique :
 *   Ec(final) - Ec(initial) = somme des travaux des forces
 * Renvoie la vitesse finale connaissant v0, m et le travail total.
 */
export function finalSpeedFromWork(m: number, v0: number, sumWork: number): number {
  const Ec0 = 0.5 * m * v0 * v0;
  const Ec1 = Ec0 + sumWork;
  if (Ec1 < 0) return 0;
  return Math.sqrt((2 * Ec1) / m);
}

// ------------------------------------------------------------
//  5. Echantillonnage pour l'affichage
// ------------------------------------------------------------
export interface Sample {
  t: number;
  x: number;
  v: number;
}

export function sampleMRU(p: MRUParams, T: number, samples = 100): Sample[] {
  const out: Sample[] = [];
  for (let i = 0; i <= samples; i++) {
    const t = (T * i) / samples;
    out.push({ t, x: mruPosition(p, t), v: p.v });
  }
  return out;
}

export function sampleMRUV(p: MRUVParams, T: number, samples = 100): Sample[] {
  const out: Sample[] = [];
  for (let i = 0; i <= samples; i++) {
    const t = (T * i) / samples;
    out.push({ t, x: mruvPosition(p, t), v: mruvVelocity(p, t) });
  }
  return out;
}

export interface MCUSample {
  t: number;
  theta: number;
  x: number;
  y: number;
  v: number;
}

export function sampleMCU(p: MCUParams, T: number, samples = 100): MCUSample[] {
  const v = mcuLinearSpeed(p);
  const out: MCUSample[] = [];
  for (let i = 0; i <= samples; i++) {
    const t = (T * i) / samples;
    const theta = mcuAngle(p, t);
    out.push({
      t,
      theta,
      x: p.R * Math.cos(theta),
      y: p.R * Math.sin(theta),
      v,
    });
  }
  return out;
}