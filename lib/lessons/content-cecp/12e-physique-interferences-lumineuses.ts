// Importé du site cecp (physique-3d, chapitre « interferences-lumineuses ») par scripts/import-cecp.ts.
// Une nouvelle importation remplace ce fichier.
import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook: "L'expérience des fentes de Young (1801) : la preuve que la lumière est une onde.",
  objectives: [],
  sections: [
    {
      title: 'Le dispositif de Young',
      blocks: [
        {
          kind: 'callout',
          variant: 'retenir',
          blocks: [
            {
              kind: 'list',
              items: [
                '$\\delta = ax/D$ ; brillante si $\\delta = k\\lambda$, sombre si $\\delta = (k+\\tfrac12)\\lambda$',
                '$i = \\lambda D / a$',
                'Les interférences prouvent la nature ondulatoire de la lumière',
              ],
            },
          ],
        },
        {
          kind: 'text',
          text: "Une source monochromatique (laser) éclaire deux fentes fines $F_1$ et $F_2$, parallèles, distantes de $a$. Elles se comportent comme deux sources **cohérentes** (même fréquence, déphasage constant) car elles sont éclairées par la même onde. Sur un écran placé à la distance $D \\gg a$, on observe une alternance de franges brillantes et sombres, parallèles aux fentes : ce sont des **franges d'interférence**.",
        },
        {
          kind: 'callout',
          variant: 'attention',
          blocks: [
            {
              kind: 'text',
              text: "Deux lampes ordinaires ne donnent jamais d'interférences : elles ne sont pas cohérentes. Il faut que les deux ondes proviennent de la même source.",
            },
          ],
        },
      ],
    },
    {
      title: "Différence de marche et ordre d'interférence",
      blocks: [
        {
          kind: 'text',
          text: "En un point M de l'écran, d'abscisse $x$ comptée à partir du centre O, les deux ondes ont parcouru des chemins différents. Pour $D \\gg a$ et $D \\gg x$ :",
        },
        {
          kind: 'formula',
          tex: '\\delta = F_2M - F_1M = \\frac{a\\,x}{D} \\qquad p = \\frac{\\delta}{\\lambda}',
          legend: [
            '$\\delta$ : différence de marche (m)',
            "$p$ : ordre d'interférence (sans unité)",
          ],
        },
        {
          kind: 'list',
          items: [
            '**Frange brillante** (interférence constructive, ondes en phase) : $\\delta = k\\lambda$, $p$ entier.',
            '**Frange sombre** (interférence destructive, opposition de phase) : $\\delta = (k + \\tfrac12)\\lambda$, $p$ demi-entier.',
          ],
        },
      ],
    },
    {
      title: "L'interfrange",
      blocks: [
        {
          kind: 'text',
          text: "Les franges brillantes sont en $x_k = k\\dfrac{\\lambda D}{a}$ : elles sont équidistantes. La distance entre deux franges brillantes (ou sombres) consécutives est l'interfrange :",
        },
        {
          kind: 'formula',
          tex: 'i = \\frac{\\lambda\\,D}{a}',
          label: 'Interfrange',
          legend: [
            "$\\lambda$ : longueur d'onde (m)",
            '$D$ : distance fentes-écran (m)',
            '$a$ : distance entre les fentes (m)',
            'La frange centrale ($x = 0$) est brillante',
          ],
        },
        {
          kind: 'callout',
          variant: 'methode',
          title: 'Mesurer λ au laboratoire',
          blocks: [
            {
              kind: 'text',
              text: "On mesure la distance $L$ couvrant $n$ interfranges ($n + 1$ franges brillantes), puis $i = L/n$ et $\\lambda = \\dfrac{a\\,i}{D}$. Mesurer plusieurs interfranges réduit l'erreur relative.",
            },
          ],
        },
      ],
    },
    {
      title: 'En lumière blanche',
      blocks: [
        {
          kind: 'text',
          text: "Chaque radiation donne son propre système de franges, d'interfrange proportionnel à $\\lambda$. Au centre ($\\delta = 0$), toutes les radiations sont en phase : la frange centrale est **blanche**, bordée de franges irisées, puis les couleurs se mélangent en un « blanc d'ordre supérieur ». Un spectroscope placé en un point montre un **spectre cannelé** : les radiations éteintes vérifient $\\lambda = \\dfrac{\\delta}{k + 1/2}$.",
        },
      ],
    },
  ],
  essentials: [],
  exercises: [
    {
      id: 'int-laser',
      level: 1,
      title: 'Les franges du laser hélium-néon',
      statement: 'Un laser hélium-néon ($\\lambda = 632{,}8$ nm) éclaire deux fentes fines parallèles distantes de $a = 0{,}5$ mm. On observe les franges sur un écran placé à $D = 1{,}5$ m des fentes.',
      given: [
        {
          label: 'λ',
          value: '632,8 nm',
        },
        {
          label: 'a',
          value: '0,5 mm',
        },
        {
          label: 'D',
          value: '1,5 m',
        },
      ],
      diagram: {
        width: 16,
        height: 8,
        elements: [
          {
            type: 'line',
            x1: 4,
            y1: 0.4,
            x2: 4,
            y2: 3.4,
            color: '#64748b',
            width: 4,
          },
          {
            type: 'line',
            x1: 4,
            y1: 3.8,
            x2: 4,
            y2: 4.2,
            color: '#64748b',
            width: 4,
          },
          {
            type: 'line',
            x1: 4,
            y1: 4.6,
            x2: 4,
            y2: 7.6,
            color: '#64748b',
            width: 4,
          },
          {
            type: 'point',
            x: 4,
            y: 3.6,
            label: 'F₁',
            color: '#f87171',
            labelPos: 'left',
          },
          {
            type: 'point',
            x: 4,
            y: 4.4,
            label: 'F₂',
            color: '#f87171',
            labelPos: 'left',
          },
          {
            type: 'line',
            x1: 14,
            y1: 0.4,
            x2: 14,
            y2: 7.6,
            color: '#e2e8f0',
            width: 3,
          },
          {
            type: 'text',
            x: 14.6,
            y: 7.2,
            text: 'écran',
            color: '#cbd5e1',
            size: 12,
          },
          {
            type: 'line',
            x1: 4,
            y1: 4,
            x2: 14,
            y2: 4,
            color: '#475569',
            dashed: true,
          },
          {
            type: 'point',
            x: 14,
            y: 4,
            label: 'O',
            color: '#e2e8f0',
            labelPos: 'right',
          },
          {
            type: 'point',
            x: 14,
            y: 6,
            label: 'M (x)',
            color: '#fbbf24',
            labelPos: 'right',
          },
          {
            type: 'line',
            x1: 4,
            y1: 3.6,
            x2: 14,
            y2: 6,
            color: '#f87171',
          },
          {
            type: 'line',
            x1: 4,
            y1: 4.4,
            x2: 14,
            y2: 6,
            color: '#f87171',
          },
          {
            type: 'arrow',
            x1: 4,
            y1: 1.2,
            x2: 14,
            y2: 1.2,
            color: '#94a3b8',
            label: 'D',
          },
          {
            type: 'text',
            x: 3,
            y: 4.1,
            text: 'a',
            color: '#94a3b8',
            size: 13,
          },
          {
            type: 'line',
            x1: 0.5,
            y1: 4,
            x2: 3.6,
            y2: 4,
            color: '#ef4444',
            width: 3,
          },
          {
            type: 'text',
            x: 1.6,
            y: 4.5,
            text: 'laser',
            color: '#fca5a5',
            size: 12,
          },
        ],
      },
      parts: [
        {
          label: "Calcule l'interfrange $i$ (en mm).",
          answer: {
            kind: 'number',
            value: 1.8984,
            tolerance: 0.02,
            unit: 'mm',
          },
          steps: [
            '$i = \\dfrac{\\lambda D}{a}$ (toutes les longueurs en mètres)',
            '$i = \\dfrac{632{,}8 \\cdot 10^{-9} \\times 1{,}5}{0{,}5 \\cdot 10^{-3}} \\approx 1{,}898 \\cdot 10^{-3}$ m',
          ],
          result: 'i = \\frac{\\lambda D}{a} \\approx 1{,}90\\ \\text{mm}',
        },
        {
          label: 'À quelle distance du centre O se trouve la 5e frange brillante (en mm) ?',
          answer: {
            kind: 'number',
            value: 9.492,
            tolerance: 0.05,
            unit: 'mm',
          },
          steps: [
            "La frange centrale (ordre 0) est brillante ; la frange brillante d'ordre $k$ est en $x_k = k\\,i$.",
            '$x_5 = 5i \\approx 9{,}49$ mm',
          ],
          result: 'x_5 = 5i \\approx 9{,}49\\ \\text{mm}',
        },
      ],
    },
    {
      id: 'int-mesure-lambda',
      level: 2,
      title: "Mesurer une longueur d'onde",
      statement: 'Avec des fentes distantes de $a = 1$ mm et un écran à $D = 2$ m, un élève mesure 12 mm entre les milieux de 11 franges brillantes consécutives.',
      given: [
        {
          label: 'a',
          value: '1 mm',
        },
        {
          label: 'D',
          value: '2 m',
        },
        {
          label: '11 franges',
          value: '12 mm',
        },
      ],
      parts: [
        {
          label: "Calcule l'interfrange (en mm).",
          answer: {
            kind: 'number',
            value: 1.2,
            tolerance: 0.01,
            unit: 'mm',
          },
          steps: [
            'Attention : 11 franges brillantes délimitent **10** interfranges.',
            "$i = \\dfrac{12}{10} = 1{,}2$ mm. Mesurer plusieurs interfranges réduit l'erreur relative.",
          ],
          result: 'i = 1{,}2\\ \\text{mm}',
        },
        {
          label: "En déduire la longueur d'onde (en nm). De quelle couleur est la lumière ?",
          answer: {
            kind: 'number',
            value: 600,
            tolerance: 5,
            unit: 'nm',
          },
          steps: [
            '$\\lambda = \\dfrac{a\\,i}{D}$',
            '$\\lambda = \\dfrac{10^{-3} \\times 1{,}2 \\cdot 10^{-3}}{2} = 600 \\cdot 10^{-9}$ m',
            '600 nm : lumière orangée.',
          ],
          result: '\\lambda = \\frac{ai}{D} = 600\\ \\text{nm}',
        },
      ],
    },
    {
      id: 'int-marche',
      level: 2,
      title: "Différence de marche et nature d'une frange",
      statement: "Les fentes sont distantes de $a = 0{,}8$ mm, l'écran est à $D = 2$ m et la lumière a pour longueur d'onde $\\lambda = 500$ nm. On s'intéresse au point M de l'écran d'abscisse $x = 3{,}125$ mm.",
      given: [
        {
          label: 'a',
          value: '0,8 mm',
        },
        {
          label: 'D',
          value: '2 m',
        },
        {
          label: 'λ',
          value: '500 nm',
        },
        {
          label: 'x',
          value: '3,125 mm',
        },
      ],
      diagram: {
        width: 16,
        height: 8,
        elements: [
          {
            type: 'line',
            x1: 4,
            y1: 0.4,
            x2: 4,
            y2: 3.4,
            color: '#64748b',
            width: 4,
          },
          {
            type: 'line',
            x1: 4,
            y1: 3.8,
            x2: 4,
            y2: 4.2,
            color: '#64748b',
            width: 4,
          },
          {
            type: 'line',
            x1: 4,
            y1: 4.6,
            x2: 4,
            y2: 7.6,
            color: '#64748b',
            width: 4,
          },
          {
            type: 'point',
            x: 4,
            y: 3.6,
            label: 'F₁',
            color: '#f87171',
            labelPos: 'left',
          },
          {
            type: 'point',
            x: 4,
            y: 4.4,
            label: 'F₂',
            color: '#f87171',
            labelPos: 'left',
          },
          {
            type: 'line',
            x1: 14,
            y1: 0.4,
            x2: 14,
            y2: 7.6,
            color: '#e2e8f0',
            width: 3,
          },
          {
            type: 'text',
            x: 14.6,
            y: 7.2,
            text: 'écran',
            color: '#cbd5e1',
            size: 12,
          },
          {
            type: 'line',
            x1: 4,
            y1: 4,
            x2: 14,
            y2: 4,
            color: '#475569',
            dashed: true,
          },
          {
            type: 'point',
            x: 14,
            y: 4,
            label: 'O',
            color: '#e2e8f0',
            labelPos: 'right',
          },
          {
            type: 'point',
            x: 14,
            y: 6,
            label: 'M (x)',
            color: '#fbbf24',
            labelPos: 'right',
          },
          {
            type: 'line',
            x1: 4,
            y1: 3.6,
            x2: 14,
            y2: 6,
            color: '#f87171',
          },
          {
            type: 'line',
            x1: 4,
            y1: 4.4,
            x2: 14,
            y2: 6,
            color: '#f87171',
          },
          {
            type: 'arrow',
            x1: 4,
            y1: 1.2,
            x2: 14,
            y2: 1.2,
            color: '#94a3b8',
            label: 'D',
          },
          {
            type: 'text',
            x: 3,
            y: 4.1,
            text: 'a',
            color: '#94a3b8',
            size: 13,
          },
          {
            type: 'line',
            x1: 0.5,
            y1: 4,
            x2: 3.6,
            y2: 4,
            color: '#ef4444',
            width: 3,
          },
          {
            type: 'text',
            x: 1.6,
            y: 4.5,
            text: 'laser',
            color: '#fca5a5',
            size: 12,
          },
        ],
      },
      parts: [
        {
          label: 'Calcule la différence de marche $\\delta = F_2M - F_1M$ (en µm).',
          answer: {
            kind: 'number',
            value: 1.25,
            tolerance: 0.01,
            unit: 'µm',
          },
          steps: [
            'Pour $D \\gg a$ et $D \\gg x$ : $\\delta = \\dfrac{a\\,x}{D}$',
            '$\\delta = \\dfrac{0{,}8 \\cdot 10^{-3} \\times 3{,}125 \\cdot 10^{-3}}{2} = 1{,}25 \\cdot 10^{-6}$ m',
          ],
          result: '\\delta = \\frac{ax}{D} = 1{,}25\\ \\mu\\text{m}',
        },
        {
          label: "Calcule l'ordre d'interférence $p = \\delta / \\lambda$. M est-il sur une frange brillante ou sombre ?",
          answer: {
            kind: 'number',
            value: 2.5,
            tolerance: 0.02,
            unit: '',
          },
          steps: [
            '$p = \\dfrac{1{,}25 \\cdot 10^{-6}}{500 \\cdot 10^{-9}} = 2{,}5$',
            '$p$ est demi-entier : les deux ondes arrivent en opposition de phase, M est sur une **frange sombre**.',
          ],
          result: 'p = 2{,}5\\ \\Rightarrow\\ \\text{frange sombre}',
        },
      ],
    },
    {
      id: 'int-blanche',
      level: 3,
      title: 'Lumière blanche et spectre cannelé',
      source: 'Type concours',
      statement: "On remplace le laser par une source de lumière blanche ($400$ nm $\\leq \\lambda \\leq 750$ nm). Avec $a = 0{,}5$ mm et $D = 1$ m, on place la fente d'un spectroscope au point de l'écran d'abscisse $x = 5$ mm.",
      given: [
        {
          label: 'a',
          value: '0,5 mm',
        },
        {
          label: 'D',
          value: '1 m',
        },
        {
          label: 'x',
          value: '5 mm',
        },
      ],
      parts: [
        {
          label: 'Combien de radiations visibles sont éteintes en ce point ?',
          answer: {
            kind: 'number',
            value: 3,
            tolerance: 0,
            unit: 'radiations',
          },
          steps: [
            '$\\delta = \\dfrac{ax}{D} = 2{,}5$ µm',
            'Une radiation est éteinte si $\\delta = (k + \\tfrac12)\\lambda$, soit $\\lambda = \\dfrac{\\delta}{k + 1/2}$ avec $400 \\leq \\lambda \\leq 750$ nm.',
            'Soit $3{,}33 \\leq k + \\tfrac12 \\leq 6{,}25$ : $k = 3, 4, 5$. Trois radiations éteintes : 714 ; 556 ; 455 nm.',
          ],
          result: 'k \\in \\{3, 4, 5\\}\\ :\\ 3\\ \\text{radiations éteintes}',
        },
        {
          label: "Quelle est la plus courte longueur d'onde éteinte (en nm) ?",
          answer: {
            kind: 'number',
            value: 454.54545,
            tolerance: 2,
            unit: 'nm',
          },
          steps: [
            '$\\lambda_5 = \\dfrac{2{,}5 \\cdot 10^{-6}}{5{,}5} \\approx 455$ nm (bleu)',
            'Le spectroscope montre un spectre continu barré de 3 bandes noires : un **spectre cannelé**.',
          ],
          result: '\\lambda_{min} \\approx 455\\ \\text{nm}',
        },
      ],
    },
  ],
  quiz: [],
  applications: [
    {
      title: 'Fentes de Young en salle de TP',
      tagline: 'Quel écart entre deux franges brillantes ?',
      situation: "En TP, on éclaire deux fentes distantes de $a = 0{,}25$ mm avec un pointeur laser rouge ($\\lambda = 650$ nm). L'écran est placé à $D = 2$ m.",
      model: "Les deux fentes se comportent comme deux sources cohérentes. Sur l'écran, les franges brillantes sont régulièrement espacées de l'interfrange $i = \\dfrac{\\lambda D}{a}$.",
      questions: [
        "Calcule l'interfrange (en mm).",
      ],
      check: {
        value: 5.2,
        tolerance: 0.02,
        unit: 'mm',
      },
      solution: [
        '$i = \\dfrac{\\lambda D}{a}$',
        'A.N. : $i = \\dfrac{650\\times10^{-9}\\times 2}{0{,}25\\times10^{-3}} = 5,2\\times10^{-3}$ m',
      ],
      fact: "En mesurant $i$, on peut mesurer une longueur d'onde de quelques centaines de nanomètres avec une simple règle : c'est ainsi que Young a prouvé la nature ondulatoire de la lumière en 1801.",
    },
    {
      title: "Mesurer la longueur d'onde d'un laser vert",
      tagline: 'Retrouver λ à partir des franges',
      situation: 'Avec le même dispositif ($a = 0{,}25$ mm, $D = 2$ m), on remplace le laser rouge par un laser vert. On mesure 11 franges brillantes consécutives sur 44 mm.',
      model: 'Entre 11 franges brillantes consécutives, il y a 10 interfranges : $10\\,i = 44$ mm. On en déduit $\\lambda = \\dfrac{i\\,a}{D}$.',
      questions: [
        "Calcule la longueur d'onde du laser vert (en nm).",
      ],
      check: {
        value: 550,
        tolerance: 0.02,
        unit: 'nm',
      },
      solution: [
        '$i = \\dfrac{44}{10} = 4{,}4$ mm',
        "$\\lambda = \\dfrac{i\\,a}{D} = \\dfrac{4{,}4\\times10^{-3}\\times 0{,}25\\times10^{-3}}{2} = 550\\times10^{-9}$ m : c'est bien du vert.",
      ],
      fact: "Le vert est la couleur à laquelle l'œil humain est le plus sensible : un laser vert paraît beaucoup plus lumineux qu'un laser rouge de même puissance.",
    },
  ],
};
