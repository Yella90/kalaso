import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Un menuisier veut savoir si une planche de 7 m tiendra en diagonale dans un magasin de 5 m sur 4 m et 3 m de haut. Un architecte vérifie qu’un toit est bien perpendiculaire à un poteau. Pour calculer dans l’espace, on utilise un repère à trois axes, les **vecteurs**, le **produit scalaire** et les équations de **plans** et de **droites**.',
  objectives: [
    'calculer avec des coordonnées dans un repère de l’espace (milieu, vecteur, distance) ;',
    'utiliser le produit scalaire pour montrer une orthogonalité ;',
    'écrire une équation cartésienne de plan et une représentation paramétrique de droite ;',
    'calculer la distance d’un point à un plan.',
  ],
  sections: [
    {
      title: 'Repère et vecteurs de l’espace',
      blocks: [
        {
          kind: 'formula',
          tex: '\\vec{AB}\\begin{pmatrix} x_B - x_A \\\\ y_B - y_A \\\\ z_B - z_A \\end{pmatrix} \\qquad AB = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2 + (z_B - z_A)^2}',
          legend: ['dans un repère orthonormé $(O, \\vec{i}, \\vec{j}, \\vec{k})$'],
        },
        {
          kind: 'formula',
          label: 'Produit scalaire',
          tex: '\\vec{u} \\cdot \\vec{v} = xx\' + yy\' + zz\' \\qquad \\vec{u} \\perp \\vec{v} \\iff \\vec{u} \\cdot \\vec{v} = 0',
        },
        {
          kind: 'formula',
          label: 'Produit vectoriel (série TSE)',
          tex: '\\vec{u} \\wedge \\vec{v} = \\begin{pmatrix} yz\' - zy\' \\\\ zx\' - xz\' \\\\ xy\' - yx\' \\end{pmatrix}',
          legend: ['vecteur orthogonal à $\\vec{u}$ et à $\\vec{v}$ ; sa norme est l’aire du parallélogramme construit sur eux'],
        },
      ],
    },
    {
      title: 'Plans et droites',
      blocks: [
        {
          kind: 'rule',
          text: 'Le plan passant par $A$ et de **vecteur normal** $\\vec{n}(a\\,;b\\,;c)$ a une équation de la forme $ax + by + cz + d = 0$ ; on trouve $d$ en écrivant que $A$ est dans le plan.',
        },
        {
          kind: 'formula',
          label: 'Droite passant par $A$, de vecteur directeur $\\vec{u}(\\alpha\\,;\\beta\\,;\\gamma)$',
          tex: '\\begin{cases} x = x_A + \\alpha t \\\\ y = y_A + \\beta t \\\\ z = z_A + \\gamma t \\end{cases} \\quad t \\in \\mathbb{R}',
        },
        {
          kind: 'formula',
          label: 'Distance d’un point à un plan',
          tex: 'd(M_0, \\mathcal{P}) = \\dfrac{|ax_0 + by_0 + cz_0 + d|}{\\sqrt{a^2 + b^2 + c^2}}',
        },
        {
          kind: 'example',
          title: 'un plan et une distance',
          text: 'Plan passant par $A(1\\,;0\\,;2)$, de vecteur normal $\\vec{n}(1\\,;2\\,;2)$.',
          steps: ['$x + 2y + 2z + d = 0$ avec $1 + 0 + 4 + d = 0$, donc $d = -5$.', 'Distance de $O$ : $\\dfrac{|-5|}{\\sqrt{1 + 4 + 4}} = \\dfrac{5}{3}$.'],
        },
        {
          kind: 'trap',
          wrong: '« Le vecteur $(a\\,;b\\,;c)$ du plan $ax + by + cz + d = 0$ est un vecteur du plan. »',
          why: 'C’est un vecteur **normal** : il est perpendiculaire au plan.',
          reflex: 'Une droite de vecteur directeur $\\vec{u}$ est parallèle au plan si $\\vec{u} \\cdot \\vec{n} = 0$, et perpendiculaire si $\\vec{u}$ est colinéaire à $\\vec{n}$.',
        },
      ],
    },
  ],
  essentials: [
    'Coordonnées de $\\vec{AB}$ ; $AB = \\sqrt{\\Delta x^2 + \\Delta y^2 + \\Delta z^2}$.',
    '$\\vec{u} \\cdot \\vec{v} = xx\' + yy\' + zz\'$ ; orthogonaux si le produit scalaire est nul.',
    'Plan de vecteur normal $\\vec{n}(a, b, c)$ : $ax + by + cz + d = 0$.',
    'Distance à un plan : $\\frac{|ax_0 + by_0 + cz_0 + d|}{\\sqrt{a^2 + b^2 + c^2}}$.',
  ],
  exercises: [
    {
      id: 'esp-distance',
      level: 1,
      title: 'Vecteurs et distances',
      statement: '$A(1\\,;0\\,;2)$ et $B(3\\,;2\\,;1)$.',
      parts: [
        {
          label: 'Calcule la longueur $AB$.',
          answer: { kind: 'number', value: 3, tolerance: 0.001, unit: '' },
          steps: ['$\\vec{AB}(2\\,;2\\,;-1)$ ; $AB = \\sqrt{4 + 4 + 1} = 3$.'],
        },
        {
          label: 'Calcule $\\vec{u} \\cdot \\vec{v}$ pour $\\vec{u}(1\\,;2\\,;3)$ et $\\vec{v}(4\\,;-5\\,;6)$.',
          answer: { kind: 'number', value: 12, tolerance: 0, unit: '' },
          steps: ['$4 - 10 + 18 = 12$ : ces vecteurs ne sont pas orthogonaux.'],
        },
      ],
    },
    {
      id: 'esp-plan',
      level: 2,
      title: 'Équation de plan',
      statement: '$\\mathcal{P}$ passe par $A(1\\,;0\\,;2)$ et a pour vecteur normal $\\vec{n}(1\\,;2\\,;2)$.',
      parts: [
        {
          label: 'Dans l’équation $x + 2y + 2z + d = 0$, que vaut $d$ ?',
          answer: { kind: 'number', value: -5, tolerance: 0, unit: '' },
          steps: ['$1 + 0 + 4 + d = 0$.'],
        },
        {
          label: 'Distance de l’origine au plan (valeur approchée).',
          answer: { kind: 'number', value: 1.667, tolerance: 0.005, unit: '' },
          steps: ['$\\dfrac{5}{\\sqrt{9}} = \\dfrac{5}{3}$.'],
        },
      ],
    },
    {
      id: 'esp-intersection',
      level: 3,
      title: 'Droite et plan',
      statement: 'La droite $\\mathcal{D}$ passe par $O$ et a pour vecteur directeur $\\vec{n}(1\\,;2\\,;2)$. Elle coupe le plan $\\mathcal{P}$ : $x + 2y + 2z - 5 = 0$ en $H$.',
      parts: [
        {
          label: 'Pour quelle valeur du paramètre $t$ le point $(t\\,;2t\\,;2t)$ est-il dans $\\mathcal{P}$ ?',
          answer: { kind: 'number', value: 0.5556, tolerance: 0.002, unit: '' },
          steps: ['$t + 4t + 4t - 5 = 0$, donc $t = \\dfrac{5}{9}$.'],
        },
        {
          label: 'Calcule la distance $OH$ (valeur approchée).',
          answer: { kind: 'number', value: 1.667, tolerance: 0.005, unit: '' },
          steps: ['$OH = t\\,\\|\\vec{n}\\| = \\dfrac{5}{9} \\times 3 = \\dfrac{5}{3}$ : c’est bien la distance de $O$ au plan, car $\\mathcal{D}$ est perpendiculaire au plan.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Les vecteurs $(1\\,;-1\\,;0)$ et $(1\\,;1\\,;5)$ sont :',
      choices: ['orthogonaux', 'colinéaires', 'égaux', 'de même norme'],
      answer: 0,
      explanation: '$1 - 1 + 0 = 0$.',
    },
    {
      question: 'Un vecteur normal au plan $2x - y + 3z = 7$ est :',
      choices: ['$(2\\,;-1\\,;3)$', '$(2\\,;1\\,;3)$', '$(7\\,;0\\,;0)$', '$(-1\\,;3\\,;7)$'],
      answer: 0,
      explanation: 'On lit les coefficients de $x$, $y$ et $z$.',
    },
    {
      question: 'Le point $(1\\,;1\\,;1)$ appartient-il au plan $x + y + z = 3$ ?',
      choices: ['oui', 'non', 'on ne peut pas savoir', 'seulement si $z = 0$'],
      answer: 0,
      explanation: '$1 + 1 + 1 = 3$.',
    },
    {
      question: 'La distance entre $(0\\,;0\\,;0)$ et $(2\\,;3\\,;6)$ vaut :',
      choices: ['7', '11', '49', '$\\sqrt{11}$'],
      answer: 0,
      explanation: '$\\sqrt{4 + 9 + 36} = \\sqrt{49} = 7$.',
    },
  ],
  applications: [
    {
      title: 'La planche du menuisier',
      tagline: 'Une planche de 7 m tient-elle dans le magasin ?',
      situation:
        'Un menuisier veut ranger une planche de 7,00 m dans un magasin en forme de pavé droit de 5 m de long, 4 m de large et 3 m de haut. La plus grande longueur possible est la diagonale du pavé.',
      model: 'Repère orthonormé avec un coin du magasin à l’origine ; la planche est assimilée à un segment.',
      questions: ['Quelle est la longueur de la diagonale du magasin, en m ?', 'La planche peut-elle tenir ?'],
      check: { value: 7.071, tolerance: 0.005, unit: 'm' },
      solution: ['Diagonale de $(0\\,;0\\,;0)$ à $(5\\,;4\\,;3)$ : $\\sqrt{25 + 16 + 9} = \\sqrt{50} \\approx 7{,}07$ m.', '$7{,}07 > 7{,}00$ : la planche tient, de justesse, en diagonale.'],
      fact: 'Les maçons vérifient qu’un angle est droit avec la règle « 3-4-5 » : une corde de 3 m, une de 4 m, et la diagonale doit mesurer 5 m.',
    },
  ],
};
