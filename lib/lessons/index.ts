import type { ClassId, SubjectId } from '@/lib/curriculum';
import type { Locale } from '@/lib/i18n';
import { lesson as chimie10Atome } from './content/10e-chimie-atome';
import { lesson as chimie10Classification } from './content/10e-chimie-classification';
import { lesson as chimie10Covalente } from './content/10e-chimie-covalente';
import { lesson as chimie10Ions } from './content/10e-chimie-ions';
import { lesson as chimie10Mole } from './content/10e-chimie-mole';
import { lesson as chimie9Atome } from './content/9e-chimie-atome';
import { lesson as chimie12Glucose } from './content/12e-chimie-glucose';
import { lesson as chimie12Polymeres } from './content/12e-chimie-polymeres';
import { lesson as chimie12VitesseReactions } from './content/12e-chimie-vitesse-reactions';
import { lesson as chimie12Catalyse } from './content/12e-chimie-catalyse';
import { lesson as chimie12EquilibreQualitatif } from './content/12e-chimie-equilibre-qualitatif';
import { lesson as chimie12EquilibreQuantitatif } from './content/12e-chimie-equilibre-quantitatif';
import { lesson as chimie12HclNaoh } from './content/12e-chimie-hcl-naoh';
import { lesson as chimie12CouplesAcideBase } from './content/12e-chimie-couples-acide-base';
import { lesson as chimie12ReactionsAcidoBasiques } from './content/12e-chimie-reactions-acido-basiques';
import { lesson as physique12AmplificateurOperationnel } from './content/12e-physique-amplificateur-operationnel';
import { lesson as physique12CinematiquePoint } from './content/12e-physique-cinematique-point';
import { lesson as chimie10AtomeBm } from './content-bm/10e-chimie-atome';
import { lesson as chimie10ClassificationBm } from './content-bm/10e-chimie-classification';
import { lesson as chimie10CovalenteBm } from './content-bm/10e-chimie-covalente';
import { lesson as chimie10IonsBm } from './content-bm/10e-chimie-ions';
import { lesson as chimie10MoleBm } from './content-bm/10e-chimie-mole';
import { lesson as chimie9AtomeBm } from './content-bm/9e-chimie-atome';
import { CECP_LESSONS } from './content-cecp';
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
  // 12e Physique-Chimie : importée du site cecp (scripts/import-cecp.ts).
  ...CECP_LESSONS,
  // 12e chimie : rédigés pour Kalanso (programme du Prébac).
  '12e/chimie/glucose': chimie12Glucose,
  '12e/chimie/polymeres': chimie12Polymeres,
  '12e/chimie/vitesse-reactions': chimie12VitesseReactions,
  '12e/chimie/catalyse': chimie12Catalyse,
  '12e/chimie/equilibre-qualitatif': chimie12EquilibreQualitatif,
  '12e/chimie/equilibre-quantitatif': chimie12EquilibreQuantitatif,
  '12e/chimie/hcl-naoh': chimie12HclNaoh,
  '12e/chimie/couples-acide-base': chimie12CouplesAcideBase,
  '12e/chimie/reactions-acido-basiques': chimie12ReactionsAcidoBasiques,
  // Compléments du programme ivoirien (Terminale D).
  '12e/physique/cinematique-point': physique12CinematiquePoint,
  '12e/physique/amplificateur-operationnel': physique12AmplificateurOperationnel,
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
