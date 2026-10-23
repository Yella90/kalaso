'use client';

import { useId, useState } from 'react';
import { checkNumber, checkText, type Verdict } from '@/lib/answers';
import type { Dictionary } from '@/lib/i18n';

export type CheckSpec =
  | { kind: 'number'; value: number; tolerance: number; unit: string; relative?: boolean }
  | { kind: 'text'; accepted: string[] };

/** Champ de réponse vérifié sur place ; la correction reste à côté, dans la page. */
export function AnswerCheck({ spec, t }: { spec: CheckSpec; t: Dictionary['lesson'] }) {
  const id = useId();
  const [value, setValue] = useState('');
  const [verdict, setVerdict] = useState<Verdict | null>(null);

  function check(event: React.FormEvent) {
    event.preventDefault();
    setVerdict(
      spec.kind === 'number'
        ? checkNumber(value, spec.value, spec.tolerance, spec.relative)
        : checkText(value, spec.accepted),
    );
  }

  const message =
    verdict === 'correct'
      ? t.answerCorrect
      : verdict === 'wrong'
        ? t.answerWrong
        : verdict === 'invalid'
          ? spec.kind === 'number'
            ? t.answerInvalid
            : t.answerEmpty
          : null;

  return (
    <form onSubmit={check} className="mt-2 flex flex-wrap items-center gap-2">
      <label htmlFor={id} className="sr-only">
        {t.answerLabel}
      </label>
      <input
        id={id}
        inputMode={spec.kind === 'number' ? 'decimal' : 'text'}
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setVerdict(null);
        }}
        placeholder={t.answerLabel}
        className={`rounded-lg border-2 bg-surface px-3 py-1.5 focus:outline-none ${
          spec.kind === 'number' ? 'w-36' : 'w-full max-w-xs'
        } ${verdict === 'correct' ? 'border-good' : verdict === 'wrong' ? 'border-alert' : 'border-line focus:border-ink'}`}
      />
      {spec.kind === 'number' && spec.unit && <span className="font-bold">{spec.unit}</span>}
      <button type="submit" className="rounded-full bg-ink px-4 py-1.5 font-bold text-on-ink">
        {t.check}
      </button>
      <p role="status" className={`w-full text-sm font-bold ${verdict === 'correct' ? 'text-good' : 'text-alert-ink'}`}>
        {message}
      </p>
    </form>
  );
}
