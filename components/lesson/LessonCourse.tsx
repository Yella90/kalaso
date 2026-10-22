import type { Dictionary } from '@/lib/i18n';
import type { Block, Lesson } from '@/lib/lessons/types';
import { RichText, TexBlock } from './RichText';

function BlockView({ block, t }: { block: Block; t: Dictionary['lesson'] }) {
  switch (block.kind) {
    case 'text':
      return (
        <p>
          <RichText text={block.text} />
        </p>
      );
    case 'definition':
      return (
        <div className="rounded-xl border-l-4 border-[var(--subject)] bg-surface px-4 py-3">
          <p className="text-sm font-bold text-muted">{t.definition}</p>
          <p className="mt-1">
            <strong>
              <RichText text={block.term} />
            </strong>{' '}
            : <RichText text={block.text} />
          </p>
        </div>
      );
    case 'rule':
      return (
        <div className="rounded-xl bg-ink px-4 py-3 text-on-ink">
          <p className="text-sm font-bold text-on-ink-muted">{t.rule}</p>
          <p className="mt-1">
            <RichText text={block.text} />
          </p>
        </div>
      );
    case 'formula':
      return (
        <div className="rounded-xl border border-line bg-surface px-4 py-3">
          <TexBlock tex={block.tex} />
          {block.legend && (
            <ul className="mt-1 text-sm text-muted">
              {block.legend.map((line) => (
                <li key={line}>
                  <RichText text={line} />
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    case 'example':
      return (
        <div className="rounded-xl border border-dashed border-line px-4 py-3">
          <p className="text-sm font-bold text-muted">
            {t.example}
            {block.title && (
              <>
                {' : '}
                <RichText text={block.title} />
              </>
            )}
          </p>
          <p className="mt-1">
            <RichText text={block.text} />
          </p>
          {block.steps && (
            <ol className="mt-2 list-decimal space-y-1 pl-5">
              {block.steps.map((step) => (
                <li key={step}>
                  <RichText text={step} />
                </li>
              ))}
            </ol>
          )}
        </div>
      );
    case 'trap':
      return (
        <div className="rounded-xl border-2 border-alert/40 bg-alert-soft px-4 py-3">
          <p className="font-bold text-alert-ink">{t.trap}</p>
          <p className="mt-1">
            <s className="decoration-alert/60">
              <RichText text={block.wrong} />
            </s>
          </p>
          <p className="mt-2 text-sm font-bold text-muted">{t.trapWhy}</p>
          <p>
            <RichText text={block.why} />
          </p>
          <p className="mt-2 text-sm font-bold text-muted">{t.trapReflex}</p>
          <p>
            <RichText text={block.reflex} />
          </p>
        </div>
      );
    case 'table':
      return (
        <div className="overflow-x-auto rounded-xl border border-line bg-surface">
          <table className="w-full text-left text-[0.95rem]">
            <thead className="bg-paper">
              <tr>
                {block.head.map((h) => (
                  <th key={h} scope="col" className="px-3 py-2 font-bold">
                    <RichText text={h} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {block.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} className="px-3 py-2">
                      <RichText text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

export function LessonCourse({ lesson, t }: { lesson: Lesson; t: Dictionary['lesson'] }) {
  return (
    <div className="flex flex-col gap-8">
      <p className="font-serif text-xl leading-relaxed">
        <RichText text={lesson.hook} />
      </p>

      <div>
        <p className="font-bold">{t.objectives}</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          {lesson.objectives.map((o) => (
            <li key={o}>
              <RichText text={o} />
            </li>
          ))}
        </ul>
      </div>

      {lesson.sections.map((section, i) => (
        <section key={section.title} className="flex flex-col gap-4">
          <h3 className="text-2xl">
            {i + 1}. <RichText text={section.title} />
          </h3>
          {section.blocks.map((block, j) => (
            <BlockView key={j} block={block} t={t} />
          ))}
        </section>
      ))}

      <section className="rounded-2xl border-2 border-ink p-5">
        <h3 className="text-2xl">{t.essentials}</h3>
        <ol className="mt-3 list-decimal space-y-2 pl-5">
          {lesson.essentials.map((e) => (
            <li key={e}>
              <RichText text={e} />
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
