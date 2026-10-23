import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Tu touches une marmite brûlante : ta main se retire avant même que tu aies senti la douleur. Un motocycliste blessé au dos ne peut plus bouger ses jambes. Ces deux faits s’expliquent par l’organisation du **système nerveux** : des centres (encéphale et moelle épinière) reliés à tout le corps par des nerfs, eux-mêmes faits de **neurones**.',
  objectives: [
    'décrire l’organisation du système nerveux central et périphérique ;',
    'décrire la structure d’un neurone et d’un nerf ;',
    'interpréter les expériences de section des racines rachidiennes ;',
    'décrire un arc réflexe.',
  ],
  sections: [
    {
      title: 'Système nerveux central et périphérique',
      blocks: [
        {
          kind: 'list',
          items: [
            '**système nerveux central** : l’encéphale (cerveau, cervelet, tronc cérébral), protégé par le crâne, et la moelle épinière, dans la colonne vertébrale ; tous deux sont entourés de méninges ;',
            '**système nerveux périphérique** : les nerfs crâniens (12 paires) et les nerfs rachidiens (31 paires), qui relient les centres aux organes.',
          ],
        },
        {
          kind: 'text',
          text: 'En coupe, la moelle épinière montre au centre une **substance grise** en forme de papillon (corps cellulaires des neurones) et autour une **substance blanche** (fibres nerveuses entourées de myéline).',
        },
      ],
    },
    {
      title: 'Le neurone et le nerf',
      blocks: [
        { kind: 'figure', id: 'neurone', caption: "Un neurone moteur." },
        {
          kind: 'definition',
          term: 'Neurone',
          text: 'cellule nerveuse formée d’un **corps cellulaire** (avec le noyau), de **dendrites** courtes qui reçoivent les messages et d’un **axone** qui les conduit, souvent entouré d’une **gaine de myéline** interrompue par les nœuds de Ranvier.',
        },
        {
          kind: 'text',
          text: 'Un **nerf** est un faisceau de fibres nerveuses (axones) entouré de tissu conjonctif. Un nerf rachidien est **mixte** : il contient des fibres sensitives et des fibres motrices.',
        },
        {
          kind: 'table',
          head: ['Expérience sur un nerf rachidien', 'Résultat', 'Conclusion'],
          rows: [
            ['section de la racine **dorsale**', 'perte de la sensibilité, la motricité est conservée', 'la racine dorsale est **sensitive** (son ganglion contient les corps des neurones sensitifs)'],
            ['section de la racine **ventrale**', 'paralysie, la sensibilité est conservée', 'la racine ventrale est **motrice**'],
          ],
        },
        { kind: 'photo', id: 'neurone-culture', caption: 'Un neurone et ses nombreux prolongements, rendus visibles par fluorescence.' },
      ],
    },
    {
      title: 'L’arc réflexe',
      blocks: [
        { kind: 'figure', id: 'arc-reflexe', caption: "L’arc réflexe : de la peau au muscle, en passant par la moelle épinière." },
        {
          kind: 'definition',
          term: 'Réflexe',
          text: 'réponse automatique, rapide et involontaire à une stimulation.',
        },
        {
          kind: 'formula',
          tex: '\\text{récepteur} \\rightarrow \\text{neurone sensitif} \\rightarrow \\text{centre (moelle)} \\rightarrow \\text{neurone moteur} \\rightarrow \\text{effecteur (muscle)}',
        },
        {
          kind: 'example',
          title: 'le réflexe rotulien',
          text: 'Le médecin frappe le tendon sous la rotule : la jambe se tend.',
          steps: ['L’étirement du muscle de la cuisse stimule ses récepteurs.', 'Le neurone sensitif fait directement synapse avec le neurone moteur dans la moelle (réflexe **monosynaptique**) : le muscle se contracte.'],
        },
        {
          kind: 'trap',
          wrong: '« Les réflexes sont commandés par le cerveau. »',
          why: 'Le centre de la plupart des réflexes du corps est la moelle épinière ; le cerveau n’est informé qu’après.',
          reflex: 'Réflexe médullaire : moelle ; mouvement volontaire : cortex cérébral.',
        },
      ],
    },
  ],
  essentials: [
    'SNC : encéphale et moelle épinière ; SNP : nerfs crâniens et rachidiens.',
    'Moelle : substance grise (corps cellulaires) au centre, blanche (fibres) autour.',
    'Neurone : corps cellulaire, dendrites, axone (myéline) ; nerf rachidien mixte.',
    'Racine dorsale sensitive, ventrale motrice ; arc réflexe : récepteur, neurone sensitif, centre, neurone moteur, effecteur.',
  ],
  exercises: [
    {
      id: 'sn-racines',
      level: 1,
      title: 'Sections de racines',
      statement: 'Réponds « sensitive » ou « motrice ».',
      parts: [
        {
          label: 'Après section d’une racine, l’animal ne sent plus sa patte mais la bouge. La racine coupée était :',
          answer: { kind: 'text', display: 'sensitive (dorsale)', accepted: ['sensitive', 'racine sensitive', 'dorsale', 'la racine dorsale'] },
          steps: ['La sensibilité est perdue : la racine dorsale, sensitive, a été coupée.'],
        },
        {
          label: 'Après section d’une autre racine, la patte est paralysée mais sensible. La racine coupée était :',
          answer: { kind: 'text', display: 'motrice (ventrale)', accepted: ['motrice', 'racine motrice', 'ventrale', 'la racine ventrale'] },
          steps: ['La motricité est perdue : racine ventrale, motrice.'],
        },
        {
          label: 'Combien de paires de nerfs rachidiens possède l’homme ?',
          answer: { kind: 'number', value: 31, tolerance: 0, unit: '' },
          steps: ['31 paires, une à chaque niveau de la moelle.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'La substance grise de la moelle contient surtout :',
      choices: ['des corps cellulaires de neurones', 'des fibres myélinisées', 'des os', 'du sang'],
      answer: 0,
      explanation: 'La substance blanche contient les fibres entourées de myéline.',
    },
    {
      question: 'Le centre du réflexe rotulien est :',
      choices: ['la moelle épinière', 'le cerveau', 'le cervelet', 'le genou'],
      answer: 0,
      explanation: 'C’est un réflexe médullaire monosynaptique.',
    },
    {
      question: 'Un nerf rachidien est :',
      choices: ['mixte', 'uniquement sensitif', 'uniquement moteur', 'un organe central'],
      answer: 0,
      explanation: 'Il réunit les fibres des racines dorsale et ventrale.',
    },
    {
      question: 'Les messages nerveux arrivent au corps cellulaire par :',
      choices: ['les dendrites', 'l’axone', 'la myéline', 'le nœud de Ranvier'],
      answer: 0,
      explanation: 'L’axone conduit ensuite le message vers d’autres cellules.',
    },
  ],
  applications: [
    {
      title: 'L’accident de moto',
      tagline: 'Pourquoi une blessure du dos paralyse-t-elle les jambes ?',
      situation:
        'Après un accident de moto, un jeune homme a la moelle épinière sectionnée au milieu du dos. Ses jambes sont paralysées et insensibles, mais ses bras fonctionnent normalement.',
      model: 'La moelle relie le cerveau aux nerfs rachidiens : au-dessous de la lésion, les messages ne passent plus.',
      questions: ['Pourquoi ne sent-il plus ses jambes ?', 'Un réflexe rotulien est-il encore possible ?'],
      solution: [
        'Les messages sensitifs des jambes ne peuvent plus monter jusqu’au cerveau, et les ordres volontaires ne descendent plus.',
        'Oui : son centre est dans la moelle, au-dessous de la lésion, et l’arc réflexe est intact. On l’observe même souvent exagéré.',
      ],
      fact: 'Le port du casque et de la ceinture de sécurité évite une grande partie des lésions graves de la colonne et du crâne.',
    },
  ],
};
