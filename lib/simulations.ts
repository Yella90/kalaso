import { getAllPrograms, type SimulationId, type SubjectId } from '@/lib/curriculum';
import type { Locale } from '@/lib/i18n';

export interface SimulationInfo {
  id: SimulationId;
  subject: SubjectId;
  /** Page dédiée, quand la simulation a sa propre adresse historique. */
  path: string;
}

export const SIMULATIONS: SimulationInfo[] = [
  { id: 'atome', subject: 'chimie', path: 'atome' },
  { id: 'tableau-periodique', subject: 'chimie', path: 'tableau-periodique' },
  { id: 'circuit', subject: 'physique', path: 'simulations/circuit' },
  { id: 'projectile', subject: 'physique', path: 'simulations/projectile' },
  { id: 'fonction', subject: 'maths', path: 'simulations/fonction' },
  { id: 'osmose', subject: 'biologie', path: 'simulations/osmose' },
  { id: 'mitose', subject: 'biologie', path: 'simulations/mitose' },
  { id: 'croisement', subject: 'biologie', path: 'simulations/croisement' },
  { id: 'hardy-weinberg', subject: 'biologie', path: 'simulations/hardy-weinberg' },
  { id: 'potentiel-action', subject: 'biologie', path: 'simulations/potentiel-action' },
  { id: 'glycemie', subject: 'biologie', path: 'simulations/glycemie' },
  { id: 'immunite', subject: 'biologie', path: 'simulations/immunite' },
  { id: 'traduction', subject: 'biologie', path: 'simulations/traduction' },
  { id: 'photosynthese', subject: 'biologie', path: 'simulations/photosynthese' },
  { id: 'cellule-3d', subject: 'biologie', path: 'simulations/cellule-3d' },
  { id: 'adn-3d', subject: 'biologie', path: 'simulations/adn-3d' },
  { id: 'caryotype', subject: 'biologie', path: 'simulations/caryotype' },
  { id: 'coeur', subject: 'biologie', path: 'simulations/coeur' },
  { id: 'skate-park', subject: 'physique', path: 'simulations/skate-park' },
];

/** Chapitres qui utilisent une simulation. */
export function chaptersUsing(id: SimulationId, locale: Locale = 'fr') {
  return getAllPrograms(locale).flatMap((p) =>
    p.chapters.filter((c) => c.simulation === id).map((c) => ({ classId: p.classId, subject: p.subject, chapter: c })),
  );
}
