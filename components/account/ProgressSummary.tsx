'use client';

import Link from 'next/link';
import type { Dictionary, Locale } from '@/lib/i18n';
import { useProgress } from '@/lib/progress/store';

/** Résumé de la progression gardée dans le navigateur. */
export function ProgressSummary({
  lang,
  chapterTitles,
  t,
}: {
  lang: Locale;
  /** Titre de chaque chapitre, par clé « classe/matière/chapitre ». */
  chapterTitles: Record<string, string>;
  t: Dictionary['account'];
}) {
  const progress = useProgress();
  const missions = Object.values(progress.adventures).reduce((sum, m) => sum + m.length, 0);
  const quizzes = Object.keys(progress.quizzes).length;
  const recent = Object.entries(progress.chapters)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .filter(([key]) => key in chapterTitles);

  return (
    <div>
      <dl className="grid grid-cols-3 gap-3">
        {[
          [t.missionsDone, missions],
          [t.quizzesDone, quizzes],
          [t.chaptersVisited, Object.keys(progress.chapters).length],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl bg-paper p-3">
            <dt className="text-sm text-muted">{label}</dt>
            <dd className="font-serif text-3xl font-bold">{value}</dd>
          </div>
        ))}
      </dl>
      {recent.length > 0 && (
        <div className="mt-4">
          <p className="font-bold">{t.lastChapters}</p>
          <ul className="mt-2 space-y-1">
            {recent.map(([key]) => (
              <li key={key}>
                <Link href={`/${lang}/${key}`} className="underline">
                  {chapterTitles[key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
