import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Le système immunitaire nous protège, mais il peut aussi être détruit, ou se tromper de cible. Le **VIH** s’attaque justement aux lymphocytes qui dirigent nos défenses. Dans une **allergie**, le corps réagit violemment à une substance inoffensive comme le pollen ou l’arachide. Comprendre ces dérèglements aide à s’en protéger.',
  objectives: [
    'décrire l’infection par le VIH et l’évolution vers le sida ;',
    'citer les modes de transmission du VIH et les moyens de prévention ;',
    'expliquer le mécanisme d’une allergie ;',
    'définir une maladie auto-immune.',
  ],
  sections: [
    {
      title: 'Le VIH et le sida',
      blocks: [
        {
          kind: 'text',
          text: 'Le **VIH** (virus de l’immunodéficience humaine) est un rétrovirus : son information génétique est de l’ARN, qu’il recopie en ADN pour l’intégrer dans le génome de la cellule infectée. Il infecte surtout les **lymphocytes T4**, grâce à leur récepteur CD4.',
        },
        {
          kind: 'table',
          head: ['Phase', 'Ce qui se passe'],
          rows: [
            ['primo-infection (quelques semaines)', 'le virus se multiplie ; signes proches d’une grippe ; apparition des anticorps anti-VIH (**séropositivité**)'],
            ['phase asymptomatique (plusieurs années)', 'la personne se sent bien, mais le nombre de T4 diminue lentement ; elle peut transmettre le virus'],
            ['sida (moins de 200 T4 par mm³)', 'le système immunitaire s’effondre : **infections opportunistes** (tuberculose, pneumonies, mycoses) et certains cancers'],
          ],
        },
        {
          kind: 'list',
          items: [
            '**transmission** : rapports sexuels non protégés, sang (seringues, objets coupants partagés, transfusion non contrôlée), de la mère à l’enfant (grossesse, accouchement, allaitement) ;',
            '**prévention** : préservatif, dépistage, matériel stérile, traitement des femmes enceintes séropositives ;',
            '**traitement** : les antirétroviraux (ARV) bloquent la multiplication du virus ; pris à vie, ils permettent de vivre longtemps et de ne plus transmettre le virus.',
          ],
        },
        {
          kind: 'trap',
          wrong: '« On peut attraper le VIH en serrant la main, en partageant un repas ou par une piqûre de moustique. »',
          why: 'Le virus ne se transmet que par le sang, les sécrétions sexuelles et le lait maternel ; il ne survit pas dans le moustique.',
          reflex: 'Vivre avec une personne séropositive ne présente aucun risque au quotidien.',
        },
      ],
    },
    {
      title: 'Les allergies',
      blocks: [
        {
          kind: 'definition',
          term: 'Allergie',
          text: 'réaction excessive du système immunitaire contre une substance habituellement inoffensive, l’**allergène** (pollen, poussière, arachide, venin…).',
        },
        {
          kind: 'list',
          items: [
            '**premier contact** (sensibilisation) : pas de signe, mais production d’anticorps particuliers (IgE) qui se fixent sur les **mastocytes** ;',
            '**contacts suivants** : l’allergène se fixe sur ces IgE ; les mastocytes libèrent brutalement de l’**histamine**, qui provoque éternuements, démangeaisons, gonflement, crise d’asthme, voire un choc grave.',
          ],
        },
        {
          kind: 'definition',
          term: 'Maladie auto-immune',
          text: 'le système immunitaire attaque des cellules du soi, comme s’il s’agissait de non-soi. Exemple : dans le diabète de type 1, les lymphocytes détruisent les cellules du pancréas qui fabriquent l’insuline.',
        },
      ],
    },
  ],
  essentials: [
    'VIH : rétrovirus qui détruit les lymphocytes T4 ; primo-infection, phase asymptomatique, sida (< 200 T4/mm³) avec infections opportunistes.',
    'Transmission par le sang, les rapports sexuels et de la mère à l’enfant ; préservatif, dépistage, ARV.',
    'Allergie : sensibilisation (IgE sur les mastocytes), puis libération d’histamine à chaque contact.',
    'Maladie auto-immune : attaque du soi (diabète de type 1).',
  ],
  exercises: [
    {
      id: 'dys-t4',
      level: 1,
      title: 'L’évolution des lymphocytes T4',
      statement: 'Une personne séropositive non traitée a 700 lymphocytes T4 par mm³ au moment du dépistage. Ce nombre diminue d’environ 50 par mm³ chaque année.',
      parts: [
        {
          label: 'Dans combien d’années atteindra-t-elle le seuil de 200 T4 par mm³ ?',
          answer: { kind: 'number', value: 10, tolerance: 0, unit: 'ans' },
          steps: ['$\\dfrac{700 - 200}{50} = 10$ ans.'],
        },
        {
          label: 'De quel pourcentage le nombre de T4 aura-t-il alors diminué ?',
          answer: { kind: 'number', value: 71.4, tolerance: 0.3, unit: '%' },
          steps: ['$\\dfrac{500}{700} \\approx 0{,}714$, soit environ 71 %.'],
        },
      ],
    },
    {
      id: 'dys-mots',
      level: 2,
      title: 'Les mots du chapitre',
      statement: 'Réponds par un mot.',
      parts: [
        {
          label: 'Substance libérée par les mastocytes lors d’une allergie.',
          answer: { kind: 'text', display: 'histamine', accepted: ['histamine', "l'histamine", 'l’histamine'] },
          steps: ['L’histamine dilate les vaisseaux et contracte les bronches.'],
        },
        {
          label: 'Lymphocytes détruits par le VIH (écris T4 ou T8).',
          answer: { kind: 'text', display: 'T4', accepted: ['t4', 'lt4', 'lymphocytes t4', 'cd4', 'lymphocyte t4'] },
          steps: ['Le VIH utilise la molécule CD4 pour entrer dans les T4.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Le VIH infecte surtout :',
      choices: ['les lymphocytes T4', 'les globules rouges', 'les neurones', 'les plaquettes'],
      answer: 0,
      explanation: 'Grâce à leur récepteur CD4.',
    },
    {
      question: 'Le VIH ne se transmet pas par :',
      choices: ['la piqûre de moustique', 'le sang', 'les rapports sexuels non protégés', 'l’allaitement'],
      answer: 0,
      explanation: 'Le virus ne se multiplie pas dans le moustique.',
    },
    {
      question: 'Lors du premier contact avec un allergène :',
      choices: ['il n’y a généralement pas de symptôme', 'la réaction est la plus violente', 'l’histamine est libérée en masse', 'on développe le sida'],
      answer: 0,
      explanation: 'C’est la phase de sensibilisation.',
    },
    {
      question: 'Les antirétroviraux :',
      choices: ['bloquent la multiplication du virus', 'guérissent définitivement le sida', 'sont des vaccins', 'sont des antibiotiques'],
      answer: 0,
      explanation: 'Ils doivent être pris à vie, mais permettent une vie presque normale.',
    },
  ],
  applications: [
    {
      title: 'Protéger le bébé',
      tagline: 'La prévention de la transmission de la mère à l’enfant',
      situation:
        'Lors de sa consultation prénatale, Kadiatou apprend qu’elle est séropositive. Sans traitement, environ 30 % des bébés de mères séropositives seraient infectés. Avec un traitement ARV bien suivi pendant la grossesse et l’allaitement, le risque tombe à moins de 5 %.',
      model: 'Les ARV réduisent la quantité de virus dans le sang de la mère, donc le risque de passage vers l’enfant.',
      questions: ['Pour 100 bébés de mères séropositives, combien d’infections évite-t-on environ avec le traitement ?'],
      check: { value: 25, tolerance: 0.2, unit: 'bébés' },
      solution: ['Sans traitement : environ 30 bébés infectés sur 100 ; avec : moins de 5.', 'On évite donc environ 25 infections pour 100 naissances. D’où l’importance du dépistage pendant la grossesse.'],
      fact: 'Le dépistage du VIH est gratuit et confidentiel dans les centres de santé du Mali.',
    },
  ],
};
