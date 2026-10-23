import type { FigureId } from '@/lib/lessons/types';
import { CelluleAnimale, CelluleVegetale } from './cellule';
import { Anticorps, Coeur, Fleur, Globe } from './corps';
import { Adn, Chromosome } from './genetique';
import { ArcReflexe, Neurone, Sarcomere, Synapse } from './nerveux';
import { CycleOvarien, RegulationGlycemie } from './regulations';

// Schémas originaux de Kalanso, rendus côté serveur : aucun fichier image à télécharger.
const FIGURES: Record<FigureId, () => React.JSX.Element> = {
  'cellule-animale': CelluleAnimale,
  'cellule-vegetale': CelluleVegetale,
  adn: Adn,
  chromosome: Chromosome,
  neurone: Neurone,
  synapse: Synapse,
  'arc-reflexe': ArcReflexe,
  sarcomere: Sarcomere,
  coeur: Coeur,
  anticorps: Anticorps,
  fleur: Fleur,
  globe: Globe,
  'cycle-ovarien': CycleOvarien,
  'regulation-glycemie': RegulationGlycemie,
};

export function Figure({ id }: { id: FigureId }) {
  const Drawing = FIGURES[id];
  return <Drawing />;
}
