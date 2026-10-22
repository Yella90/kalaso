import { BIOLOGIE } from './biologie';
import { CHIMIE } from './chimie';
import { MATHS } from './maths';
import { PHYSIQUE } from './physique';
import type { Chapter, ClassId, SubjectId, SubjectProgram } from './types';

export * from './catalog';
export * from './types';

const PROGRAMS: SubjectProgram[] = [...MATHS, ...PHYSIQUE, ...CHIMIE, ...BIOLOGIE];

export function getProgram(classId: ClassId, subject: SubjectId): SubjectProgram | undefined {
  return PROGRAMS.find((p) => p.classId === classId && p.subject === subject);
}

export function getChapter(classId: ClassId, subject: SubjectId, chapterId: string): Chapter | undefined {
  return getProgram(classId, subject)?.chapters.find((c) => c.id === chapterId);
}

export function getAllPrograms(): SubjectProgram[] {
  return PROGRAMS;
}

/** Regroupe les chapitres par domaine, ou par trimestre quand il n'y a pas de domaine. */
export function groupChapters(chapters: Chapter[]): { key: string; kind: 'domain' | 'trimester' | 'none'; chapters: Chapter[] }[] {
  const groups = new Map<string, { kind: 'domain' | 'trimester' | 'none'; chapters: Chapter[] }>();
  for (const chapter of chapters) {
    const key = chapter.domain ?? (chapter.trimester ? String(chapter.trimester) : '');
    const kind = chapter.domain ? 'domain' : chapter.trimester ? 'trimester' : 'none';
    if (!groups.has(key)) groups.set(key, { kind, chapters: [] });
    groups.get(key)!.chapters.push(chapter);
  }
  return [...groups.entries()].map(([key, g]) => ({ key, ...g }));
}
