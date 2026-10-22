import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { trimesterLabel } from '@/components/program/SubjectProgramView';
import { getAllPrograms, getProgram, isClassId, isSubjectId, SUBJECTS, type SimulationId } from '@/lib/curriculum';
import { format, getDictionary, hasLocale } from '@/lib/i18n';

const SIMULATION_PATHS: Record<SimulationId, string> = {
  atome: 'atome',
  'tableau-periodique': 'tableau-periodique',
};

const STEPS = ['cours', 'simuler', 'exercer', 'appliquer'] as const;

export function generateStaticParams() {
  return getAllPrograms().flatMap((p) => p.chapters.map((c) => ({ classe: p.classId, matiere: p.subject, chapitre: c.id })));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<'/[lang]/[classe]/[matiere]/[chapitre]'>): Promise<Metadata> {
  const { lang, classe, matiere, chapitre } = await params;
  if (!hasLocale(lang) || !isClassId(classe) || !isSubjectId(matiere)) return {};
  const chapter = getProgram(classe, matiere)?.chapters.find((c) => c.id === chapitre);
  return chapter ? { title: chapter.title } : {};
}

export default async function ChapterPage({ params }: PageProps<'/[lang]/[classe]/[matiere]/[chapitre]'>) {
  const { lang, classe, matiere, chapitre } = await params;
  if (!hasLocale(lang) || !isClassId(classe) || !isSubjectId(matiere)) notFound();
  const program = getProgram(classe, matiere);
  const index = program?.chapters.findIndex((c) => c.id === chapitre) ?? -1;
  if (!program || index < 0) notFound();

  const t = getDictionary(lang);
  const chapter = program.chapters[index];
  const previous = program.chapters[index - 1];
  const next = program.chapters[index + 1];
  const color = `var(${SUBJECTS.find((s) => s.id === matiere)!.colorVar})`;
  const base = `/${lang}/${classe}/${matiere}`;
  const context = [
    chapter.domain,
    chapter.trimester && trimesterLabel(t, chapter.trimester),
    chapter.series && format(t.program.seriesOnly, { series: chapter.series.join(', ') }),
  ].filter(Boolean);

  return (
    <div className="mx-auto max-w-4xl px-4 pt-6 sm:px-6">
      <Breadcrumb
        items={[
          { href: `/${lang}`, label: t.nav.home },
          { href: `/${lang}/${classe}`, label: t.classes[classe] },
          { href: base, label: t.subjects[matiere].name },
        ]}
      />
      <p className="mt-4 font-bold" style={{ color }}>
        {t.subjects[matiere].name}, {t.classShort[classe]}
      </p>
      <h1 className="mt-1 text-4xl sm:text-5xl">{chapter.title}</h1>
      {context.length > 0 && <p className="mt-2 text-muted">{context.join('. ')}</p>}

      {chapter.notions && (
        <section className="mt-8">
          <h2 className="text-xl">{t.chapter.notions}</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {chapter.notions.map((n) => (
              <li key={n} className="rounded-full border border-line bg-surface px-3 py-1">
                {n}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-10">
        <h2 className="text-xl">{t.chapter.path}</h2>
        <ol className="mt-4 grid gap-3 sm:grid-cols-2">
          {STEPS.map((step, i) => {
            const simulation = step === 'simuler' && chapter.simulation ? SIMULATION_PATHS[chapter.simulation] : undefined;
            const content = (
              <>
                <span className="flex items-baseline justify-between gap-3">
                  <span className="font-serif text-xl font-bold">
                    {i + 1}. {t.steps[step].name}
                  </span>
                  {!simulation && <span className="text-sm text-muted">{t.chapter.soon}</span>}
                </span>
                <span className="mt-1 block text-muted">{t.steps[step].text}</span>
                {simulation && <span className="mt-3 inline-block font-bold underline">{t.chapter.openSimulation}</span>}
              </>
            );
            return (
              <li key={step}>
                {simulation ? (
                  <Link
                    href={`/${lang}/${simulation}`}
                    className="block h-full rounded-xl border-2 bg-surface p-4 hover:bg-paper"
                    style={{ borderColor: color }}
                  >
                    {content}
                  </Link>
                ) : (
                  <div className="h-full rounded-xl border border-dashed border-line p-4">{content}</div>
                )}
              </li>
            );
          })}
        </ol>
      </section>

      <nav aria-label={t.chapter.path} className="mt-12 grid gap-3 border-t border-line pt-6 sm:grid-cols-2">
        {previous ? (
          <Link href={`${base}/${previous.id}`} className="rounded-xl p-3 hover:bg-surface">
            <span className="block text-sm text-muted">{t.chapter.previous}</span>
            <span className="font-bold">{previous.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={`${base}/${next.id}`} className="rounded-xl p-3 text-right hover:bg-surface">
            <span className="block text-sm text-muted">{t.chapter.next}</span>
            <span className="font-bold">{next.title}</span>
          </Link>
        )}
      </nav>
    </div>
  );
}
