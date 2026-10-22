import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Le cuivre des fils électriques, l’or extrait à Sadiola, l’oxygène que tu respires : tout est fait d’atomes. Un atome est si petit qu’il faudrait en aligner environ **10 millions** pour couvrir **1 millimètre**. Comment savoir ce qu’il y a dedans ?',
  objectives: [
    'décrire un atome : un noyau (protons et neutrons) entouré d’électrons ;',
    'lire et écrire la notation $\\ce{^{A}_{Z}X}$ et en déduire le nombre de chaque particule ;',
    'expliquer pourquoi un atome est électriquement neutre et ce qu’est un ion ;',
    'reconnaître des isotopes ;',
    'calculer la masse d’un atome ;',
    'répartir les électrons sur les couches K, L, M.',
  ],
  sections: [
    {
      title: 'Un noyau minuscule et des électrons',
      blocks: [
        {
          kind: 'definition',
          term: 'Atome',
          text: 'la plus petite partie d’un élément chimique. Il est formé d’un **noyau** central, autour duquel se déplacent des **électrons**.',
        },
        {
          kind: 'text',
          text: 'Le noyau est environ **100 000 fois plus petit** que l’atome : son diamètre est de l’ordre de $10^{-15}$ m, celui de l’atome de l’ordre de $10^{-10}$ m. Si le noyau avait la taille d’un grain de mil (1 mm) posé au centre d’un terrain de football, les électrons se trouveraient à environ 50 m de lui, au niveau des buts. Entre les deux, il n’y a que du vide : on dit que la matière a une **structure lacunaire**.',
        },
        {
          kind: 'definition',
          term: 'Noyau',
          text: 'partie centrale de l’atome, formée de **protons** (chargés positivement) et de **neutrons** (sans charge). Protons et neutrons sont appelés des **nucléons**.',
        },
      ],
    },
    {
      title: 'Les trois particules de l’atome',
      blocks: [
        {
          kind: 'table',
          head: ['Particule', 'Où ?', 'Charge', 'Masse'],
          rows: [
            ['Proton', 'noyau', '$+e$', '$m_p = 1{,}673 \\times 10^{-27}$ kg'],
            ['Neutron', 'noyau', '$0$', '$m_n = 1{,}675 \\times 10^{-27}$ kg'],
            ['Électron', 'autour du noyau', '$-e$', '$m_e = 9{,}1 \\times 10^{-31}$ kg'],
          ],
        },
        {
          kind: 'formula',
          tex: 'e = 1{,}6 \\times 10^{-19}\\ \\text{C}',
          legend: ['$e$ : la charge élémentaire, en coulombs (C). C’est la plus petite charge électrique qui existe.'],
        },
        {
          kind: 'text',
          text: 'Un proton est environ **1 836 fois plus lourd** qu’un électron. Presque toute la masse de l’atome est donc concentrée dans son noyau.',
        },
      ],
    },
    {
      title: 'Numéro atomique Z et nombre de masse A',
      blocks: [
        {
          kind: 'definition',
          term: 'Numéro atomique $Z$',
          text: 'nombre de protons du noyau. C’est lui qui définit l’élément : tous les atomes de sodium ont 11 protons, et tout atome qui a 11 protons est du sodium.',
        },
        {
          kind: 'definition',
          term: 'Nombre de masse $A$',
          text: 'nombre de nucléons du noyau (protons + neutrons).',
        },
        {
          kind: 'formula',
          tex: '\\ce{^{A}_{Z}X} \\qquad N = A - Z',
          legend: ['$X$ : le symbole de l’élément', '$N$ : le nombre de neutrons'],
        },
        {
          kind: 'example',
          title: 'l’atome de sodium $\\ce{^{23}_{11}Na}$',
          text: 'On lit $Z = 11$ et $A = 23$.',
          steps: [
            'Protons : $Z = 11$.',
            'Neutrons : $N = A - Z = 23 - 11 = 12$.',
            'Électrons : l’atome est neutre, il en a autant que de protons, soit 11.',
          ],
        },
        {
          kind: 'trap',
          wrong: '« $A$ est le nombre total de particules de l’atome. »',
          why: '$A$ ne compte que les particules du **noyau**. Les électrons ne sont pas comptés dans $A$.',
          reflex: '$A$ = protons + neutrons. Les électrons se déduisent de $Z$ et de la charge.',
        },
      ],
    },
    {
      title: 'Atome neutre et ions',
      blocks: [
        {
          kind: 'rule',
          text: 'Un atome est **électriquement neutre** : il possède autant d’électrons que de protons, soit $Z$ électrons. La charge du noyau ($+Ze$) compense exactement celle des électrons ($-Ze$).',
        },
        {
          kind: 'definition',
          term: 'Ion',
          text: 'atome (ou groupe d’atomes) qui a **perdu** ou **gagné** un ou plusieurs électrons. Un ion positif est un **cation**, un ion négatif est un **anion**.',
        },
        {
          kind: 'example',
          title: 'le sel de cuisine',
          text: 'Le sel est fait d’ions sodium $\\ce{Na+}$ et d’ions chlorure $\\ce{Cl-}$.',
          steps: [
            '$\\ce{Na+}$ : 11 protons et 10 électrons ; l’atome de sodium a **perdu** un électron.',
            '$\\ce{Cl-}$ : 17 protons et 18 électrons ; l’atome de chlore a **gagné** un électron.',
          ],
        },
        {
          kind: 'trap',
          wrong: '« L’ion $\\ce{Na+}$ a gagné un proton. »',
          why: 'Le noyau ne change jamais dans une réaction chimique. Si le nombre de protons changeait, ce ne serait plus du sodium.',
          reflex: 'Un ion se forme toujours en **perdant ou gagnant des électrons**. Charge $+$ : électrons perdus ; charge $-$ : électrons gagnés.',
        },
      ],
    },
    {
      title: 'Les isotopes',
      blocks: [
        {
          kind: 'definition',
          term: 'Isotopes',
          text: 'atomes qui ont le **même numéro atomique** $Z$ mais des **nombres de masse** $A$ différents. Ils ont donc le même nombre de protons mais pas le même nombre de neutrons.',
        },
        {
          kind: 'example',
          title: 'le carbone',
          text: 'Le carbone existe surtout sous la forme $\\ce{^{12}_{6}C}$ (6 neutrons), mais aussi $\\ce{^{13}_{6}C}$ (7 neutrons) et $\\ce{^{14}_{6}C}$ (8 neutrons). Le carbone 14 est radioactif : c’est lui qui permet de dater les objets anciens trouvés à Djenné-Djenno.',
        },
        {
          kind: 'example',
          title: 'pourquoi la masse molaire du chlore est 35,5',
          text: 'Le chlore naturel contient 75 % de $\\ce{^{35}Cl}$ et 25 % de $\\ce{^{37}Cl}$. La moyenne pondérée vaut :',
          steps: ['$0{,}75 \\times 35 + 0{,}25 \\times 37 = 26{,}25 + 9{,}25 = 35{,}5$'],
        },
      ],
    },
    {
      title: 'La masse d’un atome',
      blocks: [
        {
          kind: 'text',
          text: 'La masse des électrons est négligeable devant celle du noyau, et protons et neutrons ont presque la même masse. On retient donc :',
        },
        {
          kind: 'formula',
          tex: 'm_{\\text{atome}} \\approx A \\times m_{\\text{nucléon}} \\qquad m_{\\text{nucléon}} \\approx 1{,}67 \\times 10^{-27}\\ \\text{kg}',
        },
        {
          kind: 'example',
          title: 'un atome d’aluminium $\\ce{^{27}_{13}Al}$',
          text: '$m \\approx 27 \\times 1{,}67 \\times 10^{-27} = 4{,}51 \\times 10^{-26}$ kg.',
        },
      ],
    },
    {
      title: 'Les électrons se rangent en couches',
      blocks: [
        {
          kind: 'text',
          text: 'Les électrons se répartissent sur des **couches** notées K, L, M, N… de la plus proche du noyau à la plus éloignée. Chaque couche a un nombre maximal d’électrons.',
        },
        {
          kind: 'table',
          head: ['Couche', 'K', 'L', 'M'],
          rows: [['Nombre maximal d’électrons', '2', '8', '18 (8 pour les 20 premiers éléments)']],
        },
        {
          kind: 'rule',
          text: 'On remplit les couches dans l’ordre K, puis L, puis M : on ne passe à la couche suivante que lorsque la précédente est pleine. La dernière couche occupée est la **couche externe** ; ses électrons sont les **électrons de valence**.',
        },
        {
          kind: 'example',
          title: 'l’atome de chlore ($Z = 17$)',
          text: '17 électrons à placer : 2 sur K, 8 sur L, il en reste 7 pour M. On écrit $(K)^2(L)^8(M)^7$ : le chlore a **7 électrons de valence**.',
        },
        {
          kind: 'trap',
          wrong: '« Le lithium ($Z = 3$) s’écrit $(K)^3$. »',
          why: 'La couche K ne peut contenir que 2 électrons.',
          reflex: 'Vérifie toujours le maximum de chaque couche : $(K)^2(L)^1$ pour le lithium.',
        },
      ],
    },
  ],
  essentials: [
    'Un atome = un noyau (protons + neutrons) entouré d’électrons. Presque toute sa masse est dans le noyau.',
    'Charge du proton : $+e$ ; de l’électron : $-e$ ; le neutron n’a pas de charge. $e = 1{,}6 \\times 10^{-19}$ C.',
    'Dans $\\ce{^{A}_{Z}X}$ : $Z$ protons, $A - Z$ neutrons, et $Z$ électrons si l’atome est neutre.',
    'Un ion se forme en perdant (cation) ou en gagnant (anion) des électrons ; le noyau ne change pas.',
    'Des isotopes ont le même $Z$ et des $A$ différents.',
    '$m_{\\text{atome}} \\approx A \\times 1{,}67 \\times 10^{-27}$ kg.',
    'Couches : K (2 au plus), L (8), M ; on les remplit dans l’ordre.',
  ],
  simulationTasks: [
    'construire l’atome de carbone 12, puis le carbone 14 : qu’est-ce qui change, et qu’est-ce qui reste pareil ?',
    'construire un atome de sodium, puis retirer un électron : quel ion obtiens-tu ?',
    'trouver l’élément qui a exactement 8 électrons sur sa couche L et 1 sur sa couche M.',
  ],
  exercises: [
    {
      id: 'tableau-particules',
      level: 1,
      statement: 'Donne le nombre de protons, de neutrons et d’électrons des atomes suivants :',
      questions: ['$\\ce{^{16}_{8}O}$', '$\\ce{^{27}_{13}Al}$', '$\\ce{^{56}_{26}Fe}$'],
      solution: [
        'Oxygène : 8 protons, $16 - 8 = 8$ neutrons, 8 électrons.',
        'Aluminium : 13 protons, $27 - 13 = 14$ neutrons, 13 électrons.',
        'Fer : 26 protons, $56 - 26 = 30$ neutrons, 26 électrons.',
      ],
    },
    {
      id: 'identifier',
      level: 1,
      statement: 'Un atome neutre possède 17 électrons et 18 neutrons.',
      questions: ['Quel est son numéro atomique ?', 'Quel est son nombre de masse ?', 'Écris sa notation symbolique.'],
      hints: ['Dans un atome neutre, nombre d’électrons = nombre de protons.'],
      solution: [
        '$Z = 17$ (autant de protons que d’électrons).',
        '$A = Z + N = 17 + 18 = 35$.',
        'L’élément de numéro 17 est le chlore : $\\ce{^{35}_{17}Cl}$.',
      ],
    },
    {
      id: 'ion-magnesium',
      level: 2,
      statement: 'L’ion magnésium a pour formule $\\ce{Mg^{2+}}$. Le numéro atomique du magnésium est $Z = 12$.',
      questions: [
        'Combien d’électrons possède cet ion ?',
        'Écris sa répartition électronique.',
        'Quel gaz noble a la même répartition ?',
      ],
      solution: [
        'La charge $2+$ signifie que l’atome a perdu 2 électrons : $12 - 2 = 10$ électrons.',
        '$(K)^2(L)^8$.',
        'Le néon ($Z = 10$) a aussi $(K)^2(L)^8$ : l’ion a une couche externe pleine, comme un gaz noble.',
      ],
    },
    {
      id: 'couche-m',
      level: 2,
      statement: 'Un atome a 3 électrons sur sa couche M, qui est sa couche externe.',
      questions: ['Quel est son numéro atomique ?', 'Identifie l’élément à l’aide du tableau périodique.'],
      hints: ['Si M est occupée, les couches K et L sont forcément pleines.'],
      solution: ['K et L sont pleines : $Z = 2 + 8 + 3 = 13$.', 'C’est l’aluminium, Al.'],
    },
    {
      id: 'masse-sodium',
      level: 2,
      statement: 'On considère l’atome de sodium $\\ce{^{23}_{11}Na}$. On donne $m_{\\text{nucléon}} = 1{,}67 \\times 10^{-27}$ kg.',
      questions: ['Calcule la masse d’un atome de sodium.', 'Combien d’atomes y a-t-il dans 1 g de sodium ?'],
      solution: [
        '$m = 23 \\times 1{,}67 \\times 10^{-27} = 3{,}84 \\times 10^{-26}$ kg, soit $3{,}84 \\times 10^{-23}$ g.',
        '$N = \\dfrac{1}{3{,}84 \\times 10^{-23}} \\approx 2{,}6 \\times 10^{22}$ atomes.',
      ],
    },
    {
      id: 'isotopes-cuivre',
      level: 3,
      statement:
        'Le cuivre naturel est un mélange de deux isotopes : $\\ce{^{63}Cu}$ (69 %) et $\\ce{^{65}Cu}$ (31 %). Le numéro atomique du cuivre est 29.',
      questions: [
        'Qu’ont en commun ces deux isotopes ? En quoi diffèrent-ils ?',
        'Calcule la masse molaire moyenne du cuivre naturel, en prenant pour masse de chaque isotope son nombre de masse (en g/mol).',
        'Calcule la charge électrique du noyau d’un atome de cuivre.',
      ],
      solution: [
        'Même nombre de protons (29) et d’électrons ; $\\ce{^{63}Cu}$ a 34 neutrons et $\\ce{^{65}Cu}$ en a 36.',
        '$M = 0{,}69 \\times 63 + 0{,}31 \\times 65 = 43{,}47 + 20{,}15 = 63{,}62 \\approx 63{,}6$ g/mol (valeur des tables : 63,55 g/mol).',
        '$q = Z \\times e = 29 \\times 1{,}6 \\times 10^{-19} = 4{,}64 \\times 10^{-18}$ C.',
      ],
    },
  ],
  quiz: [
    {
      question: 'Le noyau d’un atome contient :',
      choices: ['des protons et des électrons', 'des protons et des neutrons', 'des neutrons et des électrons', 'seulement des protons'],
      answer: 1,
      explanation: 'Le noyau est formé de nucléons : protons et neutrons. Les électrons sont autour du noyau.',
    },
    {
      question: 'Le numéro atomique $Z$ est :',
      choices: ['le nombre de neutrons', 'le nombre de nucléons', 'le nombre de protons', 'la masse de l’atome'],
      answer: 2,
      explanation: '$Z$ compte les protons. C’est lui qui identifie l’élément.',
    },
    {
      question: 'Combien de neutrons possède $\\ce{^{37}_{17}Cl}$ ?',
      choices: ['17', '20', '37', '54'],
      answer: 1,
      explanation: '$N = A - Z = 37 - 17 = 20$.',
    },
    {
      question: 'L’ion chlorure $\\ce{Cl-}$ s’est formé :',
      choices: ['en perdant un électron', 'en gagnant un électron', 'en gagnant un proton', 'en perdant un neutron'],
      answer: 1,
      explanation: 'Une charge négative vient d’un électron gagné. Le noyau ne change pas.',
    },
    {
      question: 'Deux isotopes d’un même élément ont :',
      choices: ['le même $A$', 'le même nombre de neutrons', 'le même $Z$', 'des symboles différents'],
      answer: 2,
      explanation: 'Même nombre de protons (même $Z$), nombre de neutrons différent.',
    },
    {
      question: 'La répartition électronique du sodium ($Z = 11$) est :',
      choices: ['$(K)^2(L)^9$', '$(K)^2(L)^8(M)^1$', '$(K)^3(L)^8$', '$(K)^1(L)^8(M)^2$'],
      answer: 1,
      explanation: 'K prend 2 électrons, L en prend 8, et le dernier va sur M.',
    },
    {
      question: 'La masse d’un atome est concentrée :',
      choices: ['dans ses électrons', 'dans son noyau', 'de façon égale partout', 'dans le vide entre noyau et électrons'],
      answer: 1,
      explanation: 'Un nucléon est environ 1 836 fois plus lourd qu’un électron.',
    },
  ],
  applications: [
    {
      title: 'L’or de Sadiola',
      situation:
        'Le Mali est l’un des premiers producteurs d’or d’Afrique, notamment grâce aux mines de Sadiola et de Loulo. L’or y est présent sous la forme de l’isotope $\\ce{^{197}_{79}Au}$. Une bague en or pur pèse 4 g.',
      questions: [
        'Combien de protons, de neutrons et d’électrons possède un atome d’or ?',
        'Calcule la masse d’un atome d’or ($m_{\\text{nucléon}} = 1{,}67 \\times 10^{-27}$ kg).',
        'Combien d’atomes d’or contient la bague ?',
      ],
      solution: [
        '79 protons, $197 - 79 = 118$ neutrons et 79 électrons.',
        '$m = 197 \\times 1{,}67 \\times 10^{-27} = 3{,}29 \\times 10^{-25}$ kg, soit $3{,}29 \\times 10^{-22}$ g.',
        '$N = \\dfrac{4}{3{,}29 \\times 10^{-22}} \\approx 1{,}2 \\times 10^{22}$ atomes : douze mille milliards de milliards.',
      ],
    },
    {
      title: 'Dater les poteries de Djenné-Djenno',
      situation:
        'Les archéologues ont daté la ville ancienne de Djenné-Djenno grâce au carbone 14 contenu dans les restes de charbon et de céréales. Le carbone des êtres vivants contient surtout du $\\ce{^{12}_{6}C}$ et une infime quantité de $\\ce{^{14}_{6}C}$.',
      questions: [
        'Compare la composition des noyaux de ces deux atomes.',
        'Pourquoi dit-on qu’ils sont isotopes ?',
        'Ont-ils les mêmes propriétés chimiques ? Justifie.',
      ],
      solution: [
        '$\\ce{^{12}C}$ : 6 protons et 6 neutrons ; $\\ce{^{14}C}$ : 6 protons et 8 neutrons.',
        'Même numéro atomique ($Z = 6$), nombres de masse différents.',
        'Oui : ils ont le même nombre d’électrons, rangés de la même façon, $(K)^2(L)^4$. Or ce sont les électrons qui déterminent les propriétés chimiques. Seul le noyau du carbone 14 diffère : il est radioactif, ce qui permet la datation.',
      ],
    },
  ],
};
