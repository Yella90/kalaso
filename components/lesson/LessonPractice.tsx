import { format, type Dictionary } from '@/lib/i18n';
import type { Application, Exercise, Lesson } from '@/lib/lessons/types';
import { QuizRunner } from './QuizRunner';
import { RichText } from './RichText';

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

function ExerciseCard({ exercise, index, t }: { exercise: Exercise; index: number; t: Dictionary['lesson'] }) {
  return (
    <li className="rounded-xl border border-line bg-surface p-4">
      <p className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="font-serif text-lg font-bold">{format(t.exercise, { n: index + 1 })}</span>
        <span className="text-sm text-muted">{t.level[exercise.level]}</span>
      </p>
      <p className="mt-2">
        <RichText text={exercise.statement} />
      </p>
      {exercise.questions && (
        <ol className="mt-2 list-decimal space-y-1 pl-5">
          {exercise.questions.map((q) => (
            <li key={q}>
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
      <Solution label={t.solution} lines={exercise.solution} />
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
    </div>
  );
}

function ApplicationCard({ application, t }: { application: Application; t: Dictionary['lesson'] }) {
  return (
    <li className="rounded-2xl border border-line bg-surface p-5">
      <h4 className="font-serif text-xl font-bold">
        <RichText text={application.title} />
      </h4>
      <p className="mt-2">
        <RichText text={application.situation} />
      </p>
      <ol className="mt-3 list-decimal space-y-1 pl-5">
        {application.questions.map((q) => (
          <li key={q}>
            <RichText text={q} />
          </li>
        ))}
      </ol>
      <Solution label={t.solution} lines={application.solution} />
    </li>
  );
}

export function LessonApplications({ lesson, t }: { lesson: Lesson; t: Dictionary['lesson'] }) {
  return (
    <ul className="flex flex-col gap-5">
      {lesson.applications.map((a) => (
        <ApplicationCard key={a.title} application={a} t={t} />
      ))}
    </ul>
  );
}
