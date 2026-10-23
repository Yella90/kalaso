// lib/physics/transformer.ts
// ============================================================
//  Transformateurs et alternateurs (induction electromagnetique)
// ============================================================

/** Rapport de transformation m = N2 / N1 = U2 / U1 (transformateur parfait) */
export const transformationRatio = (N1: number, N2: number) => N2 / N1;

/** Tension efficace au secondaire : U2 = m U1 */
export const secondaryVoltage = (U1: number, N1: number, N2: number) => U1 * transformationRatio(N1, N2);

/** Transformateur parfait : U1 I1 = U2 I2 donc I1 = m I2 */
export const primaryCurrent = (I2: number, N1: number, N2: number) => I2 * transformationRatio(N1, N2);

export type TransformerKind = 'elevateur' | 'abaisseur' | 'isolement';

export function transformerKind(N1: number, N2: number): TransformerKind {
  if (N2 > N1) return 'elevateur';
  if (N2 < N1) return 'abaisseur';
  return 'isolement';
}

/** Rendement eta = P2 / P1 */
export const efficiency = (P1: number, P2: number) => P2 / P1;

/** Puissance perdue par effet Joule dans une ligne de resistance R transportant P sous U : p = R P^2 / U^2 */
export const lineLoss = (P: number, U: number, R: number) => (R * P * P) / (U * U);

/** Valeur maximale a partir de la valeur efficace (regime sinusoidal) */
export const peakFromRms = (Ueff: number) => Ueff * Math.SQRT2;

// ---------------- Alternateur ----------------

/** Frequence du courant produit : f = p n (p paires de poles, n en tours/s) */
export const alternatorFrequency = (pairs: number, n: number) => pairs * n;

/** Vitesse de rotation (tr/min) pour obtenir la frequence f */
export const rotationForFrequency = (f: number, pairs: number) => (60 * f) / pairs;

/** f.e.m. maximale d'une bobine de N spires de surface S tournant a omega dans B : Em = N B S omega */
export const alternatorPeakEmf = (N: number, B: number, S: number, omega: number) => N * B * S * omega;

/** f.e.m. instantanee e(t) = Em sin(omega t) */
export const alternatorEmf = (Em: number, omega: number, t: number) => Em * Math.sin(omega * t);
