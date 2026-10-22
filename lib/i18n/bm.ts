import type { Dictionary } from './fr';

type DeepPartial<T> = T extends readonly unknown[] ? T : T extends object ? { [K in keyof T]?: DeepPartial<T[K]> } : T;

// Bamanankan. BROUILLON À FAIRE RELIRE par un enseignant ou un traducteur bambarophone,
// en particulier le vocabulaire scientifique. Toute clé absente s'affiche en français.
export const bm: DeepPartial<Dictionary> = {
  nav: {
    home: 'So',
    classes: 'Kilasiw',
    language: 'Kan',
  },
  languages: { fr: 'Faransikan', bm: 'Bamanankan' },
  bmNotice: 'Bamanankan bayɛlɛmali bɛ taa a fɛ. Kumaw minnu ma bayɛlɛma fɔlɔ, olu bɛ to faransikan na.',
  home: {
    chooseClass: 'I ka kilasi sugandi',
  },
  subjects: {
    maths: { name: 'Jatebɔ', short: 'Jatebɔ' },
  },
};
