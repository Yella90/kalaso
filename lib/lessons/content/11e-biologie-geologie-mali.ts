import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Le Mali est l’un des premiers producteurs d’or d’Afrique. Ses falaises de Bandiagara sont faites de grès, ses plateaux du Mandingue aussi ; dans le nord, le sel de Taoudéni est exploité depuis des siècles, et de nouvelles mines de lithium ont ouvert dans le sud. Toutes ces richesses dépendent de l’histoire géologique du pays et des **roches** qui le composent.',
  objectives: [
    'classer les roches en magmatiques, sédimentaires et métamorphiques ;',
    'décrire les grands ensembles géologiques du Mali ;',
    'citer les principales ressources du sous-sol malien ;',
    'expliquer l’origine des eaux souterraines et les enjeux de leur exploitation.',
  ],
  sections: [
    {
      title: 'Les trois familles de roches',
      blocks: [
        {
          kind: 'table',
          head: ['Famille', 'Formation', 'Exemples au Mali'],
          rows: [
            ['magmatiques', 'refroidissement d’un magma, en profondeur (granite) ou en surface (basalte)', 'granites de l’Adrar des Ifoghas et du sud du pays'],
            ['sédimentaires', 'dépôt et consolidation de débris ou de restes d’êtres vivants', 'grès des falaises de Bandiagara et du plateau Mandingue, calcaires, argiles, sel gemme de Taoudéni'],
            ['métamorphiques', 'transformation d’une roche par la chaleur et la pression, sans fusion', 'schistes et quartzites du socle ancien'],
          ],
        },
        {
          kind: 'text',
          text: 'Dans les régions tropicales, l’altération des roches donne la **latérite**, sol rouge riche en fer et en aluminium, parfois durcie en cuirasse : on l’utilise pour les pistes et les briques.',
        },
        { kind: 'photo', id: 'falaise-bandiagara', caption: 'La falaise de Bandiagara est faite de grès, une roche sédimentaire.' },
      ],
    },
    {
      title: 'Les grands ensembles et les ressources',
      blocks: [
        {
          kind: 'text',
          text: 'Le sud-ouest et le nord-est du Mali appartiennent à un **socle très ancien** (plus de 2 milliards d’années), riche en minerais. Le reste du pays est couvert de **bassins sédimentaires** plus récents (bassin de Taoudéni, delta intérieur du Niger).',
        },
        {
          kind: 'table',
          head: ['Ressource', 'Où'],
          rows: [
            ['or', 'mines industrielles (Sadiola, Loulo, Syama, Morila…) et orpaillage dans le sud et l’ouest'],
            ['phosphates', 'vallée du Tilemsi : engrais naturels'],
            ['sel gemme', 'Taoudéni'],
            ['lithium', 'nouvelles mines du sud (Goulamina, Bougouni) : batteries'],
            ['autres', 'fer, bauxite, manganèse, calcaire pour le ciment'],
          ],
        },
      ],
    },
    {
      title: 'Les eaux souterraines',
      blocks: [
        {
          kind: 'text',
          text: 'Une partie de l’eau de pluie s’infiltre et remplit les pores et les fissures des roches perméables (grès, sables, roches fracturées) : c’est une **nappe d’eau souterraine** (aquifère). Les puits et forages y puisent l’eau potable de la plupart des villages.',
        },
        {
          kind: 'callout',
          variant: 'attention',
          blocks: [
            {
              kind: 'text',
              text: 'Si l’on pompe plus que ce que la pluie recharge, la nappe baisse et les puits tarissent. Les latrines trop proches, les déchets et le mercure de l’orpaillage peuvent aussi polluer les nappes et les rivières.',
            },
          ],
        },
        {
          kind: 'trap',
          wrong: '« L’eau des nappes est inépuisable. »',
          why: 'Certaines nappes profondes se sont remplies il y a des milliers d’années et se rechargent très lentement.',
          reflex: 'Une nappe est une réserve : on ne doit pas y puiser plus que sa recharge.',
        },
      ],
    },
  ],
  essentials: [
    'Roches magmatiques (granite, basalte), sédimentaires (grès, calcaire, sel), métamorphiques (schiste, quartzite).',
    'Mali : socle ancien riche en minerais et bassins sédimentaires.',
    'Ressources : or, phosphates, sel, lithium, fer, bauxite, calcaire.',
    'Nappes souterraines : réserves à protéger et à ne pas surexploiter.',
  ],
  exercises: [
    {
      id: 'geo-or',
      level: 1,
      title: 'La teneur en or',
      statement: 'Le minerai d’une mine d’or contient 2 g d’or par tonne de roche.',
      parts: [
        {
          label: 'Combien de tonnes de minerai faut-il traiter pour obtenir 1 kg d’or ?',
          answer: { kind: 'number', value: 500, tolerance: 0, unit: 't' },
          steps: ['$\\dfrac{1\\,000\\ \\text{g}}{2\\ \\text{g/t}} = 500$ t.'],
        },
        {
          label: 'Une mine produit 10 t d’or par an. Quelle masse de roche traite-t-elle (en millions de tonnes) ?',
          answer: { kind: 'number', value: 5, tolerance: 0.01, unit: 'Mt' },
          steps: ['$10\\,000\\ \\text{kg} \\times 500\\ \\text{t/kg} = 5 \\times 10^6$ t.'],
        },
      ],
    },
    {
      id: 'geo-roches',
      level: 2,
      title: 'Classer les roches',
      statement: 'Réponds « magmatique », « sédimentaire » ou « métamorphique ».',
      parts: [
        {
          label: 'Le grès des falaises de Bandiagara.',
          answer: { kind: 'text', display: 'sédimentaire', accepted: ['sédimentaire', 'sedimentaire', 'roche sédimentaire'] },
          steps: ['Formé de grains de sable cimentés.'],
        },
        {
          label: 'Le granite.',
          answer: { kind: 'text', display: 'magmatique', accepted: ['magmatique', 'roche magmatique', 'plutonique'] },
          steps: ['Magma refroidi lentement en profondeur.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Le sel de Taoudéni est une roche :',
      choices: ['sédimentaire', 'magmatique', 'métamorphique', 'volcanique'],
      answer: 0,
      explanation: 'Il provient de l’évaporation d’anciens lacs salés.',
    },
    {
      question: 'Les phosphates du Tilemsi servent surtout à :',
      choices: ['fabriquer des engrais', 'produire de l’électricité', 'faire des bijoux', 'construire des routes'],
      answer: 0,
      explanation: 'Le phosphore est indispensable aux cultures.',
    },
    {
      question: 'Une nappe souterraine se forme surtout dans :',
      choices: ['les roches perméables (sables, grès fracturés)', 'les argiles imperméables', 'le granite non fracturé', 'le noyau terrestre'],
      answer: 0,
      explanation: 'L’eau remplit les pores et les fissures.',
    },
    {
      question: 'La latérite est :',
      choices: ['un sol rouge issu de l’altération des roches', 'une roche volcanique', 'un minerai d’or', 'un type de sable du désert'],
      answer: 0,
      explanation: 'Riche en oxydes de fer, d’où sa couleur.',
    },
  ],
  applications: [
    {
      title: 'Le forage du village',
      tagline: 'Combien d’habitants une pompe peut-elle desservir ?',
      situation:
        'Un forage équipé d’une pompe à motricité humaine fournit environ 1 m³ d’eau par heure, pendant 10 heures par jour. On compte 20 litres d’eau par personne et par jour.',
      model: 'La nappe se recharge suffisamment ; on ne tient pas compte des animaux.',
      questions: ['Combien d’habitants ce forage peut-il desservir ?'],
      check: { value: 500, tolerance: 0, unit: 'habitants' },
      solution: ['Production : $1 \\times 10 = 10$ m³ $= 10\\,000$ L par jour.', '$\\dfrac{10\\,000}{20} = 500$ habitants.'],
      fact: 'L’eau des forages profonds est en général plus saine que celle des puits ouverts, mieux protégée des pollutions de surface.',
    },
  ],
};
