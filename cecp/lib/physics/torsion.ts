// lib/physics/torsion.ts
// ============================================================
//  Pendule de torsion : J theta'' = -C theta
// ============================================================

/** Periode propre T0 = 2 pi sqrt(J / C) */
export const torsionPeriod = (J: number, C: number) => 2 * Math.PI * Math.sqrt(J / C);

/** Pulsation propre */
export const torsionOmega = (J: number, C: number) => Math.sqrt(C / J);

/** Constante de torsion a partir de la periode : C = 4 pi^2 J / T^2 */
export const torsionConstant = (J: number, T: number) => (4 * Math.PI * Math.PI * J) / (T * T);

/** Moment d'inertie d'une tige homogene (masse M, longueur L) par rapport a sa mediatrice : J = M L^2 / 12 */
export const rodInertia = (M: number, L: number) => (M * L * L) / 12;

/** Moment d'inertie d'un disque plein (masse M, rayon R) par rapport a son axe : J = M R^2 / 2 */
export const diskInertia = (M: number, R: number) => (M * R * R) / 2;

/** Deux masses ponctuelles m placees symetriquement a la distance d de l'axe : J = 2 m d^2 */
export const twoMassesInertia = (m: number, d: number) => 2 * m * d * d;

/** Elongation angulaire theta(t) = theta_m cos(omega t + phi) */
export const torsionAngle = (thetaM: number, J: number, C: number, t: number, phi = 0) =>
  thetaM * Math.cos(torsionOmega(J, C) * t + phi);

/** Vitesse angulaire */
export const torsionAngularSpeed = (thetaM: number, J: number, C: number, t: number, phi = 0) =>
  -thetaM * torsionOmega(J, C) * Math.sin(torsionOmega(J, C) * t + phi);

/** Energie potentielle de torsion Ep = C theta^2 / 2 */
export const torsionPotentialEnergy = (C: number, theta: number) => 0.5 * C * theta * theta;

/** Energie cinetique de rotation Ec = J w^2 / 2 */
export const rotationalKineticEnergy = (J: number, w: number) => 0.5 * J * w * w;

/** Energie mecanique totale E = C theta_m^2 / 2 */
export const torsionEnergy = (C: number, thetaM: number) => 0.5 * C * thetaM * thetaM;
