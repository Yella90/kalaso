// lib/physics/light.ts
// ============================================================
//  Optique ondulatoire : interferences lumineuses (fentes de Young)
// ============================================================

/** Interfrange : i = lambda.D / a (toutes les longueurs en metres) */
export function fringeSpacing(lambda: number, D: number, a: number): number {
  return (lambda * D) / a;
}

/** Difference de marche au point d'abscisse x de l'ecran : delta = a.x / D */
export function pathDifference(a: number, x: number, D: number): number {
  return (a * x) / D;
}

/** Ordre d'interference p = delta / lambda (entier : frange brillante ; demi-entier : sombre) */
export function interferenceOrder(a: number, x: number, D: number, lambda: number): number {
  return pathDifference(a, x, D) / lambda;
}

/**
 * Intensite relative sur l'ecran (0 a 1) : I = cos^2(pi.a.x / (lambda.D)),
 * eventuellement modulee par la diffraction d'une fente de largeur b.
 */
export function youngIntensity(x: number, lambda: number, D: number, a: number, b = 0): number {
  const two = Math.cos((Math.PI * a * x) / (lambda * D)) ** 2;
  if (b <= 0) return two;
  const u = (Math.PI * b * x) / (lambda * D);
  const env = u === 0 ? 1 : (Math.sin(u) / u) ** 2;
  return two * env;
}

/** Position de la frange brillante d'ordre k : x_k = k.lambda.D / a */
export const brightFringe = (k: number, lambda: number, D: number, a: number) => (k * lambda * D) / a;
/** Position de la frange sombre d'ordre k : x = (k + 1/2).lambda.D / a */
export const darkFringe = (k: number, lambda: number, D: number, a: number) => ((k + 0.5) * lambda * D) / a;

/** Couleur approximative (r, g, b entre 0 et 1) d'une longueur d'onde visible (nm). */
export function wavelengthToRGB(nm: number): [number, number, number] {
  let r = 0, g = 0, b = 0;
  if (nm >= 380 && nm < 440) { r = -(nm - 440) / 60; b = 1; }
  else if (nm < 490) { g = (nm - 440) / 50; b = 1; }
  else if (nm < 510) { g = 1; b = -(nm - 510) / 20; }
  else if (nm < 580) { r = (nm - 510) / 70; g = 1; }
  else if (nm < 645) { r = 1; g = -(nm - 645) / 65; }
  else if (nm <= 780) { r = 1; }
  // attenuation aux extremites du visible
  let f = 1;
  if (nm >= 380 && nm < 420) f = 0.3 + (0.7 * (nm - 380)) / 40;
  else if (nm > 700 && nm <= 780) f = 0.3 + (0.7 * (780 - nm)) / 80;
  else if (nm < 380 || nm > 780) f = 0;
  return [r * f, g * f, b * f];
}

export function wavelengthToCss(nm: number, alpha = 1): string {
  const [r, g, b] = wavelengthToRGB(nm);
  if (r + g + b === 0) return nm < 380 ? `rgba(167,139,250,${alpha})` : `rgba(127,29,29,${alpha})`;
  return `rgba(${Math.round(r * 255)},${Math.round(g * 255)},${Math.round(b * 255)},${alpha})`;
}
