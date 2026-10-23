import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Comment connaître la hauteur du grand fromager de la cour sans grimper dedans ? Il suffit de mesurer sa distance et l’angle sous lequel on voit son sommet. La **trigonométrie** relie les angles et les longueurs d’un triangle rectangle.',
  objectives: [
    'utiliser cosinus, sinus et tangente dans un triangle rectangle ;',
    'connaître les valeurs des angles remarquables ;',
    'convertir les degrés en radians et inversement ;',
    'utiliser la relation cos² x + sin² x = 1.',
  ],
  sections: [
    {
      title: 'Rapports trigonométriques',
      blocks: [
        {
          kind: 'formula',
          tex: '\\cos \\hat A = \\dfrac{\\text{adjacent}}{\\text{hypoténuse}} \\qquad \\sin \\hat A = \\dfrac{\\text{opposé}}{\\text{hypoténuse}} \\qquad \\tan \\hat A = \\dfrac{\\text{opposé}}{\\text{adjacent}}',
        },
        {
          kind: 'formula',
          tex: '\\cos^2 x + \\sin^2 x = 1 \\qquad \\tan x = \\dfrac{\\sin x}{\\cos x}',
        },
        {
          kind: 'example',
          title: 'la hauteur de l’arbre',
          text: 'On se place à 20 m du pied de l’arbre et on voit son sommet sous un angle de 35° (les yeux à 1,6 m du sol).',
          steps: ['$h = 20 \\times \\tan 35° \\approx 20 \\times 0{,}700 = 14{,}0$ m au-dessus des yeux.', 'Hauteur de l’arbre : $14{,}0 + 1{,}6 = 15{,}6$ m.'],
        },
      ],
    },
    {
      title: 'Angles remarquables',
      blocks: [
        {
          kind: 'table',
          head: ['$x$', '0', '$\\frac{\\pi}{6}$ (30°)', '$\\frac{\\pi}{4}$ (45°)', '$\\frac{\\pi}{3}$ (60°)', '$\\frac{\\pi}{2}$ (90°)'],
          rows: [
            ['$\\cos x$', '1', '$\\frac{\\sqrt3}{2}$', '$\\frac{\\sqrt2}{2}$', '$\\frac12$', '0'],
            ['$\\sin x$', '0', '$\\frac12$', '$\\frac{\\sqrt2}{2}$', '$\\frac{\\sqrt3}{2}$', '1'],
            ['$\\tan x$', '0', '$\\frac{\\sqrt3}{3}$', '1', '$\\sqrt3$', '—'],
          ],
        },
      ],
    },
    {
      title: 'Degrés et radians',
      blocks: [
        {
          kind: 'formula',
          tex: '180° = \\pi \\text{ rad} \\qquad x_{\\text{rad}} = x_{\\text{deg}} \\times \\dfrac{\\pi}{180}',
        },
        {
          kind: 'text',
          text: 'Le radian est l’angle qui intercepte, sur un cercle de rayon $R$, un arc de longueur $R$. La longueur d’un arc d’angle $\\alpha$ (en rad) vaut $\\ell = R\\,\\alpha$.',
        },
        {
          kind: 'trap',
          wrong: '« sin 30 = 0,5 » sur la calculatrice réglée en radians.',
          why: 'En mode radian, sin 30 calcule le sinus de 30 rad, soit environ −0,99.',
          reflex: 'Vérifie toujours le mode DEG ou RAD de ta calculatrice.',
        },
      ],
    },
  ],
  essentials: [
    'cos = adjacent/hypoténuse ; sin = opposé/hypoténuse ; tan = opposé/adjacent.',
    'cos² x + sin² x = 1.',
    'π rad = 180° ; arc ℓ = Rα (α en rad).',
    'Retenir les valeurs pour 30°, 45° et 60°.',
  ],
  exercises: [
    {
      id: 'tr-conversion',
      level: 1,
      title: 'Convertir',
      statement: 'Convertis les mesures d’angle.',
      parts: [
        {
          label: '135° en radians (donne la valeur décimale, au centième).',
          answer: { kind: 'number', value: 2.36, tolerance: 0.01, unit: 'rad' },
          steps: ['$135 \\times \\dfrac{\\pi}{180} = \\dfrac{3\\pi}{4} \\approx 2{,}36$ rad.'],
        },
        {
          label: '$\\dfrac{5\\pi}{6}$ rad en degrés.',
          answer: { kind: 'number', value: 150, tolerance: 0.1, unit: '°' },
          steps: ['$\\dfrac{5 \\times 180}{6} = 150°$.'],
        },
      ],
    },
    {
      id: 'tr-cos',
      level: 2,
      title: 'Trouver le cosinus',
      statement: 'x est un angle aigu tel que $\\sin x = 0{,}6$.',
      parts: [
        {
          label: 'Valeur de $\\cos x$.',
          answer: { kind: 'number', value: 0.8, tolerance: 0.001, unit: '' },
          steps: ['$\\cos^2 x = 1 - 0{,}36 = 0{,}64$ ; x aigu donc $\\cos x = 0{,}8$.'],
        },
        {
          label: 'Valeur de $\\tan x$.',
          answer: { kind: 'number', value: 0.75, tolerance: 0.001, unit: '' },
          steps: ['$\\tan x = \\dfrac{0{,}6}{0{,}8} = 0{,}75$.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: '$\\cos 60°$ vaut :',
      choices: ['$\\frac12$', '$\\frac{\\sqrt3}{2}$', '1', '0'],
      answer: 0,
      explanation: 'Et sin 60° = √3/2.',
    },
    {
      question: '$\\pi$ radians correspondent à :',
      choices: ['180°', '90°', '360°', '3,14°'],
      answer: 0,
      explanation: 'Un demi-tour.',
    },
    {
      question: 'Dans un triangle rectangle, la tangente d’un angle est :',
      choices: ['opposé ÷ adjacent', 'adjacent ÷ hypoténuse', 'opposé ÷ hypoténuse', 'hypoténuse ÷ opposé'],
      answer: 0,
      explanation: 'tan = sin/cos.',
    },
    {
      question: 'Pour tout x, $\\cos^2 x + \\sin^2 x$ vaut :',
      choices: ['1', '0', '2', 'cela dépend de x'],
      answer: 0,
      explanation: 'C’est le théorème de Pythagore sur le cercle trigonométrique.',
    },
  ],
  applications: [
    {
      title: 'La rampe d’accès de l’école',
      tagline: 'Construire une rampe pour fauteuil roulant',
      situation:
        'L’école veut une rampe pour franchir une marche de 0,50 m. Pour un fauteuil roulant, la pente ne doit pas dépasser un angle de 5°.',
      model: 'Dans le triangle rectangle : tan 5° = hauteur ÷ longueur horizontale.',
      questions: ['Quelle longueur horizontale minimale faut-il prévoir, en m ?', 'Quelle est alors la longueur de la rampe elle-même ?'],
      check: { value: 5.71, tolerance: 0.02, unit: 'm' },
      solution: ['$d = \\dfrac{0{,}50}{\\tan 5°} = \\dfrac{0{,}50}{0{,}0875} \\approx 5{,}71$ m.', 'Longueur de la rampe : $\\dfrac{0{,}50}{\\sin 5°} \\approx 5{,}74$ m.'],
      fact: 'Le mot trigonométrie vient du grec : « mesure des triangles ».',
    },
  ],
};
