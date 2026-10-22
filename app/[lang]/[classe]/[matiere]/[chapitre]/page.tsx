import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense, type ReactNode } from 'react';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { LessonCourse } from '@/components/lesson/LessonCourse';
import { LessonApplications, LessonExercises } from '@/components/lesson/LessonPractice';
import { RichText } from '@/components/lesson/RichText';
import { trimesterLabel } from '@/components/program/SubjectProgramView';
import { AtomBuilder } from '@/components/sim/AtomBuilder';
import { PeriodicTable } from '@/components/sim/PeriodicTable';
import { getAllPrograms, getProgram, isClassId, isSubjectId, SUBJECTS, type SimulationId } from '@/lib/curriculum';
import { format, getDictionary, hasLocale, type Dictionary, type Locale } from '@/lib/i18n';
import { getAdventuresForChapter } from '@/lib/adventures';
import { getLesson } from '@/lib/lessons';
import { getViewer, hasFullAccess } from '@/lib/server/auth';
import { LockedPanel } from '@/components/account/LockedPanel';
import { ChapterVisit } from '@/components/lesson/ChapterVisit';

const STEPS = ['cours', 'simuler', 'exercer', 'appliquer'] as const;
type Step = (typeof STEPS)[number];

function Simulation({ id, lang, t }: { id: SimulationId; lang: Locale; t: Dictionary }) {
  // Les simulations lisent ?z= dans l'URL : elles sont rendues côté client.
  return (
    <Suspense>
      {id === 'atome' ? <AtomBuilder lang={lang} t={t.atom} /> : <PeriodicTable lang={lang} t={t.table} />}
    </Suspense>
  );
}

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
  const lesson = getLesson(classe, matiere, chapitre, lang);
  const adventures = getAdventuresForChapter(classe, matiere, chapitre);
  const viewer = await getViewer();
  const fullAccess = hasFullAccess(viewer);
  const chapterKey = `${classe}/${matiere}/${chapitre}`;
  const previous = program.chapters[index - 1];
  const next = program.chapters[index + 1];
  const color = `var(${SUBJECTS.find((s) => s.id === matiere)!.colorVar})`;
  const base = `/${lang}/${classe}/${matiere}`;
  const context = [
    chapter.domain,
    chapter.trimester && trimesterLabel(t, chapter.trimester),
    chapter.series && format(t.program.seriesOnly, { series: chapter.series.join(', ') }),
  ].filter(Boolean);

  // Ce que chaque étape contient pour ce chapitre ; `undefined` = encore en préparation.
  const content: Record<Step, ReactNode | undefined> = {
    cours: lesson && <LessonCourse lesson={lesson} t={t.lesson} />,
    simuler: chapter.simulation && (
      <div className="flex flex-col gap-5">
        {lesson?.simulationTasks && (
          <div>
            <p className="font-bold">{t.lesson.simulationTasks}</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {lesson.simulationTasks.map((task) => (
                <li key={task}>
                  <RichText text={task} />
                </li>
              ))}
            </ul>
          </div>
        )}
        <Simulation id={chapter.simulation} lang={lang} t={t} />
      </div>
    ),
    exercer: lesson && <LessonExercises lesson={lesson} quizKey={chapterKey} t={t.lesson} />,
    appliquer: (lesson?.applications.length || adventures.length > 0) && (
      <div className="flex flex-col gap-8">
        {lesson && lesson.applications.length > 0 && <LessonApplications lesson={lesson} t={t.lesson} />}
        {adventures.length > 0 && (
          <div>
            <h3 className="text-2xl">{t.lesson.adventures}</h3>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2">
              {adventures.map((a) => (
                <li key={a.id}>
                  <Link href={`/${lang}/aventures/${a.id}`} className="block h-full rounded-xl border border-line bg-surface p-4 hover:border-ink">
                    <span className="font-serif text-lg font-bold">{a.title}</span>
                    <span className="mt-1 block text-sm text-muted">{a.pitch}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    ),
  };

  // Les étapes « S'exercer » et « Appliquer » font partie de l'accès annuel.
  const locked = (
    <LockedPanel lang={lang} viewer={viewer} returnTo={`/${lang}/${chapterKey}`} text={t.account.locked.text} t={t.account.locked} />
  );
  if (!fullAccess) {
    if (content.exercer) content.exercer = locked;
    if (content.appliquer) content.appliquer = locked;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 pt-6 sm:px-6" style={{ ['--subject' as string]: color }}>
      <ChapterVisit chapterKey={chapterKey} />
      <Breadcrumb label={t.nav.breadcrumb}
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

      {/* Le parcours du chapitre : les quatre étapes, dans l'ordre. */}
      <nav
        aria-label={t.chapter.path}
        className="sticky top-0 z-10 -mx-4 mt-6 border-b border-line bg-paper/95 px-4 py-2 backdrop-blur sm:mx-0 sm:px-0"
      >
        <ol className="flex gap-1 overflow-x-auto">
          {STEPS.map((step, i) => {
            const ready = Boolean(content[step]);
            return (
              <li key={step} className="shrink-0">
                {ready ? (
                  <a href={`#${step}`} className="block rounded-full px-3 py-1.5 font-bold hover:bg-surface">
                    {i + 1}. {t.steps[step].name}
                  </a>
                ) : (
                  <span className="block px-3 py-1.5 text-muted" title={t.chapter.soon}>
                    {i + 1}. {t.steps[step].name}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      {!lesson && (
        <div className="mt-8">
          <p className="max-w-prose text-muted">{t.lesson.noContent}</p>
          {chapter.notions && (
            <ul className="mt-4 flex flex-wrap gap-2">
              {chapter.notions.map((n) => (
                <li key={n} className="rounded-full border border-line bg-surface px-3 py-1">
                  {n}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="mt-8 flex flex-col gap-16">
        {STEPS.map(
          (step, i) =>
            content[step] && (
              <section key={step} id={step} className="scroll-mt-16" aria-labelledby={`titre-${step}`}>
                <h2 id={`titre-${step}`} className="flex items-baseline gap-3 border-b-2 pb-2 text-3xl" style={{ borderColor: color }}>
                  <span style={{ color }}>{i + 1}.</span> {t.steps[step].name}
                </h2>
                <div className="mt-6">{content[step]}</div>
              </section>
            ),
        )}
      </div>

      <nav aria-label={t.chapter.neighbours} className="mt-16 grid gap-3 border-t border-line pt-6 sm:grid-cols-2">
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
