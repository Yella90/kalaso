import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { SubjectProgramView } from '@/components/program/SubjectProgramView';
import { CLASSES, getClass, getProgram, isClassId, SUBJECTS } from '@/lib/curriculum';
import { getDictionary, hasLocale } from '@/lib/i18n';

export function generateStaticParams() {
  return CLASSES.map((c) => ({ classe: c.id }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<'/[lang]/[classe]'>): Promise<Metadata> {
  const { lang, classe } = await params;
  if (!hasLocale(lang) || !isClassId(classe)) return {};
  return { title: getDictionary(lang).classes[classe] };
}

export default async function ClassPage({ params }: PageProps<'/[lang]/[classe]'>) {
  const { lang, classe } = await params;
  if (!hasLocale(lang) || !isClassId(classe)) notFound();
  const t = getDictionary(lang);
  const info = getClass(classe);
  const programs = SUBJECTS.map((s) => getProgram(classe, s.id)).filter((p) => p !== undefined);

  return (
    <div className="mx-auto max-w-4xl px-4 pt-6 sm:px-6">
      <Breadcrumb items={[{ href: `/${lang}`, label: t.nav.home }, { href: `/${lang}#classes`, label: t.nav.classes }]} />
      <h1 className="mt-3 text-4xl sm:text-5xl">{t.classes[classe]}</h1>
      <p className="mt-2 text-muted">
        {t.cycles[info.cycle]}
        {info.series && `. ${t.program.series} : ${info.series.join(', ')}`}
        {info.exam && `. ${t.exam[info.exam]}`}
      </p>

      <nav aria-label={t.home.subjectsTitle} className="sticky top-0 z-10 -mx-4 mt-6 flex gap-2 overflow-x-auto bg-paper/95 px-4 py-3 backdrop-blur sm:mx-0 sm:px-0">
        {programs.map((p) => {
          const color = `var(${SUBJECTS.find((s) => s.id === p.subject)!.colorVar})`;
          return (
            <Link
              key={p.subject}
              href={`#${p.subject}`}
              className="shrink-0 rounded-full border-2 px-4 py-1.5 font-bold"
              style={{ borderColor: color, color }}
            >
              {t.subjects[p.subject].short}
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 flex flex-col gap-14">
        {programs.map((p) => (
          <SubjectProgramView key={p.subject} lang={lang} t={t} program={p} />
        ))}
      </div>
    </div>
  );
}
