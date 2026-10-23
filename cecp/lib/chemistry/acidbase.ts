// lib/chemistry/acidbase.ts
// ============================================================
//  Couples acide/base faibles : pH et courbes de dosage.
//  - acide faible AH (pKa) dose par une base forte (soude)
//  - base faible B (pKa du couple BH+/B) dosee par un acide fort (HCl)
//  Le pH est obtenu en resolvant l'electroneutralite (sans approximation).
//  Concentrations en mol/L, volumes en mL. Aucune dependance React.
// ============================================================

export const KW = 1e-14;

export interface WeakSpecies {
  id: string;
  name: string;
  /** pKa du couple acide/base */
  pKa: number;
  kind: 'acide' | 'base';
}

export const WEAK_SPECIES: WeakSpecies[] = [
  { id: 'acide-ethanoique', name: 'Acide éthanoïque', pKa: 4.8, kind: 'acide' },
  { id: 'acide-methanoique', name: 'Acide méthanoïque', pKa: 3.8, kind: 'acide' },
  { id: 'acide-lactique', name: 'Acide lactique', pKa: 3.9, kind: 'acide' },
  { id: 'methylamine', name: 'Méthylamine', pKa: 10.7, kind: 'base' },
  { id: 'ethylamine', name: 'Éthylamine', pKa: 10.8, kind: 'base' },
  { id: 'dimethylamine', name: 'Diméthylamine', pKa: 11.0, kind: 'base' },
  { id: 'trimethylamine', name: 'Triméthylamine', pKa: 9.8, kind: 'base' },
  { id: 'ammoniac', name: 'Ammoniac', pKa: 9.2, kind: 'base' },
];

/** Resolution par dichotomie (en log) de f(h) = 0, f croissante en h */
function solveH(f: (h: number) => number): number {
  let lo = -15, hi = 1; // log10(h)
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2;
    if (f(10 ** mid) > 0) hi = mid; else lo = mid;
  }
  return 10 ** ((lo + hi) / 2);
}

/**
 * pH lors du dosage de Va mL d'une espece faible de concentration Ca par
 * un titrant fort (Cb, volume verse Vb mL).
 */
export function titrationPH(species: { pKa: number; kind: 'acide' | 'base' }, C: number, V: number, Ct: number, Vt: number): number {
  const Ka = 10 ** -species.pKa;
  const Vtot = V + Vt;
  const cWeak = (C * V) / Vtot; // concentration totale du couple
  const cIon = (Ct * Vt) / Vtot; // Na+ (titrant base) ou Cl- (titrant acide)
  let h: number;
  if (species.kind === 'acide') {
    // h + [Na+] = [OH-] + [A-] ; f croissante en h
    h = solveH((x) => x + cIon - KW / x - (cWeak * Ka) / (x + Ka));
  } else {
    // h + [BH+] = [OH-] + [Cl-]
    h = solveH((x) => x + (cWeak * x) / (x + Ka) - KW / x - cIon);
  }
  return -Math.log10(h);
}

/** pH d'une solution d'acide faible ou de base faible seule */
export const weakSolutionPH = (species: { pKa: number; kind: 'acide' | 'base' }, C: number) => titrationPH(species, C, 1, 0, 0);

/** Volume a l'equivalence (mL) : C V = Ct Vt,E */
export const equivalenceVolume = (C: number, V: number, Ct: number) => (C * V) / Ct;

/** Concentration de l'espece dosee a partir du volume equivalent */
export const concentrationFromEquivalence = (Ct: number, VtE: number, V: number) => (Ct * VtE) / V;

export interface Indicator { name: string; low: number; high: number; acidColor: string; baseColor: string }

export const INDICATORS: Indicator[] = [
  { name: 'Hélianthine', low: 3.1, high: 4.4, acidColor: '#ef4444', baseColor: '#facc15' },
  { name: 'Rouge de méthyle', low: 4.2, high: 6.2, acidColor: '#ef4444', baseColor: '#facc15' },
  { name: 'Bleu de bromothymol (BBT)', low: 6.0, high: 7.6, acidColor: '#facc15', baseColor: '#2563eb' },
  { name: 'Phénolphtaléine', low: 8.2, high: 10.0, acidColor: '#f8fafc', baseColor: '#db2777' },
];

/** Couleur d'un indicateur au pH donne (teinte sensible au milieu de la zone de virage) */
export function indicatorColor(ind: Indicator, pH: number): string {
  if (pH <= ind.low) return ind.acidColor;
  if (pH >= ind.high) return ind.baseColor;
  return 'mix';
}

/** L'indicateur convient si le pH a l'equivalence est dans sa zone de virage */
export const indicatorSuits = (ind: Indicator, pHeq: number) => pHeq >= ind.low && pHeq <= ind.high;
