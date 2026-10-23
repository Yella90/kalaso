import type { LessonText } from '../index';

// Bamanankan — brouillon à faire relire.
export const lesson: LessonText = {
  hook: 'Kalo laban na, kuran sara sɛbɛn bɛ na. Mun na klimatizɛri bɛ wari caman ta, k’a sɔrɔ LED lanpuw fanba tɛ foyi ta ? A bɛɛ bɛ bɔ minɛnw ka **puwisansi** ni u bɛ baara kɛ **waati** min kɔnɔ, o de la.',
  objectives: ['ka kuran puwisansi jate P = U × I ;', 'ka fanga jate E = P × t, zuli ni kilowatilɛri la ;', 'ka Joule nɔ jate P = R I² ;', 'ka nafa hakɛ jate.'],
  sections: [
    { title: 'Puwisansi ni fanga', blocks: [{ legend: ['$P$ wati (W) la ; $U$ V la ; $I$ A la'] }, { legend: ['$E$ zuli (J) la ni $P$ W la, $t$ s la ; kWh la ni $P$ kW la, $t$ lɛri la'] }, { text: 'kWh 1 = W 1 000 × s 3 600 = 3,6 × 10⁶ J. O ye kuran sara sɛbɛn hakɛ ye.' }] },
    { title: 'Joule nɔ ni nafa hakɛ', blocks: [{ legend: ['puwisansi min bɛ yɛlɛma ka kɛ funteni ye rezisitansi kɔnɔ'] }, { text: 'Joule nɔ nafa ka bon firi kuran walima ji kalanlan na, nka o ye bɔnɛ ye motɛri walima kuran sira kunba la.' }, { legend: ['nafa hakɛ, a ka dɔgɔ ni 1 ye tuma bɛɛ (walima 100 %)'] }] },
  ],
  essentials: ['P = U × I ; E = P × t.', 'kWh 1 = 3,6 × 10⁶ J.', 'Joule nɔ : P = R I².', 'Nafa hakɛ = puwisansi nafama ÷ puwisansi sɔrɔlen.'],
  simulationTasks: ['lanpu kelen V 6 la, kuranbɔlan ka puwisansi ni fanga min bɛ ta lɛri kelen kɔnɔ, olu sɛbɛn ;', 'lanpu fila siri ɲɔgɔn kɛrɛfɛ : puwisansi bɛɛ lajɛlen bɛ yɛlɛma cogo di ?'],
  exercises: [
    {
      title: 'Fɛnfɛnnan ka kuran sara',
      statement: 'Fɛnfɛnnan W 60 dɔ bɛ baara kɛ lɛri 8 tile kelen kɔnɔ tile 30 kɔnɔ. kWh kelen sɔngɔ ye FCFA 100 ye.',
      parts: [
        { label: 'Fanga min tara, kWh la.', steps: ['$0{,}060 \\times 8 \\times 30 = 14{,}4$ kWh.'] },
        { label: 'A sɔngɔ, FCFA la.', steps: ['$14{,}4 \\times 100 = 1\\,440$ FCFA.'] },
      ],
    },
    {
      title: 'Motɛri ka nafa hakɛ',
      statement: 'Motɛri dɔ balolen V 12 la bɛ A 2,0 sama. A kɔnɔ rezisitansi ye Ω 1,5 ye.',
      parts: [
        { label: 'Puwisansi sɔrɔlen, W la.', steps: ['$P = 12 \\times 2{,}0 = 24$ W.'] },
        { label: 'Puwisansi min bɔnɛna Joule nɔ fɛ, W la.', steps: ['$P_J = 1{,}5 \\times 2{,}0^2 = 6{,}0$ W.'] },
        { label: 'Nafa hakɛ, % la.', steps: ['$\\eta = \\dfrac{24 - 6}{24} = 0{,}75$, o ye 75 % ye.'] },
      ],
    },
  ],
  quiz: [
    { question: 'Kuran sara sɛbɛn fanga hakɛ ye :', choices: ['kilowatilɛri', 'wati', 'vɔliti', 'anperi'], explanation: 'kWh 1 = MJ 3,6.' },
    { question: 'Ni ɛntansite laban siɲɛ fila rezisitansi kɔnɔ, Joule nɔ bɛ :', choices: ['laban siɲɛ naani', 'laban siɲɛ fila', 'tila fila ye', 'to a cogo la'], explanation: 'P = RI².' },
    { question: 'Lanpu W 100 min manana lɛri 10, o bɛ nin ta :', choices: ['kWh 1', 'kWh 10', 'kWh 0,1', 'kWh 1 000'], explanation: 'kW 0,1 × lɛri 10 = kWh 1.' },
    { question: 'Nafa hakɛ 100 % ye :', choices: ['fɛn ye min tɛ se ka kɛ', 'fɛn ye min ka ca', 'wajibi ye', 'ampuli kɔrɔw ta ye'], explanation: 'Bɔnɛ bɛ yen tuma bɛɛ, funteni la ka tɛmɛ.' },
  ],
  applications: [
    {
      title: 'LED walima ampuli kɔrɔ ?',
      tagline: 'Ka EDM sara dɔgɔya',
      situation: 'Bamakɔ butiki dɔ bɛ ampuli W 60 tan to u manalen lɛri 12 tile kelen kɔnɔ. LED W 9 bɛ yeelen kelen di. kWh kelen sɔngɔ ye FCFA 100 ye.',
      model: 'E = P × t ; wari marali = fanga tali danfara × sɔngɔ.',
      questions: ['Butiki bɛ wari joli mara tile 30 kɔnɔ, FCFA la ?', 'Mun na ampuli kɔrɔ bɛ kalaya kosɛbɛ ?'],
      solution: ['Puwisansi danfara : $10 \\times (60 - 9) = 510$ W = kW 0,51.', 'Fanga min marala : $0{,}51 \\times 12 \\times 30 = 183{,}6$ kWh, o ye FCFA 18 360 ye.', 'A juru misɛn bɛ fanga 90 % ni kɔ yɛlɛma ka kɛ funteni ye Joule nɔ fɛ : a yeelen nafa hakɛ ka dɔgɔ.'],
      fact: 'LED bɛ mɛn siɲɛ 25 ɲɔgɔn ka tɛmɛ ampuli kɔrɔ kan.',
    },
  ],
};
