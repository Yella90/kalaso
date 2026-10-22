import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Au marché, on ne compte pas les grains de riz un par un : on les vend au kilo. Les œufs se vendent par plateaux, les allumettes par boîtes. Les chimistes ont le même problème avec les atomes, mais en bien pire : une seule gorgée d’eau (18 g) contient environ $6 \\times 10^{23}$ molécules. En comptant une molécule par seconde, il faudrait près de 20 millions de milliards d’années pour finir. Il leur faut donc un « paquet » adapté : la **mole**.',
  objectives: [
    'définir la mole et utiliser la constante d’Avogadro ;',
    'calculer une masse molaire atomique et moléculaire ;',
    'passer d’une masse à une quantité de matière, et inversement, avec $n = \\dfrac{m}{M}$ ;',
    'calculer un nombre d’atomes ou de molécules à partir d’une masse.',
  ],
  sections: [
    {
      title: 'La mole, un paquet d’entités',
      blocks: [
        {
          kind: 'definition',
          term: 'Mole (mol)',
          text: 'unité de **quantité de matière**. Une mole contient exactement $6{,}022\\,140\\,76 \\times 10^{23}$ entités identiques (atomes, molécules ou ions).',
        },
        {
          kind: 'formula',
          tex: 'n = \\dfrac{N}{N_A} \\qquad N_A = 6{,}02 \\times 10^{23}\\ \\text{mol}^{-1}',
          legend: [
            '$n$ : quantité de matière, en mol',
            '$N$ : nombre d’entités (sans unité)',
            '$N_A$ : constante d’Avogadro',
          ],
        },
        {
          kind: 'example',
          title: 'compter des atomes de fer',
          text: 'Un clou contient $1{,}2 \\times 10^{23}$ atomes de fer.',
          steps: ['$n = \\dfrac{1{,}2 \\times 10^{23}}{6{,}02 \\times 10^{23}} \\approx 0{,}20$ mol.'],
        },
      ],
    },
    {
      title: 'La masse molaire',
      blocks: [
        {
          kind: 'definition',
          term: 'Masse molaire atomique $M$',
          text: 'masse d’une mole d’atomes d’un élément, en g/mol. Elle est indiquée dans le tableau périodique.',
        },
        {
          kind: 'table',
          head: ['Élément', 'H', 'C', 'N', 'O', 'Na', 'Mg', 'Al', 'S', 'Cl', 'Ca', 'Fe', 'Cu'],
          rows: [['$M$ (g/mol)', '1', '12', '14', '16', '23', '24', '27', '32', '35,5', '40', '56', '63,5']],
        },
        {
          kind: 'definition',
          term: 'Masse molaire moléculaire',
          text: 'masse d’une mole de molécules. C’est la somme des masses molaires atomiques de tous les atomes de la formule.',
        },
        {
          kind: 'example',
          title: 'quelques masses molaires',
          text: 'On multiplie chaque masse atomique par le nombre d’atomes, puis on additionne.',
          steps: [
            '$M(\\ce{H2O}) = 2 \\times 1 + 16 = 18$ g/mol',
            '$M(\\ce{CO2}) = 12 + 2 \\times 16 = 44$ g/mol',
            '$M(\\ce{NaCl}) = 23 + 35{,}5 = 58{,}5$ g/mol',
            '$M(\\ce{C12H22O11}) = 12 \\times 12 + 22 \\times 1 + 11 \\times 16 = 342$ g/mol (le sucre)',
          ],
        },
        {
          kind: 'trap',
          wrong: '« $M(\\ce{Ca3(PO4)2}) = 3 \\times 40 + 31 + 4 \\times 16 = 215$ g/mol. »',
          why: 'Le chiffre 2 après la parenthèse multiplie **tout** le groupe $\\ce{PO4}$ : il y a 2 atomes de phosphore et 8 atomes d’oxygène.',
          reflex: 'Développe d’abord la formule : $\\ce{Ca3(PO4)2}$ = 3 Ca, 2 P, 8 O. Donc $M = 120 + 62 + 128 = 310$ g/mol.',
        },
      ],
    },
    {
      title: 'Passer de la masse à la quantité de matière',
      blocks: [
        {
          kind: 'formula',
          tex: 'n = \\dfrac{m}{M} \\qquad \\Longleftrightarrow \\qquad m = n \\times M',
          legend: ['$m$ : masse de l’échantillon, en g', '$M$ : masse molaire, en g/mol', '$n$ : quantité de matière, en mol'],
        },
        {
          kind: 'example',
          title: 'un verre d’eau',
          text: 'Un verre contient 180 g d’eau.',
          steps: [
            '$n = \\dfrac{180}{18} = 10$ mol de molécules d’eau.',
            '$N = n \\times N_A = 10 \\times 6{,}02 \\times 10^{23} = 6{,}02 \\times 10^{24}$ molécules.',
          ],
        },
        {
          kind: 'rule',
          text: 'Pour tout calcul, vérifie les unités : la masse en **grammes**, la masse molaire en **g/mol**, le résultat en **mol**.',
        },
        {
          kind: 'trap',
          wrong: '« 1 kg de sucre, c’est $n = \\dfrac{1}{342}$ mol. »',
          why: 'La masse molaire est en g/mol : la masse doit être en grammes, pas en kilogrammes.',
          reflex: 'Convertis d’abord : 1 kg = 1 000 g, donc $n = \\dfrac{1000}{342} \\approx 2{,}92$ mol.',
        },
      ],
    },
    {
      title: 'Le lien avec la masse d’un atome',
      blocks: [
        {
          kind: 'text',
          text: 'La masse d’une mole est la masse d’un atome multipliée par le nombre d’atomes dans une mole :',
        },
        {
          kind: 'formula',
          tex: 'M = N_A \\times m_{\\text{atome}}',
        },
        {
          kind: 'example',
          title: 'vérifier avec le sodium',
          text: 'Au chapitre sur l’atome, on a trouvé $m(\\ce{Na}) \\approx 3{,}84 \\times 10^{-23}$ g.',
          steps: ['$M = 6{,}02 \\times 10^{23} \\times 3{,}84 \\times 10^{-23} \\approx 23{,}1$ g/mol : c’est bien la valeur du tableau.'],
        },
      ],
    },
  ],
  essentials: [
    'La mole est l’unité de quantité de matière : 1 mol = $6{,}02 \\times 10^{23}$ entités.',
    '$n = \\dfrac{N}{N_A}$, avec $N_A = 6{,}02 \\times 10^{23}$ mol⁻¹.',
    'La masse molaire $M$ est la masse d’une mole, en g/mol.',
    'Masse molaire d’une molécule : somme des masses molaires de ses atomes (attention aux parenthèses).',
    '$n = \\dfrac{m}{M}$ et $m = n \\times M$, avec $m$ en grammes.',
    '$M = N_A \\times m_{\\text{atome}}$.',
  ],
  exercises: [
    {
      id: 'masses-molaires',
      level: 1,
      statement: 'Calcule la masse molaire de :',
      questions: ['l’ammoniac $\\ce{NH3}$', 'l’acide sulfurique $\\ce{H2SO4}$', 'le carbonate de calcium $\\ce{CaCO3}$', 'le sulfate d’aluminium $\\ce{Al2(SO4)3}$'],
      solution: [
        '$14 + 3 \\times 1 = 17$ g/mol.',
        '$2 \\times 1 + 32 + 4 \\times 16 = 98$ g/mol.',
        '$40 + 12 + 3 \\times 16 = 100$ g/mol.',
        '$2 \\times 27 + 3 \\times (32 + 4 \\times 16) = 54 + 288 = 342$ g/mol.',
      ],
    },
    {
      id: 'masse-vers-n',
      level: 1,
      statement: 'Calcule la quantité de matière contenue dans :',
      questions: ['5,6 g de fer', '4,4 g de dioxyde de carbone', '100 g de carbonate de calcium'],
      solution: [
        '$n = \\dfrac{5{,}6}{56} = 0{,}10$ mol.',
        '$n = \\dfrac{4{,}4}{44} = 0{,}10$ mol.',
        '$n = \\dfrac{100}{100} = 1{,}0$ mol.',
      ],
    },
    {
      id: 'n-vers-masse',
      level: 1,
      statement: 'Quelle masse faut-il peser pour obtenir :',
      questions: ['0,25 mol de chlorure de sodium ?', '2,0 mol d’eau ?'],
      solution: ['$m = 0{,}25 \\times 58{,}5 \\approx 14{,}6$ g.', '$m = 2{,}0 \\times 18 = 36$ g.'],
    },
    {
      id: 'litre-eau',
      level: 2,
      statement: 'Un litre d’eau a une masse de 1 000 g.',
      questions: ['Quelle quantité de matière d’eau contient-il ?', 'Combien de molécules d’eau cela représente-t-il ?', 'Combien d’atomes d’hydrogène ?'],
      solution: [
        '$n = \\dfrac{1000}{18} \\approx 55{,}6$ mol.',
        '$N = 55{,}6 \\times 6{,}02 \\times 10^{23} \\approx 3{,}34 \\times 10^{25}$ molécules.',
        'Chaque molécule contient 2 atomes H : $6{,}69 \\times 10^{25}$ atomes d’hydrogène.',
      ],
    },
    {
      id: 'comparer-metaux',
      level: 2,
      statement: 'On dispose de 10 g d’aluminium et de 10 g de cuivre.',
      questions: ['Lequel des deux échantillons contient le plus d’atomes ?', 'Combien de fois plus ?'],
      hints: ['Même masse ne veut pas dire même nombre d’atomes : compare les quantités de matière.'],
      solution: [
        '$n(\\ce{Al}) = \\dfrac{10}{27} \\approx 0{,}370$ mol ; $n(\\ce{Cu}) = \\dfrac{10}{63{,}5} \\approx 0{,}157$ mol. L’aluminium contient le plus d’atomes.',
        '$\\dfrac{0{,}370}{0{,}157} \\approx 2{,}4$ : environ 2,4 fois plus, parce qu’un atome d’aluminium est plus léger qu’un atome de cuivre.',
      ],
    },
    {
      id: 'bague-or',
      level: 3,
      statement:
        'Au chapitre sur l’atome, on a compté les atomes d’une bague en or de 4 g à partir de la masse d’un atome. On refait le calcul avec la mole. On donne $M(\\ce{Au}) = 197$ g/mol.',
      questions: [
        'Calcule la quantité de matière d’or dans la bague.',
        'Déduis-en le nombre d’atomes d’or.',
        'Compare avec le résultat du chapitre sur l’atome ($1{,}2 \\times 10^{22}$ atomes). Conclus.',
      ],
      solution: [
        '$n = \\dfrac{4}{197} \\approx 2{,}03 \\times 10^{-2}$ mol.',
        '$N = 2{,}03 \\times 10^{-2} \\times 6{,}02 \\times 10^{23} \\approx 1{,}22 \\times 10^{22}$ atomes.',
        'On retrouve le même résultat : les deux méthodes sont cohérentes, car $M = N_A \\times m_{\\text{atome}}$.',
      ],
    },
  ],
  quiz: [
    {
      question: 'Une mole contient :',
      choices: ['$6{,}02 \\times 10^{23}$ entités', '1 000 entités', '$6{,}02 \\times 10^{-23}$ entités', 'autant d’entités que sa masse en grammes'],
      answer: 0,
      explanation: 'C’est la constante d’Avogadro, $N_A = 6{,}02 \\times 10^{23}$ mol⁻¹.',
    },
    {
      question: 'La masse molaire de $\\ce{CO2}$ vaut :',
      choices: ['28 g/mol', '32 g/mol', '44 g/mol', '60 g/mol'],
      answer: 2,
      explanation: '$12 + 2 \\times 16 = 44$ g/mol.',
    },
    {
      question: 'Quelle est la quantité de matière dans 36 g d’eau ?',
      choices: ['0,5 mol', '1 mol', '2 mol', '36 mol'],
      answer: 2,
      explanation: '$n = \\dfrac{36}{18} = 2$ mol.',
    },
    {
      question: 'Quelle masse correspond à 0,5 mol de $\\ce{NaCl}$ ?',
      choices: ['29,25 g', '58,5 g', '117 g', '0,5 g'],
      answer: 0,
      explanation: '$m = 0{,}5 \\times 58{,}5 = 29{,}25$ g.',
    },
    {
      question: 'Dans $\\ce{Al2(SO4)3}$, il y a combien d’atomes d’oxygène ?',
      choices: ['4', '7', '12', '3'],
      answer: 2,
      explanation: 'Le 3 multiplie tout le groupe $\\ce{SO4}$ : $3 \\times 4 = 12$ atomes d’oxygène.',
    },
    {
      question: '10 g de fer et 10 g de soufre contiennent :',
      choices: ['le même nombre d’atomes', 'plus d’atomes de fer', 'plus d’atomes de soufre', 'on ne peut pas savoir'],
      answer: 2,
      explanation: '$M(\\ce{S}) = 32 < M(\\ce{Fe}) = 56$ : à masse égale, il y a plus d’atomes de soufre.',
    },
  ],
  applications: [
    {
      title: 'Le sucre du thé',
      situation:
        'Pour préparer le thé, on met 2 morceaux de sucre dans chacun des 3 verres. Un morceau de sucre pèse 5 g. Le sucre est du saccharose, $\\ce{C12H22O11}$ ($M = 342$ g/mol).',
      questions: [
        'Quelle quantité de matière de saccharose contient un morceau ?',
        'Combien de molécules de saccharose y a-t-il dans un morceau ?',
        'Quelle quantité de matière de sucre est utilisée pour les 3 verres ?',
      ],
      solution: [
        '$n = \\dfrac{5}{342} \\approx 1{,}46 \\times 10^{-2}$ mol.',
        '$N = 1{,}46 \\times 10^{-2} \\times 6{,}02 \\times 10^{23} \\approx 8{,}8 \\times 10^{21}$ molécules.',
        '6 morceaux, soit 30 g : $n = \\dfrac{30}{342} \\approx 8{,}8 \\times 10^{-2}$ mol.',
      ],
    },
    {
      title: 'L’urée dans les rizières de l’Office du Niger',
      situation:
        'Les riziculteurs épandent de l’urée, un engrais azoté de formule $\\ce{CO(NH2)2}$. Elle est vendue en sacs de 50 kg. On donne $M(\\ce{C}) = 12$, $M(\\ce{O}) = 16$, $M(\\ce{N}) = 14$ et $M(\\ce{H}) = 1$ g/mol.',
      questions: [
        'Calcule la masse molaire de l’urée.',
        'Quelle quantité de matière d’urée contient un sac ?',
        'Une molécule d’urée contient 2 atomes d’azote. Quelle masse d’azote un sac apporte-t-il au champ ?',
        'Quel est le pourcentage en masse d’azote dans l’urée ?',
      ],
      solution: [
        '$M = 12 + 16 + 2 \\times (14 + 2 \\times 1) = 60$ g/mol.',
        '$n = \\dfrac{50\\,000}{60} \\approx 833$ mol.',
        '$n(\\ce{N}) = 2 \\times 833 = 1\\,667$ mol ; $m(\\ce{N}) = 1\\,667 \\times 14 \\approx 23\\,300$ g, soit environ 23,3 kg.',
        '$\\dfrac{2 \\times 14}{60} \\approx 0{,}467$, soit 46,7 % d’azote : c’est pour cela que l’urée est un engrais très concentré.',
      ],
    },
  ],
};
