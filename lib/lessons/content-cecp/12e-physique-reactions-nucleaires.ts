// Importé du site cecp (physique-3d, chapitre « radioactivite ») par scripts/import-cecp.ts.
// Une nouvelle importation remplace ce fichier.
import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook: 'Des noyaux instables qui se transforment spontanément.',
  objectives: [],
  sections: [
    {
      title: 'Le noyau et les lois de conservation',
      blocks: [
        {
          kind: 'callout',
          variant: 'retenir',
          blocks: [
            {
              kind: 'list',
              items: [
                'Conservation de $A$ et de $Z$',
                '$N = N_0 e^{-\\lambda t}$, $T = \\ln 2/\\lambda$',
                '$A = \\lambda N$ en Bq',
                'Datation : $t = \\dfrac{T}{\\ln 2}\\ln\\dfrac{A_0}{A}$',
              ],
            },
          ],
        },
        {
          kind: 'text',
          text: 'Un noyau $^{A}_{Z}\\text{X}$ contient $Z$ protons et $N = A - Z$ neutrons ($A$ : nombre de masse). Un noyau radioactif se désintègre spontanément en un noyau fils en émettant une particule. Les **lois de Soddy** imposent la conservation du nombre de masse $A$ et du nombre de charge $Z$.',
        },
        {
          kind: 'table',
          head: [
            'Type',
            'Particule émise',
            'Équation générale',
          ],
          rows: [
            [
              'α',
              "noyau d'hélium $^{4}_{2}\\text{He}$",
              '$^{A}_{Z}\\text{X} \\rightarrow {}^{A-4}_{Z-2}\\text{Y} + {}^{4}_{2}\\text{He}$',
            ],
            [
              'β⁻',
              'électron $^{0}_{-1}\\text{e}$',
              '$^{A}_{Z}\\text{X} \\rightarrow {}^{A}_{Z+1}\\text{Y} + {}^{0}_{-1}\\text{e}$',
            ],
            [
              'β⁺',
              'positon $^{0}_{1}\\text{e}$',
              '$^{A}_{Z}\\text{X} \\rightarrow {}^{A}_{Z-1}\\text{Y} + {}^{0}_{1}\\text{e}$',
            ],
            [
              'γ',
              'photon de grande énergie',
              'désexcitation du noyau fils, sans changement de A ni Z',
            ],
          ],
        },
      ],
    },
    {
      title: 'La loi de décroissance radioactive',
      blocks: [
        {
          kind: 'text',
          text: "La désintégration d'un noyau est **aléatoire** : on ne peut pas prévoir quand un noyau donné va se désintégrer. Mais pour un très grand nombre de noyaux, le nombre de désintégrations pendant $dt$ est proportionnel au nombre $N$ de noyaux présents : $dN = -\\lambda N\\,dt$.",
        },
        {
          kind: 'formula',
          tex: 'N(t) = N_0\\,e^{-\\lambda t} \\qquad T = \\frac{\\ln 2}{\\lambda}',
          label: 'Loi de décroissance',
          legend: [
            '$\\lambda$ : constante radioactive (s⁻¹)',
            '$T$ : demi-vie (période radioactive)',
            'Après $n$ demi-vies : $N = N_0 / 2^n$',
          ],
        },
        {
          kind: 'text',
          text: "La **demi-vie** $T$ est la durée au bout de laquelle la moitié des noyaux présents s'est désintégrée. Elle va de quelques microsecondes à des milliards d'années selon le noyau.",
        },
      ],
    },
    {
      title: "L'activité",
      blocks: [
        {
          kind: 'formula',
          tex: 'A(t) = -\\frac{dN}{dt} = \\lambda N(t) = A_0\\,e^{-\\lambda t}',
          legend: [
            '$A$ en becquerels (Bq) : 1 Bq = 1 désintégration par seconde',
            "L'activité suit la même loi que $N$",
          ],
        },
        {
          kind: 'text',
          text: 'Nombre de noyaux dans une masse $m$ : $N = \\dfrac{m}{M}N_A$ ($M$ : masse molaire, $N_A = 6{,}022 \\cdot 10^{23}$ mol⁻¹).',
        },
      ],
    },
    {
      title: 'Application : la datation',
      blocks: [
        {
          kind: 'text',
          text: "Un organisme vivant échange du carbone avec l'atmosphère : sa proportion de carbone 14 est constante. À sa mort, les échanges cessent et le carbone 14 décroît. En mesurant l'activité $A$ d'un échantillon et en la comparant à celle d'un organisme vivant $A_0$ :",
        },
        {
          kind: 'formula',
          tex: 't = \\frac{1}{\\lambda}\\ln\\frac{A_0}{A} = \\frac{T}{\\ln 2}\\ln\\frac{A_0}{A}',
        },
        {
          kind: 'callout',
          variant: 'methode',
          blocks: [
            {
              kind: 'text',
              text: "Le carbone 14 ($T = 5\\,730$ ans) date des objets jusqu'à environ 50 000 ans. Pour les roches, on utilise des noyaux de demi-vie bien plus longue (uranium 238, potassium 40).",
            },
          ],
        },
      ],
    },
  ],
  essentials: [],
  exercises: [
    {
      id: 'rad-iode',
      level: 1,
      title: "L'iode 131 en médecine",
      statement: "L'iode 131, utilisé pour soigner la thyroïde, a une demi-vie $T = 8{,}02$ jours. Un patient reçoit une dose de $N_0$ noyaux.",
      given: [
        {
          label: 'T',
          value: '8,02 jours',
        },
        {
          label: '1 jour',
          value: '86 400 s',
        },
      ],
      parts: [
        {
          label: 'Calcule la constante radioactive $\\lambda$ (en $10^{-6}$ s⁻¹).',
          answer: {
            kind: 'number',
            value: 1.0003163,
            tolerance: 0.01,
            unit: '×10⁻⁶ s⁻¹',
          },
          steps: [
            '$\\lambda = \\dfrac{\\ln 2}{T}$ avec $T$ en secondes',
            '$\\lambda = \\dfrac{0{,}693}{8{,}02 \\times 86\\,400} \\approx 1{,}000 \\cdot 10^{-6}$ s⁻¹',
          ],
          result: '\\lambda = \\frac{\\ln 2}{T} \\approx 1{,}000 \\cdot 10^{-6}\\ \\text{s}^{-1}',
        },
        {
          label: 'Quel pourcentage des noyaux reste-t-il au bout de 24 jours ?',
          answer: {
            kind: 'number',
            value: 12.564989,
            tolerance: 0.3,
            unit: '%',
          },
          steps: [
            '$\\dfrac{N}{N_0} = e^{-\\lambda t} = \\left(\\dfrac12\\right)^{t/T}$',
            '$\\dfrac{N}{N_0} = 0{,}5^{24/8{,}02} \\approx 0{,}1256$, soit environ 12{,}6 %',
            '24 jours ≈ 3 demi-vies : il reste environ 1/8 des noyaux.',
          ],
          result: 'N/N_0 \\approx 12{,}6\\ \\%',
        },
      ],
    },
    {
      id: 'rad-datation',
      level: 2,
      title: 'Dater un bois ancien au carbone 14',
      source: 'Type bac',
      statement: "Dans un organisme vivant, l'activité du carbone 14 est de 13,6 désintégrations par minute et par gramme de carbone. Un morceau de bois retrouvé sur un site archéologique n'a plus qu'une activité de 4,5 désintégrations par minute et par gramme. Demi-vie du carbone 14 : $T = 5\\,730$ ans.",
      given: [
        {
          label: 'A0',
          value: '13,6 min⁻¹·g⁻¹',
        },
        {
          label: 'A',
          value: '4,5 min⁻¹·g⁻¹',
        },
        {
          label: 'T',
          value: '5 730 ans',
        },
      ],
      parts: [
        {
          label: "Calcule l'âge du bois (en années).",
          answer: {
            kind: 'number',
            value: 9142.8438,
            tolerance: 60,
            unit: 'ans',
          },
          steps: [
            "À la mort de l'arbre, le carbone 14 n'est plus renouvelé : $A = A_0 e^{-\\lambda t}$",
            '$t = \\dfrac{1}{\\lambda}\\ln\\dfrac{A_0}{A} = \\dfrac{T}{\\ln 2}\\ln\\dfrac{A_0}{A}$',
            '$t = \\dfrac{5730}{0{,}693}\\ln\\dfrac{13{,}6}{4{,}5} \\approx 9 143$ ans',
          ],
          result: 't = \\frac{T}{\\ln 2}\\ln\\frac{A_0}{A} \\approx 9143\\ \\text{ans}',
        },
      ],
    },
    {
      id: 'rad-equation',
      level: 1,
      title: 'Écrire une équation de désintégration',
      statement: "Le polonium 210 ($^{210}_{84}\\text{Po}$) est radioactif $\\alpha$ : il émet un noyau d'hélium $^{4}_{2}\\text{He}$. On note $^{A}_{Z}\\text{X}$ le noyau fils.",
      given: [
        {
          label: 'Père',
          value: '²¹⁰₈₄Po',
        },
        {
          label: 'Particule α',
          value: '⁴₂He',
        },
      ],
      parts: [
        {
          label: 'Quel est le nombre de masse $A$ du noyau fils ?',
          answer: {
            kind: 'number',
            value: 206,
            tolerance: 0,
            unit: '',
          },
          steps: [
            'Conservation du nombre de nucléons (lois de Soddy) : $210 = A + 4$',
            '$A = 206$',
          ],
          result: 'A = 206',
        },
        {
          label: "Quel est son numéro atomique $Z$ ? (C'est le plomb, Pb.)",
          answer: {
            kind: 'number',
            value: 82,
            tolerance: 0,
            unit: '',
          },
          steps: [
            'Conservation de la charge : $84 = Z + 2$',
            '$Z = 82$ : le noyau fils est le plomb $^{206}_{82}\\text{Pb}$.',
          ],
          result: '{}^{210}_{84}\\text{Po} \\rightarrow {}^{206}_{82}\\text{Pb} + {}^{4}_{2}\\text{He}',
        },
      ],
    },
    {
      id: 'rad-cobalt',
      level: 3,
      title: "Activité d'une source de cobalt 60",
      source: 'Type concours',
      statement: 'Un hôpital utilise une source contenant 1 µg de cobalt 60 (masse molaire 60 g/mol, demi-vie 5,27 ans) pour la radiothérapie.',
      given: [
        {
          label: 'm',
          value: '1 µg',
        },
        {
          label: 'M',
          value: '60 g/mol',
        },
        {
          label: 'T',
          value: '5,27 ans',
        },
        {
          label: 'N_A',
          value: '6,022·10²³ mol⁻¹',
        },
      ],
      parts: [
        {
          label: 'Combien de noyaux de cobalt 60 contient la source (en $10^{16}$) ?',
          answer: {
            kind: 'number',
            value: 1.0036667,
            tolerance: 0.01,
            unit: '×10¹⁶',
          },
          steps: [
            '$N = \\dfrac{m}{M} N_A$',
            '$N = \\dfrac{10^{-6}}{60} \\times 6{,}022 \\cdot 10^{23} \\approx 1{,}004 \\cdot 10^{16}$',
          ],
          result: 'N \\approx 1{,}004 \\cdot 10^{16}',
        },
        {
          label: 'Calcule son activité (en $10^{7}$ Bq).',
          answer: {
            kind: 'number',
            value: 4.1831205,
            tolerance: 0.03,
            unit: '×10⁷ Bq',
          },
          steps: [
            '$\\lambda = \\dfrac{\\ln 2}{5{,}27 \\times 365{,}25 \\times 86\\,400} \\approx 4{,}17 \\cdot 10^{-9}$ s⁻¹',
            '$A = \\lambda N \\approx 4{,}18 \\cdot 10^{7}$ Bq (désintégrations par seconde)',
          ],
          result: 'A = \\lambda N \\approx 4{,}18 \\cdot 10^{7}\\ \\text{Bq}',
        },
        {
          label: 'Quelle sera son activité dans 10 ans (en $10^{7}$ Bq) ?',
          answer: {
            kind: 'number',
            value: 1.1227575,
            tolerance: 0.02,
            unit: '×10⁷ Bq',
          },
          steps: [
            '$A(t) = A_0 \\left(\\dfrac12\\right)^{t/T} = 4{,}18 \\cdot 10^{7} \\times 0{,}5^{10/5{,}27} \\approx 1{,}12 \\cdot 10^{7}$ Bq',
            'La source doit être remplacée régulièrement pour garder un traitement efficace.',
          ],
          result: 'A \\approx 1{,}12 \\cdot 10^{7}\\ \\text{Bq}',
        },
      ],
    },
  ],
  quiz: [],
  applications: [
    {
      title: 'Dater un objet ancien au carbone 14',
      tagline: "Quel âge a ce morceau de bois d'un site archéologique ?",
      situation: "Des archéologues trouvent un morceau de bois brûlé sur un ancien site du delta intérieur du Niger. Son activité en carbone 14 n'est plus que 25 % de celle d'un bois récent.",
      model: "Un être vivant échange du carbone avec l'atmosphère : sa teneur en ¹⁴C reste constante. À sa mort, le ¹⁴C se désintègre ($T = 5730$ ans) : $A = A_0\\,e^{-\\lambda t}$.",
      questions: [
        "Calcule l'âge du bois (en années).",
      ],
      check: {
        value: 11460,
        tolerance: 0.02,
        unit: 'ans',
      },
      solution: [
        '$\\dfrac{A}{A_0} = 0{,}25 = \\dfrac{1}{4} = \\left(\\dfrac12\\right)^2$ : deux demi-vies se sont écoulées.',
        '$t = 2T = 2\\times 5730 = 11460$ ans (ou $t = \\dfrac{T}{\\ln 2}\\ln\\dfrac{A_0}{A}$)',
      ],
      fact: 'Le site de Djenné-Djeno, près de Djenné, a été daté de cette manière : il était déjà habité il y a plus de 2 000 ans.',
    },
    {
      title: "Traitement de la thyroïde à l'iode 131",
      tagline: 'Que reste-t-il du médicament après 24 jours ?',
      situation: "Pour soigner certaines maladies de la thyroïde, on fait avaler au patient une gélule d'iode 131 radioactif (demi-vie 8,02 jours), qui se fixe dans la glande.",
      model: 'Le nombre de noyaux restants suit la loi de décroissance $N = N_0\\,e^{-\\lambda t}$ avec $\\lambda = \\dfrac{\\ln 2}{T}$. Après chaque demi-vie, il en reste la moitié.',
      questions: [
        "Quel pourcentage de l'iode 131 reste-t-il au bout de 24 jours ?",
      ],
      check: {
        value: 12.564989,
        tolerance: 0.03,
        unit: '%',
      },
      solution: [
        '24 jours $\\approx 3$ demi-vies : $\\dfrac{N}{N_0} \\approx \\left(\\dfrac12\\right)^3 = \\dfrac18$',
        'Calcul exact : $\\dfrac{N}{N_0} = e^{-\\frac{\\ln 2}{8{,}02}\\times 24} \\approx 0,126$, soit 12,6 %',
      ],
      fact: "Le patient reste quelques jours en chambre protégée : le rayonnement β⁻ détruit les cellules malades, mais il ne faut pas exposer l'entourage.",
    },
  ],
};
