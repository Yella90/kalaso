import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { LoginForm } from '@/components/account/AccountForms';
import { getDictionary, hasLocale } from '@/lib/i18n';
import { getViewer } from '@/lib/server/auth';

export async function generateMetadata({ params }: PageProps<'/[lang]/compte/connexion'>): Promise<Metadata> {
  const { lang } = await params;
  return hasLocale(lang) ? { title: getDictionary(lang).account.loginTitle, robots: { index: false } } : {};
}

export default async function LoginPage({ params, searchParams }: PageProps<'/[lang]/compte/connexion'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  if (await getViewer()) redirect(`/${lang}/compte`);
  const t = getDictionary(lang).account;
  const next = (await searchParams).suite;

  return (
    <div className="mx-auto max-w-md px-4 pt-10 sm:px-6">
      <h1 className="text-4xl">{t.loginTitle}</h1>
      <div className="mt-6">
        <LoginForm lang={lang} next={typeof next === 'string' ? next : undefined} t={t} />
      </div>
      <p className="mt-6 text-muted">
        {t.noAccount}{' '}
        <Link href={`/${lang}/compte/inscription${typeof next === 'string' ? `?suite=${encodeURIComponent(next)}` : ''}`} className="font-bold text-ink underline">
          {t.registerTitle}
        </Link>
      </p>
    </div>
  );
}
