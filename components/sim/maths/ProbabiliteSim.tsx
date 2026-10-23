'use client';

import { useState } from 'react';
import type { Dictionary } from '@/lib/i18n';
import { PredictChallenges } from '../PredictChallenges';
import { fmt, Readout, Slider } from '../Slider';

type T = Dictionary['sims']['probabilite'];
type Exp = 'piece' | 'de' | 'deuxdes' | 'urne';

interface State {
  counts: number[];
  /** Fréquence de l’événement suivi après chaque tirage (échantillonnée). */
  track: number[];
  hits: number;
  total: number;
  last: number[];
}

const EMPTY = (size: number): State => ({ counts: Array(size).fill(0), track: [], hits: 0, total: 0, last: [] });

function outcomes(exp: Exp, red: number, green: number) {
  if (exp === 'piece') return { labels: ['P', 'F'], probs: [0.5, 0.5] };
  if (exp === 'de') return { labels: ['1', '2', '3', '4', '5', '6'], probs: Array(6).fill(1 / 6) };
  if (exp === 'deuxdes') {
    const probs = Array.from({ length: 11 }, (_, i) => (6 - Math.abs(i + 2 - 7)) / 36);
    return { labels: Array.from({ length: 11 }, (_, i) => String(i + 2)), probs };
  }
  const tot = red + green || 1;
  return { labels: ['R', 'V'], probs: [red / tot, green / tot] };
}

function Die({ v }: { v: number }) {
  const dots: Record<number, [number, number][]> = {
    1: [[1, 1]],
    2: [[0, 0], [2, 2]],
    3: [[0, 0], [1, 1], [2, 2]],
    4: [[0, 0], [2, 0], [0, 2], [2, 2]],
    5: [[0, 0], [2, 0], [1, 1], [0, 2], [2, 2]],
    6: [[0, 0], [2, 0], [0, 1], [2, 1], [0, 2], [2, 2]],
  };
  return (
    <svg viewBox="0 0 60 60" className="h-14 w-14" aria-label={String(v)}>
      <rect x="3" y="3" width="54" height="54" rx="10" fill="#fff" stroke="#1e293b" strokeWidth="3" />
      {dots[v]?.map(([x, y], i) => (
        <circle key={i} cx={15 + x * 15} cy={15 + y * 15} r="5" fill="#1e293b" />
      ))}
    </svg>
  );
}

