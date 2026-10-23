import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Un vieil homme fait un accident vasculaire cérébral (AVC) : le côté droit de son corps est paralysé, alors que la lésion est dans la moitié **gauche** de son cerveau. Quelques mois de rééducation plus tard, il remarche. Ces deux faits révèlent comment le cerveau commande nos mouvements volontaires, et sa capacité à se réorganiser.',
  objectives: [
    'localiser les aires motrices du cortex cérébral ;',
    'décrire le trajet de la commande motrice volontaire (voie pyramidale) ;',
    'expliquer le rôle intégrateur du motoneurone médullaire ;',
    'définir la plasticité cérébrale.',
  ],
  sections: [
    {
      title: 'Les aires motrices',
      blocks: [
        {
          kind: 'text',
          text: 'Le mouvement volontaire est préparé dans les aires **prémotrices** et commandé par l’**aire motrice primaire**, une bande du cortex située en avant du sillon central (circonvolution frontale ascendante).',
        },
        {
          kind: 'rule',
          text: 'Chaque partie du corps est commandée par une zone précise de l’aire motrice (**somatotopie**) ; la place occupée dépend de la finesse des mouvements, pas de la taille de l’organe : la main et le visage ont de très grandes zones.',
        },
      ],
    },
    {
      title: 'De l’ordre au mouvement',
      blocks: [
        {
          kind: 'formula',
          tex: '\\text{aire motrice} \\rightarrow \\text{voie pyramidale (croisement dans le bulbe)} \\rightarrow \\text{motoneurone de la moelle} \\rightarrow \\text{muscle}',
        },
        {
          kind: 'rule',
          text: 'Les fibres de la voie pyramidale **se croisent** : l’hémisphère gauche commande la moitié droite du corps, et inversement.',
        },
        {
          kind: 'text',
          text: 'Le **motoneurone** de la moelle reçoit à la fois les ordres venus du cerveau et des messages des circuits réflexes, excitateurs ou inhibiteurs. Il les additionne : c’est la **voie finale commune**, qui intègre toutes les informations avant d’envoyer (ou non) son message au muscle.',
        },
      ],
    },
    {
      title: 'La plasticité cérébrale',
      blocks: [
        {
          kind: 'definition',
          term: 'Plasticité cérébrale',
          text: 'capacité du cerveau à modifier ses connexions tout au long de la vie, sous l’effet de l’apprentissage, de l’entraînement ou après une lésion.',
        },
        {
          kind: 'text',
          text: 'Les zones du cortex qui commandent les doigts d’un joueur de kora ou d’un tailleur s’agrandissent avec l’entraînement. Après un AVC, des neurones voisins de la zone détruite peuvent reprendre peu à peu ses fonctions : c’est le but de la rééducation.',
        },
        {
          kind: 'trap',
          wrong: '« Une lésion du cerveau gauche paralyse le côté gauche. »',
          why: 'La commande motrice croise la ligne médiane dans le bulbe rachidien.',
          reflex: 'Lésion d’un hémisphère → paralysie du côté opposé.',
        },
      ],
    },
  ],
  essentials: [
    'Aire motrice primaire en avant du sillon central ; somatotopie (main et visage très représentés).',
    'Voie pyramidale croisée : hémisphère gauche → côté droit.',
    'Motoneurone médullaire : voie finale commune, intègre messages cérébraux et réflexes.',
    'Plasticité : le cerveau se réorganise avec l’apprentissage et après une lésion.',
  ],
  exercises: [
    {
      id: 'motri-avc',
      level: 1,
      title: 'Localiser une lésion',
      statement: 'Réponds « droit » ou « gauche ».',
      parts: [
        {
          label: 'Une lésion de l’aire motrice gauche paralyse le côté…',
          answer: { kind: 'text', display: 'droit', accepted: ['droit', 'côté droit', 'cote droit', 'le côté droit', 'droite'] },
          steps: ['La voie pyramidale se croise dans le bulbe.'],
        },
        {
          label: 'Un patient a la main gauche paralysée : la lésion est dans l’hémisphère…',
          answer: { kind: 'text', display: 'droit', accepted: ['droit', 'hémisphère droit', 'hemisphere droit', 'droite'] },
          steps: ['Raisonnement inverse : main gauche ← hémisphère droit.'],
        },
      ],
    },
    {
      id: 'motri-reaction',
      level: 2,
      title: 'Temps de réaction',
      statement: 'Un conducteur roule à 90 km/h. Son temps de réaction (voir, décider, commander le pied) est de 0,25 s.',
      parts: [
        {
          label: 'Quelle distance parcourt-il pendant ce temps (en m) ?',
          answer: { kind: 'number', value: 6.25, tolerance: 0.05, unit: 'm' },
          steps: ['90 km/h = 25 m/s ; $25 \\times 0{,}25 = 6{,}25$ m.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'L’aire motrice primaire se trouve :',
      choices: ['en avant du sillon central', 'dans le cervelet', 'dans la moelle', 'à l’arrière du crâne'],
      answer: 0,
      explanation: 'Dans le lobe frontal, juste devant le sillon central.',
    },
    {
      question: 'Dans l’aire motrice, la main occupe une grande zone parce que :',
      choices: ['ses mouvements sont très précis', 'elle est très grosse', 'elle est près du cerveau', 'elle contient beaucoup d’os'],
      answer: 0,
      explanation: 'La surface correspond à la finesse de la commande.',
    },
    {
      question: 'La voie finale commune de la commande motrice est :',
      choices: ['le motoneurone médullaire', 'le cervelet', 'l’œil', 'la fibre musculaire'],
      answer: 0,
      explanation: 'Tous les ordres passent par lui.',
    },
    {
      question: 'La plasticité cérébrale explique :',
      choices: ['les progrès par l’entraînement et la récupération après un AVC', 'la loi du tout ou rien', 'le croisement de la voie pyramidale', 'la myéline'],
      answer: 0,
      explanation: 'Les connexions se modifient avec l’usage.',
    },
  ],
  applications: [
    {
      title: 'L’alcool au volant',
      tagline: 'Combien de mètres de plus avant de freiner ?',
      situation:
        'À jeun, un conducteur réagit en 0,75 s. Après avoir bu de l’alcool, son temps de réaction double. Il roule à 72 km/h quand un enfant traverse.',
      model: 'On ne compte que la distance parcourue avant d’appuyer sur le frein.',
      questions: ['Combien de mètres supplémentaires parcourt-il avant de freiner, à cause de l’alcool ?'],
      check: { value: 15, tolerance: 0.02, unit: 'm' },
      solution: ['72 km/h = 20 m/s.', 'À jeun : $20 \\times 0{,}75 = 15$ m ; après l’alcool : $20 \\times 1{,}5 = 30$ m.', 'Il parcourt 15 m de plus avant même de commencer à freiner.'],
      fact: 'L’alcool ralentit la transmission synaptique et perturbe le cervelet, qui coordonne les mouvements.',
    },
  ],
};
