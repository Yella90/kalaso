import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'En 1869, le chimiste Dmitri Mendeleïev range les 63 éléments connus à son époque dans un tableau… et laisse des cases vides. Il annonce que des éléments inconnus viendront les remplir, et décrit même leurs propriétés. Quelques années plus tard, on découvre le gallium (1875) puis le germanium (1886), exactement comme il l’avait prévu. Comment un simple rangement peut-il prédire l’avenir ?',
  objectives: [
    'expliquer comment les éléments sont rangés dans le tableau périodique ;',
    'trouver la période et le groupe d’un élément à partir de sa répartition électronique, et l’inverse ;',
    'reconnaître les grandes familles : alcalins, alcalino-terreux, halogènes, gaz nobles ;',
    'utiliser les règles du duet et de l’octet pour prévoir l’ion que forme un atome ;',
    'écrire la formule d’un composé ionique.',
  ],
  sections: [
    {
      title: 'Le principe du rangement',
      blocks: [
        {
          kind: 'rule',
          text: 'Les éléments sont rangés par **numéro atomique $Z$ croissant**. On passe à la ligne suivante chaque fois qu’on commence à remplir une nouvelle couche électronique.',
        },
        {
          kind: 'definition',
          term: 'Période',
          text: 'une ligne du tableau. Tous les éléments d’une même période ont le **même nombre de couches** occupées. Le numéro de la période est le numéro de la couche externe (K = 1, L = 2, M = 3…).',
        },
        {
          kind: 'definition',
          term: 'Groupe (ou colonne)',
          text: 'une colonne du tableau. Les éléments d’un même groupe ont le **même nombre d’électrons sur leur couche externe** : ils ont des propriétés chimiques voisines et forment une **famille**.',
        },
        {
          kind: 'table',
          head: ['Groupe', '1', '2', '13', '14', '15', '16', '17', '18'],
          rows: [['Électrons de valence', '1', '2', '3', '4', '5', '6', '7', '8 (2 pour He)']],
        },
        {
          kind: 'text',
          text: 'Pour les 18 premiers éléments, beaucoup de manuels utilisent un tableau simplifié à **8 colonnes** (I à VIII) : le numéro de la colonne est alors directement le nombre d’électrons de valence.',
        },
        {
          kind: 'example',
          title: 'placer le soufre ($Z = 16$)',
          text: 'Répartition : $(K)^2(L)^8(M)^6$.',
          steps: [
            'La couche externe est M, la 3ᵉ couche : **3ᵉ période**.',
            '6 électrons de valence : **groupe 16** (colonne VI du tableau simplifié).',
          ],
        },
      ],
    },
    {
      title: 'Les grandes familles',
      blocks: [
        {
          kind: 'table',
          head: ['Famille', 'Groupe', 'Exemples', 'Ce qui les caractérise'],
          rows: [
            ['Alcalins', '1', 'Li, Na, K', 'Métaux mous, très réactifs : le sodium réagit violemment avec l’eau.'],
            ['Alcalino-terreux', '2', 'Be, Mg, Ca', 'Métaux réactifs ; le calcium est dans les os et le calcaire.'],
            ['Halogènes', '17', 'F, Cl, Br, I', 'Non-métaux très réactifs ; le chlore désinfecte l’eau (eau de Javel).'],
            ['Gaz nobles', '18', 'He, Ne, Ar', 'Gaz qui ne réagissent presque pas : leur couche externe est pleine.'],
          ],
        },
        {
          kind: 'text',
          text: 'Les **métaux** sont à gauche et au centre du tableau, les **non-métaux** à droite. Une frontière en escalier les sépare, le long des métalloïdes (bore, silicium, germanium…).',
        },
      ],
    },
    {
      title: 'Les règles du duet et de l’octet',
      blocks: [
        {
          kind: 'text',
          text: 'Les gaz nobles sont stables parce que leur couche externe est saturée : 2 électrons pour l’hélium, 8 pour les autres. Les autres atomes cherchent à obtenir la même structure.',
        },
        {
          kind: 'rule',
          text: '**Règle du duet** : les atomes proches de l’hélium ($Z \\le 4$ environ) tendent à avoir 2 électrons sur leur couche externe. **Règle de l’octet** : les autres tendent à en avoir 8. Pour cela, ils perdent ou gagnent le **plus petit nombre** d’électrons possible.',
        },
        {
          kind: 'example',
          title: 'sodium et chlore',
          text: 'Le sodium $(K)^2(L)^8(M)^1$ perd **1** électron et devient $\\ce{Na+}$ $(K)^2(L)^8$, comme le néon. Le chlore $(K)^2(L)^8(M)^7$ gagne **1** électron et devient $\\ce{Cl-}$ $(K)^2(L)^8(M)^8$, comme l’argon.',
        },
        {
          kind: 'table',
          head: ['Groupe', '1', '2', '13', '15', '16', '17'],
          rows: [['Ion formé', '$\\ce{X+}$', '$\\ce{X^{2+}}$', '$\\ce{X^{3+}}$', '$\\ce{X^{3-}}$', '$\\ce{X^{2-}}$', '$\\ce{X-}$']],
        },
        {
          kind: 'trap',
          wrong: '« Le sodium gagne 7 électrons pour compléter sa couche M. »',
          why: 'Gagner 7 électrons demanderait beaucoup trop d’énergie. Perdre 1 seul électron suffit pour retrouver une couche externe pleine (la couche L).',
          reflex: 'Compare : combien d’électrons à **perdre** ? combien à **gagner** ? L’atome choisit le plus petit nombre. Avec 1, 2 ou 3 électrons de valence, il les perd ; avec 5, 6 ou 7, il en gagne 3, 2 ou 1.',
        },
      ],
    },
    {
      title: 'La formule d’un composé ionique',
      blocks: [
        {
          kind: 'rule',
          text: 'Un composé ionique est **électriquement neutre** : les charges positives compensent exactement les charges négatives.',
        },
        {
          kind: 'example',
          title: 'l’oxyde d’aluminium (l’alumine, tirée de la bauxite)',
          text: 'L’aluminium forme $\\ce{Al^{3+}}$ et l’oxygène forme $\\ce{O^{2-}}$.',
          steps: [
            'Il faut autant de charges $+$ que de charges $-$ : le plus petit multiple commun de 3 et 2 est 6.',
            '2 ions $\\ce{Al^{3+}}$ apportent $+6$ ; 3 ions $\\ce{O^{2-}}$ apportent $-6$.',
            'Formule : $\\ce{Al2O3}$.',
          ],
        },
      ],
    },
  ],
  essentials: [
    'Les éléments sont rangés par $Z$ croissant.',
    'Période = nombre de couches occupées ; groupe = nombre d’électrons de valence (pour les groupes 1, 2 et 13 à 18).',
    'Même groupe = même famille = propriétés chimiques voisines.',
    'Alcalins (groupe 1), alcalino-terreux (2), halogènes (17), gaz nobles (18).',
    'Duet et octet : un atome perd ou gagne le moins d’électrons possible pour ressembler au gaz noble le plus proche.',
    'Groupes 1, 2, 13 → ions $+1$, $+2$, $+3$ ; groupes 15, 16, 17 → ions $-3$, $-2$, $-1$.',
    'Un composé ionique est neutre : $\\ce{NaCl}$, $\\ce{MgCl2}$, $\\ce{Al2O3}$.',
  ],
  simulationTasks: [
    'filtrer la famille des halogènes : que remarques-tu sur leur dernière couche ?',
    'comparer le lithium, le sodium et le potassium : quel est leur point commun ?',
    'trouver tous les éléments de la 3ᵉ période et compter leurs couches.',
  ],
  exercises: [
    {
      id: 'placer-elements',
      level: 1,
      statement: 'Pour chaque élément, écris la répartition électronique, puis donne sa période et son groupe :',
      questions: ['le carbone ($Z = 6$)', 'le phosphore ($Z = 15$)', 'l’argon ($Z = 18$)'],
      solution: [
        'Carbone : $(K)^2(L)^4$ → 2ᵉ période, groupe 14.',
        'Phosphore : $(K)^2(L)^8(M)^5$ → 3ᵉ période, groupe 15.',
        'Argon : $(K)^2(L)^8(M)^8$ → 3ᵉ période, groupe 18 (gaz noble).',
      ],
    },
    {
      id: 'retrouver-element',
      level: 1,
      statement: 'Un élément se trouve dans la 3ᵉ période et le groupe 2.',
      questions: ['Écris sa répartition électronique.', 'Quel est son numéro atomique ? Identifie-le.', 'Quel ion forme-t-il ?'],
      solution: [
        '3ᵉ période : couche externe M ; groupe 2 : 2 électrons sur M. Donc $(K)^2(L)^8(M)^2$.',
        '$Z = 12$ : c’est le magnésium.',
        'Il perd ses 2 électrons de valence : $\\ce{Mg^{2+}}$.',
      ],
    },
    {
      id: 'prevoir-ions',
      level: 2,
      statement: 'Prévois l’ion formé par chacun des atomes suivants et justifie avec la règle du duet ou de l’octet :',
      questions: ['lithium ($Z = 3$)', 'fluor ($Z = 9$)', 'aluminium ($Z = 13$)', 'oxygène ($Z = 8$)'],
      solution: [
        'Li : $(K)^2(L)^1$, il perd 1 électron → $\\ce{Li+}$ $(K)^2$ (règle du duet, comme l’hélium).',
        'F : $(K)^2(L)^7$, il gagne 1 électron → $\\ce{F-}$ $(K)^2(L)^8$.',
        'Al : $(K)^2(L)^8(M)^3$, il perd 3 électrons → $\\ce{Al^{3+}}$ $(K)^2(L)^8$.',
        'O : $(K)^2(L)^6$, il gagne 2 électrons → $\\ce{O^{2-}}$ $(K)^2(L)^8$.',
      ],
    },
    {
      id: 'potassium',
      level: 2,
      statement: 'L’atome d’un élément X a pour répartition électronique $(K)^2(L)^8(M)^8(N)^1$.',
      questions: ['Quel est son numéro atomique ?', 'Dans quelle période et quel groupe se trouve-t-il ?', 'À quelle famille appartient-il ? Cite un autre élément de cette famille.'],
      solution: [
        '$Z = 2 + 8 + 8 + 1 = 19$ : c’est le potassium, K.',
        '4ᵉ période (couche externe N), groupe 1.',
        'Famille des alcalins, comme le sodium ou le lithium.',
      ],
    },
    {
      id: 'formules-ioniques',
      level: 2,
      statement: 'Écris la formule des composés ioniques formés par :',
      questions: ['les ions magnésium et chlorure ;', 'les ions calcium ($Z = 20$) et oxyde ;', 'les ions sodium et sulfure ($\\ce{S^{2-}}$).'],
      solution: [
        '$\\ce{Mg^{2+}}$ et $\\ce{Cl-}$ : il faut 2 ions chlorure → $\\ce{MgCl2}$.',
        '$\\ce{Ca^{2+}}$ et $\\ce{O^{2-}}$ : charges égales → $\\ce{CaO}$ (la chaux).',
        '$\\ce{Na+}$ et $\\ce{S^{2-}}$ : il faut 2 ions sodium → $\\ce{Na2S}$.',
      ],
    },
    {
      id: 'gaz-nobles',
      level: 3,
      statement: 'L’argon est utilisé à l’intérieur de certaines ampoules à filament, et l’hélium pour gonfler les ballons-sondes météo.',
      questions: [
        'Écris la répartition électronique de l’hélium ($Z = 2$) et de l’argon ($Z = 18$).',
        'Explique pourquoi ces gaz ne forment presque jamais d’ions ni de molécules.',
        'Pourquoi utilise-t-on de l’argon plutôt que de l’air dans une ampoule où le filament est très chaud ?',
      ],
      solution: [
        'He : $(K)^2$ ; Ar : $(K)^2(L)^8(M)^8$.',
        'Leur couche externe est déjà saturée (duet pour He, octet pour Ar) : ils n’ont aucun intérêt à perdre ou gagner des électrons.',
        'L’air contient du dioxygène, qui réagirait avec le filament chaud et le brûlerait. L’argon, lui, ne réagit pas.',
      ],
    },
  ],
  quiz: [
    {
      question: 'Dans le tableau périodique, les éléments sont rangés par :',
      choices: ['masse croissante', 'nombre de neutrons', 'numéro atomique croissant', 'ordre alphabétique'],
      answer: 2,
      explanation: 'Le rangement se fait par $Z$ croissant.',
    },
    {
      question: 'Les éléments d’un même groupe ont le même nombre :',
      choices: ['de couches', 'd’électrons de valence', 'de neutrons', 'de nucléons'],
      answer: 1,
      explanation: 'Même groupe = même nombre d’électrons sur la couche externe. Même période = même nombre de couches.',
    },
    {
      question: 'Le chlore $(K)^2(L)^8(M)^7$ appartient à la famille des :',
      choices: ['alcalins', 'gaz nobles', 'alcalino-terreux', 'halogènes'],
      answer: 3,
      explanation: '7 électrons de valence : groupe 17, les halogènes.',
    },
    {
      question: 'L’atome de magnésium ($Z = 12$) forme l’ion :',
      choices: ['$\\ce{Mg+}$', '$\\ce{Mg^{2+}}$', '$\\ce{Mg^{2-}}$', '$\\ce{Mg^{6-}}$'],
      answer: 1,
      explanation: '$(K)^2(L)^8(M)^2$ : perdre 2 électrons est plus simple qu’en gagner 6.',
    },
    {
      question: 'Un élément de la 2ᵉ période possède :',
      choices: ['2 électrons de valence', '2 couches occupées', '2 protons', '2 neutrons'],
      answer: 1,
      explanation: 'Le numéro de la période est le nombre de couches occupées (ici K et L).',
    },
    {
      question: 'La formule du composé formé par $\\ce{Al^{3+}}$ et $\\ce{O^{2-}}$ est :',
      choices: ['$\\ce{AlO}$', '$\\ce{Al3O2}$', '$\\ce{Al2O3}$', '$\\ce{AlO2}$'],
      answer: 2,
      explanation: '$2 \\times (+3) + 3 \\times (-2) = 0$ : $\\ce{Al2O3}$ est neutre.',
    },
  ],
  applications: [
    {
      title: 'L’engrais NPK des champs de coton',
      situation:
        'Les producteurs de coton de la zone de Koutiala et de Sikasso utilisent un engrais appelé « NPK ». Il apporte aux plantes de l’azote (N, $Z = 7$), du phosphore (P, $Z = 15$) et du potassium (K, $Z = 19$).',
      questions: [
        'Écris la répartition électronique de chacun de ces trois atomes.',
        'Situe chacun dans le tableau (période et groupe).',
        'Deux de ces éléments appartiennent à la même famille : lesquels ? Qu’est-ce que cela implique ?',
        'Dans l’engrais, le potassium est présent sous forme d’ions. Lequel ?',
      ],
      solution: [
        'N : $(K)^2(L)^5$ ; P : $(K)^2(L)^8(M)^5$ ; K : $(K)^2(L)^8(M)^8(N)^1$.',
        'N : 2ᵉ période, groupe 15 ; P : 3ᵉ période, groupe 15 ; K : 4ᵉ période, groupe 1.',
        'L’azote et le phosphore sont dans le groupe 15 : ils ont 5 électrons de valence et des propriétés chimiques voisines.',
        'Le potassium est un alcalin : il perd son électron de valence et donne $\\ce{K+}$.',
      ],
    },
    {
      title: 'Le sel de la caravane de Taoudéni',
      situation:
        'Depuis des siècles, des barres de sel sont extraites à Taoudéni et transportées jusqu’à Tombouctou. Ce sel est surtout du chlorure de sodium.',
      questions: [
        'Quels ions forment le chlorure de sodium ? Justifie leur charge avec la règle de l’octet.',
        'Écris la formule du chlorure de sodium.',
        'Le sel brut peut aussi contenir un peu de chlorure de magnésium. Écris sa formule.',
      ],
      solution: [
        'Le sodium (groupe 1) perd un électron → $\\ce{Na+}$ ; le chlore (groupe 17) en gagne un → $\\ce{Cl-}$. Tous deux obtiennent une couche externe à 8 électrons.',
        'Une charge $+$ pour une charge $-$ : $\\ce{NaCl}$.',
        '$\\ce{Mg^{2+}}$ et 2 $\\ce{Cl-}$ : $\\ce{MgCl2}$.',
      ],
    },
  ],
};
