import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Un piroguier traverse le fleuve en ramant droit vers l’autre rive, mais le courant l’emporte vers l’aval. Où arrivera-t-il ? Il faut ajouter deux déplacements qui ont chacun une direction, un sens et une longueur : deux **vecteurs**.',
  objectives: [
    'calculer avec les coordonnées de vecteurs dans une base ;',
    'reconnaître deux vecteurs colinéaires avec le déterminant ;',
    'calculer un produit scalaire et une norme ;',
    'utiliser le produit scalaire pour montrer une orthogonalité.',
  ],
  sections: [
    {
      title: 'Coordonnées et colinéarité',
      blocks: [
        {
          kind: 'text',
          text: 'Dans une base $(\\vec i, \\vec j)$, tout vecteur s’écrit $\\vec u = x\\vec i + y\\vec j$ : on note $\\vec u\\,(x\\,;\\,y)$. Si $A(x_A\\,;\\,y_A)$ et $B(x_B\\,;\\,y_B)$, alors $\\overrightarrow{AB}\\,(x_B - x_A\\,;\\,y_B - y_A)$.',
        },
        {
          kind: 'formula',
          tex: '\\det(\\vec u, \\vec v) = \\begin{vmatrix} x & x\' \\\\ y & y\' \\end{vmatrix} = xy\' - x\'y',
        },
        {
          kind: 'rule',
          text: '$\\vec u$ et $\\vec v$ sont **colinéaires** si et seulement si $\\det(\\vec u, \\vec v) = 0$. Trois points A, B, C sont alignés si $\\overrightarrow{AB}$ et $\\overrightarrow{AC}$ sont colinéaires.',
        },
      ],
    },
    {
      title: 'Produit scalaire',
      blocks: [
        {
          kind: 'formula',
          tex: '\\vec u \\cdot \\vec v = xx\' + yy\' \\qquad \\|\\vec u\\| = \\sqrt{x^2 + y^2}',
          legend: ['dans une base orthonormée'],
        },
        {
          kind: 'formula',
          tex: '\\vec u \\cdot \\vec v = \\|\\vec u\\| \\times \\|\\vec v\\| \\times \\cos(\\vec u, \\vec v)',
        },
        {
          kind: 'rule',
          text: '$\\vec u$ et $\\vec v$ sont **orthogonaux** si et seulement si $\\vec u \\cdot \\vec v = 0$.',
        },
        {
          kind: 'example',
          title: 'angle entre deux vecteurs',
          text: '$\\vec u\\,(3\\,;\\,1)$ et $\\vec v\\,(1\\,;\\,2)$.',
          steps: ['$\\vec u \\cdot \\vec v = 3 + 2 = 5$ ; $\\|\\vec u\\| = \\sqrt{10}$ ; $\\|\\vec v\\| = \\sqrt5$.', '$\\cos \\theta = \\dfrac{5}{\\sqrt{50}} = \\dfrac{\\sqrt2}{2}$, donc $\\theta = 45°$.'],
        },
      ],
    },
  ],
  essentials: [
    'AB(x_B − x_A ; y_B − y_A).',
    'Colinéaires ⟺ det = xy′ − x′y = 0.',
    'Base orthonormée : u·v = xx′ + yy′ ; ‖u‖ = √(x² + y²).',
    'Orthogonaux ⟺ u·v = 0.',
  ],
  exercises: [
    {
      id: 've-alignes',
      level: 1,
      title: 'Points alignés ?',
      statement: 'A(1 ; 2), B(3 ; 6), C(5 ; 10).',
      parts: [
        {
          label: 'Déterminant de $\\overrightarrow{AB}$ et $\\overrightarrow{AC}$.',
          answer: { kind: 'number', value: 0, tolerance: 0, unit: '' },
          steps: ['$\\overrightarrow{AB}(2\\,;\\,4)$, $\\overrightarrow{AC}(4\\,;\\,8)$.', '$2 \\times 8 - 4 \\times 4 = 0$ : les points sont alignés.'],
        },
      ],
    },
    {
      id: 've-scalaire',
      level: 2,
      title: 'Un triangle rectangle ?',
      statement: 'Dans un repère orthonormé : A(0 ; 0), B(4 ; 2), C(1 ; 5).',
      parts: [
        {
          label: 'Produit scalaire $\\overrightarrow{BA} \\cdot \\overrightarrow{BC}$.',
          answer: { kind: 'number', value: 6, tolerance: 0, unit: '' },
          steps: ['$\\overrightarrow{BA}(-4\\,;\\,-2)$, $\\overrightarrow{BC}(-3\\,;\\,3)$.', '$12 - 6 = 6$.'],
        },
        {
          label: 'Produit scalaire $\\overrightarrow{AB} \\cdot \\overrightarrow{AC}$.',
          answer: { kind: 'number', value: 14, tolerance: 0, unit: '' },
          steps: ['$\\overrightarrow{AB}(4\\,;\\,2)$, $\\overrightarrow{AC}(1\\,;\\,5)$ : $4 + 10 = 14$. Le triangle n’est pas rectangle en A ni en B.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Si A(2 ; 3) et B(5 ; −1), les coordonnées de $\\overrightarrow{AB}$ sont :',
      choices: ['(3 ; −4)', '(7 ; 2)', '(−3 ; 4)', '(3 ; 4)'],
      answer: 0,
      explanation: 'On fait arrivée moins départ.',
    },
    {
      question: '$\\vec u(2\\,;\\,3)$ et $\\vec v(4\\,;\\,6)$ sont :',
      choices: ['colinéaires', 'orthogonaux', 'égaux', 'opposés'],
      answer: 0,
      explanation: '$\\vec v = 2\\vec u$.',
    },
    {
      question: 'La norme de $\\vec u(3\\,;\\,4)$ vaut :',
      choices: ['5', '7', '25', '12'],
      answer: 0,
      explanation: '√(9 + 16) = 5.',
    },
    {
      question: 'Deux vecteurs non nuls dont le produit scalaire est nul sont :',
      choices: ['orthogonaux', 'colinéaires', 'égaux', 'de même norme'],
      answer: 0,
      explanation: 'cos 90° = 0.',
    },
  ],
  applications: [
    {
      title: 'La traversée du fleuve',
      tagline: 'Le courant déporte la pirogue',
      situation:
        'Un piroguier rame perpendiculairement au fleuve Niger à 1,2 m/s ; le courant pousse vers l’aval à 0,5 m/s. Le fleuve est large de 480 m.',
      model: 'Vitesse réelle = somme des deux vecteurs vitesse (perpendiculaires).',
      questions: ['Quelle est la vitesse réelle de la pirogue, en m/s ?', 'De combien de mètres est-elle déportée en arrivant de l’autre côté ?'],
      check: { value: 1.3, tolerance: 0.01, unit: 'm/s' },
      solution: ['$\\|\\vec v\\| = \\sqrt{1{,}2^2 + 0{,}5^2} = \\sqrt{1{,}69} = 1{,}3$ m/s.', 'Durée de la traversée : $\\dfrac{480}{1{,}2} = 400$ s ; déport : $0{,}5 \\times 400 = 200$ m vers l’aval.'],
      fact: 'Pour arriver juste en face, le piroguier doit ramer légèrement vers l’amont.',
    },
  ],
};
