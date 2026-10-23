import Link from 'next/link';
import { groupChapters, SUBJECTS, type SubjectProgram } from '@/lib/curriculum';
import { format, type Dictionary, type Locale } from '@/lib/i18n';
import { hasLesson } from '@/lib/lessons';

export function trimesterLabel(t: Dictionary, n: number) {
  return n === 1 ? t.program.trimester1 : format(t.program.trimester, { n });
}

export function StatusBadge({ status, t }: { status: SubjectProgram['status']; t: Dictionary }) {
  const official = status === 'officiel';
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold ${
        official ? 'bg-ink text-on-ink' : 'border border-dashed border-muted text-muted'
      }`}
    >
      {official ? t.program.officiel : t.program.anticipe}
    </span>
  );
}

interface Props {
  lang: Locale;
  t: Dictionary;
  program: SubjectProgram;
  /** Titre de niveau h2 (page de classe) ou masqué (page de matière, qui a déjà son h1). */
  showHeading?: boolean;
  showSource?: boolean;
}

/** Liste des chapitres d'une matière pour une classe, groupés par domaine ou par trimestre. */
export function SubjectProgramView({ lang, t, program, showHeading = true, showSource = false }: Props) {
  const color = `var(${SUBJECTS.find((s) => s.id === program.subject)!.colorVar})`;
  const base = `/${lang}/${program.classId}/${program.subject}`;

  return (
    <section id={program.subject} className="scroll-mt-4" style={{ ['--subject' as string]: color }}>
      {showHeading && (
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h2 className="text-2xl sm:text-3xl" style={{ color }}>
            <Link href={base} className="hover:underline">
              {t.subjects[program.subject].name}
            </Link>
          </h2>
          <StatusBadge status={program.status} t={t} />
          <span className="text-sm text-muted">{format(t.program.chapters, { n: program.chapters.length })}</span>
        </div>
      )}
      {program.status === 'anticipe' && <p className="mt-2 max-w-prose text-sm text-muted">{t.program.anticipeNote}</p>}
      {showSource && <p className="mt-2 text-sm text-muted">{format(t.program.source, { source: program.source })}</p>}

      <div className="mt-4 flex flex-col gap-6">
        {groupChapters(program.chapters).map((group) => (
          <div key={group.key || 'all'}>
            {group.kind !== 'none' && (
              <h3 className="mb-2 font-sans text-sm font-bold text-muted">
                {group.kind === 'trimester' ? trimesterLabel(t, Number(group.key)) : group.key}
              </h3>
            )}
            <ol className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface">
              {group.chapters.map((chapter) => (
                <li key={chapter.id}>
                  <Link
                    href={`${base}/${chapter.id}`}
                    className="flex items-start gap-3 px-4 py-3 hover:bg-paper"
                    style={{ boxShadow: 'inset 3px 0 0 var(--subject)' }}
                  >
                    <span className="flex-1">
                      <span className="block font-bold">{chapter.title}</span>
                      {chapter.notions && <span className="block text-sm text-muted">{chapter.notions.join(', ')}</span>}
                      {chapter.complement && <span className="mt-1 block text-sm font-bold text-muted">{t.program.complement}</span>}
                    </span>
                    <span className="flex shrink-0 flex-col items-end gap-1 text-xs text-muted">
                      {chapter.series && <span>{format(t.program.seriesOnly, { series: chapter.series.join(', ') })}</span>}
                      {chapter.hours && <span>{format(t.program.hours, { n: chapter.hours })}</span>}
                      {hasLesson(program.classId, program.subject, chapter.id) && (
                        <span className="rounded-full bg-ink px-2 py-0.5 font-bold text-on-ink">{t.steps.cours.name}</span>
                      )}
                      {chapter.simulation && (
                        <span className="rounded-full bg-focus px-2 py-0.5 font-bold text-ink">{t.steps.simuler.name}</span>
                      )}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </section>
  );
}
