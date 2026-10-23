// Importé du site cecp (physique-3d, chapitre « satellite ») par scripts/import-cecp.ts.
// Une nouvelle importation remplace ce fichier.
import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook: "Mouvement circulaire d'un satellite autour de la Terre dans le référentiel géocentrique.",
  objectives: [],
  sections: [
    {
      title: 'Force gravitationnelle',
      blocks: [
        {
          kind: 'text',
          text: "D'après DAVID DIARRA - Prébac Sciences Physiques, chapitre 3.",
        },
        {
          kind: 'text',
          text: "La seule force qui s'exerce sur le satellite (masse M) en orbite à l'altitude h est la force d'attraction gravitationnelle exercée par la Terre (masse M_T) :",
        },
        {
          kind: 'formula',
          tex: '\\vec{F} = G \\frac{M \\cdot M_T}{(R_T + h)^2}\\, \\vec{n}',
        },
        {
          kind: 'text',
          text: 'où $\\vec{n}$ est le vecteur unitaire dirigé du satellite vers le centre de la Terre.',
        },
      ],
    },
    {
      title: 'Vitesse linéaire',
      blocks: [
        {
          kind: 'text',
          text: 'Dans le référentiel géocentrique suppose galiléen, la relation fondamentale de la dynamique donne :',
        },
        {
          kind: 'formula',
          tex: 'G \\frac{M \\cdot M_T}{(R_T + h)^2} = M\\, a_N = M \\frac{v^2}{R_T + h}',
        },
        {
          kind: 'text',
          text: 'En simplifiant par M :',
        },
        {
          kind: 'formula',
          tex: '\\frac{G M_T}{(R_T + h)^2} = \\frac{v^2}{R_T + h}',
        },
        {
          kind: 'text',
          text: "Or le champ de gravitation à l'altitude h s'écrit $g = \\dfrac{G M_T}{(R_T + h)^2}$. On en déduit :",
        },
        {
          kind: 'formula',
          tex: 'v^2 = g\\,(R_T + h)',
        },
        {
          kind: 'text',
          text: 'En exprimant g en fonction du champ au sol $g_0 = \\dfrac{G M_T}{R_T^2}$ :',
        },
        {
          kind: 'formula',
          tex: 'v = R_T \\sqrt{\\frac{g_0}{R_T + h}}',
        },
        {
          kind: 'callout',
          variant: 'retenir',
          blocks: [
            {
              kind: 'text',
              text: "La vitesse ne dépend **pas** de la masse du satellite : elle ne dépend que de l'altitude.",
            },
          ],
        },
      ],
    },
    {
      title: 'Vitesse angulaire',
      blocks: [
        {
          kind: 'text',
          text: 'En utilisant $v = \\omega\\,(R_T + h)$ :',
        },
        {
          kind: 'formula',
          tex: '\\omega = R_T \\sqrt{\\frac{g_0}{(R_T + h)^3}}',
        },
      ],
    },
    {
      title: 'Période de révolution',
      blocks: [
        {
          kind: 'text',
          text: 'En utilisant $T = \\dfrac{2\\pi}{\\omega}$ :',
        },
        {
          kind: 'formula',
          tex: 'T = \\frac{2\\pi}{R_T} \\sqrt{\\frac{(R_T + h)^3}{g_0}}',
        },
        {
          kind: 'callout',
          variant: 'remarque',
          blocks: [
            {
              kind: 'text',
              text: "La période augmente avec l'altitude : plus le satellite est loin, plus il tourne lentement.",
            },
          ],
        },
      ],
    },
    {
      title: 'Satellite géostationnaire',
      blocks: [
        {
          kind: 'text',
          text: 'Un satellite est dit **géostationnaire** quand il reste immobile pour un observateur terrestre. Conditions :',
        },
        {
          kind: 'list',
          items: [
            'Orbite dans le plan équatorial',
            'Rotation dans le sens ouest->est',
            'Période $T = 24\\ \\text{h} = 86\\,400\\ \\text{s}$',
          ],
        },
        {
          kind: 'text',
          text: 'Altitude correspondante : $h \\approx 3{,}6 \\times 10^7\\ \\text{m} = 36\\,000\\ \\text{km}$.',
        },
      ],
    },
    {
      title: 'Troisième loi de Kepler',
      blocks: [
        {
          kind: 'text',
          text: 'En élevant la période au carré :',
        },
        {
          kind: 'formula',
          tex: 'T^2 = \\frac{4\\pi^2}{g_0 R_T^2}\\,(R_T + h)^3',
        },
        {
          kind: 'text',
          text: "En posant $R = R_T + h$ (rayon de l'orbite), on obtient :",
        },
        {
          kind: 'formula',
          tex: '\\frac{T^2}{R^3} = \\frac{4\\pi^2}{G M_T} = \\text{Cte}',
        },
        {
          kind: 'callout',
          variant: 'attention',
          blocks: [
            {
              kind: 'text',
              text: "La constante ne dépend **que** de la masse de l'astre attracteur (ici la Terre).",
            },
          ],
        },
        {
          kind: 'text',
          text: "Pour tous les satellites d'un même astre, $\\dfrac{T^2}{a^3}$ est le même, où a est le demi-grand axe de l'orbite.",
        },
      ],
    },
  ],
  essentials: [],
  exercises: [
    {
      id: 'sat-12h30',
      level: 2,
      title: 'Satellite à période 12h30mn',
      statement: 'Un satellite évolue dans le plan équatorial de la Terre à une altitude h. Il fait un tour en 12h30mn. On donne R_T = 6400 km, g0 = 9,8 m/s2.',
      given: [
        {
          label: 'T',
          value: '12h30mn = 45000 s',
        },
        {
          label: 'R_T',
          value: '6400 km = 6,4.10^6 m',
        },
        {
          label: 'g0',
          value: '9,8 m/s2',
        },
      ],
      parts: [
        {
          label: 'Quelle est la vitesse angulaire omega du satellite ?',
          answer: {
            kind: 'number',
            value: 0.00013962634,
            tolerance: 0.000005,
            unit: 'rad/s',
          },
          steps: [
            'La vitesse angulaire est liée à la période par $\\omega = \\dfrac{2\\pi}{T}$',
            'Conversion de la période : $T = 12\\ \\text{h}\\ 30\\ \\text{mn} = 12 \\times 3600 + 30 \\times 60 = 45\\,000\\ \\text{s}$',
            'Application numérique : $\\omega = \\dfrac{2\\pi}{45000} \\approx 1{,}396 \\times 10^{-4}\\ \\text{rad/s}$',
          ],
          result: '\\omega = \\frac{2\\pi}{T} \\approx 1{,}40 \\times 10^{-4}\\ \\text{rad/s}',
        },
        {
          label: "Quelle est l'altitude h du satellite (en km) ?",
          answer: {
            kind: 'number',
            value: 21008.406,
            tolerance: 500,
            unit: 'km',
          },
          steps: [
            'On part de la formule de la période : $T = \\dfrac{2\\pi}{R_T} \\sqrt{\\dfrac{(R_T + h)^3}{g_0}}$',
            'En isolant $(R_T + h)$ : $R_T + h = \\sqrt[3]{\\dfrac{T^2 R_T^2 g_0}{4\\pi^2}}$',
            'Calcul du numérateur : $T^2 R_T^2 g_0 = (45000)^2 \\times (6{,}4 \\times 10^6)^2 \\times 9{,}8 \\approx 8{,}13 \\times 10^{23}$',
            'Division par $4\\pi^2 \\approx 39{,}48$ : $\\approx 2{,}06 \\times 10^{22}$',
            '$R_T + h = \\sqrt[3]{2{,}06 \\times 10^{22}} \\approx 2{,}74 \\times 10^7\\ \\text{m}$',
            '$h \\approx 2{,}74 \\times 10^7 - 6{,}4 \\times 10^6 \\approx 2{,}1 \\times 10^7\\ \\text{m} = 21\\,000\\ \\text{km}$',
          ],
          result: 'h \\approx 2{,}1 \\times 10^7\\ \\text{m} \\approx 21\\,000\\ \\text{km}',
        },
        {
          label: 'Quelle est la vitesse linéaire v du satellite (en km/s) ?',
          answer: {
            kind: 'number',
            value: 3.8269354,
            tolerance: 0.2,
            unit: 'km/s',
          },
          steps: [
            'Vitesse linéaire : $v = R_T \\sqrt{\\dfrac{g_0}{R_T + h}}$',
            'Avec $R_T + h \\approx 2{,}74 \\times 10^7\\ \\text{m}$',
            '$v = 6{,}4 \\times 10^6 \\times \\sqrt{\\dfrac{9{,}8}{2{,}74 \\times 10^7}} \\approx 6{,}4 \\times 10^6 \\times 5{,}98 \\times 10^{-4} \\approx 3{,}83 \\times 10^3\\ \\text{m/s}$',
            'Soit $v \\approx 3{,}83\\ \\text{km/s}$',
          ],
          result: 'v \\approx 3{,}83\\ \\text{km/s}',
        },
      ],
    },
    {
      id: 'sat-geo',
      level: 2,
      title: 'Satellite géostationnaire',
      statement: 'On veut placer un satellite en orbite géostationnaire. Sa période de révolution doit être égale à la période de rotation de la Terre : T = 24h = 86400 s. On donne R_T = 6400 km et g0 = 9,8 m/s2.',
      given: [
        {
          label: 'T',
          value: '24h = 86400 s',
        },
        {
          label: 'R_T',
          value: '6400 km',
        },
        {
          label: 'g0',
          value: '9,8 m/s2',
        },
      ],
      parts: [
        {
          label: "Quelle est l'altitude h du satellite géostationnaire (en km) ?",
          answer: {
            kind: 'number',
            value: 35940.039,
            tolerance: 2000,
            unit: 'km',
          },
          steps: [
            'Formule de la période : $T = \\dfrac{2\\pi}{R_T} \\sqrt{\\dfrac{(R_T + h)^3}{g_0}}$',
            'En isolant : $R_T + h = \\sqrt[3]{\\dfrac{T^2 R_T^2 g_0}{4\\pi^2}}$',
            'Calcul : $T^2 = 86400^2 \\approx 7{,}46 \\times 10^9$',
            '$T^2 R_T^2 g_0 = 7{,}46 \\times 10^9 \\times 4{,}096 \\times 10^{13} \\times 9{,}8 \\approx 3{,}0 \\times 10^{24}$',
            '$R_T + h = \\sqrt[3]{\\dfrac{3{,}0 \\times 10^{24}}{39{,}48}} \\approx \\sqrt[3]{7{,}6 \\times 10^{22}} \\approx 4{,}23 \\times 10^7\\ \\text{m}$',
            '$h \\approx 4{,}23 \\times 10^7 - 6{,}4 \\times 10^6 \\approx 3{,}6 \\times 10^7\\ \\text{m} \\approx 36\\,000\\ \\text{km}$',
          ],
          result: 'h_{geo} \\approx 3{,}6 \\times 10^7\\ \\text{m} \\approx 36\\,000\\ \\text{km}',
        },
        {
          label: 'Quelle est la vitesse linéaire du satellite géostationnaire (en km/s) ?',
          answer: {
            kind: 'number',
            value: 3.0790546,
            tolerance: 0.1,
            unit: 'km/s',
          },
          steps: [
            '$v = R_T \\sqrt{\\dfrac{g_0}{R_T + h}}$',
            'Avec $R_T + h \\approx 4{,}23 \\times 10^7\\ \\text{m}$',
            '$v = 6{,}4 \\times 10^6 \\times \\sqrt{\\dfrac{9{,}8}{4{,}23 \\times 10^7}} \\approx 6{,}4 \\times 10^6 \\times 4{,}81 \\times 10^{-4}$',
            '$v \\approx 3{,}08 \\times 10^3\\ \\text{m/s} = 3{,}08\\ \\text{km/s}$',
          ],
          result: 'v \\approx 3{,}08\\ \\text{km/s}',
        },
      ],
    },
  ],
  quiz: [],
  applications: [
    {
      title: 'Station spatiale internationale (ISS)',
      tagline: 'Combien de temps pour faire le tour de la Terre ?',
      situation: "L'ISS est un laboratoire habite qui tourne autour de la Terre à environ 400 km d'altitude, avec des astronautes à son bord.",
      model: "Seule la force de gravitation agit : l'ISS est en chute libre permanente autour de la Terre. C'est pour cela que les astronautes flottent (impesanteur), alors que g vaut encore 8,7 m/s² à cette altitude.",
      questions: [
        "Calcule la période de révolution de l'ISS en minutes.",
      ],
      check: {
        value: 92.682764,
        tolerance: 0.03,
        unit: 'min',
      },
      solution: [
        '$T = \\dfrac{2\\pi}{R_T}\\sqrt{\\dfrac{(R_T + h)^3}{g_0}}$',
        'A.N. avec $R_T = 6{,}4 \\times 10^6$ m et $g_0 = 9{,}8$ m/s² : $T \\approx 5561$ s',
        'Soit $T \\approx 92,7$ min : environ 15,5 tours par jour.',
      ],
      fact: "L'ISS fait environ 16 tours de la Terre par jour : les astronautes voient 16 levers de soleil en 24 h. Elle est visible à l'œil nu depuis Bamako lors de certains passages, comme une étoile très brillante qui se déplace.",
    },
    {
      title: 'Satellites GPS de ton téléphone',
      tagline: 'Comment ton téléphone sait où tu es ?',
      situation: "Le GPS utilise une trentaine de satellites à environ 20 200 km d'altitude. Ton téléphone capte leurs signaux pour calculer ta position.",
      model: 'Chaque satellite GPS est un satellite en orbite circulaire : sa période est fixée par son altitude (3e loi de Kepler).',
      questions: [
        "Calcule la période de révolution d'un satellite GPS en heures.",
      ],
      check: {
        value: 11.951071,
        tolerance: 0.03,
        unit: 'h',
      },
      solution: [
        '$T = \\dfrac{2\\pi}{R_T}\\sqrt{\\dfrac{(R_T + h)^3}{g_0}}$ avec $h = 2{,}02 \\times 10^7$ m',
        'A.N. : $T \\approx 43024$ s $\\approx 12,0$ h',
        'Un satellite GPS fait donc environ 2 tours de la Terre par jour.',
      ],
      fact: "Il faut capter au moins 4 satellites pour calculer sa position. Les horloges des satellites doivent être corrigées des effets de la relativité d'Einstein : sans cela, l'erreur atteindrait environ 10 km par jour !",
    },
    {
      title: 'Satellite de télévision (géostationnaire)',
      tagline: 'Pourquoi les paraboles ne bougent jamais ?',
      situation: "Les chaînes de télévision par satellite utilisent des satellites géostationnaires : ils tournent en 24 h, dans le même sens que la Terre, au-dessus de l'équateur.",
      model: 'Sa période est égale à celle de la rotation de la Terre : vu du sol, il paraît immobile. Observe le point rouge (Bamako) : le satellite reste toujours au-dessus de la même région.',
      questions: [
        "Calcule la vitesse d'un satellite géostationnaire en km/s.",
      ],
      check: {
        value: 3.0790546,
        tolerance: 0.03,
        unit: 'km/s',
      },
      solution: [
        'Altitude géostationnaire (T = 24 h) : $h \\approx 35940$ km',
        '$v = R_T\\sqrt{\\dfrac{g_0}{R_T + h}}$',
        'A.N. : $v \\approx 3079$ m/s $\\approx 3,08$ km/s (plus de 11 000 km/h !)',
      ],
      fact: "C'est pourquoi une antenne parabolique est fixe. Au Mali (hémisphère nord), les paraboles sont orientées vers le sud, car les satellites géostationnaires sont au-dessus de l'équateur.",
    },
    {
      title: "Satellite d'observation de la Terre",
      tagline: 'Combien de tours par jour pour photographier le Sahel ?',
      situation: "Les satellites d'observation (comme Sentinel-2, utilisé pour suivre les cultures et l'avancée du désert au Sahel) tournent à environ 786 km d'altitude.",
      model: "Orbite circulaire basse : plus le satellite est bas, plus il va vite et plus sa période est courte. On utilise la même formule que pour l'ISS.",
      questions: [
        'Calcule la période de révolution en minutes.',
      ],
      check: {
        value: 100.68538,
        tolerance: 0.03,
        unit: 'min',
      },
      solution: [
        '$T = \\dfrac{2\\pi}{R_T}\\sqrt{\\dfrac{(R_T + h)^3}{g_0}}$',
        'A.N. : $T \\approx 6041$ s $\\approx 100,7$ min, soit 14,3 tours par jour.',
      ],
      fact: 'Ces satellites passent au-dessus des pôles : la Terre tourne sous leur orbite et ils photographient toute sa surface en quelques jours, toujours à la même heure locale.',
    },
    {
      title: 'Internet par satellite',
      tagline: 'À quelle vitesse filent ces satellites ?',
      situation: "Les constellations d'internet par satellite (comme Starlink) placent des milliers de petits satellites à environ 550 km d'altitude, pour apporter internet jusque dans les villages isolés.",
      model: 'Satellite en orbite circulaire : $v = R_T\\sqrt{\\dfrac{g_0}{R_T + h}}$. La vitesse ne dépend pas de la masse du satellite.',
      questions: [
        'Calcule la vitesse du satellite en km/h.',
      ],
      check: {
        value: 27359.182,
        tolerance: 0.03,
        unit: 'km/h',
      },
      solution: [
        '$v = R_T\\sqrt{\\dfrac{g_0}{R_T + h}}$',
        'A.N. : $v \\approx 7600$ m/s, soit 27359 km/h (on multiplie par 3,6).',
      ],
      fact: "Plus bas qu'un satellite géostationnaire (36 000 km), le signal fait un trajet beaucoup plus court : le délai de réponse (latence) passe d'environ 600 ms à quelques dizaines de ms.",
    },
    {
      title: 'Le télescope spatial Hubble',
      tagline: 'Y a-t-il encore de la pesanteur là-haut ?',
      situation: "Le télescope Hubble observe l'Univers depuis 1990, en orbite à environ 540 km d'altitude, au-dessus de l'atmosphère qui brouille les images.",
      model: "Le champ de gravitation diminue avec l'altitude : $g = g_0\\left(\\dfrac{R_T}{R_T + h}\\right)^2$. Hubble n'est pas « sans pesanteur » : il est en chute libre permanente.",
      questions: [
        "Calcule l'intensité du champ de gravitation à l'altitude de Hubble.",
      ],
      check: {
        value: 8.3342607,
        tolerance: 0.02,
        unit: 'm/s²',
      },
      solution: [
        '$g = g_0\\left(\\dfrac{R_T}{R_T + h}\\right)^2$ avec $g_0 = 9{,}8$ m/s² et $R_T = 6{,}4\\times10^6$ m',
        'A.N. : $g \\approx 8,33$ m/s², soit 85 % de sa valeur au sol.',
      ],
      fact: "Hubble a permis de préciser l'âge de l'Univers (environ 13,8 milliards d'années). Son successeur, le télescope James Webb, est placé beaucoup plus loin, à 1,5 million de km.",
    },
  ],
};
