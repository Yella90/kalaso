'use client';

import { useState } from 'react';
import type { Dictionary } from '@/lib/i18n';
import { fmt } from '../Slider';

type Kind = 'mono' | 'di';
type Dominance = 'complete' | 'codominance';
type T = Dictionary['sims']['croisement'];

/** Probabilités des gamètes d’un génotype, gènes indépendants. Ex. « AaBb » → AB, Ab, aB, ab à 1/4. */
function gametes(genes: string[]): Map<string, number> {
  let out = new Map<string, number>([['', 1]]);
  for (const g of genes) {
    const next = new Map<string, number>();
    for (const [prefix, p] of out) {
      for (const allele of [g[0], g[1]]) next.set(prefix + allele, (next.get(prefix + allele) ?? 0) + p / 2);
    }
    out = next;
  }
  return out;
}

// Ordre d’écriture des allèles : dominant avant récessif ; en codominance, R avant B (RB).
const ORDER = 'RAaBb';

/** Écrit un génotype dans l’ordre habituel, gène par gène. */
function genotype(g1: string, g2: string): string {
  let s = '';
  for (let i = 0; i < g1.length; i++) {
    s += [g1[i], g2[i]].sort((x, y) => ORDER.indexOf(x) - ORDER.indexOf(y)).join('');
  }
  return s;
}

const PHENO_COLORS: Record<string, string> = {
  lisse: '#f2d16b',
  ridee: '#c9a24a',
  jaune: '#f7e27a',
  verte: '#8cc66b',
  rouge: '#e0533d',
  rose: '#f3a3b0',
  blanche: '#f4f1ea',
};

function phenotype(geno: string, kind: Kind, dominance: Dominance): string[] {
  if (kind === 'mono' && dominance === 'codominance') {
    return [geno === 'RR' ? 'rouge' : geno === 'BB' ? 'blanche' : 'rose'];
  }
  const a = geno.slice(0, 2).includes('A') ? 'lisse' : 'ridee';
  if (kind === 'mono') return [a];
  const b = geno.slice(2, 4).includes('B') ? 'jaune' : 'verte';
  return [a, b];
}

/** Fraction lisible : 0,1875 → « 3/16 ». */
function fraction(p: number): string {
  const n = Math.round(p * 16);
  let num = n;
  let den = 16;
  while (num % 2 === 0 && den > 1) {
    num /= 2;
    den /= 2;
  }
  return den === 1 ? String(num) : `${num}/${den}`;
}

