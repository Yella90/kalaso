// lib/physics/nucleus.ts
// ============================================================
//  Le noyau atomique : defaut de masse, energie de liaison
// ============================================================

/** Masses en unites de masse atomique (u) */
export const M_PROTON = 1.00728;
export const M_NEUTRON = 1.00866;
/** 1 u = 931,5 MeV/c^2 */
export const U_MEV = 931.5;
/** 1 u en kg */
export const U_KG = 1.66054e-27;
/** 1 MeV en joules */
export const MEV_J = 1.602e-13;

export interface Nucleus {
  id: string;
  name: string;
  symbol: string;
  Z: number;
  A: number;
  /** masse du noyau (u) */
  mass: number;
}

/** Masses des noyaux (masse atomique moins Z electrons), en u */
export const NUCLEI: Nucleus[] = [
  { id: 'h2', name: 'Deutérium', symbol: 'H', Z: 1, A: 2, mass: 2.01355 },
  { id: 'he4', name: 'Hélium 4', symbol: 'He', Z: 2, A: 4, mass: 4.00151 },
  { id: 'li7', name: 'Lithium 7', symbol: 'Li', Z: 3, A: 7, mass: 7.01436 },
  { id: 'c12', name: 'Carbone 12', symbol: 'C', Z: 6, A: 12, mass: 11.99671 },
  { id: 'o16', name: 'Oxygène 16', symbol: 'O', Z: 8, A: 16, mass: 15.99052 },
  { id: 'fe56', name: 'Fer 56', symbol: 'Fe', Z: 26, A: 56, mass: 55.92067 },
  { id: 'u235', name: 'Uranium 235', symbol: 'U', Z: 92, A: 235, mass: 234.99346 },
  { id: 'u238', name: 'Uranium 238', symbol: 'U', Z: 92, A: 238, mass: 238.00031 },
];

/** Nombre de neutrons N = A - Z */
export const neutrons = (Z: number, A: number) => A - Z;

/** Defaut de masse (u) : dm = Z mp + (A - Z) mn - m(noyau) */
export const massDefect = (Z: number, A: number, mass: number) => Z * M_PROTON + (A - Z) * M_NEUTRON - mass;

/** Energie de liaison (MeV) : El = dm c^2 */
export const bindingEnergy = (Z: number, A: number, mass: number) => massDefect(Z, A, mass) * U_MEV;

/** Energie de liaison par nucleon (MeV/nucleon) */
export const bindingPerNucleon = (Z: number, A: number, mass: number) => bindingEnergy(Z, A, mass) / A;

export const nucleusBinding = (n: Nucleus) => bindingEnergy(n.Z, n.A, n.mass);
export const nucleusBindingPerNucleon = (n: Nucleus) => bindingPerNucleon(n.Z, n.A, n.mass);

/** Equivalence masse-energie E = m c^2 (J), m en kg */
export const massEnergy = (mKg: number) => mKg * 299792458 ** 2;

/** Energie liberee par une reaction (MeV) : masses des reactifs - masses des produits */
export const reactionEnergy = (reactants: number[], products: number[]) =>
  (reactants.reduce((a, b) => a + b, 0) - products.reduce((a, b) => a + b, 0)) * U_MEV;

/** Rayon approximatif du noyau : R = r0 A^(1/3), r0 = 1,2 fm */
export const nuclearRadius = (A: number, r0 = 1.2e-15) => r0 * Math.cbrt(A);

/**
 * Courbe d'Aston approchee (formule semi-empirique de Weizsacker),
 * energie de liaison par nucleon en MeV pour un noyau stable de nombre de masse A.
 */
export function astonCurve(A: number): number {
  // Z de la vallee de stabilite
  const Z = A / (1.98 + 0.0155 * A ** (2 / 3));
  const B = 15.75 * A - 17.8 * A ** (2 / 3) - 0.711 * (Z * Z) / A ** (1 / 3) - 23.7 * ((A - 2 * Z) ** 2) / A;
  return Math.max(0, B / A);
}
