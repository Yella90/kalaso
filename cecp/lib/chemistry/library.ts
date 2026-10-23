// lib/chemistry/library.ts
// ============================================================
//  Bibliotheque des molecules du programme de chimie organique.
//  Chaque entree donne la notation lineaire (voir molecule.ts) a
//  partir de laquelle la geometrie 3D, la formule brute et la masse
//  molaire sont calculees.
// ============================================================

import { buildMolecule, type BuildOptions, type Molecule } from './molecule';

export type Family =
  | 'alcane' | 'alcène' | 'alcool' | 'aldéhyde' | 'cétone' | 'acide carboxylique' | 'ester'
  | 'amine' | 'amide' | "chlorure d'acyle" | 'anhydride' | 'acide α-aminé' | 'dérivé halogéné';

export interface MoleculeInfo {
  id: string;
  name: string;
  /** Formule semi-developpee affichee */
  condensed: string;
  smiles: string;
  family: Family;
  build?: BuildOptions;
  /** Remarque courte (usage, odeur...) */
  note?: string;
}

export const MOLECULES: MoleculeInfo[] = [
  // ---- Alcanes / alcenes (stereochimie) ----
  { id: 'ethane', name: 'Éthane', condensed: 'CH₃–CH₃', smiles: 'CC', family: 'alcane' },
  { id: 'butane', name: 'Butane', condensed: 'CH₃–CH₂–CH₂–CH₃', smiles: 'CCCC', family: 'alcane', note: 'Gaz des briquets.' },
  { id: 'e-but-2-ene', name: '(E)-but-2-ène', condensed: 'CH₃–CH=CH–CH₃', smiles: 'CC=CC', family: 'alcène' },
  { id: 'z-but-2-ene', name: '(Z)-but-2-ène', condensed: 'CH₃–CH=CH–CH₃', smiles: 'CC=CC', family: 'alcène', build: { flip: [2] } },
  { id: '2-chlorobutane', name: '2-chlorobutane', condensed: 'CH₃–CHCl–CH₂–CH₃', smiles: 'CC(Cl)CC', family: 'dérivé halogéné' },

  // ---- Alcools ----
  { id: 'methanol', name: 'Méthanol', condensed: 'CH₃–OH', smiles: 'CO', family: 'alcool', note: 'Très toxique : provoque la cécité.' },
  { id: 'ethanol', name: 'Éthanol', condensed: 'CH₃–CH₂–OH', smiles: 'CCO', family: 'alcool', note: 'Alcool des boissons, obtenu par fermentation.' },
  { id: 'propan-1-ol', name: 'Propan-1-ol', condensed: 'CH₃–CH₂–CH₂–OH', smiles: 'CCCO', family: 'alcool' },
  { id: 'propan-2-ol', name: 'Propan-2-ol', condensed: 'CH₃–CH(OH)–CH₃', smiles: 'CC(O)C', family: 'alcool', note: 'Alcool isopropylique, désinfectant.' },
  { id: 'butan-1-ol', name: 'Butan-1-ol', condensed: 'CH₃–(CH₂)₃–OH', smiles: 'CCCCO', family: 'alcool' },
  { id: 'butan-2-ol', name: 'Butan-2-ol', condensed: 'CH₃–CH(OH)–CH₂–CH₃', smiles: 'CC(O)CC', family: 'alcool', note: 'Molécule chirale : deux énantiomères.' },
  { id: '2-methylpropan-1-ol', name: '2-méthylpropan-1-ol', condensed: '(CH₃)₂CH–CH₂–OH', smiles: 'CC(C)CO', family: 'alcool' },
  { id: '2-methylpropan-2-ol', name: '2-méthylpropan-2-ol', condensed: '(CH₃)₃C–OH', smiles: 'CC(C)(C)O', family: 'alcool' },

  // ---- Aldehydes et cetones ----
  { id: 'methanal', name: 'Méthanal', condensed: 'H–CHO', smiles: 'C=O', family: 'aldéhyde', note: 'Formol : conservation des tissus biologiques.' },
  { id: 'ethanal', name: 'Éthanal', condensed: 'CH₃–CHO', smiles: 'CC=O', family: 'aldéhyde' },
  { id: 'propanal', name: 'Propanal', condensed: 'CH₃–CH₂–CHO', smiles: 'CCC=O', family: 'aldéhyde' },
  { id: 'butanal', name: 'Butanal', condensed: 'CH₃–(CH₂)₂–CHO', smiles: 'CCCC=O', family: 'aldéhyde' },
  { id: '2-methylpropanal', name: '2-méthylpropanal', condensed: '(CH₃)₂CH–CHO', smiles: 'CC(C)C=O', family: 'aldéhyde' },
  { id: 'propanone', name: 'Propanone', condensed: 'CH₃–CO–CH₃', smiles: 'CC(=O)C', family: 'cétone', note: 'Acétone : dissolvant du vernis à ongles.' },
  { id: 'butanone', name: 'Butanone', condensed: 'CH₃–CO–CH₂–CH₃', smiles: 'CC(=O)CC', family: 'cétone' },

  // ---- Acides carboxyliques et derives ----
  { id: 'acide-methanoique', name: 'Acide méthanoïque', condensed: 'H–COOH', smiles: 'C(=O)O', family: 'acide carboxylique', note: 'Présent dans le venin des fourmis.' },
  { id: 'acide-ethanoique', name: 'Acide éthanoïque', condensed: 'CH₃–COOH', smiles: 'CC(=O)O', family: 'acide carboxylique', note: 'Acide du vinaigre.' },
  { id: 'acide-propanoique', name: 'Acide propanoïque', condensed: 'CH₃–CH₂–COOH', smiles: 'CCC(=O)O', family: 'acide carboxylique' },
  { id: 'acide-butanoique', name: 'Acide butanoïque', condensed: 'CH₃–(CH₂)₂–COOH', smiles: 'CCCC(=O)O', family: 'acide carboxylique', note: 'Odeur du beurre rance.' },
  { id: 'acide-2-methylpropanoique', name: 'Acide 2-méthylpropanoïque', condensed: '(CH₃)₂CH–COOH', smiles: 'CC(C)C(=O)O', family: 'acide carboxylique' },
  { id: 'acide-lactique', name: 'Acide lactique', condensed: 'CH₃–CH(OH)–COOH', smiles: 'CC(O)C(=O)O', family: 'acide carboxylique', note: 'Produit dans les muscles à l\'effort, et dans le lait caillé.' },
  { id: 'chlorure-ethanoyle', name: "Chlorure d'éthanoyle", condensed: 'CH₃–COCl', smiles: 'CC(=O)Cl', family: "chlorure d'acyle" },
  { id: 'anhydride-ethanoique', name: 'Anhydride éthanoïque', condensed: '(CH₃–CO)₂O', smiles: 'CC(=O)OC(=O)C', family: 'anhydride' },
  { id: 'ethanoate-ethyle', name: "Éthanoate d'éthyle", condensed: 'CH₃–COO–CH₂–CH₃', smiles: 'CC(=O)OCC', family: 'ester', note: 'Solvant, odeur fruitée.' },
  { id: 'methanoate-ethyle', name: "Méthanoate d'éthyle", condensed: 'H–COO–CH₂–CH₃', smiles: 'C(=O)OCC', family: 'ester', note: 'Odeur de rhum.' },
  { id: 'butanoate-ethyle', name: "Butanoate d'éthyle", condensed: 'CH₃–(CH₂)₂–COO–CH₂–CH₃', smiles: 'CCCC(=O)OCC', family: 'ester', note: "Arôme d'ananas." },
  { id: 'ethanamide', name: 'Éthanamide', condensed: 'CH₃–CO–NH₂', smiles: 'CC(=O)N', family: 'amide' },
  { id: 'n-methylethanamide', name: 'N-méthyléthanamide', condensed: 'CH₃–CO–NH–CH₃', smiles: 'CC(=O)NC', family: 'amide' },

  // ---- Amines ----
  { id: 'methylamine', name: 'Méthylamine', condensed: 'CH₃–NH₂', smiles: 'CN', family: 'amine' },
  { id: 'ethylamine', name: 'Éthylamine', condensed: 'CH₃–CH₂–NH₂', smiles: 'CCN', family: 'amine' },
  { id: 'propylamine', name: 'Propylamine', condensed: 'CH₃–(CH₂)₂–NH₂', smiles: 'CCCN', family: 'amine' },
  { id: 'dimethylamine', name: 'N-méthylméthanamine (diméthylamine)', condensed: '(CH₃)₂NH', smiles: 'CNC', family: 'amine' },
  { id: 'trimethylamine', name: 'N,N-diméthylméthanamine (triméthylamine)', condensed: '(CH₃)₃N', smiles: 'CN(C)C', family: 'amine', note: 'Responsable de l\'odeur du poisson.' },
  { id: 'n-methylethanamine', name: 'N-méthyléthanamine', condensed: 'CH₃–CH₂–NH–CH₃', smiles: 'CCNC', family: 'amine' },

  // ---- Acides alpha-amines ----
  { id: 'glycine', name: 'Glycine (Gly)', condensed: 'H₂N–CH₂–COOH', smiles: 'NCC(=O)O', family: 'acide α-aminé', note: 'Seul acide α-aminé non chiral.' },
  { id: 'alanine', name: 'Alanine (Ala)', condensed: 'CH₃–CH(NH₂)–COOH', smiles: 'NC(C)C(=O)O', family: 'acide α-aminé' },
  { id: 'valine', name: 'Valine (Val)', condensed: '(CH₃)₂CH–CH(NH₂)–COOH', smiles: 'NC(C(C)C)C(=O)O', family: 'acide α-aminé' },
  { id: 'serine', name: 'Sérine (Ser)', condensed: 'HO–CH₂–CH(NH₂)–COOH', smiles: 'NC(CO)C(=O)O', family: 'acide α-aminé' },
];

const CACHE = new Map<string, Molecule>();

export function findMolecule(id: string): MoleculeInfo {
  const m = MOLECULES.find((x) => x.id === id);
  if (!m) throw new Error(`Molécule inconnue : ${id}`);
  return m;
}

/** Geometrie 3D d'une molecule de la bibliotheque (mise en cache) */
export function moleculeOf(id: string): Molecule {
  let m = CACHE.get(id);
  if (!m) {
    const info = findMolecule(id);
    m = buildMolecule(info.smiles, info.build);
    CACHE.set(id, m);
  }
  return m;
}
