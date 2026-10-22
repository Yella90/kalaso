import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { RegisterForm } from '@/components/account/AccountForms';
import { CLASSES } from '@/lib/curriculum';
import { getDictionary, hasLocale } from '@/lib/i18n';
import { getViewer } from '@/lib/server/auth';

export async function generateMetadata({ params }: PageProps<'/[lang]/compte/inscription'>): Promise<Metadata> {
  const { lang } = await params;
  return hasLocale(lang) ? { title: getDictionary(lang).account.registerTitle, robots: { index: false } } : {};
}

export default async function RegisterPage({ params, searchParams }: PageProps<'/[lang]/compte/inscription'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  if (await getViewer()) redirect(`/${lang}/compte`);
  const dict = getDictionary(lang);
  const t = dict.account;
  const next = (await searchParams).suite;

  return (
    <div className="mx-auto max-w-md px-4 pt-10 sm:px-6">
      <h1 className="text-4xl">{t.registerTitle}</h1>
      <div className="mt-6">
        <RegisterForm
          lang={lang}
          next={typeof next === 'string' ? next : undefined}
          classes={CLASSES.map((c) => ({ id: c.id, label: dict.classes[c.id] }))}
          t={t}
        />
      </div>
      <p className="mt-6 text-muted">
        {t.hasAccount}{' '}
        <Link href={`/${lang}/compte/connexion${typeof next === 'string' ? `?suite=${encodeURIComponent(next)}` : ''}`} className="font-bold text-ink underline">
          {t.login}
        </Link>
      </p>
    </div>
  );
}
