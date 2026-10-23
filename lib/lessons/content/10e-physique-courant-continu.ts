import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Dans une maison de Kalaban Coro, on allume la lampe du salon : celle de la cuisine reste allumée. Le soir, une seule ampoule grille dans la guirlande de la boutique, et toute la guirlande s’éteint. Les deux installations ne sont pas montées de la même façon : en **dérivation** dans la maison, en **série** dans la guirlande.',
  objectives: [
    'mesurer une intensité avec un ampèremètre et une tension avec un voltmètre ;',
    'appliquer la loi des nœuds ;',
    'appliquer la loi des mailles (additivité des tensions) ;',
    'distinguer montage en série et en dérivation.',
  ],
  sections: [
    {
      title: 'Intensité et tension',
      blocks: [
        {
          kind: 'definition',
          term: 'Intensité I',
          text: 'débit de charges électriques dans un fil, en ampères (A). On la mesure avec un **ampèremètre** branché **en série**.',
        },
        {
          kind: 'definition',
          term: 'Tension U',
          text: 'différence d’état électrique entre deux points, en volts (V). On la mesure avec un **voltmètre** branché **en dérivation** aux bornes du dipôle.',
        },
        {
          kind: 'text',
          text: 'Par convention, le courant sort par la borne + du générateur et rentre par la borne −. Les électrons circulent en sens inverse.',
        },
      ],
    },
    {
      title: 'Les lois des circuits',
      blocks: [
        {
          kind: 'rule',
          text: '**Loi des nœuds** : la somme des intensités qui arrivent à un nœud est égale à la somme des intensités qui en partent.',
        },
        {
          kind: 'rule',
          text: '**Loi des mailles** : dans une boucle, la somme des tensions comptées dans un sens est nulle. En série : $U_{\\text{générateur}} = U_1 + U_2$.',
        },
        {
          kind: 'table',
          head: ['', 'Série', 'Dérivation'],
          rows: [
            ['intensité', 'la même partout', 'se partage : $I = I_1 + I_2$'],
            ['tension', 'se partage : $U = U_1 + U_2$', 'la même aux bornes de chaque branche'],
            ['si un dipôle est retiré', 'tout s’arrête', 'les autres branches fonctionnent'],
          ],
        },
      ],
    },
  ],
  essentials: [
    'Ampèremètre en série, voltmètre en dérivation.',
    'Loi des nœuds : Σ I entrants = Σ I sortants.',
    'Loi des mailles : en série, les tensions s’ajoutent.',
    'En dérivation, chaque branche a la même tension et fonctionne seule.',
  ],
  simulationTasks: [
    'monte deux lampes en série, puis dévisse L1 : que fait L2 ?',
    'passe en dérivation : compare l’intensité du circuit principal et celles des branches ;',
    'relève les tensions aux bornes de chaque lampe dans les deux montages.',
  ],
  exercises: [
    {
      id: 'cc-noeuds',
      level: 1,
      title: 'La loi des nœuds',
      statement: 'Le circuit principal est parcouru par 0,80 A. Il se partage en deux branches ; l’une est parcourue par 0,35 A.',
      parts: [
        {
          label: 'Intensité dans l’autre branche, en A.',
          answer: { kind: 'number', value: 0.45, tolerance: 0.005, unit: 'A' },
          steps: ['$I_2 = 0{,}80 - 0{,}35 = 0{,}45$ A.'],
        },
      ],
    },
    {
      id: 'cc-mailles',
      level: 2,
      title: 'Lampes en série',
      statement: 'Un générateur de 12 V alimente trois lampes en série. La tension aux bornes de L1 vaut 3,5 V et celle aux bornes de L2 vaut 4,0 V.',
      parts: [
        {
          label: 'Tension aux bornes de L3, en V.',
          answer: { kind: 'number', value: 4.5, tolerance: 0.05, unit: 'V' },
          steps: ['$U_3 = 12 - 3{,}5 - 4{,}0 = 4{,}5$ V.'],
        },
        {
          label: 'Si L1 grille, quelle tension lit-on aux bornes de L2 ? (en V)',
          answer: { kind: 'number', value: 0, tolerance: 0.01, unit: 'V' },
          steps: ['Le circuit est ouvert : plus de courant, donc $U_2 = R \\times 0 = 0$ V.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Un voltmètre se branche :',
      choices: ['en dérivation', 'en série', 'n’importe comment', 'à la place du générateur'],
      answer: 0,
      explanation: 'Il mesure une tension entre deux points.',
    },
    {
      question: 'Dans un circuit en série, l’intensité est :',
      choices: ['la même partout', 'plus grande près du générateur', 'nulle', 'différente dans chaque lampe'],
      answer: 0,
      explanation: 'Il n’y a qu’un seul chemin.',
    },
    {
      question: 'Les prises d’une maison sont montées :',
      choices: ['en dérivation', 'en série', 'en court-circuit', 'sans fil'],
      answer: 0,
      explanation: 'Chaque appareil reçoit 220 V et fonctionne seul.',
    },
    {
      question: 'Le courant conventionnel sort du générateur par :',
      choices: ['la borne +', 'la borne −', 'les deux', 'aucune'],
      answer: 0,
      explanation: 'Les électrons, eux, sortent par la borne −.',
    },
  ],
  applications: [
    {
      title: 'Le panneau solaire de la case',
      tagline: 'Combien d’ampoules sur une batterie ?',
      situation:
        'Dans un village près de Koulikoro, une famille alimente 4 ampoules LED de 12 V en dérivation sur une batterie de 12 V. Chaque ampoule est parcourue par 0,25 A.',
      model: 'Montage en dérivation : I = I₁ + I₂ + I₃ + I₄.',
      questions: ['Quelle intensité sort de la batterie ?', 'Pourquoi a-t-on choisi la dérivation ?'],
      check: { value: 1, tolerance: 0.01, unit: 'A' },
      solution: ['$4 \\times 0{,}25 = 1{,}0$ A.', 'Chaque ampoule reçoit les 12 V et peut être allumée ou éteinte seule ; si l’une grille, les autres restent allumées.'],
      fact: 'Les kits solaires familiaux éclairent aujourd’hui des milliers de foyers maliens non reliés au réseau.',
    },
  ],
};
