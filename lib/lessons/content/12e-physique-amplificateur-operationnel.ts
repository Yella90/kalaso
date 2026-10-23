import type { Lesson } from '../types';

// Complément du programme ivoirien (Terminale D) : montages dérivateur et intégrateur.
export const lesson: Lesson = {
  hook:
    'Dans un régulateur de panneau solaire, un poste radio ou le générateur de signaux du laboratoire, un petit composant à huit pattes fait des calculs sur des tensions : l’**amplificateur opérationnel**. Associé à une résistance et à un condensateur, il sait **dériver** ou **intégrer** un signal, comme on le fait en mathématiques.',
  objectives: [
    'utiliser les propriétés de l’amplificateur opérationnel idéal en régime linéaire ;',
    'établir la relation entrée-sortie d’un montage dérivateur et d’un montage intégrateur ;',
    'prévoir la forme du signal de sortie (carré, triangle, sinusoïde) ;',
    'reconnaître la saturation de l’amplificateur.',
  ],
  sections: [
    {
      title: 'L’amplificateur opérationnel idéal',
      blocks: [
        {
          kind: 'definition',
          term: 'Amplificateur opérationnel (AO)',
          text: 'composant électronique à deux entrées, l’entrée non inverseuse $E^+$ et l’entrée inverseuse $E^-$, et une sortie $S$. Il est alimenté par une tension symétrique, par exemple $\\pm 15$ V. Toutes les tensions se mesurent par rapport à la masse.',
        },
        {
          kind: 'rule',
          text: 'AO idéal : les courants d’entrée sont nuls, $i^+ = i^- = 0$. En **régime linéaire** (sortie reliée à $E^-$ par un dipôle), les deux entrées sont au même potentiel : $V^+ = V^-$.',
        },
        {
          kind: 'text',
          text: 'La tension de sortie ne peut pas dépasser la **tension de saturation** $V_{sat}$, un peu inférieure à la tension d’alimentation (environ 13 V pour une alimentation de $\\pm 15$ V). Quand le calcul donne $|u_s| > V_{sat}$, l’AO est **saturé** : $u_s = +V_{sat}$ ou $-V_{sat}$ et les formules du régime linéaire ne s’appliquent plus.',
        },
        {
          kind: 'callout',
          variant: 'methode',
          title: 'Trouver la relation entrée-sortie',
          blocks: [
            {
              kind: 'list',
              items: [
                'écrire $V^- = V^+$ (ici, $E^+$ est reliée à la masse : $V^- = 0$) ;',
                'écrire que le courant qui arrive en $E^-$ repart entièrement dans l’autre dipôle, puisque $i^- = 0$ ;',
                'exprimer ce courant avec la loi de chaque dipôle : $u = Ri$ pour une résistance, $i = C\\dfrac{\\mathrm{d}u}{\\mathrm{d}t}$ pour un condensateur.',
              ],
            },
          ],
        },
        {
          kind: 'example',
          title: 'le montage inverseur',
          text: 'Une résistance $R_1$ relie l’entrée à $E^-$, une résistance $R_2$ relie $E^-$ à la sortie, $E^+$ est à la masse.',
          steps: ['$V^- = 0$, donc le courant d’entrée vaut $i = \\dfrac{u_e}{R_1}$.', 'Ce courant traverse $R_2$ : $0 - u_s = R_2\\,i$.', 'D’où $u_s = -\\dfrac{R_2}{R_1}\\,u_e$ : la tension est amplifiée et changée de signe.'],
        },
      ],
    },
    {
      title: 'Le montage dérivateur',
      blocks: [
        {
          kind: 'text',
          text: 'Un condensateur de capacité $C$ relie l’entrée à $E^-$ ; une résistance $R$ relie $E^-$ à la sortie ; $E^+$ est reliée à la masse.',
        },
        {
          kind: 'list',
          items: [
            '$V^- = 0$, donc la tension aux bornes du condensateur est $u_e$ et le courant qui le traverse vaut $i = C\\dfrac{\\mathrm{d}u_e}{\\mathrm{d}t}$ ;',
            'ce courant traverse ensuite $R$ ($i^- = 0$) : $0 - u_s = R\\,i$.',
          ],
        },
        {
          kind: 'formula',
          label: 'Dérivateur',
          tex: 'u_s = -RC\\,\\dfrac{\\mathrm{d}u_e}{\\mathrm{d}t}',
          legend: ['$RC$ : constante de temps, en s ($R$ en Ω, $C$ en F)'],
        },
        {
          kind: 'example',
          title: 'un triangle devient un carré',
          text: 'Avec $R = 10$ kΩ et $C = 10$ nF ($RC = 10^{-4}$ s), on applique une tension triangulaire qui monte de −2 V à +2 V en 2 ms, puis redescend.',
          steps: [
            'Pendant la montée, $\\dfrac{\\mathrm{d}u_e}{\\mathrm{d}t} = \\dfrac{4}{2 \\times 10^{-3}} = 2\\,000$ V/s, donc $u_s = -10^{-4} \\times 2\\,000 = -0{,}2$ V.',
            'Pendant la descente, la pente change de signe : $u_s = +0{,}2$ V.',
            'La sortie est un signal **carré** d’amplitude 0,2 V.',
          ],
        },
      ],
    },
    {
      title: 'Le montage intégrateur',
      blocks: [
        {
          kind: 'text',
          text: 'On échange les deux dipôles : la résistance $R$ relie l’entrée à $E^-$, le condensateur $C$ relie $E^-$ à la sortie.',
        },
        {
          kind: 'list',
          items: [
            '$V^- = 0$, donc le courant d’entrée vaut $i = \\dfrac{u_e}{R}$ ;',
            'ce courant charge le condensateur, dont la tension est $0 - u_s$ : $i = C\\dfrac{\\mathrm{d}(-u_s)}{\\mathrm{d}t}$ ;',
            'donc $\\dfrac{\\mathrm{d}u_s}{\\mathrm{d}t} = -\\dfrac{u_e}{RC}$.',
          ],
        },
        {
          kind: 'formula',
          label: 'Intégrateur',
          tex: 'u_s(t) = -\\dfrac{1}{RC}\\int_0^t u_e\\,\\mathrm{d}t + u_s(0)',
        },
        {
          kind: 'example',
          title: 'un carré devient un triangle',
          text: 'Avec $RC = 1$ ms, on applique une tension carrée qui vaut +1 V puis −1 V, chaque palier durant 0,5 ms.',
          steps: [
            'Pendant le palier à +1 V : $\\dfrac{\\mathrm{d}u_s}{\\mathrm{d}t} = -\\dfrac{1}{10^{-3}} = -1\\,000$ V/s, la sortie descend de $1\\,000 \\times 0{,}5 \\times 10^{-3} = 0{,}5$ V.',
            'Pendant le palier à −1 V, elle remonte de 0,5 V.',
            'La sortie est un signal **triangulaire** de 0,5 V crête à crête.',
          ],
        },
        {
          kind: 'trap',
          wrong: '« Une petite tension continue à l’entrée de l’intégrateur ne change presque rien. »',
          why: 'L’intégrateur additionne cette tension au fil du temps : la sortie dérive sans arrêt jusqu’à la saturation.',
          reflex: 'Vérifier que la valeur moyenne de $u_e$ est nulle ; en pratique, on place une grande résistance en parallèle sur le condensateur.',
        },
      ],
    },
    {
      title: 'Prévoir la forme du signal de sortie',
      blocks: [
        {
          kind: 'table',
          head: ['Signal d’entrée', 'Sortie du dérivateur', 'Sortie de l’intégrateur'],
          rows: [
            ['Triangulaire', 'Carré', 'Arcs de parabole'],
            ['Carré', 'Impulsions brèves aux fronts', 'Triangulaire'],
            ['$U_m\\sin(\\omega t)$', '$-RC\\omega U_m\\cos(\\omega t)$', '$\\dfrac{U_m}{RC\\omega}\\cos(\\omega t)$'],
          ],
        },
        {
          kind: 'callout',
          variant: 'retenir',
          blocks: [
            {
              kind: 'text',
              text: 'Pour une sinusoïde, le dérivateur multiplie l’amplitude par $RC\\omega$ (il favorise les hautes fréquences) et l’intégrateur la divise par $RC\\omega$ (il favorise les basses fréquences). Dans les deux cas, la sortie est en quadrature avec l’entrée.',
            },
          ],
        },
      ],
    },
  ],
  essentials: [
    'AO idéal : $i^+ = i^- = 0$ ; en régime linéaire, $V^+ = V^-$ ; la sortie reste entre $-V_{sat}$ et $+V_{sat}$.',
    'Inverseur : $u_s = -\\dfrac{R_2}{R_1}u_e$.',
    'Dérivateur (C à l’entrée, R en retour) : $u_s = -RC\\dfrac{\\mathrm{d}u_e}{\\mathrm{d}t}$ ; un triangle donne un carré.',
    'Intégrateur (R à l’entrée, C en retour) : $u_s = -\\dfrac{1}{RC}\\int u_e\\,\\mathrm{d}t$ ; un carré donne un triangle.',
  ],
  exercises: [
    {
      id: 'ao-derivateur-rampe',
      level: 1,
      title: 'Dérivateur et rampe de tension',
      statement:
        'Un montage dérivateur utilise $R = 10$ kΩ et $C = 100$ nF. La tension d’entrée $u_e$ monte régulièrement de 0 à 5 V en 10 ms. L’AO est idéal et fonctionne en régime linéaire.',
      given: [
        { label: '$R$', value: '10 kΩ' },
        { label: '$C$', value: '100 nF' },
        { label: '$u_e$', value: '0 → 5 V en 10 ms' },
      ],
      parts: [
        {
          label: 'Calcule la constante de temps $RC$ (en s).',
          answer: { kind: 'number', value: 0.001, tolerance: 0.00005, unit: 's' },
          steps: ['$RC = 10 \\times 10^{3} \\times 100 \\times 10^{-9} = 10^{-3}$ s.'],
          result: 'RC = 1{,}0 \\times 10^{-3}\\ \\text{s}',
        },
        {
          label: 'Calcule $\\dfrac{\\mathrm{d}u_e}{\\mathrm{d}t}$ pendant la montée (en V/s).',
          answer: { kind: 'number', value: 500, tolerance: 5, unit: 'V/s' },
          steps: ['La montée est régulière : la dérivée est la pente, $\\dfrac{5}{10 \\times 10^{-3}} = 500$ V/s.'],
          result: '\\dfrac{\\mathrm{d}u_e}{\\mathrm{d}t} = 500\\ \\text{V/s}',
        },
        {
          label: 'Calcule la tension de sortie $u_s$ pendant la montée (en V).',
          answer: { kind: 'number', value: -0.5, tolerance: 0.02, unit: 'V' },
          steps: ['$u_s = -RC\\,\\dfrac{\\mathrm{d}u_e}{\\mathrm{d}t} = -10^{-3} \\times 500 = -0{,}5$ V, constante pendant toute la montée.'],
          result: 'u_s = -0{,}5\\ \\text{V}',
        },
      ],
    },
    {
      id: 'ao-integrateur-saturation',
      level: 2,
      title: 'Intégrateur jusqu’à la saturation',
      statement:
        'Un montage intégrateur utilise $R = 1$ kΩ et $C = 1$ µF. Le condensateur est déchargé à $t = 0$ ($u_s(0) = 0$). On applique alors une tension continue $u_e = 2$ V. La tension de saturation de l’AO vaut 13 V.',
      given: [
        { label: '$RC$', value: '1 ms' },
        { label: '$u_e$', value: '+2 V' },
        { label: '$V_{sat}$', value: '13 V' },
      ],
      parts: [
        {
          label: 'Calcule $u_s$ à l’instant $t = 2$ ms (en V).',
          answer: { kind: 'number', value: -4, tolerance: 0.05, unit: 'V' },
          steps: ['$u_e$ est constante : $u_s = -\\dfrac{u_e}{RC}\\,t = -\\dfrac{2}{10^{-3}} \\times 2 \\times 10^{-3} = -4$ V.'],
          result: 'u_s(2\\ \\text{ms}) = -4\\ \\text{V}',
        },
        {
          label: 'À quel instant l’AO atteint-il la saturation (en ms) ?',
          answer: { kind: 'number', value: 6.5, tolerance: 0.1, unit: 'ms' },
          steps: ['La saturation arrive quand $|u_s| = 13$ V : $\\dfrac{2}{10^{-3}}\\,t = 13$.', '$t = \\dfrac{13 \\times 10^{-3}}{2} = 6{,}5 \\times 10^{-3}$ s.'],
          result: 't = 6{,}5\\ \\text{ms}',
        },
        {
          label: 'Quelle est la tension de sortie ensuite (en V) ?',
          answer: { kind: 'number', value: -13, tolerance: 0.1, unit: 'V' },
          steps: ['L’AO est saturé du côté négatif : $u_s = -V_{sat} = -13$ V tant que $u_e$ reste positive.'],
          result: 'u_s = -13\\ \\text{V}',
        },
      ],
    },
    {
      id: 'ao-derivateur-sinus',
      level: 3,
      title: 'Dérivateur en régime sinusoïdal',
      statement:
        'Un montage dérivateur utilise $R = 10$ kΩ et $C = 47$ nF. On applique $u_e(t) = 2\\sin(1000\\,t)$ (en volts, $t$ en secondes).',
      given: [
        { label: '$R$', value: '10 kΩ' },
        { label: '$C$', value: '47 nF' },
        { label: '$U_m$', value: '2 V' },
        { label: '$\\omega$', value: '1 000 rad/s' },
      ],
      parts: [
        {
          label: 'Calcule l’amplitude de la tension de sortie (en V).',
          answer: { kind: 'number', value: 0.94, tolerance: 0.02, unit: 'V' },
          steps: [
            '$\\dfrac{\\mathrm{d}u_e}{\\mathrm{d}t} = 2 \\times 1000\\cos(1000\\,t)$.',
            '$u_s = -RC \\times 2\\,000\\cos(1000\\,t)$ avec $RC = 4{,}7 \\times 10^{-4}$ s.',
            'Amplitude : $4{,}7 \\times 10^{-4} \\times 2\\,000 = 0{,}94$ V.',
          ],
          result: 'u_s(t) = -0{,}94\\cos(1000\\,t)\\ \\text{V}',
        },
        {
          label: '$u_s$ est-elle en avance ou en retard sur $u_e$ ? Réponds « avance » ou « retard ».',
          answer: { kind: 'text', display: 'retard (de π/2)', accepted: ['retard', 'en retard', 'retard de π/2', 'en retard de π/2', 'retard de pi/2', 'en retard de pi/2'] },
          steps: ['$-\\cos(\\omega t) = \\sin\\left(\\omega t - \\dfrac{\\pi}{2}\\right)$ : $u_s = 0{,}94\\sin\\left(1000\\,t - \\dfrac{\\pi}{2}\\right)$.', 'La sortie est en quadrature retard : elle est en retard de $\\dfrac{\\pi}{2}$ sur l’entrée.'],
        },
        {
          label: 'À quelle fréquence l’amplitude de sortie serait-elle égale à celle de l’entrée (en Hz) ?',
          answer: { kind: 'number', value: 339, tolerance: 3, unit: 'Hz' },
          steps: ['Il faut $RC\\omega = 1$, soit $\\omega = \\dfrac{1}{RC} \\approx 2\\,128$ rad/s.', '$f = \\dfrac{\\omega}{2\\pi} \\approx 339$ Hz.'],
          result: 'f = \\dfrac{1}{2\\pi RC} \\approx 339\\ \\text{Hz}',
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Pour un AO idéal en régime linéaire :',
      choices: ['$V^+ = V^-$ et $i^+ = i^- = 0$', '$V^+ = 0$ dans tous les montages', '$u_s = 0$', '$i^+ = i^- = 1$ mA'],
      answer: 0,
      explanation: 'Ce sont les deux propriétés utilisées pour établir toutes les relations entrée-sortie.',
    },
    {
      question: 'La relation du montage dérivateur est :',
      choices: ['$u_s = -RC\\dfrac{\\mathrm{d}u_e}{\\mathrm{d}t}$', '$u_s = -\\dfrac{1}{RC}\\int u_e\\,\\mathrm{d}t$', '$u_s = -\\dfrac{R_2}{R_1}u_e$', '$u_s = RC\\,u_e$'],
      answer: 0,
      explanation: 'Le condensateur est à l’entrée : le courant est proportionnel à la dérivée de $u_e$.',
    },
    {
      question: 'Un signal triangulaire à l’entrée d’un dérivateur donne en sortie un signal :',
      choices: ['carré', 'triangulaire', 'sinusoïdal', 'continu nul'],
      answer: 0,
      explanation: 'La pente d’un triangle prend deux valeurs opposées : la sortie alterne entre deux valeurs.',
    },
    {
      question: 'Un intégrateur reçoit une tension continue positive. Sa sortie :',
      choices: ['descend régulièrement jusqu’à $-V_{sat}$', 'reste nulle', 'monte jusqu’à $+V_{sat}$', 'oscille'],
      answer: 0,
      explanation: '$\\dfrac{\\mathrm{d}u_s}{\\mathrm{d}t} = -\\dfrac{u_e}{RC} < 0$ : la sortie baisse jusqu’à la saturation négative.',
    },
    {
      question: 'Avec $u_e = U_m\\cos(\\omega t)$, l’amplitude de sortie d’un intégrateur vaut :',
      choices: ['$\\dfrac{U_m}{RC\\omega}$', '$RC\\omega U_m$', '$U_m$', '$\\dfrac{U_m}{RC}$'],
      answer: 0,
      explanation: 'Une primitive de $\\cos(\\omega t)$ est $\\dfrac{\\sin(\\omega t)}{\\omega}$, puis on divise par $RC$.',
    },
  ],
  applications: [
    {
      title: 'Le générateur de signaux du laboratoire',
      tagline: 'Comment fabriquer un signal triangulaire ?',
      situation:
        'Le générateur du laboratoire du lycée produit une tension carrée de ±5 V et de fréquence 1 kHz. Pour obtenir un signal triangulaire, on la fait passer dans un intégrateur avec $R = 10$ kΩ et $C = 100$ nF.',
      model: 'AO idéal en régime linéaire, sans saturation ; la tension carrée a une valeur moyenne nulle.',
      questions: ['Quelle est la tension crête à crête du signal triangulaire obtenu, en V ?'],
      check: { value: 2.5, tolerance: 0.03, unit: 'V' },
      solution: [
        '$RC = 10^4 \\times 10^{-7} = 10^{-3}$ s ; chaque palier dure une demi-période, 0,5 ms.',
        'Pendant le palier à +5 V, $u_s$ varie de $-\\dfrac{5}{10^{-3}} \\times 0{,}5 \\times 10^{-3} = -2{,}5$ V.',
        'Le triangle a donc 2,5 V crête à crête (amplitude 1,25 V).',
      ],
      fact: 'Les générateurs de fonctions fabriquent souvent d’abord le triangle avec un intégrateur, puis le carré et la sinusoïde à partir de lui.',
    },
    {
      title: 'Compter les élèves à l’entrée du lycée',
      tagline: 'Une impulsion à chaque passage',
      situation:
        'Une barrière lumineuse à la porte du lycée donne une tension de 0 V quand personne ne passe et de 5 V quand le faisceau est coupé. On envoie cette tension dans un dérivateur, dont la sortie commande un compteur.',
      model: 'Les changements de tension (les fronts) sont très rapides ; entre deux fronts, la tension d’entrée est constante.',
      questions: [
        'Que vaut la sortie du dérivateur quand personne ne passe, ou pendant qu’un élève coupe le faisceau ?',
        'Que se passe-t-il au moment où le faisceau est coupé ? Et quand il est rétabli ?',
      ],
      solution: [
        'Quand $u_e$ est constante, $\\dfrac{\\mathrm{d}u_e}{\\mathrm{d}t} = 0$, donc $u_s = 0$.',
        'Quand le faisceau est coupé, $u_e$ monte brusquement : la dérivée est très grande et positive, la sortie donne une impulsion brève négative (souvent jusqu’à $-V_{sat}$).',
        'Quand le faisceau est rétabli, $u_e$ redescend : l’impulsion est positive. Le compteur n’en compte qu’une sorte, une par élève.',
      ],
    },
  ],
};
