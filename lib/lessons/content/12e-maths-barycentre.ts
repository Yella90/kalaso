import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Au marché, la balance romaine tient en équilibre quand le contrepoids est placé au bon endroit. Deux enfants sur une balançoire en bois s’équilibrent si le plus lourd s’assoit plus près de l’axe. Ce point d’équilibre, qui « pèse » les positions, s’appelle en mathématiques le **barycentre**.',
  objectives: [
    'définir le barycentre de points pondérés et justifier son existence ;',
    'construire un barycentre et calculer ses coordonnées ;',
    'utiliser l’associativité du barycentre ;',
    'utiliser le barycentre pour montrer un alignement ou un concours de droites.',
  ],
  sections: [
    {
      title: 'Barycentre de points pondérés',
      blocks: [
        {
          kind: 'definition',
          term: 'Barycentre',
          text: 'si $a + b + c \\neq 0$, le barycentre des points pondérés $(A, a)$, $(B, b)$, $(C, c)$ est l’unique point $G$ tel que $a\\vec{GA} + b\\vec{GB} + c\\vec{GC} = \\vec{0}$.',
        },
        {
          kind: 'formula',
          label: 'Position et coordonnées',
          tex: '\\vec{OG} = \\dfrac{a\\vec{OA} + b\\vec{OB} + c\\vec{OC}}{a + b + c} \\qquad x_G = \\dfrac{ax_A + bx_B + cx_C}{a + b + c}',
          legend: ['même formule pour $y_G$ (et $z_G$ dans l’espace)'],
        },
        {
          kind: 'list',
          items: [
            'le barycentre ne change pas si l’on multiplie tous les coefficients par un même réel non nul ;',
            'si tous les coefficients sont égaux, $G$ est l’**isobarycentre** : le milieu pour deux points, le centre de gravité pour un triangle ;',
            'le barycentre de deux points est sur la droite qui les joint.',
          ],
        },
        {
          kind: 'example',
          title: 'deux points',
          text: '$A(1\\,;2)$ de poids 2 et $B(4\\,;-1)$ de poids 1.',
          steps: ['$x_G = \\dfrac{2 \\times 1 + 1 \\times 4}{3} = 2$ ; $y_G = \\dfrac{2 \\times 2 + 1 \\times (-1)}{3} = 1$.', '$G(2\\,;1)$ est plus près de $A$, qui a le plus grand poids : $\\vec{AG} = \\dfrac{1}{3}\\vec{AB}$.'],
        },
      ],
    },
    {
      title: 'Associativité',
      blocks: [
        {
          kind: 'rule',
          text: 'On peut remplacer plusieurs points pondérés par leur barycentre partiel, affecté de la **somme** de leurs poids (si elle n’est pas nulle), sans changer le barycentre final.',
        },
        {
          kind: 'example',
          title: 'centre de gravité d’un triangle',
          text: '$G$ est l’isobarycentre de $(A, 1)$, $(B, 1)$, $(C, 1)$. Soit $I$ le milieu de $[BC]$, barycentre de $(B, 1)$, $(C, 1)$.',
          steps: ['$G$ est le barycentre de $(A, 1)$, $(I, 2)$ : il est sur la médiane $(AI)$ et $\\vec{AG} = \\dfrac{2}{3}\\vec{AI}$.', 'De même pour les deux autres médianes : elles sont concourantes en $G$.'],
        },
        {
          kind: 'callout',
          variant: 'methode',
          title: 'Montrer que trois points sont alignés',
          blocks: [
            {
              kind: 'text',
              text: 'On écrit l’un des points comme barycentre des deux autres. Pour montrer que trois droites sont concourantes, on montre qu’un même barycentre appartient à chacune d’elles (grâce à l’associativité).',
            },
          ],
        },
        {
          kind: 'trap',
          wrong: '« Le barycentre de $(A, 3)$ et $(B, -3)$ est le milieu de $[AB]$. »',
          why: 'La somme des poids est nulle : le barycentre n’existe pas.',
          reflex: 'Toujours vérifier que la somme des coefficients n’est pas nulle.',
        },
      ],
    },
  ],
  essentials: [
    '$G$ barycentre de $(A, a)$, $(B, b)$, $(C, c)$ avec $a + b + c \\neq 0$ : $a\\vec{GA} + b\\vec{GB} + c\\vec{GC} = \\vec{0}$.',
    '$x_G = \\frac{ax_A + bx_B + cx_C}{a + b + c}$ ; multiplier tous les poids par un même réel ne change rien.',
    'Associativité : regrouper des points en un barycentre partiel affecté de la somme de leurs poids.',
    'Isobarycentre : milieu, centre de gravité.',
  ],
  exercises: [
    {
      id: 'bary-coordonnees',
      level: 1,
      title: 'Coordonnées d’un barycentre',
      statement: 'Dans un repère, $A(1\\,;2)$ et $B(4\\,;-1)$.',
      parts: [
        {
          label: 'Abscisse du barycentre de $(A, 2)$, $(B, 1)$.',
          answer: { kind: 'number', value: 2, tolerance: 0.001, unit: '' },
          steps: ['$x_G = \\dfrac{2 + 4}{3} = 2$ (et $y_G = 1$).'],
        },
        {
          label: 'Abscisse du barycentre $H$ de $(A, 3)$, $(B, -1)$.',
          answer: { kind: 'number', value: -0.5, tolerance: 0.001, unit: '' },
          steps: ['Somme des poids : 2. $x_H = \\dfrac{3 \\times 1 - 4}{2} = -0{,}5$.'],
        },
        {
          label: 'Ordonnée de $H$.',
          answer: { kind: 'number', value: 3.5, tolerance: 0.001, unit: '' },
          steps: ['$y_H = \\dfrac{3 \\times 2 - (-1)}{2} = 3{,}5$ : $H$ est sur la droite $(AB)$, mais en dehors du segment.'],
        },
      ],
    },
    {
      id: 'bary-triangle',
      level: 2,
      title: 'Centre de gravité',
      statement: 'Triangle $A(0\\,;0)$, $B(6\\,;0)$, $C(0\\,;9)$.',
      parts: [
        {
          label: 'Abscisse du centre de gravité $G$.',
          answer: { kind: 'number', value: 2, tolerance: 0.001, unit: '' },
          steps: ['$x_G = \\dfrac{0 + 6 + 0}{3} = 2$.'],
        },
        {
          label: 'Ordonnée de $G$.',
          answer: { kind: 'number', value: 3, tolerance: 0.001, unit: '' },
          steps: ['$y_G = \\dfrac{0 + 0 + 9}{3} = 3$.'],
        },
        {
          label: 'Calcule la distance $AG$ (valeur approchée).',
          answer: { kind: 'number', value: 3.606, tolerance: 0.005, unit: '' },
          steps: ['$AG = \\sqrt{2^2 + 3^2} = \\sqrt{13} \\approx 3{,}61$.'],
        },
      ],
    },
    {
      id: 'bary-associativite',
      level: 3,
      title: 'Trois points pondérés',
      statement: '$A(2\\,;0)$, $B(0\\,;4)$, $C(-2\\,;2)$ ; $G$ est le barycentre de $(A, 1)$, $(B, 1)$, $(C, 2)$.',
      parts: [
        {
          label: 'Abscisse de $I$, milieu de $[AB]$.',
          answer: { kind: 'number', value: 1, tolerance: 0.001, unit: '' },
          steps: ['$I(1\\,;2)$.'],
        },
        {
          label: 'Par associativité, $G$ est le barycentre de $(I, 2)$ et $(C, 2)$. Donne l’abscisse de $G$.',
          answer: { kind: 'number', value: -0.5, tolerance: 0.001, unit: '' },
          steps: ['$G$ est le milieu de $[IC]$ : $x_G = \\dfrac{1 + (-2)}{2} = -0{,}5$, $y_G = \\dfrac{2 + 2}{2} = 2$.', 'Vérification directe : $x_G = \\dfrac{2 + 0 - 4}{4} = -0{,}5$.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Le barycentre de $(A, 1)$ et $(B, 1)$ est :',
      choices: ['le milieu de $[AB]$', 'le point $A$', 'le point $B$', 'n’existe pas'],
      answer: 0,
      explanation: 'Poids égaux : isobarycentre, ici le milieu.',
    },
    {
      question: 'Le barycentre de $(A, 2)$ et $(B, -2)$ :',
      choices: ['n’existe pas', 'est le milieu de $[AB]$', 'est le point $A$', 'est à l’infini sur $(AB)$, en $B$'],
      answer: 0,
      explanation: 'La somme des poids est nulle.',
    },
    {
      question: 'Si $G$ est le barycentre de $(A, 3)$ et $(B, 1)$, alors :',
      choices: ['$\\vec{AG} = \\dfrac{1}{4}\\vec{AB}$', '$\\vec{AG} = \\dfrac{3}{4}\\vec{AB}$', '$\\vec{AG} = \\dfrac{1}{3}\\vec{AB}$', '$\\vec{AG} = 3\\vec{AB}$'],
      answer: 0,
      explanation: '$\\vec{AG} = \\dfrac{b}{a + b}\\vec{AB} = \\dfrac{1}{4}\\vec{AB}$ : $G$ est plus près de $A$.',
    },
    {
      question: 'Le barycentre de $(A, 2)$, $(B, 4)$ est aussi celui de :',
      choices: ['$(A, 1)$, $(B, 2)$', '$(A, 4)$, $(B, 2)$', '$(A, 2)$, $(B, 2)$', '$(A, -1)$, $(B, 2)$'],
      answer: 0,
      explanation: 'On peut diviser tous les poids par 2.',
    },
  ],
  applications: [
    {
      title: 'La planche de transport',
      tagline: 'Où porter une charge pour qu’elle soit en équilibre ?',
      situation:
        'Un porteur transporte sur une planche de 2 m un sac de mil de 30 kg à une extrémité et un bidon d’huile de 10 kg à l’autre. Il veut poser la planche sur son épaule au point d’équilibre.',
      model: 'On néglige la masse de la planche ; le point d’équilibre est le barycentre des charges pondérées par leurs masses.',
      questions: ['À quelle distance du sac de mil doit-il placer son épaule, en m ?'],
      check: { value: 0.5, tolerance: 0.02, unit: 'm' },
      solution: ['On place le sac en $x = 0$ et le bidon en $x = 2$ : $x_G = \\dfrac{30 \\times 0 + 10 \\times 2}{40} = 0{,}5$ m.', 'L’épaule doit être à 50 cm du sac, trois fois plus près du sac que du bidon.'],
      fact: 'La balance romaine utilise le même principe : un petit contrepoids, loin de l’axe, équilibre une lourde charge proche de l’axe.',
    },
  ],
};
