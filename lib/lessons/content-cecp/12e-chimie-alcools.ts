// Importé du site cecp (physique-3d, chapitre « alcools ») par scripts/import-cecp.ts.
// Une nouvelle importation remplace ce fichier.
import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook: 'Le groupe hydroxyle –OH lié à un carbone tétraédrique.',
  objectives: [],
  sections: [
    {
      title: 'Définition et nomenclature',
      blocks: [
        {
          kind: 'callout',
          variant: 'methode',
          title: 'Déterminer une formule brute',
          blocks: [
            {
              kind: 'text',
              text: 'On écrit la formule générale de la famille, on exprime la masse molaire en fonction de $n$ (ou un pourcentage massique), puis on résout. Exemple : un alcool de masse molaire 74 g/mol vérifie $14n + 18 = 74$, donc $n = 4$ : $C_4H_{10}O$.',
            },
          ],
        },
        {
          kind: 'text',
          text: "Un alcool possède un groupe hydroxyle $-OH$ lié à un carbone **tétraédrique** (qui ne porte pas de double liaison). Formule générale d'un alcool saturé : $C_nH_{2n+1}OH$, soit $C_nH_{2n+2}O$.",
        },
        {
          kind: 'formula',
          tex: 'M = 14n + 18\\ \\text{g/mol}',
          legend: [
            "$n$ : nombre d'atomes de carbone",
          ],
        },
        {
          kind: 'text',
          text: "Nom : on remplace le « e » final de l'alcane correspondant par « ol », précédé de l'indice de position du carbone fonctionnel (le plus petit possible). Exemples : propan-2-ol, 2-méthylbutan-2-ol.",
        },
      ],
    },
    {
      title: "Classes d'alcools",
      blocks: [
        {
          kind: 'table',
          head: [
            'Classe',
            'Carbone fonctionnel lié à',
            'Exemple',
          ],
          rows: [
            [
              'primaire (I)',
              '1 carbone (ou aucun)',
              'éthanol $CH_3-CH_2-OH$',
            ],
            [
              'secondaire (II)',
              '2 carbones',
              'propan-2-ol $CH_3-CH(OH)-CH_3$',
            ],
            [
              'tertiaire (III)',
              '3 carbones',
              '2-méthylpropan-2-ol $(CH_3)_3C-OH$',
            ],
          ],
        },
        {
          kind: 'text',
          text: "Les alcools sont solubles dans l'eau (pour les chaînes courtes) et ont des températures d'ébullition élevées grâce aux **liaisons hydrogène** entre groupes –OH.",
        },
      ],
    },
    {
      title: 'Obtention',
      blocks: [
        {
          kind: 'list',
          items: [
            "**Hydratation d'un alcène** (catalyse acide) : $CH_2=CH_2 + H_2O \\rightarrow CH_3-CH_2OH$. Avec un alcène dissymétrique, le groupe OH se fixe surtout sur le carbone le plus substitué (règle de Markovnikov).",
            '**Fermentation alcoolique** des sucres : $C_6H_{12}O_6 \\rightarrow 2\\,C_2H_5OH + 2\\,CO_2$ (bière de mil, dolo, vin de palme).',
          ],
        },
      ],
    },
    {
      title: 'Réactions des alcools',
      blocks: [
        {
          kind: 'list',
          items: [
            '**Combustion complète** : $C_nH_{2n+2}O + \\frac{3n}{2}O_2 \\rightarrow n\\,CO_2 + (n+1)H_2O$.',
            '**Déshydratation intramoléculaire** (≈ 170 °C, Al₂O₃) : alcool → alcène + eau.',
            '**Déshydratation intermoléculaire** (≈ 140 °C) : 2 alcools → éther-oxyde + eau.',
            '**Action du sodium** : $2\\,ROH + 2\\,Na \\rightarrow 2\\,RO^- + 2\\,Na^+ + H_2$.',
          ],
        },
      ],
    },
    {
      title: 'Oxydation ménagée',
      blocks: [
        {
          kind: 'text',
          text: 'Avec un oxydant doux en milieu acide (dichromate $Cr_2O_7^{2-}$ orange → $Cr^{3+}$ vert, ou permanganate $MnO_4^-$ violet → $Mn^{2+}$ incolore), la chaîne carbonée est conservée :',
        },
        {
          kind: 'formula',
          tex: '\\text{alcool I} \\xrightarrow{\\ -2e^-\\ } \\text{aldéhyde} \\xrightarrow{\\ -2e^-\\ } \\text{acide carboxylique} \\qquad \\text{alcool II} \\xrightarrow{\\ -2e^-\\ } \\text{cétone}',
        },
        {
          kind: 'text',
          text: "Un alcool tertiaire n'est pas oxydé dans ces conditions. Avec un **défaut** d'oxydant, un alcool primaire donne surtout l'aldéhyde ; avec un **excès**, l'acide carboxylique.",
        },
        {
          kind: 'formula',
          tex: 'Cr_2O_7^{2-} + 14H^+ + 6e^- \\rightarrow 2Cr^{3+} + 7H_2O \\qquad R-CH_2OH \\rightarrow R-CHO + 2H^+ + 2e^-',
          label: 'Demi-équations',
        },
      ],
    },
    {
      title: 'Identifier le produit',
      blocks: [
        {
          kind: 'table',
          head: [
            'Test',
            'Aldéhyde',
            'Cétone',
            'Acide',
          ],
          rows: [
            [
              '2,4-DNPH',
              'précipité jaune-orangé',
              'précipité jaune-orangé',
              '—',
            ],
            [
              'Liqueur de Fehling (chauffée)',
              'précipité rouge brique',
              '—',
              '—',
            ],
            [
              'Réactif de Tollens',
              "miroir d'argent",
              '—',
              '—',
            ],
            [
              'Réactif de Schiff',
              'rose',
              '—',
              '—',
            ],
            [
              'BBT',
              '—',
              '—',
              'jaune (pH acide)',
            ],
          ],
        },
      ],
    },
  ],
  essentials: [],
  exercises: [
    {
      id: 'alc-formule',
      level: 1,
      title: "Formule brute d'un alcool",
      statement: 'Un monoalcool saturé A a une masse molaire de 60 g/mol (C = 12, H = 1, O = 16 g/mol).',
      given: [
        {
          label: 'M(A)',
          value: '60 g/mol',
        },
        {
          label: 'formule générale',
          value: 'CₙH₂ₙ₊₂O',
        },
      ],
      parts: [
        {
          label: "Détermine le nombre $n$ d'atomes de carbone.",
          answer: {
            kind: 'number',
            value: 3,
            tolerance: 0.1,
            unit: '',
          },
          steps: [
            '$M = 12n + 2n + 2 + 16 = 14n + 18$',
            '$14n + 18 = 60 \\Rightarrow n = 3$',
          ],
          result: 'n = 3 \\Rightarrow C_3H_8O',
        },
        {
          label: "Combien d'alcools isomères ont cette formule ?",
          answer: {
            kind: 'number',
            value: 2,
            tolerance: 0.1,
            unit: '',
          },
          steps: [
            'Propan-1-ol $CH_3-CH_2-CH_2-OH$ et propan-2-ol $CH_3-CH(OH)-CH_3$.',
          ],
          result: '2\\ \\text{alcools}',
        },
        {
          label: 'Quelle est la classe du propan-2-ol ?',
          answer: {
            kind: 'text',
            display: 'secondaire',
            accepted: [
              'secondaire',
              'II',
              'classe II',
              'alcool secondaire',
            ],
          },
          steps: [
            'Le carbone fonctionnel est lié à deux atomes de carbone : alcool secondaire.',
          ],
          result: '\\text{secondaire}',
        },
      ],
    },
    {
      id: 'alc-oxydation',
      level: 2,
      title: 'Oxydation ménagée du propan-1-ol',
      statement: 'On oxyde 6,0 g de propan-1-ol par une solution acidifiée de dichromate de potassium à 0,50 mol/L. Couple : $Cr_2O_7^{2-}/Cr^{3+}$.',
      given: [
        {
          label: 'm(propan-1-ol)',
          value: '6,0 g',
        },
        {
          label: '[Cr₂O₇²⁻]',
          value: '0,50 mol/L',
        },
      ],
      parts: [
        {
          label: "Avec un défaut d'oxydant, quel produit obtient-on ? (nom)",
          answer: {
            kind: 'text',
            display: 'propanal',
            accepted: [
              'propanal',
              'le propanal',
            ],
          },
          steps: [
            "Un alcool primaire donne un aldéhyde avec un défaut d'oxydant : $CH_3-CH_2-CHO$.",
          ],
          result: '\\text{propanal}',
        },
        {
          label: "Avec un excès d'oxydant, quel produit obtient-on ? (nom)",
          answer: {
            kind: 'text',
            display: 'acide propanoïque',
            accepted: [
              'acide propanoïque',
              'acide propanoique',
              "l'acide propanoïque",
              'propanoic acid',
            ],
          },
          steps: [
            "L'aldéhyde est oxydé à son tour en acide carboxylique : $CH_3-CH_2-COOH$.",
          ],
          result: '\\text{acide propanoïque}',
        },
        {
          label: "Quel volume minimal de solution oxydante faut-il pour obtenir l'acide (en mL) ?",
          answer: {
            kind: 'number',
            value: 133.33333,
            tolerance: 2,
            unit: 'mL',
          },
          steps: [
            '$n(\\text{alcool}) = \\dfrac{6{,}0}{60} = 0{,}10$ mol',
            'Alcool → acide : $R-CH_2OH + H_2O \\rightarrow R-COOH + 4H^+ + 4e^-$ ; dichromate : 6 e⁻.',
            '$3\\,R-CH_2OH + 2\\,Cr_2O_7^{2-} + 16H^+ \\rightarrow 3\\,R-COOH + 4\\,Cr^{3+} + 11\\,H_2O$',
            '$n(Cr_2O_7^{2-}) = \\dfrac{2}{3}\\times 0{,}10 = 0{,}0667$ mol ; $V = \\dfrac{n}{C} = 133$ mL',
          ],
          result: 'V \\approx 133\\ \\text{mL}',
        },
      ],
    },
    {
      id: 'alc-identification',
      level: 2,
      title: 'Identifier un alcool inconnu',
      statement: 'Un monoalcool saturé A contient 64{,}86 % de carbone en masse. Son oxydation ménagée donne un composé B qui réagit avec la DNPH mais pas avec la liqueur de Fehling. A est chiral.',
      given: [
        {
          label: '%C',
          value: '64,86 %',
        },
      ],
      parts: [
        {
          label: "Détermine le nombre $n$ d'atomes de carbone de A.",
          answer: {
            kind: 'number',
            value: 4,
            tolerance: 0.1,
            unit: '',
          },
          steps: [
            '$\\dfrac{12n}{14n + 18} = 0{,}6486$',
            '$12n = 0{,}6486(14n + 18) \\Rightarrow n = 4$ : $C_4H_{10}O$',
          ],
          result: 'n = 4',
        },
        {
          label: 'Quelle est la classe de A ?',
          answer: {
            kind: 'text',
            display: 'secondaire',
            accepted: [
              'secondaire',
              'II',
              'alcool secondaire',
              'classe II',
            ],
          },
          steps: [
            'B réagit avec la DNPH (composé carbonylé) mais pas avec la liqueur de Fehling : B est une cétone.',
            "Une cétone provient d'un alcool secondaire.",
          ],
          result: '\\text{secondaire}',
        },
        {
          label: 'Donne le nom de B.',
          answer: {
            kind: 'text',
            display: 'butanone',
            accepted: [
              'butanone',
              'la butanone',
              'butan-2-one',
            ],
          },
          steps: [
            'Le seul alcool secondaire en $C_4$ est le butan-2-ol (chiral) : A = butan-2-ol, B = butanone $CH_3-CO-CH_2-CH_3$.',
          ],
          result: '\\text{butanone}',
        },
      ],
    },
    {
      id: 'alc-fermentation',
      level: 3,
      title: 'Fermentation et combustion',
      statement: "Lors de la fabrication d'une boisson fermentée, 1,0 kg de glucose $C_6H_{12}O_6$ est transformé en éthanol : $C_6H_{12}O_6 \\rightarrow 2\\,C_2H_5OH + 2\\,CO_2$. Masse volumique de l'éthanol : 0,79 g/mL ; volume molaire des gaz : 24 L/mol.",
      given: [
        {
          label: 'm(glucose)',
          value: '1,0 kg',
        },
        {
          label: 'ρ(éthanol)',
          value: '0,79 g/mL',
        },
        {
          label: 'Vm',
          value: '24 L/mol',
        },
      ],
      parts: [
        {
          label: "Quelle masse d'éthanol obtient-on au maximum (en g) ?",
          answer: {
            kind: 'number',
            value: 511.11111,
            tolerance: 3,
            unit: 'g',
          },
          steps: [
            '$n(\\text{glucose}) = \\dfrac{1000}{180} = 5{,}56$ mol',
            '$n(\\text{éthanol}) = 2\\,n(\\text{glucose})$ ; $m = 11{,}11\\times 46 \\approx 511$ g',
          ],
          result: 'm \\approx 511\\ \\text{g}',
        },
        {
          label: "Quel volume d'éthanol pur cela représente-t-il (en mL) ?",
          answer: {
            kind: 'number',
            value: 646.97609,
            tolerance: 4,
            unit: 'mL',
          },
          steps: [
            '$V = \\dfrac{m}{\\rho} = \\dfrac{511}{0{,}79} \\approx 647$ mL',
          ],
          result: 'V \\approx 647\\ \\text{mL}',
        },
        {
          label: 'Quel volume de dioxyde de carbone se dégage pendant la fermentation (en L) ?',
          answer: {
            kind: 'number',
            value: 266.66667,
            tolerance: 2,
            unit: 'L',
          },
          steps: [
            '$n(CO_2) = 2\\,n(\\text{glucose}) = 11{,}11$ mol ; $V = n\\,V_m \\approx 267$ L',
          ],
          result: 'V(CO_2) \\approx 267\\ \\text{L}',
        },
      ],
    },
  ],
  quiz: [],
  applications: [
    {
      title: "L'éthylotest chimique",
      tagline: "Pourquoi les cristaux passent-ils de l'orange au vert ?",
      situation: "Un éthylotest jetable contient des cristaux de dichromate de potassium acidifié (orange). L'éthanol de l'haleine les réduit en ions $Cr^{3+}$ (verts) en s'oxydant en éthanal.",
      model: "C'est une oxydation ménagée d'un alcool primaire avec un défaut d'oxydant : $3\\,CH_3CH_2OH + Cr_2O_7^{2-} + 8H^+ \\rightarrow 3\\,CH_3CHO + 2Cr^{3+} + 7H_2O$.",
      questions: [
        "Le tube contient 0,10 mmol d'ions dichromate. Quelle masse maximale d'éthanol (en mg) peuvent-ils oxyder ?",
      ],
      check: {
        value: 13.8,
        tolerance: 0.02,
        unit: 'mg',
      },
      solution: [
        "D'après l'équation, 1 ion dichromate oxyde 3 molécules d'éthanol.",
        '$n(\\text{éthanol}) = 3\\times 0{,}10 = 0{,}30$ mmol ; $m = 0{,}30\\times 46 = 13,8$ mg',
      ],
      fact: "L'alcool au volant multiplie le risque d'accident. La longueur de la zone devenue verte dans le tube indique la quantité d'alcool expirée.",
    },
    {
      title: 'Le dolo, bière de mil',
      tagline: "Quelle masse d'alcool dans un litre ?",
      situation: "Le dolo est une bière traditionnelle obtenue par fermentation du mil ou du sorgho germé. On suppose qu'elle titre 4 % en volume d'éthanol (4 mL d'éthanol pur pour 100 mL). Masse volumique de l'éthanol : 0,79 g/mL.",
      model: 'Pendant la fermentation, des levures transforment les sucres en éthanol et en dioxyde de carbone : $C_6H_{12}O_6 \\rightarrow 2\\,C_2H_5OH + 2\\,CO_2$.',
      questions: [
        "Calcule la masse d'éthanol contenue dans 1 L de dolo (en g).",
      ],
      check: {
        value: 31.6,
        tolerance: 0.02,
        unit: 'g',
      },
      solution: [
        "Volume d'éthanol : $V = 0{,}04\\times 1000 = 40$ mL",
        '$m = \\rho V = 0{,}79\\times 40 = 31,6$ g',
      ],
      fact: "Si on laisse le dolo trop longtemps à l'air, des bactéries oxydent l'éthanol en acide éthanoïque : la boisson devient aigre, comme du vinaigre.",
    },
  ],
};
