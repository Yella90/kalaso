import type { ComponentType } from 'react';
import type { SceneProps } from './kit';
import { ChampCooperativeScene } from './ChampCooperative';
import { EauDuPuitsScene } from './EauDuPuits';
import { EnquetePaludismeScene } from './EnquetePaludisme';
import { MotoElectriqueScene } from './MotoElectrique';
import { PompeSolaireScene } from './PompeSolaire';

const SCENES: Record<string, ComponentType<SceneProps>> = {
  'pompe-solaire': PompeSolaireScene,
  'champ-cooperative': ChampCooperativeScene,
  'eau-du-puits': EauDuPuitsScene,
  'enquete-paludisme': EnquetePaludismeScene,
  'moto-electrique': MotoElectriqueScene,
};

/** Scène animée de l’aventure ; elle se construit au fil des missions réussies. */
export function AdventureScene({ adventureId, ...props }: SceneProps & { adventureId: string }) {
  const Scene = SCENES[adventureId];
  if (!Scene) return null;
  return (
    <div className="overflow-hidden rounded-2xl border-2 border-[var(--subject)] bg-surface shadow-sm">
      <Scene {...props} />
    </div>
  );
}
