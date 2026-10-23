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
  }
}
