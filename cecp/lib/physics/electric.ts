// lib/physics/electric.ts
// ============================================================
//  Electricite : auto-induction (dipole RL), circuit oscillant LC,
//  oscillations libres amorties (RLC serie) et oscillations
//  electriques forcees (RLC serie en regime sinusoidal).
//  Unites SI : H, F, ohm, V, A, C (coulomb), s.
// ============================================================

import { rk4Step } from './oscillators';

export const MU0 = 4 * Math.PI * 1e-7; // permeabilite du vide (SI)

// ============================================================
//  Auto-induction : dipole RL soumis a un echelon de tension E
// ============================================================

/** Inductance d'un solenoide long : L = mu0 N^2 S / l */
export const solenoidInductance = (N: number, S: number, l: number) => (MU0 * N * N * S) / l;

/** Constante de temps tau = L / R (R : resistance totale du circuit) */
export const rlTimeConstant = (L: number, R: number) => L / R;

/** Intensite en regime permanent I0 = E / R */
export const rlSteadyCurrent = (E: number, R: number) => E / R;

/** Etablissement du courant : i(t) = (E/R)(1 - e^(-t/tau)) */
export function rlRise(E: number, R: number, L: number, t: number): number {
  return rlSteadyCurrent(E, R) * (1 - Math.exp(-t / rlTimeConstant(L, R)));
}

/** Rupture du courant : i(t) = I0 e^(-t/tau) */
export function rlFall(I0: number, R: number, L: number, t: number): number {
  return I0 * Math.exp(-t / rlTimeConstant(L, R));
}

/** Tension aux bornes de la bobine pure pendant l'etablissement : uL = L di/dt = E e^(-t/tau) */
export function rlCoilVoltageRise(E: number, R: number, L: number, t: number): number {
  return E * Math.exp(-t / rlTimeConstant(L, R));
}

/** Force electromotrice d'auto-induction : e = -L di/dt */
export const selfInducedEmf = (L: number, didt: number) => -L * didt;

/** Energie magnetique stockee dans une bobine : E = 1/2 L i^2 */
export const magneticEnergy = (L: number, i: number) => 0.5 * L * i * i;

// ============================================================
//  Circuit oscillant LC (sans resistance)
// ============================================================

/** Pulsation propre w0 = 1 / sqrt(LC) */
export const lcOmega = (L: number, C: number) => 1 / Math.sqrt(L * C);
/** Periode propre T0 = 2 pi sqrt(LC) (formule de Thomson) */
export const lcPeriod = (L: number, C: number) => 2 * Math.PI * Math.sqrt(L * C);
/** Frequence propre f0 = 1 / (2 pi sqrt(LC)) */
export const lcFrequency = (L: number, C: number) => 1 / lcPeriod(L, C);

/** Charge du condensateur : q(t) = Qm cos(w0 t + phi) */
export const lcCharge = (L: number, C: number, Qm: number, t: number, phi = 0) =>
  Qm * Math.cos(lcOmega(L, C) * t + phi);

/** Intensite i = dq/dt = -Qm w0 sin(w0 t + phi) */
export const lcCurrent = (L: number, C: number, Qm: number, t: number, phi = 0) =>
  -Qm * lcOmega(L, C) * Math.sin(lcOmega(L, C) * t + phi);

/** Intensite maximale Im = Qm w0 */
export const lcMaxCurrent = (L: number, C: number, Qm: number) => Qm * lcOmega(L, C);

/** Energie electrique du condensateur : q^2 / (2C) */
export const electricEnergy = (C: number, q: number) => (q * q) / (2 * C);

/** Energie totale d'un circuit LC : Qm^2 / (2C) = 1/2 L Im^2 */
export const lcTotalEnergy = (C: number, Qm: number) => (Qm * Qm) / (2 * C);

/** Capacite a associer a une bobine L pour obtenir la frequence f : C = 1 / (4 pi^2 f^2 L) */
export const capacitanceForFrequency = (f: number, L: number) => 1 / (4 * Math.PI * Math.PI * f * f * L);

// ============================================================
//  Oscillations libres amorties (RLC serie) : L q'' + R q' + q/C = 0
// ============================================================

