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
];

/** Chapitres qui utilisent une simulation. */
export function chaptersUsing(id: SimulationId, locale: Locale = 'fr') {
  return getAllPrograms(locale).flatMap((p) =>
    p.chapters.filter((c) => c.simulation === id).map((c) => ({ classId: p.classId, subject: p.subject, chapter: c })),
  );
}
