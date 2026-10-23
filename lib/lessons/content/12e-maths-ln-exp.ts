import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Une population qui augmente de 4 % par an double en un peu moins de 18 ans. Une épargne placée à intérêts composés, une colonie de bactéries, la décharge d’un condensateur : toutes ces grandeurs évoluent selon des **exponentielles**. Pour retrouver une durée à partir d’un résultat, on utilise la fonction réciproque : le **logarithme népérien**.',
  objectives: [
    'utiliser les propriétés algébriques de $\\ln$ et de $\\exp$ ;',
    'dériver des fonctions de la forme $\\ln u$ et $e^u$ ;',
    'connaître les limites usuelles et les croissances comparées ;',
    'résoudre des équations et inéquations avec $\\ln$ et $\\exp$.',
  ],
  sections: [
    {
      title: 'La fonction logarithme népérien',
      blocks: [
        {
          kind: 'definition',
          term: 'Logarithme népérien',
          text: 'la fonction $\\ln$ est l’unique primitive de $x \\mapsto \\dfrac{1}{x}$ sur $]0, +\\infty[$ qui s’annule en 1. Elle est strictement croissante ; $\\ln e = 1$ avec $e \\approx 2{,}718$.',
        },
        {
          kind: 'formula',
          tex: '\\ln(ab) = \\ln a + \\ln b \\qquad \\ln\\dfrac{a}{b} = \\ln a - \\ln b \\qquad \\ln(a^n) = n\\ln a',
          legend: ['pour $a > 0$, $b > 0$ et $n$ entier'],
        },
        {
          kind: 'formula',
          label: 'Dérivées et limites',
          tex: '(\\ln u)\' = \\dfrac{u\'}{u} \\qquad \\lim_{x \\to 0^+}\\ln x = -\\infty \\qquad \\lim_{x \\to +\\infty}\\ln x = +\\infty \\qquad \\lim_{x \\to 0}\\dfrac{\\ln(1 + x)}{x} = 1',
        },
      ],
    },
    {
      title: 'La fonction exponentielle',
      blocks: [
        {
          kind: 'definition',
          term: 'Exponentielle',
          text: 'la fonction $\\exp$, notée $x \\mapsto e^x$, est la réciproque de $\\ln$ : pour $x$ réel et $y > 0$, $y = e^x \\iff x = \\ln y$. Elle est strictement croissante et toujours strictement positive.',
        },
        {
          kind: 'formula',
          tex: 'e^{a + b} = e^a e^b \\qquad e^{-a} = \\dfrac{1}{e^a} \\qquad (e^a)^n = e^{na} \\qquad (e^u)\' = u\'e^u',
        },
        {
          kind: 'formula',
          label: 'Croissances comparées',
          tex: '\\lim_{x \\to +\\infty}\\dfrac{e^x}{x^n} = +\\infty \\qquad \\lim_{x \\to +\\infty}\\dfrac{\\ln x}{x} = 0 \\qquad \\lim_{x \\to 0^+} x\\ln x = 0 \\qquad \\lim_{x \\to -\\infty} xe^x = 0',
          legend: ['l’exponentielle l’emporte sur les puissances, qui l’emportent sur le logarithme'],
        },
      ],
    },
    {
      title: 'Équations et inéquations',
      blocks: [
        {
          kind: 'callout',
          variant: 'methode',
          blocks: [
            {
              kind: 'list',
              items: [
                'chercher d’abord l’**ensemble de validité** (ce qui est sous un ln doit être strictement positif) ;',
                'regrouper avec les propriétés de ln, puis utiliser $\\ln a = \\ln b \\iff a = b$ et $\\ln a < \\ln b \\iff a < b$ ;',
                'pour une équation en $e^x$, poser $X = e^x$ ($X > 0$) et résoudre en $X$.',
              ],
            },
          ],
        },
        {
          kind: 'example',
          title: '$\\ln x + \\ln(x - 2) = \\ln 3$',
          text: 'Validité : $x > 2$.',
          steps: ['$\\ln[x(x - 2)] = \\ln 3 \\iff x^2 - 2x - 3 = 0 \\iff x = 3$ ou $x = -1$.', 'Seul $x = 3$ vérifie $x > 2$ : $S = \\{3\\}$.'],
        },
        {
          kind: 'example',
          title: '$e^{2x} - 3e^x + 2 = 0$',
          text: 'On pose $X = e^x > 0$ : $X^2 - 3X + 2 = 0$.',
          steps: ['$X = 1$ ou $X = 2$, donc $x = 0$ ou $x = \\ln 2 \\approx 0{,}693$.'],
        },
        {
          kind: 'trap',
          wrong: '« $\\ln(a + b) = \\ln a + \\ln b$. »',
          why: 'Le logarithme transforme un **produit** en somme, pas une somme en somme.',
          reflex: 'Seules les formules du produit, du quotient et de la puissance existent.',
        },
      ],
    },
  ],
  essentials: [
    '$\\ln(ab) = \\ln a + \\ln b$ ; $\\ln(a^n) = n\\ln a$ ; $(\\ln u)\' = \\frac{u\'}{u}$.',
    '$y = e^x \\iff x = \\ln y$ ; $e^{a+b} = e^ae^b$ ; $(e^u)\' = u\'e^u$.',
    'Croissances comparées : $\\frac{e^x}{x^n} \\to +\\infty$, $\\frac{\\ln x}{x} \\to 0$, $x\\ln x \\to 0$ en $0^+$.',
    'Toujours commencer par l’ensemble de validité.',
  ],
  exercises: [
    {
      id: 'lnexp-equations',
      level: 1,
      title: 'Deux équations',
      statement: 'Résous dans $\\mathbb{R}$.',
      parts: [
        {
          label: '$\\ln x + \\ln(x - 2) = \\ln 3$ : donne la solution.',
          answer: { kind: 'number', value: 3, tolerance: 0.001, unit: '' },
          steps: ['Validité $x > 2$ ; $x(x - 2) = 3$ donne $x = 3$ ou $x = -1$ ; on garde $x = 3$.'],
        },
        {
          label: '$e^{2x} - 3e^x + 2 = 0$ : donne la plus grande solution (valeur approchée).',
          answer: { kind: 'number', value: 0.6931, tolerance: 0.002, unit: '' },
          steps: ['$X = e^x$ : $X = 1$ ou $X = 2$ ; $x = 0$ ou $x = \\ln 2 \\approx 0{,}693$.'],
          result: 'x = \\ln 2',
        },
      ],
    },
    {
      id: 'lnexp-derivees',
      level: 2,
      title: 'Dérivées et limites',
      statement: 'On considère $f(x) = \\ln(x^2 + 1)$ et $g(x) = x\\,e^{-x}$.',
      parts: [
        {
          label: 'Calcule $f\'(1)$.',
          answer: { kind: 'number', value: 1, tolerance: 0.001, unit: '' },
          steps: ['$f\'(x) = \\dfrac{2x}{x^2 + 1}$, donc $f\'(1) = \\dfrac{2}{2} = 1$.'],
        },
        {
          label: 'En quelle valeur $g$ atteint-elle son maximum ?',
          answer: { kind: 'number', value: 1, tolerance: 0.001, unit: '' },
          steps: ['$g\'(x) = e^{-x} - xe^{-x} = (1 - x)e^{-x}$, positive avant 1, négative après : maximum en $x = 1$.'],
        },
        {
          label: 'Calcule ce maximum (valeur approchée).',
          answer: { kind: 'number', value: 0.3679, tolerance: 0.002, unit: '' },
          steps: ['$g(1) = e^{-1} \\approx 0{,}368$. De plus, $g(x) \\to 0$ en $+\\infty$ par croissances comparées.'],
          result: 'g(1) = \\dfrac{1}{e}',
        },
      ],
    },
    {
      id: 'lnexp-inequation',
      level: 3,
      title: 'Atteindre un seuil',
      statement: 'Un capital de 100 000 F CFA est placé à 5 % par an, à intérêts composés : après $n$ années, il vaut $100\\,000 \\times 1{,}05^n$.',
      parts: [
        {
          label: 'Au bout de combien d’années, au minimum, le capital a-t-il doublé ? (nombre entier)',
          answer: { kind: 'number', value: 15, tolerance: 0, unit: 'ans' },
          steps: ['$1{,}05^n \\geq 2 \\iff n\\ln 1{,}05 \\geq \\ln 2 \\iff n \\geq \\dfrac{\\ln 2}{\\ln 1{,}05} \\approx 14{,}2$.', 'Il faut 15 années complètes.'],
        },
        {
          label: 'Que vaut le capital après ces 15 années (en F CFA, arrondi à l’unité) ?',
          answer: { kind: 'number', value: 207893, tolerance: 2, unit: 'F CFA' },
          steps: ['$100\\,000 \\times 1{,}05^{15} \\approx 207\\,893$ F CFA.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: '$\\ln(e^3)$ vaut :',
      choices: ['3', '$e^3$', '$3e$', '1'],
      answer: 0,
      explanation: '$\\ln$ et $\\exp$ sont réciproques.',
    },
    {
      question: '$\\ln 8$ est égal à :',
      choices: ['$3\\ln 2$', '$8\\ln 1$', '$\\ln 4 + \\ln 4$', '$2\\ln 4 - 1$'],
      answer: 0,
      explanation: '$\\ln(2^3) = 3\\ln 2$. ($\\ln 4 + \\ln 4 = \\ln 16$.)',
    },
    {
      question: 'La dérivée de $e^{3x}$ est :',
      choices: ['$3e^{3x}$', '$e^{3x}$', '$3xe^{3x - 1}$', '$e^3$'],
      answer: 0,
      explanation: '$(e^u)\' = u\'e^u$ avec $u = 3x$.',
    },
    {
      question: '$\\lim\\limits_{x \\to +\\infty} \\dfrac{\\ln x}{x}$ vaut :',
      choices: ['0', '1', '$+\\infty$', 'elle n’existe pas'],
      answer: 0,
      explanation: 'Croissances comparées : $x$ l’emporte sur $\\ln x$.',
    },
    {
      question: 'L’équation $e^x = -2$ :',
      choices: ['n’a pas de solution', 'a pour solution $\\ln(-2)$', 'a pour solution $-\\ln 2$', 'a deux solutions'],
      answer: 0,
      explanation: 'Une exponentielle est toujours strictement positive.',
    },
  ],
  applications: [
    {
      title: 'La croissance de Bamako',
      tagline: 'En combien de temps une ville double-t-elle ?',
      situation:
        'On suppose que la population d’une grande ville augmente de 4 % par an : chaque année, elle est multipliée par 1,04.',
      model: 'Croissance exponentielle à taux constant ; dans la réalité, le taux change d’une année à l’autre.',
      questions: ['Au bout de combien d’années la population aura-t-elle doublé ?'],
      check: { value: 17.67, tolerance: 0.02, unit: 'ans' },
      solution: ['$1{,}04^n = 2 \\iff n = \\dfrac{\\ln 2}{\\ln 1{,}04} \\approx 17{,}7$ ans.'],
      fact: 'Règle rapide : le temps de doublement vaut environ 70 divisé par le taux en %. Ici $70 / 4 \\approx 17{,}5$ ans.',
    },
  ],
};
