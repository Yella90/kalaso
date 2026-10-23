// Importé du site cecp (physique-3d, chapitre « projectile ») par scripts/import-cecp.ts.
// Une nouvelle importation remplace ce fichier.
import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook: "Étude du mouvement d'un solide lanceé avec une vitesse initiale v0 et un angle alpha, en négligeant la résistance de l'air.",
  objectives: [],
  sections: [
    {
      title: 'Forces appliquées',
      blocks: [
        {
          kind: 'text',
          text: "D'après DAVID DIARRA — Prébac Sciences Physiques, chapitre 2.",
        },
        {
          kind: 'text',
          text: "On néglige la résistance de l'air. La seule force qui s'exerce sur le projectile en son centre d'inertie G est son poids :",
        },
        {
          kind: 'formula',
          tex: '\\vec{P} = m \\vec{g}',
        },
        {
          kind: 'text',
          text: "La relation fondamentale de la dynamique s'écrit donc :",
        },
        {
          kind: 'formula',
          tex: '\\vec{P} = m\\vec{a} \\quad\\Longrightarrow\\quad m\\vec{g} = m\\vec{a} \\quad\\Longrightarrow\\quad \\vec{a} = \\vec{g}',
        },
        {
          kind: 'callout',
          variant: 'retenir',
          blocks: [
            {
              kind: 'text',
              text: "L'accélération est **constante**, dirigée vers le bas, de norme g.",
            },
          ],
        },
      ],
    },
    {
      title: 'Équations paramétriques',
      blocks: [
        {
          kind: 'text',
          text: "Dans le repère cartésien $(O, \\vec{i}, \\vec{j})$ avec l'origine au point de lancement, l'accélération a pour coordonnées :",
        },
        {
          kind: 'formula',
          tex: 'a_x = 0 \\qquad a_y = -g',
        },
        {
          kind: 'text',
          text: 'La vitesse initiale a pour coordonnées :',
        },
        {
          kind: 'formula',
          tex: 'v_{0x} = v_0 \\cos\\alpha \\qquad v_{0y} = v_0 \\sin\\alpha',
        },
        {
          kind: 'text',
          text: 'En intégrant une première fois (vitesse), puis une seconde fois (position), on obtient les **équations horaires** :',
        },
        {
          kind: 'formula',
          tex: 'x(t) = (v_0 \\cos\\alpha)\\, t',
        },
        {
          kind: 'formula',
          tex: 'y(t) = -\\frac{1}{2} g t^2 + (v_0 \\sin\\alpha)\\, t + h_0',
        },
        {
          kind: 'callout',
          variant: 'remarque',
          blocks: [
            {
              kind: 'text',
              text: 'Le mouvement est la **composition** :',
            },
            {
              kind: 'list',
              items: [
                "d'un mouvement **rectiligne uniforme** suivant Ox",
                "d'un mouvement **rectiligne uniformément varie** suivant Oy",
              ],
            },
          ],
        },
      ],
    },
    {
      title: 'Équation de la trajectoire',
      blocks: [
        {
          kind: 'text',
          text: 'On élimine le temps t entre les deux équations horaires. De la première :',
        },
        {
          kind: 'formula',
          tex: 't = \\frac{x}{v_0 \\cos\\alpha}',
        },
        {
          kind: 'text',
          text: "En reportant dans l'expression de y(t) :",
        },
        {
          kind: 'formula',
          tex: 'y = -\\frac{g}{2 v_0^2 \\cos^2\\alpha}\\, x^2 + (\\tan\\alpha)\\, x + h_0',
        },
        {
          kind: 'callout',
          variant: 'retenir',
          blocks: [
            {
              kind: 'text',
              text: 'La trajectoire est une **parabole** dans le plan vertical.',
            },
          ],
        },
      ],
    },
    {
      title: 'Portée et flèche',
      blocks: [
        {
          kind: 'text',
          text: '**Portée** (distance horizontale au point de chute, pour h0 = 0) :',
        },
        {
          kind: 'formula',
          tex: 'd = \\frac{v_0^2 \\sin(2\\alpha)}{g}',
        },
        {
          kind: 'callout',
          variant: 'attention',
          blocks: [
            {
              kind: 'text',
              text: 'La portée est **maximale** pour alpha = 45° (car sin(2·45°) = 1).',
            },
          ],
        },
        {
          kind: 'text',
          text: '**Flèche** (hauteur maximale atteinte) :',
        },
        {
          kind: 'formula',
          tex: 'h = h_0 + \\frac{v_0^2 \\sin^2\\alpha}{2 g}',
        },
        {
          kind: 'text',
          text: '**Temps de vol** (retour au sol) :',
        },
        {
          kind: 'formula',
          tex: 'T = \\frac{v_0 \\sin\\alpha + \\sqrt{v_0^2 \\sin^2\\alpha + 2 g h_0}}{g}',
        },
        {
          kind: 'text',
          text: 'Dans le cas particulier $h_0 = 0$ :',
        },
        {
          kind: 'formula',
          tex: 'T = \\frac{2 v_0 \\sin\\alpha}{g}',
        },
      ],
    },
    {
      title: 'Vitesse en un point',
      blocks: [
        {
          kind: 'text',
          text: "Les composantes de la vitesse à l'instant t sont :",
        },
        {
          kind: 'formula',
          tex: 'v_x = v_0 \\cos\\alpha \\qquad v_y = -g t + v_0 \\sin\\alpha',
        },
        {
          kind: 'text',
          text: 'La norme de la vitesse :',
        },
        {
          kind: 'formula',
          tex: 'v = \\sqrt{v_x^2 + v_y^2}',
        },
        {
          kind: 'callout',
          variant: 'remarque',
          blocks: [
            {
              kind: 'text',
              text: "Au **sommet S** de la trajectoire, la vitesse verticale s'annule : v_y = 0. La vitesse se réduit alors à sa composante horizontale :",
            },
            {
              kind: 'formula',
              tex: 'v_S = v_x = v_0 \\cos\\alpha',
            },
          ],
        },
      ],
    },
  ],
  essentials: [],
  exercises: [
    {
      id: 'golfeur',
      level: 2,
      title: "Frappe d'un golfeur",
      statement: "Un golfeur frappe une balle avec une vitesse initiale v0 faisant un angle alpha = 40 degrés avec l'horizontale. La norme de la vitesse initiale est v0 = 144 km/h. La balle part du sol (h0 = 0). On prendra g = 10 m/s2.",
      given: [
        {
          label: 'v0',
          value: '144 km/h = 40 m/s',
        },
        {
          label: 'alpha',
          value: '40 degrés',
        },
        {
          label: 'g',
          value: '10 m/s2',
        },
        {
          label: 'h0',
          value: '0 m',
        },
      ],
      parts: [
        {
          label: 'Quelle est la portée d (distance horizontale au point de chute) ?',
          answer: {
            kind: 'number',
            value: 157.56924,
            tolerance: 1.5,
            unit: 'm',
          },
          steps: [
            'Formule de la portée dans le cas $h_0 = 0$ : $d = \\dfrac{v_0^2 \\sin(2\\alpha)}{g}$',
            'Conversion de $v_0$ : $144\\ \\text{km/h} = \\dfrac{144}{3{,}6} = 40\\ \\text{m/s}$',
            'Calcul de $\\sin(2 \\times 40°) = \\sin(80°) \\approx 0{,}9848$',
            'Application numérique : $d = \\dfrac{40^2 \\times 0{,}9848}{10} \\approx 157{,}6\\ \\text{m}$',
          ],
          result: 'd = \\frac{v_0^2 \\sin(2\\alpha)}{g} \\approx 157{,}6\\ \\text{m}',
        },
        {
          label: 'Quelle est la flèche h (hauteur maximale atteinte) ?',
          answer: {
            kind: 'number',
            value: 33.054073,
            tolerance: 0.5,
            unit: 'm',
          },
          steps: [
            'Formule de la flèche : $h = \\dfrac{v_0^2 \\sin^2\\alpha}{2g}$',
            '$\\sin(40°) \\approx 0{,}6428$, donc $\\sin^2(40°) \\approx 0{,}4132$',
            'Application numérique : $h = \\dfrac{40^2 \\times 0{,}4132}{20} \\approx 33{,}1\\ \\text{m}$',
          ],
          result: 'h = \\frac{v_0^2 \\sin^2\\alpha}{2g} \\approx 33{,}1\\ \\text{m}',
        },
        {
          label: 'Quel est le temps de vol T ?',
          answer: {
            kind: 'number',
            value: 5.1423009,
            tolerance: 0.1,
            unit: 's',
          },
          steps: [
            'Formule du temps de vol dans le cas $h_0 = 0$ : $T = \\dfrac{2 v_0 \\sin\\alpha}{g}$',
            'Avec $\\sin(40°) \\approx 0{,}6428$',
            'Application numérique : $T = \\dfrac{2 \\times 40 \\times 0{,}6428}{10} \\approx 5{,}14\\ \\text{s}$',
          ],
          result: 'T = \\frac{2 v_0 \\sin\\alpha}{g} \\approx 5{,}14\\ \\text{s}',
        },
      ],
    },
    {
      id: 'tennis',
      level: 2,
      title: 'Tentative de lob au tennis',
      statement: "Un joueur de tennis tente de lober son adversaire situé à d = 2 m derrière le filet. Il frappe la balle en A, à D = 9 m du filet et à la hauteur h = 0,50 m au-dessus du sol. La balle part avec une vitesse initiale v0 = 12 m/s inclinée d'un angle alpha = 60 degrés. On prendra g = 9,8 m/s2. L'adversaire peut atteindre une hauteur maximale H = 2,5 m. La ligne de fond est à L = 12 m du filet.",
      given: [
        {
          label: 'v0',
          value: '12 m/s',
        },
        {
          label: 'alpha',
          value: '60 degrés',
        },
        {
          label: 'g',
          value: '9,8 m/s2',
        },
        {
          label: 'h',
          value: '0,50 m',
        },
        {
          label: 'D',
          value: '9 m (distance du filet)',
        },
        {
          label: 'd',
          value: '2 m (recul adversaire)',
        },
        {
          label: 'H',
          value: '2,5 m (hauteur atteignable)',
        },
        {
          label: 'L',
          value: '12 m (ligne de fond)',
        },
      ],
      parts: [
        {
          label: "Quelle est la hauteur y de la balle lorsqu'elle passe au-dessus de l'adversaire (x = D + d = 11 m) ?",
          answer: {
            kind: 'number',
            value: 3.0831144,
            tolerance: 0.2,
            unit: 'm',
          },
          steps: [
            'Équation de la trajectoire : $y = -\\dfrac{g}{2 v_0^2 \\cos^2\\alpha} x^2 + (\\tan\\alpha)\\, x + h_0$',
            'Calcul du coefficient : $\\dfrac{g}{2 v_0^2 \\cos^2\\alpha} = \\dfrac{9{,}8}{2 \\times 12^2 \\times 0{,}25} \\approx 0{,}136$',
            'Avec $\\tan(60°) \\approx 1{,}732$ et $h_0 = 0{,}50$ m',
            'Application pour $x = 11$ m : $y \\approx 3{,}09\\ \\text{m}$',
          ],
          result: 'y(11) \\approx 3{,}09\\ \\text{m}',
        },
        {
          label: "L'adversaire peut-il intercepter la balle ? Réponds 1 pour OUI, 0 pour NON.",
          answer: {
            kind: 'number',
            value: 0,
            tolerance: 0.5,
            unit: '(1/0)',
          },
          steps: [
            "L'adversaire peut atteindre la hauteur maximale $H = 2{,}5$ m.",
            'La balle passe à $y \\approx 3{,}09$ m au-dessus de lui.',
            'Comme $3{,}09 > 2{,}5$, il ne peut **pas** intercepter la balle.',
            'Réponse : $0$ (NON).',
          ],
          result: 'y(11) \\approx 3{,}09\\ \\text{m} > H = 2{,}5\\ \\text{m}',
        },
        {
          label: 'A quelle distance x du point de frappe la balle retombe-t-elle au sol (y = 0) ?',
          answer: {
            kind: 'number',
            value: 13.007679,
            tolerance: 0.5,
            unit: 'm',
          },
          steps: [
            'On résout $y(x) = 0$ : $-0{,}136\\, x^2 + 1{,}732\\, x + 0{,}50 = 0$',
            'Discriminant : $\\Delta = b^2 + 4 k h_0 \\approx 3{,}272$',
            '$\\sqrt{\\Delta} \\approx 1{,}809$',
            'Racine positive : $x \\approx 13{,}0\\ \\text{m}$',
          ],
          result: 'x_{chute} \\approx 13{,}0\\ \\text{m}',
        },
        {
          label: 'La balle retombe-t-elle dans le terrain ? Réponds 1 pour OUI, 0 pour NON.',
          answer: {
            kind: 'number',
            value: 1,
            tolerance: 0.5,
            unit: '(1/0)',
          },
          steps: [
            'La ligne de fond est à $D + L = 9 + 12 = 21$ m du point de frappe.',
            'La balle retombe à $x \\approx 13{,}0$ m.',
            'Comme $13{,}0 < 21$, la balle retombe **dans le terrain**.',
            'Réponse : $1$ (OUI).',
          ],
          result: 'x_{chute} \\approx 13{,}0\\ \\text{m} < 21\\ \\text{m}',
        },
      ],
    },
  ],
  quiz: [],
  applications: [
    {
      title: 'Lancer franc au basket',
      tagline: 'Quelle vitesse donner au ballon pour marquer ?',
      situation: 'Le joueur lâche le ballon à 2,0 m du sol. Le centre du panier est à 4,2 m devant lui et à 3,05 m de hauteur (hauteur officielle). Il tire avec un angle de 52°.',
      model: "Le ballon est un projectile soumis uniquement à son poids : sa trajectoire est une parabole. On néglige la résistance de l'air et la rotation du ballon.",
      questions: [
        "Avec un angle de 52°, quelle vitesse initiale v0 faut-il donner au ballon pour qu'il passe par le centre du panier ?",
      ],
      check: {
        value: 7.264335,
        tolerance: 0.03,
        unit: 'm/s',
      },
      solution: [
        'Équation de la trajectoire : $y = -\\dfrac{g}{2v_0^2\\cos^2\\alpha}x^2 + x\\tan\\alpha + h_0$',
        'Le ballon doit passer par le panier : $x = 4,2$ m et $y = 3,05$ m.',
        'On isole $v_0$ : $v_0 = \\sqrt{\\dfrac{g\\,x^2}{2\\cos^2\\alpha\\,(x\\tan\\alpha + h_0 - y)}}$',
        'A.N. : $v_0 \\approx 7,26$ m/s, soit environ 26 km/h.',
        "Essaie de changer légèrement v0 dans la simulation : 0,2 m/s d'écart suffit pour rater le panier !",
      ],
      fact: "Un tir plus « cambré » (angle élevé) arrive plus verticalement sur le cercle : vu du ballon, l'ouverture du panier paraît plus grande. C'est pourquoi les bons tireurs visent entre 45° et 55°.",
    },
    {
      title: 'Dégagement du gardien',
      tagline: 'Le ballon atteint-il le milieu du terrain ?',
      situation: "Le gardien dégage le ballon depuis le sol à 25 m/s (90 km/h) avec un angle de 40°. Le milieu d'un terrain de 105 m se trouve à 52,5 m.",
      model: "Modèle sans frottement de l'air : c'est une portée maximale théorique. En réalité, un ballon de football est fortement freineé par l'air et retombe plus près.",
      questions: [
        'Calcule la portée du dégagement (distance à laquelle le ballon retombe au sol).',
      ],
      check: {
        value: 62.742594,
        tolerance: 0.02,
        unit: 'm',
      },
      solution: [
        'Départ et arrivée au sol ($h_0 = 0$) : $x_P = \\dfrac{v_0^2 \\sin(2\\alpha)}{g}$',
        'A.N. : $x_P = \\dfrac{25^2 \\times \\sin(80°)}{9,81} \\approx 62,7$ m',
        '62,7 m > 52,5 m : en théorie, le ballon dépasse le milieu du terrain.',
      ],
      fact: "Sans air, la portée maximale est obtenue à 45°. Avec la résistance de l'air, l'angle optimal d'un ballon de foot est plus faible, autour de 30° à 40°.",
    },
    {
      title: 'Saut en longueur',
      tagline: 'Quelle distance pour un athlète de haut niveau ?',
      situation: "Au moment de l'appel, le centre d'inertie de l'athlète est à 1,0 m du sol. Il s'envole à 9,5 m/s avec un angle de 20°.",
      model: "On étudie le mouvement du centre d'inertie de l'athlète, qui suit une parabole (comme un simple projectile), quels que soient les mouvements des bras et des jambes.",
      questions: [
        "Calcule la distance horizontale parcourue par le centre d'inertie avant de retomber au sol.",
      ],
      check: {
        value: 7.9557237,
        tolerance: 0.03,
        unit: 'm',
      },
      solution: [
        'Équations horaires : $x = v_0\\cos\\alpha\\,t$ et $y = -\\tfrac{1}{2}g t^2 + v_0\\sin\\alpha\\,t + h_0$',
        "Au sol $y = 0$ : on résout l'équation du second degré en $t$ et on garde la solution positive.",
        '$t_{vol} = \\dfrac{v_0\\sin\\alpha + \\sqrt{(v_0\\sin\\alpha)^2 + 2 g h_0}}{g}$, puis $x = v_0\\cos\\alpha\\,t_{vol} \\approx 7,96$ m',
        'Une vraie performance de niveau international !',
      ],
      fact: 'Record du monde : 8,95 m (Mike Powell, 1991). Les sauteurs décollent avec un angle de 18° à 25° seulement : ils ne peuvent pas transformer toute leur vitesse de course en vitesse verticale.',
    },
    {
      title: "Colis largué d'un hélicoptère",
      tagline: 'Quand larguer pour toucher la zone de livraison ?',
      situation: "Un hélicoptère d'aide humanitaire vole à 20 m d'altitude à 15 m/s (54 km/h). Il doit larguer un colis de médicaments sur une zone de livraison.",
      model: "Au moment du largage, le colis a la vitesse horizontale de l'hélicoptère : c'est un tir horizontal ($\\alpha = 0$) depuis la hauteur $h_0$. On néglige l'air.",
      questions: [
        'A quelle distance horizontale avant la zone de livraison le pilote doit-il larguer le colis ?',
      ],
      check: {
        value: 30.289127,
        tolerance: 0.03,
        unit: 'm',
      },
      solution: [
        'Durée de la chute : $h_0 = \\tfrac{1}{2} g t^2 \\Rightarrow t = \\sqrt{\\dfrac{2h_0}{g}}$',
        'A.N. : $t = \\sqrt{\\dfrac{2 \\times 20}{9,81}} \\approx 2,02$ s',
        'Distance horizontale : $x = v_0\\,t \\approx 30,3$ m. Il faut larguer 30 m avant la cible.',
      ],
      fact: "Vu du sol, le colis décrit une parabole. Vu depuis l'hélicoptère (qui continue à la même vitesse), il tombe à la verticale juste en dessous !",
    },
    {
      title: "Arrosage d'un jardin maraîcher",
      tagline: "Jusqu'où et jusqu'à quelle hauteur monte le jet ?",
      situation: "Un maraîcher arrose ses planches d'oignons avec un tuyau tenu à 1 m du sol. L'eau sort à 9 m/s avec un angle de 35°.",
      model: "Chaque goutte d'eau se comporte comme un projectile : le jet entier dessine la parabole. On néglige le freinage de l'air sur les gouttes.",
      questions: [
        "Quelle hauteur maximale (flèche) atteint le jet d'eau par rapport au sol ?",
      ],
      check: {
        value: 2.3582153,
        tolerance: 0.03,
        unit: 'm',
      },
      solution: [
        "Au sommet, la vitesse verticale s'annule : $v_y = v_0\\sin\\alpha - g t = 0$",
        'On en déduit : $y_{max} = h_0 + \\dfrac{(v_0\\sin\\alpha)^2}{2g}$',
        'A.N. : $y_{max} \\approx 2,36$ m. Le jet retombe à $9,0$ m : en plein dans les planches.',
      ],
      fact: "Mettre le pouce sur l'embout réduit la section de sortie : comme le débit se conserve, l'eau sort plus vite et le jet va plus loin !",
    },
    {
      title: 'Lancer du poids (EPS)',
      tagline: 'Le poids atteint-il la zone des 18 m ?',
      situation: "Au bac d'EPS, un athlète lâche le poids (une boule de 7,26 kg) à 2,1 m du sol, avec une vitesse de 13 m/s et un angle de 38°. Les meilleurs lancers retombent entre 18 et 21 m.",
      model: "Le poids est lourd et compact : la résistance de l'air est vraiment négligeable. C'est l'un des cas où le modèle du projectile est le plus précis.",
      questions: [
        'Calcule la distance horizontale du lancer (point de chute au sol).',
      ],
      check: {
        value: 19.071444,
        tolerance: 0.03,
        unit: 'm',
      },
      solution: [
        'Équation de la trajectoire : $y = -\\dfrac{g}{2v_0^2\\cos^2\\alpha}x^2 + x\\tan\\alpha + h_0$',
        "Au sol, $y = 0$ : on résout l'équation du second degré en $x$ et on garde la racine positive.",
        'A.N. : $x_P \\approx 19,07$ m',
      ],
      fact: "Comme le poids part de haut (plus de 2 m), l'angle optimal n'est pas 45° mais environ 38° à 42°. Record du monde : 23,56 m (Ryan Crouser, 2023).",
    },
    {
      title: 'La lance des sapeurs-pompiers',
      tagline: "Jusqu'où et jusqu'à quelle hauteur va le jet ?",
      situation: "Un sapeur-pompier tient sa lance à 1,2 m du sol. L'eau sort à 16 m/s (58 km/h) avec un angle de 30°. Le foyer est au sol, à environ 25 m.",
      model: "Chaque goutte d'eau suit une parabole. Pour un jet puissant, l'air finit par disperser l'eau en gouttelettes : la portée réelle est un peu plus faible.",
      questions: [
        'Quelle hauteur maximale atteint le jet (par rapport au sol) ?',
      ],
      check: {
        value: 4.4619776,
        tolerance: 0.03,
        unit: 'm',
      },
      solution: [
        'Au sommet, $v_y = 0$ : $t_S = \\dfrac{v_0\\sin\\alpha}{g}$',
        '$y_{max} = h_0 + \\dfrac{(v_0\\sin\\alpha)^2}{2g}$',
        'A.N. : $y_{max} = 1,2 + \\dfrac{(16\\times 0{,}5)^2}{2\\times 9,81} \\approx 4,46$ m. Le jet retombe à 24,5 m.',
      ],
      fact: "Pour atteindre un foyer plus éloigné sans s'approcher, le pompier augmente la pression (donc $v_0$) : la portée varie comme $v_0^2$.",
    },
    {
      title: "Tir à l'arc",
      tagline: "Pourquoi l'archer vise-t-il au-dessus de la cible ?",
      situation: 'Un archer décoche une flèche à 55 m/s depuis 1,5 m de hauteur, en visant légèrement vers le haut (4°). La cible olympique est à 70 m.',
      model: "Dès qu'elle quitte l'arc, la flèche n'est soumise (dans notre modèle) qu'à son poids : elle tombe pendant tout son vol. Si l'archer visait droit sur la cible, la flèche passerait en dessous.",
      questions: [
        "Calcule la durée du vol de la flèche jusqu'au sol (en s).",
      ],
      check: {
        value: 1.0684117,
        tolerance: 0.03,
        unit: 's',
      },
      solution: [
        '$y(t) = -\\tfrac12 g t^2 + v_0\\sin\\alpha\\,t + h_0 = 0$',
        'On garde la racine positive : $t = \\dfrac{v_0\\sin\\alpha + \\sqrt{(v_0\\sin\\alpha)^2 + 2gh_0}}{g}$',
        'A.N. : $t \\approx 1,07$ s ; la flèche retombe à 59 m, au-delà de la cible.',
      ],
      fact: "À 70 m, une flèche met environ 1,3 s pour atteindre la cible et « tombe » de plusieurs mètres par rapport à la ligne de visée : le viseur de l'arc compense cette chute.",
    },
  ],
};
