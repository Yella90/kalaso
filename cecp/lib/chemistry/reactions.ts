// lib/chemistry/reactions.ts
// ============================================================
//  Reactions de chimie organique : oxydation menagee des alcools,
//  tests caracteristiques, esterification / hydrolyse (equilibre et
//  cinetique), saponification, nomenclature des esters.
//  Quantites de matiere en mol, masses en g. Aucune dependance React.
// ============================================================

import { moleculeOf, findMolecule, type Family } from './library';
import { alcoholClass, molarMass } from './molecule';

// ============================================================
//  Oxydation menagee des alcools
// ============================================================
export interface OxidationPath {
  /** Produit obtenu avec un defaut d'oxydant (ou par distillation au fur et a mesure) */
  limited: string | null;
  /** Produit obtenu avec un exces d'oxydant */
  excess: string | null;
}

/** Produits d'oxydation menagee des alcools de la bibliotheque */
export const OXIDATION: Record<string, OxidationPath> = {
  methanol: { limited: 'methanal', excess: 'acide-methanoique' },
  ethanol: { limited: 'ethanal', excess: 'acide-ethanoique' },
  'propan-1-ol': { limited: 'propanal', excess: 'acide-propanoique' },
  'butan-1-ol': { limited: 'butanal', excess: 'acide-butanoique' },
  '2-methylpropan-1-ol': { limited: '2-methylpropanal', excess: 'acide-2-methylpropanoique' },
  'propan-2-ol': { limited: 'propanone', excess: 'propanone' },
  'butan-2-ol': { limited: 'butanone', excess: 'butanone' },
  '2-methylpropan-2-ol': { limited: null, excess: null },
};

/** Produit de l'oxydation menagee (null : pas de reaction, alcool tertiaire) */
export function oxidationProduct(alcoholId: string, excessOxidant: boolean): string | null {
  const path = OXIDATION[alcoholId];
  if (!path) throw new Error(`Alcool sans données d'oxydation : ${alcoholId}`);
  return excessOxidant ? path.excess : path.limited;
}

export interface TestResults {
  /** 2,4-DNPH : precipite jaune-orange avec aldehydes et cetones */
  dnph: boolean;
  /** Liqueur de Fehling : precipite rouge brique avec les aldehydes */
  fehling: boolean;
  /** Reactif de Tollens : miroir d'argent avec les aldehydes */
  tollens: boolean;
  /** Reactif de Schiff : rose avec les aldehydes */
  schiff: boolean;
  /** BBT : jaune en solution acide */
  bbtAcid: boolean;
}

/** Resultats des tests caracteristiques selon la famille du produit */
export function characteristicTests(family: Family | null): TestResults {
  const ald = family === 'aldéhyde';
  return {
    dnph: ald || family === 'cétone',
    fehling: ald,
    tollens: ald,
    schiff: ald,
    bbtAcid: family === 'acide carboxylique',
  };
}

// ---------------- Stoechiometrie avec le dichromate ----------------
// Cr2O7^2- + 14 H+ + 6 e- -> 2 Cr3+ + 7 H2O
// alcool primaire -> aldehyde : 2 e- ; alcool primaire -> acide : 4 e- ; alcool secondaire -> cetone : 2 e-

/** Nombre d'electrons echanges par molecule d'alcool oxydee */
export function electronsPerAlcohol(alcoholId: string, excessOxidant: boolean): number {
  const cls = alcoholClass(moleculeOf(alcoholId));
  if (cls === 'tertiaire') return 0;
  if (cls === 'primaire') return excessOxidant ? 4 : 2;
  return 2;
}

/** Quantite d'ions dichromate (mol) necessaire pour oxyder n mol d'alcool */
export function dichromateNeeded(alcoholId: string, nAlcohol: number, excessOxidant: boolean): number {
  return (nAlcohol * electronsPerAlcohol(alcoholId, excessOxidant)) / 6;
}

/** Quantite d'ions permanganate (mol) : MnO4- + 8 H+ + 5 e- -> Mn2+ + 4 H2O */
export function permanganateNeeded(alcoholId: string, nAlcohol: number, excessOxidant: boolean): number {
  return (nAlcohol * electronsPerAlcohol(alcoholId, excessOxidant)) / 5;
}

// ============================================================
//  Esterification et hydrolyse
//  acide + alcool = ester + eau      K = [ester][eau] / ([acide][alcool])
// ============================================================

/** Rendements usuels d'un melange equimolaire selon la classe de l'alcool */
export const ESTER_YIELD = { primaire: 2 / 3, secondaire: 0.6, tertiaire: 0.05 } as const;
export type AlcoholClass = keyof typeof ESTER_YIELD;

/** Constante d'equilibre deduite du rendement d'un melange equimolaire : K = (r / (1 - r))^2 */
export const esterK = (cls: AlcoholClass) => (ESTER_YIELD[cls] / (1 - ESTER_YIELD[cls])) ** 2;

/**
 * Avancement a l'equilibre x (mol) partant de a mol d'acide, b mol d'alcool,
 * e mol d'ester et w mol d'eau : (e + x)(w + x) = K (a - x)(b - x).
 */
