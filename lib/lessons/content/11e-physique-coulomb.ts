import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'En saison d’harmattan, l’air sec fait crépiter les vêtements synthétiques et l’on reçoit de petites décharges en touchant une poignée métallique. Un peigne frotté attire des morceaux de papier. Ces phénomènes révèlent des **charges électriques** et une force entre elles, décrite en 1785 par Coulomb : elle tient ensemble les électrons et le noyau de chaque atome.',
  objectives: [
    'décrire l’électrisation par frottement, contact et influence ;',
    'utiliser la charge élémentaire et la conservation de la charge ;',
    'calculer une force électrique avec la loi de Coulomb ;',
    'comparer la force électrique et la force de gravitation.',
  ],
  sections: [
    {
      title: 'Les charges électriques',
      blocks: [
        {
          kind: 'list',
          items: [
            'il existe deux sortes de charges : **positives** et **négatives** ; deux charges de même signe se repoussent, de signes contraires s’attirent ;',
            'un corps s’électrise en gagnant des électrons (il devient négatif) ou en en perdant (il devient positif), par **frottement**, par **contact** ou par **influence** ;',
            'la charge totale d’un système isolé se **conserve**.',
          ],
        },
        {
          kind: 'formula',
          tex: 'q = n\\,e \\qquad e = 1{,}6 \\times 10^{-19}\\ \\text{C}',
          legend: ['toute charge est un multiple de la charge élémentaire $e$ ; $q$ en coulombs (C)'],
        },
      ],
    },
    {
      title: 'La loi de Coulomb',
      blocks: [
        {
          kind: 'formula',
          tex: 'F = k\\,\\dfrac{|q_1\\,q_2|}{d^2} \\qquad k = 9{,}0 \\times 10^9\\ \\text{N}\\cdot\\text{m}^2/\\text{C}^2',
          legend: ['$d$ : distance entre les deux charges ponctuelles (m) ; les deux forces sont opposées et portées par la droite qui joint les charges'],
        },
        {
          kind: 'example',
          title: 'deux charges',
          text: '$q_1 = 2{,}0$ µC et $q_2 = -3{,}0$ µC, distantes de 30 cm.',
          steps: ['$F = 9 \\times 10^9 \\times \\dfrac{2 \\times 10^{-6} \\times 3 \\times 10^{-6}}{0{,}30^2} = 0{,}60$ N.', 'Les charges sont de signes contraires : la force est attractive.'],
        },
        {
          kind: 'trap',
          wrong: '« Si la distance double, la force est divisée par deux. »',
          why: 'La force varie comme l’inverse du **carré** de la distance.',
          reflex: 'Distance × 2 → force ÷ 4 ; distance × 3 → force ÷ 9.',
        },
      ],
    },
    {
      title: 'Électrique ou gravitationnelle ?',
      blocks: [
        {
          kind: 'text',
          text: 'La loi de Coulomb ressemble à celle de la gravitation, $F = G\\dfrac{m_1m_2}{d^2}$. Mais entre un proton et un électron, la force électrique est environ $10^{39}$ fois plus grande que la force de gravitation : à l’échelle des atomes, la gravitation est négligeable.',
        },
        {
          kind: 'callout',
          variant: 'remarque',
          blocks: [
            {
              kind: 'text',
              text: 'À grande échelle, les objets sont presque toujours neutres : les forces électriques se compensent et c’est la gravitation qui domine (chute des corps, mouvement des planètes).',
            },
          ],
        },
      ],
    },
  ],
  essentials: [
    'Charges de même signe : répulsion ; de signes contraires : attraction ; conservation de la charge.',
    '$q = ne$ avec $e = 1{,}6 \\times 10^{-19}$ C.',
    'Loi de Coulomb : $F = k\\frac{|q_1q_2|}{d^2}$, $k = 9 \\times 10^9$ SI ; en $1/d^2$.',
    'À l’échelle atomique, la force électrique domine largement la gravitation.',
  ],
  exercises: [
    {
      id: 'coul-force',
      level: 1,
      title: 'Calculer une force',
      statement: '$q_1 = 2{,}0$ µC et $q_2 = -3{,}0$ µC sont à 30 cm l’une de l’autre.',
      parts: [
        {
          label: 'Valeur de la force (en N).',
          answer: { kind: 'number', value: 0.6, tolerance: 0.005, unit: 'N' },
          steps: ['$F = 9 \\times 10^9 \\times \\dfrac{6 \\times 10^{-12}}{0{,}09} = 0{,}60$ N.'],
        },
        {
          label: 'Valeur de la force si la distance passe à 60 cm (en N).',
          answer: { kind: 'number', value: 0.15, tolerance: 0.002, unit: 'N' },
          steps: ['Distance doublée : force divisée par 4.'],
        },
        {
          label: 'Combien d’électrons en excès porte $q_2$ ? (notation 1.875e13 acceptée)',
          answer: { kind: 'number', value: 1.875e13, tolerance: 0.01e13, unit: '' },
          steps: ['$n = \\dfrac{3{,}0 \\times 10^{-6}}{1{,}6 \\times 10^{-19}} \\approx 1{,}9 \\times 10^{13}$ électrons.'],
        },
      ],
    },
    {
      id: 'coul-atome',
      level: 2,
      title: 'Dans l’atome d’hydrogène',
      statement: 'Le proton et l’électron de l’atome d’hydrogène sont à $5{,}3 \\times 10^{-11}$ m l’un de l’autre.',
      parts: [
        {
          label: 'Force électrique entre eux (en N, notation 8.2e-8 acceptée).',
          answer: { kind: 'number', value: 8.2e-8, tolerance: 0.1e-8, unit: 'N' },
          steps: ['$F = 9 \\times 10^9 \\times \\dfrac{(1{,}6 \\times 10^{-19})^2}{(5{,}3 \\times 10^{-11})^2} \\approx 8{,}2 \\times 10^{-8}$ N.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Un corps qui a perdu des électrons est chargé :',
      choices: ['positivement', 'négativement', 'neutre', 'il n’est pas chargé'],
      answer: 0,
      explanation: 'Il lui manque des charges négatives.',
    },
    {
      question: 'Si l’une des deux charges double, la force de Coulomb :',
      choices: ['double', 'est divisée par 2', 'est multipliée par 4', 'ne change pas'],
      answer: 0,
      explanation: '$F$ est proportionnelle à $|q_1q_2|$.',
    },
    {
      question: 'Si la distance est divisée par 2, la force :',
      choices: ['est multipliée par 4', 'double', 'est divisée par 4', 'ne change pas'],
      answer: 0,
      explanation: 'Elle varie en $1/d^2$.',
    },
    {
      question: 'La charge élémentaire vaut :',
      choices: ['$1{,}6 \\times 10^{-19}$ C', '$9 \\times 10^9$ C', '1 C', '$6{,}02 \\times 10^{23}$ C'],
      answer: 0,
      explanation: 'C’est la charge (en valeur absolue) d’un électron ou d’un proton.',
    },
  ],
  applications: [
    {
      title: 'Les décharges de l’harmattan',
      tagline: 'Pourquoi reçoit-on des « chocs » en saison sèche ?',
      situation:
        'En marchant sur un tapis par temps d’harmattan, un élève accumule une charge de −0,10 µC. En touchant la poignée métallique de la porte, il reçoit une petite décharge.',
      model: 'L’air sec conduit mal : la charge ne s’écoule pas et s’accumule sur le corps.',
      questions: ['Combien d’électrons en excès l’élève porte-t-il ?'],
      check: { value: 6.25e11, tolerance: 0.02, unit: 'électrons' },
      solution: ['$n = \\dfrac{0{,}10 \\times 10^{-6}}{1{,}6 \\times 10^{-19}} = 6{,}25 \\times 10^{11}$ électrons.', 'Ces électrons passent d’un coup dans le métal, ce qui produit une étincelle.'],
      fact: 'Pendant la saison des pluies, l’air humide évacue les charges : les décharges sont beaucoup plus rares.',
    },
  ],
};
