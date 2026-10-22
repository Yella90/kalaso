import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AdventureRunner, type RenderedMission } from '@/components/adventure/AdventureRunner';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { RichText } from '@/components/lesson/RichText';
import { getAdventure, getAdventures } from '@/lib/adventures';
import { getChapter, SUBJECTS } from '@/lib/curriculum';
import { format, getDictionary, hasLocale } from '@/lib/i18n';
import { getViewer, hasFullAccess } from '@/lib/server/auth';
import { LockedPanel } from '@/components/account/LockedPanel';

/** Missions ouvertes à tous dans chaque aventure. */
const FREE_MISSIONS = 2;

export function generateStaticParams() {
  return getAdventures().map((a) => ({ aventure: a.id }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<'/[lang]/aventures/[aventure]'>): Promise<Metadata> {
  const { aventure } = await params;
  const adventure = getAdventure(aventure);
  return adventure ? { title: adventure.title } : {};
}

export default async function AdventurePage({ params }: PageProps<'/[lang]/aventures/[aventure]'>) {
  const { lang, aventure } = await params;
  const adventure = getAdventure(aventure);
  if (!hasLocale(lang) || !adventure) notFound();
  const t = getDictionary(lang);
  const color = `var(${SUBJECTS.find((s) => s.id === adventure.subject)!.colorVar})`;
  const viewer = await getViewer();
  const freeCount = hasFullAccess(viewer) ? adventure.missions.length : FREE_MISSIONS;

  // Les textes et formules sont rendus ici, côté serveur ; le composant client gère les défis.
  const missions: RenderedMission[] = adventure.missions.map((m) => ({
    id: m.id,
    title: m.title,
    story: <RichText text={m.story} />,
    data: (m.data ?? []).map((d) => <RichText key={d} text={d} />),
    notions: m.notions.flatMap((ref) => {
      const chapter = getChapter(ref.classId, ref.subject, ref.chapterId);
      return chapter
        ? [{ href: `/${lang}/${ref.classId}/${ref.subject}/${ref.chapterId}`, label: `${chapter.title} (${t.classShort[ref.classId]})` }]
        : [];
    }),
    question: <RichText text={m.challenge.question} />,
    numeric: m.challenge.kind === 'numeric' ? { answer: m.challenge.answer, unit: m.challenge.unit, tolerance: m.challenge.tolerance } : undefined,
    choices: m.challenge.kind === 'choice' ? m.challenge.choices.map((c) => <RichText key={c} text={c} />) : undefined,
    answer: m.challenge.kind === 'choice' ? m.challenge.answer : undefined,
    hints: m.hints.map((h) => <RichText key={h} text={h} />),
    solution: m.solution.map((s) => <RichText key={s} text={s} />),
    debrief: <RichText text={m.debrief} />,
  }));

  return (
    <div className="mx-auto max-w-3xl px-4 pt-6 sm:px-6" style={{ ['--subject' as string]: color }}>
      <Breadcrumb
        label={t.nav.breadcrumb}
        items={[
          { href: `/${lang}`, label: t.nav.home },
          { href: `/${lang}/aventures`, label: t.adventure.listTitle },
        ]}
      />
      <p className="mt-4 font-bold" style={{ color }}>
        {t.subjects[adventure.subject].name}.{' '}
        {format(t.adventure.forClasses, { classes: adventure.classes.map((c) => t.classShort[c]).join(', ') })}
      </p>
      <h1 className="mt-1 text-4xl sm:text-5xl">{adventure.title}</h1>
      <p className="mt-4 font-serif text-xl leading-relaxed">
        <RichText text={adventure.intro} />
      </p>
      <div className="mt-8">
        <AdventureRunner
          adventureId={adventure.id}
          missions={missions}
          outro={<RichText text={adventure.outro} />}
          freeCount={freeCount}
          lockedPanel={
            <LockedPanel
              lang={lang}
              viewer={viewer}
              returnTo={`/${lang}/aventures/${adventure.id}`}
              text={t.account.locked.adventure}
              t={t.account.locked}
            />
          }
          t={t.adventure}
        />
      </div>
    </div>
  );
}
