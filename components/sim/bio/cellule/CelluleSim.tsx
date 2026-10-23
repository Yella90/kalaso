'use client';

import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import { Figure } from '@/components/figures/Figure';
import { format, type Dictionary } from '@/lib/i18n';
import { MEDIA, type MediaId } from '@/lib/media';
import type { CellKind, OrganelleId } from './CelluleScene';

const CelluleScene = dynamic(() => import('./CelluleScene'), {
  ssr: false,
  loading: () => <div className="grid h-full place-items-center text-slate-400">…</div>,
});

type T = Dictionary['sims']['cellule-3d'];

const ORDER: Record<CellKind, OrganelleId[]> = {
  animale: ['membrane', 'noyau', 'nucleole', 'reticulum', 'golgi', 'vesicule', 'mitochondrie', 'lysosome', 'centrioles'],
  vegetale: ['paroi', 'membrane', 'vacuole', 'chloroplaste', 'noyau', 'nucleole', 'reticulum', 'golgi', 'vesicule', 'mitochondrie'],
};

const ONLY: Partial<Record<OrganelleId, CellKind>> = {
  lysosome: 'animale',
  centrioles: 'animale',
  chloroplaste: 'vegetale',
  vacuole: 'vegetale',
  paroi: 'vegetale',
};

const PHOTO: Partial<Record<OrganelleId, MediaId>> = {
  mitochondrie: 'mitochondrie-meb',
  chloroplaste: 'chloroplaste-met',
  noyau: 'oignon-epiderme',
  paroi: 'oignon-epiderme',
  vacuole: 'plasmolyse-oignon-rouge',
  lysosome: 'phagocytose',
  membrane: 'sang-meb',
};

const QUESTIONS: { key: keyof T['questions']; answer: OrganelleId }[] = [
  { key: 'atp', answer: 'mitochondrie' },
  { key: 'adn', answer: 'noyau' },
  { key: 'photo', answer: 'chloroplaste' },
  { key: 'emballe', answer: 'golgi' },
  { key: 'proteines', answer: 'reticulum' },
  { key: 'eau', answer: 'vacuole' },
  { key: 'echanges', answer: 'membrane' },
  { key: 'digere', answer: 'lysosome' },
  { key: 'rigide', answer: 'paroi' },
  { key: 'division', answer: 'centrioles' },
];

interface Challenge {
  index: number;
  firstTry: number;
  missed: boolean;
  feedback: { ok: boolean; picked: OrganelleId } | null;
}

