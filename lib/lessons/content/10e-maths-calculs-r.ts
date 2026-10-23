import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'La distance de la Terre au Soleil, 150 000 000 km, et la taille d’un virus, 0,000 000 1 m : écrire ces nombres en entier est pénible et source d’erreurs. Les **puissances de 10**, les racines carrées, les intervalles et la valeur absolue sont les outils de base pour calculer juste dans ℝ.',
  objectives: [
    'calculer avec les puissances et l’écriture scientifique ;',
    'simplifier des racines carrées ;',
    'représenter des intervalles et utiliser la valeur absolue ;',
    'donner un encadrement et une valeur approchée.',
  ],
  sections: [
    {
      title: 'Puissances et racines',
      blocks: [
        {
          kind: 'formula',
          tex: 'a^m \\times a^n = a^{m+n} \\qquad \\dfrac{a^m}{a^n} = a^{m-n} \\qquad (a^m)^n = a^{mn} \\qquad a^{-n} = \\dfrac{1}{a^n}',
        },
        {
          kind: 'definition',
          term: 'Écriture scientifique',
          text: '$a \\times 10^n$ avec $1 \\le a < 10$ et $n$ entier. Exemple : $150\\,000\\,000 = 1{,}5 \\times 10^8$.',
        },
        {
          kind: 'formula',
          tex: '\\sqrt{ab} = \\sqrt a \\sqrt b \\qquad \\sqrt{\\dfrac ab} = \\dfrac{\\sqrt a}{\\sqrt b} \\quad (a \\ge 0,\\ b > 0)',
        },
        {
          kind: 'example',
          title: 'simplifier',
          text: 'Simplifier $\\sqrt{72}$ et rendre rationnel le dénominateur de $\\dfrac{3}{\\sqrt2}$.',
          steps: ['$\\sqrt{72} = \\sqrt{36 \\times 2} = 6\\sqrt2$.', '$\\dfrac{3}{\\sqrt2} = \\dfrac{3\\sqrt2}{2}$.'],
        },
        {
          kind: 'trap',
          wrong: '$\\sqrt{9 + 16} = \\sqrt9 + \\sqrt{16} = 7$',
          why: '$\\sqrt{25} = 5$ : la racine d’une somme n’est pas la somme des racines.',
          reflex: 'La racine se distribue sur un produit, jamais sur une somme.',
        },
      ],
    },
    {
      title: 'Intervalles et valeur absolue',
      blocks: [
        {
          kind: 'table',
          head: ['Inégalité', 'Intervalle'],
          rows: [
            ['$a \\le x \\le b$', '$[a\\,;\\,b]$'],
            ['$a < x \\le b$', '$]a\\,;\\,b]$'],
            ['$x > a$', '$]a\\,;\\,+\\infty[$'],
            ['$x \\le b$', '$]-\\infty\\,;\\,b]$'],
          ],
        },
        {
          kind: 'definition',
          term: 'Valeur absolue',
          text: '$|x| = x$ si $x \\ge 0$ et $|x| = -x$ si $x < 0$. $|x - a|$ est la **distance** entre $x$ et $a$ sur la droite.',
        },
        {
          kind: 'rule',
          text: '$|x - a| \\le r \\iff a - r \\le x \\le a + r \\iff x \\in [a - r\\,;\\,a + r]$.',
        },
      ],
    },
  ],
  essentials: [
    'Règles des puissances ; écriture scientifique a × 10ⁿ avec 1 ≤ a < 10.',
    '√(ab) = √a √b, mais √(a + b) ≠ √a + √b.',
    '|x − a| est la distance entre x et a.',
    '|x − a| ≤ r ⟺ x ∈ [a − r ; a + r].',
  ],
  exercises: [
    {
      id: 'cr-puissances',
      level: 1,
      title: 'Calculer avec les puissances',
      statement: 'Calcule sans calculatrice.',
      parts: [
        {
          label: '$\\dfrac{2^5 \\times 2^{-2}}{2^2}$',
          answer: { kind: 'number', value: 2, tolerance: 0, unit: '' },
          steps: ['$2^{5 - 2 - 2} = 2^1 = 2$.'],
        },
        {
          label: '$(3 \\times 10^4) \\times (5 \\times 10^{-6})$, en écriture décimale.',
          answer: { kind: 'number', value: 0.15, tolerance: 0.0001, unit: '' },
          steps: ['$15 \\times 10^{-2} = 0{,}15$.'],
        },
      ],
    },
    {
      id: 'cr-absolue',
      level: 2,
      title: 'Valeur absolue et intervalle',
      statement: 'On cherche les réels x tels que $|x - 3| \\le 2$.',
      parts: [
        {
          label: 'Plus petite valeur possible de x.',
          answer: { kind: 'number', value: 1, tolerance: 0, unit: '' },
          steps: ['$x \\in [3 - 2\\,;\\,3 + 2] = [1\\,;\\,5]$.'],
        },
        {
          label: 'Plus grande valeur possible de x.',
          answer: { kind: 'number', value: 5, tolerance: 0, unit: '' },
          steps: ['$x \\le 5$.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: '$\\sqrt{50}$ est égal à :',
      choices: ['$5\\sqrt2$', '$25\\sqrt2$', '$2\\sqrt5$', '$10\\sqrt5$'],
      answer: 0,
      explanation: '50 = 25 × 2.',
    },
    {
      question: '$0{,}000\\,42$ en écriture scientifique :',
      choices: ['$4{,}2 \\times 10^{-4}$', '$42 \\times 10^{-5}$', '$4{,}2 \\times 10^{4}$', '$0{,}42 \\times 10^{-3}$'],
      answer: 0,
      explanation: 'Un seul chiffre non nul avant la virgule.',
    },
    {
      question: '$|-7|$ vaut :',
      choices: ['7', '−7', '0', '49'],
      answer: 0,
      explanation: 'La valeur absolue est une distance, toujours positive.',
    },
    {
      question: 'L’intervalle des x tels que $-2 < x \\le 4$ est :',
      choices: ['$]-2\\,;\\,4]$', '$[-2\\,;\\,4]$', '$[-2\\,;\\,4[$', '$]-2\\,;\\,4[$'],
      answer: 0,
      explanation: 'Crochet ouvert pour l’inégalité stricte.',
    },
  ],
  applications: [
    {
      title: 'La tolérance du menuisier',
      tagline: 'Une porte qui ferme bien',
      situation:
        'Un menuisier de Ségou fabrique des portes de 2,10 m de haut. Pour qu’une porte ferme correctement, sa hauteur réelle h (en m) doit vérifier $|h - 2{,}10| \\le 0{,}004$.',
      model: 'Une valeur absolue traduit un écart maximal autour d’une valeur.',
      questions: ['Quelle est la hauteur maximale acceptée, en m ?', 'Une porte de 2,095 m est-elle acceptée ?'],
      check: { value: 2.104, tolerance: 0.0005, unit: 'm' },
      solution: ['$h \\in [2{,}096\\,;\\,2{,}104]$ : hauteur maximale 2,104 m.', '$|2{,}095 - 2{,}10| = 0{,}005 > 0{,}004$ : elle est refusée.'],
      fact: 'En usine, on parle de « tolérance » : c’est exactement une inégalité avec une valeur absolue.',
    },
  ],
};
