import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ActivateForm } from '@/components/account/AccountForms';
import { ProgressSummary } from '@/components/account/ProgressSummary';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { getAllPrograms } from '@/lib/curriculum';
import { format, getDictionary, hasLocale } from '@/lib/i18n';
import { ProgressSync } from '@/lib/progress/sync';
import { accountsEnabled, getViewer } from '@/lib/server/auth';
import { logout } from './actions';

export async function generateMetadata({ params }: PageProps<'/[lang]/compte'>): Promise<Metadata> {
  const { lang } = await params;
  return hasLocale(lang) ? { title: getDictionary(lang).account.spaceTitle, robots: { index: false } } : {};
}

export default async function AccountPage({ params }: PageProps<'/[lang]/compte'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  const viewer = await getViewer();
  const dateFormat = lang === 'bm' ? 'fr-ML' : 'fr-FR';

  const chapterTitles = Object.fromEntries(
    getAllPrograms().flatMap((p) => p.chapters.map((c) => [`${p.classId}/${p.subject}/${c.id}`, c.title])),
  );

  return (
    <div className="mx-auto max-w-3xl px-4 pt-6 sm:px-6">
      <ProgressSync loggedInHint={Boolean(viewer)} />
      <Breadcrumb label={t.nav.breadcrumb} items={[{ href: `/${lang}`, label: t.nav.home }]} />
      <h1 className="mt-3 text-4xl sm:text-5xl">{viewer ? format(t.account.hello, { name: viewer.name }) : t.account.spaceTitle}</h1>

      {viewer ? (
        <section className="mt-8 rounded-2xl border border-line bg-surface p-5">
          {viewer.role !== 'student' ? (
            <p className="font-bold text-good">{t.account.staffAccess}</p>
          ) : viewer.activeUntil ? (
            <p className="font-bold text-good">
              {format(t.account.activeUntil, { date: new Date(viewer.activeUntil).toLocaleDateString(dateFormat) })}
            </p>
          ) : (
            <>
              <p className="text-muted">{t.account.inactive}</p>
              <h2 className="mt-5 text-2xl">{t.account.activateTitle}</h2>
              <div className="mt-3">
                <ActivateForm t={t.account} dateFormat={dateFormat} />
              </div>
            </>
          )}
        </section>
      ) : (
        accountsEnabled() && (
          <section className="mt-8 flex flex-wrap gap-3">
            <Link href={`/${lang}/compte/connexion`} className="rounded-full bg-ink px-5 py-2.5 font-bold text-on-ink hover:bg-ink-soft">
              {t.account.login}
            </Link>
            <Link href={`/${lang}/compte/inscription`} className="rounded-full border-2 border-ink px-5 py-2.5 font-bold hover:bg-surface">
              {t.account.registerTitle}
            </Link>
          </section>
        )
      )}

      <section className="mt-8">
        <h2 className="text-2xl">{t.account.progressTitle}</h2>
        <p className="mt-1 text-sm text-muted">{viewer ? t.account.syncNote : t.account.localNote}</p>
        <div className="mt-4">
          <ProgressSummary lang={lang} chapterTitles={chapterTitles} t={t.account} />
        </div>
      </section>

      {viewer && (
        <section className="mt-10 flex flex-wrap items-center gap-4 border-t border-line pt-6">
          {viewer.role === 'admin' && (
            <Link href={`/${lang}/admin/codes`} className="font-bold underline">
              {t.account.admin}
            </Link>
          )}
          <form action={logout}>
            <input type="hidden" name="lang" value={lang} />
            <button type="submit" className="rounded-full border border-line px-4 py-2 font-bold hover:border-ink">
              {t.account.logout}
            </button>
          </form>
        </section>
      )}
    </div>
  );
}