/** Acceleration q'' = -(R/L) q' - q/(LC), utilisable avec rk4Step */
export function rlcFreeAcc(R: number, L: number, C: number) {
  return (q: number, i: number) => -(R / L) * i - q / (L * C);
}

/** Resistance critique : Rc = 2 sqrt(L/C) */
export const criticalResistance = (L: number, C: number) => 2 * Math.sqrt(L / C);

export type DampingRegime = 'periodique' | 'pseudo-periodique' | 'critique' | 'aperiodique';

export function dampingRegime(R: number, L: number, C: number): DampingRegime {
  if (R === 0) return 'periodique';
  const Rc = criticalResistance(L, C);
  if (Math.abs(R - Rc) / Rc < 1e-9) return 'critique';
  return R < Rc ? 'pseudo-periodique' : 'aperiodique';
}

/** Pseudo-periode T = 2 pi / sqrt(w0^2 - (R/2L)^2) (regime pseudo-periodique) */
export function pseudoPeriod(R: number, L: number, C: number): number {
  const w0 = lcOmega(L, C);
  const a = R / (2 * L);
  return a < w0 ? (2 * Math.PI) / Math.sqrt(w0 * w0 - a * a) : NaN;
}

export interface CircuitState { q: number; i: number }

/** Pas de Runge-Kutta 4 pour le circuit RLC libre (q, i) */
export function rlcStep(s: CircuitState, dt: number, R: number, L: number, C: number): CircuitState {
  const n = rk4Step({ x: s.q, v: s.i }, dt, rlcFreeAcc(R, L, C));
  return { q: n.x, i: n.v };
}

// ============================================================
//  Oscillations electriques forcees : RLC serie alimente par
//  u(t) = Um cos(w t). En regime permanent i(t) = Im cos(w t - phi).
// ============================================================

/** Reactance X = L w - 1/(C w) */
export const reactance = (L: number, C: number, w: number) => L * w - 1 / (C * w);

/** Impedance Z = sqrt(R^2 + (L w - 1/(C w))^2) */
export const impedance = (R: number, L: number, C: number, w: number) =>
  Math.sqrt(R * R + reactance(L, C, w) ** 2);

/** Amplitude (ou valeur efficace) du courant : Im = Um / Z */
export const forcedCurrentAmplitude = (Um: number, R: number, L: number, C: number, w: number) =>
  Um / impedance(R, L, C, w);

/**
 * Dephasage phi de la tension u par rapport a l'intensite i (rad) :
 * tan(phi) = (L w - 1/(C w)) / R. phi > 0 : circuit inductif, phi < 0 : capacitif.
 */
export const phaseShift = (R: number, L: number, C: number, w: number) => Math.atan2(reactance(L, C, w), R);

/** Facteur de puissance cos(phi) = R / Z */
export const powerFactor = (R: number, L: number, C: number, w: number) => R / impedance(R, L, C, w);

/** Puissance moyenne P = R I^2 = U I cos(phi) (U et I efficaces) */
export const averagePower = (Ueff: number, R: number, L: number, C: number, w: number) => {
  const I = Ueff / impedance(R, L, C, w);
  return R * I * I;
};

/** Frequence de resonance (d'intensite) : f0 = 1 / (2 pi sqrt(LC)) */
export const resonanceFrequency = lcFrequency;

/** Facteur de qualite Q = L w0 / R = 1/(R C w0) */
export const qualityFactor = (R: number, L: number, C: number) => (L * lcOmega(L, C)) / R;

/** Largeur de la bande passante a -3 dB : delta f = R / (2 pi L) = f0 / Q */
export const bandwidth = (R: number, L: number) => R / (2 * Math.PI * L);

/** Frequences de coupure f1 < f0 < f2 (ou I = I0 / sqrt(2)) */
export function cutoffFrequencies(R: number, L: number, C: number): [number, number] {
  const a = R / (2 * L);
  const w0 = lcOmega(L, C);
  const root = Math.sqrt(a * a + w0 * w0);
  return [(root - a) / (2 * Math.PI), (root + a) / (2 * Math.PI)];
}

/** Tension aux bornes du condensateur a la resonance : UC = Q U (surtension) */
export const resonanceCapacitorVoltage = (U: number, R: number, L: number, C: number) => qualityFactor(R, L, C) * U;
