import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Dans le delta intérieur du Niger, les crues nourrissent le bourgou, que broutent les bœufs ; les poissons mangent le plancton ; les hérons mangent les poissons ; les pêcheurs Bozo vivent de la pêche. Si l’un de ces maillons disparaît, tout le delta en souffre. Cet ensemble vivant et son milieu forment un **écosystème**.',
  objectives: [
    'définir écosystème, biotope et biocénose ;',
    'construire une chaîne et un réseau trophique ;',
    'expliquer la perte d’énergie d’un niveau à l’autre ;',
    'décrire le cycle de la matière et le rôle des décomposeurs.',
  ],
  sections: [
    {
      title: 'Qu’est-ce qu’un écosystème ?',
      blocks: [
        {
          kind: 'formula',
          tex: '\\text{écosystème} = \\text{biotope} + \\text{biocénose}',
          legend: ['biotope : le milieu (sol, eau, climat) ; biocénose : l’ensemble des êtres vivants'],
        },
        {
          kind: 'text',
          text: 'Exemples : une mare, une forêt galerie, la savane, le delta intérieur du Niger. Les êtres vivants y sont liés par des relations : alimentation, compétition, parasitisme, symbiose.',
        },
      ],
    },
    {
      title: 'Chaînes et réseaux trophiques',
      blocks: [
        {
          kind: 'list',
          items: [
            '**producteurs** : végétaux chlorophylliens, qui fabriquent leur matière par photosynthèse ;',
            '**consommateurs primaires** : herbivores ;',
            '**consommateurs secondaires et tertiaires** : carnivores ;',
            '**décomposeurs** : bactéries, champignons, vers, qui transforment les cadavres et déchets en sels minéraux.',
          ],
        },
        {
          kind: 'example',
          title: 'une chaîne de la savane',
          text: 'herbe → criquet → poule pintade → chacal. La flèche signifie « est mangé par ».',
        },
        {
          kind: 'text',
          text: 'Dans la réalité, les chaînes s’entrecroisent : un animal mange plusieurs proies et a plusieurs prédateurs. On parle de **réseau trophique**.',
        },
        {
          kind: 'rule',
          text: 'À chaque niveau, environ **90 %** de l’énergie est perdue (respiration, chaleur, déchets) : seuls 10 % passent au niveau suivant. C’est pourquoi les chaînes sont courtes et les grands prédateurs rares.',
        },
      ],
    },
    {
      title: 'Le cycle de la matière',
      blocks: [
        {
          kind: 'text',
          text: 'La matière, elle, circule en boucle : les producteurs fabriquent leur matière avec le CO₂, l’eau et les sels minéraux ; elle passe aux consommateurs ; les décomposeurs la ramènent sous forme de sels minéraux et de CO₂, réutilisés par les plantes.',
        },
        {
          kind: 'trap',
          wrong: '« L’énergie circule en cycle, comme la matière. »',
          why: 'L’énergie entre par la lumière du soleil et sort sous forme de chaleur : elle traverse l’écosystème sans revenir.',
          reflex: 'Matière : cycle ; énergie : flux à sens unique.',
        },
      ],
    },
  ],
  essentials: [
    'Écosystème = biotope (milieu) + biocénose (êtres vivants).',
    'Producteurs → consommateurs → décomposeurs ; les chaînes forment des réseaux.',
    'Environ 10 % de l’énergie passe d’un niveau trophique au suivant.',
    'La matière fait un cycle grâce aux décomposeurs ; l’énergie ne fait que traverser.',
  ],
  exercises: [
    {
      id: 'eco-energie',
      level: 1,
      title: 'La règle des 10 %',
      statement: 'Dans une prairie, l’herbe stocke 100 000 kJ d’énergie. On suppose que 10 % passent à chaque niveau.',
      parts: [
        {
          label: 'Énergie qui parvient aux herbivores (kJ).',
          answer: { kind: 'number', value: 10000, tolerance: 1, unit: 'kJ' },
          steps: ['$100\\,000 \\times 0{,}1 = 10\\,000$ kJ.'],
        },
        {
          label: 'Énergie qui parvient aux carnivores qui mangent ces herbivores (kJ).',
          answer: { kind: 'number', value: 1000, tolerance: 1, unit: 'kJ' },
          steps: ['$10\\,000 \\times 0{,}1 = 1\\,000$ kJ.'],
        },
      ],
    },
    {
      id: 'eco-role',
      level: 2,
      title: 'Qui fait quoi ?',
      statement: 'Réponds par un mot : producteur, consommateur ou décomposeur.',
      parts: [
        {
          label: 'Le bourgou des plaines inondées.',
          answer: { kind: 'text', display: 'producteur', accepted: ['producteur', 'un producteur'] },
          steps: ['C’est une plante chlorophyllienne.'],
        },
        {
          label: 'Le champignon qui pousse sur un tronc mort.',
          answer: { kind: 'text', display: 'décomposeur', accepted: ['décomposeur', 'decomposeur', 'un décomposeur'] },
          steps: ['Il transforme le bois mort en matière minérale.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Le biotope désigne :',
      choices: ['le milieu de vie', 'les êtres vivants', 'les prédateurs', 'les plantes'],
      answer: 0,
      explanation: 'La biocénose est l’ensemble des êtres vivants.',
    },
    {
      question: 'Dans « herbe → criquet → pintade », le criquet est :',
      choices: ['consommateur primaire', 'producteur', 'consommateur secondaire', 'décomposeur'],
      answer: 0,
      explanation: 'Il mange directement un producteur.',
    },
    {
      question: 'Sans décomposeurs :',
      choices: ['les sels minéraux ne retourneraient plus au sol', 'les plantes pousseraient mieux', 'il y aurait plus d’énergie', 'rien ne changerait'],
      answer: 0,
      explanation: 'Le cycle de la matière serait bloqué.',
    },
    {
      question: 'Pourquoi y a-t-il peu de lions dans une savane ?',
      choices: ['l’énergie diminue à chaque niveau trophique', 'ils ne mangent pas assez d’herbe', 'ils sont décomposeurs', 'ils font la photosynthèse'],
      answer: 0,
      explanation: 'Il faut beaucoup de proies, donc beaucoup d’herbe, pour nourrir un seul prédateur.',
    },
  ],
  applications: [
    {
      title: 'Les poissons du delta',
      tagline: 'Pêcher sans épuiser',
      situation:
        'Dans un lac du delta, les pêcheurs prennent chaque année 120 tonnes de poissons carnivores (capitaines). Ces poissons mangent de petits poissons herbivores, qui mangent les algues et le plancton.',
      model: 'Environ 10 % de la masse d’un niveau se retrouve au niveau suivant.',
      questions: ['Quelle masse de petits poissons a été nécessaire pour produire ces 120 t de capitaines ?', 'Pourquoi interdit-on la pêche avec des filets à mailles trop fines ?'],
      check: { value: 1200, tolerance: 0.02, unit: 't' },
      solution: [
        '$120 \\div 0{,}1 = 1\\,200$ t de petits poissons.',
        'Les mailles fines capturent les jeunes poissons avant qu’ils se reproduisent : la population s’effondre et toute la chaîne alimentaire est touchée.',
      ],
      fact: 'Le delta intérieur du Niger est l’une des plus grandes zones humides d’Afrique : des millions d’oiseaux d’Europe y passent l’hiver.',
    },
  ],
};