export function CelluleSim({ t }: { t: T }) {
  const [started, setStarted] = useState(false);
  const [kind, setKind] = useState<CellKind>('animale');
  const [selected, setSelected] = useState<OrganelleId | null>(null);
  const [labels, setLabels] = useState(true);
  const [cut, setCut] = useState(true);
  const [motion, setMotion] = useState(true);
  const [challenge, setChallenge] = useState<Challenge | null>(null);

  const names = useMemo(
    () => Object.fromEntries(Object.entries(t.items).map(([k, v]) => [k, v.name])) as Record<OrganelleId, string>,
    [t.items],
  );
  const questions = QUESTIONS.filter((q) => ORDER[kind].includes(q.answer));
  const question = challenge ? questions[challenge.index] : null;

  function choose(id: OrganelleId | null) {
    setSelected(id);
    if (!challenge || !question || !id || challenge.feedback?.ok) return;
    const ok = id === question.answer;
    setChallenge({
      ...challenge,
      firstTry: challenge.firstTry + (ok && !challenge.missed ? 1 : 0),
      missed: challenge.missed || !ok,
      feedback: { ok, picked: id },
    });
  }

  function next() {
    if (!challenge) return;
    setSelected(null);
    setChallenge({ index: challenge.index + 1, firstTry: challenge.firstTry, missed: false, feedback: null });
  }

  function switchKind(k: CellKind) {
    setKind(k);
    setSelected(null);
    setChallenge(null);
  }

  const item = selected ? t.items[selected] : null;
  const photo = selected ? PHOTO[selected] : undefined;
  const only = selected ? ONLY[selected] : undefined;
  const finished = challenge !== null && challenge.index >= questions.length;

  if (!started) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-line bg-surface p-4 text-center sm:p-6">
        <div className="w-full max-w-lg">
          <Figure id="cellule-animale" />
        </div>
        <p className="max-w-md text-muted">{t.note}</p>
        <button type="button" onClick={() => setStarted(true)} className="rounded-full bg-ink px-6 py-3 font-bold text-on-ink hover:bg-ink-soft">
          {t.start}
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <div className="flex flex-col gap-3">
        <div className="relative h-[24rem] overflow-hidden rounded-2xl bg-[#0b1020] sm:h-[30rem]">
          <CelluleScene kind={kind} selected={selected} onSelect={choose} labels={labels} cut={cut} motion={motion} names={names} />
          <p className="pointer-events-none absolute inset-x-3 bottom-2 text-center text-xs text-slate-400">{t.hint}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-bold text-muted">{t.cellType}</span>
          {(['animale', 'vegetale'] as const).map((k) => (
            <button
              key={k}
              type="button"
              aria-pressed={kind === k}
              onClick={() => switchKind(k)}
              className={`rounded-full border-2 px-4 py-1.5 text-sm font-bold ${kind === k ? 'border-ink bg-ink text-on-ink' : 'border-line bg-surface'}`}
            >
              {t.cells[k]}
            </button>
          ))}
          <span className="mx-1 h-6 w-px bg-line" aria-hidden="true" />
          {[
            [labels, setLabels, t.labels],
            [cut, setCut, t.cut],
            [motion, setMotion, t.motion],
          ].map(([value, set, label]) => (
            <label key={label as string} className="flex items-center gap-1.5 text-sm">
              <input
                type="checkbox"
                checked={value as boolean}
                onChange={(e) => (set as (v: boolean) => void)(e.target.checked)}
                className="h-4 w-4 accent-[var(--subject,var(--ink))]"
              />
              {label as string}
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <section className="rounded-2xl border border-line bg-surface p-4">
          {item && selected ? (
            <>
              <h3 className="font-serif text-xl font-bold">{item.name}</h3>
              <p className="mt-2">
                <span className="font-bold">{t.role} : </span>
                {item.role}
              </p>
              <p className="mt-2 text-sm">
                <span className="font-bold">{t.size} : </span>
                {item.size}
              </p>
              <p className="mt-1 text-sm">
                <span className="font-bold">{t.where} : </span>
                {only === 'animale' ? t.onlyAnimal : only === 'vegetale' ? t.onlyPlant : t.both}
              </p>
              {photo && (
                <figure className="mt-3 overflow-hidden rounded-xl border border-line">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={MEDIA[photo].src} alt={MEDIA[photo].alt} className="h-40 w-full bg-paper object-cover" loading="lazy" />
                  <figcaption className="px-3 py-2 text-xs text-muted">
                    {t.photo} · {MEDIA[photo].author} ·{' '}
                    <a href={MEDIA[photo].page} target="_blank" rel="noopener noreferrer" className="underline">
                      {MEDIA[photo].license}
                    </a>
                  </figcaption>
                </figure>
              )}
            </>
          ) : (
            <p className="text-muted">{t.pick}</p>
          )}
        </section>

        <section className="rounded-2xl border border-line bg-surface p-4">
          <p className="text-sm font-bold text-muted">{t.organelles}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {ORDER[kind].map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => choose(id)}
                aria-pressed={selected === id}
                className={`rounded-full border px-3 py-1 text-sm ${selected === id ? 'border-ink bg-ink text-on-ink' : 'border-line hover:border-ink'}`}
              >
                {t.items[id].name}
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-ink p-4 text-on-ink">
          <p className="text-sm font-bold text-on-ink-muted">{t.challenge}</p>
          {!challenge ? (
            <button
              type="button"
              onClick={() => {
                setSelected(null);
                setChallenge({ index: 0, firstTry: 0, missed: false, feedback: null });
              }}
              className="mt-2 rounded-full bg-amber-300 px-4 py-2 font-bold text-slate-950"
            >
              {t.challengeStart}
            </button>
          ) : finished ? (
            <>
              <p className="mt-1 font-bold">{format(t.challengeDone, { n: challenge.firstTry, total: questions.length })}</p>
              <button
                type="button"
                onClick={() => setChallenge({ index: 0, firstTry: 0, missed: false, feedback: null })}
                className="mt-2 rounded-full bg-amber-300 px-4 py-2 font-bold text-slate-950"
              >
                {t.challengeAgain}
              </button>
            </>
          ) : (
            question && (
              <>
                <p className="mt-1 text-xs text-on-ink-muted">{format(t.challengeScore, { n: challenge.index + 1, total: questions.length })}</p>
                <p className="mt-1">
                  {t.challengeFind} <span className="font-bold">{t.questions[question.key]}</span>
                </p>
                <div role="status" className="mt-2 min-h-6">
                  {challenge.feedback &&
                    (challenge.feedback.ok ? (
                      <p className="font-bold text-emerald-300">{t.challengeRight}</p>
                    ) : (
                      <p className="font-bold text-amber-200">{format(t.challengeWrong, { name: t.items[challenge.feedback.picked].name })}</p>
                    ))}
                </div>
                <button type="button" onClick={next} className={`mt-2 rounded-full px-4 py-1.5 text-sm font-bold ${challenge.feedback?.ok ? 'bg-amber-300 text-slate-950' : 'border border-on-ink-muted'}`}>
                  {challenge.feedback?.ok ? '→' : t.challengeSkip}
                </button>
              </>
            )
          )}
        </section>
      </div>
    </div>
  );
}
