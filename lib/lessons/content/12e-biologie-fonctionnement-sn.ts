import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Le message nerveux n’est pas un courant qui circule dans un fil. C’est une petite inversion de tension électrique, de 0,1 V à peine, qui se propage le long de la fibre jusqu’à 100 m/s, puis devient un message chimique pour franchir l’espace entre deux neurones. Le curare des chasseurs d’Amazonie, certains venins et de nombreux médicaments agissent justement là.',
  objectives: [
    'décrire le potentiel de repos et le potentiel d’action ;',
    'expliquer le codage du message nerveux en fréquence ;',
    'calculer une vitesse de propagation ;',
    'décrire le fonctionnement d’une synapse chimique.',
  ],
  sections: [
    {
      title: 'Potentiel de repos et potentiel d’action',
      blocks: [
        {
          kind: 'text',
          text: 'Au repos, l’intérieur d’un neurone est négatif par rapport à l’extérieur : c’est le **potentiel de repos**, environ −70 mV. Il est dû à la répartition inégale des ions $\\ce{Na+}$ (plus nombreux dehors) et $\\ce{K+}$ (plus nombreux dedans), entretenue par la pompe $\\ce{Na+}$/$\\ce{K+}$.',
        },
        {
          kind: 'table',
          head: ['Phase du potentiel d’action', 'Tension', 'Mouvement d’ions'],
          rows: [
            ['dépolarisation', 'de −70 mV à environ +30 mV', 'entrée rapide de $\\ce{Na+}$'],
            ['repolarisation', 'retour vers −70 mV', 'sortie de $\\ce{K+}$'],
            ['hyperpolarisation', 'brièvement sous −70 mV', 'sortie de $\\ce{K+}$ qui se prolonge'],
          ],
        },
        {
          kind: 'rule',
          text: 'Le potentiel d’action obéit à la loi du **tout ou rien** : sous le seuil, rien ; au-dessus, un potentiel d’action d’amplitude toujours identique (environ 100 mV). L’intensité d’une stimulation est donc codée par la **fréquence** des potentiels d’action, pas par leur amplitude.',
        },
      ],
    },
    {
      title: 'La propagation',
      blocks: [
        {
          kind: 'formula',
          tex: 'v = \\dfrac{d}{\\Delta t}',
          legend: ['$d$ : distance entre deux électrodes réceptrices ; $\\Delta t$ : décalage entre les deux enregistrements'],
        },
        {
          kind: 'text',
          text: 'Sur une fibre **myélinisée**, le potentiel d’action saute d’un nœud de Ranvier au suivant (conduction **saltatoire**) : jusqu’à 100 m/s. Sur une fibre sans myéline, il progresse de proche en proche, à environ 1 m/s.',
        },
      ],
    },
    {
      title: 'La synapse',
      blocks: [
        { kind: 'figure', id: 'synapse', caption: "Une synapse chimique." },
        {
          kind: 'list',
          items: [
            'le potentiel d’action arrive dans la terminaison de l’axone (neurone **présynaptique**) ;',
            'des vésicules libèrent par exocytose un **neurotransmetteur** (par exemple l’acétylcholine) dans la fente synaptique ;',
            'le neurotransmetteur se fixe sur des **récepteurs** de la membrane **postsynaptique** et modifie sa polarisation ;',
            'il est ensuite détruit ou recapturé : le message s’arrête.',
          ],
        },
        {
          kind: 'text',
          text: 'Une synapse **excitatrice** dépolarise le neurone postsynaptique (PPSE) ; une synapse **inhibitrice** l’hyperpolarise (PPSI). Le neurone **additionne** les messages reçus (sommation) et n’émet un potentiel d’action que si le seuil est atteint : il **intègre** les informations.',
        },
        {
          kind: 'trap',
          wrong: '« Le message nerveux traverse la synapse sous forme électrique. »',
          why: 'Dans une synapse chimique, la fente sépare les deux neurones : le message devient chimique (neurotransmetteur).',
          reflex: 'Électrique le long des fibres, chimique dans la synapse ; c’est là qu’agissent drogues et médicaments.',
        },
        { kind: 'photo', id: 'jonction-neuromusculaire', caption: 'Synapse entre un nerf et un muscle : on voit les vésicules de neurotransmetteur.' },
      ],
    },
  ],
  essentials: [
    'Potentiel de repos ≈ −70 mV ; potentiel d’action : entrée de $\\ce{Na+}$ puis sortie de $\\ce{K+}$, amplitude ≈ 100 mV.',
    'Tout ou rien ; intensité codée en fréquence de potentiels d’action.',
    '$v = d / \\Delta t$ ; conduction saltatoire rapide sur les fibres myélinisées.',
    'Synapse : neurotransmetteur, récepteurs, PPSE/PPSI, sommation et intégration.',
  ],
  simulationTasks: [
    "trouve l’intensité minimale qui déclenche des potentiels d’action (le seuil) ;",
    "augmente l’intensité : l’amplitude change-t-elle ? et la fréquence ?",
  ],
  exercises: [
    {
      id: 'pa-amplitude',
      level: 1,
      title: 'Lire un potentiel d’action',
      statement: 'Un enregistrement montre un potentiel de repos de −70 mV et un sommet du potentiel d’action à +30 mV.',
      parts: [
        {
          label: 'Amplitude du potentiel d’action (en mV).',
          answer: { kind: 'number', value: 100, tolerance: 0, unit: 'mV' },
          steps: ['$30 - (-70) = 100$ mV.'],
        },
        {
          label: 'On compte 20 potentiels d’action en 50 ms. Quelle est leur fréquence (en Hz) ?',
          answer: { kind: 'number', value: 400, tolerance: 0, unit: 'Hz' },
          steps: ['$\\dfrac{20}{0{,}050} = 400$ Hz : une stimulation plus forte donnerait une fréquence plus élevée.'],
        },
      ],
    },
    {
      id: 'pa-vitesse',
      level: 2,
      title: 'Vitesse de propagation',
      statement: 'Deux électrodes réceptrices sont placées sur une fibre à 6,0 cm l’une de l’autre ; le potentiel d’action arrive sur la seconde 1,2 ms après la première.',
      parts: [
        {
          label: 'Calcule la vitesse de propagation (en m/s).',
          answer: { kind: 'number', value: 50, tolerance: 0.5, unit: 'm/s' },
          steps: ['$v = \\dfrac{0{,}060}{1{,}2 \\times 10^{-3}} = 50$ m/s.'],
        },
        {
          label: 'La fibre est-elle « myélinisée » ou « non myélinisée » ?',
          answer: { kind: 'text', display: 'myélinisée', accepted: ['myélinisée', 'myelinisee', 'myélinisé', 'myelinise'] },
          steps: ['50 m/s est une vitesse élevée, typique d’une conduction saltatoire.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'La dépolarisation du potentiel d’action est due :',
      choices: ['à l’entrée d’ions $\\ce{Na+}$', 'à la sortie d’ions $\\ce{Na+}$', 'à l’entrée d’ions $\\ce{K+}$', 'à l’entrée d’eau'],
      answer: 0,
      explanation: 'Les canaux sodium s’ouvrent et les ions $\\ce{Na+}$ entrent.',
    },
    {
      question: 'Une stimulation plus forte provoque :',
      choices: ['des potentiels d’action plus fréquents', 'des potentiels d’action plus grands', 'un potentiel de repos plus négatif', 'aucun changement'],
      answer: 0,
      explanation: 'Loi du tout ou rien : l’amplitude est fixe, la fréquence varie.',
    },
    {
      question: 'Le neurotransmetteur est libéré par :',
      choices: ['exocytose', 'diffusion à travers l’axone', 'phagocytose', 'osmose'],
      answer: 0,
      explanation: 'Les vésicules fusionnent avec la membrane présynaptique.',
    },
    {
      question: 'Le curare paralyse les muscles car il :',
      choices: ['bloque les récepteurs à l’acétylcholine', 'détruit les axones', 'augmente la myéline', 'arrête le cœur directement'],
      answer: 0,
      explanation: 'L’acétylcholine ne peut plus agir sur la fibre musculaire.',
    },
  ],
  applications: [
    {
      title: 'La main sur la marmite',
      tagline: 'En combien de temps la main se retire-t-elle ?',
      situation:
        'Aminata touche une marmite brûlante. Le message parcourt environ 1 m de fibre sensitive jusqu’à la moelle, puis 1 m de fibre motrice jusqu’aux muscles du bras, à 50 m/s.',
      model: 'On ne compte que le temps de propagation dans les fibres, pas le temps de passage des synapses ni la contraction.',
      questions: ['Combien de temps mettent les messages pour faire l’aller et le retour, en ms ?'],
      check: { value: 40, tolerance: 0.02, unit: 'ms' },
      solution: ['Distance totale : 2 m.', '$\\Delta t = \\dfrac{2}{50} = 0{,}040$ s, soit 40 ms : bien moins que le temps nécessaire pour décider consciemment.'],
      fact: 'L’alcool et certaines drogues agissent sur les synapses : ils ralentissent les réactions et augmentent le risque d’accident.',
    },
  ],
};
