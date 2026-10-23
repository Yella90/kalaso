// Importé du site cecp (physique-3d, chapitre « transformateurs ») par scripts/import-cecp.ts.
// Une nouvelle importation remplace ce fichier.
import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook: "Produire et adapter la tension du courant alternatif grâce à l'induction.",
  objectives: [],
  sections: [
    {
      title: "Rappel : l'induction électromagnétique",
      blocks: [
        {
          kind: 'callout',
          variant: 'retenir',
          blocks: [
            {
              kind: 'list',
              items: [
                '$U_2/U_1 = N_2/N_1 = m$',
                'Transformateur parfait : $U_1 I_1 = U_2 I_2$',
                'Pertes en ligne : $p = RP^2/U^2$',
                'Alternateur : $f = p\\,n$ et $E_m = NBS\\omega$',
              ],
            },
          ],
        },
        {
          kind: 'text',
          text: "Lorsque le flux magnétique $\\Phi$ à travers une bobine varie, il apparaît à ses bornes une force électromotrice induite (loi de Faraday). Le sens du courant induit s'oppose à la cause qui lui donne naissance (loi de Lenz).",
        },
        {
          kind: 'formula',
          tex: 'e = -\\frac{d\\Phi}{dt} \\qquad \\Phi = N B S \\cos\\theta',
          label: 'Loi de Faraday',
          legend: [
            '$\\Phi$ en webers (Wb)',
            '$N$ : nombre de spires',
            "$S$ : surface d'une spire (m²)",
            '$\\theta$ : angle entre $\\vec B$ et la normale',
          ],
        },
      ],
    },
    {
      title: 'Le transformateur',
      blocks: [
        {
          kind: 'text',
          text: 'Un transformateur est formé de deux bobines (le **primaire**, $N_1$ spires, et le **secondaire**, $N_2$ spires) enroulées sur un même noyau de fer feuilleté. Le courant alternatif du primaire crée un flux variable, canalisé par le fer, qui induit une tension alternative de même fréquence au secondaire.',
        },
        {
          kind: 'formula',
          tex: '\\frac{U_2}{U_1} = \\frac{N_2}{N_1} = m \\qquad U_1 I_1 = U_2 I_2 \\ \\Rightarrow\\ \\frac{I_1}{I_2} = m',
          label: 'Transformateur parfait',
          legend: [
            '$m$ : rapport de transformation',
            '$U$, $I$ : valeurs efficaces',
          ],
        },
        {
          kind: 'table',
          head: [
            'Rapport',
            'Type',
            'Exemple',
          ],
          rows: [
            [
              '$m > 1$',
              'élévateur de tension',
              'sortie de centrale : 20 kV → 225 kV',
            ],
            [
              '$m < 1$',
              'abaisseur de tension',
              'chargeur : 220 V → 12 V',
            ],
            [
              '$m = 1$',
              'isolement',
              'sécurité des salles de bains',
            ],
          ],
        },
        {
          kind: 'callout',
          variant: 'attention',
          blocks: [
            {
              kind: 'text',
              text: "Un transformateur ne fonctionne **qu'en courant alternatif** : un courant continu crée un flux constant, donc aucune tension induite.",
            },
          ],
        },
        {
          kind: 'text',
          text: "Un transformateur réel a un rendement $\\eta = P_2/P_1$ proche de 95 à 99 % : pertes par effet Joule dans les fils (pertes cuivre) et dans le noyau (pertes fer, d'où le feuilletage).",
        },
      ],
    },
    {
      title: "Le transport de l'électricité",
      blocks: [
        {
          kind: 'text',
          text: 'Une ligne de résistance $R$ transporte une puissance $P = UI$. Les pertes par effet Joule valent $p = RI^2 = R\\dfrac{P^2}{U^2}$ : à puissance égale, **elles sont divisées par 100 quand on multiplie la tension par 10**.',
        },
        {
          kind: 'callout',
          variant: 'methode',
          blocks: [
            {
              kind: 'text',
              text: "On élève la tension (jusqu'à 225 ou 400 kV) à la sortie de la centrale, puis on l'abaisse par étapes (63 kV, 20 kV, 220 V) près des utilisateurs.",
            },
          ],
        },
      ],
    },
    {
      title: "L'alternateur",
      blocks: [
        {
          kind: 'text',
          text: 'Dans un alternateur, un **rotor** (aimant ou électroaimant) tourne devant des bobines fixes (le **stator**). Le flux à travers chaque bobine varie périodiquement : il apparaît une f.é.m. sinusoïdale.',
        },
        {
          kind: 'formula',
          tex: 'e(t) = E_m \\sin(\\omega t) \\qquad E_m = N B S \\omega \\qquad f = p\\,n',
          legend: [
            '$p$ : nombre de paires de pôles du rotor',
            '$n$ : vitesse de rotation en tours par seconde',
            '$\\omega = 2\\pi f$',
          ],
        },
        {
          kind: 'text',
          text: 'Au Mali comme en Europe, le réseau est à $f = 50$ Hz : un alternateur à 2 paires de pôles doit tourner à 1 500 tr/min. Les turbines des barrages (Sélingué, Manantali) font tourner des alternateurs à nombreux pôles, plus lents.',
        },
      ],
    },
  ],
  essentials: [],
  exercises: [
    {
      id: 'tr-chargeur',
      level: 1,
      title: 'Le chargeur de téléphone',
      statement: "Un transformateur supposé parfait est branché sur le secteur ($U_1 = 220$ V efficaces). Son primaire comporte $N_1 = 1\\,100$ spires et son secondaire $N_2 = 60$ spires. Le secondaire débite un courant d'intensité efficace $I_2 = 2$ A.",
      given: [
        {
          label: 'U1',
          value: '220 V',
        },
        {
          label: 'N1',
          value: '1 100 spires',
        },
        {
          label: 'N2',
          value: '60 spires',
        },
        {
          label: 'I2',
          value: '2 A',
        },
      ],
      parts: [
        {
          label: 'Calcule la tension efficace $U_2$ au secondaire.',
          answer: {
            kind: 'number',
            value: 12,
            tolerance: 0.1,
            unit: 'V',
          },
          steps: [
            'Pour un transformateur parfait : $\\dfrac{U_2}{U_1} = \\dfrac{N_2}{N_1} = m$',
            '$U_2 = U_1 \\dfrac{N_2}{N_1} = 220 \\times \\dfrac{60}{1100} = 12{,}0$ V',
          ],
          result: 'U_2 = U_1\\frac{N_2}{N_1} = 12{,}0\\ \\text{V}',
        },
        {
          label: 'Le transformateur est-il élévateur ou abaisseur ?',
          answer: {
            kind: 'text',
            display: 'abaisseur',
            accepted: [
              'abaisseur',
              'abaisseur de tension',
              'un abaisseur',
            ],
          },
          steps: [
            "$m = N_2/N_1 = 60/1100 < 1$ : la tension de sortie est plus petite que la tension d'entrée.",
          ],
          result: 'm < 1 \\Rightarrow \\text{abaisseur}',
        },
        {
          label: "Calcule l'intensité efficace $I_1$ au primaire (en mA).",
          answer: {
            kind: 'number',
            value: 109.09091,
            tolerance: 1,
            unit: 'mA',
          },
          steps: [
            'Transformateur parfait : pas de pertes, $U_1 I_1 = U_2 I_2$',
            '$I_1 = I_2 \\dfrac{N_2}{N_1} = 2 \\times \\dfrac{60}{1100} = 0{,}1091$ A, soit 109 mA',
          ],
          result: 'I_1 = m\\,I_2 \\approx 109\\ \\text{mA}',
        },
      ],
    },
    {
      id: 'tr-transport',
      level: 2,
      title: "Pourquoi transporter l'électricité en haute tension ?",
      source: 'Type bac',
      statement: "Une centrale doit acheminer une puissance $P = 1$ MW jusqu'à une ville par une ligne de résistance totale $R = 4\\ \\Omega$. On compare un transport sous $U = 20$ kV et sous $U' = 225$ kV. L'intensité dans la ligne vaut $I = P/U$.",
      given: [
        {
          label: 'P',
          value: '1 MW',
        },
        {
          label: 'R',
          value: '4 Ω',
        },
        {
          label: 'U',
          value: '20 kV',
        },
        {
          label: "U'",
          value: '225 kV',
        },
      ],
      parts: [
        {
          label: 'Calcule la puissance perdue par effet Joule sous 20 kV (en kW).',
          answer: {
            kind: 'number',
            value: 10,
            tolerance: 0.1,
            unit: 'kW',
          },
          steps: [
            '$I = \\dfrac{P}{U} = \\dfrac{10^6}{20\\,000} = 50$ A',
            '$p = R I^2 = 4 \\times 50^2 = 10000$ W, soit 10 kW',
          ],
          result: 'p = R\\frac{P^2}{U^2} = 10\\ \\text{kW}',
        },
        {
          label: 'Calcule la puissance perdue sous 225 kV (en W).',
          answer: {
            kind: 'number',
            value: 79.012346,
            tolerance: 1,
            unit: 'W',
          },
          steps: [
            "$I' = \\dfrac{10^6}{225\\,000} \\approx 4{,}44$ A",
            "$p' = R I'^2 \\approx 79$ W",
            "Les pertes sont divisées par $(225/20)^2 \\approx 127$ : c'est pour cela qu'on élève la tension avec un transformateur avant le transport.",
          ],
          result: "p' \\approx 79\\ \\text{W}",
        },
      ],
    },
    {
      id: 'tr-alternateur',
      level: 3,
      title: "L'alternateur d'une centrale",
      source: 'Type concours',
      statement: 'Un alternateur possède un rotor à $p = 2$ paires de pôles qui tourne à $1\\,500$ tr/min. On modélise ensuite une bobine de $N = 200$ spires, de surface $S = 40$ cm², tournant à la pulsation $\\omega = 2\\pi f$ dans un champ uniforme $B = 0{,}15$ T.',
      given: [
        {
          label: 'p',
          value: '2 paires de pôles',
        },
        {
          label: 'n',
          value: '1 500 tr/min',
        },
        {
          label: 'N',
          value: '200 spires',
        },
        {
          label: 'S',
          value: '40 cm²',
        },
        {
          label: 'B',
          value: '0,15 T',
        },
      ],
      parts: [
        {
          label: 'Calcule la fréquence $f$ du courant produit.',
          answer: {
            kind: 'number',
            value: 50,
            tolerance: 0.1,
            unit: 'Hz',
          },
          steps: [
            '$n = 1500$ tr/min $= 25$ tr/s',
            '$f = p\\,n = 2 \\times 25 = 50$ Hz',
          ],
          result: 'f = p\\,n = 50\\ \\text{Hz}',
        },
        {
          label: 'À quelle vitesse (tr/min) devrait tourner un rotor à une seule paire de pôles pour la même fréquence ?',
          answer: {
            kind: 'number',
            value: 3000,
            tolerance: 1,
            unit: 'tr/min',
          },
          steps: [
            '$n = \\dfrac{f}{p} = \\dfrac{50}{1} = 50$ tr/s',
            '$n = 50 \\times 60 = 3\\,000$ tr/min',
          ],
          result: 'n = \\frac{60 f}{p} = 3\\,000\\ \\text{tr/min}',
        },
        {
          label: 'Calcule la f.é.m. maximale $E_m = N B S \\omega$ de la bobine.',
          answer: {
            kind: 'number',
            value: 37.699112,
            tolerance: 0.2,
            unit: 'V',
          },
          steps: [
            'Le flux à travers la bobine vaut $\\Phi = N B S \\cos(\\omega t)$',
            '$e = -\\dfrac{d\\Phi}{dt} = N B S \\omega \\sin(\\omega t)$',
            '$E_m = 200 \\times 0{,}15 \\times 40\\cdot 10^{-4} \\times 2\\pi \\times 50 \\approx 37{,}7$ V',
          ],
          result: 'E_m = N B S \\omega \\approx 37{,}7\\ \\text{V}',
        },
      ],
    },
  ],
  quiz: [],
  applications: [
    {
      title: 'Le chargeur de téléphone',
      tagline: 'Comment passer de 220 V à 5 V ?',
      situation: 'Ton téléphone se recharge sous 5 V alors que la prise délivre 220 V. Dans un chargeur simple, un petit transformateur abaisseur fait le travail. Son primaire compte 2200 spires.',
      model: 'Pour un transformateur parfait, $U_2/U_1 = N_2/N_1$. Les chargeurs modernes utilisent en plus un circuit électronique (redresseur, découpage) pour obtenir une tension continue.',
      questions: [
        'Combien de spires faut-il au secondaire pour obtenir 5 V ?',
      ],
      check: {
        value: 50,
        tolerance: 0.02,
        unit: 'spires',
      },
      solution: [
        '$\\dfrac{N_2}{N_1} = \\dfrac{U_2}{U_1} \\Rightarrow N_2 = N_1\\dfrac{U_2}{U_1}$',
        'A.N. : $N_2 = 2200 \\times \\dfrac{5}{220} = 50$ spires (vérification : $U_2 = 5,0$ V)',
      ],
      fact: "Un chargeur reste un peu tiède même branché sans téléphone : le noyau et les fils dissipent un peu d'énergie (pertes fer et cuivre). Pense à le débrancher !",
    },
    {
      title: 'La ligne haute tension de Manantali',
      tagline: "Combien d'énergie se perd sur la route vers Bamako ?",
      situation: "Le barrage de Manantali envoie l'électricité vers Bamako par une ligne à haute tension. Supposons qu'elle transporte $P = 100$ MW sous $U = 225$ kV, avec une résistance totale $R = 20\\ \\Omega$.",
      model: "L'intensité dans la ligne vaut $I = P/U$ et les pertes par effet Joule $p = RI^2 = RP^2/U^2$. Des transformateurs élèvent la tension à la sortie du barrage puis l'abaissent près des villes.",
      questions: [
        'Calcule la puissance perdue par effet Joule dans la ligne (en MW).',
      ],
      check: {
        value: 3.9506173,
        tolerance: 0.02,
        unit: 'MW',
      },
      solution: [
        '$I = \\dfrac{P}{U} = \\dfrac{10^8}{2{,}25\\times10^5} \\approx 444$ A',
        '$p = RI^2 \\approx 3,95$ MW, soit environ 4,0 % de la puissance transportée.',
        'Sous 22,5 kV seulement, les pertes seraient 100 fois plus grandes : plus que la puissance transportée !',
      ],
      fact: 'Le barrage de Manantali, sur le Bafing, alimente le Mali, le Sénégal et la Mauritanie grâce à plus de 1 500 km de lignes haute tension.',
    },
  ],
};
