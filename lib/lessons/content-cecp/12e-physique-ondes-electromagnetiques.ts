// Importé du site cecp (physique-3d, chapitre « ondes-electromagnetiques ») par scripts/import-cecp.ts.
// Une nouvelle importation remplace ce fichier.
import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook: "De la radio aux rayons γ : une seule et même famille d'ondes.",
  objectives: [],
  sections: [
    {
      title: "Nature de l'onde électromagnétique",
      blocks: [
        {
          kind: 'callout',
          variant: 'retenir',
          blocks: [
            {
              kind: 'list',
              items: [
                'Onde transversale, se propage dans le vide',
                '$c = \\lambda f = 3\\cdot10^8$ m/s',
                '$E = hf = hc/\\lambda$',
                'γ < X < UV < visible < IR < micro-ondes < radio (en λ)',
              ],
            },
          ],
        },
        {
          kind: 'text',
          text: "Un circuit oscillant relié à une antenne fait osciller des charges électriques. Elles produisent un champ électrique $\\vec E$ et un champ magnétique $\\vec B$ variables qui se propagent ensemble : c'est une **onde électromagnétique** (prévue par Maxwell en 1865, produite par Hertz en 1887).",
        },
        {
          kind: 'list',
          items: [
            "$\\vec E$ et $\\vec B$ sont perpendiculaires entre eux et à la direction de propagation : l'onde est **transversale**",
            '$\\vec E$ et $\\vec B$ oscillent en phase, à la même fréquence',
            'Elle se propage **même dans le vide**, contrairement aux ondes mécaniques (son, vagues)',
          ],
        },
      ],
    },
    {
      title: "Célérité, longueur d'onde, fréquence",
      blocks: [
        {
          kind: 'formula',
          tex: 'c = \\lambda f = \\frac{\\lambda}{T} \\qquad c = 3\\times10^8\\ \\text{m/s}',
          legend: [
            "$\\lambda$ : longueur d'onde (m)",
            '$f$ : fréquence (Hz)',
            "Dans un milieu d'indice $n$ : $v = c/n$",
          ],
        },
        {
          kind: 'text',
          text: "À chaque onde électromagnétique est associé un **photon** d'énergie $E = hf = \\dfrac{hc}{\\lambda}$ : plus la longueur d'onde est courte, plus le rayonnement est énergétique et dangereux pour les tissus vivants.",
        },
      ],
    },
    {
      title: 'Le spectre électromagnétique',
      blocks: [
        {
          kind: 'table',
          head: [
            'Domaine',
            "Longueur d'onde",
            'Exemples',
          ],
          rows: [
            [
              'Ondes radio',
              '> 1 m',
              'radio FM (≈ 3 m), télévision',
            ],
            [
              'Micro-ondes',
              '1 mm – 1 m',
              'four (12 cm), Wi-Fi, téléphone, radar',
            ],
            [
              'Infrarouge',
              '800 nm – 1 mm',
              'télécommande, caméra thermique',
            ],
            [
              'Visible',
              '400 – 800 nm',
              'violet → rouge',
            ],
            [
              'Ultraviolet',
              '10 – 400 nm',
              'soleil, lampes UV',
            ],
            [
              'Rayons X',
              '0,01 – 10 nm',
              'radiographie',
            ],
            [
              'Rayons γ',
              '< 0,01 nm',
              'radioactivité, radiothérapie',
            ],
          ],
        },
        {
          kind: 'callout',
          variant: 'attention',
          blocks: [
            {
              kind: 'text',
              text: "Les limites entre domaines ne sont pas strictes : ce sont des conventions. Seul le domaine visible est perçu par l'œil humain.",
            },
          ],
        },
      ],
    },
    {
      title: 'Émission et réception',
      blocks: [
        {
          kind: 'text',
          text: 'Pour émettre, on alimente une antenne par un circuit oscillant LC de fréquence $f = \\dfrac{1}{2\\pi\\sqrt{LC}}$. Pour recevoir une station, on accorde le circuit du récepteur sur la même fréquence (résonance) en réglant le condensateur.',
        },
        {
          kind: 'callout',
          variant: 'methode',
          blocks: [
            {
              kind: 'text',
              text: "Une antenne efficace a une longueur de l'ordre de $\\lambda/2$ ou $\\lambda/4$ : environ 75 cm pour la radio FM, quelques centimètres pour un téléphone.",
            },
          ],
        },
      ],
    },
  ],
  essentials: [],
  exercises: [
    {
      id: 'em-radio',
      level: 1,
      title: 'Ta station de radio FM',
      statement: 'Une station de radio émet sur la fréquence $f = 98{,}5$ MHz. On prend $c = 3\\cdot10^8$ m/s.',
      given: [
        {
          label: 'f',
          value: '98,5 MHz',
        },
        {
          label: 'c',
          value: '3·10⁸ m/s',
        },
      ],
      parts: [
        {
          label: "Calcule la longueur d'onde de cette onde radio.",
          answer: {
            kind: 'number',
            value: 3.0456853,
            tolerance: 0.01,
            unit: 'm',
          },
          steps: [
            '$\\lambda = \\dfrac{c}{f} = \\dfrac{3\\cdot10^8}{98{,}5\\cdot10^6} \\approx 3{,}05$ m',
          ],
          result: '\\lambda = \\frac{c}{f} \\approx 3{,}05\\ \\text{m}',
        },
        {
          label: "Une antenne « quart d'onde » mesure $\\lambda/4$. Quelle est sa longueur (en cm) ?",
          answer: {
            kind: 'number',
            value: 76.142132,
            tolerance: 0.5,
            unit: 'cm',
          },
          steps: [
            '$\\ell = \\dfrac{\\lambda}{4} \\approx 0{,}761$ m',
          ],
          result: '\\ell = \\frac{\\lambda}{4} \\approx 76\\ \\text{cm}',
        },
      ],
    },
    {
      id: 'em-microondes',
      level: 1,
      title: 'Le four à micro-ondes',
      statement: "Le four à micro-ondes utilise des ondes de longueur d'onde $\\lambda = 12{,}2$ cm qui font vibrer les molécules d'eau des aliments.",
      given: [
        {
          label: 'λ',
          value: '12,2 cm',
        },
        {
          label: 'c',
          value: '3·10⁸ m/s',
        },
      ],
      parts: [
        {
          label: 'Calcule la fréquence de ces ondes (en GHz).',
          answer: {
            kind: 'number',
            value: 2.4590164,
            tolerance: 0.01,
            unit: 'GHz',
          },
          steps: [
            '$f = \\dfrac{c}{\\lambda} = \\dfrac{3\\cdot10^8}{0{,}122} \\approx 2{,}46\\cdot10^{9}$ Hz',
          ],
          result: 'f = \\frac{c}{\\lambda} \\approx 2{,}46\\ \\text{GHz}',
        },
        {
          label: 'À quel domaine du spectre appartiennent-elles ?',
          answer: {
            kind: 'text',
            display: 'micro-ondes',
            accepted: [
              'micro-ondes',
              'microondes',
              'micro ondes',
              'les micro-ondes',
              'micro-onde',
            ],
          },
          steps: [
            "Les micro-ondes ont des longueurs d'onde comprises entre 1 mm et 1 m environ (fréquences de 300 MHz à 300 GHz). Le Wi-Fi utilise presque la même fréquence (2,4 GHz).",
          ],
          result: '\\text{micro-ondes}',
        },
      ],
    },
    {
      id: 'em-photon-x',
      level: 2,
      title: 'Du visible aux rayons X',
      statement: "On compare un photon de lumière visible ($\\lambda = 500$ nm, énergie ≈ 2,5 eV) et un photon X de longueur d'onde $\\lambda = 0{,}1$ nm. Puis on étudie le délai d'une liaison satellite : un satellite géostationnaire est à $36\\,000$ km.",
      given: [
        {
          label: 'h',
          value: '6,63·10⁻³⁴ J·s',
        },
        {
          label: '1 eV',
          value: '1,6·10⁻¹⁹ J',
        },
        {
          label: 'd',
          value: '36 000 km',
        },
      ],
      parts: [
        {
          label: "Calcule l'énergie du photon X (en keV).",
          answer: {
            kind: 'number',
            value: 12.43125,
            tolerance: 0.05,
            unit: 'keV',
          },
          steps: [
            '$E = \\dfrac{hc}{\\lambda} = \\dfrac{6{,}63\\cdot10^{-34} \\times 3\\cdot10^8}{10^{-10}} \\approx 1{,}99\\cdot10^{-15}$ J',
            "$E \\approx 12431$ eV $\\approx 12{,}4$ keV : 5 000 fois plus qu'un photon visible, d'où le danger des rayons X.",
          ],
          result: 'E = \\frac{hc}{\\lambda} \\approx 12{,}4\\ \\text{keV}',
        },
        {
          label: 'Combien de temps (en ms) met un signal pour aller de la Terre au satellite ?',
          answer: {
            kind: 'number',
            value: 120,
            tolerance: 0.5,
            unit: 'ms',
          },
          steps: [
            '$t = \\dfrac{d}{c} = \\dfrac{3{,}6\\cdot10^7}{3\\cdot10^8} = 0{,}12$ s',
          ],
          result: 't = \\frac{d}{c} = 120\\ \\text{ms}',
        },
      ],
    },
  ],
  quiz: [],
  applications: [
    {
      title: "L'antenne de ton téléphone",
      tagline: 'Pourquoi tient-elle dans la poche ?',
      situation: "En 4G, ton téléphone communique avec l'antenne-relais du quartier sur une fréquence d'environ 800 MHz. Son antenne interne est de type « quart d'onde ».",
      model: 'Les ondes du téléphone sont des ondes électromagnétiques (micro-ondes) de célérité $c = 3\\times10^8$ m/s. Une antenne efficace mesure environ $\\lambda/4$.',
      questions: [
        "Calcule la longueur d'une antenne quart d'onde (en cm).",
      ],
      check: {
        value: 9.375,
        tolerance: 0.02,
        unit: 'cm',
      },
      solution: [
        '$\\lambda = \\dfrac{c}{f} = \\dfrac{3\\times10^8}{8\\times10^8} = 0,375$ m',
        '$\\ell = \\dfrac{\\lambda}{4} \\approx 9,4$ cm',
      ],
      fact: "Les vieux téléphones des années 1990 avaient une antenne qui dépassait du boîtier ; aujourd'hui elle est repliée en zigzag sur le circuit imprimé.",
    },
    {
      title: 'La lumière du Soleil arrive en retard',
      tagline: 'Quand tu regardes le Soleil, tu le vois dans le passé.',
      situation: "La lumière, les infrarouges et les UV du Soleil traversent le vide spatial jusqu'à nous. La distance Terre-Soleil vaut environ $1{,}5\\times10^{11}$ m.",
      model: "Toutes les ondes électromagnétiques se propagent dans le vide à la même célérité $c = 3\\times10^8$ m/s, quelle que soit leur longueur d'onde.",
      questions: [
        'Combien de minutes la lumière met-elle pour venir du Soleil ?',
      ],
      check: {
        value: 8.3333333,
        tolerance: 0.02,
        unit: 'min',
      },
      solution: [
        '$t = \\dfrac{d}{c} = \\dfrac{1{,}5\\times10^{11}}{3\\times10^8} = 500$ s',
        'soit 8,33 minutes',
      ],
      fact: "Si le Soleil s'éteignait brusquement, nous continuerions à le voir briller pendant plusieurs minutes.",
    },
  ],
};
