// lib/physics/magnetic.ts
// ============================================================
//  Particule chargee dans un champ magnetique uniforme B.
//  Force de Lorentz F = q v ^ B ; mouvement circulaire uniforme
//  quand v est perpendiculaire a B.
// ============================================================

export const E = 1.6e-19;          // charge elementaire (C)
export const U_MASS = 1.66e-27;    // unite de masse atomique (kg)

export interface Particle {
  id: string;
  name: string;
  /** charge (C), avec son signe */
  q: number;
  /** masse (kg) */
  m: number;
  color: string;
}

export const PARTICLES: Particle[] = [
  { id: 'electron', name: 'Électron', q: -E, m: 9.11e-31, color: '#22d3ee' },
  { id: 'proton', name: 'Proton', q: E, m: 1.67e-27, color: '#f97316' },
  { id: 'alpha', name: 'Particule α (He²⁺)', q: 2 * E, m: 6.64e-27, color: '#a78bfa' },
  { id: 'deuton', name: 'Deuton (²H⁺)', q: E, m: 3.34e-27, color: '#facc15' },
];

/** Paires d'isotopes classiques pour le spectrographe de masse (ions de charge +e) */
export const ISOTOPE_PAIRS = [
  { id: 'li', name: 'Lithium ⁶Li⁺ / ⁷Li⁺', A1: 6, A2: 7 },
  { id: 'ne', name: 'Néon ²⁰Ne⁺ / ²²Ne⁺', A1: 20, A2: 22 },
  { id: 'cl', name: 'Chlore ³⁵Cl⁻ / ³⁷Cl⁻ (charge −e)', A1: 35, A2: 37, negative: true },
  { id: 'u', name: 'Uranium ²³⁵U⁺ / ²³⁸U⁺', A1: 235, A2: 238 },
] as const;

/** Intensite de la force de Lorentz (v perpendiculaire a B) : F = |q| v B */
export function lorentzForce(q: number, v: number, B: number): number {
  return Math.abs(q) * v * B;
}

/** Rayon de la trajectoire : R = m v / (|q| B) */
export function cyclotronRadius(m: number, q: number, v: number, B: number): number {
  return (m * v) / (Math.abs(q) * B);
}

/** Pulsation cyclotron : omega = |q| B / m (rad/s) */
export function cyclotronOmega(m: number, q: number, B: number): number {
  return (Math.abs(q) * B) / m;
}

/** Periode : T = 2 pi m / (|q| B) - independante de la vitesse ! */
export function cyclotronPeriod(m: number, q: number, B: number): number {
  return (2 * Math.PI * m) / (Math.abs(q) * B);
}

/** Vitesse acquise apres acceleration sous la tension U (depart au repos) : v = sqrt(2|q|U/m) */
export function speedAfterVoltage(m: number, q: number, U: number): number {
  return Math.sqrt((2 * Math.abs(q) * U) / m);
}

/**
 * Position a l'instant t : la particule part de l'origine avec v selon +x,
 * B selon +z (sortant de l'ecran). Une charge positive tourne dans le
 * sens horaire, une charge negative dans le sens trigonometrique.
 */
export function positionInB(m: number, q: number, v: number, B: number, t: number) {
  const R = cyclotronRadius(m, q, v, B);
  const w = cyclotronOmega(m, q, B);
  const s = q > 0 ? -1 : 1;
  return {
    x: R * Math.sin(w * t),
    y: s * R * (1 - Math.cos(w * t)),
    vx: v * Math.cos(w * t),
    vy: s * v * Math.sin(w * t),
  };
}

/** Spectrographe : rayon pour un ion de nombre de masse A, charge z.e, accelere sous U */
export function spectroRadius(A: number, z: number, U: number, B: number): number {
  const m = A * U_MASS;
  const q = z * E;
  return cyclotronRadius(m, q, speedAfterVoltage(m, q, U), B);
}

/** Distance entre les points d'impact de deux isotopes (demi-tour : diametre 2R) */
export function spectroSeparation(A1: number, A2: number, z: number, U: number, B: number): number {
  return 2 * Math.abs(spectroRadius(A2, z, U, B) - spectroRadius(A1, z, U, B));
}
