import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Les enfants d’un même couple ne se ressemblent jamais tout à fait, sauf les vrais jumeaux. Pourtant, ils reçoivent tous la moitié des chromosomes de chaque parent. C’est que la **méiose** mélange les chromosomes et leurs gènes, puis la **fécondation** réunit au hasard deux gamètes. Ce double **brassage** crée une diversité presque infinie.',
  objectives: [
    'décrire les deux divisions de la méiose ;',
    'expliquer le brassage interchromosomique et le brassage intrachromosomique ;',
    'interpréter un croisement de monohybridisme (dominance, codominance) ;',
    'interpréter un croisement de dihybridisme (gènes indépendants ou liés).',
  ],
  sections: [
    {
      title: 'La méiose',
      blocks: [
        {
          kind: 'table',
          head: ['Division', 'Ce qui se sépare', 'Résultat'],
          rows: [
            ['méiose I (réductionnelle)', 'les chromosomes **homologues** de chaque paire', '2 cellules à $n$ chromosomes à deux chromatides'],
            ['méiose II (équationnelle)', 'les **chromatides** de chaque chromosome', '4 cellules à $n$ chromosomes à une chromatide'],
          ],
        },
        {
          kind: 'text',
          text: 'À la prophase I, les homologues s’apparient. Des chromatides de deux homologues peuvent s’entrecroiser et échanger des segments : c’est le **crossing-over**.',
        },
      ],
    },
    {
      title: 'Deux brassages',
      blocks: [
        {
          kind: 'list',
          items: [
            '**interchromosomique** (anaphase I) : chaque paire d’homologues se sépare indépendamment des autres ; avec $n$ paires, $2^n$ combinaisons de chromosomes sont possibles dans les gamètes ($2^{23} \\approx 8$ millions chez l’homme) ;',
            '**intrachromosomique** (prophase I) : le crossing-over recombine les allèles portés par un même chromosome.',
          ],
        },
        {
          kind: 'rule',
          text: 'La fécondation réunit au hasard un gamète de chaque parent : elle multiplie encore la diversité. Chaque enfant est génétiquement unique.',
        },
      ],
    },
    {
      title: 'Monohybridisme et dihybridisme',
      blocks: [
        {
          kind: 'table',
          head: ['Croisement', 'Résultat attendu'],
          rows: [
            ['F1 de deux lignées pures', 'F1 homogène (1ʳᵉ loi de Mendel)'],
            ['F2 (F1 × F1), dominance complète', '3/4 phénotype dominant, 1/4 récessif'],
            ['F2, codominance', '1/4, 1/2, 1/4'],
            ['test-cross (F1 × récessif)', '1/2, 1/2'],
            ['F2 dihybride, gènes indépendants', '9/16, 3/16, 3/16, 1/16'],
            ['test-cross dihybride, gènes indépendants', '4 phénotypes à 1/4'],
            ['test-cross dihybride, gènes liés', 'types parentaux majoritaires, recombinés minoritaires'],
          ],
        },
        {
          kind: 'callout',
          variant: 'methode',
          title: 'Interpréter un croisement',
          blocks: [
            {
              kind: 'list',
              items: [
                'repérer les phénotypes de la F1 pour savoir quel allèle domine ;',
                'écrire les génotypes des parents et leurs gamètes ;',
                'construire l’échiquier de croisement et comparer les proportions théoriques aux résultats.',
              ],
            },
          ],
        },
        {
          kind: 'trap',
          wrong: '« Un test-cross dihybride donne 4 phénotypes en proportions inégales : les gènes sont indépendants. »',
          why: 'Des proportions inégales, avec deux phénotypes parentaux majoritaires, signalent des gènes **liés** (sur le même chromosome).',
          reflex: 'Test-cross : 4 × 25 % → indépendants ; parentaux > 50 % → liés, les recombinés venant de crossing-over.',
        },
      ],
    },
  ],
  essentials: [
    'Méiose I sépare les homologues, méiose II les chromatides : $2n \\to n$.',
    'Brassage interchromosomique (anaphase I) et intrachromosomique (crossing-over, prophase I).',
    'Monohybridisme : F2 3/4–1/4 (dominance) ou 1/4–1/2–1/4 (codominance) ; test-cross 1/2–1/2.',
    'Dihybridisme : F2 9/3/3/1 et test-cross 4 × 1/4 si gènes indépendants ; parentaux majoritaires si liés.',
  ],
  simulationTasks: [
    "croise deux hybrides Aa et retrouve les proportions 3/4 – 1/4 ;",
    "passe en dihybridisme avec deux parents AaBb : retrouve 9/16, 3/16, 3/16, 1/16 ;",
    "simule 160 descendants et compare l’observé à l’attendu.",
  ],
  exercises: [
    {
      id: 'brass-mono',
      level: 1,
      title: 'Un croisement de monohybridisme',
      statement: 'On croise deux lignées pures de sorgho, à grains rouges et à grains blancs. La F1 a des grains rouges. La F2 compte 800 plants.',
      parts: [
        {
          label: 'Combien de plants à grains rouges attend-on en F2 ?',
          answer: { kind: 'number', value: 600, tolerance: 0, unit: '' },
          steps: ['Rouge est dominant (F1 rouge) ; F2 : 3/4 rouges, soit $800 \\times \\dfrac{3}{4} = 600$.'],
        },
        {
          label: 'Quelle proportion des plants rouges de F2 est de lignée pure (homozygote), en fraction décimale ?',
          answer: { kind: 'number', value: 0.3333, tolerance: 0.005, unit: '' },
          steps: ['Parmi les rouges (RR, Rr, Rr), un sur trois est RR : 1/3.'],
        },
      ],
    },
    {
      id: 'brass-di',
      level: 2,
      title: 'Un croisement de dihybridisme',
      statement: 'Deux gènes indépendants à dominance complète. La F2 compte 1 600 individus.',
      parts: [
        {
          label: 'Combien d’individus doublement récessifs attend-on ?',
          answer: { kind: 'number', value: 100, tolerance: 0, unit: '' },
          steps: ['$\\dfrac{1}{16} \\times 1\\,600 = 100$.'],
        },
        {
          label: 'Combien d’individus présentent les deux caractères dominants ?',
          answer: { kind: 'number', value: 900, tolerance: 0, unit: '' },
          steps: ['$\\dfrac{9}{16} \\times 1\\,600 = 900$.'],
        },
      ],
    },
    {
      id: 'brass-lies',
      level: 3,
      title: 'Gènes liés',
      statement: 'Un test-cross donne : 410 et 390 individus de types parentaux, 105 et 95 de types recombinés.',
      parts: [
        {
          label: 'Quel est le pourcentage de recombinés ?',
          answer: { kind: 'number', value: 20, tolerance: 0.1, unit: '%' },
          steps: ['$\\dfrac{105 + 95}{1\\,000} = 20$ %.'],
        },
        {
          label: 'Les gènes sont-ils « liés » ou « indépendants » ?',
          answer: { kind: 'text', display: 'liés', accepted: ['liés', 'lies', 'liés (même chromosome)', 'gènes liés', 'genes lies'] },
          steps: ['Les parentaux (80 %) dominent largement : les gènes sont sur le même chromosome ; les recombinés viennent de crossing-over.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'La méiose I sépare :',
      choices: ['les chromosomes homologues', 'les chromatides', 'les noyaux de la fécondation', 'les brins d’ADN'],
      answer: 0,
      explanation: 'C’est pourquoi elle est réductionnelle : $2n \\to n$.',
    },
    {
      question: 'Le crossing-over se produit :',
      choices: ['en prophase I', 'en anaphase II', 'pendant la fécondation', 'pendant la mitose'],
      answer: 0,
      explanation: 'Quand les homologues sont appariés.',
    },
    {
      question: 'Une F2 donnant 1/4, 1/2, 1/4 indique :',
      choices: ['une codominance', 'une dominance complète', 'deux gènes indépendants', 'des gènes liés'],
      answer: 0,
      explanation: 'L’hétérozygote a un phénotype propre.',
    },
    {
      question: 'Avec 3 paires de chromosomes, combien de combinaisons de chromosomes dans les gamètes ?',
      choices: ['8', '3', '6', '9'],
      answer: 0,
      explanation: '$2^3 = 8$.',
    },
  ],
  applications: [
    {
      title: 'Créer une variété de mil',
      tagline: 'Réunir deux qualités dans une même plante',
      situation:
        'À l’institut de recherche agronomique, on croise une variété de mil précoce (récolte rapide) mais peu productive avec une variété tardive très productive. Les deux caractères dépendent de deux gènes indépendants ; « précoce » et « productif » sont dominants.',
      model: 'Dihybridisme, gènes indépendants, dominance complète.',
      questions: ['Quelle proportion de la F2 sera à la fois précoce et productive ?', 'Pourquoi faut-il ensuite plusieurs générations de sélection ?'],
      check: { value: 0.5625, tolerance: 0.01, unit: '' },
      solution: [
        'Les deux caractères dominants : $\\dfrac{9}{16} = 0{,}5625$, soit environ 56 %.',
        'Parmi eux, seul 1 sur 9 est homozygote pour les deux gènes : il faut sélectionner et ressemer pour obtenir une lignée pure qui garde ses qualités.',
      ],
    },
  ],
};
