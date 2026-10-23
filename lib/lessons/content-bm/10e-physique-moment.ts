import type { LessonText } from '../index';

// Bamanankan — brouillon à faire relire.
export const lesson: LessonText = {
  hook: 'Walasa ka kabakurun belebele dɔ kɔrɔta, masɔn bɛ nɛgɛ juru dɔ don a kɔrɔ ka a laban digi : den fitinin bɛ se ka fɛn kɔrɔta o cogo la, mɔgɔkɔrɔba tun tɛna se min kɔrɔta ni a bolo gansan ye. A gundo tɛ fanga ye, **yɔrɔjan** min na a bɛ kɛ, o de don.',
  objectives: ['ka fanga dɔ ka mɔmɛn kɔrɔ fɔ ɲɔgɔn munumunuyɔrɔ ma ;', 'ka levye bolo jate ;', 'ka mɔmɛnw teyoremu kɛ fɛn gɛlɛn bɛnnen dɔ la ;', 'ka levyew ni balansiw baarakɛcogo ɲɛfɔ.'],
  sections: [
    {
      title: 'Fanga ka mɔmɛn',
      blocks: [
        { legend: ['$F$ N la ; $d$ : levye bolo, munumunuyɔrɔ ni fanga sira cɛ, m la ; mɔmɛn N·m la'] },
        { text: 'Mɔmɛn bɛ fanga ka munumununi nɔ sumanikɛ. An b’a jate pozitifu munumununi fan dɔ la, negatifu fan dɔ wɛrɛ la. Fanga min sira bɛ tɛmɛ munumunuyɔrɔ fɛ, o mɔmɛn ye 0 ye.' },
        { title: 'da', text: 'An bɛ da digi ni N 20 ye, tɛgɛrɛ jɔlen, a nɛgɛ siriyɔrɔw la mɛtɛrɛ 0,8.', steps: ['$\\mathcal M = 20 \\times 0{,}8 = 16$ N·m. Ni i b’a digi a siriyɔrɔ gɛrɛfɛ, fanga caman de ka kan nɔ kelen kama.'] },
      ],
    },
    {
      title: 'Mɔmɛnw teyoremu',
      blocks: [
        { text: 'Fɛn gɛlɛn min bɛ se ka munumunu munumunuyɔrɔ sabatilen dɔ lamini, o bɛnnen don ni fangaw ka **mɔmɛnw faralen** ye 0 ye o munumunuyɔrɔ ma : $\\sum \\mathcal M_\\Delta = 0$.' },
        { title: 'masɔn ka levye', text: 'Kabakurun bɛ N 600 kɛ m 0,2 la sigiyɔrɔ ma ; masɔn bɛ a digi m 1,2 la sigiyɔrɔ ma.', steps: ['$600 \\times 0{,}2 = F \\times 1{,}2$', '$F = \\dfrac{120}{1{,}2} = 100$ N : siɲɛ wɔɔrɔ ka dɔgɔ ni kabakurun girinya ye.'] },
        { text: 'Don o don levyew : wotoro, pɛnsi, misi, tasumanin datugulan bɔlan, balansi womani, bolo kɔrɔla.' },
      ],
    },
  ],
  essentials: ['Mɔmɛn = fanga × levye bolo (N·m), a taamasiyɛn bɛ bɔ munumununi fan na.', 'Levye bolo ye munumunuyɔrɔ ni fanga sira cɛ ye.', 'Fɛn gɛlɛn min bɛ munumunu munumunuyɔrɔ dɔ lamini, o bɛnni : Σ mɔmɛnw = 0.'],
  exercises: [
    {
      title: 'Ekuru dɔ yɛlɛ',
      statement: 'Mekanisiyɛn bɛ N 50 kɛ tɛgɛrɛ jɔlen kile cm 30 laban na.',
      parts: [
        { label: 'Fanga mɔmɛn, N·m la.', steps: ['$50 \\times 0{,}30 = 15$ N·m.'] },
        { label: 'Fanga min ka kan ni kile cm 60 ye mɔmɛn kelen kama, N la.', steps: ['$\\dfrac{15}{0{,}60} = 25$ N.'] },
      ],
    },
    {
      title: 'Ɲɔgɔn koli kafa',
      statement: 'Awa (kilo 30) sigilen bɛ kafa munumunuyɔrɔ la mɛtɛrɛ 2 la. A kɔrɔce Isa girinya ye kilo 40 ye.',
      parts: [{ label: 'Isa ka kan ka sigi munumunuyɔrɔ la mɛtɛrɛ joli la walasa kafa ka bɛn (m la) ?', steps: ['$30\\,g \\times 2 = 40\\,g \\times d$', '$d = \\dfrac{60}{40} = 1{,}5$ m.'] }],
    },
  ],
  quiz: [
    { question: 'Fanga min sira bɛ tɛmɛ munumunuyɔrɔ fɛ, o mɔmɛn ye :', choices: ['0', 'a belebeleba', 'negatifu', 'fanga yɛrɛ'], explanation: 'Levye bolo ye 0 ye.' },
    { question: 'Fanga mɔmɛn hakɛ ye :', choices: ['N·m', 'N', 'J/s', 'kg·m'], explanation: 'Newton sigiyɔrɔ jatebɔ ni mɛtɛrɛ ye.' },
    { question: 'Walasa ka da wuli ni fanga dɔgɔman ye, an b’a digi :', choices: ['a siriyɔrɔw yɔrɔjan na', 'a siriyɔrɔw gɛrɛfɛ', 'a siriyɔrɔw kan', 'yɔrɔ bɛɛ'], explanation: 'Ni levye bolo ka jan, fanga min ka kan, o ka dɔgɔ.' },
    { question: 'Wotoro bɛ se ka doni girinman kɔrɔta, bawo :', choices: ['bolominɛyɔrɔw ka jan wotoro sen munumunuyɔrɔ la', 'wotoro sen ka nɔgɔn', 'doni bɛ dɔgɔya', 'mɔmɛn ye 0 ye'], explanation: 'Levye bolo jan bolo kama, a surun doni kama.' },
  ],
  applications: [
    {
      title: 'Sogo feerela ka balansi womani',
      tagline: 'Ka suman ni girinya kelen ye',
      situation: 'Niono sugu la, sogo feerela bɛ sogo dulon balansi womani munumunuyɔrɔ la cm 5 la. Girinya kilo 0,5 bɛ cɛrɛn balansi bolo kan ; bɛnni bɛ sɔrɔ ni a bɛ cm 36 la munumunuyɔrɔ ma.',
      model: 'Mɔmɛnw teyoremu : m × 5 = 0,5 × 36 (balansi bolo yɛrɛ girinya bɛnnen don).',
      questions: ['Sogo masi ye joli ye, kilo la ?', 'Girinya bɛ bila yɔrɔ jumɛn sogo kilo 2 kama ?'],
      solution: ['$m = \\dfrac{0{,}5 \\times 36}{5} = 3{,}6$ kg.', 'Kilo 2 kama : $d = \\dfrac{2 \\times 5}{0{,}5} = 20$ cm.'],
      fact: 'Balansi womani bɛ yen kabini san 2 000 ni kɔ : girinya kelen bɛ se ka masi danfaralen caman suman.',
    },
  ],
};
