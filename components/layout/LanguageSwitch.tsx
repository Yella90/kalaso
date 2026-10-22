'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LOCALES, type Locale } from '@/lib/i18n';

/** Bascule FR / BM en gardant la même page. */
export function LanguageSwitch({ lang, labels, label }: { lang: Locale; labels: Record<Locale, string>; label: string }) {
  const pathname = usePathname();
  const rest = pathname.split('/').slice(2).join('/');

  return (
    <div role="group" aria-label={label} className="ml-auto flex rounded-full border border-ink-soft p-0.5 md:ml-2">
      {LOCALES.map((locale) => {
        const active = locale === lang;
        return (
          <Link
            key={locale}
            href={`/${locale}${rest ? `/${rest}` : ''}`}
            hrefLang={locale}
            lang={locale}
            aria-current={active ? 'true' : undefined}
            title={labels[locale]}
            className={`rounded-full px-3 py-1 text-sm font-bold ${active ? 'bg-on-ink text-ink' : 'text-on-ink-muted hover:text-on-ink'}`}
          >
            {locale.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
