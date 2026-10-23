// Importé du site cecp (physique-3d, chapitre « effet-photoelectrique ») par scripts/import-cecp.ts.
// Une nouvelle importation remplace ce fichier.
import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook: 'Quand la lumière se comporte comme un faisceau de particules : les photons.',
  objectives: [],
  sections: [
    {
      title: "L'expérience",
      blocks: [
        {
          kind: 'callout',
          variant: 'retenir',
          blocks: [
            {
              kind: 'list',
              items: [
                '$E = h\\nu = hc/\\lambda$',
                '$h\\nu = W_0 + E_{c,max}$ ; émission si $\\lambda < \\lambda_0 = hc/W_0$',
                '$eU_0 = E_{c,max}$',
                "L'intensité change le nombre d'électrons, pas leur énergie",
              ],
            },
          ],
        },
        {
          kind: 'text',
          text: "Une plaque de zinc chargée négativement, fixée sur un électroscope, se décharge quand on l'éclaire en lumière ultraviolette : la lumière arrache des électrons au métal. C'est l'**effet photoélectrique** (Hertz, 1887). Avec une cellule photoélectrique (cathode métallique + anode dans une ampoule vide), on mesure un courant.",
        },
        {
          kind: 'list',
          items: [
            "Il existe un **seuil** : l'émission n'a lieu que si la fréquence $\\nu$ de la lumière est supérieure à une fréquence seuil $\\nu_0$ (ou $\\lambda < \\lambda_0$) qui dépend du métal.",
            "Sous le seuil, aucune émission, **quelle que soit l'intensité** de la lumière.",
            "Au-dessus du seuil, l'intensité du courant est proportionnelle à la puissance lumineuse, mais l'énergie cinétique maximale des électrons ne dépend que de $\\nu$.",
          ],
        },
        {
          kind: 'callout',
          variant: 'attention',
          blocks: [
            {
              kind: 'text',
              text: 'Le modèle ondulatoire ne peut pas expliquer le seuil : une onde intense devrait toujours finir par arracher des électrons.',
            },
          ],
        },
      ],
    },
    {
      title: 'Le photon (Einstein, 1905)',
      blocks: [
        {
          kind: 'text',
          text: "La lumière est constituée de grains d'énergie, les **photons**, de masse nulle, se déplaçant à la vitesse $c$. Chaque photon transporte un quantum d'énergie :",
        },
        {
          kind: 'formula',
          tex: 'E = h\\,\\nu = \\frac{h\\,c}{\\lambda}',
          legend: [
            '$h = 6{,}63 \\cdot 10^{-34}$ J·s (constante de Planck)',
            '$c = 3 \\cdot 10^{8}$ m/s',
            '$1\\ \\text{eV} = 1{,}6 \\cdot 10^{-19}$ J',
            'Utile : $E(\\text{eV}) \\approx 1240 / \\lambda(\\text{nm})$',
          ],
        },
      ],
    },
    {
      title: "La relation d'Einstein",
      blocks: [
        {
          kind: 'text',
          text: "Un photon absorbé cède toute son énergie à un électron. Une partie, $W_0$ (**travail d'extraction**), sert à arracher l'électron du métal ; le reste devient énergie cinétique :",
        },
        {
          kind: 'formula',
          tex: 'h\\nu = W_0 + E_{c,max} \\qquad W_0 = h\\nu_0 = \\frac{hc}{\\lambda_0}',
          label: "Relation d'Einstein",
        },
        {
          kind: 'list',
          items: [
            "Condition d'émission : $h\\nu > W_0$, soit $\\nu > \\nu_0$ ou $\\lambda < \\lambda_0$.",
            "Potentiel d'arrêt $U_0$ : tension qui arrête les électrons les plus rapides, $eU_0 = E_{c,max}$.",
            "Le graphe $E_{c,max} = f(\\nu)$ est une droite de pente $h$ qui coupe l'axe des fréquences en $\\nu_0$.",
          ],
        },
        {
          kind: 'table',
          head: [
            'Métal',
            'W₀ (eV)',
            'λ₀ (nm)',
          ],
          rows: [
            [
              'Césium',
              '1,9',
              '654',
            ],
            [
              'Potassium',
              '2,25',
              '553',
            ],
            [
              'Sodium',
              '2,3',
              '541',
            ],
            [
              'Zinc',
              '4,3',
              '289 (UV)',
            ],
          ],
        },
      ],
    },
    {
      title: 'Dualité onde-corpuscule et applications',
      blocks: [
        {
          kind: 'text',
          text: "La lumière se comporte comme une onde (interférences, diffraction) et comme un flux de particules (effet photoélectrique) : c'est la **dualité onde-corpuscule**. Applications : cellules photoélectriques (ouverture automatique des portes), capteurs d'appareils photo, panneaux solaires photovoltaïques.",
        },
      ],
    },
  ],
  essentials: [],
  exercises: [
    {
      id: 'pe-photon',
      level: 1,
      title: "L'énergie d'un photon",
      statement: "On considère une lumière verte de longueur d'onde $\\lambda = 500$ nm dans le vide.",
      given: [
        {
          label: 'h',
          value: '6,63·10⁻³⁴ J·s',
        },
        {
          label: 'c',
          value: '3·10⁸ m/s',
        },
        {
          label: '1 eV',
          value: '1,6·10⁻¹⁹ J',
        },
      ],
      parts: [
        {
          label: "Calcule l'énergie d'un photon (en $10^{-19}$ J).",
          answer: {
            kind: 'number',
            value: 3.978,
            tolerance: 0.03,
            unit: '×10⁻¹⁹ J',
          },
          steps: [
            '$E = h\\nu = \\dfrac{hc}{\\lambda}$',
            '$E = \\dfrac{6{,}63 \\cdot 10^{-34} \\times 3 \\cdot 10^{8}}{500 \\cdot 10^{-9}} \\approx 3{,}98 \\cdot 10^{-19}$ J',
          ],
          result: 'E = \\frac{hc}{\\lambda} \\approx 3{,}98 \\cdot 10^{-19}\\ \\text{J}',
        },
        {
          label: 'Exprime cette énergie en électronvolts.',
          answer: {
            kind: 'number',
            value: 2.48625,
            tolerance: 0.02,
            unit: 'eV',
          },
          steps: [
            '$E = \\dfrac{3{,}98 \\cdot 10^{-19}}{1{,}6 \\cdot 10^{-19}} \\approx 2{,}49$ eV',
          ],
          result: 'E \\approx 2{,}49\\ \\text{eV}',
        },
      ],
    },
    {
      id: 'pe-cesium',
      level: 2,
      title: 'Une cellule photoélectrique au césium',
      statement: "La cathode d'une cellule photoélectrique est en césium, de travail d'extraction $W_0 = 1{,}9$ eV. On l'éclaire avec une lumière bleue de longueur d'onde $\\lambda = 450$ nm.",
      given: [
        {
          label: 'W0',
          value: '1,9 eV',
        },
        {
          label: 'λ',
          value: '450 nm',
        },
        {
          label: 'h',
          value: '6,63·10⁻³⁴ J·s',
        },
        {
          label: 'm_e',
          value: '9,11·10⁻³¹ kg',
        },
      ],
      parts: [
        {
          label: "Calcule la longueur d'onde seuil $\\lambda_0$ du césium (en nm).",
          answer: {
            kind: 'number',
            value: 654.27632,
            tolerance: 3,
            unit: 'nm',
          },
          steps: [
            "Au seuil, l'énergie du photon est juste égale au travail d'extraction : $\\dfrac{hc}{\\lambda_0} = W_0$",
            '$\\lambda_0 = \\dfrac{hc}{W_0} = \\dfrac{6{,}63 \\cdot 10^{-34} \\times 3 \\cdot 10^{8}}{1{,}9 \\times 1{,}6 \\cdot 10^{-19}} \\approx 654$ nm',
            "Comme $\\lambda = 450$ nm $< \\lambda_0$, il y a bien émission d'électrons.",
          ],
          result: '\\lambda_0 = \\frac{hc}{W_0} \\approx 654\\ \\text{nm}',
        },
        {
          label: "Calcule l'énergie cinétique maximale des électrons émis (en eV).",
          answer: {
            kind: 'number',
            value: 0.8625,
            tolerance: 0.02,
            unit: 'eV',
          },
          steps: [
            "Relation d'Einstein : $E_{c,max} = h\\nu - W_0 = \\dfrac{hc}{\\lambda} - W_0$",
            '$\\dfrac{hc}{\\lambda} \\approx 2{,}76$ eV, donc $E_{c,max} \\approx 0{,}86$ eV',
          ],
          result: 'E_{c,max} = \\frac{hc}{\\lambda} - W_0 \\approx 0{,}86\\ \\text{eV}',
        },
        {
          label: 'En déduire leur vitesse maximale (en $10^{5}$ m/s).',
          answer: {
            kind: 'number',
            value: 5.5042145,
            tolerance: 0.05,
            unit: '×10⁵ m/s',
          },
          steps: [
            '$v_{max} = \\sqrt{\\dfrac{2E_{c,max}}{m_e}}$ avec $E_{c,max}$ en joules',
            '$v_{max} = \\sqrt{\\dfrac{2 \\times 1{,}380 \\cdot 10^{-19}}{9{,}11 \\cdot 10^{-31}}} \\approx 5{,}50 \\cdot 10^{5}$ m/s',
          ],
          result: 'v_{max} \\approx 5{,}50 \\cdot 10^{5}\\ \\text{m/s}',
        },
      ],
    },
    {
      id: 'pe-planck',
      level: 3,
      title: 'Retrouver la constante de Planck',
      source: 'Type bac',
      statement: "On éclaire une même cathode avec deux radiations et on mesure le potentiel d'arrêt $U_0$ (tension qui annule le courant) : $\\lambda_1 = 400$ nm donne $U_{01} = 1{,}21$ V et $\\lambda_2 = 500$ nm donne $U_{02} = 0{,}59$ V.",
      given: [
        {
          label: 'λ1 ; U01',
          value: '400 nm ; 1,21 V',
        },
        {
          label: 'λ2 ; U02',
          value: '500 nm ; 0,59 V',
        },
        {
          label: 'e',
          value: '1,6·10⁻¹⁹ C',
        },
        {
          label: 'c',
          value: '3·10⁸ m/s',
        },
      ],
      parts: [
        {
          label: 'Calcule la constante de Planck $h$ (en $10^{-34}$ J·s).',
          answer: {
            kind: 'number',
            value: 6.6133333,
            tolerance: 0.05,
            unit: '×10⁻³⁴ J·s',
          },
          steps: [
            'Pour chaque radiation : $eU_0 = E_{c,max} = \\dfrac{hc}{\\lambda} - W_0$',
            "En faisant la différence, $W_0$ s'élimine : $e(U_{01} - U_{02}) = hc\\left(\\dfrac{1}{\\lambda_1} - \\dfrac{1}{\\lambda_2}\\right)$",
            '$h = \\dfrac{1{,}6 \\cdot 10^{-19} \\times 0{,}62}{3 \\cdot 10^{8} \\times (2{,}5 - 2) \\cdot 10^{6}} \\approx 6{,}61 \\cdot 10^{-34}$ J·s',
          ],
          result: 'h \\approx 6{,}61 \\cdot 10^{-34}\\ \\text{J}\\cdot\\text{s}',
        },
        {
          label: "Calcule le travail d'extraction du métal (en eV). De quel métal s'agit-il ?",
          answer: {
            kind: 'number',
            value: 1.89,
            tolerance: 0.03,
            unit: 'eV',
          },
          steps: [
            '$W_0 = \\dfrac{hc}{\\lambda_1} - eU_{01}$, soit en eV : $W_0 = 3{,}10 - 1{,}21 \\approx 1{,}89$ eV',
            "C'est le césium ($W_0 = 1{,}9$ eV).",
          ],
          result: 'W_0 \\approx 1{,}89\\ \\text{eV}',
        },
      ],
    },
    {
      id: 'pe-flux',
      level: 1,
      title: 'Combien de photons dans un pointeur laser ?',
      source: 'Vie réelle',
      statement: 'Un pointeur laser rouge ($\\lambda = 650$ nm) émet une puissance lumineuse $P = 1$ mW.',
      given: [
        {
          label: 'P',
          value: '1 mW',
        },
        {
          label: 'λ',
          value: '650 nm',
        },
        {
          label: 'h',
          value: '6,63·10⁻³⁴ J·s',
        },
      ],
      parts: [
        {
          label: 'Combien de photons émet-il par seconde (en $10^{15}$) ?',
          answer: {
            kind: 'number',
            value: 3.2679739,
            tolerance: 0.05,
            unit: '×10¹⁵ /s',
          },
          steps: [
            "Énergie d'un photon : $E = \\dfrac{hc}{\\lambda} \\approx 3{,}06 \\cdot 10^{-19}$ J",
            "Chaque seconde, l'énergie émise est $P \\times 1\\ \\text{s} = N E$",
            '$N = \\dfrac{P}{E} = \\dfrac{10^{-3}}{3{,}06 \\cdot 10^{-19}} \\approx 3{,}27 \\cdot 10^{15}$ photons par seconde',
          ],
          result: 'N = \\frac{P\\lambda}{hc} \\approx 3{,}27 \\cdot 10^{15}\\ \\text{s}^{-1}',
        },
      ],
    },
  ],
  quiz: [],
  applications: [
    {
      title: "La cellule photoélectrique d'une porte",
      tagline: 'Quelle lumière peut déclencher le capteur ?',
      situation: "Certaines portes automatiques et barrières de parking utilisent une cellule photoélectrique : un faisceau lumineux éclaire une cathode en césium ($W_0 = 1{,}9$ eV). Quand quelqu'un coupe le faisceau, le courant s'arrête.",
      model: "Il n'y a émission d'électrons que si l'énergie d'un photon dépasse le travail d'extraction : $\\dfrac{hc}{\\lambda} > W_0$, soit $\\lambda < \\lambda_0 = \\dfrac{hc}{W_0}$.",
      questions: [
        "Calcule la longueur d'onde seuil du césium (en nm).",
      ],
      check: {
        value: 654.27632,
        tolerance: 0.02,
        unit: 'nm',
      },
      solution: [
        '$\\lambda_0 = \\dfrac{hc}{W_0}$ avec $W_0 = 1{,}9\\times 1{,}6\\times10^{-19}$ J',
        "A.N. : $\\lambda_0 = \\dfrac{6{,}63\\times10^{-34}\\times 3\\times10^8}{3{,}04\\times10^{-19}} \\approx 654$ nm : toute lumière de longueur d'onde plus courte (jusqu'au rouge) convient.",
      ],
      fact: "Le césium est choisi car son travail d'extraction est l'un des plus faibles : presque toute la lumière visible suffit à le faire fonctionner.",
    },
    {
      title: 'Combien de photons dans un pointeur laser ?',
      tagline: 'Des milliards de milliards de grains de lumière',
      situation: "Un pointeur laser rouge de professeur émet une puissance lumineuse de 1 mW à la longueur d'onde de 650 nm.",
      model: "La lumière est un flux de photons d'énergie $E = \\dfrac{hc}{\\lambda}$. La puissance est l'énergie transportée par seconde : $P = N\\,E$.",
      questions: [
        'Calcule le nombre de photons émis par seconde, en multiples de 10¹⁵ (ex : 2,5 pour 2,5×10¹⁵).',
      ],
      check: {
        value: 3.2679739,
        tolerance: 0.03,
        unit: '×10¹⁵ /s',
      },
      solution: [
        "Énergie d'un photon : $E = \\dfrac{hc}{\\lambda} \\approx 3,06\\times10^{-19}$ J",
        '$N = \\dfrac{P}{E} = \\dfrac{10^{-3}}{3,06\\times10^{-19}} \\approx 3,27\\times10^{15}$ photons par seconde',
      ],
      fact: "Ne jamais diriger un laser vers les yeux : même 1 mW, concentré sur un point minuscule de la rétine, peut l'abîmer.",
    },
  ],
};
