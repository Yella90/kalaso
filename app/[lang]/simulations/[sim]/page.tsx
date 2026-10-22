import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { SimulationView } from '@/components/sim/SimulationView';
import { SUBJECTS } from '@/lib/curriculum';
import { getDictionary, hasLocale } from '@/lib/i18n';

const STANDALONE = ['circuit', 'projectile', 'fonction'] as const;
type Standalone = (typeof STANDALONE)[number];
const SUBJECT: Record<Standalone, string> = { circuit: 'physique', projectile: 'physique', fonction: 'maths' };

function isStandalone(id: string): id is Standalone {
  return (STANDALONE as readonly string[]).includes(id);
}

export function generateStaticParams() {
  return STANDALONE.map((sim) => ({ sim }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<'/[lang]/simulations/[sim]'>): Promise<Metadata> {
  const { lang, sim } = await params;
  return hasLocale(lang) && isStandalone(sim) ? { title: getDictionary(lang).sims[sim].title } : {};
}

export default async function SimulationPage({ params }: PageProps<'/[lang]/simulations/[sim]'>) {
  const { lang, sim } = await params;
  if (!hasLocale(lang) || !isStandalone(sim)) notFound();
  const t = getDictionary(lang);
  const color = `var(${SUBJECTS.find((s) => s.id === SUBJECT[sim])!.colorVar})`;

  return (
    <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6" style={{ ['--subject' as string]: color }}>
      <Breadcrumb
        label={t.nav.breadcrumb}
        items={[
          { href: `/${lang}`, label: t.nav.home },
          { href: `/${lang}/simulations`, label: t.sims.listTitle },
        ]}
      />
      <h1 className="mt-3 text-4xl sm:text-5xl">{t.sims[sim].title}</h1>
      <p className="mt-3 max-w-prose text-muted">{t.sims[sim].intro}</p>
      <div className="mt-8">
        <SimulationView id={sim} lang={lang} t={t} />
      </div>
    </div>
  );
}
