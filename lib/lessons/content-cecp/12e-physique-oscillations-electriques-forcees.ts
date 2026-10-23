// Importé du site cecp (physique-3d, chapitre « oscillations-electriques-forcees ») par scripts/import-cecp.ts.
// Une nouvelle importation remplace ce fichier.
import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook: 'Le générateur impose sa fréquence ; le circuit répond plus ou moins fort.',
  objectives: [],
  sections: [
    {
      title: 'Le circuit et le régime forcé',
      blocks: [
        {
          kind: 'callout',
          variant: 'attention',
          blocks: [
            {
              kind: 'text',
              text: 'Ne pas confondre la fréquence du générateur $f$ (imposée) et la fréquence propre $f_0$ (caractéristique du circuit). La résonance se produit quand $f = f_0$.',
            },
          ],
        },
        {
          kind: 'text',
          text: "Un dipôle RLC série est alimenté par un générateur basse fréquence (GBF) qui délivre $u(t) = U_m\\cos(\\omega t)$. Après un court régime transitoire, l'intensité oscille à la **fréquence du générateur** (et non à la fréquence propre) : c'est le régime forcé.",
        },
        {
          kind: 'formula',
          tex: 'i(t) = I_m\\cos(\\omega t - \\varphi)',
          legend: [
            '$\\varphi$ : déphasage de la tension $u$ par rapport à $i$',
            '$U = U_m/\\sqrt2$, $I = I_m/\\sqrt2$ : valeurs efficaces',
          ],
        },
      ],
    },
    {
      title: 'Impédance et déphasage',
      blocks: [
        {
          kind: 'formula',
          tex: 'Z = \\frac{U_m}{I_m} = \\sqrt{R^2 + \\left(L\\omega - \\frac{1}{C\\omega}\\right)^2} \\qquad \\tan\\varphi = \\frac{L\\omega - \\frac{1}{C\\omega}}{R}',
          legend: [
            '$Z$ : impédance (Ω)',
            '$\\cos\\varphi = R/Z$ : facteur de puissance',
          ],
        },
        {
          kind: 'list',
          items: [
            "$\\varphi > 0$ : la tension est en avance sur l'intensité, le circuit est **inductif** ($L\\omega > \\frac{1}{C\\omega}$).",
            '$\\varphi < 0$ : le circuit est **capacitif**.',
            "La construction de Fresnel permet de retrouver ces relations : les vecteurs $R I_m$, $L\\omega I_m$ et $\\dfrac{I_m}{C\\omega}$ s'additionnent pour donner $U_m$.",
          ],
        },
      ],
    },
    {
      title: "La résonance d'intensité",
      blocks: [
        {
          kind: 'formula',
          tex: 'LC\\,\\omega_0^2 = 1 \\quad\\Leftrightarrow\\quad f_0 = \\frac{1}{2\\pi\\sqrt{LC}}',
          label: 'Condition de résonance',
        },
        {
          kind: 'list',
          items: [
            'À la résonance : $Z = R$ (minimale), $I_0 = U/R$ (maximale), $\\varphi = 0$ (tension et intensité en phase).',
            'La fréquence de résonance est égale à la fréquence propre du circuit LC.',
            '**Surtension** : à la résonance, $U_C = Q\\,U$ peut être bien supérieure à la tension du générateur.',
          ],
        },
      ],
    },
    {
      title: 'Bande passante et facteur de qualité',
      blocks: [
        {
          kind: 'formula',
          tex: '\\Delta f = f_2 - f_1 = \\frac{R}{2\\pi L} \\qquad Q = \\frac{f_0}{\\Delta f} = \\frac{L\\omega_0}{R} = \\frac{1}{RC\\omega_0}',
          legend: [
            '$f_1$, $f_2$ : fréquences pour lesquelles $I = I_0/\\sqrt2$',
            '$Q$ : facteur de qualité (sans unité)',
          ],
        },
        {
          kind: 'text',
          text: "Plus $R$ est petite, plus la résonance est **aiguë** (bande passante étroite, $Q$ grand) : le circuit est sélectif. C'est le principe du circuit d'accord d'un récepteur radio, qui ne retient que la station voulue.",
        },
      ],
    },
    {
      title: 'Puissance',
      blocks: [
        {
          kind: 'formula',
          tex: 'P = U I\\cos\\varphi = R\\,I^2',
        },
        {
          kind: 'text',
          text: "Seule la résistance consomme de l'énergie en moyenne. La puissance est maximale à la résonance : $P_0 = \\dfrac{U^2}{R}$.",
        },
      ],
    },
  ],
  essentials: [],
  exercises: [
    {
      id: 'rlc-impedance',
      level: 1,
      title: 'Impédance et déphasage à 50 Hz',
      statement: 'Un dipôle RLC série ($R = 100\\ \\Omega$, $L = 0{,}5$ H, $C = 10\\ \\mu$F) est alimenté par une tension sinusoïdale de valeur efficace $U = 12$ V et de fréquence $f = 50$ Hz.',
      given: [
        {
          label: 'R',
          value: '100 Ω',
        },
        {
          label: 'L',
          value: '0,5 H',
        },
        {
          label: 'C',
          value: '10 µF',
        },
        {
          label: 'U ; f',
          value: '12 V ; 50 Hz',
        },
      ],
      parts: [
        {
          label: "Calcule l'impédance $Z$ du dipôle (en Ω).",
          answer: {
            kind: 'number',
            value: 189.724,
            tolerance: 1,
            unit: 'Ω',
          },
          steps: [
            '$\\omega = 2\\pi f \\approx 314{,}2$ rad/s ; $L\\omega \\approx 157{,}1\\ \\Omega$ ; $\\dfrac{1}{C\\omega} \\approx 318{,}3\\ \\Omega$',
            '$Z = \\sqrt{R^2 + \\left(L\\omega - \\dfrac{1}{C\\omega}\\right)^2} \\approx 189{,}7\\ \\Omega$',
          ],
          result: 'Z \\approx 190\\ \\Omega',
        },
        {
          label: "Calcule l'intensité efficace $I$ (en mA).",
          answer: {
            kind: 'number',
            value: 63.249775,
            tolerance: 0.5,
            unit: 'mA',
          },
          steps: [
            '$I = \\dfrac{U}{Z} = \\dfrac{12}{189{,}7} \\approx 63{,}2\\times10^{-3}$ A',
          ],
          result: 'I = U/Z \\approx 63{,}2\\ \\text{mA}',
        },
        {
          label: "Calcule le déphasage $\\varphi$ de la tension par rapport à l'intensité (en degrés, avec son signe).",
          answer: {
            kind: 'number',
            value: -58.191528,
            tolerance: 0.5,
            unit: '°',
          },
          steps: [
            '$\\tan\\varphi = \\dfrac{L\\omega - \\dfrac{1}{C\\omega}}{R}$',
            '$\\tan\\varphi \\approx \\dfrac{-161{,}2}{100}$ donc $\\varphi \\approx -58{,}2$°',
          ],
          result: '\\varphi \\approx -58{,}2^\\circ',
        },
        {
          label: 'Le circuit est-il inductif ou capacitif ?',
          answer: {
            kind: 'text',
            display: 'capacitif',
            accepted: [
              'capacitif',
              'circuit capacitif',
              'il est capacitif',
            ],
          },
          steps: [
            "$\\varphi < 0$ : la tension est en retard sur l'intensité, l'effet du condensateur l'emporte ($\\dfrac{1}{C\\omega} > L\\omega$).",
          ],
          result: '\\varphi < 0 \\Rightarrow \\text{circuit capacitif}',
        },
      ],
    },
    {
      id: 'rlc-resonance',
      level: 2,
      title: "Résonance d'intensité",
      statement: 'On garde le même dipôle ($R = 100\\ \\Omega$, $L = 0{,}5$ H, $C = 10\\ \\mu$F) et la même tension efficace $U = 12$ V, mais on fait varier la fréquence du générateur.',
      given: [
        {
          label: 'R',
          value: '100 Ω',
        },
        {
          label: 'L',
          value: '0,5 H',
        },
        {
          label: 'C',
          value: '10 µF',
        },
        {
          label: 'U',
          value: '12 V',
        },
      ],
      parts: [
        {
          label: 'Calcule la fréquence de résonance $f_0$ (en Hz).',
          answer: {
            kind: 'number',
            value: 71.176254,
            tolerance: 0.3,
            unit: 'Hz',
          },
          steps: [
            "À la résonance d'intensité, $L\\omega_0 = \\dfrac{1}{C\\omega_0}$ donc $LC\\omega_0^2 = 1$.",
            '$f_0 = \\dfrac{1}{2\\pi\\sqrt{LC}} = \\dfrac{1}{2\\pi\\sqrt{5\\times10^{-6}}} \\approx 71{,}2$ Hz',
          ],
          result: 'f_0 = \\frac{1}{2\\pi\\sqrt{LC}} \\approx 71{,}2\\ \\text{Hz}',
        },
        {
          label: "Quelle est l'intensité efficace à la résonance (en mA) ?",
          answer: {
            kind: 'number',
            value: 120,
            tolerance: 1,
            unit: 'mA',
          },
          steps: [
            'À la résonance, $Z = R$ (impédance minimale).',
            '$I_0 = \\dfrac{U}{R} = \\dfrac{12}{100} = 0{,}12$ A',
          ],
          result: 'I_0 = U/R = 120\\ \\text{mA}',
        },
        {
          label: 'Calcule le facteur de qualité $Q$.',
          answer: {
            kind: 'number',
            value: 2.236068,
            tolerance: 0.02,
            unit: '',
          },
          steps: [
            '$Q = \\dfrac{L\\omega_0}{R} = \\dfrac{0{,}5\\times 2\\pi\\times 71{,}2}{100} \\approx 2{,}24$',
          ],
          result: 'Q = \\frac{L\\omega_0}{R} \\approx 2{,}24',
        },
        {
          label: 'Calcule la tension efficace aux bornes du condensateur à la résonance (en V).',
          answer: {
            kind: 'number',
            value: 26.832816,
            tolerance: 0.3,
            unit: 'V',
          },
          steps: [
            '$U_C = \\dfrac{I_0}{C\\omega_0} = \\dfrac{U}{R C \\omega_0} = Q\\,U$',
            "$U_C \\approx 2{,}24\\times 12 \\approx 26{,}8$ V : plus que la tension du générateur ! C'est la **surtension** à la résonance.",
          ],
          result: 'U_C = Q\\,U \\approx 26{,}8\\ \\text{V}',
        },
      ],
    },
    {
      id: 'rlc-bande',
      level: 3,
      title: 'Bande passante et sélectivité',
      statement: 'Un circuit RLC série ($R = 20\\ \\Omega$, $L = 0{,}1$ H, $C = 1\\ \\mu$F) est alimenté sous une tension efficace $U = 5$ V de fréquence réglable.',
      given: [
        {
          label: 'R',
          value: '20 Ω',
        },
        {
          label: 'L',
          value: '0,1 H',
        },
        {
          label: 'C',
          value: '1 µF',
        },
        {
          label: 'U',
          value: '5 V',
        },
      ],
      parts: [
        {
          label: 'Calcule la fréquence de résonance $f_0$ (en Hz).',
          answer: {
            kind: 'number',
            value: 503.29212,
            tolerance: 1,
            unit: 'Hz',
          },
          steps: [
            '$f_0 = \\dfrac{1}{2\\pi\\sqrt{0{,}1\\times10^{-6}}} \\approx 503{,}3$ Hz',
          ],
          result: 'f_0 \\approx 503\\ \\text{Hz}',
        },
        {
          label: 'Calcule la largeur de la bande passante $\\Delta f = f_2 - f_1$ (en Hz).',
          answer: {
            kind: 'number',
            value: 31.830989,
            tolerance: 0.3,
            unit: 'Hz',
          },
          steps: [
            'Les fréquences de coupure $f_1$ et $f_2$ sont celles pour lesquelles $I = \\dfrac{I_0}{\\sqrt2}$.',
            'On montre que $\\Delta f = \\dfrac{R}{2\\pi L} = \\dfrac{20}{2\\pi\\times 0{,}1} \\approx 31{,}8$ Hz',
          ],
          result: '\\Delta f = \\frac{R}{2\\pi L} \\approx 31{,}8\\ \\text{Hz}',
        },
        {
          label: 'En déduire le facteur de qualité $Q$.',
          answer: {
            kind: 'number',
            value: 15.811388,
            tolerance: 0.2,
            unit: '',
          },
          steps: [
            '$Q = \\dfrac{f_0}{\\Delta f} \\approx \\dfrac{503{,}3}{31{,}8} \\approx 15{,}8$ : le circuit est sélectif.',
          ],
          result: 'Q = f_0/\\Delta f \\approx 15{,}8',
        },
        {
          label: 'Calcule la puissance moyenne consommée à la résonance (en W).',
          answer: {
            kind: 'number',
            value: 1.25,
            tolerance: 0.02,
            unit: 'W',
          },
          steps: [
            '$P = U I \\cos\\varphi$ ; à la résonance $\\cos\\varphi = 1$ et $I_0 = U/R$',
            '$P = \\dfrac{U^2}{R} = \\dfrac{25}{20} = 1{,}25$ W',
          ],
          result: 'P = \\frac{U^2}{R} = 1{,}25\\ \\text{W}',
        },
      ],
    },
  ],
  quiz: [],
  applications: [
    {
      title: "Pourquoi n'entend-on qu'une seule station ?",
      tagline: "La bande passante du circuit d'accord",
      situation: "L'antenne d'un poste radio AM reçoit en même temps toutes les stations. Le circuit d'accord est un RLC série avec R = 10 Ω et L = 250 µH.",
      model: 'Le circuit ne laisse passer un courant important que pour les fréquences comprises dans sa bande passante $\\Delta f = \\dfrac{R}{2\\pi L}$, autour de la résonance.',
      questions: [
        'Calcule la largeur de la bande passante (en kHz).',
      ],
      check: {
        value: 6.3661977,
        tolerance: 0.02,
        unit: 'kHz',
      },
      solution: [
        '$\\Delta f = \\dfrac{R}{2\\pi L}$',
        "A.N. : $\\Delta f = \\dfrac{10}{2\\pi\\times 250\\times10^{-6}} \\approx 6366$ Hz, soit 6,4 kHz : moins que l'écart entre deux stations.",
      ],
      fact: 'En ondes moyennes, deux stations voisines sont séparées de 9 kHz. Si la bande passante était plus large, on entendrait deux stations à la fois.',
    },
  ],
};