/** Expériences aléatoires répétées : la fréquence se rapproche de la probabilité. */
export function ProbabiliteSim({ t, predict }: { t: T; predict: Dictionary['lesson']['predict'] }) {
  const [exp, setExp] = useState<Exp>('de');
  const [red, setRed] = useState(3);
  const [green, setGreen] = useState(2);
  const [event, setEvent] = useState(5); // indice de l’issue suivie
  const { labels, probs } = outcomes(exp, red, green);
  const [s, setS] = useState<State>(EMPTY(6));

  function choose(e: Exp) {
    setExp(e);
    const size = outcomes(e, red, green).labels.length;
    setS(EMPTY(size));
    setEvent(e === 'de' ? 5 : e === 'deuxdes' ? 5 : 0);
  }

  function draw(): number[] {
    if (exp === 'deuxdes') {
      const a = 1 + Math.floor(Math.random() * 6);
      const b = 1 + Math.floor(Math.random() * 6);
      return [a + b - 2, a, b];
    }
    const u = Math.random();
    let acc = 0;
    for (let i = 0; i < probs.length; i++) {
      acc += probs[i];
      if (u < acc) return [i];
    }
    return [probs.length - 1];
  }

  function run(times: number) {
    setS((prev) => {
      const counts = [...prev.counts];
      const track = [...prev.track];
      let hits = prev.hits;
      let total = prev.total;
      let last: number[] = prev.last;
      for (let k = 0; k < times; k++) {
        last = draw();
        counts[last[0]]++;
        total++;
        if (last[0] === event) hits++;
        // On garde au plus 400 points pour la courbe.
        if (total <= 50 || total % Math.ceil(total / 200) === 0) track.push(hits / total);
      }
      return { counts, track: track.slice(-400), hits, total, last };
    });
  }

  const freq = s.total ? s.hits / s.total : 0;
  const maxBar = Math.max(...probs, ...s.counts.map((c) => (s.total ? c / s.total : 0)), 0.05);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-2">
        {(['piece', 'de', 'deuxdes', 'urne'] as Exp[]).map((e) => (
          <button
            key={e}
            type="button"
            aria-pressed={exp === e}
            onClick={() => choose(e)}
            className={`rounded-full border-2 px-3 py-1 text-sm font-bold ${exp === e ? 'border-ink bg-ink text-on-ink' : 'border-line bg-surface'}`}
          >
            {t.experiments[e]}
          </button>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="flex flex-col gap-3">
          <div className="flex min-h-20 items-center gap-3 rounded-2xl border border-line bg-surface p-3">
            {s.total === 0 ? (
              <p className="text-muted">{t.ready}</p>
            ) : exp === 'de' ? (
              <Die v={s.last[0] + 1} />
            ) : exp === 'deuxdes' ? (
              <>
                <Die v={s.last[1]} />
                <Die v={s.last[2]} />
                <span className="font-serif text-2xl font-bold">= {s.last[0] + 2}</span>
              </>
            ) : (
              <span
                className="grid h-14 w-14 place-items-center rounded-full text-xl font-bold text-white"
                style={{ background: exp === 'piece' ? '#a16207' : s.last[0] === 0 ? '#dc2626' : '#16a34a' }}
              >
                {labels[s.last[0]]}
              </span>
            )}
            <div className="ml-auto flex flex-wrap gap-2">
              {[1, 10, 100, 1000].map((n) => (
                <button key={n} type="button" onClick={() => run(n)} className="rounded-full bg-ink px-4 py-2 text-sm font-bold text-on-ink">
                  ×{n}
                </button>
              ))}
              <button type="button" onClick={() => setS(EMPTY(labels.length))} className="text-sm text-muted underline">
                {t.reset}
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-surface p-3">
            <p className="text-sm font-bold text-muted">{t.bars}</p>
            <svg viewBox="0 0 400 170" className="h-auto w-full" role="img" aria-label={t.bars}>
              {labels.map((l, i) => {
                const bw = 360 / labels.length;
                const x = 20 + i * bw;
                const f = s.total ? s.counts[i] / s.total : 0;
                const hf = (f / maxBar) * 130;
                const hp = (probs[i] / maxBar) * 130;
                return (
                  <g key={l} onClick={() => { setEvent(i); setS((p) => ({ ...p, hits: p.counts[i], track: [] })); }} style={{ cursor: 'pointer' }}>
                    <rect x={x + 4} y={145 - hf} width={bw - 8} height={hf} rx="3" fill={i === event ? '#f59e0b' : '#93c5fd'} />
                    <line x1={x + 2} x2={x + bw - 2} y1={145 - hp} y2={145 - hp} stroke="#dc2626" strokeWidth="2.5" />
                    <text x={x + bw / 2} y="162" fontSize="12" textAnchor="middle" fill="currentColor" fontWeight={i === event ? 700 : 400}>{l}</text>
                  </g>
                );
              })}
            </svg>
            <p className="text-xs text-muted">{t.barsLegend}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {exp === 'urne' && (
            <>
              <Slider label={t.red} value={red} min={0} max={10} step={1} onChange={(v) => { setRed(v); setS(EMPTY(2)); }} />
              <Slider label={t.green} value={green} min={0} max={10} step={1} onChange={(v) => { setGreen(v); setS(EMPTY(2)); }} />
            </>
          )}
          <dl className="grid grid-cols-2 gap-2">
            <Readout label={t.trials} value={String(s.total)} />
            <Readout label={`${t.event} « ${labels[event]} »`} value={String(s.hits)} />
            <Readout label={t.frequency} value={fmt(freq, 3)} strong />
            <Readout label={t.probability} value={fmt(probs[event], 3)} />
          </dl>
          <div className="rounded-2xl border border-line bg-surface p-3">
            <p className="text-sm font-bold text-muted">{t.convergence}</p>
            <svg viewBox="0 0 300 120" className="h-auto w-full" role="img" aria-label={t.convergence}>
              <rect x="0" y="0" width="300" height="110" fill="#f8fafc" />
              <line x1="0" x2="300" y1={110 - probs[event] * 100} y2={110 - probs[event] * 100} stroke="#dc2626" strokeWidth="2" strokeDasharray="5 4" />
              <polyline
                points={s.track.map((f, i) => `${((i / Math.max(1, s.track.length - 1)) * 300).toFixed(1)},${(110 - f * 100).toFixed(1)}`).join(' ')}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2"
              />
            </svg>
          </div>
          <p className="text-sm text-muted">{t.hint}</p>
        </div>
      </div>
      <PredictChallenges challenges={t.challenges.map((c) => ({ ...c, choices: [...c.choices] }))} t={predict} />
    </div>
  );
}
