'use client';

import { useState, type ReactNode } from 'react';
import { format, type Dictionary } from '@/lib/i18n';

export interface RenderedQuestion {
  question: ReactNode;
  choices: ReactNode[];
  answer: number;
  explanation: ReactNode;
}

/** Quiz à correction immédiate : une réponse par question, puis l'explication. */
export function QuizRunner({ questions, t }: { questions: RenderedQuestion[]; t: Dictionary['lesson'] }) {
  const [picked, setPicked] = useState<(number | null)[]>(() => questions.map(() => null));
  const answered = picked.filter((p) => p !== null).length;
  const score = picked.filter((p, i) => p === questions[i].answer).length;

  return (
    <div className="mt-4 flex flex-col gap-4">
      {questions.map((q, i) => {
        const choice = picked[i];
        const done = choice !== null;
        return (
          <fieldset key={i} className="rounded-xl border border-line bg-surface p-4">
            <legend className="sr-only">{format(t.question, { n: i + 1, total: questions.length })}</legend>
            <p className="text-sm text-muted" aria-hidden="true">
              {format(t.question, { n: i + 1, total: questions.length })}
            </p>
            <p className="mt-1 font-bold">{q.question}</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {q.choices.map((c, j) => {
                const isAnswer = j === q.answer;
                const isPicked = j === choice;
                let style = 'border-line hover:border-ink';
                if (done && isAnswer) style = 'border-good bg-good-soft';
                else if (done && isPicked) style = 'border-alert bg-alert-soft';
                else if (done) style = 'border-line opacity-60';
                return (
                  <button
                    key={j}
                    type="button"
                    disabled={done}
                    aria-pressed={isPicked}
                    onClick={() => setPicked((p) => p.map((v, k) => (k === i ? j : v)))}
                    className={`rounded-lg border-2 px-3 py-2 text-left ${style}`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
            {done && (
              <div role="status" className="mt-3">
                <p className={`font-bold ${choice === q.answer ? 'text-good' : 'text-alert-ink'}`}>
                  {choice === q.answer ? t.correct : t.wrong}
                </p>
                <p className="mt-1">{q.explanation}</p>
              </div>
            )}
          </fieldset>
        );
      })}
      {answered === questions.length && (
        <div className="flex flex-wrap items-center gap-4 rounded-xl bg-ink px-4 py-3 text-on-ink">
          <p className="font-serif text-xl font-bold">{format(t.score, { n: score, total: questions.length })}</p>
          <button
            type="button"
            onClick={() => setPicked(questions.map(() => null))}
            className="rounded-full border border-on-ink-muted/60 px-4 py-1.5 font-bold hover:border-on-ink"
          >
            {t.restart}
          </button>
        </div>
      )}
    </div>
  );
}
