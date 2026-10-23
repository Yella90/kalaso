import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Pour garder le poisson du fleuve Niger, les femmes de Mopti le couvrent de sel et le sèchent au soleil. Pourquoi le sel empêche-t-il le poisson de pourrir ? Et pourquoi les feuilles de salade fanées redeviennent-elles fermes dans un bol d’eau ? Tout se joue au niveau de la membrane des cellules : l’eau la traverse.',
  objectives: [
    'expliquer la diffusion d’une substance dissoute ;',
    'définir l’osmose et prévoir le sens du déplacement de l’eau ;',
    'distinguer turgescence et plasmolyse ;',
    'expliquer la conservation des aliments par le sel ou le sucre.',
  ],
  sections: [
    {
      title: 'La diffusion',
      blocks: [
        {
          kind: 'definition',
          term: 'Diffusion',
          text: 'déplacement spontané d’une substance dissoute du milieu où elle est **la plus concentrée** vers le milieu où elle est **la moins concentrée**, jusqu’à l’égalité des concentrations.',
        },
        {
          kind: 'example',
          title: 'le sucre dans le thé',
          text: 'Un morceau de sucre posé au fond du verre finit par sucrer tout le thé, même sans remuer : les molécules de sucre diffusent.',
        },
        {
          kind: 'text',
          text: 'Le dioxygène passe ainsi de l’air des poumons vers le sang, et le dioxyde de carbone du sang vers l’air.',
        },
      ],
    },
    {
      title: 'L’osmose',
      blocks: [
        {
          kind: 'definition',
          term: 'Osmose',
          text: 'passage de l’**eau** à travers une membrane, du milieu le **moins concentré** en substances dissoutes (hypotonique) vers le milieu le **plus concentré** (hypertonique).',
        },
        {
          kind: 'table',
          head: ['Milieu extérieur', 'Sens de l’eau', 'Cellule végétale', 'Globule rouge'],
          rows: [
            ['hypotonique (eau pure)', 'entre dans la cellule', 'turgescente (gonflée, ferme)', 'gonfle puis éclate (hémolyse)'],
            ['isotonique (9 g/L de sel)', 'entre et sort autant', 'normale', 'normal'],
            ['hypertonique (eau très salée)', 'sort de la cellule', 'plasmolysée (vacuole rétractée)', 'se ratatine'],
          ],
        },
        { kind: 'photo', id: 'plasmolyse-video', caption: 'Plasmolyse de cellules d’oignon rouge dans l’eau salée, filmée en accéléré.' },
        {
          kind: 'trap',
          wrong: '« Dans l’eau salée, le sel entre dans la cellule. »',
          why: 'La membrane laisse passer l’eau beaucoup plus facilement que le sel : c’est l’eau qui sort.',
          reflex: 'L’eau va toujours vers le milieu le plus concentré.',
        },
      ],
    },
    {
      title: 'Conserver les aliments',
      blocks: [
        {
          kind: 'text',
          text: 'Dans le poisson salé, la confiture ou le lait concentré sucré, le milieu est très hypertonique : les bactéries et les moisissures perdent leur eau par osmose et ne peuvent plus se multiplier.',
        },
        {
          kind: 'rule',
          text: 'Le sérum physiologique (eau salée à 9 g/L) est **isotonique** au sang : on peut l’injecter sans abîmer les globules rouges.',
        },
      ],
    },
  ],
  essentials: [
    'Diffusion : une substance dissoute va du plus concentré vers le moins concentré.',
    'Osmose : l’eau traverse la membrane vers le milieu le plus concentré.',
    'Milieu hypotonique : turgescence (ou hémolyse) ; hypertonique : plasmolyse.',
    'Le sel et le sucre conservent les aliments en déshydratant les microbes.',
  ],
  simulationTasks: [
    'place le globule rouge dans l’eau pure, puis dans une eau à 9 g/L, puis à 20 g/L ;',
    'fais de même avec la cellule végétale : pourquoi n’éclate-t-elle pas dans l’eau pure ?',
  ],
  exercises: [
    {
      id: 'ech-serum',
      level: 1,
      title: 'Préparer du sérum physiologique',
      statement: 'Le sérum physiologique contient 9 g de sel par litre.',
      parts: [
        {
          label: 'Masse de sel pour préparer 250 mL de sérum (en g).',
          answer: { kind: 'number', value: 2.25, tolerance: 0.01, unit: 'g' },
          steps: ['250 mL = 0,25 L.', '$9 \\times 0{,}25 = 2{,}25$ g.'],
        },
        {
          label: 'Une eau à 30 g/L est-elle hypotonique ou hypertonique pour un globule rouge ?',
          answer: { kind: 'text', display: 'hypertonique', accepted: ['hypertonique'] },
          steps: ['30 g/L est plus concentré que le contenu du globule (9 g/L) : le milieu est hypertonique, l’eau sort.'],
        },
      ],
    },
    {
      id: 'ech-pomme',
      level: 2,
      title: 'Des frites de pomme de terre',
      statement: 'Une frite de pomme de terre pèse 10,0 g. Après une heure dans de l’eau très salée, elle pèse 8,6 g.',
      parts: [
        {
          label: 'Perte de masse en pourcentage.',
          answer: { kind: 'number', value: 14, tolerance: 0.2, unit: '%' },
          steps: ['Perte : $10{,}0 - 8{,}6 = 1{,}4$ g.', '$\\dfrac{1{,}4}{10{,}0} \\times 100 = 14$ %.'],
        },
        {
          label: 'Quelle substance a quitté la frite ? (un mot)',
          answer: { kind: 'text', display: 'eau', accepted: ['eau', "l'eau", 'l’eau'] },
          steps: ['L’eau est sortie des cellules par osmose : elles sont plasmolysées et la frite devient molle.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Lors de l’osmose, ce qui traverse la membrane est surtout :',
      choices: ['l’eau', 'le sel', 'le sucre', 'les protéines'],
      answer: 0,
      explanation: 'La membrane est perméable à l’eau.',
    },
    {
      question: 'Une cellule végétale dans l’eau pure devient :',
      choices: ['turgescente', 'plasmolysée', 'éclatée', 'morte'],
      answer: 0,
      explanation: 'L’eau entre, la vacuole gonfle ; la paroi l’empêche d’éclater.',
    },
    {
      question: 'Pourquoi le poisson salé se conserve-t-il ?',
      choices: ['les microbes perdent leur eau', 'le sel tue les microbes en les brûlant', 'le sel bouche les pores', 'le sel refroidit le poisson'],
      answer: 0,
      explanation: 'Le milieu très salé déshydrate les microbes par osmose.',
    },
    {
      question: 'La diffusion d’une substance dissoute se fait :',
      choices: ['du milieu le plus concentré vers le moins concentré', 'du moins concentré vers le plus concentré', 'au hasard, sans direction', 'seulement dans l’air'],
      answer: 0,
      explanation: 'Elle s’arrête quand les concentrations sont égales.',
    },
  ],
  applications: [
    {
      title: 'Les tomates séchées de Baguineda',
      tagline: 'Saler pour conserver',
      situation:
        'Pour vendre ses tomates hors saison, Kadiatou les coupe en deux, les sale et les sèche au soleil. 5 kg de tomates fraîches, qui contiennent 94 % d’eau, donnent à la fin 0,5 kg de tomates séchées.',
      model: 'Le sel attire l’eau hors des cellules par osmose, puis le soleil l’évapore.',
      questions: ['Quelle masse d’eau a été retirée (en kg) ?', 'Pourquoi les moisissures ne se développent-elles plus ?'],
      check: { value: 4.5, tolerance: 0.02, unit: 'kg' },
      solution: [
        '$5 - 0{,}5 = 4{,}5$ kg d’eau ont été retirés.',
        'Le milieu est devenu très concentré (hypertonique) et sec : les moisissures y perdent leur eau et ne peuvent plus se multiplier.',
      ],
      fact: 'La même idée sert pour le lait caillé sucré, la confiture de mangue ou le poisson fumé-salé du delta.',
    },
  ],
};
