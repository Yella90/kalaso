// lib/physics/xrays.ts
// ============================================================
//  Les rayons X : tube de Coolidge, spectre, longueur d'onde minimale
// ============================================================
import { H, C, EV, M_E } from './quantum';

/** Energie cinetique d'un electron accelere sous la tension U : Ec = e U (J) */
export const electronEnergy = (U: number) => EV * U;

/** Vitesse non relativiste de l'electron arrivant sur l'anticathode */
export const electronSpeed = (U: number) => Math.sqrt((2 * EV * U) / M_E);

/** Longueur d'onde minimale (loi de Duane-Hunt) : lambda_min = h c / (e U) */
export const minWavelength = (U: number) => (H * C) / (EV * U);

/** Frequence maximale : nu_max = e U / h */
export const maxFrequency = (U: number) => (EV * U) / H;

/** Puissance electrique consommee par le tube P = U I */
export const tubePower = (U: number, I: number) => U * I;

/** Nombre d'electrons frappant l'anticathode par seconde : n = I / e */
export const electronsPerSecond = (I: number) => I / EV;

/** Puissance emise sous forme de rayons X (rendement eta, de l'ordre de 1 %) */
export const xrayPower = (U: number, I: number, eta = 0.01) => eta * U * I;

/** Puissance dissipee en chaleur dans l'anticathode */
export const heatPower = (U: number, I: number, eta = 0.01) => (1 - eta) * U * I;

/** Raies caracteristiques du tungstene (keV) et seuil d'excitation de la couche K */
export const TUNGSTEN = { Ka: 59.3, Kb: 67.2, Kedge: 69.5 };

/** Energie (keV) -> longueur d'onde (m) */
export const keVToWavelength = (keV: number) => (H * C) / (keV * 1e3 * EV);

/**
 * Forme du spectre continu (loi de Kramers), normalisee a 1 au maximum :
 * I(lambda) proportionnelle a (lambda/lambda_min - 1) / lambda^2, nulle sous lambda_min.
 */
export function bremsstrahlung(lambda: number, U: number): number {
  const lm = minWavelength(U);
  if (lambda <= lm) return 0;
  const raw = (lambda / lm - 1) / (lambda * lambda);
  // maximum de (x - 1)/x^2 atteint en x = 2 : valeur 1/4 / lm^2
  return raw / (1 / (4 * lm * lm));
}

/** Absorption par un ecran : I = I0 exp(-mu x) ; epaisseur de demi-attenuation x1/2 = ln2 / mu */
export const transmitted = (I0: number, mu: number, x: number) => I0 * Math.exp(-mu * x);
export const halfValueLayer = (mu: number) => Math.LN2 / mu;
