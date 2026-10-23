import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Chaque jour, nos reins filtrent environ 180 litres de plasma, et pourtant nous n’urinons qu’un litre et demi. Ils récupèrent presque toute l’eau et les substances utiles, et ne rejettent que l’excès et les déchets. Sous le soleil du Sahel, ce travail de précision nous protège de la déshydratation.',
  objectives: [
    'décrire l’appareil urinaire et le néphron ;',
    'expliquer les trois étapes de la formation de l’urine ;',
    'comparer la composition du plasma et de l’urine ;',
    'expliquer le rôle du rein dans l’équilibre en eau et quelques maladies.',
  ],
  sections: [
    {
      title: 'L’appareil urinaire',
      blocks: [
        {
          kind: 'text',
          text: 'Deux **reins** fabriquent l’urine, conduite par les **uretères** jusqu’à la **vessie**, puis évacuée par l’urètre. Chaque rein contient environ un million de **néphrons**, les unités qui filtrent le sang : un glomérule (peloton de capillaires) entouré d’une capsule, suivi d’un long tube.',
        },
      ],
    },
    {
      title: 'La formation de l’urine',
      blocks: [
        {
          kind: 'table',
          head: ['Étape', 'Lieu', 'Ce qui se passe'],
          rows: [
            ['**filtration**', 'glomérule', 'le plasma, sans les cellules ni les grosses protéines, passe dans le néphron : environ 180 L d’urine primitive par jour'],
            ['**réabsorption**', 'tube du néphron', 'l’eau (environ 99 %), le glucose, les sels utiles retournent dans le sang'],
            ['**sécrétion**', 'tube du néphron', 'certaines substances (médicaments, ions) sont ajoutées à l’urine'],
          ],
        },
        {
          kind: 'table',
          head: ['Substance', 'Plasma (g/L)', 'Urine (g/L)'],
          rows: [
            ['protéines', '70', '0'],
            ['glucose', '1', '0'],
            ['urée', '0,3', '20'],
            ['sels (NaCl)', '7', 'variable (5 à 15)'],
          ],
        },
        {
          kind: 'rule',
          text: 'L’urée, déchet fabriqué par le foie à partir des protéines, est **concentrée** dans l’urine. Le glucose n’apparaît dans l’urine que si la glycémie dépasse environ 1,8 g/L (diabète mal équilibré).',
        },
      ],
    },
    {
      title: 'Équilibre en eau et santé',
      blocks: [
        {
          kind: 'text',
          text: 'Quand on manque d’eau, une hormone (l’ADH) augmente la réabsorption : l’urine devient rare et foncée. Il faut boire davantage par forte chaleur, surtout les enfants et les personnes âgées.',
        },
        {
          kind: 'callout',
          variant: 'attention',
          title: 'La bilharziose urinaire',
          blocks: [
            {
              kind: 'text',
              text: 'En se baignant dans les mares et marigots, on peut être infecté par un petit ver (schistosome) dont les œufs abîment la vessie : du sang apparaît dans les urines. On s’en protège en évitant les baignades dans l’eau stagnante ; un traitement simple existe.',
            },
          ],
        },
        {
          kind: 'trap',
          wrong: '« Les reins éliminent le sang. »',
          why: 'Ils filtrent le plasma et en réabsorbent presque tout ; les cellules du sang ne passent pas.',
          reflex: 'Du sang dans les urines est anormal : il faut consulter.',
        },
      ],
    },
  ],
  essentials: [
    'Reins → uretères → vessie → urètre ; néphron : glomérule + tube.',
    'Filtration (≈ 180 L/jour), réabsorption (≈ 99 % de l’eau, tout le glucose), sécrétion.',
    'Urine : urée concentrée, pas de protéines ni de glucose normalement.',
    'Régulation de l’eau (ADH) ; bilharziose urinaire.',
  ],
  exercises: [
    {
      id: 'exc-reabsorption',
      level: 1,
      title: 'Filtration et réabsorption',
      statement: 'Les reins filtrent 180 L de plasma par jour et produisent 1,5 L d’urine.',
      parts: [
        {
          label: 'Pourcentage de l’eau filtrée qui est réabsorbée (valeur approchée).',
          answer: { kind: 'number', value: 99.17, tolerance: 0.05, unit: '%' },
          steps: ['$\\dfrac{180 - 1{,}5}{180} \\approx 0{,}9917$, soit 99,2 %.'],
        },
        {
          label: 'L’urée passe de 0,3 g/L dans le plasma à 20 g/L dans l’urine : par combien est-elle concentrée ? (valeur approchée)',
          answer: { kind: 'number', value: 66.7, tolerance: 0.5, unit: '' },
          steps: ['$\\dfrac{20}{0{,}3} \\approx 67$.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'La filtration du sang a lieu dans :',
      choices: ['le glomérule', 'la vessie', 'l’uretère', 'le foie'],
      answer: 0,
      explanation: 'Le peloton de capillaires du néphron.',
    },
    {
      question: 'Une urine normale ne contient pas :',
      choices: ['de glucose', 'd’urée', 'd’eau', 'de sels'],
      answer: 0,
      explanation: 'Le glucose est entièrement réabsorbé si la glycémie est normale.',
    },
    {
      question: 'L’urée est fabriquée par :',
      choices: ['le foie', 'le rein', 'la vessie', 'l’intestin'],
      answer: 0,
      explanation: 'À partir de la dégradation des protéines ; le rein l’élimine.',
    },
    {
      question: 'Quand on boit peu par forte chaleur, l’urine devient :',
      choices: ['rare et foncée', 'abondante et claire', 'sucrée', 'rouge'],
      answer: 0,
      explanation: 'Les reins réabsorbent plus d’eau.',
    },
  ],
  applications: [
    {
      title: 'Le sang dans les urines',
      tagline: 'Un signe d’alerte chez les enfants qui se baignent dans les marigots',
      situation:
        'Moussa, 12 ans, se baigne souvent dans un marigot. Il remarque que ses urines sont rouges en fin de miction. Au centre de santé, on trouve des œufs de schistosome dans ses urines.',
      model: 'Les larves du ver traversent la peau dans l’eau ; les vers adultes pondent dans les vaisseaux de la vessie.',
      questions: ['Pourquoi les urines contiennent-elles du sang ?', 'Comment éviter la maladie ?'],
      solution: [
        'Les œufs traversent la paroi de la vessie et l’abîment, ce qui la fait saigner.',
        'Éviter de se baigner ou de marcher pieds nus dans les eaux stagnantes ; ne pas uriner dans l’eau (cela entretient le cycle du ver) ; se faire traiter (praziquantel).',
      ],
    },
  ],
};
