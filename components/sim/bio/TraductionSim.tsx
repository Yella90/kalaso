'use client';

import { useState } from 'react';
import type { Dictionary } from '@/lib/i18n';

type Gene = 'globine' | 'court';
type T = Dictionary['sims']['traduction'];

// Brins codants (début du gène de la β-globine humaine, et un gène court d’exemple).
const GENES: Record<Gene, string> = {
  globine: 'ATGGTGCATCTGACTCCTGAGGAGAAGTCT',
  court: 'ATGGCCAAATTTGGGTAA',
};

// Code génétique standard : codons dans l’ordre T, C, A, G pour chaque position.
const BASES = 'TCAG';
const AA = 'FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG';
const NAMES: Record<string, string> = {
  F: 'Phe', L: 'Leu', S: 'Ser', Y: 'Tyr', C: 'Cys', W: 'Trp', P: 'Pro', H: 'His', Q: 'Gln', R: 'Arg',
  I: 'Ile', M: 'Met', T: 'Thr', N: 'Asn', K: 'Lys', V: 'Val', A: 'Ala', D: 'Asp', E: 'Glu', G: 'Gly', '*': 'Stop',
};

function translate(dna: string): string[] {
  const out: string[] = [];
  for (let i = 0; i + 3 <= dna.length; i += 3) {
    const codon = dna.slice(i, i + 3);
    const aa = AA[BASES.indexOf(codon[0]) * 16 + BASES.indexOf(codon[1]) * 4 + BASES.indexOf(codon[2])];
    out.push(aa);
    if (aa === '*') break;
  }
  return out;
}

const COMPLEMENT: Record<string, string> = { A: 'T', T: 'A', G: 'C', C: 'G' };

/** Transcription et traduction, avec mutation ponctuelle. */
export function TraductionSim({ t }: { t: T }) {
  const [gene, setGene] = useState<Gene>('globine');
  const [position, setPosition] = useState(20);
  const [base, setBase] = useState('T');
  const [mutated, setMutated] = useState(false);

  const original = GENES[gene];
  const dna = mutated ? original.slice(0, position - 1) + base + original.slice(position) : original;
  const codons = dna.match(/.{1,3}/g) ?? [];
  const protein = translate(dna);
  const reference = translate(original);

  let effect: keyof T['effects'] = 'aucune';
  if (mutated && dna !== original) {
    if (protein.join('') === reference.join('')) effect = 'silencieuse';
    else if (protein.includes('*') && protein.indexOf('*') < (reference.includes('*') ? reference.indexOf('*') : reference.length)) effect = 'stop';
    else effect = 'faux';
  }
  const changedCodon = mutated ? Math.floor((position - 1) / 3) : -1;
  const sickle = gene === 'globine' && mutated && position === 20 && base === 'T';

  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-2 sm:grid-cols-2" role="group" aria-label={t.gene}>
        {(['globine', 'court'] as Gene[]).map((g) => (
          <button
            key={g}
            type="button"
            aria-pressed={gene === g}
            onClick={() => {
              setGene(g);
              setMutated(false);
              setPosition(g === 'globine' ? 20 : 5);
            }}
            className={`rounded-lg border-2 px-3 py-2 text-sm font-bold ${gene === g ? 'border-ink bg-ink text-on-ink' : 'border-line bg-surface'}`}
          >
            {t.genes[g]}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="border-separate border-spacing-x-1 border-spacing-y-1 font-mono">
          <tbody>
            {[
              { label: t.strand, cells: codons },
              { label: t.template, cells: codons.map((cd) => cd.split('').map((b) => COMPLEMENT[b]).join('')) },
              { label: t.mrna, cells: codons.map((cd) => cd.replace(/T/g, 'U')) },
            ].map((row) => (
              <tr key={row.label}>
                <th className="whitespace-nowrap pr-2 text-left font-sans text-sm font-bold text-muted">{row.label}</th>
                {row.cells.map((cd, i) => (
                  <td key={i} className={`rounded-md px-1.5 py-1 text-center text-base ${i === changedCodon ? 'bg-alert-soft font-bold text-alert-ink' : 'bg-paper'}`}>
                    {cd}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <th className="pr-2 text-left font-sans text-sm font-bold text-muted">{t.protein}</th>
              {codons.map((_, i) => (
                <td key={i} className={`rounded-md px-1.5 py-1 text-center font-sans text-sm font-bold ${i === changedCodon ? 'bg-alert-soft text-alert-ink' : protein[i] === '*' ? 'bg-ink text-on-ink' : 'bg-good-soft'}`}>
                  {protein[i] ? NAMES[protein[i]] : ''}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-bold">{t.mutate}</span>
          <input
            type="number"
            min={1}
            max={original.length}
            value={position}
            onChange={(e) => setPosition(Math.min(original.length, Math.max(1, Number(e.target.value) || 1)))}
            className="w-24 rounded-lg border-2 border-line bg-surface px-3 py-2 font-serif text-xl font-bold"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-bold">{t.base}</span>
          <select value={base} onChange={(e) => setBase(e.target.value)} className="rounded-lg border-2 border-line bg-surface px-3 py-2 font-serif text-xl font-bold">
            {['A', 'T', 'G', 'C'].map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </label>
        <button type="button" onClick={() => setMutated(true)} className="rounded-full bg-ink px-5 py-2 font-bold text-on-ink">
          {t.apply}
        </button>
        {mutated && (
          <button type="button" onClick={() => setMutated(false)} className="rounded-full border-2 border-line px-5 py-2 font-bold">
            {t.reset}
          </button>
        )}
      </div>
      <p className="font-bold">{t.effects[effect]}</p>
      {sickle && <p className="rounded-xl bg-alert-soft px-4 py-3">{t.sickle}</p>}
    </div>
  );
}
