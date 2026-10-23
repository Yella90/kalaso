import type { LessonText } from '../index';

// Bamanankan — brouillon à faire relire.
export const lesson: LessonText = {
  hook: 'Kalanso jumɛn ye DEF sɔrɔ ka tɛmɛ tɔw kan ? Sanji hakɛ jumɛn bɛ na Kayi mɔyɛni na utikalo la ? Sitatisitiki bɛ kunnafoni caman lajɛ jate dɔɔnin kɔnɔ — mɔyɛni, mediyan, etandi — ani ja kelen kɔnɔ.',
  objectives: ['ka kunnafoniw labɛn hakɛw ni fɛrɛkansiw tabulo kɔnɔ ;', 'ka mɔyɛni, mediyan ani mɔdu jate ;', 'ka etandi ni ekar tipu jate ;', 'ka ja bɛnnen sugandi ka a kalan.'],
  sections: [
    {
      title: 'Hakɛw ni fɛrɛkansiw',
      blocks: [
        { legend: ['$x_i$ ka fɛrɛkansi : a hakɛ $n_i$ tilalen hakɛ bɛɛ lajɛlen $N$ la'] },
        { text: 'Ni kunnafoniw ka ca, u bɛ taa ɲɔgɔn fɛ (janyaw, girinyaw), an b’u lajɛ **kilasiw** $[a\\,;\\,b[$ kɔnɔ ka **isitogaramu** ja. Hakɛ lajɛlenw b’a to an bɛ mediyan kalan.' },
      ],
    },
    {
      title: 'Sigiyɔrɔ ni jɛnsɛnni paramɛtiriw',
      blocks: [
        {},
        { items: ['**mediyan** : hakɛ min bɛ sɛri labɛnnen tila fila ye, hakɛ kelen bɛ fan fila bɛɛ la ;', '**mɔdu** : hakɛ min bɛ segin ka caya ;', '**etandi** : hakɛ belebeleba bɔ hakɛ dɔgɔmanba la ;', '**variyansi ni ekar tipu** : $V = \\dfrac{1}{N}\\sum n_i (x_i - \\bar x)^2$, $\\sigma = \\sqrt V$ ; ni ekar tipu ka bon, hakɛw jɛnsɛnnen don kosɛbɛ.'] },
        { wrong: '« Mɔyɛni bɛ sɛri jira ka ɲɛ tuma bɛɛ. »', why: 'Hakɛ kelen min ka jan tɔw la, o b’a lamaga kosɛbɛ, nka mediyan tɛ yɛlɛma ka caya.', reflex: 'Ni hakɛ janw bɛ yen, mediyan fana lajɛ.' },
      ],
    },
  ],
  essentials: ['Fɛrɛkansi = hakɛ ÷ hakɛ bɛɛ lajɛlen.', 'Mɔyɛni girinyalen hakɛw fɛ ; mediyan : sɛri labɛnnen cɛmancɛ.', 'Etandi = belebeleba − dɔgɔmanba ; ekar tipu = √variyansi.', 'Mediyan bɛ muɲu hakɛ janw kɔrɔ, mɔyɛni tɛ.'],
  exercises: [
    { title: 'Kɔrɔbɔli nɔtiw', statement: 'Kalanden 9 ka nɔtiw : 8, 12, 10, 15, 9, 12, 14, 11, 7.', parts: [{ label: 'Sɛri mɔyɛni (tannin na).', steps: ['Lajɛlen : 98 ; $\\dfrac{98}{9} \\approx 10{,}9$.'] }, { label: 'Mediyan.', steps: ['Sɛri labɛnnen : 7, 8, 9, 10, **11**, 12, 12, 14, 15 ; hakɛ 5nan ye 11 ye.'] }, { label: 'Etandi.' }] },
    { title: 'Ekar tipu dɔ', statement: 'Sɛri : 4, 6, 8, 10, 12.', parts: [{ label: 'Variyansi.', steps: ['$\\bar x = 8$ ; danfaraw kare : 16, 4, 0, 4, 16 ; lajɛlen 40 ; $V = \\dfrac{40}{5} = 8$.'] }, { label: 'Ekar tipu (kɛmɛsinna la).' }] },
  ],
  quiz: [
    { question: 'Sɛri 2, 3, 3, 5, 9 kɔnɔ, mɔdu ye :', explanation: '3 bɛ yen siɲɛ fila.' },
    { question: '2, 3, 3, 5, 9 mɔyɛni ye :' },
    { question: 'Ni an ye hakɛ belebeleba 9 falen 90 la :', choices: ['mɔyɛni bɛ yɛlɛma kosɛbɛ, mediyan tɛ', 'u fila bɛɛ bɛ yɛlɛma kosɛbɛ', 'u si tɛ yɛlɛma', 'mediyan bɛ yɛlɛma kosɛbɛ, mɔyɛni tɛ'], explanation: 'Mediyan bɛ to 3 ye ; mɔyɛni bɛ se 20,6 ma.' },
    { question: 'Ekar tipu 0 kɔrɔ ye :', choices: ['hakɛw bɛɛ ye kelen ye', 'mɔyɛni ye 0 ye', 'sɛri lankolon don', 'hakɛw jɛnsɛnnen don kosɛbɛ'], explanation: 'Danfara si tɛ mɔyɛni ni u cɛ.' },
  ],
  applications: [
    {
      title: 'Kayi samiyɛ sanji',
      tagline: 'Samiyɛ fila sanga ɲɔgɔn ma',
      situation: 'Kayi kalo sanji (mm la), zuwɛnkalo ka se ɔkutɔburukalo ma : san 1 : 80, 160, 220, 140, 40 ; san 2 : 30, 190, 330, 90, 20.',
      model: 'Mɔyɛni (hakɛ) ni etandi walima ekar tipu (a bɛnni) sanga ɲɔgɔn ma.',
      questions: ['San 1 kalo sanji mɔyɛni ye joli ye, mm la ?', 'San jumɛn sanji ma bɛn kosɛbɛ ?'],
      solution: ['San 1 : $\\dfrac{640}{5} = 128$ mm ; san 2 : $\\dfrac{660}{5} = 132$ mm.', 'Etandiw : mm 180 ni mm 310 : san 2 sanji ma bɛn kosɛbɛ, o ye farati ye danni na hali ni mɔyɛniw ka surun ɲɔgɔn na.'],
      fact: 'Sɛnɛkɛ dɔnnikɛlaw bɛ danni ladilikanw di sanji bɛnni fɛ i n’a fɔ a hakɛ bɛɛ lajɛlen.',
    },
  ],
};
