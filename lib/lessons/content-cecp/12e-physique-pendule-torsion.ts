// Importé du site cecp (physique-3d, chapitre « pendule-torsion ») par scripts/import-cecp.ts.
// Une nouvelle importation remplace ce fichier.
import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook: "Un solide qui tourne autour d'un fil et oscille sous l'effet d'un couple de rappel.",
  objectives: [],
  sections: [
    {
      title: 'Le dispositif',
      blocks: [
        {
          kind: 'callout',
          variant: 'retenir',
          blocks: [
            {
              kind: 'list',
              items: [
                '$\\mathcal{M} = -C\\theta$',
                '$J\\ddot\\theta + C\\theta = 0$',
                '$T_0 = 2\\pi\\sqrt{J/C}$',
                '$E = \\tfrac12 C\\theta_m^2$',
              ],
            },
          ],
        },
        {
          kind: 'text',
          text: "Un solide (tige, disque) est suspendu à un fil d'acier vertical fixé en son centre d'inertie. Quand on fait tourner le solide d'un angle $\\theta$, le fil se tord et exerce un **couple de rappel** proportionnel à l'angle de torsion.",
        },
        {
          kind: 'formula',
          tex: '\\mathcal{M} = -C\\,\\theta',
          label: 'Couple de torsion',
          legend: [
            '$C$ : constante de torsion du fil (N·m/rad)',
            '$\\theta$ en radians',
          ],
        },
        {
          kind: 'text',
          text: "La constante $C$ dépend du fil : elle est d'autant plus grande que le fil est court et épais.",
        },
      ],
    },
    {
      title: 'Équation différentielle',
      blocks: [
        {
          kind: 'text',
          text: "On applique la relation fondamentale de la dynamique de rotation au solide, de moment d'inertie $J$ par rapport à l'axe du fil. Le poids et la tension du fil ont un moment nul par rapport à cet axe.",
        },
        {
          kind: 'formula',
          tex: 'J\\ddot\\theta = -C\\theta \\ \\Longrightarrow\\ \\ddot\\theta + \\frac{C}{J}\\theta = 0',
        },
        {
          kind: 'text',
          text: "C'est l'équation d'un **oscillateur harmonique** de pulsation propre $\\omega_0 = \\sqrt{C/J}$. Sa solution est $\\theta(t) = \\theta_m \\cos(\\omega_0 t + \\varphi)$.",
        },
        {
          kind: 'formula',
          tex: 'T_0 = 2\\pi\\sqrt{\\frac{J}{C}}',
          label: 'Période propre',
        },
      ],
    },
    {
      title: "Moments d'inertie usuels",
      blocks: [
        {
          kind: 'table',
          head: [
            'Solide',
            'Axe',
            "Moment d'inertie",
          ],
          rows: [
            [
              'tige de masse $M$, longueur $L$',
              'médiatrice',
              '$J = \\dfrac{ML^2}{12}$',
            ],
            [
              'disque plein de rayon $R$',
              'axe de révolution',
              '$J = \\dfrac{MR^2}{2}$',
            ],
            [
              'cerceau de rayon $R$',
              'axe de révolution',
              '$J = MR^2$',
            ],
            [
              'masse ponctuelle $m$ à la distance $d$',
              '—',
              '$J = md^2$',
            ],
          ],
        },
        {
          kind: 'callout',
          variant: 'methode',
          blocks: [
            {
              kind: 'text',
              text: 'Pour mesurer $C$ : on mesure $T_0$ avec un équipage de $J$ connu, puis $C = \\dfrac{4\\pi^2 J}{T_0^2}$. Pour mesurer un $J$ inconnu, on compare deux périodes : $\\dfrac{T}{T_0} = \\sqrt{\\dfrac{J}{J_0}}$.',
            },
          ],
        },
      ],
    },
    {
      title: 'Énergie',
      blocks: [
        {
          kind: 'formula',
          tex: 'E = \\tfrac12 J\\dot\\theta^2 + \\tfrac12 C\\theta^2 = \\tfrac12 C\\theta_m^2 = \\text{constante}',
          legend: [
            'Énergie cinétique de rotation $\\tfrac12 J\\dot\\theta^2$',
            'Énergie potentielle de torsion $\\tfrac12 C\\theta^2$',
          ],
        },
        {
          kind: 'text',
          text: "Sans frottement, l'énergie s'échange en permanence entre forme cinétique (maximale au passage par $\\theta = 0$) et forme potentielle (maximale aux élongations extrêmes).",
        },
      ],
    },
  ],
  essentials: [],
  exercises: [
    {
      id: 'tor-tige',
      level: 1,
      title: 'Une tige suspendue à un fil',
      statement: "Une tige homogène de masse $M = 120$ g et de longueur $L = 30$ cm est suspendue en son milieu à un fil de torsion de constante $C = 2{,}5\\cdot10^{-3}$ N·m/rad. Son moment d'inertie par rapport au fil vaut $J = \\dfrac{ML^2}{12}$.",
      given: [
        {
          label: 'M',
          value: '120 g',
        },
        {
          label: 'L',
          value: '30 cm',
        },
        {
          label: 'C',
          value: '2,5·10⁻³ N·m/rad',
        },
      ],
      parts: [
        {
          label: "Calcule le moment d'inertie $J$ (en $10^{-4}$ kg·m²).",
          answer: {
            kind: 'number',
            value: 9,
            tolerance: 0.01,
            unit: '×10⁻⁴ kg·m²',
          },
          steps: [
            '$J = \\dfrac{0{,}12 \\times 0{,}3^2}{12} = 9{,}00\\cdot10^{-4}$ kg·m²',
          ],
          result: 'J = \\frac{ML^2}{12} = 9{,}00\\cdot10^{-4}\\ \\text{kg}\\cdot\\text{m}^2',
        },
        {
          label: 'Calcule la période propre $T_0$ des oscillations.',
          answer: {
            kind: 'number',
            value: 3.7699112,
            tolerance: 0.01,
            unit: 's',
          },
          steps: [
            "Théorème de l'accélération angulaire : $J\\ddot\\theta = -C\\theta$, soit $\\ddot\\theta + \\dfrac{C}{J}\\theta = 0$",
            '$T_0 = 2\\pi\\sqrt{\\dfrac{J}{C}} = 2\\pi\\sqrt{\\dfrac{9{,}00\\cdot10^{-4}}{2{,}5\\cdot10^{-3}}} \\approx 3{,}77$ s',
          ],
          result: 'T_0 = 2\\pi\\sqrt{\\frac{J}{C}} \\approx 3{,}77\\ \\text{s}',
        },
      ],
    },
    {
      id: 'tor-masses',
      level: 2,
      title: 'Mesurer une constante de torsion',
      source: 'Type bac',
      statement: "Un équipage de moment d'inertie $J_0 = 1{,}5\\cdot10^{-4}$ kg·m² oscille au bout d'un fil avec la période $T_0 = 1{,}2$ s. On fixe ensuite sur la tige deux petites masses $m = 50$ g, symétriquement, à $d = 10$ cm de l'axe.",
      given: [
        {
          label: 'J0',
          value: '1,5·10⁻⁴ kg·m²',
        },
        {
          label: 'T0',
          value: '1,2 s',
        },
        {
          label: 'm',
          value: '50 g',
        },
        {
          label: 'd',
          value: '10 cm',
        },
      ],
      parts: [
        {
          label: 'Calcule la constante de torsion $C$ du fil (en $10^{-3}$ N·m/rad).',
          answer: {
            kind: 'number',
            value: 4.1123352,
            tolerance: 0.01,
            unit: '×10⁻³ N·m/rad',
          },
          steps: [
            '$T_0 = 2\\pi\\sqrt{J_0/C} \\Rightarrow C = \\dfrac{4\\pi^2 J_0}{T_0^2} = \\dfrac{4\\pi^2 \\times 1{,}5\\cdot10^{-4}}{1{,}2^2} \\approx 4{,}112\\cdot10^{-3}$ N·m/rad',
          ],
          result: 'C = \\frac{4\\pi^2 J_0}{T_0^2} \\approx 4{,}112\\cdot10^{-3}\\ \\text{N}\\cdot\\text{m/rad}',
        },
        {
          label: 'Calcule la nouvelle période $T$ avec les deux masses.',
          answer: {
            kind: 'number',
            value: 3.3226495,
            tolerance: 0.01,
            unit: 's',
          },
          steps: [
            '$J = J_0 + 2md^2 = 1{,}5\\cdot10^{-4} + 2 \\times 0{,}05 \\times 0{,}1^2 = 1{,}15\\cdot10^{-3}$ kg·m²',
            '$T = 2\\pi\\sqrt{J/C} \\approx 3{,}32$ s',
            "Plus la masse est loin de l'axe, plus l'inertie est grande et plus les oscillations sont lentes.",
          ],
          result: 'T = T_0\\sqrt{\\frac{J}{J_0}} \\approx 3{,}32\\ \\text{s}',
        },
      ],
    },
    {
      id: 'tor-energie',
      level: 2,
      title: 'Énergie du pendule de torsion',
      statement: "On écarte la tige de l'exercice 1 ($C = 2{,}5\\cdot10^{-3}$ N·m/rad) d'un angle $\\theta_m = 0{,}4$ rad puis on la lâche sans vitesse. On néglige les frottements.",
      given: [
        {
          label: 'C',
          value: '2,5·10⁻³ N·m/rad',
        },
        {
          label: 'θm',
          value: '0,4 rad',
        },
      ],
      parts: [
        {
          label: "Calcule l'énergie mécanique de l'oscillateur (en $10^{-4}$ J).",
          answer: {
            kind: 'number',
            value: 2,
            tolerance: 0.01,
            unit: '×10⁻⁴ J',
          },
          steps: [
            "Au lâcher, la vitesse est nulle : toute l'énergie est potentielle de torsion",
            '$E = \\tfrac12 C\\theta_m^2 = \\tfrac12 \\times 2{,}5\\cdot10^{-3} \\times 0{,}4^2 = 2{,}0\\cdot10^{-4}$ J',
          ],
          result: 'E = \\tfrac12 C\\theta_m^2 = 2{,}0\\cdot10^{-4}\\ \\text{J}',
        },
        {
          label: 'Calcule la vitesse angulaire maximale $\\dot\\theta_{max}$ (en rad/s).',
          answer: {
            kind: 'number',
            value: 0.66666667,
            tolerance: 0.02,
            unit: 'rad/s',
          },
          steps: [
            "Au passage par l'équilibre, l'énergie est entièrement cinétique : $\\tfrac12 J\\dot\\theta_{max}^2 = E$",
            '$\\dot\\theta_{max} = \\sqrt{\\dfrac{2E}{J}} = \\theta_m\\sqrt{\\dfrac{C}{J}} \\approx 0{,}67$ rad/s',
          ],
          result: '\\dot\\theta_{max} = \\theta_m\\,\\omega_0 \\approx 0{,}67\\ \\text{rad/s}',
        },
      ],
    },
  ],
  quiz: [],
  applications: [
    {
      title: "L'horloge « 400 jours »",
      tagline: "Une horloge qu'on ne remonte qu'une fois par an.",
      situation: "Sous le globe de verre de cette horloge, un disque tourne lentement dans un sens puis dans l'autre, suspendu à un fil de torsion très fin. Le disque a un moment d'inertie $J = 2\\times10^{-4}$ kg·m² et oscille avec une période de 15 s.",
      model: "Le disque et son fil forment un pendule de torsion de période $T_0 = 2\\pi\\sqrt{J/C}$. Comme la période est longue, le mécanisme consomme très peu d'énergie.",
      questions: [
        'Calcule la constante de torsion C du fil (en 10⁻⁵ N·m/rad).',
      ],
      check: {
        value: 3.5091927,
        tolerance: 0.02,
        unit: '×10⁻⁵ N·m/rad',
      },
      solution: [
        '$T_0 = 2\\pi\\sqrt{\\dfrac{J}{C}} \\Rightarrow C = \\dfrac{4\\pi^2 J}{T_0^2}$',
        'A.N. : $C = \\dfrac{4\\pi^2 \\times 2\\times10^{-4}}{15^2} \\approx 3,51\\times10^{-5}$ N·m/rad : un fil extrêmement souple.',
      ],
      fact: "Avec seulement 4 oscillations par minute, un seul remontage du ressort suffit pour faire marcher l'horloge plus d'un an.",
    },
    {
      title: 'Peser la Terre avec un fil',
      tagline: 'La balance de torsion de Cavendish (1798).',
      situation: "Pour mesurer la constante de gravitation $G$, Cavendish suspendit à un fil une tige portant deux boules de plomb de 0,73 kg chacune, à 0,93 m de l'axe. Les oscillations libres duraient environ 7 minutes.",
      model: 'En mesurant la période, on connaît la constante de torsion $C$ ; on mesure ensuite le petit angle dont tourne la tige quand on approche deux grosses boules : on en déduit la force de gravitation entre les boules.',
      questions: [
        'Calcule la constante de torsion du fil (en 10⁻⁴ N·m/rad). On néglige la masse de la tige.',
      ],
      check: {
        value: 2.8260504,
        tolerance: 0.02,
        unit: '×10⁻⁴ N·m/rad',
      },
      solution: [
        '$J = 2md^2 = 2\\times0{,}73\\times0{,}93^2 \\approx 1,263$ kg·m²',
        '$C = \\dfrac{4\\pi^2 J}{T_0^2}$ avec $T_0 = 420$ s : $C \\approx 2,83\\times10^{-4}$ N·m/rad',
      ],
      fact: 'On dit que Cavendish a « pesé la Terre » : connaissant $G$, on peut calculer la masse de la Terre à partir de $g = GM_T/R_T^2$.',
    },
  ],
};
