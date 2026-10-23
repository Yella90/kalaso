import type { LessonText } from '../index';

// Bamanankan — brouillon à faire relire.
export const lesson: LessonText = {
  hook: 'Ludo tulon na, 6 ka kan wa walasa ka pion bɔ ? Ni i ye dé fila fili, 6 kelen ni kɔ sɔrɔli jigiya ye joli ye ? Kɛrimɛsi tonbola la, a ka fisa ka biye fila san wa ? **Pirobabilitew** bɛ ko dɔ kɛli jigiya suman ni jateden ye min bɛ 0 ni 1 cɛ.',
  objectives: ['ka ko-ka-kɛ-gansan kɔrɔbɔli, a ka iniwɛri ani a ka kow ɲɛfɔ ;', 'ka pirobabilite jate ni bɔli bɛɛ jigiya ye kelen ye ;', 'ka ko sɛgɛnnin kɛ baara la ;', 'ka kow faralen pirobabilite jate.'],
  sections: [
    {
      title: 'Kumasenw',
      blocks: [
        { items: ['**ko-ka-kɛ-gansan kɔrɔbɔli** bɛ bɔli caman sɔrɔ, an tɛ se ka minnu dɔn ka kɔn tiɲɛ la ;', '**iniwɛri** $\\Omega$ ye bɔliw bɛɛ kulu ye ;', '**ko** ye iniwɛri yɔrɔ dɔ ye ; $A \\cap B$ (« A ani B »), $A \\cup B$ (« A walima B »), $\\bar{A}$ (A sɛgɛnnin) ;', 'ko fila ye **ɲɔgɔnbalaw** ye ni u tɛ se ka kɛ waati kelen na.'] },
        { label: 'Jigiya kelenya', tex: 'P(A) = \\dfrac{\\text{bɔli ɲɛnamaw hakɛ}}{\\text{bɔli bɛɛ hakɛ}}' },
      ],
    },
    {
      title: 'Jatebɔ sariyaw',
      blocks: [
        { legend: ['ni $A$ ni $B$ ye ɲɔgɔnbalaw ye : $P(A \\cup B) = P(A) + P(B)$'] },
        { title: 'dé fila', text: 'An bɛ dé fila balansilenw fili : bɔli $6 \\times 6 = 36$ minnu jigiya ye kelen ye.', steps: ['Farali ye 7 ye : (1,6), (2,5), (3,4), (4,3), (5,2), (6,1), o ye $\\dfrac{6}{36} = \\dfrac{1}{6}$ ye.', '6 kelen ni kɔ : a sɛgɛnnin « 6 si tɛ », $\\dfrac{25}{36}$ ; o la $1 - \\dfrac{25}{36} = \\dfrac{11}{36} \\approx 0{,}31$.'] },
        { wrong: '« Dé fila la, 6 kelen ni kɔ pirobabilite ye $\\frac{1}{6} + \\frac{1}{6} = \\frac{1}{3}$ ye. »', why: 'Ko fila « 6 dé fɔlɔ kan » ni « 6 dé filanan kan » tɛ ɲɔgɔnbalaw ye : 6 fila bɛ jate siɲɛ fila.', reflex: '« Kelen ni kɔ » kama, ko sɛgɛnnin fɛ taa.' },
      ],
    },
  ],
  essentials: ['Iniwɛri, kow, bɔliw ; $0 \\leq P(A) \\leq 1$.', 'Jigiya kelenya : ɲɛnamaw / minnu bɛ se ka kɛ.', '$P(\\bar{A}) = 1 - P(A)$ ; $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$.', '« Kelen ni kɔ » : sɛgɛnnin fɛ taa.'],
  exercises: [
    { title: 'Dé fila', statement: 'An bɛ dé fila balansilenw fili, minnu ɲɛda ye wɔɔrɔ ye.', parts: [{ label: 'Farali ka kɛ 7 ye pirobabilite (hakɛ gɛrɛfɛla).', steps: ['Bɔli ɲɛnama 6 bɛ 36 la : $\\dfrac{1}{6}$.'] }, { label: '6 kelen ni kɔ sɔrɔli pirobabilite (hakɛ gɛrɛfɛla).' }] },
    { title: 'Karitiw 32', statement: 'An bɛ karitiw 32 dɔ ta gansan (kulɛri 4, karitiw 8 kelen-kelen bɛɛ la : 7, 8, 9, 10, valɛ, dame, masakɛ, asi).', parts: [{ label: 'Asi tali pirobabilite.' }, { label: 'Asi walima kɛri tali pirobabilite.', steps: ['$P(\\text{asi}) + P(\\text{kɛri}) - P(\\text{kɛri asi}) = \\dfrac{4 + 8 - 1}{32} = \\dfrac{11}{32}$.'] }] },
  ],
  quiz: [
    { question: 'Ni $P(A) = 0{,}3$, $P(\\bar{A})$ ye :' },
    { question: 'Ko fila ɲɔgɔnbalaw :', choices: ['tɛ se ka kɛ waati kelen na', 'pirobabilite ye kelen ye', 'ye ɲɔgɔn sɛgɛnninw ye', 'pirobabilite ye 0 ye'] },
    { question: 'Ni wari balansilen filila siɲɛ fila, $P(\\text{pile fila})$ ye :', explanation: 'Bɔli 4 minnu jigiya ye kelen ye : PP, PF, FP, FF.' },
    { question: 'Pirobabilite bɛ se ka kɛ :', explanation: 'A bɛ 0 ni 1 cɛ tuma bɛɛ.' },
  ],
  applications: [
    {
      title: 'Kɛrimɛsi tonbola',
      tagline: 'Biye fila bɛ jigiya fila di tiɲɛ na wa ?',
      situation: 'Lise ka kɛrimɛsi la, biye 500 bɛ feere ani u dɔ 10 ye sɔrɔbagaw ye, minnu bɛ ta gansan. Awa bɛ biye 2 san.',
      model: 'Biye 2 sugandicogo bɛɛ 500 cɛma jigiya ye kelen ye.',
      questions: ['Awa ka sɔrɔ kelen ni kɔ sɔrɔli pirobabilite ye joli ye ?'],
      solution: ['Sɛgɛnnin : a ka biye 2 bɛ tunubaga 490 cɛma : $\\dfrac{C_{490}^2}{C_{500}^2} = \\dfrac{490 \\times 489}{500 \\times 499} \\approx 0{,}9604$.', '$P \\approx 1 - 0{,}9604 = 0{,}0396$, o ye 4 % ɲɔgɔn ye (biye kelen ye 2 % di).'],
    },
  ],
};
