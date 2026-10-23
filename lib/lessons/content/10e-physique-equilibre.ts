import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Une jarre d’eau posée sur la tête d’une femme qui marche droit, une lampe suspendue au plafond, une pirogue qui flotte : tous ces objets sont soumis à plusieurs forces, et pourtant ils restent en équilibre. À quelle condition les forces se « neutralisent »-elles ?',
  objectives: [
    'faire l’inventaire des forces qui s’exercent sur un solide ;',
    'énoncer les conditions d’équilibre d’un solide soumis à deux forces, puis à trois forces ;',
    'utiliser la réaction d’un support et la tension d’un fil ;',
    'résoudre un problème d’équilibre par le calcul ou le dessin.',
  ],
  sections: [
    {
      title: 'Solide soumis à deux forces',
      blocks: [
        {
          kind: 'rule',
          text: 'Un solide soumis à deux forces est en équilibre si ces forces ont **même droite d’action**, **même valeur** et **des sens opposés** : $\\vec F_1 + \\vec F_2 = \\vec 0$.',
        },
        {
          kind: 'example',
          title: 'la lampe suspendue',
          text: 'La lampe subit son poids $\\vec P$ (vers le bas) et la tension du fil $\\vec T$ (vers le haut).',
          steps: ['À l’équilibre : $T = P = m g$.', 'Pour une lampe de 0,5 kg : $T = 0{,}5 \\times 9{,}8 = 4{,}9$ N.'],
        },
        {
          kind: 'definition',
          term: 'Réaction d’un support',
          text: 'force $\\vec R$ exercée par une surface sur l’objet posé dessus. Sans frottement, elle est perpendiculaire à la surface.',
        },
      ],
    },
    {
      title: 'Solide soumis à trois forces',
      blocks: [
        {
          kind: 'rule',
          text: 'Un solide soumis à trois forces non parallèles est en équilibre si : leurs droites d’action sont **dans un même plan** et **concourantes** (elles se coupent en un point) ; la **somme vectorielle** est nulle : $\\vec F_1 + \\vec F_2 + \\vec F_3 = \\vec 0$.',
        },
        {
          kind: 'text',
          text: 'Graphiquement, mis bout à bout, les trois vecteurs forment un **triangle fermé**. On peut aussi projeter sur deux axes : la somme des composantes est nulle sur chaque axe.',
        },
        {
          kind: 'example',
          title: 'la caisse sur une pente',
          text: 'Une caisse de poids $P = 200$ N est retenue par une corde parallèle à une pente inclinée de 30°, sans frottement.',
          steps: ['Projection le long de la pente : $T = P \\sin 30° = 200 \\times 0{,}5 = 100$ N.', 'Projection perpendiculaire : $R = P \\cos 30° \\approx 173$ N.'],
        },
      ],
    },
  ],
  essentials: [
    'Deux forces en équilibre : même droite d’action, même valeur, sens opposés.',
    'Trois forces : coplanaires, concourantes, somme vectorielle nulle (triangle fermé).',
    'On résout par projection sur deux axes perpendiculaires.',
  ],
  exercises: [
    {
      id: 'eq-lampe',
      level: 1,
      title: 'La tension d’un fil',
      statement: 'Un régime de bananes de 12 kg est suspendu par une corde. g = 9,8 N/kg.',
      parts: [
        {
          label: 'Tension de la corde, en N.',
          answer: { kind: 'number', value: 117.6, tolerance: 0.2, unit: 'N' },
          steps: ['À l’équilibre, $T = P = 12 \\times 9{,}8 = 117{,}6$ N.'],
        },
      ],
    },
    {
      id: 'eq-pente',
      level: 2,
      title: 'La moto sur la rampe',
      statement: 'Une moto de 100 kg est retenue immobile sur une rampe inclinée de 20° par une corde parallèle à la rampe. On néglige les frottements ; g = 9,8 N/kg.',
      parts: [
        {
          label: 'Tension de la corde, en N (arrondie à l’unité).',
          answer: { kind: 'number', value: 335, tolerance: 2, unit: 'N' },
          steps: ['$P = 980$ N.', '$T = P \\sin 20° = 980 \\times 0{,}342 \\approx 335$ N.'],
        },
        {
          label: 'Réaction de la rampe, en N (arrondie à l’unité).',
          answer: { kind: 'number', value: 921, tolerance: 2, unit: 'N' },
          steps: ['$R = P \\cos 20° = 980 \\times 0{,}940 \\approx 921$ N.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Un livre posé sur une table est soumis à :',
      choices: ['son poids et la réaction de la table', 'son poids seulement', 'aucune force', 'la réaction seulement'],
      answer: 0,
      explanation: 'Les deux forces se compensent.',
    },
    {
      question: 'Trois forces en équilibre ont des droites d’action :',
      choices: ['concourantes', 'parallèles et de même sens', 'perpendiculaires deux à deux', 'quelconques'],
      answer: 0,
      explanation: 'Elles se coupent en un même point.',
    },
    {
      question: 'Mis bout à bout, trois vecteurs forces en équilibre forment :',
      choices: ['un triangle fermé', 'une droite', 'un carré', 'un cercle'],
      answer: 0,
      explanation: 'Leur somme vectorielle est nulle.',
    },
    {
      question: 'Sans frottement, la réaction d’un support est :',
      choices: ['perpendiculaire à la surface', 'parallèle à la surface', 'verticale toujours', 'nulle'],
      answer: 0,
      explanation: 'Avec frottement, elle s’incline.',
    },
  ],
  applications: [
    {
      title: 'Le hamac du jardin',
      tagline: 'Pourquoi ne faut-il pas tendre trop fort ?',
      situation:
        'Seydou (60 kg) s’allonge au milieu d’un hamac. Les deux cordes font chacune un angle de 10° avec l’horizontale. g = 9,8 N/kg.',
      model: 'Trois forces : le poids et les deux tensions. Sur la verticale : 2 T sin 10° = P.',
      questions: ['Quelle est la tension de chaque corde, en N ?', 'Que se passe-t-il si l’on tend le hamac presque à l’horizontale ?'],
      check: { value: 1693, tolerance: 0.02, unit: 'N' },
      solution: ['$P = 588$ N ; $T = \\dfrac{588}{2 \\sin 10°} = \\dfrac{588}{0{,}347} \\approx 1\\,693$ N.', 'Quand l’angle tend vers 0, sin tend vers 0 et la tension devient énorme : la corde ou les crochets cassent.'],
      fact: 'Chaque corde supporte presque trois fois le poids de Seydou !',
    },
  ],
};
