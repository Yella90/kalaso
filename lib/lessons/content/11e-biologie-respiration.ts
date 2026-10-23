import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Nous respirons environ 12 000 litres d’air par jour sans y penser. À chaque inspiration, le dioxygène traverse en une fraction de seconde une paroi plus fine qu’une feuille de papier pour passer dans le sang. Pendant l’harmattan, la poussière irrite cette paroi fragile ; la fumée de cigarette l’abîme durablement.',
  objectives: [
    'décrire l’appareil respiratoire et les mouvements respiratoires ;',
    'expliquer les échanges gazeux au niveau des alvéoles ;',
    'décrire le transport du dioxygène et du dioxyde de carbone par le sang ;',
    'calculer un débit ventilatoire.',
  ],
  sections: [
    {
      title: 'L’appareil respiratoire',
      blocks: [
        {
          kind: 'text',
          text: 'L’air entre par le nez (qui le filtre, le réchauffe et l’humidifie), passe par la trachée, les bronches, puis les bronchioles, jusqu’à des millions de petits sacs : les **alvéoles pulmonaires**, entourées de capillaires sanguins. Leur surface totale atteint environ 100 m².',
        },
        {
          kind: 'table',
          head: ['Mouvement', 'Muscles', 'Volume de la cage thoracique', 'Air'],
          rows: [
            ['inspiration', 'le diaphragme s’abaisse, les muscles intercostaux soulèvent les côtes', 'augmente', 'entre'],
            ['expiration (au repos)', 'les muscles se relâchent', 'diminue', 'sort'],
          ],
        },
        {
          kind: 'formula',
          label: 'Débit ventilatoire',
          tex: 'D = f \\times V_c',
          legend: ['$f$ : fréquence respiratoire (mouvements/min) ; $V_c$ : volume courant (L) ; au repos : $16 \\times 0{,}5 = 8$ L/min'],
        },
      ],
    },
    {
      title: 'Les échanges gazeux',
      blocks: [
        {
          kind: 'table',
          head: ['Gaz', 'Air inspiré', 'Air expiré'],
          rows: [
            ['dioxygène', '21 %', 'environ 16 %'],
            ['dioxyde de carbone', '0,04 %', 'environ 4 %'],
          ],
        },
        {
          kind: 'rule',
          text: 'Dans les alvéoles, le dioxygène **diffuse** vers le sang, où il est moins concentré, et le dioxyde de carbone diffuse du sang vers l’air alvéolaire. La paroi très fine, la grande surface et le renouvellement de l’air rendent ces échanges efficaces.',
        },
        {
          kind: 'text',
          text: 'Dans le sang, le dioxygène est transporté surtout fixé sur l’**hémoglobine** des globules rouges ; il est libéré dans les organes, qui l’utilisent pour la respiration cellulaire. Le dioxyde de carbone est transporté surtout dissous dans le plasma, sous forme d’ions hydrogénocarbonate.',
        },
        {
          kind: 'trap',
          wrong: '« L’air expiré ne contient plus de dioxygène. »',
          why: 'Il en reste environ 16 % : c’est pourquoi le bouche-à-bouche peut sauver une vie.',
          reflex: 'On n’absorbe qu’une petite partie du dioxygène inspiré.',
        },
      ],
    },
  ],
  essentials: [
    'Voies respiratoires jusqu’aux alvéoles (≈ 100 m²) entourées de capillaires.',
    'Inspiration : diaphragme et intercostaux, volume thoracique augmente.',
    'Échanges par diffusion : $\\ce{O2}$ vers le sang, $\\ce{CO2}$ vers l’alvéole ; $\\ce{O2}$ transporté par l’hémoglobine.',
    'Débit ventilatoire $D = f \\times V_c$.',
  ],
  exercises: [
    {
      id: 'resp-debit',
      level: 1,
      title: 'Débit ventilatoire',
      statement: 'Au repos, un élève respire 16 fois par minute avec un volume courant de 0,5 L. En courant, il respire 40 fois par minute, 2,0 L à chaque fois.',
      parts: [
        {
          label: 'Débit ventilatoire au repos (en L/min).',
          answer: { kind: 'number', value: 8, tolerance: 0.01, unit: 'L/min' },
          steps: ['$16 \\times 0{,}5 = 8$ L/min.'],
        },
        {
          label: 'Débit pendant la course (en L/min).',
          answer: { kind: 'number', value: 80, tolerance: 0.1, unit: 'L/min' },
          steps: ['$40 \\times 2{,}0 = 80$ L/min : dix fois plus.'],
        },
        {
          label: 'Au repos, l’air perd 5 % de son volume en dioxygène. Volume de dioxygène absorbé par minute (en L).',
          answer: { kind: 'number', value: 0.4, tolerance: 0.005, unit: 'L' },
          steps: ['$8 \\times 0{,}05 = 0{,}4$ L de dioxygène par minute.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Les échanges gazeux respiratoires ont lieu dans :',
      choices: ['les alvéoles pulmonaires', 'la trachée', 'le nez', 'le diaphragme'],
      answer: 0,
      explanation: 'Au contact des capillaires sanguins.',
    },
    {
      question: 'Pendant l’inspiration, le diaphragme :',
      choices: ['se contracte et s’abaisse', 'se relâche et remonte', 'ne bouge pas', 'fait sortir l’air'],
      answer: 0,
      explanation: 'Le volume de la cage thoracique augmente et l’air entre.',
    },
    {
      question: 'Le dioxygène est transporté dans le sang surtout par :',
      choices: ['l’hémoglobine des globules rouges', 'les plaquettes', 'les globules blancs', 'la lymphe'],
      answer: 0,
      explanation: 'L’hémoglobine fixe le dioxygène dans les poumons et le libère dans les organes.',
    },
    {
      question: 'L’air expiré contient, par rapport à l’air inspiré :',
      choices: ['moins de $\\ce{O2}$ et plus de $\\ce{CO2}$', 'plus de $\\ce{O2}$', 'la même composition', 'plus de diazote seulement'],
      answer: 0,
      explanation: 'Le sang a pris du dioxygène et rejeté du dioxyde de carbone.',
    },
  ],
  applications: [
    {
      title: 'Respirer pendant l’harmattan',
      tagline: 'Comment protéger ses poumons de la poussière ?',
      situation:
        'De décembre à février, l’harmattan charge l’air de poussières très fines. Les centres de santé reçoivent plus d’enfants qui toussent ou font des crises d’asthme.',
      model: 'Le nez et les bronches arrêtent une partie des poussières grâce au mucus et aux cils ; les plus fines atteignent les alvéoles.',
      questions: ['Pourquoi vaut-il mieux respirer par le nez ?', 'Pourquoi le tabac aggrave-t-il ces problèmes ?'],
      solution: [
        'Le nez filtre, humidifie et réchauffe l’air ; respirer par la bouche laisse entrer davantage de poussière sèche.',
        'La fumée paralyse les cils qui nettoient les bronches et abîme les alvéoles ; les poussières s’accumulent et les infections sont plus fréquentes.',
      ],
      fact: 'Un tissu humide sur le nez et la bouche, ou un masque, réduit nettement la quantité de poussière inhalée.',
    },
  ],
};
