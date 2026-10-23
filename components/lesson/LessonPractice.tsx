import { format, type Dictionary } from '@/lib/i18n';
import type { Application, Exercise, ExercisePart, Lesson } from '@/lib/lessons/types';
import { AnswerCheck } from './AnswerCheck';
import { ExerciseDiagram } from './ExerciseDiagram';
import { QuizRunner } from './QuizRunner';
import { RichText, TexBlock } from './RichText';

function Solution({ label, lines }: { label: string; lines: string[] }) {
  return (
    <details className="group mt-3 rounded-lg bg-paper px-4 py-2">
      <summary className="cursor-pointer font-bold">{label}</summary>
      <div className="mt-2 space-y-2 pb-1">
        {lines.map((line, i) => (
          <p key={i}>
            <RichText text={line} />
          </p>
        ))}
      </div>
    </details>
  );
}

function Given({ items, t }: { items: { label: string; value: string }[]; t: Dictionary['lesson'] }) {
  return (
    <div className="mt-3 rounded-lg bg-paper px-4 py-2">
      <p className="text-sm font-bold text-muted">{t.given}</p>
      <dl className="mt-1 grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-4">
        {items.map((g, i) => (
          <div key={i}>
            <dt className="text-sm text-muted">
              <RichText text={g.label} />
            </dt>
            <dd className="font-bold">
              <RichText text={g.value} />
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** Question à réponse vérifiée, avec sa correction pas à pas. */
function PartView({ part, t }: { part: ExercisePart; t: Dictionary['lesson'] }) {
  const { answer } = part;
  return (
    <li>
      <p>
        <RichText text={part.label} />
      </p>
      <AnswerCheck
        t={t}
        spec={
          answer.kind === 'number'
            ? { kind: 'number', value: answer.value, tolerance: answer.tolerance, unit: answer.unit }
            : { kind: 'text', accepted: answer.accepted }
        }
      />
      <details className="mt-1 rounded-lg bg-paper px-4 py-2">
        <summary className="cursor-pointer font-bold">{t.steps}</summary>
        <div className="mt-2 space-y-2 pb-1">
          {part.steps.map((step, i) => (
            <p key={i}>
              <RichText text={step} />
            </p>
          ))}
          {part.result ? (
            <div className="rounded-lg border border-line bg-surface px-3">
              <TexBlock tex={part.result} />
            </div>
          ) : (
            answer.kind === 'text' && (
              <p>
                <span className="font-bold">{t.expected} : </span>
                <RichText text={answer.display} />
              </p>
            )
          )}
        </div>
      </details>
    </li>
  );
}

function ExerciseCard({ exercise, index, t }: { exercise: Exercise; index: number; t: Dictionary['lesson'] }) {
  return (
    <li className="rounded-xl border border-line bg-surface p-4">
      <p className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="font-serif text-lg font-bold">
          {format(t.exercise, { n: index + 1 })}
          {exercise.title && (
            <>
              {' : '}
              <RichText text={exercise.title} />
            </>
          )}
        </span>
        <span className="text-sm text-muted">{t.level[exercise.level]}</span>
      </p>
      {exercise.source && <p className="text-sm text-muted">{exercise.source}</p>}
      <p className="mt-2">
        <RichText text={exercise.statement} />
      </p>
      {exercise.given && exercise.given.length > 0 && <Given items={exercise.given} t={t} />}
      {exercise.diagram && <ExerciseDiagram diagram={exercise.diagram} t={t} />}
      {exercise.questions && (
        <ol className="mt-2 list-decimal space-y-1 pl-5">
          {exercise.questions.map((q, i) => (
            <li key={i}>
              <RichText text={q} />
            </li>
          ))}
        </ol>
      )}
      {exercise.hints?.map((hint, i) => (
        <details key={i} className="mt-3 rounded-lg border border-dashed border-line px-4 py-2">
          <summary className="cursor-pointer text-muted">
            {t.hint}
            {exercise.hints!.length > 1 ? ` ${i + 1}` : ''}
          </summary>
          <p className="mt-2">
            <RichText text={hint} />
          </p>
        </details>
      ))}
      {exercise.parts && (
        <ol className="mt-4 list-decimal space-y-4 pl-5">
          {exercise.parts.map((part, i) => (
            <PartView key={i} part={part} t={t} />
          ))}
        </ol>
      )}
      {exercise.solution && exercise.solution.length > 0 && <Solution label={t.solution} lines={exercise.solution} />}
    </li>
  );
}

export function LessonExercises({ lesson, quizKey, t }: { lesson: Lesson; quizKey: string; t: Dictionary['lesson'] }) {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <h3 className="text-2xl">{t.exercises}</h3>
        <ol className="mt-4 flex flex-col gap-4">
          {lesson.exercises.map((exercise, i) => (
            <ExerciseCard key={exercise.id} exercise={exercise} index={i} t={t} />
          ))}
        </ol>
      </div>
      {lesson.quiz.length > 0 && (
        <div>
          <h3 className="text-2xl">{t.quiz}</h3>
          <p className="mt-1 text-muted">{t.quizIntro}</p>
          {/* Les formules sont rendues ici, côté serveur ; le quiz ne gère que l'interaction. */}
          <QuizRunner
            t={t}
            quizKey={quizKey}
            questions={lesson.quiz.map((q) => ({
              question: <RichText text={q.question} />,
              choices: q.choices.map((c) => <RichText key={c} text={c} />),
              answer: q.answer,
              explanation: <RichText text={q.explanation} />,
            }))}
          />
        </div>
      )}
    </div>
  );
}

function ApplicationCard({ application, t }: { application: Application; t: Dictionary['lesson'] }) {
  return (
    <li className="rounded-2xl border border-line bg-surface p-5">
      <h4 className="font-serif text-xl font-bold">
        <RichText text={application.title} />
      </h4>
      {application.tagline && (
        <p className="text-muted">
          <RichText text={application.tagline} />
        </p>
      )}
      <p className="mt-2">
        <RichText text={application.situation} />
      </p>
      {application.model && (
        <p className="mt-2 text-[0.95rem]">
          <span className="font-bold">{t.model} : </span>
          <RichText text={application.model} />
        </p>
      )}
      <ol className="mt-3 list-decimal space-y-1 pl-5">
        {application.questions.map((q, i) => (
          <li key={i}>
            <RichText text={q} />
          </li>
        ))}
      </ol>
      {application.check && <AnswerCheck t={t} spec={{ kind: 'number', ...application.check, relative: true }} />}
      <Solution label={t.solution} lines={application.solution} />
      {application.fact && (
        <p className="mt-3 rounded-lg border-l-4 border-ink bg-paper px-4 py-2">
          <span className="font-bold">{t.fact} </span>
          <RichText text={application.fact} />
        </p>
      )}
    </li>
  );
}

export function LessonApplications({ lesson, t }: { lesson: Lesson; t: Dictionary['lesson'] }) {
  return (
    <ul className="flex flex-col gap-5">
      {lesson.applications.map((a, i) => (
        <ApplicationCard key={i} application={a} t={t} />
      ))}
    </ul>
  );
}
