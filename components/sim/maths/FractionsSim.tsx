'use client';

import { useState } from 'react';
import type { Dictionary } from '@/lib/i18n';
import { PredictChallenges } from '../PredictChallenges';
import { fmt, Slider } from '../Slider';
import { Tab } from './kit';

type T = Dictionary['sims']['fractions'];
type Mode = 'representer' | 'comparer' | 'additionner';

const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a));
const lcm = (a: number, b: number) => (a * b) / gcd(a, b);

/** Barre partagée en `den` parts, dont `num` sont colorées (peut dépasser 1 unité). */
function Bar({ num, den, color, y, label, width = 480 }: { num: number; den: number; color: string; y: number; label: string; width?: number }) {
  const units = Math.max(1, Math.ceil(num / den));
  const uw = width / Math.max(2, units);
  return (
    <g>
      {Array.from({ length: units * den }, (_, i) => (
        <rect key={i} x={60 + i * (uw / den)} y={y} width={uw / den} height="34" fill={i < num ? color : '#f8fafc'} stroke="#334155" strokeWidth={i % den === 0 ? 2.5 : 1} />
      ))}
      <text x="50" y={y + 23} fontSize="16" fontWeight="700" textAnchor="end" fill="#0f172a">
        {label}
      </text>
    </g>
  );
}

function Pie({ num, den, color }: { num: number; den: number; color: string }) {
  const r = 70;
  const parts = Array.from({ length: den }, (_, i) => {
    const a0 = (i / den) * 2 * Math.PI - Math.PI / 2;
    const a1 = ((i + 1) / den) * 2 * Math.PI - Math.PI / 2;
    const d = den === 1 ? `M ${-r} 0 A ${r} ${r} 0 1 1 ${r} 0 A ${r} ${r} 0 1 1 ${-r} 0` : `M0 0 L ${r * Math.cos(a0)} ${r * Math.sin(a0)} A ${r} ${r} 0 0 1 ${r * Math.cos(a1)} ${r * Math.sin(a1)} Z`;
    return <path key={i} d={d} fill={i < Math.min(num, den) ? color : '#f8fafc'} stroke="#334155" strokeWidth="1.5" />;
  });
  return (
    <svg viewBox="-80 -80 160 160" className="mx-auto h-40 w-40" aria-hidden="true">
      {parts}
    </svg>
  );
}

/** Fractions : représenter, comparer, additionner avec des barres et des disques. */
export function FractionsSim({ t, predict }: { t: T; predict: Dictionary['lesson']['predict'] }) {
  const [mode, setMode] = useState<Mode>('representer');
  const [a, setA] = useState(3);
  const [b, setB] = useState(4);
  const [c, setC] = useState(2);
  const [d, setD] = useState(3);
  const g = gcd(a, b);
  const m = lcm(b, d);
  const sumNum = a * (m / b) + c * (m / d);
  const gs = gcd(sumNum, m);
  const cmp = a * d - c * b;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-2">
        {(['representer', 'comparer', 'additionner'] as Mode[]).map((k) => (
          <Tab key={k} on={mode === k} onClick={() => setMode(k)}>
            {t.modes[k]}
          </Tab>
        ))}
      </div>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="rounded-2xl border border-line bg-surface p-3">
          {mode === 'representer' && (
            <>
              <Pie num={a} den={b} color="#f59e0b" />
              <svg viewBox="0 0 560 60" className="h-auto w-full" aria-hidden="true">
                <Bar num={a} den={b} color="#f59e0b" y={10} label={`${a}/${b}`} />
              </svg>
            </>
          )}
          {mode === 'comparer' && (
            <svg viewBox="0 0 560 110" className="h-auto w-full" aria-hidden="true">
              <Bar num={a} den={b} color="#f59e0b" y={10} label={`${a}/${b}`} />
              <Bar num={c} den={d} color="#3b82f6" y={62} label={`${c}/${d}`} />
            </svg>
          )}
          {mode === 'additionner' && (
            <svg viewBox="0 0 560 170" className="h-auto w-full" aria-hidden="true">
              <Bar num={a * (m / b)} den={m} color="#f59e0b" y={10} label={`${a}/${b}`} />
              <Bar num={c * (m / d)} den={m} color="#3b82f6" y={60} label={`${c}/${d}`} />
              <Bar num={sumNum} den={m} color="#16a34a" y={120} label="=" />
            </svg>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <Slider label={t.numerator} value={a} min={0} max={12} step={1} onChange={setA} />
          <Slider label={t.denominator} value={b} min={1} max={12} step={1} onChange={setB} />
          {mode !== 'representer' && (
            <>
              <Slider label={t.numerator2} value={c} min={0} max={12} step={1} onChange={setC} />
              <Slider label={t.denominator2} value={d} min={1} max={12} step={1} onChange={setD} />
            </>
          )}
          <div className="rounded-xl bg-ink px-4 py-3 text-on-ink">
            {mode === 'representer' && (
              <p className="font-serif text-xl">
                {a}/{b} = {a / g}/{b / g} = {fmt(a / b, 3)} = {fmt((100 * a) / b, 1)} %
              </p>
            )}
            {mode === 'comparer' && (
              <p className="font-serif text-xl">
                {a}/{b} {cmp > 0 ? '>' : cmp < 0 ? '<' : '='} {c}/{d}
              </p>
            )}
            {mode === 'additionner' && (
              <p className="font-serif text-xl">
                {a}/{b} + {c}/{d} = {a * (m / b)}/{m} + {c * (m / d)}/{m} = {sumNum}/{m}
                {gs > 1 && ` = ${sumNum / gs}/${m / gs}`}
              </p>
            )}
          </div>
          <p className="text-sm text-muted">{t.notes[mode]}</p>
        </div>
      </div>
      <PredictChallenges challenges={t.challenges.map((ch) => ({ ...ch, choices: [...ch.choices] }))} t={predict} />
    </div>
  );
}
