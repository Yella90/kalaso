import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Où placer le puits d’un village pour que les trois quartiers soient servis équitablement ? Où se trouve le point d’équilibre d’une planche chargée de sacs inégaux ? La géométrie métrique répond avec les équations de droites, le **barycentre** et les lignes de niveau.',
  objectives: [
    'écrire l’équation d’une droite et calculer une distance ;',
    'calculer les coordonnées d’un barycentre ;',
    'reconnaître une ligne de niveau simple (médiatrice, cercle) ;',
    'utiliser les angles orientés.',
  ],
  sections: [
    {
      title: 'Droites et distances',
      blocks: [
        {
          kind: 'formula',
          tex: 'ax + by + c = 0 \\qquad AB = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}',
          legend: ['équation cartésienne d’une droite ; $\\vec u(-b\\,;\\,a)$ en est un vecteur directeur'],
        },
        {
          kind: 'formula',
          tex: 'd(M, \\mathcal D) = \\dfrac{|a x_M + b y_M + c|}{\\sqrt{a^2 + b^2}}',
          legend: ['distance d’un point à une droite (repère orthonormé)'],
        },
      ],
    },
    {
      title: 'Le barycentre',
      blocks: [
        {
          kind: 'definition',
          term: 'Barycentre',
          text: 'le barycentre $G$ des points pondérés $(A, \\alpha)$ et $(B, \\beta)$, avec $\\alpha + \\beta \\ne 0$, est l’unique point tel que $\\alpha\\overrightarrow{GA} + \\beta\\overrightarrow{GB} = \\vec 0$.',
        },
        {
          kind: 'formula',
          tex: 'x_G = \\dfrac{\\alpha x_A + \\beta x_B + \\gamma x_C}{\\alpha + \\beta + \\gamma} \\qquad y_G = \\dfrac{\\alpha y_A + \\beta y_B + \\gamma y_C}{\\alpha + \\beta + \\gamma}',
        },
        {
          kind: 'rule',
          text: 'Avec des poids égaux, le barycentre de deux points est le milieu ; celui de trois points est le **centre de gravité** du triangle.',
        },
      ],
    },
    {
      title: 'Lignes de niveau et angles orientés',
      blocks: [
        {
          kind: 'list',
          items: [
            'l’ensemble des points M tels que $MA = MB$ est la **médiatrice** de [AB] ;',
            'l’ensemble des points M tels que $MA = r$ est le **cercle** de centre A et de rayon r ;',
            'l’ensemble des points M tels que $\\overrightarrow{MA} \\cdot \\overrightarrow{MB} = 0$ est le cercle de diamètre [AB].',
          ],
        },
        {
          kind: 'text',
          text: 'Un angle orienté de vecteurs $(\\vec u, \\vec v)$ tient compte du sens de rotation : il est défini à $2\\pi$ près, et $(\\vec v, \\vec u) = -(\\vec u, \\vec v)$.',
        },
      ],
    },
  ],
  essentials: [
    'Droite : ax + by + c = 0 ; distance AB = √((Δx)² + (Δy)²).',
    'Barycentre : moyenne des coordonnées pondérée par les coefficients.',
    'Médiatrice : MA = MB ; cercle : MA = r.',
    'Angles orientés définis à 2π près.',
  ],
  exercises: [
    {
      id: 'gp-barycentre',
      level: 1,
      title: 'Un barycentre',
      statement: 'A(0 ; 0) et B(6 ; 3). G est le barycentre de (A ; 2) et (B ; 1).',
      parts: [
        {
          label: 'Abscisse de G.',
          answer: { kind: 'number', value: 2, tolerance: 0, unit: '' },
          steps: ['$x_G = \\dfrac{2 \\times 0 + 1 \\times 6}{3} = 2$.'],
        },
        {
          label: 'Ordonnée de G.',
          answer: { kind: 'number', value: 1, tolerance: 0, unit: '' },
          steps: ['$y_G = \\dfrac{0 + 3}{3} = 1$. G est plus près de A, qui a le plus gros poids.'],
        },
      ],
    },
    {
      id: 'gp-distance',
      level: 2,
      title: 'Distance à une route',
      statement: 'Dans un repère orthonormé (unité : 1 km), une route rectiligne a pour équation $3x + 4y - 12 = 0$. Une école est en E(4 ; 3).',
      parts: [
        {
          label: 'Distance de l’école à la route, en km.',
          answer: { kind: 'number', value: 2.4, tolerance: 0.01, unit: 'km' },
          steps: ['$d = \\dfrac{|12 + 12 - 12|}{\\sqrt{9 + 16}} = \\dfrac{12}{5} = 2{,}4$ km.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Le barycentre de (A ; 1) et (B ; 1) est :',
      choices: ['le milieu de [AB]', 'le point A', 'le point B', 'n’existe pas'],
      answer: 0,
      explanation: 'Les poids sont égaux.',
    },
    {
      question: 'L’ensemble des points équidistants de A et B est :',
      choices: ['la médiatrice de [AB]', 'le cercle de diamètre [AB]', 'la droite (AB)', 'le milieu de [AB]'],
      answer: 0,
      explanation: 'MA = MB.',
    },
    {
      question: 'Un vecteur directeur de la droite $2x - y + 1 = 0$ est :',
      choices: ['(1 ; 2)', '(2 ; −1)', '(−1 ; 1)', '(2 ; 1)'],
      answer: 0,
      explanation: 'Avec a = 2, b = −1 : (−b ; a) = (1 ; 2).',
    },
    {
      question: 'La distance entre A(1 ; 1) et B(4 ; 5) vaut :',
      choices: ['5', '7', '25', '√7'],
      answer: 0,
      explanation: '√(9 + 16) = 5.',
    },
  ],
  applications: [
    {
      title: 'Le dépôt de céréales',
      tagline: 'Où construire pour servir trois villages ?',
      situation:
        'Trois villages, A(0 ; 0), B(8 ; 0) et C(2 ; 6) (en km), comptent respectivement 1 000, 2 000 et 1 000 habitants. On veut construire un dépôt de céréales au barycentre des villages pondérés par leur population.',
      model: 'Barycentre de (A ; 1), (B ; 2), (C ; 1).',
      questions: ['Quelle est l’abscisse du dépôt, en km ?', 'Quelle est son ordonnée ?'],
      check: { value: 4.5, tolerance: 0.01, unit: 'km' },
      solution: ['$x_G = \\dfrac{0 + 16 + 2}{4} = 4{,}5$ km.', '$y_G = \\dfrac{0 + 0 + 6}{4} = 1{,}5$ km : le dépôt est attiré vers B, le village le plus peuplé.'],
      fact: 'Le mot barycentre vient du grec « barus », lourd : c’est le centre des poids.',
    },
  ],
};
