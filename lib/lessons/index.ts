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
import { lesson as maths12AlgebreLineaire } from './content/12e-maths-algebre-lineaire';
import { lesson as maths12ApplicationsAffines } from './content/12e-maths-applications-affines';
import { lesson as maths12Arithmetique } from './content/12e-maths-arithmetique';
import { lesson as maths12Barycentre } from './content/12e-maths-barycentre';
import { lesson as maths12Cinematique } from './content/12e-maths-cinematique';
import { lesson as maths12Complexes } from './content/12e-maths-complexes';
import { lesson as maths12Coniques } from './content/12e-maths-coniques';
import { lesson as maths12EquationsDifferentielles } from './content/12e-maths-equations-differentielles';
import { lesson as maths12Fonctions } from './content/12e-maths-fonctions';
import { lesson as maths12GeometrieEspace } from './content/12e-maths-geometrie-espace';
import { lesson as maths12Integrales } from './content/12e-maths-integrales';
import { lesson as maths12IsometriesSimilitudes } from './content/12e-maths-isometries-similitudes';
import { lesson as maths12LnExp } from './content/12e-maths-ln-exp';
import { lesson as maths12Probabilites } from './content/12e-maths-probabilites';
import { lesson as maths12Statistique } from './content/12e-maths-statistique';
import { lesson as maths12Suites } from './content/12e-maths-suites';
import { lesson as biologie12AidesImmunitaires } from './content/12e-biologie-aides-immunitaires';
import { lesson as biologie12BrassageGenetique } from './content/12e-biologie-brassage-genetique';
import { lesson as biologie12ConstitutionSn } from './content/12e-biologie-constitution-sn';
import { lesson as biologie12Dysfonctionnements } from './content/12e-biologie-dysfonctionnements';
import { lesson as biologie12EchangesCellulaires } from './content/12e-biologie-echanges-cellulaires';
import { lesson as biologie12ExpressionGenetique } from './content/12e-biologie-expression-genetique';
import { lesson as biologie12FonctionnementSn } from './content/12e-biologie-fonctionnement-sn';
import { lesson as biologie12GenetiqueHumaine } from './content/12e-biologie-genetique-humaine';
import { lesson as biologie12GenetiquePopulations } from './content/12e-biologie-genetique-populations';
import { lesson as biologie12Glycemie } from './content/12e-biologie-glycemie';
import { lesson as biologie12HormonesSexuelles } from './content/12e-biologie-hormones-sexuelles';
import { lesson as biologie12Metabolisme } from './content/12e-biologie-metabolisme';
import { lesson as biologie12Motricite } from './content/12e-biologie-motricite';
import { lesson as biologie12MuscleStrie } from './content/12e-biologie-muscle-strie';
import { lesson as biologie12PressionArterielle } from './content/12e-biologie-pression-arterielle';
import { lesson as biologie12ReponseImmunitaire } from './content/12e-biologie-reponse-immunitaire';
import { lesson as biologie12ReproductionHomme } from './content/12e-biologie-reproduction-homme';
import { lesson as biologie12SoiNonSoi } from './content/12e-biologie-soi-non-soi';
import { lesson as biologie12StructureCellule } from './content/12e-biologie-structure-cellule';
import { lesson as biologie12SupportGenetique } from './content/12e-biologie-support-genetique';
import { lesson as biologie12TransmissionGenetique } from './content/12e-biologie-transmission-genetique';
import { lesson as physique11BilanEnergetique } from './content/11e-physique-bilan-energetique';
import { lesson as physique11ChampElectrique } from './content/11e-physique-champ-electrique';
import { lesson as physique11ChampMagnetique } from './content/11e-physique-champ-magnetique';
import { lesson as physique11Condensateurs } from './content/11e-physique-condensateurs';
import { lesson as physique11Coulomb } from './content/11e-physique-coulomb';
import { lesson as physique11EnergieCinetique } from './content/11e-physique-energie-cinetique';
import { lesson as physique11EnergieMecanique } from './content/11e-physique-energie-mecanique';
import { lesson as physique11InstrumentsOptiques } from './content/11e-physique-instruments-optiques';
import { lesson as physique11Laplace } from './content/11e-physique-laplace';
import { lesson as physique11MiroirsLentilles } from './content/11e-physique-miroirs-lentilles';
import { lesson as physique11Potentiel } from './content/11e-physique-potentiel';
import { lesson as physique11Travail } from './content/11e-physique-travail';
import { lesson as chimie11Alcanes } from './content/11e-chimie-alcanes';
import { lesson as chimie11AlcenesAlcynes } from './content/11e-chimie-alcenes-alcynes';
import { lesson as chimie11Benzene } from './content/11e-chimie-benzene';
import { lesson as chimie11ClassificationMetaux } from './content/11e-chimie-classification-metaux';
import { lesson as chimie11DosagesRedox } from './content/11e-chimie-dosages-redox';
import { lesson as chimie11Electrolyse } from './content/11e-chimie-electrolyse';
import { lesson as chimie11Oxydoreduction } from './content/11e-chimie-oxydoreduction';
import { lesson as chimie11Petrole } from './content/11e-chimie-petrole';
import { lesson as chimie11Piles } from './content/11e-chimie-piles';
import { lesson as maths11Applications } from './content/11e-maths-applications';
import { lesson as maths11Denombrement } from './content/11e-maths-denombrement';
import { lesson as maths11EquationsSystemes } from './content/11e-maths-equations-systemes';
import { lesson as maths11Fonctions } from './content/11e-maths-fonctions';
import { lesson as maths11GeometrieEspace } from './content/11e-maths-geometrie-espace';
import { lesson as maths11GeometriePlane } from './content/11e-maths-geometrie-plane';
import { lesson as maths11Polynomes } from './content/11e-maths-polynomes';
import { lesson as maths11Probabilite } from './content/11e-maths-probabilite';
import { lesson as maths11Statistique } from './content/11e-maths-statistique';
import { lesson as maths11Suites } from './content/11e-maths-suites';
import { lesson as maths11Trigonometrie } from './content/11e-maths-trigonometrie';
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
  '12e/maths/algebre-lineaire': maths12AlgebreLineaire,
  '12e/maths/applications-affines': maths12ApplicationsAffines,
  '12e/maths/arithmetique': maths12Arithmetique,
  '12e/maths/barycentre': maths12Barycentre,
  '12e/maths/cinematique': maths12Cinematique,
  '12e/maths/complexes': maths12Complexes,
  '12e/maths/coniques': maths12Coniques,
  '12e/maths/equations-differentielles': maths12EquationsDifferentielles,
  '12e/maths/fonctions': maths12Fonctions,
  '12e/maths/geometrie-espace': maths12GeometrieEspace,
  '12e/maths/integrales': maths12Integrales,
  '12e/maths/isometries-similitudes': maths12IsometriesSimilitudes,
  '12e/maths/ln-exp': maths12LnExp,
  '12e/maths/probabilites': maths12Probabilites,
  '12e/maths/statistique': maths12Statistique,
  '12e/maths/suites': maths12Suites,
  '12e/biologie/aides-immunitaires': biologie12AidesImmunitaires,
  '12e/biologie/brassage-genetique': biologie12BrassageGenetique,
  '12e/biologie/constitution-sn': biologie12ConstitutionSn,
  '12e/biologie/dysfonctionnements': biologie12Dysfonctionnements,
  '12e/biologie/echanges-cellulaires': biologie12EchangesCellulaires,
  '12e/biologie/expression-genetique': biologie12ExpressionGenetique,
  '12e/biologie/fonctionnement-sn': biologie12FonctionnementSn,
  '12e/biologie/genetique-humaine': biologie12GenetiqueHumaine,
  '12e/biologie/genetique-populations': biologie12GenetiquePopulations,
  '12e/biologie/glycemie': biologie12Glycemie,
  '12e/biologie/hormones-sexuelles': biologie12HormonesSexuelles,
  '12e/biologie/metabolisme': biologie12Metabolisme,
  '12e/biologie/motricite': biologie12Motricite,
  '12e/biologie/muscle-strie': biologie12MuscleStrie,
  '12e/biologie/pression-arterielle': biologie12PressionArterielle,
  '12e/biologie/reponse-immunitaire': biologie12ReponseImmunitaire,
  '12e/biologie/reproduction-homme': biologie12ReproductionHomme,
  '12e/biologie/soi-non-soi': biologie12SoiNonSoi,
  '12e/biologie/structure-cellule': biologie12StructureCellule,
  '12e/biologie/support-genetique': biologie12SupportGenetique,
  '12e/biologie/transmission-genetique': biologie12TransmissionGenetique,
  '11e/physique/bilan-energetique': physique11BilanEnergetique,
  '11e/physique/champ-electrique': physique11ChampElectrique,
  '11e/physique/champ-magnetique': physique11ChampMagnetique,
  '11e/physique/condensateurs': physique11Condensateurs,
  '11e/physique/coulomb': physique11Coulomb,
  '11e/physique/energie-cinetique': physique11EnergieCinetique,
  '11e/physique/energie-mecanique': physique11EnergieMecanique,
  '11e/physique/instruments-optiques': physique11InstrumentsOptiques,
  '11e/physique/laplace': physique11Laplace,
  '11e/physique/miroirs-lentilles': physique11MiroirsLentilles,
  '11e/physique/potentiel': physique11Potentiel,
  '11e/physique/travail': physique11Travail,
  '11e/chimie/alcanes': chimie11Alcanes,
  '11e/chimie/alcenes-alcynes': chimie11AlcenesAlcynes,
  '11e/chimie/benzene': chimie11Benzene,
  '11e/chimie/classification-metaux': chimie11ClassificationMetaux,
  '11e/chimie/dosages-redox': chimie11DosagesRedox,
  '11e/chimie/electrolyse': chimie11Electrolyse,
  '11e/chimie/oxydoreduction': chimie11Oxydoreduction,
  '11e/chimie/petrole': chimie11Petrole,
  '11e/chimie/piles': chimie11Piles,
  '11e/maths/applications': maths11Applications,
  '11e/maths/denombrement': maths11Denombrement,
  '11e/maths/equations-systemes': maths11EquationsSystemes,
  '11e/maths/fonctions': maths11Fonctions,
  '11e/maths/geometrie-espace': maths11GeometrieEspace,
  '11e/maths/geometrie-plane': maths11GeometriePlane,
  '11e/maths/polynomes': maths11Polynomes,
  '11e/maths/probabilite': maths11Probabilite,
  '11e/maths/statistique': maths11Statistique,
  '11e/maths/suites': maths11Suites,
  '11e/maths/trigonometrie': maths11Trigonometrie,
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
