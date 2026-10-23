import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Grâce aux campagnes de vaccination, la variole a disparu de la planète et la poliomyélite a presque disparu d’Afrique. Quand un serpent mord un cultivateur, au contraire, on n’a pas le temps d’attendre une réponse immunitaire : on injecte un **sérum**. Deux façons d’aider l’organisme : la **vaccination** prépare l’avenir, la **sérothérapie** soigne l’urgence.',
  objectives: [
    'expliquer le principe de la vaccination à partir de la mémoire immunitaire ;',
    'expliquer le principe de la sérothérapie ;',
    'comparer vaccination et sérothérapie ;',
    'expliquer l’immunité collective.',
  ],
  sections: [
    {
      title: 'La vaccination',
      blocks: [
        {
          kind: 'definition',
          term: 'Vaccin',
          text: 'préparation qui contient un antigène rendu inoffensif : microbe atténué ou tué, fragment de microbe, ou toxine inactivée (**anatoxine**). Elle déclenche une réponse immunitaire **primaire** sans provoquer la maladie.',
        },
        {
          kind: 'rule',
          text: 'Le vaccin produit des lymphocytes **mémoire**. Au contact du vrai microbe, la réponse secondaire est rapide et forte : la maladie ne se déclare pas. Des **rappels** entretiennent cette mémoire.',
        },
        {
          kind: 'text',
          text: 'Le Programme élargi de vaccination (PEV) protège gratuitement les enfants maliens contre la tuberculose, la poliomyélite, la diphtérie, le tétanos, la coqueluche, la rougeole, la fièvre jaune, la méningite et d’autres maladies.',
        },
      ],
    },
    {
      title: 'La sérothérapie',
      blocks: [
        {
          kind: 'definition',
          term: 'Sérothérapie',
          text: 'injection d’un sérum contenant des **anticorps** déjà fabriqués (souvent par un cheval immunisé) contre un antigène précis : venin de serpent, toxine tétanique, rage.',
        },
        {
          kind: 'table',
          head: ['', 'Vaccination', 'Sérothérapie'],
          rows: [
            ['ce qu’on injecte', 'un antigène inoffensif', 'des anticorps'],
            ['immunité', 'active : l’organisme produit lui-même ses défenses', 'passive : les défenses sont apportées'],
            ['délai d’action', 'quelques jours à semaines', 'immédiat'],
            ['durée', 'longue (mémoire, rappels)', 'courte (quelques semaines)'],
            ['usage', 'prévention', 'traitement d’urgence'],
          ],
        },
        {
          kind: 'trap',
          wrong: '« Après une morsure de serpent, il faut vite se faire vacciner. »',
          why: 'Le vaccin mettrait des jours à agir ; le venin agit en quelques heures.',
          reflex: 'Urgence → sérum (anticorps tout prêts) ; prévention → vaccin.',
        },
      ],
    },
    {
      title: 'L’immunité collective',
      blocks: [
        {
          kind: 'text',
          text: 'Quand une grande partie de la population est vaccinée, le microbe ne trouve plus assez de personnes sensibles pour circuler : même les non-vaccinés (nouveau-nés, malades) sont protégés.',
        },
        {
          kind: 'formula',
          label: 'Proportion de vaccinés nécessaire',
          tex: 'p_c = 1 - \\dfrac{1}{R_0}',
          legend: ['$R_0$ : nombre moyen de personnes contaminées par un malade dans une population sans immunité'],
        },
        {
          kind: 'example',
          title: 'la rougeole',
          text: 'La rougeole est très contagieuse : $R_0 \\approx 15$.',
          steps: ['$p_c = 1 - \\dfrac{1}{15} \\approx 0{,}93$ : il faut vacciner environ 93 % des enfants, avec deux doses.'],
        },
      ],
    },
  ],
  essentials: [
    'Vaccin : antigène inoffensif → réponse primaire → cellules mémoire ; rappels.',
    'Sérothérapie : anticorps injectés ; action immédiate et brève.',
    'Vaccination = immunité active et préventive ; sérothérapie = immunité passive et curative.',
    'Immunité collective : vacciner au moins $1 - \\frac{1}{R_0}$ de la population.',
  ],
  exercises: [
    {
      id: 'aides-collective',
      level: 1,
      title: 'Le seuil d’immunité collective',
      statement: 'On utilise $p_c = 1 - \\dfrac{1}{R_0}$.',
      parts: [
        {
          label: 'Rougeole, $R_0 = 15$ : proportion à vacciner, en %.',
          answer: { kind: 'number', value: 93.3, tolerance: 0.2, unit: '%' },
          steps: ['$1 - \\dfrac{1}{15} \\approx 0{,}933$.'],
        },
        {
          label: 'Une maladie avec $R_0 = 5$ : proportion à vacciner, en %.',
          answer: { kind: 'number', value: 80, tolerance: 0.1, unit: '%' },
          steps: ['$1 - \\dfrac{1}{5} = 0{,}80$.'],
        },
      ],
    },
    {
      id: 'aides-choix',
      level: 2,
      title: 'Vaccin ou sérum ?',
      statement: 'Réponds « vaccin » ou « sérum ».',
      parts: [
        {
          label: 'Un cultivateur vient d’être mordu par une vipère.',
          answer: { kind: 'text', display: 'sérum', accepted: ['serum', 'sérum', 'le sérum', 'sérum antivenimeux', 'serum antivenimeux'] },
          steps: ['Il faut des anticorps immédiatement : sérum antivenimeux.'],
        },
        {
          label: 'Protéger un nourrisson contre la rougeole.',
          answer: { kind: 'text', display: 'vaccin', accepted: ['vaccin', 'le vaccin', 'vaccination'] },
          steps: ['Prévention durable : vaccin.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Un vaccin contient :',
      choices: ['un antigène rendu inoffensif', 'des anticorps', 'des antibiotiques', 'des globules blancs'],
      answer: 0,
      explanation: 'L’organisme fabrique lui-même ses défenses et sa mémoire.',
    },
    {
      question: 'La sérothérapie apporte une immunité :',
      choices: ['passive et immédiate', 'active et durable', 'définitive', 'contre toutes les maladies'],
      answer: 0,
      explanation: 'Les anticorps injectés sont éliminés en quelques semaines.',
    },
    {
      question: 'Pourquoi fait-on des rappels de vaccin ?',
      choices: ['pour entretenir et renforcer la mémoire immunitaire', 'parce que le vaccin est un sérum', 'pour soigner la maladie déclarée', 'pour éliminer les anticorps'],
      answer: 0,
      explanation: 'Chaque rappel déclenche une réponse secondaire et augmente les cellules mémoire.',
    },
    {
      question: 'Une anatoxine est :',
      choices: ['une toxine rendue inoffensive mais encore reconnue', 'un anticorps', 'un antibiotique', 'un virus vivant'],
      answer: 0,
      explanation: 'C’est le principe des vaccins contre le tétanos et la diphtérie.',
    },
  ],
  applications: [
    {
      title: 'La campagne de vaccination du quartier',
      tagline: 'Pourquoi vacciner presque tout le monde ?',
      situation:
        'L’agent de santé explique aux parents qu’il faut vacciner au moins 95 % des enfants du quartier contre la rougeole pour empêcher une épidémie. Le quartier compte 2 000 enfants de moins de 5 ans.',
      model: 'Immunité collective ; on vise un peu plus que le seuil théorique, car un vaccin n’est pas efficace à 100 %.',
      questions: ['Combien d’enfants au moins faut-il vacciner ?'],
      check: { value: 1900, tolerance: 0, unit: 'enfants' },
      solution: ['$2\\,000 \\times 0{,}95 = 1\\,900$ enfants.', 'Les quelques enfants qui ne peuvent pas être vaccinés (trop jeunes, malades) sont alors protégés par les autres.'],
      fact: 'La variole, maladie mortelle, a été éradiquée en 1980 grâce à une campagne mondiale de vaccination.',
    },
  ],
};
