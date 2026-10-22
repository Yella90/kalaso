import type { ClassId, SubjectId } from '@/lib/curriculum';
import type { Locale } from '@/lib/i18n';
import { lesson as chimie10Atome } from './content/10e-chimie-atome';
import { lesson as chimie10Classification } from './content/10e-chimie-classification';
import { lesson as chimie9Atome } from './content/9e-chimie-atome';
import type { Lesson } from './types';

export type { Lesson } from './types';

// Clé : « classe/matière/chapitre ». Les versions bambara s'ajouteront dans LESSONS_BM ;
// tant qu'une leçon n'est pas traduite, la version française s'affiche.
const LESSONS_FR: Record<string, Lesson> = {
  '9e/chimie/atome': chimie9Atome,
  '10e/chimie/atome': chimie10Atome,
  '10e/chimie/classification': chimie10Classification,
};

const LESSONS_BM: Record<string, Lesson> = {};

export function getLesson(classId: ClassId, subject: SubjectId, chapterId: string, locale: Locale): Lesson | undefined {
  const key = `${classId}/${subject}/${chapterId}`;
  return (locale === 'bm' ? LESSONS_BM[key] : undefined) ?? LESSONS_FR[key];
}

export function hasLesson(classId: ClassId, subject: SubjectId, chapterId: string): boolean {
  return `${classId}/${subject}/${chapterId}` in LESSONS_FR;
}
