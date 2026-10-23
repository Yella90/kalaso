import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Le sprinteur du 100 m et le berger qui marche toute la journée derrière son troupeau utilisent les mêmes muscles, mais pas de la même façon. Au microscope, le muscle de la cuisse est **strié** de bandes claires et sombres. Ces stries cachent une machine moléculaire : des filaments qui glissent les uns sur les autres en consommant de l’ATP.',
  objectives: [
    'décrire l’organisation du muscle strié, de l’organe aux myofilaments ;',
    'expliquer la contraction par le glissement des filaments d’actine et de myosine ;',
    'décrire le rôle du calcium et de l’ATP ;',
    'citer les voies de régénération de l’ATP selon l’effort.',
  ],
  sections: [
    {
      title: 'Du muscle au sarcomère',
      blocks: [
        {
          kind: 'text',
          text: 'Un muscle est formé de **faisceaux** de **fibres musculaires** : des cellules très longues, à plusieurs noyaux. Chaque fibre contient des **myofibrilles**, découpées en unités répétées, les **sarcomères**, limités par deux stries Z.',
        },
        {
          kind: 'table',
          head: ['Zone du sarcomère', 'Contenu'],
          rows: [
            ['bande I (claire)', 'filaments fins d’**actine** seuls'],
            ['bande A (sombre)', 'filaments épais de **myosine** (et actine qui les chevauche)'],
            ['zone H (au centre de A)', 'myosine seule'],
            ['strie Z', 'limite du sarcomère, où s’ancrent les filaments d’actine'],
          ],
        },
      ],
    },
    {
      title: 'Le mécanisme de la contraction',
      blocks: [
        {
          kind: 'rule',
          text: 'Pendant la contraction, les filaments d’actine **glissent** entre les filaments de myosine vers le centre du sarcomère : les stries Z se rapprochent, les bandes I et la zone H raccourcissent, la bande A garde sa longueur.',
        },
        {
          kind: 'list',
          items: [
            'le motoneurone libère de l’acétylcholine à la **plaque motrice** : un potentiel d’action parcourt la fibre ;',
            'le réticulum sarcoplasmique libère des ions **calcium** $\\ce{Ca^2+}$, qui démasquent les sites de fixation sur l’actine ;',
            'les têtes de myosine s’accrochent à l’actine, pivotent et la tirent, puis se détachent grâce à l’**ATP** ;',
            'quand le calcium est repompé, le muscle se relâche.',
          ],
        },
        {
          kind: 'trap',
          wrong: '« Les filaments se raccourcissent pendant la contraction. »',
          why: 'Les filaments gardent leur longueur ; ce sont leurs chevauchements qui augmentent.',
          reflex: 'Bande A constante ; I et H diminuent.',
        },
      ],
    },
    {
      title: 'L’énergie de la contraction',
      blocks: [
        {
          kind: 'table',
          head: ['Voie de régénération de l’ATP', 'Rapidité', 'Durée', 'Effort typique'],
          rows: [
            ['phosphocréatine', 'immédiate', 'quelques secondes', 'départ de sprint, saut'],
            ['fermentation lactique', 'rapide', 'une à deux minutes', '400 m ; produit de l’acide lactique'],
            ['respiration', 'plus lente à se mettre en route', 'des heures', 'marche, course de fond'],
          ],
        },
      ],
    },
  ],
  essentials: [
    'Muscle → faisceaux → fibres (plurinucléées) → myofibrilles → sarcomères.',
    'Contraction : glissement de l’actine sur la myosine ; I et H raccourcissent, A constante.',
    'Commande : acétylcholine à la plaque motrice → potentiel d’action → libération de $\\ce{Ca^2+}$ ; ATP pour détacher la myosine.',
    'ATP régénéré par la phosphocréatine, la fermentation lactique ou la respiration selon l’effort.',
  ],
  exercises: [
    {
      id: 'muscle-sarcomere',
      level: 1,
      title: 'Le raccourcissement d’un sarcomère',
      statement: 'Au repos, un sarcomère mesure 2,5 µm ; contracté, il mesure 2,0 µm.',
      parts: [
        {
          label: 'De quel pourcentage le sarcomère a-t-il raccourci ?',
          answer: { kind: 'number', value: 20, tolerance: 0.1, unit: '%' },
          steps: ['$\\dfrac{2{,}5 - 2{,}0}{2{,}5} = 0{,}20$, soit 20 %.'],
        },
        {
          label: 'Une myofibrille de 2,0 cm de long au repos contient combien de sarcomères ?',
          answer: { kind: 'number', value: 8000, tolerance: 0, unit: '' },
          steps: ['$\\dfrac{20\\,000\\ \\text{µm}}{2{,}5\\ \\text{µm}} = 8\\,000$.'],
        },
        {
          label: 'Quelle bande garde la même longueur pendant la contraction ? (écris A, I ou H)',
          answer: { kind: 'text', display: 'A', accepted: ['a', 'bande a', 'la bande a'] },
          steps: ['La bande A correspond à la longueur des filaments de myosine, qui ne change pas.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Les filaments épais du sarcomère sont formés de :',
      choices: ['myosine', 'actine', 'collagène', 'kératine'],
      answer: 0,
      explanation: 'L’actine forme les filaments fins.',
    },
    {
      question: 'Le signal qui déclenche le glissement des filaments dans la fibre est :',
      choices: ['la libération d’ions calcium', 'l’entrée d’eau', 'la sortie d’ATP', 'la destruction de la myosine'],
      answer: 0,
      explanation: 'Le calcium libère les sites de fixation de la myosine sur l’actine.',
    },
    {
      question: 'Pendant un sprint de 10 secondes, l’ATP est surtout régénéré par :',
      choices: ['la phosphocréatine', 'la respiration', 'la photosynthèse', 'la digestion'],
      answer: 0,
      explanation: 'C’est la voie la plus rapide, mais elle s’épuise en quelques secondes.',
    },
    {
      question: 'Une fibre musculaire striée est une cellule :',
      choices: ['très longue, à plusieurs noyaux', 'sans noyau', 'ronde et petite', 'à paroi de cellulose'],
      answer: 0,
      explanation: 'Elle résulte de la fusion de nombreuses cellules.',
    },
  ],
  applications: [
    {
      title: 'Sprinteur ou berger ?',
      tagline: 'Deux efforts, deux façons de fabriquer l’ATP',
      situation:
        'Un athlète court un 400 m en 50 s et finit les jambes « brûlantes ». Un berger peul marche 25 km par jour derrière son troupeau sans s’épuiser.',
      model: 'On compare les voies de régénération de l’ATP.',
      questions: ['Quelle voie domine chez le coureur de 400 m ?', 'Et chez le berger ?'],
      solution: [
        'La fermentation lactique : rapide, mais l’acide lactique s’accumule et contribue à la sensation de brûlure et à la fatigue.',
        'La respiration : plus lente à démarrer, mais elle peut fonctionner des heures avec un bon apport de dioxygène et de nutriments.',
      ],
      fact: 'L’entraînement en endurance augmente le nombre de mitochondries dans les fibres musculaires.',
    },
  ],
};
