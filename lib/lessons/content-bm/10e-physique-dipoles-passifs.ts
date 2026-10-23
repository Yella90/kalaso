import type { LessonText } from '../index';

// Bamanankan — brouillon à faire relire.
export const lesson: LessonText = {
  hook: 'Firi kuran, ji kalanlan ani kuran fɔyɛrɛ bɛ funteni bɔ nɛgɛ juru dɔ de fɛ min bɛ kuran tɛmɛni bali : **rezisitansi**. Ni a ka bon, kuran tɛmɛni ka gɛlɛn. Tansiyɔn ni ɛntansite cɛ bɛnni nɔgɔman in tɔgɔ ye Ohm ye.',
  objectives: ['ka fɛn dɔ ka karakiteristiki ja ka a kɛ baara la ;', 'ka Ohm ka sariya U = R × I kɛ baara la ;', 'ka rezisitansi bɛnnen jate rezisitansiw sirilen ɲɔgɔn nɔfɛ walima ɲɔgɔn kɛrɛfɛ ;', 'ka rezisitansi ɲɛw ka kodi kalan.'],
  sections: [
    {
      title: 'Ohm ka sariya',
      blocks: [
        { legend: ['$U$ V la ; $R$ ɔmu (Ω) la ; $I$ A la'] },
        { text: 'Kunduktɛri ɔmiki ka **karakiteristiki** U = f(I) ye juru tilennen ye min bɛ tɛmɛ orizini fɛ ; a kɔlɔnni ye R ye. Lanpu, o tɛ kunduktɛri ɔmiki ye : a rezisitansi bɛ caya ni a juru misɛn bɛ kalaya.' },
        { title: 'fɔyɛrɛ dɔ', text: 'Kuran fɔyɛrɛ dɔ sirilen V 220 kan bɛ A 5 sɔrɔ.', steps: ['$R = \\dfrac{U}{I} = \\dfrac{220}{5} = 44$ Ω.'] },
      ],
    },
    {
      title: 'Rezisitansiw siri ɲɔgɔn na',
      blocks: [
        { label: 'ɲɔgɔn nɔfɛ' },
        { label: 'ɲɔgɔn kɛrɛfɛ' },
        { text: 'Ɲɔgɔn nɔfɛ, rezisitansi bɛnnen ka bon ni kelen-kelen bɛɛ ye ; ɲɔgɔn kɛrɛfɛ, a ka dɔgɔ ni a dɔgɔmanba ye.' },
      ],
    },
  ],
  essentials: ['Ohm ka sariya : U = R × I ; karakiteristiki ye juru tilennen ye min bɛ tɛmɛ orizini fɛ.', 'Ɲɔgɔn nɔfɛ : R = R₁ + R₂ ; ɲɔgɔn kɛrɛfɛ : 1/R = 1/R₁ + 1/R₂.', 'Lanpu tɛ kunduktɛri ɔmiki ye.'],
  simulationTasks: ['« Rezisitansiw » ni fɛn kelen sugandi : I sɛbɛn U = 3, 6, 9 ani 12 V kama ; a lajɛ ko U / I tɛ yɛlɛma ;', 'rezisitansi bɛnnen suma ɲɔgɔn nɔfɛ ni ɲɔgɔn kɛrɛfɛ R₁ = 20 Ω ni R₂ = 30 Ω kama.'],
  exercises: [
    { title: 'Ohm ka sariya kɛ baara la', statement: 'Rezisitansi Ω 47 bɛ tansiyɔn V 9,4 sɔrɔ.', parts: [{ label: 'Kuran ɛntansite, A la.', steps: ['$I = \\dfrac{9{,}4}{47} = 0{,}20$ A.'] }] },
    {
      title: 'Rezisitansi fila siri ɲɔgɔn na',
      statement: 'R₁ = 20 Ω ni R₂ = 30 Ω bɛ balo kuranbɔlan V 12 fɛ.',
      parts: [
        { label: 'Rezisitansi bɛnnen ɲɔgɔn nɔfɛ, Ω la.', steps: ['$20 + 30 = 50$ Ω.'] },
        { label: 'Rezisitansi bɛnnen ɲɔgɔn kɛrɛfɛ, Ω la.', steps: ['$\\dfrac{20 \\times 30}{20 + 30} = \\dfrac{600}{50} = 12$ Ω.'] },
        { label: 'Kuranbɔlan bɛ ɛntansite joli di ɲɔgɔn kɛrɛfɛ siri la, A la.', steps: ['$I = \\dfrac{12}{12} = 1$ A.'] },
      ],
    },
  ],
  quiz: [
    { question: 'Ni rezisitansi dawolo la tansiyɔn laban siɲɛ fila, ɛntansite bɛ :', choices: ['laban siɲɛ fila', 'tila fila ye', 'to a cogo la', 'laban siɲɛ naani'], explanation: 'I = U/R : u bɛ kɛɲɛ.' },
    { question: 'Rezisitansi Ω 10 fila ɲɔgɔn kɛrɛfɛ bɛ bɛn nin ma :', choices: ['Ω 5', 'Ω 20', 'Ω 10', 'Ω 100'], explanation: '10 × 10 / 20 = Ω 5.' },
    { question: 'Kunduktɛri ɔmiki ka karakiteristiki ye :', choices: ['juru tilennen min bɛ tɛmɛ orizini fɛ', 'parabɔli', 'juru dalen', 'kurubu suguya bɛɛ'], explanation: 'U bɛ kɛɲɛ ni I ye.' },
    { question: 'Rezisitansi hakɛ ye :', choices: ['ɔmu', 'vɔliti', 'anperi', 'wati'], explanation: 'A taamasiyɛn ye Ω ye.' },
  ],
  applications: [
    {
      title: 'Firi kuran labɛn',
      tagline: 'Rezisitansi ɲuman sugandi',
      situation: 'Kalalikɛla ka firi kuran rezisitansi kalanlan jenina. A sɛbɛn b’a fɔ V 220 – A 4,4. Kuran baarakɛla bɛ rezisitansi Ω 22, Ω 50 ani Ω 100 sɔrɔ.',
      model: 'R = U / I.',
      questions: ['Rezisitansi jumɛn ka kan walasa a ka baara kɛ ka ɲɛ ?', 'A bɛ se ka sɔrɔ cogo di ni rezisitansi minnu bɛ yen ?'],
      solution: ['$R = \\dfrac{220}{4{,}4} = 50$ Ω.', 'Rezisitansi Ω 50 bɛ bɛn a ma ; Ω 100 fila fana bɛ se ka siri ɲɔgɔn kɛrɛfɛ.'],
      fact: 'Georg Ohm y’a ka sariya bɔ san 1827 ; mɔgɔw tun b’a lagɛlɛ o waati.',
    },
  ],
};
