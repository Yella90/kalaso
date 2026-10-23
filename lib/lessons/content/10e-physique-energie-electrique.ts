import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'À la fin du mois, la facture d’électricité arrive. Pourquoi le climatiseur coûte-t-il tant, alors que les lampes LED ne coûtent presque rien ? Tout dépend de la **puissance** des appareils et de la **durée** pendant laquelle ils fonctionnent.',
  objectives: [
    'calculer une puissance électrique P = U × I ;',
    'calculer une énergie E = P × t, en joules et en kilowattheures ;',
    'calculer l’effet Joule P = R I² ;',
    'calculer un rendement.',
  ],
  sections: [
    {
      title: 'Puissance et énergie',
      blocks: [
        {
          kind: 'formula',
          tex: 'P = U \\times I',
          legend: ['$P$ en watts (W) ; $U$ en V ; $I$ en A'],
        },
        {
          kind: 'formula',
          tex: 'E = P \\times t',
          legend: ['$E$ en joules (J) si $P$ en W et $t$ en s ; en kWh si $P$ en kW et $t$ en h'],
        },
        {
          kind: 'rule',
          text: '1 kWh = 1 000 W × 3 600 s = 3,6 × 10⁶ J. C’est l’unité de la facture d’électricité.',
        },
      ],
    },
    {
      title: 'L’effet Joule et le rendement',
      blocks: [
        {
          kind: 'formula',
          tex: 'P_J = R \\times I^2',
          legend: ['puissance transformée en chaleur dans une résistance'],
        },
        {
          kind: 'text',
          text: 'L’effet Joule est utile dans un fer à repasser ou une bouilloire, mais c’est une perte dans un moteur ou une ligne électrique.',
        },
        {
          kind: 'formula',
          tex: '\\eta = \\dfrac{P_{\\text{utile}}}{P_{\\text{reçue}}}',
          legend: ['rendement, toujours inférieur à 1 (ou 100 %)'],
        },
      ],
    },
  ],
  essentials: [
    'P = U × I ; E = P × t.',
    '1 kWh = 3,6 × 10⁶ J.',
    'Effet Joule : P = R I².',
    'Rendement = puissance utile ÷ puissance reçue.',
  ],
  simulationTasks: [
    'avec une lampe sous 6 V, relève la puissance du générateur et l’énergie consommée en une heure ;',
    'monte deux lampes en dérivation : comment évolue la puissance totale ?',
  ],
  exercises: [
    {
      id: 'ee-facture',
      level: 1,
      title: 'La facture du ventilateur',
      statement: 'Un ventilateur de 60 W fonctionne 8 h par jour pendant 30 jours. Le kWh coûte 100 FCFA.',
      parts: [
        {
          label: 'Énergie consommée, en kWh.',
          answer: { kind: 'number', value: 14.4, tolerance: 0.05, unit: 'kWh' },
          steps: ['$0{,}060 \\times 8 \\times 30 = 14{,}4$ kWh.'],
        },
        {
          label: 'Coût, en FCFA.',
          answer: { kind: 'number', value: 1440, tolerance: 1, unit: 'FCFA' },
          steps: ['$14{,}4 \\times 100 = 1\\,440$ FCFA.'],
        },
      ],
    },
    {
      id: 'ee-moteur',
      level: 2,
      title: 'Le rendement d’un moteur',
      statement: 'Un moteur alimenté sous 12 V absorbe 2,0 A. Sa résistance interne vaut 1,5 Ω.',
      parts: [
        {
          label: 'Puissance reçue, en W.',
          answer: { kind: 'number', value: 24, tolerance: 0.1, unit: 'W' },
          steps: ['$P = 12 \\times 2{,}0 = 24$ W.'],
        },
        {
          label: 'Puissance perdue par effet Joule, en W.',
          answer: { kind: 'number', value: 6, tolerance: 0.05, unit: 'W' },
          steps: ['$P_J = 1{,}5 \\times 2{,}0^2 = 6{,}0$ W.'],
        },
        {
          label: 'Rendement, en %.',
          answer: { kind: 'number', value: 75, tolerance: 0.5, unit: '%' },
          steps: ['$\\eta = \\dfrac{24 - 6}{24} = 0{,}75$, soit 75 %.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'L’unité d’énergie de la facture d’électricité est :',
      choices: ['le kilowattheure', 'le watt', 'le volt', 'l’ampère'],
      answer: 0,
      explanation: '1 kWh = 3,6 MJ.',
    },
    {
      question: 'Si l’intensité double dans une résistance, l’effet Joule est :',
      choices: ['multiplié par 4', 'doublé', 'divisé par 2', 'inchangé'],
      answer: 0,
      explanation: 'P = RI².',
    },
    {
      question: 'Une lampe de 100 W allumée 10 h consomme :',
      choices: ['1 kWh', '10 kWh', '0,1 kWh', '1 000 kWh'],
      answer: 0,
      explanation: '0,1 kW × 10 h = 1 kWh.',
    },
    {
      question: 'Un rendement de 100 % est :',
      choices: ['impossible en pratique', 'courant', 'obligatoire', 'celui des lampes à incandescence'],
      answer: 0,
      explanation: 'Il y a toujours des pertes, surtout en chaleur.',
    },
  ],
  applications: [
    {
      title: 'LED ou ampoule classique ?',
      tagline: 'Économiser sur la facture EDM',
      situation:
        'Une boutique de Bamako garde 10 ampoules de 60 W allumées 12 h par jour. Des LED de 9 W éclairent autant. Le kWh coûte 100 FCFA.',
      model: 'E = P × t ; économie = différence de consommation × prix.',
      questions: ['Quelle économie la boutique fait-elle en 30 jours, en FCFA ?', 'Pourquoi une ampoule classique chauffe-t-elle autant ?'],
      check: { value: 18360, tolerance: 0.01, unit: 'FCFA' },
      solution: [
        'Différence de puissance : $10 \\times (60 - 9) = 510$ W = 0,51 kW.',
        'Énergie économisée : $0{,}51 \\times 12 \\times 30 = 183{,}6$ kWh, soit 18 360 FCFA.',
        'Son filament transforme plus de 90 % de l’énergie en chaleur par effet Joule : son rendement lumineux est faible.',
      ],
      fact: 'Une LED dure environ 25 fois plus longtemps qu’une ampoule à incandescence.',
    },
  ],
};
