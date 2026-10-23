import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Un éleveur dispose de 100 m de grillage pour clôturer un enclos rectangulaire le long du fleuve (le fleuve sert de quatrième côté). Quelles dimensions choisir pour que ses chèvres aient le plus de place ? Pour répondre, on exprime l’aire par une **fonction**, et la **dérivée** dit où elle est maximale.',
  objectives: [
    'calculer des limites simples et reconnaître les asymptotes ;',
    'définir le nombre dérivé comme limite d’un taux d’accroissement ;',
    'calculer des dérivées avec les formules usuelles et écrire l’équation d’une tangente ;',
    'étudier les variations d’une fonction et trouver ses extremums.',
  ],
  sections: [
    {
      title: 'Limites',
      blocks: [
        {
          kind: 'list',
          items: [
            'en $+\\infty$, un polynôme se comporte comme son terme de plus haut degré ;',
            'une fraction rationnelle se comporte comme le quotient des termes de plus haut degré ;',
            'si $f(x) \\to \\pm\\infty$ quand $x \\to a$, la droite $x = a$ est **asymptote verticale** ; si $f(x) \\to b$ en l’infini, $y = b$ est **asymptote horizontale**.',
          ],
        },
        {
          kind: 'example',
          title: '$f(x) = \\dfrac{2x + 1}{x - 3}$',
          text: 'Étude aux bornes.',
          steps: ['En $\\pm\\infty$ : $f(x) \\to \\dfrac{2}{1} = 2$, asymptote horizontale $y = 2$.', 'Quand $x \\to 3$ : le dénominateur tend vers 0, $f(x) \\to \\pm\\infty$ : asymptote verticale $x = 3$.'],
        },
      ],
    },
    {
      title: 'Nombre dérivé et tangente',
      blocks: [
        {
          kind: 'formula',
          tex: 'f\'(a) = \\lim_{h \\to 0}\\dfrac{f(a + h) - f(a)}{h} \\qquad \\text{tangente : } y = f\'(a)(x - a) + f(a)',
          legend: ['$f\'(a)$ est le coefficient directeur de la tangente à la courbe au point d’abscisse $a$'],
        },
        {
          kind: 'table',
          head: ['$f(x)$', '$f\'(x)$'],
          rows: [
            ['$k$ (constante)', '0'],
            ['$x^n$', '$nx^{n-1}$'],
            ['$\\dfrac{1}{x}$', '$-\\dfrac{1}{x^2}$'],
            ['$\\sqrt{x}$', '$\\dfrac{1}{2\\sqrt{x}}$'],
            ['$u + v$ ; $ku$', '$u\' + v\'$ ; $ku\'$'],
            ['$uv$ ; $\\dfrac{u}{v}$', '$u\'v + uv\'$ ; $\\dfrac{u\'v - uv\'}{v^2}$'],
          ],
        },
      ],
    },
    {
      title: 'Variations et extremums',
      blocks: [
        {
          kind: 'rule',
          text: 'Si $f\'(x) > 0$ sur un intervalle, $f$ y est strictement croissante ; si $f\'(x) < 0$, strictement décroissante. Si $f\'$ s’annule en changeant de signe en $a$, $f$ admet un extremum local en $a$.',
        },
        {
          kind: 'example',
          title: '$f(x) = x^2 - 4x + 3$',
          text: '$f\'(x) = 2x - 4$, nulle en $x = 2$.',
          steps: ['$f\' < 0$ avant 2, $f\' > 0$ après : minimum en 2.', '$f(2) = 4 - 8 + 3 = -1$.'],
        },
        {
          kind: 'callout',
          variant: 'remarque',
          blocks: [
            {
              kind: 'text',
              text: 'Une **primitive** de $f$ est une fonction $F$ telle que $F\' = f$. Par exemple, $\\dfrac{x^3}{3}$ est une primitive de $x^2$. On les étudiera en détail en Terminale.',
            },
          ],
        },
        {
          kind: 'trap',
          wrong: '« $f\'(a) = 0$, donc $f$ a un extremum en $a$. »',
          why: 'Pour $f(x) = x^3$, $f\'(0) = 0$ mais $f$ est croissante partout : la dérivée ne change pas de signe.',
          reflex: 'Vérifier le changement de signe de $f\'$.',
        },
      ],
    },
  ],
  essentials: [
    'Asymptotes : verticale si $f \\to \\pm\\infty$ en $a$ ; horizontale si $f \\to b$ en l’infini.',
    '$f\'(a)$ = limite du taux d’accroissement = pente de la tangente ; tangente $y = f\'(a)(x - a) + f(a)$.',
    'Dérivées usuelles : $x^n \\to nx^{n-1}$, $uv$, $\\frac{u}{v}$.',
    'Signe de $f\'$ ⇒ variations ; changement de signe ⇒ extremum.',
  ],
  simulationTasks: [
    'trace $f(x) = x^2 - 4x + 3$ et repère son minimum ;',
    'déplace le point de tangence : où la tangente est-elle horizontale ?',
  ],
  exercises: [
    {
      id: 'f11-derivee',
      level: 1,
      title: 'Dérivées et tangente',
      statement: 'On considère $f(x) = x^2$ et $g(x) = x^2 - 4x + 3$.',
      parts: [
        {
          label: 'Coefficient directeur de la tangente à la courbe de $f$ en $x = 1$.',
          answer: { kind: 'number', value: 2, tolerance: 0, unit: '' },
          steps: ['$f\'(x) = 2x$, $f\'(1) = 2$.'],
        },
        {
          label: 'Ordonnée à l’origine de cette tangente.',
          answer: { kind: 'number', value: -1, tolerance: 0, unit: '' },
          steps: ['$y = 2(x - 1) + 1 = 2x - 1$.'],
        },
        {
          label: 'Valeur minimale de $g$.',
          answer: { kind: 'number', value: -1, tolerance: 0, unit: '' },
          steps: ['$g\'(x) = 2x - 4$ s’annule en 2 ; $g(2) = -1$.'],
        },
      ],
    },
    {
      id: 'f11-asymptotes',
      level: 2,
      title: 'Asymptotes',
      statement: '$h(x) = \\dfrac{2x + 1}{x - 3}$.',
      parts: [
        {
          label: 'Équation de l’asymptote horizontale : $y = \\dots$',
          answer: { kind: 'number', value: 2, tolerance: 0, unit: '' },
          steps: ['Limite en l’infini : $\\dfrac{2}{1} = 2$.'],
        },
        {
          label: 'Équation de l’asymptote verticale : $x = \\dots$',
          answer: { kind: 'number', value: 3, tolerance: 0, unit: '' },
          steps: ['Le dénominateur s’annule en 3 (le numérateur vaut 7).'],
        },
        {
          label: 'Calcule $h\'(4)$.',
          answer: { kind: 'number', value: -7, tolerance: 0.001, unit: '' },
          steps: ['$h\'(x) = \\dfrac{2(x - 3) - (2x + 1)}{(x - 3)^2} = \\dfrac{-7}{(x - 3)^2}$ ; $h\'(4) = -7$.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'La dérivée de $x^3$ est :',
      choices: ['$3x^2$', '$x^2$', '$3x$', '$\\dfrac{x^4}{4}$'],
      answer: 0,
      explanation: '$nx^{n-1}$ avec $n = 3$.',
    },
    {
      question: '$f\'(a)$ représente graphiquement :',
      choices: ['la pente de la tangente en $a$', 'la valeur de $f$ en $a$', 'l’aire sous la courbe', 'l’asymptote'],
      answer: 0,
      explanation: 'C’est le coefficient directeur de la tangente.',
    },
    {
      question: 'Si $f\'(x) < 0$ sur $[1, 5]$, alors sur cet intervalle $f$ est :',
      choices: ['décroissante', 'croissante', 'négative', 'constante'],
      answer: 0,
      explanation: 'Le signe de $f\'$ donne les variations.',
    },
    {
      question: 'La dérivée de $\\dfrac{1}{x}$ est :',
      choices: ['$-\\dfrac{1}{x^2}$', '$\\dfrac{1}{x^2}$', '$\\ln x$', '$-\\dfrac{1}{x}$'],
      answer: 0,
      explanation: 'Formule à connaître.',
    },
  ],
  applications: [
    {
      title: 'L’enclos des chèvres',
      tagline: 'La plus grande aire avec 100 m de grillage',
      situation:
        'Un éleveur clôture un enclos rectangulaire au bord du fleuve avec 100 m de grillage : le fleuve forme un côté, le grillage les trois autres. On note $x$ la largeur (côtés perpendiculaires au fleuve).',
      model: 'Aire $A(x) = x(100 - 2x)$ pour $0 < x < 50$.',
      questions: ['Pour quelle largeur l’aire est-elle maximale ?', 'Quelle est cette aire maximale, en m² ?'],
      check: { value: 1250, tolerance: 0.01, unit: 'm²' },
      solution: ['$A(x) = 100x - 2x^2$ ; $A\'(x) = 100 - 4x$ s’annule en $x = 25$ m (positive avant, négative après).', '$A(25) = 25 \\times 50 = 1\\,250$ m², avec un côté de 50 m le long du fleuve.'],
    },
  ],
};
