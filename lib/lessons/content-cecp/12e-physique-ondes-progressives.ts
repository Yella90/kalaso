// Importé du site cecp (physique-3d, chapitre « ondes-progressives ») par scripts/import-cecp.ts.
// Une nouvelle importation remplace ce fichier.
import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook: 'Une perturbation se propage, la matière reste sur place.',
  objectives: [],
  sections: [
    {
      title: 'Signal et onde mécanique',
      blocks: [
        {
          kind: 'callout',
          variant: 'methode',
          title: 'Mesurer λ',
          blocks: [
            {
              kind: 'text',
              text: "Sur une photo (ou en éclairage stroboscopique), on mesure la distance entre $n + 1$ crêtes consécutives : elle vaut $n\\lambda$. Mesurer plusieurs longueurs d'onde à la fois réduit l'erreur.",
            },
          ],
        },
        {
          kind: 'list',
          items: [
            "Une onde mécanique est la propagation d'une perturbation dans un milieu matériel, **sans transport de matière** mais avec transport d'énergie.",
            "Onde **transversale** : la perturbation est perpendiculaire à la direction de propagation (corde, surface de l'eau).",
            "Onde **longitudinale** : la perturbation est parallèle à la propagation (ressort comprimé, son dans l'air).",
            "La célérité $v$ dépend du milieu : le long d'une corde, $v = \\sqrt{F/\\mu}$ ($F$ : tension, $\\mu$ : masse linéique).",
          ],
        },
      ],
    },
    {
      title: 'Onde progressive sinusoïdale',
      blocks: [
        {
          kind: 'text',
          text: 'La source S vibre sinusoïdalement : $y_S(t) = a\\sin(2\\pi N t)$. Un point M situé à la distance $x$ reproduit le mouvement de S avec un retard $\\theta = x/v$.',
        },
        {
          kind: 'formula',
          tex: 'y_M(t) = y_S\\!\\left(t - \\frac{x}{v}\\right) = a\\sin\\left(2\\pi N t - \\frac{2\\pi x}{\\lambda}\\right)',
          legend: [
            "$\\lambda = vT = v/N$ : longueur d'onde (m)",
            '$N$ : fréquence (Hz)',
          ],
        },
        {
          kind: 'text',
          text: "La longueur d'onde est la distance parcourue par l'onde pendant une période. L'onde possède une **double périodicité** : temporelle ($T$) et spatiale ($\\lambda$).",
        },
      ],
    },
    {
      title: 'Comparaison des mouvements de deux points',
      blocks: [
        {
          kind: 'formula',
          tex: '\\Delta\\varphi = \\frac{2\\pi d}{\\lambda}',
          legend: [
            '$d$ : distance entre les deux points',
          ],
        },
        {
          kind: 'list',
          items: [
            '$d = k\\lambda$ : les points vibrent **en phase**.',
            '$d = (2k+1)\\dfrac{\\lambda}{2}$ : les points vibrent **en opposition de phase**.',
            '$d = (2k+1)\\dfrac{\\lambda}{4}$ : les points vibrent **en quadrature**.',
          ],
        },
      ],
    },
    {
      title: 'Étude stroboscopique',
      blocks: [
        {
          kind: 'text',
          text: "Un stroboscope émet des éclairs brefs de fréquence $N_e$. Si $N = k N_e$ ($k$ entier), la corde paraît **immobile**. La plus grande fréquence donnant l'immobilité apparente est $N_e = N$.",
        },
        {
          kind: 'list',
          items: [
            '$N_e$ légèrement inférieure à $N$ : mouvement apparent ralenti dans le sens réel, de fréquence $N - N_e$.',
            '$N_e$ légèrement supérieure à $N$ : mouvement apparent ralenti en sens inverse.',
          ],
        },
      ],
    },
  ],
  essentials: [],
  exercises: [
    {
      id: 'onde-corde',
      level: 1,
      title: "Onde le long d'une corde",
      statement: "L'extrémité S d'une corde tendue est reliée à un vibreur de fréquence $N = 50$ Hz. L'onde progresse le long de la corde à la célérité $v = 10$ m/s, sans amortissement ni réflexion. M est un point de la corde situé à 50 cm de S.",
      given: [
        {
          label: 'N',
          value: '50 Hz',
        },
        {
          label: 'v',
          value: '10 m/s',
        },
        {
          label: 'SM',
          value: '50 cm',
        },
      ],
      parts: [
        {
          label: "Calcule la longueur d'onde $\\lambda$ (en cm).",
          answer: {
            kind: 'number',
            value: 20,
            tolerance: 0.1,
            unit: 'cm',
          },
          steps: [
            "La longueur d'onde est la distance parcourue par l'onde pendant une période : $\\lambda = vT = \\dfrac{v}{N}$",
            '$\\lambda = \\dfrac{10}{50} = 0{,}2$ m',
          ],
          result: '\\lambda = v/N = 20\\ \\text{cm}',
        },
        {
          label: 'Avec quel retard $\\theta$ le point M reproduit-il le mouvement de S ? (en ms)',
          answer: {
            kind: 'number',
            value: 50,
            tolerance: 0.5,
            unit: 'ms',
          },
          steps: [
            '$\\theta = \\dfrac{SM}{v} = \\dfrac{0{,}5}{10} = 0{,}05$ s',
          ],
          result: '\\theta = SM/v = 50\\ \\text{ms}',
        },
        {
          label: 'Compare le mouvement de M à celui de S.',
          answer: {
            kind: 'text',
            display: 'en opposition de phase',
            accepted: [
              'opposition',
              'opposition de phase',
              'en opposition de phase',
              'en opposition',
              'ils sont en opposition de phase',
              'phase opposee',
              'phase opposée',
            ],
          },
          steps: [
            '$\\dfrac{SM}{\\lambda} = \\dfrac{50}{20} = 2{,}5$ : SM est un multiple impair de $\\dfrac{\\lambda}{2}$.',
            'Les deux points vibrent donc en opposition de phase.',
          ],
          result: 'SM = (2k+1)\\frac{\\lambda}{2} \\Rightarrow \\text{opposition de phase}',
        },
      ],
    },
    {
      id: 'onde-cuve',
      level: 2,
      title: 'Cuve à ondes et stroboscope',
      statement: "Une pointe frappe la surface de l'eau d'une cuve à ondes à la fréquence $N = 25$ Hz. En éclairage stroboscopique, la plus grande fréquence des éclairs donnant l'immobilité apparente est 25 Hz ; on mesure alors 3 cm entre la 1re et la 6e ride circulaire.",
      given: [
        {
          label: 'N',
          value: '25 Hz',
        },
        {
          label: '6 rides',
          value: '3 cm',
        },
      ],
      parts: [
        {
          label: "Calcule la longueur d'onde (en cm).",
          answer: {
            kind: 'number',
            value: 0.6,
            tolerance: 0.01,
            unit: 'cm',
          },
          steps: [
            'Deux rides consécutives sont distantes de $\\lambda$. Entre la 1re et la 6e ride, il y a 5 intervalles.',
            '$5\\lambda = 3$ cm donc $\\lambda = 0{,}6$ cm',
          ],
          result: '\\lambda = 0{,}6\\ \\text{cm}',
        },
        {
          label: 'En déduire la célérité des ondes (en m/s).',
          answer: {
            kind: 'number',
            value: 0.15,
            tolerance: 0.003,
            unit: 'm/s',
          },
          steps: [
            '$v = \\lambda N = 6\\times10^{-3}\\times 25 = 0{,}15$ m/s',
          ],
          result: 'v = \\lambda N = 0{,}15\\ \\text{m/s}',
        },
        {
          label: 'On règle le stroboscope à 24 Hz. Quelle est la fréquence du mouvement apparent des rides (en Hz) ?',
          answer: {
            kind: 'number',
            value: 1,
            tolerance: 0.01,
            unit: 'Hz',
          },
          steps: [
            "Entre deux éclairs, la surface effectue un peu plus d'une vibration : le mouvement paraît ralenti, dans le sens réel.",
            '$N_a = N - N_e = 25 - 24 = 1$ Hz',
          ],
          result: 'N_a = N - N_e = 1\\ \\text{Hz}',
        },
      ],
    },
    {
      id: 'onde-dephasage',
      level: 3,
      title: 'Célérité et déphasage',
      statement: 'Une corde de masse linéique $\\mu = 20$ g/m est tendue par une force $F = 8$ N. Son extrémité S vibre sinusoïdalement à $N = 100$ Hz. On rappelle que la célérité vaut $v = \\sqrt{F/\\mu}$. Un point M est à 35 cm de S.',
      given: [
        {
          label: 'μ',
          value: '20 g/m',
        },
        {
          label: 'F',
          value: '8 N',
        },
        {
          label: 'N',
          value: '100 Hz',
        },
        {
          label: 'SM',
          value: '35 cm',
        },
      ],
      parts: [
        {
          label: 'Calcule la célérité $v$ (en m/s).',
          answer: {
            kind: 'number',
            value: 20,
            tolerance: 0.1,
            unit: 'm/s',
          },
          steps: [
            '$v = \\sqrt{\\dfrac{F}{\\mu}} = \\sqrt{\\dfrac{8}{0{,}02}} = 20$ m/s',
          ],
          result: 'v = \\sqrt{F/\\mu} = 20\\ \\text{m/s}',
        },
        {
          label: "Calcule la longueur d'onde (en cm).",
          answer: {
            kind: 'number',
            value: 20,
            tolerance: 0.1,
            unit: 'cm',
          },
          steps: [
            '$\\lambda = \\dfrac{v}{N} = \\dfrac{20}{100} = 0{,}20$ m',
          ],
          result: '\\lambda = 20\\ \\text{cm}',
        },
        {
          label: 'Calcule le déphasage de M par rapport à S, ramené entre 0 et $2\\pi$ (en rad).',
          answer: {
            kind: 'number',
            value: 4.712389,
            tolerance: 0.02,
            unit: 'rad',
          },
          steps: [
            '$\\Delta\\varphi = \\dfrac{2\\pi\\,SM}{\\lambda} = 2\\pi\\times\\dfrac{35}{20} = 3{,}5\\pi$',
            'Modulo $2\\pi$ : $\\Delta\\varphi = 1{,}5\\pi \\approx 4{,}71$ rad',
          ],
          result: '\\Delta\\varphi = \\tfrac{3\\pi}{2} \\approx 4{,}71\\ \\text{rad}',
        },
        {
          label: "Comment vibrent S et M l'un par rapport à l'autre ?",
          answer: {
            kind: 'text',
            display: 'en quadrature (de phase)',
            accepted: [
              'quadrature',
              'en quadrature',
              'en quadrature de phase',
              'quadrature de phase',
            ],
          },
          steps: [
            "Un déphasage de $\\dfrac{3\\pi}{2}$ (ou $-\\dfrac{\\pi}{2}$) correspond à des mouvements en quadrature : quand l'un passe par l'équilibre, l'autre est à une position extrême.",
          ],
          result: '\\Delta\\varphi = \\tfrac{3\\pi}{2} \\Rightarrow \\text{quadrature}',
        },
      ],
    },
  ],
  quiz: [],
  applications: [
    {
      title: "À quelle distance est l'orage ?",
      tagline: "Compter les secondes entre l'éclair et le tonnerre",
      situation: "Pendant la saison des pluies, tu vois un éclair, puis tu entends le tonnerre 3,5 s plus tard. Le son se propage dans l'air à 340 m/s.",
      model: 'La lumière arrive presque instantanément ($3\\times10^8$ m/s). Le son, onde mécanique longitudinale, met $\\Delta t = \\dfrac{d}{v}$ pour arriver.',
      questions: [
        "Calcule la distance de l'orage (en m).",
      ],
      check: {
        value: 1190,
        tolerance: 0.02,
        unit: 'm',
      },
      solution: [
        '$d = v\\,\\Delta t$',
        'A.N. : $d = 340\\times 3{,}5 = 1190$ m, soit environ 1,2 km',
      ],
      fact: "Règle pratique : divise le nombre de secondes par 3 pour obtenir la distance en kilomètres. Si l'écart diminue, l'orage se rapproche : mets-toi à l'abri.",
    },
    {
      title: 'Le sondeur du pêcheur',
      tagline: 'Quelle est la profondeur du fleuve ?',
      situation: "Un pêcheur du fleuve Niger a fixé un petit sondeur sous sa pirogue. L'appareil émet une impulsion ultrasonore et reçoit l'écho renvoyé par le fond 8 ms plus tard. Les ultrasons se propagent dans l'eau à 1500 m/s.",
      model: "L'onde fait un aller-retour : elle parcourt deux fois la profondeur pendant la durée mesurée, $2d = v\\,\\Delta t$.",
      questions: [
        "Calcule la profondeur de l'eau sous la pirogue (en m).",
      ],
      check: {
        value: 6,
        tolerance: 0.02,
        unit: 'm',
      },
      solution: [
        '$2d = v\\,\\Delta t \\Rightarrow d = \\dfrac{v\\,\\Delta t}{2}$',
        'A.N. : $d = \\dfrac{1500\\times 8\\times10^{-3}}{2} = 6$ m',
      ],
      fact: "Les chauves-souris et les dauphins utilisent le même principe (l'écholocation) pour se repérer et chasser dans l'obscurité.",
    },
  ],
};
