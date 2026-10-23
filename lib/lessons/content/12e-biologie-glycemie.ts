import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Après un grand plat de riz au gras, ou après une journée de travail sans manger, la quantité de sucre dans le sang ne varie presque pas : elle reste proche de 1 g par litre. Cette constance est vitale, car le cerveau consomme du glucose en permanence. Quand ce réglage se dérègle, c’est le **diabète**, une maladie de plus en plus fréquente au Mali.',
  objectives: [
    'définir la glycémie et ses valeurs normales ;',
    'décrire le rôle du foie, des muscles et du tissu adipeux ;',
    'expliquer l’action de l’insuline et du glucagon ;',
    'distinguer diabète de type 1 et de type 2.',
  ],
  sections: [
    {
      title: 'La glycémie et les organes de stockage',
      blocks: [
        {
          kind: 'definition',
          term: 'Glycémie',
          text: 'concentration du glucose dans le sang. À jeun, elle est normalement comprise entre 0,7 et 1,1 g/L.',
        },
        {
          kind: 'list',
          items: [
            'le **foie** stocke le glucose sous forme de **glycogène** (glycogénogenèse) et peut le libérer dans le sang (glycogénolyse) ; il peut aussi fabriquer du glucose à partir d’autres molécules (néoglucogenèse) ;',
            'les **muscles** stockent aussi du glycogène, mais pour leur propre usage ;',
            'le **tissu adipeux** transforme l’excès de glucose en graisses.',
          ],
        },
      ],
    },
    {
      title: 'Les hormones du pancréas',
      blocks: [
        { kind: 'figure', id: 'regulation-glycemie', caption: "La régulation de la glycémie." },
        {
          kind: 'text',
          text: 'Le pancréas contient de petits amas de cellules, les **îlots de Langerhans**, qui détectent la glycémie et sécrètent deux hormones aux effets opposés.',
        },
        {
          kind: 'table',
          head: ['Hormone', 'Cellules', 'Sécrétée quand', 'Effets'],
          rows: [
            ['**insuline** (hypoglycémiante)', 'cellules β', 'la glycémie monte (après un repas)', 'entrée du glucose dans les cellules ; stockage en glycogène (foie, muscles) et en graisses'],
            ['**glucagon** (hyperglycémiante)', 'cellules α', 'la glycémie baisse (jeûne, effort)', 'le foie libère du glucose (glycogénolyse)'],
          ],
        },
        {
          kind: 'rule',
          text: 'C’est un système de régulation par **rétrocontrôle négatif** : un écart de la glycémie déclenche la réponse qui le corrige. Capteurs et centre de commande : les îlots de Langerhans ; effecteurs : foie, muscles, tissu adipeux.',
        },
        { kind: 'photo', id: 'ilot-langerhans', caption: 'Au centre, un îlot de Langerhans (plus clair) entouré des cellules qui fabriquent le suc pancréatique.' },
      ],
    },
    {
      title: 'Le diabète',
      blocks: [
        {
          kind: 'definition',
          term: 'Diabète',
          text: 'glycémie à jeun supérieure ou égale à 1,26 g/L à deux reprises. Le glucose en excès abîme peu à peu les vaisseaux : yeux, reins, nerfs, cœur.',
        },
        {
          kind: 'table',
          head: ['', 'Type 1', 'Type 2'],
          rows: [
            ['cause', 'destruction des cellules β par le système immunitaire (auto-immune)', 'les cellules répondent mal à l’insuline (insulinorésistance), puis le pancréas s’épuise'],
            ['âge', 'souvent l’enfance ou l’adolescence', 'surtout après 40 ans, de plus en plus tôt'],
            ['facteurs', 'génétiques', 'surpoids, sédentarité, alimentation trop riche, hérédité'],
            ['traitement', 'injections d’insuline à vie', 'activité physique, alimentation équilibrée, médicaments, parfois insuline'],
          ],
        },
        {
          kind: 'trap',
          wrong: '« Le diabète, c’est seulement manger trop de sucre. »',
          why: 'Le type 1 n’a rien à voir avec l’alimentation, et le type 2 dépend aussi du poids, de l’activité physique et de l’hérédité.',
          reflex: 'Type 1 : manque d’insuline ; type 2 : insuline peu efficace.',
        },
      ],
    },
  ],
  essentials: [
    'Glycémie à jeun normale : 0,7 à 1,1 g/L ; diabète si ≥ 1,26 g/L à deux reprises.',
    'Foie : stocke (glycogène) et libère le glucose ; muscles et tissu adipeux stockent.',
    'Insuline (cellules β) fait baisser la glycémie ; glucagon (cellules α) la fait monter ; rétrocontrôle négatif.',
    'Type 1 : auto-immun, insuline à vie ; type 2 : insulinorésistance, hygiène de vie.',
  ],
  simulationTasks: [
    "observe la glycémie d’une personne en bonne santé après chaque repas ;",
    "compare avec le diabète de type 1, puis ajoute les injections d’insuline ;",
    "ajoute l’effort physique : que devient la glycémie ?",
  ],
  exercises: [
    {
      id: 'gly-sang',
      level: 1,
      title: 'Le glucose du sang',
      statement: 'Un adulte a 5,0 L de sang ; sa glycémie vaut 1,0 g/L. Son foie contient environ 100 g de glycogène.',
      parts: [
        {
          label: 'Quelle masse de glucose contient son sang (en g) ?',
          answer: { kind: 'number', value: 5, tolerance: 0.05, unit: 'g' },
          steps: ['$5{,}0 \\times 1{,}0 = 5{,}0$ g : à peine une cuillerée.'],
        },
        {
          label: 'Combien de fois cette quantité la réserve du foie représente-t-elle ?',
          answer: { kind: 'number', value: 20, tolerance: 0.1, unit: '' },
          steps: ['$\\dfrac{100}{5} = 20$ : le foie est la vraie réserve de la glycémie.'],
        },
      ],
    },
    {
      id: 'gly-hormones',
      level: 2,
      title: 'Insuline ou glucagon ?',
      statement: 'Réponds « insuline » ou « glucagon ».',
      parts: [
        {
          label: 'Hormone sécrétée une heure après un repas riche en riz.',
          answer: { kind: 'text', display: 'insuline', accepted: ['insuline', "l'insuline", 'l’insuline'] },
          steps: ['La glycémie monte : les cellules β sécrètent de l’insuline.'],
        },
        {
          label: 'Hormone sécrétée en fin de matinée pendant un long effort, sans avoir mangé.',
          answer: { kind: 'text', display: 'glucagon', accepted: ['glucagon', 'le glucagon'] },
          steps: ['La glycémie baisse : le glucagon fait libérer du glucose par le foie.'],
        },
        {
          label: 'Une glycémie à jeun de 1,40 g/L, confirmée, indique-t-elle un diabète ? (« oui » ou « non »)',
          answer: { kind: 'text', display: 'oui', accepted: ['oui'] },
          steps: ['1,40 ≥ 1,26 g/L à deux reprises : diabète.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'L’insuline est sécrétée par :',
      choices: ['les cellules β des îlots de Langerhans', 'le foie', 'les cellules α', 'l’estomac'],
      answer: 0,
      explanation: 'Les cellules α sécrètent le glucagon.',
    },
    {
      question: 'Le glucagon agit surtout sur :',
      choices: ['le foie', 'les muscles', 'le cerveau', 'les reins'],
      answer: 0,
      explanation: 'Il fait libérer le glucose stocké sous forme de glycogène.',
    },
    {
      question: 'Le diabète de type 1 est dû :',
      choices: ['à la destruction des cellules β', 'au surpoids', 'à un excès d’insuline', 'au glucagon'],
      answer: 0,
      explanation: 'C’est une maladie auto-immune.',
    },
    {
      question: 'La régulation de la glycémie fonctionne par :',
      choices: ['rétrocontrôle négatif', 'rétrocontrôle positif', 'hasard', 'réflexe médullaire'],
      answer: 0,
      explanation: 'Chaque écart déclenche la correction inverse.',
    },
  ],
  applications: [
    {
      title: 'Le diabète de tonton',
      tagline: 'Pourquoi le médecin prescrit-il la marche ?',
      situation:
        'Tonton Bakary, 52 ans, en surpoids, a une glycémie à jeun de 1,45 g/L. Le médecin lui prescrit un médicament, mais surtout 30 minutes de marche par jour et moins de boissons sucrées.',
      model: 'Diabète de type 2 : les cellules répondent mal à l’insuline.',
      questions: ['De combien sa glycémie dépasse-t-elle le seuil du diabète, en g/L ?', 'Pourquoi l’activité physique l’aide-t-elle ?'],
      check: { value: 0.19, tolerance: 0.05, unit: 'g/L' },
      solution: ['$1{,}45 - 1{,}26 = 0{,}19$ g/L.', 'Les muscles actifs consomment beaucoup de glucose et deviennent plus sensibles à l’insuline ; la perte de poids diminue aussi l’insulinorésistance.'],
      fact: 'Selon l’OMS, une grande partie des diabètes de type 2 pourrait être évitée par une activité physique régulière et une alimentation équilibrée.',
    },
  ],
};
