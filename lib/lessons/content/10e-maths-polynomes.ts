import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Le vol d’un ballon de football, l’aire d’un champ, le bénéfice d’une boutique : beaucoup de situations se décrivent par des **polynômes**. Les mettre sous la bonne forme (développée, factorisée, canonique) permet de lire immédiatement le sommet ou les zéros.',
  objectives: [
    'reconnaître un polynôme et son degré ;',
    'écrire un trinôme sous forme canonique ;',
    'factoriser un polynôme connaissant une racine (division, schéma de Hörner) ;',
    'étudier le signe d’une fonction rationnelle simple.',
  ],
  sections: [
    {
      title: 'Polynômes et forme canonique',
      blocks: [
        {
          kind: 'definition',
          term: 'Polynôme',
          text: 'fonction de la forme $P(x) = a_n x^n + \\dots + a_1 x + a_0$ ; si $a_n \\ne 0$, $n$ est son **degré**. Un polynôme de degré 2 est un **trinôme**.',
        },
        {
          kind: 'formula',
          tex: 'ax^2 + bx + c = a\\left(x + \\dfrac{b}{2a}\\right)^2 - \\dfrac{\\Delta}{4a} \\qquad \\Delta = b^2 - 4ac',
          legend: ['forme canonique ; le sommet de la parabole a pour coordonnées $\\left(-\\dfrac{b}{2a}\\,;\\,-\\dfrac{\\Delta}{4a}\\right)$'],
        },
        {
          kind: 'example',
          title: 'forme canonique',
          text: '$P(x) = x^2 - 6x + 5$.',
          steps: ['$x^2 - 6x + 5 = (x - 3)^2 - 9 + 5 = (x - 3)^2 - 4$.', 'Sommet $(3\\,;\\,-4)$ ; et $(x - 3)^2 - 4 = (x - 1)(x - 5)$.'],
        },
      ],
    },
    {
      title: 'Factoriser avec une racine',
      blocks: [
        {
          kind: 'rule',
          text: 'Si $P(\\alpha) = 0$, alors $P(x)$ est divisible par $(x - \\alpha)$ : $P(x) = (x - \\alpha)\\,Q(x)$, avec $Q$ de degré un de moins.',
        },
        {
          kind: 'example',
          title: 'le schéma de Hörner',
          text: '$P(x) = x^3 - 2x^2 - 5x + 6$. On remarque $P(1) = 0$.',
          steps: [
            'Coefficients : 1, −2, −5, 6. On abaisse 1 ; $1 \\times 1 - 2 = -1$ ; $-1 \\times 1 - 5 = -6$ ; $-6 \\times 1 + 6 = 0$.',
            '$Q(x) = x^2 - x - 6 = (x - 3)(x + 2)$, donc $P(x) = (x - 1)(x - 3)(x + 2)$.',
          ],
        },
      ],
    },
    {
      title: 'Fonctions rationnelles',
      blocks: [
        {
          kind: 'text',
          text: 'Une fonction rationnelle est un quotient de deux polynômes $\\dfrac{P(x)}{Q(x)}$, définie là où $Q(x) \\ne 0$. On étudie son signe dans un **tableau de signes** : chaque facteur change de signe en sa racine.',
        },
      ],
    },
  ],
  essentials: [
    'Δ = b² − 4ac ; forme canonique a(x + b/2a)² − Δ/4a.',
    'Si P(α) = 0, P(x) = (x − α) Q(x).',
    'Le schéma de Hörner donne Q rapidement.',
    'Signe d’un quotient : tableau de signes, valeurs interdites exclues.',
  ],
  simulationTasks: [
    'en mode second degré, règle a = 1, b = −6, c = 5 : lis le sommet et les racines ;',
    'change le signe de a : que devient la parabole ?',
  ],
  exercises: [
    {
      id: 'po-canonique',
      level: 1,
      title: 'Le sommet d’une parabole',
      statement: 'Soit $P(x) = 2x^2 - 8x + 3$.',
      parts: [
        {
          label: 'Abscisse du sommet.',
          answer: { kind: 'number', value: 2, tolerance: 0, unit: '' },
          steps: ['$-\\dfrac{b}{2a} = \\dfrac{8}{4} = 2$.'],
        },
        {
          label: 'Ordonnée du sommet (valeur minimale de P).',
          answer: { kind: 'number', value: -5, tolerance: 0, unit: '' },
          steps: ['$P(2) = 8 - 16 + 3 = -5$.'],
        },
      ],
    },
    {
      id: 'po-horner',
      level: 2,
      title: 'Factoriser un polynôme de degré 3',
      statement: '$P(x) = x^3 + 2x^2 - x - 2$. On vérifie que $P(1) = 0$ et on écrit $P(x) = (x - 1)(x^2 + bx + c)$.',
      parts: [
        {
          label: 'Valeur de b.',
          answer: { kind: 'number', value: 3, tolerance: 0, unit: '' },
          steps: ['Hörner : 1 ; $1 + 2 = 3$ ; $3 - 1 = 2$ ; $2 - 2 = 0$. Donc $Q(x) = x^2 + 3x + 2$.'],
        },
        {
          label: 'Valeur de c.',
          answer: { kind: 'number', value: 2, tolerance: 0, unit: '' },
          steps: ['$Q(x) = x^2 + 3x + 2 = (x + 1)(x + 2)$, donc $P(x) = (x - 1)(x + 1)(x + 2)$.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Le degré de $3x^4 - x + 7$ est :',
      choices: ['4', '3', '7', '1'],
      answer: 0,
      explanation: 'C’est la plus grande puissance de x.',
    },
    {
      question: 'Si $P(2) = 0$, alors P est divisible par :',
      choices: ['$x - 2$', '$x + 2$', '$2x$', '$x^2$'],
      answer: 0,
      explanation: '2 est une racine de P.',
    },
    {
      question: 'La forme canonique de $x^2 + 4x$ est :',
      choices: ['$(x + 2)^2 - 4$', '$(x + 4)^2$', '$(x + 2)^2 + 4$', '$(x - 2)^2 - 4$'],
      answer: 0,
      explanation: '(x + 2)² = x² + 4x + 4.',
    },
    {
      question: 'Pour $a < 0$, la parabole $y = ax^2 + bx + c$ est tournée :',
      choices: ['vers le bas', 'vers le haut', 'vers la droite', 'cela dépend de c'],
      answer: 0,
      explanation: 'Le sommet est alors un maximum.',
    },
  ],
  applications: [
    {
      title: 'Le bénéfice de la boutique de jus',
      tagline: 'À quel prix vendre le jus de bissap ?',
      situation:
        'Une jeune entrepreneure vend du jus de bissap. Si elle vend la bouteille à x centaines de FCFA, son bénéfice journalier, en milliers de FCFA, est $B(x) = -2x^2 + 16x - 14$.',
      model: 'Le bénéfice est maximal au sommet de la parabole, en $x = -\\dfrac{b}{2a}$.',
      questions: ['À quel prix (en FCFA) le bénéfice est-il maximal ?', 'Quel est ce bénéfice maximal, en milliers de FCFA ?'],
      check: { value: 400, tolerance: 0.01, unit: 'FCFA' },
      solution: ['$x = \\dfrac{-16}{-4} = 4$ centaines, soit 400 FCFA.', '$B(4) = -32 + 64 - 14 = 18$ milliers de FCFA.'],
      fact: 'Trop cher, on vend peu ; trop bon marché, on gagne peu par bouteille : le sommet de la parabole donne le juste prix.',
    },
  ],
};
