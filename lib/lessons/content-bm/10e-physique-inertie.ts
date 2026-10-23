import type { LessonText } from '../index';

// Bamanankan — brouillon à faire relire.
export const lesson: LessonText = {
  hook: 'Sotrama bɛ jɔ joona : tɛmɛbagaw bɛɛ bɛ fili ɲɛ fɛ. Mɔgɔ si m’u digi ! U ye u ka taama nɔfɛ dɔrɔn, k’a sɔrɔ mobili bɛ jɔ. Fɛnw bɛ u ka teliya mara : o ye **ɛnɛrisi** ye.',
  objectives: ['ka ɛnɛrisi sariya fɔ ;', 'ka sistɛmu kelennen walima a kelennen ɲɔgɔn dɔn ;', 'ka ɲɛnamaya cogo dɔw ɲɛfɔ ni ɛnɛrisi ye ;', 'ka ɛnɛrisi ni sira kan lakanali siri ɲɔgɔn na.'],
  sections: [
    {
      title: 'Ɛnɛrisi sariya',
      blocks: [
        { text: 'Dugukolo referansiyɛli la, fɛn o fɛn min **kelennen** don (fanga si tɛ) walima a **kelennen ɲɔgɔn** don (fangaw bɛ ɲɔgɔn ban), o **tɛ lamaga**, walima a bɛ taa **juru tilennen kan teliya kelen na**.' },
        { text: 'A sɛgɛnnin fɛ, ni fɛn dɔ teliya bɛ yɛlɛma (a hakɛ walima a ɲɛsin), o kɔrɔ ye ko fangaw minnu bɛ a kan, olu tɛ ɲɔgɔn ban.' },
        { title: 'palɛti nɛnɛ kan', text: 'Fiɲɛ tabali dɔ kan, palɛti min filila, o bɛ taa juru tilennen kan teliya kelen na : a girinya ni fiɲɛ digili bɛ ɲɔgɔn ban, nɔgɔnni fanba tɛ.' },
      ],
    },
    {
      title: 'Ɛnɛrisi don o don',
      blocks: [
        {
          items: [
            'ni mobili jɔra, tɛmɛbagaw bɛ taa ɲɛ : o de kosɔn **lakanali cɛsira** bɛ yen ;',
            'ni a wulila, a bɛ i n’a fɔ u bɛ sama kɔ fɛ : u bɛ to u yɔrɔ la ka mobili taa ;',
            'ni a munumunuyɔrɔ la, doni min ma siri, o bɛ taa tilennen, kɛnɛma fɛ ;',
            'an bɛ tapi lamaga : tapi bɛ jɔ, buguri bɛ taa a fɛ ka bɔ.',
          ],
        },
        { wrong: '« Walasa fɛn dɔ ka taa ɲɛ, fanga dɔ ka kan k’a digi tuma bɛɛ. »', why: 'Ni nɔgɔnni tɛ, fɛn bɛ a ka teliya mara a yɛrɛ ma. Sira kan, fanga lamagalan ka kan dɔrɔn walasa ka nɔgɔnni ban.', reflex: 'Fanga si tɛ, o kɔrɔ tɛ ko a jɔlen don : o kɔrɔ ye ko a teliya tɛ yɛlɛma.' },
        { text: 'Ni masi ka bon, ɛnɛrisi ka bon : kamiyɔn lamagali walima a jɔli ka gɛlɛn ni nɛgɛso ta ye.' },
      ],
    },
  ],
  essentials: ['Fɛn kelennen walima a kelennen ɲɔgɔn : a jɔlen walima a bɛ taa juru tilennen kan teliya kelen na.', 'Ni teliya bɛ yɛlɛma, fangaw tɛ ɲɔgɔn ban.', 'Ɛnɛrisi bɛ caya ni masi ye ; lakanali cɛsira bɛ mɔgɔ tanga jɔli waati.'],
  exercises: [
    {
      title: 'Palɛti bɛ cɛrɛn',
      statement: 'Palɛti kelennen ɲɔgɔn dɔ bɛ m 0,60 tigɛ segɔn 2,0 kɔnɔ juru tilennen kan.',
      parts: [
        { label: 'A teliya m/s la.', steps: ['$v = \\dfrac{0{,}60}{2{,}0} = 0{,}30$ m/s.'] },
        { label: 'Yɔrɔjan min bɛ tigɛ segɔn 3,0 nata kɔnɔ, m la.', steps: ['Juru tilennen teliya kelen : $0{,}30 \\times 3{,}0 = 0{,}90$ m.'] },
      ],
    },
    {
      title: 'Ni cɛsira tɛ',
      statement: 'Taksi dɔ bɛ taa km/h 54 la ka kogo gosi. Tɛmɛbaga min ma cɛsira siri, o bɛ taa km/h 54 la fo nɛgɛ jɛman ma.',
      parts: [
        { label: 'Tɛmɛbaga teliya gosili waati, m/s la.', steps: ['$\\dfrac{54}{3{,}6} = 15$ m/s.'] },
        { label: 'Sanfɛla min ka kan walasa ka o teliya sɔrɔ ni mɔgɔ binna (h = v²/2g, g = 9,8), m la.', steps: ['$h = \\dfrac{15^2}{2 \\times 9{,}8} \\approx 11{,}5$ m : i n’a fɔ ka bin ka bɔ so 4nan na.'] },
      ],
    },
  ],
  quiz: [
    { question: 'Fɛn min fangaw bɛ ɲɔgɔn ban, o bɛ se ka :', choices: ['taa juru tilennen kan teliya kelen na', 'teliya', 'munumunu', 'jɔ dɔɔnin-dɔɔnin'], explanation: 'Walima ka to a jɔlen.' },
    { question: 'Ni mobili jɔra, tɛmɛbagaw bɛ fili ɲɛ fɛ bawo :', choices: ['u bɛ u ka taama nɔfɛ', 'fanga dɔ b’u digi ɲɛ fɛ', 'sigilan b’u digi', 'fiɲɛ b’u digi'], explanation: 'O ye ɛnɛrisi ye.' },
    { question: 'Jumɛn ka ɛnɛrisi ka bon ?', choices: ['kamiyɔn falen', 'moto', 'nɛgɛso', 'bɔlɔ'], explanation: 'Ɛnɛrisi bɛ caya ni masi ye.' },
    { question: 'Munumunuyɔrɔ la, bɔrɔ min bilalen bɛ sigilan kan, o bɛ cɛrɛn :', choices: ['munumunuyɔrɔ kɛnɛma fɛ', 'kɔnɔ fɛ', 'kɔ fɛ', 'a tɛ lamaga'], explanation: 'A b’a fɛ ka taa tilennen.' },
  ],
  applications: [
    {
      title: 'Kamiyɔn ka doni',
      tagline: 'Mun na bɔrɔw ka kan ka siri ?',
      situation: 'Kamiyɔn dɔ bɛ koori bɔrɔw ta ka bɔ Kucala ka taa Bamakɔ km/h 72 la. A bɛ jɔ joona, ka jɔ segɔn 4 kɔnɔ. Bɔrɔ minnu ma siri, olu bɛ cɛrɛn ka taa sofɛri yɔrɔ fɛ.',
      model: 'Bɔrɔw bɛ u ka teliya mara ɛnɛrisi fɛ, fo fanga min bɛ se k’u jɔ.',
      questions: ['Kamiyɔn teliya tun ye joli ye m/s la ?', 'Mun na bɔrɔw bɛ taa ɲɛ fɛ ?'],
      solution: ['$\\dfrac{72}{3{,}6} = 20$ m/s.', 'Kamiyɔn bɛ dɔgɔya nka foyi t’u mina ka ɲɛ : u bɛ taa m/s 20 ɲɔgɔn na ka cɛrɛn ɲɛ fɛ. Juruw bɛ fanga di u ma min b’u jɔ ni kamiyɔn ye.'],
      fact: 'Galilée de y’a faamu fɔlɔ ɛnɛrisi la ; Newton y’a kɛ a ka mekaniki sariya fɔlɔ ye.',
    },
  ],
};
