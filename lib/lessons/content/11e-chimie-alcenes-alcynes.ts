import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Une banane verte posée à côté d’une banane mûre mûrit plus vite : la banane mûre dégage un gaz, l’**éthylène**, qui accélère le mûrissement. Ce même gaz sert à fabriquer le plastique des sachets. Le soudeur du quartier, lui, utilise l’**acétylène**, dont la flamme dépasse 3 000 °C. Ces molécules ont des liaisons doubles ou triples, très réactives.',
  objectives: [
    'reconnaître et nommer un alcène ($C_nH_{2n}$) et un alcyne ($C_nH_{2n-2}$) ;',
    'décrire la géométrie autour d’une double et d’une triple liaison ;',
    'écrire les réactions d’addition (dihydrogène, dibrome, eau, chlorure d’hydrogène) ;',
    'faire un calcul de quantité de matière sur une addition.',
  ],
  sections: [
    {
      title: 'Alcènes et alcynes',
      blocks: [
        {
          kind: 'table',
          head: ['Famille', 'Liaison', 'Formule', 'Géométrie', 'Exemple'],
          rows: [
            ['alcène', 'une double liaison $\\ce{C=C}$', '$C_nH_{2n}$', 'plane autour de $\\ce{C=C}$', 'éthylène (éthène) $\\ce{CH2=CH2}$'],
            ['alcyne', 'une triple liaison $\\ce{C#C}$', '$C_nH_{2n-2}$', 'linéaire autour de $\\ce{C#C}$', 'acétylène (éthyne) $\\ce{HC#CH}$'],
          ],
        },
        {
          kind: 'text',
          text: 'Nomenclature : on remplace la terminaison « ane » de l’alcane par « ène » ou « yne », en indiquant la position de la liaison multiple par le plus petit numéro : but-1-ène $\\ce{CH2=CH-CH2-CH3}$, but-2-ène $\\ce{CH3-CH=CH-CH3}$.',
        },
        {
          kind: 'callout',
          variant: 'remarque',
          blocks: [
            {
              kind: 'text',
              text: 'Il n’y a pas de libre rotation autour d’une double liaison : le but-2-ène existe sous deux formes, Z (les deux $\\ce{CH3}$ du même côté) et E (de part et d’autre).',
            },
          ],
        },
      ],
    },
    {
      title: 'Les réactions d’addition',
      blocks: [
        {
          kind: 'text',
          text: 'La double (ou triple) liaison s’ouvre et chaque carbone fixe un nouvel atome ou groupe d’atomes : c’est une **addition**.',
        },
        {
          kind: 'table',
          head: ['Réactif ajouté', 'Produit (à partir de l’éthylène)', 'Conditions'],
          rows: [
            ['$\\ce{H2}$ (hydrogénation)', 'éthane $\\ce{CH3-CH3}$', 'catalyseur (nickel, platine)'],
            ['$\\ce{Br2}$ (dibromation)', '1,2-dibromoéthane $\\ce{CH2Br-CH2Br}$', 'à froid ; l’eau de brome orange se **décolore**'],
            ['$\\ce{H2O}$ (hydratation)', 'éthanol $\\ce{CH3-CH2OH}$', 'catalyse acide'],
            ['$\\ce{HCl}$', 'chloroéthane $\\ce{CH3-CH2Cl}$', ''],
          ],
        },
        {
          kind: 'rule',
          text: 'La **décoloration de l’eau de brome** est le test des liaisons multiples : un alcane ne la décolore pas (à l’obscurité).',
        },
        {
          kind: 'text',
          text: 'Les alcènes peuvent aussi s’additionner les uns aux autres en très longues chaînes : c’est la **polymérisation** (l’éthylène donne le polyéthylène).',
        },
        {
          kind: 'trap',
          wrong: '« L’hydrogénation d’un alcyne donne toujours un alcène. »',
          why: 'Avec assez de dihydrogène et un catalyseur classique, l’addition continue jusqu’à l’alcane.',
          reflex: 'Alcyne + 2 $\\ce{H2}$ → alcane ; on ne s’arrête à l’alcène qu’avec un catalyseur spécial.',
        },
      ],
    },
  ],
  essentials: [
    'Alcène $C_nH_{2n}$ (double liaison, plan) ; alcyne $C_nH_{2n-2}$ (triple liaison, linéaire).',
    'Nom : « ène » ou « yne » avec la position de la liaison multiple.',
    'Additions : $\\ce{H2}$, $\\ce{Br2}$ (test : décoloration de l’eau de brome), $\\ce{H2O}$, $\\ce{HCl}$.',
    'Polymérisation des alcènes : polyéthylène, PVC…',
  ],
  exercises: [
    {
      id: 'ene-brome',
      level: 1,
      title: 'Décolorer l’eau de brome',
      statement: 'On fait passer 2,8 g d’éthylène dans de l’eau de brome en excès. $M(\\ce{Br2}) = 160$ g/mol.',
      parts: [
        {
          label: 'Quantité d’éthylène (en mol).',
          answer: { kind: 'number', value: 0.1, tolerance: 0.001, unit: 'mol' },
          steps: ['$M(\\ce{C2H4}) = 28$ g/mol ; $n = \\dfrac{2{,}8}{28} = 0{,}10$ mol.'],
        },
        {
          label: 'Masse de dibrome consommée (en g).',
          answer: { kind: 'number', value: 16, tolerance: 0.1, unit: 'g' },
          steps: ['Une molécule de $\\ce{Br2}$ par $\\ce{C=C}$ : $0{,}10 \\times 160 = 16$ g.'],
        },
      ],
    },
    {
      id: 'yne-hydrogenation',
      level: 2,
      title: 'Hydrogéner l’acétylène',
      statement: 'On hydrogène complètement 0,10 mol d’acétylène en éthane. $V_m = 24$ L/mol.',
      parts: [
        {
          label: 'Quantité de dihydrogène nécessaire (en mol).',
          answer: { kind: 'number', value: 0.2, tolerance: 0.001, unit: 'mol' },
          steps: ['$\\ce{C2H2 + 2H2 -> C2H6}$ : 2 mol de $\\ce{H2}$ par mole d’acétylène.'],
        },
        {
          label: 'Volume de dihydrogène (en L).',
          answer: { kind: 'number', value: 4.8, tolerance: 0.02, unit: 'L' },
          steps: ['$0{,}20 \\times 24 = 4{,}8$ L.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'La formule $\\ce{C3H6}$ correspond à :',
      choices: ['un alcène', 'un alcane', 'un alcyne', 'un composé aromatique'],
      answer: 0,
      explanation: '$C_nH_{2n}$ avec $n = 3$ : le propène.',
    },
    {
      question: 'Le test de la double liaison est :',
      choices: ['la décoloration de l’eau de brome', 'le trouble de l’eau de chaux', 'le précipité rouge brique', 'la combustion'],
      answer: 0,
      explanation: 'Le dibrome s’additionne sur la liaison multiple.',
    },
    {
      question: 'L’hydratation de l’éthylène donne :',
      choices: ['de l’éthanol', 'de l’éthane', 'de l’acide éthanoïque', 'du méthane'],
      answer: 0,
      explanation: '$\\ce{CH2=CH2 + H2O -> CH3CH2OH}$.',
    },
    {
      question: 'Autour d’une triple liaison, la molécule est :',
      choices: ['linéaire', 'plane triangulaire', 'tétraédrique', 'en forme de V'],
      answer: 0,
      explanation: 'Les quatre atomes $\\ce{H-C#C-H}$ sont alignés.',
    },
  ],
  applications: [
    {
      title: 'La lampe à carbure du soudeur',
      tagline: 'Fabriquer de l’acétylène avec de l’eau et un caillou',
      situation:
        'Certains soudeurs et pêcheurs utilisent du carbure de calcium $\\ce{CaC2}$ : versé dans l’eau, il dégage de l’acétylène, $\\ce{CaC2 + 2H2O -> C2H2 + Ca(OH)2}$. On utilise 64 g de carbure. $V_m = 24$ L/mol.',
      model: 'La réaction est totale ; $M(\\ce{CaC2}) = 64$ g/mol.',
      questions: ['Quel volume d’acétylène obtient-on, en L ?'],
      check: { value: 24, tolerance: 0.02, unit: 'L' },
      solution: ['$n(\\ce{CaC2}) = \\dfrac{64}{64} = 1{,}0$ mol, qui donne 1,0 mol d’acétylène.', '$V = 1{,}0 \\times 24 = 24$ L.'],
      fact: 'Mélangé au dioxygène, l’acétylène brûle à plus de 3 000 °C : assez pour fondre et souder l’acier.',
    },
  ],
};
