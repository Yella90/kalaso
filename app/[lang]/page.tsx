import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BogolanBand } from '@/components/layout/BogolanBand';
import { HeroAtom } from '@/components/sim/HeroAtom';
import { CLASSES, CYCLES, getAllPrograms, SUBJECTS } from '@/lib/curriculum';
import { format, getDictionary, hasLocale } from '@/lib/i18n';

export default async function HomePage({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  const programs = getAllPrograms();

  const chaptersInClass = (classId: string) =>
    programs.filter((p) => p.classId === classId).reduce((sum, p) => sum + p.chapters.length, 0);
  const chaptersInSubject = (subject: string) =>
    programs.filter((p) => p.subject === subject).reduce((sum, p) => sum + p.chapters.length, 0);

  return (
    <>
      <section className="bg-ink text-on-ink">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 pb-10 pt-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_24rem] lg:py-16">
          <div>
            <h1 className="text-[2.6rem] leading-[1.05] sm:text-6xl">{t.home.heroTitle}</h1>
            <p className="mt-5 max-w-[34rem] text-lg text-on-ink-muted">{t.home.heroText}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={`/${lang}/atome`} className="rounded-full bg-focus px-5 py-3 font-bold text-ink hover:brightness-105">
                {t.home.heroCta}
              </Link>
              <Link
                href={`/${lang}/tableau-periodique`}
                className="rounded-full border border-on-ink-muted/60 px-5 py-3 font-bold hover:border-on-ink"
              >
                {t.home.heroSecondary}
              </Link>
            </div>
          </div>
          <HeroAtom
            hint={t.home.heroHint}
            addLabel={format(t.atom.add, { particle: t.atom.particle.protons })}
            removeLabel={format(t.atom.remove, { particle: t.atom.particle.protons })}
          />
        </div>
      </section>
      <BogolanBand />

      <section id="classes" className="mx-auto max-w-6xl scroll-mt-4 px-4 pt-14 sm:px-6">
        <h2 className="text-3xl sm:text-4xl">{t.home.chooseClass}</h2>
        <p className="mt-2 max-w-prose text-muted">{t.home.chooseClassText}</p>

        <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-6">
          {CYCLES.map((cycle) => {
            const classes = CLASSES.filter((c) => c.cycle === cycle);
            const exam = classes.find((c) => c.exam)?.exam;
            return (
              <div key={cycle}>
                <h3 className="font-sans text-base font-bold text-muted">{t.cycles[cycle]}</h3>
                {/* Un parcours : les classes se suivent jusqu'à l'examen. */}
                <ol className="mt-3 flex flex-col gap-2 sm:flex-row">
                  {classes.map((c) => (
                    <li key={c.id} className="sm:flex-1">
                      <Link
                        href={`/${lang}/${c.id}`}
                        className="group flex items-baseline gap-3 rounded-xl border border-line bg-surface px-4 py-3 hover:border-ink sm:flex-col sm:gap-1 sm:py-4"
                      >
                        <span className="font-serif text-4xl font-bold leading-none">{t.classShort[c.id]}</span>
                        <span className="text-sm text-muted">{format(t.program.chapters, { n: chaptersInClass(c.id) })}</span>
                      </Link>
                    </li>
                  ))}
                </ol>
                {exam && (
                  <p className="mt-3 flex items-center gap-2 text-sm font-bold">
                    <span className="h-2.5 w-2.5 rotate-45 bg-focus" aria-hidden="true" />
                    {t.exam[exam]}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-16 sm:px-6">
        <h2 className="text-3xl sm:text-4xl">{t.home.subjectsTitle}</h2>
        <ul className="mt-6 divide-y divide-line border-y border-line">
          {SUBJECTS.map((s) => (
            <li key={s.id} className="flex items-center gap-4 py-4">
              <span className="h-10 w-1.5 shrink-0 rounded-full" style={{ background: `var(${s.colorVar})` }} aria-hidden="true" />
              <div className="flex-1">
                <p className="font-serif text-xl font-bold" style={{ color: `var(${s.colorVar})` }}>
                  {t.subjects[s.id].name}
                </p>
                <p className="text-muted">{t.subjects[s.id].text}</p>
              </div>
              <p className="shrink-0 text-sm text-muted">{format(t.program.chapters, { n: chaptersInSubject(s.id) })}</p>
            </li>
          ))}
        </ul>

        <h3 className="mt-12 text-2xl">{t.home.methodTitle}</h3>
        <ol className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(['cours', 'simuler', 'exercer', 'appliquer'] as const).map((step, i) => (
            <li key={step} className="border-t-2 border-ink pt-3">
              <p className="font-serif text-lg font-bold">
                {i + 1}. {t.steps[step].name}
              </p>
              <p className="mt-1 text-muted">{t.steps[step].text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-16 sm:px-6">
        <div className="rounded-2xl bg-ink p-6 text-on-ink sm:p-10">
          <h2 className="text-3xl sm:text-4xl">{t.home.adventureTitle}</h2>
          <p className="mt-3 max-w-prose text-on-ink-muted">{t.home.adventureText}</p>
          <p className="mt-8 font-serif text-2xl font-bold">{t.home.adventureExample}</p>
          <ol className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.home.adventureSteps.map((step, i) => (
              <li key={step.title} className="rounded-xl border border-ink-soft p-4">
                <p className="font-bold">
                  {i + 1}. {step.title}
                </p>
                <p className="mt-1 text-sm text-on-ink-muted">{step.notions}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-on-ink-muted">{t.home.adventureSoon}</p>
        </div>
      </section>
    </>
  );
}
