import type { LessonText } from '../index';

// Bamanankan — brouillon à faire relire.
export const lesson: LessonText = {
  hook: 'Bana jiri belebeleba dɔ janya bɛ suman cogo di k’a sɔrɔ i ma yɛlɛn a kan ? I ka kan ka segin kɔfɛ mɛtɛrɛ 20 ka ɲɛnamini suman i bɛ a kunkolo ye min kɔrɔ. **Tirigonometiri** bɛ ɲɛnaminiw ni janyaw siri ɲɔgɔn na ; a bɛ kɛ baara la fana ka fɛn bɛɛ ɲɛfɔ min bɛ munumunu walima ka yɛrɛyɛrɛ : wotoro senw, ondw, kuran yɛlɛmatɔ.',
  objectives: ['ka radiyan ni sɛrikili tirigonometiriki kɛ baara la ;', 'ka ɲɛnamini kɛrɛnkɛrɛnnenw ka kosinusi ni sinusi dɔn ;', 'ka farali ni fila kɛli fɔrimiliw kɛ baara la ;', 'ka ekwasiyɔn $\\cos x = \\cos a$ ni $\\sin x = \\sin a$ jaabi.'],
  sections: [
    {
      title: 'Radiyan ni sɛrikili tirigonometiriki',
      blocks: [
        {},
        { text: 'Sɛrikili min cɛmancɛ ye $O$, a rayɔn ye 1, o kan, tomi $M$ min sirilen bɛ ɲɛnamini ɲɛsinnen $x$ na, o kowɔridonew ye $(\\cos x, \\sin x)$ ye. Ɲɛnamini ɲɛsinnen bɛ dɔn $2k\\pi$ kɔnɔ.' },
      ],
    },
    {
      title: 'Farali ni fila kɛli fɔrimiliw',
      blocks: [{}, {}, {}],
    },
    {
      title: 'Ekwasiyɔn tirigonometirikiw',
      blocks: [
        { tex: '\\cos x = \\cos a \\iff x = a + 2k\\pi \\text{ walima } x = -a + 2k\\pi \\qquad \\sin x = \\sin a \\iff x = a + 2k\\pi \\text{ walima } x = \\pi - a + 2k\\pi' },
        { title: '$\\cos x = \\dfrac{1}{2}$ $[0, 2\\pi[$ kɔnɔ', steps: ['$x = \\dfrac{\\pi}{3}$ walima $x = -\\dfrac{\\pi}{3} + 2\\pi = \\dfrac{5\\pi}{3}$.'] },
        { wrong: '« $\\cos x = \\frac{1}{2}$ bɛ jaabi kelen dɔrɔn sɔrɔ, $\\frac{\\pi}{3}$. »', why: 'Sɛrikili tomi fila abisisi ye $\\frac{1}{2}$ ye ; ani munumunuli dafalenw bɛ se ka fara a kan.', reflex: 'Jaabi denbaya fila tuma bɛɛ, o kɔ an bɛ entɛriwali ɲininen ta minnu mara.' },
      ],
    },
  ],
  essentials: ['$\\pi$ rad = 180° ; $M(\\cos x, \\sin x)$ sɛrikili tirigonometiriki kan ; $\\cos^2 x + \\sin^2 x = 1$.', 'Hakɛ kɛrɛnkɛrɛnnenw $0$, $\\frac{\\pi}{6}$, $\\frac{\\pi}{4}$, $\\frac{\\pi}{3}$, $\\frac{\\pi}{2}$ la.', 'Farali : $\\cos(a + b) = \\cos a\\cos b - \\sin a\\sin b$ ; fila kɛli : $\\sin 2a = 2\\sin a\\cos a$.', '$\\cos x = \\cos a$ : $x = \\pm a + 2k\\pi$ ; $\\sin x = \\sin a$ : $x = a$ walima $\\pi - a$, $2k\\pi$ kɔnɔ.'],
  exercises: [
    { title: 'Yɛlɛmaliw ni hakɛw', statement: 'Jaabi ni hakɛ gɛrɛfɛlaw ye.', parts: [{ label: '150° radiyan na.' }] },
    { title: 'Ka jaabi', statement: 'An bɛ jaabi $[0, 2\\pi[$ kɔnɔ.', parts: [{ label: '$\\cos x = \\dfrac{1}{2}$ bɛ jaabi joli sɔrɔ ?', steps: ['$\\dfrac{\\pi}{3}$ ni $\\dfrac{5\\pi}{3}$.'] }, { label: '$\\sin x = \\dfrac{\\sqrt{2}}{2}$ jaabi belebeleba (hakɛ gɛrɛfɛla).', steps: ['$x = \\dfrac{\\pi}{4}$ walima $x = \\pi - \\dfrac{\\pi}{4} = \\dfrac{3\\pi}{4} \\approx 2{,}356$.'] }] },
  ],
  quiz: [
    { question: '$\\sin\\dfrac{\\pi}{6}$ ye :', explanation: 'Hakɛ kɛrɛnkɛrɛnnen min ka kan ka dɔn.' },
    { question: '$\\cos^2 x + \\sin^2 x$ ye tuma bɛɛ :', explanation: 'Pitagɔri ka teyorɛmu sɛrikili rayɔn 1 kɔnɔ.' },
    { question: '$\\sin 2a$ ye :', explanation: 'Fila kɛli fɔrimili.' },
    { question: '90° bɛ bɛn :' },
  ],
  applications: [
    {
      title: 'Bana jiri janya',
      tagline: 'Jiri suman k’a sɔrɔ i ma yɛlɛn a kan',
      situation: 'Kalanden dɔ bɛ jɔ mɛtɛrɛ 20 bana jiri belebeleba dɔ sen na, dugukolo dalen kan. A bɛ jiri kunkolo laje ɲɛnamini 35° kɔrɔ ka bɔ dalen kan ; a ɲɛw ka jan dugukolo la m 1,5.',
      model: 'Tiriyangili ɲɛnamini jɔlenma ɲɛ, jiri kala ni kunkolo cɛ.',
      questions: ['Jiri janya ye joli ye, m la ?'],
      solution: ['Ɲɛw sanfɛ : $20 \\times \\tan 35° \\approx 14{,}0$ m.', 'Janya bɛɛ lajɛlen : $14{,}0 + 1{,}5 \\approx 15{,}5$ m.'],
    },
  ],
};
