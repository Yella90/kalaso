'use client';

import { useState } from 'react';
import { format, type Dictionary } from '@/lib/i18n';

export interface PredictChallenge {
  q: string;
  choices: string[];
  answer: number;
  /** Comment vérifier dans la simulation. */
  how: string;
  /** L’explication, montrée après la vérification. */
  why: string;
}

/**
 * Défis « prédis, puis vérifie » : l’élève choisit une réponse, la vérifie en manipulant
 * la simulation, puis lit l’explication.
 */
export function PredictChallenges({ challenges, t }: { challenges: PredictChallenge[]; t: Dictionary['lesson']['predict'] }) {
  const [index, setIndex] = useState<number | null>(null);
  const [picked, setPicked] = useState<number | null>(null);
  const [shown, setShown] = useState(false);
  const [score, setScore] = useState(0);

  const c = index !== null ? challenges[index] : null;

  function restart() {
    setIndex(0);
    setPicked(null);
    setShown(false);
    setScore(0);
  }

  return (
    <section className="rounded-2xl border border-slate-700 bg-slate-900 p-4 text-slate-100">
      <p className="text-sm font-bold text-amber-300">{t.title}</p>
      {index === null ? (
        <>
          <p className="mt-1 text-sm text-slate-300">{format(t.intro, { n: challenges.length })}</p>
          <button type="button" onClick={restart} className="mt-3 rounded-full bg-amber-300 px-4 py-2 font-bold text-slate-950">
            {t.start}
          </button>
        </>
      ) : !c ? (
        <>
          <p className="mt-1 font-bold">{format(t.done, { n: score, total: challenges.length })}</p>
          <button type="button" onClick={restart} className="mt-2 text-sm underline">
            {t.again}
          </button>
        </>
      ) : (
        <>
          <p className="mt-1 text-xs text-slate-400">{format(t.progress, { n: index + 1, total: challenges.length })}</p>
          <p className="mt-1 font-bold">{c.q}</p>
          <div className="mt-2 grid gap-1.5">
            {c.choices.map((choice, j) => (
              <button
                key={choice}
                type="button"
                disabled={picked !== null}
                onClick={() => {
                  setPicked(j);
                  if (j === c.answer) setScore((s) => s + 1);
                }}
                className={`rounded-lg border-2 px-3 py-1.5 text-left text-sm ${
                  picked === null
                    ? 'border-slate-600 hover:border-amber-300'
                    : picked === j
                      ? 'border-amber-300 bg-amber-300/15'
                      : 'border-transparent opacity-60'
                }`}
              >
                {choice}
              </button>
            ))}
          </div>
          {picked !== null && (
            <div className="mt-3 rounded-xl bg-slate-800 p-3 text-sm">
              <p>
                <span className="font-bold text-sky-300">{t.verify} </span>
                {c.how}
              </p>
              {!shown ? (
                <button type="button" onClick={() => setShown(true)} className="mt-2 rounded-full border border-slate-500 px-3 py-1 font-bold">
                  {t.reveal}
                </button>
              ) : (
                <>
                  <p className={`mt-2 font-bold ${picked === c.answer ? 'text-emerald-300' : 'text-amber-200'}`}>
                    {picked === c.answer ? t.right : format(t.wrong, { answer: c.choices[c.answer] })}
                  </p>
                  <p className="mt-1 text-slate-300">{c.why}</p>
                  <button
                    type="button"
                    onClick={() => {
                      setIndex(index + 1);
                      setPicked(null);
                      setShown(false);
                    }}
                    className="mt-2 rounded-full bg-amber-300 px-4 py-1.5 font-bold text-slate-950"
                  >
                    {t.next}
                  </button>
                </>
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
}
