import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDictionary, hasLocale } from '@/lib/i18n';

export async function generateMetadata({ params }: PageProps<'/[lang]/hors-ligne'>): Promise<Metadata> {
  const { lang } = await params;
  return hasLocale(lang) ? { title: getDictionary(lang).offline.title, robots: { index: false } } : {};
}

/** Affichée par le service worker quand une page n'est pas disponible sans connexion. */
export default async function OfflinePage({ params }: PageProps<'/[lang]/hors-ligne'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang).offline;
  return (
    <div className="mx-auto max-w-xl px-4 pt-16 sm:px-6">
      <h1 className="text-4xl">{t.title}</h1>
      <p className="mt-4 text-muted">{t.text}</p>
      <Link href={`/${lang}`} className="mt-6 inline-block rounded-full bg-ink px-5 py-2.5 font-bold text-on-ink">
        {t.home}
      </Link>
    </div>
  );
}
