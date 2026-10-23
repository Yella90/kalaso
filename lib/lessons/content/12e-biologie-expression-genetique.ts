import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Dans la drépanocytose, fréquente au Mali, une seule lettre change dans un gène : au lieu de GAG, on lit GTG. Résultat : une hémoglobine anormale, des globules rouges en forme de faucille, des crises douloureuses. Comment une « lettre » de l’ADN peut-elle avoir un tel effet ? Pour le comprendre, il faut suivre le chemin de l’information, du **gène** à la **protéine**.',
  objectives: [
    'décrire la transcription d’un gène en ARN messager ;',
    'utiliser le code génétique pour traduire un ARNm en protéine ;',
    'expliquer le rôle des ribosomes et des ARN de transfert ;',
    'expliquer les conséquences d’une mutation sur le phénotype.',
  ],
  sections: [
    {
      title: 'La transcription',
      blocks: [
        {
          kind: 'text',
          text: 'L’ADN reste dans le noyau, mais les protéines sont fabriquées dans le cytoplasme. Un intermédiaire transporte l’information : l’**ARN messager** (ARNm).',
        },
        {
          kind: 'table',
          head: ['', 'ADN', 'ARN'],
          rows: [
            ['sucre', 'désoxyribose', 'ribose'],
            ['bases', 'A, T, G, C', 'A, **U** (uracile), G, C'],
            ['structure', 'deux brins', 'un seul brin'],
          ],
        },
        {
          kind: 'rule',
          text: 'Dans le noyau, l’**ARN polymérase** copie un des deux brins du gène (le brin transcrit) : en face de A elle place U, en face de T elle place A, en face de G elle place C, en face de C elle place G.',
        },
        {
          kind: 'example',
          title: 'transcrire',
          text: 'Brin transcrit de l’ADN : TAC GGT AAC.',
          steps: ['ARNm : AUG CCA UUG (c’est la séquence du brin non transcrit, avec U à la place de T).'],
        },
      ],
    },
    {
      title: 'La traduction et le code génétique',
      blocks: [
        {
          kind: 'definition',
          term: 'Codon',
          text: 'groupe de trois bases consécutives de l’ARNm, qui correspond à un acide aminé (ou à un signal stop).',
        },
        {
          kind: 'list',
          items: [
            '64 codons pour 20 acides aminés : le code est **redondant** (plusieurs codons pour un même acide aminé) ;',
            'AUG (méthionine) est le codon d’**initiation** ; UAA, UAG et UGA sont des codons **stop** ;',
            'le code est **universel** : le même chez presque tous les êtres vivants.',
          ],
        },
        {
          kind: 'text',
          text: 'Dans le cytoplasme, les **ribosomes** lisent l’ARNm codon par codon. Les **ARN de transfert**, chargés chacun d’un acide aminé, reconnaissent les codons par leur **anticodon** complémentaire. Les acides aminés sont reliés par des liaisons peptidiques jusqu’au codon stop.',
        },
        {
          kind: 'table',
          head: ['Codon', 'Acide aminé'],
          rows: [
            ['AUG', 'méthionine (Met), initiation'],
            ['CCA', 'proline (Pro)'],
            ['UUG', 'leucine (Leu)'],
            ['GAG', 'acide glutamique (Glu)'],
            ['GUG', 'valine (Val)'],
            ['UAA, UAG, UGA', 'stop'],
          ],
        },
      ],
    },
    {
      title: 'Mutations et phénotype',
      blocks: [
        {
          kind: 'definition',
          term: 'Mutation',
          text: 'modification de la séquence de l’ADN (substitution, ajout ou perte de nucléotides). Elle crée un nouvel allèle.',
        },
        {
          kind: 'example',
          title: 'la drépanocytose',
          text: 'Gène de la β-globine : le 6ᵉ codon de l’ARNm passe de GAG à GUG.',
          steps: ['L’acide glutamique (Glu) est remplacé par la valine (Val).', 'L’hémoglobine S forme des fibres quand le dioxygène manque : les globules rouges prennent une forme de faucille, se bloquent dans les petits vaisseaux et sont détruits (anémie).'],
        },
        {
          kind: 'rule',
          text: 'Le phénotype s’observe à plusieurs échelles : **moléculaire** (la protéine), **cellulaire** (la forme du globule rouge), **de l’organisme** (anémie, crises). Le génotype détermine la protéine, qui détermine le phénotype.',
        },
        {
          kind: 'trap',
          wrong: '« Toute mutation change la protéine. »',
          why: 'Le code étant redondant, une substitution peut donner un codon synonyme (même acide aminé) : la mutation est alors silencieuse.',
          reflex: 'Traduire les deux versions avec le code génétique avant de conclure.',
        },
      ],
    },
  ],
  essentials: [
    'Transcription (noyau) : ADN → ARNm, avec U à la place de T.',
    'Traduction (cytoplasme, ribosomes) : ARNm → protéine, codon par codon ; AUG = début, UAA/UAG/UGA = stop.',
    'Code génétique : 64 codons, 20 acides aminés, redondant et universel.',
    'Mutation → allèle → protéine modifiée → phénotype (drépanocytose : Glu → Val).',
  ],
  exercises: [
    {
      id: 'expr-traduction',
      level: 1,
      title: 'Du gène à la protéine',
      statement: 'Le brin transcrit d’un court gène est TAC GGT AAC ATT.',
      parts: [
        {
          label: 'Écris l’ARNm correspondant (sans espaces).',
          answer: { kind: 'text', display: 'AUGCCAUUGUAA', accepted: ['AUGCCAUUGUAA', 'AUG CCA UUG UAA', 'augccauuguaa'] },
          steps: ['Complémentarité, avec U face à A : AUG CCA UUG UAA.'],
        },
        {
          label: 'Combien d’acides aminés compte la protéine ?',
          answer: { kind: 'number', value: 3, tolerance: 0, unit: '' },
          steps: ['AUG (Met), CCA (Pro), UUG (Leu), puis UAA = stop : 3 acides aminés.'],
        },
      ],
    },
    {
      id: 'expr-longueur',
      level: 2,
      title: 'Taille d’une protéine',
      statement: 'La partie codante d’un ARNm compte 900 nucléotides, du codon d’initiation au codon stop compris.',
      parts: [
        {
          label: 'Combien de codons contient-elle ?',
          answer: { kind: 'number', value: 300, tolerance: 0, unit: '' },
          steps: ['$900 / 3 = 300$ codons.'],
        },
        {
          label: 'Combien d’acides aminés compte la protéine ?',
          answer: { kind: 'number', value: 299, tolerance: 0, unit: '' },
          steps: ['Le codon stop ne code aucun acide aminé : 299.'],
        },
      ],
    },
    {
      id: 'expr-mutation',
      level: 3,
      title: 'Une mutation',
      statement: 'Dans le gène de la β-globine, le 6ᵉ codon de l’ARNm GAG devient GUG chez les personnes drépanocytaires.',
      parts: [
        {
          label: 'Quel acide aminé est remplacé ? (nom)',
          answer: { kind: 'text', display: 'acide glutamique', accepted: ['acide glutamique', 'glutamate', 'glu', "l'acide glutamique"] },
          steps: ['GAG code l’acide glutamique (Glu).'],
        },
        {
          label: 'Par quel acide aminé ?',
          answer: { kind: 'text', display: 'valine', accepted: ['valine', 'val', 'la valine'] },
          steps: ['GUG code la valine (Val).'],
        },
        {
          label: 'Quel type de mutation est-ce ? (un mot)',
          answer: { kind: 'text', display: 'substitution', accepted: ['substitution', 'une substitution', 'mutation par substitution'] },
          steps: ['Une base est remplacée par une autre (A → T dans l’ADN, A → U dans l’ARNm).'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'La transcription a lieu :',
      choices: ['dans le noyau', 'sur les ribosomes', 'dans la mitochondrie', 'dans la vacuole'],
      answer: 0,
      explanation: 'L’ARN polymérase copie le gène là où se trouve l’ADN.',
    },
    {
      question: 'Dans l’ARN, l’adénine s’associe à :',
      choices: ['l’uracile', 'la thymine', 'la guanine', 'la cytosine'],
      answer: 0,
      explanation: 'L’ARN contient U à la place de T.',
    },
    {
      question: 'Un codon est formé de :',
      choices: ['3 nucléotides', '1 nucléotide', '2 nucléotides', '20 nucléotides'],
      answer: 0,
      explanation: '$4^3 = 64$ combinaisons, assez pour 20 acides aminés.',
    },
    {
      question: 'Le code génétique est dit universel car :',
      choices: ['il est le même chez presque tous les êtres vivants', 'chaque codon code tous les acides aminés', 'il n’a pas de codon stop', 'il ne concerne que l’homme'],
      answer: 0,
      explanation: 'C’est pourquoi une bactérie peut fabriquer de l’insuline humaine.',
    },
  ],
  applications: [
    {
      title: 'L’insuline fabriquée par des bactéries',
      tagline: 'Le code génétique universel au service des diabétiques',
      situation:
        'Les diabétiques qui manquent d’insuline doivent s’en injecter. Aujourd’hui, l’insuline humaine est produite par des bactéries dans lesquelles on a introduit le gène humain de l’insuline.',
      model: 'Le gène humain est transcrit et traduit par la machinerie de la bactérie.',
      questions: ['Pourquoi la bactérie fabrique-t-elle exactement la même insuline que le pancréas humain ?'],
      solution: [
        'Le code génétique est universel : les ribosomes de la bactérie lisent les codons de l’ARNm humain de la même façon que les nôtres et assemblent la même séquence d’acides aminés.',
      ],
      fact: 'Avant 1982, l’insuline était extraite du pancréas de porcs ou de bœufs, avec de petites différences d’acides aminés.',
    },
  ],
};
