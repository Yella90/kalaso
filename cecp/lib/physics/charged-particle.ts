// lib/physics/charged-particle.ts
// Particule chargee dans un champ electrique uniforme
// Source : DAVID DIARRA Prebac, chapitre 4

export const E_CHARGE = 1.6e-19;      // C
export const M_ELECTRON = 9.1e-31;    // kg
export const M_PROTON = 1.67e-27;     // kg

export interface FieldParams {
  U: number;   // tension (V)
  d: number;   // distance entre plaques (m)
}

export function electricFieldMagnitude(p: FieldParams): number {
  return Math.abs(p.U) / p.d;
}

export interface ElectronParams {
  U: number;
  d: number;
  l: number;   // longueur des plaques (m)
  v0: number;  // vitesse horizontale initiale (m/s)
}

// Ordonnee y de l'electron a l'abscisse x (entree a mi-distance)
export function electronY(p: ElectronParams, x: number): number {
  const E = electricFieldMagnitude(p);
  return (E_CHARGE * E * x * x) / (2 * M_ELECTRON * p.v0 * p.v0);
}

export function electronExitY(p: ElectronParams): number {
  return electronY(p, p.l);
}

export function maxVoltageForExit(p: ElectronParams): number {
  return (M_ELECTRON * p.d * p.d * p.v0 * p.v0) / (E_CHARGE * p.l * p.l);
}

/**
 * Abscisse x a laquelle l'electron (entre a mi-distance) touche la plaque,
 * c'est-a-dire ou y(x) = d/2. Renvoie null s'il sort des plaques sans les toucher.
 */
export function electronHitX(p: ElectronParams): number | null {
  const E = electricFieldMagnitude(p);
  if (E === 0) return null;
  const x = Math.sqrt((M_ELECTRON * p.v0 * p.v0 * p.d) / (E_CHARGE * E));
  return x < p.l ? x : null;
}

export function speedFromAcceleratingVoltage(U0: number): number {
  return Math.sqrt((2 * E_CHARGE * U0) / M_ELECTRON);
}

// Deflection sur l'ecran a distance D de la sortie des plaques
export function spotDeflection(p: ElectronParams, D: number): number {
  const E = electricFieldMagnitude(p);
  return (E_CHARGE * E * D * p.l) / (M_ELECTRON * p.v0 * p.v0);
}

// Proton lance avec un angle alpha
export interface ProtonParams {
  U: number;
  d: number;
  v0: number;
  alpha: number;
}

export function protonAcceleration(p: ProtonParams): number {
  return (E_CHARGE * electricFieldMagnitude(p)) / M_PROTON;
}

export function protonTrajectory(p: ProtonParams, t: number): { x: number; y: number } {
  const a = protonAcceleration(p);
  return {
    x: p.v0 * Math.cos(p.alpha) * t,
    y: p.v0 * Math.sin(p.alpha) * t - 0.5 * a * t * t,
  };
}

export function protonTimeToApex(p: ProtonParams): number {
  return (p.v0 * Math.sin(p.alpha)) / protonAcceleration(p);
}

export function protonMaxHeight(p: ProtonParams): number {
  const t = protonTimeToApex(p);
  return protonTrajectory(p, t).y;
}

/**
 * Instant (s) ou le proton, parti de y = 0 (mi-distance), atteint la plaque
 * superieure y = d/2. Renvoie null s'il ne l'atteint jamais (fleche < d/2).
 */
export function protonHitTime(p: ProtonParams): number | null {
  const a = protonAcceleration(p);
  const vy0 = p.v0 * Math.sin(p.alpha);
  const disc = vy0 * vy0 - a * p.d; // vy0^2 - 2.a.(d/2)
  if (disc < 0) return null;
  return (vy0 - Math.sqrt(disc)) / a;
}

export function protonRange(p: ProtonParams): number {
  const t = 2 * protonTimeToApex(p);
  return protonTrajectory(p, t).x;
}

// Echantillons pour l'affichage
export function sampleElectronTrajectory(
  p: ElectronParams,
  samples = 100,
): { x: number; y: number }[] {
  const out: { x: number; y: number }[] = [];
  for (let i = 0; i <= samples; i++) {
    const x = (p.l * i) / samples;
    out.push({ x, y: electronY(p, x) });
  }
  return out;
}

export function sampleProtonTrajectory(
  p: ProtonParams,
  tMax: number,
  samples = 100,
): { x: number; y: number }[] {
  const out: { x: number; y: number }[] = [];
  for (let i = 0; i <= samples; i++) {
    const t = (tMax * i) / samples;
    out.push(protonTrajectory(p, t));
  }
  return out;
}