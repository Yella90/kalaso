// Modèle de données du programme scolaire.
// Les titres sont en français ; les traductions bambara vivent dans
// lib/i18n/content-bm.ts et retombent sur le français quand elles manquent.

export type SubjectId = 'maths' | 'physique' | 'chimie' | 'biologie';

export type ClassId = '7e' | '8e' | '9e' | '10e' | '11e' | '12e';

export type CycleId = 'fondamental' | 'lycee';

/**
 * - `officiel` : relevé dans un document du programme malien (découpage du Ministère, manuel APC…)
 * - `anticipe` : proposé d'après les programmes de la sous-région, à valider avec les documents officiels
 */
export type ProgramStatus = 'officiel' | 'anticipe';

/** Simulation interactive déjà disponible pour un chapitre. */
export type SimulationId =
  | 'atome'
  | 'tableau-periodique'
  | 'circuit'
  | 'projectile'
  | 'fonction'
  | 'osmose'
  | 'mitose'
  | 'croisement'
  | 'hardy-weinberg'
  | 'potentiel-action'
  | 'glycemie'
  | 'immunite'
  | 'traduction'
  | 'photosynthese';

export interface Chapter {
  /** Identifiant unique dans sa classe et sa matière (utilisé dans l'URL). */
  id: string;
  title: string;
  /** Notions principales, en une ligne chacune. */
  notions?: string[];
  /** Grande partie du programme (« Mécanique », « Chimie organique »…). */
  domain?: string;
  trimester?: 1 | 2 | 3;
  hours?: number;
  /** Séries concernées quand le chapitre n'est pas commun à toutes. */
  series?: string[];
  simulation?: SimulationId;
  /** Chapitre ajouté d'après le programme ivoirien (Terminale D), absent du programme malien. */
  complement?: boolean;
}

export interface SubjectProgram {
  classId: ClassId;
  subject: SubjectId;
  status: ProgramStatus;
  /** Document d'où vient le programme. */
  source: string;
  chapters: Chapter[];
}
