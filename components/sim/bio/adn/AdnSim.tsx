'use client';

import dynamic from 'next/dynamic';
import { memo, useEffect, useRef, useState } from 'react';
import { Figure } from '@/components/figures/Figure';
import { format, type Dictionary } from '@/lib/i18n';
import { BASE_COLOR, PAIR, type AdnMode, type AdnSceneProps, type Base } from './AdnScene';

const AdnScene = memo(
  dynamic<AdnSceneProps>(() => import('./AdnScene'), {
    ssr: false,
    loading: () => <div className="grid h-full place-items-center text-slate-400">…</div>,
  }),
);

type T = Dictionary['sims']['adn-3d'];

const DEFAULT = 'ATGCGTACCTGAAT';
const DURATION = 14; // secondes pour une réplication complète

function parse(text: string): Base[] {
  return text
    .toUpperCase()
    .split('')
    .filter((c): c is Base => 'ATGC'.includes(c))
    .slice(0, 16);
}

function randomStrand(n: number) {
  return Array.from({ length: n }, () => 'ATGC'[Math.floor(Math.random() * 4)]).join('');
}

export function AdnSim({ t }: { t: T }) {
  const [started, setStarted] = useState(false);
  const [mode, setMode] = useState<AdnMode>('structure');
  const [text, setText] = useState(DEFAULT);
  const [selected, setSelected] = useState<number | null>(null);
  const [motion, setMotion] = useState(true);
  const [level, setLevel] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [shown, setShown] = useState(0);
  const progress = useRef(0);

  const parsed = parse(text);
  const sequence = parsed.length >= 4 ? parsed : parse(DEFAULT);

  // L’animation avance la réplication ; l’affichage du curseur suit à 10 images par seconde.
  useEffect(() => {
    if (!playing) return;
    let last = performance.now();
    let shownAt = 0;
    let raf = 0;
    const tick = (now: number) => {
      progress.current = Math.min(1, progress.current + (now - last) / 1000 / DURATION);
      last = now;
      if (now - shownAt > 100) {
        shownAt = now;
        setShown(progress.current);
      }
      if (progress.current >= 1) {
        setPlaying(false);
        setShown(1);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const [challenge, setChallenge] = useState('TACGGA');
  const [answer, setAnswer] = useState('');
  const [verdict, setVerdict] = useState<'right' | 'wrong' | null>(null);
  const expected = challenge
    .split('')
    .map((c) => PAIR[c as Base])
    .join('');

  if (!started) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-line bg-surface p-4 text-center sm:p-6">
        <div className="w-full max-w-lg">
          <Figure id="adn" />
        </div>
        <p className="max-w-md text-muted">{t.note}</p>
        <button type="button" onClick={() => setStarted(true)} className="rounded-full bg-ink px-6 py-3 font-bold text-on-ink hover:bg-ink-soft">
          {t.start}
        </button>
      </div>
    );
  }

  const pair = selected !== null && selected < sequence.length ? sequence[selected] : null;
  const lv = t.levels[level];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2" role="tablist">
        {(['structure', 'replication', 'compaction'] as const).map((m) => (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={mode === m}
            onClick={() => {
              setMode(m);
              setSelected(null);
            }}
            className={`rounded-full border-2 px-4 py-1.5 text-sm font-bold ${mode === m ? 'border-ink bg-ink text-on-ink' : 'border-line bg-surface'}`}
          >
            {t.modes[m]}
          </button>
        ))}
        <label className="ml-auto flex items-center gap-1.5 text-sm">
          <input type="checkbox" checked={motion} onChange={(e) => setMotion(e.target.checked)} className="h-4 w-4" />
          {t.motion}
        </label>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="relative h-[24rem] overflow-hidden rounded-2xl bg-[#0b1020] sm:h-[30rem]">
          <AdnScene mode={mode} sequence={sequence} progress={progress} level={level} selected={selected} onSelect={setSelected} motion={motion} />
          {mode === 'replication' && (
            <div className="pointer-events-none absolute left-3 top-3 flex flex-col gap-1 rounded-xl bg-slate-900/80 px-3 py-2 text-xs text-slate-100">
              <span><span className="mr-1 inline-block h-2.5 w-2.5 rounded-full bg-[#60a5fa]" />{t.legendOld}</span>
              <span><span className="mr-1 inline-block h-2.5 w-2.5 rounded-full bg-[#fb923c]" />{t.legendNew}</span>
              <span><span className="mr-1 inline-block h-2.5 w-2.5 rounded-full bg-[#facc15]" />{t.helicase}</span>
              <span><span className="mr-1 inline-block h-2.5 w-2.5 rounded-full bg-[#34d399]" />{t.polymerase}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3">
          {mode !== 'compaction' && (
            <section className="rounded-2xl border border-line bg-surface p-4">
              <label className="text-sm font-bold text-muted" htmlFor="adn-seq">
                {t.sequence}
              </label>
              <input
                id="adn-seq"
                value={text}
                onChange={(e) => {
                  setText(e.target.value.toUpperCase().replace(/[^ATGC]/g, '').slice(0, 16));
                  setSelected(null);
                }}
                spellCheck={false}
                autoComplete="off"
                className="mt-1 w-full rounded-lg border-2 border-line bg-surface px-3 py-2 font-mono text-lg tracking-[0.2em] focus:border-ink focus:outline-none"
              />
              <p className="mt-1 text-xs text-muted">{t.sequenceHelp}</p>
              <p className="mt-2 text-sm font-bold text-muted">{t.strand2}</p>
              <p className="font-mono text-lg tracking-[0.2em]">
                {sequence.map((b, i) => (
                  <span key={i} style={{ color: BASE_COLOR[PAIR[b]] }}>
                    {PAIR[b]}
                  </span>
                ))}
              </p>
            </section>
          )}

          {mode === 'structure' && (
            <section className="rounded-2xl border border-line bg-surface p-4">
              {pair && selected !== null ? (
                <>
                  <p className="font-serif text-xl font-bold">
                    <span style={{ color: BASE_COLOR[pair] }}>{pair}</span> – <span style={{ color: BASE_COLOR[PAIR[pair]] }}>{PAIR[pair]}</span>
                  </p>
                  <p className="mt-1">{format(t.pairInfo, { a: pair, b: PAIR[pair], n: pair === 'A' || pair === 'T' ? 2 : 3 })}</p>
                  <p className="mt-1 text-sm text-muted">{format(t.pairPosition, { n: selected + 1 })}</p>
                </>
              ) : (
                <p className="text-muted">{t.pickPair}</p>
              )}
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
                {t.facts.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </section>
          )}

          {mode === 'replication' && (
            <section className="rounded-2xl border border-line bg-surface p-4">
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (progress.current >= 1) progress.current = 0;
                    setPlaying((p) => !p);
                  }}
                  className="rounded-full bg-ink px-5 py-2 font-bold text-on-ink"
                >
                  {playing ? t.pause : t.play}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    progress.current = 0;
                    setShown(0);
                    setPlaying(false);
                  }}
                  className="rounded-full border-2 border-line px-4 py-2 font-bold"
                >
                  {t.replay}
                </button>
              </div>
              <label className="mt-3 block text-sm font-bold text-muted">
                {t.progress} : {Math.round(shown * 100)} %
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={shown}
                  onChange={(e) => {
                    progress.current = Number(e.target.value);
                    setShown(progress.current);
                    setPlaying(false);
                  }}
                  className="mt-1 h-8 w-full"
                />
              </label>
              <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm">
                {t.replicationSteps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
              {shown >= 1 && <p className="mt-3 rounded-lg bg-good-soft px-3 py-2 font-bold text-good">{t.replicationDone}</p>}
            </section>
          )}

          {mode === 'compaction' && (
            <section className="rounded-2xl border border-line bg-surface p-4">
              <label className="block text-sm font-bold text-muted">
                {t.level}
                <input type="range" min={0} max={3} step={1} value={level} onChange={(e) => setLevel(Number(e.target.value))} className="mt-1 h-8 w-full" />
              </label>
              <div className="flex justify-between text-xs text-muted" aria-hidden="true">
                {t.levels.map((l, i) => (
                  <span key={l.name} className={i === level ? 'font-bold text-ink' : ''}>
                    {i + 1}
                  </span>
                ))}
              </div>
              <p className="mt-3 font-serif text-xl font-bold">{lv.name}</p>
              <p className="text-sm font-bold text-muted">{lv.size}</p>
              <p className="mt-1">{lv.text}</p>
              <p className="mt-3 rounded-lg bg-paper px-3 py-2 text-sm">{t.lengthFact}</p>
            </section>
          )}

          {mode === 'structure' && (
            <section className="rounded-2xl bg-ink p-4 text-on-ink">
              <p className="text-sm font-bold text-on-ink-muted">{t.challenge}</p>
              <p className="mt-1 font-mono text-lg tracking-[0.2em]">{challenge}</p>
              <form
                className="mt-2 flex flex-wrap gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  setVerdict(answer.toUpperCase().replace(/[^ATGC]/g, '') === expected ? 'right' : 'wrong');
                }}
              >
                <input
                  value={answer}
                  onChange={(e) => {
                    setAnswer(e.target.value.toUpperCase());
                    setVerdict(null);
                  }}
                  aria-label={t.strand2}
                  spellCheck={false}
                  autoComplete="off"
                  className="w-40 rounded-lg border-2 border-on-ink-muted bg-transparent px-3 py-1.5 font-mono tracking-[0.2em] text-on-ink focus:outline-none"
                />
                <button type="submit" className="rounded-full bg-amber-300 px-4 py-1.5 font-bold text-slate-950">
                  {t.challengeCheck}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setChallenge(randomStrand(6 + Math.floor(Math.random() * 4)));
                    setAnswer('');
                    setVerdict(null);
                  }}
                  className="text-sm underline"
                >
                  {t.challengeNew}
                </button>
              </form>
              <div role="status" className="mt-2">
                {verdict === 'right' && <p className="font-bold text-emerald-300">{t.challengeRight}</p>}
                {verdict === 'wrong' && <p className="font-bold text-amber-200">{t.challengeWrong}</p>}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
