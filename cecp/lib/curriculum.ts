// lib/curriculum.ts
// ============================================================
//  Programme complet de Sciences Physiques T.S.E / T.S.EXP
//  (d'apres la table des matieres du Prebac de D. L. Diarra).
//  Source unique pour la navigation, la page /cours, l'accueil
//  et la navigation "chapitre précédent / suivant".
// ============================================================

export type ChapterStatus = 'disponible' | 'bientot';

export type Feature = 'cours' | 'simulation' | 'exercices' | 'vie-réelle';

export interface CurriculumChapter {
  slug: string;
  title: string;
  /** Resume en une ligne */
  summary: string;
  status: ChapterStatus;
  /** Lien de la lecon (si disponible) */
  href?: string;
  /** Ce que propose le chapitre */
  features: Feature[];
  /** Couleur d'accent (classe Tailwind de texte) */
  accent: string;
  /** Series concernees */
  series?: ('TSE' | 'TSEXP')[];
}

export interface CurriculumPart {
  id: string;
  title: string;
  chapters: CurriculumChapter[];
}

const ALL: ('TSE' | 'TSEXP')[] = ['TSE', 'TSEXP'];

export const CURRICULUM: CurriculumPart[] = [
  {
    id: 'mecanique',
    title: 'Mécanique',
    chapters: [
      {
        slug: 'cinematique', title: "Mouvement du centre d'inertie",
        summary: 'MRU, MRUV, MCU, théorème de l\'énergie cinétique.',
        status: 'disponible', href: '/lecons/physique/cinematique',
        features: ['cours', 'simulation', 'exercices', 'vie-réelle'], accent: 'text-emerald-400', series: ALL,
      },
      {
        slug: 'projectile', title: 'Projectile dans le champ de pesanteur',
        summary: 'Trajectoire parabolique, portée, flèche, temps de vol.',
        status: 'disponible', href: '/lecons/physique/projectile',
        features: ['cours', 'simulation', 'exercices', 'vie-réelle'], accent: 'text-amber-400', series: ALL,
      },
      {
        slug: 'satellite', title: 'Satellite terrestre',
        summary: 'Mouvement circulaire, vitesse, période, satellite géostationnaire.',
        status: 'disponible', href: '/lecons/physique/satellite',
        features: ['cours', 'simulation', 'exercices', 'vie-réelle'], accent: 'text-cyan-400', series: ALL,
      },
      {
        slug: 'systeme-solaire', title: 'Gravitation et système solaire',
        summary: 'Planètes, lunes et satellites artificiels : lois de Kepler, périodes, vitesses.',
        status: 'disponible', href: '/lecons/physique/systeme-solaire',
        features: ['cours', 'simulation', 'exercices'], accent: 'text-sky-400', series: ALL,
      },
      {
        slug: 'particule-chargee', title: 'Particule chargée dans un champ électrique',
        summary: "Déviation d'électrons et de protons entre les plaques d'un condensateur.",
        status: 'disponible', href: '/lecons/physique/particule-chargee',
        features: ['cours', 'simulation', 'exercices'], accent: 'text-violet-400', series: ALL,
      },
      {
        slug: 'champ-magnetique', title: 'Particule chargée dans un champ magnétique',
        summary: 'Force de Lorentz, mouvement circulaire, spectrographe de masse, cyclotron.',
        status: 'disponible', href: '/lecons/physique/champ-magnetique',
        features: ['cours', 'simulation', 'exercices', 'vie-réelle'], accent: 'text-fuchsia-400', series: ALL,
      },
    ],
  },
  {
    id: 'energie-interne',
    title: 'Énergie interne',
    chapters: [
      {
        slug: 'calorimetrie', title: 'Calorimétrie',
        summary: 'Quantité de chaleur, capacité thermique, changements d\'état.',
        status: 'disponible', href: '/lecons/physique/calorimetrie',
        features: ['cours', 'simulation', 'exercices', 'vie-réelle'], accent: 'text-orange-400', series: ALL,
      },
    ],
  },
  {
    id: 'induction',
    title: 'Induction électromagnétique',
    chapters: [
      {
        slug: 'auto-induction', title: 'Auto-induction',
        summary: 'Bobine, inductance, établissement du courant dans un circuit RL.',
        status: 'disponible', href: '/lecons/physique/auto-induction',
        features: ['cours', 'simulation', 'exercices', 'vie-réelle'], accent: 'text-yellow-400', series: ['TSE'],
      },
      {
        slug: 'transformateurs', title: 'Transformateurs et alternateurs',
        summary: 'Rapport de transformation, production du courant alternatif.',
        status: 'disponible', href: '/lecons/physique/transformateurs', features: ['cours', 'simulation', 'exercices', 'vie-réelle'], accent: 'text-yellow-400', series: ['TSE'],
      },
    ],
  },
  {
    id: 'vibrations',
    title: 'Vibrations',
    chapters: [
      {
        slug: 'ondes-progressives', title: 'Les ondes progressives',
        summary: 'Célérité, longueur d\'onde, périodicité spatiale et temporelle.',
        status: 'disponible', href: '/lecons/physique/ondes-progressives',
        features: ['cours', 'simulation', 'exercices', 'vie-réelle'], accent: 'text-teal-400', series: ALL,
      },
      {
        slug: 'interferences-mecaniques', title: 'Interférences mécaniques',
        summary: 'Superposition de deux ondes à la surface de l\'eau.',
        status: 'disponible', href: '/lecons/physique/interferences-mecaniques',
        features: ['cours', 'simulation', 'exercices', 'vie-réelle'], accent: 'text-teal-400', series: ALL,
      },
      {
        slug: 'interferences-lumineuses', title: 'Interférences lumineuses',
        summary: "Fentes de Young, interfrange, nature ondulatoire de la lumière.",
        status: 'disponible', href: '/lecons/physique/interferences-lumineuses',
        features: ['cours', 'simulation', 'exercices', 'vie-réelle'], accent: 'text-rose-400', series: ALL,
      },
      {
        slug: 'laser', title: 'Le rayonnement laser',
        summary: 'Émission stimulée, propriétés et applications du laser.',
        status: 'disponible', href: '/lecons/physique/laser', features: ['cours', 'simulation', 'exercices', 'vie-réelle'], accent: 'text-rose-400', series: ALL,
      },
    ],
  },
  {
    id: 'oscillations-libres',
    title: 'Oscillations libres',
    chapters: [
      {
        slug: 'pendule-elastique', title: 'Le pendule élastique',
        summary: 'Oscillateur harmonique ressort-masse, période propre, énergie.',
        status: 'disponible', href: '/lecons/physique/pendule-elastique',
        features: ['cours', 'simulation', 'exercices', 'vie-réelle'], accent: 'text-lime-400', series: ALL,
      },
      {
        slug: 'pendule-torsion', title: 'Le pendule de torsion',
        summary: 'Couple de torsion, moment d\'inertie, période.',
        status: 'disponible', href: '/lecons/physique/pendule-torsion', features: ['cours', 'simulation', 'exercices', 'vie-réelle'], accent: 'text-lime-400', series: ['TSE'],
      },
      {
        slug: 'pendule-pesant', title: 'Le pendule pesant et le pendule simple',
        summary: 'Petites oscillations, isochronisme, période T = 2π√(l/g).',
        status: 'disponible', href: '/lecons/physique/pendule-pesant',
        features: ['cours', 'simulation', 'exercices', 'vie-réelle'], accent: 'text-lime-400', series: ALL,
      },
      {
        slug: 'circuit-oscillant', title: 'Le circuit oscillant LC',
        summary: 'Oscillations électriques libres, période de Thomson.',
        status: 'disponible', href: '/lecons/physique/circuit-oscillant',
        features: ['cours', 'simulation', 'exercices', 'vie-réelle'], accent: 'text-lime-400', series: ALL,
      },
      {
        slug: 'ondes-electromagnetiques', title: 'Les ondes électromagnétiques',
        summary: 'Spectre électromagnétique, propagation, applications.',
        status: 'disponible', href: '/lecons/physique/ondes-electromagnetiques', features: ['cours', 'simulation', 'exercices', 'vie-réelle'], accent: 'text-lime-400', series: ALL,
      },
    ],
  },
  {
    id: 'oscillations-forcees',
    title: 'Oscillations forcées',
    chapters: [
      {
        slug: 'oscillations-mecaniques-forcees', title: 'Oscillations mécaniques forcées',
        summary: 'Excitateur, résonateur, résonance d\'amplitude.',
        status: 'disponible', href: '/lecons/physique/oscillations-mecaniques-forcees', features: ['cours', 'simulation', 'exercices', 'vie-réelle'], accent: 'text-indigo-400', series: ALL,
      },
      {
        slug: 'oscillations-electriques-forcees', title: 'Oscillations électriques forcées (RLC)',
        summary: 'Impédance, résonance d\'intensité, facteur de qualité.',
        status: 'disponible', href: '/lecons/physique/oscillations-electriques-forcees',
        features: ['cours', 'simulation', 'exercices', 'vie-réelle'], accent: 'text-indigo-400', series: ALL,
      },
    ],
  },
  {
    id: 'ondulatoire',
    title: 'Physique ondulatoire et corpusculaire',
    chapters: [
      {
        slug: 'effet-photoelectrique', title: 'Effet photoélectrique',
        summary: "Photon, seuil photoélectrique, équation d'Einstein.",
        status: 'disponible', href: '/lecons/physique/effet-photoelectrique',
        features: ['cours', 'simulation', 'exercices', 'vie-réelle'], accent: 'text-yellow-300', series: ALL,
      },
      {
        slug: 'niveaux-energie', title: "Niveaux d'énergie dans les atomes",
        summary: "Spectre de l'hydrogène, transitions, raies d'émission.",
        status: 'disponible', href: '/lecons/physique/niveaux-energie',
        features: ['cours', 'simulation', 'exercices', 'vie-réelle'], accent: 'text-yellow-300', series: ALL,
      },
      {
        slug: 'rayons-x', title: 'Les rayons X',
        summary: 'Production et propriétés des rayons X.',
        status: 'disponible', href: '/lecons/physique/rayons-x', features: ['cours', 'simulation', 'exercices', 'vie-réelle'], accent: 'text-yellow-300', series: ALL,
      },
    ],
  },
  {
    id: 'nucleaire',
    title: 'Physique atomique et nucléaire',
    chapters: [
      {
        slug: 'noyau-atomique', title: 'Le noyau atomique',
        summary: 'Composition, défaut de masse, énergie de liaison.',
        status: 'disponible', href: '/lecons/physique/noyau-atomique', features: ['cours', 'simulation', 'exercices', 'vie-réelle'], accent: 'text-red-400', series: ALL,
      },
      {
        slug: 'radioactivite', title: 'Radioactivité et réactions nucléaires',
        summary: 'Désintégrations α, β, γ, loi de décroissance, demi-vie, datation.',
        status: 'disponible', href: '/lecons/physique/radioactivite',
        features: ['cours', 'simulation', 'exercices', 'vie-réelle'], accent: 'text-red-400', series: ALL,
      },
    ],
  },
  {
    id: 'chimie-organique',
    title: 'Chimie organique',
    chapters: [
      { slug: 'stereochimie', title: 'Stéréochimie', summary: 'Isomérie, chiralité, représentations.', status: 'disponible', href: '/lecons/chimie/stereochimie', features: ['cours', 'simulation', 'exercices', 'vie-réelle'], accent: 'text-pink-400', series: ALL },
      { slug: 'alcools', title: 'Les alcools', summary: 'Classes, oxydation ménagée, propriétés.', status: 'disponible', href: '/lecons/chimie/alcools', features: ['cours', 'simulation', 'exercices', 'vie-réelle'], accent: 'text-pink-400', series: ALL },
      { slug: 'amines', title: 'Les amines', summary: 'Nomenclature, basicité, réactions.', status: 'disponible', href: '/lecons/chimie/amines', features: ['cours', 'simulation', 'exercices', 'vie-réelle'], accent: 'text-pink-400', series: ALL },
      { slug: 'acides-carboxyliques', title: 'Acides carboxyliques et dérivés', summary: 'Estérification, hydrolyse, chlorures d\'acyle, amides.', status: 'disponible', href: '/lecons/chimie/acides-carboxyliques', features: ['cours', 'simulation', 'exercices', 'vie-réelle'], accent: 'text-pink-400', series: ALL },
      { slug: 'acides-amines', title: 'Les acides α-aminés', summary: 'Structure, liaison peptidique.', status: 'disponible', href: '/lecons/chimie/acides-amines', features: ['cours', 'simulation', 'exercices', 'vie-réelle'], accent: 'text-pink-400', series: ALL },
    ],
  },
];

export const ALL_CHAPTERS: (CurriculumChapter & { partTitle: string })[] = CURRICULUM.flatMap((p) =>
  p.chapters.map((c) => ({ ...c, partTitle: p.title })),
);

export const AVAILABLE_CHAPTERS = ALL_CHAPTERS.filter((c) => c.status === 'disponible');

export function findChapter(slug: string) {
  return ALL_CHAPTERS.find((c) => c.slug === slug);
}

/** Chapitres disponibles precedent et suivant (ordre du programme) */
export function chapterNeighbors(slug: string) {
  const i = AVAILABLE_CHAPTERS.findIndex((c) => c.slug === slug);
  return {
    prev: i > 0 ? AVAILABLE_CHAPTERS[i - 1] : undefined,
    next: i >= 0 && i < AVAILABLE_CHAPTERS.length - 1 ? AVAILABLE_CHAPTERS[i + 1] : undefined,
  };
}

export const FEATURE_LABEL: Record<Feature, string> = {
  cours: 'Cours',
  simulation: 'Simulation',
  exercices: 'Exercices',
  'vie-réelle': 'Vie réelle',
};
