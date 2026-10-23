import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Au bord du fleuve Niger, un pêcheur vise un poisson avec sa lance : s’il vise là où il le voit, il le manque. La lumière change de direction en passant de l’eau à l’air. Ce même phénomène, la **réfraction**, permet aux lentilles de lunettes, d’appareils photo et de microscopes de former des images.',
  objectives: [
    'appliquer les lois de la réflexion (miroir plan) ;',
    'appliquer la loi de la réfraction et prévoir une réflexion totale ;',
    'caractériser une lentille mince par sa distance focale et sa vergence ;',
    'construire et calculer l’image d’un objet par une lentille convergente.',
  ],
  sections: [
    {
      title: 'Réflexion et réfraction',
      blocks: [
        {
          kind: 'rule',
          text: '**Réflexion** : le rayon réfléchi est dans le plan d’incidence et l’angle de réflexion est égal à l’angle d’incidence. Un miroir plan donne d’un objet une image virtuelle, symétrique par rapport au miroir.',
        },
        {
          kind: 'formula',
          label: 'Réfraction (loi de Snell-Descartes)',
          tex: 'n_1 \\sin i_1 = n_2 \\sin i_2',
          legend: ['$n$ : indice de réfraction du milieu (air ≈ 1,00 ; eau ≈ 1,33 ; verre ≈ 1,5) ; angles mesurés par rapport à la normale'],
        },
        {
          kind: 'rule',
          text: 'En passant dans un milieu **moins** réfringent ($n_2 < n_1$, par exemple de l’eau vers l’air), le rayon s’écarte de la normale. Au-delà de l’angle limite $\\lambda$ tel que $\\sin\\lambda = \\dfrac{n_2}{n_1}$, toute la lumière est réfléchie : c’est la **réflexion totale**, utilisée dans les fibres optiques.',
        },
      ],
    },
    {
      title: 'Les lentilles minces',
      blocks: [
        {
          kind: 'list',
          items: [
            'une lentille **convergente** (bords minces) fait converger un faisceau parallèle en son foyer image $F\'$ ; une lentille **divergente** (bords épais) le fait diverger ;',
            'distance focale $f\' = \\overline{OF\'}$ ($> 0$ pour une convergente) ; **vergence** $C = \\dfrac{1}{f\'}$ en dioptries (δ), $f\'$ en mètres ;',
            'trois rayons utiles : celui qui passe par $O$ n’est pas dévié ; celui parallèle à l’axe ressort par $F\'$ ; celui qui passe par $F$ ressort parallèle à l’axe.',
          ],
        },
        {
          kind: 'formula',
          label: 'Relation de conjugaison et grandissement',
          tex: '\\dfrac{1}{\\overline{OA\'}} - \\dfrac{1}{\\overline{OA}} = \\dfrac{1}{f\'} \\qquad \\gamma = \\dfrac{\\overline{A\'B\'}}{\\overline{AB}} = \\dfrac{\\overline{OA\'}}{\\overline{OA}}',
          legend: ['mesures algébriques : positives dans le sens de la lumière ; un objet réel a $\\overline{OA} < 0$'],
        },
        {
          kind: 'example',
          title: 'une image sur un écran',
          text: 'Lentille de $f\' = 10$ cm, objet à 30 cm avant la lentille : $\\overline{OA} = -30$ cm.',
          steps: ['$\\dfrac{1}{\\overline{OA\'}} = \\dfrac{1}{10} - \\dfrac{1}{30} = \\dfrac{2}{30}$, donc $\\overline{OA\'} = 15$ cm.', '$\\gamma = \\dfrac{15}{-30} = -0{,}5$ : image réelle, renversée, deux fois plus petite.'],
        },
        {
          kind: 'trap',
          wrong: '« $\\overline{OA} = 30$ cm pour un objet placé à 30 cm devant la lentille. »',
          why: 'L’objet est avant la lentille, contre le sens de la lumière : la mesure algébrique est négative.',
          reflex: 'Objet réel : $\\overline{OA} < 0$ ; image réelle : $\\overline{OA\'} > 0$.',
        },
      ],
    },
  ],
  essentials: [
    'Réflexion : angle réfléchi = angle d’incidence ; miroir plan : image symétrique.',
    'Réfraction : $n_1\\sin i_1 = n_2\\sin i_2$ ; réflexion totale au-delà de $\\sin\\lambda = \\frac{n_2}{n_1}$.',
    'Vergence $C = \\frac{1}{f\'}$ en dioptries.',
    '$\\frac{1}{\\overline{OA\'}} - \\frac{1}{\\overline{OA}} = \\frac{1}{f\'}$ ; $\\gamma = \\frac{\\overline{OA\'}}{\\overline{OA}}$.',
  ],
  exercises: [
    {
      id: 'opt-refraction',
      level: 1,
      title: 'De l’air à l’eau',
      statement: 'Un rayon passe de l’air ($n = 1{,}00$) dans l’eau ($n = 1{,}33$) avec un angle d’incidence de 45°.',
      parts: [
        {
          label: 'Angle de réfraction (en degrés).',
          answer: { kind: 'number', value: 32.1, tolerance: 0.3, unit: '°' },
          steps: ['$\\sin r = \\dfrac{\\sin 45°}{1{,}33} \\approx 0{,}532$, donc $r \\approx 32{,}1°$.'],
        },
        {
          label: 'Angle limite pour un rayon passant de l’eau vers l’air (en degrés).',
          answer: { kind: 'number', value: 48.8, tolerance: 0.3, unit: '°' },
          steps: ['$\\sin\\lambda = \\dfrac{1}{1{,}33} \\approx 0{,}752$, donc $\\lambda \\approx 48{,}8°$.'],
        },
      ],
    },
    {
      id: 'opt-lentille',
      level: 2,
      title: 'Image par une lentille convergente',
      statement: 'Un objet est placé à 30 cm avant une lentille convergente de distance focale 10 cm.',
      parts: [
        {
          label: 'Position de l’image $\\overline{OA\'}$ (en cm).',
          answer: { kind: 'number', value: 15, tolerance: 0.05, unit: 'cm' },
          steps: ['$\\dfrac{1}{\\overline{OA\'}} = \\dfrac{1}{10} + \\dfrac{1}{-30}$, soit $\\overline{OA\'} = 15$ cm.'],
        },
        {
          label: 'Grandissement.',
          answer: { kind: 'number', value: -0.5, tolerance: 0.005, unit: '' },
          steps: ['$\\gamma = \\dfrac{15}{-30} = -0{,}5$.'],
        },
        {
          label: 'Vergence de la lentille (en dioptries).',
          answer: { kind: 'number', value: 10, tolerance: 0.01, unit: 'δ' },
          steps: ['$C = \\dfrac{1}{0{,}10} = 10$ δ.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'En passant de l’eau à l’air, un rayon lumineux :',
      choices: ['s’écarte de la normale', 'se rapproche de la normale', 'n’est jamais dévié', 'est toujours réfléchi'],
      answer: 0,
      explanation: 'L’air est moins réfringent que l’eau.',
    },
    {
      question: 'Une lentille de vergence +4 δ a une distance focale de :',
      choices: ['25 cm', '4 cm', '4 m', '0,25 cm'],
      answer: 0,
      explanation: '$f\' = \\frac{1}{4} = 0{,}25$ m.',
    },
    {
      question: 'Le rayon qui passe par le centre optique d’une lentille :',
      choices: ['n’est pas dévié', 'passe par le foyer image', 'ressort parallèle à l’axe', 'est réfléchi'],
      answer: 0,
      explanation: 'C’est l’un des trois rayons de construction.',
    },
    {
      question: 'Les fibres optiques transportent la lumière grâce à :',
      choices: ['la réflexion totale', 'la diffraction', 'des miroirs plans', 'l’absorption'],
      answer: 0,
      explanation: 'La lumière rebondit sur la paroi interne sans en sortir.',
    },
  ],
  applications: [
    {
      title: 'Les lunettes de grand-père',
      tagline: 'Que signifie « + 2,5 » sur l’ordonnance ?',
      situation:
        'L’ophtalmologiste prescrit à grand-père, presbyte, des verres de lecture de vergence +2,5 δ.',
      model: 'Le verre est assimilé à une lentille mince convergente.',
      questions: ['Quelle est la distance focale de ces verres, en cm ?'],
      check: { value: 40, tolerance: 0.01, unit: 'cm' },
      solution: ['$f\' = \\dfrac{1}{2{,}5} = 0{,}40$ m, soit 40 cm.', 'Le signe + indique des verres convergents, qui aident l’œil fatigué à voir de près.'],
      fact: 'Le pêcheur qui vise un poisson doit viser plus bas que l’image qu’il voit : la réfraction fait paraître le poisson moins profond qu’il n’est.',
    },
  ],
};
