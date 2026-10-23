import type { LessonText } from '../index';

// Bamanankan — brouillon à faire relire.
export const lesson: LessonText = {
  hook:
    'Ɲɔ bulu, joli toni kelen, jaba wolo : ɲɛ gansan na, u si tɛ ɲɔgɔn ye. Mikɔrɔsikɔpu kɔnɔ, i bɛ fɛn kelen ye u bɛɛ la, a segintalen siɲɛ waa caman : fɛn fitinin datugulenw, **seliliw**. Fɛn ɲɛnamaw bɛɛ dilannen bɛ u de la, kabini bakiteri fo sira.',
  objectives: [
    'ka mikɔrɔsikɔpu kɛ baara la ka bonyali jate ;',
    'ka bagan selili ni jiri selili ɲɛfɔ ;',
    'ka u fila danfaraw fɔ ;',
    'ka selili bonya yɛrɛ jate ka bɔ ja dɔ la.',
  ],
  sections: [
    {
      title: 'Ka filɛli kɛ mikɔrɔsikɔpu kɔnɔ',
      blocks: [
        { text: 'Seliliw bonya ye mikɔrɔmɛtɛrɛ 10 ka se 100 ma (µm 1 = mm 0,001) tuma caman : **mikɔrɔsikɔpu** de bɛ mako u yeli la. Fɛn finman dɔ bɛ bila lame ni lamɛli cɛ, a bɛ ɲɛ bɔ tuma caman (iyodi ji, metilɛni bula).' },
        { legend: ['misali la : ɔbizɛkitifu ×40 ni okilɛri ×10 bɛ bonyali ×400 di'] },
        { caption: 'Jaba wolo mikɔrɔsikɔpu kɔnɔ : kare kelen-kelen bɛɛ ye selili ye, a parwa b’a lamini.' },
        {},
      ],
    },
    {
      title: 'Bagan selili ni jiri selili',
      blocks: [
        { caption: 'Bagan selili (ja nɔgɔyalen).' },
        { caption: 'Jiri selili : parwa, wakuyɔli belebele, kolorɔpilasitiw.' },
        {
          items: [
            'selili bɛɛ bɛ **manbaranu**, **sitoplazimu** sɔrɔ, ani baganw ni jiriw la, **kɛsɛ** min bɛ bangekolo kunnafoniw mara ;',
            'jiri selili bɛ fɛn wɛrɛw fana sɔrɔ : **parwa** gɛlɛn selilozi la, **wakuyɔli** belebele, ani yɔrɔ binkɛnɛw la, **kolorɔpilasitiw**.',
          ],
        },
        {
          head: ['', 'Bagan selili', 'Jiri selili'],
          rows: [
            ['manbaranu, sitoplazimu, kɛsɛ', 'ɔwɔ', 'ɔwɔ'],
            ['parwa selilozi la', 'ayi', 'ɔwɔ'],
            ['wakuyɔli belebele', 'ayi', 'ɔwɔ'],
            ['kolorɔpilasitiw', 'ayi', 'ɔwɔ (yɔrɔ binkɛnɛw)'],
            ['a cogo', 'a bɛ yɛlɛma, a nɔgɔn', 'kare cogo tuma caman, a sabatilen'],
          ],
        },
        { caption: 'Bulu dɔ ka seliliw : kisɛ binkɛnɛw ye kolorɔpilasitiw ye.' },
        { text: 'Selili ye ɲɛnamaya **dilanni kelen** ye (fɛn ɲɛnama bɛɛ dilannen bɛ seliliw la) ani a **baarakɛcogo kelen** ye (a bɛ balo, ka ninakili kɛ, ka tila).' },
      ],
    },
  ],
  essentials: [
    'Mikɔrɔsikɔpu bonyali = ɔbizɛkitifu bonyali × okilɛri bonyali.',
    'Bonya yɛrɛ = ja kan bonya ÷ bonyali.',
    'Selili bɛɛ : manbaranu, sitoplazimu, kɛsɛ (fo bakiteriw).',
    'Jiri selili bɛ nin fana sɔrɔ : parwa, wakuyɔli belebele, kolorɔpilasitiw.',
  ],
  simulationTasks: [
    'bagan selili munumunu ka fɛn kelen-kelen bɛɛ digi ka a ka baara kalan ;',
    'jiri selili ta : fɛn jumɛnw bɛ bɔ, jumɛnw bɛ tunun ?',
    'gɛlɛyaw ɲɛ « fɛn min ɲini min bɛ… ».',
  ],
  exercises: [
    {
      title: 'Mikɔrɔsikɔpu labɛn',
      statement: 'Okilɛri bɛ bonyali kɛ siɲɛ 10. An bɛ ɔbizɛkitifuw ×4, ×10 ani ×40 kɛ baara la ɲɔgɔn nɔfɛ.',
      parts: [
        { label: 'Bonyali bɛɛ lajɛlen ni ɔbizɛkitifu ×40 ye.', steps: ['$G = 40 \\times 10 = 400$.'] },
        { label: 'Bonyali bɛɛ lajɛlen min ka dɔgɔ ni tɔw bɛɛ ye.', steps: ['$4 \\times 10 = 40$ : an bɛ daminɛ a dɔgɔmanba de la tuma bɛɛ walasa ka yɔrɔ ɲini.'] },
      ],
    },
    {
      title: 'Jaba selili dɔ bonya',
      statement: 'Ja dɔ la min tara bonyali ×400 la, jaba selili dɔ janya ye cm 8 ye.',
      parts: [
        { label: 'Selili janya yɛrɛ, mm na.', steps: ['cm 8 = mm 80.', '$\\dfrac{80}{400} = 0{,}2$ mm.'] },
        { label: 'O janya kelen µm na.', steps: ['mm 1 = µm 1 000, o la $0{,}2$ mm = µm 200.'] },
      ],
    },
  ],
  quiz: [
    {
      question: 'Fɛn jumɛn bɛ jiri selili la, nka a tɛ bagan selili la ?',
      choices: ['parwa', 'kɛsɛ', 'manbaranu', 'sitoplazimu'],
      explanation: 'Parwa selilozi la ye jiriw dɔrɔn ta ye.',
    },
    {
      question: 'Bangekolo kunnafoniw bɛ sɔrɔ ka tɛmɛ yɔrɔ jumɛn ?',
      choices: ['kɛsɛ', 'wakuyɔli', 'parwa', 'manbaranu'],
      explanation: 'Kɛsɛ de bɛ ADN mara.',
    },
    {
      question: 'Ɲɔ lili dɔ selili (dugukolo jukɔrɔ) bɛ kolorɔpilasitiw sɔrɔ wa ?',
      choices: ['ayi', 'ɔwɔ', 'tile fɛ dɔrɔn', 'su fɛ dɔrɔn'],
      explanation: 'Kolorɔpilasitiw bɛ yɔrɔ binkɛnɛw dɔrɔn de la, yeelen bɛ yɔrɔ minnu sɔrɔ.',
    },
    {
      question: 'Ɔbizɛkitifu ×10 ni okilɛri ×15 : bonyali ye…',
      choices: ['150', '25', '1,5', '1 500'],
      explanation: 'U bɛ sigiyɔrɔ jatebɔ : 10 × 15 = 150.',
    },
  ],
  applications: [
    {
      title: 'Musa ka joli laboratwari la',
      tagline: 'Joli kisɛw jate ka u bonya sumanikɛ',
      situation: 'Kɛnɛyaso laboratwari la, tɛkinisiyɛn bɛ Musa ka joli filɛ bonyali ×1 000 la. Ɛkiran kan, joli kisɛ bilenman kelen bonya ye mm 7,5 ye.',
      model: 'Bonya yɛrɛ = ja kan bonya ÷ bonyali.',
      questions: ['Joli kisɛ bilenman bonya yɛrɛ ye joli ye, µm na ?', 'Mun na joli kisɛ bilenman mako tɛ parwa la ?'],
      solution: [
        '$\\dfrac{7{,}5 \\text{ mm}}{1\\,000} = 0{,}0075$ mm = µm 7,5.',
        'Bagan selili don : a bɛ joli kɔnɔ, ji sabatilen dɔ kɔnɔ, ani a ka kan ka to nɔgɔn walasa ka tɛmɛ jolisira fitininw kɔnɔ.',
      ],
      fact: 'Mɔgɔkɔrɔba kelen bɛ joli kisɛ bilenman miliyari 25 000 ɲɔgɔn sɔrɔ.',
    },
  ],
};
