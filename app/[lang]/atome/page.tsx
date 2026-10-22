import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AtomBuilder } from '@/components/sim/AtomBuilder';
import { getDictionary, hasLocale } from '@/lib/i18n';

export async function generateMetadata({ params }: PageProps<'/[lang]/atome'>): Promise<Metadata> {
  const { lang } = await params;
  return hasLocale(lang) ? { title: getDictionary(lang).atom.title } : {};
}

export default async function AtomPage({ params }: PageProps<'/[lang]/atome'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
      <Breadcrumb items={[{ href: `/${lang}`, label: t.nav.home }]} />
      <h1 className="mt-3 text-4xl sm:text-5xl">{t.atom.title}</h1>
      <p className="mt-3 max-w-prose text-muted">{t.atom.intro}</p>
      <div className="mt-8">
        {/* Le constructeur lit ?z= dans l'URL : il doit être rendu côté client. */}
        <Suspense>
          <AtomBuilder lang={lang} t={t.atom} />
        </Suspense>
      </div>
    </div>
  );
}
