import type { Adventure } from '../types';

export const adventure: Adventure = {
  id: 'eau-du-puits',
  title: 'Rendre potable l’eau du puits',
  subject: 'chimie',
  classes: ['10e', '11e'],
  pitch: 'Les enfants d’un village près de Kati ont souvent mal au ventre. L’eau du puits est-elle en cause ?',
  intro:
    'Au centre de santé, l’infirmière Awa a remarqué que beaucoup d’enfants du village ont mal au ventre. Le village boit l’eau d’un puits creusé près des champs. Awa a fait analyser un échantillon au laboratoire de Bamako et te demande de l’aider à comprendre les résultats, puis à traiter l’eau.',
  missions: [
    {
      id: 'ions',
      title: 'Lire l’analyse',
      story:
        'Le laboratoire a trouvé dans l’eau des ions calcium, magnésium, hydrogénocarbonate et nitrate. Les nitrates viennent souvent des engrais des champs voisins. Au-delà d’une certaine dose, ils sont dangereux pour les bébés.',
      notions: [{ classId: '10e', subject: 'chimie', chapterId: 'ions-liaison-ionique' }],
      challenge: {
        kind: 'choice',
        question: 'Quelle est la formule de l’ion nitrate ?',
        choices: ['$\\ce{NO3-}$', '$\\ce{NH4+}$', '$\\ce{NO2}$', '$\\ce{N^{3-}}$'],
        answer: 0,
      },
      hints: ['C’est un ion polyatomique négatif formé d’un atome d’azote et de trois atomes d’oxygène.'],
      solution: ['L’ion nitrate est $\\ce{NO3-}$. $\\ce{NH4+}$ est l’ion ammonium, et $\\ce{NO2}$ est une molécule, pas un ion.'],
      debrief: 'L’engrais « NPK » et l’urée des champs peuvent se transformer en nitrates qui s’infiltrent jusqu’à la nappe.',
    },
    {
      id: 'concentration',
      title: 'Combien de nitrates ?',
      story: 'Le laboratoire donne une concentration en masse. Pour comparer avec d’autres analyses, Awa veut la concentration molaire.',
      data: ['Concentration en masse des nitrates : 62 mg/L', '$M(\\ce{N}) = 14$ g/mol ; $M(\\ce{O}) = 16$ g/mol'],
      notions: [
        { classId: '10e', subject: 'chimie', chapterId: 'mole' },
        { classId: '10e', subject: 'chimie', chapterId: 'solutions' },
      ],
      challenge: {
        kind: 'numeric',
        question: 'Quelle est la concentration molaire des ions nitrate, en millimoles par litre ?',
        answer: 1,
        unit: 'mmol/L',
        tolerance: 0.03,
      },
      hints: ['Calcule d’abord la masse molaire de $\\ce{NO3-}$.', '$C = \\dfrac{C_m}{M}$, avec $C_m$ en g/L.'],
      solution: [
        '$M(\\ce{NO3-}) = 14 + 3 \\times 16 = 62$ g/mol.',
        '$C = \\dfrac{0{,}062}{62} = 1{,}0 \\times 10^{-3}$ mol/L, soit 1,0 mmol/L.',
      ],
      debrief: 'La limite recommandée pour l’eau de boisson est de 50 mg/L de nitrates. Avec 62 mg/L, l’eau du puits la dépasse.',
    },
    {
      id: 'dilution',
      title: 'Diluer avec l’eau de pluie',
      story:
        'En saison des pluies, le village récupère l’eau des toits dans des citernes. Cette eau ne contient presque pas de nitrates. En la mélangeant à l’eau du puits, on peut descendre sous la limite.',
      data: ['Eau du puits : 62 mg/L de nitrates', 'Limite à atteindre : 50 mg/L', 'Volume d’eau du puits : 1 L'],
      notions: [{ classId: '10e', subject: 'chimie', chapterId: 'solutions' }],
      challenge: {
        kind: 'numeric',
        question: 'Quel volume minimal d’eau de pluie faut-il ajouter à 1 L d’eau du puits ?',
        answer: 240,
        unit: 'mL',
        tolerance: 0.03,
      },
      hints: ['Pendant une dilution, la masse de nitrates ne change pas : $C_1 V_1 = C_2 V_2$.'],
      solution: [
        '$V_2 = \\dfrac{C_1 V_1}{C_2} = \\dfrac{62 \\times 1}{50} = 1{,}24$ L.',
        'Il faut ajouter $1{,}24 - 1 = 0{,}24$ L, soit 240 mL d’eau de pluie par litre d’eau du puits.',
      ],
      debrief: 'Mélanger 4 seaux d’eau du puits avec 1 seau d’eau de pluie suffit, avec un peu de marge.',
    },
    {
      id: 'chlore',
      title: 'Désinfecter le canari',
      story:
        'Les maux de ventre viennent aussi des microbes. Le centre de santé distribue une solution chlorée pour désinfecter l’eau des canaris. Il faut en mettre assez pour tuer les microbes, mais pas trop pour que l’eau reste buvable.',
      data: ['Volume du canari : 20 L', 'Dose conseillée : 0,5 mg de chlore actif par litre', 'Solution du centre de santé : 5 g de chlore actif par litre'],
      notions: [{ classId: '10e', subject: 'chimie', chapterId: 'solutions' }],
      challenge: {
        kind: 'numeric',
        question: 'Quel volume de solution chlorée faut-il verser dans le canari ?',
        answer: 2,
        unit: 'mL',
        tolerance: 0.03,
      },
      hints: ['Calcule la masse de chlore nécessaire pour 20 L, puis le volume de solution qui la contient.'],
      solution: [
        'Masse de chlore : $20 \\times 0{,}5 = 10$ mg, soit 0,010 g.',
        'Volume de solution : $V = \\dfrac{0{,}010}{5} = 0{,}002$ L, soit 2 mL : environ 40 gouttes.',
      ],
      debrief: 'Awa rappelle aux familles d’attendre 30 minutes après avoir mis le chlore avant de boire.',
    },
    {
      id: 'ph',
      title: 'Mesurer le pH',
      story: 'Le papier pH trempé dans l’eau du puits indique un pH de 6,5. L’eau de boisson doit avoir un pH compris entre 6,5 et 8,5.',
      notions: [{ classId: '9e', subject: 'chimie', chapterId: 'acides-bases' }],
      challenge: {
        kind: 'choice',
        question: 'Avec un pH de 6,5, l’eau du puits est :',
        choices: ['très acide', 'légèrement acide', 'neutre', 'basique'],
        answer: 1,
      },
      hints: ['À 25 °C, une solution est neutre quand son pH vaut 7.'],
      solution: ['Le pH est un peu inférieur à 7 : l’eau est légèrement acide. Elle reste à la limite acceptable pour la boisson.'],
      debrief: 'Une eau trop acide peut attaquer les tuyaux métalliques. Ici, il suffit de surveiller le pH chaque saison.',
    },
    {
      id: 'tartre',
      title: 'Le dépôt blanc dans la bouilloire',
      story:
        'Les familles qui font bouillir l’eau voient un dépôt blanc au fond de la bouilloire : c’est du calcaire. Quand on chauffe l’eau, les ions calcium et hydrogénocarbonate réagissent.',
      data: [
        'Équation : $\\ce{Ca^{2+} + 2HCO3- -> CaCO3 + CO2 + H2O}$',
        'Concentration en ions calcium : 2,0 mmol/L',
        'Volume d’eau bouillie : 10 L',
        '$M(\\ce{CaCO3}) = 100$ g/mol',
      ],
      notions: [
        { classId: '10e', subject: 'chimie', chapterId: 'equation-bilan' },
        { classId: '10e', subject: 'chimie', chapterId: 'mole' },
      ],
      challenge: {
        kind: 'numeric',
        question: 'Si tous les ions calcium réagissent, quelle masse de calcaire se dépose ?',
        answer: 2,
        unit: 'g',
        tolerance: 0.03,
      },
      hints: ['D’après l’équation, 1 mol d’ions $\\ce{Ca^{2+}}$ donne 1 mol de $\\ce{CaCO3}$.'],
      solution: [
        '$n(\\ce{Ca^{2+}}) = 2{,}0 \\times 10^{-3} \\times 10 = 0{,}020$ mol.',
        '$n(\\ce{CaCO3}) = 0{,}020$ mol, donc $m = 0{,}020 \\times 100 = 2{,}0$ g.',
      ],
      debrief: 'Ce calcaire n’est pas dangereux pour la santé, mais il abîme les bouilloires. Un peu de vinaigre le dissout.',
    },
  ],
  outro:
    'Grâce à ton travail, le village mélange l’eau du puits avec l’eau de pluie et désinfecte les canaris. Trois mois plus tard, Awa compte deux fois moins d’enfants malades. Ions, mole, concentration, dilution, pH et équation-bilan : la chimie de 10e a protégé tout un village.',
};
