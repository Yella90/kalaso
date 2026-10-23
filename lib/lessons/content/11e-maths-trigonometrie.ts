import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Comment mesurer la hauteur d’un grand fromager sans y grimper ? Il suffit de reculer de 20 m et de mesurer l’angle sous lequel on voit son sommet. La **trigonométrie** relie les angles et les longueurs ; elle sert aussi à décrire tout ce qui tourne ou oscille : roues, ondes, courant alternatif.',
  objectives: [
    'utiliser le radian et le cercle trigonométrique ;',
    'connaître les cosinus et sinus des angles remarquables ;',
    'utiliser les formules d’addition et de duplication ;',
    'résoudre les équations $\\cos x = \\cos a$ et $\\sin x = \\sin a$.',
  ],
  sections: [
    {
      title: 'Radian et cercle trigonométrique',
      blocks: [
        {
          kind: 'formula',
          tex: '\\pi\\ \\text{rad} = 180° \\qquad \\alpha_{rad} = \\alpha_{deg} \\times \\dfrac{\\pi}{180}',
        },
        {
          kind: 'text',
          text: 'Sur le cercle de centre $O$ et de rayon 1, le point $M$ associé à l’angle orienté $x$ a pour coordonnées $(\\cos x, \\sin x)$. Un angle orienté est défini à $2k\\pi$ près.',
        },
        {
          kind: 'table',
          head: ['$x$', '0', '$\\frac{\\pi}{6}$', '$\\frac{\\pi}{4}$', '$\\frac{\\pi}{3}$', '$\\frac{\\pi}{2}$'],
          rows: [
            ['$\\cos x$', '1', '$\\frac{\\sqrt{3}}{2}$', '$\\frac{\\sqrt{2}}{2}$', '$\\frac{1}{2}$', '0'],
            ['$\\sin x$', '0', '$\\frac{1}{2}$', '$\\frac{\\sqrt{2}}{2}$', '$\\frac{\\sqrt{3}}{2}$', '1'],
          ],
        },
        {
          kind: 'formula',
          tex: '\\cos^2 x + \\sin^2 x = 1 \\qquad \\cos(-x) = \\cos x \\qquad \\sin(-x) = -\\sin x \\qquad \\cos(\\pi - x) = -\\cos x',
        },
      ],
    },
    {
      title: 'Formules d’addition et de duplication',
      blocks: [
        {
          kind: 'formula',
          tex: '\\cos(a + b) = \\cos a\\cos b - \\sin a\\sin b \\qquad \\sin(a + b) = \\sin a\\cos b + \\cos a\\sin b',
        },
        {
          kind: 'formula',
          tex: '\\cos 2a = \\cos^2 a - \\sin^2 a = 2\\cos^2 a - 1 \\qquad \\sin 2a = 2\\sin a\\cos a',
        },
        {
          kind: 'example',
          title: '$\\cos\\dfrac{\\pi}{12}$',
          text: '$\\dfrac{\\pi}{12} = \\dfrac{\\pi}{3} - \\dfrac{\\pi}{4}$.',
          steps: ['$\\cos\\dfrac{\\pi}{12} = \\cos\\dfrac{\\pi}{3}\\cos\\dfrac{\\pi}{4} + \\sin\\dfrac{\\pi}{3}\\sin\\dfrac{\\pi}{4} = \\dfrac{\\sqrt{2} + \\sqrt{6}}{4} \\approx 0{,}966$.'],
        },
      ],
    },
    {
      title: 'Équations trigonométriques',
      blocks: [
        {
          kind: 'formula',
          tex: '\\cos x = \\cos a \\iff x = a + 2k\\pi \\text{ ou } x = -a + 2k\\pi \\qquad \\sin x = \\sin a \\iff x = a + 2k\\pi \\text{ ou } x = \\pi - a + 2k\\pi',
        },
        {
          kind: 'example',
          title: '$\\cos x = \\dfrac{1}{2}$ dans $[0, 2\\pi[$',
          text: '$\\dfrac{1}{2} = \\cos\\dfrac{\\pi}{3}$.',
          steps: ['$x = \\dfrac{\\pi}{3}$ ou $x = -\\dfrac{\\pi}{3} + 2\\pi = \\dfrac{5\\pi}{3}$.'],
        },
        {
          kind: 'trap',
          wrong: '« $\\cos x = \\frac{1}{2}$ a une seule solution, $\\frac{\\pi}{3}$. »',
          why: 'Deux points du cercle ont la même abscisse $\\frac{1}{2}$ ; et l’on peut ajouter des tours complets.',
          reflex: 'Toujours deux familles de solutions, puis on garde celles de l’intervalle demandé.',
        },
      ],
    },
  ],
  essentials: [
    '$\\pi$ rad = 180° ; $M(\\cos x, \\sin x)$ sur le cercle trigonométrique ; $\\cos^2 x + \\sin^2 x = 1$.',
    'Valeurs remarquables en $0$, $\\frac{\\pi}{6}$, $\\frac{\\pi}{4}$, $\\frac{\\pi}{3}$, $\\frac{\\pi}{2}$.',
    'Addition : $\\cos(a + b) = \\cos a\\cos b - \\sin a\\sin b$ ; duplication : $\\sin 2a = 2\\sin a\\cos a$.',
    '$\\cos x = \\cos a$ : $x = \\pm a + 2k\\pi$ ; $\\sin x = \\sin a$ : $x = a$ ou $\\pi - a$, à $2k\\pi$ près.',
  ],
  exercises: [
    {
      id: 'trigo-conversion',
      level: 1,
      title: 'Conversions et valeurs',
      statement: 'Réponds avec des valeurs approchées.',
      parts: [
        {
          label: '150° en radians.',
          answer: { kind: 'number', value: 2.618, tolerance: 0.002, unit: 'rad' },
          steps: ['$150 \\times \\dfrac{\\pi}{180} = \\dfrac{5\\pi}{6} \\approx 2{,}618$.'],
        },
        {
          label: '$\\cos\\dfrac{\\pi}{12}$.',
          answer: { kind: 'number', value: 0.9659, tolerance: 0.001, unit: '' },
          steps: ['$\\dfrac{\\sqrt{6} + \\sqrt{2}}{4} \\approx 0{,}966$.'],
        },
      ],
    },
    {
      id: 'trigo-equation',
      level: 2,
      title: 'Résoudre',
      statement: 'On résout dans $[0, 2\\pi[$.',
      parts: [
        {
          label: 'Combien de solutions a $\\cos x = \\dfrac{1}{2}$ ?',
          answer: { kind: 'number', value: 2, tolerance: 0, unit: '' },
          steps: ['$\\dfrac{\\pi}{3}$ et $\\dfrac{5\\pi}{3}$.'],
        },
        {
          label: 'La plus grande solution de $\\sin x = \\dfrac{\\sqrt{2}}{2}$ (valeur approchée).',
          answer: { kind: 'number', value: 2.356, tolerance: 0.002, unit: '' },
          steps: ['$x = \\dfrac{\\pi}{4}$ ou $x = \\pi - \\dfrac{\\pi}{4} = \\dfrac{3\\pi}{4} \\approx 2{,}356$.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: '$\\sin\\dfrac{\\pi}{6}$ vaut :',
      choices: ['$\\dfrac{1}{2}$', '$\\dfrac{\\sqrt{3}}{2}$', '$\\dfrac{\\sqrt{2}}{2}$', '1'],
      answer: 0,
      explanation: 'Valeur remarquable à connaître.',
    },
    {
      question: '$\\cos^2 x + \\sin^2 x$ vaut toujours :',
      choices: ['1', '0', '2', '$\\cos 2x$'],
      answer: 0,
      explanation: 'Théorème de Pythagore dans le cercle de rayon 1.',
    },
    {
      question: '$\\sin 2a$ est égal à :',
      choices: ['$2\\sin a\\cos a$', '$2\\sin a$', '$\\sin^2 a$', '$\\cos^2 a - \\sin^2 a$'],
      answer: 0,
      explanation: 'Formule de duplication.',
    },
    {
      question: '90° correspondent à :',
      choices: ['$\\dfrac{\\pi}{2}$ rad', '$\\pi$ rad', '$\\dfrac{\\pi}{4}$ rad', '$2\\pi$ rad'],
      answer: 0,
      explanation: '$90 \\times \\dfrac{\\pi}{180}$.',
    },
  ],
  applications: [
    {
      title: 'La hauteur du fromager',
      tagline: 'Mesurer un arbre sans y grimper',
      situation:
        'Un élève se place à 20 m du pied d’un grand fromager, sur un sol plat. Il vise le sommet de l’arbre sous un angle de 35° au-dessus de l’horizontale ; ses yeux sont à 1,5 m du sol.',
      model: 'Triangle rectangle entre l’œil, le tronc et le sommet.',
      questions: ['Quelle est la hauteur de l’arbre, en m ?'],
      check: { value: 15.5, tolerance: 0.02, unit: 'm' },
      solution: ['Au-dessus des yeux : $20 \\times \\tan 35° \\approx 14{,}0$ m.', 'Hauteur totale : $14{,}0 + 1{,}5 \\approx 15{,}5$ m.'],
    },
  ],
};
