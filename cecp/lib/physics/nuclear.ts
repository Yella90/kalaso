// lib/physics/nuclear.ts
// ============================================================
//  Radioactivite : loi de decroissance, activite, datation
// ============================================================

export const YEAR_S = 365.25 * 86400;

export interface Isotope {
  id: string;
  name: string;
  symbol: string;
  /** demi-vie (s) */
  halfLife: number;
  /** demi-vie lisible */
  halfLifeLabel: string;
  type: 'α' | 'β⁻' | 'β⁺';
  /** equation de desintegration (LaTeX) */
  equation: string;
  use: string;
}

export const ISOTOPES: Isotope[] = [
  {
    id: 'c14', name: 'Carbone 14', symbol: '¹⁴C', halfLife: 5730 * YEAR_S, halfLifeLabel: '5 730 ans', type: 'β⁻',
    equation: '{}^{14}_{6}\\text{C} \\rightarrow {}^{14}_{7}\\text{N} + {}^{0}_{-1}\\text{e}',
    use: 'Datation des restes organiques (bois, os, tissus) jusqu\'à environ 50 000 ans.',
  },
  {
    id: 'i131', name: 'Iode 131', symbol: '¹³¹I', halfLife: 8.02 * 86400, halfLifeLabel: '8,02 jours', type: 'β⁻',
    equation: '{}^{131}_{53}\\text{I} \\rightarrow {}^{131}_{54}\\text{Xe} + {}^{0}_{-1}\\text{e}',
    use: 'Médecine : diagnostic et traitement des maladies de la thyroïde.',
  },
  {
    id: 'co60', name: 'Cobalt 60', symbol: '⁶⁰Co', halfLife: 5.27 * YEAR_S, halfLifeLabel: '5,27 ans', type: 'β⁻',
    equation: '{}^{60}_{27}\\text{Co} \\rightarrow {}^{60}_{28}\\text{Ni} + {}^{0}_{-1}\\text{e}',
    use: 'Radiothérapie des cancers, stérilisation du matériel médical et des aliments.',
  },
  {
    id: 'rn222', name: 'Radon 222', symbol: '²²²Rn', halfLife: 3.82 * 86400, halfLifeLabel: '3,82 jours', type: 'α',
    equation: '{}^{222}_{86}\\text{Rn} \\rightarrow {}^{218}_{84}\\text{Po} + {}^{4}_{2}\\text{He}',
    use: 'Gaz naturel issu de l\'uranium des sols granitiques, à surveiller dans les habitations.',
  },
  {
    id: 'po210', name: 'Polonium 210', symbol: '²¹⁰Po', halfLife: 138.4 * 86400, halfLifeLabel: '138,4 jours', type: 'α',
    equation: '{}^{210}_{84}\\text{Po} \\rightarrow {}^{206}_{82}\\text{Pb} + {}^{4}_{2}\\text{He}',
    use: 'Découvert par Marie Curie en 1898, utilisé dans certains éliminateurs d\'électricité statique.',
  },
  {
    id: 'f18', name: 'Fluor 18', symbol: '¹⁸F', halfLife: 109.8 * 60, halfLifeLabel: '109,8 minutes', type: 'β⁺',
    equation: '{}^{18}_{9}\\text{F} \\rightarrow {}^{18}_{8}\\text{O} + {}^{0}_{1}\\text{e}',
    use: 'Imagerie médicale (TEP) : repérer les tumeurs qui consomment beaucoup de glucose.',
  },
  {
    id: 'u238', name: 'Uranium 238', symbol: '²³⁸U', halfLife: 4.47e9 * YEAR_S, halfLifeLabel: '4,47 milliards d\'années', type: 'α',
    equation: '{}^{238}_{92}\\text{U} \\rightarrow {}^{234}_{90}\\text{Th} + {}^{4}_{2}\\text{He}',
    use: 'Datation des roches et de la Terre elle-même (âge : 4,5 milliards d\'années).',
  },
];

/** Constante radioactive lambda = ln2 / T (s^-1) */
export const decayConstant = (halfLife: number) => Math.LN2 / halfLife;

/** Loi de decroissance : N(t) = N0 e^(-lambda t) */
export const remaining = (N0: number, halfLife: number, t: number) => N0 * Math.exp(-decayConstant(halfLife) * t);

/** Activite A = lambda.N (Bq) */
export const activity = (N: number, halfLife: number) => decayConstant(halfLife) * N;

/** Age d'un echantillon d'apres le rapport des activites (ou des nombres de noyaux) : t = (T/ln2).ln(A0/A) */
export const ageFromRatio = (ratio: number, halfLife: number) => (halfLife / Math.LN2) * Math.log(ratio);

/** Temps pour que la proportion restante tombe a `fraction` */
export const timeToFraction = (fraction: number, halfLife: number) => -Math.log(fraction) / decayConstant(halfLife);

/** Nombre de noyaux dans une masse m (g) d'un nuclide de masse molaire M (g/mol) */
export const nucleiInMass = (m: number, M: number) => (m / M) * 6.022e23;
