// Les 118 éléments : symbole, nom français, masse atomique (entre crochets : isotope le plus stable).
// Période, groupe, famille et répartition électronique sont calculés à partir de Z.

export type ElementCategory =
  | 'metal-alcalin'
  | 'alcalino-terreux'
  | 'transition'
  | 'metal-pauvre'
  | 'metalloide'
  | 'non-metal'
  | 'halogene'
  | 'gaz-noble'
  | 'lanthanide'
  | 'actinide';

export interface ChemicalElement {
  z: number;
  symbol: string;
  name: string;
  /** Masse atomique en g/mol, texte tel qu'affiché. */
  mass: string;
  period: number;
  /** Groupe 1 à 18 ; `null` pour les lanthanides et actinides. */
  group: number | null;
  category: ElementCategory;
  /** Électrons par couche : K, L, M, N, O, P, Q. */
  shells: number[];
  /** Configuration par sous-couche, ex. « 1s² 2s² 2p⁶ ». */
  configuration: string;
}

const RAW = `H Hydrogène 1,008|He Hélium 4,003|Li Lithium 6,94|Be Béryllium 9,012|B Bore 10,81|C Carbone 12,011|N Azote 14,007|O Oxygène 15,999|F Fluor 18,998|Ne Néon 20,180|Na Sodium 22,990|Mg Magnésium 24,305|Al Aluminium 26,982|Si Silicium 28,085|P Phosphore 30,974|S Soufre 32,06|Cl Chlore 35,45|Ar Argon 39,948|K Potassium 39,098|Ca Calcium 40,078|Sc Scandium 44,956|Ti Titane 47,867|V Vanadium 50,942|Cr Chrome 51,996|Mn Manganèse 54,938|Fe Fer 55,845|Co Cobalt 58,933|Ni Nickel 58,693|Cu Cuivre 63,546|Zn Zinc 65,38|Ga Gallium 69,723|Ge Germanium 72,630|As Arsenic 74,922|Se Sélénium 78,971|Br Brome 79,904|Kr Krypton 83,798|Rb Rubidium 85,468|Sr Strontium 87,62|Y Yttrium 88,906|Zr Zirconium 91,224|Nb Niobium 92,906|Mo Molybdène 95,95|Tc Technétium [98]|Ru Ruthénium 101,07|Rh Rhodium 102,91|Pd Palladium 106,42|Ag Argent 107,87|Cd Cadmium 112,41|In Indium 114,82|Sn Étain 118,71|Sb Antimoine 121,76|Te Tellure 127,60|I Iode 126,90|Xe Xénon 131,29|Cs Césium 132,91|Ba Baryum 137,33|La Lanthane 138,91|Ce Cérium 140,12|Pr Praséodyme 140,91|Nd Néodyme 144,24|Pm Prométhium [145]|Sm Samarium 150,36|Eu Europium 151,96|Gd Gadolinium 157,25|Tb Terbium 158,93|Dy Dysprosium 162,50|Ho Holmium 164,93|Er Erbium 167,26|Tm Thulium 168,93|Yb Ytterbium 173,05|Lu Lutécium 174,97|Hf Hafnium 178,49|Ta Tantale 180,95|W Tungstène 183,84|Re Rhénium 186,21|Os Osmium 190,23|Ir Iridium 192,22|Pt Platine 195,08|Au Or 196,97|Hg Mercure 200,59|Tl Thallium 204,38|Pb Plomb 207,2|Bi Bismuth 208,98|Po Polonium [209]|At Astate [210]|Rn Radon [222]|Fr Francium [223]|Ra Radium [226]|Ac Actinium [227]|Th Thorium 232,04|Pa Protactinium 231,04|U Uranium 238,03|Np Neptunium [237]|Pu Plutonium [244]|Am Américium [243]|Cm Curium [247]|Bk Berkélium [247]|Cf Californium [251]|Es Einsteinium [252]|Fm Fermium [257]|Md Mendélévium [258]|No Nobélium [259]|Lr Lawrencium [266]|Rf Rutherfordium [267]|Db Dubnium [268]|Sg Seaborgium [269]|Bh Bohrium [270]|Hs Hassium [277]|Mt Meitnérium [278]|Ds Darmstadtium [281]|Rg Roentgenium [282]|Cn Copernicium [285]|Nh Nihonium [286]|Fl Flérovium [289]|Mc Moscovium [290]|Lv Livermorium [293]|Ts Tennesse [294]|Og Oganesson [294]`;