function Select({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-sm font-bold">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="rounded-lg border-2 border-line bg-surface px-3 py-2 font-serif text-xl font-bold">
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

/** Croisements de monohybridisme et de dihybridisme : gamètes, échiquier, proportions. */
export function CroisementSim({ t }: { t: T }) {
  const [kind, setKind] = useState<Kind>('mono');
  const [dominance, setDominance] = useState<Dominance>('complete');
  const [p1, setP1] = useState(['Aa', 'Bb']);
  const [p2, setP2] = useState(['Aa', 'Bb']);
  const [sample, setSample] = useState<Map<string, number> | null>(null);

  const codo = kind === 'mono' && dominance === 'codominance';
  const optionsA = codo ? ['RR', 'RB', 'BB'] : ['AA', 'Aa', 'aa'];
  const optionsB = ['BB', 'Bb', 'bb'];
  const genes1 = kind === 'mono' ? [codo ? (optionsA.includes(p1[0]) ? p1[0] : 'RB') : (optionsA.includes(p1[0]) ? p1[0] : 'Aa')] : p1;
  const genes2 = kind === 'mono' ? [codo ? (optionsA.includes(p2[0]) ? p2[0] : 'RB') : (optionsA.includes(p2[0]) ? p2[0] : 'Aa')] : p2;

  const g1 = [...gametes(genes1)];
  const g2 = [...gametes(genes2)];

  // Échiquier et proportions des phénotypes.
  const totals = new Map<string, number>();
  const rows = g1.map(([a, pa]) =>
    g2.map(([b, pb]) => {
      const geno = genotype(a, b);
      const pheno = phenotype(geno, kind, dominance);
      const key = pheno.join(' + ');
      totals.set(key, (totals.get(key) ?? 0) + pa * pb);
      return { geno, pheno, p: pa * pb };
    }),
  );
  const results = [...totals].sort((x, y) => y[1] - x[1]);

  function simulate() {
    const counts = new Map<string, number>();
    for (let k = 0; k < 160; k++) {
      let r = Math.random();
      for (const [key, p] of results) {
        if (r < p) {
          counts.set(key, (counts.get(key) ?? 0) + 1);
          break;
        }
        r -= p;
      }
    }
    setSample(counts);
  }

  const phenoLabel = (key: string) => key.split(' + ').map((p) => t.phenotypes[p as keyof T['phenotypes']]).join(', ');

  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="grid grid-cols-2 gap-2">
          {(['mono', 'di'] as Kind[]).map((k) => (
            <button
              key={k}
              type="button"
              aria-pressed={kind === k}
              onClick={() => {
                setKind(k);
                setSample(null);
                if (k === 'di') setDominance('complete');
              }}
              className={`rounded-lg border-2 px-2 py-2 text-sm font-bold ${kind === k ? 'border-ink bg-ink text-on-ink' : 'border-line bg-surface'}`}
            >
              {t.kinds[k]}
            </button>
          ))}
        </div>
        {kind === 'mono' && (
          <div className="grid grid-cols-2 gap-2" role="group" aria-label={t.dominance}>
            {(['complete', 'codominance'] as Dominance[]).map((d) => (
              <button
                key={d}
                type="button"
                aria-pressed={dominance === d}
                onClick={() => {
                  setDominance(d);
                  setSample(null);
                  const def = d === 'codominance' ? 'RB' : 'Aa';
                  setP1([def, p1[1]]);
                  setP2([def, p2[1]]);
                }}
                className={`rounded-lg border-2 px-2 py-2 text-sm font-bold ${dominance === d ? 'border-ink bg-ink text-on-ink' : 'border-line bg-surface'}`}
              >
                {t.dominances[d]}
              </button>
            ))}
          </div>
        )}
      </div>
      <p className="text-sm text-muted">{kind === 'di' ? t.genes.di : codo ? t.genes.codo : t.genes.mono}</p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Select label={`${t.father} · ${codo ? 'R' : 'A'}`} value={genes1[0]} options={optionsA} onChange={(v) => { setP1([v, p1[1]]); setSample(null); }} />
        {kind === 'di' && <Select label={`${t.father} · B`} value={p1[1]} options={optionsB} onChange={(v) => { setP1([p1[0], v]); setSample(null); }} />}
        <Select label={`${t.mother} · ${codo ? 'R' : 'A'}`} value={genes2[0]} options={optionsA} onChange={(v) => { setP2([v, p2[1]]); setSample(null); }} />
        {kind === 'di' && <Select label={`${t.mother} · B`} value={p2[1]} options={optionsB} onChange={(v) => { setP2([p2[0], v]); setSample(null); }} />}
      </div>

      <div>
        <p className="font-bold">{t.grid}</p>
        <div className="mt-2 overflow-x-auto">
          <table className="border-separate border-spacing-1 text-center">
            <thead>
              <tr>
                <th className="text-sm text-muted">{t.gametes}</th>
                {g2.map(([b, pb]) => (
                  <th key={b} className="rounded-lg bg-paper px-2 py-1 font-serif text-lg">
                    {b}
                    <span className="block text-xs font-normal text-muted">{fraction(pb)}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={g1[i][0]}>
                  <th className="rounded-lg bg-paper px-2 py-1 font-serif text-lg">
                    {g1[i][0]}
                    <span className="block text-xs font-normal text-muted">{fraction(g1[i][1])}</span>
                  </th>
                  {row.map((cell, j) => (
                    <td key={j} className="min-w-16 rounded-lg px-2 py-2 font-serif text-base font-bold" style={{ background: PHENO_COLORS[cell.pheno[cell.pheno.length - 1]] }}>
                      <span style={{ borderBottom: cell.pheno.length > 1 ? `4px solid ${PHENO_COLORS[cell.pheno[0]]}` : undefined }}>{cell.geno}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <p className="font-bold">{t.results}</p>
        <ul className="mt-2 grid gap-2 sm:grid-cols-2">
          {results.map(([key, p]) => (
            <li key={key} className="flex items-center justify-between gap-3 rounded-xl bg-paper px-3 py-2">
              <span>{phenoLabel(key)}</span>
              <span className="font-serif text-lg font-bold tabular-nums">
                {fraction(p)} · {fmt(p * 100, 1)} %
                {sample && (
                  <span className="ml-2 text-sm font-normal text-muted">
                    {t.observed} {sample.get(key) ?? 0} / {t.expected} {Math.round(p * 160)}
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>
        <button type="button" onClick={simulate} className="mt-3 rounded-full bg-ink px-5 py-2 font-bold text-on-ink">
          {t.simulate}
        </button>
      </div>
    </div>
  );
}
