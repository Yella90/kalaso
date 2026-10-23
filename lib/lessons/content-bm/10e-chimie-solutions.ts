import type { LessonText } from '../index';

// Bamanankan — brouillon à faire relire.
export const lesson: LessonText = {
  hook: 'Kɔnɔboli furakɛli ji (SRO) min bɛ denmisɛnw kisi, o ka kan ka labɛn ka ɲɛ : ni a kɔgɔ ka ca, a bɛ ji dɔgɔya farikolo la ka tɛmɛ ; ni a ma se, a tɛ nafa sɔrɔ. Serɔmu, te sukaroma, javɛli ji dilinen : olu bɛɛ ye **sólisiyɔnw** ye, ani u nafa bɛ bɔ u **kɔnsantarasiyɔn** na.',
  objectives: ['ka solite, sɔliwan ani sólisiyɔn dɔn ;', 'ka kɔnsantarasiyɔn mɔlɛri ni kɔnsantarasiyɔn masiki jate ;', 'ka bɔ kelen na ka taa dɔ wɛrɛ la ni mɔli girinya ye ;', 'ka sólisiyɔn labɛn ni yeelen ye ani ni dilini ye.'],
  sections: [
    {
      title: 'Sólisiyɔnw ni kɔnsantarasiyɔnw',
      blocks: [
        { term: 'Sólisiyɔn', text: 'ɲagami min bɛ kɛ kelen ye, a bɛ sɔrɔ ni **solite** (fɛn jalen, ji walima gazi) yeelen ye **sɔliwan** kɔnɔ. Ni sɔliwan ye ji ye, o ye sólisiyɔn **akuze** ye.' },
        { legend: ['$C$ : kɔnsantarasiyɔn mɔlɛri (mol/L) ; $C_m$ : kɔnsantarasiyɔn masiki (g/L) ; $V$ : sólisiyɔn volime (L)'] },
        { text: 'Solite hakɛ dan tɛ min na, o tɛ se ka yeelen : ni a tɛmɛna **solibilite** kan, solite tɛ yeelen tugun, sólisiyɔn **fara** don.' },
      ],
    },
    {
      title: 'Sólisiyɔn labɛncogo',
      blocks: [
        { title: 'Ni yeelen ye', blocks: [{ items: ['girinya min ka kan ka suman, o jate : $m = C \\times V \\times M$ ;', 'solite suman, k’a don fiyɔli jɔzelen kɔnɔ ni ji dɔɔnin ye, k’a lamaga walasa a ka yeelen ;', 'ji fara a kan fo jɔzi taamasiyɛn ma, o kɔ k’a ɲagami ka ɲɛ.'] }] },
        { label: 'Dilini', legend: ['solite hakɛ min tara, o tɛ yɛlɛma : a bɛ jɛnsɛn ji caman kɔnɔ dɔrɔn ; $F$ : dilini faktɔri'] },
        { title: 'ka dilini siɲɛ 10', text: 'An b’a fɛ ka sólisiyɔn mL 100 sɔrɔ 0,020 mol/L la ka bɔ sólisiyɔn 0,20 mol/L la.', steps: ['$V_0 = \\dfrac{0{,}020 \\times 100}{0{,}20} = 10$ mL : an bɛ mL 10 ta ni pipɛti ye, o kɔ k’a dafa fo mL 100 fiyɔli jɔzelen kɔnɔ.'] },
        { wrong: '« Sólisiyɔn L 1 kama, an bɛ solite yeelen ji L 1 kɔnɔ. »', why: 'Volime laban tun bɛna tɛmɛ L 1 kan dɔɔnin : kɔnsantarasiyɔn bɛ jate ni **sólisiyɔn** volime ye.', reflex: 'A yeelen ji dɔgɔman kɔnɔ, o kɔ k’a dafa fo volime min bɛ ɲini.' },
      ],
    },
  ],
  essentials: ['Solite + sɔliwan = sólisiyɔn ; a bɛ fara ni a tɛmɛna solibilite kan.', '$C = \\frac{n}{V}$ (mol/L) ; $C_m = \\frac{m}{V}$ (g/L) ; $C_m = C \\times M$.', 'Dilini : $C_0V_0 = C_1V_1$ ; dilini faktɔri $F = \\frac{C_0}{C_1}$.'],
  exercises: [
    {
      title: 'Ji kɔgɔma sólisiyɔn',
      statement: 'An bɛ sodiyɔmu kolorir g 5,85 yeelen walasa ka sólisiyɔn mL 500 sɔrɔ. $M(\\ce{NaCl}) = 58{,}5$ g/mol.',
      parts: [{ label: 'Kɔnsantarasiyɔn masiki (g/L la).' }, { label: 'Kɔnsantarasiyɔn mɔlɛri (mol/L la).' }],
    },
    {
      title: 'Dilini dɔ',
      statement: 'An bɛ sólisiyɔn 0,200 mol/L mL 10,0 ta k’a dafa fo mL 100,0.',
      parts: [{ label: 'Sólisiyɔn dilinen kɔnsantarasiyɔn (mol/L la).' }, { label: 'Dilini faktɔri.' }],
    },
  ],
  quiz: [
    { question: 'Ji sukaroma kɔnɔ, sukaro ye :', choices: ['solite', 'sɔliwan', 'sólisiyɔn', 'presipite'], explanation: 'Ji ye sɔliwan ye.' },
    { question: 'Kɔnsantarasiyɔn masiki bɛ sɛbɛn :' },
    { question: 'Ni an bɛ sólisiyɔn dilini, solite hakɛ :', choices: ['tɛ yɛlɛma', 'bɛ caya', 'bɛ dɔgɔya', 'bɛ ban'], explanation: 'An bɛ sɔliwan dɔrɔn fara a kan.' },
    { question: 'Walasa ka sólisiyɔn mL 200 labɛn 0,1 mol/L la, a ka kan ni :', choices: ['solite mol 0,02', 'mol 0,1', 'mol 20', 'mol 2'] },
  ],
  applications: [
    {
      title: 'Kɔnɔboli furakɛli ji',
      tagline: 'Kɔnsantarasiyɔn min bɛ ɲɛnamaya kisi',
      situation: 'OMS ka SRO bɛ nin ta litiri kelen kɔnɔ : glikozi g 13,5 ($M = 180$ g/mol) ani sodiyɔmu kolorir g 2,6, kɔgɔ wɛrɛw fara a kan.',
      model: 'An bɛ glikozi kɔnsantarasiyɔn mɔlɛri jate sólisiyɔn L 1,0 kɔnɔ.',
      questions: ['Glikozi kɔnsantarasiyɔn mɔlɛri ye joli ye, mol/L la ?'],
      solution: ['$n = \\dfrac{13{,}5}{180} = 0{,}075$ mol L 1,0 kɔnɔ : $C = 0{,}075$ mol/L.', 'Ji hakɛ min sɛbɛnnen bɛ sashe kan, o ka kan ka bonya : sólisiyɔn min kɔnsantarasiyɔn ka bon kojugu, o tun bɛna kɔnɔboli juguya.'],
      fact: 'K’a ta san 1970 waatiw la, SRO ye denmisɛn miliyɔn caman kisi saya ma diɲɛ kɔnɔ.',
    },
  ],
};
