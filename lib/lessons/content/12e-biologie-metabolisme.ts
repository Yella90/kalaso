import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Courir un 100 m, réfléchir à un devoir, faire battre son cœur : chaque activité demande de l’énergie. Nos cellules la tirent surtout du glucose, mais pas directement : elles la transfèrent d’abord à une petite molécule, l’**ATP**, la « monnaie énergétique » de la cellule. Avec du dioxygène, elles en fabriquent beaucoup ; sans, très peu.',
  objectives: [
    'expliquer le rôle de l’ATP ;',
    'décrire les étapes de la respiration cellulaire et leur localisation ;',
    'décrire les fermentations alcoolique et lactique ;',
    'comparer les rendements énergétiques de la respiration et de la fermentation.',
  ],
  sections: [
    {
      title: 'L’ATP, monnaie énergétique',
      blocks: [
        {
          kind: 'formula',
          tex: '\\text{ATP} + \\ce{H2O} \\longrightarrow \\text{ADP} + \\text{P}_i + \\text{énergie (environ 30 kJ/mol)}',
          legend: ['ATP : adénosine triphosphate ; ADP : adénosine diphosphate ; P$_i$ : phosphate'],
        },
        {
          kind: 'text',
          text: 'L’ATP est utilisé dans toute la cellule (contraction musculaire, transport actif, synthèses) et sans cesse régénéré à partir de l’ADP grâce à l’énergie des nutriments. Un adulte recycle chaque jour une masse d’ATP proche de sa propre masse.',
        },
      ],
    },
    {
      title: 'La respiration cellulaire',
      blocks: [
        {
          kind: 'formula',
          label: 'Bilan',
          tex: '\\ce{C6H12O6 + 6O2 -> 6CO2 + 6H2O} \\qquad \\text{environ 36 ATP par glucose}',
        },
        {
          kind: 'table',
          head: ['Étape', 'Lieu', 'Ce qui se passe'],
          rows: [
            ['glycolyse', 'cytoplasme (hyaloplasme)', 'glucose → 2 acides pyruviques ; 2 ATP ; transporteurs réduits'],
            ['cycle de Krebs', 'matrice de la mitochondrie', 'le pyruvate est complètement oxydé en $\\ce{CO2}$ ; transporteurs réduits'],
            ['chaîne respiratoire', 'membrane interne (crêtes) de la mitochondrie', 'les transporteurs sont réoxydés ; $\\ce{O2}$ reçoit les électrons et forme $\\ce{H2O}$ ; la plupart des ATP sont produits'],
          ],
        },
        {
          kind: 'callout',
          variant: 'retenir',
          blocks: [
            {
              kind: 'text',
              text: 'Le dioxygène n’intervient qu’à la toute fin, comme **accepteur final d’électrons**. Sans lui, la chaîne respiratoire s’arrête, et avec elle le cycle de Krebs.',
            },
          ],
        },
        { kind: 'photo', id: 'mitochondrie-meb', caption: 'La mitochondrie, lieu de la respiration cellulaire.' },
      ],
    },
    {
      title: 'Les fermentations',
      blocks: [
        {
          kind: 'text',
          text: 'Sans dioxygène, la cellule ne fait que la **glycolyse** (2 ATP par glucose), puis transforme le pyruvate pour régénérer ses transporteurs.',
        },
        {
          kind: 'table',
          head: ['Fermentation', 'Qui la réalise', 'Produits'],
          rows: [
            ['alcoolique', 'levures (dolo, pain, vin de palme)', 'éthanol + $\\ce{CO2}$'],
            ['lactique', 'bactéries du lait caillé ; muscles en effort intense', 'acide lactique'],
          ],
        },
        {
          kind: 'formula',
          label: 'Rendement énergétique',
          tex: '\\eta = \\dfrac{\\text{énergie stockée dans l’ATP}}{\\text{énergie contenue dans le glucose}} \\qquad \\text{respiration} \\approx \\dfrac{36 \\times 30{,}5}{2\\,840} \\approx 39\\ \\% \\qquad \\text{fermentation} \\approx 2\\ \\%',
        },
        {
          kind: 'trap',
          wrong: '« La fermentation libère toute l’énergie du glucose. »',
          why: 'L’éthanol ou l’acide lactique contiennent encore beaucoup d’énergie : l’éthanol brûle très bien.',
          reflex: 'Fermentation = dégradation incomplète du glucose, faible rendement.',
        },
      ],
    },
  ],
  essentials: [
    'ATP → ADP + Pi libère l’énergie utilisée par la cellule ; il est sans cesse régénéré.',
    'Respiration : glycolyse (cytoplasme), Krebs (matrice), chaîne respiratoire (crêtes) ; environ 36 ATP par glucose.',
    'Fermentation (sans $\\ce{O2}$) : glycolyse seule, 2 ATP ; alcoolique (levures) ou lactique (muscle, lait caillé).',
    'Rendement : environ 39 % pour la respiration, 2 % pour la fermentation.',
  ],
  exercises: [
    {
      id: 'meta-rendement',
      level: 1,
      title: 'Comparer les rendements',
      statement: 'L’oxydation complète d’une mole de glucose libère 2 840 kJ. L’hydrolyse d’une mole d’ATP libère 30,5 kJ.',
      parts: [
        {
          label: 'Calcule le rendement de la respiration (36 ATP par glucose), en %.',
          answer: { kind: 'number', value: 38.7, tolerance: 0.5, unit: '%' },
          steps: ['$\\dfrac{36 \\times 30{,}5}{2\\,840} = \\dfrac{1\\,098}{2\\,840} \\approx 0{,}387$, soit 38,7 %.'],
        },
        {
          label: 'Calcule le rendement d’une fermentation (2 ATP par glucose), en %.',
          answer: { kind: 'number', value: 2.15, tolerance: 0.05, unit: '%' },
          steps: ['$\\dfrac{2 \\times 30{,}5}{2\\,840} \\approx 0{,}0215$, soit 2,1 %.'],
        },
        {
          label: 'Combien de fois plus d’ATP la respiration produit-elle ?',
          answer: { kind: 'number', value: 18, tolerance: 0, unit: '' },
          steps: ['$\\dfrac{36}{2} = 18$.'],
        },
      ],
    },
    {
      id: 'meta-lieux',
      level: 2,
      title: 'Où et quoi ?',
      statement: 'Réponds par un mot ou une courte expression.',
      parts: [
        {
          label: 'Dans quelle partie de la cellule se déroule la glycolyse ?',
          answer: { kind: 'text', display: 'cytoplasme (hyaloplasme)', accepted: ['cytoplasme', 'le cytoplasme', 'hyaloplasme', 'le hyaloplasme', 'cytosol'] },
          steps: ['La glycolyse a lieu dans le cytoplasme, hors des mitochondries ; elle existe aussi chez les cellules qui fermentent.'],
        },
        {
          label: 'Quel produit s’accumule dans un muscle qui travaille sans assez de dioxygène ?',
          answer: { kind: 'text', display: 'acide lactique', accepted: ['acide lactique', "l'acide lactique", 'lactate', 'le lactate'] },
          steps: ['Fermentation lactique : le pyruvate est réduit en acide lactique.'],
        },
        {
          label: 'Quelle molécule est l’accepteur final des électrons de la chaîne respiratoire ? (formule)',
          answer: { kind: 'text', display: 'O₂', accepted: ['O2', 'O₂', 'o2', 'dioxygène', 'dioxygene', 'oxygène', 'oxygene'] },
          steps: ['Le dioxygène est réduit en eau.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'La respiration cellulaire se termine dans :',
      choices: ['les mitochondries', 'les chloroplastes', 'le noyau', 'la vacuole'],
      answer: 0,
      explanation: 'Cycle de Krebs dans la matrice, chaîne respiratoire sur les crêtes.',
    },
    {
      question: 'La fermentation alcoolique produit :',
      choices: ['de l’éthanol et du $\\ce{CO2}$', 'de l’acide lactique', 'du $\\ce{O2}$', 'de l’eau et du $\\ce{CO2}$ seulement'],
      answer: 0,
      explanation: 'C’est la fermentation des levures.',
    },
    {
      question: 'Combien d’ATP la glycolyse fournit-elle par glucose ?',
      choices: ['2', '36', '0', '6'],
      answer: 0,
      explanation: 'C’est tout ce que gagne une cellule qui fermente.',
    },
    {
      question: 'L’ATP est :',
      choices: ['une molécule qui transfère l’énergie dans la cellule', 'un sucre de réserve', 'une enzyme', 'un acide nucléique de l’ADN'],
      answer: 0,
      explanation: 'Son hydrolyse en ADP libère l’énergie utilisée par la cellule.',
    },
  ],
  applications: [
    {
      title: 'Le lait caillé de la famille',
      tagline: 'Pourquoi le lait devient-il acide et épais ?',
      situation:
        'Pour préparer le lait caillé (fènè), on laisse du lait frais quelques heures avec un peu de lait caillé de la veille. Le lait devient acide et épais.',
      model: 'Les bactéries lactiques du lait de la veille font fermenter le sucre du lait (le lactose).',
      questions: ['Quel type de fermentation se produit ?', 'Pourquoi le lait devient-il acide ?'],
      solution: [
        'Une fermentation lactique.',
        'Les bactéries transforment le sucre en acide lactique : le pH baisse, les protéines du lait coagulent et le lait s’épaissit. L’acidité protège aussi le lait d’autres microbes.',
      ],
      fact: 'Après un sprint, l’acide lactique produit par les muscles est en grande partie recyclé par le foie en glucose.',
    },
  ],
};
