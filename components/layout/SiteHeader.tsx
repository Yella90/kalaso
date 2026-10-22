import Link from 'next/link';
import type { Dictionary, Locale } from '@/lib/i18n';
import { LanguageSwitch } from './LanguageSwitch';
import { Logo } from './Logo';

export function SiteHeader({ lang, t }: { lang: Locale; t: Dictionary }) {
  return (
    <header className="bg-ink text-on-ink">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 sm:px-6">
        <Link href={`/${lang}`} className="flex items-center gap-2 rounded" aria-label={`Kalanso, ${t.nav.home}`}>
          <Logo className="h-8 w-8" />
          <span className="font-serif text-2xl font-bold tracking-tight">Kalanso</span>
        </Link>
        <nav aria-label={t.nav.main} className="ml-auto hidden items-center gap-1 text-[0.95rem] md:flex">
          <Link href={`/${lang}#classes`} className="rounded px-3 py-2 text-on-ink-muted hover:text-on-ink">
            {t.nav.classes}
          </Link>
          <Link href={`/${lang}/aventures`} className="rounded px-3 py-2 text-on-ink-muted hover:text-on-ink">
            {t.nav.adventures}
          </Link>
          <Link href={`/${lang}/atome`} className="rounded px-3 py-2 text-on-ink-muted hover:text-on-ink">
            {t.nav.atom}
          </Link>
          <Link href={`/${lang}/tableau-periodique`} className="rounded px-3 py-2 text-on-ink-muted hover:text-on-ink">
            {t.nav.periodicTable}
          </Link>
          <Link href={`/${lang}/compte`} className="rounded px-3 py-2 font-bold text-on-ink hover:text-focus">
            {t.nav.account}
          </Link>
        </nav>
        <LanguageSwitch lang={lang} labels={t.languages} label={t.nav.language} />
      </div>
      {/* Sur mobile, la navigation passe sous le logo pour rester lisible et facile à toucher. */}
      <nav aria-label={t.nav.main} className="flex gap-1 overflow-x-auto px-2 pb-2 text-sm md:hidden">
        <Link href={`/${lang}#classes`} className="shrink-0 rounded px-3 py-2 text-on-ink-muted">
          {t.nav.classes}
        </Link>
        <Link href={`/${lang}/aventures`} className="shrink-0 rounded px-3 py-2 text-on-ink-muted">
          {t.nav.adventures}
        </Link>
        <Link href={`/${lang}/atome`} className="shrink-0 rounded px-3 py-2 text-on-ink-muted">
          {t.nav.atom}
        </Link>
        <Link href={`/${lang}/tableau-periodique`} className="shrink-0 rounded px-3 py-2 text-on-ink-muted">
          {t.nav.periodicTable}
        </Link>
        <Link href={`/${lang}/compte`} className="shrink-0 rounded px-3 py-2 font-bold text-on-ink">
          {t.nav.account}
        </Link>
      </nav>
      {lang === 'bm' && (
        <p className="border-t border-ink-soft bg-ink-soft px-4 py-2 text-center text-sm text-on-ink-muted">{t.bmNotice}</p>
      )}
    </header>
  );
}
