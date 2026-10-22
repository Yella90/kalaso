import type { LewisMolecule, Lesson } from '../types';

export const H2: LewisMolecule = {
  name: 'dihydrogène H₂',
  atoms: [{ symbol: 'H', x: 0, y: 0 }, { symbol: 'H', x: 1, y: 0 }],
  bonds: [[0, 1, 1]],
};

export const HCL: LewisMolecule = {
  name: 'chlorure d’hydrogène HCl',
  atoms: [{ symbol: 'H', x: 0, y: 0 }, { symbol: 'Cl', x: 1.1, y: 0, pairs: [90, 0, 270] }],
  bonds: [[0, 1, 1]],
};

export const H2O: LewisMolecule = {
  name: 'eau H₂O',
  atoms: [
    { symbol: 'O', x: 0, y: 0, pairs: [55, 125] },
    { symbol: 'H', x: -0.85, y: 0.65 },
    { symbol: 'H', x: 0.85, y: 0.65 },
  ],
  bonds: [[0, 1, 1], [0, 2, 1]],
};

export const NH3: LewisMolecule = {
  name: 'ammoniac NH₃',
  atoms: [
    { symbol: 'N', x: 0, y: 0, pairs: [90] },
    { symbol: 'H', x: -0.95, y: 0.5 },
    { symbol: 'H', x: 0.95, y: 0.5 },
    { symbol: 'H', x: 0, y: 1.05 },
  ],
  bonds: [[0, 1, 1], [0, 2, 1], [0, 3, 1]],
};

export const CH4: LewisMolecule = {
  name: 'méthane CH₄',
  atoms: [
    { symbol: 'C', x: 0, y: 0 },
    { symbol: 'H', x: 0, y: -1 },
    { symbol: 'H', x: 1, y: 0 },
    { symbol: 'H', x: 0, y: 1 },
    { symbol: 'H', x: -1, y: 0 },
  ],
  bonds: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]],
};

export const O2: LewisMolecule = {
  name: 'dioxygène O₂',
  atoms: [{ symbol: 'O', x: 0, y: 0, pairs: [135, 225] }, { symbol: 'O', x: 1.1, y: 0, pairs: [45, 315] }],
  bonds: [[0, 1, 2]],
};

export const N2: LewisMolecule = {
  name: 'diazote N₂',
  atoms: [{ symbol: 'N', x: 0, y: 0, pairs: [180] }, { symbol: 'N', x: 1.1, y: 0, pairs: [0] }],
  bonds: [[0, 1, 3]],
};

export const CO2: LewisMolecule = {
  name: 'dioxyde de carbone CO₂',
  atoms: [
    { symbol: 'O', x: -1.15, y: 0, pairs: [135, 225] },
    { symbol: 'C', x: 0, y: 0 },
    { symbol: 'O', x: 1.15, y: 0, pairs: [45, 315] },
  ],
  bonds: [[0, 1, 2], [1, 2, 2]],
};

export const ETHANOL: LewisMolecule = {
  name: 'éthanol CH₃–CH₂–OH',
  atoms: [
    { symbol: 'C', x: 0, y: 0 },
    { symbol: 'C', x: 1, y: 0 },
    { symbol: 'O', x: 2, y: 0, pairs: [90, 270] },
    { symbol: 'H', x: -1, y: 0 },
    { symbol: 'H', x: 0, y: -1 },
    { symbol: 'H', x: 0, y: 1 },
    { symbol: 'H', x: 1, y: -1 },
    { symbol: 'H', x: 1, y: 1 },
    { symbol: 'H', x: 3, y: 0 },
  ],
  bonds: [[0, 1, 1], [1, 2, 1], [0, 3, 1], [0, 4, 1], [0, 5, 1], [1, 6, 1], [1, 7, 1], [2, 8, 1]],
};

