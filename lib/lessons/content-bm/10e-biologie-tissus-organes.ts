import type { LessonText } from '../index';

// Bamanankan — brouillon à faire relire.
export const lesson: LessonText = {
  hook:
    'Mɔgɔ farikolo bɛ selili miliyari 37 000 ɲɔgɔn sɔrɔ. U bɛɛ tɛ kelen ye : nɛrɔn dɔ bɛ se ka mɛtɛrɛ kelen janya sɔrɔ, joli kisɛ bilenman tɛ kɛsɛ sɔrɔ, fasa selili bɛ ɲɔgɔn minɛ. U bɛ ɲɔgɔn labɛn cogo di walasa ka fɛn ɲɛnama dilan min bɛ taama, ka dumuni kɛ, ka miiri ?',
  objectives: [
    'ka tisi, fɛn kɔnɔfɛn (ɔrgani), minɛn ani fɛn ɲɛnama kɔrɔ fɔ ;',
    'ka bagan ni jiri tisi suguya kunbabaw fɔ ;',
    'ka selili cogo ni a ka baara siri ɲɔgɔn na ;',
    'ka bonya hakɛw jate.',
  ],
  sections: [
    {
      title: 'Labɛncogo hakɛw',
      blocks: [
        {
          items: [
            '**selili** : fɛn dilanni kelen ;',
            '**tisi** : selili ɲɔgɔnnaw minnu bɛ baara kelen kɛ (fasa tisi, sɔgɔsɔgɔ tisi…) ;',
            '**ɔrgani** : tisi caman minnu bɛ fara ɲɔgɔn kan ka fɛn dɔ dilan (dusukun, bulu, kɔnɔbara) ;',
            '**minɛn** (walima sistɛmu) : ɔrgani minnu bɛ baara kɛ ɲɔgɔn fɛ (dumuni minɛn, ninakili minɛn) ;',
            '**fɛn ɲɛnama** : fɛn ɲɛnama bɛɛ lajɛlen.',
          ],
        },
        { title: 'kɔnɔbara', text: 'Kɔnɔbara ye ɔrgani ye : tisi epiteliyali min bɛ kɔnɔbara ji bɔ, fasa tisiw minnu bɛ dumuni ɲagami, sɔgɔsɔgɔ tisi min b’a ɲɛminɛ, ani tisi min bɛ u bɛɛ siri.' },
      ],
    },
    {
      title: 'Bagan tisiw',
      blocks: [
        {
          head: ['Tisi', 'A ka baara', 'Misali'],
          rows: [
            ['epiteliyali', 'ka datugu, ka tanga, ka ji bɔ', 'golo, nugu wolo'],
            ['konzɔnkitifu', 'ka siri, ka dɛmɛ, ka ta ka taa', 'kolo, kolo nɔgɔnman, joli'],
            ['fasa', 'ka ɲɔgɔn minɛ, ka lamaga', 'bolo ni sen fasaw, dusukun'],
            ['sɔgɔsɔgɔ', 'ka cikanw sɔrɔ ka u lase', 'kunsɛmɛ, sɔgɔsɔgɔw'],
          ],
        },
        { caption: 'Nugu tigɛlen : tisi epiteliyali bɛ kuru ka kɛ wililiw ye, olu bɛ balofɛnw minɛ.' },
        { caption: 'Nɛrɔn : a cogo bolo caman ye, o b’a dɛmɛ ka cikanw sɔrɔ ka u lase.' },
      ],
    },
    {
      title: 'Jiri tisiw',
      blocks: [
        {
          head: ['Tisi', 'A ka baara'],
          rows: [
            ['epidɛrimu', 'ka tanga ; sitomatiw bɛ gazi falenni kɛ'],
            ['paranshimu klorofilima', 'ka fotosentɛzi kɛ'],
            ['ksilɛmu (yiri sirakuluw)', 'ka sɛwu kɔrɔ ta ka bɔ liliw la ka taa buluw la'],
            ['floyɛmu', 'ka sɛwu labɛnnen ta ka bɔ buluw la ka taa jiri yɔrɔ bɛɛ la'],
            ['meristɛmu', 'ka selili kuraw dilan (bonyali)'],
          ],
        },
        { text: 'Fɛn ɲɛnama selili camanma bɛɛ la, seliliw **kɛrɛnkɛrɛnnen** don : u cogo bɛnnen bɛ u ka baara ma.' },
      ],
    },
  ],
  essentials: [
    'Selili → tisi → ɔrgani → minɛn → fɛn ɲɛnama.',
    'Bagan tisiw : epiteliyali, konzɔnkitifu, fasa, sɔgɔsɔgɔ.',
    'Jiri tisiw : epidɛrimu, paranshimu, ksilɛmu, floyɛmu, meristɛmu.',
    'Selili cogo bɛnnen bɛ a ka baara ma.',
  ],
  exercises: [
    {
      title: 'Hakɛw labɛn',
      statement: 'Jaabi ni daɲɛ kelen ye faransikan na : cellule, tissu, organe walima appareil.',
      parts: [
        { label: 'Dusukun ye…', steps: ['A bɛ fasa, sɔgɔsɔgɔ, konzɔnkitifu ani epiteliyali tisiw fara ɲɔgɔn kan.'] },
        { label: 'Joli ye…', steps: ['Tisi konzɔnkitifu jiman don.'] },
      ],
    },
    {
      title: 'Nɛrɔn jan',
      statement: 'Kɔkolo nɛrɔn dɔ farikolo bonya ye mm 0,1 ye ; a aksɔni, min bɛ taa fo sen na, a janya ye mɛtɛrɛ 1 ye.',
      parts: [{ label: 'Aksɔni ka jan ni a farikolo ye siɲɛ joli ?', steps: ['m 1 = mm 1 000.', '$\\dfrac{1\\,000}{0{,}1} = 10\\,000$.'] }],
    },
  ],
  quiz: [
    {
      question: 'Selili ɲɔgɔnnaw minnu bɛ baara kelen kɛ, olu bɛ nin dilan :',
      choices: ['tisi', 'ɔrgani', 'minɛn', 'fɛn ɲɛnama'],
      explanation: 'Tisi caman de bɛ ɔrgani dilan.',
    },
    {
      question: 'Sɛwu kɔrɔ bɛ taama :',
      choices: ['ksilɛmu kɔnɔ', 'floyɛmu kɔnɔ', 'epidɛrimu kɔnɔ', 'meristɛmu kɔnɔ'],
      explanation: 'A bɛ yɛlɛn ka bɔ liliw la ka taa buluw la yiri sirakuluw kɔnɔ.',
    },
    {
      question: 'Tisi min bɛ cikanw lase, o ye :',
      choices: ['sɔgɔsɔgɔ tisi', 'fasa tisi', 'epiteliyali tisi', 'konzɔnkitifu tisi'],
      explanation: 'Nɛrɔnw de b’a dilan.',
    },
    {
      question: 'Dumuni minɛn dilannen bɛ :',
      choices: ['ɔrgani caman na', 'tisi kelen na', 'selili kelen na', 'fasaw dɔrɔn na'],
      explanation: 'Da, kɔnɔnɔ juru, kɔnɔbara, nuguw, biɲɛ… bɛ baara kɛ ɲɔgɔn fɛ.',
    },
  ],
  applications: [
    {
      title: 'Mangoro jiri gɛrɛfili',
      tagline: 'Mun na jiri fara ka kan ka bɛn ɲɔgɔn ma ?',
      situation: 'Sikaso, jiri turubaga dɔ bɛ mangoro « Kent » bolo dɔ gɛrɛfi jiri fitinin dɔ kan. A janto bɛ a la ka yɔrɔ binkɛnɛ min bɛ jiri fara jukɔrɔ, o fila bɛn ɲɔgɔn ma. Gɛrɛfili 40 kɔnɔ, 34 bɛ mɛn.',
      model: 'Jiri fara jukɔrɔ, floyɛmu ni selili minnu bɛ tila (kanbiyɔmu) bɛ yen.',
      questions: ['Ɲɛtaa hakɛ ye joli ye, % la ?', 'Mun na jiri fara jukɔrɔ yɔrɔ ka kan ka bɛn ɲɔgɔn ma ?'],
      solution: [
        '$\\dfrac{34}{40} \\times 100 = 85$ %.',
        'Selili minnu bɛ tila, olu ka kan ka siri ɲɔgɔn na walasa ka sirakulu dafalenw dilan kokura : sɛwu bɛ se ka taa ka bɔ jiri juru la ka se gɛrɛfilen ma.',
      ],
      fact: 'Gɛrɛfili bɛ jiri sɔrɔ joona minnu bɛɛ bɛ den kelen di i n’a fɔ jiri fɔlɔ.',
    },
  ],
};
