import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Le bijoutier recouvre une bague d’une fine couche d’or ; l’usine fabrique l’aluminium des marmites ; le chargeur recharge la batterie de la moto. Dans tous ces cas, un générateur **force** une réaction d’oxydoréduction qui ne se ferait pas toute seule : c’est l’**électrolyse**, l’inverse d’une pile.',
  objectives: [
    'décrire une électrolyse : anode, cathode, réactions aux électrodes ;',
    'distinguer réaction spontanée (pile) et réaction forcée (électrolyse) ;',
    'écrire le bilan de l’électrolyse de l’eau et d’une solution de chlorure de cuivre ;',
    'calculer une masse déposée ou un volume de gaz à partir de $Q = It$.',
  ],
  sections: [
    {
      title: 'Principe de l’électrolyse',
      blocks: [
        {
          kind: 'text',
          text: 'Deux électrodes plongent dans un électrolyte (solution ou liquide contenant des ions) et sont reliées à un **générateur** de courant continu.',
        },
        {
          kind: 'table',
          head: ['Électrode', 'Reliée au', 'Réaction'],
          rows: [
            ['**anode**', 'pôle + du générateur', '**oxydation**'],
            ['**cathode**', 'pôle − du générateur', '**réduction**'],
          ],
        },
        {
          kind: 'rule',
          text: 'Une électrolyse est une réaction **forcée** : le générateur fournit l’énergie nécessaire à une réaction qui ne serait pas spontanée. C’est la transformation inverse de celle d’une pile.',
        },
      ],
    },
    {
      title: 'Deux exemples',
      blocks: [
        {
          kind: 'example',
          title: 'chlorure de cuivre(II)',
          text: 'Électrodes en graphite dans une solution de $\\ce{CuCl2}$.',
          steps: ['Cathode : $\\ce{Cu^2+ + 2e- -> Cu}$ (dépôt rouge de cuivre).', 'Anode : $\\ce{2Cl- -> Cl2 + 2e-}$ (dégagement de dichlore).', 'Bilan : $\\ce{Cu^2+ + 2Cl- -> Cu + Cl2}$.'],
        },
        {
          kind: 'example',
          title: 'l’eau (légèrement acidifiée)',
          text: 'Bilan : $\\ce{2H2O -> 2H2 + O2}$.',
          steps: ['Dihydrogène à la cathode, dioxygène à l’anode.', 'Le volume de dihydrogène est le double de celui du dioxygène.'],
        },
      ],
    },
    {
      title: 'Quantités et applications',
      blocks: [
        {
          kind: 'formula',
          tex: 'Q = I\\,\\Delta t = n(e^-)\\,F \\qquad m = \\dfrac{M\\,I\\,\\Delta t}{z\\,F}',
          legend: ['$z$ : nombre d’électrons échangés par ion déposé ($z = 2$ pour $\\ce{Cu^2+}$, $z = 1$ pour $\\ce{Ag+}$) ; $F = 96\\,500$ C/mol'],
        },
        {
          kind: 'list',
          items: [
            '**galvanoplastie** : dépôt d’une couche de métal (argent, or, chrome, nickel) sur un objet placé à la cathode ;',
            '**raffinage** du cuivre ; production de l’**aluminium**, du dichlore, de la soude ;',
            '**recharge** des accumulateurs : le chargeur force la réaction inverse de la décharge.',
          ],
        },
        {
          kind: 'trap',
          wrong: '« Dans une électrolyse comme dans une pile, l’anode est le pôle négatif. »',
          why: 'Dans l’électrolyse, l’anode est reliée au pôle + du générateur. Mais dans les deux cas, l’anode est le siège de l’oxydation.',
          reflex: 'Anode = oxydation, toujours ; seul le signe change.',
        },
      ],
    },
  ],
  essentials: [
    'Électrolyse : réaction forcée par un générateur ; anode (+) oxydation, cathode (−) réduction.',
    '$\\ce{CuCl2}$ : cuivre à la cathode, dichlore à l’anode ; eau : $V(\\ce{H2}) = 2V(\\ce{O2})$.',
    '$Q = It = n(e^-)F$ ; $m = \\frac{MIt}{zF}$.',
    'Applications : galvanoplastie, raffinage, aluminium, recharge des batteries.',
  ],
  exercises: [
    {
      id: 'elec-eau',
      level: 1,
      title: 'Électrolyse de l’eau',
      statement: 'On électrolyse de l’eau acidifiée pendant 1,0 h avec un courant de 1,0 A. $V_m = 24$ L/mol.',
      parts: [
        {
          label: 'Quantité d’électrons échangés (en mol).',
          answer: { kind: 'number', value: 0.0373, tolerance: 0.0003, unit: 'mol' },
          steps: ['$Q = 1{,}0 \\times 3\\,600 = 3\\,600$ C ; $n(e^-) = \\dfrac{3\\,600}{96\\,500} \\approx 0{,}0373$ mol.'],
        },
        {
          label: 'Volume de dihydrogène (en L).',
          answer: { kind: 'number', value: 0.448, tolerance: 0.005, unit: 'L' },
          steps: ['$\\ce{2H+ + 2e- -> H2}$ : $n(\\ce{H2}) = 0{,}0187$ mol ; $V \\approx 0{,}45$ L.'],
        },
        {
          label: 'Volume de dioxygène (en L).',
          answer: { kind: 'number', value: 0.224, tolerance: 0.003, unit: 'L' },
          steps: ['Moitié du volume de dihydrogène : environ 0,22 L.'],
        },
      ],
    },
    {
      id: 'elec-cuivre',
      level: 2,
      title: 'Dépôt de cuivre',
      statement: 'On électrolyse une solution de sulfate de cuivre avec 2,0 A pendant 30 min. $M(\\ce{Cu}) = 63{,}5$ g/mol.',
      parts: [
        {
          label: 'Masse de cuivre déposée à la cathode (en g).',
          answer: { kind: 'number', value: 1.185, tolerance: 0.01, unit: 'g' },
          steps: ['$Q = 2{,}0 \\times 1\\,800 = 3\\,600$ C.', '$m = \\dfrac{63{,}5 \\times 3\\,600}{2 \\times 96\\,500} \\approx 1{,}18$ g.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Dans une électrolyse, la cathode est reliée :',
      choices: ['au pôle négatif du générateur', 'au pôle positif', 'au pont salin', 'à la terre'],
      answer: 0,
      explanation: 'Les électrons y arrivent et réduisent les cations.',
    },
    {
      question: 'L’électrolyse de l’eau donne :',
      choices: ['2 volumes de $\\ce{H2}$ pour 1 volume de $\\ce{O2}$', '1 volume de $\\ce{H2}$ pour 2 de $\\ce{O2}$', 'seulement du $\\ce{H2}$', 'de la vapeur d’eau'],
      answer: 0,
      explanation: '$\\ce{2H2O -> 2H2 + O2}$.',
    },
    {
      question: 'Pour argenter une cuillère, on la place :',
      choices: ['à la cathode', 'à l’anode', 'dans le pont salin', 'loin des électrodes'],
      answer: 0,
      explanation: 'Les ions $\\ce{Ag+}$ y sont réduits en argent.',
    },
    {
      question: 'Recharger une batterie, c’est :',
      choices: ['faire une électrolyse', 'faire fonctionner une pile', 'la refroidir', 'ajouter de l’eau'],
      answer: 0,
      explanation: 'Le chargeur force la réaction inverse de la décharge.',
    },
  ],
  applications: [
    {
      title: 'L’argenture d’un bijou',
      tagline: 'Combien de temps pour déposer l’argent ?',
      situation:
        'Un bijoutier veut déposer 0,54 g d’argent sur un bracelet placé à la cathode, dans une solution d’ions $\\ce{Ag+}$, avec un courant de 0,50 A. $M(\\ce{Ag}) = 108$ g/mol.',
      model: 'Tout le courant sert à réduire les ions argent : $\\ce{Ag+ + e- -> Ag}$.',
      questions: ['Combien de temps faut-il, en secondes ?'],
      check: { value: 965, tolerance: 0.02, unit: 's' },
      solution: ['$n(\\ce{Ag}) = \\dfrac{0{,}54}{108} = 5{,}0 \\times 10^{-3}$ mol = $n(e^-)$.', '$\\Delta t = \\dfrac{5{,}0 \\times 10^{-3} \\times 96\\,500}{0{,}50} = 965$ s, environ 16 minutes.'],
      fact: 'L’aluminium des marmites est produit par électrolyse de l’alumine fondue, ce qui demande énormément d’électricité : recycler l’aluminium économise environ 95 % de cette énergie.',
    },
  ],
};
