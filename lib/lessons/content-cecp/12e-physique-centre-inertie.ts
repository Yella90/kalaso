// Importé du site cecp (physique-3d, chapitre « cinematique ») par scripts/import-cecp.ts.
// Une nouvelle importation remplace ce fichier.
import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook: 'Cinématique, dynamique et énergie - chapitre 1.',
  objectives: [],
  sections: [
    {
      title: 'Cinématique - Définitions',
      blocks: [
        {
          kind: 'text',
          text: "D'après DAVID DIARRA - Prébac Sciences Physiques, chapitre 1.",
        },
        {
          kind: 'text',
          text: "La **cinématique** est l'étude du mouvement des corps en dehors des causes qui provoquent ce mouvement.",
        },
        {
          kind: 'list',
          items: [
            '**Point matériel** : corps de dimensions assez petites pour être confondu à un point.',
            '**Trajectoire** : ensemble des positions successives occupées par le mobile.',
            '**Équations horaires** : coordonnées x(t), y(t), z(t) en fonction du temps.',
          ],
        },
      ],
    },
    {
      title: 'Vitesse et accélération',
      blocks: [
        {
          kind: 'text',
          text: "La **vitesse** est la dérivée de l'abscisse par rapport au temps :",
        },
        {
          kind: 'formula',
          tex: 'v = \\frac{\\mathrm{d}x}{\\mathrm{d}t}',
        },
        {
          kind: 'text',
          text: "L'**accélération** est la dérivée de la vitesse :",
        },
        {
          kind: 'formula',
          tex: 'a = \\frac{\\mathrm{d}v}{\\mathrm{d}t} = \\frac{\\mathrm{d}^2 x}{\\mathrm{d}t^2}',
        },
      ],
    },
    {
      title: 'Mouvement rectiligne uniforme (MRU)',
      blocks: [
        {
          kind: 'text',
          text: 'Vitesse constante, accélération nulle :',
        },
        {
          kind: 'formula',
          tex: 'x(t) = v\\,t + x_0',
        },
        {
          kind: 'callout',
          variant: 'retenir',
          blocks: [
            {
              kind: 'text',
              text: "Le MRU est le mouvement d'un solide isolé dans un référentiel galiléen (principe de l'inertie).",
            },
          ],
        },
      ],
    },
    {
      title: 'Mouvement rectiligne uniformément varie (MRUV)',
      blocks: [
        {
          kind: 'text',
          text: 'Accélération constante non nulle :',
        },
        {
          kind: 'formula',
          tex: 'x(t) = \\frac{1}{2}a\\,t^2 + v_0\\,t + x_0',
        },
        {
          kind: 'formula',
          tex: 'v(t) = a\\,t + v_0',
        },
        {
          kind: 'text',
          text: 'En éliminant t entre ces deux relations, on obtient la relation indépendante du temps :',
        },
        {
          kind: 'formula',
          tex: 'v^2 - v_0^2 = 2\\,a\\,(x - x_0)',
        },
        {
          kind: 'callout',
          variant: 'remarque',
          blocks: [
            {
              kind: 'text',
              text: '**Chute libre** : cas particulier ou a = g. Ex : $h = \\dfrac12g t^2$.',
            },
          ],
        },
      ],
    },
    {
      title: 'Mouvement circulaire uniforme (MCU)',
      blocks: [
        {
          kind: 'text',
          text: 'Trajectoire circulaire de rayon R, vitesse constante en norme :',
        },
        {
          kind: 'formula',
          tex: 'v = R\\,\\omega',
        },
        {
          kind: 'text',
          text: 'Période et fréquence :',
        },
        {
          kind: 'formula',
          tex: 'T = \\frac{2\\pi}{\\omega} \\qquad f = \\frac{1}{T} = \\frac{\\omega}{2\\pi}',
        },
        {
          kind: 'text',
          text: "L'accélération est **centripète** (dirigée vers le centre) :",
        },
        {
          kind: 'formula',
          tex: 'a_N = \\frac{v^2}{R} = R\\,\\omega^2',
        },
        {
          kind: 'callout',
          variant: 'attention',
          blocks: [
            {
              kind: 'text',
              text: 'Même si la vitesse est constante en norme, le vecteur vitesse change de direction à chaque instant :**le mouvement est accélère**.',
            },
          ],
        },
      ],
    },
    {
      title: 'Dynamique',
      blocks: [
        {
          kind: 'text',
          text: "Le **principe fondamental de la dynamique** (PFD) s'écrit :",
        },
        {
          kind: 'formula',
          tex: '\\sum \\vec{F} = m\\,\\vec{a}',
        },
        {
          kind: 'text',
          text: "Le **théorème du centre d'inertie** : dans un référentiel galiléen, la somme des forces appliquées à un solide est égale au produit de sa masse par l'accélération de son centre d'inertie.",
        },
        {
          kind: 'text',
          text: "Un **référentiel galiléen** est un référentiel dans lequel le PFD s'applique. Le référentiel terrestre est galiléen pour des expériences de courte durée.",
        },
        {
          kind: 'callout',
          variant: 'retenir',
          blocks: [
            {
              kind: 'text',
              text: "**Principe de l'inertie** : dans un référentiel galiléen, un solide isolé est au repos ou en mouvement rectiligne uniforme.",
            },
          ],
        },
      ],
    },
    {
      title: 'Énergie',
      blocks: [
        {
          kind: 'text',
          text: '**Travail du poids** entre deux altitudes z1 et z2 :',
        },
        {
          kind: 'formula',
          tex: 'W_{\\vec{P}} = \\pm\\, m\\,g\\,h',
        },
        {
          kind: 'text',
          text: "avec h la différence d'altitude. Il ne dépend pas du chemin suivi.",
        },
        {
          kind: 'text',
          text: "**Énergie cinétique** d'un point matériel :",
        },
        {
          kind: 'formula',
          tex: 'E_c = \\frac{1}{2}m\\,v^2',
        },
        {
          kind: 'text',
          text: "**Théorème de l'énergie cinétique** :",
        },
        {
          kind: 'formula',
          tex: 'E_{c,f} - E_{c,i} = \\sum W',
        },
        {
          kind: 'text',
          text: "La variation de l'énergie cinétique entre deux instants est égale à la somme algébrique des travaux des forces agissant sur le système pendant le même intervalle de temps.",
        },
      ],
    },
  ],
  essentials: [],
  exercises: [
    {
      id: 'kin-chute',
      level: 2,
      title: 'Chute libre',
      statement: "Un objet est lâche sans vitesse initiale d'une hauteur h = 20 m au-dessus du sol. On néglige la résistance de l'air. On prendra g = 10 m/s2.",
      given: [
        {
          label: 'v0',
          value: '0 m/s',
        },
        {
          label: 'h',
          value: '20 m',
        },
        {
          label: 'g',
          value: '10 m/s2',
        },
      ],
      parts: [
        {
          label: 'Quel est le temps de chute t ?',
          answer: {
            kind: 'number',
            value: 2,
            tolerance: 0.1,
            unit: 's',
          },
          steps: [
            'Équation horaire de la chute libre : $h = \\dfrac{1}{2} g\\, t^2$',
            'On isole $t$ : $t = \\sqrt{\\dfrac{2h}{g}}$',
            'Application numérique : $t = \\sqrt{\\dfrac{2 \\times 20}{10}} = \\sqrt{4} = 2\\ \\text{s}$',
          ],
          result: 't = \\sqrt{\\frac{2h}{g}} = 2\\ \\text{s}',
        },
        {
          label: "Quelle est la vitesse d'impact au sol (en m/s) ?",
          answer: {
            kind: 'number',
            value: 20,
            tolerance: 0.5,
            unit: 'm/s',
          },
          steps: [
            'On peut utiliser $v = g\\,t$ ou la relation $v^2 = 2\\,g\\,h$',
            '$v = \\sqrt{2 \\times 10 \\times 20} = \\sqrt{400} = 20\\ \\text{m/s}$',
          ],
          result: 'v = \\sqrt{2 g h} = 20\\ \\text{m/s}',
        },
      ],
    },
    {
      id: 'kin-freinage',
      level: 2,
      title: 'Freinage uniformément retarde',
      statement: "Une voiture roule à la vitesse v0 = 72 km/h. Le conducteur freine et la voiture s'arrête après avoir parcouru une distance d = 40 m. On suppose la décélération constante.",
      given: [
        {
          label: 'v0',
          value: '72 km/h = 20 m/s',
        },
        {
          label: 'd',
          value: '40 m',
        },
        {
          label: 'vfinale',
          value: '0 m/s',
        },
      ],
      parts: [
        {
          label: "Quelle est la valeur absolue de l'accélération a (en m/s2) ?",
          answer: {
            kind: 'number',
            value: 5,
            tolerance: 0.1,
            unit: 'm/s2',
          },
          steps: [
            'On utilise la relation indépendante du temps : $v^2 - v_0^2 = 2\\,a\\,d$',
            'Avec $v = 0$ : $-v_0^2 = 2\\,a\\,d$',
            'Donc $a = -\\dfrac{v_0^2}{2d}$ (la voiture décélère, a est négatif)',
            '$|a| = \\dfrac{20^2}{2 \\times 40} = \\dfrac{400}{80} = 5\\ \\text{m/s}^2$',
          ],
          result: '|a| = \\frac{v_0^2}{2d} = 5\\ \\text{m/s}^2',
        },
        {
          label: 'Quelle est la durée du freinage (en s) ?',
          answer: {
            kind: 'number',
            value: 4,
            tolerance: 0.1,
            unit: 's',
          },
          steps: [
            'On utilise $v = a\\,t + v_0$ avec $v = 0$',
            '$t = -\\dfrac{v_0}{a} = \\dfrac{20}{5} = 4\\ \\text{s}$',
          ],
          result: 't = \\frac{v_0}{|a|} = 4\\ \\text{s}',
        },
      ],
    },
  ],
  quiz: [],
  applications: [
    {
      title: "Freinage d'urgence à moto",
      tagline: "La moto s'arrête-t-elle avant la charrette ?",
      situation: 'Une moto roule à 15 m/s (54 km/h). Le conducteur freine au moment où il voit une charrette arrêtée à 25 m. Sur route sèche, la décélération vaut 5 m/s².',
      model: "Pendant le freinage, l'accélération est constante et opposée à la vitesse : c'est un MRUV. On ne compte ici que la distance de freinage (pas le temps de réaction).",
      questions: [
        'Calcule la distance de freinage de la moto.',
      ],
      check: {
        value: 22.5,
        tolerance: 0.02,
        unit: 'm',
      },
      solution: [
        'Relation indépendante du temps : $v^2 - v_0^2 = 2a(x - x_0)$',
        "A l'arrêt $v = 0$ : $d = \\dfrac{v_0^2}{2|a|}$",
        "A.N. : $d = \\dfrac{15^2}{2 \\times 5} = 22,5$ m < 25 m : la moto s'arrête à temps.",
      ],
      fact: 'La distance de freinage dépend de $v_0^2$ : rouler 2 fois plus vite multiplie la distance de freinage par 4 ! Il faut y ajouter la distance de réaction : environ 1 s × v, soit 15 m à 54 km/h.',
    },
    {
      title: 'Freinage sur route mouillée',
      tagline: 'Même vitesse, mais pendant la saison des pluies...',
      situation: "Même situation : moto à 15 m/s, charrette à 25 m. Mais la route est mouillée et la décélération n'est plus que de 3 m/s².",
      model: 'Sur une route mouillée ou sablonneuse, les pneus adherent moins : la force de frottement, donc la décélération maximale, diminue.',
      questions: [
        'Calcule la distance de freinage sur route mouillée.',
      ],
      check: {
        value: 37.5,
        tolerance: 0.02,
        unit: 'm',
      },
      solution: [
        '$d = \\dfrac{v_0^2}{2|a|} = \\dfrac{15^2}{2 \\times 3} = 37,5$ m > 25 m : collision !',
        'Vitesse au moment du choc : $v = \\sqrt{v_0^2 + 2a \\times 25} \\approx 8,7$ m/s, soit 31 km/h.',
        'Lance la simulation pour voir la différence avec la route sèche.',
      ],
      fact: "Par temps de pluie, il faut augmenter la distance de sécurité et réduire sa vitesse : c'est de la physique, pas seulement du code de la route !",
    },
    {
      title: "Démarrage d'une Sotrama",
      tagline: 'Quelle vitesse après 30 m ?',
      situation: "Une Sotrama (minibus de transport en commun) démarre d'un arrêt avec une accélération constante de 1,5 m/s².",
      model: "Départ arrête ($v_0 = 0$) avec accélération constante : MRUV. En réalité, l'accélération diminue quand le chauffeur change de vitesse.",
      questions: [
        'Quelle est la vitesse de la Sotrama après 30 m ?',
      ],
      check: {
        value: 9.486833,
        tolerance: 0.03,
        unit: 'm/s',
      },
      solution: [
        '$v^2 - v_0^2 = 2a(x - x_0)$ avec $v_0 = 0$',
        '$v = \\sqrt{2 a x} = \\sqrt{2 \\times 1,5 \\times 30} \\approx 9,49$ m/s',
        'Soit environ 34 km/h.',
      ],
      fact: 'Une voiture de sport atteint 100 km/h en environ 4 s (a ≈ 7 m/s²). Une Sotrama chargée met beaucoup plus longtemps : sa masse est grande pour une force motrice modeste (2e loi de Newton : a = F/m).',
    },
    {
      title: 'Contrôle de vitesse',
      tagline: 'Cette moto respecte-t-elle la limite ?',
      situation: "Un agent mesure qu'une moto parcourt 30 m en 2,5 s à vitesse constante. Supposons que la vitesse soit limitée à 50 km/h dans cette rue.",
      model: 'Vitesse constante en ligne droite : MRU, $x = v\\,t$. Les radars mesurent la vitesse de la même façon (distance / durée) ou par effet Doppler.',
      questions: [
        'Calcule la vitesse de la moto en km/h.',
      ],
      check: {
        value: 43.2,
        tolerance: 0.02,
        unit: 'km/h',
      },
      solution: [
        '$v = \\dfrac{d}{t} = \\dfrac{30}{2,5} = 12$ m/s',
        '$v = 12 \\times 3{,}6 = 43,2$ km/h < 50 km/h : la moto respecte la limite.',
      ],
      fact: 'Pour convertir des m/s en km/h, on multiplie par 3,6 (1 m/s = 3600 m en 1 h = 3,6 km/h).',
    },
    {
      title: 'Manège de foire',
      tagline: 'Quelle accélération ressent un enfant ?',
      situation: "Un enfant est assis dans une nacelle a 4 m de l'axe d'un manège qui tourne à 0,8 rad/s.",
      model: 'Vitesse angulaire constante : MCU. La vitesse garde la même norme mais change de direction, donc il y a une accélération dirigée vers le centre (accélération normale).',
      questions: [
        "Calcule l'accélération centripète (normale) de l'enfant.",
      ],
      check: {
        value: 2.56,
        tolerance: 0.02,
        unit: 'm/s²',
      },
      solution: [
        '$a_N = \\dfrac{v^2}{R} = R\\,\\omega^2$',
        'A.N. : $a_N = 4 \\times 0,8^2 = 2,56$ m/s², soit environ 0,26 g.',
      ],
      fact: "C'est cette accélération vers le centre qui donne l'impression d'être « pousseé vers l'extérieur ». Les montagnes russes atteignent 4 à 5 g, les pilotes de chasse jusqu'à 9 g.",
    },
    {
      title: "Arrêt en douceur d'une Sotrama",
      tagline: "Combien de temps pour s'arrêter au panneau ?",
      situation: "Une Sotrama roule à 10 m/s (36 km/h). Le chauffeur freine doucement (décélération 2 m/s²) pour s'arrêter au panneau d'arrêt situé à 28 m.",
      model: 'Freinage à décélération constante : MRUV avec $a < 0$. La vitesse diminue de 2 m/s chaque seconde.',
      questions: [
        "Calcule la durée du freinage jusqu'à l'arrêt.",
      ],
      check: {
        value: 5,
        tolerance: 0.02,
        unit: 's',
      },
      solution: [
        "$v(t) = a\\,t + v_0$ ; à l'arrêt $v = 0$",
        '$t = -\\dfrac{v_0}{a} = \\dfrac{10}{2} = 5,0$ s',
        'Distance de freinage : $d = \\dfrac{v_0^2}{2|a|} = 25,0$ m, avant le panneau.',
      ],
      fact: "Un freinage doux (environ 2 m/s²) est confortable pour les passagers debout. Un freinage d'urgence peut dépasser 8 m/s² : sans ceinture, les passagers sont projetés vers l'avant (principe d'inertie).",
    },
    {
      title: 'Départ au feu vert',
      tagline: 'Combien de temps pour traverser le carrefour ?',
      situation: 'Au feu vert, une moto démarre avec une accélération constante de 2,5 m/s². Le carrefour à traverser mesure 30 m.',
      model: 'Départ arrêté avec accélération constante : MRUV, $x = \\tfrac12 a t^2$.',
      questions: [
        'Combien de temps la moto met-elle pour parcourir les 30 m ?',
      ],
      check: {
        value: 4.8989795,
        tolerance: 0.02,
        unit: 's',
      },
      solution: [
        '$x = \\tfrac12 a t^2$ car $x_0 = 0$ et $v_0 = 0$',
        '$t = \\sqrt{\\dfrac{2x}{a}} = \\sqrt{\\dfrac{2\\times 30}{2,5}} \\approx 4,90$ s',
        'Vitesse à la sortie : $v = a\\,t \\approx 12,2$ m/s.',
      ],
      fact: 'Le feu orange dure généralement 3 à 5 s : un véhicule qui démarre doit avoir dégagé le carrefour avant que les autres voies passent au vert.',
    },
    {
      title: 'La grande roue de la fête',
      tagline: 'Combien de temps dure un tour ?',
      situation: "Une nacelle de grande roue est à 10 m de l'axe. La roue tourne à vitesse constante, avec une vitesse angulaire de 0,5 rad/s (une roue rapide de fête foraine).",
      model: "Chaque nacelle a un mouvement circulaire uniforme autour de l'axe : $v = R\\omega$ et $T = \\dfrac{2\\pi}{\\omega}$.",
      questions: [
        "Calcule la durée d'un tour complet (période).",
      ],
      check: {
        value: 12.566371,
        tolerance: 0.02,
        unit: 's',
      },
      solution: [
        '$T = \\dfrac{2\\pi}{\\omega}$',
        '$T = \\dfrac{2\\pi}{0,5} \\approx 12,6$ s',
        'Vitesse de la nacelle : $v = R\\omega = 5,0$ m/s.',
      ],
      fact: 'Les très grandes roues tournent bien plus lentement : un tour de la roue de Londres (135 m de haut) dure 30 minutes, soit $\\omega \\approx 0{,}0035$ rad/s.',
    },
  ],
};
