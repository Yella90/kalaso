// Importé du site cecp (physique-3d, chapitre « interferences-mecaniques ») par scripts/import-cecp.ts.
// Une nouvelle importation remplace ce fichier.
import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook: 'Deux ondes qui se superposent : renforcement ou extinction.',
  objectives: [],
  sections: [
    {
      title: "Conditions d'obtention",
      blocks: [
        {
          kind: 'callout',
          variant: 'methode',
          title: 'Compter les franges',
          blocks: [
            {
              kind: 'text',
              text: 'Encadrer $\\delta$ entre $-d$ et $+d$ (strictement, les sources étant exclues), puis compter les entiers $k$ qui conviennent pour $\\delta = k\\lambda$ (maxima) ou $\\delta = (k + 1/2)\\lambda$ (minima).',
            },
          ],
        },
        {
          kind: 'callout',
          variant: 'retenir',
          blocks: [
            {
              kind: 'text',
              text: "Les interférences sont une preuve du caractère **ondulatoire** d'un phénomène. On retrouve les mêmes lois pour la lumière (fentes de Young), avec $\\delta = \\dfrac{a\\,x}{D}$.",
            },
          ],
        },
        {
          kind: 'text',
          text: "Deux pointes S₁ et S₂, fixées au même vibreur, frappent la surface de l'eau. Ce sont deux sources **synchrones** (même fréquence) et **cohérentes** (déphasage constant, ici nul). Dans la zone où les deux ondes se superposent, on observe des lignes immobiles et des lignes de forte agitation : ce sont les franges d'interférences.",
        },
      ],
    },
    {
      title: 'Superposition en un point M',
      blocks: [
        {
          kind: 'text',
          text: "En un point M situé à $d_1 = S_1M$ et $d_2 = S_2M$, les élongations s'additionnent (principe de superposition) :",
        },
        {
          kind: 'formula',
          tex: 'y_M = a\\sin\\left(\\omega t - \\frac{2\\pi d_1}{\\lambda}\\right) + a\\sin\\left(\\omega t - \\frac{2\\pi d_2}{\\lambda}\\right)',
        },
        {
          kind: 'formula',
          tex: 'A = 2a\\left|\\cos\\frac{\\pi\\,\\delta}{\\lambda}\\right| \\qquad \\delta = d_2 - d_1',
          label: 'Amplitude résultante',
          legend: [
            '$\\delta$ : différence de marche (m)',
          ],
        },
      ],
    },
    {
      title: "Franges d'amplitude maximale et nulle",
      blocks: [
        {
          kind: 'list',
          items: [
            '**Amplitude maximale** ($A = 2a$) si $\\delta = k\\lambda$ : les ondes arrivent en phase (interférences constructives).',
            '**Amplitude nulle** (point immobile) si $\\delta = \\left(k + \\tfrac12\\right)\\lambda$ : les ondes arrivent en opposition de phase (interférences destructives).',
            'Les points tels que $d_2 - d_1 = $ constante forment des **hyperboles** de foyers S₁ et S₂. La médiatrice de $[S_1S_2]$ ($\\delta = 0$) est une frange de maximum.',
          ],
        },
      ],
    },
    {
      title: 'Sur le segment S₁S₂',
      blocks: [
        {
          kind: 'text',
          text: "Pour un point du segment à la distance $x$ de S₁ : $\\delta = d - 2x$ ($d = S_1S_2$). Deux points voisins d'amplitude maximale sont distants de $\\lambda/2$.",
        },
        {
          kind: 'formula',
          tex: '-\\frac{d}{\\lambda} < k < \\frac{d}{\\lambda} \\qquad \\text{(nombre de franges brillantes coupant } [S_1S_2])',
        },
      ],
    },
  ],
  essentials: [],
  exercises: [
    {
      id: 'interf-meca-point',
      level: 1,
      title: "Nature d'un point du champ d'interférences",
      statement: "Deux pointes S₁ et S₂, reliées au même vibreur, frappent la surface de l'eau en phase à la fréquence $N = 20$ Hz. Chaque source produit seule une onde d'amplitude $a = 2$ mm ; la célérité vaut $v = 0{,}30$ m/s. Un point M est tel que $S_1M = 6$ cm et $S_2M = 9$ cm.",
      given: [
        {
          label: 'N',
          value: '20 Hz',
        },
        {
          label: 'v',
          value: '0,30 m/s',
        },
        {
          label: 'a',
          value: '2 mm',
        },
        {
          label: 'S₁M ; S₂M',
          value: '6 cm ; 9 cm',
        },
      ],
      parts: [
        {
          label: "Calcule la longueur d'onde (en cm).",
          answer: {
            kind: 'number',
            value: 1.5,
            tolerance: 0.02,
            unit: 'cm',
          },
          steps: [
            '$\\lambda = \\dfrac{v}{N} = \\dfrac{0{,}30}{20} = 0{,}015$ m',
          ],
          result: '\\lambda = 1{,}5\\ \\text{cm}',
        },
        {
          label: 'Calcule le rapport $\\delta/\\lambda$, où $\\delta = S_2M - S_1M$ est la différence de marche.',
          answer: {
            kind: 'number',
            value: 2,
            tolerance: 0.02,
            unit: '',
          },
          steps: [
            '$\\delta = 9 - 6 = 3$ cm ; $\\dfrac{\\delta}{\\lambda} = \\dfrac{3}{1{,}5} = 2$',
          ],
          result: '\\delta/\\lambda = 2',
        },
        {
          label: 'Le point M vibre-t-il avec une amplitude maximale ou nulle ?',
          answer: {
            kind: 'text',
            display: 'maximale',
            accepted: [
              'maximale',
              'maximum',
              'amplitude maximale',
              'max',
              'il vibre avec une amplitude maximale',
            ],
          },
          steps: [
            "$\\delta = k\\lambda$ avec $k$ entier : les deux ondes arrivent en phase en M, leurs effets s'ajoutent.",
          ],
          result: '\\delta = k\\lambda \\Rightarrow \\text{amplitude maximale}',
        },
        {
          label: "Quelle est l'amplitude du mouvement de M (en mm) ?",
          answer: {
            kind: 'number',
            value: 4,
            tolerance: 0.05,
            unit: 'mm',
          },
          steps: [
            '$A = 2a\\left|\\cos\\dfrac{\\pi\\delta}{\\lambda}\\right|$',
            '$A = 2\\times 2\\times|\\cos(2\\pi)| = 4$ mm',
          ],
          result: 'A = 2a = 4\\ \\text{mm}',
        },
      ],
    },
    {
      id: 'interf-meca-franges',
      level: 2,
      title: "Points immobiles et lignes d'interférences",
      statement: "Mêmes sources qu'à l'exercice 1 ($\\lambda = 1{,}5$ cm, $a = 2$ mm), distantes de $S_1S_2 = 5$ cm. Un point P de la surface est tel que $S_1P = 7$ cm et $S_2P = 9{,}25$ cm.",
      given: [
        {
          label: 'λ',
          value: '1,5 cm',
        },
        {
          label: 'S₁S₂',
          value: '5 cm',
        },
        {
          label: 'S₁P ; S₂P',
          value: '7 cm ; 9,25 cm',
        },
      ],
      parts: [
        {
          label: "Calcule l'amplitude du point P (en mm).",
          answer: {
            kind: 'number',
            value: 7.8402154e-15,
            tolerance: 0.05,
            unit: 'mm',
          },
          steps: [
            "$\\delta = 9{,}25 - 7 = 2{,}25$ cm $= 1{,}5\\,\\lambda$ : c'est un multiple impair de $\\dfrac{\\lambda}{2}$.",
            'Les deux ondes arrivent en opposition de phase : $A = 2a\\,|\\cos(1{,}5\\pi)| = 0$. Le point P est immobile.',
          ],
          result: 'A = 0\\ \\text{(point immobile)}',
        },
        {
          label: "Combien de lignes d'amplitude maximale coupent le segment $[S_1S_2]$ ?",
          answer: {
            kind: 'number',
            value: 7,
            tolerance: 0.1,
            unit: '',
          },
          steps: [
            'Sur $[S_1S_2]$, un point à la distance $x$ de S₁ a $\\delta = (d - x) - x = d - 2x$, avec $-d < \\delta < d$.',
            'Maxima : $\\delta = k\\lambda$ donc $-\\dfrac{d}{\\lambda} < k < \\dfrac{d}{\\lambda}$, soit $-3{,}33 < k < 3{,}33$.',
            "$k \\in \\{-3, \\dots, 3\\}$ : 7 lignes (la médiatrice est l'une d'elles).",
          ],
          result: '7\\ \\text{lignes de maxima}',
        },
        {
          label: "Combien de lignes d'amplitude nulle coupent $[S_1S_2]$ ?",
          answer: {
            kind: 'number',
            value: 6,
            tolerance: 0.1,
            unit: '',
          },
          steps: [
            'Minima : $\\delta = \\left(k + \\tfrac12\\right)\\lambda$ donc $-3{,}33 < k + 0{,}5 < 3{,}33$, soit $-3{,}83 < k < 2{,}83$.',
            '$k \\in \\{-3, \\dots, 2\\}$ : 6 lignes.',
          ],
          result: '6\\ \\text{lignes de minima}',
        },
      ],
    },
    {
      id: 'interf-meca-mesure',
      level: 3,
      title: 'Mesure de la célérité par interférences',
      statement: "Deux sources synchrones en phase vibrent à $N = 30$ Hz et sont distantes de $d = 6$ cm. Sur le segment $S_1S_2$, on mesure 4 mm entre deux points voisins d'amplitude maximale.",
      given: [
        {
          label: 'N',
          value: '30 Hz',
        },
        {
          label: 'd',
          value: '6 cm',
        },
        {
          label: 'deux maxima voisins',
          value: '4 mm',
        },
      ],
      parts: [
        {
          label: "Calcule la longueur d'onde (en mm).",
          answer: {
            kind: 'number',
            value: 8,
            tolerance: 0.05,
            unit: 'mm',
          },
          steps: [
            'Entre deux maxima voisins sur $S_1S_2$, $\\delta = d - 2x$ varie de $\\lambda$ quand $x$ varie de $\\dfrac{\\lambda}{2}$.',
            'Donc $\\dfrac{\\lambda}{2} = 4$ mm, soit $\\lambda = 8$ mm',
          ],
          result: '\\lambda = 2\\times 4 = 8\\ \\text{mm}',
        },
        {
          label: 'En déduire la célérité (en m/s).',
          answer: {
            kind: 'number',
            value: 0.24,
            tolerance: 0.003,
            unit: 'm/s',
          },
          steps: [
            '$v = \\lambda N = 8\\times10^{-3}\\times 30 = 0{,}24$ m/s',
          ],
          result: 'v = \\lambda N = 0{,}24\\ \\text{m/s}',
        },
        {
          label: 'Combien de lignes de maxima coupent le segment $[S_1S_2]$ ?',
          answer: {
            kind: 'number',
            value: 15,
            tolerance: 0.1,
            unit: '',
          },
          steps: [
            '$-\\dfrac{d}{\\lambda} < k < \\dfrac{d}{\\lambda}$ avec $\\dfrac{d}{\\lambda} = \\dfrac{60}{8} = 7{,}5$',
            '$k \\in \\{-7, \\dots, 7\\}$ : 15 lignes',
          ],
          result: '15\\ \\text{lignes}',
        },
      ],
    },
  ],
  quiz: [],
  applications: [
    {
      title: 'Le silence entre deux haut-parleurs',
      tagline: 'Pourquoi le son disparaît-il à certains endroits ?',
      situation: "Deux haut-parleurs, branchés sur le même amplificateur, émettent en phase un son pur de 680 Hz (célérité 340 m/s). Un élève est à 3 m de l'un et à 3,75 m de l'autre.",
      model: "Les deux ondes sonores interfèrent comme les ondes à la surface de l'eau : l'amplitude est nulle si la différence de marche $\\delta = d_2 - d_1$ vaut un nombre impair de demi-longueurs d'onde.",
      questions: [
        "Calcule le rapport δ / λ au point où se trouve l'élève.",
      ],
      check: {
        value: 1.5,
        tolerance: 0.02,
        unit: '',
      },
      solution: [
        '$\\lambda = \\dfrac{v}{N} = \\dfrac{340}{680} = 0,5$ m ; $\\delta = 3{,}75 - 3 = 0,75$ m',
        "$\\dfrac{\\delta}{\\lambda} = 1,5$ : demi-entier, les ondes arrivent en opposition de phase. L'élève est dans une zone de silence.",
      ],
      fact: "Les casques à réduction de bruit utilisent ce principe : ils produisent un son en opposition de phase avec le bruit extérieur, qui s'annule dans l'oreille.",
    },
  ],
};
