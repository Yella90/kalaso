// Bamanankan : textes des aventures. BROUILLON À FAIRE RELIRE.
// Seuls les textes sont traduits : nombres, réponses attendues, tolérances et formules
// viennent de la version française (voir lib/adventures/index.ts).

export interface MissionText {
  title: string;
  story: string;
  data?: string[];
  question: string;
  choices?: string[];
  unit?: string;
  hints: string[];
  solution: string[];
  debrief: string;
}

export interface AdventureText {
  title: string;
  pitch: string;
  intro: string;
  outro: string;
  missions: Record<string, MissionText>;
}

export const ADVENTURES_BM: Record<string, AdventureText> = {
  'pompe-solaire': {
    title: 'Nakɔ ka tile pɔmpi',
    pitch: 'Dugu musow bɛ u ka nakɔ ji bɔ ni u bolo ye. Pɔmpi dɔ sigi min bɛ baara kɛ ni tile ye.',
    intro:
      'Segu mara dugu dɔ kɔnɔ, musow ka jɛkulu bɛ nakɔ belebele dɔ sɛnɛ. Don o don, u bɛ ji bɔ kɔlɔn kɔnɔ ni juru ye, seli kelen-kelen. U ye kuran pɔmpi dɔ ni tile panɛw san ni u ka sɛnɛfɛnw wari ye. Sisan, a ka kan ka sigi ka ɲɛ.',
    missions: {
      montage: {
        title: 'Ɛntɛrupitɛri siri',
        story: 'Aminata b’a fɛ ka se ka pɔmpi mana ani k’a faga ni ɛntɛrupitɛri ye. A ma a dɔn a ka kan ka a bila kuran sira yɔrɔ min na.',
        question: 'Ɛntɛrupitɛri ka kan ka bila cogo di walasa a ka pɔmpi ɲɛminɛ ?',
        choices: ['pɔmpi kɛrɛfɛ (dérivation)', 'pɔmpi nɔfɛ, sira kelen kan (série)', 'yɔrɔ o yɔrɔ, o tɛ fɛn yɛlɛma', 'kuran sira kɛrɛfɛ, k’a siri'],
        hints: ['Ni ɛntɛrupitɛri dayɛlɛlen don, a ka kan ka kuran tigɛ pɔmpi kɔnɔ.'],
        solution: [
          'Sira kelen kan (série) : ni ɛntɛrupitɛri dayɛlɛlen don, kuran sira tigɛra, pɔmpi bɛ jɔ.',
          'Ni a bilala pɔmpi kɛrɛfɛ, a datuguli bɛna kuran kunsurun (court-circuit) dɔ kɛ : pɔmpi bɛ jɔ, nka siraw bɛ funteni kosɛbɛ, o ye farati ye.',
        ],
        debrief: 'Ɛntɛrupitɛri bilara pɔmpi nɔfɛ, sanji tɛ se ka se a ma boyiti dɔ kɔnɔ.',
      },
      'puissance-panneau': {
        title: 'Panɛ kelen ka puwisansi',
        story: 'Tile kɔrɔ, Aminata bɛ panɛ kelen ka tansiyɔn ni a ka ɛntansite sumani.',
        data: ['Tansiyɔn : $U = 18$ V', 'Ɛntansite : $I = 5$ A'],
        question: 'Panɛ kelen bɛ kuran puwisansi joli di ?',
        hints: ['$P = U \\times I$'],
        solution: ['$P = 18 \\times 5 = 90$ W.'],
        debrief: 'Panɛ kelen-kelen bɛɛ bɛ 90 W di tile kɔrɔ. Sɔgɔma ni wula fɛ, a bɛ dɔgɔya.',
      },
      'nombre-panneaux': {
        title: 'Panɛ joli ?',
        story: 'Pɔmpi ka plaki b’a jira ko a bɛ 240 W ta.',
        data: ['Pɔmpi ka puwisansi : 240 W', 'Panɛ kelen ka puwisansi : 90 W'],
        question: 'Panɛ joli de ka kan a dɔgɔmanba la ?',
        unit: 'panɛ',
        hints: ['Pɔmpi ka puwisansi tila panɛ kelen ta la, ka a kunbɔ ka taa jateden dafalen sanfɛla la.'],
        solution: ['$\\dfrac{240}{90} \\approx 2{,}67$. Panɛ fila tɛ se : panɛ **3** de ka kan.'],
        debrief: 'Ni panɛ 3 ye, o kɛra 270 W ye, pɔmpi bɛ se ka baara kɛ hali ni sankaba dɔɔnin tɛmɛna.',
      },
      cable: {
        title: 'Juru jan',
        story:
          'Panɛw bɛ so dɔ sanfɛ, kɔlɔn ni u cɛ ye mɛtɛrɛ 40 ye. Juru ka rezisitansi ye 0,5 Ω ye. Pɔmpi bɛ baara kɛ ni 24 V ye ka 240 W ta : ɛntansite ye 10 A ye. Ni kuran bɛ tɛmɛ juru kɔnɔ, tansiyɔn dɔ bɛ tunun juru kɔnɔ.',
        data: ['Juru ka rezisitansi : $R = 0{,}5\\ \\Omega$', 'Kuran ɛntansite : $I = 10$ A'],
        question: 'Tansiyɔn joli bɛ tunun juru kɔnɔ ?',
        hints: ['Ohm ka sariya : $U = R \\times I$.'],
        solution: ['$U = 0{,}5 \\times 10 = 5$ V.', 'O ka ca : ni juru ka bon, a ka rezisitansi ni tununni bɛ dɔgɔya.'],
        debrief: 'Musow bɛ juru bonba dɔ sugandi walasa tile fanga kana tunun.',
      },
      energie: {
        title: 'Don kelen ka fanga',
        story: 'Pɔmpi bɛ baara kɛ lɛri 4 don o don, tile ka bon waati min na.',
        data: ['Pɔmpi ka puwisansi : 240 W', 'Waati : lɛri 4 don o don'],
        question: 'Pɔmpi bɛ fanga joli ta don kelen kɔnɔ, kilowatiɛri (kWh) la ?',
        hints: ['$E = P \\times t$, ni $P$ ye kW ye ani $t$ ye lɛri ye.'],
        solution: ['$E = 0{,}240 \\times 4 = 0{,}96$ kWh don o don.'],
        debrief: 'Nin fanga ye fu ye : a bɛ bɔ tile de la. Ni kuran masini (groupe électrogène) don, carburant ka kan ka san don o don.',
      },
      arrosage: {
        title: 'Ji bɛ se nakɔ ma wa ?',
        story: 'Pɔmpi bɛ ji 1,5 m³ bɔ lɛri kelen kɔnɔ. Nakɔ bonya ye 1 000 m² ye, mɛtɛrɛ kare kelen-kelen bɛɛ mago bɛ ji litiri 5 la don o don.',
        data: ['Ji bɔhakɛ : 1,5 m³ lɛri kelen kɔnɔ, lɛri 4', '1 m³ = 1 000 L', 'Mago : litiri 5 m² kelen o kelen na, 1 000 m² kan'],
        question: 'Pɔmpi bɛ ji litiri joli bɔ don o don ?',
        hints: ['Ji hakɛ = ji bɔhakɛ × waati, o kɔ m³ yɛlɛma litiri ye.'],
        solution: ['$1{,}5 \\times 4 = 6$ m³, o ye litiri 6 000 ye.', 'Nakɔ mago bɛ litiri $5 \\times 1\\,000 = 5\\,000$ la : pɔmpi bɛ se, litiri 1 000 bɛ to.'],
        debrief: 'Ji tɔ bɛ bila daga belebele dɔ kɔnɔ sankaba donw kosɔn.',
      },
    },
    outro:
      'Seliw banna ! Tile de bɛ nakɔ jiji sisan don o don. Musow ye u ka nakɔ yɔrɔw caya. Kuran sira, tansiyɔn, ɛntansite, puwisansi, Ohm ka sariya ani fanga : i ye min kalan 8nan ni 9nan kɔnɔ, o bɛɛ nafa sɔrɔla.',
  },

  'champ-cooperative': {
    title: 'Jɛkulu ka foro',
    pitch: 'Kucala kamalenw ka jɛkulu bɛ a ka sɛnɛ san fɔlɔ daminɛ. Fɛn bɛɛ ka kan ka jate, foro ka se sannifeere ma.',
    intro:
      'Fatumata ye Kucala sɛnɛkɛla kamalenw ka jɛkulu ɲɛmɔgɔ ye. Dugutigi ye foro dɔ di u ma nin san in kɔnɔ. A bɛ sɛnɛ kɛ ka ɲɛ, nka a b’a fɛ i ka jatebɔw kɛ : foro sumani, si san, tirakitɛri sara, nakɔ lamini ani suman bilan.',
    missions: {
      diagonale: {
        title: 'Foro sumani',
        story: 'Foro ye rɛkitangili ye. Walasa ka juru sigi min bɛna danni ɲɛminɛ, Fatumata b’a fɛ ka diyagonali janya dɔn.',
        data: ['Janya : 120 m', 'Bonya : 50 m'],
        question: 'Foro ka diyagonali janya ye joli ye ?',
        hints: ['Diyagonali ye triyangili kɛrɛnkɛrɛnnen dɔ ka ipotenizi ye.'],
        solution: ['$d^2 = 120^2 + 50^2 = 14\\,400 + 2\\,500 = 16\\,900$, o la $d = \\sqrt{16\\,900} = 130$ m.'],
        debrief: 'Foro kɔnɔ ladili : triyangili min kɛrɛw ye 5, 12 ani 13 ye (i n’a fɔ 50, 120, 130), o bɛ angili tilennen di tuma bɛɛ. O de bɛ foro nɔgɔw dilan ka ɲɛ.',
      },
      semences: {
        title: 'Si san',
        story: 'CMDT ka tekinisiyɛn ye a fɔ ko kɔori si kilo 25 ka kan ɛkitari kelen na.',
        data: ['Foro 120 m ni 50 m', '1 ɛkitari = 10 000 m²', 'Hakɛ : kilo 25 ɛkitari kelen na'],
        question: 'Si kilo joli ka kan ka san ?',
        hints: ['Foro bonya jate m² la, o kɔ a yɛlɛma ɛkitari ye.'],
        solution: ['Bonya : $120 \\times 50 = 6\\,000$ m², o ye 0,6 ha ye.', 'Si : $0{,}6 \\times 25 = 15$ kg.'],
        debrief: 'Fatumata bɛ si kilo 15 san, a si tɛ tiɲɛ.',
      },
      tracteur: {
        title: 'Tirakitɛri sara',
        story:
          'Mɔgɔ fila bɛ tirakitɛri di foro sɛnɛ kama. Fɔlɔ bɛ sira sara (forfait) ta, o kɔ lɛri kelen-kelen sara. Filanan tɛ forfait ta, nka a ka lɛri sɔngɔ ka gɛlɛn.',
        data: ['A sugandili : forfait 15 000 FCFA + 5 000 FCFA lɛri kelen o kelen', 'B sugandili : 8 000 FCFA lɛri kelen o kelen'],
        question: 'Sɛnɛ lɛri joli de kɔnɔ sugandili fila sɔngɔ bɛ kɛ kelen ye ?',
        unit: 'lɛri',
        hints: ['Sugandili kelen-kelen bɛɛ sɔngɔ sɛbɛn lɛri hakɛ $x$ fɛ : $A(x)$ ani $B(x)$.', '$A(x) = B(x)$ ɲɛnabɔ.'],
        solution: [
          '$A(x) = 15\\,000 + 5\\,000x$ ani $B(x) = 8\\,000x$.',
          '$15\\,000 + 5\\,000x = 8\\,000x \\iff 3\\,000x = 15\\,000 \\iff x = 5$ lɛri.',
          'Ni a tɛmɛna lɛri 5 kan, A sɔngɔ ka nɔgɔ. Sɛnɛ bɛna lɛri 7 ta : jɛkulu bɛ A sugandi.',
        ],
        debrief: 'Lɛri 7 kɔnɔ, A bɛ 50 000 FCFA ta ani B bɛ 56 000 FCFA ta : 6 000 FCFA marala.',
      },
      cloture: {
        title: 'Nakɔ lamini',
        story:
          'Marigo da la, jɛkulu b’a fɛ ka nakɔ rɛkitangili dɔ dilan, ba kana se ka don a kɔnɔ. Marigo da fan fɛ, sɛgɛ mago tɛ yen. Sɛgɛ mɛtɛrɛ 200 de bɛ yen.',
        data: ['Sɛgɛ min bɛ yen : 200 m', 'Nakɔ kɛrɛ fila ye $x$ ye, kɛrɛ kelen ye $200 - 2x$ ye'],
        question: 'Nakɔ bonya ka bon ka tɛmɛ joli kan ?',
        hints: ['Bonya ye $A(x) = x(200 - 2x)$ ye.', '$A(x)$ sɛbɛn a kanɔniki cogo la : $A(x) = -2(x - 50)^2 + \\ldots$'],
        solution: [
          '$A(x) = 200x - 2x^2 = -2(x^2 - 100x) = -2(x - 50)^2 + 5\\,000$.',
          'Kare dɔ tɛ dɔgɔya fu ma : $A(x) \\le 5\\,000$, a bɛ kɛ kelen ye ni $x = 50$ m ye.',
          'Nakɔ ye 50 m ni 100 m ye, a bonya ye 5 000 m² ye.',
        ],
        debrief: 'Ni sɛgɛ kelen in kɛra nakɔ kare ye min kɛrɛ ye 66 m ye, a bonya tun bɛna kɛ 4 440 m² ɲɔgɔn ye. Kanɔniki cogo ye m² 500 ni kɔ fara a kan.',
      },
      vente: {
        title: 'Sannifeere',
        story:
          'Sɛnɛ san laban na, jɛkulu ye suman tɔni 3 feere, kɔori ni bɛnɛ, ka 1 050 000 FCFA sɔrɔ. Fatumata ye a kɛcogo tunun, nka sɔngɔw bɛ a hakili la.',
        data: ['Kɔori : 300 FCFA kilo', 'Bɛnɛ : 450 FCFA kilo', 'Bɛɛ lajɛlen : kilo 3 000, 1 050 000 FCFA'],
        question: 'Bɛnɛ kilo joli feerela ?',
        hints: ['Kɔori girinya weele $x$, bɛnɛ ta weele $y$ ; ekuwasiyɔn fila sɛbɛn.'],
        solution: [
          '$x + y = 3\\,000$ ani $300x + 450y = 1\\,050\\,000$.',
          'Ni $x = 3\\,000 - y$ : $900\\,000 - 300y + 450y = 1\\,050\\,000$, o la $150y = 150\\,000$ ani $y = 1\\,000$ kg.',
          'Jɛkulu ye bɛnɛ kilo 1 000 ani kɔori kilo 2 000 feere.',
        ],
        debrief: 'Bɛnɛ kilo sɔngɔ ka gɛlɛn : jɛkulu bɛ miiri k’a yɔrɔ bonya san nata.',
      },
      bilan: {
        title: 'Foro yɔrɔw bilan',
        story: 'Jɛkulu ka lajɛba kama, Fatumata bɛ jɛkulu ka foro yɔrɔ 5 suman jira.',
        data: ['Foro yɔrɔw suman (kilo) : 1 200 ; 950 ; 1 100 ; 1 300 ; 1 450'],
        question: 'Foro yɔrɔ kelen suman cɛmancɛ ye joli ye ?',
        hints: ['Cɛmancɛ = jatedenw faralen ÷ jateden hakɛ.'],
        solution: ['Faralen : $1\\,200 + 950 + 1\\,100 + 1\\,300 + 1\\,450 = 6\\,000$ kg.', 'Cɛmancɛ : $\\dfrac{6\\,000}{5} = 1\\,200$ kg. Mediyan fana ye 1 200 kg ye.'],
        debrief: 'Foro yɔrɔ min sumanna kilo 950, o ka jan cɛmancɛ la : san nata, a dugukolo ni a jiji bɛna lajɛ.',
      },
    },
    outro:
      'Jɛkulu ka sɛnɛ san fɔlɔ ɲɛna. Pitagɔri ka foro sumani, bɛnnɛnya ka si hakɛ, fonksiyɔn afiniw ka tirakitɛri, kanɔniki cogo ka nakɔ, sisitɛmu ka sannifeere ani statistikiw ka bilan : jatebɔ nafa sɔrɔla yɔrɔ bɛɛ la.',
  },

  'enquete-paludisme': {
    title: 'Sumaya bana ɲininiw Mopti',
    pitch: 'Samiya o samiya, sumaya bɛ ba kɔnɔ dugu caman minɛ. Kɛnɛya jɛkulu dɛmɛ ka ɲinini kɛ.',
    intro:
      'Dɔgɔtɔrɔ Kulubali ye Mopti kɛrɛfɛ, Jɔliba ba kɔnɔ dugu dɔ ka kɛnɛyaso ɲɛmɔgɔ ye. Samiya o samiya, sumaya banabagatɔw bɛ caya. A bɛ banakunbɛn baara dɔ labɛn, a ye i bila a ka jɛkulu la : bana faamuyali, banabagatɔw jatebɔ, farikolo ka lafasali ɲɛfɔ ani fɛɛrɛw jira.',
    missions: {
      transmission: {
        title: 'Jɔn de bɛ bana lase ?',
        story: 'Sumaya bɛ bɔ banakisɛ dɔ la min tɔgɔ ye Plasmodiyɔmu ye. A bɛ bɔ banabagatɔ la ka taa mɔgɔ kɛnɛman na sɔgɔli fɛ.',
        question: 'Jɔn de bɛ Plasmodiyɔmu bɔ mɔgɔ dɔ la ka taa n’a ye mɔgɔ wɛrɛ la ?',
        choices: ['so dimɔgɔ', 'sɔsɔ anofɛli muso', 'sɔsɔ anofɛli cɛ', 'kɔlɔn ji nɔgɔlen'],
        hints: ['Sɔsɔ minnu bɛ joli min, olu dɔrɔn de bɛ se ka banakisɛ lase.'],
        solution: [
          'Anofɛli **muso** de don : a bɛ mɔgɔ cin walasa ka joli sɔrɔ a ka fanw kama. Cɛ bɛ jiri ji min, a tɛ mɔgɔ cin.',
        ],
        debrief: 'Anofɛliw bɛ fanw da ji jɔlenw kɔnɔ : samiya dalaw ni malo forow ye u bangeyɔrɔw ye.',
      },
      compter: {
        title: 'Banabagatɔw jatebɔ',
        story: 'Samiya laban kɔnɔ, kɛnɛyaso ye sumaya banabagatɔ 360 sɛbɛn dugu kɔnɔ.',
        data: ['Dugudenw : 2 400', 'Banabagatɔw : 360'],
        question: 'Dugudenw kɛmɛ o kɛmɛ, mɔgɔ joli de ye sumaya sɔrɔ (pourcentage) ?',
        unit: '%',
        hints: ['Pourcentage = (banabagatɔw ÷ dugudenw) × 100.'],
        solution: ['$\\dfrac{360}{2\\,400} \\times 100 = 15$ % : mɔgɔ 7 o 7, kelen ni kɔ.'],
        debrief: 'Dɔgɔtɔrɔ Kulubali b’a jira ko banabagatɔw tilancɛ ye denmisɛn ye minnu san ma se 5 ma.',
      },
      multiplication: {
        title: 'Banakisɛ joli kɔnɔ',
        story:
          'Joli kɔnɔ, Plasmodiyɔmu bɛ don joli kisɛ bilen dɔ kɔnɔ ka caya yen. Lɛri 48 kɔfɛ, kisɛ bɛ fara ka banakisɛ kura 16 bɔ, olu kelen-kelen bɛɛ bɛ don joli kisɛ bilen kura dɔ kɔnɔ. O waati de la, banabagatɔ bɛ funteni kosɛbɛ.',
        data: ['Munumunu kelen bɛ lɛri 48 ta', 'Kisɛ minɛnen kelen-kelen bɛɛ bɛ banakisɛ 16 bɔ', 'Daminɛ na : kisɛ minɛnen 1'],
        question: 'Munumunu 3 kɔfɛ (don 6), joli kisɛ bilen joli de minɛna ?',
        unit: '',
        hints: ['Munumunu kelen-kelen bɛɛ, kisɛ minɛnenw hakɛ bɛ sigiyɔrɔ 16 na.'],
        solution: ['$16 \\times 16 \\times 16 = 16^3 = 4\\,096$ kisɛ minɛnenw.', 'O ye zewometiriki cayali ye : o de kosɔn a ka kan ka furakɛ joona.'],
        debrief: 'Funteni min bɛ segin tile fila o tile fila, o bɛ bɛn joli kisɛ bilenw farali ma munumunu kelen-kelen bɛɛ la.',
      },
      anticorps: {
        title: 'Farikolo ka lafasali',
        story:
          'Dugu kɔnɔ cɛkɔrɔba minnu ye sumaya sɔrɔ siɲɛ caman, olu ka bana tɛ gɛlɛya kosɛbɛ. U farikolo ka lafasali ye banakisɛ dɔnni kalan, a bɛ antikɔriw dilan a kama.',
        question: 'Kisɛ jumɛnw de bɛ antikɔriw dilan ?',
        choices: ['joli kisɛ bilenw', 'pilakɛtiw', 'pilasimositiw, minnu bɔra B lenfositiw la', 'T lenfositi sitotɔkisikiw'],
        hints: ['Antikɔriw ye molekiliw ye minnu bɛ bila joli kɔnɔ kisɛ dɔw fɛ, minnu bɔra lenfositiw la.'],
        solution: [
          'B lenfositi minnu bɛ banakisɛ dɔn, olu bɛ caya ka yɛlɛma **pilasimositiw** ye, minnu bɛ antikɔriw bɔ.',
          'T lenfositi sitotɔkisikiw ta ye ka kisɛ minɛnenw faga u yɛrɛ ma.',
        ],
        debrief: 'Nin lafasali bɛ dilan dɔɔni dɔɔni : o de kosɔn denmisɛnw, minnu tɛ a sɔrɔ fɔlɔ, olu de ka farati ka bon.',
      },
      drepanocytose: {
        title: 'Lafasali min bɛ sɔrɔ bangebagaw fɛ',
        story:
          'Dugu kɔnɔ denbaya dɔ bɛ drepanositozi zɛni ta. « AS » mɔgɔw (zɛni ɲuman A kelen ni zɛni S kelen) kɛnɛyalen don, sumaya gɛlɛn tɛ u minɛ kosɛbɛ. « SS » mɔgɔw bɛ drepanositozi bana na. Bangebaga fila bɛɛ ye AS ye.',
        question: 'Probabilite joli bɛ yen u den dɔ ka kɛ AS ye ?',
        unit: '%',
        hints: ['Bangebaga kelen-kelen bɛɛ bɛ A walima S di cogo kelen na. Jaa dɔ dilan (échiquier de croisement).'],
        solution: [
          'Bangebaga kelen-kelen bɛɛ ka gameti : A (1/2) ani S (1/2).',
          'Den minnu bɛ se ka sɔrɔ : AA (1/4), AS (1/4 + 1/4 = 1/2), SS (1/4).',
          'Ka kɛ AS ye : 1/2, o ye 50 % ye. Ka kɛ SS ye : 25 %.',
        ],
        debrief: 'Dɔgɔtɔrɔ bɛ furu ɲinibagaw ladi ka emoglobini ka elɛkitɔroforɛzi kɛ walasa ka u ka zɛniw dɔn sani furu.',
      },
      vaccin: {
        title: 'Bolomafara kanpaɲi',
        story:
          'Sumaya bolomafara dɔ bɛ kɛ denmisɛnw na sisan. Afiriki kɔnɔ kɔrɔbɔli fɔlɔw la, a ye banabagatɔw dɔgɔya 30 % ɲɔgɔn. Dɔgɔtɔrɔ b’a fɛ ka samiya nata labɛn.',
        data: ['Samiya laban banabagatɔw : 360', 'Dɔgɔyali min makɔnɔna : 30 %'],
        question: 'Ni banabagatɔw dɔgɔyara 30 %, banabagatɔ joli bɛ makɔnɔ ?',
        unit: 'banabagatɔ',
        hints: ['Ka dɔgɔya 30 %, o ye ka 70 % to ye.'],
        solution: ['$360 \\times (1 - 0{,}30) = 360 \\times 0{,}70 = 252$ banabagatɔ.'],
        debrief: 'Ni bolomafara farala sɔsɔnɛgɛn fura bɔnnenw ni banabagatɔw furakɛli joona kan, banabagatɔw bɛ se ka dɔgɔya ka tɛmɛ o kan.',
      },
    },
    outro:
      'Kanpaɲi daminɛna : sɔsɔnɛgɛnw, denmisɛnw bolomafara, so lamini dalaw jalili, drepanositozi kɔrɔbɔliw. I ye bana lasecogo, selili, farikolo ka lafasali, bangekolo dɔnniya ani jatebɔ dɔɔnin nafa sɔrɔ. Biyolozi bɛ mɔgɔw ka ɲɛnamaya kisi.',
  },

  'eau-du-puits': {
    title: 'Kɔlɔn ji kɛli ji minta ye',
    pitch: 'Kati kɛrɛfɛ dugu dɔ kɔnɔ, denmisɛnw kɔnɔ bɛ dimi tuma caman. Yala kɔlɔn ji de kosɔn wa ?',
    intro:
      'Kɛnɛyaso la, dɔgɔtɔrɔmuso Awa y’a kɔlɔsi ko dugu denmisɛn caman kɔnɔ bɛ dimi. Dugu bɛ kɔlɔn dɔ ji min, min sɔgɔlen bɛ forow kɛrɛfɛ. Awa ye ji dɔɔnin ci Bamakɔ laburatuwari la ka a lajɛ, a b’a fɛ i k’a dɛmɛ ka jaabiw faamu, o kɔ ka ji furakɛ.',
    missions: {
      ions: {
        title: 'Laburatuwari ka sɛgɛsɛgɛli kalan',
        story:
          'Laburatuwari ye iyɔn kalisiyɔmu, maɲeziyɔmu, idrozenokaribɔnati ani nitirati sɔrɔ ji kɔnɔ. Nitiratiw bɛ bɔ forow nɔgɔw de la tuma caman. Ni u cayara, u ye farati ye denyɛrɛninw ma.',
        question: 'Iyɔn nitirati sɛbɛncogo ye jumɛn ye ?',
        hints: ['O ye iyɔn atɔmu caman ye min ye negatifu ye : azɔti atɔmu kelen ni ɔkisizɛni atɔmu saba.'],
        solution: ['Iyɔn nitirati ye $\\ce{NO3-}$ ye. $\\ce{NH4+}$ ye iyɔn amɔniyɔmu ye, $\\ce{NO2}$ ye molekili ye, a tɛ iyɔn ye.'],
        debrief: 'Forow nɔgɔ « NPK » ni ire (urée) bɛ se ka yɛlɛma nitiratiw ye minnu bɛ jigin fo ka se dugukolo jukɔrɔ ji ma.',
      },
      concentration: {
        title: 'Nitirati joli bɛ ji kɔnɔ ?',
        story: 'Laburatuwari bɛ girinya kɔnsantirasiyɔn di. Walasa k’a sanga sɛgɛsɛgɛli wɛrɛw ma, Awa b’a fɛ ka mɔli kɔnsantirasiyɔn sɔrɔ.',
        data: ['Nitiratiw ka girinya kɔnsantirasiyɔn : 62 mg/L', '$M(\\ce{N}) = 14$ g/mol ; $M(\\ce{O}) = 16$ g/mol'],
        question: 'Iyɔn nitirati ka mɔli kɔnsantirasiyɔn ye joli ye, milimɔli litiri kelen kɔnɔ ?',
        hints: ['Fɔlɔ, $\\ce{NO3-}$ ka mɔli girinya jate.', '$C = \\dfrac{C_m}{M}$, ni $C_m$ ye g/L ye.'],
        solution: ['$M(\\ce{NO3-}) = 14 + 3 \\times 16 = 62$ g/mol.', '$C = \\dfrac{0{,}062}{62} = 1{,}0 \\times 10^{-3}$ mol/L, o ye 1,0 mmol/L ye.'],
        debrief: 'Ji minta ka kan kana nitirati mg 50 tɛmɛ litiri kelen kɔnɔ. Ni a ye 62 mg/L ye, kɔlɔn ji tɛmɛna o dan kan.',
      },
      dilution: {
        title: 'A ɲagami ni sanji ye',
        story:
          'Samiya la, dugu bɛ so kunw sanji mara daga belebelew kɔnɔ. Nitirati tɛ o ji kɔnɔ kosɛbɛ. Ni a ɲagamina kɔlɔn ji la, a bɛ se ka jigin dan kɔrɔ.',
        data: ['Kɔlɔn ji : nitirati 62 mg/L', 'Dan min ka kan ka sɔrɔ : 50 mg/L', 'Kɔlɔn ji hakɛ : 1 L'],
        question: 'Sanji joli de ka kan ka fara kɔlɔn ji litiri 1 kan a dɔgɔmanba la ?',
        hints: ['Dilisiyɔn waati, nitiratiw girinya tɛ yɛlɛma : $C_1 V_1 = C_2 V_2$.'],
        solution: ['$V_2 = \\dfrac{C_1 V_1}{C_2} = \\dfrac{62 \\times 1}{50} = 1{,}24$ L.', 'A ka kan ka $1{,}24 - 1 = 0{,}24$ L fara a kan, o ye sanji mL 240 ye kɔlɔn ji litiri kelen o kelen na.'],
        debrief: 'Kɔlɔn ji seli 4 ni sanji seli 1 ɲagamini bɛ se, ni a tɔ dɔɔnin ye.',
      },
      chlore: {
        title: 'Daga ji furakɛli',
        story:
          'Kɔnɔdimiw bɛ bɔ banakisɛw fana na. Kɛnɛyaso bɛ kilɔri ji di walasa ka dagaw ji furakɛ. A ka kan ka bila ka se banakisɛw faga ma, nka a kana caya fo ji tɛ se ka min.',
        data: ['Daga ji hakɛ : 20 L', 'Hakɛ ladilen : kilɔri mg 0,5 litiri kelen o kelen na', 'Kɛnɛyaso ka ji : kilɔri g 5 litiri kelen kɔnɔ'],
        question: 'Kilɔri ji joli de ka kan ka bɔn daga kɔnɔ ?',
        hints: ['Kilɔri girinya min ka kan litiri 20 ma, o jate, o kɔ ji hakɛ min bɛ o kilɔri hakɛ kɔnɔ.'],
        solution: ['Kilɔri girinya : $20 \\times 0{,}5 = 10$ mg, o ye 0,010 g ye.', 'Ji hakɛ : $V = \\dfrac{0{,}010}{5} = 0{,}002$ L, o ye mL 2 ye : a ɲɔgɔn ye toni 40 ye.'],
        debrief: 'Awa bɛ a fɔ denbayaw ye ko u ka miniti 30 makɔnɔ kilɔri bilali kɔfɛ sani u ka ji min.',
      },
      ph: {
        title: 'pH sumani',
        story: 'pH papiye min sunɔgɔra kɔlɔn ji la, o b’a jira ko pH ye 6,5 ye. Ji minta pH ka kan ka kɛ 6,5 ni 8,5 cɛ.',
        question: 'Ni pH ye 6,5 ye, kɔlɔn ji ye :',
        choices: ['asidi barikama', 'asidi dɔɔnin', 'nɛtiri', 'baz'],
        hints: ['25 °C la, ji ɲagaminen ye nɛtiri ye ni a ka pH ye 7 ye.'],
        solution: ['pH ka dɔgɔ dɔɔnin ni 7 ye : ji ye asidi dɔɔnin ye. A bɛ dan kan min bɛ sɔn minni ma.'],
        debrief: 'Ji min ye asidi barikama ye, o bɛ se ka nɛgɛ tiyow tiɲɛ. Yan, a ka ɲi ka pH lajɛ wagati o wagati.',
      },
      tartre: {
        title: 'Fɛn jɛman min bɛ to bulɔwari kɔnɔ',
        story:
          'Denbaya minnu bɛ ji tobi, olu bɛ fɛn jɛman dɔ ye bulɔwari kɔnɔ : kalikɛri don. Ni ji kalayara, iyɔn kalisiyɔmu ni idrozenokaribɔnati bɛ reaksiyɔn kɛ.',
        data: [
          'Ekuwasiyɔn : $\\ce{Ca^{2+} + 2HCO3- -> CaCO3 + CO2 + H2O}$',
          'Iyɔn kalisiyɔmu kɔnsantirasiyɔn : 2,0 mmol/L',
          'Ji tobilen hakɛ : 10 L',
          '$M(\\ce{CaCO3}) = 100$ g/mol',
        ],
        question: 'Ni iyɔn kalisiyɔmu bɛɛ ye reaksiyɔn kɛ, kalikɛri girinya joli bɛ to ?',
        hints: ['Ekuwasiyɔn kɔnɔ, iyɔn $\\ce{Ca^{2+}}$ mɔli 1 bɛ $\\ce{CaCO3}$ mɔli 1 di.'],
        solution: ['$n(\\ce{Ca^{2+}}) = 2{,}0 \\times 10^{-3} \\times 10 = 0{,}020$ mol.', '$n(\\ce{CaCO3}) = 0{,}020$ mol, o la $m = 0{,}020 \\times 100 = 2{,}0$ g.'],
        debrief: 'Nin kalikɛri tɛ kɛnɛya tiɲɛ, nka a bɛ bulɔwariw tiɲɛ. Winɛgiri dɔɔnin bɛ a yeli.',
      },
    },
    outro:
      'I ka baara kosɔn, dugu bɛ kɔlɔn ji ni sanji ɲagami, ka dagaw ji furakɛ. Kalo saba kɔfɛ, Awa bɛ denmisɛn banabagatɔw jate, u dɔgɔyara siɲɛ fila. Iyɔnw, mɔli, kɔnsantirasiyɔn, dilisiyɔn, pH ani ekuwasiyɔn-bilan : 10nan simi ye dugu bɛɛ lafasa.',
  },

  'moto-electrique': {
    title: 'Kuran moto dɔ dilan',
    pitch: 'Bamakɔ atoliye dɔ b’a fɛ ka kuran motow kɛ a ka ɛsansi motow nɔ na. Ɛnzeniyɛri ye i ye.',
    intro:
      'Musa bɛ motow dilan Bamakɔ, Medina Kura. Ɛsansi sɔngɔ bɛ yɛlɛ don o don, sisi bɛ sira fa. Hakilina dɔ donna a la : ka kuran moto dɔ dilan, min bɛ fa ni atoliye ka tile panɛw ye. Minɛnw ni yɔrɔw bɛ a bolo, nka a mago bɛ mɔgɔ la min bɛ jatebɔw kɛ. Baara kelen-kelen bɛɛ ye dilanni sira dakɛda dɔ ye. Gɛlɛya ɲɛnabɔ walasa ka tɛmɛ dakɛda nata ma.',
    missions: {
      'cahier-des-charges': {
        title: 'Moto ka ko ɲinilenw',
        story:
          'Sani a ka yɔrɔw sugandi, Musa b’a fɛ ka fanga dɔn min ka kan ka di moto ma walasa a ka taa. A ka kan ka taa 45 km/h dugu kɔnɔ, a bolibaga sigilen b’a kan.',
        data: ['Moto ni a bolibaga girinya : $m = 150$ kg', 'Teliya ɲininen : $v = 45$ km/h'],
        question: 'Moto ka lamagali fanga (énergie cinétique) ye joli ye ni a bɛ taa 45 km/h ?',
        hints: ['Fɔlɔ teliya yɛlɛma m/s ye : a tila 3,6 la.', '$E_c = \\dfrac{1}{2} m v^2$'],
        solution: ['$v = \\dfrac{45}{3{,}6} = 12{,}5$ m/s.', '$E_c = \\dfrac{1}{2} \\times 150 \\times 12{,}5^2 = 11\\,719$ J, o ye 11,7 kJ ɲɔgɔn ye.'],
        debrief: 'O ye fanga ye motɛri ka kan ka min di moto taali o taali. Kuran yeelen bilen na, o bɛ tunun funteni ye firɛnw kɔnɔ : a to i hakili la, sira dɔ don kɔfɛ.',
      },
      puissance: {
        title: 'Motɛri ka puwisansi',
        story:
          'Ni moto taara, a ka kan ka to a ka teliya la. Sira ni fiɲɛ bɛ a sama kɔ. Motɛri ka kan ka o fanga kelen in ɲɔgɔn di.',
        data: ['Fanga min bɛ moto sama kɔ 45 km/h la : $F = 80$ N', 'Teliya : $v = 12{,}5$ m/s'],
        question: 'Motɛri ka kan ka puwisansi joli di walasa ka taa teliya kelen na ?',
        hints: ['Fanga min bɛ taa lamagali fan fɛ, o ka puwisansi ye $P = F \\times v$ ye.'],
        solution: ['$P = F \\times v = 80 \\times 12{,}5 = 1\\,000$ W, o ye 1 kW ye.'],
        debrief: 'Musa bɛ motɛri 1 kW ci. Sisan a ka kan ka faamu a bɛ a ka fanga sɔrɔ cogo min na.',
      },
      moteur: {
        title: 'Kuran motɛri',
        story:
          'Motɛri kɔnɔ, juru minnu kɔnɔ kuran bɛ tɛmɛ, olu bilalen don magaɲɛtiw ka foro kɔnɔ. Juru kelen-kelen bɛɛ bɛ Laplasi ka fanga sɔrɔ, o fangaw bɛɛ bɛ rotɔri munumunu.',
        data: [
          'Magaɲɛtiw ka foro : $B = 0{,}5$ T',
          'Ɛntansite juru kelen-kelen bɛɛ kɔnɔ : $I = 40$ A',
          'Juru kelen ka janya min bɛ baara kɛ : $L = 0{,}20$ m',
          'Juru minnu bɛ baara kɛ : 50',
          'Rotɔri ka rayɔn : $r = 0{,}04$ m',
        ],
        question: 'Motɛri bɛ kupuli (mɔmani) joli di ?',
        hints: ['Juru kelen min bɛ foro kɔrɔ tilennen na, o ka fanga : $F = B \\times I \\times L$.', 'Juru 50 ka fangaw fara ɲɔgɔn kan, o kɔ a sigi rotɔri ka rayɔn na.'],
        solution: ['Juru kelen : $F_1 = 0{,}5 \\times 40 \\times 0{,}20 = 4$ N.', 'Juru 50 : $F = 50 \\times 4 = 200$ N.', 'Kupuli : $\\mathcal{M} = F \\times r = 200 \\times 0{,}04 = 8$ N·m.'],
        debrief: 'Motɛri bɛ munumunu ni kupuli 8 N·m ye. Nka yala o bɛ se ka moto taa wa ?',
      },
      transmission: {
        title: 'Fanga bilacogo (transmission)',
        story:
          'Motɛri bɛ kɔfɛ sen munumunu ni ɛnsɛni ni pinɲɔn fila ye. Walasa ka taa 45 km/h, sen ka kan ka dugukolo digi ni fanga 80 N ye. Motɛri ka kupuli ka dɔgɔ : a ka kan ka bonya.',
        data: ['Sen ka rayɔn : $R = 0{,}30$ m', 'Fanga min ka kan ka di dugukolo ma : 80 N', 'Motɛri ka kupuli : 8 N·m'],
        question: 'Fanga bilalan ka kan ka motɛri ka kupuli sigi siɲɛ joli ?',
        unit: '',
        hints: ['Kupuli min ka kan sen ma, o jate : $\\mathcal{M} = F \\times R$.'],
        solution: ['Kupuli min ka kan sen ma : $80 \\times 0{,}30 = 24$ N·m.', 'Bonyali : $\\dfrac{24}{8} = 3$. Sen ka pinɲɔn ka ɲinw ka kan ka caya siɲɛ 3 ni motɛri ta ye.'],
        debrief: 'Ni pinɲɔn ɲin 14 bɛ motɛri kan ani pinɲɔn ɲin 42 bɛ sen kan, kupuli bɛ sigi siɲɛ 3. O kɔ, motɛri bɛ munumunu ka teli siɲɛ 3 ni sen ye : munumunu 1 200 ɲɔgɔn miniti kelen kɔnɔ.',
      },
      batterie: {
        title: 'Batiri',
        story:
          'Musa ka kiliyanw bɛ km 40 ɲɔgɔn taama don o don. Batiri ka kan ka tile bɛɛ kɛ k’a sɔrɔ a ma fa kokura. A bɛ batiri 48 V sugandi. A tɔ ye ka kapasite dɔn min ka kan ka ci.',
        data: ['Taama don o don : 40 km', 'Teliya cɛmancɛ : 12,5 m/s', 'Puwisansi min bɛ ta : 1 000 W', 'Batiri ka tansiyɔn : $U = 48$ V'],
        question: 'Batiri ka kapasite ka kan ka kɛ joli ye a dɔgɔmanba la, ampɛri-lɛri (Ah) la ?',
        hints: ['Taama waati jate, o kɔ fanga : $E = P \\times t$.', 'Fanga sɛbɛn watiɛri la (1 Wh = 3 600 J), o kɔ a tila tansiyɔn na : $Q = \\dfrac{E}{U}$.'],
        solution: [
          'Waati : $t = \\dfrac{40\\,000}{12{,}5} = 3\\,200$ s.',
          'Fanga : $E = 1\\,000 \\times 3\\,200 = 3{,}2 \\times 10^6$ J, o ye $\\dfrac{3{,}2 \\times 10^6}{3\\,600} \\approx 889$ Wh ye.',
          'Kapasite : $Q = \\dfrac{889}{48} \\approx 18{,}5$ Ah. Musa bɛna batiri 20 Ah ta walasa dɔɔnin ka to.',
        ],
        debrief: 'Batiri 48 V ni 20 Ah bɛ fanga 960 Wh mara : tile bɛɛ bɛ se, dɔɔnin bɛ to fana.',
      },
      'chimie-batterie': {
        title: 'Min bɛ kɛ batiri kɔnɔ',
        story:
          'Batiri ye litiyɔmu batiri ye. Kiliyan dɔ ye Musa ɲininka kuran bɛ bɔ min. Batiri lakolonni waati, a ka elɛkitɔrodi negatifu la, litiyɔmu ($Z = 3$) atɔmuw bɛ yɛlɛma ka ɛlɛkitɔrɔnw bɔ, olu bɛ taa kuran sira fɛ ka se motɛri ma.',
        question: 'Litiyɔmu atɔmu bɛ kɛ mun ye batiri lakolonni waati ?',
        choices: [
          'A bɛ ɛlɛkitɔrɔn kelen sɔrɔ ka kɛ $\\ce{Li-}$ ye : o ye reduksiyɔn ye.',
          'A bɛ ɛlɛkitɔrɔn kelen bɔ ka kɛ $\\ce{Li+}$ ye : o ye ɔkisidasiyɔn ye.',
          'A bɛ prɔtɔn kelen bɔ ka kɛ eliyɔmu ye.',
          'A bɛ a ka ɛlɛkitɔrɔn 3 bɛɛ bɔ ka kɛ $\\ce{Li^{3+}}$ ye.',
        ],
        hints: ['Litiyɔmu ka ɛlɛkitɔrɔnw tilacogo sɛbɛn : ɛlɛkitɔrɔn joli bɛ a ka kuci laban kan ?'],
        solution: [
          'Litiyɔmu : $(K)^2(L)^1$. A bɛ a ka ɛlɛkitɔrɔn laban bɔ nɔgɔya la walasa ka bɔ eliyɔmu fɛ.',
          '$\\ce{Li -> Li+ + e-}$ : ɛlɛkitɔrɔnw bɔli ye **ɔkisidasiyɔn** ye. Ɛlɛkitɔrɔn minnu bɔra, olu de ye kuran ye min bɛ motɛri baara.',
        ],
        debrief: 'Tile la batiri fali waati, a bɛ kɛ kɔfɛ ka segin : iyɔn $\\ce{Li+}$ bɛ ɛlɛkitɔrɔn kelen ta kokura. Batiri bɛ se ka o taa ni segin kɛ siɲɛ kɛmɛ caman.',
      },
      securite: {
        title: 'Ɲɛminɛcogo ni lakana',
        story:
          'Kɔrɔbɔli fɔlɔ : ni Musa ye motɛri faga teliya la, tasuma kisɛ dɔ bɛ bɔ ɲɛminɛ boyiti kɔnɔ. Motɛri ka bobini ye bobini ye : ni a ka kuran tigɛra, a bɛ a kɛlɛ ka tansiyɔn dɔ bɔ. O ye oto-ɛnduksiyɔn ye.',
        data: ['Bobini ka ɛnduktansi : $L = 2$ mH', 'Kuran bɛ bɔ 40 A la ka se 0 A ma $\\Delta t = 1$ ms kɔnɔ', 'Batiri ka tansiyɔn : 48 V'],
        question: 'Bobini bɛ tansiyɔn joli bɔ kuran tigɛli waati ?',
        hints: ['Oto-ɛnduksiyɔn f.é.m. ye $e = -L \\dfrac{\\Delta i}{\\Delta t}$ ye ; a ka valɛri absoli jate.'],
        solution: ['$|e| = L \\times \\dfrac{\\Delta i}{\\Delta t} = 2 \\times 10^{-3} \\times \\dfrac{40}{1 \\times 10^{-3}} = 80$ V.', '80 V ye batiri ka tansiyɔn siɲɛ fila ɲɔgɔn ye : o bɛ se ka ɲɛminɛ tiransisitɔriw tiɲɛ.'],
        debrief: 'Musa bɛ diyodi « roue libre » dɔ bila bobini dawolo la : kuran tigɛli waati, kuran bɛ se ka faga dɔɔni dɔɔni a fɛ, tasuma kisɛ tɛ bɔ.',
      },
    },
    outro:
      'Moto labɛnna. Sibiri sɔgɔma dɔ, Musa b’a bɔ Segu sira kan : mankan tɛ, sisi tɛ, atoliye ka tile de ye a fa. I ye lamagali fanga, puwisansi, Laplasi ka fanga, fanga ka mɔmani, kuran fanga, ɔkisidoreduksiyɔn ani oto-ɛnduksiyɔn nafa sɔrɔ. Porogaramu sapitiriw don, u bɛ se ka masini lakika dilan.',
  },
};
