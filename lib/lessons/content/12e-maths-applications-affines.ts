import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Le projecteur de la salle de classe agrandit l’image de l’écran d’ordinateur ; l’ombre d’un poteau au soleil est une image déformée du poteau ; un motif de pagne se répète par glissement. Ces transformations du plan conservent les alignements et les milieux : ce sont des **applications affines**.',
  objectives: [
    'reconnaître une application affine par son expression analytique ;',
    'utiliser les translations et les homothéties (centre, rapport) ;',
    'trouver les points invariants d’une application affine ;',
    'utiliser la conservation du barycentre, de l’alignement et du parallélisme.',
  ],
  sections: [
    {
      title: 'Applications affines du plan',
      blocks: [
        {
          kind: 'definition',
          term: 'Application affine',
          text: 'application $f$ du plan dans lui-même dont l’expression analytique dans un repère est de la forme $x\' = ax + by + c$, $y\' = a\'x + b\'y + c\'$. Elle est **bijective** si $ab\' - a\'b \\neq 0$.',
        },
        {
          kind: 'rule',
          text: 'Une application affine **conserve le barycentre** : l’image du barycentre de $(A, \\alpha)$, $(B, \\beta)$ est le barycentre de $(f(A), \\alpha)$, $(f(B), \\beta)$. Elle conserve donc l’alignement, les milieux et le parallélisme.',
        },
        {
          kind: 'definition',
          term: 'Point invariant',
          text: 'point $M$ tel que $f(M) = M$. On le trouve en résolvant $x\' = x$, $y\' = y$.',
        },
      ],
    },
    {
      title: 'Translations et homothéties',
      blocks: [
        {
          kind: 'table',
          head: ['Transformation', 'Définition', 'Expression analytique'],
          rows: [
            ['translation de vecteur $\\vec{u}(\\alpha\\,;\\beta)$', '$\\vec{MM\'} = \\vec{u}$', '$x\' = x + \\alpha$, $y\' = y + \\beta$'],
            ['homothétie de centre $\\Omega(x_0\\,;y_0)$, rapport $k \\neq 0$', '$\\vec{\\Omega M\'} = k\\,\\vec{\\Omega M}$', '$x\' = k(x - x_0) + x_0$, $y\' = k(y - y_0) + y_0$'],
          ],
        },
        {
          kind: 'rule',
          text: 'Une homothétie de rapport $k$ multiplie les longueurs par $|k|$ et les aires par $k^2$. Si $k = -1$, c’est la symétrie centrale de centre $\\Omega$.',
        },
        {
          kind: 'example',
          title: 'reconnaître une homothétie',
          text: '$f$ : $x\' = 2x - 1$, $y\' = 2y + 3$.',
          steps: ['De la forme $x\' = 2x + c$, $y\' = 2y + c\'$ : homothétie de rapport 2.', 'Centre (point invariant) : $x = 2x - 1 \\Rightarrow x = 1$ ; $y = 2y + 3 \\Rightarrow y = -3$. Centre $\\Omega(1\\,;-3)$.'],
        },
        {
          kind: 'rule',
          text: 'La composée de deux homothéties de rapports $k$ et $k\'$ est une homothétie de rapport $kk\'$ si $kk\' \\neq 1$, une translation si $kk\' = 1$.',
        },
      ],
    },
    {
      title: 'Projections et symétries affines',
      blocks: [
        {
          kind: 'text',
          text: 'La **projection** sur une droite $\\mathcal{D}$ parallèlement à une direction $\\vec{w}$ associe à $M$ le point $M\'$ de $\\mathcal{D}$ tel que $\\vec{MM\'}$ soit colinéaire à $\\vec{w}$. C’est le principe de l’ombre portée par le soleil sur un sol plat.',
        },
        {
          kind: 'text',
          text: 'La **symétrie** par rapport à $\\mathcal{D}$ parallèlement à $\\vec{w}$ associe à $M$ le point $M\'\'$ tel que la projection $M\'$ soit le milieu de $[MM\'\']$. Si $\\vec{w}$ est orthogonal à $\\mathcal{D}$, on retrouve la symétrie orthogonale.',
        },
        {
          kind: 'trap',
          wrong: '« Une application affine conserve les distances. »',
          why: 'Seules certaines (les isométries) le font ; une homothétie de rapport 3 triple les distances, une projection les écrase.',
          reflex: 'Une application affine conserve les alignements, les milieux et les rapports de longueurs sur une même droite, pas les distances.',
        },
      ],
    },
  ],
  essentials: [
    'Application affine : $x\' = ax + by + c$, $y\' = a\'x + b\'y + c\'$ ; elle conserve barycentres, alignement, parallélisme.',
    'Points invariants : résoudre $x\' = x$, $y\' = y$.',
    'Homothétie $(\\Omega, k)$ : $\\vec{\\Omega M\'} = k\\vec{\\Omega M}$ ; longueurs × $|k|$, aires × $k^2$.',
    'Composée d’homothéties : rapport $kk\'$ (translation si $kk\' = 1$).',
  ],
  exercises: [
    {
      id: 'aff-homothetie',
      level: 1,
      title: 'Image par une homothétie',
      statement: '$h$ est l’homothétie de centre $\\Omega(1\\,;1)$ et de rapport 3. On cherche l’image $A\'$ de $A(2\\,;0)$.',
      parts: [
        {
          label: 'Abscisse de $A\'$.',
          answer: { kind: 'number', value: 4, tolerance: 0.001, unit: '' },
          steps: ['$x\' = 3(2 - 1) + 1 = 4$.'],
        },
        {
          label: 'Ordonnée de $A\'$.',
          answer: { kind: 'number', value: -2, tolerance: 0.001, unit: '' },
          steps: ['$y\' = 3(0 - 1) + 1 = -2$.'],
          result: "A'(4\\,;-2)",
        },
      ],
    },
    {
      id: 'aff-centre',
      level: 2,
      title: 'Retrouver le centre',
      statement: '$f$ a pour expression $x\' = -2x + 6$, $y\' = -2y - 3$.',
      parts: [
        {
          label: 'Quel est le rapport de cette homothétie ?',
          answer: { kind: 'number', value: -2, tolerance: 0.001, unit: '' },
          steps: ['Les coefficients de $x$ et $y$ sont égaux à $-2$.'],
        },
        {
          label: 'Abscisse du centre.',
          answer: { kind: 'number', value: 2, tolerance: 0.001, unit: '' },
          steps: ['$x = -2x + 6 \\Rightarrow 3x = 6 \\Rightarrow x = 2$.'],
        },
        {
          label: 'Ordonnée du centre.',
          answer: { kind: 'number', value: -1, tolerance: 0.001, unit: '' },
          steps: ['$y = -2y - 3 \\Rightarrow 3y = -3 \\Rightarrow y = -1$. Centre $\\Omega(2\\,;-1)$.'],
        },
      ],
    },
    {
      id: 'aff-aires',
      level: 3,
      title: 'Composée et aires',
      statement: '$h_1$ est une homothétie de rapport 2, $h_2$ une homothétie de rapport $-\\dfrac{3}{2}$. Un triangle $T$ a une aire de 4 cm².',
      parts: [
        {
          label: 'Quel est le rapport de $h_2 \\circ h_1$ ?',
          answer: { kind: 'number', value: -3, tolerance: 0.001, unit: '' },
          steps: ['$2 \\times \\left(-\\dfrac{3}{2}\\right) = -3 \\neq 1$ : c’est une homothétie de rapport $-3$.'],
        },
        {
          label: 'Quelle est l’aire de l’image de $T$ par $h_2 \\circ h_1$ (en cm²) ?',
          answer: { kind: 'number', value: 36, tolerance: 0.01, unit: 'cm²' },
          steps: ['Les aires sont multipliées par $(-3)^2 = 9$ : $4 \\times 9 = 36$ cm².'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Une application affine transforme le milieu de $[AB]$ en :',
      choices: ['le milieu de $[A\'B\']$', 'le point $A\'$', 'un point quelconque', 'le centre du repère'],
      answer: 0,
      explanation: 'Elle conserve le barycentre, donc les milieux.',
    },
    {
      question: 'Une homothétie de rapport −1 est :',
      choices: ['une symétrie centrale', 'une translation', 'l’identité', 'une projection'],
      answer: 0,
      explanation: '$\\vec{\\Omega M\'} = -\\vec{\\Omega M}$ : $\\Omega$ est le milieu de $[MM\']$.',
    },
    {
      question: 'Une homothétie de rapport 3 multiplie les aires par :',
      choices: ['9', '3', '6', '27'],
      answer: 0,
      explanation: 'Les aires sont multipliées par $k^2$.',
    },
    {
      question: 'La composée de deux homothéties de rapports 2 et $\\dfrac{1}{2}$ est :',
      choices: ['une translation', 'une homothétie de rapport 1', 'une homothétie de rapport 4', 'une symétrie'],
      answer: 0,
      explanation: '$kk\' = 1$ : c’est une translation (éventuellement l’identité).',
    },
  ],
  applications: [
    {
      title: 'Le projecteur de la classe',
      tagline: 'Quelle taille aura l’image sur le mur ?',
      situation:
        'Le projecteur de la salle multimédia agrandit une diapositive de 3,6 cm sur 2,4 cm. L’image sur le mur est obtenue par une homothétie de rapport 25 (centre : l’objectif).',
      model: 'On assimile la projection à une homothétie ; le mur est parallèle à la diapositive.',
      questions: ['Quelle est la largeur de l’image sur le mur, en cm ?', 'Par combien la surface est-elle multipliée ?'],
      check: { value: 90, tolerance: 0.02, unit: 'cm' },
      solution: ['Largeur : $3{,}6 \\times 25 = 90$ cm ; hauteur : $2{,}4 \\times 25 = 60$ cm.', 'La surface est multipliée par $25^2 = 625$ : c’est pour cela que l’image est moins lumineuse quand on recule le projecteur.'],
      fact: 'L’image dans une chambre noire (ou dans l’œil) est renversée : c’est une homothétie de rapport négatif.',
    },
  ],
};
