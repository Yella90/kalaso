'use client';

import Link from 'next/link';
import { useState, type ReactNode } from 'react';
import { format, type Dictionary } from '@/lib/i18n';
import { completeMission, resetAdventure, useProgress } from '@/lib/progress/store';

export interface RenderedMission {
  id: string;
  title: ReactNode;
  story: ReactNode;
  data: ReactNode[];
  notions: { href: string; label: string }[];
  question: ReactNode;
  /** Défi numérique : valeur, unité et tolérance relative. Défi à choix : les réponses rendues. */
  numeric?: { answer: number; unit: string; tolerance: number };
  choices?: ReactNode[];
  answer?: number;
  hints: ReactNode[];
  solution: ReactNode[];
  debrief: ReactNode;
}

/** Lit « 12,5 », « 12.5 » ou « 1 000 ». */
function parseNumber(value: string): number | null {
  const cleaned = value.replace(/\s/g, '').replace(',', '.');
  if (!/^-?\d+(\.\d+)?(e-?\d+)?$/i.test(cleaned)) return null;
  return Number(cleaned);
}

export function AdventureRunner({
  adventureId,
  missions,
  outro,
  freeCount,
  lockedPanel,
  t,
}: {
  adventureId: string;
  missions: RenderedMission[];
  outro: ReactNode;
  /** Nombre de missions ouvertes sans accès annuel (toutes si l'élève est activé). */
  freeCount: number;
  /** Encart affiché à la place des missions réservées. */
  lockedPanel: ReactNode;
  t: Dictionary['adventure'];
}) {
  const progress = useProgress();
  const done = progress.adventures[adventureId] ?? [];
  const firstOpen = missions.findIndex((m) => !done.includes(m.id));
  const finished = firstOpen === -1;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-bold">{format(t.progress, { n: done.length, total: missions.length })}</p>
        {done.length > 0 && (
          <button type="button" onClick={() => resetAdventure(adventureId)} className="text-sm text-muted underline">
            {t.reset}
          </button>
        )}
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-line" aria-hidden="true">
        <div className="h-full bg-[var(--subject)] transition-[width]" style={{ width: `${(done.length / missions.length) * 100}%` }} />
      </div>

      <ol className="mt-2 flex flex-col gap-4">
        {missions.map((mission, i) => {
          const isDone = done.includes(mission.id);
          if (!isDone && i >= freeCount) {
            // Missions réservées : l'encart n'apparaît qu'une fois, à la première d'entre elles.
            return i === Math.max(freeCount, firstOpen) ? <li key={mission.id}>{lockedPanel}</li> : null;
          }
          const locked = !isDone && i !== firstOpen;
          return (
            <li key={mission.id} className={`rounded-2xl border bg-surface ${i === firstOpen ? 'border-[var(--subject)] border-2' : 'border-line'}`}>
              <MissionCard
                index={i}
                mission={mission}
                state={isDone ? 'done' : locked ? 'locked' : 'open'}
                onSuccess={() => completeMission(adventureId, mission.id)}
                t={t}
              />
            </li>
          );
        })}
      </ol>

      {finished && (
        <section className="mt-4 rounded-2xl bg-ink p-6 text-on-ink">
          <h2 className="text-2xl">{t.done}</h2>
          <p className="mt-3 text-on-ink-muted">{outro}</p>
        </section>
      )}
    </div>
  );
}

