import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Un fer à repasser, une bouilloire et un réchaud électrique chauffent grâce à un fil métallique qui résiste au passage du courant : une **résistance**. Plus elle est grande, plus le courant a du mal à passer. Cette relation simple entre tension et intensité porte le nom d’Ohm.',
  objectives: [
    'tracer et exploiter la caractéristique d’un dipôle ;',
    'appliquer la loi d’Ohm U = R × I ;',
    'calculer la résistance équivalente d’une association série ou dérivation ;',
    'lire le code des couleurs d’une résistance.',
  ],
  sections: [
    {
      title: 'La loi d’Ohm',
      blocks: [
        {
          kind: 'formula',
          tex: 'U = R \\times I',
          legend: ['$U$ en V ; $R$ en ohms (Ω) ; $I$ en A'],
        },
        {
          kind: 'text',
          text: 'La **caractéristique** U = f(I) d’un conducteur ohmique est une droite qui passe par l’origine ; son coefficient directeur est R. Une lampe, elle, n’est pas un conducteur ohmique : sa résistance augmente quand son filament chauffe.',
        },
        {
          kind: 'example',
          title: 'un réchaud',
          text: 'Un réchaud branché sur 220 V est parcouru par 5 A.',
          steps: ['$R = \\dfrac{U}{I} = \\dfrac{220}{5} = 44$ Ω.'],
        },
      ],
    },
    {
      title: 'Associations de résistances',
      blocks: [
        {
          kind: 'formula',
          label: 'en série',
          tex: 'R_{\\text{éq}} = R_1 + R_2',
        },
        {
          kind: 'formula',
          label: 'en dérivation',
          tex: '\\dfrac{1}{R_{\\text{éq}}} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2} \\quad\\text{soit}\\quad R_{\\text{éq}} = \\dfrac{R_1 R_2}{R_1 + R_2}',
        },
        {
          kind: 'rule',
          text: 'En série, la résistance équivalente est **plus grande** que chacune ; en dérivation, elle est **plus petite** que la plus petite.',
        },
      ],
    },
  ],
  essentials: [
    'Loi d’Ohm : U = R × I ; la caractéristique est une droite passant par l’origine.',
    'Série : R = R₁ + R₂ ; dérivation : 1/R = 1/R₁ + 1/R₂.',
    'Une lampe n’est pas un conducteur ohmique.',
  ],
  simulationTasks: [
    'choisis « Résistances » et un seul dipôle : relève I pour U = 3, 6, 9 et 12 V ; vérifie que U / I est constant ;',
    'compare la résistance équivalente en série et en dérivation pour R₁ = 20 Ω et R₂ = 30 Ω.',
  ],
  exercises: [
    {
      id: 'dp-ohm',
      level: 1,
      title: 'Appliquer la loi d’Ohm',
      statement: 'Une résistance de 47 Ω est soumise à une tension de 9,4 V.',
      parts: [
        {
          label: 'Intensité du courant, en A.',
          answer: { kind: 'number', value: 0.2, tolerance: 0.002, unit: 'A' },
          steps: ['$I = \\dfrac{9{,}4}{47} = 0{,}20$ A.'],
        },
      ],
    },
    {
      id: 'dp-assoc',
      level: 2,
      title: 'Associer deux résistances',
      statement: 'R₁ = 20 Ω et R₂ = 30 Ω sont alimentées par un générateur de 12 V.',
      parts: [
        {
          label: 'Résistance équivalente en série, en Ω.',
          answer: { kind: 'number', value: 50, tolerance: 0.1, unit: 'Ω' },
          steps: ['$20 + 30 = 50$ Ω.'],
        },
        {
          label: 'Résistance équivalente en dérivation, en Ω.',
          answer: { kind: 'number', value: 12, tolerance: 0.05, unit: 'Ω' },
          steps: ['$\\dfrac{20 \\times 30}{20 + 30} = \\dfrac{600}{50} = 12$ Ω.'],
        },
        {
          label: 'Intensité débitée par le générateur dans le montage en dérivation, en A.',
          answer: { kind: 'number', value: 1, tolerance: 0.01, unit: 'A' },
          steps: ['$I = \\dfrac{12}{12} = 1$ A.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Si on double la tension aux bornes d’une résistance, l’intensité :',
      choices: ['double', 'est divisée par 2', 'ne change pas', 'est multipliée par 4'],
      answer: 0,
      explanation: 'I = U/R : proportionnalité.',
    },
    {
      question: 'Deux résistances de 10 Ω en dérivation équivalent à :',
      choices: ['5 Ω', '20 Ω', '10 Ω', '100 Ω'],
      answer: 0,
      explanation: '10 × 10 / 20 = 5 Ω.',
    },
    {
      question: 'La caractéristique d’un conducteur ohmique est :',
      choices: ['une droite passant par l’origine', 'une parabole', 'une droite horizontale', 'une courbe quelconque'],
      answer: 0,
      explanation: 'U est proportionnelle à I.',
    },
    {
      question: 'L’unité de la résistance est :',
      choices: ['l’ohm', 'le volt', 'l’ampère', 'le watt'],
      answer: 0,
      explanation: 'Symbole Ω.',
    },
  ],
  applications: [
    {
      title: 'Réparer le fer à repasser',
      tagline: 'Choisir la bonne résistance',
      situation:
        'La résistance chauffante du fer à repasser de la couturière a grillé. L’étiquette indique 220 V – 4,4 A. L’électricien a des résistances de 22 Ω, 50 Ω et 100 Ω.',
      model: 'R = U / I.',
      questions: ['Quelle résistance faut-il pour retrouver le fonctionnement normal ?', 'Comment l’obtenir avec les résistances disponibles ?'],
      check: { value: 50, tolerance: 0.01, unit: 'Ω' },
      solution: ['$R = \\dfrac{220}{4{,}4} = 50$ Ω.', 'La résistance de 50 Ω convient directement ; on pourrait aussi mettre deux résistances de 100 Ω en dérivation.'],
      fact: 'Georg Ohm a publié sa loi en 1827 ; on se moquait alors de lui.',
    },
  ],
};
