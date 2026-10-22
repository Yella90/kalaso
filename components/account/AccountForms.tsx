'use client';

import { useActionState } from 'react';
import { activate, createCodes, login, register, type FormState } from '@/app/[lang]/compte/actions';
import { format, type Dictionary, type Locale } from '@/lib/i18n';

type T = Dictionary['account'];

const input =
  'mt-1 block w-full rounded-lg border-2 border-line bg-surface px-3 py-2 text-lg focus:border-ink focus:outline-none';
const button = 'rounded-full bg-ink px-5 py-2.5 font-bold text-on-ink hover:bg-ink-soft disabled:opacity-60';

function ErrorMessage({ state, t }: { state: FormState; t: T }) {
  if (!state?.error) return null;
  const message = t.errors[state.error as keyof T['errors']] ?? t.errors.server;
  return (
    <p role="alert" className="rounded-lg bg-alert-soft px-3 py-2 font-bold text-alert-ink">
      {message}
    </p>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="font-bold">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-sm text-muted">{hint}</span>}
    </label>
  );
}

export function LoginForm({ lang, next, t }: { lang: Locale; next?: string; t: T }) {
  const [state, action, pending] = useActionState(login, undefined);
  return (
    <form action={action} className="flex flex-col gap-4">
      <input type="hidden" name="lang" value={lang} />
      {next && <input type="hidden" name="next" value={next} />}
      <Field label={t.phone} hint={t.phoneHint}>
        <input name="phone" type="tel" inputMode="tel" autoComplete="tel" required className={input} />
      </Field>
      <Field label={t.password}>
        <input name="password" type="password" autoComplete="current-password" required className={input} />
      </Field>
      <ErrorMessage state={state} t={t} />
      <button type="submit" disabled={pending} className={button}>
        {pending ? t.pending : t.login}
      </button>
    </form>
  );
}

export function RegisterForm({
  lang,
  next,
  classes,
  t,
}: {
  lang: Locale;
  next?: string;
  classes: { id: string; label: string }[];
  t: T;
}) {
  const [state, action, pending] = useActionState(register, undefined);
  return (
    <form action={action} className="flex flex-col gap-4">
      <input type="hidden" name="lang" value={lang} />
      {next && <input type="hidden" name="next" value={next} />}
      <Field label={t.name}>
        <input name="name" autoComplete="name" required minLength={2} maxLength={80} className={input} />
      </Field>
      <Field label={t.phone} hint={t.phoneHint}>
        <input name="phone" type="tel" inputMode="tel" autoComplete="tel" required className={input} />
      </Field>
      <Field label={t.classLabel}>
        <select name="classId" className={input} defaultValue="">
          <option value="">{t.noClass}</option>
          {classes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
      </Field>
      <Field label={t.password} hint={t.passwordHint}>
        <input name="password" type="password" autoComplete="new-password" required minLength={8} className={input} />
      </Field>
      <ErrorMessage state={state} t={t} />
      <button type="submit" disabled={pending} className={button}>
        {pending ? t.pending : t.register}
      </button>
    </form>
  );
}

export function ActivateForm({ t, dateFormat }: { t: T; dateFormat: string }) {
  const [state, action, pending] = useActionState(activate, undefined);
  if (state?.message) {
    return (
      <p role="status" className="rounded-lg bg-good-soft px-4 py-3 font-bold text-good">
        {format(t.activated, { date: new Date(state.message).toLocaleDateString(dateFormat) })}
      </p>
    );
  }
  return (
    <form action={action} className="flex flex-col gap-3">
      <Field label={t.code} hint={t.codeHint}>
        <input name="code" required autoCapitalize="characters" autoComplete="off" className={`${input} uppercase tracking-wider`} />
      </Field>
      <ErrorMessage state={state} t={t} />
      <button type="submit" disabled={pending} className={`${button} self-start`}>
        {pending ? t.pending : t.activate}
      </button>
    </form>
  );
}

export function AdminCodesForm({ t, ta }: { t: T; ta: Dictionary['admin'] }) {
  const [state, action, pending] = useActionState(createCodes, undefined);
  return (
    <div className="flex flex-col gap-4">
      <form action={action} className="grid gap-4 sm:grid-cols-2">
        <Field label={ta.count}>
          <input name="count" type="number" min={1} max={200} defaultValue={10} required className={input} />
        </Field>
        <Field label={ta.schoolYear}>
          <input name="schoolYear" placeholder="2026-2027" pattern="\d{4}-\d{4}" required className={input} />
        </Field>
        <Field label={ta.expiresAt}>
          <input name="expiresAt" type="date" required className={input} />
        </Field>
        <Field label={ta.note}>
          <input name="note" maxLength={120} className={input} />
        </Field>
        <div className="sm:col-span-2">
          <ErrorMessage state={state} t={t} />
          <button type="submit" disabled={pending} className={`${button} mt-2`}>
            {pending ? t.pending : ta.generate}
          </button>
        </div>
      </form>
      {state?.codes && (
        <div className="rounded-xl border-2 border-ink p-4">
          <p className="font-bold">{format(ta.generated, { n: state.codes.length })}</p>
          <ul className="mt-2 grid grid-cols-2 gap-2 font-mono sm:grid-cols-4">
            {state.codes.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
