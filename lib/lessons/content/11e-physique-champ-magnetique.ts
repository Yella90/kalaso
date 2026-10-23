import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Les caravaniers du désert s’orientaient avec les étoiles ; aujourd’hui, l’aiguille d’une boussole indique le nord partout. Elle obéit au **champ magnétique** de la Terre. Mais approche-la d’un câble parcouru par un courant : elle dévie ! Les courants électriques créent eux aussi des champs magnétiques, et c’est le principe de l’électro-aimant.',
  objectives: [
    'décrire les interactions entre aimants et le champ magnétique terrestre ;',
    'représenter un champ magnétique par ses lignes de champ ;',
    'déterminer le sens du champ créé par un courant ;',
    'calculer le champ au centre d’un solénoïde et près d’un fil.',
  ],
  sections: [
    {
      title: 'Aimants et champ magnétique',
      blocks: [
        {
          kind: 'list',
          items: [
            'un aimant a deux pôles, **nord** et **sud** ; deux pôles de même nom se repoussent, de noms différents s’attirent ;',
            'en chaque point, le champ magnétique est représenté par un vecteur $\\vec{B}$, mesuré en **teslas** (T) avec un teslamètre ;',
            'l’aiguille d’une boussole s’oriente selon $\\vec{B}$, du sud vers le nord de l’aiguille ;',
            'les lignes de champ sortent du pôle nord d’un aimant et entrent par son pôle sud ; la limaille de fer les rend visibles (spectre magnétique).',
          ],
        },
        {
          kind: 'text',
          text: 'La Terre se comporte comme un énorme aimant. Au Mali, son champ vaut environ $3 \\times 10^{-5}$ T : c’est très faible comparé à un aimant de frigo (environ $10^{-2}$ T).',
        },
      ],
    },
    {
      title: 'Le champ créé par un courant',
      blocks: [
        {
          kind: 'formula',
          label: 'Fil rectiligne très long',
          tex: 'B = \\dfrac{\\mu_0\\,I}{2\\pi d} = 2 \\times 10^{-7}\\,\\dfrac{I}{d}',
          legend: ['$\\mu_0 = 4\\pi \\times 10^{-7}$ SI ; $I$ en A ; $d$ : distance au fil en m', 'lignes de champ : cercles centrés sur le fil'],
        },
        {
          kind: 'formula',
          label: 'Solénoïde (bobine longue)',
          tex: 'B = \\mu_0\\,\\dfrac{N}{L}\\,I',
          legend: ['$N$ : nombre de spires ; $L$ : longueur (m) ; champ uniforme à l’intérieur'],
        },
        {
          kind: 'callout',
          variant: 'methode',
          title: 'Trouver le sens du champ',
          blocks: [
            {
              kind: 'text',
              text: 'Règle de la main droite : le pouce dans le sens du courant d’un fil, les doigts recourbés indiquent le sens des lignes de champ. Pour une bobine : les doigts suivent le courant dans les spires, le pouce indique le sens de $\\vec{B}$ à l’intérieur (et la face nord).',
            },
          ],
        },
        {
          kind: 'trap',
          wrong: '« Le champ magnétique d’un fil est dirigé le long du fil. »',
          why: 'Les lignes de champ tournent **autour** du fil, dans des plans perpendiculaires.',
          reflex: 'Fil : cercles autour du fil ; solénoïde : lignes parallèles à l’axe à l’intérieur.',
        },
      ],
    },
  ],
  essentials: [
    'Aimant : pôles N et S ; $\\vec{B}$ en teslas, lignes de champ du N vers le S à l’extérieur.',
    'Champ terrestre au Mali : environ $3 \\times 10^{-5}$ T.',
    'Fil : $B = 2 \\times 10^{-7}\\frac{I}{d}$ ; solénoïde : $B = \\mu_0\\frac{N}{L}I$, uniforme à l’intérieur.',
    'Règle de la main droite pour le sens du champ.',
  ],
  exercises: [
    {
      id: 'mag-solenoide',
      level: 1,
      title: 'Un solénoïde',
      statement: 'Un solénoïde de 50 cm de long compte 1 000 spires et est parcouru par 2,0 A. $\\mu_0 = 4\\pi \\times 10^{-7}$ SI.',
      parts: [
        {
          label: 'Valeur du champ à l’intérieur (en T).',
          answer: { kind: 'number', value: 0.005027, tolerance: 0.00003, unit: 'T' },
          steps: ['$B = 4\\pi \\times 10^{-7} \\times \\dfrac{1\\,000}{0{,}50} \\times 2{,}0 \\approx 5{,}0 \\times 10^{-3}$ T.'],
        },
        {
          label: 'Par combien est-il plus fort que le champ terrestre ($3 \\times 10^{-5}$ T) ? (arrondi)',
          answer: { kind: 'number', value: 168, tolerance: 3, unit: '' },
          steps: ['$\\dfrac{5{,}03 \\times 10^{-3}}{3 \\times 10^{-5}} \\approx 168$.'],
        },
      ],
    },
    {
      id: 'mag-fil',
      level: 2,
      title: 'La boussole près du câble',
      statement: 'Un câble rectiligne est parcouru par un courant de 10 A. On pose une boussole à 5,0 cm du câble.',
      parts: [
        {
          label: 'Champ créé par le câble au niveau de la boussole (en T, notation 4e-5 acceptée).',
          answer: { kind: 'number', value: 0.00004, tolerance: 0.0000005, unit: 'T' },
          steps: ['$B = 2 \\times 10^{-7} \\times \\dfrac{10}{0{,}050} = 4{,}0 \\times 10^{-5}$ T.'],
        },
        {
          label: 'La boussole sera-t-elle nettement déviée ? (« oui » ou « non »)',
          answer: { kind: 'text', display: 'oui', accepted: ['oui'] },
          steps: ['Ce champ est du même ordre que le champ terrestre : l’aiguille s’oriente selon la somme des deux, elle est nettement déviée.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'L’unité du champ magnétique est :',
      choices: ['le tesla', 'le volt', 'le newton', 'le weber par mètre'],
      answer: 0,
      explanation: 'On le mesure avec un teslamètre.',
    },
    {
      question: 'À l’extérieur d’un aimant, les lignes de champ vont :',
      choices: ['du pôle nord vers le pôle sud', 'du pôle sud vers le pôle nord', 'en cercle autour de l’aimant', 'au hasard'],
      answer: 0,
      explanation: 'Elles sortent par le nord et rentrent par le sud.',
    },
    {
      question: 'Si l’on double le courant dans un solénoïde, le champ intérieur :',
      choices: ['double', 'est multiplié par 4', 'ne change pas', 'est divisé par 2'],
      answer: 0,
      explanation: '$B$ est proportionnel à $I$.',
    },
    {
      question: 'Les lignes de champ d’un fil rectiligne sont :',
      choices: ['des cercles centrés sur le fil', 'des droites parallèles au fil', 'des droites qui partent du fil', 'des spirales'],
      answer: 0,
      explanation: 'Elles s’enroulent autour du fil.',
    },
  ],
  applications: [
    {
      title: 'L’électro-aimant de la ferraille',
      tagline: 'Un aimant qu’on allume et qu’on éteint',
      situation:
        'Dans une casse de Bamako, une grue soulève les carcasses de voitures avec un gros électro-aimant : une bobine enroulée sur un noyau de fer, alimentée par un courant.',
      model: 'Le noyau de fer multiplie le champ de la bobine ; sans courant, le champ disparaît presque entièrement.',
      questions: ['Comment l’opérateur lâche-t-il la ferraille ?', 'Pourquoi ne peut-on pas soulever ainsi une marmite en aluminium ?'],
      solution: [
        'Il coupe le courant : le champ magnétique disparaît et la ferraille tombe.',
        'L’aluminium n’est pas attiré par un aimant : seuls le fer, le nickel, le cobalt et leurs alliages le sont fortement.',
      ],
      fact: 'Les sonnettes, les relais et les serrures électriques fonctionnent aussi avec de petits électro-aimants.',
    },
  ],
};
