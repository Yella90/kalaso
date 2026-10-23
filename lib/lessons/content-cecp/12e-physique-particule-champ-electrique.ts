// Importé du site cecp (physique-3d, chapitre « particule-chargee ») par scripts/import-cecp.ts.
// Une nouvelle importation remplace ce fichier.
import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook: "Mouvement d'un électron ou d'un proton entre les plaques d'un condensateur.",
  objectives: [],
  sections: [
    {
      title: 'Champ électrique uniforme',
      blocks: [
        {
          kind: 'text',
          text: "D'après DAVID DIARRA - Prébac Sciences Physiques, chapitre 4.",
        },
        {
          kind: 'text',
          text: "Entre les armatures A (+) et B (-) d'un condensateur charge, il existe un champ électrique uniforme $\\vec{E}$ :",
        },
        {
          kind: 'list',
          items: [
            'Direction : perpendiculaire aux armatures',
            'Sens : de la plaque + vers la plaque -',
            'Norme : $E = \\dfrac{U}{d}$',
          ],
        },
      ],
    },
    {
      title: 'Force électrique',
      blocks: [
        {
          kind: 'text',
          text: 'Une particule de charge q soumise à $\\vec{E}$ subit la force :',
        },
        {
          kind: 'formula',
          tex: '\\vec{F} = q\\vec{E}',
        },
        {
          kind: 'callout',
          variant: 'retenir',
          blocks: [
            {
              kind: 'text',
              text: 'Sens : celui de $\\vec{E}$ si q > 0, oppose si q < 0.',
            },
          ],
        },
      ],
    },
    {
      title: 'Électron entrant horizontalement',
      blocks: [
        {
          kind: 'text',
          text: 'Un électron (charge q = -e, masse m) entre avec une vitesse horizontale $v_0$ à mi-distance des plaques.',
        },
        {
          kind: 'text',
          text: 'Accélération : $a = \\dfrac{eE}{m} = \\dfrac{eU}{md}$ (dirigée vers la plaque +).',
        },
        {
          kind: 'text',
          text: 'Équations horaires :',
        },
        {
          kind: 'formula',
          tex: 'x(t) = v_0\\, t',
        },
        {
          kind: 'formula',
          tex: 'y(t) = \\frac{1}{2}\\,\\frac{eU}{md}\\,t^2',
        },
        {
          kind: 'text',
          text: 'Trajectoire :',
        },
        {
          kind: 'formula',
          tex: 'y = \\frac{eU}{2\\,m\\,d\\,v_0^2}\\,x^2',
        },
        {
          kind: 'callout',
          variant: 'attention',
          blocks: [
            {
              kind: 'text',
              text: 'Trajectoire **parabolique**, orientée vers la plaque +.',
            },
          ],
        },
      ],
    },
    {
      title: 'Condition de sortie',
      blocks: [
        {
          kind: 'text',
          text: "L'électron sort du condensateur s'il ne frappe pas une plaque à la sortie (x = l) :",
        },
        {
          kind: 'formula',
          tex: 'y_S < \\frac{d}{2} \\quad\\Longrightarrow\\quad U < \\frac{m\\,d^2\\,v_0^2}{e\\,l^2}',
        },
      ],
    },
    {
      title: 'Oscilloscope - vitesse initiale',
      blocks: [
        {
          kind: 'text',
          text: "Dans un oscilloscope, les électrons sont accélérés entre la cathode et l'anode par une tension $U_0$. Le théorème de l'énergie cinétique donne :",
        },
        {
          kind: 'formula',
          tex: '\\frac{1}{2}m\\,v_0^2 = e\\,U_0 \\quad\\Longrightarrow\\quad v_0 = \\sqrt{\\frac{2e\\,U_0}{m}}',
        },
      ],
    },
    {
      title: "Déflexion sur l'écran",
      blocks: [
        {
          kind: 'text',
          text: "Le spot sur l'écran situé à la distance D de la sortie subit une déflexion Y :",
        },
        {
          kind: 'formula',
          tex: 'Y = \\frac{e\\,U\\,\\ell\\,D}{m\\,d\\,v_0^2}',
        },
      ],
    },
    {
      title: 'Proton lanceé avec un angle alpha',
      blocks: [
        {
          kind: 'text',
          text: "Pour un proton (charge +e), la force est dirigée dans le sens de $\\vec{E}$. Avec une vitesse initiale inclinée d'un angle alpha :",
        },
        {
          kind: 'formula',
          tex: 'x(t) = (v_0\\cos\\alpha)\\,t',
        },
        {
          kind: 'formula',
          tex: 'y(t) = (v_0\\sin\\alpha)\\,t - \\frac{1}{2}\\,\\frac{eU}{m\\,d}\\,t^2',
        },
        {
          kind: 'text',
          text: "Le proton décrit une parabole qui s'ouvre vers le bas (vers la plaque -).",
        },
      ],
    },
  ],
  essentials: [],
  exercises: [
    {
      id: 'electron-plaque',
      level: 2,
      title: 'Électron dans un condensateur',
      statement: "Un électron est injecté à mi-distance des armatures d'un condensateur avec une vitesse v0 = 1e7 m/s parallèle aux plaques. La longueur des armatures est l = 4 cm, la distance qui les sépare est d = 2 cm. On donne e = 1,6.10^-19 C, m = 9,1.10^-31 kg.",
      given: [
        {
          label: 'v0',
          value: '10^7 m/s',
        },
        {
          label: 'l',
          value: '4 cm = 0,04 m',
        },
        {
          label: 'd',
          value: '2 cm = 0,02 m',
        },
        {
          label: 'e',
          value: '1,6.10^-19 C',
        },
        {
          label: 'm',
          value: '9,1.10^-31 kg',
        },
      ],
      parts: [
        {
          label: "Quelle est la valeur maximale de U (en V) pour que l'électron sorte sans toucher une plaque ?",
          answer: {
            kind: 'number',
            value: 142,
            tolerance: 5,
            unit: 'V',
          },
          steps: [
            'Condition de sortie : $U < \\dfrac{m\\,d^2\\,v_0^2}{e\\,\\ell^2}$',
            'Numérateur : $m\\,d^2\\,v_0^2 = 9{,}1 \\times 10^{-31} \\times (0{,}02)^2 \\times (10^7)^2 = 3{,}64 \\times 10^{-18}$',
            'Dénominateur : $e\\,\\ell^2 = 1{,}6 \\times 10^{-19} \\times (0{,}04)^2 = 2{,}56 \\times 10^{-22}$',
            '$U_{max} = \\dfrac{3{,}64 \\times 10^{-18}}{2{,}56 \\times 10^{-22}} \\approx 142\\ \\text{V}$',
          ],
          result: 'U < \\frac{m\\,d^2\\,v_0^2}{e\\,\\ell^2} \\approx 142\\ \\text{V}',
        },
      ],
    },
    {
      id: 'oscilloscope',
      level: 2,
      title: 'Oscilloscope',
      statement: 'Dans un oscilloscope, les électrons sont accélérés par une tension U0 = 285 V. Ils entrent ensuite entre les plaques de déviation (l = 4 cm, d = 2 cm, D = 20 cm). On donne e = 1,6.10^-19 C, m = 9,1.10^-31 kg.',
      given: [
        {
          label: 'U0',
          value: '285 V',
        },
        {
          label: 'l',
          value: '4 cm',
        },
        {
          label: 'd',
          value: '2 cm',
        },
        {
          label: 'D',
          value: '20 cm',
        },
      ],
      parts: [
        {
          label: "Quelle est la vitesse v0 (en 10^7 m/s) des électrons à la sortie de l'anode ?",
          answer: {
            kind: 'number',
            value: 1,
            tolerance: 0.1,
            unit: '10^7 m/s',
          },
          steps: [
            "Théorème de l'énergie cinétique : $\\dfrac{1}{2}\\,m\\,v_0^2 = e\\,U_0$",
            '$v_0 = \\sqrt{\\dfrac{2\\,e\\,U_0}{m}} = \\sqrt{\\dfrac{2 \\times 1{,}6 \\times 10^{-19} \\times 285}{9{,}1 \\times 10^{-31}}}$',
            '$v_0 \\approx 10^7\\ \\text{m/s}$',
          ],
          result: 'v_0 = \\sqrt{\\frac{2\\,e\\,U_0}{m}} \\approx 10^7\\ \\text{m/s}',
        },
      ],
    },
  ],
  quiz: [],
  applications: [],
};
