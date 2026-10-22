import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Le sel de cuisine est un solide fait de petits cristaux en forme de cubes. Plonge deux fils reliés à une pile et à une lampe dans du sel sec : rien ne se passe. Verse ce sel dans de l’eau : la lampe s’allume. Le sel ne contient pas de métal, pourtant l’eau salée conduit le courant. Que s’est-il passé ?',
  objectives: [
    'prévoir la charge des ions monoatomiques et reconnaître les ions polyatomiques courants ;',
    'expliquer ce qu’est la liaison ionique et décrire un cristal ionique ;',
    'écrire la formule d’un composé ionique et le nommer ;',
    'écrire l’équation de dissolution d’un solide ionique dans l’eau ;',
    'expliquer pourquoi une solution ionique conduit le courant.',
  ],
  sections: [
    {
      title: 'Les ions monoatomiques',
      blocks: [
        {
          kind: 'text',
          text: 'Un ion monoatomique vient d’un seul atome qui a perdu ou gagné des électrons. Pour les éléments des groupes 1, 2, 13, 15, 16 et 17, la règle de l’octet (ou du duet) permet de prévoir sa charge.',
        },
        {
          kind: 'table',
          head: ['Cations', 'Nom', 'Anions', 'Nom'],
          rows: [
            ['$\\ce{Na+}$', 'ion sodium', '$\\ce{Cl-}$', 'ion chlorure'],
            ['$\\ce{K+}$', 'ion potassium', '$\\ce{F-}$', 'ion fluorure'],
            ['$\\ce{Mg^{2+}}$', 'ion magnésium', '$\\ce{O^{2-}}$', 'ion oxyde'],
            ['$\\ce{Ca^{2+}}$', 'ion calcium', '$\\ce{S^{2-}}$', 'ion sulfure'],
            ['$\\ce{Al^{3+}}$', 'ion aluminium', '$\\ce{I-}$', 'ion iodure'],
          ],
        },
        {
          kind: 'text',
          text: 'Les métaux de transition, comme le fer ou le cuivre, ne suivent pas la règle de l’octet. Il faut connaître leurs ions : $\\ce{Fe^{2+}}$ (fer II), $\\ce{Fe^{3+}}$ (fer III), $\\ce{Cu^{2+}}$ (cuivre II), $\\ce{Zn^{2+}}$ (zinc).',
        },
      ],
    },
    {
      title: 'Les ions polyatomiques',
      blocks: [
        {
          kind: 'definition',
          term: 'Ion polyatomique',
          text: 'groupe de plusieurs atomes liés entre eux, qui porte globalement une charge électrique.',
        },
        {
          kind: 'table',
          head: ['Ion', 'Nom', 'Ion', 'Nom'],
          rows: [
            ['$\\ce{NH4+}$', 'ammonium', '$\\ce{OH-}$', 'hydroxyde'],
            ['$\\ce{NO3-}$', 'nitrate', '$\\ce{SO4^{2-}}$', 'sulfate'],
            ['$\\ce{CO3^{2-}}$', 'carbonate', '$\\ce{PO4^{3-}}$', 'phosphate'],
            ['$\\ce{HCO3-}$', 'hydrogénocarbonate', '$\\ce{MnO4-}$', 'permanganate'],
          ],
        },
        {
          kind: 'trap',
          wrong: '« L’ion sulfate $\\ce{SO4^{2-}}$, c’est un ion soufre et quatre ions oxygène. »',
          why: 'Les 5 atomes sont liés entre eux et forment un seul ion. La charge $2-$ est celle de l’ensemble.',
          reflex: 'Un ion polyatomique se traite comme un bloc : on ne le découpe jamais dans une formule ou une équation.',
        },
      ],
    },
    {
      title: 'La liaison ionique et le cristal',
      blocks: [
        {
          kind: 'definition',
          term: 'Liaison ionique',
          text: 'attraction électrique entre des ions de charges opposées. Les cations attirent les anions, et inversement.',
        },
        {
          kind: 'definition',
          term: 'Cristal ionique',
          text: 'solide où les ions sont empilés de façon régulière dans les trois directions. Chaque ion est entouré d’ions de charge opposée.',
        },
        {
          kind: 'example',
          title: 'le cristal de chlorure de sodium',
          text: 'Dans le sel, chaque ion $\\ce{Na+}$ est entouré de 6 ions $\\ce{Cl-}$, et chaque ion $\\ce{Cl-}$ de 6 ions $\\ce{Na+}$. Cet empilement en cubes se voit à l’œil nu : les grains de sel sont de petits cubes.',
        },
        {
          kind: 'rule',
          text: 'Un cristal ionique est **électriquement neutre**. Sa formule, appelée **formule statistique**, indique les proportions des ions sans écrire les charges : $\\ce{NaCl}$ veut dire « autant d’ions $\\ce{Na+}$ que d’ions $\\ce{Cl-}$ ».',
        },
        {
          kind: 'trap',
          wrong: '« $\\ce{NaCl}$ est une molécule formée d’un atome de sodium et d’un atome de chlore. »',
          why: 'Il n’y a pas de molécule dans un cristal ionique : chaque ion est attiré par tous ses voisins de charge opposée, sans former de petit groupe isolé.',
          reflex: 'Pour un composé ionique, la formule donne une **proportion** d’ions, pas une molécule.',
        },
      ],
    },
    {
      title: 'Écrire et nommer un composé ionique',
      blocks: [
        {
          kind: 'rule',
          text: 'On écrit d’abord le cation, puis l’anion, avec les plus petits nombres qui rendent l’ensemble neutre. Un ion polyatomique répété se met entre parenthèses. Pour nommer, on dit d’abord l’anion, puis le cation : $\\ce{CaCO3}$ est le carbonate **de** calcium.',
        },
        {
          kind: 'example',
          title: 'le phosphate de calcium, minéral des os',
          text: 'Ions : $\\ce{Ca^{2+}}$ et $\\ce{PO4^{3-}}$.',
          steps: [
            'Le plus petit multiple commun de 2 et de 3 est 6.',
            '3 ions $\\ce{Ca^{2+}}$ apportent $+6$ ; 2 ions $\\ce{PO4^{3-}}$ apportent $-6$.',
            'Formule : $\\ce{Ca3(PO4)2}$.',
          ],
        },
        {
          kind: 'table',
          head: ['Formule', 'Nom', 'Où le trouve-t-on ?'],
          rows: [
            ['$\\ce{CaCO3}$', 'carbonate de calcium', 'calcaire, coquilles, craie'],
            ['$\\ce{CuSO4}$', 'sulfate de cuivre II', 'traitement des cultures et des piscines'],
            ['$\\ce{NH4NO3}$', 'nitrate d’ammonium', 'engrais'],
            ['$\\ce{NaHCO3}$', 'hydrogénocarbonate de sodium', 'bicarbonate de cuisine'],
          ],
        },
      ],
    },
    {
      title: 'Les solutions ioniques',
      blocks: [
        {
          kind: 'text',
          text: 'Quand on dissout un solide ionique dans l’eau, l’eau sépare les ions du cristal. Ils se dispersent dans toute la solution et deviennent mobiles. On note $\\text{(aq)}$ un ion entouré de molécules d’eau.',
        },
        {
          kind: 'formula',
          tex: '\\ce{NaCl(s) -> Na+(aq) + Cl-(aq)}',
          legend: ['$\\text{(s)}$ : solide ; $\\text{(aq)}$ : dissous dans l’eau'],
        },
        {
          kind: 'rule',
          text: 'Dans une équation de dissolution, on conserve **les éléments** et **les charges** : le total des charges à droite est nul, comme le solide de départ.',
        },
        {
          kind: 'example',
          title: 'le chlorure de calcium',
          text: '$\\ce{CaCl2(s) -> Ca^{2+}(aq) + 2Cl-(aq)}$ ; charges à droite : $+2 - 2 = 0$.',
        },
        {
          kind: 'text',
          text: 'Le courant électrique est un déplacement de charges. Dans le sel solide, les ions sont bloqués dans le cristal : pas de courant. Dans l’eau salée, les ions sont libres de se déplacer : la solution **conduit le courant**.',
        },
      ],
    },
  ],
  essentials: [
    'Groupes 1, 2, 13 → cations $+1$, $+2$, $+3$ ; groupes 15, 16, 17 → anions $-3$, $-2$, $-1$.',
    'Ions polyatomiques à connaître : ammonium, hydroxyde, nitrate, sulfate, carbonate, phosphate.',
    'Liaison ionique : attraction électrique entre ions de charges opposées.',
    'Un cristal ionique est neutre ; sa formule statistique donne la proportion des ions.',
    'Pour nommer : l’anion d’abord, puis le cation (« chlorure de sodium »).',
    'Dissolution : $\\ce{NaCl(s) -> Na+(aq) + Cl-(aq)}$, avec conservation des éléments et des charges.',
    'Une solution ionique conduit le courant parce que ses ions sont mobiles.',
  ],
  simulationTasks: [
    'construire un atome de magnésium, puis retirer des électrons jusqu’à obtenir l’ion $\\ce{Mg^{2+}}$ : compare ses couches à celles du néon ;',
    'construire un atome de chlore, puis ajouter un électron : quel gaz noble a la même répartition que $\\ce{Cl-}$ ?',
  ],
  exercises: [
    {
      id: 'ecrire-formules',
      level: 1,
      statement: 'Écris la formule des composés ioniques suivants :',
      questions: ['chlorure de potassium', 'fluorure de calcium', 'sulfate d’aluminium', 'phosphate d’ammonium'],
      solution: [
        '$\\ce{K+}$ et $\\ce{Cl-}$ : $\\ce{KCl}$.',
        '$\\ce{Ca^{2+}}$ et $\\ce{F-}$ : il faut 2 ions fluorure, $\\ce{CaF2}$.',
        '$\\ce{Al^{3+}}$ et $\\ce{SO4^{2-}}$ : 2 ions aluminium ($+6$) et 3 ions sulfate ($-6$), $\\ce{Al2(SO4)3}$.',
        '$\\ce{NH4+}$ et $\\ce{PO4^{3-}}$ : 3 ions ammonium, $\\ce{(NH4)3PO4}$.',
      ],
    },
    {
      id: 'nommer',
      level: 1,
      statement: 'Donne le nom des composés suivants :',
      questions: ['$\\ce{Na2CO3}$', '$\\ce{Mg(OH)2}$', '$\\ce{FeCl3}$', '$\\ce{KNO3}$'],
      solution: [
        'Carbonate de sodium.',
        'Hydroxyde de magnésium.',
        'Chlorure de fer III (le fer porte la charge $3+$ pour compenser 3 ions $\\ce{Cl-}$).',
        'Nitrate de potassium.',
      ],
    },
    {
      id: 'dissolution',
      level: 1,
      statement: 'Écris l’équation de dissolution dans l’eau de :',
      questions: ['$\\ce{KNO3}$', '$\\ce{MgCl2}$', '$\\ce{Na2SO4}$', '$\\ce{Al2(SO4)3}$'],
      solution: [
        '$\\ce{KNO3(s) -> K+(aq) + NO3-(aq)}$',
        '$\\ce{MgCl2(s) -> Mg^{2+}(aq) + 2Cl-(aq)}$',
        '$\\ce{Na2SO4(s) -> 2Na+(aq) + SO4^{2-}(aq)}$',
        '$\\ce{Al2(SO4)3(s) -> 2Al^{3+}(aq) + 3SO4^{2-}(aq)}$',
      ],
    },
    {
      id: 'corriger',
      level: 2,
      statement: 'Un élève écrit que le chlorure de calcium a pour formule $\\ce{CaCl}$.',
      questions: ['Montre que cette formule est fausse.', 'Corrige-la.'],
      hints: ['Additionne les charges des ions que donne cette formule.'],
      solution: [
        'Avec un ion $\\ce{Ca^{2+}}$ et un ion $\\ce{Cl-}$, le total des charges vaut $+2 - 1 = +1$ : le composé ne serait pas neutre.',
        'Il faut deux ions chlorure : $\\ce{CaCl2}$, car $+2 - 2 = 0$.',
      ],
    },
    {
      id: 'rouille',
      level: 2,
      statement: 'La rouille contient de l’oxyde de fer de formule $\\ce{Fe2O3}$.',
      questions: ['Quelle est la charge de l’ion oxyde ?', 'Déduis-en la charge des ions fer dans ce composé.', 'Nomme ce composé.'],
      solution: [
        '$\\ce{O^{2-}}$ : charge $-2$ (groupe 16).',
        '3 ions oxyde apportent $-6$ ; les 2 ions fer doivent apporter $+6$, soit $+3$ chacun : $\\ce{Fe^{3+}}$.',
        'Oxyde de fer III.',
      ],
    },
    {
      id: 'conductivite',
      level: 3,
      statement:
        'On teste avec une pile et une lampe : (A) du sel solide, (B) de l’eau distillée, (C) de l’eau sucrée, (D) de l’eau salée. Seule la lampe du test D s’allume.',
      questions: [
        'Pourquoi le sel solide ne conduit-il pas le courant, alors qu’il contient des ions ?',
        'Que contient la solution D que ne contiennent pas les solutions B et C ?',
        'Le sucre est-il un composé ionique ? Justifie.',
      ],
      solution: [
        'Dans le cristal, les ions sont fixes : ils ne peuvent pas se déplacer, donc il n’y a pas de courant.',
        'Des ions libres, $\\ce{Na+(aq)}$ et $\\ce{Cl-(aq)}$, qui peuvent se déplacer.',
        'Non : l’eau sucrée ne conduit pas, elle ne contient donc pas d’ions. Le sucre est formé de molécules (voir le chapitre sur la liaison covalente).',
      ],
    },
  ],
  quiz: [
    {
      question: 'La liaison ionique est :',
      choices: ['une mise en commun d’électrons', 'une attraction entre ions de charges opposées', 'une liaison entre deux noyaux', 'une attraction entre deux atomes neutres'],
      answer: 1,
      explanation: 'Les cations et les anions s’attirent parce qu’ils ont des charges opposées.',
    },
    {
      question: 'Le nom de $\\ce{CaCO3}$ est :',
      choices: ['carbonate de calcium', 'calcium carbonate', 'carbure de calcium', 'oxyde de calcium'],
      answer: 0,
      explanation: 'En français, on nomme l’anion d’abord : carbonate de calcium.',
    },
    {
      question: 'La formule du sulfate de sodium est :',
      choices: ['$\\ce{NaSO4}$', '$\\ce{Na2SO4}$', '$\\ce{Na(SO4)2}$', '$\\ce{NaS}$'],
      answer: 1,
      explanation: '2 ions $\\ce{Na+}$ compensent un ion $\\ce{SO4^{2-}}$.',
    },
    {
      question: 'L’équation de dissolution de $\\ce{CaCl2}$ est :',
      choices: [
        '$\\ce{CaCl2 -> Ca+ + Cl2-}$',
        '$\\ce{CaCl2 -> Ca^{2+} + Cl2^{2-}}$',
        '$\\ce{CaCl2 -> Ca^{2+} + 2Cl-}$',
        '$\\ce{CaCl2 -> Ca + 2Cl}$',
      ],
      answer: 2,
      explanation: 'Le cristal libère un ion calcium et deux ions chlorure ; les charges s’équilibrent.',
    },
    {
      question: 'L’eau salée conduit le courant parce que :',
      choices: ['l’eau est un métal', 'elle contient des ions mobiles', 'le sel contient des électrons libres', 'le sel est un solide'],
      answer: 1,
      explanation: 'Le courant est un déplacement de charges : ici, ce sont les ions qui se déplacent.',
    },
    {
      question: 'Dans $\\ce{Fe2O3}$, les ions fer sont :',
      choices: ['$\\ce{Fe+}$', '$\\ce{Fe^{2+}}$', '$\\ce{Fe^{3+}}$', '$\\ce{Fe^{6+}}$'],
      answer: 2,
      explanation: '3 ions $\\ce{O^{2-}}$ font $-6$ ; 2 ions fer doivent faire $+6$.',
    },
  ],
  applications: [
    {
      title: 'Rendre l’eau du fleuve limpide',
      situation:
        'Dans une station de traitement d’eau, l’eau du fleuve Niger est trouble. On y ajoute du sulfate d’aluminium : les ions aluminium font s’agglomérer la boue en flocons qui tombent au fond. L’eau claire est ensuite filtrée et désinfectée.',
      questions: [
        'Écris la formule du sulfate d’aluminium.',
        'Écris son équation de dissolution dans l’eau.',
        'Quels ions sont présents dans l’eau après l’ajout ?',
      ],
      solution: [
        '$\\ce{Al2(SO4)3}$.',
        '$\\ce{Al2(SO4)3(s) -> 2Al^{3+}(aq) + 3SO4^{2-}(aq)}$.',
        'Des ions aluminium $\\ce{Al^{3+}}$ et des ions sulfate $\\ce{SO4^{2-}}$.',
      ],
    },
    {
      title: 'Le sel iodé de la cuisine',
      situation:
        'Le manque d’iode dans l’alimentation provoque le goitre. Pour l’éviter, on ajoute au sel de cuisine un peu d’iodate de potassium, de formule $\\ce{KIO3}$. Il contient l’ion polyatomique iodate.',
      questions: [
        'Quel est le cation de ce composé ? Déduis-en la charge de l’ion iodate et écris sa formule.',
        'Écris l’équation de dissolution de l’iodate de potassium.',
        'Quand on met ce sel dans la sauce, sous quelle forme se trouvent le sodium et le chlore ?',
      ],
      solution: [
        'Le cation est $\\ce{K+}$ ; le composé est neutre, l’ion iodate porte donc une charge $-1$ : $\\ce{IO3-}$.',
        '$\\ce{KIO3(s) -> K+(aq) + IO3-(aq)}$.',
        'Sous forme d’ions dissous : $\\ce{Na+(aq)}$ et $\\ce{Cl-(aq)}$.',
      ],
    },
  ],
};
