// lib/physics/laser.ts
// ============================================================
//  Le rayonnement laser : photons, puissance, eclairement
// ============================================================
import { H, C } from './quantum';

export interface LaserSource {
  id: string;
  name: string;
  /** longueur d'onde (m) */
  lambda: number;
  /** puissance typique (W) */
  power: number;
  use: string;
}

export const LASERS: LaserSource[] = [
  { id: 'hene', name: 'Hélium-néon', lambda: 632.8e-9, power: 1e-3, use: 'Laser de TP au lycée, alignement, lecteurs de codes-barres.' },
  { id: 'diode-rouge', name: 'Diode rouge (pointeur)', lambda: 650e-9, power: 1e-3, use: 'Pointeurs laser, lecteurs DVD.' },
  { id: 'diode-verte', name: 'Diode verte', lambda: 532e-9, power: 5e-3, use: 'Pointeurs verts, astronomie amateur.' },
  { id: 'bleu', name: 'Diode bleu-violet', lambda: 405e-9, power: 5e-3, use: 'Lecteurs Blu-ray (d\'où le nom).' },
  { id: 'ndyag', name: 'Nd:YAG (infrarouge)', lambda: 1064e-9, power: 10, use: 'Découpe, soudure, chirurgie, télémétrie.' },
  { id: 'co2', name: 'CO₂ (infrarouge lointain)', lambda: 10.6e-6, power: 100, use: 'Découpe industrielle du bois, du métal et du plastique.' },
];

/** Energie d'un photon E = h c / lambda (J) */
export const laserPhotonEnergy = (lambda: number) => (H * C) / lambda;

/** Nombre de photons emis par seconde : N = P / E = P lambda / (h c) */
export const photonsPerSecond = (P: number, lambda: number) => P / laserPhotonEnergy(lambda);

/** Eclairement (puissance surfacique) d'un faisceau de diametre d : E = P / (pi d^2 / 4) en W/m^2 */
export const irradiance = (P: number, d: number) => P / (Math.PI * d * d / 4);

/** Diametre du faisceau a la distance L pour un diametre initial d0 et une divergence totale theta (rad) */
export const beamDiameter = (d0: number, theta: number, L: number) => d0 + 2 * L * Math.tan(theta / 2);

/** Energie d'une impulsion E = P t */
export const pulseEnergy = (P: number, duration: number) => P * duration;

/** Duree d'un aller-retour Terre-Lune (telemetrie laser) : t = 2 d / c */
export const roundTripTime = (d: number) => (2 * d) / C;

/** Distance mesuree a partir de la duree d'aller-retour : d = c t / 2 */
export const distanceFromEcho = (t: number) => (C * t) / 2;
