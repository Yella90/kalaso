// lib/physics/satellite.ts
// ============================================================
//  Moteur physique - Satellite terrestre
//  Source : DAVID DIARRA Prebac - Sciences Physiques T.S.E / T.S.EXP
// ============================================================

/** Constantes terrestres */
export const R_TERRE = 6.4e6;            // m
export const G_0 = 9.8;                  // m/s2 (champ de gravitation au sol)
export const G_UNIV = 6.67e-11;          // m3.kg-1.s-2
export const M_TERRE = 5.97e24;          // kg
export const T_GEOSTATIONNAIRE = 86400;  // s (24h)

export interface SatelliteParams {
  /** Altitude au-dessus du sol (m) */
  h: number;
}

// ------------------------------------------------------------
//  1. Rayon de l'orbite
// ------------------------------------------------------------
export function orbitalRadius(p: SatelliteParams): number {
  return R_TERRE + p.h;
}

// ------------------------------------------------------------
//  2. Vitesse lineaire (m/s)
//     v = R_T * sqrt( g0 / (R_T + h) )
// ------------------------------------------------------------
export function linearSpeed(p: SatelliteParams): number {
  return R_TERRE * Math.sqrt(G_0 / orbitalRadius(p));
}

// ------------------------------------------------------------
//  3. Vitesse angulaire (rad/s)
//     omega = R_T * sqrt( g0 / (R_T + h)^3 )
// ------------------------------------------------------------
export function angularSpeed(p: SatelliteParams): number {
  const R = orbitalRadius(p);
  return R_TERRE * Math.sqrt(G_0 / (R * R * R));
}

// ------------------------------------------------------------
//  4. Periode (s)
//     T = (2.pi / R_T) * sqrt( (R_T + h)^3 / g0 )
// ------------------------------------------------------------
export function orbitalPeriod(p: SatelliteParams): number {
  const R = orbitalRadius(p);
  return ((2 * Math.PI) / R_TERRE) * Math.sqrt((R * R * R) / G_0);
}

// ------------------------------------------------------------
//  5. Champ de gravitation a l'altitude h (m/s2)
//     g = g0 * (R_T / (R_T + h))^2
// ------------------------------------------------------------
export function gravityAt(p: SatelliteParams): number {
  const R = orbitalRadius(p);
  return G_0 * (R_TERRE / R) ** 2;
}

// ------------------------------------------------------------
//  6. Troisieme loi de Kepler : T^2 / a^3 = Cte
// ------------------------------------------------------------
//  Avec G.M_T = g0.R_T^2 (relation du cours), on obtient
//  T^2 / a^3 = 4.pi^2 / (g0.R_T^2) : meme modele que orbitalPeriod(),
//  donc la constante est coherente avec les periodes calculees.
//  (G_UNIV * M_TERRE ~ 3,98e14 differe de g0.R_T^2 ~ 4,01e14 de 0,8 % a
//  cause des arrondis des donnees ; melanger les deux faussait la loi.)
export function keplerConstant(): number {
  return (4 * Math.PI ** 2) / (G_0 * R_TERRE * R_TERRE);
}

/** Variante avec la constante de gravitation universelle G et M_T. */
export function keplerConstantGM(): number {
  return (4 * Math.PI ** 2) / (G_UNIV * M_TERRE);
}

// ------------------------------------------------------------
//  7. Altitude pour un satellite geostationnaire
// ------------------------------------------------------------
export function geostationaryAltitude(): number {
  const T = T_GEOSTATIONNAIRE;
  const r = Math.cbrt((T * T * R_TERRE * R_TERRE * G_0) / (4 * Math.PI ** 2));
  return r - R_TERRE;
}

// ------------------------------------------------------------
//  8. Position angulaire du satellite a l'instant t
// ------------------------------------------------------------
export function angularPosition(p: SatelliteParams, t: number): number {
  return angularSpeed(p) * t;
}

// ------------------------------------------------------------
//  9. Echantillonnage de l'orbite pour l'affichage
// ------------------------------------------------------------
export function sampleOrbit(
  p: SatelliteParams,
  samples = 200,
): { x: number; y: number }[] {
  const R = orbitalRadius(p);
  const out: { x: number; y: number }[] = [];
  for (let i = 0; i <= samples; i++) {
    const theta = (2 * Math.PI * i) / samples;
    out.push({ x: R * Math.cos(theta), y: R * Math.sin(theta) });
  }
  return out;
}

// ------------------------------------------------------------
//  10. Helpers d'unites
// ------------------------------------------------------------
export const toKm = (m: number): number => m / 1000;
export const toHours = (s: number): number => s / 3600;
export const toMinutes = (s: number): number => s / 60;

/** Formate une duree (s) en "Xh Ym Zs" */
export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) return `${h}h ${m}min ${s}s`;
  if (m > 0) return `${m}min ${s}s`;
  return `${s}s`;
}