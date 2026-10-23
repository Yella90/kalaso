import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Sous un nuage d’orage, les cheveux se dressent parfois sur la tête : l’espace lui-même est modifié par les énormes charges du nuage. Toute charge placée dans cette région subit une force. Pour décrire cette « influence » en chaque point, les physiciens ont inventé le **champ électrique**.',
  objectives: [
    'définir le vecteur champ électrique à partir de la force $\\vec{F} = q\\vec{E}$ ;',
    'calculer le champ créé par une charge ponctuelle ;',
    'décrire le champ uniforme entre deux plaques et utiliser $E = U/d$ ;',
    'prévoir la force subie par un électron ou un proton dans un champ.',
  ],
  sections: [
    {
      title: 'Définition du champ électrique',
      blocks: [
        {
          kind: 'formula',
          tex: '\\vec{F} = q\\,\\vec{E}',
          legend: ['$\\vec{E}$ : champ électrique au point considéré, en N/C (ou V/m) ; $q$ : charge placée en ce point'],
        },
        {
          kind: 'rule',
          text: 'Pour une charge positive, la force a le **même sens** que le champ ; pour une charge négative (un électron), elle est de **sens opposé**.',
        },
        {
          kind: 'formula',
          label: 'Champ créé par une charge ponctuelle $Q$',
          tex: 'E = k\\,\\dfrac{|Q|}{d^2}',
          legend: ['$\\vec{E}$ est radial : il s’éloigne de $Q$ si $Q > 0$, il est dirigé vers $Q$ si $Q < 0$'],
        },
        {
          kind: 'text',
          text: 'Les **lignes de champ** sont des courbes tangentes au champ en chaque point. Elles partent des charges positives et aboutissent aux charges négatives.',
        },
      ],
    },
    {
      title: 'Le champ uniforme',
      blocks: [
        {
          kind: 'text',
          text: 'Entre deux plaques métalliques planes et parallèles, reliées à une tension $U$, le champ est **uniforme** : même direction, même sens et même valeur en tout point. Il est perpendiculaire aux plaques et dirigé de la plaque positive vers la plaque négative.',
        },
        {
          kind: 'formula',
          tex: 'E = \\dfrac{U}{d}',
          legend: ['$U$ en volts ; $d$ : distance entre les plaques, en mètres ; $E$ en V/m'],
        },
        {
          kind: 'example',
          title: 'un électron entre deux plaques',
          text: 'Plaques à 4,0 cm l’une de l’autre, sous 200 V.',
          steps: ['$E = \\dfrac{200}{0{,}040} = 5\\,000$ V/m.', 'Force sur un électron : $F = eE = 1{,}6 \\times 10^{-19} \\times 5\\,000 = 8{,}0 \\times 10^{-16}$ N, vers la plaque positive.'],
        },
        {
          kind: 'trap',
          wrong: '« L’électron se déplace dans le sens du champ. »',
          why: 'Sa charge est négative : la force $\\vec{F} = q\\vec{E}$ est opposée au champ.',
          reflex: 'Électron : vers la plaque positive, à contre-champ.',
        },
      ],
    },
  ],
  essentials: [
    '$\\vec{F} = q\\vec{E}$ ; même sens si $q > 0$, sens opposé si $q < 0$.',
    'Charge ponctuelle : $E = k\\frac{|Q|}{d^2}$, champ radial.',
    'Entre deux plaques : champ uniforme, de la plaque + vers la plaque −, $E = \\frac{U}{d}$.',
  ],
  exercises: [
    {
      id: 'champ-ponctuel',
      level: 1,
      title: 'Champ d’une charge ponctuelle',
      statement: 'Une charge $Q = 2{,}0$ µC est placée dans le vide.',
      parts: [
        {
          label: 'Valeur du champ à 30 cm de la charge (en N/C, notation 2e5 acceptée).',
          answer: { kind: 'number', value: 200000, tolerance: 1000, unit: 'N/C' },
          steps: ['$E = 9 \\times 10^9 \\times \\dfrac{2 \\times 10^{-6}}{0{,}09} = 2{,}0 \\times 10^5$ N/C.'],
        },
        {
          label: 'Valeur de la force subie par une charge de 1,0 nC placée en ce point (en N).',
          answer: { kind: 'number', value: 0.0002, tolerance: 0.000002, unit: 'N' },
          steps: ['$F = qE = 10^{-9} \\times 2 \\times 10^5 = 2{,}0 \\times 10^{-4}$ N.'],
        },
      ],
    },
    {
      id: 'champ-uniforme',
      level: 2,
      title: 'Entre deux plaques',
      statement: 'Deux plaques parallèles distantes de 4,0 cm sont soumises à 200 V. Masse de l’électron : $9{,}1 \\times 10^{-31}$ kg.',
      parts: [
        {
          label: 'Valeur du champ (en V/m).',
          answer: { kind: 'number', value: 5000, tolerance: 5, unit: 'V/m' },
          steps: ['$E = \\dfrac{200}{0{,}040} = 5\\,000$ V/m.'],
        },
        {
          label: 'Accélération d’un électron entre les plaques (en m/s², notation 8.8e14 acceptée).',
          answer: { kind: 'number', value: 8.79e14, tolerance: 0.05e14, unit: 'm/s²' },
          steps: ['$a = \\dfrac{eE}{m} = \\dfrac{8{,}0 \\times 10^{-16}}{9{,}1 \\times 10^{-31}} \\approx 8{,}8 \\times 10^{14}$ m/s² : le poids est négligeable.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'L’unité du champ électrique est :',
      choices: ['le V/m (ou N/C)', 'le volt', 'le coulomb', 'le newton'],
      answer: 0,
      explanation: '$E = \\frac{F}{q}$ en N/C, équivalent à V/m.',
    },
    {
      question: 'Entre deux plaques chargées, le champ est dirigé :',
      choices: ['de la plaque + vers la plaque −', 'de la plaque − vers la plaque +', 'parallèlement aux plaques', 'vers le haut'],
      answer: 0,
      explanation: 'Les lignes de champ vont du + vers le −.',
    },
    {
      question: 'Un proton placé dans un champ électrique se déplace :',
      choices: ['dans le sens du champ', 'à contre-champ', 'perpendiculairement au champ', 'il ne bouge pas'],
      answer: 0,
      explanation: '$q > 0$ : force dans le sens de $\\vec{E}$.',
    },
    {
      question: 'Si la tension entre les plaques double, le champ :',
      choices: ['double', 'est divisé par 2', 'ne change pas', 'est multiplié par 4'],
      answer: 0,
      explanation: '$E = \\frac{U}{d}$.',
    },
  ],
  applications: [
    {
      title: 'Sous l’orage',
      tagline: 'Quel champ électrique sous un nuage ?',
      situation:
        'Avant un orage, la tension entre la base d’un nuage et le sol peut atteindre $1{,}0 \\times 10^8$ V ; la base du nuage est à 2 000 m d’altitude.',
      model: 'On assimile le nuage et le sol à deux plaques parallèles : champ uniforme.',
      questions: ['Quelle est la valeur moyenne du champ électrique entre le nuage et le sol, en V/m ?'],
      check: { value: 50000, tolerance: 0.02, unit: 'V/m' },
      solution: ['$E = \\dfrac{1{,}0 \\times 10^8}{2\\,000} = 5{,}0 \\times 10^4$ V/m.', 'Près d’un objet pointu (arbre isolé, paratonnerre), le champ est beaucoup plus fort : c’est là que l’éclair a tendance à frapper.'],
      fact: 'Pendant un orage, il ne faut jamais s’abriter sous un arbre isolé : mieux vaut s’accroupir loin des points élevés, ou rester dans une maison ou une voiture.',
    },
  ],
};
