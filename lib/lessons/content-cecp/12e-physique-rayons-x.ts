// Importé du site cecp (physique-3d, chapitre « rayons-x ») par scripts/import-cecp.ts.
// Une nouvelle importation remplace ce fichier.
import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook: "Découverts par Röntgen en 1895, ils traversent la matière et révèlent l'intérieur du corps.",
  objectives: [],
  sections: [
    {
      title: 'Production : le tube de Coolidge',
      blocks: [
        {
          kind: 'callout',
          variant: 'retenir',
          blocks: [
            {
              kind: 'list',
              items: [
                'Électrons accélérés : $E_c = eU$',
                '$\\lambda_{min} = hc/(eU)$',
                'Spectre continu + raies du métal',
                '≈ 1 % en rayons X, 99 % en chaleur',
              ],
            },
          ],
        },
        {
          kind: 'text',
          text: 'Dans une ampoule où règne un vide poussé, un filament chauffé (cathode) émet des électrons. Une haute tension $U$ (20 à 150 kV) les accélère vers une **anticathode** en métal lourd (tungstène). En la frappant, les électrons sont brutalement freinés et émettent des rayons X.',
        },
        {
          kind: 'formula',
          tex: 'E_c = \\tfrac12 m_e v^2 = eU',
          label: 'Énergie des électrons',
          legend: [
            '$e = 1{,}6\\cdot10^{-19}$ C',
            '$m_e = 9{,}11\\cdot10^{-31}$ kg',
          ],
        },
      ],
    },
    {
      title: "Le spectre d'émission",
      blocks: [
        {
          kind: 'text',
          text: 'Le spectre des rayons X comporte deux parties :',
        },
        {
          kind: 'list',
          items: [
            "un **spectre continu** (rayonnement de freinage) qui commence brusquement à une longueur d'onde minimale $\\lambda_{min}$",
            "des **raies caractéristiques** du métal de l'anticathode, dues aux transitions des électrons des couches internes (K, L) des atomes",
          ],
        },
        {
          kind: 'text',
          text: "Le photon le plus énergétique emporte toute l'énergie cinétique d'un électron :",
        },
        {
          kind: 'formula',
          tex: '\\frac{hc}{\\lambda_{min}} = eU \\ \\Longrightarrow\\ \\lambda_{min} = \\frac{hc}{eU}',
          label: 'Loi de Duane et Hunt',
        },
        {
          kind: 'callout',
          variant: 'methode',
          blocks: [
            {
              kind: 'text',
              text: "$\\lambda_{min}$ ne dépend que de la tension $U$ (pas du métal). Plus $U$ est grande, plus les rayons X sont « durs » (courte longueur d'onde, très pénétrants). L'intensité $I$ du courant règle seulement le nombre de photons.",
            },
          ],
        },
      ],
    },
    {
      title: 'Bilan énergétique',
      blocks: [
        {
          kind: 'formula',
          tex: 'P = UI \\qquad n = \\frac{I}{e}',
          legend: [
            '$P$ : puissance électrique du tube',
            "$n$ : électrons frappant l'anticathode par seconde",
          ],
        },
        {
          kind: 'text',
          text: "Seul 1 % environ de cette puissance est converti en rayons X : le reste chauffe l'anticathode, qui doit être refroidie (circulation d'huile, anode tournante).",
        },
      ],
    },
    {
      title: 'Propriétés et applications',
      blocks: [
        {
          kind: 'table',
          head: [
            'Propriété',
            'Application',
          ],
          rows: [
            [
              'traversent la matière, absorbés par les éléments lourds (os, plomb)',
              'radiographie, scanner, contrôle des bagages',
            ],
            [
              'ionisent la matière, détruisent les cellules',
              'radiothérapie (mais dangereux : protection au plomb)',
            ],
            [
              'diffractés par les cristaux ($\\lambda$ ≈ distance entre atomes)',
              "étude de la structure des cristaux et de l'ADN",
            ],
          ],
        },
        {
          kind: 'text',
          text: "Un écran d'épaisseur $x$ atténue le faisceau selon $I = I_0 e^{-\\mu x}$ ; le plomb, très absorbant, sert à protéger le personnel.",
        },
      ],
    },
  ],
  essentials: [],
  exercises: [
    {
      id: 'x-coolidge',
      level: 1,
      title: 'Le tube de Coolidge',
      statement: "Dans un tube de Coolidge, des électrons émis par un filament chauffé sont accélérés sous une tension $U = 30$ kV puis frappent l'anticathode en tungstène. On donne $e = 1{,}6\\cdot10^{-19}$ C, $m_e = 9{,}11\\cdot10^{-31}$ kg, $h = 6{,}63\\cdot10^{-34}$ J·s, $c = 3\\cdot10^8$ m/s.",
      given: [
        {
          label: 'U',
          value: '30 kV',
        },
        {
          label: 'e',
          value: '1,6·10⁻¹⁹ C',
        },
        {
          label: 'me',
          value: '9,11·10⁻³¹ kg',
        },
      ],
      parts: [
        {
          label: "Calcule la vitesse des électrons à l'arrivée sur l'anticathode (en $10^8$ m/s, calcul non relativiste).",
          answer: {
            kind: 'number',
            value: 1.0265413,
            tolerance: 0.01,
            unit: '×10⁸ m/s',
          },
          steps: [
            "Théorème de l'énergie cinétique : $\\tfrac12 m_e v^2 = eU$",
            '$v = \\sqrt{\\dfrac{2eU}{m_e}} \\approx 1{,}03\\cdot10^8$ m/s (un tiers de $c$ : en réalité il faudrait un calcul relativiste)',
          ],
          result: 'v = \\sqrt{\\frac{2eU}{m_e}} \\approx 1{,}03\\cdot10^8\\ \\text{m/s}',
        },
        {
          label: "Calcule la longueur d'onde minimale $\\lambda_{min}$ du rayonnement émis (en pm).",
          answer: {
            kind: 'number',
            value: 41.4375,
            tolerance: 0.1,
            unit: 'pm',
          },
          steps: [
            "Le photon le plus énergétique reçoit toute l'énergie cinétique d'un électron : $\\dfrac{hc}{\\lambda_{min}} = eU$",
            '$\\lambda_{min} = \\dfrac{hc}{eU} = \\dfrac{6{,}63\\cdot10^{-34} \\times 3\\cdot10^8}{1{,}6\\cdot10^{-19} \\times 3\\cdot10^4} \\approx 41{,}4\\cdot10^{-12}$ m',
          ],
          result: '\\lambda_{min} = \\frac{hc}{eU} \\approx 41{,}4\\ \\text{pm}',
        },
      ],
    },
    {
      id: 'x-echauffement',
      level: 2,
      title: "Pourquoi refroidir l'anticathode ?",
      source: 'Type bac',
      statement: "Un tube de radiologie fonctionne sous $U = 100$ kV avec un courant $I = 10$ mA. Seulement 1 % de l'énergie des électrons est transformée en rayons X ; le reste chauffe l'anticathode.",
      given: [
        {
          label: 'U',
          value: '100 kV',
        },
        {
          label: 'I',
          value: '10 mA',
        },
        {
          label: 'η',
          value: '1 %',
        },
      ],
      parts: [
        {
          label: 'Calcule la puissance électrique consommée par le tube (en W).',
          answer: {
            kind: 'number',
            value: 1000,
            tolerance: 1,
            unit: 'W',
          },
          steps: [
            '$P = UI = 10^5 \\times 10^{-2} = 1000$ W',
          ],
          result: 'P = UI = 1000\\ \\text{W}',
        },
        {
          label: "Quelle énergie thermique (en kJ) reçoit l'anticathode en une minute ?",
          answer: {
            kind: 'number',
            value: 59.4,
            tolerance: 0.5,
            unit: 'kJ',
          },
          steps: [
            'Puissance thermique : $P_{th} = 0{,}99 \\times 1000 = 990$ W',
            '$Q = P_{th}\\,\\Delta t = 990 \\times 60 = 59400$ J',
            'Il faut un refroidissement (huile, anode tournante) sinon le tungstène fondrait.',
          ],
          result: 'Q = 0{,}99\\,UI\\,\\Delta t \\approx 59{,}4\\ \\text{kJ}',
        },
        {
          label: "Combien d'électrons frappent l'anticathode chaque seconde (en $10^{16}$) ?",
          answer: {
            kind: 'number',
            value: 6.25,
            tolerance: 0.01,
            unit: '×10¹⁶',
          },
          steps: [
            '$n = \\dfrac{I}{e} = \\dfrac{10^{-2}}{1{,}6\\cdot10^{-19}} = 6{,}25\\cdot10^{16}$ électrons/s',
          ],
          result: 'n = \\frac{I}{e} = 6{,}25\\cdot10^{16}\\ \\text{s}^{-1}',
        },
      ],
    },
    {
      id: 'x-tension',
      level: 3,
      title: 'Choisir la tension du tube',
      source: 'Type concours',
      statement: "Pour une radiographie, on souhaite que les photons X les plus énergétiques émis par le tube aient une longueur d'onde $\\lambda_{min} = 20$ pm. On cherche la tension à appliquer entre la cathode et l'anticathode.",
      given: [
        {
          label: 'λmin',
          value: '20 pm',
        },
        {
          label: 'h',
          value: '6,63·10⁻³⁴ J·s',
        },
        {
          label: 'e',
          value: '1,6·10⁻¹⁹ C',
        },
      ],
      parts: [
        {
          label: 'Calcule la tension $U$ correspondante (en kV).',
          answer: {
            kind: 'number',
            value: 62.15625,
            tolerance: 0.2,
            unit: 'kV',
          },
          steps: [
            '$\\lambda_{min} = \\dfrac{hc}{eU} \\Rightarrow U = \\dfrac{hc}{e\\,\\lambda_{min}}$',
            '$U = \\dfrac{6{,}63\\cdot10^{-34} \\times 3\\cdot10^8}{1{,}6\\cdot10^{-19} \\times 20\\cdot10^{-12}} \\approx 62{,}2$ kV',
          ],
          result: 'U = \\frac{hc}{e\\,\\lambda_{min}} \\approx 62{,}2\\ \\text{kV}',
        },
        {
          label: 'Si on double la tension, $\\lambda_{min}$ est-elle multipliée ou divisée par 2 ?',
          answer: {
            kind: 'text',
            display: 'divisée',
            accepted: [
              'divisee',
              'divisee par 2',
              'elle est divisee par 2',
              'divise',
              'divisée par deux',
            ],
          },
          steps: [
            '$\\lambda_{min}$ est inversement proportionnelle à $U$ : doubler $U$ divise $\\lambda_{min}$ par 2 (rayons X plus « durs », plus pénétrants).',
          ],
          result: '\\lambda_{min} \\propto \\frac{1}{U}',
        },
      ],
    },
  ],
  quiz: [],
  applications: [
    {
      title: 'La radio chez le dentiste',
      tagline: "Voir une carie cachée sous l'émail.",
      situation: 'Le petit appareil de radiographie du dentiste est un tube à rayons X qui fonctionne sous une tension de 60 kV.',
      model: "Les électrons accélérés sous $U$ produisent des rayons X dont la longueur d'onde est au moins égale à $\\lambda_{min} = hc/(eU)$. Les dents, riches en calcium, absorbent plus les rayons X que les gencives.",
      questions: [
        "Calcule la longueur d'onde minimale des rayons X émis (en pm).",
      ],
      check: {
        value: 20.71875,
        tolerance: 0.02,
        unit: 'pm',
      },
      solution: [
        '$\\lambda_{min} = \\dfrac{hc}{eU}$',
        '$\\lambda_{min} = \\dfrac{6{,}63\\times10^{-34}\\times3\\times10^8}{1{,}6\\times10^{-19}\\times6\\times10^4} \\approx 20,7$ pm',
      ],
      fact: 'Une radio dentaire délivre une dose très faible, comparable à celle reçue naturellement en une journée. Le tablier de plomb protège le reste du corps.',
    },
    {
      title: 'Le tablier de plomb',
      tagline: 'Que laisse passer 0,5 mm de plomb ?',
      situation: "En radiologie, le personnel porte un tablier contenant l'équivalent de 0,5 mm de plomb. Pour les rayons X utilisés, le coefficient d'atténuation du plomb vaut $\\mu = 55$ cm⁻¹.",
      model: "Un écran d'épaisseur $x$ transmet la fraction $I/I_0 = e^{-\\mu x}$ du rayonnement. Le plomb, très dense et de numéro atomique élevé, absorbe fortement les rayons X.",
      questions: [
        'Quel pourcentage des rayons X traverse le tablier ?',
      ],
      check: {
        value: 6.3927861,
        tolerance: 0.03,
        unit: '%',
      },
      solution: [
        '$\\dfrac{I}{I_0} = e^{-\\mu x} = e^{-55\\times0{,}05} = e^{-2{,}75}$',
        '$\\dfrac{I}{I_0} \\approx 0,0639$, soit environ 6,4 %',
      ],
      fact: "C'est cette différence d'absorption qui crée l'image : les os (calcium) arrêtent les rayons X et apparaissent blancs sur la radiographie.",
    },
  ],
};