export const METHOXYMETHANE: LewisMolecule = {
  name: 'méthoxyméthane CH₃–O–CH₃',
  atoms: [
    { symbol: 'C', x: 0, y: 0 },
    { symbol: 'O', x: 1, y: 0, pairs: [90, 270] },
    { symbol: 'C', x: 2, y: 0 },
    { symbol: 'H', x: -1, y: 0 },
    { symbol: 'H', x: 0, y: -1 },
    { symbol: 'H', x: 0, y: 1 },
    { symbol: 'H', x: 3, y: 0 },
    { symbol: 'H', x: 2, y: -1 },
    { symbol: 'H', x: 2, y: 1 },
  ],
  bonds: [[0, 1, 1], [1, 2, 1], [0, 3, 1], [0, 4, 1], [0, 5, 1], [2, 6, 1], [2, 7, 1], [2, 8, 1]],
};

export const lesson: Lesson = {
  hook:
    'Le sucre du thé se dissout dans l’eau, comme le sel. Pourtant, l’eau sucrée ne conduit pas le courant : elle ne contient pas d’ions. Le sucre, l’eau, le gaz butane du fourneau, l’air que tu respires sont faits de **molécules**. Leurs atomes ne se prennent pas d’électrons : ils les **partagent**.',
  objectives: [
    'expliquer ce qu’est une liaison covalente ;',
    'trouver combien de liaisons forme un atome à partir de ses électrons de valence ;',
    'dessiner le schéma de Lewis d’une molécule simple ;',
    'prévoir la forme de quelques molécules : $\\ce{CH4}$, $\\ce{NH3}$, $\\ce{H2O}$, $\\ce{CO2}$ ;',
    'écrire une formule brute, développée et semi-développée.',
  ],
  sections: [
    {
      title: 'Partager des électrons',
      blocks: [
        {
          kind: 'definition',
          term: 'Liaison covalente',
          text: 'mise en commun d’une **paire d’électrons** (un doublet) entre deux atomes. Chaque atome apporte un électron de sa couche externe.',
        },
        {
          kind: 'definition',
          term: 'Molécule',
          text: 'groupe d’atomes liés par des liaisons covalentes, électriquement neutre.',
        },
        {
          kind: 'example',
          title: 'la molécule de dihydrogène',
          text: 'Chaque atome d’hydrogène n’a qu’un électron. En mettant leurs électrons en commun, les deux atomes partagent un doublet : chacun « voit » 2 électrons autour de lui, comme l’hélium. La règle du duet est respectée.',
        },
        { kind: 'lewis', molecules: [H2] },
        {
          kind: 'trap',
          wrong: '« Dans la liaison covalente, un atome donne un électron à l’autre. »',
          why: 'Donner un électron, c’est former des ions : c’est la liaison ionique. Dans la liaison covalente, le doublet appartient aux deux atomes à la fois.',
          reflex: 'Ionique : les électrons **changent d’atome**. Covalente : les électrons sont **partagés**.',
        },
      ],
    },
    {
      title: 'Combien de liaisons pour chaque atome ?',
      blocks: [
        {
          kind: 'rule',
          text: 'Un atome forme autant de liaisons covalentes qu’il lui manque d’électrons pour respecter l’octet (ou le duet pour l’hydrogène). Les électrons de valence qui ne servent pas aux liaisons restent groupés par deux : ce sont les **doublets non liants**.',
        },
        {
          kind: 'table',
          head: ['Atome', 'Électrons de valence', 'Liaisons formées', 'Doublets non liants'],
          rows: [
            ['H', '1', '1', '0'],
            ['C', '4', '4', '0'],
            ['N', '5', '3', '1'],
            ['O', '6', '2', '2'],
            ['Cl', '7', '1', '3'],
          ],
        },
        {
          kind: 'formula',
          tex: '\\text{liaisons} = 8 - \\text{électrons de valence} \\qquad (2 - 1 = 1 \\text{ pour H})',
        },
      ],
    },
    {
      title: 'Le schéma de Lewis',
      blocks: [
        {
          kind: 'text',
          text: 'Le schéma de Lewis montre tous les doublets de la couche externe : un trait entre deux atomes pour un doublet **liant**, un petit trait à côté d’un atome pour un doublet **non liant**.',
        },
        {
          kind: 'example',
          title: 'la méthode, avec l’eau',
          text: 'Molécule $\\ce{H2O}$.',
          steps: [
            'Électrons de valence au total : $1 + 1 + 6 = 8$, soit 4 doublets.',
            'L’oxygène forme 2 liaisons : il est au centre, lié aux 2 hydrogènes. Cela fait 2 doublets liants.',
            'Il reste $4 - 2 = 2$ doublets : ce sont les 2 doublets non liants de l’oxygène.',
            'Vérification : l’oxygène est entouré de 4 doublets (octet), chaque hydrogène d’un doublet (duet).',
          ],
        },
        { kind: 'lewis', molecules: [H2O, NH3, CH4, HCL] },
        {
          kind: 'text',
          text: 'Deux atomes peuvent aussi partager **deux** doublets (liaison double) ou **trois** (liaison triple).',
        },
        { kind: 'lewis', molecules: [O2, CO2, N2] },
        {
          kind: 'trap',
          wrong: '« Dans $\\ce{CO2}$, le carbone fait une liaison simple avec chaque oxygène. »',
          why: 'Le carbone n’aurait alors que 2 liaisons et l’oxygène une seule : aucun des deux ne respecterait l’octet.',
          reflex: 'Après le schéma, compte autour de chaque atome : 4 doublets (liants + non liants) pour C, N, O, Cl ; 1 doublet pour H. Sinon, essaie une liaison double ou triple.',
        },
      ],
    },
    {
      title: 'La forme des molécules',
      blocks: [
        {
          kind: 'rule',
          text: 'Les doublets autour d’un atome se repoussent et s’écartent le plus possible les uns des autres. Les doublets **non liants** prennent de la place, même si on ne les voit pas dans la forme de la molécule.',
        },
        {
          kind: 'table',
          head: ['Molécule', 'Doublets autour de l’atome central', 'Forme', 'Angle'],
          rows: [
            ['$\\ce{CH4}$', '4 liants', 'tétraèdre', '109,5°'],
            ['$\\ce{NH3}$', '3 liants, 1 non liant', 'pyramide', '107°'],
            ['$\\ce{H2O}$', '2 liants, 2 non liants', 'coudée (en V)', '104,5°'],
            ['$\\ce{CO2}$', '2 liaisons doubles', 'linéaire', '180°'],
          ],
        },
        {
          kind: 'trap',
          wrong: '« La molécule d’eau est droite : H–O–H. »',
          why: 'Les 2 doublets non liants de l’oxygène repoussent les liaisons O–H vers le bas : la molécule est coudée.',
          reflex: 'Pour la forme, compte **tous** les doublets de l’atome central, liants et non liants.',
        },
      ],
    },
    {
      title: 'Formules brute, développée et semi-développée',
      blocks: [
        {
          kind: 'definition',
          term: 'Formule brute',
          text: 'indique la nature et le nombre des atomes : $\\ce{C2H6O}$.',
        },
        {
          kind: 'definition',
          term: 'Formule développée',
          text: 'montre toutes les liaisons entre les atomes.',
        },
        {
          kind: 'definition',
          term: 'Formule semi-développée',
          text: 'montre toutes les liaisons sauf celles avec les atomes d’hydrogène : $\\ce{CH3-CH2-OH}$.',
        },
        {
          kind: 'text',
          text: 'Une même formule brute peut correspondre à plusieurs molécules différentes : ce sont des **isomères**. $\\ce{C2H6O}$ est à la fois l’éthanol (l’alcool) et le méthoxyméthane (un gaz).',
        },
        { kind: 'lewis', molecules: [ETHANOL, METHOXYMETHANE] },
      ],
    },
  ],
  essentials: [
    'Liaison covalente : deux atomes mettent en commun un doublet d’électrons.',
    'H forme 1 liaison, O en forme 2, N en forme 3, C en forme 4, Cl en forme 1.',
    'Schéma de Lewis : doublets liants (traits entre atomes) et non liants (traits à côté d’un atome).',
    'Chaque atome doit respecter l’octet, sauf H qui respecte le duet.',
    'Liaisons multiples : double dans $\\ce{O2}$ et $\\ce{CO2}$, triple dans $\\ce{N2}$.',
    'Formes : $\\ce{CH4}$ tétraèdre, $\\ce{NH3}$ pyramide, $\\ce{H2O}$ coudée, $\\ce{CO2}$ linéaire.',
    'Des isomères ont la même formule brute mais des formules développées différentes.',
  ],
  exercises: [
    {
      id: 'valence',
      level: 1,
      statement: 'Pour chaque atome, donne le nombre d’électrons de valence, le nombre de liaisons covalentes formées et le nombre de doublets non liants :',
      questions: ['le soufre S ($Z = 16$)', 'le fluor F ($Z = 9$)', 'le silicium Si ($Z = 14$)'],
      solution: [
        'S : $(K)^2(L)^8(M)^6$ → 6 électrons de valence, 2 liaisons, 2 doublets non liants (comme l’oxygène).',
        'F : $(K)^2(L)^7$ → 7 électrons de valence, 1 liaison, 3 doublets non liants (comme le chlore).',
        'Si : $(K)^2(L)^8(M)^4$ → 4 électrons de valence, 4 liaisons, aucun doublet non liant (comme le carbone).',
      ],
    },
    {
      id: 'lewis-simples',
      level: 1,
      statement: 'Établis le schéma de Lewis du dichlore $\\ce{Cl2}$ et du sulfure d’hydrogène $\\ce{H2S}$.',
      hints: ['Commence par compter le nombre total d’électrons de valence, puis divise par 2.'],
      solution: [
        '$\\ce{Cl2}$ : $7 + 7 = 14$ électrons, soit 7 doublets. 1 doublet liant Cl–Cl, et 3 doublets non liants autour de chaque chlore.',
        '$\\ce{H2S}$ : $1 + 1 + 6 = 8$ électrons, soit 4 doublets. Le soufre est au centre, avec 2 doublets liants S–H et 2 doublets non liants. C’est le même schéma que l’eau.',
      ],
    },
    {
      id: 'ethylene',
      level: 2,
      statement: 'L’éthylène $\\ce{C2H4}$ est le gaz qui fait mûrir les mangues et les bananes.',
      questions: [
        'Combien de doublets compte la molécule ?',
        'Sachant que les deux carbones sont liés entre eux et que chacun porte 2 hydrogènes, établis le schéma de Lewis.',
        'Écris sa formule semi-développée.',
      ],
      solution: [
        '$2 \\times 4 + 4 \\times 1 = 12$ électrons, soit 6 doublets.',
        '4 doublets servent aux liaisons C–H ; les 2 restants forment une **liaison double** C=C. Chaque carbone a alors 4 liaisons (octet) ; il n’y a aucun doublet non liant.',
        '$\\ce{CH2=CH2}$.',
      ],
    },
    {
      id: 'forme-h2s',
      level: 2,
      statement: 'Le sulfure d’hydrogène $\\ce{H2S}$ est le gaz qui sent l’œuf pourri.',
      questions: ['Quelle est la forme de cette molécule ?', 'Justifie à partir des doublets du soufre.'],
      solution: [
        'Elle est coudée, comme l’eau.',
        'Le soufre est entouré de 4 doublets : 2 liants et 2 non liants. Les doublets non liants repoussent les liaisons S–H.',
      ],
    },
    {
      id: 'ammoniac',
      level: 2,
      statement: 'Un élève dessine la molécule d’ammoniac à plat, avec les trois hydrogènes autour de l’azote à 120° les uns des autres.',
      questions: ['Établis le schéma de Lewis de $\\ce{NH3}$.', 'Explique l’erreur de l’élève.'],
      solution: [
        '$5 + 3 = 8$ électrons, soit 4 doublets : 3 doublets liants N–H et 1 doublet non liant sur l’azote.',
        'L’élève a oublié le doublet non liant. Avec 4 doublets autour de lui, l’azote les répartit dans l’espace : la molécule est une pyramide, avec un angle d’environ 107°.',
      ],
    },
    {
      id: 'isomeres',
      level: 3,
      statement: 'On considère la formule brute $\\ce{C3H8O}$.',
      questions: [
        'Montre que cette formule correspond à au moins deux alcools différents, en écrivant leurs formules semi-développées (le groupe –OH est fixé sur un carbone).',
        'Écris la formule semi-développée d’un isomère qui n’est pas un alcool.',
        'Vérifie dans chaque cas que C forme 4 liaisons, O 2 et H 1.',
      ],
      solution: [
        '$\\ce{CH3-CH2-CH2-OH}$ (–OH au bout de la chaîne) et $\\ce{CH3-CH(OH)-CH3}$ (–OH sur le carbone du milieu).',
        '$\\ce{CH3-O-CH2-CH3}$ : l’oxygène est entre deux carbones (c’est un éther).',
        'Dans chaque formule, chaque carbone a 4 liaisons, l’oxygène 2 et chaque hydrogène 1.',
      ],
    },
  ],
  quiz: [
    {
      question: 'Une liaison covalente, c’est :',
      choices: ['un électron donné par un atome à un autre', 'un doublet d’électrons mis en commun', 'une attraction entre deux ions', 'un échange de protons'],
      answer: 1,
      explanation: 'Les deux atomes partagent un doublet ; chacun apporte un électron.',
    },
    {
      question: 'Combien de liaisons covalentes forme l’azote ?',
      choices: ['1', '2', '3', '5'],
      answer: 2,
      explanation: '5 électrons de valence : il lui en manque 3 pour l’octet.',
    },
    {
      question: 'Combien de doublets non liants possède l’oxygène dans la molécule d’eau ?',
      choices: ['0', '1', '2', '4'],
      answer: 2,
      explanation: '6 électrons de valence : 2 servent aux liaisons, les 4 autres forment 2 doublets non liants.',
    },
    {
      question: 'La molécule d’eau est :',
      choices: ['linéaire', 'coudée', 'plane en triangle', 'en forme de tétraèdre'],
      answer: 1,
      explanation: 'Les 2 doublets non liants de l’oxygène écartent les liaisons : angle de 104,5°.',
    },
    {
      question: 'Dans la molécule de diazote $\\ce{N2}$, la liaison entre les deux atomes est :',
      choices: ['simple', 'double', 'triple', 'ionique'],
      answer: 2,
      explanation: 'Chaque azote doit former 3 liaisons : les deux atomes partagent 3 doublets.',
    },
    {
      question: 'L’éthanol et le méthoxyméthane sont des isomères car ils ont :',
      choices: ['la même formule développée', 'la même formule brute', 'les mêmes propriétés', 'le même nombre de liaisons doubles'],
      answer: 1,
      explanation: 'Même formule brute $\\ce{C2H6O}$, mais les atomes ne sont pas reliés de la même façon.',
    },
  ],
  applications: [
    {
      title: 'Le gaz du fourneau',
      situation:
        'Beaucoup de familles cuisinent avec des bouteilles de gaz butane. La molécule de butane a pour formule brute $\\ce{C4H10}$ ; ses 4 atomes de carbone forment une chaîne.',
      questions: [
        'Écris la formule semi-développée du butane.',
        'Combien de liaisons covalentes compte la molécule ?',
        'Le butane brûle dans le dioxygène de l’air en donnant du dioxyde de carbone et de l’eau. Dessine les schémas de Lewis de ces deux produits.',
      ],
      solution: [
        '$\\ce{CH3-CH2-CH2-CH3}$.',
        '3 liaisons C–C et 10 liaisons C–H : 13 liaisons.',
        '$\\ce{CO2}$ : O=C=O avec 2 doublets non liants sur chaque oxygène. $\\ce{H2O}$ : H–O–H avec 2 doublets non liants sur l’oxygène.',
      ],
    },
    {
      title: 'Pourquoi l’eau sucrée ne conduit pas le courant',
      situation:
        'Pendant la préparation du thé, on dissout beaucoup de sucre (le saccharose, $\\ce{C12H22O11}$) dans l’eau. On plonge dans le thé deux électrodes reliées à une pile et à une lampe : la lampe reste éteinte. Avec de l’eau salée, elle s’allume.',
      questions: [
        'Quel type de liaison relie les atomes dans le saccharose ? Justifie avec l’expérience.',
        'Sous quelle forme le sucre se trouve-t-il dans le thé ?',
        'Explique la différence avec l’eau salée.',
      ],
      solution: [
        'Des liaisons covalentes : le saccharose est formé de molécules, il ne libère pas d’ions.',
        'Sous forme de molécules de saccharose dispersées entre les molécules d’eau.',
        'Le sel est un composé ionique : dans l’eau, il libère des ions $\\ce{Na+}$ et $\\ce{Cl-}$ mobiles, qui transportent le courant. Les molécules de sucre sont neutres et ne transportent aucune charge.',
      ],
    },
  ],
};
