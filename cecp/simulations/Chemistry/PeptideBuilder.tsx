'use client';

import { useMemo, useState } from 'react';
import { Plus, X, RotateCcw } from 'lucide-react';
import { MoleculeViewer } from '@/cecp/components/chem/MoleculeViewer';
import { Stat, ParamPanel, frNum } from '@/cecp/components/sim/Controls';
import {
  AMINO_ACIDS, aminoAcid, peptideMolecule, peptideMolarMass, peptideFormula, peptideBonds, aminoAcidMolarMass,
  sequencesWithRepetition, sequenceName,
} from '@/cecp/lib/chemistry/peptides';
import { stereocenters } from '@/cecp/lib/chemistry/molecule';

const MAX = 5;

/** Formule semi-developpee de la chaine, liaisons peptidiques en evidence */
function ChainFormula({ seq }: { seq: string[] }) {
  return (
    <div className="overflow-x-auto">
      <div className="inline-flex items-center gap-0 font-mono text-sm whitespace-nowrap py-3 px-2">
        <span className="text-sky-300">H₂N</span>
        {seq.map((code, i) => (
          <span key={i} className="inline-flex items-center">
            <span className="text-slate-500">–</span>
            <span className="inline-flex flex-col items-center">
              <span className="text-[11px] text-amber-300">{aminoAcid(code).sideLabel.replace('–', '')}</span>
              <span className="text-slate-500 leading-none">|</span>
              <span className="text-slate-100">CH</span>
            </span>
            <span className="text-slate-500">–</span>
            <span className="text-slate-100">C</span>
            {i < seq.length - 1 ? (
              <span className="inline-flex items-center px-1 mx-0.5 rounded bg-pink-500/15 border border-pink-500/40">
                <span className="inline-flex flex-col items-center">
                  <span className="text-red-400 text-[11px]">O</span>
                  <span className="text-slate-500 leading-none">‖</span>
                  <span className="text-pink-200">C</span>
                </span>
                <span className="text-pink-200">–NH</span>
              </span>
            ) : (
              <span className="inline-flex items-center">
                <span className="inline-flex flex-col items-center">
                  <span className="text-red-400 text-[11px]">O</span>
                  <span className="text-slate-500 leading-none">‖</span>
                  <span className="text-slate-100">C</span>
                </span>
                <span className="text-red-300">–OH</span>
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

export function PeptideBuilder() {
  const [seq, setSeq] = useState<string[]>(['Gly', 'Ala']);
  const mol = useMemo(() => peptideMolecule(seq), [seq]);
  const centers = stereocenters(mol);
  const sumM = seq.reduce((s, c) => s + aminoAcidMolarMass(c), 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
      <div className="lg:col-span-2 space-y-3">
        <MoleculeViewer height={320} cameraDistance={4 + 3.5 * seq.length}
          molecules={[{ mol, highlight: centers, labels: centers.map((c) => ({ atom: c, text: 'C*' })) }]}
          caption={<span>{sequenceName(seq)} · carbones asymétriques C* en doré</span>} />
        <div className="rounded-lg bg-slate-950 border border-slate-800 p-2">
          <p className="text-xs text-slate-500 px-2">Formule semi-développée (liaisons peptidiques –CO–NH– en rose)</p>
          <ChainFormula seq={seq} />
        </div>
      </div>

      <ParamPanel title="Construire un peptide">
        <div className="space-y-1">
          <p className="text-sm text-slate-300">Ajouter un acide α-aminé (extrémité C-terminale)</p>
          <div className="grid grid-cols-3 gap-1.5">
            {AMINO_ACIDS.map((a) => (
              <button key={a.code} onClick={() => setSeq((s) => (s.length < MAX ? [...s, a.code] : s))} disabled={seq.length >= MAX}
                className="inline-flex items-center justify-center gap-1 px-2 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs text-slate-200"
                title={`${a.name} : R = ${a.sideLabel}`}>
                <Plus size={12} /> {a.code}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-slate-300">Séquence (N-terminal → C-terminal)</p>
          <div className="flex flex-wrap gap-1.5">
            {seq.map((c, i) => (
              <span key={i} className="inline-flex items-center gap-1 pl-2 pr-1 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-xs text-amber-200">
                {c}
                <button onClick={() => setSeq((s) => (s.length > 1 ? s.filter((_, k) => k !== i) : s))} aria-label={`Retirer ${c}`}
                  className="p-0.5 rounded-full hover:bg-amber-500/30"><X size={11} /></button>
              </span>
            ))}
            <button onClick={() => setSeq((s) => [...s].reverse())} className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs text-slate-400 hover:text-white">
              <RotateCcw size={12} /> Inverser
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Stat label="Formule brute" value={peptideFormula(seq)} />
          <Stat label="Masse molaire" value={`${frNum(peptideMolarMass(seq), 0)} g/mol`} tone="emerald" />
          <Stat label="Liaisons peptidiques" value={String(peptideBonds(seq.length))} tone="rose" />
          <Stat label="Carbones asymétriques" value={String(centers.length)} tone="sky" />
        </div>
        <p className="text-xs text-slate-300 font-mono">
          M = {seq.map((c) => aminoAcidMolarMass(c)).join(' + ')} − {peptideBonds(seq.length)} × 18 = {frNum(sumM - 18 * peptideBonds(seq.length), 0)} g/mol
        </p>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          Chaque liaison peptidique se forme en éliminant une molécule d&apos;eau. Avec les {AMINO_ACIDS.length} acides aminés
          proposés, on peut former {sequencesWithRepetition(AMINO_ACIDS.length, seq.length)} peptides différents de {seq.length} résidus.
          Inverse la séquence : Gly-Ala et Ala-Gly sont deux molécules différentes.
        </p>
      </ParamPanel>
    </div>
  );
}
