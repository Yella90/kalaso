// lib/physics/oscillators.ts
// ============================================================
//  Oscillations libres : pendule elastique (ressort-masse) et
//  pendule simple / pesant. Solutions analytiques + integration
//  numerique Runge-Kutta 4 (grands angles, amortissement).
// ============================================================

// ---------------- Outils ----------------
export interface State2 { x: number; v: number }

/** Un pas de Runge-Kutta d'ordre 4 pour x'' = acc(x, v) */
export function rk4Step(s: State2, dt: number, acc: (x: number, v: number) => number): State2 {
  const k1x = s.v, k1v = acc(s.x, s.v);
  const k2x = s.v + 0.5 * dt * k1v, k2v = acc(s.x + 0.5 * dt * k1x, s.v + 0.5 * dt * k1v);
  const k3x = s.v + 0.5 * dt * k2v, k3v = acc(s.x + 0.5 * dt * k2x, s.v + 0.5 * dt * k2v);
  const k4x = s.v + dt * k3v, k4v = acc(s.x + dt * k3x, s.v + dt * k3v);
  return {
    x: s.x + (dt / 6) * (k1x + 2 * k2x + 2 * k3x + k4x),
    v: s.v + (dt / 6) * (k1v + 2 * k2v + 2 * k3v + k4v),
  };
}

// ============================================================
//  Pendule elastique horizontal : m x'' = -k x - h x'
// ============================================================
export interface SpringParams {
  /** masse (kg) */
  m: number;
  /** raideur (N/m) */
  k: number;
  /** coefficient de frottement fluide (kg/s), 0 = sans amortissement */
  h?: number;
}

export const springOmega = (p: SpringParams) => Math.sqrt(p.k / p.m);
export const springPeriod = (p: SpringParams) => 2 * Math.PI * Math.sqrt(p.m / p.k);
export const springFrequency = (p: SpringParams) => 1 / springPeriod(p);

/** Solution sans frottement : x(t) = Xm cos(w0 t + phi) */
export function springX(p: SpringParams, Xm: number, t: number, phi = 0): number {
  return Xm * Math.cos(springOmega(p) * t + phi);
}
export function springV(p: SpringParams, Xm: number, t: number, phi = 0): number {
  return -Xm * springOmega(p) * Math.sin(springOmega(p) * t + phi);
}

/** Energies (J) */
export const kineticEnergy = (m: number, v: number) => 0.5 * m * v * v;
export const elasticEnergy = (k: number, x: number) => 0.5 * k * x * x;
/** Energie mecanique d'un oscillateur non amorti */
export const springEnergy = (k: number, Xm: number) => 0.5 * k * Xm * Xm;
/** Vitesse maximale (passage a l'equilibre) : Vm = Xm.w0 */
export const springVmax = (p: SpringParams, Xm: number) => Xm * springOmega(p);

/** Allongement a l'equilibre d'un ressort vertical : dl = m g / k */
export const verticalElongation = (m: number, k: number, g = 9.8) => (m * g) / k;

export function springAcc(p: SpringParams) {
  const h = p.h ?? 0;
  return (x: number, v: number) => (-p.k * x - h * v) / p.m;
}

// ============================================================
//  Pendule simple : theta'' = -(g/l) sin(theta) - (h/m) theta'
// ============================================================
export interface PendulumParams {
  /** longueur du fil (m) */
  l: number;
  /** pesanteur (m/s2) */
  g: number;
  /** amortissement (s^-1), 0 = sans frottement */
  gamma?: number;
}

/** Periode des petites oscillations : T0 = 2 pi sqrt(l/g) */
export const pendulumPeriod = (p: PendulumParams) => 2 * Math.PI * Math.sqrt(p.l / p.g);

/** Formule de Borda (correction d'amplitude) : T ~ T0 (1 + theta0^2/16 + 11 theta0^4/3072) */
export function pendulumPeriodBorda(p: PendulumParams, theta0: number): number {
  return pendulumPeriod(p) * (1 + (theta0 * theta0) / 16 + (11 * theta0 ** 4) / 3072);
}

export function pendulumAcc(p: PendulumParams, linear = false) {
  const gamma = p.gamma ?? 0;
  return (th: number, w: number) => -(p.g / p.l) * (linear ? th : Math.sin(th)) - gamma * w;
}

/**
 * Periode exacte (grands angles) mesuree par integration numerique :
 * temps entre le lacher (theta0, vitesse nulle) et le premier retour
 * a vitesse nulle du meme cote (= une periode).
 */
export function pendulumPeriodExact(p: PendulumParams, theta0: number, dt = 1e-4): number {
  const acc = pendulumAcc({ ...p, gamma: 0 });
  let s: State2 = { x: theta0, v: 0 };
  let t = 0;
  // Demi-periode : premier changement de signe de la vitesse apres le depart
  let prevV = 0;
  for (let i = 0; i < 1e7; i++) {
    const n = rk4Step(s, dt, acc);
    t += dt;
    if (i > 10 && prevV < 0 && n.v >= 0) {
      // interpolation lineaire de l'instant ou v = 0
      const f = -prevV / (n.v - prevV);
      return 2 * (t - dt + f * dt);
    }
    prevV = n.v;
    s = n;
  }
  return NaN;
}

/** Pendule pesant (solide) : T = 2 pi sqrt(J / (m g d)) */
export function compoundPeriod(J: number, m: number, g: number, d: number): number {
  return 2 * Math.PI * Math.sqrt(J / (m * g * d));
}

/** Longueur du pendule simple synchrone d'un pendule pesant : l = J / (m d) */
export const equivalentLength = (J: number, m: number, d: number) => J / (m * d);

/** Pendule simple qui "bat la seconde" (demi-periode = 1 s) : l = g / pi^2 */
export const secondsPendulumLength = (g: number) => g / (Math.PI * Math.PI);
