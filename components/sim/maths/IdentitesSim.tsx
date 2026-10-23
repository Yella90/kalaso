'use client';

import { useState } from 'react';
import type { Dictionary } from '@/lib/i18n';
import { PredictChallenges } from '../PredictChallenges';
import { fmt, Slider } from '../Slider';
import { Tab } from './kit';

type T = Dictionary['sims']['identites'];
type Kind = 'somme' | 'difference' | 'produit';

/** Identités remarquables vues comme des découpages d’aires. */
export function IdentitesSim({ t, predict }: { t: T; predict: Dictionary['lesson']['predict'] }) {
  const [kind, setKind] = useState<Kind>('somme');
  const [a, setA] = useState(5);
  const [b, setB] = useState(2);
  const S = 34; // pixels par unité
  const W = 10 * S + 40;
  const bb = kind === 'somme' ? b : Math.min(b, a - 0.5);

  const rect = (x: number, y: number, w: number, h: number, fill: string, label: string, opacity = 1) => (
    <g>
      <rect x={20 + x * S} y={20 + y * S} width={w * S} height={h * S} fill={fill} fillOpacity={opacity} stroke="#0f172a" strokeWidth="1.5" />
      {w * h > 0.6 && (
        <text x={20 + (x + w / 2) * S} y={20 + (y + h / 2) * S + 5} fontSize="15" fontWeight="700" textAnchor="middle" fill="#0f172a">
          {label}
        </text>
      )}
    </g>
  );

  const result = kind === 'somme' ? (a + bb) ** 2 : kind === 'difference' ? (a - bb) ** 2 : (a + bb) * (a - bb);
  const expanded = kind === 'somme' ? a * a + 2 * a * bb + bb * bb : kind === 'difference' ? a * a - 2 * a * bb + bb * bb : a * a - bb * bb;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-2">
        {(['somme', 'difference', 'produit'] as Kind[]).map((k) => (
          <Tab key={k} on={kind === k} onClick={() => setKind(k)}>
            {t.kinds[k]}
          </Tab>
        ))}
      </div>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="rounded-2xl border border-line bg-surface p-2">
          <svg viewBox={`0 0 ${W} ${W}`} className="h-auto w-full" role="img" aria-label={t.title}>
            {kind === 'somme' && (
              <>
                {rect(0, 0, a, a, '#93c5fd', 'a²')}
                {rect(a, 0, bb, a, '#fde68a', 'ab')}
                {rect(0, a, a, bb, '#fde68a', 'ab')}
                {rect(a, a, bb, bb, '#fca5a5', 'b²')}
                <rect x="20" y="20" width={(a + bb) * S} height={(a + bb) * S} fill="none" stroke="#0f172a" strokeWidth="4" />
              </>
            )}
            {kind === 'difference' && (
              <>
                {/* Le carré a², moins deux bandes ab qui se chevauchent sur un carré b². */}
                {rect(0, 0, a, a, '#f1f5f9', '')}
                {rect(0, 0, a - bb, a - bb, '#93c5fd', '(a − b)²')}
                {rect(a - bb, 0, bb, a, '#f59e0b', '', 0.45)}
                {rect(0, a - bb, a, bb, '#f59e0b', '', 0.45)}
                <text x={20 + (a - bb / 2) * S} y={20 + ((a - bb) / 2) * S} fontSize="13" fontWeight="700" textAnchor="middle">ab</text>
                <text x={20 + ((a - bb) / 2) * S} y={20 + (a - bb / 2) * S + 5} fontSize="13" fontWeight="700" textAnchor="middle">ab</text>
                <text x={20 + (a - bb / 2) * S} y={20 + (a - bb / 2) * S + 5} fontSize="12" fontWeight="700" textAnchor="middle">b²</text>
                <text x={20 + (a / 2) * S} y={20 + a * S + 18} fontSize="11" textAnchor="middle">{t.overlap}</text>
              </>
            )}
            {kind === 'produit' && (
              <>
                {rect(0, 0, a, a - bb, '#93c5fd', 'a(a − b)')}
                {rect(a, 0, bb, a - bb, '#fde68a', 'b(a − b)')}
                {rect(0, a - bb + 0.3, a, bb, '#e2e8f0', '')}
                {rect(a - bb, a - bb + 0.3, bb, bb, '#fca5a5', 'b²')}
                <text x={20 + ((a - bb) / 2) * S} y={20 + (a + 0.3 - bb / 2) * S + 5} fontSize="12" textAnchor="middle">{t.removed}</text>
              </>
            )}
          </svg>
        </div>
        <div className="flex flex-col gap-3">
          <Slider label="a" value={a} min={2} max={7} step={0.5} onChange={setA} />
          <Slider label="b" value={b} min={0.5} max={3} step={0.5} onChange={setB} />
          <p className="rounded-xl bg-ink px-4 py-3 font-serif text-xl text-on-ink">{t.formulas[kind]}</p>
          <p className="rounded-xl bg-paper px-3 py-2 text-sm">
            {t.check} : {fmt(result, 2)} = {fmt(expanded, 2)}
          </p>
          <p className="text-sm text-muted">{t.notes[kind]}</p>
        </div>
      </div>
      <PredictChallenges challenges={t.challenges.map((ch) => ({ ...ch, choices: [...ch.choices] }))} t={predict} />
    </div>
  );
}
