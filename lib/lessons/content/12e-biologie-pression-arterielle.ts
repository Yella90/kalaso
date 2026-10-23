import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Au centre de santé, l’infirmier serre un brassard autour du bras de grand-mère et annonce « 16/10 » : c’est trop. L’hypertension artérielle touche une grande partie des adultes au Mali, souvent sans aucun signe, jusqu’à l’accident vasculaire cérébral. Pour la comprendre, il faut savoir comment le **cœur** pompe le sang et comment le corps **règle** la pression dans les artères.',
  objectives: [
    'décrire l’automatisme cardiaque et la révolution cardiaque ;',
    'calculer un débit cardiaque ;',
    'expliquer la régulation réflexe de la pression artérielle ;',
    'citer les facteurs de risque de l’hypertension.',
  ],
  sections: [
    {
      title: 'Le cœur, une pompe automatique',
      blocks: [
        { kind: 'figure', id: 'coeur', caption: "La double circulation." },
        {
          kind: 'text',
          text: 'Un cœur isolé, sorti du corps et alimenté, continue de battre : il est **automatique**. Le rythme est donné par le **nœud sinusal**, un groupe de cellules de l’oreillette droite qui émet spontanément des impulsions électriques, transmises à tout le cœur par le tissu nodal.',
        },
        {
          kind: 'list',
          items: [
            '**systole auriculaire** : les oreillettes se contractent et remplissent les ventricules ;',
            '**systole ventriculaire** : les ventricules se contractent et chassent le sang dans les artères ;',
            '**diastole** : le cœur se relâche et se remplit.',
          ],
        },
        {
          kind: 'formula',
          label: 'Débit cardiaque',
          tex: 'Q = f_c \\times V_{ES}',
          legend: ['$f_c$ : fréquence cardiaque (battements/min) ; $V_{ES}$ : volume d’éjection systolique (mL)', 'au repos : $70 \\times 70 \\approx 4{,}9$ L/min'],
        },
      ],
    },
    {
      title: 'La pression artérielle',
      blocks: [
        {
          kind: 'definition',
          term: 'Pression artérielle',
          text: 'pression exercée par le sang sur la paroi des artères. On donne deux valeurs : la **systolique** (maximale, pendant la contraction) et la **diastolique** (minimale). Exemple normal : 120/80 mmHg, souvent dit « 12/8 ».',
        },
        {
          kind: 'rule',
          text: 'La pression dépend du **débit cardiaque** et de la **résistance** des petites artères : elle augmente si le cœur bat plus vite ou plus fort, ou si les artères se resserrent (vasoconstriction).',
        },
      ],
    },
    {
      title: 'La régulation réflexe',
      blocks: [
        {
          kind: 'list',
          items: [
            '**capteurs** : les barorécepteurs de la crosse aortique et des sinus carotidiens mesurent la pression ;',
            '**centre** : le bulbe rachidien, informé par les nerfs sensitifs (nerfs de Hering et de Cyon) ;',
            '**effecteurs** : le cœur et les artères, commandés par le système nerveux autonome.',
          ],
        },
        {
          kind: 'table',
          head: ['Si la pression…', 'Réponse', 'Résultat'],
          rows: [
            ['augmente', 'le **nerf vague** (parasympathique) est stimulé ; les nerfs sympathiques sont freinés', 'le cœur ralentit, les artères se dilatent : la pression baisse'],
            ['baisse', 'les nerfs **sympathiques** (et l’adrénaline) sont stimulés', 'le cœur accélère, les artères se resserrent : la pression remonte'],
          ],
        },
        {
          kind: 'callout',
          variant: 'attention',
          title: 'L’hypertension',
          blocks: [
            {
              kind: 'text',
              text: 'On parle d’hypertension au-delà de 140/90 mmHg (14/9) mesurée à plusieurs reprises. Facteurs de risque : excès de sel (bouillons cubes, aliments salés), surpoids, sédentarité, tabac, alcool, stress, hérédité. Elle ne fait pas mal mais fatigue le cœur et abîme les artères : AVC, infarctus, maladie des reins.',
            },
          ],
        },
        {
          kind: 'trap',
          wrong: '« Je n’ai pas mal à la tête, donc ma tension est normale. »',
          why: 'L’hypertension est le plus souvent silencieuse pendant des années.',
          reflex: 'Seule la mesure permet de savoir : la faire contrôler régulièrement après 40 ans.',
        },
      ],
    },
  ],
  essentials: [
    'Automatisme : le nœud sinusal donne le rythme ; systoles puis diastole.',
    '$Q = f_c \\times V_{ES}$ (≈ 5 L/min au repos).',
    'Pression : systolique/diastolique (normale ≈ 120/80 mmHg) ; dépend du débit et de la résistance des artères.',
    'Réflexe : barorécepteurs → bulbe → nerf vague (ralentit) ou sympathique (accélère, resserre).',
  ],
  exercises: [
    {
      id: 'pa-debit',
      level: 1,
      title: 'Le débit cardiaque',
      statement: 'Au repos, la fréquence cardiaque d’un élève est 70 battements/min et son volume d’éjection systolique 70 mL. Pendant une course, ces valeurs passent à 150 battements/min et 120 mL.',
      parts: [
        {
          label: 'Débit cardiaque au repos (en L/min).',
          answer: { kind: 'number', value: 4.9, tolerance: 0.05, unit: 'L/min' },
          steps: ['$70 \\times 70 = 4\\,900$ mL/min $= 4{,}9$ L/min.'],
        },
        {
          label: 'Débit cardiaque pendant la course (en L/min).',
          answer: { kind: 'number', value: 18, tolerance: 0.1, unit: 'L/min' },
          steps: ['$150 \\times 120 = 18\\,000$ mL/min $= 18$ L/min.'],
        },
        {
          label: 'Par combien le débit est-il multiplié (valeur approchée) ?',
          answer: { kind: 'number', value: 3.67, tolerance: 0.05, unit: '' },
          steps: ['$\\dfrac{18}{4{,}9} \\approx 3{,}7$.'],
        },
      ],
    },
    {
      id: 'pa-regulation',
      level: 2,
      title: 'Le réflexe',
      statement: 'Réponds par un mot ou une courte expression.',
      parts: [
        {
          label: 'Nom du nerf parasympathique qui ralentit le cœur.',
          answer: { kind: 'text', display: 'nerf vague (pneumogastrique)', accepted: ['nerf vague', 'vague', 'le nerf vague', 'pneumogastrique', 'nerf pneumogastrique'] },
          steps: ['Sa stimulation diminue la fréquence cardiaque.'],
        },
        {
          label: 'Une tension de 160/100 mmHg est-elle trop élevée ? (« oui » ou « non »)',
          answer: { kind: 'text', display: 'oui', accepted: ['oui'] },
          steps: ['Elle dépasse 140/90 mmHg : hypertension, à confirmer par d’autres mesures.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Le rythme cardiaque est donné par :',
      choices: ['le nœud sinusal', 'le cerveau', 'les poumons', 'le nerf vague seul'],
      answer: 0,
      explanation: 'Le cœur est automatique ; les nerfs ne font que modifier ce rythme.',
    },
    {
      question: 'Quand la pression artérielle monte, le réflexe :',
      choices: ['ralentit le cœur et dilate les artères', 'accélère le cœur', 'resserre les artères', 'arrête la respiration'],
      answer: 0,
      explanation: 'C’est un rétrocontrôle négatif.',
    },
    {
      question: 'Les barorécepteurs se trouvent :',
      choices: ['dans la crosse aortique et les sinus carotidiens', 'dans le foie', 'dans les doigts', 'dans l’estomac'],
      answer: 0,
      explanation: 'Ils mesurent l’étirement de la paroi de ces artères.',
    },
    {
      question: 'Lequel de ces facteurs augmente le risque d’hypertension ?',
      choices: ['un excès de sel', 'la marche quotidienne', 'les fruits et légumes', 'un poids normal'],
      answer: 0,
      explanation: 'Le sel fait retenir de l’eau et augmente le volume sanguin.',
    },
  ],
  applications: [
    {
      title: 'Un cœur qui ne s’arrête jamais',
      tagline: 'Combien de battements par jour ?',
      situation:
        'Le cœur de Fatoumata bat en moyenne 70 fois par minute, jour et nuit. Chaque battement éjecte environ 70 mL de sang.',
      model: 'On suppose la fréquence constante sur 24 heures.',
      questions: ['Combien de fois son cœur bat-il en une journée ?', 'Quel volume de sang pompe-t-il par jour ?'],
      check: { value: 100800, tolerance: 0.01, unit: 'battements' },
      solution: ['$70 \\times 60 \\times 24 = 100\\,800$ battements.', '$100\\,800 \\times 0{,}070 \\approx 7\\,000$ L par jour : de quoi remplir plus de 30 fûts de 200 L.'],
      fact: 'Réduire le sel et marcher régulièrement fait baisser la tension de plusieurs points, autant qu’un médicament chez certaines personnes.',
    },
  ],
};
