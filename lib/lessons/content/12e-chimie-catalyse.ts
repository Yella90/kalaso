import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'L’eau oxygénée de la pharmacie se décompose très lentement dans son flacon. Versée sur une plaie, elle mousse aussitôt : une enzyme du sang, la catalase, accélère sa décomposition des milliers de fois. Cette substance qui accélère une réaction sans être consommée est un **catalyseur**.',
  objectives: [
    'distinguer l’équation-bilan d’une réaction et les actes élémentaires de son mécanisme ;',
    'définir un catalyseur et citer ses propriétés ;',
    'distinguer catalyse homogène, hétérogène et enzymatique ;',
    'reconnaître une autocatalyse sur une courbe.',
  ],
  sections: [
    {
      title: 'Le mécanisme d’une réaction',
      blocks: [
        {
          kind: 'text',
          text: 'Une équation-bilan dit ce qui disparaît et ce qui apparaît, mais pas **comment** la transformation se fait. Le plus souvent, elle résume une succession de réactions plus simples.',
        },
        {
          kind: 'definition',
          term: 'Acte élémentaire',
          text: 'réaction qui se produit en une seule étape, lors d’un choc entre deux entités (rarement trois). La suite des actes élémentaires est le **mécanisme réactionnel**.',
        },
        {
          kind: 'definition',
          term: 'Intermédiaire réactionnel',
          text: 'espèce formée dans un acte élémentaire et consommée dans un autre. Il n’apparaît pas dans l’équation-bilan.',
        },
        {
          kind: 'example',
          title: 'additionner les étapes',
          text: 'Un mécanisme en deux actes : (1) $\\ce{A + B -> I}$ puis (2) $\\ce{I + B -> C}$.',
          steps: ['En additionnant (1) et (2), $\\ce{I}$ disparaît des deux côtés.', 'Bilan : $\\ce{A + 2B -> C}$ ; $\\ce{I}$ est un intermédiaire réactionnel.'],
        },
        {
          kind: 'rule',
          text: 'C’est l’acte élémentaire le plus lent qui fixe la vitesse de toute la réaction, comme le passage le plus étroit d’une route fixe le débit des voitures.',
        },
      ],
    },
    {
      title: 'Le catalyseur',
      blocks: [
        {
          kind: 'definition',
          term: 'Catalyseur',
          text: 'espèce qui accélère une réaction possible sans apparaître dans son équation-bilan : il est consommé dans une étape du mécanisme et régénéré dans une autre.',
        },
        {
          kind: 'list',
          items: [
            'il est retrouvé intact en fin de réaction ; une petite quantité suffit ;',
            'il ne modifie pas l’état final : il fait atteindre **plus vite** le même résultat ;',
            'il ne rend pas possible une réaction qui ne l’est pas ;',
            'il est **sélectif** : à partir des mêmes réactifs, deux catalyseurs différents peuvent orienter vers des produits différents.',
          ],
        },
        {
          kind: 'example',
          title: 'les ions fer(III) et l’eau oxygénée',
          text: 'Décomposition : $\\ce{2H2O2 -> 2H2O + O2}$. Avec des ions $\\ce{Fe^3+}$ :',
          steps: [
            '(1) $\\ce{2Fe^3+ + H2O2 -> 2Fe^2+ + O2 + 2H+}$ ;',
            '(2) $\\ce{2Fe^2+ + H2O2 + 2H+ -> 2Fe^3+ + 2H2O}$.',
            'La solution devient brièvement plus claire (ions $\\ce{Fe^2+}$) puis reprend sa couleur rouille : $\\ce{Fe^3+}$ est régénéré, c’est le catalyseur.',
          ],
        },
      ],
    },
    {
      title: 'Trois types de catalyse',
      blocks: [
        {
          kind: 'table',
          head: ['Catalyse', 'Définition', 'Exemples'],
          rows: [
            ['Homogène', 'catalyseur et réactifs dans la **même phase** (souvent en solution)', 'ions $\\ce{Fe^3+}$ avec $\\ce{H2O2}$ ; ions $\\ce{H+}$ dans l’estérification'],
            ['Hétérogène', 'catalyseur **solide**, réactifs liquides ou gazeux ; la réaction a lieu à sa surface', 'fil de platine avec $\\ce{H2O2}$ ; pot catalytique des voitures'],
            ['Enzymatique', 'catalyseur biologique : une **enzyme** (protéine)', 'catalase du sang, amylase de la salive, levures du dolo'],
          ],
        },
        {
          kind: 'callout',
          variant: 'retenir',
          blocks: [
            {
              kind: 'text',
              text: 'En catalyse hétérogène, plus la surface du solide est grande, plus la réaction est rapide : on utilise des poudres ou des mousses métalliques. Les enzymes sont très efficaces et très sélectives, mais elles ne fonctionnent bien qu’à une température proche de 37 °C et au bon pH.',
            },
          ],
        },
        {
          kind: 'trap',
          wrong: '« Le catalyseur augmente la quantité de produit obtenue. »',
          why: 'Il ne change pas l’état final : la quantité de produit est la même, seule la durée change.',
          reflex: 'Catalyseur = même résultat, plus vite.',
        },
      ],
    },
    {
      title: 'L’autocatalyse',
      blocks: [
        {
          kind: 'definition',
          term: 'Autocatalyse',
          text: 'réaction dont un des **produits** est le catalyseur.',
        },
        {
          kind: 'example',
          title: 'permanganate et acide oxalique',
          text: 'Les ions permanganate $\\ce{MnO4-}$ (violets) oxydent l’acide oxalique. Les ions $\\ce{Mn^2+}$ formés catalysent la réaction.',
          steps: ['Au début, la décoloration est lente : il n’y a presque pas de $\\ce{Mn^2+}$.', 'Puis elle s’accélère brusquement, à mesure que le catalyseur se forme.', 'La courbe de l’avancement en fonction du temps a une forme de « S ».'],
        },
      ],
    },
  ],
  essentials: [
    'Mécanisme : suite d’actes élémentaires ; un intermédiaire réactionnel est formé puis consommé.',
    'Catalyseur : accélère, est régénéré, n’apparaît pas dans le bilan, ne change pas l’état final, est sélectif.',
    'Catalyse homogène (même phase), hétérogène (solide), enzymatique (enzyme).',
    'Autocatalyse : un produit catalyse la réaction ; démarrage lent puis accélération.',
  ],
  exercises: [
    {
      id: 'catalyse-mecanisme',
      level: 1,
      title: 'Lire un mécanisme',
      statement:
        'La décomposition de l’eau oxygénée par les ions iodure suit le mécanisme : (1) $\\ce{H2O2 + I- -> H2O + IO-}$ (lent) puis (2) $\\ce{H2O2 + IO- -> H2O + O2 + I-}$ (rapide).',
      parts: [
        {
          label: 'Quel est l’intermédiaire réactionnel ? (écris sa formule)',
          answer: { kind: 'text', display: 'IO⁻', accepted: ['IO-', 'IO⁻', 'io-', 'ion hypoiodite', 'hypoiodite'] },
          steps: ['$\\ce{IO-}$ est formé dans l’étape (1) et consommé dans l’étape (2).'],
        },
        {
          label: 'Quel est le catalyseur ? (écris sa formule)',
          answer: { kind: 'text', display: 'I⁻', accepted: ['I-', 'I⁻', 'i-', 'ion iodure', 'iodure', 'ions iodure'] },
          steps: ['$\\ce{I-}$ est consommé dans l’étape (1) et régénéré dans l’étape (2) : il n’apparaît pas dans le bilan.', 'Bilan : $\\ce{2H2O2 -> 2H2O + O2}$.'],
        },
        {
          label: 'Laquelle des deux étapes fixe la vitesse de la réaction ? (réponds 1 ou 2)',
          answer: { kind: 'number', value: 1, tolerance: 0, unit: '' },
          steps: ['C’est l’étape la plus lente, l’étape (1).'],
        },
      ],
    },
    {
      id: 'catalyse-volume',
      level: 2,
      title: 'Le catalyseur ne change pas le résultat',
      statement:
        'On décompose 10,0 mL d’eau oxygénée à 0,50 mol/L, d’abord sans catalyseur, puis avec un fil de platine : $\\ce{2H2O2 -> 2H2O + O2}$. $V_m = 24$ L/mol.',
      parts: [
        {
          label: 'Calcule la quantité initiale d’eau oxygénée (en mol).',
          answer: { kind: 'number', value: 0.005, tolerance: 0.0001, unit: 'mol' },
          steps: ['$n = C \\times V = 0{,}50 \\times 10{,}0 \\times 10^{-3} = 5{,}0 \\times 10^{-3}$ mol.'],
          result: 'n(\\ce{H2O2}) = 5{,}0 \\times 10^{-3}\\ \\text{mol}',
        },
        {
          label: 'Quel volume de dioxygène obtient-on en fin de réaction avec le platine (en mL) ?',
          answer: { kind: 'number', value: 60, tolerance: 1, unit: 'mL' },
          steps: ['$n(\\ce{O2}) = \\dfrac{n(\\ce{H2O2})}{2} = 2{,}5 \\times 10^{-3}$ mol.', '$V = 2{,}5 \\times 10^{-3} \\times 24 = 0{,}060$ L $= 60$ mL.'],
          result: 'V(\\ce{O2}) = 60\\ \\text{mL}',
        },
        {
          label: 'Et sans catalyseur, une fois la réaction terminée (en mL) ?',
          answer: { kind: 'number', value: 60, tolerance: 1, unit: 'mL' },
          steps: ['Le catalyseur ne change pas l’état final : on obtient aussi 60 mL, mais après une durée beaucoup plus longue.'],
          result: 'V(\\ce{O2}) = 60\\ \\text{mL}',
        },
      ],
    },
    {
      id: 'catalyse-types',
      level: 3,
      title: 'Classer des catalyses',
      statement:
        'Pour chaque cas, on veut savoir s’il s’agit d’une catalyse homogène, hétérogène ou enzymatique. Réponds par un seul mot.',
      parts: [
        {
          label: 'L’estérification de l’acide éthanoïque par l’éthanol, accélérée par quelques gouttes d’acide sulfurique.',
          answer: { kind: 'text', display: 'homogène', accepted: ['homogene', 'homogène', 'catalyse homogène', 'catalyse homogene'] },
          steps: ['Les ions $\\ce{H+}$ de l’acide et les réactifs forment un seul mélange liquide.'],
        },
        {
          label: 'La transformation des gaz d’échappement sur le platine et le rhodium du pot catalytique.',
          answer: { kind: 'text', display: 'hétérogène', accepted: ['heterogene', 'hétérogène', 'catalyse hétérogène', 'catalyse heterogene'] },
          steps: ['Le catalyseur est un solide, les réactifs sont des gaz.'],
        },
        {
          label: 'La digestion de l’amidon du tô par l’amylase de la salive.',
          answer: { kind: 'text', display: 'enzymatique', accepted: ['enzymatique', 'catalyse enzymatique'] },
          steps: ['L’amylase est une enzyme.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Un catalyseur :',
      choices: ['accélère une réaction et se retrouve intact à la fin', 'augmente la quantité de produit', 'rend possible n’importe quelle réaction', 'est consommé comme un réactif'],
      answer: 0,
      explanation: 'Il est consommé dans une étape et régénéré dans une autre : il n’apparaît pas dans le bilan.',
    },
    {
      question: 'La catalase du sang qui décompose l’eau oxygénée réalise une catalyse :',
      choices: ['enzymatique', 'hétérogène', 'homogène', 'autocatalytique'],
      answer: 0,
      explanation: 'La catalase est une enzyme.',
    },
    {
      question: 'Un intermédiaire réactionnel :',
      choices: ['est formé puis consommé au cours du mécanisme', 'apparaît dans l’équation-bilan', 'est un catalyseur', 'est toujours un gaz'],
      answer: 0,
      explanation: 'Il n’existe que pendant la réaction et disparaît du bilan.',
    },
    {
      question: 'Dans une autocatalyse, le catalyseur est :',
      choices: ['un des produits', 'un des réactifs', 'le solvant', 'une enzyme'],
      answer: 0,
      explanation: 'La réaction démarre lentement, puis s’accélère à mesure que le produit-catalyseur se forme.',
    },
    {
      question: 'Pourquoi les catalyseurs solides sont-ils souvent en poudre ou en mousse ?',
      choices: ['pour augmenter la surface de contact', 'pour qu’ils se dissolvent', 'pour qu’ils soient consommés plus vite', 'pour changer les produits'],
      answer: 0,
      explanation: 'La réaction a lieu à la surface du solide : plus elle est grande, plus la réaction est rapide.',
    },
  ],
  applications: [
    {
      title: 'La salive et le tô',
      tagline: 'Pourquoi le tô devient-il sucré si on le mâche longtemps ?',
      situation:
        'En mâchant longtemps un morceau de tô, on sent un goût sucré apparaître. La salive contient une enzyme, l’amylase, qui découpe l’amidon en sucres plus petits.',
      model: 'L’amylase catalyse l’hydrolyse de l’amidon ; sans elle, cette réaction serait extrêmement lente à 37 °C.',
      questions: [
        'De quel type de catalyse s’agit-il ?',
        'Pourquoi l’amylase n’agit-elle presque plus dans l’estomac, très acide ?',
      ],
      solution: [
        'Catalyse enzymatique.',
        'Une enzyme ne fonctionne bien qu’à un pH précis : la salive est presque neutre, l’estomac très acide. Dans l’estomac, l’amylase ne garde plus la forme qui la rend active.',
      ],
      fact: 'Les levures du dolo contiennent elles aussi des enzymes : elles catalysent la fermentation du glucose en éthanol.',
    },
    {
      title: 'Le pot catalytique',
      tagline: 'Que fait la boîte sous les voitures récentes ?',
      situation:
        'Le pot catalytique contient une céramique en nid d’abeille couverte d’une fine couche de platine, de palladium et de rhodium. Les gaz d’échappement la traversent.',
      model: 'Les métaux catalysent, entre autres, la transformation du monoxyde de carbone : $\\ce{2CO + O2 -> 2CO2}$.',
      questions: ['Pourquoi le support est-il en nid d’abeille ?', 'Le platine est-il consommé ?'],
      solution: [
        'Le nid d’abeille donne une très grande surface de contact pour peu de métal : la catalyse hétérogène a lieu à la surface.',
        'Non, c’est un catalyseur : il est régénéré. Mais il peut être « empoisonné » par certaines impuretés de l’essence.',
      ],
    },
  ],
};
