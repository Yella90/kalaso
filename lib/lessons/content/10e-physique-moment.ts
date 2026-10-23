import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Pour soulever une grosse pierre, le maçon glisse une barre de fer dessous et appuie à l’autre bout : un enfant peut ainsi soulever ce qu’un adulte ne bougerait pas à mains nues. Le secret n’est pas la force, mais la **distance** à laquelle on l’applique.',
  objectives: [
    'définir le moment d’une force par rapport à un axe ;',
    'calculer un bras de levier ;',
    'appliquer le théorème des moments à un solide en équilibre ;',
    'expliquer le fonctionnement des leviers et des balances.',
  ],
  sections: [
    {
      title: 'Le moment d’une force',
      blocks: [
        {
          kind: 'formula',
          tex: '\\mathcal M_\\Delta(\\vec F) = \\pm\\, F \\times d',
          legend: ['$F$ en N ; $d$ : bras de levier, distance de l’axe à la droite d’action de la force, en m ; moment en N·m'],
        },
        {
          kind: 'text',
          text: 'Le moment mesure l’effet de rotation d’une force. On le compte positif dans un sens de rotation choisi, négatif dans l’autre. Une force dont la droite d’action passe par l’axe a un moment nul.',
        },
        {
          kind: 'example',
          title: 'la porte',
          text: 'On pousse une porte avec 20 N, perpendiculairement, à 0,8 m des gonds.',
          steps: ['$\\mathcal M = 20 \\times 0{,}8 = 16$ N·m. Pousser près des gonds demande beaucoup plus de force pour le même effet.'],
        },
      ],
    },
    {
      title: 'Le théorème des moments',
      blocks: [
        {
          kind: 'rule',
          text: 'Un solide mobile autour d’un axe fixe est en équilibre si la **somme algébrique des moments** des forces par rapport à cet axe est nulle : $\\sum \\mathcal M_\\Delta = 0$.',
        },
        {
          kind: 'example',
          title: 'le levier du maçon',
          text: 'La pierre exerce 600 N à 0,2 m de l’appui ; le maçon appuie à 1,2 m de l’appui.',
          steps: ['$600 \\times 0{,}2 = F \\times 1{,}2$', '$F = \\dfrac{120}{1{,}2} = 100$ N : six fois moins que le poids de la pierre.'],
        },
        {
          kind: 'text',
          text: 'Leviers de tous les jours : brouette, pince, ciseaux, décapsuleur, balance romaine, avant-bras.',
        },
      ],
    },
  ],
  essentials: [
    'Moment = force × bras de levier (N·m), signé selon le sens de rotation.',
    'Le bras de levier est la distance de l’axe à la droite d’action.',
    'Équilibre d’un solide mobile autour d’un axe : Σ moments = 0.',
  ],
  exercises: [
    {
      id: 'mo-cle',
      level: 1,
      title: 'Dévisser un écrou',
      statement: 'Un mécanicien exerce 50 N perpendiculairement au bout d’une clé de 30 cm.',
      parts: [
        {
          label: 'Moment de la force, en N·m.',
          answer: { kind: 'number', value: 15, tolerance: 0.1, unit: 'N·m' },
          steps: ['$50 \\times 0{,}30 = 15$ N·m.'],
        },
        {
          label: 'Force à exercer avec une clé de 60 cm pour le même moment, en N.',
          answer: { kind: 'number', value: 25, tolerance: 0.1, unit: 'N' },
          steps: ['$\\dfrac{15}{0{,}60} = 25$ N.'],
        },
      ],
    },
    {
      id: 'mo-balancoire',
      level: 2,
      title: 'La balançoire à bascule',
      statement: 'Awa (30 kg) est assise à 2 m de l’axe d’une bascule. Son frère Issa pèse 40 kg.',
      parts: [
        {
          label: 'À quelle distance de l’axe Issa doit-il s’asseoir pour équilibrer la bascule (en m) ?',
          answer: { kind: 'number', value: 1.5, tolerance: 0.01, unit: 'm' },
          steps: ['$30\\,g \\times 2 = 40\\,g \\times d$', '$d = \\dfrac{60}{40} = 1{,}5$ m.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Le moment d’une force dont la droite d’action passe par l’axe est :',
      choices: ['nul', 'maximal', 'négatif', 'égal à la force'],
      answer: 0,
      explanation: 'Le bras de levier est nul.',
    },
    {
      question: 'L’unité du moment d’une force est :',
      choices: ['le N·m', 'le N', 'le J/s', 'le kg·m'],
      answer: 0,
      explanation: 'Newton multiplié par mètre.',
    },
    {
      question: 'Pour ouvrir une porte avec le moins d’effort, on pousse :',
      choices: ['loin des gonds', 'près des gonds', 'sur les gonds', 'n’importe où'],
      answer: 0,
      explanation: 'Plus le bras de levier est grand, plus la force nécessaire est petite.',
    },
    {
      question: 'Une brouette permet de soulever une lourde charge parce que :',
      choices: ['les poignées sont loin de l’axe de la roue', 'la roue est légère', 'la charge diminue', 'le moment est nul'],
      answer: 0,
      explanation: 'Grand bras de levier pour les mains, petit pour la charge.',
    },
  ],
  applications: [
    {
      title: 'La balance romaine du boucher',
      tagline: 'Peser avec un seul poids',
      situation:
        'Au marché de Niono, le boucher accroche la viande à 5 cm de l’axe d’une balance romaine. Un poids curseur de 0,5 kg glisse sur le fléau ; l’équilibre est atteint quand il est à 36 cm de l’axe.',
      model: 'Théorème des moments : m × 5 = 0,5 × 36 (le poids du fléau est équilibré par construction).',
      questions: ['Quelle est la masse de la viande, en kg ?', 'Où place-t-on le curseur pour 2 kg de viande ?'],
      check: { value: 3.6, tolerance: 0.02, unit: 'kg' },
      solution: ['$m = \\dfrac{0{,}5 \\times 36}{5} = 3{,}6$ kg.', 'Pour 2 kg : $d = \\dfrac{2 \\times 5}{0{,}5} = 20$ cm.'],
      fact: 'La balance romaine existe depuis plus de 2 000 ans : un seul poids suffit pour peser des masses très différentes.',
    },
  ],
};