function MissionCard({
  index,
  mission,
  state,
  onSuccess,
  t,
}: {
  index: number;
  mission: RenderedMission;
  state: 'done' | 'locked' | 'open';
  onSuccess: () => void;
  t: Dictionary['adventure'];
}) {
  const [value, setValue] = useState('');
  const [picked, setPicked] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<'wrong' | 'invalid' | null>(null);
  const [hintsShown, setHintsShown] = useState(0);
  const [showSolution, setShowSolution] = useState(false);

  const header = (
    <p className="flex items-baseline gap-3">
      <span className="text-sm font-bold text-muted">{format(t.mission, { n: index + 1 })}</span>
      <span className="font-serif text-xl font-bold">{mission.title}</span>
      {state === 'done' && <span className="ml-auto text-good" aria-label={t.correct}>✓</span>}
    </p>
  );

  if (state === 'locked') {
    return (
      <div className="p-4 opacity-60">
        {header}
        <p className="mt-1 text-sm text-muted">{t.locked}</p>
      </div>
    );
  }

  function check(event: React.FormEvent) {
    event.preventDefault();
    if (mission.numeric) {
      const n = parseNumber(value);
      if (n === null) return setFeedback('invalid');
      const { answer, tolerance } = mission.numeric;
      if (Math.abs(n - answer) <= Math.abs(answer) * tolerance) {
        setFeedback(null);
        onSuccess();
      } else setFeedback('wrong');
    } else if (picked !== null) {
      if (picked === mission.answer) {
        setFeedback(null);
        onSuccess();
      } else setFeedback('wrong');
    }
  }

  return (
    <div className="p-4 sm:p-5">
      {header}
      <p className="mt-3">{mission.story}</p>
      {mission.data.length > 0 && (
        <div className="mt-3 rounded-xl bg-paper px-4 py-3">
          <p className="text-sm font-bold text-muted">{t.data}</p>
          <ul className="mt-1 list-disc space-y-1 pl-5">
            {mission.data.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </div>
      )}
      {mission.notions.length > 0 && (
        <p className="mt-3 text-sm">
          <span className="font-bold text-muted">{t.notions} : </span>
          {mission.notions.map((n, i) => (
            <span key={n.href}>
              {i > 0 && ', '}
              <Link href={n.href} className="underline">
                {n.label}
              </Link>
            </span>
          ))}
        </p>
      )}

      {state === 'open' ? (
        <form onSubmit={check} className="mt-4 rounded-xl border border-line p-4">
          <p className="font-bold">{mission.question}</p>
          {mission.numeric ? (
            <label className="mt-3 flex flex-wrap items-center gap-2">
              <span className="sr-only">{t.answerLabel}</span>
              <input
                inputMode="decimal"
                autoComplete="off"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={t.answerLabel}
                className="w-40 rounded-lg border-2 border-line bg-surface px-3 py-2 text-lg focus:border-ink focus:outline-none"
              />
              {mission.numeric.unit && <span className="font-bold">{mission.numeric.unit}</span>}
            </label>
          ) : (
            <div className="mt-3 grid gap-2">
              {mission.choices?.map((c, j) => (
                <button
                  key={j}
                  type="button"
                  aria-pressed={picked === j}
                  onClick={() => setPicked(j)}
                  className={`rounded-lg border-2 px-3 py-2 text-left ${picked === j ? 'border-ink bg-paper' : 'border-line hover:border-ink'}`}
                >
                  {c}
                </button>
              ))}
            </div>
          )}
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <button type="submit" className="rounded-full bg-ink px-5 py-2 font-bold text-on-ink hover:bg-ink-soft">
              {t.check}
            </button>
            {hintsShown < mission.hints.length && (
              <button type="button" onClick={() => setHintsShown((n) => n + 1)} className="font-bold underline">
                {t.showHint}
              </button>
            )}
            {feedback === 'wrong' && !showSolution && (
              <button type="button" onClick={() => setShowSolution(true)} className="text-muted underline">
                {t.solution}
              </button>
            )}
          </div>
          <div role="status" className="mt-2">
            {feedback === 'wrong' && <p className="font-bold text-alert-ink">{t.wrong}</p>}
            {feedback === 'invalid' && <p className="font-bold text-alert-ink">{t.invalid}</p>}
          </div>
          {mission.hints.slice(0, hintsShown).map((h, i) => (
            <p key={i} className="mt-2 rounded-lg border border-dashed border-line px-3 py-2">
              <span className="font-bold">{format(t.hint, { n: i + 1 })} : </span>
              {h}
            </p>
          ))}
          {showSolution && <Solution lines={mission.solution} />}
        </form>
      ) : (
        <div className="mt-4 rounded-xl bg-good-soft p-4">
          <p className="font-bold text-good">{t.correct}</p>
          <p className="mt-1">{mission.debrief}</p>
          <details className="mt-2">
            <summary className="cursor-pointer font-bold">{t.solution}</summary>
            <Solution lines={mission.solution} />
          </details>
        </div>
      )}
    </div>
  );
}

function Solution({ lines }: { lines: ReactNode[] }) {
  return (
    <div className="mt-3 space-y-2 rounded-lg bg-paper px-4 py-3">
      {lines.map((line, i) => (
        <p key={i}>{line}</p>
      ))}
    </div>
  );
}
