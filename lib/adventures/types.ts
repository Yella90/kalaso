import type { ClassId, SubjectId } from '@/lib/curriculum';

// Une aventure suit le plan de construction d'un vrai projet.
// Chaque mission mobilise des chapitres du programme et se termine par un défi à réussir
// pour débloquer la suivante. Textes : **gras** et $formules$ comme dans les leçons.

export interface ChapterRef {
  classId: ClassId;
  subject: SubjectId;
  chapterId: string;
}

export type Challenge =
  | {
      kind: 'numeric';
      question: string;
      /** Valeur attendue, dans l'unité indiquée. */
      answer: number;
      unit: string;
      /** Écart relatif accepté (0,03 = 3 %). */
      tolerance: number;
    }
  | {
      kind: 'choice';
      question: string;
      choices: string[];
      answer: number;
    };

export interface Mission {
  id: string;
  title: string;
  /** Ce qui se passe dans l'histoire, et ce qu'on demande à l'élève. */
  story: string;
  /** Données utiles pour le défi. */
  data?: string[];
  notions: ChapterRef[];
  challenge: Challenge;
  hints: string[];
  /** Corrigé détaillé, montré après la réussite ou sur demande. */
  solution: string[];
  /** Ce que la réussite change dans le projet. */
  debrief: string;
}

export interface Adventure {
  id: string;
  title: string;
  /** Matière principale : donne sa couleur à l'aventure. */
  subject: SubjectId;
  /** Classes pour lesquelles l'aventure est conçue. */
  classes: ClassId[];
  pitch: string;
  intro: string;
  missions: Mission[];
  outro: string;
}
