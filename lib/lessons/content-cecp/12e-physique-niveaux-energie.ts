// Importé du site cecp (physique-3d, chapitre « niveaux-energie ») par scripts/import-cecp.ts.
// Une nouvelle importation remplace ce fichier.
import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook: "L'énergie de l'atome est quantifiée : il ne peut absorber ou émettre que certains photons.",
  objectives: [],
  sections: [
    {
      title: 'Spectres de raies',
      blocks: [
        {
          kind: 'callout',
          variant: 'methode',
          title: 'Calculer λ rapidement',
          blocks: [
            {
              kind: 'text',
              text: 'Avec $E$ en eV : $\\lambda\\ (\\text{nm}) \\approx \\dfrac{1243}{E\\ (\\text{eV})}$ (avec $h = 6{,}63\\times10^{-34}$ J·s et $c = 3\\times10^8$ m/s).',
            },
          ],
        },
        {
          kind: 'callout',
          variant: 'attention',
          blocks: [
            {
              kind: 'text',
              text: "Les énergies des niveaux sont **négatives** : plus l'électron est lié, plus l'énergie est basse. L'énergie d'un photon, elle, est toujours positive.",
            },
          ],
        },
        {
          kind: 'text',
          text: "La lumière émise par un gaz chauffé ou soumis à une décharge électrique (lampe à vapeur de sodium, tube à hydrogène) donne un spectre de **raies** fines, caractéristique de l'élément. Un gaz froid éclairé en lumière blanche absorbe exactement les mêmes radiations : spectre de raies d'absorption.",
        },
      ],
    },
    {
      title: "Quantification de l'énergie",
      blocks: [
        {
          kind: 'text',
          text: "L'énergie d'un atome ne peut prendre que certaines valeurs : les **niveaux d'énergie**. Pour l'atome d'hydrogène :",
        },
        {
          kind: 'formula',
          tex: 'E_n = -\\frac{E_0}{n^2} \\qquad E_0 = 13{,}6\\ \\text{eV}',
          legend: [
            '$n$ : nombre quantique principal ($n \\geq 1$)',
            '$n = 1$ : état fondamental ; $n \\geq 2$ : états excités',
            '$E_\\infty = 0$ : atome ionisé',
            '$1\\ \\text{eV} = 1{,}6\\times10^{-19}$ J',
          ],
        },
      ],
    },
    {
      title: "Émission et absorption d'un photon",
      blocks: [
        {
          kind: 'formula',
          tex: 'E_p - E_n = h\\nu = \\frac{hc}{\\lambda}',
          legend: [
            '$h = 6{,}63\\times10^{-34}$ J·s',
            '$c = 3\\times10^8$ m/s',
          ],
        },
        {
          kind: 'list',
          items: [
            "**Émission** : l'atome passe d'un niveau $E_p$ à un niveau inférieur $E_n$ et émet un photon d'énergie $E_p - E_n$.",
            "**Absorption** : un photon n'est absorbé que si son énergie est exactement égale à une différence entre deux niveaux.",
            "**Ionisation** : tout photon d'énergie supérieure à $E_\\infty - E_n$ est absorbé ; l'excédent devient l'énergie cinétique de l'électron arraché.",
          ],
        },
      ],
    },
    {
      title: "Séries de raies de l'hydrogène",
      blocks: [
        {
          kind: 'list',
          items: [
            'Série de **Lyman** : retour au niveau $n = 1$ (ultraviolet).',
            'Série de **Balmer** : retour au niveau $n = 2$ (4 raies visibles : 656, 486, 434 et 410 nm).',
            'Série de **Paschen** : retour au niveau $n = 3$ (infrarouge).',
            "Depuis le niveau $n$, un ensemble d'atomes peut émettre $\\dfrac{n(n-1)}{2}$ raies différentes.",
          ],
        },
      ],
    },
  ],
  essentials: [],
  exercises: [
    {
      id: 'atome-halpha',
      level: 1,
      title: "La raie rouge de l'hydrogène",
      statement: "Les niveaux d'énergie de l'atome d'hydrogène sont donnés par $E_n = -\\dfrac{13{,}6}{n^2}$ (en eV). Données : $h = 6{,}63\\times10^{-34}$ J·s, $c = 3\\times10^8$ m/s, $1\\ \\text{eV} = 1{,}6\\times10^{-19}$ J.",
      given: [
        {
          label: 'Eₙ',
          value: '−13,6 / n² eV',
        },
        {
          label: 'h',
          value: '6,63×10⁻³⁴ J·s',
        },
        {
          label: 'c',
          value: '3×10⁸ m/s',
        },
        {
          label: '1 eV',
          value: '1,6×10⁻¹⁹ J',
        },
      ],
      parts: [
        {
          label: "Calcule l'énergie du niveau $n = 3$ (en eV).",
          answer: {
            kind: 'number',
            value: -1.5111111,
            tolerance: 0.01,
            unit: 'eV',
          },
          steps: [
            '$E_3 = -\\dfrac{13{,}6}{9} \\approx -1{,}51$ eV',
          ],
          result: 'E_3 \\approx -1{,}51\\ \\text{eV}',
        },
        {
          label: "Quelle est l'énergie du photon émis lors de la transition $3 \\to 2$ (en eV) ?",
          answer: {
            kind: 'number',
            value: 1.8888889,
            tolerance: 0.01,
            unit: 'eV',
          },
          steps: [
            '$E = E_3 - E_2 = -1{,}51 - (-3{,}40) \\approx 1{,}89$ eV',
          ],
          result: 'E = E_3 - E_2 \\approx 1{,}89\\ \\text{eV}',
        },
        {
          label: "Calcule la longueur d'onde correspondante (en nm).",
          answer: {
            kind: 'number',
            value: 658.125,
            tolerance: 3,
            unit: 'nm',
          },
          steps: [
            '$\\lambda = \\dfrac{hc}{E} = \\dfrac{6{,}63\\times10^{-34}\\times 3\\times10^8}{1{,}89\\times 1{,}6\\times10^{-19}} \\approx 658\\times10^{-9}$ m',
          ],
          result: '\\lambda = hc/E \\approx 658\\ \\text{nm}',
        },
        {
          label: 'À quel domaine appartient cette radiation (UV, visible ou IR) ?',
          answer: {
            kind: 'text',
            display: 'visible (rouge)',
            accepted: [
              'visible',
              'le visible',
              'domaine visible',
              'visible rouge',
              'rouge',
              'lumiere visible',
              'lumière visible',
            ],
          },
          steps: [
            "Le visible s'étend d'environ 400 nm à 800 nm : la raie est rouge (raie $H_\\alpha$ de la série de Balmer).",
          ],
          result: '400 < \\lambda < 800\\ \\text{nm} \\Rightarrow \\text{visible}',
        },
      ],
    },
    {
      id: 'atome-absorption',
      level: 2,
      title: 'Quels photons sont absorbés ?',
      statement: "Un atome d'hydrogène est dans son état fondamental ($n = 1$). Il reçoit successivement trois photons d'énergies 10,2 eV, 11,0 eV et 15,0 eV. On rappelle $E_n = -\\dfrac{13{,}6}{n^2}$ eV.",
      given: [
        {
          label: 'photons',
          value: '10,2 ; 11,0 ; 15,0 eV',
        },
        {
          label: 'Eₙ',
          value: '−13,6 / n² eV',
        },
      ],
      parts: [
        {
          label: "Le photon de 10,2 eV est absorbé : sur quel niveau $n$ passe l'atome ?",
          answer: {
            kind: 'number',
            value: 2,
            tolerance: 0.1,
            unit: '',
          },
          steps: [
            '$E_1 + 10{,}2 = -13{,}6 + 10{,}2 = -3{,}4$ eV $= E_2$',
          ],
          result: 'n = 2',
        },
        {
          label: "Quelle est l'énergie d'ionisation de l'atome dans l'état fondamental (en eV) ?",
          answer: {
            kind: 'number',
            value: 13.6,
            tolerance: 0.05,
            unit: 'eV',
          },
          steps: [
            "Ioniser, c'est amener l'électron au niveau $n = \\infty$ ($E_\\infty = 0$).",
            '$E_i = E_\\infty - E_1 = 13{,}6$ eV',
          ],
          result: 'E_i = 13{,}6\\ \\text{eV}',
        },
        {
          label: "Le photon de 15,0 eV ionisé l'atome. Quelle est l'énergie cinétique de l'électron éjecté (en eV) ?",
          answer: {
            kind: 'number',
            value: 1.4,
            tolerance: 0.02,
            unit: 'eV',
          },
          steps: [
            '$E_c = E_{photon} - E_i = 15{,}0 - 13{,}6 = 1{,}4$ eV',
          ],
          result: 'E_c = 1{,}4\\ \\text{eV}',
        },
        {
          label: "Combien de ces trois photons peuvent être absorbés par l'atome ?",
          answer: {
            kind: 'number',
            value: 2,
            tolerance: 0.1,
            unit: '',
          },
          steps: [
            "$-13{,}6 + 11{,}0 = -2{,}6$ eV ne correspond à aucun niveau ($E_2 = -3{,}4$, $E_3 \\approx -1{,}51$) : le photon de 11 eV n'est pas absorbé.",
            "L'énergie de l'atome est **quantifiée** : seuls le photon de 10,2 eV (transition) et celui de 15 eV (ionisation) sont absorbés.",
          ],
          result: '2\\ \\text{photons}',
        },
      ],
    },
    {
      id: 'atome-series',
      level: 3,
      title: 'Séries de Lyman et de Balmer',
      statement: "On étudie le spectre d'émission de l'hydrogène ($E_n = -\\dfrac{13{,}6}{n^2}$ eV, $h = 6{,}63\\times10^{-34}$ J·s, $c = 3\\times10^8$ m/s, $1$ eV $= 1{,}6\\times10^{-19}$ J). La série de Lyman regroupe les transitions aboutissant au niveau 1, celle de Balmer au niveau 2.",
      given: [
        {
          label: 'Eₙ',
          value: '−13,6 / n² eV',
        },
        {
          label: 'Lyman',
          value: 'n → 1',
        },
        {
          label: 'Balmer',
          value: 'n → 2',
        },
      ],
      parts: [
        {
          label: "Calcule la plus grande longueur d'onde de la série de Lyman (en nm).",
          answer: {
            kind: 'number',
            value: 121.875,
            tolerance: 1,
            unit: 'nm',
          },
          steps: [
            "La plus grande longueur d'onde correspond à la plus petite énergie : transition $2 \\to 1$, $E = 10{,}2$ eV.",
            '$\\lambda = \\dfrac{hc}{E} \\approx 121{,}9$ nm (ultraviolet)',
          ],
          result: '\\lambda_{2\\to1} \\approx 122\\ \\text{nm}',
        },
        {
          label: 'Calcule la limite de la série de Lyman, transition $\\infty \\to 1$ (en nm).',
          answer: {
            kind: 'number',
            value: 91.40625,
            tolerance: 1,
            unit: 'nm',
          },
          steps: [
            '$E = 13{,}6$ eV donc $\\lambda = \\dfrac{hc}{13{,}6\\times 1{,}6\\times10^{-19}} \\approx 91{,}4$ nm',
          ],
          result: '\\lambda_{\\infty\\to1} \\approx 91\\ \\text{nm}',
        },
        {
          label: 'Calcule la limite de la série de Balmer, transition $\\infty \\to 2$ (en nm).',
          answer: {
            kind: 'number',
            value: 365.625,
            tolerance: 2,
            unit: 'nm',
          },
          steps: [
            '$E = 3{,}4$ eV donc $\\lambda \\approx 366$ nm (proche UV)',
          ],
          result: '\\lambda_{\\infty\\to2} \\approx 366\\ \\text{nm}',
        },
        {
          label: "Des atomes sont excités jusqu'au niveau 4. Combien de raies différentes peuvent-ils émettre en se désexcitant ?",
          answer: {
            kind: 'number',
            value: 6,
            tolerance: 0.1,
            unit: '',
          },
          steps: [
            'Transitions possibles : $4\\to3$, $4\\to2$, $4\\to1$, $3\\to2$, $3\\to1$, $2\\to1$.',
            'En général, depuis le niveau $n$ : $\\dfrac{n(n-1)}{2}$ raies.',
          ],
          result: '\\frac{4\\times 3}{2} = 6\\ \\text{raies}',
        },
      ],
    },
  ],
  quiz: [],
  applications: [
    {
      title: 'La lumière orange des lampadaires',
      tagline: 'Quelle énergie pour la raie jaune du sodium ?',
      situation: "Beaucoup de lampadaires anciens contiennent de la vapeur de sodium. Ils émettent presque uniquement une lumière jaune-orangé de longueur d'onde 589 nm.",
      model: "Les atomes de sodium, excités par la décharge électrique, redescendent vers leur état fondamental en émettant des photons d'énergie bien précise : $E = \\dfrac{hc}{\\lambda}$.",
      questions: [
        "Calcule l'énergie des photons émis (en eV).",
      ],
      check: {
        value: 2.1105688,
        tolerance: 0.02,
        unit: 'eV',
      },
      solution: [
        '$E = \\dfrac{hc}{\\lambda}$, puis conversion : $1$ eV $= 1{,}6\\times10^{-19}$ J',
        'A.N. : $E = \\dfrac{6{,}63\\times10^{-34}\\times 3\\times10^8}{589\\times10^{-9}} \\approx 3,38\\times10^{-19}$ J $\\approx 2,11$ eV',
      ],
      fact: "Sous ces lampadaires, les couleurs disparaissent (une voiture rouge paraît sombre) : la lumière ne contient qu'une seule raie, au lieu de toutes les couleurs.",
    },
    {
      title: 'La couleur rose des nébuleuses',
      tagline: "D'où vient le rouge des nuages de gaz dans l'espace ?",
      situation: "Sur les photos de télescope, les nébuleuses où naissent les étoiles sont souvent rouge-rose. Elles contiennent surtout de l'hydrogène, excité par la lumière des jeunes étoiles.",
      model: "En se désexcitant du niveau 3 vers le niveau 2, l'atome d'hydrogène ($E_n = -13{,}6/n^2$ eV) émet la raie $H_\\alpha$ de la série de Balmer.",
      questions: [
        "Calcule la longueur d'onde de la raie Hα (en nm).",
      ],
      check: {
        value: 658.125,
        tolerance: 0.01,
        unit: 'nm',
      },
      solution: [
        '$E = E_3 - E_2 = -\\dfrac{13{,}6}{9} + \\dfrac{13{,}6}{4} \\approx 1{,}89$ eV',
        '$\\lambda = \\dfrac{hc}{E} \\approx 658$ nm : du rouge.',
      ],
      fact: "Les astronomes utilisent des filtres « H-alpha » qui ne laissent passer que cette raie : ils peuvent ainsi cartographier l'hydrogène dans les galaxies.",
    },
  ],
};
