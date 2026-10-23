import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'La mangue bien mûre, le jus de bissap sucré, la bouillie de mil : leur goût sucré vient en grande partie du **glucose**. C’est aussi le carburant de nos cellules, que le sang transporte jusqu’aux muscles et au cerveau. Et c’est lui que les levures transforment en alcool pour préparer le dolo.',
  objectives: [
    'écrire la formule brute et la formule semi-développée du glucose, et reconnaître ses groupes fonctionnels ;',
    'expliquer le caractère réducteur du glucose avec la liqueur de Fehling et le réactif de Tollens ;',
    'écrire les équations de la fermentation alcoolique et de la respiration ;',
    'faire des calculs de quantités de matière sur ces réactions.',
  ],
  sections: [
    {
      title: 'Formule et structure du glucose',
      blocks: [
        {
          kind: 'definition',
          term: 'Glucose',
          text: 'sucre de formule brute $\\ce{C6H12O6}$ ($M = 180$ g/mol). C’est un **ose** : il ne peut pas être découpé en sucres plus petits.',
        },
        {
          kind: 'formula',
          label: 'Forme ouverte (chaîne linéaire)',
          tex: '\\ce{HOCH2-CHOH-CHOH-CHOH-CHOH-CHO}',
          legend: ['un groupe **aldéhyde** $\\ce{-CHO}$ sur le carbone 1', 'cinq groupes **hydroxyle** $\\ce{-OH}$ (fonctions alcool)'],
        },
        {
          kind: 'text',
          text: 'Le glucose est donc un **aldohexose** : un sucre à 6 carbones qui porte un groupe aldéhyde. Ses carbones 2, 3, 4 et 5 sont **asymétriques** (liés à quatre groupes différents) : la molécule est chirale. Le glucose naturel est le D-glucose.',
        },
        {
          kind: 'text',
          text: 'En solution, la chaîne se referme presque entièrement sur elle-même : le groupe $\\ce{-OH}$ du carbone 5 réagit avec le groupe aldéhyde et forme un cycle à six atomes. La forme ouverte, très minoritaire, se reforme sans cesse : c’est elle qui donne les réactions de l’aldéhyde.',
        },
        {
          kind: 'callout',
          variant: 'remarque',
          blocks: [
            {
              kind: 'text',
              text: 'Le **fructose** (sucre des fruits et du miel) a la même formule brute $\\ce{C6H12O6}$ : c’est un isomère du glucose, mais il porte un groupe **cétone** sur le carbone 2. Le **saccharose** (sucre de canne de Dougabougou) est formé d’un glucose et d’un fructose liés ; l’amidon du mil et la cellulose du bois sont de longues chaînes de glucose.',
            },
          ],
        },
      ],
    },
    {
      title: 'Le glucose, un réducteur',
      blocks: [
        {
          kind: 'text',
          text: 'Comme tous les aldéhydes, le glucose s’oxyde facilement : son groupe $\\ce{-CHO}$ devient un groupe carboxyle $\\ce{-COOH}$ (acide gluconique), ou l’ion carboxylate $\\ce{-COO-}$ en milieu basique.',
        },
        {
          kind: 'table',
          head: ['Test', 'Ce qu’on observe', 'Ce qui se passe'],
          rows: [
            ['Liqueur de Fehling, à chaud', 'Précipité **rouge brique**', 'Les ions $\\ce{Cu^2+}$ (bleus) sont réduits en oxyde de cuivre(I) $\\ce{Cu2O}$'],
            ['Réactif de Tollens, au bain-marie', 'Dépôt d’argent brillant : **miroir d’argent**', 'Les ions $\\ce{Ag+}$ sont réduits en argent métal $\\ce{Ag}$'],
            ['DNPH', 'Précipité jaune-orangé', 'Test du groupe carbonyle (aldéhyde ou cétone)'],
          ],
        },
        {
          kind: 'formula',
          label: 'Test à la liqueur de Fehling (milieu basique)',
          tex: '\\ce{R-CHO + 2Cu^2+ + 5OH- -> R-COO- + Cu2O + 3H2O}',
          legend: ['$\\ce{R-CHO}$ : le glucose ; 1 mol de glucose donne 1 mol de $\\ce{Cu2O}$'],
        },
        {
          kind: 'example',
          title: 'reconnaître un sucre réducteur',
          text: 'On chauffe un peu de jus de mangue avec de la liqueur de Fehling : un précipité rouge brique apparaît.',
          steps: ['Le jus contient un sucre réducteur, donc un groupe aldéhyde libre : c’est le glucose.', 'Le saccharose seul ne donne pas ce test : son groupe aldéhyde est engagé dans la liaison avec le fructose.'],
        },
      ],
    },
    {
      title: 'Fermentation et respiration',
      blocks: [
        {
          kind: 'formula',
          label: 'Fermentation alcoolique (levures, sans dioxygène)',
          tex: '\\ce{C6H12O6 -> 2C2H5OH + 2CO2}',
        },
        {
          kind: 'text',
          text: 'C’est la réaction qui fait « travailler » la pâte à pain et qui donne l’alcool du dolo, de la bière de mil ou du vin de palme. Le dioxyde de carbone forme les bulles.',
        },
        {
          kind: 'formula',
          label: 'Respiration cellulaire (avec dioxygène)',
          tex: '\\ce{C6H12O6 + 6O2 -> 6CO2 + 6H2O} \\qquad \\Delta E \\approx 2\\,800\\ \\text{kJ par mole de glucose}',
        },
        {
          kind: 'text',
          text: 'La respiration libère l’énergie dont les cellules ont besoin. La **photosynthèse**, dans les feuilles des plantes, fait la réaction inverse grâce à l’énergie de la lumière.',
        },
        {
          kind: 'trap',
          wrong: '« 1 mole de glucose donne 1 mole d’éthanol. »',
          why: 'L’équation de la fermentation montre le coefficient 2 devant $\\ce{C2H5OH}$.',
          reflex: 'Toujours lire les coefficients de l’équation : $n(\\text{éthanol}) = 2\\,n(\\text{glucose})$.',
        },
      ],
    },
  ],
  essentials: [
    'Glucose : $\\ce{C6H12O6}$, $M = 180$ g/mol ; un groupe aldéhyde et cinq groupes hydroxyle ; quatre carbones asymétriques.',
    'Réducteur : précipité rouge brique avec la liqueur de Fehling, miroir d’argent avec le réactif de Tollens.',
    'Fermentation : $\\ce{C6H12O6 -> 2C2H5OH + 2CO2}$.',
    'Respiration : $\\ce{C6H12O6 + 6O2 -> 6CO2 + 6H2O}$, environ 2 800 kJ par mole.',
  ],
  exercises: [
    {
      id: 'glucose-fermentation',
      level: 1,
      title: 'Du sucre à l’alcool',
      statement:
        'On fait fermenter complètement 9,0 g de glucose. Masses molaires : C = 12, H = 1, O = 16 g/mol.',
      given: [
        { label: '$m$(glucose)', value: '9,0 g' },
        { label: '$M$(éthanol)', value: '46 g/mol' },
      ],
      parts: [
        {
          label: 'Calcule la masse molaire du glucose (en g/mol).',
          answer: { kind: 'number', value: 180, tolerance: 0.5, unit: 'g/mol' },
          steps: ['$M = 6 \\times 12 + 12 \\times 1 + 6 \\times 16 = 180$ g/mol.'],
          result: 'M(\\ce{C6H12O6}) = 180\\ \\text{g/mol}',
        },
        {
          label: 'Calcule la quantité de glucose (en mol).',
          answer: { kind: 'number', value: 0.05, tolerance: 0.001, unit: 'mol' },
          steps: ['$n = \\dfrac{m}{M} = \\dfrac{9{,}0}{180} = 0{,}050$ mol.'],
          result: 'n = 5{,}0 \\times 10^{-2}\\ \\text{mol}',
        },
        {
          label: 'Quelle masse d’éthanol obtient-on (en g) ?',
          answer: { kind: 'number', value: 4.6, tolerance: 0.05, unit: 'g' },
          steps: ['D’après l’équation, $n(\\text{éthanol}) = 2 \\times 0{,}050 = 0{,}10$ mol.', '$m = 0{,}10 \\times 46 = 4{,}6$ g.'],
          result: 'm(\\text{éthanol}) = 4{,}6\\ \\text{g}',
        },
      ],
    },
    {
      id: 'glucose-fehling',
      level: 2,
      title: 'Doser le glucose d’un jus de mangue',
      statement:
        'On traite 20,0 mL de jus de mangue par un excès de liqueur de Fehling, à chaud. On filtre, on sèche et on pèse le précipité rouge brique : 0,72 g. On admet que seul le glucose réagit. $M(\\ce{Cu2O}) = 143$ g/mol.',
      given: [
        { label: '$V$(jus)', value: '20,0 mL' },
        { label: '$m(\\ce{Cu2O})$', value: '0,72 g' },
      ],
      parts: [
        {
          label: 'Calcule la quantité d’oxyde de cuivre(I) formée (en mol).',
          answer: { kind: 'number', value: 0.005035, tolerance: 0.0001, unit: 'mol' },
          steps: ['$n(\\ce{Cu2O}) = \\dfrac{0{,}72}{143} \\approx 5{,}0 \\times 10^{-3}$ mol.'],
          result: 'n(\\ce{Cu2O}) \\approx 5{,}0 \\times 10^{-3}\\ \\text{mol}',
        },
        {
          label: 'Quelle masse de glucose contenaient les 20,0 mL de jus (en g) ?',
          answer: { kind: 'number', value: 0.906, tolerance: 0.02, unit: 'g' },
          steps: ['1 mol de glucose donne 1 mol de $\\ce{Cu2O}$ : $n(\\text{glucose}) = 5{,}03 \\times 10^{-3}$ mol.', '$m = 5{,}03 \\times 10^{-3} \\times 180 \\approx 0{,}91$ g.'],
          result: 'm(\\text{glucose}) \\approx 0{,}91\\ \\text{g}',
        },
        {
          label: 'Calcule la concentration massique en glucose du jus (en g/L).',
          answer: { kind: 'number', value: 45.3, tolerance: 0.8, unit: 'g/L' },
          steps: ['$C_m = \\dfrac{m}{V} = \\dfrac{0{,}906}{0{,}0200} \\approx 45$ g/L.'],
          result: 'C_m \\approx 45\\ \\text{g/L}',
        },
      ],
    },
    {
      id: 'glucose-respiration',
      level: 3,
      title: 'L’énergie du petit-déjeuner',
      statement:
        'La bouillie d’un élève apporte 50 g de glucose, entièrement utilisés par la respiration. La combustion d’une mole de glucose libère 2 800 kJ. Volume molaire des gaz : $V_m = 24$ L/mol.',
      given: [
        { label: '$m$', value: '50 g' },
        { label: 'énergie', value: '2 800 kJ/mol' },
        { label: '$V_m$', value: '24 L/mol' },
      ],
      parts: [
        {
          label: 'Quelle énergie la respiration de ce glucose libère-t-elle (en kJ) ?',
          answer: { kind: 'number', value: 778, tolerance: 8, unit: 'kJ' },
          steps: ['$n = \\dfrac{50}{180} \\approx 0{,}278$ mol.', '$E = 0{,}278 \\times 2\\,800 \\approx 778$ kJ.'],
          result: 'E \\approx 7{,}8 \\times 10^{2}\\ \\text{kJ}',
        },
        {
          label: 'Quel volume de dioxygène faut-il respirer pour cela (en L) ?',
          answer: { kind: 'number', value: 40, tolerance: 0.5, unit: 'L' },
          steps: ['$n(\\ce{O2}) = 6\\,n(\\text{glucose}) = 6 \\times 0{,}278 \\approx 1{,}67$ mol.', '$V = 1{,}67 \\times 24 = 40$ L.'],
          result: 'V(\\ce{O2}) = 40\\ \\text{L}',
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'La formule brute du glucose est :',
      choices: ['$\\ce{C6H12O6}$', '$\\ce{C12H22O11}$', '$\\ce{C2H5OH}$', '$\\ce{C6H10O5}$'],
      answer: 0,
      explanation: '$\\ce{C12H22O11}$ est le saccharose ; $\\ce{C6H10O5}$ est le motif de l’amidon et de la cellulose.',
    },
    {
      question: 'Le glucose réduit la liqueur de Fehling parce qu’il possède :',
      choices: ['un groupe aldéhyde', 'un groupe cétone', 'un groupe carboxyle', 'six atomes de carbone'],
      answer: 0,
      explanation: 'Le groupe $\\ce{-CHO}$ s’oxyde en $\\ce{-COO-}$ et réduit $\\ce{Cu^2+}$ en $\\ce{Cu2O}$.',
    },
    {
      question: 'Avec la liqueur de Fehling, un sucre réducteur donne :',
      choices: ['un précipité rouge brique', 'un miroir d’argent', 'une solution incolore', 'un dégagement gazeux'],
      answer: 0,
      explanation: 'Le précipité rouge brique est l’oxyde de cuivre(I) $\\ce{Cu2O}$. Le miroir d’argent, c’est avec le réactif de Tollens.',
    },
    {
      question: 'La fermentation d’une mole de glucose produit :',
      choices: ['2 mol d’éthanol et 2 mol de $\\ce{CO2}$', '1 mol d’éthanol et 1 mol de $\\ce{CO2}$', '6 mol de $\\ce{CO2}$ et 6 mol d’eau', '2 mol d’éthanol et 2 mol d’eau'],
      answer: 0,
      explanation: '$\\ce{C6H12O6 -> 2C2H5OH + 2CO2}$. La troisième réponse correspond à la respiration (avec $\\ce{O2}$).',
    },
    {
      question: 'Combien le glucose a-t-il de carbones asymétriques (forme ouverte) ?',
      choices: ['4', '6', '1', '0'],
      answer: 0,
      explanation: 'Les carbones 2, 3, 4 et 5 portent quatre groupes différents ; le carbone 1 (aldéhyde) et le carbone 6 ($\\ce{CH2OH}$) non.',
    },
  ],
  applications: [
    {
      title: 'Le dolo de la fête',
      tagline: 'Combien d’alcool dans une préparation de bière de mil ?',
      situation:
        'Pour une fête, une brasseuse prépare du dolo. Après le maltage et la cuisson du mil, le moût contient 1,8 kg de glucose, que les levures font fermenter entièrement.',
      model: 'Tout le glucose se transforme selon l’équation de la fermentation alcoolique ; on néglige les autres sucres.',
      questions: ['Quelle masse d’éthanol se forme, en g ?'],
      check: { value: 920, tolerance: 0.03, unit: 'g' },
      solution: [
        '$n(\\text{glucose}) = \\dfrac{1\\,800}{180} = 10$ mol.',
        '$n(\\text{éthanol}) = 2 \\times 10 = 20$ mol, soit $m = 20 \\times 46 = 920$ g.',
      ],
      fact: 'Le dioxyde de carbone formé en même temps (880 g, environ 480 L) fait mousser le dolo et s’échappe des jarres.',
    },
    {
      title: 'Le glucomètre de grand-père',
      tagline: 'Lire une glycémie en g/L ou en mmol/L',
      situation:
        'Grand-père est diabétique. Au centre de santé, on lui explique qu’à jeun, une glycémie (concentration du glucose dans le sang) supérieure à 1,26 g/L est trop élevée. Son glucomètre affiche les résultats en mmol/L.',
      model: 'Le glucose est le seul sucre mesuré ; $M = 180$ g/mol.',
      questions: ['À combien de mmol/L correspond la limite de 1,26 g/L ?'],
      check: { value: 7.0, tolerance: 0.03, unit: 'mmol/L' },
      solution: [
        '$C = \\dfrac{C_m}{M} = \\dfrac{1{,}26}{180} = 7{,}0 \\times 10^{-3}$ mol/L.',
        'Soit 7,0 mmol/L.',
      ],
      fact: 'Le corps maintient la glycémie près de 1 g/L grâce à deux hormones du pancréas : l’insuline la fait baisser, le glucagon la fait monter.',
    },
  ],
};
