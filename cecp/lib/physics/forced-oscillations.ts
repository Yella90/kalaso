// lib/physics/forced-oscillations.ts
// ============================================================
//  Oscillations mecaniques forcees (excitateur + resonateur)
//  m x'' + h x' + k x = F0 cos(omega t)
//  Regime permanent : x(t) = X cos(omega t - phi)
// ============================================================

export interface ForcedParams {
  /** masse (kg) */
  m: number;
  /** raideur (N/m) */
  k: number;
  /** coefficient de frottement fluide (kg/s) */
  h: number;
  /** amplitude de la force excitatrice (N) */
  F0: number;
}

/** Pulsation propre omega0 = sqrt(k / m) */
export const naturalOmega = (p: ForcedParams) => Math.sqrt(p.k / p.m);

/** Frequence propre N0 = omega0 / 2 pi */
export const naturalFrequency = (p: ForcedParams) => naturalOmega(p) / (2 * Math.PI);

/** Amplitude du regime permanent : X = F0 / sqrt((k - m w^2)^2 + (h w)^2) */
export function forcedAmplitude(p: ForcedParams, w: number): number {
  const a = p.k - p.m * w * w;
  return p.F0 / Math.sqrt(a * a + (p.h * w) ** 2);
}

/** Dephasage du resonateur sur l'excitateur (rad, entre 0 et pi) : tan(phi) = h w / (k - m w^2) */
export const forcedPhase = (p: ForcedParams, w: number) => Math.atan2(p.h * w, p.k - p.m * w * w);

/** Elongation en regime permanent */
export const forcedX = (p: ForcedParams, w: number, t: number) =>
  forcedAmplitude(p, w) * Math.cos(w * t - forcedPhase(p, w));

/**
 * Pulsation de resonance d'amplitude : wr = sqrt(w0^2 - h^2 / (2 m^2)).
 * Renvoie null si l'amortissement est trop fort (pas de resonance).
 */
export function resonanceOmega(p: ForcedParams): number | null {
  const w0 = naturalOmega(p);
  const r = w0 * w0 - (p.h * p.h) / (2 * p.m * p.m);
  return r > 0 ? Math.sqrt(r) : null;
}

/** Amplitude statique (w -> 0) : X0 = F0 / k */
export const staticAmplitude = (p: ForcedParams) => p.F0 / p.k;

/** Facteur de qualite Q = m w0 / h */
export const mechQualityFactor = (p: ForcedParams) => (p.m * naturalOmega(p)) / p.h;

/** Amplitude de la vitesse : Vm = F0 / sqrt(h^2 + (m w - k / w)^2) (maximale exactement a w0) */
export function velocityAmplitude(p: ForcedParams, w: number): number {
  const r = p.m * w - p.k / w;
  return p.F0 / Math.sqrt(p.h * p.h + r * r);
}

/** Puissance moyenne recue : P = h Vm^2 / 2 */
export const averageAbsorbedPower = (p: ForcedParams, w: number) => 0.5 * p.h * velocityAmplitude(p, w) ** 2;
