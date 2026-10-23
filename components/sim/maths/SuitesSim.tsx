'use client';

import { useState } from 'react';
import type { Dictionary } from '@/lib/i18n';
import { PredictChallenges } from '../PredictChallenges';
import { fmt, Readout, Slider } from '../Slider';
import { Tab } from './kit';

type T = Dictionary['sims']['suites'];
type Kind = 'arithmetique' | 'geometrique' | 'recurrente';

/** Suites arithmétiques, géométriques et u(n+1) = a·u(n) + b : termes, somme, limite. */
export function SuitesSim({ t, predict }: { t: T; predict: Dictionary['lesson']['predict'] }) {
  const [kind, setKind] = useState<Kind>('geometrique');
  const [u0, setU0] = useState(2);
  const [r, setR] = useState(1.5);
  const [q, setQ] = useState(0.8);
  const [a, setA] = useState(0.5);
  const [b, setB] = useState(3);
  const [n, setN] = useState(15);

  const terms: number[] = [u0];
  for (let i = 1; i <= n; i++) {
    const p = terms[i - 1];
    terms.push(kind === 'arithmetique' ? p + r : kind === 'geometrique' ? p * q : a * p + b);
  }
  const sum = terms.reduce((s, v) => s + v, 0);
  const max = Math.max(1, ...terms.map((v) => Math.abs(v)).filter(Number.isFinite));
  const W = 560;
  const H = 240;
  const Y = (v: number) => H / 2 - (v / max) * (H / 2 - 16);
  const limit =
    kind === 'arithmetique'
      ? r === 0
        ? fmt(u0, 2)
        : r > 0
          ? '+∞'
          : '−∞'
      : kind === 'geometrique'
        ? Math.abs(q) < 1
          ? '0'
          : q === 1
            ? fmt(u0, 2)
            : q > 1
              ? u0 > 0
                ? '+∞'
                : u0 < 0
                  ? '−∞'
                  : '0'
              : t.noLimit
        : Math.abs(a) < 1
          ? fmt(b / (1 - a), 3)
          : t.depends;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-2">
        {(['arithmetique', 'geometrique', 'recurrente'] as Kind[]).map((k) => (
          <Tab key={k} on={kind === k} onClick={() => setKind(k)}>
            {t.kinds[k]}
          </Tab>
        ))}
      </div>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="rounded-2xl border border-line bg-surface p-2">
          <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={t.title}>
            <line x1="0" x2={W} y1={Y(0)} y2={Y(0)} stroke="#64748b" />
            {kind === 'recurrente' && Math.abs(a) < 1 && <line x1="0" x2={W} y1={Y(b / (1 - a))} y2={Y(b / (1 - a))} stroke="#16a34a" strokeDasharray="5 4" />}
            {terms.map((v, i) => {
              const x = 20 + (i / n) * (W - 40);
              return Number.isFinite(v) ? (
                <g key={i}>
                  <line x1={x} x2={x} y1={Y(0)} y2={Y(v)} stroke="#93c5fd" strokeWidth={Math.max(2, (W / n) * 0.35)} />
                  <circle cx={x} cy={Y(v)} r="4.5" fill="#1d4ed8" />
                  {n <= 15 && (
                    <text x={x} y={Math.min(H - 4, Y(0) + 14)} fontSize="9" textAnchor="middle" fill="#64748b">{i}</text>
                  )}
                </g>
              ) : null;
            })}
          </svg>
          <p className="px-2 text-sm text-muted">{t.graph}</p>
        </div>
        <div className="flex flex-col gap-3">
          <Slider label="u₀" value={u0} min={-5} max={10} step={0.5} onChange={setU0} />
          {kind === 'arithmetique' && <Slider label={t.reason + ' r'} value={r} min={-3} max={3} step={0.5} onChange={setR} />}
          {kind === 'geometrique' && <Slider label={t.reason + ' q'} value={q} min={-1.5} max={2} step={0.1} onChange={setQ} />}
          {kind === 'recurrente' && (
            <>
              <Slider label="a" value={a} min={-1.2} max={1.5} step={0.1} onChange={setA} />
              <Slider label="b" value={b} min={-5} max={5} step={0.5} onChange={setB} />
            </>
          )}
          <Slider label={t.terms} value={n} min={5} max={40} step={1} onChange={setN} />
          <dl className="grid grid-cols-2 gap-2">
            <Readout label={`u${String(n).split('').map((c) => '₀₁₂₃₄₅₆₇₈₉'[Number(c)]).join('')}`} value={fmt(terms[n], 3)} strong />
            <Readout label={t.sum} value={fmt(sum, 2)} />
            <Readout label={t.limit} value={limit} />
          </dl>
          <p className="rounded-xl bg-paper px-3 py-2 text-sm">{t.formulas[kind]}</p>
        </div>
      </div>
      <PredictChallenges challenges={t.challenges.map((ch) => ({ ...ch, choices: [...ch.choices] }))} t={predict} />
    </div>
  );
}
