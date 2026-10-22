import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { getAdventures } from '@/lib/adventures';
import { SUBJECTS } from '@/lib/curriculum';
import { format, getDictionary, hasLocale } from '@/lib/i18n';

export async function generateMetadata({ params }: PageProps<'/[lang]/aventures'>): Promise<Metadata> {
  const { lang } = await params;
  return hasLocale(lang) ? { title: getDictionary(lang).adventure.listTitle } : {};
}

export default async function AdventuresPage({ params }: PageProps<'/[lang]/aventures'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <div className="mx-auto max-w-4xl px-4 pt-6 sm:px-6">
      <Breadcrumb label={t.nav.breadcrumb} items={[{ href: `/${lang}`, label: t.nav.home }]} />
      <h1 className="mt-3 text-4xl sm:text-5xl">{t.adventure.listTitle}</h1>
      <p className="mt-3 max-w-prose text-muted">{t.adventure.listIntro}</p>

      <ul className="mt-8 grid gap-5 sm:grid-cols-2">
        {getAdventures(lang).map((a) => {
          const color = `var(${SUBJECTS.find((s) => s.id === a.subject)!.colorVar})`;
          return (
            <li key={a.id}>
              <Link
                href={`/${lang}/aventures/${a.id}`}
                className="flex h-full flex-col rounded-2xl border border-line bg-surface p-5 hover:border-ink"
                style={{ boxShadow: `inset 0 4px 0 ${color}` }}
              >
                <span className="text-sm font-bold" style={{ color }}>
                  {t.subjects[a.subject].name}
                </span>
                <span className="mt-1 font-serif text-2xl font-bold">{a.title}</span>
                <span className="mt-2 flex-1 text-muted">{a.pitch}</span>
                <span className="mt-4 text-sm text-muted">
                  {format(t.adventure.forClasses, { classes: a.classes.map((c) => t.classShort[c]).join(', ') })}.{' '}
                  {format(t.adventure.missions, { n: a.missions.length })}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
