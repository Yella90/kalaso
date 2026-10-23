// Importé du site cecp (physique-3d, chapitre « calorimetrie ») par scripts/import-cecp.ts.
// Une nouvelle importation remplace ce fichier.
import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook: 'Mesurer les échanges de chaleur entre les corps.',
  objectives: [],
  sections: [
    {
      title: 'Chaleur et énergie interne',
      blocks: [
        {
          kind: 'callout',
          variant: 'methode',
          title: 'Rédiger un bilan calorimétrique',
          blocks: [
            {
              kind: 'list',
              items: [
                '1. Faire la liste des corps qui reçoivent et de ceux qui cèdent de la chaleur.',
                '2. Écrire chaque $Q_i$ avec la formule adaptée (sans oublier le calorimètre).',
                '3. Écrire $\\sum Q_i = 0$ et résoudre.',
              ],
            },
          ],
        },
        {
          kind: 'callout',
          variant: 'attention',
          blocks: [
            {
              kind: 'text',
              text: "Les masses s'expriment en kilogrammes. Une différence de température a la même valeur en °C et en K.",
            },
          ],
        },
        {
          kind: 'text',
          text: "La chaleur $Q$ est un transfert d'énergie dû à une différence de température. Elle s'exprime en joules. Par convention, $Q > 0$ si le système **reçoit** de la chaleur et $Q < 0$ s'il en **cède**.",
        },
      ],
    },
    {
      title: "Chaleur échangée sans changement d'état",
      blocks: [
        {
          kind: 'formula',
          tex: 'Q = m\\,c\\,(\\theta_f - \\theta_i) = C\\,(\\theta_f - \\theta_i)',
          legend: [
            '$c$ : capacité thermique massique (J·kg⁻¹·K⁻¹)',
            '$C = m c$ : capacité thermique (J/K)',
          ],
        },
        {
          kind: 'table',
          head: [
            'Corps',
            'c (J·kg⁻¹·K⁻¹)',
          ],
          rows: [
            [
              'Eau liquide',
              '4185',
            ],
            [
              'Glace',
              '2100',
            ],
            [
              'Aluminium',
              '920',
            ],
            [
              'Fer',
              '460',
            ],
            [
              'Cuivre',
              '385',
            ],
          ],
        },
      ],
    },
    {
      title: "Chaleur latente de changement d'état",
      blocks: [
        {
          kind: 'formula',
          tex: 'Q = m\\,L',
          legend: [
            '$L$ : chaleur latente (J/kg)',
            'Fusion de la glace : $L_f = 3{,}34\\times10^5$ J/kg',
            "Vaporisation de l'eau : $L_v = 2{,}26\\times10^6$ J/kg",
          ],
        },
        {
          kind: 'text',
          text: "Pendant un changement d'état d'un corps pur, sous pression constante, la température reste **constante**.",
        },
      ],
    },
    {
      title: 'Le calorimètre et la méthode des mélanges',
      blocks: [
        {
          kind: 'text',
          text: "Un calorimètre est une enceinte isolée thermiquement : on considère que le système {calorimètre + contenu} n'échange pas de chaleur avec l'extérieur.",
        },
        {
          kind: 'formula',
          tex: '\\sum Q_i = 0',
          label: 'Principe des échanges',
        },
        {
          kind: 'list',
          items: [
            'Le calorimètre et ses accessoires ont une capacité thermique $C$ ; on parle aussi de **valeur en eau** $\\mu = C / c_{eau}$.',
            "Mélange sans changement d'état : $\\theta_e = \\dfrac{\\sum C_i\\,\\theta_i}{\\sum C_i}$.",
            "Avec de la glace : vérifier d'abord si la chaleur disponible suffit à fondre toute la glace, sinon l'équilibre est à 0 °C.",
          ],
        },
      ],
    },
  ],
  essentials: [],
  exercises: [
    {
      id: 'calo-bouilloire',
      level: 1,
      title: 'La bouilloire électrique',
      statement: "On veut faire bouillir 300 g d'eau pour le thé, initialement à 25 °C, avec une bouilloire de puissance $P = 2000$ W. On prend $c_{eau} = 4185$ J·kg⁻¹·K⁻¹.",
      given: [
        {
          label: 'm',
          value: '300 g',
        },
        {
          label: 'θ initiale',
          value: '25 °C',
        },
        {
          label: 'P',
          value: '2000 W',
        },
        {
          label: 'c eau',
          value: '4185 J/(kg·K)',
        },
      ],
      parts: [
        {
          label: "Quelle quantité de chaleur faut-il fournir pour amener l'eau à 100 °C ? (en kJ)",
          answer: {
            kind: 'number',
            value: 94.1625,
            tolerance: 0.5,
            unit: 'kJ',
          },
          steps: [
            '$Q = m\\,c\\,(\\theta_f - \\theta_i)$',
            '$Q = 0{,}3\\times 4185\\times(100 - 25) \\approx 94163$ J',
          ],
          result: 'Q = mc\\Delta\\theta \\approx 94{,}2\\ \\text{kJ}',
        },
        {
          label: 'Sans pertes, quelle est la durée de chauffage (en s) ?',
          answer: {
            kind: 'number',
            value: 47.08125,
            tolerance: 0.5,
            unit: 's',
          },
          steps: [
            "L'énergie électrique reçue est $W = P\\,t$. Sans pertes, $W = Q$ donc $t = \\dfrac{Q}{P} = \\dfrac{94163}{2000} \\approx 47{,}1$ s",
          ],
          result: 't = Q/P \\approx 47{,}1\\ \\text{s}',
        },
        {
          label: 'En réalité, le rendement est de 80 %. Quelle est la durée réelle (en s) ?',
          answer: {
            kind: 'number',
            value: 58.851563,
            tolerance: 0.5,
            unit: 's',
          },
          steps: [
            "Seuls 80 % de l'énergie chauffent l'eau : $0{,}8\\,P\\,t = Q$ donc $t = \\dfrac{Q}{0{,}8\\,P} \\approx 58{,}9$ s",
          ],
          result: 't = \\frac{Q}{rP} \\approx 58{,}9\\ \\text{s}',
        },
      ],
    },
    {
      id: 'calo-melange',
      level: 2,
      title: 'Mélange dans un calorimètre',
      statement: "Un calorimètre de capacité thermique $C = 150$ J/K contient 200 g d'eau à 20 °C (le calorimètre est à la même température). On y verse 300 g d'eau à 80 °C. On néglige les pertes.",
      given: [
        {
          label: 'C calorimètre',
          value: '150 J/K',
        },
        {
          label: 'eau froide',
          value: '200 g à 20 °C',
        },
        {
          label: 'eau chaude',
          value: '300 g à 80 °C',
        },
        {
          label: 'c eau',
          value: '4185 J/(kg·K)',
        },
      ],
      parts: [
        {
          label: 'Calcule la valeur en eau $\\mu$ du calorimètre (en g).',
          answer: {
            kind: 'number',
            value: 35.842294,
            tolerance: 0.3,
            unit: 'g',
          },
          steps: [
            "Le calorimètre se comporte comme une masse d'eau $\\mu$ telle que $\\mu\\,c_{eau} = C$ : $\\mu = \\dfrac{150}{4185} \\approx 0{,}0358$ kg",
          ],
          result: '\\mu = C/c_{eau} \\approx 35{,}8\\ \\text{g}',
        },
        {
          label: "Calcule la température d'équilibre (en °C).",
          answer: {
            kind: 'number',
            value: 53.591973,
            tolerance: 0.2,
            unit: '°C',
          },
          steps: [
            'Système isolé : la somme des chaleurs échangées est nulle.',
            '$(m_1 c + C)(\\theta_e - 20) + m_2 c(\\theta_e - 80) = 0$',
            '$\\theta_e = \\dfrac{(m_1 c + C)\\times 20 + m_2 c\\times 80}{m_1 c + C + m_2 c} \\approx 53{,}6$ °C',
          ],
          result: '\\theta_e \\approx 53{,}6\\ ^\\circ\\text{C}',
        },
        {
          label: "Quelle quantité de chaleur l'eau chaude a-t-elle cédée (en kJ, valeur positive) ?",
          answer: {
            kind: 'number',
            value: 33.155278,
            tolerance: 0.3,
            unit: 'kJ',
          },
          steps: [
            '$Q = m_2 c(\\theta_e - 80) \\approx -33155$ J (négative : chaleur cédée)',
          ],
          result: '|Q| \\approx 33{,}2\\ \\text{kJ}',
        },
      ],
    },
    {
      id: 'calo-metal',
      level: 3,
      title: "Capacité thermique massique d'un métal",
      statement: "Un calorimètre de capacité $C = 120$ J/K contient 250 g d'eau à 18 °C. On y plonge un bloc métallique de 150 g sorti d'une étuve à 98 °C. La température d'équilibre est $\\theta_e = 22{,}5$ °C.",
      given: [
        {
          label: 'C',
          value: '120 J/K',
        },
        {
          label: 'eau',
          value: '250 g à 18 °C',
        },
        {
          label: 'métal',
          value: '150 g à 98 °C',
        },
        {
          label: 'θe',
          value: '22,5 °C',
        },
      ],
      parts: [
        {
          label: "Calcule la chaleur reçue par l'eau et le calorimètre (en J).",
          answer: {
            kind: 'number',
            value: 5248.125,
            tolerance: 15,
            unit: 'J',
          },
          steps: [
            '$Q_1 = (m_1 c_{eau} + C)(\\theta_e - \\theta_1) = (0{,}25\\times 4185 + 120)(22{,}5 - 18) \\approx 5248$ J',
          ],
          result: 'Q_1 \\approx 5248\\ \\text{J}',
        },
        {
          label: 'En déduire la capacité thermique massique du métal (en J·kg⁻¹·K⁻¹).',
          answer: {
            kind: 'number',
            value: 463.4106,
            tolerance: 10,
            unit: 'J/(kg·K)',
          },
          steps: [
            'Le métal cède $Q_2 = m_2 c(\\theta_e - \\theta_2)$ et $Q_1 + Q_2 = 0$.',
            '$c = \\dfrac{Q_1}{m_2(\\theta_2 - \\theta_e)} = \\dfrac{5248}{0{,}15\\times(98 - 22{,}5)} \\approx 463$ J·kg⁻¹·K⁻¹',
          ],
          result: 'c \\approx 463\\ \\text{J}\\cdot\\text{kg}^{-1}\\text{}\\cdot\\text{K}^{-1}',
        },
        {
          label: "De quel métal s'agit-il probablement ? (aluminium 920, fer 460, cuivre 385)",
          answer: {
            kind: 'text',
            display: 'le fer',
            accepted: [
              'fer',
              'le fer',
              'du fer',
              'fe',
            ],
          },
          steps: [
            'La valeur trouvée (environ 463) est la plus proche de celle du fer.',
          ],
          result: '\\text{fer}',
        },
      ],
    },
    {
      id: 'calo-glace',
      level: 3,
      title: 'Rafraîchir une boisson avec de la glace',
      statement: "On plonge 50 g de glace à −10 °C dans 500 g d'eau à 40 °C. On néglige la capacité du récipient et les pertes. Données : $c_{eau} = 4185$, $c_{glace} = 2100$ J·kg⁻¹·K⁻¹ ; chaleur latente de fusion $L_f = 3{,}34\\times10^5$ J/kg.",
      given: [
        {
          label: 'glace',
          value: '50 g à −10 °C',
        },
        {
          label: 'eau',
          value: '500 g à 40 °C',
        },
        {
          label: 'Lf',
          value: '3,34×10⁵ J/kg',
        },
        {
          label: 'c glace',
          value: '2100 J/(kg·K)',
        },
      ],
      parts: [
        {
          label: 'Quelle chaleur faut-il pour réchauffer la glace à 0 °C puis la fondre entièrement ? (en kJ)',
          answer: {
            kind: 'number',
            value: 17.75,
            tolerance: 0.1,
            unit: 'kJ',
          },
          steps: [
            'Réchauffement : $Q_a = m_g c_g (0 - (-10)) = 0{,}05\\times 2100\\times 10 = 1050$ J',
            'Fusion : $Q_b = m_g L_f = 0{,}05\\times 3{,}34\\times10^5 = 16\\,700$ J',
          ],
          result: 'Q_a + Q_b = 17{,}75\\ \\text{kJ}',
        },
        {
          label: 'Calcule la température finale (en °C).',
          answer: {
            kind: 'number',
            value: 28.652113,
            tolerance: 0.2,
            unit: '°C',
          },
          steps: [
            "L'eau peut céder $0{,}5\\times 4185\\times 40 \\approx 83{,}7$ kJ en descendant à 0 °C : c'est plus que 17,75 kJ, donc toute la glace fond.",
            'Bilan : $m_e c(\\theta - 40) + Q_a + Q_b + m_g c(\\theta - 0) = 0$',
            '$\\theta = \\dfrac{m_e c\\times 40 - (Q_a + Q_b)}{(m_e + m_g)c} \\approx 28{,}7$ °C',
          ],
          result: '\\theta \\approx 28{,}7\\ ^\\circ\\text{C}',
        },
        {
          label: "Quelle masse maximale de glace à 0 °C ces 500 g d'eau à 40 °C pourraient-ils faire fondre ? (en g)",
          answer: {
            kind: 'number',
            value: 250.5988,
            tolerance: 2,
            unit: 'g',
          },
          steps: [
            "À la limite, l'eau finit à 0 °C : $m\\,L_f = m_e c\\times 40$ donc $m = \\dfrac{0{,}5\\times 4185\\times 40}{3{,}34\\times10^5} \\approx 0{,}251$ kg",
          ],
          result: 'm_{max} \\approx 251\\ \\text{g}',
        },
      ],
    },
  ],
  quiz: [],
  applications: [
    {
      title: 'Le thé à la menthe',
      tagline: 'Pourquoi le premier verre est-il moins chaud ?',
      situation: "Pendant le grin, on verse 60 g de thé bouillant (95 °C) dans un petit verre à 30 °C. La capacité thermique du verre vaut 50 J/K. On assimile le thé à de l'eau et on néglige les pertes.",
      model: "Le thé cède de la chaleur au verre jusqu'à ce que les deux soient à la même température : $\\sum Q = 0$.",
      questions: [
        "Calcule la température du thé une fois l'équilibre atteint avec le verre.",
      ],
      check: {
        value: 84.206244,
        tolerance: 0.01,
        unit: '°C',
      },
      solution: [
        '$m\\,c_{eau}(\\theta_e - 95) + C_{verre}(\\theta_e - 30) = 0$',
        '$\\theta_e = \\dfrac{0{,}06\\times 4185\\times 95 + 50\\times 30}{0{,}06\\times 4185 + 50} \\approx 84,2$ °C',
      ],
      fact: "Verser le thé de haut le refroidit aussi (évaporation, contact avec l'air) et fait de la mousse. Le deuxième verre, servi dans un verre déjà chaud, refroidit moins.",
    },
    {
      title: 'Des glaçons dans le bissap',
      tagline: 'Quelle température après la fonte des glaçons ?',
      situation: "On ajoute 40 g de glaçons sortis du congélateur (−5 °C) dans 300 g de jus de bissap à 30 °C. On assimile le jus à de l'eau et on néglige les échanges avec le verre et l'air.",
      model: "La glace reçoit de la chaleur pour se réchauffer jusqu'à 0 °C, fondre ($L_f = 3{,}34\\times10^5$ J/kg), puis l'eau de fonte se réchauffe. Le jus, lui, se refroidit.",
      questions: [
        'Calcule la température finale du bissap (c glace = 2100 J/(kg·K)).',
      ],
      check: {
        value: 16.786141,
        tolerance: 0.02,
        unit: '°C',
      },
      solution: [
        'Chaleur pour la glace : $Q_1 = 0{,}04\\times 2100\\times 5 + 0{,}04\\times 3{,}34\\times10^5 = 13\\,780$ J',
        'Bilan : $0{,}3\\,c_{eau}(\\theta - 30) + Q_1 + 0{,}04\\,c_{eau}(\\theta - 0) = 0$',
        '$\\theta \\approx 16,8$ °C (toute la glace a fondu)',
      ],
      fact: "La fusion absorbe beaucoup d'énergie : faire fondre 1 g de glace demande autant de chaleur que chauffer 1 g d'eau de 0 à 80 °C. C'est pour cela que les glaçons rafraîchissent si bien.",
    },
  ],
};
