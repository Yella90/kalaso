import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AdminCodesForm } from '@/components/account/AccountForms';
import { getDictionary, hasLocale } from '@/lib/i18n';
import { getViewer } from '@/lib/server/auth';
import { getStore } from '@/lib/server/store';

export async function generateMetadata({ params }: PageProps<'/[lang]/admin/codes'>): Promise<Metadata> {
  const { lang } = await params;
  return hasLocale(lang) ? { title: getDictionary(lang).admin.title, robots: { index: false } } : {};
}

export default async function AdminCodesPage({ params }: PageProps<'/[lang]/admin/codes'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const t = dict.admin;
  const viewer = await getViewer();
  const store = getStore();

  if (!store || viewer?.role !== 'admin') {
    return (
      <div className="mx-auto max-w-3xl px-4 pt-10 sm:px-6">
        <h1 className="text-4xl">{t.title}</h1>
        <p className="mt-4 text-muted">{t.forbidden}</p>
      </div>
    );
  }

  const codes = await store.listCodes(100);
  const dateFormat = lang === 'bm' ? 'fr-ML' : 'fr-FR';

  return (
    <div className="mx-auto max-w-4xl px-4 pt-10 sm:px-6">
      <h1 className="text-4xl">{t.title}</h1>
      <p className="mt-3 max-w-prose text-muted">{t.intro}</p>
      <div className="mt-6">
        <AdminCodesForm t={dict.account} ta={t} />
      </div>
      <h2 className="mt-10 text-2xl">{t.list}</h2>
      <div className="mt-3 overflow-x-auto rounded-xl border border-line bg-surface">
        <table className="w-full text-left text-sm">
          <thead className="bg-paper">
            <tr>
              <th className="px-3 py-2">{dict.account.code}</th>
              <th className="px-3 py-2">{t.schoolYear}</th>
              <th className="px-3 py-2">{t.expiresAt}</th>
              <th className="px-3 py-2">{t.note}</th>
              <th className="px-3 py-2" />
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {codes.map((c) => (
              <tr key={c.code}>
                <td className="px-3 py-2 font-mono">{c.code}</td>
                <td className="px-3 py-2">{c.school_year}</td>
                <td className="px-3 py-2">{new Date(c.expires_at).toLocaleDateString(dateFormat)}</td>
                <td className="px-3 py-2">{c.note}</td>
                <td className="px-3 py-2 font-bold">{c.uses >= c.max_uses ? t.used : t.free}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
