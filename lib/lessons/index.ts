import type { ClassId, SubjectId } from '@/lib/curriculum';
import type { Locale } from '@/lib/i18n';
import { lesson as chimie10Atome } from './content/10e-chimie-atome';
import { lesson as chimie10Classification } from './content/10e-chimie-classification';
import { lesson as chimie10Covalente } from './content/10e-chimie-covalente';
import { lesson as chimie10Ions } from './content/10e-chimie-ions';
import { lesson as chimie10Mole } from './content/10e-chimie-mole';
import { lesson as chimie9Atome } from './content/9e-chimie-atome';
import { lesson as chimie10AtomeBm } from './content-bm/10e-chimie-atome';
import { lesson as chimie10ClassificationBm } from './content-bm/10e-chimie-classification';
import { lesson as chimie10CovalenteBm } from './content-bm/10e-chimie-covalente';
import { lesson as chimie10IonsBm } from './content-bm/10e-chimie-ions';
import { lesson as chimie10MoleBm } from './content-bm/10e-chimie-mole';
import { lesson as chimie9AtomeBm } from './content-bm/9e-chimie-atome';
import type { Lesson } from './types';

export type { Lesson } from './types';

// Clé : « classe/matière/chapitre ». Les versions bambara s'ajouteront dans LESSONS_BM ;
// tant qu'une leçon n'est pas traduite, la version française s'affiche.
const LESSONS_FR: Record<string, Lesson> = {
  '9e/chimie/atome': chimie9Atome,
  '10e/chimie/atome': chimie10Atome,
  '10e/chimie/classification': chimie10Classification,
  '10e/chimie/ions-liaison-ionique': chimie10Ions,
  '10e/chimie/liaison-covalente': chimie10Covalente,
  '10e/chimie/mole': chimie10Mole,
};

// Brouillons en bamanankan, à faire relire (voir docs/bambara-relecture.md).
const LESSONS_BM: Record<string, Lesson> = {
  '9e/chimie/atome': chimie9AtomeBm,
  '10e/chimie/atome': chimie10AtomeBm,
  '10e/chimie/classification': chimie10ClassificationBm,
  '10e/chimie/ions-liaison-ionique': chimie10IonsBm,
  '10e/chimie/liaison-covalente': chimie10CovalenteBm,
  '10e/chimie/mole': chimie10MoleBm,
};

export function getLesson(classId: ClassId, subject: SubjectId, chapterId: string, locale: Locale): Lesson | undefined {
  const key = `${classId}/${subject}/${chapterId}`;
  return (locale === 'bm' ? LESSONS_BM[key] : undefined) ?? LESSONS_FR[key];
}

export function hasLesson(classId: ClassId, subject: SubjectId, chapterId: string): boolean {
  return `${classId}/${subject}/${chapterId}` in LESSONS_FR;
}
