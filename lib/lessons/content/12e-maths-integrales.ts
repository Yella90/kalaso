import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Le géomètre du cadastre doit mesurer un champ bordé d’un côté par une route droite et de l’autre par le marigot, tout en courbes. Aucune formule de rectangle ou de triangle ne convient. Le **calcul intégral** permet de mesurer l’aire sous une courbe, mais aussi une distance parcourue à partir d’une vitesse, ou une valeur moyenne.',
  objectives: [
    'calculer une intégrale à l’aide d’une primitive ;',
    'utiliser les propriétés de l’intégrale (linéarité, Chasles, positivité) ;',
    'intégrer par parties ;',
    'calculer une aire et une valeur moyenne.',
  ],
  sections: [
    {
      title: 'Primitives et intégrale',
      blocks: [
        {
          kind: 'definition',
          term: 'Primitive',
          text: '$F$ est une primitive de $f$ sur $I$ si $F\' = f$ sur $I$. Deux primitives d’une même fonction diffèrent d’une constante.',
        },
        {
          kind: 'table',
          head: ['$f(x)$', 'une primitive $F(x)$'],
          rows: [
            ['$x^n$ ($n \\neq -1$)', '$\\dfrac{x^{n+1}}{n + 1}$'],
            ['$\\dfrac{1}{x}$ ($x > 0$)', '$\\ln x$'],
            ['$e^{ax}$', '$\\dfrac{1}{a}e^{ax}$'],
            ['$\\cos(ax + b)$', '$\\dfrac{1}{a}\\sin(ax + b)$'],
            ['$u\'u^n$', '$\\dfrac{u^{n+1}}{n + 1}$'],
            ['$\\dfrac{u\'}{u}$ ($u > 0$)', '$\\ln u$'],
          ],
        },
        {
          kind: 'formula',
          label: 'Intégrale',
          tex: '\\int_a^b f(x)\\,\\mathrm{d}x = F(b) - F(a) = \\Big[F(x)\\Big]_a^b',
        },
        {
          kind: 'example',
          title: '$\\int_0^2 (3x^2 + 1)\\,\\mathrm{d}x$',
          text: 'Une primitive est $F(x) = x^3 + x$.',
          steps: ['$F(2) - F(0) = (8 + 2) - 0 = 10$.'],
        },
      ],
    },
    {
      title: 'Propriétés',
      blocks: [
        {
          kind: 'list',
          items: [
            '**linéarité** : $\\int_a^b (\\alpha f + \\beta g) = \\alpha\\int_a^b f + \\beta\\int_a^b g$ ;',
            '**relation de Chasles** : $\\int_a^c f = \\int_a^b f + \\int_b^c f$ ;',
            '**positivité** : si $f \\geq 0$ sur $[a, b]$ ($a \\leq b$), alors $\\int_a^b f \\geq 0$ ; si $f \\leq g$, alors $\\int_a^b f \\leq \\int_a^b g$ ;',
            '**valeur moyenne** de $f$ sur $[a, b]$ : $\\mu = \\dfrac{1}{b - a}\\int_a^b f(x)\\,\\mathrm{d}x$.',
          ],
        },
        {
          kind: 'formula',
          label: 'Intégration par parties',
          tex: '\\int_a^b u(x)v\'(x)\\,\\mathrm{d}x = \\Big[u(x)v(x)\\Big]_a^b - \\int_a^b u\'(x)v(x)\\,\\mathrm{d}x',
        },
        {
          kind: 'example',
          title: '$\\int_0^1 x\\,e^x\\,\\mathrm{d}x$',
          text: 'On pose $u = x$ (donc $u\' = 1$) et $v\' = e^x$ (donc $v = e^x$).',
          steps: ['$\\int_0^1 xe^x\\,\\mathrm{d}x = \\big[xe^x\\big]_0^1 - \\int_0^1 e^x\\,\\mathrm{d}x = e - (e - 1) = 1$.'],
        },
        {
          kind: 'callout',
          variant: 'methode',
          blocks: [
            {
              kind: 'text',
              text: 'Pour une intégration par parties, on choisit pour $u$ la fonction qui se simplifie en la dérivant (un polynôme, $\\ln x$…) et pour $v\'$ celle dont on connaît une primitive ($e^x$, $\\cos x$…).',
            },
          ],
        },
      ],
    },
    {
      title: 'Calculer une aire',
      blocks: [
        {
          kind: 'rule',
          text: 'Si $f \\geq 0$ sur $[a, b]$, l’aire du domaine compris entre la courbe, l’axe des abscisses et les droites $x = a$ et $x = b$ vaut $\\int_a^b f(x)\\,\\mathrm{d}x$ **unités d’aire**. Entre deux courbes, avec $g \\leq f$ : $\\int_a^b [f(x) - g(x)]\\,\\mathrm{d}x$.',
        },
        {
          kind: 'example',
          title: 'entre $y = x$ et $y = x^2$',
          text: 'Sur $[0, 1]$, $x^2 \\leq x$.',
          steps: ['$\\mathcal{A} = \\int_0^1 (x - x^2)\\,\\mathrm{d}x = \\dfrac{1}{2} - \\dfrac{1}{3} = \\dfrac{1}{6}$ u.a.'],
        },
        {
          kind: 'trap',
          wrong: '« L’aire entre la courbe et l’axe vaut toujours $\\int_a^b f$. »',
          why: 'Là où $f$ est négative, l’intégrale compte l’aire avec un signe moins.',
          reflex: 'Étudier le signe de $f$ et découper l’intervalle (Chasles) ; l’unité d’aire est celle du repère.',
        },
      ],
    },
  ],
  essentials: [
    '$\\int_a^b f = F(b) - F(a)$, où $F$ est une primitive de $f$.',
    'Linéarité, Chasles, positivité ; valeur moyenne $\\mu = \\frac{1}{b - a}\\int_a^b f$.',
    'IPP : $\\int uv\' = [uv] - \\int u\'v$.',
    'Aire (si $f \\geq 0$) : $\\int_a^b f$ ; entre deux courbes : $\\int_a^b (f - g)$.',
  ],
  exercises: [
    {
      id: 'int-calculs',
      level: 1,
      title: 'Intégrales directes',
      statement: 'Calcule les intégrales suivantes.',
      parts: [
        {
          label: '$I = \\int_0^2 (3x^2 + 1)\\,\\mathrm{d}x$',
          answer: { kind: 'number', value: 10, tolerance: 0.001, unit: '' },
          steps: ['$\\big[x^3 + x\\big]_0^2 = 10$.'],
        },
        {
          label: '$J = \\int_1^e \\dfrac{1}{x}\\,\\mathrm{d}x$',
          answer: { kind: 'number', value: 1, tolerance: 0.001, unit: '' },
          steps: ['$\\big[\\ln x\\big]_1^e = 1 - 0 = 1$.'],
        },
        {
          label: '$K = \\int_0^{\\pi/2} \\cos x\\,\\mathrm{d}x$',
          answer: { kind: 'number', value: 1, tolerance: 0.001, unit: '' },
          steps: ['$\\big[\\sin x\\big]_0^{\\pi/2} = 1$.'],
        },
      ],
    },
    {
      id: 'int-ipp',
      level: 2,
      title: 'Intégration par parties',
      statement: 'Calcule à l’aide d’intégrations par parties.',
      parts: [
        {
          label: '$\\int_0^1 x\\,e^x\\,\\mathrm{d}x$',
          answer: { kind: 'number', value: 1, tolerance: 0.001, unit: '' },
          steps: ['$u = x$, $v\' = e^x$ : $[xe^x]_0^1 - \\int_0^1 e^x\\,\\mathrm{d}x = e - (e - 1) = 1$.'],
        },
        {
          label: '$\\int_1^e \\ln x\\,\\mathrm{d}x$',
          answer: { kind: 'number', value: 1, tolerance: 0.001, unit: '' },
          steps: ['$u = \\ln x$, $v\' = 1$ : $[x\\ln x]_1^e - \\int_1^e 1\\,\\mathrm{d}x = e - (e - 1) = 1$.'],
        },
        {
          label: '$\\int_0^{\\pi} x\\sin x\\,\\mathrm{d}x$ (valeur approchée)',
          answer: { kind: 'number', value: 3.1416, tolerance: 0.005, unit: '' },
          steps: ['$u = x$, $v\' = \\sin x$, $v = -\\cos x$ : $[-x\\cos x]_0^{\\pi} + \\int_0^{\\pi}\\cos x\\,\\mathrm{d}x = \\pi + 0 = \\pi$.'],
          result: '\\int_0^{\\pi} x\\sin x\\,\\mathrm{d}x = \\pi',
        },
      ],
    },
    {
      id: 'int-aire',
      level: 3,
      title: 'Aire entre deux courbes',
      statement: 'Dans un repère orthonormé d’unité 2 cm, on considère les courbes de $f(x) = x$ et $g(x) = x^2$.',
      parts: [
        {
          label: 'En quelles abscisses les courbes se coupent-elles ? Donne la plus grande.',
          answer: { kind: 'number', value: 1, tolerance: 0.001, unit: '' },
          steps: ['$x = x^2 \\iff x(x - 1) = 0$ : en 0 et en 1.'],
        },
        {
          label: 'Calcule l’aire comprise entre les deux courbes, en unités d’aire (valeur approchée).',
          answer: { kind: 'number', value: 0.1667, tolerance: 0.002, unit: 'u.a.' },
          steps: ['Sur $[0, 1]$, $x^2 \\leq x$ : $\\mathcal{A} = \\int_0^1 (x - x^2)\\,\\mathrm{d}x = \\dfrac{1}{2} - \\dfrac{1}{3} = \\dfrac{1}{6}$ u.a.'],
          result: '\\mathcal{A} = \\dfrac{1}{6}\\ \\text{u.a.}',
        },
        {
          label: 'Convertis cette aire en cm² (valeur approchée).',
          answer: { kind: 'number', value: 0.667, tolerance: 0.005, unit: 'cm²' },
          steps: ['1 u.a. $= 2 \\times 2 = 4$ cm² : $\\mathcal{A} = \\dfrac{4}{6} \\approx 0{,}67$ cm².'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Une primitive de $x^3$ est :',
      choices: ['$\\dfrac{x^4}{4}$', '$3x^2$', '$x^4$', '$\\dfrac{x^3}{3}$'],
      answer: 0,
      explanation: 'On vérifie en dérivant : $\\left(\\dfrac{x^4}{4}\\right)\' = x^3$.',
    },
    {
      question: '$\\int_a^a f(x)\\,\\mathrm{d}x$ vaut :',
      choices: ['0', '$f(a)$', '$2f(a)$', 'on ne peut pas savoir'],
      answer: 0,
      explanation: '$F(a) - F(a) = 0$.',
    },
    {
      question: 'Si $\\int_0^2 f = 3$ et $\\int_2^5 f = 4$, alors $\\int_0^5 f$ vaut :',
      choices: ['7', '1', '12', '−1'],
      answer: 0,
      explanation: 'Relation de Chasles : $3 + 4 = 7$.',
    },
    {
      question: 'La valeur moyenne de $f(x) = 2x$ sur $[0, 3]$ vaut :',
      choices: ['3', '9', '6', '1'],
      answer: 0,
      explanation: '$\\dfrac{1}{3}\\int_0^3 2x\\,\\mathrm{d}x = \\dfrac{1}{3} \\times 9 = 3$.',
    },
  ],
  applications: [
    {
      title: 'Le champ au bord du marigot',
      tagline: 'Mesurer une parcelle dont un côté est courbe',
      situation:
        'Un champ est limité par une route droite (l’axe des abscisses), deux pistes perpendiculaires ($x = 0$ et $x = 10$) et la berge d’un marigot, d’équation $y = 2 + 0{,}06x^2$. Les longueurs sont en hectomètres (1 hm = 100 m).',
      model: 'La berge est modélisée par une parabole ; une unité d’aire vaut 1 hm², soit 1 hectare.',
      questions: ['Calcule l’aire du champ, en hectares.'],
      check: { value: 40, tolerance: 0.02, unit: 'ha' },
      solution: ['$\\mathcal{A} = \\int_0^{10} (2 + 0{,}06x^2)\\,\\mathrm{d}x = \\big[2x + 0{,}02x^3\\big]_0^{10}$.', '$= 20 + 20 = 40$ hm², soit 40 hectares.'],
      fact: 'Les géomètres découpent souvent une parcelle courbe en bandes étroites dont ils additionnent les aires : c’est exactement l’idée de l’intégrale.',
    },
  ],
};
