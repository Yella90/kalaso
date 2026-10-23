// lib/physics/thermal.ts
// ============================================================
//  Calorimetrie : quantite de chaleur, melanges, changements
//  d'etat. Unites SI : kg, J, J/(kg.K), J/K ; temperatures en °C.
// ============================================================

/** Capacites thermiques massiques usuelles (J.kg^-1.K^-1) */
export const C_WATER = 4185;
export const C_ICE = 2100;
export const C_ALUMINIUM = 920;
export const C_COPPER = 385;
export const C_IRON = 460;
/** Chaleur latente de fusion de la glace (J/kg) */
export const L_FUSION_ICE = 3.34e5;
/** Chaleur latente de vaporisation de l'eau a 100 °C (J/kg) */
export const L_VAPORIZATION = 2.26e6;

/** Quantite de chaleur recue (> 0) ou cedee (< 0) : Q = m c (theta_f - theta_i) */
export const heat = (m: number, c: number, thetaI: number, thetaF: number) => m * c * (thetaF - thetaI);

/** Chaleur de changement d'etat : Q = m L */
export const latentHeat = (m: number, L: number) => m * L;

/** Capacite thermique d'un corps : C = m c (J/K) */
export const heatCapacity = (m: number, c: number) => m * c;

/** Valeur en eau d'un calorimetre de capacite C : mu = C / c_eau (kg) */
export const waterEquivalent = (C: number) => C / C_WATER;

export interface Body {
  /** capacite thermique C = m c (J/K) */
  C: number;
  /** temperature initiale (°C) */
  theta: number;
}

/**
 * Temperature d'equilibre d'un systeme isole sans changement d'etat :
 * somme des Q = 0  =>  theta_e = somme(C_i theta_i) / somme(C_i)
 */
export function equilibriumTemperature(bodies: Body[]): number {
  const sumC = bodies.reduce((s, b) => s + b.C, 0);
  return bodies.reduce((s, b) => s + b.C * b.theta, 0) / sumC;
}

/**
 * Capacite thermique massique d'un solide par la methode des melanges :
 * un solide (m2, theta2) est plonge dans un calorimetre (capacite Ccal)
 * contenant m1 d'eau a theta1 ; l'equilibre est atteint a theta_e.
 */
export function specificHeatFromMixing(
  m1: number, theta1: number, Ccal: number, m2: number, theta2: number, thetaE: number,
): number {
  return ((m1 * C_WATER + Ccal) * (thetaE - theta1)) / (m2 * (theta2 - thetaE));
}

/** Capacite thermique d'un calorimetre a partir d'un melange de deux masses d'eau */
export function calorimeterCapacity(m1: number, theta1: number, m2: number, theta2: number, thetaE: number): number {
  // m1 (avec le calorimetre) a theta1, on ajoute m2 a theta2
  return (m2 * C_WATER * (theta2 - thetaE)) / (thetaE - theta1) - m1 * C_WATER;
}

export interface IceMixResult {
  /** temperature finale (°C) */
  theta: number;
  /** masse de glace fondue (kg) ; negative si de l'eau a gele */
  meltedIce: number;
  /** vrai si toute la glace a fondu */
  allMelted: boolean;
}

/**
 * Melange eau liquide (mw, thetaW >= 0) + glace (mi, thetaI <= 0) dans un
 * calorimetre de capacite Ccal (initialement a thetaW). Quatre cas :
 * - toute la glace fond : theta > 0 ;
 * - fusion partielle : theta = 0, meltedIce entre 0 et mi ;
 * - une partie de l'eau gele : theta = 0, meltedIce < 0 (masse d'eau gelee) ;
 * - toute l'eau gele : theta < 0, meltedIce = -mw.
 */
export function mixWaterIce(mw: number, thetaW: number, mi: number, thetaI: number, Ccal = 0): IceMixResult {
  const Chot = mw * C_WATER + Ccal;
  // Chaleur disponible en refroidissant l'eau (et le calorimetre) jusqu'a 0 °C
  const available = Chot * thetaW;
  // Chaleur pour amener la glace a 0 °C puis la fondre entierement
  const warmIce = mi * C_ICE * (0 - thetaI);
  const meltAll = warmIce + mi * L_FUSION_ICE;
  if (available >= meltAll) {
    // Tout fond : equilibre au-dessus de 0 °C
    const theta = (available - meltAll) / (Chot + mi * C_WATER);
    return { theta, meltedIce: mi, allMelted: true };
  }
  if (available >= warmIce) {
    const melted = (available - warmIce) / L_FUSION_ICE;
    return { theta: 0, meltedIce: melted, allMelted: false };
  }
  // La glace ne peut meme pas etre rechauffee a 0 °C : l'eau gele (en partie ou totalement)
  const deficit = warmIce - available;
  if (deficit <= mw * L_FUSION_ICE) {
    return { theta: 0, meltedIce: -deficit / L_FUSION_ICE, allMelted: false };
  }
  const theta = (Ccal * thetaW + mw * C_WATER * thetaW + mw * L_FUSION_ICE + mi * C_ICE * thetaI)
    / (Ccal + (mw + mi) * C_ICE);
  return { theta, meltedIce: -mw, allMelted: false };
}

/** Duree de chauffage par un appareil de puissance P et de rendement r : t = Q / (r P) */
export const heatingTime = (Q: number, P: number, efficiency = 1) => Q / (efficiency * P);
