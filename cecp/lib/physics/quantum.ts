// lib/physics/quantum.ts
// ============================================================
//  Physique corpusculaire : photon et effet photoelectrique
// ============================================================

export const H = 6.63e-34;        // constante de Planck (J.s)
export const C = 3.0e8;           // celerite de la lumiere (m/s)
export const EV = 1.6e-19;        // 1 eV en joules
export const M_E = 9.11e-31;      // masse de l'electron (kg)

export interface Metal {
  id: string;
  name: string;
  /** travail d'extraction W0 (eV) - valeurs usuelles */
  W0: number;
  color: string;
}

export const METALS: Metal[] = [
  { id: 'cs', name: 'Césium', W0: 1.9, color: '#fde68a' },
  { id: 'k', name: 'Potassium', W0: 2.25, color: '#d4d4d8' },
  { id: 'na', name: 'Sodium', W0: 2.3, color: '#e5e7eb' },
  { id: 'ca', name: 'Calcium', W0: 2.9, color: '#cbd5e1' },
  { id: 'zn', name: 'Zinc', W0: 4.3, color: '#94a3b8' },
  { id: 'cu', name: 'Cuivre', W0: 4.7, color: '#d97706' },
];

/** Energie d'un photon (J) : E = h.nu = h.c / lambda */
export const photonEnergy = (lambda: number) => (H * C) / lambda;
/** Frequence (Hz) */
export const frequency = (lambda: number) => C / lambda;
/** Conversion J -> eV */
export const toEV = (J: number) => J / EV;

/** Longueur d'onde seuil (m) : lambda0 = h.c / W0 */
export const thresholdWavelength = (W0eV: number) => (H * C) / (W0eV * EV);
/** Frequence seuil (Hz) */
export const thresholdFrequency = (W0eV: number) => (W0eV * EV) / H;

/** Energie cinetique maximale des electrons emis (J), 0 s'il n'y a pas d'emission */
export function maxKineticEnergy(lambda: number, W0eV: number): number {
  return Math.max(0, photonEnergy(lambda) - W0eV * EV);
}

/** Vitesse maximale des electrons emis (m/s) */
export const maxElectronSpeed = (lambda: number, W0eV: number) =>
  Math.sqrt((2 * maxKineticEnergy(lambda, W0eV)) / M_E);

/** Potentiel d'arret (V) : e.U0 = Ec,max */
export const stoppingVoltage = (lambda: number, W0eV: number) => maxKineticEnergy(lambda, W0eV) / EV;

/** Y a-t-il emission ? (lambda < lambda0) */
export const emits = (lambda: number, W0eV: number) => photonEnergy(lambda) > W0eV * EV;

/** Nombre de photons par seconde pour une puissance P (W) */
export const photonFlux = (P: number, lambda: number) => P / photonEnergy(lambda);

// ============================================================
//  Niveaux d'energie de l'atome d'hydrogene : En = -E0 / n^2
// ============================================================

/** Energie d'ionisation de l'atome d'hydrogene (eV) */
export const E0_HYDROGEN = 13.6;

/** Energie du niveau n (eV), n >= 1 */
export const hydrogenLevel = (n: number) => -E0_HYDROGEN / (n * n);

/** Energie du photon emis lors de la transition n2 -> n1 (n2 > n1), en eV */
export const transitionEnergy = (nHigh: number, nLow: number) => hydrogenLevel(nHigh) - hydrogenLevel(nLow);

/** Longueur d'onde (m) du photon emis ou absorbe entre les niveaux n1 et n2 */
export function transitionWavelength(n1: number, n2: number): number {
  const dE = Math.abs(hydrogenLevel(n1) - hydrogenLevel(n2)) * EV;
  return (H * C) / dE;
}

/** Energie (eV) a fournir pour ioniser un atome dans l'etat n */
export const ionizationEnergyFrom = (n: number) => E0_HYDROGEN / (n * n);

/** Nom de la serie spectrale aboutissant au niveau n1 */
export function seriesName(nLow: number): string {
  return ({ 1: 'Lyman', 2: 'Balmer', 3: 'Paschen', 4: 'Brackett' } as Record<number, string>)[nLow] ?? `n = ${nLow}`;
}

/**
 * Un photon d'energie E (eV) peut-il etre absorbe par un atome dans l'etat n ?
 * Oui s'il correspond exactement (a tol pres) a une transition vers un niveau
 * superieur, ou s'il suffit a ioniser l'atome. Renvoie le niveau atteint
 * (Infinity pour une ionisation) ou null.
 */
export function absorbedTo(n: number, EeV: number, tol = 0.01, nMax = 30): number | null {
  if (EeV >= ionizationEnergyFrom(n)) return Infinity;
  for (let m = n + 1; m <= nMax; m++) {
    if (Math.abs(hydrogenLevel(m) - hydrogenLevel(n) - EeV) <= tol) return m;
  }
  return null;
}

/** Nombre de raies possibles quand l'atome redescend du niveau n (toutes cascades) : n(n-1)/2 */
export const possibleLines = (n: number) => (n * (n - 1)) / 2;
