// lib/chemistry/conformations.ts
// ============================================================
//  Energie de conformation en fonction de l'angle diedre phi
//  (phi = 0 : conformation eclipsee "syn"). Valeurs usuelles en kJ/mol.
// ============================================================

/** Ethane : barriere de 12 kJ/mol entre conformations decalee et eclipsee */
export const ethaneEnergy = (phiDeg: number) => 6 * (1 + Math.cos((3 * phiDeg * Math.PI) / 180));

/**
 * Butane (rotation autour de C2-C3) : developpement de Fourier ajuste sur
 * E(0°) = 19 (eclipsee CH3/CH3), E(60°) = 3,8 (decalee gauche),
 * E(120°) = 16 (eclipsee CH3/H), E(180°) = 0 (decalee anti).
 */
export function butaneEnergy(phiDeg: number): number {
  const p = (phiDeg * Math.PI) / 180;
  const a = 6.8 / 3, b = 3.8 / 1.5 - a, c = 9.5 - a;
  return a * (1 + Math.cos(p)) + b * (1 - Math.cos(2 * p)) + c * (1 + Math.cos(3 * p));
}

export type ConformationName = 'éclipsée' | 'décalée' | 'décalée anti' | 'décalée gauche' | 'intermédiaire';

/** Nom de la conformation pour un angle diedre donne (tolerance de 5°) */
export function conformationName(molecule: 'ethane' | 'butane', phiDeg: number): ConformationName {
  const p = ((phiDeg % 360) + 360) % 360;
  const near = (x: number) => Math.min(Math.abs(p - x), 360 - Math.abs(p - x)) <= 5;
  if ([0, 120, 240].some(near)) return 'éclipsée';
  if (molecule === 'ethane') return [60, 180, 300].some(near) ? 'décalée' : 'intermédiaire';
  if (near(180)) return 'décalée anti';
  if (near(60) || near(300)) return 'décalée gauche';
  return 'intermédiaire';
}
