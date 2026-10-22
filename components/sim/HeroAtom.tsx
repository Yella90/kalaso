'use client';

import { useState } from 'react';
import { commonNeutrons, MAX_PROTONS } from '@/lib/chemistry/atom';
import { getElement } from '@/lib/chemistry/elements';
import { AtomDiagram } from './AtomDiagram';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

interface Props {
  hint: string;
  addLabel: string;
  removeLabel: string;
}

/** Version courte du constructeur pour l'accueil : un seul bouton, l'élément change sous les yeux. */
export function HeroAtom({ hint, addLabel, removeLabel }: Props) {
  // On part du carbone : un atome déjà riche, base du vivant.
  const [z, setZ] = useState(6);
  const reducedMotion = usePrefersReducedMotion();
  const element = getElement(z)!;

  const button =
    'grid h-12 w-12 place-items-center rounded-full border border-on-ink-muted/50 text-2xl font-bold text-on-ink hover:border-on-ink disabled:opacity-30';

  return (
    <div className="flex flex-col items-center">
      <AtomDiagram
        protons={z}
        neutrons={commonNeutrons(z)}
        electrons={z}
        animate={!reducedMotion}
        className="aspect-square w-full max-w-[22rem]"
        title={element.name}
      />
      <div className="mt-2 flex items-center gap-5">
        <button type="button" className={button} onClick={() => setZ((v) => Math.max(1, v - 1))} disabled={z <= 1} aria-label={removeLabel}>
          −
        </button>
        <p aria-live="polite" className="min-w-36 text-center">
          <span className="block font-serif text-4xl font-bold leading-none text-on-ink">{element.symbol}</span>
          <span className="text-on-ink-muted">
            {element.name}, Z = {z}
          </span>
        </p>
        <button
          type="button"
          className={button}
          onClick={() => setZ((v) => Math.min(MAX_PROTONS, v + 1))}
          disabled={z >= MAX_PROTONS}
          aria-label={addLabel}
        >
          +
        </button>
      </div>
      <p className="mt-2 text-sm text-on-ink-muted">{hint}</p>
    </div>
  );
}
