// Importé du site cecp (physique-3d, chapitre « oscillations-mecaniques-forcees ») par scripts/import-cecp.ts.
// Une nouvelle importation remplace ce fichier.
import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook: 'Quand un oscillateur est entretenu par une force périodique extérieure.',
  objectives: [],
  sections: [
    {
      title: 'Excitateur et résonateur',
      blocks: [
        {
          kind: 'callout',
          variant: 'retenir',
          blocks: [
            {
              kind: 'list',
              items: [
                "Régime permanent : fréquence de l'excitateur",
                '$X = F_0/\\sqrt{(k - m\\omega^2)^2 + h^2\\omega^2}$',
                'Résonance pour $\\omega_r \\approx \\omega_0$',
                '$Q = m\\omega_0/h$',
              ],
            },
          ],
        },
        {
          kind: 'text',
          text: "Un oscillateur amorti (ressort + masse, frottement fluide $-h\\vec v$) finit par s'arrêter. Pour entretenir ses oscillations, on lui impose une force périodique à l'aide d'un **excitateur** (moteur muni d'un excentrique). L'oscillateur est alors appelé **résonateur**.",
        },
        {
          kind: 'formula',
          tex: 'm\\ddot x + h\\dot x + kx = F_0\\cos(\\omega t)',
          label: 'Équation du mouvement',
          legend: [
            "$\\omega$ : pulsation imposée par l'excitateur",
            '$\\omega_0 = \\sqrt{k/m}$ : pulsation propre du résonateur',
          ],
        },
      ],
    },
    {
      title: 'Régime transitoire et régime permanent',
      blocks: [
        {
          kind: 'text',
          text: "Au démarrage, le mouvement est compliqué (régime transitoire). Au bout de quelques secondes, le résonateur oscille **à la fréquence de l'excitateur** (et non à sa fréquence propre) : c'est le régime permanent.",
        },
        {
          kind: 'formula',
          tex: 'x(t) = X\\cos(\\omega t - \\varphi) \\qquad X = \\frac{F_0}{\\sqrt{(k - m\\omega^2)^2 + h^2\\omega^2}}',
          legend: [
            '$X$ : amplitude (dépend de $\\omega$)',
            "$\\varphi$ : retard du résonateur sur l'excitateur, $\\tan\\varphi = \\dfrac{h\\omega}{k - m\\omega^2}$",
          ],
        },
      ],
    },
    {
      title: "La résonance d'amplitude",
      blocks: [
        {
          kind: 'text',
          text: "Quand la fréquence de l'excitateur s'approche de la fréquence propre, l'amplitude devient très grande : c'est la **résonance**. Elle est maximale pour :",
        },
        {
          kind: 'formula',
          tex: '\\omega_r = \\sqrt{\\omega_0^2 - \\frac{h^2}{2m^2}} \\approx \\omega_0 \\ \\text{(amortissement faible)}',
        },
        {
          kind: 'list',
          items: [
            "Basse fréquence ($\\omega \\to 0$) : $X \\to F_0/k$ et le résonateur suit l'excitateur en phase",
            'À $\\omega_0$ : $X = \\dfrac{F_0}{h\\omega_0}$ et le résonateur est en quadrature retard ($\\varphi = \\pi/2$)',
            'Haute fréquence : $X \\to 0$ et le résonateur est en opposition de phase',
          ],
        },
        {
          kind: 'text',
          text: "Le **facteur de qualité** $Q = \\dfrac{m\\omega_0}{h}$ mesure l'acuité de la résonance : $X(\\omega_0) = Q \\times \\dfrac{F_0}{k}$. Faible amortissement : résonance aiguë ; fort amortissement ($h > \\sqrt2\\,m\\omega_0$) : plus de résonance.",
        },
      ],
    },
    {
      title: 'Dans la vie réelle',
      blocks: [
        {
          kind: 'callout',
          variant: 'attention',
          blocks: [
            {
              kind: 'text',
              text: "Des troupes qui marchent au pas sur un pont, un vent régulier, une machine qui tourne : si leur fréquence est proche de la fréquence propre d'une structure, la résonance peut la détruire (pont de Tacoma, 1940). On ajoute alors des amortisseurs.",
            },
          ],
        },
        {
          kind: 'callout',
          variant: 'methode',
          blocks: [
            {
              kind: 'text',
              text: "La résonance est aussi utile : balançoire poussée au bon rythme, caisse de résonance d'une guitare ou d'un balafon, four à micro-ondes (résonance des molécules d'eau).",
            },
          ],
        },
      ],
    },
  ],
  essentials: [],
  exercises: [
    {
      id: 'fm-resonateur',
      level: 1,
      title: 'Excitateur et résonateur',
      statement: "Un solide de masse $m = 250$ g, accroché à un ressort de raideur $k = 25$ N/m, est soumis par un excitateur (moteur + excentrique) à une force sinusoïdale d'amplitude $F_0 = 0{,}4$ N. Les frottements fluides ont pour coefficient $h = 0{,}5$ kg/s.",
      given: [
        {
          label: 'm',
          value: '250 g',
        },
        {
          label: 'k',
          value: '25 N/m',
        },
        {
          label: 'F0',
          value: '0,4 N',
        },
        {
          label: 'h',
          value: '0,5 kg/s',
        },
      ],
      parts: [
        {
          label: 'Calcule la fréquence propre $N_0$ du résonateur.',
          answer: {
            kind: 'number',
            value: 1.5915494,
            tolerance: 0.01,
            unit: 'Hz',
          },
          steps: [
            '$\\omega_0 = \\sqrt{k/m} = \\sqrt{25/0{,}25} = 10$ rad/s',
            '$N_0 = \\dfrac{\\omega_0}{2\\pi} \\approx 1{,}59$ Hz',
          ],
          result: 'N_0 = \\frac{1}{2\\pi}\\sqrt{\\frac{k}{m}} \\approx 1{,}59\\ \\text{Hz}',
        },
        {
          label: "Quelle est l'amplitude (en cm) quand l'excitateur tourne très lentement ?",
          answer: {
            kind: 'number',
            value: 1.6,
            tolerance: 0.05,
            unit: 'cm',
          },
          steps: [
            "Pour $\\omega \\to 0$, la force varie lentement : le ressort s'allonge comme sous une force constante",
            '$X_0 = \\dfrac{F_0}{k} = \\dfrac{0{,}4}{25} = 0{,}016$ m',
          ],
          result: 'X_0 = \\frac{F_0}{k} = 1{,}6\\ \\text{cm}',
        },
        {
          label: 'Quel nom donne-t-on au phénomène observé quand $N \\approx N_0$ ?',
          answer: {
            kind: 'text',
            display: 'résonance',
            accepted: [
              'resonance',
              'la resonance',
              "resonance d'amplitude",
            ],
          },
          steps: [
            "Quand la fréquence de l'excitateur est proche de la fréquence propre, l'amplitude devient très grande : c'est la résonance d'amplitude.",
          ],
          result: '\\text{résonance}',
        },
      ],
    },
    {
      id: 'fm-amplitude',
      level: 2,
      title: 'Amplitude à la résonance',
      source: 'Type bac',
      statement: "On reprend le résonateur de l'exercice 1. En régime permanent, l'amplitude vaut $X = \\dfrac{F_0}{\\sqrt{(k - m\\omega^2)^2 + h^2\\omega^2}}$.",
      given: [
        {
          label: 'm',
          value: '250 g',
        },
        {
          label: 'k',
          value: '25 N/m',
        },
        {
          label: 'F0',
          value: '0,4 N',
        },
        {
          label: 'h',
          value: '0,5 kg/s',
        },
      ],
      parts: [
        {
          label: "Calcule l'amplitude (en cm) quand l'excitateur impose $\\omega = \\omega_0 = 10$ rad/s.",
          answer: {
            kind: 'number',
            value: 8,
            tolerance: 0.05,
            unit: 'cm',
          },
          steps: [
            'À $\\omega = \\omega_0$ : $k - m\\omega_0^2 = 0$',
            '$X = \\dfrac{F_0}{h\\omega_0} = \\dfrac{0{,}4}{0{,}5 \\times 10} = 0{,}08$ m',
            "Elle est 5 fois plus grande que l'amplitude à basse fréquence !",
          ],
          result: 'X = \\frac{F_0}{h\\,\\omega_0} = 8\\ \\text{cm}',
        },
        {
          label: 'Calcule le facteur de qualité $Q = \\dfrac{m\\omega_0}{h}$.',
          answer: {
            kind: 'number',
            value: 5,
            tolerance: 0.05,
            unit: '',
          },
          steps: [
            '$Q = \\dfrac{0{,}25 \\times 10}{0{,}5} = 5{,}0$',
            'On remarque que $X_{res} \\approx Q \\times X_0$ : plus $Q$ est grand, plus la résonance est aiguë.',
          ],
          result: 'Q = \\frac{m\\omega_0}{h} = 5',
        },
      ],
    },
    {
      id: 'fm-pont',
      level: 3,
      title: 'La pulsation de résonance',
      source: 'Type concours',
      statement: "Pour le même résonateur, on montre que l'amplitude est maximale pour $\\omega_r = \\sqrt{\\omega_0^2 - \\dfrac{h^2}{2m^2}}$. Une passerelle piétonne obéit à la même loi : il faut éviter que le pas des marcheurs (environ 2 Hz) soit proche de sa fréquence de résonance.",
      given: [
        {
          label: 'ω0',
          value: '10 rad/s',
        },
        {
          label: 'h',
          value: '0,5 kg/s',
        },
        {
          label: 'm',
          value: '250 g',
        },
      ],
      parts: [
        {
          label: 'Calcule la pulsation de résonance $\\omega_r$ (rad/s, 3 décimales).',
          answer: {
            kind: 'number',
            value: 9.8994949,
            tolerance: 0.002,
            unit: 'rad/s',
          },
          steps: [
            '$\\dfrac{h^2}{2m^2} = \\dfrac{0{,}25}{2 \\times 0{,}0625} = 2$ rad²/s²',
            "$\\omega_r = \\sqrt{100 - 2} \\approx 9{,}899$ rad/s, très proche de $\\omega_0$ car l'amortissement est faible.",
          ],
          result: '\\omega_r = \\sqrt{\\omega_0^2 - \\frac{h^2}{2m^2}} \\approx 9{,}899\\ \\text{rad/s}',
        },
        {
          label: "Au-delà de quelle valeur de $h$ (kg/s, 2 décimales) n'y a-t-il plus de résonance d'amplitude ?",
          answer: {
            kind: 'number',
            value: 3.5355339,
            tolerance: 0.01,
            unit: 'kg/s',
          },
          steps: [
            'Il faut $\\omega_0^2 - \\dfrac{h^2}{2m^2} > 0$, soit $h < m\\omega_0\\sqrt{2}$',
            '$h_{lim} = 0{,}25 \\times 10 \\times \\sqrt2 \\approx 3{,}54$ kg/s',
          ],
          result: 'h_{lim} = \\sqrt{2}\\,m\\,\\omega_0 \\approx 3{,}54\\ \\text{kg/s}',
        },
      ],
    },
  ],
  quiz: [],
  applications: [
    {
      title: 'La passerelle qui tremble',
      tagline: 'Pourquoi interdit-on aux soldats de marcher au pas sur un pont ?',
      situation: 'On modélise une passerelle piétonne par un oscillateur de masse effective $m = 50$ t et de raideur $k = 8\\times10^6$ N/m. Des piétons marchent dessus à environ 2 pas par seconde.',
      model: "Les pas des marcheurs jouent le rôle d'excitateur. Si leur fréquence est proche de la fréquence propre de la passerelle, l'amplitude des oscillations devient très grande : c'est la résonance.",
      questions: [
        'Calcule la fréquence propre N₀ de la passerelle (en Hz). Y a-t-il un risque ?',
      ],
      check: {
        value: 2.0131685,
        tolerance: 0.02,
        unit: 'Hz',
      },
      solution: [
        '$N_0 = \\dfrac{1}{2\\pi}\\sqrt{\\dfrac{k}{m}}$',
        '$N_0 = \\dfrac{1}{2\\pi}\\sqrt{\\dfrac{8\\times10^6}{5\\times10^4}} \\approx 2,01$ Hz',
        "C'est presque exactement le rythme de la marche (2 Hz) : risque de résonance, il faut ajouter des amortisseurs.",
      ],
      fact: "En 2000, le Millennium Bridge de Londres a dû fermer deux jours après son inauguration : il oscillait sous les pas de la foule. On l'a équipé d'amortisseurs.",
    },
    {
      title: 'La machine à laver qui saute',
      tagline: 'Pourquoi tremble-t-elle à une certaine vitesse ?',
      situation: "Le tambour d'une machine à laver (40 kg avec le linge mouillé) est suspendu par des ressorts de raideur totale $k = 1{,}6\\times10^5$ N/m. Le linge mal réparti fait tourner un balourd qui excite la suspension.",
      model: "Le balourd tourne à la vitesse du tambour : c'est un excitateur de fréquence $N = n$ (tours par seconde). Quand $N$ passe par la fréquence propre, la machine vibre très fort.",
      questions: [
        'À quelle vitesse du tambour (en tr/min) la machine entre-t-elle en résonance ?',
      ],
      check: {
        value: 603.95055,
        tolerance: 0.02,
        unit: 'tr/min',
      },
      solution: [
        '$N_0 = \\dfrac{1}{2\\pi}\\sqrt{\\dfrac{k}{m}} = \\dfrac{1}{2\\pi}\\sqrt{\\dfrac{1{,}6\\times10^5}{40}} \\approx 10,07$ Hz',
        '$n = 60\\,N_0 \\approx 604$ tr/min',
      ],
      fact: "Les machines modernes accélèrent vite pour traverser rapidement la zone de résonance, et leurs amortisseurs limitent l'amplitude.",
    },
  ],
};
