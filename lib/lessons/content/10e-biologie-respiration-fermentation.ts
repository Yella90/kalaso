import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'La pâte à pain gonfle, le dolo (bière de mil) mousse, et un coureur essoufflé a mal aux jambes : trois phénomènes qui ont la même cause. Les cellules tirent l’énergie du glucose, soit avec le dioxygène (**respiration**), soit sans lui (**fermentation**).',
  objectives: [
    'écrire le bilan de la respiration ;',
    'écrire le bilan de la fermentation alcoolique et de la fermentation lactique ;',
    'comparer l’énergie produite dans les deux cas ;',
    'citer des usages des fermentations au Mali.',
  ],
  sections: [
    {
      title: 'La respiration cellulaire',
      blocks: [
        {
          kind: 'formula',
          tex: '\\ce{C6H12O6} + 6\\,\\ce{O2} \\longrightarrow 6\\,\\ce{CO2} + 6\\,\\ce{H2O} + \\text{énergie}',
        },
        {
          kind: 'text',
          text: 'Elle a lieu dans les **mitochondries**. L’oxydation du glucose est complète : elle libère beaucoup d’énergie, environ 2 860 kJ par mole de glucose, dont une partie est stockée sous forme d’**ATP**.',
        },
        { kind: 'photo', id: 'mitochondrie-meb', caption: 'Une mitochondrie, lieu de la respiration.' },
        {
          kind: 'example',
          title: 'mettre en évidence le CO₂',
          text: 'De l’air expiré qui barbote dans l’eau de chaux la trouble : il contient du dioxyde de carbone.',
        },
      ],
    },
    {
      title: 'Les fermentations',
      blocks: [
        {
          kind: 'formula',
          label: 'fermentation alcoolique (levures)',
          tex: '\\ce{C6H12O6} \\longrightarrow 2\\,\\ce{C2H5OH} + 2\\,\\ce{CO2} + \\text{un peu d’énergie}',
        },
        {
          kind: 'formula',
          label: 'fermentation lactique (bactéries, muscles)',
          tex: '\\ce{C6H12O6} \\longrightarrow 2\\,\\ce{C3H6O3} \\;(\\text{acide lactique}) + \\text{un peu d’énergie}',
        },
        {
          kind: 'table',
          head: ['', 'Respiration', 'Fermentation'],
          rows: [
            ['dioxygène', 'nécessaire', 'pas nécessaire'],
            ['dégradation du glucose', 'complète (CO₂ + H₂O)', 'incomplète (alcool ou acide lactique)'],
            ['énergie par glucose', 'grande (≈ 36 ATP)', 'faible (2 ATP)'],
            ['exemples', 'animaux, plantes', 'levures du pain et du dolo ; bactéries du lait caillé'],
          ],
        },
        {
          kind: 'rule',
          text: 'Pendant un effort intense, le muscle manque de dioxygène : il fait de la fermentation lactique. L’acide lactique contribue à la fatigue musculaire.',
        },
      ],
    },
  ],
  essentials: [
    'Respiration : glucose + O₂ → CO₂ + H₂O + beaucoup d’énergie (mitochondries).',
    'Fermentation alcoolique : glucose → éthanol + CO₂ ; lactique : glucose → acide lactique.',
    'La fermentation se fait sans dioxygène et libère beaucoup moins d’énergie.',
    'Usages : pain, dolo, lait caillé (fènè), conservation.',
  ],
  exercises: [
    {
      id: 'rf-energie',
      level: 1,
      title: 'Comparer les rendements',
      statement: 'Une mole de glucose donne environ 36 ATP par la respiration et 2 ATP par la fermentation.',
      parts: [
        {
          label: 'Combien de fois plus d’ATP la respiration produit-elle ?',
          answer: { kind: 'number', value: 18, tolerance: 0.1, unit: '' },
          steps: ['$\\dfrac{36}{2} = 18$.'],
        },
        {
          label: 'Combien de moles de glucose une levure doit-elle fermenter pour obtenir autant d’ATP qu’une mole respirée ?',
          answer: { kind: 'number', value: 18, tolerance: 0.1, unit: 'mol' },
          steps: ['Il faut 18 fois plus de glucose : c’est pourquoi les levures consomment vite le sucre.'],
        },
      ],
    },
    {
      id: 'rf-pain',
      level: 2,
      title: 'Le gaz de la pâte à pain',
      statement: 'Des levures fermentent 18 g de glucose (M = 180 g/mol) dans la pâte. À la température du four, une mole de gaz occupe environ 24 L.',
      parts: [
        {
          label: 'Quantité de glucose fermentée, en mol.',
          answer: { kind: 'number', value: 0.1, tolerance: 0.002, unit: 'mol' },
          steps: ['$n = \\dfrac{18}{180} = 0{,}1$ mol.'],
        },
        {
          label: 'Volume de CO₂ produit, en L (avec 24 L/mol).',
          answer: { kind: 'number', value: 4.8, tolerance: 0.05, unit: 'L' },
          steps: ['1 glucose donne 2 CO₂ : $0{,}2$ mol.', '$0{,}2 \\times 24 = 4{,}8$ L : c’est ce gaz qui fait lever la pâte.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'La respiration cellulaire a lieu dans :',
      choices: ['les mitochondries', 'les chloroplastes', 'le noyau', 'la vacuole'],
      answer: 0,
      explanation: 'La mitochondrie est la centrale énergétique de la cellule.',
    },
    {
      question: 'Les bulles du dolo qui fermente sont du :',
      choices: ['dioxyde de carbone', 'dioxygène', 'dihydrogène', 'diazote'],
      answer: 0,
      explanation: 'La fermentation alcoolique produit du CO₂ et de l’éthanol.',
    },
    {
      question: 'Le lait caillé est obtenu par :',
      choices: ['une fermentation lactique', 'une fermentation alcoolique', 'la respiration', 'la photosynthèse'],
      answer: 0,
      explanation: 'Des bactéries transforment le lactose en acide lactique, qui fait cailler le lait.',
    },
    {
      question: 'Quel processus libère le plus d’énergie par molécule de glucose ?',
      choices: ['la respiration', 'la fermentation alcoolique', 'la fermentation lactique', 'ils sont égaux'],
      answer: 0,
      explanation: 'L’oxydation complète du glucose libère environ 18 fois plus d’ATP.',
    },
  ],
  applications: [
    {
      title: 'Le fènè de la grand-mère',
      tagline: 'Pourquoi le lait caillé se garde-t-il ?',
      situation:
        'La grand-mère d’Oumou ajoute un peu de lait caillé de la veille à du lait frais, couvre la calebasse et attend un jour. Le lait devient épais et acide. Un litre de lait contient environ 48 g de lactose, et 1 g de lactose donne environ 1 g d’acide lactique.',
      model: 'Fermentation lactique par les bactéries du lait caillé.',
      questions: ['Quelle masse maximale d’acide lactique peut se former dans 2 L de lait ?', 'Pourquoi ajouter du lait caillé de la veille ?'],
      check: { value: 96, tolerance: 0.02, unit: 'g' },
      solution: [
        '$2 \\times 48 = 96$ g de lactose, donc au plus environ 96 g d’acide lactique.',
        'Il apporte les bonnes bactéries lactiques, qui démarrent vite la fermentation. L’acidité empêche ensuite les microbes dangereux de se développer.',
      ],
      fact: 'Le pain, le dolo, le soumbala et le fènè sont tous préparés grâce à des fermentations.',
    },
  ],
};
