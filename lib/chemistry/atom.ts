import { getElement } from './elements';

export const MAX_PROTONS = 36;

/** Nombre de neutrons de l'isotope le plus courant, déduit de la masse atomique. */
export function commonNeutrons(z: number): number {
  const element = getElement(z);
  if (!element) return 0;
  const mass = Number.parseFloat(element.mass.replace(/[[\]]/g, '').replace(',', '.'));
  return Math.max(0, Math.round(mass) - z);
}
