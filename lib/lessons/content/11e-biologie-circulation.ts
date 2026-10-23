import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Une goutte de sang contient des millions de globules rouges, des milliers de globules blancs et des centaines de milliers de plaquettes. Poussé par le cœur, le sang fait le tour du corps en une minute environ. Il apporte à chaque cellule ce dont elle a besoin et emporte ses déchets, en baignant les cellules dans un **milieu intérieur** remarquablement constant.',
  objectives: [
    'décrire la composition du sang et le rôle de chacun de ses éléments ;',
    'décrire la double circulation et les vaisseaux sanguins ;',
    'définir le milieu intérieur (plasma, lymphe, liquide interstitiel) ;',
    'expliquer les échanges au niveau des capillaires.',
  ],
  sections: [
    {
      title: 'Le sang',
      blocks: [
        {
          kind: 'table',
          head: ['Constituant', 'Quantité', 'Rôle'],
          rows: [
            ['plasma (eau, sels, nutriments, protéines, déchets)', 'environ 55 % du volume', 'transport'],
            ['globules rouges (hématies)', 'environ 5 millions/mm³', 'transport du dioxygène (hémoglobine)'],
            ['globules blancs (leucocytes)', '4 000 à 10 000/mm³', 'défense de l’organisme'],
            ['plaquettes', '150 000 à 400 000/mm³', 'coagulation'],
          ],
        },
        {
          kind: 'text',
          text: 'Un adulte possède environ 5 litres de sang. L’**anémie** (manque d’hémoglobine) est fréquente au Mali : paludisme, carences en fer, drépanocytose ; elle se traduit par une grande fatigue et une pâleur.',
        },
        { kind: 'photo', id: 'sang-meb', caption: 'Les globules rouges, en forme de disque creusé, transportent le dioxygène.' },
      ],
    },
    {
      title: 'La double circulation',
      blocks: [
        { kind: 'figure', id: 'coeur', caption: "Circulation pulmonaire (cœur droit) et générale (cœur gauche)." },
        {
          kind: 'list',
          items: [
            '**circulation pulmonaire** : le ventricule droit envoie le sang pauvre en dioxygène aux poumons, d’où il revient riche en dioxygène dans l’oreillette gauche ;',
            '**circulation générale** : le ventricule gauche envoie le sang riche en dioxygène par l’aorte à tous les organes, d’où il revient par les veines caves à l’oreillette droite.',
          ],
        },
        {
          kind: 'table',
          head: ['Vaisseau', 'Rôle', 'Paroi'],
          rows: [
            ['artère', 'part du cœur', 'épaisse et élastique'],
            ['veine', 'revient au cœur', 'plus mince, avec des valvules'],
            ['capillaire', 'relie artères et veines dans les organes', 'une seule couche de cellules : lieu des échanges'],
          ],
        },
        {
          kind: 'trap',
          wrong: '« Les artères transportent toujours du sang riche en dioxygène. »',
          why: 'L’artère pulmonaire transporte du sang pauvre en dioxygène vers les poumons.',
          reflex: 'Artère = part du cœur ; veine = revient au cœur, quel que soit le sang.',
        },
        { kind: 'photo', id: 'coeur-anatomie' },
      ],
    },
    {
      title: 'Le milieu intérieur',
      blocks: [
        {
          kind: 'text',
          text: 'Les cellules baignent dans le **liquide interstitiel**, qui provient du plasma sorti des capillaires. Une partie retourne au sang, l’autre est drainée par les vaisseaux lymphatiques : c’est la **lymphe**. Plasma, liquide interstitiel et lymphe forment le **milieu intérieur**.',
        },
        {
          kind: 'rule',
          text: 'La composition du milieu intérieur (glucose, sels, température, pH…) est maintenue presque constante par des régulations : c’est l’**homéostasie**.',
        },
      ],
    },
  ],
  essentials: [
    'Sang : plasma (55 %), globules rouges ($\\ce{O2}$), globules blancs (défense), plaquettes (coagulation).',
    'Double circulation : pulmonaire (cœur droit) et générale (cœur gauche).',
    'Artères, veines, capillaires (lieu des échanges).',
    'Milieu intérieur : plasma, liquide interstitiel, lymphe ; homéostasie.',
  ],
  exercises: [
    {
      id: 'circ-globules',
      level: 1,
      title: 'Compter les globules rouges',
      statement: 'Un adulte a 5,0 L de sang (5,0 × 10⁶ mm³) et 5,0 millions de globules rouges par mm³.',
      parts: [
        {
          label: 'Nombre total de globules rouges (notation 2.5e13 acceptée).',
          answer: { kind: 'number', value: 2.5e13, tolerance: 0.05e13, unit: '' },
          steps: ['$5{,}0 \\times 10^6 \\times 5{,}0 \\times 10^6 = 2{,}5 \\times 10^{13}$ globules rouges.'],
        },
        {
          label: 'Un don de sang prélève 450 mL. Quel pourcentage du sang est-ce ?',
          answer: { kind: 'number', value: 9, tolerance: 0.05, unit: '%' },
          steps: ['$\\dfrac{0{,}45}{5{,}0} = 9$ % : l’organisme le remplace en quelques semaines.'],
        },
      ],
    },
    {
      id: 'circ-trajet',
      level: 2,
      title: 'Le trajet du sang',
      statement: 'Réponds par un mot.',
      parts: [
        {
          label: 'Quel ventricule envoie le sang vers les poumons ? (« droit » ou « gauche »)',
          answer: { kind: 'text', display: 'droit', accepted: ['droit', 'le droit', 'ventricule droit'] },
          steps: ['Le ventricule droit, par l’artère pulmonaire.'],
        },
        {
          label: 'Dans quels vaisseaux ont lieu les échanges avec les cellules ?',
          answer: { kind: 'text', display: 'capillaires', accepted: ['capillaires', 'les capillaires', 'capillaire', 'capillaires sanguins'] },
          steps: ['Leur paroi très fine permet les échanges.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Les plaquettes servent à :',
      choices: ['la coagulation', 'transporter le dioxygène', 'défendre contre les microbes', 'digérer'],
      answer: 0,
      explanation: 'Elles arrêtent les saignements.',
    },
    {
      question: 'L’aorte part :',
      choices: ['du ventricule gauche', 'du ventricule droit', 'de l’oreillette droite', 'des poumons'],
      answer: 0,
      explanation: 'C’est le départ de la circulation générale.',
    },
    {
      question: 'La lymphe provient :',
      choices: ['du liquide interstitiel', 'des globules rouges', 'de l’estomac', 'des poumons'],
      answer: 0,
      explanation: 'Elle est drainée par les vaisseaux lymphatiques.',
    },
    {
      question: 'L’homéostasie désigne :',
      choices: ['le maintien constant du milieu intérieur', 'la coagulation', 'la double circulation', 'la respiration'],
      answer: 0,
      explanation: 'Par des régulations (glycémie, température…).',
    },
  ],
  applications: [
    {
      title: 'Donner son sang',
      tagline: 'Un geste qui sauve, sans danger pour le donneur',
      situation:
        'Au Mali, de nombreux enfants atteints de paludisme grave et des femmes qui saignent à l’accouchement ont besoin d’une transfusion. Un adulte en bonne santé peut donner 450 mL de sang.',
      model: 'Volume sanguin de 5 L ; le plasma est renouvelé en quelques jours, les globules rouges en quelques semaines.',
      questions: ['Quel pourcentage de son sang un donneur donne-t-il ?', 'Pourquoi ne peut-on pas donner tous les mois ?'],
      check: { value: 9, tolerance: 0.02, unit: '%' },
      solution: ['$\\dfrac{450}{5\\,000} = 9$ %.', 'Il faut laisser le temps à la moelle osseuse de refabriquer les globules rouges et les réserves de fer : on espace les dons de deux à trois mois.'],
    },
  ],
};
