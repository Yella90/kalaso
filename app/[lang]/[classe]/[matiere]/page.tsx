import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { StatusBadge, SubjectProgramView } from '@/components/program/SubjectProgramView';
import { getAllPrograms, getProgram, isClassId, isSubjectId, SUBJECTS } from '@/lib/curriculum';
import { format, getDictionary, hasLocale } from '@/lib/i18n';
import { OfflineSaver } from '@/components/pwa/OfflineSaver';

export function generateStaticParams() {
  return getAllPrograms().map((p) => ({ classe: p.classId, matiere: p.subject }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<'/[lang]/[classe]/[matiere]'>): Promise<Metadata> {
  const { lang, classe, matiere } = await params;
  if (!hasLocale(lang) || !isClassId(classe) || !isSubjectId(matiere)) return {};
  const t = getDictionary(lang);
  return { title: `${t.subjects[matiere].name}, ${t.classes[classe]}` };
}

export default async function SubjectPage({ params }: PageProps<'/[lang]/[classe]/[matiere]'>) {
  const { lang, classe, matiere } = await params;
  if (!hasLocale(lang) || !isClassId(classe) || !isSubjectId(matiere)) notFound();
  const program = getProgram(classe, matiere);
  if (!program) notFound();
  const t = getDictionary(lang);
  const color = `var(${SUBJECTS.find((s) => s.id === matiere)!.colorVar})`;

  return (
    <div className="mx-auto max-w-4xl px-4 pt-6 sm:px-6">
      <Breadcrumb label={t.nav.breadcrumb}
        items={[
          { href: `/${lang}`, label: t.nav.home },
          { href: `/${lang}/${classe}`, label: t.classes[classe] },
        ]}
      />
      <h1 className="mt-3 text-4xl sm:text-5xl" style={{ color }}>
        {t.subjects[matiere].name}
      </h1>
      <p className="mt-2 flex flex-wrap items-center gap-3 text-muted">
        <span>{t.classes[classe]}</span>
        <StatusBadge status={program.status} t={t} />
        <span>{format(t.program.chapters, { n: program.chapters.length })}</span>
      </p>
      <OfflineSaver urls={program.chapters.map((c) => `/${lang}/${classe}/${matiere}/${c.id}`)} t={t.offline} />
      <div className="mt-6">
        <SubjectProgramView lang={lang} t={t} program={program} showHeading={false} showSource />
      </div>
    </div>
  );
}
