import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { PeriodicTable } from '@/components/sim/PeriodicTable';
import { getDictionary, hasLocale } from '@/lib/i18n';

export async function generateMetadata({ params }: PageProps<'/[lang]/tableau-periodique'>): Promise<Metadata> {
  const { lang } = await params;
  return hasLocale(lang) ? { title: getDictionary(lang).table.title } : {};
}

export default async function PeriodicTablePage({ params }: PageProps<'/[lang]/tableau-periodique'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
      <Breadcrumb items={[{ href: `/${lang}`, label: t.nav.home }]} />
      <h1 className="mt-3 text-4xl sm:text-5xl">{t.table.title}</h1>
      <p className="mt-3 max-w-prose text-muted">{t.table.intro}</p>
      <div className="mt-8">
        {/* Le tableau lit ?z= dans l'URL : il doit être rendu côté client. */}
        <Suspense>
          <PeriodicTable lang={lang} t={t.table} />
        </Suspense>
      </div>
    </div>
  );
}