function position(z: number): { period: number; group: number | null } {
  if (z === 1) return { period: 1, group: 1 };
  if (z === 2) return { period: 1, group: 18 };
  if (z <= 18) {
    const period = z <= 10 ? 2 : 3;
    const i = z - (period === 2 ? 2 : 10);
    return { period, group: i <= 2 ? i : i + 10 };
  }
  if (z <= 36) return { period: 4, group: z - 18 };
  if (z <= 54) return { period: 5, group: z - 36 };
  if (z <= 56) return { period: 6, group: z - 54 };
  if (z <= 71) return { period: 6, group: null };
  if (z <= 86) return { period: 6, group: z - 68 };
  if (z <= 88) return { period: 7, group: z - 86 };
  if (z <= 103) return { period: 7, group: null };
  return { period: 7, group: z - 100 };
}

const SETS: [ElementCategory, number[]][] = [
  ['metal-alcalin', [3, 11, 19, 37, 55, 87]],
  ['alcalino-terreux', [4, 12, 20, 38, 56, 88]],
  ['halogene', [9, 17, 35, 53, 85, 117]],
  ['gaz-noble', [2, 10, 18, 36, 54, 86, 118]],
  ['metalloide', [5, 14, 32, 33, 51, 52]],
  ['non-metal', [1, 6, 7, 8, 15, 16, 34]],
  ['metal-pauvre', [13, 31, 49, 50, 81, 82, 83, 84, 113, 114, 115, 116]],
];

function category(z: number): ElementCategory {
  if (z >= 57 && z <= 71) return 'lanthanide';
  if (z >= 89 && z <= 103) return 'actinide';
  for (const [cat, list] of SETS) if (list.includes(z)) return cat;
  return 'transition';
}

// Ordre de remplissage de Klechkowski : [n, l].
const ORDER: [number, number][] = [
  [1, 0], [2, 0], [2, 1], [3, 0], [3, 1], [4, 0], [3, 2], [4, 1], [5, 0], [4, 2], [5, 1], [6, 0],
  [4, 3], [5, 2], [6, 1], [7, 0], [5, 3], [6, 2], [7, 1],
];
const CAPACITY = [2, 6, 10, 14];
const LETTER = ['s', 'p', 'd', 'f'];

// Exceptions à la règle de Klechkowski : électrons déplacés d'une sous-couche à une autre.
const EXCEPTIONS: Record<number, [string, string, number][]> = {
  24: [['4s', '3d', 1]], 29: [['4s', '3d', 1]],
  41: [['5s', '4d', 1]], 42: [['5s', '4d', 1]], 44: [['5s', '4d', 1]], 45: [['5s', '4d', 1]],
  46: [['5s', '4d', 2]], 47: [['5s', '4d', 1]],
  57: [['4f', '5d', 1]], 58: [['4f', '5d', 1]], 64: [['4f', '5d', 1]],
  78: [['6s', '5d', 1]], 79: [['6s', '5d', 1]],
  89: [['5f', '6d', 1]], 90: [['5f', '6d', 2]], 91: [['5f', '6d', 1]], 92: [['5f', '6d', 1]],
  93: [['5f', '6d', 1]], 96: [['5f', '6d', 1]],
};

const SUPERSCRIPT: Record<string, string> = {
  '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
};

export function electronConfiguration(electrons: number, z = electrons): { shells: number[]; configuration: string } {
  const filled = new Map<string, number>();
  let left = electrons;
  for (const [n, l] of ORDER) {
    if (left <= 0) break;
    const count = Math.min(left, CAPACITY[l]);
    filled.set(`${n}${LETTER[l]}`, count);
    left -= count;
  }
  // Les exceptions ne valent que pour l'atome neutre.
  if (electrons === z) {
    for (const [from, to, count] of EXCEPTIONS[z] ?? []) {
      filled.set(from, (filled.get(from) ?? 0) - count);
      filled.set(to, (filled.get(to) ?? 0) + count);
    }
  }
  const entries = [...filled.entries()]
    .filter(([, count]) => count > 0)
    .sort(([a], [b]) => Number(a[0]) - Number(b[0]) || LETTER.indexOf(a[1]) - LETTER.indexOf(b[1]));

  const shells: number[] = [];
  for (const [sub, count] of entries) {
    const n = Number(sub[0]);
    while (shells.length < n) shells.push(0);
    shells[n - 1] += count;
  }
  const configuration = entries
    .map(([sub, count]) => sub + String(count).split('').map((d) => SUPERSCRIPT[d]).join(''))
    .join(' ');
  return { shells, configuration };
}

export const ELEMENTS: ChemicalElement[] = RAW.split('|').map((entry, index) => {
  const [symbol, name, mass] = entry.split(' ');
  const z = index + 1;
  return { z, symbol, name, mass, ...position(z), category: category(z), ...electronConfiguration(z) };
});

export const SHELL_NAMES = ['K', 'L', 'M', 'N', 'O', 'P', 'Q'];

export function getElement(z: number): ChemicalElement | undefined {
  return ELEMENTS[z - 1];
}

export function findElementBySymbol(symbol: string): ChemicalElement | undefined {
  return ELEMENTS.find((e) => e.symbol.toLowerCase() === symbol.toLowerCase());
}
