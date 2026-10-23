// lib/chemistry/peptides.ts
// ============================================================
//  Acides alpha-amines et peptides : construction de la chaine,
//  formule brute, masse molaire, denombrement des sequences.
//  Aucune dependance React.
// ============================================================

import { buildMolecule, formula, molarMass, stereocenters, type Molecule } from './molecule';

export interface AminoAcid {
  code: string;
  /** Code a une lettre */
  letter: string;
  name: string;
  /** Chaine laterale R dans la notation lineaire ('' pour la glycine : R = H) */
  side: string;
  /** Description de R */
  sideLabel: string;
}

export const AMINO_ACIDS: AminoAcid[] = [
  { code: 'Gly', letter: 'G', name: 'Glycine', side: '', sideLabel: '–H' },
  { code: 'Ala', letter: 'A', name: 'Alanine', side: 'C', sideLabel: '–CH₃' },
  { code: 'Val', letter: 'V', name: 'Valine', side: 'C(C)C', sideLabel: '–CH(CH₃)₂' },
  { code: 'Leu', letter: 'L', name: 'Leucine', side: 'CC(C)C', sideLabel: '–CH₂–CH(CH₃)₂' },
  { code: 'Ser', letter: 'S', name: 'Sérine', side: 'CO', sideLabel: '–CH₂–OH' },
  { code: 'Cys', letter: 'C', name: 'Cystéine', side: 'CS', sideLabel: '–CH₂–SH' },
];

export const aminoAcid = (code: string) => {
  const a = AMINO_ACIDS.find((x) => x.code === code);
  if (!a) throw new Error(`Acide aminé inconnu : ${code}`);
  return a;
};

/** Notation lineaire d'un acide alpha-amine : H2N-CH(R)-COOH */
export const aminoAcidSmiles = (code: string) => {
  const s = aminoAcid(code).side;
  return s ? `NC(${s})C(=O)O` : 'NCC(=O)O';
};

/** Notation lineaire d'un peptide (extremite N-terminale a gauche) */
export function peptideSmiles(sequence: string[]): string {
  if (sequence.length === 0) throw new Error('Séquence vide');
  return sequence.map((code, i) => {
    const s = aminoAcid(code).side;
    const residue = s ? `NC(${s})C(=O)` : 'NCC(=O)';
    return i === sequence.length - 1 ? `${residue}O` : residue;
  }).join('');
}

export function peptideMolecule(sequence: string[]): Molecule {
  return buildMolecule(peptideSmiles(sequence));
}

export const peptideFormula = (sequence: string[]) => formula(peptideMolecule(sequence));
export const peptideMolarMass = (sequence: string[]) => molarMass(peptideMolecule(sequence));

/** Nombre de liaisons peptidiques d'une chaine de k residus */
export const peptideBonds = (k: number) => Math.max(0, k - 1);

/** Masse molaire d'un acide alpha-amine */
export const aminoAcidMolarMass = (code: string) => molarMass(buildMolecule(aminoAcidSmiles(code)));

/** Un acide alpha-amine est chiral s'il possede un carbone asymetrique (tous sauf la glycine) */
export const isChiralAminoAcid = (code: string) => stereocenters(buildMolecule(aminoAcidSmiles(code))).length > 0;

/** Nombre de peptides de longueur k avec n acides amines, repetitions permises : n^k */
export const sequencesWithRepetition = (n: number, k: number) => n ** k;

/** Nombre de peptides de longueur k avec n acides amines tous differents : n! / (n - k)! */
export function sequencesDistinct(n: number, k: number): number {
  let r = 1;
  for (let i = 0; i < k; i++) r *= n - i;
  return k > n ? 0 : r;
}

/** Abreviation d'une sequence : Gly-Ala-Val */
export const sequenceName = (sequence: string[]) => sequence.join('-');
