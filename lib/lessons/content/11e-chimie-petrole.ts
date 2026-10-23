import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Chaque jour, des camions-citernes traversent la frontière pour apporter au Mali l’essence des motos, le gazole des camions et le gaz des cuisines. Tout cela vient du **pétrole brut**, un liquide noir formé il y a des millions d’années. Comment le transforme-t-on en carburants si différents ? Et quel est le prix, pour le climat, de leur combustion ?',
  objectives: [
    'expliquer l’origine du pétrole et du gaz naturel ;',
    'décrire la distillation fractionnée et nommer les principales coupes ;',
    'expliquer le rôle du craquage et du reformage ;',
    'calculer la masse de dioxyde de carbone émise par un carburant.',
  ],
  sections: [
    {
      title: 'Origine et composition',
      blocks: [
        {
          kind: 'text',
          text: 'Le pétrole et le gaz naturel proviennent de restes d’organismes marins (plancton) accumulés au fond de mers anciennes, enfouis et transformés par la chaleur et la pression pendant des millions d’années. Ce sont des ressources **non renouvelables** à notre échelle.',
        },
        {
          kind: 'text',
          text: 'Le pétrole brut est un mélange de centaines d’hydrocarbures, surtout des alcanes, de 1 à plus de 40 atomes de carbone. Le gaz naturel est principalement du méthane.',
        },
        {
          kind: 'callout',
          variant: 'remarque',
          blocks: [
            {
              kind: 'text',
              text: 'Le Mali ne produit pas encore de pétrole : des recherches ont lieu dans le bassin de Taoudéni. Tous les produits pétroliers consommés sont importés.',
            },
          ],
        },
      ],
    },
    {
      title: 'Le raffinage',
      blocks: [
        {
          kind: 'definition',
          term: 'Distillation fractionnée',
          text: 'le pétrole chauffé à environ 400 °C entre dans une haute colonne. Les vapeurs montent et se refroidissent : chaque fraction se condense à la hauteur qui correspond à sa température d’ébullition.',
        },
        {
          kind: 'table',
          head: ['Fraction (coupe)', 'Nombre de carbones', 'Utilisation'],
          rows: [
            ['gaz (méthane à butane)', '1 à 4', 'gaz de cuisine (GPL)'],
            ['essence', '5 à 10', 'motos, voitures'],
            ['kérosène', '10 à 16', 'avions, lampes à pétrole'],
            ['gazole', '14 à 20', 'camions, groupes électrogènes'],
            ['fioul et huiles', '20 à 40', 'navires, centrales, lubrifiants'],
            ['résidu (bitume)', 'plus de 40', 'goudron des routes'],
          ],
        },
        {
          kind: 'list',
          items: [
            '**craquage** : on casse les grosses molécules en molécules plus petites, pour produire plus d’essence (la plus demandée) ;',
            '**reformage** : on réarrange les molécules (chaînes ramifiées, cycles) pour améliorer la qualité de l’essence (indice d’octane).',
          ],
        },
      ],
    },
    {
      title: 'Énergie et environnement',
      blocks: [
        {
          kind: 'text',
          text: 'La combustion des carburants fournit beaucoup d’énergie (environ 45 MJ par kilogramme), mais rejette du dioxyde de carbone, principal gaz à effet de serre responsable du réchauffement climatique, et des polluants (monoxyde de carbone, oxydes d’azote, particules).',
        },
        {
          kind: 'trap',
          wrong: '« La distillation fractionnée fabrique de nouvelles molécules. »',
          why: 'Elle ne fait que **séparer** les constituants selon leur température d’ébullition.',
          reflex: 'Séparer : distillation ; transformer : craquage et reformage.',
        },
      ],
    },
  ],
  essentials: [
    'Pétrole et gaz : origine organique, ressources non renouvelables ; mélanges d’hydrocarbures.',
    'Distillation fractionnée : séparation selon la température d’ébullition (gaz, essence, kérosène, gazole, fioul, bitume).',
    'Craquage : casser les grosses molécules ; reformage : améliorer l’essence.',
    'Combustion : énergie mais $\\ce{CO2}$ (effet de serre) et polluants.',
  ],
  exercises: [
    {
      id: 'petr-co2',
      level: 1,
      title: 'Le CO₂ d’un litre d’essence',
      statement:
        'On assimile l’essence à de l’octane $\\ce{C8H18}$ ($M = 114$ g/mol), de masse volumique 0,75 kg/L. Combustion complète : $\\ce{2C8H18 + 25O2 -> 16CO2 + 18H2O}$.',
      parts: [
        {
          label: 'Quantité d’octane dans 1,0 L d’essence (en mol).',
          answer: { kind: 'number', value: 6.58, tolerance: 0.03, unit: 'mol' },
          steps: ['$m = 750$ g ; $n = \\dfrac{750}{114} \\approx 6{,}58$ mol.'],
        },
        {
          label: 'Masse de $\\ce{CO2}$ rejetée par litre (en kg).',
          answer: { kind: 'number', value: 2.32, tolerance: 0.02, unit: 'kg' },
          steps: ['8 $\\ce{CO2}$ par octane : $8 \\times 6{,}58 \\times 44 \\approx 2\\,316$ g, soit 2,3 kg.'],
        },
      ],
    },
    {
      id: 'petr-coupes',
      level: 2,
      title: 'Les coupes du raffinage',
      statement: 'Réponds par le nom d’une coupe.',
      parts: [
        {
          label: 'Coupe utilisée comme carburant des avions.',
          answer: { kind: 'text', display: 'kérosène', accepted: ['kérosène', 'kerosene', 'le kérosène', 'le kerosene'] },
          steps: ['Le kérosène (10 à 16 carbones).'],
        },
        {
          label: 'Coupe qui sert au goudron des routes.',
          answer: { kind: 'text', display: 'bitume', accepted: ['bitume', 'le bitume', 'résidu', 'residu', 'goudron'] },
          steps: ['Le résidu le plus lourd, qui ne distille pas.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'La distillation fractionnée sépare les constituants du pétrole selon :',
      choices: ['leur température d’ébullition', 'leur couleur', 'leur acidité', 'leur réactivité avec l’eau'],
      answer: 0,
      explanation: 'Chaque fraction se condense à une hauteur différente de la colonne.',
    },
    {
      question: 'Le craquage sert à :',
      choices: ['casser les grosses molécules pour obtenir plus d’essence', 'séparer l’eau du pétrole', 'brûler le pétrole', 'fabriquer du bitume'],
      answer: 0,
      explanation: 'L’essence est la fraction la plus demandée.',
    },
    {
      question: 'Le gaz naturel est surtout composé de :',
      choices: ['méthane', 'butane', 'dioxyde de carbone', 'dihydrogène'],
      answer: 0,
      explanation: '$\\ce{CH4}$.',
    },
    {
      question: 'Le principal gaz à effet de serre rejeté par les carburants est :',
      choices: ['le dioxyde de carbone', 'le diazote', 'le dioxygène', 'la vapeur de benzène'],
      answer: 0,
      explanation: 'La combustion de chaque litre d’essence en rejette plus de 2 kg.',
    },
  ],
  applications: [
    {
      title: 'La moto de l’élève',
      tagline: 'Combien de CO₂ pour aller au lycée ?',
      situation:
        'Ibrahim va au lycée en moto : 20 km par jour. Sa moto consomme 2,0 L d’essence aux 100 km. Un litre d’essence rejette environ 2,32 kg de $\\ce{CO2}$.',
      model: 'Consommation constante ; combustion complète.',
      questions: ['Quelle masse de $\\ce{CO2}$ sa moto rejette-t-elle par jour, en kg ?'],
      check: { value: 0.928, tolerance: 0.02, unit: 'kg' },
      solution: ['Essence consommée : $20 \\times \\dfrac{2{,}0}{100} = 0{,}40$ L par jour.', '$0{,}40 \\times 2{,}32 \\approx 0{,}93$ kg de $\\ce{CO2}$ par jour, soit environ 170 kg sur une année scolaire.'],
      fact: 'Un trajet en vélo ou à pied, ou une moto partagée, réduit d’autant les rejets et les dépenses.',
    },
  ],
};
