import type { LessonText } from '../index';

// Bamanankan — brouillon à faire relire.
export const lesson: LessonText = {
  hook: 'Kalanso fila mɔyɛni ye kelen ye jatebɔ kɔrɔbɔli la, 12 20 la. Nka kelen kɔnɔ, nɔtiw bɛɛ bɛ 10 ni 14 cɛ ; dɔ wɛrɛ kɔnɔ, u bɛ bɔ 2 la ka se 20 ma. Mɔyɛni tɛ fɛn bɛɛ fɔ : kunnafoniw **jɛnsɛnni** fana ka kan ka suman, ni mediyan, kariteliw ani ekar tipu ye.',
  objectives: ['ka sitatisitiki sɛri labɛn (hakɛw, fɛrɛkansiw) ;', 'ka mɔyɛni, mediyan, mɔdu ani kariteliw jate ;', 'ka variyansi ni ekar tipu jate ;', 'ka bwati diyagaramu dilan ka a kalan.'],
  sections: [
    {
      title: 'Sigiyɔrɔ paramɛtiriw',
      blocks: [
        { label: 'Mɔyɛni', legend: ['$n_i$ : hakɛw, $N$ : hakɛ bɛɛ lajɛlen, $f_i = \\frac{n_i}{N}$ : fɛrɛkansiw'] },
        { items: ['**mediyan** $Me$ : hakɛ min bɛ sɛri labɛnnen tila fila ye, hakɛ kelen bɛ fan fila bɛɛ la ;', '**kariteliw** : $Q_1$ ye hakɛ dɔgɔmanba ye min kɔrɔ, kunnafoniw 25 % ni kɔ ka dɔgɔ walima u ye a ɲɔgɔn ye ; $Q_3$, 75 % ni kɔ ;', '**mɔdu** : hakɛ min bɛ segin ka caya.'] },
        { title: 'nɔti wolonwula', steps: ['Mɔyɛni : $\\dfrac{90}{7} \\approx 12{,}86$.', 'Mediyan : hakɛ 4nan, 12. Mɔdu : 12.', '$Q_1$ : hakɛ 2nan (bawo $\\frac{7}{4} = 1{,}75$), o ye 10 ye ; $Q_3$ : hakɛ 6nan ($\\frac{21}{4} = 5{,}25$), o ye 16 ye.'] },
      ],
    },
    {
      title: 'Jɛnsɛnni paramɛtiriw',
      blocks: [
        { legend: ['$\\sigma$ : ekar tipu, a inite ye kunnafoniw ta ye'] },
        { items: ['**etandi** : hakɛ belebeleba − dɔgɔmanba ;', '**ɛntɛrikariteli danfara** : $Q_3 - Q_1$ ; a tɛ bɔ hakɛ janw na ;', '**bwati diyagaramu** bɛ hakɛ dɔgɔmanba, $Q_1$, mediyan, $Q_3$ ani hakɛ belebeleba jira.'] },
        { wrong: '« Mediyan ye lisi cɛmancɛ hakɛ ye, k’a sɔrɔ a ma labɛn. »', why: 'Mediyan bɛ kalan sɛri **labɛnnen** kan.', reflex: 'Tuma bɛɛ, hakɛw labɛn ka yɛlɛn fɔlɔ.' },
      ],
    },
  ],
  essentials: ['Mɔyɛni $\\bar{x} = \\sum f_ix_i$ ; mediyan ni kariteliw sɛri labɛnnen kan ; mɔdu.', 'Variyansi $V = \\frac{1}{N}\\sum n_ix_i^2 - \\bar{x}^2$ ; ekar tipu $\\sigma = \\sqrt{V}$.', 'Etandi, ɛntɛrikariteli danfara ; bwati diyagaramu.'],
  exercises: [
    { title: 'Kulu dɔ ka nɔtiw', statement: 'Nɔtiw : 8 ; 10 ; 12 ; 12 ; 14 ; 16 ; 18.', parts: [{ label: 'Mɔyɛni (hakɛ gɛrɛfɛla).' }, { label: 'Mediyan.', steps: ['Hakɛ labɛnnen 7 ka 4nan.'] }, { label: 'Ekar tipu (hakɛ gɛrɛfɛla).' }] },
    { title: 'Ni hakɛw ye', statement: 'Kin dɔ kɔnɔ denbaya kelen-kelen bɛɛ ka den hakɛ : den 0 (denbaya 5), 1 (10), 2 (20), 3 (10), 4 (5).', parts: [{ label: 'Denbaya kelen ka den hakɛ mɔyɛni.' }, { label: 'Variyansi.' }] },
  ],
  quiz: [
    { question: '3 ; 7 ; 9 ; 20 mediyan ye :', explanation: 'Hakɛ hakɛ ye pɛri ye : cɛmancɛ hakɛ fila mɔyɛni, $\\frac{7 + 9}{2}$.' },
    { question: 'Ekar tipu bɛ nin suman :', choices: ['jɛnsɛnni mɔyɛni lamini', 'hakɛ min bɛ segin ka caya', 'sɛri cɛmancɛ', 'hakɛw hakɛ'], explanation: 'Ni a ka bon, hakɛw jɛnsɛnnen don kosɛbɛ.' },
    { question: 'Paramɛtiri min tɛ yɛlɛma ka caya hakɛ jan kelen fɛ, o ye :', choices: ['mediyan', 'mɔyɛni', 'etandi', 'variyansi'], explanation: 'Nɔti 0 kelen bɛ mɔyɛni yɛlɛma nka a tɛ mediyan yɛlɛma ka caya.' },
    { question: 'Bwati diyagaramu kɔnɔ, bwati bɛ bɔ :', choices: ['$Q_1$ la ka se $Q_3$ ma', 'hakɛ dɔgɔmanba la ka se belebeleba ma', 'mɔyɛni la ka se mediyan ma', '0 la ka se 20 ma'], explanation: 'A bɛ kunnafoniw cɛmancɛ tilancɛ ɲɔgɔn ta.' },
  ],
  applications: [
    {
      title: 'Sikaso sanji',
      tagline: 'Samiyɛw sanga ɲɔgɔn ma',
      situation: 'San dɔ kalo sanjiw (mm la) ka bɔ mɛkalo la ka se ɔkutɔburukalo ma : 60 ; 140 ; 220 ; 300 ; 200 ; 80.',
      model: 'Hakɛ wɔɔrɔ sɛri.',
      questions: ['Kalo sanji mɔyɛni ye joli ye, mm la ?', 'Mediyan ye joli ye ?'],
      solution: ['A bɛɛ lajɛlen : mm 1 000 ; mɔyɛni $\\dfrac{1\\,000}{6} \\approx 166{,}7$ mm.', 'Sɛri labɛnnen : 60 ; 80 ; 140 ; 200 ; 220 ; 300 : mediyan $\\dfrac{140 + 200}{2} = 170$ mm.'],
    },
  ],
};
