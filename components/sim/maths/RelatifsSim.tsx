'use client';

import { useState } from 'react';
import type { Dictionary } from '@/lib/i18n';
import { PredictChallenges } from '../PredictChallenges';
import { fmt, Slider } from '../Slider';
import { Tab } from './kit';

type T = Dictionary['sims']['relatifs'];
type Op = 'addition' | 'soustraction' | 'multiplication';

const MIN = -12;
const MAX = 12;
const W = 640;
const X = (v: number) => 20 + ((v - MIN) / (MAX - MIN)) * (W - 40);

/** Droite graduée : additionner, soustraire et multiplier des nombres relatifs par des déplacements. */
export function RelatifsSim({ t, predict }: { t: T; predict: Dictionary['lesson']['predict'] }) {
  const [op, setOp] = useState<Op>('addition');
  const [a, setA] = useState(-3);
  const [b, setB] = useState(5);
  const result = op === 'addition' ? a + b : op === 'soustraction' ? a - b : a * b;
  const step = op === 'soustraction' ? -b : b;
  const inRange = result >= MIN && result <= MAX;

  // Pour la multiplication : |b| bonds de longueur a (dans le sens de a si b > 0, opposé si b < 0).
  const hops = op === 'multiplication' ? Array.from({ length: Math.abs(b) }, (_, i) => i) : [];
  const hopLen = op === 'multiplication' ? (b >= 0 ? a : -a) : 0;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-2">
        {(['addition', 'soustraction', 'multiplication'] as Op[]).map((k) => (
          <Tab key={k} on={op === k} onClick={() => setOp(k)}>
            {t.ops[k]}
          </Tab>
        ))}
      </div>
      <div className="rounded-2xl border border-line bg-surface p-2">
        <svg viewBox={`0 0 ${W} 170`} className="h-auto w-full" role="img" aria-label={t.title}>
          <defs>
            <marker id="fl-rel" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#f59e0b" /></marker>
            <marker id="fl-rel2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#2563eb" /></marker>
          </defs>
          <line x1="10" x2={W - 10} y1="120" y2="120" stroke="#0f172a" strokeWidth="2" />
          {Array.from({ length: MAX - MIN + 1 }, (_, i) => {
            const v = MIN + i;
            return (
              <g key={v}>
                <line x1={X(v)} x2={X(v)} y1={v === 0 ? 108 : 114} y2="126" stroke="#0f172a" strokeWidth={v === 0 ? 2.5 : 1} />
                <text x={X(v)} y="144" fontSize="11" textAnchor="middle" fill={v < 0 ? '#dc2626' : v > 0 ? '#2563eb' : '#0f172a'}>
                  {v}
                </text>
              </g>
            );
          })}
          {op !== 'multiplication' ? (
            <>
              <path d={`M${X(0)} 112 Q ${(X(0) + X(a)) / 2} ${a === 0 ? 112 : 70} ${X(a)} 112`} fill="none" stroke="#2563eb" strokeWidth="3" markerEnd="url(#fl-rel2)" />
              <text x={(X(0) + X(a)) / 2} y="62" fontSize="13" textAnchor="middle" fill="#2563eb" fontWeight="700">{fmt(a, 0)}</text>
              {inRange && (
                <>
                  <path d={`M${X(a)} 112 Q ${(X(a) + X(result)) / 2} 26 ${X(result)} 112`} fill="none" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#fl-rel)" />
                  <text x={(X(a) + X(result)) / 2} y="20" fontSize="13" textAnchor="middle" fill="#b45309" fontWeight="700">
                    {step >= 0 ? `+${step}` : step}
                  </text>
                </>
              )}
            </>
          ) : (
            hops.map((i) =>
              Math.abs(hopLen * (i + 1)) <= MAX ? (
                <path key={i} d={`M${X(hopLen * i)} 112 Q ${X(hopLen * (i + 0.5))} ${80 - (i % 2) * 18} ${X(hopLen * (i + 1))} 112`} fill="none" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#fl-rel)" />
              ) : null,
            )
          )}
          {inRange && <circle cx={X(result)} cy="120" r="9" fill="#16a34a" stroke="#fff" strokeWidth="2" />}
        </svg>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Slider label="a" value={a} min={op === 'multiplication' ? -6 : -10} max={op === 'multiplication' ? 6 : 10} step={1} onChange={setA} />
        <Slider label="b" value={b} min={op === 'multiplication' ? -4 : -10} max={op === 'multiplication' ? 4 : 10} step={1} onChange={setB} />
      </div>
      <p className="rounded-xl bg-ink px-4 py-3 font-serif text-2xl text-on-ink">
        ({a}) {op === 'addition' ? '+' : op === 'soustraction' ? '−' : '×'} ({b}) = {result}
        {!inRange && <span className="ml-2 text-base text-on-ink-muted">({t.outOfRange})</span>}
      </p>
      <p className="text-sm text-muted">{t.notes[op]}</p>
      <PredictChallenges challenges={t.challenges.map((ch) => ({ ...ch, choices: [...ch.choices] }))} t={predict} />
    </div>
  );
}
