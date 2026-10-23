import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'L’éclair du flash d’un appareil photo dure un millième de seconde et pourtant les piles sont faibles. Le secret : un **condensateur** qui se charge lentement, puis libère toute son énergie d’un coup. On en trouve dans tous les appareils électroniques : téléphones, chargeurs, ventilateurs, postes radio.',
  objectives: [
    'décrire un condensateur et définir sa capacité ;',
    'utiliser la relation $q = CU$ ;',
    'calculer la capacité équivalente d’associations en série et en parallèle ;',
    'calculer l’énergie stockée et la constante de temps d’un circuit RC.',
  ],
  sections: [
    {
      title: 'Charge et capacité',
      blocks: [
        {
          kind: 'definition',
          term: 'Condensateur',
          text: 'deux conducteurs, les **armatures**, séparés par un isolant (le diélectrique). Branché à un générateur, il se charge : une armature porte $+q$, l’autre $-q$.',
        },
        {
          kind: 'formula',
          tex: 'q = C\\,U',
          legend: ['$q$ : charge de l’armature positive (C) ; $U$ : tension (V) ; $C$ : capacité en farads (F)', 'on utilise souvent le µF ($10^{-6}$ F) et le nF ($10^{-9}$ F)'],
        },
        {
          kind: 'formula',
          label: 'Condensateur plan',
          tex: 'C = \\dfrac{\\varepsilon_0\\,\\varepsilon_r\\,S}{e} \\qquad \\varepsilon_0 = 8{,}85 \\times 10^{-12}\\ \\text{F/m}',
          legend: ['$S$ : surface des armatures en regard (m²) ; $e$ : épaisseur de l’isolant (m) ; $\\varepsilon_r$ : permittivité relative de l’isolant'],
        },
      ],
    },
    {
      title: 'Associations',
      blocks: [
        {
          kind: 'formula',
          tex: '\\text{en parallèle : } C = C_1 + C_2 \\qquad \\text{en série : } \\dfrac{1}{C} = \\dfrac{1}{C_1} + \\dfrac{1}{C_2}',
        },
        {
          kind: 'trap',
          wrong: '« En série, les capacités s’additionnent, comme les résistances. »',
          why: 'C’est l’inverse des résistances : en série, la capacité équivalente est plus **petite** que chacune.',
          reflex: 'Parallèle : on additionne $C$ ; série : on additionne $\\frac{1}{C}$.',
        },
      ],
    },
    {
      title: 'Énergie et constante de temps',
      blocks: [
        {
          kind: 'formula',
          tex: 'E = \\dfrac{1}{2}\\,C\\,U^2 \\qquad \\tau = R\\,C',
          legend: ['$E$ en joules ; $\\tau$ : constante de temps (s) du circuit RC'],
        },
        {
          kind: 'text',
          text: 'À travers une résistance $R$, un condensateur ne se charge pas instantanément. Au bout de $\\tau$, il atteint environ 63 % de la tension finale ; on considère la charge terminée après $5\\tau$. La décharge suit le même rythme.',
        },
      ],
    },
  ],
  essentials: [
    '$q = CU$ ; capacité en farads.',
    'Condensateur plan : $C = \\frac{\\varepsilon_0\\varepsilon_rS}{e}$.',
    'Parallèle : $C = C_1 + C_2$ ; série : $\\frac{1}{C} = \\frac{1}{C_1} + \\frac{1}{C_2}$.',
    '$E = \\frac{1}{2}CU^2$ ; $\\tau = RC$, charge pratiquement complète après $5\\tau$.',
  ],
  exercises: [
    {
      id: 'cond-charge',
      level: 1,
      title: 'Un condensateur chargé',
      statement: 'Un condensateur de 470 µF est chargé sous 12 V.',
      parts: [
        {
          label: 'Charge de l’armature positive (en C).',
          answer: { kind: 'number', value: 0.00564, tolerance: 0.00002, unit: 'C' },
          steps: ['$q = 470 \\times 10^{-6} \\times 12 = 5{,}64 \\times 10^{-3}$ C.'],
        },
        {
          label: 'Énergie stockée (en J).',
          answer: { kind: 'number', value: 0.03384, tolerance: 0.0002, unit: 'J' },
          steps: ['$E = \\dfrac{1}{2} \\times 470 \\times 10^{-6} \\times 12^2 \\approx 3{,}4 \\times 10^{-2}$ J.'],
        },
      ],
    },
    {
      id: 'cond-assoc',
      level: 2,
      title: 'Associations',
      statement: 'On dispose de deux condensateurs de 2,0 µF et 3,0 µF.',
      parts: [
        {
          label: 'Capacité équivalente en parallèle (en µF).',
          answer: { kind: 'number', value: 5, tolerance: 0.01, unit: 'µF' },
          steps: ['$2{,}0 + 3{,}0 = 5{,}0$ µF.'],
        },
        {
          label: 'Capacité équivalente en série (en µF).',
          answer: { kind: 'number', value: 1.2, tolerance: 0.01, unit: 'µF' },
          steps: ['$\\dfrac{1}{C} = \\dfrac{1}{2} + \\dfrac{1}{3} = \\dfrac{5}{6}$, donc $C = 1{,}2$ µF.'],
        },
      ],
    },
    {
      id: 'cond-rc',
      level: 3,
      title: 'Constante de temps',
      statement: 'Le condensateur de 470 µF se charge à travers une résistance de 10 kΩ.',
      parts: [
        {
          label: 'Constante de temps (en s).',
          answer: { kind: 'number', value: 4.7, tolerance: 0.01, unit: 's' },
          steps: ['$\\tau = 10 \\times 10^3 \\times 470 \\times 10^{-6} = 4{,}7$ s.'],
        },
        {
          label: 'Durée approximative de la charge complète (en s).',
          answer: { kind: 'number', value: 23.5, tolerance: 0.1, unit: 's' },
          steps: ['$5\\tau = 23{,}5$ s.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'L’unité de capacité est :',
      choices: ['le farad', 'le coulomb', 'le volt', 'l’ohm'],
      answer: 0,
      explanation: '$C = \\frac{q}{U}$ en C/V = F.',
    },
    {
      question: 'Si la tension double, l’énergie stockée :',
      choices: ['est multipliée par 4', 'double', 'est divisée par 2', 'ne change pas'],
      answer: 0,
      explanation: '$E = \\frac{1}{2}CU^2$.',
    },
    {
      question: 'Deux condensateurs identiques de capacité $C$ en série ont une capacité équivalente de :',
      choices: ['$\\dfrac{C}{2}$', '$2C$', '$C$', '$C^2$'],
      answer: 0,
      explanation: '$\\frac{1}{C_{eq}} = \\frac{2}{C}$.',
    },
    {
      question: 'Au bout d’une constante de temps, un condensateur est chargé à environ :',
      choices: ['63 %', '100 %', '50 %', '10 %'],
      answer: 0,
      explanation: '$1 - e^{-1} \\approx 0{,}63$.',
    },
  ],
  applications: [
    {
      title: 'Le flash de l’appareil photo',
      tagline: 'Comment de petites piles produisent un éclair puissant',
      situation:
        'Le condensateur d’un flash a une capacité de 100 µF. Un petit circuit le charge sous 300 V en quelques secondes ; il se décharge ensuite dans la lampe en 1 ms.',
      model: 'Toute l’énergie stockée est libérée pendant l’éclair.',
      questions: ['Quelle énergie le condensateur stocke-t-il, en J ?', 'Quelle puissance moyenne l’éclair atteint-il ?'],
      check: { value: 4.5, tolerance: 0.02, unit: 'J' },
      solution: ['$E = \\dfrac{1}{2} \\times 100 \\times 10^{-6} \\times 300^2 = 4{,}5$ J.', '$P = \\dfrac{4{,}5}{10^{-3}} = 4\\,500$ W : bien plus que ce que les piles pourraient fournir directement.'],
      fact: 'Les défibrillateurs cardiaques utilisent le même principe, avec des centaines de joules.',
    },
  ],
};
