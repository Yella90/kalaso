import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Les orpailleurs de Kéniéba trouvent l’or sous forme de pépites brillantes, alors que le fer n’existe dans la nature que sous forme de minerais rouges. L’or ne rouille jamais ; le fer, si. Les métaux n’ont pas tous la même tendance à céder leurs électrons : on peut les **classer** selon leur pouvoir réducteur, et prévoir ainsi quelles réactions sont possibles.',
  objectives: [
    'classer des couples métalliques à partir d’expériences ;',
    'utiliser une classification par potentiels standard ;',
    'prévoir une réaction avec la règle du gamma ;',
    'prévoir l’action des acides sur les métaux.',
  ],
  sections: [
    {
      title: 'Établir une classification',
      blocks: [
        {
          kind: 'example',
          title: 'deux expériences',
          text: 'On plonge une lame de zinc dans une solution de $\\ce{Cu^2+}$, puis une lame de cuivre dans une solution de $\\ce{Zn^2+}$.',
          steps: ['Le zinc se couvre de cuivre : $\\ce{Zn + Cu^2+ -> Zn^2+ + Cu}$.', 'Rien ne se passe avec le cuivre dans $\\ce{Zn^2+}$.', 'Le zinc est un meilleur réducteur que le cuivre ; $\\ce{Cu^2+}$ est un meilleur oxydant que $\\ce{Zn^2+}$.'],
        },
        {
          kind: 'text',
          text: 'On attribue à chaque couple un **potentiel standard** $E°$ (en volts), mesuré par rapport au couple $\\ce{H+}$/$\\ce{H2}$ pris comme référence (0 V).',
        },
        {
          kind: 'table',
          head: ['Couple', '$E°$ (V)'],
          rows: [
            ['$\\ce{Au^3+}$/$\\ce{Au}$', '1,50'],
            ['$\\ce{Ag+}$/$\\ce{Ag}$', '0,80'],
            ['$\\ce{Cu^2+}$/$\\ce{Cu}$', '0,34'],
            ['$\\ce{H+}$/$\\ce{H2}$', '0,00'],
            ['$\\ce{Pb^2+}$/$\\ce{Pb}$', '−0,13'],
            ['$\\ce{Fe^2+}$/$\\ce{Fe}$', '−0,44'],
            ['$\\ce{Zn^2+}$/$\\ce{Zn}$', '−0,76'],
            ['$\\ce{Al^3+}$/$\\ce{Al}$', '−1,66'],
          ],
        },
      ],
    },
    {
      title: 'Prévoir une réaction',
      blocks: [
        {
          kind: 'rule',
          text: '**Règle du gamma** : l’oxydant le plus fort (couple de $E°$ le plus élevé) réagit spontanément avec le réducteur le plus fort (couple de $E°$ le plus bas). En plaçant les couples sur un axe vertical, oxydants à gauche, réducteurs à droite, la réaction suit un « γ ».',
        },
        {
          kind: 'rule',
          text: 'Les métaux dont le couple a un potentiel **négatif** (plomb, fer, zinc, aluminium…) sont attaqués par les acides avec dégagement de dihydrogène. Ceux de potentiel positif (cuivre, argent, or) ne le sont pas par l’acide chlorhydrique.',
        },
        {
          kind: 'example',
          title: 'zinc et acide',
          text: '$\\ce{Zn + 2H+ -> Zn^2+ + H2}$.',
          steps: ['0,1 mol de zinc (6,5 g) dégage 0,1 mol de dihydrogène, soit 2,4 L ($V_m = 24$ L/mol).'],
        },
        {
          kind: 'trap',
          wrong: '« Le cuivre réagit avec l’acide chlorhydrique comme le fer. »',
          why: 'Le couple $\\ce{Cu^2+}$/$\\ce{Cu}$ est au-dessus de $\\ce{H+}$/$\\ce{H2}$ : $\\ce{H+}$ n’est pas assez oxydant.',
          reflex: 'Comparer les $E°$ avant d’écrire une réaction.',
        },
      ],
    },
  ],
  essentials: [
    'Plus $E°$ est grand, plus l’oxydant du couple est fort ; plus $E°$ est petit, plus le réducteur est fort.',
    'Règle du gamma : oxydant le plus fort + réducteur le plus fort.',
    'Métaux de $E° < 0$ attaqués par les acides ($\\ce{H2}$ dégagé) ; cuivre, argent, or non.',
  ],
  exercises: [
    {
      id: 'classif-prevoir',
      level: 1,
      title: 'Prévoir',
      statement: 'Utilise le tableau des potentiels. Réponds « oui » ou « non ».',
      parts: [
        {
          label: 'Une lame de fer réagit-elle avec une solution de $\\ce{Cu^2+}$ ?',
          answer: { kind: 'text', display: 'oui', accepted: ['oui'] },
          steps: ['$E°(\\ce{Cu^2+}/\\ce{Cu}) = 0{,}34 > E°(\\ce{Fe^2+}/\\ce{Fe}) = -0{,}44$ : oui.'],
        },
        {
          label: 'L’argent réagit-il avec l’acide chlorhydrique ?',
          answer: { kind: 'text', display: 'non', accepted: ['non'] },
          steps: ['$E°(\\ce{Ag+}/\\ce{Ag}) = 0{,}80 > 0$ : $\\ce{H+}$ ne peut pas oxyder l’argent.'],
        },
      ],
    },
    {
      id: 'classif-zinc',
      level: 2,
      title: 'Zinc dans l’acide',
      statement: 'On met 6,54 g de zinc dans un excès d’acide chlorhydrique. $M(\\ce{Zn}) = 65{,}4$ g/mol ; $V_m = 24$ L/mol.',
      parts: [
        {
          label: 'Volume de dihydrogène dégagé (en L).',
          answer: { kind: 'number', value: 2.4, tolerance: 0.02, unit: 'L' },
          steps: ['$n(\\ce{Zn}) = 0{,}100$ mol = $n(\\ce{H2})$ ; $V = 0{,}100 \\times 24 = 2{,}4$ L.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Le meilleur réducteur parmi ces métaux est :',
      choices: ['l’aluminium', 'le cuivre', 'l’argent', 'l’or'],
      answer: 0,
      explanation: 'Son couple a le potentiel le plus bas (−1,66 V).',
    },
    {
      question: 'La règle du gamma permet de prévoir :',
      choices: ['quelle réaction d’oxydoréduction est spontanée', 'le pH d’une solution', 'la masse molaire', 'la vitesse d’une réaction'],
      answer: 0,
      explanation: 'L’oxydant le plus fort réagit avec le réducteur le plus fort.',
    },
    {
      question: 'Le cuivre plongé dans une solution de $\\ce{Zn^2+}$ :',
      choices: ['ne réagit pas', 'se couvre de zinc', 'dégage du dihydrogène', 'se dissout'],
      answer: 0,
      explanation: '$\\ce{Zn^2+}$ est un oxydant plus faible que $\\ce{Cu^2+}$.',
    },
    {
      question: 'L’or se trouve dans la nature à l’état de métal parce que :',
      choices: ['c’est un très mauvais réducteur, il ne s’oxyde pas', 'il est très lourd', 'il est très acide', 'il est radioactif'],
      answer: 0,
      explanation: 'Son couple a un potentiel très élevé.',
    },
  ],
  applications: [
    {
      title: 'L’or des orpailleurs',
      tagline: 'Pourquoi le mercure est-il si dangereux ?',
      situation:
        'Sur les sites d’orpaillage, on mélange la terre aurifère à du mercure, qui « attrape » les paillettes d’or ; on chauffe ensuite le mélange pour évaporer le mercure et récupérer l’or.',
      model: 'L’or est natif car il ne s’oxyde pas ; le mercure forme avec lui un alliage (amalgame).',
      questions: ['Pourquoi l’or reste-t-il brillant pendant des siècles ?', 'Quel est le danger du chauffage de l’amalgame ?'],
      solution: [
        'Le couple de l’or a un potentiel très élevé : ni le dioxygène de l’air ni les acides courants ne l’oxydent.',
        'Les vapeurs de mercure sont très toxiques pour le système nerveux et les reins ; le mercure pollue aussi durablement les rivières et les poissons.',
      ],
    },
  ],
};
