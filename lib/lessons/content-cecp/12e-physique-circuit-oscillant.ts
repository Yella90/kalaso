// Importé du site cecp (physique-3d, chapitre « circuit-oscillant ») par scripts/import-cecp.ts.
// Une nouvelle importation remplace ce fichier.
import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook: "Échanges d'énergie entre un condensateur et une bobine.",
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
                '$\\ddot{q} + \\dfrac{1}{LC}q = 0$ ; $T_0 = 2\\pi\\sqrt{LC}$',
                '$E = \\dfrac{Q_m^2}{2C} = \\tfrac12 L I_m^2$ se conserve sans résistance',
                "Application : circuit d'accord d'un poste radio",
              ],
            },
          ],
        },
        {
          kind: 'text',
          text: "Un condensateur de capacité $C$, préalablement chargé sous la tension $U_0$ (charge $Q_m = C U_0$), est relié à $t = 0$ à une bobine d'inductance $L$ de résistance négligeable. On observe à l'oscilloscope une tension $u_C$ sinusoïdale : le circuit oscille librement.",
        },
      ],
    },
    {
      title: 'Équation différentielle',
      blocks: [
        {
          kind: 'list',
          items: [
            'Loi des mailles : $u_C + u_L = 0$ avec $u_C = \\dfrac{q}{C}$, $i = \\dfrac{dq}{dt}$ et $u_L = L\\dfrac{di}{dt} = L\\ddot{q}$.',
            'On obtient $L\\ddot{q} + \\dfrac{q}{C} = 0$.',
          ],
        },
        {
          kind: 'formula',
          tex: '\\ddot{q} + \\omega_0^2\\,q = 0 \\qquad \\omega_0 = \\frac{1}{\\sqrt{LC}}',
          label: "Équation de l'oscillateur électrique",
        },
        {
          kind: 'text',
          text: "C'est exactement la même équation que celle du pendule élastique : $q$ joue le rôle de $x$, $L$ celui de la masse $m$ et $1/C$ celui de la raideur $k$.",
        },
      ],
    },
    {
      title: 'Solution et période propre',
      blocks: [
        {
          kind: 'formula',
          tex: 'q(t) = Q_m\\cos(\\omega_0 t + \\varphi) \\qquad T_0 = 2\\pi\\sqrt{LC}',
          legend: [
            'Formule de Thomson',
            '$i(t) = -Q_m\\omega_0\\sin(\\omega_0 t + \\varphi)$',
            '$I_m = Q_m\\,\\omega_0$',
            '$f_0 = \\dfrac{1}{2\\pi\\sqrt{LC}}$',
          ],
        },
        {
          kind: 'text',
          text: "Si le condensateur est chargé et le courant nul à $t = 0$ : $\\varphi = 0$. L'intensité est en quadrature avance sur la charge.",
        },
      ],
    },
    {
      title: 'Étude énergétique',
      blocks: [
        {
          kind: 'formula',
          tex: 'E = \\underbrace{\\frac{q^2}{2C}}_{\\text{condensateur}} + \\underbrace{\\tfrac12 L i^2}_{\\text{bobine}} = \\frac{Q_m^2}{2C} = \\tfrac12 L I_m^2 = \\text{constante}',
        },
        {
          kind: 'text',
          text: "L'énergie passe du condensateur (énergie électrique) à la bobine (énergie magnétique) deux fois par période. En dérivant $E$ par rapport au temps, on retrouve l'équation différentielle.",
        },
      ],
    },
    {
      title: 'Oscillations amorties (circuit RLC)',
      blocks: [
        {
          kind: 'list',
          items: [
            "Une bobine réelle a une résistance : l'équation devient $L\\ddot{q} + R\\dot{q} + \\dfrac{q}{C} = 0$ et l'énergie diminue par effet Joule.",
            'Faible résistance : régime **pseudo-périodique** (pseudo-période $T \\approx T_0$).',
            'Résistance critique $R_c = 2\\sqrt{L/C}$ : régime critique (retour le plus rapide sans oscillation).',
            "$R > R_c$ : régime **apériodique**, pas d'oscillation.",
            "Pour entretenir les oscillations, on compense les pertes par un dispositif qui fournit de l'énergie (montage à « résistance négative »).",
          ],
        },
      ],
    },
  ],
  essentials: [],
  exercises: [
    {
      id: 'lc-decharge',
      level: 1,
      title: "Décharge d'un condensateur dans une bobine",
      statement: "Un condensateur de capacité $C = 2\\ \\mu$F est chargé sous la tension $U_0 = 10$ V puis relié, à $t = 0$, à une bobine d'inductance $L = 0{,}5$ H de résistance négligeable.",
      given: [
        {
          label: 'C',
          value: '2 µF',
        },
        {
          label: 'U₀',
          value: '10 V',
        },
        {
          label: 'L',
          value: '0,5 H',
        },
      ],
      parts: [
        {
          label: 'Calcule la charge initiale $Q_m$ du condensateur (en µC).',
          answer: {
            kind: 'number',
            value: 20,
            tolerance: 0.2,
            unit: 'µC',
          },
          steps: [
            '$Q_m = C\\,U_0 = 2\\times10^{-6}\\times 10 = 20\\times10^{-6}$ C',
          ],
          result: 'Q_m = CU_0 = 20\\ \\mu\\text{C}',
        },
        {
          label: 'Calcule la période propre $T_0$ des oscillations (en ms).',
          answer: {
            kind: 'number',
            value: 6.2831853,
            tolerance: 0.03,
            unit: 'ms',
          },
          steps: [
            'Loi des mailles : $L\\ddot{q} + \\dfrac{q}{C} = 0$, soit $\\ddot{q} + \\omega_0^2 q = 0$ avec $\\omega_0 = \\dfrac{1}{\\sqrt{LC}}$',
            'Formule de Thomson : $T_0 = 2\\pi\\sqrt{LC} = 2\\pi\\sqrt{0{,}5\\times 2\\times10^{-6}} \\approx 6{,}28\\times10^{-3}$ s',
          ],
          result: 'T_0 = 2\\pi\\sqrt{LC} \\approx 6{,}28\\ \\text{ms}',
        },
        {
          label: "Calcule l'énergie totale du circuit (en µJ).",
          answer: {
            kind: 'number',
            value: 100,
            tolerance: 1,
            unit: 'µJ',
          },
          steps: [
            "À $t = 0$, toute l'énergie est dans le condensateur ($i = 0$).",
            '$E = \\tfrac12 C U_0^2 = \\tfrac12\\times 2\\times10^{-6}\\times 10^2 = 100\\times10^{-6}$ J',
          ],
          result: 'E = \\tfrac12 C U_0^2 = 100\\ \\mu\\text{J}',
        },
        {
          label: "En déduire l'intensité maximale $I_m$ (en mA).",
          answer: {
            kind: 'number',
            value: 20,
            tolerance: 0.2,
            unit: 'mA',
          },
          steps: [
            "Conservation de l'énergie : $\\tfrac12 L I_m^2 = \\tfrac12 \\dfrac{Q_m^2}{C}$ donc $I_m = \\dfrac{Q_m}{\\sqrt{LC}} = Q_m\\,\\omega_0$",
            '$I_m = 2\\times10^{-5}\\times 1000 = 20\\times10^{-3}$ A',
          ],
          result: 'I_m = Q_m\\omega_0 = 20\\ \\text{mA}',
        },
      ],
    },
    {
      id: 'lc-radio',
      level: 2,
      title: "Accord d'un récepteur radio",
      statement: "Le circuit d'accord d'un poste radio est un circuit LC. La bobine a une inductance $L = 250\\ \\mu$H ; la capacité $C$ du condensateur est réglable. On veut capter une station qui émet à $f = 800$ kHz. On prend $c = 3\\times10^8$ m/s.",
      given: [
        {
          label: 'L',
          value: '250 µH',
        },
        {
          label: 'f',
          value: '800 kHz',
        },
        {
          label: 'c',
          value: '3×10⁸ m/s',
        },
      ],
      parts: [
        {
          label: 'Quelle capacité faut-il régler (en pF) ?',
          answer: {
            kind: 'number',
            value: 158.31435,
            tolerance: 2,
            unit: 'pF',
          },
          steps: [
            "Le poste capte la station quand la fréquence propre du circuit est égale à celle de l'émetteur : $f = \\dfrac{1}{2\\pi\\sqrt{LC}}$",
            '$C = \\dfrac{1}{4\\pi^2 f^2 L} = \\dfrac{1}{4\\pi^2\\times(8\\times10^5)^2\\times 2{,}5\\times10^{-4}} \\approx 158\\times10^{-12}$ F',
          ],
          result: 'C = \\frac{1}{4\\pi^2 f^2 L} \\approx 158\\ \\text{pF}',
        },
        {
          label: "La capacité peut monter jusqu'à 500 pF. Quelle est alors la fréquence captée (en kHz) ?",
          answer: {
            kind: 'number',
            value: 450.15816,
            tolerance: 3,
            unit: 'kHz',
          },
          steps: [
            '$f = \\dfrac{1}{2\\pi\\sqrt{2{,}5\\times10^{-4}\\times 5\\times10^{-10}}} \\approx 450$ kHz',
          ],
          result: 'f_{min} \\approx 450\\ \\text{kHz}',
        },
        {
          label: "Quelle est la longueur d'onde de la station à 800 kHz (en m) ?",
          answer: {
            kind: 'number',
            value: 375,
            tolerance: 2,
            unit: 'm',
          },
          steps: [
            '$\\lambda = \\dfrac{c}{f} = \\dfrac{3\\times10^8}{8\\times10^5} = 375$ m (ondes moyennes)',
          ],
          result: '\\lambda = c/f = 375\\ \\text{m}',
        },
      ],
    },
    {
      id: 'lc-energie',
      level: 3,
      title: 'Bilan énergétique et amortissement',
      statement: "Un condensateur ($C = 1\\ \\mu$F), chargé sous $U_0 = 6$ V, se décharge dans une bobine idéale ($L = 0{,}1$ H). On note $q$ la charge de l'armature reliée au point A et $i = \\dfrac{dq}{dt}$.",
      given: [
        {
          label: 'C',
          value: '1 µF',
        },
        {
          label: 'U₀',
          value: '6 V',
        },
        {
          label: 'L',
          value: '0,1 H',
        },
      ],
      parts: [
        {
          label: "Écris l'équation différentielle vérifiée par $q$. Forme attendue : q'' + q/(LC) = 0",
          answer: {
            kind: 'text',
            display: "q'' + q/(LC) = 0",
            accepted: [
              "q''+q/(LC)=0",
              "q''+q/LC=0",
              "q''+(1/(LC))q=0",
              "q''+(1/LC)q=0",
              'd2q/dt2+q/(LC)=0',
              "q''+(1/(LC))*q=0",
              "q''=-q/(LC)",
            ],
          },
          steps: [
            'Loi des mailles : $u_C + u_L = 0$ avec $u_C = \\dfrac{q}{C}$ et $u_L = L\\dfrac{di}{dt} = L\\ddot{q}$',
            "D'où $L\\ddot{q} + \\dfrac{q}{C} = 0$",
          ],
          result: '\\ddot{q} + \\frac{1}{LC}\\,q = 0',
        },
        {
          label: "Calcule l'intensité (en mA) à l'instant où la tension du condensateur vaut $U_0/2$.",
          answer: {
            kind: 'number',
            value: 16.431677,
            tolerance: 0.2,
            unit: 'mA',
          },
          steps: [
            "Conservation de l'énergie : $\\tfrac12 C U_0^2 = \\tfrac12 C u^2 + \\tfrac12 L i^2$",
            'Avec $u = U_0/2$ : $L i^2 = C\\left(U_0^2 - \\dfrac{U_0^2}{4}\\right) = \\dfrac34 C U_0^2$',
            '$i = U_0\\sqrt{\\dfrac{3C}{4L}} = 6\\sqrt{\\dfrac{3\\times10^{-6}}{0{,}4}} \\approx 16{,}4\\times10^{-3}$ A',
          ],
          result: '|i| = U_0\\sqrt{\\tfrac{3C}{4L}} \\approx 16{,}4\\ \\text{mA}',
        },
        {
          label: 'La bobine a en réalité une résistance. Calcule la résistance critique $R_c = 2\\sqrt{L/C}$ (en Ω).',
          answer: {
            kind: 'number',
            value: 632.45553,
            tolerance: 3,
            unit: 'Ω',
          },
          steps: [
            '$R_c = 2\\sqrt{\\dfrac{0{,}1}{10^{-6}}} \\approx 632\\ \\Omega$',
          ],
          result: 'R_c = 2\\sqrt{L/C} \\approx 632\\ \\Omega',
        },
        {
          label: 'Si la résistance totale vaut 40 Ω, quel est le régime des oscillations ?',
          answer: {
            kind: 'text',
            display: 'pseudo-périodique',
            accepted: [
              'pseudo-périodique',
              'pseudo-periodique',
              'pseudoperiodique',
              'pseudopériodique',
              'regime pseudo-periodique',
              'régime pseudo-périodique',
            ],
          },
          steps: [
            "$R = 40\\ \\Omega < R_c \\approx 632\\ \\Omega$ : l'amortissement est faible.",
            'Les oscillations sont amorties mais persistent : régime pseudo-périodique, de pseudo-période voisine de $T_0$.',
          ],
          result: 'R < R_c \\Rightarrow \\text{régime pseudo-périodique}',
        },
      ],
    },
  ],
  quiz: [],
  applications: [
    {
      title: 'Capter une radio FM',
      tagline: 'Quel condensateur pour la station à 96 MHz ?',
      situation: "Dans un poste de radio FM, le circuit d'accord comporte une petite bobine d'inductance 0,2 µH et un condensateur réglable. On veut écouter une station qui émet à 96 MHz.",
      model: 'Le circuit LC « répond » fortement à la fréquence égale à sa fréquence propre $f_0 = \\dfrac{1}{2\\pi\\sqrt{LC}}$ (formule de Thomson). Tourner le bouton fait varier $C$.',
      questions: [
        'Calcule la capacité à régler (en pF).',
      ],
      check: {
        value: 13.742565,
        tolerance: 0.02,
        unit: 'pF',
      },
      solution: [
        '$C = \\dfrac{1}{4\\pi^2 f^2 L}$',
        'A.N. : $C = \\dfrac{1}{4\\pi^2\\times(96\\times10^6)^2\\times 0{,}2\\times10^{-6}} \\approx 13,7\\times10^{-12}$ F',
      ],
      fact: "La bande FM s'étend de 87,5 à 108 MHz. Les ondes radio sont des ondes électromagnétiques : elles voyagent à la vitesse de la lumière.",
    },
  ],
};
