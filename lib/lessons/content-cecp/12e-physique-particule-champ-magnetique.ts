// Importé du site cecp (physique-3d, chapitre « champ-magnetique ») par scripts/import-cecp.ts.
// Une nouvelle importation remplace ce fichier.
import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook: 'Force de Lorentz, trajectoire circulaire, spectrographe de masse et cyclotron.',
  objectives: [],
  sections: [
    {
      title: 'La force de Lorentz',
      blocks: [
        {
          kind: 'callout',
          variant: 'retenir',
          blocks: [
            {
              kind: 'list',
              items: [
                '$\\vec{F} = q\\vec{v} \\wedge \\vec{B}$, perpendiculaire à $\\vec{v}$ : elle ne change pas la valeur de la vitesse',
                'Si $\\vec{v} \\perp \\vec{B}$ : mouvement circulaire uniforme, $R = mv/(|q|B)$',
                '$T = 2\\pi m/(|q|B)$ indépendante de $v$',
                'Spectrographe : $R \\propto \\sqrt{m}$',
              ],
            },
          ],
        },
        {
          kind: 'text',
          text: "Une particule de charge $q$ animée d'une vitesse $\\vec{v}$ dans un champ magnétique $\\vec{B}$ subit la force de Lorentz :",
        },
        {
          kind: 'formula',
          tex: '\\vec{F} = q\\,\\vec{v} \\wedge \\vec{B} \\qquad F = |q|\\,v\\,B\\,|\\sin(\\vec{v},\\vec{B})|',
          legend: [
            '$q$ en coulombs (C), avec son signe',
            '$B$ en teslas (T)',
            '$\\vec{F}$ est perpendiculaire à $\\vec{v}$ et à $\\vec{B}$',
            'Si $\\vec{v} \\perp \\vec{B}$ : $F = |q| v B$',
          ],
        },
        {
          kind: 'callout',
          variant: 'methode',
          title: 'Trouver le sens de la force',
          blocks: [
            {
              kind: 'text',
              text: 'Règle des trois doigts de la main droite (pour $q > 0$) : pouce selon $\\vec{v}$, index selon $\\vec{B}$, le majeur donne $\\vec{F}$. Pour une charge négative (électron), la force est de sens opposé.',
            },
          ],
        },
      ],
    },
    {
      title: 'Le mouvement est circulaire uniforme',
      blocks: [
        {
          kind: 'text',
          text: 'On néglige le poids devant la force magnétique (pour un proton, $P \\approx 10^{-26}$ N contre $F \\approx 10^{-14}$ N). On suppose $\\vec{v_0} \\perp \\vec{B}$.',
        },
        {
          kind: 'list',
          items: [
            "La force est toujours perpendiculaire à la vitesse : sa puissance $\\mathcal{P} = \\vec{F} \\cdot \\vec{v}$ est nulle. D'après le théorème de l'énergie cinétique, $v$ reste **constante** : le mouvement est **uniforme**.",
            'La force reste dans le plan perpendiculaire à $\\vec{B}$ : le mouvement est **plan**.',
            "L'accélération est normale et de valeur constante $a_N = \\dfrac{|q| v B}{m}$ : le rayon de courbure est constant, la trajectoire est un **cercle**.",
          ],
        },
        {
          kind: 'formula',
          tex: 'R = \\frac{m\\,v}{|q|\\,B} \\qquad T = \\frac{2\\pi m}{|q|\\,B} \\qquad f = \\frac{|q|\\,B}{2\\pi m}',
          label: 'Rayon, période, fréquence',
          legend: [
            'La période ne dépend pas de la vitesse',
            'Plus $B$ est fort, plus le cercle est petit',
            'Une charge positive et une charge négative tournent en sens inverse',
          ],
        },
      ],
    },
    {
      title: 'Application : le spectrographe de masse',
      blocks: [
        {
          kind: 'text',
          text: 'Des ions de même charge $q$ et de masses différentes (isotopes) sont accélérés sous la même tension $U$, puis déviés par le même champ $B$.',
        },
        {
          kind: 'list',
          items: [
            "Accélération (théorème de l'énergie cinétique) : $\\tfrac12 m v^2 = |q| U \\Rightarrow v = \\sqrt{\\dfrac{2|q|U}{m}}$",
            'Rayon dans le champ : $R = \\dfrac{1}{B}\\sqrt{\\dfrac{2mU}{|q|}}$ : $R$ est proportionnel à $\\sqrt{m}$',
            "Après un demi-tour, l'ion frappe la plaque à $2R$ du point d'entrée : les isotopes sont séparés.",
          ],
        },
        {
          kind: 'formula',
          tex: '\\frac{R_2}{R_1} = \\sqrt{\\frac{m_2}{m_1}} \\qquad d = I_1I_2 = 2\\,(R_2 - R_1)',
        },
        {
          kind: 'text',
          text: "Le spectrographe sert à mesurer des masses atomiques, à séparer l'uranium 235 de l'uranium 238 et, en médecine légale, à identifier des substances.",
        },
      ],
    },
    {
      title: 'Application : le cyclotron',
      blocks: [
        {
          kind: 'text',
          text: 'Les particules tournent dans deux demi-cylindres creux (les « dees ») plongés dans $\\vec{B}$. Entre les dees, une tension alternative les accélère à chaque demi-tour. Comme la période ne dépend pas de la vitesse, la tension peut garder une fréquence fixe :',
        },
        {
          kind: 'formula',
          tex: 'f_{tension} = \\frac{|q| B}{2\\pi m} \\qquad E_{c,max} = \\frac{(|q| B R_{max})^2}{2m}',
        },
        {
          kind: 'text',
          text: 'Les cyclotrons produisent des isotopes radioactifs pour la médecine (imagerie par tomographie, traitement des cancers).',
        },
      ],
    },
  ],
  essentials: [],
  exercises: [
    {
      id: 'mag-proton',
      level: 1,
      title: 'Un proton dans un champ magnétique',
      statement: 'Un proton pénètre en O dans une région où règne un champ magnétique uniforme $\\vec{B}$ ($B = 0{,}2$ T), avec une vitesse $\\vec{v_0}$ perpendiculaire à $\\vec{B}$, de valeur $v_0 = 2 \\cdot 10^{6}$ m/s. On néglige le poids.',
      given: [
        {
          label: 'e',
          value: '1,6·10⁻¹⁹ C',
        },
        {
          label: 'm_p',
          value: '1,67·10⁻²⁷ kg',
        },
        {
          label: 'v0',
          value: '2·10⁶ m/s',
        },
        {
          label: 'B',
          value: '0,2 T',
        },
      ],
      parts: [
        {
          label: "Calcule l'intensité de la force de Lorentz (en $10^{-14}$ N).",
          answer: {
            kind: 'number',
            value: 6.4,
            tolerance: 0.1,
            unit: '×10⁻¹⁴ N',
          },
          steps: [
            '$\\vec{F} = q\\,\\vec{v} \\wedge \\vec{B}$ ; comme $\\vec{v} \\perp \\vec{B}$ : $F = |q|\\,v\\,B$',
            '$F = 1{,}6 \\cdot 10^{-19} \\times 2 \\cdot 10^{6} \\times 0{,}2 = 6{,}4 \\cdot 10^{-14}$ N',
            'Comparaison : le poids du proton vaut $1{,}6 \\cdot 10^{-26}$ N, il est bien négligeable.',
          ],
          result: 'F = evB = 6{,}4 \\cdot 10^{-14}\\ \\text{N}',
        },
        {
          label: 'Montre que le mouvement est circulaire uniforme et calcule le rayon $R$ (en cm).',
          answer: {
            kind: 'number',
            value: 10.4375,
            tolerance: 0.15,
            unit: 'cm',
          },
          steps: [
            "$\\vec{F}$ est perpendiculaire à $\\vec{v}$ : sa puissance est nulle, l'énergie cinétique (donc $v$) reste constante.",
            "$\\vec{F}$ reste dans le plan perpendiculaire à $\\vec{B}$ : le mouvement est plan, uniforme, avec une accélération normale constante $a_N = \\dfrac{evB}{m}$ : c'est un cercle.",
            '$m\\dfrac{v^2}{R} = evB \\Rightarrow R = \\dfrac{m v}{e B}$',
            '$R = \\dfrac{1{,}67 \\cdot 10^{-27} \\times 2 \\cdot 10^{6}}{1{,}6 \\cdot 10^{-19} \\times 0{,}2} \\approx 10{,}4$ cm',
          ],
          result: 'R = \\frac{mv}{eB} \\approx 10{,}4\\ \\text{cm}',
        },
        {
          label: 'Calcule la période du mouvement (en $10^{-7}$ s). Dépend-elle de la vitesse ?',
          answer: {
            kind: 'number',
            value: 3.2790373,
            tolerance: 0.05,
            unit: '×10⁻⁷ s',
          },
          steps: [
            '$T = \\dfrac{2\\pi R}{v} = \\dfrac{2\\pi m}{e B}$ : la période ne dépend **pas** de la vitesse.',
            '$T = \\dfrac{2\\pi \\times 1{,}67 \\cdot 10^{-27}}{1{,}6 \\cdot 10^{-19} \\times 0{,}2} \\approx 3{,}28 \\cdot 10^{-7}$ s',
            "C'est cette propriété qu'exploite le cyclotron.",
          ],
          result: 'T = \\frac{2\\pi m}{eB} \\approx 3{,}28 \\cdot 10^{-7}\\ \\text{s}',
        },
      ],
    },
    {
      id: 'mag-electron',
      level: 2,
      title: 'Électrons accélérés puis déviés',
      statement: 'Des électrons, émis sans vitesse par une cathode, sont accélérés par une tension $U = 500$ V. Ils entrent ensuite perpendiculairement dans un champ magnétique uniforme $B = 2$ mT.',
      given: [
        {
          label: 'e',
          value: '1,6·10⁻¹⁹ C',
        },
        {
          label: 'm_e',
          value: '9,11·10⁻³¹ kg',
        },
        {
          label: 'U',
          value: '500 V',
        },
        {
          label: 'B',
          value: '2 mT',
        },
      ],
      parts: [
        {
          label: "Calcule la vitesse des électrons à la sortie de l'accélérateur (en $10^{7}$ m/s).",
          answer: {
            kind: 'number',
            value: 1.3252591,
            tolerance: 0.02,
            unit: '×10⁷ m/s',
          },
          steps: [
            "Théorème de l'énergie cinétique entre la cathode et l'anode : $\\tfrac12 m v^2 - 0 = eU$",
            '$v = \\sqrt{\\dfrac{2eU}{m}}$',
            '$v = \\sqrt{\\dfrac{2 \\times 1{,}6 \\cdot 10^{-19} \\times 500}{9{,}11 \\cdot 10^{-31}}} \\approx 1{,}325 \\cdot 10^{7}$ m/s',
          ],
          result: 'v = \\sqrt{2eU/m} \\approx 1{,}325 \\cdot 10^{7}\\ \\text{m/s}',
        },
        {
          label: 'Calcule le rayon de leur trajectoire dans le champ magnétique (en cm).',
          answer: {
            kind: 'number',
            value: 3.7728471,
            tolerance: 0.08,
            unit: 'cm',
          },
          steps: [
            '$R = \\dfrac{m v}{e B}$',
            '$R = \\dfrac{9{,}11 \\cdot 10^{-31} \\times 1{,}325 \\cdot 10^{7}}{1{,}6 \\cdot 10^{-19} \\times 2 \\cdot 10^{-3}} \\approx 3{,}77$ cm',
            'On peut aussi écrire $R = \\dfrac{1}{B}\\sqrt{\\dfrac{2mU}{e}}$.',
          ],
          result: 'R = \\frac{1}{B}\\sqrt{\\frac{2mU}{e}} \\approx 3{,}77\\ \\text{cm}',
        },
      ],
    },
    {
      id: 'mag-spectro',
      level: 2,
      title: 'Séparer les isotopes du lithium',
      source: 'Type bac',
      statement: "Dans un spectrographe de masse, des ions $^{6}\\text{Li}^+$ et $^{7}\\text{Li}^+$ sont accélérés sous une tension $U = 2\\,000$ V (vitesse initiale nulle), puis pénètrent en O dans un champ magnétique $B = 0{,}15$ T perpendiculaire à leur vitesse. Ils décrivent un demi-cercle avant de frapper une plaque photographique en $I_1$ et $I_2$. On prendra la masse d'un ion égale à $A \\times u$.",
      given: [
        {
          label: 'u',
          value: '1,66·10⁻²⁷ kg',
        },
        {
          label: 'e',
          value: '1,6·10⁻¹⁹ C',
        },
        {
          label: 'U',
          value: '2 000 V',
        },
        {
          label: 'B',
          value: '0,15 T',
        },
      ],
      diagram: {
        width: 16,
        height: 8,
        elements: [
          {
            type: 'block',
            x: 8,
            y: 4.8,
            w: 15,
            h: 6,
            color: '#1e3a8a',
          },
          {
            type: 'text',
            x: 14.2,
            y: 7.2,
            text: 'B ⊙',
            color: '#93c5fd',
            size: 14,
          },
          {
            type: 'line',
            x1: 0.5,
            y1: 1.8,
            x2: 15.5,
            y2: 1.8,
            color: '#e2e8f0',
            width: 3,
          },
          {
            type: 'text',
            x: 12,
            y: 1.2,
            text: 'plaque photographique',
            color: '#cbd5e1',
            size: 12,
          },
          {
            type: 'line',
            x1: 2,
            y1: 0.2,
            x2: 2,
            y2: 1.8,
            color: '#94a3b8',
            dashed: true,
          },
          {
            type: 'point',
            x: 2,
            y: 1.8,
            label: 'O',
            color: '#e2e8f0',
            labelPos: 'left',
          },
          {
            type: 'arc',
            cx: 6.2,
            cy: 1.8,
            r: 4.2,
            startAngle: 3.1415927,
            endAngle: 0,
            color: '#38bdf8',
          },
          {
            type: 'arc',
            cx: 6.55,
            cy: 1.8,
            r: 4.55,
            startAngle: 3.1415927,
            endAngle: 0,
            color: '#f97316',
          },
          {
            type: 'point',
            x: 10.4,
            y: 1.8,
            label: 'I₁',
            color: '#38bdf8',
            labelPos: 'bottom',
          },
          {
            type: 'point',
            x: 11.1,
            y: 1.8,
            label: 'I₂',
            color: '#f97316',
            labelPos: 'bottom',
          },
          {
            type: 'arrow',
            x1: 2,
            y1: 0.4,
            x2: 2,
            y2: 1.5,
            color: '#f472b6',
            label: 'v₀',
          },
        ],
      },
      parts: [
        {
          label: 'Calcule la vitesse des ions $^{6}\\text{Li}^+$ en O (en $10^{5}$ m/s).',
          answer: {
            kind: 'number',
            value: 2.534897,
            tolerance: 0.03,
            unit: '×10⁵ m/s',
          },
          steps: [
            '$\\tfrac12 m_6 v_6^2 = eU \\Rightarrow v_6 = \\sqrt{\\dfrac{2eU}{6u}}$',
            '$v_6 = \\sqrt{\\dfrac{2 \\times 1{,}6 \\cdot 10^{-19} \\times 2000}{6 \\times 1{,}66 \\cdot 10^{-27}}} \\approx 2{,}535 \\cdot 10^{5}$ m/s',
          ],
          result: 'v_6 \\approx 2{,}535 \\cdot 10^{5}\\ \\text{m/s}',
        },
        {
          label: 'Calcule le rayon $R_6$ de leur trajectoire (en cm).',
          answer: {
            kind: 'number',
            value: 10.519823,
            tolerance: 0.1,
            unit: 'cm',
          },
          steps: [
            '$R_6 = \\dfrac{m_6 v_6}{eB} = \\dfrac{1}{B}\\sqrt{\\dfrac{2 m_6 U}{e}}$',
            '$R_6 \\approx 10{,}52$ cm',
            'Le rayon est proportionnel à $\\sqrt{m}$ : les ions les plus lourds font le plus grand demi-cercle.',
          ],
          result: 'R_6 = \\frac{1}{B}\\sqrt{\\frac{2m_6U}{e}} \\approx 10{,}52\\ \\text{cm}',
        },
        {
          label: 'Calcule la distance $I_1 I_2$ entre les deux impacts (en cm).',
          answer: {
            kind: 'number',
            value: 1.6857689,
            tolerance: 0.05,
            unit: 'cm',
          },
          steps: [
            '$R_7 = R_6\\sqrt{\\dfrac{7}{6}}$ $\\approx 11{,}36$ cm',
            'Après un demi-tour, chaque ion frappe la plaque à la distance $2R$ de O.',
            '$I_1 I_2 = 2(R_7 - R_6) \\approx 1{,}69$ cm',
          ],
          result: 'I_1I_2 = 2(R_7 - R_6) \\approx 1{,}69\\ \\text{cm}',
        },
      ],
    },
    {
      id: 'mag-cyclotron',
      level: 3,
      title: 'Le cyclotron',
      source: 'Type concours',
      statement: 'Un cyclotron accélère des protons. Ils tournent dans deux « dees » plongés dans un champ magnétique $B = 1{,}5$ T et sont accélérés à chaque passage entre les dees par une tension alternative. Le rayon maximal de la trajectoire est $R_{max} = 50$ cm.',
      given: [
        {
          label: 'B',
          value: '1,5 T',
        },
        {
          label: 'R_max',
          value: '0,50 m',
        },
        {
          label: 'm_p',
          value: '1,67·10⁻²⁷ kg',
        },
        {
          label: '1 MeV',
          value: '1,6·10⁻¹³ J',
        },
      ],
      parts: [
        {
          label: 'Quelle doit être la fréquence de la tension accélératrice (en MHz) ?',
          answer: {
            kind: 'number',
            value: 22.872567,
            tolerance: 0.2,
            unit: 'MHz',
          },
          steps: [
            'La tension doit changer de signe à chaque demi-tour : sa fréquence est égale à la fréquence de rotation des protons.',
            '$f = \\dfrac{1}{T} = \\dfrac{eB}{2\\pi m}$ (indépendante de la vitesse)',
            '$f = \\dfrac{1{,}6 \\cdot 10^{-19} \\times 1{,}5}{2\\pi \\times 1{,}67 \\cdot 10^{-27}} \\approx 22{,}9$ MHz',
          ],
          result: 'f = \\frac{eB}{2\\pi m} \\approx 22{,}9\\ \\text{MHz}',
        },
        {
          label: "Calcule l'énergie cinétique maximale des protons (en MeV).",
          answer: {
            kind: 'number',
            value: 26.946108,
            tolerance: 0.5,
            unit: 'MeV',
          },
          steps: [
            '$R_{max} = \\dfrac{m v_{max}}{eB} \\Rightarrow v_{max} = \\dfrac{e B R_{max}}{m}$',
            '$E_{c,max} = \\tfrac12 m v_{max}^2 = \\dfrac{(e B R_{max})^2}{2m}$',
            '$E_{c,max} \\approx 4{,}31 \\cdot 10^{-12}$ J $\\approx 26{,}9$ MeV',
          ],
          result: 'E_{c,max} = \\frac{(eBR_{max})^2}{2m} \\approx 26{,}9\\ \\text{MeV}',
        },
      ],
    },
  ],
  quiz: [],
  applications: [
    {
      title: "Le cyclotron de l'hôpital",
      tagline: 'À quelle fréquence accélérer les protons ?',
      situation: 'Pour fabriquer le fluor 18 utilisé en imagerie médicale (TEP), les hôpitaux utilisent un cyclotron : des protons tournent dans un champ magnétique $B = 1,5$ T et sont accélérés à chaque demi-tour.',
      model: 'Dans le champ $\\vec{B}$, le proton décrit des demi-cercles. La période $T = \\dfrac{2\\pi m}{|q|B}$ ne dépend pas de la vitesse : on peut accélérer les protons avec une tension alternative de fréquence fixe.',
      questions: [
        'Calcule la fréquence de rotation des protons (en MHz). On prend m = 1,67×10⁻²⁷ kg et e = 1,6×10⁻¹⁹ C.',
      ],
      check: {
        value: 22.872567,
        tolerance: 0.02,
        unit: 'MHz',
      },
      solution: [
        '$f = \\dfrac{1}{T} = \\dfrac{|q|B}{2\\pi m}$',
        'A.N. : $f = \\dfrac{1{,}6\\times10^{-19}\\times 1,5}{2\\pi\\times 1{,}67\\times10^{-27}} \\approx 22,9\\times10^{6}$ Hz',
      ],
      fact: "Le fluor 18 a une demi-vie de moins de 2 h : il faut le produire près de l'hôpital et l'injecter au patient très rapidement.",
    },
    {
      title: "Séparer les isotopes de l'uranium",
      tagline: 'De combien les deux isotopes sont-ils séparés ?',
      situation: 'Dans un spectrographe de masse, des ions ²³⁵U⁺ et ²³⁸U⁺ sont accélérés sous $U = 4000$ V puis déviés par un champ $B = 0,5$ T. Ils décrivent un demi-cercle avant de frapper un détecteur.',
      model: "Le rayon $R = \\dfrac{1}{B}\\sqrt{\\dfrac{2mU}{|q|}}$ augmente avec la masse : les ions les plus lourds frappent plus loin. Les points d'impact sont séparés de $2(R_2 - R_1)$.",
      questions: [
        "Calcule la distance entre les points d'impact des deux isotopes (en mm). On prend u = 1,66×10⁻²⁷ kg.",
      ],
      check: {
        value: 3.5544868,
        tolerance: 0.03,
        unit: 'mm',
      },
      solution: [
        "Vitesse à la sortie de l'accélérateur : $v = \\sqrt{\\dfrac{2|q|U}{m}}$ ; rayon $R = \\dfrac{mv}{|q|B}$",
        '$d = 2(R_{238} - R_{235})$ avec $m = A\\,u$',
        "A.N. : $d \\approx 3,6$ mm : une séparation faible, d'où la difficulté de l'enrichissement.",
      ],
      fact: "Les centrales nucléaires ont besoin d'uranium « enrichi » en ²³⁵U (3 à 5 % au lieu de 0,7 %). Pendant la Seconde Guerre mondiale, on a utilisé d'énormes spectrographes (les « calutrons ») pour cela.",
    },
  ],
};
