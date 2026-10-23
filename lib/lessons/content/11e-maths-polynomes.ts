import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Un menuisier découpe des carrés aux quatre coins d’une plaque de carton pour fabriquer une boîte sans couvercle : son volume dépend de la taille des carrés selon une expression du troisième degré. Pour trouver les tailles qui donnent un volume voulu, il faut résoudre une équation polynomiale, et donc savoir **factoriser** un polynôme.',
  objectives: [
    'reconnaître un polynôme, son degré et ses coefficients ;',
    'factoriser un polynôme connaissant une racine ;',
    'effectuer une division euclidienne de polynômes ;',
    'étudier le signe d’un polynôme et l’ensemble de définition d’une fraction rationnelle.',
  ],
  sections: [
    {
      title: 'Polynômes et racines',
      blocks: [
        {
          kind: 'definition',
          term: 'Polynôme',
          text: 'fonction de la forme $P(x) = a_nx^n + a_{n-1}x^{n-1} + \\dots + a_1x + a_0$ avec $a_n \\neq 0$ ; $n$ est son **degré**. Un réel $a$ tel que $P(a) = 0$ est une **racine** (ou un zéro) de $P$.',
        },
        {
          kind: 'rule',
          text: 'Si $a$ est une racine de $P$, alors $P(x)$ se factorise par $(x - a)$ : $P(x) = (x - a)\\,Q(x)$, où $Q$ est de degré $n - 1$.',
        },
        {
          kind: 'example',
          title: '$P(x) = x^3 - 6x^2 + 11x - 6$',
          text: '$P(1) = 1 - 6 + 11 - 6 = 0$ : 1 est racine.',
          steps: [
            'On cherche $Q(x) = x^2 + bx + c$ tel que $P(x) = (x - 1)(x^2 + bx + c)$ ; par identification, $Q(x) = x^2 - 5x + 6$.',
            '$Q$ a pour racines 2 et 3 : $P(x) = (x - 1)(x - 2)(x - 3)$.',
          ],
        },
      ],
    },
    {
      title: 'Division euclidienne et trinôme',
      blocks: [
        {
          kind: 'rule',
          text: 'Pour deux polynômes $A$ et $B$ ($B \\neq 0$), il existe un unique couple $(Q, R)$ tel que $A = BQ + R$, avec $R = 0$ ou $\\deg R < \\deg B$. On l’obtient en posant la division comme pour les nombres.',
        },
        {
          kind: 'formula',
          label: 'Trinôme $ax^2 + bx + c$',
          tex: '\\Delta = b^2 - 4ac \\qquad \\Delta > 0 : x_{1,2} = \\dfrac{-b \\pm \\sqrt{\\Delta}}{2a} \\quad ax^2 + bx + c = a(x - x_1)(x - x_2)',
        },
        {
          kind: 'rule',
          text: 'Un trinôme est du signe de $a$ à l’extérieur de ses racines, et du signe contraire entre ses racines. Pour un polynôme factorisé, on fait un **tableau de signes**.',
        },
        {
          kind: 'trap',
          wrong: '« La fraction $\\dfrac{x^2 - 1}{x - 1}$ est égale à $x + 1$ partout. »',
          why: 'Elle n’est pas définie en $x = 1$.',
          reflex: 'Toujours donner l’ensemble de définition avant de simplifier une fraction rationnelle.',
        },
      ],
    },
  ],
  essentials: [
    'Racine $a$ ⇒ $P(x) = (x - a)Q(x)$.',
    'Division euclidienne : $A = BQ + R$ avec $\\deg R < \\deg B$.',
    'Trinôme : $\\Delta$, racines, factorisation ; signe de $a$ hors des racines.',
    'Fraction rationnelle : exclure les valeurs qui annulent le dénominateur.',
  ],
  exercises: [
    {
      id: 'poly-factoriser',
      level: 1,
      title: 'Factoriser',
      statement: '$P(x) = x^3 - 6x^2 + 11x - 6$.',
      parts: [
        {
          label: 'Calcule $P(2)$.',
          answer: { kind: 'number', value: 0, tolerance: 0, unit: '' },
          steps: ['$8 - 24 + 22 - 6 = 0$ : 2 est aussi une racine.'],
        },
        {
          label: 'Quelle est la plus grande racine de $P$ ?',
          answer: { kind: 'number', value: 3, tolerance: 0, unit: '' },
          steps: ['$P(x) = (x - 1)(x - 2)(x - 3)$.'],
        },
        {
          label: 'Pour combien de valeurs entières de $x$ entre 0 et 4 (inclus) a-t-on $P(x) = 0$ ?',
          answer: { kind: 'number', value: 3, tolerance: 0, unit: '' },
          steps: ['1, 2 et 3.'],
        },
      ],
    },
    {
      id: 'poly-trinome',
      level: 2,
      title: 'Un trinôme',
      statement: '$T(x) = 2x^2 - 3x - 2$.',
      parts: [
        {
          label: 'Calcule le discriminant.',
          answer: { kind: 'number', value: 25, tolerance: 0, unit: '' },
          steps: ['$9 + 16 = 25$.'],
        },
        {
          label: 'Donne la racine négative.',
          answer: { kind: 'number', value: -0.5, tolerance: 0.001, unit: '' },
          steps: ['$x = \\dfrac{3 \\pm 5}{4}$ : $2$ et $-\\dfrac{1}{2}$.', '$T(x) = 2(x - 2)\\left(x + \\dfrac{1}{2}\\right) = (x - 2)(2x + 1)$.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Le degré de $3x^4 - x + 7$ est :',
      choices: ['4', '3', '7', '1'],
      answer: 0,
      explanation: 'La plus grande puissance de $x$.',
    },
    {
      question: 'Si $P(-2) = 0$, alors $P(x)$ est divisible par :',
      choices: ['$x + 2$', '$x - 2$', '$x$', '$2x$'],
      answer: 0,
      explanation: '$x - (-2) = x + 2$.',
    },
    {
      question: '$x^2 - 5x + 6$ est négatif pour :',
      choices: ['$2 < x < 3$', '$x < 2$', '$x > 3$', 'aucun $x$'],
      answer: 0,
      explanation: '$a > 0$ : négatif entre les racines 2 et 3.',
    },
    {
      question: 'La fraction $\\dfrac{x + 1}{x^2 - 4}$ n’est pas définie en :',
      choices: ['$-2$ et $2$', '$-1$', '$4$', '$0$'],
      answer: 0,
      explanation: '$x^2 - 4 = 0$ pour $x = \\pm 2$.',
    },
  ],
  applications: [
    {
      title: 'La boîte en carton',
      tagline: 'Quel volume selon la découpe ?',
      situation:
        'Dans une plaque de carton de 30 cm sur 20 cm, on découpe un carré de côté $x$ cm à chaque coin, puis on relève les bords pour former une boîte sans couvercle.',
      model: 'Le volume est $V(x) = x(30 - 2x)(20 - 2x)$, pour $0 < x < 10$.',
      questions: ['Quel est le volume de la boîte pour $x = 3$ cm, en cm³ ?'],
      check: { value: 1008, tolerance: 0.01, unit: 'cm³' },
      solution: ['$V(3) = 3 \\times 24 \\times 14 = 1\\,008$ cm³, soit environ 1 litre.', 'En développant, $V(x) = 4x^3 - 100x^2 + 600x$ : un polynôme de degré 3.'],
    },
  ],
};
