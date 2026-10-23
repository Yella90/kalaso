import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Une pile de lampe torche, une batterie de moto, la batterie du téléphone : toutes transforment de l’énergie chimique en énergie électrique. À l’intérieur, une réaction d’oxydoréduction a lieu, mais les électrons sont obligés de passer par le circuit extérieur pour aller du réducteur à l’oxydant. C’est le principe de la **pile électrochimique**.',
  objectives: [
    'décrire la pile Daniell et le rôle du pont salin ;',
    'identifier les pôles, l’anode et la cathode ;',
    'calculer la force électromotrice à partir des potentiels standard ;',
    'calculer la quantité d’électricité débitée et la durée de fonctionnement.',
  ],
  sections: [
    {
      title: 'La pile Daniell',
      blocks: [
        {
          kind: 'text',
          text: 'Une lame de zinc plonge dans une solution de sulfate de zinc ; une lame de cuivre dans une solution de sulfate de cuivre. Un **pont salin** (papier ou gel imbibé d’un sel) relie les deux solutions et ferme le circuit tout en évitant leur mélange.',
        },
        {
          kind: 'table',
          head: ['Électrode', 'Réaction', 'Nom', 'Pôle'],
          rows: [
            ['zinc', '$\\ce{Zn -> Zn^2+ + 2e-}$ (oxydation)', '**anode**', '**négatif**'],
            ['cuivre', '$\\ce{Cu^2+ + 2e- -> Cu}$ (réduction)', '**cathode**', '**positif**'],
          ],
        },
        {
          kind: 'formula',
          label: 'Force électromotrice',
          tex: 'E = E°_{+} - E°_{-} = 0{,}34 - (-0{,}76) = 1{,}10\\ \\text{V}',
        },
        {
          kind: 'rule',
          text: 'Dans le circuit extérieur, les électrons vont de l’anode (−) vers la cathode (+) ; le courant circule en sens inverse. Dans le pont salin, ce sont les ions qui assurent le passage du courant.',
        },
      ],
    },
    {
      title: 'Quantité d’électricité',
      blocks: [
        {
          kind: 'formula',
          tex: 'Q = I\\,\\Delta t = n(e^-) \\times F \\qquad F = 96\\,500\\ \\text{C/mol}',
          legend: ['$F$ : constante de Faraday, charge d’une mole d’électrons'],
        },
        {
          kind: 'example',
          title: 'durée de vie',
          text: 'Une pile Daniell consomme 0,65 g de zinc (0,010 mol) et débite 0,10 A.',
          steps: ['$n(e^-) = 2 \\times 0{,}010 = 0{,}020$ mol, soit $Q = 0{,}020 \\times 96\\,500 = 1\\,930$ C.', '$\\Delta t = \\dfrac{1\\,930}{0{,}10} = 19\\,300$ s, soit environ 5,4 h.'],
        },
        {
          kind: 'trap',
          wrong: '« Le pôle positif d’une pile est l’anode. »',
          why: 'L’anode est le lieu de l’oxydation, qui libère des électrons : c’est le pôle négatif d’une pile.',
          reflex: 'Pile : anode = pôle −, cathode = pôle +.',
        },
      ],
    },
    {
      title: 'Les piles et batteries du quotidien',
      blocks: [
        {
          kind: 'list',
          items: [
            '**piles salines et alcalines** (zinc et dioxyde de manganèse) : 1,5 V, non rechargeables ;',
            '**batterie au plomb** (motos, voitures, kits solaires) : 2 V par élément, rechargeable ;',
            '**batteries lithium-ion** (téléphones) : environ 3,7 V, rechargeables, très légères.',
          ],
        },
        {
          kind: 'callout',
          variant: 'attention',
          blocks: [
            {
              kind: 'text',
              text: 'Les piles et batteries usagées contiennent des métaux toxiques (plomb, mercure, cadmium) et des acides. Il ne faut ni les jeter dans la nature ni les brûler ; les batteries au plomb se recyclent.',
            },
          ],
        },
      ],
    },
  ],
  essentials: [
    'Pile Daniell : anode zinc (pôle −, oxydation), cathode cuivre (pôle +, réduction), pont salin.',
    'f.é.m. : $E = E°_+ - E°_-$ (1,10 V pour la pile Daniell).',
    '$Q = I\\Delta t = n(e^-)F$, avec $F = 96\\,500$ C/mol.',
    'Piles jetables, accumulateurs rechargeables ; recycler les piles usagées.',
  ],
  exercises: [
    {
      id: 'pile-fem',
      level: 1,
      title: 'Force électromotrice',
      statement: 'Utilise : $E°(\\ce{Ag+}/\\ce{Ag}) = 0{,}80$ V, $E°(\\ce{Cu^2+}/\\ce{Cu}) = 0{,}34$ V, $E°(\\ce{Zn^2+}/\\ce{Zn}) = -0{,}76$ V.',
      parts: [
        {
          label: 'f.é.m. de la pile zinc-argent (en V).',
          answer: { kind: 'number', value: 1.56, tolerance: 0.005, unit: 'V' },
          steps: ['$0{,}80 - (-0{,}76) = 1{,}56$ V.'],
        },
        {
          label: 'f.é.m. de la pile cuivre-argent (en V).',
          answer: { kind: 'number', value: 0.46, tolerance: 0.005, unit: 'V' },
          steps: ['$0{,}80 - 0{,}34 = 0{,}46$ V ; le cuivre est alors le pôle négatif.'],
        },
      ],
    },
    {
      id: 'pile-duree',
      level: 2,
      title: 'Durée de fonctionnement',
      statement: 'Une pile Daniell débite 0,10 A ; on consomme 0,65 g de zinc. $M(\\ce{Zn}) = 65$ g/mol.',
      parts: [
        {
          label: 'Quantité d’électricité débitée (en C).',
          answer: { kind: 'number', value: 1930, tolerance: 5, unit: 'C' },
          steps: ['$n(\\ce{Zn}) = 0{,}010$ mol ; $n(e^-) = 0{,}020$ mol ; $Q = 1\\,930$ C.'],
        },
        {
          label: 'Durée de fonctionnement (en h).',
          answer: { kind: 'number', value: 5.36, tolerance: 0.03, unit: 'h' },
          steps: ['$\\dfrac{1\\,930}{0{,}10} = 19\\,300$ s $\\approx 5{,}4$ h.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Dans une pile, l’oxydation a lieu :',
      choices: ['à l’anode, pôle négatif', 'à la cathode, pôle positif', 'dans le pont salin', 'dans le fil extérieur'],
      answer: 0,
      explanation: 'Le réducteur y cède ses électrons.',
    },
    {
      question: 'Le pont salin sert à :',
      choices: ['fermer le circuit en évitant le mélange des solutions', 'fournir des électrons', 'augmenter la tension', 'refroidir la pile'],
      answer: 0,
      explanation: 'Les ions y circulent pour maintenir la neutralité des solutions.',
    },
    {
      question: 'La constante de Faraday vaut environ :',
      choices: ['96 500 C/mol', '1,6 × 10⁻¹⁹ C', '6,02 × 10²³ C', '1 C/mol'],
      answer: 0,
      explanation: '$F = N_A \\times e$.',
    },
    {
      question: 'Une batterie au plomb est :',
      choices: ['rechargeable', 'jetable', 'sans danger pour l’environnement', 'une pile Daniell'],
      answer: 0,
      explanation: 'C’est un accumulateur ; elle contient du plomb et de l’acide sulfurique.',
    },
  ],
  applications: [
    {
      title: 'La lampe torche',
      tagline: 'Combien d’heures d’éclairage ?',
      situation:
        'Une pile rechargeable de lampe torche a une capacité de 2 000 mAh (elle peut débiter 2 000 mA pendant 1 h). L’ampoule consomme 0,20 A.',
      model: 'Débit constant jusqu’à décharge complète.',
      questions: ['Quelle quantité d’électricité la pile peut-elle débiter, en C ?', 'Combien d’heures la lampe peut-elle éclairer ?'],
      check: { value: 10, tolerance: 0.02, unit: 'h' },
      solution: ['$Q = 2{,}0\\ \\text{A} \\times 3\\,600\\ \\text{s} = 7\\,200$ C.', '$\\Delta t = \\dfrac{7\\,200}{0{,}20} = 36\\,000$ s, soit 10 h.'],
      fact: 'La capacité en mAh est une quantité d’électricité : 1 mAh = 3,6 C.',
    },
  ],
};
