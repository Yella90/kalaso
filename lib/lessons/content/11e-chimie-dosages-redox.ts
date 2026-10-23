import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Les comprimés de fer donnés aux femmes enceintes contiennent-ils vraiment la dose annoncée ? Combien de vitamine C reste-t-il dans un jus de baobab ? Pour le vérifier, le laboratoire fait réagir l’échantillon avec une solution d’oxydant de concentration connue, goutte à goutte, jusqu’au changement de couleur : c’est un **dosage d’oxydoréduction**.',
  objectives: [
    'définir l’équivalence d’un dosage d’oxydoréduction ;',
    'repérer l’équivalence par un changement de couleur ;',
    'écrire la relation à l’équivalence à partir de l’équation ;',
    'calculer une concentration ou une masse inconnue.',
  ],
  sections: [
    {
      title: 'Principe du dosage',
      blocks: [
        {
          kind: 'text',
          text: 'On verse progressivement une solution **titrante** (de concentration connue) dans un volume connu de solution à **doser**. La réaction utilisée doit être **totale**, **rapide** et **unique**.',
        },
        {
          kind: 'definition',
          term: 'Équivalence',
          text: 'moment où les réactifs ont été introduits dans les proportions de l’équation : le réactif dosé a été entièrement consommé, et aucun excès de réactif titrant n’est encore présent.',
        },
        {
          kind: 'formula',
          label: 'Pour $a\\,\\text{Ox} + b\\,\\text{Red} \\rightarrow \\dots$',
          tex: '\\dfrac{n(\\text{Ox})_{versé}}{a} = \\dfrac{n(\\text{Red})_{initial}}{b}',
        },
      ],
    },
    {
      title: 'Repérer l’équivalence',
      blocks: [
        {
          kind: 'list',
          items: [
            'le **permanganate** $\\ce{MnO4-}$ est violet et devient incolore ($\\ce{Mn^2+}$) en réagissant : tant qu’il réagit, la solution reste incolore ; la première goutte en excès donne une **teinte rose persistante** ;',
            'le **diiode** est brun-jaune ; avec quelques gouttes d’**empois d’amidon**, il donne une couleur bleu foncé très visible, qui disparaît à l’équivalence lors d’un dosage par le thiosulfate.',
          ],
        },
        {
          kind: 'example',
          title: 'dosage des ions fer(II) par le permanganate',
          text: '$\\ce{MnO4- + 5Fe^2+ + 8H+ -> Mn^2+ + 5Fe^3+ + 4H2O}$.',
          steps: ['À l’équivalence : $n(\\ce{Fe^2+}) = 5\\,n(\\ce{MnO4-})$, soit $C_{Fe}V_{Fe} = 5\\,C_{Mn}V_E$.'],
        },
        {
          kind: 'trap',
          wrong: '« À l’équivalence, $C_1V_1 = C_2V_2$ dans tous les cas. »',
          why: 'Cela n’est vrai que si les coefficients de l’équation sont égaux.',
          reflex: 'Toujours partir de l’équation et de ses coefficients.',
        },
      ],
    },
  ],
  essentials: [
    'Réaction de dosage : totale, rapide, unique ; solution titrante de concentration connue.',
    'Équivalence : réactifs dans les proportions de l’équation ; $\\frac{n(\\text{Ox})}{a} = \\frac{n(\\text{Red})}{b}$.',
    'Permanganate : teinte rose persistante à l’équivalence ; diiode : empois d’amidon (bleu).',
  ],
  exercises: [
    {
      id: 'dos-fer',
      level: 1,
      title: 'Doser des ions fer(II)',
      statement: 'On dose 10,0 mL d’une solution d’ions $\\ce{Fe^2+}$ par du permanganate à $0{,}020$ mol/L ; l’équivalence est obtenue pour 12,5 mL.',
      parts: [
        {
          label: 'Quantité de permanganate versée à l’équivalence (en mol).',
          answer: { kind: 'number', value: 0.00025, tolerance: 0.000002, unit: 'mol' },
          steps: ['$n = 0{,}020 \\times 12{,}5 \\times 10^{-3} = 2{,}5 \\times 10^{-4}$ mol.'],
        },
        {
          label: 'Concentration de la solution d’ions fer(II) (en mol/L).',
          answer: { kind: 'number', value: 0.125, tolerance: 0.001, unit: 'mol/L' },
          steps: ['$n(\\ce{Fe^2+}) = 5 \\times 2{,}5 \\times 10^{-4} = 1{,}25 \\times 10^{-3}$ mol dans 10,0 mL.', '$C = 0{,}125$ mol/L.'],
        },
      ],
    },
    {
      id: 'dos-iode',
      level: 2,
      title: 'Doser du diiode',
      statement: 'On dose 20,0 mL d’une solution de diiode par du thiosulfate de sodium à 0,10 mol/L : $\\ce{I2 + 2S2O3^2- -> 2I- + S4O6^2-}$. L’équivalence est obtenue pour 16,0 mL.',
      parts: [
        {
          label: 'Quantité de diiode dosée (en mol).',
          answer: { kind: 'number', value: 0.0008, tolerance: 0.00001, unit: 'mol' },
          steps: ['$n(\\ce{S2O3^2-}) = 1{,}6 \\times 10^{-3}$ mol ; $n(\\ce{I2}) = \\dfrac{1{,}6 \\times 10^{-3}}{2} = 8{,}0 \\times 10^{-4}$ mol.'],
        },
        {
          label: 'Concentration de la solution de diiode (en mol/L).',
          answer: { kind: 'number', value: 0.04, tolerance: 0.0005, unit: 'mol/L' },
          steps: ['$C = \\dfrac{8{,}0 \\times 10^{-4}}{0{,}020} = 0{,}040$ mol/L.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Dans un dosage par le permanganate, l’équivalence est repérée par :',
      choices: ['une teinte rose persistante', 'un dégagement gazeux', 'un précipité blanc', 'une décoloration du bleu'],
      answer: 0,
      explanation: 'Le premier excès de $\\ce{MnO4-}$ colore la solution.',
    },
    {
      question: 'L’empois d’amidon sert à repérer :',
      choices: ['la présence de diiode', 'les ions fer', 'le pH', 'le permanganate'],
      answer: 0,
      explanation: 'Il donne une couleur bleu foncé avec le diiode.',
    },
    {
      question: 'Une réaction de dosage doit être :',
      choices: ['totale, rapide et unique', 'lente et limitée', 'réversible', 'exothermique avant tout'],
      answer: 0,
      explanation: 'Sinon l’équivalence serait mal définie.',
    },
    {
      question: 'Pour $\\ce{MnO4- + 5Fe^2+}$, à l’équivalence :',
      choices: ['$n(\\ce{Fe^2+}) = 5\\,n(\\ce{MnO4-})$', '$n(\\ce{Fe^2+}) = n(\\ce{MnO4-})$', '$5\\,n(\\ce{Fe^2+}) = n(\\ce{MnO4-})$', '$n(\\ce{Fe^2+}) = 8\\,n(\\ce{MnO4-})$'],
      answer: 0,
      explanation: 'Un ion permanganate oxyde cinq ions fer(II).',
    },
  ],
  applications: [
    {
      title: 'Le comprimé de fer',
      tagline: 'Contient-il bien la dose annoncée ?',
      situation:
        'Pendant la grossesse, on donne des comprimés de sulfate de fer(II) contre l’anémie. Un laboratoire dissout un comprimé et dose les ions $\\ce{Fe^2+}$ par du permanganate à 0,020 mol/L : l’équivalence est obtenue pour 10,8 mL. $M(\\ce{Fe}) = 55{,}8$ g/mol.',
      model: 'Seuls les ions fer(II) réagissent avec le permanganate.',
      questions: ['Quelle masse de fer contient le comprimé, en mg ?'],
      check: { value: 60.3, tolerance: 0.02, unit: 'mg' },
      solution: ['$n(\\ce{MnO4-}) = 0{,}020 \\times 10{,}8 \\times 10^{-3} = 2{,}16 \\times 10^{-4}$ mol.', '$n(\\ce{Fe^2+}) = 5 \\times 2{,}16 \\times 10^{-4} = 1{,}08 \\times 10^{-3}$ mol, soit $m \\approx 60$ mg : conforme à une dose de 60 mg.'],
      fact: 'Le jus d’orange ou de citron pris avec le comprimé améliore l’absorption du fer ; le thé la diminue.',
    },
  ],
};