export function equilibriumAdvance(a: number, b: number, K: number, e = 0, w = 0): number {
  const A = 1 - K;
  const B = e + w + K * (a + b);
  const C = e * w - K * a * b;
  const lo = -Math.min(e, w), hi = Math.min(a, b);
  if (Math.abs(A) < 1e-12) return -C / B;
  const d = Math.sqrt(B * B - 4 * A * C);
  const roots = [(-B + d) / (2 * A), (-B - d) / (2 * A)];
  return roots.find((x) => x >= lo - 1e-12 && x <= hi + 1e-12) ?? NaN;
}

/** Rendement de l'esterification : x_eq / x_max */
export function esterYield(a: number, b: number, K: number): number {
  return equilibriumAdvance(a, b, K) / Math.min(a, b);
}

/** Quotient de reaction */
export const reactionQuotient = (acid: number, alcohol: number, ester: number, water: number) =>
  (ester * water) / (acid * alcohol);

/**
 * Vitesse d'avancement dx/dt (mol/h) : loi cinetique simplifiee
 * dx/dt = k [(a - x)(b - x) - (e + x)(w + x) / K]. k (mol^-1.h^-1) augmente
 * avec la temperature et la presence d'un catalyseur (ions H+).
 */
export function esterificationRate(x: number, a: number, b: number, K: number, k: number, e = 0, w = 0): number {
  return k * ((a - x) * (b - x) - ((e + x) * (w + x)) / K);
}

/** Constante de vitesse du modele selon les conditions experimentales (unite arbitraire) */
export function rateConstant(catalyst: boolean, heated: boolean): number {
  return (catalyst ? 1 : 0.08) * (heated ? 1 : 0.15);
}

/** Integration (Runge-Kutta 4) de l'avancement sur une duree t (h) */
export function esterificationAdvance(t: number, a: number, b: number, K: number, k: number, e = 0, w = 0, dt = 0.01): number {
  let x = 0;
  const f = (y: number) => esterificationRate(y, a, b, K, k, e, w);
  for (let s = 0; s < t; s += dt) {
    const h = Math.min(dt, t - s);
    const k1 = f(x), k2 = f(x + (h / 2) * k1), k3 = f(x + (h / 2) * k2), k4 = f(x + h * k3);
    x += (h / 6) * (k1 + 2 * k2 + 2 * k3 + k4);
  }
  return x;
}

// ============================================================
//  Nomenclature des esters et des acides lineaires
// ============================================================
const PREFIX = ['', 'méth', 'éth', 'prop', 'but', 'pent', 'hex', 'hept', 'oct'];

/** Nom de l'acide carboxylique lineaire a n carbones */
export const acidName = (n: number) => `acide ${PREFIX[n]}anoïque`;
/** Nom du groupe alkyle lineaire a n carbones */
export const alkylName = (n: number) => `${PREFIX[n]}yle`;

/** Nom de l'ester obtenu a partir d'un acide lineaire (n carbones) et d'un alcool primaire lineaire (p carbones) */
export function esterName(nAcid: number, pAlcohol: number): string {
  const alkyl = alkylName(pAlcohol);
  const de = /^[aeiouyéè]/i.test(alkyl) ? "d'" : 'de ';
  return `${PREFIX[nAcid]}anoate ${de}${alkyl}`;
}

/** Formule brute d'un ester sature : C(n+p) H(2(n+p)) O2 */
export const esterFormula = (nAcid: number, pAlcohol: number) => `C${nAcid + pAlcohol}H${2 * (nAcid + pAlcohol)}O2`;

/** Masse molaire d'un compose de formule generale (g/mol) */
export const MOLAR_MASS_GENERAL = {
  /** alcool sature CnH2n+2O */
  alcool: (n: number) => 14 * n + 18,
  /** aldehyde ou cetone CnH2nO */
  carbonyle: (n: number) => 14 * n + 16,
  /** acide carboxylique ou ester CnH2nO2 */
  acide: (n: number) => 14 * n + 32,
  /** amine saturee CnH2n+3N */
  amine: (n: number) => 14 * n + 17,
} as const;

/** Nombre de carbones n a partir de la masse molaire et de la famille */
export function carbonsFromMolarMass(family: keyof typeof MOLAR_MASS_GENERAL, M: number): number {
  const offset = { alcool: 18, carbonyle: 16, acide: 32, amine: 17 }[family];
  return (M - offset) / 14;
}

// ============================================================
//  Saponification (reaction totale)
//  ester + HO- -> ion carboxylate + alcool
//  triglyceride + 3 HO- -> glycerol + 3 ions carboxylate (savon)
// ============================================================

/** Masse de savon (g) obtenue a partir d'une masse de triglyceride, avec un rendement r */
export function soapMass(mTriglyceride: number, Mtriglyceride: number, Msoap: number, r = 1): number {
  return 3 * (mTriglyceride / Mtriglyceride) * Msoap * r;
}

/** Masse molaire d'une molecule de la bibliotheque */
export const libraryMolarMass = (id: string) => molarMass(moleculeOf(id));
export const libraryName = (id: string) => findMolecule(id).name;
