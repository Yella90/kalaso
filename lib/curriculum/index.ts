import type { Locale } from '@/lib/i18n';
import { BIOLOGIE } from './biologie';
import { CHIMIE } from './chimie';
import { CHAPTERS_BM, DOMAINS_BM } from './content-bm';
import { MATHS } from './maths';
import { PHYSIQUE } from './physique';
import type { Chapter, ClassId, SubjectId, SubjectProgram } from './types';

export * from './catalog';
export * from './types';

const PROGRAMS: SubjectProgram[] = [...MATHS, ...PHYSIQUE, ...CHIMIE, ...BIOLOGIE];

/** Applique la traduction bambara des titres, notions et domaines ; le français sert de repli. */
function localize(program: SubjectProgram, locale: Locale): SubjectProgram {
  if (locale === 'fr') return program;
  return {
    ...program,
    chapters: program.chapters.map((chapter) => {
      const bm = CHAPTERS_BM[`${program.classId}/${program.subject}/${chapter.id}`];
      return {
        ...chapter,
        title: bm?.title ?? chapter.title,
        notions: bm?.notions ?? chapter.notions,
        domain: chapter.domain ? (DOMAINS_BM[chapter.domain] ?? chapter.domain) : undefined,
      };
    }),
  };
}

export function getProgram(classId: ClassId, subject: SubjectId, locale: Locale = 'fr'): SubjectProgram | undefined {
  const program = PROGRAMS.find((p) => p.classId === classId && p.subject === subject);
  return program && localize(program, locale);
}

export function getChapter(classId: ClassId, subject: SubjectId, chapterId: string, locale: Locale = 'fr'): Chapter | undefined {
  return getProgram(classId, subject, locale)?.chapters.find((c) => c.id === chapterId);
}

export function getAllPrograms(locale: Locale = 'fr'): SubjectProgram[] {
  return PROGRAMS.map((p) => localize(p, locale));
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
