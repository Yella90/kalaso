import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'La bouteille de gaz de la cuisine contient du butane ; le gaz naturel, du méthane ; l’essence et le gazole, des molécules plus longues de la même famille. Ces combustibles sont des **alcanes** : des chaînes d’atomes de carbone entourés d’hydrogène, qui brûlent en libérant beaucoup d’énergie… et du dioxyde de carbone.',
  objectives: [
    'reconnaître un alcane et sa formule générale $C_nH_{2n+2}$ ;',
    'nommer un alcane linéaire ou ramifié ;',
    'écrire des isomères de constitution ;',
    'écrire et exploiter l’équation de combustion d’un alcane.',
  ],
  sections: [
    {
      title: 'Structure et formule',
      blocks: [
        {
          kind: 'definition',
          term: 'Alcane',
          text: 'hydrocarbure (composé de carbone et d’hydrogène seulement) **saturé** : il n’a que des liaisons simples. Formule générale : $C_nH_{2n+2}$.',
        },
        {
          kind: 'text',
          text: 'Chaque atome de carbone est lié à quatre atomes, disposés en **tétraèdre** autour de lui. La chaîne peut être linéaire ou ramifiée ; la libre rotation autour des liaisons simples rend la molécule souple.',
        },
        {
          kind: 'table',
          head: ['$n$', 'Nom', 'Formule', 'État (25 °C)'],
          rows: [
            ['1', 'méthane', '$\\ce{CH4}$', 'gaz (gaz naturel)'],
            ['2', 'éthane', '$\\ce{C2H6}$', 'gaz'],
            ['3', 'propane', '$\\ce{C3H8}$', 'gaz'],
            ['4', 'butane', '$\\ce{C4H10}$', 'gaz (bouteilles de cuisine)'],
            ['5 à 16 environ', 'pentane… hexadécane', '', 'liquides (essence, kérosène, gazole)'],
          ],
        },
      ],
    },
    {
      title: 'Nomenclature et isomérie',
      blocks: [
        {
          kind: 'callout',
          variant: 'methode',
          title: 'Nommer un alcane ramifié',
          blocks: [
            {
              kind: 'list',
              items: [
                'trouver la **chaîne carbonée la plus longue** : elle donne le nom de base ;',
                'numéroter cette chaîne pour donner aux ramifications les **plus petits numéros** ;',
                'nommer les ramifications (méthyl, éthyl…) avec leur numéro, avant le nom de base ; « di », « tri » si elles se répètent.',
              ],
            },
          ],
        },
        {
          kind: 'example',
          title: 'nommer',
          text: '$\\ce{CH3-CH(CH3)-CH2-CH3}$',
          steps: ['Chaîne la plus longue : 4 carbones (butane).', 'Méthyl sur le carbone 2 : **2-méthylbutane**.'],
        },
        {
          kind: 'definition',
          term: 'Isomères de constitution',
          text: 'molécules de même formule brute mais d’enchaînements d’atomes différents. $\\ce{C4H10}$ en a deux : le butane et le 2-méthylpropane ; $\\ce{C5H12}$ en a trois.',
        },
      ],
    },
    {
      title: 'Réactions des alcanes',
      blocks: [
        {
          kind: 'formula',
          label: 'Combustion complète',
          tex: '\\ce{C_nH_{2n+2}} + \\dfrac{3n + 1}{2}\\,\\ce{O2} \\longrightarrow n\\,\\ce{CO2} + (n + 1)\\,\\ce{H2O}',
        },
        {
          kind: 'callout',
          variant: 'attention',
          title: 'La combustion incomplète tue',
          blocks: [
            {
              kind: 'text',
              text: 'Si le dioxygène manque (réchaud dans une pièce fermée, flamme jaune), il se forme du **monoxyde de carbone** $\\ce{CO}$ et du carbone (suie). Le CO est inodore et mortel : il faut toujours aérer quand un réchaud ou un fourneau fonctionne.',
            },
          ],
        },
        {
          kind: 'text',
          text: 'À la lumière, les alcanes réagissent aussi avec le dichlore : un atome d’hydrogène est remplacé par un atome de chlore (réaction de **substitution**), par exemple $\\ce{CH4 + Cl2 -> CH3Cl + HCl}$.',
        },
      ],
    },
  ],
  essentials: [
    'Alcane : hydrocarbure saturé, $C_nH_{2n+2}$, carbones tétraédriques.',
    'Nom : chaîne la plus longue, plus petits numéros pour les ramifications.',
    'Isomères de constitution : même formule brute, enchaînements différents.',
    'Combustion complète → $\\ce{CO2 + H2O}$ ; incomplète → $\\ce{CO}$ mortel ; substitution par le dichlore à la lumière.',
  ],
  exercises: [
    {
      id: 'alc-butane',
      level: 1,
      title: 'La combustion du butane',
      statement: 'On brûle complètement 1,0 kg de butane $\\ce{C4H10}$ : $\\ce{2C4H10 + 13O2 -> 8CO2 + 10H2O}$.',
      parts: [
        {
          label: 'Masse molaire du butane (en g/mol).',
          answer: { kind: 'number', value: 58, tolerance: 0.1, unit: 'g/mol' },
          steps: ['$4 \\times 12 + 10 \\times 1 = 58$ g/mol.'],
        },
        {
          label: 'Masse de dioxyde de carbone produite (en kg).',
          answer: { kind: 'number', value: 3.03, tolerance: 0.02, unit: 'kg' },
          steps: ['$n = \\dfrac{1\\,000}{58} \\approx 17{,}2$ mol ; $n(\\ce{CO2}) = 4 \\times 17{,}2 = 69{,}0$ mol.', '$m = 69{,}0 \\times 44 \\approx 3\\,030$ g, soit 3,03 kg.'],
        },
      ],
    },
    {
      id: 'alc-nom',
      level: 2,
      title: 'Nommer et identifier',
      statement: 'Réponds aux questions.',
      parts: [
        {
          label: 'Nom de $\\ce{CH3-CH(CH3)-CH2-CH3}$.',
          answer: { kind: 'text', display: '2-méthylbutane', accepted: ['2-méthylbutane', '2-methylbutane', '2 méthylbutane', '2 methylbutane', 'methylbutane', 'méthylbutane'] },
          steps: ['Chaîne de 4 carbones, méthyl en position 2.'],
        },
        {
          label: 'Un alcane a une masse molaire de 72 g/mol. Combien a-t-il d’atomes de carbone ?',
          answer: { kind: 'number', value: 5, tolerance: 0, unit: '' },
          steps: ['$14n + 2 = 72$, donc $n = 5$ : $\\ce{C5H12}$ (pentane ou ses isomères).'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'La formule générale des alcanes est :',
      choices: ['$C_nH_{2n+2}$', '$C_nH_{2n}$', '$C_nH_{2n-2}$', '$C_nH_n$'],
      answer: 0,
      explanation: '$C_nH_{2n}$ est celle des alcènes.',
    },
    {
      question: 'Le gaz des bouteilles de cuisine est surtout du :',
      choices: ['butane', 'méthane', 'hydrogène', 'dioxyde de carbone'],
      answer: 0,
      explanation: 'Parfois mélangé à du propane.',
    },
    {
      question: 'Combien d’isomères de constitution a $\\ce{C4H10}$ ?',
      choices: ['2', '1', '3', '4'],
      answer: 0,
      explanation: 'Le butane et le 2-méthylpropane.',
    },
    {
      question: 'Une flamme jaune et fumeuse indique :',
      choices: ['une combustion incomplète', 'une combustion complète', 'une substitution', 'l’absence de carbone'],
      answer: 0,
      explanation: 'Il manque du dioxygène : suie et monoxyde de carbone.',
    },
  ],
  applications: [
    {
      title: 'La bouteille de gaz de la cuisine',
      tagline: 'Combien de CO₂ produit une bouteille ?',
      situation: 'Une bouteille de gaz de 6 kg de butane est entièrement utilisée pour cuisiner.',
      model: 'Combustion complète du butane : 1 kg de butane donne environ 3,03 kg de $\\ce{CO2}$.',
      questions: ['Quelle masse de dioxyde de carbone est rejetée, en kg ?'],
      check: { value: 18.2, tolerance: 0.02, unit: 'kg' },
      solution: ['$6 \\times 3{,}03 \\approx 18{,}2$ kg de $\\ce{CO2}$.', 'Le gaz reste cependant moins nocif pour la santé et la forêt que le bois de chauffe, dont la fumée irrite les poumons et dont la coupe accélère la désertification.'],
      fact: 'Le monoxyde de carbone se fixe sur l’hémoglobine 200 fois mieux que le dioxygène : c’est pourquoi il asphyxie sans prévenir.',
    },
  ],
};
