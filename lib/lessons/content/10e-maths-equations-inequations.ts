import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Au marché, 3 kg de riz et 2 kg de sucre coûtent 2 900 FCFA ; 1 kg de riz et 4 kg de sucre coûtent 2 300 FCFA. Quel est le prix de chacun ? Mettre un problème en **équations** et les résoudre, c’est l’outil de base des mathématiques appliquées.',
  objectives: [
    'résoudre une équation du second degré avec le discriminant ;',
    'étudier le signe d’un trinôme et résoudre une inéquation ;',
    'résoudre un système de deux équations à deux inconnues ;',
    'résoudre un système de trois équations par la méthode du pivot de Gauss.',
  ],
  sections: [
    {
      title: 'Équations du second degré',
      blocks: [
        {
          kind: 'formula',
          tex: 'ax^2 + bx + c = 0 \\qquad \\Delta = b^2 - 4ac',
        },
        {
          kind: 'table',
          head: ['$\\Delta$', 'Solutions'],
          rows: [
            ['$\\Delta > 0$', 'deux : $x_{1,2} = \\dfrac{-b \\pm \\sqrt\\Delta}{2a}$'],
            ['$\\Delta = 0$', 'une : $x_0 = -\\dfrac{b}{2a}$'],
            ['$\\Delta < 0$', 'aucune solution réelle'],
          ],
        },
        {
          kind: 'rule',
          text: 'Un trinôme est du **signe de a** à l’extérieur des racines et du signe contraire entre les racines (quand il y en a deux).',
        },
        {
          kind: 'example',
          title: 'une inéquation',
          text: 'Résoudre $x^2 - x - 6 < 0$.',
          steps: ['$\\Delta = 1 + 24 = 25$ ; racines $-2$ et $3$.', '$a = 1 > 0$ : le trinôme est négatif entre les racines. $S = ]-2\\,;\\,3[$.'],
        },
      ],
    },
    {
      title: 'Systèmes linéaires',
      blocks: [
        {
          kind: 'text',
          text: 'Pour un système 2 × 2, on utilise la **substitution** ou les **combinaisons** (multiplier une équation pour éliminer une inconnue). Pour un système 3 × 3, le **pivot de Gauss** élimine une inconnue après l’autre pour obtenir un système triangulaire.',
        },
        {
          kind: 'example',
          title: 'le riz et le sucre',
          text: '$\\begin{cases} 3r + 2s = 2\\,900 \\\\ r + 4s = 2\\,300 \\end{cases}$',
          steps: [
            'On multiplie la 2e équation par 3 : $3r + 12s = 6\\,900$.',
            'On soustrait la 1re : $10s = 4\\,000$, donc $s = 400$ FCFA.',
            '$r = 2\\,300 - 1\\,600 = 700$ FCFA.',
          ],
        },
      ],
    },
  ],
  essentials: [
    'Δ = b² − 4ac : deux, une ou aucune solution selon son signe.',
    'Trinôme du signe de a à l’extérieur des racines.',
    'Systèmes : substitution, combinaison, pivot de Gauss.',
    'Toujours vérifier la solution dans les équations de départ.',
  ],
  exercises: [
    {
      id: 'ei-second',
      level: 1,
      title: 'Résoudre une équation',
      statement: 'Résoudre $2x^2 - 3x - 2 = 0$.',
      parts: [
        {
          label: 'Discriminant $\\Delta$.',
          answer: { kind: 'number', value: 25, tolerance: 0, unit: '' },
          steps: ['$\\Delta = 9 + 16 = 25$.'],
        },
        {
          label: 'La plus grande solution.',
          answer: { kind: 'number', value: 2, tolerance: 0, unit: '' },
          steps: ['$x = \\dfrac{3 + 5}{4} = 2$ ; l’autre vaut $\\dfrac{3 - 5}{4} = -0{,}5$.'],
        },
      ],
    },
    {
      id: 'ei-gauss',
      level: 3,
      title: 'Le pivot de Gauss',
      statement: '$\\begin{cases} x + y + z = 6 \\\\ 2x - y + z = 3 \\\\ x + 2y - z = 2 \\end{cases}$',
      parts: [
        {
          label: 'Valeur de z.',
          answer: { kind: 'number', value: 3, tolerance: 0, unit: '' },
          steps: [
            '$L_2 - 2L_1$ : $-3y - z = -9$ ; $L_3 - L_1$ : $y - 2z = -4$.',
            'De la 3e : $y = 2z - 4$ ; dans la 2e : $-6z + 12 - z = -9$, donc $z = 3$.',
          ],
        },
        {
          label: 'Valeur de x.',
          answer: { kind: 'number', value: 1, tolerance: 0, unit: '' },
          steps: ['$y = 2$, puis $x = 6 - 2 - 3 = 1$.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Si $\\Delta < 0$, l’équation $ax^2 + bx + c = 0$ a :',
      choices: ['aucune solution réelle', 'une solution', 'deux solutions', 'une infinité de solutions'],
      answer: 0,
      explanation: 'On ne peut pas prendre la racine d’un négatif.',
    },
    {
      question: 'Les solutions de $x^2 = 9$ sont :',
      choices: ['−3 et 3', '3 seulement', '9', '81'],
      answer: 0,
      explanation: 'Ne pas oublier la solution négative.',
    },
    {
      question: '$x^2 + 1 > 0$ est vraie pour :',
      choices: ['tout réel x', 'aucun x', 'x > 0 seulement', 'x = 1'],
      answer: 0,
      explanation: 'Un carré plus 1 est toujours positif.',
    },
    {
      question: 'La méthode du pivot de Gauss sert à :',
      choices: ['résoudre des systèmes linéaires', 'calculer un discriminant', 'tracer une parabole', 'calculer une moyenne'],
      answer: 0,
      explanation: 'On élimine les inconnues une à une.',
    },
  ],
  applications: [
    {
      title: 'Le terrain de la coopérative',
      tagline: 'Trouver les dimensions',
      situation:
        'Une coopérative de femmes reçoit un terrain rectangulaire de 1 200 m². Sa longueur dépasse sa largeur de 10 m.',
      model: 'Si x est la largeur : x(x + 10) = 1 200, soit x² + 10x − 1 200 = 0.',
      questions: ['Quelle est la largeur du terrain, en m ?', 'Pourquoi rejette-t-on l’autre solution ?'],
      check: { value: 30, tolerance: 0.01, unit: 'm' },
      solution: ['$\\Delta = 100 + 4\\,800 = 4\\,900$ ; $x = \\dfrac{-10 + 70}{2} = 30$ m (longueur 40 m).', 'L’autre solution vaut −40 : une longueur ne peut pas être négative.'],
      fact: 'Les Babyloniens résolvaient déjà ce genre de problème de champs il y a 4 000 ans.',
    },
  ],
};
