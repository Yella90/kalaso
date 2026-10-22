import { Suspense } from 'react';
import type { SimulationId } from '@/lib/curriculum';
import type { Dictionary, Locale } from '@/lib/i18n';
import { AtomBuilder } from './AtomBuilder';
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
  }
}
