import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Au laboratoire du centre de santé, le technicien examine une goutte de sang au microscope pour y chercher le parasite du paludisme, long de quelques micromètres seulement. Sans instrument, l’œil n’y verrait rien. La **loupe**, le **microscope** et la **lunette** associent des lentilles pour agrandir ce qui est trop petit ou trop loin.',
  objectives: [
    'modéliser l’œil et expliquer l’accommodation et ses défauts ;',
    'expliquer le fonctionnement d’une loupe et calculer son grossissement ;',
    'décrire le microscope et la lunette astronomique ;',
    'calculer le grossissement d’un microscope et d’une lunette.',
  ],
  sections: [
    {
      title: 'L’œil',
      blocks: [
        {
          kind: 'text',
          text: 'L’œil se modélise par une lentille convergente (le **cristallin**) et un écran (la **rétine**). Pour voir net un objet proche, les muscles bombent le cristallin, ce qui augmente sa vergence : c’est l’**accommodation**. L’œil voit net entre le **punctum proximum** (environ 25 cm pour un œil normal) et le **punctum remotum** (l’infini).',
        },
        {
          kind: 'table',
          head: ['Défaut', 'Ce qui se passe', 'Correction'],
          rows: [
            ['myopie', 'œil trop convergent : vision floue de loin', 'verres **divergents**'],
            ['hypermétropie', 'œil pas assez convergent : effort pour voir de près', 'verres **convergents**'],
            ['presbytie (avec l’âge)', 'le cristallin accommode moins : lecture difficile', 'verres **convergents** pour lire'],
          ],
        },
      ],
    },
    {
      title: 'La loupe',
      blocks: [
        {
          kind: 'text',
          text: 'Une loupe est une lentille convergente de courte distance focale. Si l’objet est placé entre le foyer $F$ et la lentille, on obtient une image **virtuelle, droite et agrandie**, que l’œil regarde à travers la lentille.',
        },
        {
          kind: 'formula',
          label: 'Grossissement commercial',
          tex: 'G = \\dfrac{d_m}{f\'} = \\dfrac{0{,}25}{f\'}',
          legend: ['$d_m = 0{,}25$ m : distance minimale de vision distincte conventionnelle ; $f\'$ en m'],
        },
      ],
    },
    {
      title: 'Microscope et lunette',
      blocks: [
        {
          kind: 'list',
          items: [
            '**microscope** : un **objectif** de très courte focale donne de l’objet une image réelle très agrandie ; l’**oculaire** fonctionne comme une loupe pour regarder cette image. Grossissement : $G = |\\gamma_{objectif}| \\times G_{oculaire}$ ;',
            '**lunette astronomique** : un objectif de grande focale $f\'_1$ et un oculaire de petite focale $f\'_2$ ; pour un astre à l’infini, $G = \\dfrac{f\'_1}{f\'_2}$.',
          ],
        },
        {
          kind: 'trap',
          wrong: '« Un microscope × 400 rend l’objet 400 fois plus grand en réalité. »',
          why: 'Le grossissement compare les angles sous lesquels on voit l’objet, avec et sans instrument.',
          reflex: 'L’objet ne change pas ; c’est son image vue par l’œil qui paraît plus grande.',
        },
      ],
    },
  ],
  essentials: [
    'Œil : cristallin (lentille) + rétine (écran) ; accommodation ; myopie → divergent, hypermétropie et presbytie → convergent.',
    'Loupe : objet entre $F$ et $O$ ; $G = \\frac{0{,}25}{f\'}$.',
    'Microscope : $G = |\\gamma_{obj}| \\times G_{oc}$.',
    'Lunette : $G = \\frac{f\'_1}{f\'_2}$.',
  ],
  exercises: [
    {
      id: 'instr-calculs',
      level: 1,
      title: 'Grossissements',
      statement: 'Calcule les grossissements suivants.',
      parts: [
        {
          label: 'Loupe de distance focale 5,0 cm.',
          answer: { kind: 'number', value: 5, tolerance: 0.01, unit: '' },
          steps: ['$G = \\dfrac{0{,}25}{0{,}050} = 5$.'],
        },
        {
          label: 'Microscope : objectif de grandissement 40, oculaire × 10.',
          answer: { kind: 'number', value: 400, tolerance: 0, unit: '' },
          steps: ['$G = 40 \\times 10 = 400$.'],
        },
        {
          label: 'Lunette : objectif de 1,0 m de focale, oculaire de 2,0 cm.',
          answer: { kind: 'number', value: 50, tolerance: 0.01, unit: '' },
          steps: ['$G = \\dfrac{1{,}0}{0{,}020} = 50$.'],
        },
      ],
    },
    {
      id: 'instr-oeil',
      level: 2,
      title: 'Corriger la vue',
      statement: 'Réponds « convergents » ou « divergents ».',
      parts: [
        {
          label: 'Un élève myope voit flou le tableau. Quels verres lui faut-il ?',
          answer: { kind: 'text', display: 'divergents', accepted: ['divergents', 'divergent', 'verres divergents', 'lentilles divergentes', 'divergente', 'divergentes'] },
          steps: ['L’œil myope converge trop : un verre divergent compense.'],
        },
        {
          label: 'Une grand-mère presbyte n’arrive plus à lire. Quels verres lui faut-il ?',
          answer: { kind: 'text', display: 'convergents', accepted: ['convergents', 'convergent', 'verres convergents', 'lentilles convergentes', 'convergente', 'convergentes'] },
          steps: ['Son cristallin n’accommode plus assez : un verre convergent l’aide pour voir de près.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Pour qu’une loupe donne une image agrandie, l’objet doit être placé :',
      choices: ['entre le foyer et la lentille', 'au-delà du double de la focale', 'exactement au foyer', 'derrière la lentille'],
      answer: 0,
      explanation: 'L’image est alors virtuelle, droite et agrandie.',
    },
    {
      question: 'L’accommodation consiste à :',
      choices: ['modifier la vergence du cristallin', 'déplacer la rétine', 'ouvrir la pupille', 'fermer les yeux'],
      answer: 0,
      explanation: 'Le cristallin se bombe pour voir de près.',
    },
    {
      question: 'Le grossissement d’une lunette astronomique vaut :',
      choices: ['$\\dfrac{f\'_1}{f\'_2}$', '$f\'_1 \\times f\'_2$', '$\\dfrac{f\'_2}{f\'_1}$', '$\\dfrac{0{,}25}{f\'_1}$'],
      answer: 0,
      explanation: 'Grande focale de l’objectif, petite focale de l’oculaire.',
    },
    {
      question: 'Un myope se corrige avec des verres :',
      choices: ['divergents', 'convergents', 'teintés', 'plans'],
      answer: 0,
      explanation: 'Son œil est trop convergent.',
    },
  ],
  applications: [
    {
      title: 'Chercher le paludisme au microscope',
      tagline: 'Comment voir un parasite de quelques micromètres ?',
      situation:
        'Au laboratoire, une goutte épaisse de sang est observée au microscope avec un objectif à immersion de grandissement 100 et un oculaire × 10. Un plasmodium mesure environ 2 µm.',
      model: 'On compare la taille apparente de l’image avec la taille réelle, en multipliant par le grossissement.',
      questions: ['Quel est le grossissement du microscope ?', 'Quelle taille apparente aura le parasite, en mm ?'],
      check: { value: 2, tolerance: 0.02, unit: 'mm' },
      solution: ['$G = 100 \\times 10 = 1\\,000$.', 'Taille apparente : $2\\ \\text{µm} \\times 1\\,000 = 2$ mm : assez pour le reconnaître après coloration.'],
      fact: 'Les tests de diagnostic rapide (TDR) détectent aussi le paludisme en 15 minutes, mais la goutte épaisse permet de compter les parasites.',
    },
  ],
};
