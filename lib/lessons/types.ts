import type { MediaId } from '@/lib/media';

// Contenu pédagogique d'un chapitre : Cours → Simuler → S'exercer → Appliquer.
//
// Les textes acceptent une mise en forme minimale :
//   **gras**   et   $formule$  (KaTeX, avec \ce{...} pour la chimie).

export type Block =
  | { kind: 'text'; text: string }
  | { kind: 'definition'; term: string; text: string }
  | { kind: 'rule'; text: string }
  | { kind: 'formula'; tex: string; label?: string; legend?: string[] }
  | { kind: 'list'; items: string[] }
  | { kind: 'callout'; variant: 'retenir' | 'attention' | 'methode' | 'remarque'; title?: string; blocks: Block[] }
  | { kind: 'example'; title?: string; text: string; steps?: string[] }
  | { kind: 'trap'; wrong: string; why: string; reflex: string }
  | { kind: 'table'; head: string[]; rows: string[][] }
  | { kind: 'lewis'; molecules: LewisMolecule[] }
  /** Schéma dessiné pour Kalanso (voir components/figures). */
  | { kind: 'figure'; id: FigureId; caption?: string }
  /** Photo ou vidéo libre de Wikimedia Commons (voir lib/media.ts), avec son auteur et sa licence. */
  | { kind: 'photo'; id: MediaId; caption?: string };

export type FigureId =
  | 'cellule-animale'
  | 'cellule-vegetale'
  | 'adn'
  | 'chromosome'
  | 'neurone'
  | 'synapse'
  | 'arc-reflexe'
  | 'sarcomere'
  | 'coeur'
  | 'anticorps'
  | 'fleur'
  | 'globe'
  | 'cycle-ovarien'
  | 'regulation-glycemie';

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

/**
 * Schéma d'exercice, en unités du problème (mètres…) ; y augmente vers le haut.
 * Les couleurs sont prévues pour un fond sombre, comme un tableau noir ;
 * `paper` : figure de manuel, trait noir sur fond clair.
 */
export interface Diagram {
  width: number;
  height: number;
  paper?: boolean;
  groundLevel?: number;
  elements: DiagramElement[];
  /** Mobile animé : positions régulièrement espacées sur `duration` secondes. */
  animation?: {
    duration: number;
    frames: { x: number; y: number }[];
    color?: string;
    radius?: number;
    trail?: { x: number; y: number }[];
  };
}

export type DiagramElement =
  | { type: 'line'; x1: number; y1: number; x2: number; y2: number; color?: string; dashed?: boolean; width?: number }
  | { type: 'circle'; cx: number; cy: number; r: number; color?: string; fill?: string; dashed?: boolean }
  | { type: 'arc'; cx: number; cy: number; r: number; startAngle: number; endAngle: number; color?: string; width?: number }
  | { type: 'point'; x: number; y: number; label?: string; color?: string; labelPos?: LabelPos }
  | { type: 'dot'; x: number; y: number; label?: string; color?: string; labelPos?: LabelPos; radius?: number }
  | { type: 'hatch'; x1: number; y1: number; x2: number; y2: number; count?: number }
  | { type: 'arrow'; x1: number; y1: number; x2: number; y2: number; color?: string; label?: string; width?: number }
  | { type: 'text'; x: number; y: number; text: string; color?: string; size?: number; anchor?: 'start' | 'middle' | 'end'; italic?: boolean }
  | { type: 'block'; x: number; y: number; w: number; h: number; color?: string; label?: string; angle?: number }
  | { type: 'angle'; cx: number; cy: number; r: number; startAngle: number; endAngle: number; label?: string; color?: string }
  | { type: 'ground'; y: number; color?: string }
  | { type: 'axes'; origin?: { x: number; y: number }; lengthX: number; lengthY: number; labelX?: string; labelY?: string };

export type LabelPos = 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export interface LessonSection {
  title: string;
  blocks: Block[];
}

/** Réponse que l'élève saisit et que la page vérifie. */
export type Answer =
  /** Nombre ; la tolérance est absolue, dans la même unité. */
  | { kind: 'number'; value: number; tolerance: number; unit: string }
  /** Expression courte ; `accepted` liste les écritures acceptées. */
  | { kind: 'text'; display: string; accepted: string[] };

/** Question d'exercice avec réponse vérifiée et correction pas à pas. */
export interface ExercisePart {
  label: string;
  answer: Answer;
  steps: string[];
  /** Résultat final, en TeX sans les $. */
  result?: string;
}

export interface Exercise {
  id: string;
  /** 1 : application directe ; 2 : raisonnement ; 3 : niveau examen. */
  level: 1 | 2 | 3;
  title?: string;
  /** Origine de l'exercice (sujet d'examen…). */
  source?: string;
  statement: string;
  given?: { label: string; value: string }[];
  diagram?: Diagram;
  /** Questions numérotées sous l'énoncé, corrigées ensemble dans `solution`. */
  questions?: string[];
  /** Questions à réponse vérifiée, chacune avec sa correction. */
  parts?: ExercisePart[];
  hints?: string[];
  solution?: string[];
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
  /** Phrase courte sous le titre. */
  tagline?: string;
  /** La situation de la vie réelle, racontée simplement. */
  situation: string;
  /** Ce que le modèle physique représente, et ses limites. */
  model?: string;
  questions: string[];
  /** Réponse numérique vérifiée ; la tolérance est relative (0,03 = 3 %). */
  check?: { value: number; tolerance: number; unit: string };
  solution: string[];
  /** « Le savais-tu ? » */
  fact?: string;
}

// Les listes vides (objectifs, essentiel, quiz…) ne s'affichent pas.
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
