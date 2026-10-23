import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Si aujourd’hui est lundi, quel jour serons-nous dans 100 jours ? Comment la banque vérifie-t-elle qu’un numéro de compte n’a pas été mal recopié ? Comment partager 1 071 mangues et 462 oranges en paniers identiques, sans reste ? L’**arithmétique**, la science des nombres entiers, répond à ces trois questions.',
  objectives: [
    'utiliser la division euclidienne et les congruences ;',
    'calculer un PGCD avec l’algorithme d’Euclide, et un PPCM ;',
    'appliquer les théorèmes de Bézout et de Gauss ;',
    'résoudre une équation du type $ax + by = c$ dans $\\mathbb{Z}$.',
  ],
  sections: [
    {
      title: 'Division euclidienne et congruences',
      blocks: [
        {
          kind: 'rule',
          text: 'Pour tout entier $a$ et tout entier $b > 0$, il existe un unique couple $(q, r)$ d’entiers tel que $a = bq + r$ et $0 \\leq r < b$ : $q$ est le quotient, $r$ le reste.',
        },
        {
          kind: 'definition',
          term: 'Congruence',
          text: '$a \\equiv b\\ [n]$ (« $a$ est congru à $b$ modulo $n$ ») si $a$ et $b$ ont le même reste dans la division par $n$, c’est-à-dire si $n$ divise $a - b$.',
        },
        {
          kind: 'rule',
          text: 'Les congruences modulo $n$ se conservent par addition, multiplication et puissance : si $a \\equiv b\\ [n]$, alors $a + c \\equiv b + c$, $ac \\equiv bc$ et $a^k \\equiv b^k\\ [n]$.',
        },
        {
          kind: 'example',
          title: 'le reste de $7^{100}$ dans la division par 5',
          text: '$7 \\equiv 2\\ [5]$.',
          steps: ['$2^4 = 16 \\equiv 1\\ [5]$.', '$7^{100} \\equiv 2^{100} = (2^4)^{25} \\equiv 1^{25} = 1\\ [5]$ : le reste est 1.'],
        },
      ],
    },
    {
      title: 'PGCD, PPCM et algorithme d’Euclide',
      blocks: [
        {
          kind: 'rule',
          text: '**Algorithme d’Euclide** : si $a = bq + r$, alors $\\text{PGCD}(a, b) = \\text{PGCD}(b, r)$. On recommence jusqu’à un reste nul : le PGCD est le dernier reste non nul.',
        },
        {
          kind: 'example',
          title: 'PGCD(1 071 ; 462)',
          text: 'On divise successivement.',
          steps: ['$1\\,071 = 462 \\times 2 + 147$', '$462 = 147 \\times 3 + 21$', '$147 = 21 \\times 7 + 0$ : $\\text{PGCD} = 21$.'],
        },
        {
          kind: 'formula',
          tex: '\\text{PGCD}(a, b) \\times \\text{PPCM}(a, b) = a \\times b \\quad (a, b > 0)',
        },
        {
          kind: 'definition',
          term: 'Nombres premiers entre eux',
          text: '$a$ et $b$ sont premiers entre eux si $\\text{PGCD}(a, b) = 1$.',
        },
      ],
    },
    {
      title: 'Bézout et Gauss',
      blocks: [
        {
          kind: 'rule',
          text: '**Théorème de Bézout** : $a$ et $b$ sont premiers entre eux si et seulement s’il existe des entiers $u$ et $v$ tels que $au + bv = 1$.',
        },
        {
          kind: 'rule',
          text: '**Théorème de Gauss** : si $a$ divise $bc$ et si $a$ est premier avec $b$, alors $a$ divise $c$.',
        },
        {
          kind: 'callout',
          variant: 'methode',
          title: 'Résoudre $ax + by = c$',
          blocks: [
            {
              kind: 'list',
              items: [
                'il y a des solutions si et seulement si $\\text{PGCD}(a, b)$ divise $c$ ;',
                'trouver une solution particulière $(x_0, y_0)$, souvent en remontant l’algorithme d’Euclide ;',
                'soustraire : $a(x - x_0) = -b(y - y_0)$, puis appliquer Gauss ;',
                'pour $a$ et $b$ premiers entre eux : $x = x_0 + bk$, $y = y_0 - ak$, $k \\in \\mathbb{Z}$.',
              ],
            },
          ],
        },
        {
          kind: 'example',
          title: '$17x + 5y = 1$',
          text: '17 et 5 sont premiers entre eux.',
          steps: ['$17 \\times (-2) + 5 \\times 7 = -34 + 35 = 1$ : $(x_0, y_0) = (-2, 7)$.', 'Solutions : $x = -2 + 5k$, $y = 7 - 17k$, $k \\in \\mathbb{Z}$.'],
        },
      ],
    },
  ],
  essentials: [
    '$a = bq + r$ avec $0 \\leq r < b$ ; $a \\equiv b\\ [n]$ si $n$ divise $a - b$.',
    'Congruences compatibles avec $+$, $\\times$ et les puissances.',
    'PGCD : dernier reste non nul de l’algorithme d’Euclide ; $\\text{PGCD} \\times \\text{PPCM} = ab$.',
    'Bézout : $\\text{PGCD}(a, b) = 1 \\iff au + bv = 1$ ; Gauss : $a \\mid bc$ et $a \\wedge b = 1 \\Rightarrow a \\mid c$.',
  ],
  exercises: [
    {
      id: 'arith-euclide',
      level: 1,
      title: 'PGCD et PPCM',
      statement: 'On considère $a = 1\\,071$ et $b = 462$.',
      parts: [
        {
          label: 'Calcule $\\text{PGCD}(a, b)$.',
          answer: { kind: 'number', value: 21, tolerance: 0, unit: '' },
          steps: ['$1\\,071 = 2 \\times 462 + 147$ ; $462 = 3 \\times 147 + 21$ ; $147 = 7 \\times 21$.', 'PGCD = 21.'],
        },
        {
          label: 'Calcule $\\text{PPCM}(a, b)$.',
          answer: { kind: 'number', value: 23562, tolerance: 0, unit: '' },
          steps: ['$\\text{PPCM} = \\dfrac{1\\,071 \\times 462}{21} = 23\\,562$.'],
        },
        {
          label: 'Combien de paniers identiques peut-on faire au maximum avec 1 071 mangues et 462 oranges, sans reste ?',
          answer: { kind: 'number', value: 21, tolerance: 0, unit: 'paniers' },
          steps: ['Le nombre de paniers doit diviser 1 071 et 462 : au maximum PGCD = 21 paniers, de 51 mangues et 22 oranges.'],
        },
      ],
    },
    {
      id: 'arith-congruence',
      level: 2,
      title: 'Restes de puissances',
      statement: 'On étudie les restes de $7^n$ et de $3^n$.',
      parts: [
        {
          label: 'Quel est le reste de $7^{100}$ dans la division par 5 ?',
          answer: { kind: 'number', value: 1, tolerance: 0, unit: '' },
          steps: ['$7 \\equiv 2\\ [5]$ et $2^4 \\equiv 1\\ [5]$.', '$7^{100} \\equiv (2^4)^{25} \\equiv 1\\ [5]$.'],
        },
        {
          label: 'Quel est le reste de $3^{2027}$ dans la division par 4 ?',
          answer: { kind: 'number', value: 3, tolerance: 0, unit: '' },
          steps: ['$3 \\equiv -1\\ [4]$, donc $3^{2027} \\equiv (-1)^{2027} = -1 \\equiv 3\\ [4]$.'],
        },
      ],
    },
    {
      id: 'arith-bezout',
      level: 3,
      title: 'Une équation diophantienne',
      statement: 'On résout dans $\\mathbb{Z}^2$ l’équation $17x + 5y = 3$.',
      parts: [
        {
          label: 'Vérifie que $(-2, 7)$ est solution de $17x + 5y = 1$ : en déduire une solution $(x_0, y_0)$ de $17x + 5y = 3$. Donne $x_0$.',
          answer: { kind: 'number', value: -6, tolerance: 0, unit: '' },
          steps: ['$17 \\times (-2) + 5 \\times 7 = 1$ ; en multipliant par 3 : $(x_0, y_0) = (-6, 21)$.'],
        },
        {
          label: 'Donne $y_0$.',
          answer: { kind: 'number', value: 21, tolerance: 0, unit: '' },
          steps: ['$17 \\times (-6) + 5 \\times 21 = -102 + 105 = 3$.'],
        },
        {
          label: 'Les solutions sont $x = -6 + 5k$, $y = 21 - 17k$ ($k \\in \\mathbb{Z}$). Que vaut $y$ pour $k = 1$ ?',
          answer: { kind: 'number', value: 4, tolerance: 0, unit: '' },
          steps: [
            'En soustrayant $17x_0 + 5y_0 = 3$ : $17(x + 6) = 5(21 - y)$ ; 5 divise $17(x + 6)$ et est premier avec 17, donc (Gauss) 5 divise $x + 6$.',
            'Pour $k = 1$ : $x = -1$ et $y = 4$. Vérification : $17 \\times (-1) + 5 \\times 4 = 3$.',
          ],
          result: '(x, y) = (-1, 4)',
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Le reste de la division euclidienne de −7 par 3 est :',
      choices: ['2', '−1', '1', '−7'],
      answer: 0,
      explanation: '$-7 = 3 \\times (-3) + 2$ avec $0 \\leq 2 < 3$.',
    },
    {
      question: '$25 \\equiv\\ ?\\ [7]$',
      choices: ['4', '3', '18', '25 n’est congru à rien'],
      answer: 0,
      explanation: '$25 = 3 \\times 7 + 4$.',
    },
    {
      question: 'Si $\\text{PGCD}(a, b) = 6$ et $ab = 432$, alors $\\text{PPCM}(a, b)$ vaut :',
      choices: ['72', '2 592', '426', '6'],
      answer: 0,
      explanation: '$\\text{PPCM} = \\dfrac{432}{6} = 72$.',
    },
    {
      question: 'L’équation $6x + 9y = 4$ :',
      choices: ['n’a pas de solution entière', 'a une infinité de solutions', 'a une seule solution', 'a pour solution (1, 0)'],
      answer: 0,
      explanation: '$\\text{PGCD}(6, 9) = 3$ ne divise pas 4.',
    },
  ],
  applications: [
    {
      title: 'Le jour du grand marché',
      tagline: 'Quel jour serons-nous dans 100 jours ?',
      situation:
        'Aujourd’hui est un lundi. La foire annuelle du village aura lieu dans 100 jours. Les jours de la semaine reviennent tous les 7 jours.',
      model: 'On numérote lundi = 0, mardi = 1, …, dimanche = 6 et l’on calcule modulo 7.',
      questions: ['Quel est le reste de 100 dans la division par 7 ?', 'Quel jour aura lieu la foire ?'],
      check: { value: 2, tolerance: 0, unit: '' },
      solution: ['$100 = 7 \\times 14 + 2$, donc $100 \\equiv 2\\ [7]$.', 'Lundi + 2 jours : la foire aura lieu un **mercredi**.'],
      fact: 'Les numéros de compte bancaire et les codes-barres contiennent une « clé » calculée avec des congruences : une erreur de frappe change la clé et est aussitôt repérée.',
    },
  ],
};
