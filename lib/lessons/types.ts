// Contenu pédagogique d'un chapitre : Cours → Simuler → S'exercer → Appliquer.
//
// Les textes acceptent une mise en forme minimale :
//   **gras**   et   $formule$  (KaTeX, avec \ce{...} pour la chimie).

export type Block =
  | { kind: 'text'; text: string }
  | { kind: 'definition'; term: string; text: string }
  | { kind: 'rule'; text: string }
  | { kind: 'formula'; tex: string; legend?: string[] }
  | { kind: 'example'; title?: string; text: string; steps?: string[] }
  | { kind: 'trap'; wrong: string; why: string; reflex: string }
  | { kind: 'table'; head: string[]; rows: string[][] }
  | { kind: 'lewis'; molecules: LewisMolecule[] };

export interface LewisAtom {
  symbol: string;
  /** Position en unités de liaison ; y augmente vers le bas. */
  x: number;
  y: number;
  /** Doublets non liants : direction de chacun en degrés (0 = droite, 90 = haut). */
  pairs?: number[];
}

/** Schéma de Lewis : atomes, liaisons (simple, double, triple) et doublets non liants. */
export interface LewisMolecule {
  name: string;
  atoms: LewisAtom[];
  bonds: [from: number, to: number, order: 1 | 2 | 3][];
}

export interface LessonSection {
  title: string;
  blocks: Block[];
}

export interface Exercise {
  id: string;
  /** 1 : application directe ; 2 : raisonnement ; 3 : niveau examen. */
  level: 1 | 2 | 3;
  statement: string;
  /** Questions numérotées sous l'énoncé. */
  questions?: string[];
  hints?: string[];
  solution: string[];
}

export interface QuizQuestion {
  question: string;
  choices: string[];
  /** Index de la bonne réponse dans `choices`. */
  answer: number;
  explanation: string;
}

export interface Application {
  title: string;
  /** La situation de la vie réelle, racontée simplement. */
  situation: string;
  questions: string[];
  solution: string[];
}

export interface Lesson {
  /** Situation de départ qui donne envie d'apprendre le chapitre. */
  hook: string;
  /** Ce que l'élève saura faire à la fin. */
  objectives: string[];
  sections: LessonSection[];
  essentials: string[];
  /** Consigne à suivre dans la simulation du chapitre. */
  simulationTasks?: string[];
  exercises: Exercise[];
  quiz: QuizQuestion[];
  applications: Application[];
}
