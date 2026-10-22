import type { Adventure } from '../types';

export const adventure: Adventure = {
  id: 'moto-electrique',
  title: 'Construire une moto électrique',
  subject: 'physique',
  classes: ['11e', '12e'],
  pitch: 'Un atelier de Bamako veut remplacer ses motos à essence par des motos électriques. Tu es l’ingénieur.',
  intro:
    'Moussa répare des motos à Bamako, au quartier de Médina Coura. L’essence coûte de plus en plus cher et la fumée remplit la rue. Il a une idée : fabriquer une moto électrique, rechargeable avec les panneaux solaires de l’atelier. Il a les outils et les pièces, mais il lui faut quelqu’un pour faire les calculs. Chaque mission est une étape du plan de construction. Réussis le défi pour passer à l’étape suivante.',
  missions: [
    {
      id: 'cahier-des-charges',
      title: 'Le cahier des charges',
      story:
        'Avant de choisir les pièces, Moussa veut savoir quelle énergie il faut donner à la moto pour la lancer. Elle doit rouler à 45 km/h en ville, avec son conducteur.',
      data: ['Masse de la moto et du conducteur : $m = 150$ kg', 'Vitesse visée : $v = 45$ km/h'],
      notions: [{ classId: '11e', subject: 'physique', chapterId: 'energie-cinetique' }],
      challenge: {
        kind: 'numeric',
        question: 'Quelle est l’énergie cinétique de la moto lancée à 45 km/h ?',
        answer: 11718.75,
        unit: 'J',
        tolerance: 0.02,
      },
      hints: ['Convertis d’abord la vitesse en m/s : divise par 3,6.', '$E_c = \\dfrac{1}{2} m v^2$'],
      solution: [
        '$v = \\dfrac{45}{3{,}6} = 12{,}5$ m/s.',
        '$E_c = \\dfrac{1}{2} \\times 150 \\times 12{,}5^2 = 11\\,719$ J, soit environ 11,7 kJ.',
      ],
      debrief:
        'C’est l’énergie que le moteur doit fournir à chaque démarrage. Au feu rouge, elle est perdue en chaleur dans les freins : retiens-le, c’est une piste pour plus tard.',
    },
    {
      id: 'puissance',
      title: 'La puissance du moteur',
      story:
        'Une fois lancée, la moto doit garder sa vitesse. Les frottements de la route et la résistance de l’air la freinent. Le moteur doit compenser exactement cette force.',
      data: ['Force totale qui freine la moto à 45 km/h : $F = 80$ N', 'Vitesse : $v = 12{,}5$ m/s'],
      notions: [{ classId: '11e', subject: 'physique', chapterId: 'travail' }],
      challenge: {
        kind: 'numeric',
        question: 'Quelle puissance le moteur doit-il fournir pour rouler à vitesse constante ?',
        answer: 1000,
        unit: 'W',
        tolerance: 0.02,
      },
      hints: ['La puissance d’une force qui agit dans le sens du mouvement vaut $P = F \\times v$.'],
      solution: ['$P = F \\times v = 80 \\times 12{,}5 = 1\\,000$ W, soit 1 kW.'],
      debrief: 'Moussa commande un moteur de 1 kW. Il faut maintenant comprendre comment il produit sa force.',
    },
    {
      id: 'moteur',
      title: 'Le moteur électrique',
      story:
        'Dans le moteur, des fils parcourus par un courant sont placés dans le champ magnétique d’aimants. Chaque fil subit une force de Laplace, et toutes ces forces font tourner le rotor.',
      data: [
        'Champ magnétique des aimants : $B = 0{,}5$ T',
        'Intensité dans chaque conducteur : $I = 40$ A',
        'Longueur utile d’un conducteur : $L = 0{,}20$ m',
        'Nombre de conducteurs actifs : 50',
        'Rayon du rotor : $r = 0{,}04$ m',
      ],
      notions: [
        { classId: '11e', subject: 'physique', chapterId: 'champ-magnetique' },
        { classId: '11e', subject: 'physique', chapterId: 'laplace' },
      ],
      challenge: {
        kind: 'numeric',
        question: 'Quel est le couple (le moment) produit par le moteur ?',
        answer: 8,
        unit: 'N·m',
        tolerance: 0.02,
      },
      hints: [
        'Force sur un conducteur perpendiculaire au champ : $F = B \\times I \\times L$.',
        'Additionne les forces des 50 conducteurs, puis multiplie par le rayon du rotor.',
      ],
      solution: [
        'Un conducteur : $F_1 = 0{,}5 \\times 40 \\times 0{,}20 = 4$ N.',
        '50 conducteurs : $F = 50 \\times 4 = 200$ N.',
        'Couple : $\\mathcal{M} = F \\times r = 200 \\times 0{,}04 = 8$ N·m.',
      ],
      debrief: 'Le moteur tourne avec un couple de 8 N·m. Mais est-ce assez pour faire avancer la moto ?',
    },
    {
      id: 'transmission',
      title: 'La transmission',
      story:
        'Le moteur entraîne la roue arrière par une chaîne et deux pignons. Pour rouler à 45 km/h, la roue doit pousser le sol avec une force de 80 N. Le couple du moteur est trop faible : il faut un rapport de réduction.',
      data: ['Rayon de la roue : $R = 0{,}30$ m', 'Force à fournir au sol : 80 N', 'Couple du moteur : 8 N·m'],
      notions: [{ classId: '10e', subject: 'physique', chapterId: 'moment' }],
      challenge: {
        kind: 'numeric',
        question: 'Par combien la transmission doit-elle multiplier le couple du moteur ?',
        answer: 3,
        unit: '',
        tolerance: 0.02,
      },
      hints: ['Calcule le couple nécessaire à la roue : $\\mathcal{M} = F \\times R$.'],
      solution: [
        'Couple nécessaire à la roue : $80 \\times 0{,}30 = 24$ N·m.',
        'Rapport de réduction : $\\dfrac{24}{8} = 3$. Le pignon de la roue doit avoir 3 fois plus de dents que celui du moteur.',
      ],
      debrief:
        'Avec un pignon de 14 dents sur le moteur et un de 42 dents sur la roue, le couple est multiplié par 3. En échange, le moteur tourne 3 fois plus vite que la roue : environ 1 200 tours par minute.',
    },
    {
      id: 'batterie',
      title: 'La batterie',
      story:
        'Les clients de Moussa font environ 40 km par jour. La batterie doit tenir toute la journée sans recharge. Il choisit une batterie de 48 V. Reste à savoir quelle capacité commander.',
      data: ['Distance par jour : 40 km', 'Vitesse moyenne : 12,5 m/s', 'Puissance consommée : 1 000 W', 'Tension de la batterie : $U = 48$ V'],
      notions: [
        { classId: '10e', subject: 'physique', chapterId: 'energie-electrique' },
        { classId: '11e', subject: 'chimie', chapterId: 'piles' },
      ],
      challenge: {
        kind: 'numeric',
        question: 'Quelle capacité minimale (en ampères-heures) doit avoir la batterie ?',
        answer: 18.5,
        unit: 'Ah',
        tolerance: 0.03,
      },
      hints: [
        'Calcule la durée du trajet, puis l’énergie : $E = P \\times t$.',
        'Exprime l’énergie en wattheures (1 Wh = 3 600 J), puis divise par la tension : $Q = \\dfrac{E}{U}$.',
      ],
      solution: [
        'Durée : $t = \\dfrac{40\\,000}{12{,}5} = 3\\,200$ s.',
        'Énergie : $E = 1\\,000 \\times 3\\,200 = 3{,}2 \\times 10^6$ J, soit $\\dfrac{3{,}2 \\times 10^6}{3\\,600} \\approx 889$ Wh.',
        'Capacité : $Q = \\dfrac{889}{48} \\approx 18{,}5$ Ah. Moussa prendra une batterie de 20 Ah pour garder une marge.',
      ],
      debrief: 'Une batterie de 48 V et 20 Ah stocke 960 Wh : la journée est assurée, avec un peu de réserve.',
    },
    {
      id: 'chimie-batterie',
      title: 'Ce qui se passe dans la batterie',
      story:
        'La batterie est au lithium. Un client demande à Moussa d’où vient le courant. Pendant la décharge, à l’électrode négative, des atomes de lithium ($Z = 3$) se transforment et libèrent des électrons qui partent dans le circuit vers le moteur.',
      notions: [
        { classId: '10e', subject: 'chimie', chapterId: 'atome' },
        { classId: '11e', subject: 'chimie', chapterId: 'oxydoreduction' },
      ],
      challenge: {
        kind: 'choice',
        question: 'Que devient un atome de lithium pendant la décharge ?',
        choices: [
          'Il gagne un électron et devient $\\ce{Li-}$ : c’est une réduction.',
          'Il perd un électron et devient $\\ce{Li+}$ : c’est une oxydation.',
          'Il perd un proton et devient de l’hélium.',
          'Il perd ses 3 électrons et devient $\\ce{Li^{3+}}$.',
        ],
        answer: 1,
      },
      hints: ['Écris la répartition électronique du lithium : combien d’électrons sur sa couche externe ?'],
      solution: [
        'Lithium : $(K)^2(L)^1$. Il perd facilement son électron de valence pour ressembler à l’hélium.',
        '$\\ce{Li -> Li+ + e-}$ : perdre des électrons, c’est une **oxydation**. Les électrons libérés forment le courant qui alimente le moteur.',
      ],
      debrief:
        'Pendant la recharge au soleil, c’est l’inverse : les ions $\\ce{Li+}$ reprennent un électron. La batterie peut faire ce va-et-vient des centaines de fois.',
    },
    {
      id: 'securite',
      title: 'La commande et la sécurité',
      story:
        'Premier essai : quand Moussa coupe brutalement le moteur, une étincelle jaillit dans le boîtier de commande. Le bobinage du moteur est une bobine : quand on coupe son courant, elle s’y oppose en créant une tension. C’est l’auto-induction.',
      data: [
        'Inductance du bobinage : $L = 2$ mH',
        'Le courant passe de 40 A à 0 A en $\\Delta t = 1$ ms',
        'Tension de la batterie : 48 V',
      ],
      notions: [{ classId: '12e', subject: 'physique', chapterId: 'auto-induction' }],
      challenge: {
        kind: 'numeric',
        question: 'Quelle est la valeur de la tension créée par le bobinage pendant la coupure ?',
        answer: 80,
        unit: 'V',
        tolerance: 0.02,
      },
      hints: ['La f.é.m. d’auto-induction vaut $e = -L \\dfrac{\\Delta i}{\\Delta t}$ ; calcule sa valeur absolue.'],
      solution: [
        '$|e| = L \\times \\dfrac{\\Delta i}{\\Delta t} = 2 \\times 10^{-3} \\times \\dfrac{40}{1 \\times 10^{-3}} = 80$ V.',
        '80 V, c’est presque deux fois la tension de la batterie : de quoi abîmer les transistors de la commande.',
      ],
      debrief:
        'Moussa ajoute une diode de roue libre aux bornes du bobinage : à la coupure, le courant peut s’éteindre doucement à travers elle, sans étincelle.',
    },
  ],
  outro:
    'La moto est prête. Un samedi matin, Moussa la sort sur la route de Ségou : silencieuse, sans fumée, rechargée par le soleil de l’atelier. Tu as utilisé l’énergie cinétique, la puissance, la force de Laplace, le moment d’une force, l’énergie électrique, l’oxydoréduction et l’auto-induction. Ce sont des chapitres du programme, et ils servent à construire une vraie machine.',
};
