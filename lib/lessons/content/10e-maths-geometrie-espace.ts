import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Un silo à grains, une citerne d’eau, une pyramide de sacs de ciment, une case ronde au toit conique : pour savoir combien ils contiennent ou combien de matériaux il faut, on calcule des **volumes** et des **aires** dans l’espace.',
  objectives: [
    'reconnaître les positions relatives de droites et de plans ;',
    'représenter un solide en perspective cavalière ;',
    'calculer aires et volumes des solides usuels ;',
    'utiliser l’effet d’un agrandissement sur un volume.',
  ],
  sections: [
    {
      title: 'Droites et plans',
      blocks: [
        {
          kind: 'list',
          items: [
            'deux droites de l’espace sont **sécantes**, **parallèles** ou **non coplanaires** (elles ne se coupent pas et ne sont pas parallèles) ;',
            'une droite et un plan sont sécants, ou la droite est parallèle au plan (éventuellement contenue dedans) ;',
            'deux plans sont parallèles ou se coupent selon une droite.',
          ],
        },
        {
          kind: 'rule',
          text: 'Une droite est orthogonale à un plan si elle est orthogonale à **deux droites sécantes** de ce plan.',
        },
      ],
    },
    {
      title: 'Aires et volumes',
      blocks: [
        {
          kind: 'table',
          head: ['Solide', 'Volume'],
          rows: [
            ['pavé droit', '$V = L \\times \\ell \\times h$'],
            ['prisme droit, cylindre', '$V = \\mathcal B \\times h$ ; cylindre : $V = \\pi r^2 h$'],
            ['pyramide, cône', '$V = \\dfrac{1}{3}\\,\\mathcal B \\times h$ ; cône : $V = \\dfrac13 \\pi r^2 h$'],
            ['boule', '$V = \\dfrac{4}{3}\\pi r^3$ ; aire de la sphère : $4\\pi r^2$'],
          ],
        },
        {
          kind: 'rule',
          text: 'Dans un agrandissement de rapport $k$, les longueurs sont multipliées par $k$, les aires par $k^2$ et les volumes par $k^3$.',
        },
        {
          kind: 'example',
          title: 'la citerne',
          text: 'Une citerne cylindrique a un rayon de 1 m et une hauteur de 2,5 m.',
          steps: ['$V = \\pi \\times 1^2 \\times 2{,}5 \\approx 7{,}85$ m³, soit environ 7 850 L.'],
        },
      ],
    },
  ],
  essentials: [
    'Droites de l’espace : sécantes, parallèles ou non coplanaires.',
    'Prisme, cylindre : B × h ; pyramide, cône : B × h / 3 ; boule : 4πr³/3.',
    '1 m³ = 1 000 L.',
    'Agrandissement de rapport k : volumes × k³.',
  ],
  exercises: [
    {
      id: 'ge-silo',
      level: 1,
      title: 'Le silo à mil',
      statement: 'Un silo cylindrique a un diamètre de 2 m et une hauteur de 3 m. On prend π ≈ 3,14.',
      parts: [
        {
          label: 'Volume du silo, en m³ (arrondi au centième).',
          answer: { kind: 'number', value: 9.42, tolerance: 0.02, unit: 'm³' },
          steps: ['$r = 1$ m ; $V = 3{,}14 \\times 1 \\times 3 = 9{,}42$ m³.'],
        },
      ],
    },
    {
      id: 'ge-case',
      level: 2,
      title: 'Le toit de la case',
      statement: 'Le toit d’une case ronde est un cône de rayon 3 m et de hauteur 2 m.',
      parts: [
        {
          label: 'Volume sous le toit, en m³ (arrondi au dixième).',
          answer: { kind: 'number', value: 18.8, tolerance: 0.1, unit: 'm³' },
          steps: ['$V = \\dfrac13 \\pi \\times 9 \\times 2 = 6\\pi \\approx 18{,}8$ m³.'],
        },
        {
          label: 'Longueur d’une génératrice (du sommet au bord), en m (arrondie au centième).',
          answer: { kind: 'number', value: 3.61, tolerance: 0.01, unit: 'm' },
          steps: ['Pythagore : $\\sqrt{3^2 + 2^2} = \\sqrt{13} \\approx 3{,}61$ m.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: '1 m³ correspond à :',
      choices: ['1 000 L', '100 L', '10 L', '1 L'],
      answer: 0,
      explanation: '1 dm³ = 1 L.',
    },
    {
      question: 'Le volume d’un cône est … celui du cylindre de même base et même hauteur :',
      choices: ['le tiers de', 'la moitié de', 'égal à', 'le double de'],
      answer: 0,
      explanation: 'Facteur 1/3.',
    },
    {
      question: 'Si on double le rayon d’une boule, son volume est multiplié par :',
      choices: ['8', '2', '4', '6'],
      answer: 0,
      explanation: '2³ = 8.',
    },
    {
      question: 'Deux droites de l’espace qui ne se coupent pas sont :',
      choices: ['parallèles ou non coplanaires', 'toujours parallèles', 'toujours perpendiculaires', 'sécantes'],
      answer: 0,
      explanation: 'Dans l’espace, il existe des droites ni parallèles ni sécantes.',
    },
  ],
  applications: [
    {
      title: 'Le château d’eau du quartier',
      tagline: 'Combien de jours de réserve ?',
      situation:
        'Le château d’eau d’un quartier de Sévaré a une cuve cylindrique de 4 m de rayon et 5 m de haut. Le quartier consomme 60 m³ d’eau par jour.',
      model: 'V = π r² h.',
      questions: ['Quel volume d’eau contient la cuve pleine, en m³ ?', 'Combien de jours dure la réserve sans pompage ?'],
      check: { value: 251, tolerance: 0.01, unit: 'm³' },
      solution: ['$V = \\pi \\times 16 \\times 5 = 80\\pi \\approx 251$ m³.', '$\\dfrac{251}{60} \\approx 4{,}2$ jours.'],
      fact: 'Le château d’eau est en hauteur pour que l’eau arrive aux robinets avec assez de pression, sans pompe.',
    },
  ],
};
