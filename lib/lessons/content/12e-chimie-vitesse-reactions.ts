import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Le lait laissé au soleil caille en une journée ; au réfrigérateur, il tient presque une semaine. Le haricot cuit en deux heures dans une marmite, en une demi-heure dans un autocuiseur. Une réaction chimique peut donc aller plus ou moins vite, et l’on sait la ralentir ou l’accélérer : c’est la **cinétique chimique**.',
  objectives: [
    'suivre l’avancement d’une réaction au cours du temps ;',
    'définir et calculer une vitesse moyenne et une vitesse instantanée de formation ou de disparition ;',
    'déterminer un temps de demi-réaction ;',
    'citer les facteurs cinétiques et les utiliser dans la vie courante.',
  ],
  sections: [
    {
      title: 'Réactions lentes et réactions rapides',
      blocks: [
        {
          kind: 'text',
          text: 'Certaines réactions semblent instantanées : le précipité blanc de chlorure d’argent apparaît dès qu’on verse du nitrate d’argent dans de l’eau salée. D’autres durent plusieurs minutes ou plusieurs heures : on peut alors suivre leur évolution.',
        },
        {
          kind: 'example',
          title: 'une réaction lente',
          text: 'L’eau oxygénée oxyde les ions iodure en milieu acide : $\\ce{H2O2 + 2I- + 2H3O+ -> I2 + 4H2O}$.',
          steps: ['La solution, incolore au départ, devient jaune puis brune à mesure que le diiode $\\ce{I2}$ se forme.', 'La couleur fonce vite au début, puis de plus en plus lentement.'],
        },
        {
          kind: 'callout',
          variant: 'methode',
          title: 'Suivre une réaction au cours du temps',
          blocks: [
            {
              kind: 'list',
              items: [
                '**par dosages** : on fait des prélèvements à des dates connues, on les plonge dans de l’eau glacée pour arrêter la réaction (**trempe**), puis on dose un réactif ou un produit ;',
                '**par une mesure physique** continue : volume ou pression d’un gaz dégagé, conductance de la solution, intensité de la couleur (spectrophotométrie).',
              ],
            },
          ],
        },
      ],
    },
    {
      title: 'La vitesse d’une réaction',
      blocks: [
        {
          kind: 'formula',
          label: 'Vitesse de formation d’un produit P et de disparition d’un réactif R',
          tex: 'v_f(\\ce{P}) = \\dfrac{\\mathrm{d}[\\ce{P}]}{\\mathrm{d}t} \\qquad v_d(\\ce{R}) = -\\dfrac{\\mathrm{d}[\\ce{R}]}{\\mathrm{d}t}',
          legend: ['en mol·L⁻¹·s⁻¹ (ou mol·L⁻¹·min⁻¹)', 'le signe moins rend la vitesse de disparition positive'],
        },
        {
          kind: 'text',
          text: 'Graphiquement, la vitesse à la date $t$ est le **coefficient directeur de la tangente** à la courbe $[\\ce{P}] = f(t)$ en ce point. La **vitesse moyenne** entre $t_1$ et $t_2$ vaut $\\dfrac{[\\ce{P}]_2 - [\\ce{P}]_1}{t_2 - t_1}$.',
        },
        {
          kind: 'rule',
          text: 'Au cours d’une réaction, la vitesse **diminue** : les réactifs s’épuisent. Elle s’annule quand la réaction est terminée.',
        },
        {
          kind: 'text',
          text: 'Les vitesses des différentes espèces sont liées par les coefficients de l’équation. Pour la réaction de l’eau oxygénée ci-dessus : $v_d(\\ce{H2O2}) = v_f(\\ce{I2})$ et $v_d(\\ce{I-}) = 2\\,v_f(\\ce{I2})$.',
        },
      ],
    },
    {
      title: 'Le temps de demi-réaction',
      blocks: [
        {
          kind: 'definition',
          term: 'Temps de demi-réaction $t_{1/2}$',
          text: 'durée au bout de laquelle l’avancement atteint la moitié de sa valeur finale. Sur la courbe d’un produit : la date où $[\\ce{P}] = \\dfrac{[\\ce{P}]_{final}}{2}$.',
        },
        {
          kind: 'text',
          text: 'Il donne l’ordre de grandeur de la durée de la réaction : on la considère terminée après quelques $t_{1/2}$. Il sert aussi à choisir la méthode de suivi : des prélèvements toutes les secondes sont impossibles si $t_{1/2}$ vaut 10 s.',
        },
        {
          kind: 'trap',
          wrong: '« La réaction est terminée au bout de $2\\,t_{1/2}$. »',
          why: 'Pendant le deuxième $t_{1/2}$, la réaction va plus lentement que pendant le premier : elle ne fait pas la deuxième moitié du chemin.',
          reflex: 'Lire la valeur finale sur le palier de la courbe, puis chercher la date où l’on atteint la moitié de cette valeur.',
        },
      ],
    },
    {
      title: 'Les facteurs cinétiques',
      blocks: [
        {
          kind: 'table',
          head: ['Facteur', 'Effet', 'Exemple'],
          rows: [
            ['Concentration des réactifs', 'Plus elle est grande, plus la réaction est rapide', 'le vinaigre concentré détartre plus vite'],
            ['Température', 'Une température plus élevée accélère la réaction', 'autocuiseur ; réfrigérateur pour ralentir'],
            ['Catalyseur', 'Il accélère la réaction sans être consommé', 'enzymes de la digestion, pot catalytique'],
            ['Surface de contact (solides)', 'Un solide divisé réagit plus vite', 'le sucre en poudre se dissout plus vite que le morceau'],
          ],
        },
        {
          kind: 'text',
          text: 'À l’échelle des molécules : une réaction a lieu quand des réactifs se rencontrent avec assez d’énergie. Plus il y a de molécules par litre, plus les chocs sont nombreux ; plus il fait chaud, plus les chocs sont violents et efficaces.',
        },
        {
          kind: 'callout',
          variant: 'remarque',
          blocks: [
            {
              kind: 'text',
              text: 'Ordre de grandeur souvent utilisé pour les réactions de la vie courante : la vitesse double à peu près quand la température augmente de 10 °C.',
            },
          ],
        },
      ],
    },
  ],
  essentials: [
    'Suivi par trempe et dosage, ou par une mesure physique continue.',
    '$v_f(\\ce{P}) = \\dfrac{\\mathrm{d}[\\ce{P}]}{\\mathrm{d}t}$ : pente de la tangente ; la vitesse diminue au cours du temps.',
    '$t_{1/2}$ : date où l’avancement vaut la moitié de sa valeur finale.',
    'Facteurs cinétiques : concentration, température, catalyseur, surface de contact.',
  ],
  exercises: [
    {
      id: 'cinetique-diiode',
      level: 1,
      title: 'Exploiter un tableau de mesures',
      statement:
        'On suit la formation du diiode dans la réaction de l’eau oxygénée sur les ions iodure. Le tableau donne $[\\ce{I2}]$ en mmol/L ; la réaction est terminée à 60 min.',
      given: [
        { label: '$t$ (min)', value: '0 ; 5 ; 10 ; 15 ; 20 ; 30 ; 40 ; 60' },
        { label: '$[\\ce{I2}]$', value: '0 ; 6,0 ; 10,0 ; 12,6 ; 14,4 ; 16,2 ; 17,2 ; 18,0' },
      ],
      parts: [
        {
          label: 'Calcule la vitesse moyenne de formation du diiode entre 0 et 10 min (en mmol·L⁻¹·min⁻¹).',
          answer: { kind: 'number', value: 1.0, tolerance: 0.02, unit: 'mmol/(L·min)' },
          steps: ['$v = \\dfrac{10{,}0 - 0}{10 - 0} = 1{,}0$ mmol·L⁻¹·min⁻¹.'],
          result: 'v_{moy} = 1{,}0\\ \\text{mmol}\\cdot\\text{L}^{-1}\\cdot\\text{min}^{-1}',
        },
        {
          label: 'Calcule la vitesse moyenne entre 30 et 40 min.',
          answer: { kind: 'number', value: 0.1, tolerance: 0.005, unit: 'mmol/(L·min)' },
          steps: ['$v = \\dfrac{17{,}2 - 16{,}2}{40 - 30} = 0{,}10$ mmol·L⁻¹·min⁻¹ : dix fois moins qu’au début.'],
          result: 'v_{moy} = 0{,}10\\ \\text{mmol}\\cdot\\text{L}^{-1}\\cdot\\text{min}^{-1}',
        },
        {
          label: 'Estime le temps de demi-réaction (en min).',
          answer: { kind: 'number', value: 8.75, tolerance: 1, unit: 'min' },
          steps: ['$[\\ce{I2}]_{final} = 18{,}0$ mmol/L ; on cherche la date où $[\\ce{I2}] = 9{,}0$ mmol/L.', 'Entre 5 min (6,0) et 10 min (10,0), en supposant la variation régulière : $t_{1/2} \\approx 5 + \\dfrac{3{,}0}{4{,}0} \\times 5 \\approx 9$ min.'],
          result: 't_{1/2} \\approx 9\\ \\text{min}',
        },
      ],
    },
    {
      id: 'cinetique-tangente',
      level: 2,
      title: 'Vitesse initiale et réactif restant',
      statement:
        'Même réaction. La concentration initiale de l’eau oxygénée vaut 20,0 mmol/L (les ions iodure sont en excès). La tangente à la courbe $[\\ce{I2}] = f(t)$ à la date $t = 0$ passe par le point (4,0 min ; 6,0 mmol/L).',
      parts: [
        {
          label: 'Calcule la vitesse initiale de formation du diiode (en mmol·L⁻¹·min⁻¹).',
          answer: { kind: 'number', value: 1.5, tolerance: 0.03, unit: 'mmol/(L·min)' },
          steps: ['La tangente passe par l’origine : $v_0 = \\dfrac{6{,}0}{4{,}0} = 1{,}5$ mmol·L⁻¹·min⁻¹.'],
          result: 'v_0 = 1{,}5\\ \\text{mmol}\\cdot\\text{L}^{-1}\\cdot\\text{min}^{-1}',
        },
        {
          label: 'Exprime cette vitesse en mol·L⁻¹·s⁻¹.',
          answer: { kind: 'number', value: 0.000025, tolerance: 0.0000005, unit: 'mol/(L·s)' },
          steps: ['$1{,}5 \\times 10^{-3}$ mol·L⁻¹ par minute, soit $\\dfrac{1{,}5 \\times 10^{-3}}{60} = 2{,}5 \\times 10^{-5}$ mol·L⁻¹·s⁻¹.'],
          result: 'v_0 = 2{,}5 \\times 10^{-5}\\ \\text{mol}\\cdot\\text{L}^{-1}\\cdot\\text{s}^{-1}',
        },
        {
          label: 'À 15 min, $[\\ce{I2}] = 12{,}6$ mmol/L. Que vaut alors $[\\ce{H2O2}]$ (en mmol/L) ?',
          answer: { kind: 'number', value: 7.4, tolerance: 0.1, unit: 'mmol/L' },
          steps: ['Une mole de $\\ce{H2O2}$ consommée donne une mole de $\\ce{I2}$.', '$[\\ce{H2O2}] = 20{,}0 - 12{,}6 = 7{,}4$ mmol/L.'],
          result: '[\\ce{H2O2}] = 7{,}4\\ \\text{mmol/L}',
        },
      ],
    },
    {
      id: 'cinetique-magnesium',
      level: 3,
      title: 'Le magnésium dans l’acide',
      statement:
        'On plonge 0,12 g de ruban de magnésium dans un excès d’acide chlorhydrique : $\\ce{Mg + 2H3O+ -> Mg^2+ + H2 + 2H2O}$. On mesure le volume de dihydrogène dégagé. Mg = 24 g/mol ; $V_m = 24$ L/mol.',
      parts: [
        {
          label: 'Calcule la quantité initiale de magnésium (en mol).',
          answer: { kind: 'number', value: 0.005, tolerance: 0.0001, unit: 'mol' },
          steps: ['$n = \\dfrac{0{,}12}{24} = 5{,}0 \\times 10^{-3}$ mol.'],
          result: 'n(\\ce{Mg}) = 5{,}0 \\times 10^{-3}\\ \\text{mol}',
        },
        {
          label: 'Quel volume de dihydrogène obtient-on en fin de réaction (en mL) ?',
          answer: { kind: 'number', value: 120, tolerance: 2, unit: 'mL' },
          steps: ['Le magnésium est limitant : $x_{max} = 5{,}0 \\times 10^{-3}$ mol et $n(\\ce{H2}) = x_{max}$.', '$V = 5{,}0 \\times 10^{-3} \\times 24 = 0{,}12$ L $= 120$ mL.'],
          result: 'V_{final} = 120\\ \\text{mL}',
        },
        {
          label: 'Le volume atteint 60 mL au bout de 50 s. Que vaut le temps de demi-réaction (en s) ?',
          answer: { kind: 'number', value: 50, tolerance: 1, unit: 's' },
          steps: ['60 mL est la moitié du volume final : l’avancement vaut alors $\\dfrac{x_{max}}{2}$.', 'Donc $t_{1/2} = 50$ s.'],
          result: 't_{1/2} = 50\\ \\text{s}',
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Graphiquement, la vitesse de formation d’un produit à la date $t$ est :',
      choices: ['la pente de la tangente à la courbe $[\\ce{P}] = f(t)$', 'la valeur de $[\\ce{P}]$ à cette date', 'l’aire sous la courbe', 'la valeur finale divisée par 2'],
      answer: 0,
      explanation: '$v_f = \\dfrac{\\mathrm{d}[\\ce{P}]}{\\mathrm{d}t}$ : c’est le coefficient directeur de la tangente.',
    },
    {
      question: 'Au cours d’une réaction, en général, la vitesse :',
      choices: ['diminue', 'augmente', 'reste constante', 'change de signe'],
      answer: 0,
      explanation: 'Les réactifs s’épuisent, les chocs efficaces deviennent plus rares.',
    },
    {
      question: 'Pourquoi met-on les prélèvements dans de l’eau glacée avant de les doser ?',
      choices: ['Pour arrêter la réaction (trempe)', 'Pour accélérer le dosage', 'Pour changer la couleur', 'Pour dissoudre le gaz'],
      answer: 0,
      explanation: 'Le froid et la dilution ralentissent fortement la réaction : la composition ne change plus pendant le dosage.',
    },
    {
      question: 'Lequel de ces moyens ne rend pas une réaction plus rapide ?',
      choices: ['refroidir le mélange', 'augmenter la concentration d’un réactif', 'ajouter un catalyseur', 'réduire un solide en poudre'],
      answer: 0,
      explanation: 'Refroidir ralentit la réaction : c’est le principe du réfrigérateur.',
    },
    {
      question: 'Pour $\\ce{H2O2 + 2I- + 2H3O+ -> I2 + 4H2O}$, la vitesse de disparition des ions iodure vaut :',
      choices: ['$2\\,v_f(\\ce{I2})$', '$v_f(\\ce{I2})$', '$\\dfrac{1}{2}v_f(\\ce{I2})$', '$4\\,v_f(\\ce{I2})$'],
      answer: 0,
      explanation: 'Deux ions iodure disparaissent pour chaque molécule de diiode formée.',
    },
  ],
  applications: [
    {
      title: 'Le lait au réfrigérateur',
      tagline: 'Combien de temps le froid fait-il gagner ?',
      situation:
        'Dans la cuisine, à 30 °C, le lait frais caille en un jour : des bactéries transforment son sucre en acide. Au réfrigérateur, il est à 5 °C.',
      model: 'On admet que la vitesse de ces transformations est divisée par deux chaque fois que la température baisse de 10 °C.',
      questions: ['Au bout de combien de jours le lait caillera-t-il au réfrigérateur ?'],
      check: { value: 5.66, tolerance: 0.05, unit: 'jours' },
      solution: [
        'La température baisse de 25 °C, soit 2,5 fois 10 °C.',
        'La vitesse est divisée par $2^{2{,}5} \\approx 5{,}7$ : la durée est multipliée par 5,7.',
        'Le lait tient environ 5 à 6 jours.',
      ],
      fact: 'Le séchage du poisson ou de la viande ralentit aussi les réactions de pourrissement : sans eau, les bactéries ne peuvent presque plus agir.',
    },
    {
      title: 'La cuisson des haricots',
      tagline: 'Pourquoi l’autocuiseur va-t-il plus vite ?',
      situation:
        'Dans une marmite ouverte, l’eau bout à 100 °C et les haricots cuisent en 2 h. Dans un autocuiseur fermé, la pression monte et l’eau bout à 120 °C.',
      model: 'Même règle : la vitesse de cuisson double quand la température augmente de 10 °C.',
      questions: ['Combien de temps faut-il pour cuire les haricots dans l’autocuiseur, en minutes ?'],
      check: { value: 30, tolerance: 0.05, unit: 'min' },
      solution: ['20 °C de plus : la vitesse est multipliée par $2^2 = 4$.', 'Durée : $\\dfrac{120\\ \\text{min}}{4} = 30$ min.'],
      fact: 'En altitude, l’eau bout en dessous de 100 °C : la cuisson à l’air libre y est plus lente.',
    },
  ],
};
