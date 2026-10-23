import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { SimulationView } from '@/components/sim/SimulationView';
import { SUBJECTS } from '@/lib/curriculum';
import { getDictionary, hasLocale } from '@/lib/i18n';

const STANDALONE = ['circuit', 'projectile', 'fonction', 'osmose', 'mitose', 'croisement', 'hardy-weinberg', 'potentiel-action', 'glycemie', 'immunite', 'traduction', 'photosynthese', 'cellule-3d', 'adn-3d', 'caryotype', 'coeur', 'skate-park', 'cercle-trigo', 'vecteurs', 'transformations', 'statistique', 'probabilite', 'solides', 'pythagore', 'thales', 'identites', 'fractions', 'relatifs', 'angles', 'systemes', 'suites', 'integrales', 'complexes', 'exponentielle', 'coniques', 'regression', 'euclide'] as const;
type Standalone = (typeof STANDALONE)[number];
const SUBJECT: Record<Standalone, string> = {
  circuit: 'physique',
  projectile: 'physique',
  fonction: 'maths',
  'osmose': 'biologie',
  'mitose': 'biologie',
  'croisement': 'biologie',
  'hardy-weinberg': 'biologie',
  'potentiel-action': 'biologie',
  'glycemie': 'biologie',
  'immunite': 'biologie',
  'traduction': 'biologie',
  'photosynthese': 'biologie',
  'cellule-3d': 'biologie',
  'adn-3d': 'biologie',
  'caryotype': 'biologie',
  'coeur': 'biologie',
  'skate-park': 'physique',
  'cercle-trigo': 'maths',
  'vecteurs': 'maths',
  'transformations': 'maths',
  'statistique': 'maths',
  'probabilite': 'maths',
  'solides': 'maths',
  'pythagore': 'maths',
  'thales': 'maths',
  'identites': 'maths',
  'fractions': 'maths',
  'relatifs': 'maths',
  'angles': 'maths',
  'systemes': 'maths',
  'suites': 'maths',
  'integrales': 'maths',
  'complexes': 'maths',
  'exponentielle': 'maths',
  'coniques': 'maths',
  'regression': 'maths',
  'euclide': 'maths',
};

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
