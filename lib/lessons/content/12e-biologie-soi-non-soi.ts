import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'À l’hôpital, avant une transfusion, on vérifie toujours le groupe sanguin du malade : une erreur peut le tuer en quelques minutes. Une greffe de rein entre deux frères est souvent rejetée, sauf entre vrais jumeaux. C’est que notre système immunitaire reconnaît ce qui nous appartient, le **soi**, et attaque ce qui nous est étranger, le **non-soi**.',
  objectives: [
    'définir le soi et le non-soi ;',
    'décrire les marqueurs du soi : système HLA et groupes sanguins ;',
    'prévoir la compatibilité d’une transfusion ;',
    'expliquer le rejet d’une greffe.',
  ],
  sections: [
    {
      title: 'Les marqueurs du soi',
      blocks: [
        {
          kind: 'definition',
          term: 'Soi',
          text: 'ensemble des molécules propres à un individu, déterminées par ses gènes, que son système immunitaire tolère. Tout ce qui est reconnu comme étranger est le **non-soi** ; une molécule qui déclenche une réaction immunitaire est un **antigène**.',
        },
        {
          kind: 'list',
          items: [
            '**le système HLA** (ou CMH) : protéines présentes à la surface de presque toutes nos cellules ; il en existe un très grand nombre de versions, si bien que deux personnes non apparentées ont presque toujours un HLA différent ;',
            '**les marqueurs des groupes sanguins** à la surface des globules rouges : système ABO et facteur Rhésus.',
          ],
        },
        {
          kind: 'text',
          text: 'Le **soi modifié** est aussi attaqué : cellules infectées par un virus ou cellules cancéreuses, dont les marqueurs ont changé.',
        },
      ],
    },
    {
      title: 'Les groupes sanguins',
      blocks: [
        {
          kind: 'table',
          head: ['Groupe', 'Marqueurs sur les globules rouges', 'Anticorps dans le plasma'],
          rows: [
            ['A', 'A', 'anti-B'],
            ['B', 'B', 'anti-A'],
            ['AB', 'A et B', 'aucun'],
            ['O', 'aucun', 'anti-A et anti-B'],
          ],
        },
        {
          kind: 'rule',
          text: 'Une transfusion est possible si les globules rouges du **donneur** ne portent aucun marqueur contre lequel le **receveur** possède des anticorps. Sinon, les globules sont agglutinés et détruits.',
        },
        {
          kind: 'list',
          items: [
            'le groupe **O** peut donner à tous : **donneur universel** ;',
            'le groupe **AB** peut recevoir de tous : **receveur universel** ;',
            'on tient compte aussi du Rhésus : une personne Rh⁻ ne doit recevoir que du sang Rh⁻.',
          ],
        },
        {
          kind: 'trap',
          wrong: '« Un receveur A peut recevoir du sang B, puisque le sang est le même liquide. »',
          why: 'Les anticorps anti-B du receveur agglutinent les globules rouges B du donneur.',
          reflex: 'Regarder les marqueurs du donneur et les anticorps du receveur.',
        },
      ],
    },
    {
      title: 'Les greffes',
      blocks: [
        {
          kind: 'text',
          text: 'Un organe greffé porte les marqueurs HLA du donneur. Si ceux-ci diffèrent de ceux du receveur, les lymphocytes du receveur l’attaquent : c’est le **rejet**. On cherche donc un donneur au HLA le plus proche possible (souvent dans la famille) et l’on donne des médicaments **immunosuppresseurs**.',
        },
        {
          kind: 'callout',
          variant: 'remarque',
          blocks: [
            {
              kind: 'text',
              text: 'Les vrais jumeaux, issus du même œuf, ont exactement le même HLA : une greffe entre eux n’est pas rejetée.',
            },
          ],
        },
      ],
    },
  ],
  essentials: [
    'Soi : molécules propres à l’individu, tolérées ; non-soi et soi modifié : reconnus comme étrangers.',
    'Marqueurs : HLA (toutes les cellules) ; ABO et Rhésus (globules rouges).',
    'Transfusion : pas de marqueur du donneur reconnu par les anticorps du receveur ; O donneur universel, AB receveur universel.',
    'Greffe : rejet si HLA différent ; compatibilité, immunosuppresseurs.',
  ],
  exercises: [
    {
      id: 'soi-transfusion',
      level: 1,
      title: 'Transfusions possibles',
      statement: 'Réponds par « oui » ou « non ».',
      parts: [
        {
          label: 'Une personne de groupe A peut-elle recevoir du sang O ?',
          answer: { kind: 'text', display: 'oui', accepted: ['oui'] },
          steps: ['Les globules O n’ont aucun marqueur A ou B : les anticorps anti-B du receveur ne les attaquent pas.'],
        },
        {
          label: 'Une personne de groupe O peut-elle recevoir du sang A ?',
          answer: { kind: 'text', display: 'non', accepted: ['non'] },
          steps: ['Le receveur O possède des anticorps anti-A : ils agglutineraient les globules A.'],
        },
        {
          label: 'Une personne AB peut-elle recevoir du sang B ?',
          answer: { kind: 'text', display: 'oui', accepted: ['oui'] },
          steps: ['Un receveur AB n’a ni anti-A ni anti-B.'],
        },
      ],
    },
    {
      id: 'soi-genetique',
      level: 2,
      title: 'La transmission des groupes',
      statement: 'Les allèles A et B sont codominants, O est récessif. Un père de génotype AO a des enfants avec une mère BO.',
      parts: [
        {
          label: 'Probabilité qu’un enfant soit de groupe O.',
          answer: { kind: 'number', value: 0.25, tolerance: 0.001, unit: '' },
          steps: ['Il faut O du père (1/2) et O de la mère (1/2) : 1/4.'],
        },
        {
          label: 'Probabilité qu’un enfant soit de groupe AB.',
          answer: { kind: 'number', value: 0.25, tolerance: 0.001, unit: '' },
          steps: ['A du père (1/2) et B de la mère (1/2) : 1/4. Les quatre groupes sont possibles, chacun à 1/4.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Le donneur universel est de groupe :',
      choices: ['O', 'AB', 'A', 'B'],
      answer: 0,
      explanation: 'Ses globules ne portent ni A ni B.',
    },
    {
      question: 'Le plasma d’une personne de groupe B contient :',
      choices: ['des anticorps anti-A', 'des anticorps anti-B', 'les deux', 'aucun'],
      answer: 0,
      explanation: 'On n’a jamais d’anticorps contre ses propres marqueurs.',
    },
    {
      question: 'Le rejet d’une greffe est dû surtout :',
      choices: ['à des marqueurs HLA différents', 'au groupe Rhésus', 'à une bactérie', 'au manque de sang'],
      answer: 0,
      explanation: 'Les lymphocytes reconnaissent le HLA du donneur comme du non-soi.',
    },
    {
      question: 'Une cellule infectée par un virus est :',
      choices: ['du soi modifié', 'du soi normal', 'une cellule du donneur', 'un anticorps'],
      answer: 0,
      explanation: 'Elle présente des fragments viraux avec ses molécules HLA.',
    },
  ],
  applications: [
    {
      title: 'La banque de sang de l’hôpital',
      tagline: 'Pourquoi a-t-on toujours besoin de donneurs de groupe O ?',
      situation:
        'Un blessé arrive en urgence à l’hôpital ; on n’a pas le temps de déterminer son groupe sanguin. Le médecin demande des poches de sang O négatif.',
      model: 'On ne transfuse que des globules rouges, débarrassés de l’essentiel du plasma.',
      questions: ['Pourquoi choisir du O négatif ?', 'Pourquoi les donneurs O sont-ils toujours très demandés ?'],
      solution: [
        'Ses globules ne portent ni A, ni B, ni le facteur Rhésus : aucun anticorps du receveur ne peut les agglutiner.',
        'Ce sang peut servir à tous les malades en urgence, et les donneurs O ne peuvent recevoir que du sang O : la réserve s’épuise vite.',
      ],
      fact: 'Au Mali, le Centre national de transfusion sanguine organise régulièrement des collectes dans les lycées et les universités.',
    },
  ],
};
