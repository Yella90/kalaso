import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Les maisons de Djenné sont en banco, la falaise de Bandiagara en grès, les meules des femmes en granite, et l’or de Kayes et de Sikasso se cache dans le quartz. Chaque roche raconte comment elle s’est formée : en refroidissant d’un magma, en se déposant au fond de l’eau, ou en se transformant sous la chaleur et la pression.',
  objectives: [
    'distinguer roche et minéral ;',
    'reconnaître les trois familles de roches ;',
    'relier une roche à son origine ;',
    'utiliser la densité d’une roche.',
  ],
  sections: [
    {
      title: 'Roches et minéraux',
      blocks: [
        {
          kind: 'definition',
          term: 'Minéral',
          text: 'substance naturelle solide de composition chimique définie, souvent cristallisée : quartz, feldspath, mica, calcite.',
        },
        {
          kind: 'definition',
          term: 'Roche',
          text: 'assemblage d’un ou plusieurs minéraux. Le granite contient du quartz, du feldspath et du mica.',
        },
      ],
    },
    {
      title: 'Les trois familles de roches',
      blocks: [
        {
          kind: 'table',
          head: ['Famille', 'Formation', 'Exemples au Mali'],
          rows: [
            ['magmatiques', 'refroidissement d’un magma : lent en profondeur (grenu : granite), rapide en surface (volcanique : basalte)', 'granite de Kati, dolérites du pays dogon'],
            ['sédimentaires', 'dépôt de débris ou de précipités au fond de l’eau, puis compaction en couches', 'grès de Bandiagara, calcaires, argiles, phosphates de Tilemsi'],
            ['métamorphiques', 'transformation d’une roche à l’état solide par la chaleur et la pression', 'schistes et quartzites de Kayes'],
          ],
        },
        { kind: 'photo', id: 'falaise-bandiagara', caption: 'Les couches de grès de la falaise de Bandiagara : une roche sédimentaire.' },
        {
          kind: 'rule',
          text: 'Les roches sédimentaires sont disposées en **couches** (strates) et contiennent parfois des **fossiles** ; les roches magmatiques grenues montrent des **cristaux** visibles.',
        },
      ],
    },
    {
      title: 'Le cycle des roches',
      blocks: [
        {
          kind: 'text',
          text: 'L’érosion (pluie, vent, harmattan) détruit les roches ; les débris sont transportés par les fleuves et déposés ; ils deviennent roches sédimentaires ; enfouies, elles se transforment en roches métamorphiques, puis peuvent fondre et redonner un magma.',
        },
        {
          kind: 'formula',
          tex: 'd = \\dfrac{\\rho_{\\text{roche}}}{\\rho_{\\text{eau}}} = \\dfrac{m}{V \\times 1\\,\\text{g/cm}^3}',
          legend: ['densité d’une roche ; on mesure V en la plongeant dans une éprouvette d’eau'],
        },
      ],
    },
  ],
  essentials: [
    'Une roche est un assemblage de minéraux.',
    'Magmatiques (granite, basalte) : refroidissement d’un magma.',
    'Sédimentaires (grès, calcaire, argile) : dépôts en couches, parfois fossiles.',
    'Métamorphiques (schiste, quartzite) : transformation à l’état solide.',
  ],
  exercises: [
    {
      id: 'ro-densite',
      level: 1,
      title: 'La densité d’un caillou',
      statement: 'Un morceau de granite pèse 135 g. Plongé dans une éprouvette, il fait monter l’eau de 200 mL à 250 mL.',
      parts: [
        {
          label: 'Volume du caillou, en cm³.',
          answer: { kind: 'number', value: 50, tolerance: 0.5, unit: 'cm³' },
          steps: ['$250 - 200 = 50$ mL = 50 cm³.'],
        },
        {
          label: 'Densité du granite.',
          answer: { kind: 'number', value: 2.7, tolerance: 0.02, unit: '' },
          steps: ['$\\rho = \\dfrac{135}{50} = 2{,}7$ g/cm³, donc $d = 2{,}7$.'],
        },
      ],
    },
    {
      id: 'ro-famille',
      level: 2,
      title: 'Identifier une roche',
      statement: 'Réponds : magmatique, sédimentaire ou métamorphique.',
      parts: [
        {
          label: 'Une roche en couches qui contient des coquillages fossiles.',
          answer: { kind: 'text', display: 'sédimentaire', accepted: ['sédimentaire', 'sedimentaire'] },
          steps: ['Couches et fossiles : dépôt au fond de l’eau.'],
        },
        {
          label: 'Une roche à gros cristaux de quartz, feldspath et mica.',
          answer: { kind: 'text', display: 'magmatique', accepted: ['magmatique'] },
          steps: ['C’est un granite : magma refroidi lentement en profondeur.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Le grès de Bandiagara est une roche :',
      choices: ['sédimentaire', 'magmatique', 'métamorphique', 'volcanique'],
      answer: 0,
      explanation: 'C’est du sable cimenté, déposé en couches.',
    },
    {
      question: 'Un magma qui refroidit lentement en profondeur donne :',
      choices: ['une roche grenue comme le granite', 'du basalte', 'du calcaire', 'de l’argile'],
      answer: 0,
      explanation: 'Les cristaux ont le temps de grossir.',
    },
    {
      question: 'Le quartz est :',
      choices: ['un minéral', 'une roche', 'un fossile', 'un magma'],
      answer: 0,
      explanation: 'Il entre dans la composition de nombreuses roches.',
    },
    {
      question: 'Une roche métamorphique se forme :',
      choices: ['par transformation d’une roche sous chaleur et pression', 'par dépôt au fond d’un lac', 'par refroidissement d’une lave', 'par évaporation de l’eau'],
      answer: 0,
      explanation: 'Elle reste solide pendant sa transformation.',
    },
  ],
  applications: [
    {
      title: 'Le banco de Djenné',
      tagline: 'Une roche pour bâtir',
      situation:
        'La Grande Mosquée de Djenné est construite en banco : de l’argile du fleuve mêlée de paille, moulée en briques séchées au soleil. Chaque année, la population recouvre les murs d’une nouvelle couche. Une brique de 40 cm × 20 cm × 10 cm pèse 12 kg.',
      model: 'L’argile est une roche sédimentaire très fine qui devient plastique avec l’eau.',
      questions: ['Quelle est la masse volumique de la brique, en g/cm³ ?', 'Pourquoi faut-il recrépir les murs chaque année ?'],
      check: { value: 1.5, tolerance: 0.02, unit: 'g/cm³' },
      solution: [
        '$V = 40 \\times 20 \\times 10 = 8\\,000$ cm³ ; $\\rho = \\dfrac{12\\,000}{8\\,000} = 1{,}5$ g/cm³.',
        'Les pluies érodent l’argile, comme elles érodent les roches de la falaise : le crépissage remplace la couche emportée.',
      ],
      fact: 'La Grande Mosquée de Djenné est inscrite au patrimoine mondial de l’UNESCO ; c’est le plus grand bâtiment en terre crue du monde.',
    },
  ],
};
