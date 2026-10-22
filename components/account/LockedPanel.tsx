import Link from 'next/link';
import type { Dictionary, Locale } from '@/lib/i18n';
import type { Viewer } from '@/lib/server/auth';

/** Remplace un contenu réservé : propose de se connecter, ou d'activer le compte. */
export function LockedPanel({
  lang,
  viewer,
  returnTo,
  text,
  t,
}: {
  lang: Locale;
  viewer: Viewer | null;
  /** Page où revenir après la connexion. */
  returnTo: string;
  text: string;
  t: Dictionary['account']['locked'];
}) {
  const suite = `?suite=${encodeURIComponent(returnTo)}`;
  return (
    <div className="rounded-2xl border-2 border-dashed border-ink/40 bg-surface p-6">
      <p className="flex items-center gap-2 font-serif text-xl font-bold">
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path d="M7 11V8a5 5 0 0 1 10 0v3" fill="none" stroke="currentColor" strokeWidth="2" />
          <rect x="5" y="11" width="14" height="10" rx="2" fill="currentColor" />
        </svg>
        {t.title}
      </p>
      <p className="mt-2 max-w-prose text-muted">{text}</p>
      <div className="mt-4 flex flex-wrap gap-3">
        {viewer ? (
          <Link href={`/${lang}/compte`} className="rounded-full bg-ink px-5 py-2.5 font-bold text-on-ink hover:bg-ink-soft">
            {t.activate}
          </Link>
        ) : (
          <>
            <Link href={`/${lang}/compte/connexion${suite}`} className="rounded-full bg-ink px-5 py-2.5 font-bold text-on-ink hover:bg-ink-soft">
              {t.login}
            </Link>
            <Link href={`/${lang}/compte/inscription${suite}`} className="rounded-full border-2 border-ink px-5 py-2.5 font-bold">
              {t.register}
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
