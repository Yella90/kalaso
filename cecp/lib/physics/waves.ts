// lib/physics/waves.ts
// ============================================================
//  Ondes mecaniques : ondes progressives sinusoidales et
//  interferences mecaniques (deux sources synchrones en phase).
//  Unites SI : m, s, Hz, m/s.
// ============================================================

/** Longueur d'onde lambda = v T = v / N */
export const wavelength = (v: number, N: number) => v / N;

/** Celerite d'une onde le long d'une corde : v = sqrt(F / mu) (mu : masse lineique en kg/m) */
export const ropeSpeed = (F: number, mu: number) => Math.sqrt(F / mu);

/**
 * Elongation d'un point d'abscisse x a l'instant t, la source S (x = 0)
 * ayant le mouvement y_S(t) = a sin(2 pi N t) a partir de t = 0.
 * Le point ne bouge pas tant que l'onde ne l'a pas atteint (t < x / v).
 */
export function elongation(a: number, N: number, v: number, x: number, t: number): number {
  const delay = x / v;
  if (t < delay) return 0;
  return a * Math.sin(2 * Math.PI * N * (t - delay));
}

/** Retard d'un point situe a la distance d de la source : theta = d / v */
export const delay = (d: number, v: number) => d / v;

/** Dephasage entre deux points distants de d : delta phi = 2 pi d / lambda (rad) */
export const phaseDifference = (d: number, lambda: number) => (2 * Math.PI * d) / lambda;

export type PhaseRelation = 'en phase' | 'en opposition de phase' | 'en quadrature' | 'quelconque';

/** Compare les mouvements de deux points distants de d */
export function phaseRelation(d: number, lambda: number, eps = 1e-6): PhaseRelation {
  const r = d / lambda;
  const frac = r - Math.floor(r);
  const near = (x: number) => Math.abs(frac - x) < eps || Math.abs(frac - x - 1) < eps || Math.abs(frac - x + 1) < eps;
  if (near(0)) return 'en phase';
  if (near(0.5)) return 'en opposition de phase';
  if (near(0.25) || near(0.75)) return 'en quadrature';
  return 'quelconque';
}

/**
 * Stroboscopie : frequence apparente du mouvement observe sous un eclairage
 * de frequence Ne (Hz). 0 : immobilite apparente ; < 0 : mouvement
 * apparent ralenti en sens inverse.
 */
export function apparentFrequency(N: number, Ne: number): number {
  const k = Math.round(N / Ne);
  return N - k * Ne;
}

/** Plus grande frequence des eclairs donnant l'immobilite apparente : Ne = N */
export const maxStroboscopicFrequency = (N: number) => N;

// ============================================================
//  Interferences mecaniques
//  S1 et S2 vibrent en phase avec l'amplitude a. En un point M :
//  delta = d2 - d1 = S2M - S1M (difference de marche).
// ============================================================

/** Amplitude resultante en M : A = 2a |cos(pi delta / lambda)| */
export const interferenceAmplitude = (a: number, delta: number, lambda: number) =>
  2 * a * Math.abs(Math.cos((Math.PI * delta) / lambda));

/** Elongation resultante en M a l'instant t (sources : a sin(2 pi N t)), regime etabli */
export function interferenceElongation(a: number, N: number, lambda: number, d1: number, d2: number, t: number): number {
  const w = 2 * Math.PI * N;
  const k = (2 * Math.PI) / lambda;
  return a * Math.sin(w * t - k * d1) + a * Math.sin(w * t - k * d2);
}

export type FringeKind = 'maximum' | 'minimum' | 'intermediaire';

/** Nature du point M d'apres la difference de marche */
export function fringeKind(delta: number, lambda: number, eps = 1e-6): FringeKind {
  const p = delta / lambda;
  if (Math.abs(p - Math.round(p)) < eps) return 'maximum';
  if (Math.abs(p - 0.5 - Math.round(p - 0.5)) < eps) return 'minimum';
  return 'intermediaire';
}

/**
 * Nombre de lignes (hyperboles) d'amplitude maximale coupant le segment S1S2
 * (sources exclues) : entiers k tels que |k lambda| < d.
 */
export function countMaximaBetween(d: number, lambda: number): number {
  const r = d / lambda;
  const kmax = Number.isInteger(r) ? r - 1 : Math.floor(r);
  return 2 * kmax + 1;
}

/** Nombre de lignes d'amplitude nulle coupant S1S2 : entiers k tels que |(k + 1/2) lambda| < d */
export function countMinimaBetween(d: number, lambda: number): number {
  const r = d / lambda - 0.5;
  if (r < 0) return 0;
  const kmax = Number.isInteger(r) ? r - 1 : Math.floor(r);
  return 2 * (kmax + 1);
}

/** Distance entre deux points voisins d'amplitude maximale sur S1S2 : lambda / 2 */
export const maximaSpacingOnSegment = (lambda: number) => lambda / 2;

// ---------------- Son ----------------
export const SOUND_SPEED_AIR = 340; // m/s (vers 15-20 °C)

/** Distance d'un orage : la lumiere arrive quasi instantanement, le son met d / v */
export const thunderDistance = (dt: number, v = SOUND_SPEED_AIR) => v * dt;
