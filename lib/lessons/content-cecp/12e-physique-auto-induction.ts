// Importé du site cecp (physique-3d, chapitre « auto-induction ») par scripts/import-cecp.ts.
// Une nouvelle importation remplace ce fichier.
import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook: "Une bobine s'oppose aux variations du courant qui la traverse.",
  objectives: [],
  sections: [
    {
      title: "Le phénomène d'auto-induction",
      blocks: [
        {
          kind: 'callout',
          variant: 'attention',
          blocks: [
            {
              kind: 'text',
              text: "Ne pas confondre $\\tau = L/R$ (dipôle RL) et $\\tau = RC$ (dipôle RC). Dans les deux cas, $\\tau$ s'exprime en secondes.",
            },
          ],
        },
        {
          kind: 'text',
          text: "Quand l'intensité $i$ qui traverse une bobine varie, le champ magnétique qu'elle crée varie aussi, et donc le flux propre $\\Phi = L\\,i$ à travers ses spires. D'après la loi de Lenz, il apparaît une f.é.m. induite qui **s'oppose à la cause qui lui a donné naissance** : c'est l'auto-induction.",
        },
        {
          kind: 'formula',
          tex: 'e = -\\frac{d\\Phi}{dt} = -L\\,\\frac{di}{dt}',
          label: "F.é.m. d'auto-induction",
          legend: [
            '$L$ : inductance de la bobine (henry, H)',
            '$\\Phi = L\\,i$ : flux propre (Wb)',
          ],
        },
        {
          kind: 'text',
          text: 'Pour un solénoïde long de $N$ spires, de longueur $\\ell$ et de section $S$ : $L = \\mu_0\\dfrac{N^2 S}{\\ell}$ avec $\\mu_0 = 4\\pi\\times10^{-7}$ SI.',
        },
      ],
    },
    {
      title: "Tension aux bornes d'une bobine",
      blocks: [
        {
          kind: 'formula',
          tex: 'u_L = r\\,i + L\\,\\frac{di}{dt}',
          legend: [
            '$r$ : résistance interne de la bobine (Ω)',
            'En convention récepteur',
          ],
        },
        {
          kind: 'list',
          items: [
            'En régime permanent ($i$ constant), $\\dfrac{di}{dt} = 0$ : la bobine se comporte comme un simple conducteur ohmique de résistance $r$.',
            "Quand $i$ varie brusquement, $L\\dfrac{di}{dt}$ peut devenir très grand : c'est l'origine de l'étincelle de rupture.",
          ],
        },
      ],
    },
    {
      title: 'Établissement et rupture du courant dans un dipôle RL',
      blocks: [
        {
          kind: 'text',
          text: "Un dipôle RL (résistance totale $R$) est soumis à l'échelon de tension $E$ à $t = 0$. La loi des mailles donne l'équation différentielle :",
        },
        {
          kind: 'formula',
          tex: 'L\\frac{di}{dt} + R\\,i = E \\quad\\Rightarrow\\quad i(t) = \\frac{E}{R}\\left(1 - e^{-t/\\tau}\\right),\\qquad \\tau = \\frac{L}{R}',
          legend: [
            '$\\tau$ : constante de temps (s)',
            '$I_0 = E/R$ : intensité en régime permanent',
          ],
        },
        {
          kind: 'list',
          items: [
            'À $t = \\tau$, $i = 0{,}63\\,I_0$ ; au bout de $5\\tau$, le régime permanent est pratiquement atteint (99 %).',
            "La tangente à l'origine de la courbe $i(t)$ coupe l'asymptote $i = I_0$ à la date $t = \\tau$.",
            "À la rupture (le circuit reste fermé sur R) : $i(t) = I_0\\,e^{-t/\\tau}$. Le courant ne s'annule pas instantanément.",
          ],
        },
        {
          kind: 'callout',
          variant: 'retenir',
          title: "La bobine retarde l'établissement du courant",
          blocks: [
            {
              kind: 'text',
              text: "L'intensité qui traverse une bobine est une fonction **continue** du temps : elle ne peut pas varier brusquement.",
            },
          ],
        },
      ],
    },
    {
      title: 'Énergie emmagasinée',
      blocks: [
        {
          kind: 'formula',
          tex: 'E_m = \\tfrac12\\,L\\,i^2',
        },
        {
          kind: 'text',
          text: "Cette énergie magnétique est restituée lors de la rupture du courant. C'est elle qui produit l'étincelle de la bougie d'un moteur à essence (bobine d'allumage) ou qui allume un tube fluorescent grâce au starter.",
        },
      ],
    },
  ],
  essentials: [],
  exercises: [
    {
      id: 'ind-solenoide',
      level: 1,
      title: "Inductance d'un solénoïde",
      statement: "Un solénoïde de longueur $\\ell = 40$ cm comporte $N = 500$ spires de section $S = 20$ cm². On prend $\\mu_0 = 4\\pi\\times10^{-7}$ SI. L'intensité du courant qui le traverse passe uniformément de 0 à 2 A en 10 ms.",
      given: [
        {
          label: 'N',
          value: '500 spires',
        },
        {
          label: 'ℓ',
          value: '40 cm',
        },
        {
          label: 'S',
          value: '20 cm²',
        },
        {
          label: 'Δi / Δt',
          value: '2 A en 10 ms',
        },
      ],
      parts: [
        {
          label: "Calcule l'inductance $L$ du solénoïde (en mH).",
          answer: {
            kind: 'number',
            value: 1.5707963,
            tolerance: 0.02,
            unit: 'mH',
          },
          steps: [
            'Pour un solénoïde long : $L = \\mu_0\\dfrac{N^2 S}{\\ell}$',
            '$L = 4\\pi\\times10^{-7}\\times\\dfrac{500^2\\times 2\\times10^{-3}}{0{,}4} \\approx 1{,}57\\times10^{-3}$ H',
          ],
          result: 'L = \\mu_0 N^2 S/\\ell \\approx 1{,}57\\ \\text{mH}',
        },
        {
          label: "Calcule la valeur absolue de la f.é.m. d'auto-induction $|e|$ pendant la variation (en V).",
          answer: {
            kind: 'number',
            value: 0.31415927,
            tolerance: 0.005,
            unit: 'V',
          },
          steps: [
            '$e = -L\\dfrac{di}{dt}$ ; ici $\\dfrac{di}{dt} = \\dfrac{2}{0{,}01} = 200$ A/s',
            '$|e| = 0{,}00157\\times 200 \\approx 0{,}314$ V',
          ],
          result: '|e| = L\\,\\frac{\\Delta i}{\\Delta t} \\approx 0{,}314\\ \\text{V}',
        },
        {
          label: 'Quelle énergie magnétique est stockée quand $i = 2$ A ? (en mJ)',
          answer: {
            kind: 'number',
            value: 3.1415927,
            tolerance: 0.03,
            unit: 'mJ',
          },
          steps: [
            '$E_m = \\tfrac12 L i^2 = \\tfrac12\\times0{,}00157\\times 2^2 \\approx 3{,}14\\times10^{-3}$ J',
          ],
          result: 'E_m = \\tfrac12 L i^2 \\approx 3{,}14\\ \\text{mJ}',
        },
      ],
    },
    {
      id: 'ind-rl',
      level: 2,
      title: 'Établissement du courant dans un dipôle RL',
      statement: "Une bobine d'inductance $L = 0{,}5$ H et de résistance $r = 10\\ \\Omega$ est montée en série avec un conducteur ohmique $R = 50\\ \\Omega$ et un générateur de tension continue $E = 12$ V. On ferme l'interrupteur à $t = 0$.",
      given: [
        {
          label: 'E',
          value: '12 V',
        },
        {
          label: 'L',
          value: '0,5 H',
        },
        {
          label: 'r',
          value: '10 Ω',
        },
        {
          label: 'R',
          value: '50 Ω',
        },
      ],
      parts: [
        {
          label: "Calcule l'intensité $I_0$ en régime permanent.",
          answer: {
            kind: 'number',
            value: 0.2,
            tolerance: 0.002,
            unit: 'A',
          },
          steps: [
            'En régime permanent, $\\dfrac{di}{dt} = 0$ : la bobine se comporte comme sa seule résistance $r$.',
            'Loi des mailles : $E = (R + r)I_0$ donc $I_0 = \\dfrac{12}{60} = 0{,}2$ A',
          ],
          result: 'I_0 = \\frac{E}{R + r} = 0{,}2\\ \\text{A}',
        },
        {
          label: 'Calcule la constante de temps $\\tau$ du circuit (en ms).',
          answer: {
            kind: 'number',
            value: 8.3333333,
            tolerance: 0.05,
            unit: 'ms',
          },
          steps: [
            '$\\tau = \\dfrac{L}{R + r} = \\dfrac{0{,}5}{60} \\approx 8{,}33\\times10^{-3}$ s',
          ],
          result: '\\tau = \\frac{L}{R+r} \\approx 8{,}33\\ \\text{ms}',
        },
        {
          label: "Quelle est l'intensité à la date $t = \\tau$ ?",
          answer: {
            kind: 'number',
            value: 0.12642411,
            tolerance: 0.002,
            unit: 'A',
          },
          steps: [
            "Solution de l'équation $L\\dfrac{di}{dt} + (R+r)i = E$ : $i(t) = I_0\\left(1 - e^{-t/\\tau}\\right)$",
            'À $t = \\tau$ : $i = I_0(1 - e^{-1}) \\approx 0{,}63\\,I_0 = 0{,}126$ A',
          ],
          result: 'i(\\tau) = 0{,}63\\,I_0 \\approx 0{,}126\\ \\text{A}',
        },
        {
          label: "Calcule l'énergie stockée dans la bobine en régime permanent (en mJ).",
          answer: {
            kind: 'number',
            value: 10,
            tolerance: 0.1,
            unit: 'mJ',
          },
          steps: [
            '$E_m = \\tfrac12 L I_0^2 = \\tfrac12\\times 0{,}5\\times 0{,}2^2 = 10\\times10^{-3}$ J',
          ],
          result: 'E_m = \\tfrac12 L I_0^2 = 10\\ \\text{mJ}',
        },
      ],
    },
    {
      id: 'ind-graphe',
      level: 3,
      title: "Exploitation d'un enregistrement",
      statement: "On enregistre l'intensité $i(t)$ à la fermeture d'un circuit RL série alimenté sous $E = 10$ V. La tangente à l'origine coupe l'asymptote $i = I_0$ à la date $t = 2$ ms. La résistance totale du circuit vaut $100\\ \\Omega$.",
      given: [
        {
          label: 'E',
          value: '10 V',
        },
        {
          label: 'R totale',
          value: '100 Ω',
        },
        {
          label: 'tangente',
          value: 'coupe I₀ à 2 ms',
        },
      ],
      parts: [
        {
          label: "En déduire l'inductance $L$ de la bobine (en H).",
          answer: {
            kind: 'number',
            value: 0.2,
            tolerance: 0.005,
            unit: 'H',
          },
          steps: [
            "La tangente à l'origine coupe l'asymptote à $t = \\tau$ : donc $\\tau = 2$ ms.",
            '$\\tau = \\dfrac{L}{R}$ donc $L = R\\,\\tau = 100\\times 2\\times10^{-3} = 0{,}2$ H',
          ],
          result: 'L = R\\tau = 0{,}2\\ \\text{H}',
        },
        {
          label: 'Calcule la vitesse de variation $\\left(\\dfrac{di}{dt}\\right)_{t=0}$ juste après la fermeture (en A/s).',
          answer: {
            kind: 'number',
            value: 50,
            tolerance: 0.5,
            unit: 'A/s',
          },
          steps: [
            'À $t = 0$, $i = 0$ : la loi des mailles donne $L\\left(\\dfrac{di}{dt}\\right)_0 = E$.',
            '$\\left(\\dfrac{di}{dt}\\right)_0 = \\dfrac{E}{L} = \\dfrac{10}{0{,}2} = 50$ A/s',
          ],
          result: '\\left(\\frac{di}{dt}\\right)_0 = \\frac{E}{L} = 50\\ \\text{A/s}',
        },
        {
          label: "Au bout de combien de temps l'intensité atteint-elle 99 % de $I_0$ ? (en ms)",
          answer: {
            kind: 'number',
            value: 9.2103404,
            tolerance: 0.05,
            unit: 'ms',
          },
          steps: [
            '$1 - e^{-t/\\tau} = 0{,}99 \\iff e^{-t/\\tau} = 0{,}01 \\iff t = \\tau\\ln 100$',
            '$t = 2\\times\\ln 100 \\approx 9{,}21$ ms (environ $5\\tau$)',
          ],
          result: 't = \\tau\\ln 100 \\approx 9{,}21\\ \\text{ms}',
        },
      ],
    },
  ],
  quiz: [],
  applications: [
    {
      title: "La bobine d'allumage d'une moto",
      tagline: "D'où vient l'étincelle de la bougie ?",
      situation: "Dans le circuit d'allumage d'une moto, un courant de 4 A traverse une bobine d'inductance 5 mH. Un dispositif électronique coupe brusquement ce courant en 0,1 ms.",
      model: "Une variation très rapide de l'intensité crée une forte f.é.m. d'auto-induction : $|e| = L\\left|\\dfrac{di}{dt}\\right|$. Un second enroulement (comme un transformateur) l'amplifie encore jusqu'à des milliers de volts.",
      questions: [
        "Calcule la f.é.m. d'auto-induction moyenne dans la bobine pendant la coupure (en V).",
      ],
      check: {
        value: 200,
        tolerance: 0.02,
        unit: 'V',
      },
      solution: [
        '$|e| = L\\dfrac{\\Delta i}{\\Delta t}$',
        "A.N. : $|e| = 5\\times10^{-3}\\times\\dfrac{4}{10^{-4}} = 200$ V, à partir d'une batterie de 12 V !",
      ],
      fact: "Il faut plus de 10 000 V pour qu'une étincelle traverse l'air entre les électrodes de la bougie et enflamme le mélange essence-air.",
    },
    {
      title: "L'énergie de l'étincelle",
      tagline: 'Quelle énergie la bobine libère-t-elle ?',
      situation: "Reprenons la bobine d'allumage (L = 5 mH) traversée par 4 A juste avant la coupure du courant.",
      model: "Une bobine parcourue par un courant stocke une énergie magnétique $E = \\tfrac12 L i^2$. À la rupture, cette énergie est libérée dans l'étincelle.",
      questions: [
        "Calcule l'énergie stockée dans la bobine (en mJ).",
      ],
      check: {
        value: 40,
        tolerance: 0.02,
        unit: 'mJ',
      },
      solution: [
        '$E = \\tfrac12 L I^2$',
        'A.N. : $E = \\tfrac12\\times 5\\times10^{-3}\\times 4^2 = 40\\times10^{-3}$ J',
      ],
      fact: "C'est aussi pour cela qu'on voit parfois une petite étincelle en débranchant un appareil qui contient un moteur ou un transformateur.",
    },
  ],
};
