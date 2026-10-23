import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Dans un vieux téléviseur à tube, des électrons sont lancés à des dizaines de milliers de kilomètres par seconde vers l’écran. Pour les accélérer, il suffit d’une **tension** : en passant d’un point à un autre, l’électron gagne de l’énergie, comme une pierre qui tombe gagne de la vitesse. Cette « altitude électrique » s’appelle le **potentiel**.',
  objectives: [
    'calculer le travail de la force électrique dans un champ uniforme ;',
    'relier tension, potentiel et champ : $U_{AB} = V_A - V_B$ et $E = U/d$ ;',
    'définir l’énergie potentielle électrique et l’électronvolt ;',
    'calculer la vitesse d’une particule accélérée par une tension.',
  ],
  sections: [
    {
      title: 'Travail de la force électrique',
      blocks: [
        {
          kind: 'formula',
          tex: 'W_{AB}(\\vec{F}) = q\\,\\vec{E} \\cdot \\vec{AB} = q\\,(V_A - V_B) = q\\,U_{AB}',
          legend: ['$V_A$, $V_B$ : potentiels électriques en A et B (V) ; $U_{AB}$ : tension entre A et B'],
        },
        {
          kind: 'rule',
          text: 'Comme le travail du poids, le travail de la force électrique ne dépend **pas du chemin suivi**, seulement des points de départ et d’arrivée.',
        },
        {
          kind: 'rule',
          text: 'Le champ électrique est dirigé vers les **potentiels décroissants**. Dans un champ uniforme, $U = E\\,d$, où $d$ est la distance mesurée le long du champ.',
        },
      ],
    },
    {
      title: 'Énergie potentielle électrique',
      blocks: [
        {
          kind: 'formula',
          tex: 'E_p = q\\,V \\qquad E_c + q\\,V = \\text{constante (seule la force électrique travaille)}',
        },
        {
          kind: 'definition',
          term: 'Électronvolt (eV)',
          text: 'énergie gagnée par un électron accéléré sous une tension de 1 V : $1\\ \\text{eV} = 1{,}6 \\times 10^{-19}$ J. Unité pratique en physique atomique.',
        },
        {
          kind: 'example',
          title: 'accélérer un électron',
          text: 'Un électron initialement immobile est accéléré sous $U = 1\\,000$ V.',
          steps: [
            'Il gagne $E_c = eU = 1\\,000$ eV $= 1{,}6 \\times 10^{-16}$ J.',
            '$v = \\sqrt{\\dfrac{2eU}{m}} = \\sqrt{\\dfrac{2 \\times 1{,}6 \\times 10^{-16}}{9{,}1 \\times 10^{-31}}} \\approx 1{,}9 \\times 10^7$ m/s.',
          ],
        },
        {
          kind: 'trap',
          wrong: '« Un électron est accéléré du potentiel élevé vers le potentiel bas. »',
          why: 'Sa charge est négative : il gagne de l’énergie cinétique en allant vers les potentiels **croissants**.',
          reflex: 'Électron : de la borne − vers la borne + ; proton : de + vers −.',
        },
      ],
    },
  ],
  essentials: [
    '$W_{AB} = qU_{AB} = q(V_A - V_B)$, indépendant du chemin.',
    '$\\vec{E}$ dirigé vers les potentiels décroissants ; champ uniforme : $U = Ed$.',
    '$E_p = qV$ ; $E_c + qV$ constante si seule la force électrique travaille.',
    '1 eV = $1{,}6 \\times 10^{-19}$ J ; particule accélérée : $\\frac{1}{2}mv^2 = |q|U$.',
  ],
  exercises: [
    {
      id: 'pot-travail',
      level: 1,
      title: 'Travail et tension',
      statement: 'Une charge $q = 2{,}0$ µC se déplace de A vers B, avec $U_{AB} = 50$ V.',
      parts: [
        {
          label: 'Travail de la force électrique (en J, notation 1e-4 acceptée).',
          answer: { kind: 'number', value: 0.0001, tolerance: 0.000001, unit: 'J' },
          steps: ['$W = qU_{AB} = 2 \\times 10^{-6} \\times 50 = 1{,}0 \\times 10^{-4}$ J.'],
        },
        {
          label: 'Ce travail est-il « moteur » ou « résistant » ?',
          answer: { kind: 'text', display: 'moteur', accepted: ['moteur'] },
          steps: ['$W > 0$ : la force favorise le déplacement.'],
        },
      ],
    },
    {
      id: 'pot-electron',
      level: 2,
      title: 'Accélérer un électron',
      statement: 'Un électron sans vitesse initiale est accéléré sous une tension de 1 000 V. $m = 9{,}1 \\times 10^{-31}$ kg.',
      parts: [
        {
          label: 'Énergie cinétique gagnée, en eV.',
          answer: { kind: 'number', value: 1000, tolerance: 0, unit: 'eV' },
          steps: ['$E_c = eU = 1\\,000$ eV.'],
        },
        {
          label: 'Vitesse finale (en m/s, notation 1.9e7 acceptée).',
          answer: { kind: 'number', value: 1.875e7, tolerance: 0.02e7, unit: 'm/s' },
          steps: ['$v = \\sqrt{\\dfrac{2 \\times 1{,}6 \\times 10^{-16}}{9{,}1 \\times 10^{-31}}} \\approx 1{,}88 \\times 10^7$ m/s.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Le champ électrique est dirigé :',
      choices: ['vers les potentiels décroissants', 'vers les potentiels croissants', 'perpendiculairement aux équipotentielles mais au hasard', 'toujours vers le haut'],
      answer: 0,
      explanation: 'Du potentiel le plus haut vers le plus bas.',
    },
    {
      question: 'Un électronvolt vaut :',
      choices: ['$1{,}6 \\times 10^{-19}$ J', '1 J', '1 V', '$9{,}1 \\times 10^{-31}$ J'],
      answer: 0,
      explanation: 'C’est $e \\times 1$ V.',
    },
    {
      question: 'Le travail de la force électrique entre A et B :',
      choices: ['ne dépend pas du chemin suivi', 'dépend de la longueur du trajet', 'est toujours nul', 'dépend de la masse'],
      answer: 0,
      explanation: '$W = qU_{AB}$.',
    },
    {
      question: 'Entre deux plaques à 1 cm sous 100 V, le champ vaut :',
      choices: ['10 000 V/m', '100 V/m', '1 V/m', '1 000 V/m'],
      answer: 0,
      explanation: '$\\frac{100}{0{,}01}$.',
    },
  ],
  applications: [
    {
      title: 'Le tube du vieux téléviseur',
      tagline: 'À quelle vitesse les électrons frappent-ils l’écran ?',
      situation:
        'Dans un ancien téléviseur à tube cathodique, les électrons sont accélérés sous une tension de 20 kV avant de frapper l’écran. $m = 9{,}1 \\times 10^{-31}$ kg.',
      model: 'Électrons partant au repos ; on utilise la formule non relativiste.',
      questions: ['Quelle est la vitesse des électrons à l’arrivée, en m/s ?'],
      check: { value: 8.39e7, tolerance: 0.02, unit: 'm/s' },
      solution: ['$\\dfrac{1}{2}mv^2 = eU$ : $v = \\sqrt{\\dfrac{2 \\times 1{,}6 \\times 10^{-19} \\times 20\\,000}{9{,}1 \\times 10^{-31}}} \\approx 8{,}4 \\times 10^7$ m/s.', 'C’est près de 28 % de la vitesse de la lumière : un calcul plus précis demanderait la relativité.'],
      fact: 'Les appareils de radiographie accélèrent aussi des électrons sous des dizaines de kilovolts : en frappant une cible métallique, ils produisent des rayons X.',
    },
  ],
};
