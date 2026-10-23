import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Le sotrama freine brusquement : tous les passagers sont projetés vers l’avant. Personne ne les a poussés ! Ils ont simplement continué leur mouvement, alors que le véhicule s’arrêtait. Les corps ont tendance à garder leur vitesse : c’est l’**inertie**.',
  objectives: [
    'énoncer le principe d’inertie ;',
    'reconnaître un système isolé ou pseudo-isolé ;',
    'expliquer des situations de la vie courante par l’inertie ;',
    'relier l’inertie à la sécurité routière.',
  ],
  sections: [
    {
      title: 'Le principe d’inertie',
      blocks: [
        {
          kind: 'rule',
          text: 'Dans un référentiel terrestre, tout corps **isolé** (aucune force) ou **pseudo-isolé** (forces qui se compensent) est soit **immobile**, soit animé d’un **mouvement rectiligne uniforme**.',
        },
        {
          kind: 'text',
          text: 'Réciproquement, si la vitesse d’un objet change (en valeur ou en direction), c’est que les forces qui s’exercent sur lui ne se compensent pas.',
        },
        {
          kind: 'example',
          title: 'le palet sur la glace',
          text: 'Sur une table à coussin d’air, un palet lancé avance en ligne droite à vitesse constante : son poids et la poussée de l’air se compensent, il n’y a presque pas de frottement.',
        },
      ],
    },
    {
      title: 'L’inertie au quotidien',
      blocks: [
        {
          kind: 'list',
          items: [
            'au freinage, les passagers continuent vers l’avant : d’où la **ceinture de sécurité** ;',
            'au démarrage, ils semblent tirés vers l’arrière : ils restent sur place pendant que le véhicule avance ;',
            'dans un virage, le chargement mal attaché part tout droit, vers l’extérieur ;',
            'on secoue un tapis : le tapis s’arrête, la poussière continue et s’en va.',
          ],
        },
        {
          kind: 'trap',
          wrong: '« Pour qu’un objet avance, il faut qu’une force le pousse en permanence. »',
          why: 'Sans frottement, un objet garde sa vitesse tout seul. Sur la route, il faut une force motrice seulement pour compenser les frottements.',
          reflex: 'Force nulle ne veut pas dire immobile : cela veut dire vitesse constante.',
        },
        {
          kind: 'rule',
          text: 'Plus la masse est grande, plus l’inertie est grande : il est plus difficile de mettre en mouvement ou d’arrêter un camion qu’un vélo.',
        },
      ],
    },
  ],
  essentials: [
    'Corps isolé ou pseudo-isolé : immobile ou en mouvement rectiligne uniforme.',
    'Si la vitesse change, les forces ne se compensent pas.',
    'L’inertie augmente avec la masse ; la ceinture protège au freinage.',
  ],
  exercises: [
    {
      id: 'in-palet',
      level: 1,
      title: 'Le palet glisse',
      statement: 'Un palet pseudo-isolé parcourt 0,60 m en 2,0 s en ligne droite.',
      parts: [
        {
          label: 'Sa vitesse en m/s.',
          answer: { kind: 'number', value: 0.3, tolerance: 0.005, unit: 'm/s' },
          steps: ['$v = \\dfrac{0{,}60}{2{,}0} = 0{,}30$ m/s.'],
        },
        {
          label: 'Distance parcourue pendant les 3,0 s suivantes, en m.',
          answer: { kind: 'number', value: 0.9, tolerance: 0.01, unit: 'm' },
          steps: ['Mouvement rectiligne uniforme : $0{,}30 \\times 3{,}0 = 0{,}90$ m.'],
        },
      ],
    },
    {
      id: 'in-freinage',
      level: 2,
      title: 'Sans ceinture',
      statement: 'Un taxi roule à 54 km/h et heurte un mur. Le passager sans ceinture continue à 54 km/h jusqu’au pare-brise.',
      parts: [
        {
          label: 'Vitesse du passager au moment du choc, en m/s.',
          answer: { kind: 'number', value: 15, tolerance: 0.05, unit: 'm/s' },
          steps: ['$\\dfrac{54}{3{,}6} = 15$ m/s.'],
        },
        {
          label: 'Hauteur d’où il faudrait tomber pour atteindre cette vitesse (h = v²/2g, g = 9,8), en m (arrondie à l’unité).',
          answer: { kind: 'number', value: 11, tolerance: 0.6, unit: 'm' },
          steps: ['$h = \\dfrac{15^2}{2 \\times 9{,}8} \\approx 11{,}5$ m : comme tomber du 4e étage.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Un objet sur lequel les forces se compensent peut être :',
      choices: ['en mouvement rectiligne uniforme', 'en train d’accélérer', 'en train de tourner en rond', 'en train de freiner'],
      answer: 0,
      explanation: 'Ou immobile.',
    },
    {
      question: 'Au freinage, les passagers sont projetés vers l’avant parce que :',
      choices: ['ils continuent leur mouvement', 'une force les pousse vers l’avant', 'le siège les pousse', 'le vent les pousse'],
      answer: 0,
      explanation: 'C’est l’inertie.',
    },
    {
      question: 'Lequel a la plus grande inertie ?',
      choices: ['un camion chargé', 'une moto', 'un vélo', 'un ballon'],
      answer: 0,
      explanation: 'L’inertie augmente avec la masse.',
    },
    {
      question: 'Dans un virage, un sac posé sur la banquette glisse :',
      choices: ['vers l’extérieur du virage', 'vers l’intérieur', 'vers l’arrière', 'il ne bouge pas'],
      answer: 0,
      explanation: 'Il tend à continuer tout droit.',
    },
  ],
  applications: [
    {
      title: 'Le chargement du camion',
      tagline: 'Pourquoi attacher les sacs ?',
      situation:
        'Un camion transporte des sacs de coton de Koutiala à Bamako à 72 km/h. Il freine d’urgence et s’arrête en 4 s. Les sacs non attachés glissent vers la cabine.',
      model: 'Les sacs gardent leur vitesse par inertie tant qu’aucune force suffisante ne les freine.',
      questions: ['Quelle était la vitesse du camion en m/s ?', 'Pourquoi les sacs vont-ils vers l’avant ?'],
      check: { value: 20, tolerance: 0.01, unit: 'm/s' },
      solution: ['$\\dfrac{72}{3{,}6} = 20$ m/s.', 'Le camion ralentit mais rien ne retient assez les sacs : ils continuent à environ 20 m/s et glissent vers l’avant. Les sangles leur appliquent la force qui les freine avec le camion.'],
      fact: 'Galilée a été le premier à comprendre l’inertie ; Newton en a fait la première loi de sa mécanique.',
    },
  ],
};
