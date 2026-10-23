import { Suspense } from 'react';
import type { SimulationId } from '@/lib/curriculum';
import type { Dictionary, Locale } from '@/lib/i18n';
import { AtomBuilder } from './AtomBuilder';
import { OsmoseSim } from './bio/OsmoseSim';
import { MitoseSim } from './bio/MitoseSim';
import { CroisementSim } from './bio/CroisementSim';
import { HardyWeinbergSim } from './bio/HardyWeinbergSim';
import { PotentielActionSim } from './bio/PotentielActionSim';
import { GlycemieSim } from './bio/GlycemieSim';
import { ImmuniteSim } from './bio/ImmuniteSim';
import { TraductionSim } from './bio/TraductionSim';
import { PhotosyntheseSim } from './bio/PhotosyntheseSim';
import { CelluleSim } from './bio/cellule/CelluleSim';
import { AdnSim } from './bio/adn/AdnSim';
import { CaryotypeSim } from './bio/CaryotypeSim';
import { CoeurSim } from './bio/CoeurSim';
import { SkateParkSim } from './SkateParkSim';
import { CercleTrigoSim } from './maths/CercleTrigoSim';
import { VecteursSim } from './maths/VecteursSim';
import { TransformationsSim } from './maths/TransformationsSim';
import { StatistiqueSim } from './maths/StatistiqueSim';
import { ProbabiliteSim } from './maths/ProbabiliteSim';
import { SolidesSim } from './maths/SolidesSim';
import { PythagoreSim } from './maths/PythagoreSim';
import { ThalesSim } from './maths/ThalesSim';
import { IdentitesSim } from './maths/IdentitesSim';
import { FractionsSim } from './maths/FractionsSim';
import { RelatifsSim } from './maths/RelatifsSim';
import { AnglesSim } from './maths/AnglesSim';
import { SystemesSim } from './maths/SystemesSim';
import { SuitesSim } from './maths/SuitesSim';
import { IntegralesSim } from './maths/IntegralesSim';
import { ComplexesSim } from './maths/ComplexesSim';
import { ExponentielleSim } from './maths/ExponentielleSim';
import { ConiquesSim } from './maths/ConiquesSim';
import { RegressionSim } from './maths/RegressionSim';
import { EuclideSim } from './maths/EuclideSim';
import { CircuitSim } from './CircuitSim';
import { FunctionSim } from './FunctionSim';
import { PeriodicTable } from './PeriodicTable';
import { ProjectileSim } from './ProjectileSim';

/** Affiche une simulation par son identifiant (utilisé dans les chapitres et la page des simulations). */
export function SimulationView({ id, lang, t }: { id: SimulationId; lang: Locale; t: Dictionary }) {
  switch (id) {
    case 'atome':
      // L'atome et le tableau lisent ?z= dans l'URL : ils sont rendus côté client.
      return (
        <Suspense>
          <AtomBuilder lang={lang} t={t.atom} />
        </Suspense>
      );
    case 'tableau-periodique':
      return (
        <Suspense>
          <PeriodicTable lang={lang} t={t.table} />
        </Suspense>
      );
    case 'circuit':
      return <CircuitSim t={t.sims.circuit} />;
    case 'projectile':
      return <ProjectileSim t={t.sims.projectile} />;
    case 'fonction':
      return <FunctionSim t={t.sims.fonction} />;
    case 'osmose':
      return <OsmoseSim t={t.sims['osmose']} />;
    case 'mitose':
      return <MitoseSim t={t.sims['mitose']} />;
    case 'croisement':
      return <CroisementSim t={t.sims['croisement']} />;
    case 'hardy-weinberg':
      return <HardyWeinbergSim t={t.sims['hardy-weinberg']} />;
    case 'potentiel-action':
      return <PotentielActionSim t={t.sims['potentiel-action']} />;
    case 'glycemie':
      return <GlycemieSim t={t.sims['glycemie']} />;
    case 'immunite':
      return <ImmuniteSim t={t.sims['immunite']} />;
    case 'traduction':
      return <TraductionSim t={t.sims['traduction']} />;
    case 'photosynthese':
      return <PhotosyntheseSim t={t.sims['photosynthese']} />;
    case 'cellule-3d':
      return <CelluleSim t={t.sims['cellule-3d']} />;
    case 'adn-3d':
      return <AdnSim t={t.sims['adn-3d']} />;
    case 'caryotype':
      return <CaryotypeSim t={t.sims['caryotype']} />;
    case 'coeur':
      return <CoeurSim t={t.sims['coeur']} />;
    case 'skate-park':
      return <SkateParkSim t={t.sims['skate-park']} />;
    case 'cercle-trigo':
      return <CercleTrigoSim t={t.sims['cercle-trigo']} predict={t.lesson.predict} />;
    case 'vecteurs':
      return <VecteursSim t={t.sims['vecteurs']} predict={t.lesson.predict} />;
    case 'transformations':
      return <TransformationsSim t={t.sims['transformations']} predict={t.lesson.predict} />;
    case 'statistique':
      return <StatistiqueSim t={t.sims['statistique']} predict={t.lesson.predict} />;
    case 'probabilite':
      return <ProbabiliteSim t={t.sims['probabilite']} predict={t.lesson.predict} />;
    case 'solides':
      return <SolidesSim t={t.sims['solides']} predict={t.lesson.predict} />;
    case 'pythagore':
      return <PythagoreSim t={t.sims['pythagore']} predict={t.lesson.predict} />;
    case 'thales':
      return <ThalesSim t={t.sims['thales']} predict={t.lesson.predict} />;
    case 'identites':
      return <IdentitesSim t={t.sims['identites']} predict={t.lesson.predict} />;
    case 'fractions':
      return <FractionsSim t={t.sims['fractions']} predict={t.lesson.predict} />;
    case 'relatifs':
      return <RelatifsSim t={t.sims['relatifs']} predict={t.lesson.predict} />;
    case 'angles':
      return <AnglesSim t={t.sims['angles']} predict={t.lesson.predict} />;
    case 'systemes':
      return <SystemesSim t={t.sims['systemes']} predict={t.lesson.predict} />;
    case 'suites':
      return <SuitesSim t={t.sims['suites']} predict={t.lesson.predict} />;
    case 'integrales':
      return <IntegralesSim t={t.sims['integrales']} predict={t.lesson.predict} />;
    case 'complexes':
      return <ComplexesSim t={t.sims['complexes']} predict={t.lesson.predict} />;
    case 'exponentielle':
      return <ExponentielleSim t={t.sims['exponentielle']} predict={t.lesson.predict} />;
    case 'coniques':
      return <ConiquesSim t={t.sims['coniques']} predict={t.lesson.predict} />;
    case 'regression':
      return <RegressionSim t={t.sims['regression']} predict={t.lesson.predict} />;
    case 'euclide':
      return <EuclideSim t={t.sims['euclide']} predict={t.lesson.predict} />;
  }
}
