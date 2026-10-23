import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { SUBJECTS } from '@/lib/curriculum';
import { getDictionary, hasLocale, type Dictionary } from '@/lib/i18n';
import { chaptersUsing, SIMULATIONS } from '@/lib/simulations';

export async function generateMetadata({ params }: PageProps<'/[lang]/simulations'>): Promise<Metadata> {
  const { lang } = await params;
  return hasLocale(lang) ? { title: getDictionary(lang).sims.listTitle } : {};
}

function simText(t: Dictionary, id: string): { title: string; intro: string } {
  if (id === 'atome') return { title: t.atom.title, intro: t.atom.intro };
  if (id === 'tableau-periodique') return { title: t.table.title, intro: t.table.intro };
  return t.sims[id as Exclude<keyof Dictionary['sims'], 'listTitle' | 'listIntro' | 'usedIn'>];
}

export default async function SimulationsPage({ params }: PageProps<'/[lang]/simulations'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <div className="mx-auto max-w-4xl px-4 pt-6 sm:px-6">
      <Breadcrumb label={t.nav.breadcrumb} items={[{ href: `/${lang}`, label: t.nav.home }]} />
      <h1 className="mt-3 text-4xl sm:text-5xl">{t.sims.listTitle}</h1>
      <p className="mt-3 max-w-prose text-muted">{t.sims.listIntro}</p>
      <ul className="mt-8 flex flex-col gap-4">
        {SIMULATIONS.map((sim) => {
          const { title, intro } = simText(t, sim.id);
          const color = `var(${SUBJECTS.find((s) => s.id === sim.subject)!.colorVar})`;
          const used = chaptersUsing(sim.id, lang);
          return (
            <li key={sim.id} className="rounded-2xl border border-line bg-surface p-5" style={{ boxShadow: `inset 4px 0 0 ${color}` }}>
              <Link href={`/${lang}/${sim.path}`} className="font-serif text-2xl font-bold hover:underline">
                {title}
              </Link>
              <p className="mt-1 text-muted">{intro}</p>
              {used.length > 0 && (
                <p className="mt-3 text-sm">
                  <span className="font-bold">{t.sims.usedIn} : </span>
                  {used.map((u, i) => (
                    <span key={`${u.classId}/${u.chapter.id}`}>
                      {i > 0 && ', '}
                      <Link href={`/${lang}/${u.classId}/${u.subject}/${u.chapter.id}#simuler`} className="underline">
                        {u.chapter.title} ({t.classShort[u.classId]})
                      </Link>
                    </span>
                  ))}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
