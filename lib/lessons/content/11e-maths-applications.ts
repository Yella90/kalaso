import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Au lycée, chaque élève reçoit un numéro matricule : deux élèves n’ont jamais le même. Chaque élève a une date de naissance, mais plusieurs peuvent être nés le même jour. Ces deux façons d’associer des éléments sont des **applications**, et leurs propriétés (injective, surjective, bijective) servent partout en mathématiques.',
  objectives: [
    'définir une application, une image et un antécédent ;',
    'reconnaître une application injective, surjective, bijective ;',
    'déterminer la réciproque d’une bijection ;',
    'composer deux applications et dénombrer des applications.',
  ],
  sections: [
    {
      title: 'Applications',
      blocks: [
        {
          kind: 'definition',
          term: 'Application',
          text: 'une application $f$ d’un ensemble $E$ vers un ensemble $F$ associe à **chaque** élément $x$ de $E$ **un seul** élément $f(x)$ de $F$, son **image**. Si $f(x) = y$, $x$ est un **antécédent** de $y$.',
        },
        {
          kind: 'table',
          head: ['Propriété', 'Définition', 'En pratique'],
          rows: [
            ['injective', 'deux éléments distincts ont des images distinctes', 'tout $y$ a **au plus** un antécédent'],
            ['surjective', 'tout élément de $F$ est l’image d’au moins un élément', 'tout $y$ a **au moins** un antécédent'],
            ['bijective', 'injective et surjective', 'tout $y$ a **exactement** un antécédent'],
          ],
        },
        {
          kind: 'callout',
          variant: 'methode',
          title: 'Étudier $f : \\mathbb{R} \\to \\mathbb{R}$',
          blocks: [
            {
              kind: 'text',
              text: 'On résout $f(x) = y$ pour un $y$ quelconque : si l’équation a toujours une solution unique, $f$ est bijective, et cette solution donne la réciproque $f^{-1}(y)$.',
            },
          ],
        },
        {
          kind: 'example',
          title: '$f(x) = 2x + 3$',
          text: 'On résout $2x + 3 = y$.',
          steps: ['$x = \\dfrac{y - 3}{2}$ : une solution unique pour tout réel $y$.', '$f$ est bijective et $f^{-1}(y) = \\dfrac{y - 3}{2}$.'],
        },
      ],
    },
    {
      title: 'Composition et dénombrement',
      blocks: [
        {
          kind: 'formula',
          tex: '(g \\circ f)(x) = g\\big(f(x)\\big)',
          legend: ['on applique d’abord $f$, puis $g$'],
        },
        {
          kind: 'rule',
          text: 'Si $E$ a $p$ éléments et $F$ en a $n$ : il y a $n^p$ applications de $E$ dans $F$, et $n(n - 1)\\cdots(n - p + 1) = A_n^p$ injections (si $p \\leq n$).',
        },
        {
          kind: 'trap',
          wrong: '« $x \\mapsto x^2$ est bijective de $\\mathbb{R}$ dans $\\mathbb{R}$. »',
          why: '$-2$ et $2$ ont la même image (non injective), et $-1$ n’a pas d’antécédent (non surjective).',
          reflex: 'Préciser les ensembles de départ et d’arrivée : $x \\mapsto x^2$ est bijective de $[0, +\\infty[$ dans $[0, +\\infty[$.',
        },
      ],
    },
  ],
  essentials: [
    'Application : chaque élément de $E$ a une seule image.',
    'Injective : au plus un antécédent ; surjective : au moins un ; bijective : exactement un.',
    'Bijection : on résout $f(x) = y$ pour obtenir $f^{-1}$.',
    '$n^p$ applications et $A_n^p$ injections d’un ensemble à $p$ éléments vers un ensemble à $n$ éléments.',
  ],
  exercises: [
    {
      id: 'app-reciproque',
      level: 1,
      title: 'Une bijection',
      statement: '$f : \\mathbb{R} \\to \\mathbb{R}$, $f(x) = 2x + 3$.',
      parts: [
        {
          label: 'Antécédent de 11.',
          answer: { kind: 'number', value: 4, tolerance: 0.001, unit: '' },
          steps: ['$2x + 3 = 11 \\Rightarrow x = 4$.'],
        },
        {
          label: 'Calcule $(f \\circ f)(1)$.',
          answer: { kind: 'number', value: 13, tolerance: 0.001, unit: '' },
          steps: ['$f(1) = 5$, puis $f(5) = 13$.'],
        },
      ],
    },
    {
      id: 'app-denombrer',
      level: 2,
      title: 'Compter des applications',
      statement: '$E$ a 3 éléments et $F$ en a 5.',
      parts: [
        {
          label: 'Nombre d’applications de $E$ dans $F$.',
          answer: { kind: 'number', value: 125, tolerance: 0, unit: '' },
          steps: ['$5^3 = 125$.'],
        },
        {
          label: 'Nombre d’injections de $E$ dans $F$.',
          answer: { kind: 'number', value: 60, tolerance: 0, unit: '' },
          steps: ['$5 \\times 4 \\times 3 = 60$.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Une application est surjective si :',
      choices: ['tout élément de l’ensemble d’arrivée a au moins un antécédent', 'deux éléments ont toujours des images différentes', 'elle est croissante', 'elle a une réciproque'],
      answer: 0,
      explanation: 'L’ensemble d’arrivée est « entièrement atteint ».',
    },
    {
      question: '$x \\mapsto x^2$ de $\\mathbb{R}$ dans $\\mathbb{R}$ est :',
      choices: ['ni injective ni surjective', 'bijective', 'injective seulement', 'surjective seulement'],
      answer: 0,
      explanation: '$f(-2) = f(2)$ et $-1$ n’a pas d’antécédent.',
    },
    {
      question: 'La réciproque de $x \\mapsto 3x - 6$ est :',
      choices: ['$y \\mapsto \\dfrac{y + 6}{3}$', '$y \\mapsto 3y + 6$', '$y \\mapsto \\dfrac{y - 6}{3}$', '$y \\mapsto \\dfrac{1}{3y - 6}$'],
      answer: 0,
      explanation: '$3x - 6 = y \\Rightarrow x = \\dfrac{y + 6}{3}$.',
    },
    {
      question: '$(g \\circ f)(x)$ signifie :',
      choices: ['appliquer $f$ puis $g$', 'appliquer $g$ puis $f$', 'multiplier $f$ et $g$', 'additionner $f$ et $g$'],
      answer: 0,
      explanation: '$g(f(x))$.',
    },
  ],
  applications: [
    {
      title: 'Les prix du concours',
      tagline: 'De combien de façons distribuer trois prix ?',
      situation:
        'Le lycée remet trois prix différents (1ᵉʳ, 2ᵉ, 3ᵉ) à choisir parmi les 5 finalistes d’un concours de mathématiques ; un élève ne peut recevoir qu’un prix.',
      model: 'Une distribution est une injection de l’ensemble des 3 prix dans l’ensemble des 5 élèves.',
      questions: ['Combien de distributions des prix sont possibles ?'],
      check: { value: 60, tolerance: 0, unit: '' },
      solution: ['5 choix pour le 1ᵉʳ prix, puis 4 pour le 2ᵉ, puis 3 pour le 3ᵉ : $5 \\times 4 \\times 3 = 60$.'],
    },
  ],
};
