import { CH4, CO2, ETHANOL, H2, H2O, HCL, METHOXYMETHANE, N2, NH3, O2 } from '../content/10e-chimie-covalente';
import type { LewisMolecule, Lesson } from '../types';

// Bamanankan — BROUILLON À FAIRE RELIRE. Les formules et les schémas sont ceux de la version française.

/** Même schéma, légende traduite. */
const named = (molecule: LewisMolecule, name: string): LewisMolecule => ({ ...molecule, name });

export const lesson: Lesson = {
  hook:
    'Te sukaro bɛ yeli ji la, i n’a fɔ kɔgɔ. Nka sukaroji tɛ kuran tɛmɛ : iyɔn tɛ a kɔnɔ. Sukaro, ji, fɔrɔnɔ butani gazi, i bɛ fiɲɛ min ninakili : olu dilannen don ni **molekiliw** ye. U ka atɔmuw tɛ ɛlɛkitɔrɔnw minɛ ɲɔgɔn bolo : u bɛ u **tila** ɲɔgɔn cɛ.',
  objectives: [
    'kovalan siri (liaison covalente) ɲɛfɔ ;',
    'atɔmu dɔ bɛ siri joli dilan, o dɔn ka bɔ a ka valansi ɛlɛkitɔrɔnw na ;',
    'molekili nɔgɔman dɔ ka Lewisi jaa dilan ;',
    'molekili dɔw cogoya fɔ : $\\ce{CH4}$, $\\ce{NH3}$, $\\ce{H2O}$, $\\ce{CO2}$ ;',
    'sɛbɛncogo brit, devlɔpe ani semi-devlɔpe sɛbɛn.',
  ],
  sections: [
    {
      title: 'Ɛlɛkitɔrɔnw tilali',
      blocks: [
        {
          kind: 'definition',
          term: 'Kovalan siri (liaison covalente)',
          text: 'atɔmu fila bɛ **ɛlɛkitɔrɔn fila** (dubile) bila ɲɔgɔn fɛ. Atɔmu kelen-kelen bɛɛ bɛ ɛlɛkitɔrɔn kelen di a ka kuci kɔkan na.',
        },
        {
          kind: 'definition',
          term: 'Molekili',
          text: 'atɔmu kulu min sirilen don kovalan siriw fɛ, a kuran bɛnnen don.',
        },
        {
          kind: 'example',
          title: 'diyidrozɛni molekili',
          text: 'Idrozɛni atɔmu kelen-kelen bɛɛ bɛ ɛlɛkitɔrɔn kelen dɔrɔn ta. Ni u ye u ka ɛlɛkitɔrɔnw bila ɲɔgɔn fɛ, atɔmu fila bɛ dubile kelen tila : u kelen-kelen bɛɛ bɛ ɛlɛkitɔrɔn 2 « ye » a lamini, i n’a fɔ eliyɔmu. Dwɛti sariya labatora.',
        },
        { kind: 'lewis', molecules: [named(H2, 'diyidrozɛni H₂')] },
        {
          kind: 'trap',
          wrong: '« Kovalan siri kɔnɔ, atɔmu dɔ bɛ ɛlɛkitɔrɔn kelen di atɔmu tɔ kelen ma. »',
          why: 'Ɛlɛkitɔrɔn dili ye iyɔnw dilan ye : o ye iyɔn siri ye. Kovalan siri kɔnɔ, dubile ye atɔmu fila bɛɛ ta ye.',
          reflex: 'Iyɔn siri : ɛlɛkitɔrɔnw bɛ **bɔ atɔmu dɔ la ka taa tɔ kan**. Kovalan siri : ɛlɛkitɔrɔnw bɛ **tila** ɲɔgɔn cɛ.',
        },
      ],
    },
    {
      title: 'Atɔmu kelen-kelen bɛɛ bɛ siri joli dilan ?',
      blocks: [
        {
          kind: 'rule',
          text: 'Atɔmu bɛ kovalan siri dilan ka bɛn ɛlɛkitɔrɔn hakɛ ma min dɛsɛlen bɛ a la walasa ka ɔkitɛti (walima dwɛti, idrozɛni ma) labato. Valansi ɛlɛkitɔrɔn minnu tɛ baara kɛ siriw kɔnɔ, olu bɛ to fila fila : olu ye **dubile siribaliw** ye.',
        },
        {
          kind: 'table',
          head: ['Atɔmu', 'Valansi ɛlɛkitɔrɔnw', 'Siri dilannenw', 'Dubile siribaliw'],
          rows: [
            ['H', '1', '1', '0'],
            ['C', '4', '4', '0'],
            ['N', '5', '3', '1'],
            ['O', '6', '2', '2'],
            ['Cl', '7', '1', '3'],
          ],
        },
        {
          kind: 'formula',
          tex: '\\text{siri hakɛ} = 8 - \\text{valansi ɛlɛkitɔrɔnw} \\qquad (2 - 1 = 1 \\text{ H ma})',
        },
      ],
    },
    {
      title: 'Lewisi ka jaa',
      blocks: [
        {
          kind: 'text',
          text: 'Lewisi ka jaa bɛ kuci kɔkan dubilew bɛɛ jira : sira dɔ atɔmu fila cɛ dubile **sirilen** ma, sira dɔɔnin dɔ atɔmu kɛrɛfɛ dubile **siribali** ma.',
        },
        {
          kind: 'example',
          title: 'a kɛcogo, ni ji ye',
          text: 'Molekili $\\ce{H2O}$.',
          steps: [
            'Valansi ɛlɛkitɔrɔnw bɛɛ lajɛlen : $1 + 1 + 6 = 8$, o ye dubile 4 ye.',
            'Ɔkisizɛni bɛ siri 2 dilan : a bɛ cɛmancɛ la, a sirilen bɛ idrozɛni 2 na. O ye dubile sirilen 2 ye.',
            '$4 - 2 = 2$ dubile bɛ to : olu ye ɔkisizɛni ka dubile siribali 2 ye.',
            'A lajɛ : dubile 4 bɛ ɔkisizɛni lamini (ɔkitɛti), dubile kelen bɛ idrozɛni kelen-kelen bɛɛ lamini (dwɛti).',
          ],
        },
        {
          kind: 'lewis',
          molecules: [named(H2O, 'ji H₂O'), named(NH3, 'amonyaki NH₃'), named(CH4, 'metani CH₄'), named(HCL, 'idrozɛni kilorir HCl')],
        },
        {
          kind: 'text',
          text: 'Atɔmu fila bɛ se ka dubile **fila** tila (siri fila) walima **saba** (siri saba).',
        },
        { kind: 'lewis', molecules: [named(O2, 'diyɔkisizɛni O₂'), named(CO2, 'karbɔni diyɔkisidi CO₂'), named(N2, 'diyazɔti N₂')] },
        {
          kind: 'trap',
          wrong: '« $\\ce{CO2}$ kɔnɔ, karbɔni bɛ siri kelen dilan ni ɔkisizɛni kelen-kelen bɛɛ ye. »',
          why: 'O tun bɛ siri 2 dɔrɔn di karbɔni ma ani siri kelen ɔkisizɛni ma : u si tun tɛna ɔkitɛti labato.',
          reflex: 'Jaa kɔfɛ, atɔmu kelen-kelen bɛɛ lamini jate : dubile 4 (sirilen + siribali) C, N, O, Cl ma ; dubile 1 H ma. Ni o tɛ, siri fila walima siri saba lajɛ.',
        },
      ],
    },
    {
      title: 'Molekiliw cogoya',
      blocks: [
        {
          kind: 'rule',
          text: 'Atɔmu dɔ lamini dubilew bɛ ɲɔgɔn gɛn ka yɔrɔjan ɲɔgɔn na ka se dan na. Dubile **siribaliw** bɛ yɔrɔ ta, hali ni u tɛ ye molekili cogoya la.',
        },
        {
          kind: 'table',
          head: ['Molekili', 'Dubilew atɔmu cɛmancɛla lamini', 'Cogoya', 'Angili'],
          rows: [
            ['$\\ce{CH4}$', 'sirilen 4', 'tetrayɛdiri', '109,5°'],
            ['$\\ce{NH3}$', 'sirilen 3, siribali 1', 'piramidi', '107°'],
            ['$\\ce{H2O}$', 'sirilen 2, siribali 2', 'kurunnen (V cogo)', '104,5°'],
            ['$\\ce{CO2}$', 'siri fila 2', 'tilennen (linéaire)', '180°'],
          ],
        },
        {
          kind: 'trap',
          wrong: '« Ji molekili tilennen don : H–O–H. »',
          why: 'Ɔkisizɛni ka dubile siribali 2 bɛ O–H siriw gɛn ka u jigin : molekili kurunnen don.',
          reflex: 'Cogoya dɔnni kama, atɔmu cɛmancɛla ka dubilew **bɛɛ** jate, sirilenw ni siribaliw.',
        },
      ],
    },
    {
      title: 'Sɛbɛncogo brit, devlɔpe ani semi-devlɔpe',
      blocks: [
        {
          kind: 'definition',
          term: 'Sɛbɛncogo brit (formule brute)',
          text: 'atɔmuw suguya ni u hakɛ jira : $\\ce{C2H6O}$.',
        },
        {
          kind: 'definition',
          term: 'Sɛbɛncogo devlɔpe (formule développée)',
          text: 'atɔmuw cɛ siriw bɛɛ jira.',
        },
        {
          kind: 'definition',
          term: 'Sɛbɛncogo semi-devlɔpe (formule semi-développée)',
          text: 'siriw bɛɛ jira fo idrozɛni atɔmuw ta : $\\ce{CH3-CH2-OH}$.',
        },
        {
          kind: 'text',
          text: 'Sɛbɛncogo brit kelen bɛ se ka bɛn molekili caman ma : olu ye **izomɛriw** ye. $\\ce{C2H6O}$ ye etanɔli (alikɔli) ye ani metɔksimetani (gazi) fana.',
        },
        { kind: 'lewis', molecules: [named(ETHANOL, 'etanɔli CH₃–CH₂–OH'), named(METHOXYMETHANE, 'metɔksimetani CH₃–O–CH₃')] },
      ],
    },
  ],
  essentials: [
    'Kovalan siri : atɔmu fila bɛ ɛlɛkitɔrɔn dubile kelen bila ɲɔgɔn fɛ.',
    'H bɛ siri 1 dilan, O bɛ 2 dilan, N bɛ 3 dilan, C bɛ 4 dilan, Cl bɛ 1 dilan.',
    'Lewisi ka jaa : dubile sirilenw (sira atɔmuw cɛ) ani siribaliw (sira atɔmu kɛrɛfɛ).',
    'Atɔmu kelen-kelen bɛɛ ka kan ka ɔkitɛti labato, fo H min bɛ dwɛti labato.',
    'Siri camanw : siri fila $\\ce{O2}$ ni $\\ce{CO2}$ kɔnɔ, siri saba $\\ce{N2}$ kɔnɔ.',
    'Cogoyaw : $\\ce{CH4}$ tetrayɛdiri, $\\ce{NH3}$ piramidi, $\\ce{H2O}$ kurunnen, $\\ce{CO2}$ tilennen.',
    'Izomɛriw ka sɛbɛncogo brit ye kelen ye, nka u ka sɛbɛncogo devlɔpe tɛ kelen ye.',
  ],
  exercises: [
    {
      id: 'valence',
      level: 1,
      statement: 'Atɔmu kelen-kelen bɛɛ ka valansi ɛlɛkitɔrɔn hakɛ, kovalan siri hakɛ min bɛ dilan ani dubile siribali hakɛ di :',
      questions: ['sufiri S ($Z = 16$)', 'fliyɔri F ($Z = 9$)', 'silisiyɔmu Si ($Z = 14$)'],
      solution: [
        'S : $(K)^2(L)^8(M)^6$ → valansi ɛlɛkitɔrɔn 6, siri 2, dubile siribali 2 (i n’a fɔ ɔkisizɛni).',
        'F : $(K)^2(L)^7$ → valansi ɛlɛkitɔrɔn 7, siri 1, dubile siribali 3 (i n’a fɔ kilɔri).',
        'Si : $(K)^2(L)^8(M)^4$ → valansi ɛlɛkitɔrɔn 4, siri 4, dubile siribali si tɛ (i n’a fɔ karbɔni).',
      ],
    },
    {
      id: 'lewis-simples',
      level: 1,
      statement: 'Diyikilɔri $\\ce{Cl2}$ ni idrozɛni sulfiri $\\ce{H2S}$ ka Lewisi jaa dilan.',
      hints: ['Fɔlɔ, valansi ɛlɛkitɔrɔnw bɛɛ jate, o kɔ a tila 2 la.'],
      solution: [
        '$\\ce{Cl2}$ : ɛlɛkitɔrɔn $7 + 7 = 14$, o ye dubile 7 ye. Dubile sirilen 1 Cl–Cl, ani dubile siribali 3 kilɔri kelen-kelen bɛɛ lamini.',
        '$\\ce{H2S}$ : ɛlɛkitɔrɔn $1 + 1 + 6 = 8$, o ye dubile 4 ye. Sufiri bɛ cɛmancɛ la, dubile sirilen 2 S–H ni dubile siribali 2. Jaa ye ji ta ɲɔgɔn ye.',
      ],
    },
    {
      id: 'ethylene',
      level: 2,
      statement: 'Etilɛni $\\ce{C2H4}$ ye gazi ye min bɛ mangow ni bananw mɔ.',
      questions: [
        'Dubile joli bɛ molekili kɔnɔ ?',
        'K’a dɔn ko karbɔni fila sirilen don ɲɔgɔn na, ani u kelen-kelen bɛɛ bɛ idrozɛni 2 ta, Lewisi jaa dilan.',
        'A sɛbɛncogo semi-devlɔpe sɛbɛn.',
      ],
      solution: [
        '$2 \\times 4 + 4 \\times 1 = 12$ ɛlɛkitɔrɔn, o ye dubile 6 ye.',
        'Dubile 4 bɛ baara kɛ C–H siriw kɔnɔ ; 2 tɔ bɛ **siri fila** C=C dilan. O la karbɔni kelen-kelen bɛɛ bɛ siri 4 ta (ɔkitɛti) ; dubile siribali si tɛ yen.',
        '$\\ce{CH2=CH2}$.',
      ],
    },
    {
      id: 'forme-h2s',
      level: 2,
      statement: 'Idrozɛni sulfiri $\\ce{H2S}$ ye gazi ye min kasa bɛ i n’a fɔ fan tolilen.',
      questions: ['Nin molekili in cogoya ye jumɛn ye ?', 'A ɲɛfɔ ka bɔ sufiri ka dubilew la.'],
      solution: ['A kurunnen don, i n’a fɔ ji.', 'Dubile 4 bɛ sufiri lamini : sirilen 2 ani siribali 2. Dubile siribaliw bɛ S–H siriw gɛn.'],
    },
    {
      id: 'ammoniac',
      level: 2,
      statement: 'Kalanden dɔ bɛ amonyaki molekili jaa dilan ka a da duguma, idrozɛni saba bɛ azɔti lamini angili 120° la.',
      questions: ['$\\ce{NH3}$ ka Lewisi jaa dilan.', 'Kalanden ka fili ɲɛfɔ.'],
      solution: [
        'Ɛlɛkitɔrɔn $5 + 3 = 8$, o ye dubile 4 ye : dubile sirilen 3 N–H ani dubile siribali 1 azɔti kan.',
        'Kalanden ɲinɛna dubile siribali kɔ. Ni dubile 4 bɛ azɔti lamini, a bɛ u jɛnsɛn fan saba la : molekili ye piramidi ye, a angili ye 107° ɲɔgɔn ye.',
      ],
    },
    {
      id: 'isomeres',
      level: 3,
      statement: 'An bɛ sɛbɛncogo brit $\\ce{C3H8O}$ lajɛ.',
      questions: [
        'A jira ko nin sɛbɛncogo in bɛ bɛn alikɔli fila ma a dɔgɔmanba la, ka u ka sɛbɛncogo semi-devlɔpe sɛbɛn (kulu –OH sirilen bɛ karbɔni dɔ la).',
        'Izomɛri dɔ min tɛ alikɔli ye, o ka sɛbɛncogo semi-devlɔpe sɛbɛn.',
        'A lajɛ ko C bɛ siri 4 dilan, O bɛ 2 dilan ani H bɛ 1 dilan u bɛɛ kɔnɔ.',
      ],
      solution: [
        '$\\ce{CH3-CH2-CH2-OH}$ (–OH bɛ sira laban na) ani $\\ce{CH3-CH(OH)-CH3}$ (–OH bɛ karbɔni cɛmancɛla kan).',
        '$\\ce{CH3-O-CH2-CH3}$ : ɔkisizɛni bɛ karbɔni fila cɛ (ɛtɛri don).',
        'Sɛbɛncogo kelen-kelen bɛɛ kɔnɔ, karbɔni kelen-kelen bɛɛ bɛ siri 4 ta, ɔkisizɛni bɛ 2 ta ani idrozɛni kelen-kelen bɛɛ bɛ 1 ta.',
      ],
    },
  ],
  quiz: [
    {
      question: 'Kovalan siri ye :',
      choices: ['atɔmu dɔ bɛ ɛlɛkitɔrɔn kelen di tɔ kelen ma', 'ɛlɛkitɔrɔn dubile kelen bilali ɲɔgɔn fɛ', 'iyɔn fila sama ɲɔgɔn fɛ', 'prɔtɔnw falenni'],
      answer: 1,
      explanation: 'Atɔmu fila bɛ dubile kelen tila ; u kelen-kelen bɛɛ bɛ ɛlɛkitɔrɔn kelen di.',
    },
    {
      question: 'Azɔti bɛ kovalan siri joli dilan ?',
      choices: ['1', '2', '3', '5'],
      answer: 2,
      explanation: 'Valansi ɛlɛkitɔrɔn 5 : 3 dɛsɛlen bɛ a la ɔkitɛti kama.',
    },
    {
      question: 'Ji molekili kɔnɔ, ɔkisizɛni bɛ dubile siribali joli ta ?',
      choices: ['0', '1', '2', '4'],
      answer: 2,
      explanation: 'Valansi ɛlɛkitɔrɔn 6 : 2 bɛ baara kɛ siriw kɔnɔ, 4 tɔ bɛ dubile siribali 2 dilan.',
    },
    {
      question: 'Ji molekili ye :',
      choices: ['tilennen', 'kurunnen', 'triyangili duguma', 'tetrayɛdiri cogo la'],
      answer: 1,
      explanation: 'Ɔkisizɛni ka dubile siribali 2 bɛ siriw faran ɲɔgɔn na : angili 104,5°.',
    },
    {
      question: 'Diyazɔti $\\ce{N2}$ molekili kɔnɔ, atɔmu fila cɛ siri ye :',
      choices: ['siri kelen', 'siri fila', 'siri saba', 'iyɔn siri'],
      answer: 2,
      explanation: 'Azɔti kelen-kelen bɛɛ ka kan ka siri 3 dilan : atɔmu fila bɛ dubile 3 tila.',
    },
    {
      question: 'Etanɔli ni metɔksimetani ye izomɛriw ye katuguni u ka :',
      choices: ['sɛbɛncogo devlɔpe ye kelen ye', 'sɛbɛncogo brit ye kelen ye', 'jogo ye kelen ye', 'siri fila hakɛ ye kelen ye'],
      answer: 1,
      explanation: 'Sɛbɛncogo brit kelen $\\ce{C2H6O}$, nka atɔmuw sirilen tɛ ɲɔgɔn na cogo kelen na.',
    },
  ],
  applications: [
    {
      title: 'Fɔrɔnɔ gazi',
      situation:
        'Denbaya caman bɛ tobili kɛ ni butani gazi bidɔnw ye. Butani molekili ka sɛbɛncogo brit ye $\\ce{C4H10}$ ye ; a ka karbɔni atɔmu 4 bɛ sira kelen kan.',
      questions: [
        'Butani ka sɛbɛncogo semi-devlɔpe sɛbɛn.',
        'Kovalan siri joli bɛ molekili kɔnɔ ?',
        'Butani bɛ jeni fiɲɛ ka diyɔkisizɛni kɔnɔ ka karbɔni diyɔkisidi ni ji di. O fɛn fila Lewisi jaa dilan.',
      ],
      solution: [
        '$\\ce{CH3-CH2-CH2-CH3}$.',
        'Siri C–C 3 ani siri C–H 10 : siri 13.',
        '$\\ce{CO2}$ : O=C=O, dubile siribali 2 ɔkisizɛni kelen-kelen bɛɛ kan. $\\ce{H2O}$ : H–O–H, dubile siribali 2 ɔkisizɛni kan.',
      ],
    },
    {
      title: 'Mun na sukaroji tɛ kuran tɛmɛ',
      situation:
        'Te labɛnni waati, sukaro caman (sakarozi, $\\ce{C12H22O11}$) bɛ yeli ji la. An bɛ elɛkitirodi fila sunɔgɔ te kɔnɔ, minnu sirilen bɛ pili ni lanpu la : lanpu tɛ mana. Kɔgɔji la, a bɛ mana.',
      questions: [
        'Siri suguya jumɛn bɛ atɔmuw siri sakarozi kɔnɔ ? A ɲɛfɔ ni kɔrɔbɔli ye.',
        'Sukaro bɛ te kɔnɔ cogo jumɛn na ?',
        'Kɔgɔji ni o danfara ɲɛfɔ.',
      ],
      solution: [
        'Kovalan siriw : sakarozi dilannen don ni molekiliw ye, a tɛ iyɔnw bɔ.',
        'Sakarozi molekiliw cogo la, minnu jɛnsɛnnen don ji molekiliw cɛ.',
        'Kɔgɔ ye iyɔn fɛn ye : ji kɔnɔ, a bɛ iyɔn $\\ce{Na+}$ ni $\\ce{Cl-}$ bɔ minnu bɛ se ka lamaga ka kuran tɛmɛ. Sukaro molekiliw kuran bɛnnen don, u tɛ kuran si ta.',
      ],
    },
  ],
};
