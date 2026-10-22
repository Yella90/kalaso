import type { ClassId, CycleId, SubjectId } from './types';

export interface SubjectInfo {
  id: SubjectId;
  /** Variable CSS de la couleur de la matière (définie dans globals.css). */
  colorVar: string;
}

export const SUBJECTS: SubjectInfo[] = [
  { id: 'maths', colorVar: '--maths' },
  { id: 'physique', colorVar: '--physique' },
  { id: 'chimie', colorVar: '--chimie' },
  { id: 'biologie', colorVar: '--biologie' },
];

export interface ClassInfo {
  id: ClassId;
  cycle: CycleId;
  /** Examen de fin de classe, s'il y en a un. */
  exam?: 'DEF' | 'BAC';
  series?: string[];
}

export const CLASSES: ClassInfo[] = [
  { id: '7e', cycle: 'fondamental' },
  { id: '8e', cycle: 'fondamental' },
  { id: '9e', cycle: 'fondamental', exam: 'DEF' },
  { id: '10e', cycle: 'lycee', series: ['Sciences'] },
  { id: '11e', cycle: 'lycee', series: ['SE', 'SExp'] },
  { id: '12e', cycle: 'lycee', exam: 'BAC', series: ['TSE', 'TSExp'] },
];

export const CYCLES: CycleId[] = ['fondamental', 'lycee'];

export function isClassId(value: string): value is ClassId {
  return CLASSES.some((c) => c.id === value);
}

export function isSubjectId(value: string): value is SubjectId {
  return SUBJECTS.some((s) => s.id === value);
}

export function getClass(id: ClassId): ClassInfo {
  return CLASSES.find((c) => c.id === id)!;
}
