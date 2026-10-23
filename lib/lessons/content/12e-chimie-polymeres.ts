import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Bidons d’huile, nattes, chaises de cour, tuyaux d’arrosage, sachets noirs du marché : autour de nous, presque tout ce qui est en « plastique » est fait de molécules géantes. Chacune est une longue chaîne de milliers de petites molécules accrochées les unes aux autres, comme les perles d’un collier. Ce sont les **polymères**.',
  objectives: [
    'définir monomère, polymère, motif et degré de polymérisation ;',
    'écrire l’équation d’une polyaddition et trouver le monomère d’un polymère donné ;',
    'reconnaître une polycondensation (nylon, polyester) ;',
    'calculer un degré de polymérisation et une masse molaire moyenne.',
  ],
  sections: [
    {
      title: 'Monomère, polymère, motif',
      blocks: [
        {
          kind: 'definition',
          term: 'Polymère',
          text: 'macromolécule formée par l’enchaînement d’un très grand nombre de petites molécules identiques, les **monomères**. La partie qui se répète dans la chaîne s’appelle le **motif**.',
        },
        {
          kind: 'formula',
          label: 'Degré de polymérisation',
          tex: 'n = \\dfrac{M(\\text{polymère})}{M(\\text{motif})}',
          legend: ['$n$ : nombre de motifs dans une chaîne (sans unité)', 'les chaînes n’ont pas toutes la même longueur : on parle de degré de polymérisation **moyen**'],
        },
        {
          kind: 'example',
          title: 'un polyéthylène',
          text: 'Un échantillon de polyéthylène a une masse molaire moyenne de 56 000 g/mol. Le motif $\\ce{-CH2-CH2-}$ a pour masse molaire 28 g/mol.',
          steps: ['$n = \\dfrac{56\\,000}{28} = 2\\,000$ : chaque chaîne compte en moyenne 2 000 motifs.'],
        },
      ],
    },
    {
      title: 'La polyaddition',
      blocks: [
        {
          kind: 'text',
          text: 'Les monomères qui possèdent une **double liaison** $\\ce{C=C}$ s’additionnent les uns aux autres : la double liaison s’ouvre et chaque monomère se lie à deux voisins. Aucun autre produit ne se forme.',
        },
        {
          kind: 'formula',
          label: 'Polymérisation de l’éthylène',
          tex: 'n\\,\\ce{CH2=CH2} \\longrightarrow \\ce{-(CH2-CH2)_{n}-}',
        },
        {
          kind: 'table',
          head: ['Monomère', 'Polymère', 'Usages'],
          rows: [
            ['éthylène $\\ce{CH2=CH2}$', 'polyéthylène (PE)', 'sachets, bidons, films'],
            ['propène $\\ce{CH2=CH-CH3}$', 'polypropylène (PP)', 'chaises, seaux, nattes, sacs tissés'],
            ['chlorure de vinyle $\\ce{CH2=CHCl}$', 'polychlorure de vinyle (PVC)', 'tuyaux d’eau, gaines électriques'],
            ['styrène $\\ce{CH2=CH-C6H5}$', 'polystyrène (PS)', 'emballages, gobelets'],
            ['tétrafluoroéthylène $\\ce{CF2=CF2}$', 'polytétrafluoroéthylène (PTFE)', 'revêtement des poêles antiadhésives'],
          ],
        },
        {
          kind: 'callout',
          variant: 'methode',
          title: 'Retrouver le monomère',
          blocks: [
            {
              kind: 'text',
              text: 'On repère le motif (deux carbones de la chaîne principale), puis on remet une double liaison entre ces deux carbones. Exemple : le motif $\\ce{-CH2-CHCl-}$ vient de $\\ce{CH2=CHCl}$.',
            },
          ],
        },
      ],
    },
    {
      title: 'La polycondensation',
      blocks: [
        {
          kind: 'text',
          text: 'Deux monomères différents, portant chacun **deux groupes fonctionnels**, réagissent bout à bout. Chaque liaison formée libère une petite molécule, souvent de l’eau.',
        },
        {
          kind: 'formula',
          label: 'Le nylon 6-6 (un polyamide)',
          tex: '\\ce{HOOC-(CH2)4-COOH} + \\ce{H2N-(CH2)6-NH2} \\longrightarrow \\ce{-[CO-(CH2)4-CO-NH-(CH2)6-NH]-} + \\ce{2H2O}',
          legend: ['acide hexanedioïque + hexane-1,6-diamine ; les liaisons $\\ce{-CO-NH-}$ sont des liaisons **amide**'],
        },
        {
          kind: 'text',
          text: 'De la même façon, un diacide et un dialcool donnent un **polyester** (liaisons ester) : c’est le PET des bouteilles d’eau minérale et des tissus synthétiques.',
        },
        {
          kind: 'trap',
          wrong: '« Dans une polycondensation, la masse du polymère est égale à la masse des monomères. »',
          why: 'Chaque liaison formée élimine une molécule d’eau, qui ne fait pas partie du polymère.',
          reflex: 'Masse du polymère = masse des monomères − masse de l’eau éliminée.',
        },
      ],
    },
    {
      title: 'Propriétés et environnement',
      blocks: [
        {
          kind: 'list',
          items: [
            '**Thermoplastiques** (PE, PP, PVC, PS) : ils se ramollissent à la chaleur et peuvent être refondus et remoulés, donc recyclés.',
            '**Thermodurcissables** (bakélite des prises électriques, résines) : ils durcissent définitivement une fois chauffés et ne fondent plus.',
          ],
        },
        {
          kind: 'callout',
          variant: 'attention',
          title: 'Ne pas brûler les plastiques',
          blocks: [
            {
              kind: 'text',
              text: 'Les polymères se dégradent très lentement dans la nature : un sachet abandonné reste des dizaines d’années dans le sol et peut tuer le bétail qui l’avale. Les brûler à l’air libre dégage des fumées toxiques ; le PVC libère en plus du chlorure d’hydrogène $\\ce{HCl}$, très irritant.',
            },
          ],
        },
      ],
    },
  ],
  essentials: [
    'Polymère : enchaînement de $n$ motifs ; $n = \\dfrac{M(\\text{polymère})}{M(\\text{motif})}$.',
    'Polyaddition : monomères à double liaison $\\ce{C=C}$, aucun sous-produit ; PE, PP, PVC, PS, PTFE.',
    'Polycondensation : deux monomères bifonctionnels, élimination d’eau ; polyamides (nylon) et polyesters (PET).',
    'Thermoplastiques recyclables, thermodurcissables non ; ne jamais brûler les plastiques.',
  ],
  exercises: [
    {
      id: 'polymere-pe',
      level: 1,
      title: 'Degré de polymérisation d’un polyéthylène',
      statement: 'Un polyéthylène a une masse molaire moyenne de 70 000 g/mol. C = 12 et H = 1 g/mol.',
      parts: [
        {
          label: 'Calcule la masse molaire du motif $\\ce{-CH2-CH2-}$ (en g/mol).',
          answer: { kind: 'number', value: 28, tolerance: 0.1, unit: 'g/mol' },
          steps: ['$M = 2 \\times 12 + 4 \\times 1 = 28$ g/mol.'],
          result: 'M(\\text{motif}) = 28\\ \\text{g/mol}',
        },
        {
          label: 'Calcule le degré de polymérisation moyen.',
          answer: { kind: 'number', value: 2500, tolerance: 5, unit: '' },
          steps: ['$n = \\dfrac{70\\,000}{28} = 2\\,500$.'],
          result: 'n = 2\\,500',
        },
      ],
    },
    {
      id: 'polymere-pvc',
      level: 2,
      title: 'Le PVC des tuyaux',
      statement:
        'Le polychlorure de vinyle (PVC) est obtenu par polyaddition du chlorure de vinyle $\\ce{CH2=CHCl}$. Un échantillon a une masse molaire moyenne de 125 000 g/mol. Cl = 35,5 g/mol.',
      parts: [
        {
          label: 'Calcule la masse molaire du monomère (en g/mol).',
          answer: { kind: 'number', value: 62.5, tolerance: 0.1, unit: 'g/mol' },
          steps: ['$M = 2 \\times 12 + 3 \\times 1 + 35{,}5 = 62{,}5$ g/mol ; c’est aussi la masse molaire du motif.'],
          result: 'M = 62{,}5\\ \\text{g/mol}',
        },
        {
          label: 'Calcule le degré de polymérisation moyen.',
          answer: { kind: 'number', value: 2000, tolerance: 5, unit: '' },
          steps: ['$n = \\dfrac{125\\,000}{62{,}5} = 2\\,000$.'],
          result: 'n = 2\\,000',
        },
        {
          label: 'Quel est le pourcentage en masse de chlore dans le PVC (en %) ?',
          answer: { kind: 'number', value: 56.8, tolerance: 0.3, unit: '%' },
          steps: ['Chaque motif contient un atome de chlore : $\\dfrac{35{,}5}{62{,}5} \\times 100 = 56{,}8$ %.'],
          result: '\\%\\,\\ce{Cl} = 56{,}8\\ \\%',
        },
      ],
    },
    {
      id: 'polymere-nylon',
      level: 3,
      title: 'Fabriquer du nylon 6-6',
      statement:
        'Le motif du nylon 6-6 est $\\ce{-[CO-(CH2)4-CO-NH-(CH2)6-NH]-}$. Sa formation libère deux molécules d’eau par motif. N = 14 g/mol.',
      parts: [
        {
          label: 'Calcule la masse molaire du motif (en g/mol).',
          answer: { kind: 'number', value: 226, tolerance: 0.5, unit: 'g/mol' },
          steps: ['Formule du motif : $\\ce{C12H22N2O2}$.', '$M = 12 \\times 12 + 22 + 2 \\times 14 + 2 \\times 16 = 226$ g/mol.'],
          result: 'M(\\text{motif}) = 226\\ \\text{g/mol}',
        },
        {
          label: 'Quelle masse d’eau est libérée quand on fabrique 1,00 kg de nylon (en g) ?',
          answer: { kind: 'number', value: 159, tolerance: 2, unit: 'g' },
          steps: ['$n(\\text{motifs}) = \\dfrac{1\\,000}{226} \\approx 4{,}42$ mol.', '$n(\\ce{H2O}) = 2 \\times 4{,}42 = 8{,}85$ mol, soit $m = 8{,}85 \\times 18 \\approx 159$ g.'],
          result: 'm(\\ce{H2O}) \\approx 159\\ \\text{g}',
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Quel monomère donne le polypropylène ?',
      choices: ['$\\ce{CH2=CH-CH3}$', '$\\ce{CH3-CH2-CH3}$', '$\\ce{CH2=CHCl}$', '$\\ce{CH2=CH2}$'],
      answer: 0,
      explanation: 'Il faut une double liaison $\\ce{C=C}$ : le propène. Le propane n’en a pas et ne polymérise pas.',
    },
    {
      question: 'Une polyaddition :',
      choices: ['ne forme aucun autre produit que le polymère', 'libère de l’eau', 'demande deux monomères différents', 'forme des liaisons amide'],
      answer: 0,
      explanation: 'Les autres propositions décrivent une polycondensation.',
    },
    {
      question: 'Le motif $\\ce{-CH2-CHCl-}$ est celui du :',
      choices: ['PVC', 'polystyrène', 'polyéthylène', 'nylon'],
      answer: 0,
      explanation: 'Monomère : chlorure de vinyle, $\\ce{CH2=CHCl}$.',
    },
    {
      question: 'Un polymère de masse molaire 42 000 g/mol a un motif de 42 g/mol. Son degré de polymérisation vaut :',
      choices: ['1 000', '42', '100', '1 764 000'],
      answer: 0,
      explanation: '$n = \\dfrac{42\\,000}{42} = 1\\,000$.',
    },
    {
      question: 'Pourquoi peut-on recycler une chaise en polypropylène ?',
      choices: ['C’est un thermoplastique : il refond à la chaleur', 'C’est un thermodurcissable', 'Il est biodégradable', 'Il ne contient que du carbone'],
      answer: 0,
      explanation: 'Un thermoplastique se ramollit à la chaleur et peut être remoulé.',
    },
  ],
  applications: [
    {
      title: 'Le sachet brûlé dans la cour',
      tagline: 'Que devient un sachet plastique quand on le brûle ?',
      situation:
        'Pour « nettoyer » la cour, on brûle un tas de sachets en polyéthylène. Un sachet pèse 2,0 g. On suppose la combustion complète : $\\ce{(C2H4)_{n}} + 3n\\,\\ce{O2} \\longrightarrow 2n\\,\\ce{CO2} + 2n\\,\\ce{H2O}$.',
      model: 'Combustion complète ; en réalité, une combustion à l’air libre est incomplète et dégage aussi du monoxyde de carbone et des fumées.',
      questions: ['Quelle masse de dioxyde de carbone libère un seul sachet, en g ?'],
      check: { value: 6.29, tolerance: 0.03, unit: 'g' },
      solution: [
        'Quantité de motifs : $\\dfrac{2{,}0}{28} \\approx 7{,}14 \\times 10^{-2}$ mol.',
        'Chaque motif donne 2 $\\ce{CO2}$ : $n(\\ce{CO2}) \\approx 0{,}143$ mol, soit $m = 0{,}143 \\times 44 \\approx 6{,}3$ g.',
        'Le sachet libère plus de trois fois sa masse en $\\ce{CO2}$, un gaz à effet de serre.',
      ],
      fact: 'Plusieurs pays d’Afrique de l’Ouest, dont le Mali, ont interdit les sachets plastiques non biodégradables pour protéger les sols et le bétail.',
    },
    {
      title: 'Choisir le bon tuyau',
      tagline: 'Pourquoi le plombier utilise-t-il du PVC ?',
      situation:
        'Un plombier installe l’arrivée d’eau d’une maison à Sikasso. Il hésite entre un tuyau en PVC et un tuyau en polyéthylène, plus souple.',
      model: 'On compare des propriétés générales des deux matériaux.',
      questions: [
        'Les deux polymères sont-ils obtenus par polyaddition ou par polycondensation ?',
        'Pourquoi ne doit-on jamais brûler les chutes de tuyaux en PVC ?',
      ],
      solution: [
        'Tous deux par polyaddition : de l’éthylène pour le PE, du chlorure de vinyle pour le PVC.',
        'Le PVC contient environ 57 % de chlore en masse : en brûlant, il libère du chlorure d’hydrogène, un gaz toxique et corrosif.',
      ],
    },
  ],
};
