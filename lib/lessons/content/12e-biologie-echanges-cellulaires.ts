import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Pourquoi la salade arrosée redevient-elle croquante ? Pourquoi sale-t-on la viande pour faire le kilichi, et pourquoi soigne-t-on la diarrhée d’un enfant avec une solution de sels et de sucre ? Dans chaque cas, de l’eau et des substances traversent la **membrane** des cellules. Elle ne laisse pas tout passer, ni n’importe comment.',
  objectives: [
    'expliquer la diffusion et l’osmose ;',
    'prévoir le comportement d’une cellule dans un milieu hypotonique, isotonique ou hypertonique ;',
    'distinguer transport passif et transport actif ;',
    'décrire l’endocytose et l’exocytose.',
  ],
  sections: [
    {
      title: 'Diffusion et osmose',
      blocks: [
        {
          kind: 'definition',
          term: 'Diffusion',
          text: 'déplacement spontané d’une substance dissoute du milieu où elle est **la plus concentrée** vers celui où elle l’est le moins, jusqu’à l’égalité des concentrations. Elle ne consomme pas d’énergie.',
        },
        {
          kind: 'definition',
          term: 'Osmose',
          text: 'passage de l’**eau** à travers une membrane semi-perméable, du milieu le **moins concentré** en solutés (hypotonique) vers le milieu le **plus concentré** (hypertonique).',
        },
        {
          kind: 'table',
          head: ['Milieu extérieur', 'Cellule animale (globule rouge)', 'Cellule végétale'],
          rows: [
            ['hypotonique (eau pure)', 'gonfle et éclate : **hémolyse**', 'se gonfle : **turgescence** (la paroi l’empêche d’éclater)'],
            ['isotonique (sérum physiologique, 9 g/L de NaCl)', 'reste normale', 'reste normale'],
            ['hypertonique (eau très salée)', 'se ratatine : **crénelure**', 'la membrane se décolle de la paroi : **plasmolyse**'],
          ],
        },
        {
          kind: 'trap',
          wrong: '« Le sel entre dans la cellule plongée dans l’eau salée. »',
          why: 'La membrane laisse passer l’eau bien plus facilement que les ions : c’est surtout l’eau qui sort de la cellule.',
          reflex: 'En osmose, raisonner sur le mouvement de l’**eau** : elle va vers le milieu le plus concentré.',
        },
      ],
    },
    {
      title: 'Transport passif et transport actif',
      blocks: [
        {
          kind: 'list',
          items: [
            '**transport passif** : dans le sens du gradient de concentration, sans énergie ; directement à travers la bicouche (petites molécules : $\\ce{O2}$, $\\ce{CO2}$) ou grâce à des protéines (canaux, transporteurs : glucose, ions) ;',
            '**transport actif** : **contre** le gradient de concentration ; il consomme de l’énergie (ATP), grâce à des protéines appelées pompes.',
          ],
        },
        {
          kind: 'example',
          title: 'la pompe sodium-potassium',
          text: 'Dans nos cellules, il y a beaucoup de $\\ce{K+}$ et peu de $\\ce{Na+}$, l’inverse du milieu extérieur.',
          steps: ['Les ions diffusent sans cesse dans le sens de leur gradient.', 'La pompe rejette 3 $\\ce{Na+}$ et fait entrer 2 $\\ce{K+}$ à chaque ATP utilisé : elle maintient ces différences, indispensables au message nerveux.'],
        },
      ],
    },
    {
      title: 'Endocytose et exocytose',
      blocks: [
        {
          kind: 'text',
          text: 'Les grosses particules passent dans des vésicules. Par **endocytose**, la membrane entoure une particule et l’emporte dans la cellule (la **phagocytose** des bactéries par les globules blancs en est un exemple). Par **exocytose**, une vésicule fusionne avec la membrane et libère son contenu à l’extérieur (sécrétion d’hormones, d’enzymes digestives).',
        },
      ],
    },
  ],
  essentials: [
    'Diffusion : soluté du plus concentré vers le moins concentré, sans énergie.',
    'Osmose : eau vers le milieu le plus concentré (hypertonique).',
    'Hypotonique : hémolyse ou turgescence ; hypertonique : crénelure ou plasmolyse ; 9 g/L de NaCl : isotonique.',
    'Transport actif : contre le gradient, avec ATP (pompe Na⁺/K⁺) ; endocytose et exocytose pour les grosses particules.',
  ],
  exercises: [
    {
      id: 'ech-isotonique',
      level: 1,
      title: 'Le sérum physiologique',
      statement: 'Le sérum physiologique contient 9,0 g de chlorure de sodium par litre. M(NaCl) = 58,5 g/mol.',
      parts: [
        {
          label: 'Calcule sa concentration molaire en NaCl (en mol/L).',
          answer: { kind: 'number', value: 0.154, tolerance: 0.002, unit: 'mol/L' },
          steps: ['$C = \\dfrac{9{,}0}{58{,}5} \\approx 0{,}154$ mol/L.'],
        },
        {
          label: 'Chaque NaCl donne deux ions. Quelle est la concentration totale en particules dissoutes (en mol/L) ?',
          answer: { kind: 'number', value: 0.308, tolerance: 0.004, unit: 'mol/L' },
          steps: ['$2 \\times 0{,}154 \\approx 0{,}31$ mol/L : c’est à peu près la concentration en particules du plasma sanguin.'],
        },
      ],
    },
    {
      id: 'ech-osmose',
      level: 2,
      title: 'Prévoir le comportement des cellules',
      statement: 'Réponds par un mot.',
      parts: [
        {
          label: 'Des globules rouges placés dans de l’eau distillée éclatent. Comment s’appelle ce phénomène ?',
          answer: { kind: 'text', display: 'hémolyse', accepted: ['hémolyse', 'hemolyse', 'l’hémolyse', "l'hemolyse", "l'hémolyse"] },
          steps: ['L’eau distillée est hypotonique : l’eau entre par osmose, la cellule gonfle et éclate.'],
        },
        {
          label: 'Des cellules d’épiderme d’oignon placées dans une solution très salée : comment s’appelle l’état observé ?',
          answer: { kind: 'text', display: 'plasmolyse', accepted: ['plasmolyse', 'la plasmolyse', 'plasmolysée', 'plasmolysees', 'plasmolysées'] },
          steps: ['Milieu hypertonique : l’eau sort, la vacuole rétrécit et la membrane se décolle de la paroi.'],
        },
        {
          label: 'Le transport qui fait entrer un ion contre son gradient de concentration est-il « actif » ou « passif » ?',
          answer: { kind: 'text', display: 'actif', accepted: ['actif', 'transport actif'] },
          steps: ['Aller contre le gradient demande de l’énergie, fournie par l’ATP.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Lors de l’osmose, l’eau se déplace vers :',
      choices: ['le milieu le plus concentré en solutés', 'le milieu le moins concentré', 'l’extérieur dans tous les cas', 'aucun milieu'],
      answer: 0,
      explanation: 'Vers le milieu hypertonique.',
    },
    {
      question: 'Un milieu isotonique au sang est :',
      choices: ['le sérum physiologique à 9 g/L de NaCl', 'l’eau distillée', 'l’eau de mer', 'le sirop'],
      answer: 0,
      explanation: 'Il a la même concentration en particules que le plasma.',
    },
    {
      question: 'Le transport actif :',
      choices: ['consomme de l’ATP', 'suit toujours le gradient de concentration', 'ne concerne que l’eau', 'se fait sans protéine'],
      answer: 0,
      explanation: 'Il va contre le gradient grâce à des pompes alimentées par l’ATP.',
    },
    {
      question: 'Un globule blanc qui englobe une bactérie réalise :',
      choices: ['une phagocytose (endocytose)', 'une exocytose', 'une osmose', 'une diffusion'],
      answer: 0,
      explanation: 'La membrane entoure la bactérie et la fait entrer dans une vésicule.',
    },
  ],
  applications: [
    {
      title: 'La solution de réhydratation orale',
      tagline: 'Sauver un enfant qui a la diarrhée',
      situation:
        'Un enfant a une forte diarrhée : il perd beaucoup d’eau et de sels. L’agent de santé donne une solution de réhydratation orale (SRO) qui contient du sel et du glucose, plutôt que de l’eau pure.',
      model: 'Dans l’intestin, le glucose et le sodium entrent ensemble dans les cellules grâce à un transporteur ; l’eau suit par osmose.',
      questions: ['Pourquoi l’eau suit-elle le sel et le glucose absorbés ?', 'Pourquoi ne faut-il pas trop sucrer ou trop saler la solution ?'],
      solution: [
        'Le sodium et le glucose absorbés rendent l’intérieur du corps plus concentré que le contenu de l’intestin : l’eau passe vers le corps par osmose.',
        'Une solution trop concentrée serait hypertonique : elle attirerait l’eau dans l’intestin et aggraverait la diarrhée.',
      ],
      fact: 'La recette familiale recommandée par l’OMS : 1 litre d’eau potable, 6 cuillères à café rases de sucre et une demi-cuillère de sel.',
    },
  ],
};
