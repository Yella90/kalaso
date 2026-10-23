// lib/physics/em-waves.ts
// ============================================================
//  Ondes electromagnetiques : spectre, c = lambda f, photons
// ============================================================
import { H, C, EV } from './quantum';

export interface SpectrumBand {
  id: string;
  name: string;
  /** bornes en longueur d'onde (m) : [min, max[ */
  min: number;
  max: number;
  color: string;
  examples: string;
}

/** Domaines du spectre electromagnetique (bornes usuelles, approximatives) */
export const SPECTRUM: SpectrumBand[] = [
  { id: 'gamma', name: 'Rayons γ', min: 0, max: 1e-11, color: '#a855f7', examples: 'Désintégrations nucléaires, radiothérapie.' },
  { id: 'x', name: 'Rayons X', min: 1e-11, max: 1e-8, color: '#8b5cf6', examples: 'Radiographie, scanner, contrôle des bagages.' },
  { id: 'uv', name: 'Ultraviolet', min: 1e-8, max: 400e-9, color: '#6366f1', examples: 'Soleil (bronzage, coups de soleil), stérilisation.' },
  { id: 'visible', name: 'Visible', min: 400e-9, max: 800e-9, color: '#22c55e', examples: 'La seule partie perçue par l\'œil : du violet au rouge.' },
  { id: 'ir', name: 'Infrarouge', min: 800e-9, max: 1e-3, color: '#ef4444', examples: 'Télécommandes, caméras thermiques, chaleur du feu.' },
  { id: 'micro', name: 'Micro-ondes', min: 1e-3, max: 1, color: '#f97316', examples: 'Four à micro-ondes, Wi-Fi, téléphones, radar.' },
  { id: 'radio', name: 'Ondes radio', min: 1, max: Infinity, color: '#eab308', examples: 'Radio FM/AM, télévision, communications.' },
];

export function bandOf(lambda: number): SpectrumBand {
  return SPECTRUM.find((b) => lambda >= b.min && lambda < b.max) ?? SPECTRUM[SPECTRUM.length - 1];
}

/** Frequence f = c / lambda */
export const emFrequency = (lambda: number) => C / lambda;

/** Longueur d'onde lambda = c / f */
export const emWavelength = (f: number) => C / f;

/** Periode T = 1 / f = lambda / c */
export const emPeriod = (lambda: number) => lambda / C;

/** Energie du photon associe (eV) */
export const emPhotonEnergyEV = (lambda: number) => (H * C) / lambda / EV;

/** Celerite dans un milieu d'indice n : v = c / n */
export const speedInMedium = (n: number) => C / n;

/** Duree de propagation sur une distance d (vide) */
export const propagationTime = (d: number) => d / C;

/** Couleur approximative d'une longueur d'onde visible (nom) */
export function visibleColorName(lambda: number): string | null {
  const nm = lambda * 1e9;
  if (nm < 400 || nm >= 800) return null;
  if (nm < 450) return 'violet';
  if (nm < 490) return 'bleu';
  if (nm < 560) return 'vert';
  if (nm < 590) return 'jaune';
  if (nm < 630) return 'orange';
  return 'rouge';
}
