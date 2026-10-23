import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Les lunettes de grand-père, la loupe du réparateur de montres, l’appareil photo du téléphone, l’œil lui-même : tous utilisent des **lentilles**, des morceaux de verre ou de plastique bombés qui dévient la lumière pour former des images.',
  objectives: [
    'distinguer lentille convergente et divergente ;',
    'connaître foyers, distance focale et vergence ;',
    'construire l’image d’un objet avec les rayons particuliers ;',
    'utiliser la relation de conjugaison et le grandissement.',
  ],
  sections: [
    {
      title: 'Les deux types de lentilles',
      blocks: [
        {
          kind: 'table',
          head: ['', 'Convergente', 'Divergente'],
          rows: [
            ['forme', 'bords minces, centre épais', 'bords épais, centre mince'],
            ['faisceau parallèle', 'converge en un point (foyer image F′)', 'diverge'],
            ['usages', 'loupe, appareil photo, lunettes d’hypermétrope', 'lunettes de myope'],
          ],
        },
        {
          kind: 'formula',
          tex: 'C = \\dfrac{1}{f\'}',
          legend: ['vergence en dioptries (δ) ; $f\'$ distance focale en m (positive pour une lentille convergente)'],
        },
      ],
    },
    {
      title: 'Construire une image',
      blocks: [
        {
          kind: 'list',
          items: [
            'un rayon qui passe par le **centre optique O** n’est pas dévié ;',
            'un rayon **parallèle à l’axe** ressort en passant par le foyer image **F′** ;',
            'un rayon qui passe par le foyer objet **F** ressort **parallèle à l’axe**.',
          ],
        },
        {
          kind: 'formula',
          label: 'relation de conjugaison',
          tex: '\\dfrac{1}{\\overline{OA\'}} - \\dfrac{1}{\\overline{OA}} = \\dfrac{1}{f\'}',
        },
        {
          kind: 'formula',
          label: 'grandissement',
          tex: '\\gamma = \\dfrac{\\overline{A\'B\'}}{\\overline{AB}} = \\dfrac{\\overline{OA\'}}{\\overline{OA}}',
        },
        {
          kind: 'example',
          title: 'l’image sur un écran',
          text: 'Un objet est placé à 30 cm devant une lentille convergente de distance focale 10 cm : $\\overline{OA} = -30$ cm.',
          steps: ['$\\dfrac{1}{\\overline{OA\'}} = \\dfrac{1}{10} - \\dfrac{1}{30} = \\dfrac{2}{30}$, donc $\\overline{OA\'} = 15$ cm.', '$\\gamma = \\dfrac{15}{-30} = -0{,}5$ : image renversée, deux fois plus petite.'],
        },
        {
          kind: 'rule',
          text: 'Un objet placé entre le foyer F et la lentille donne une image droite et agrandie, virtuelle : c’est le principe de la **loupe**.',
        },
      ],
    },
  ],
  essentials: [
    'Lentille convergente : bords minces ; divergente : bords épais.',
    'Vergence C = 1/f′ en dioptries.',
    'Trois rayons particuliers pour construire l’image.',
    '1/OA′ − 1/OA = 1/f′ ; γ = OA′/OA (valeurs algébriques).',
  ],
  exercises: [
    {
      id: 'le-vergence',
      level: 1,
      title: 'La vergence d’une loupe',
      statement: 'Une loupe a une distance focale de 5 cm.',
      parts: [
        {
          label: 'Sa vergence, en dioptries.',
          answer: { kind: 'number', value: 20, tolerance: 0.1, unit: 'δ' },
          steps: ['$C = \\dfrac{1}{0{,}05} = 20$ δ.'],
        },
      ],
    },
    {
      id: 'le-image',
      level: 2,
      title: 'Projeter une image',
      statement: 'Un objet de 2 cm est placé à 20 cm devant une lentille convergente de distance focale 15 cm.',
      parts: [
        {
          label: 'Distance lentille–image $\\overline{OA\'}$, en cm.',
          answer: { kind: 'number', value: 60, tolerance: 0.5, unit: 'cm' },
          steps: ['$\\dfrac{1}{\\overline{OA\'}} = \\dfrac{1}{15} - \\dfrac{1}{20} = \\dfrac{1}{60}$', '$\\overline{OA\'} = 60$ cm.'],
        },
        {
          label: 'Taille de l’image, en cm (valeur absolue).',
          answer: { kind: 'number', value: 6, tolerance: 0.05, unit: 'cm' },
          steps: ['$\\gamma = \\dfrac{60}{-20} = -3$ : image renversée, $|A\'B\'| = 3 \\times 2 = 6$ cm.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Une lentille à bords minces est :',
      choices: ['convergente', 'divergente', 'plane', 'un miroir'],
      answer: 0,
      explanation: 'Elle fait converger un faisceau parallèle.',
    },
    {
      question: 'Un rayon passant par le centre optique :',
      choices: ['n’est pas dévié', 'passe par F′', 'ressort parallèle à l’axe', 'est réfléchi'],
      answer: 0,
      explanation: 'C’est l’un des trois rayons particuliers.',
    },
    {
      question: 'Les lunettes d’un myope ont des verres :',
      choices: ['divergents', 'convergents', 'plats', 'colorés'],
      answer: 0,
      explanation: 'L’œil myope est trop convergent.',
    },
    {
      question: 'Une vergence de 4 δ correspond à une distance focale de :',
      choices: ['25 cm', '4 cm', '40 cm', '2,5 cm'],
      answer: 0,
      explanation: 'f′ = 1/4 = 0,25 m.',
    },
  ],
  applications: [
    {
      title: 'Le cuiseur solaire de Tombouctou',
      tagline: 'Concentrer le soleil',
      situation:
        'Pour une démonstration, on concentre la lumière du soleil avec une grande loupe de distance focale 40 cm. Le soleil étant très loin, son image se forme au foyer.',
      model: 'Un faisceau parallèle converge au foyer image F′, à f′ de la lentille.',
      questions: ['À quelle distance de la lentille faut-il placer le papier pour qu’il s’enflamme ?', 'Quelle est la vergence de cette loupe ?'],
      check: { value: 40, tolerance: 0.01, unit: 'cm' },
      solution: ['Au foyer, à 40 cm de la lentille : toute l’énergie y est concentrée sur une petite tache.', '$C = \\dfrac{1}{0{,}40} = 2{,}5$ δ.'],
      fact: 'Les cuiseurs solaires utilisent plutôt des miroirs, mais le principe est le même : concentrer la lumière en un point.',
    },
  ],
};
