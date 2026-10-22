'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { commonNeutrons, MAX_PROTONS } from '@/lib/chemistry/atom';
import { electronConfiguration, getElement, SHELL_NAMES } from '@/lib/chemistry/elements';
import { format, type Dictionary, type Locale } from '@/lib/i18n';
import { AtomDiagram } from './AtomDiagram';
import { Nuclide } from './Nuclide';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

type Particle = 'protons' | 'neutrons' | 'electrons';

const LIMITS: Record<Particle, number> = { protons: MAX_PROTONS, neutrons: 50, electrons: MAX_PROTONS + 4 };

function initialState(z: number) {
  return { protons: z, neutrons: commonNeutrons(z), electrons: z };
}

export function AtomBuilder({ lang, t }: { lang: Locale; t: Dictionary['atom'] }) {
  const params = useSearchParams();
  const requested = Number(params.get('z'));
  const startZ = Number.isInteger(requested) && requested >= 1 && requested <= MAX_PROTONS ? requested : 6;

  const [counts, setCounts] = useState(() => initialState(startZ));
  const reducedMotion = usePrefersReducedMotion();

  const { protons, neutrons, electrons } = counts;
  const element = protons > 0 ? getElement(protons) : undefined;
  const charge = protons - electrons;
  const { shells } = electronConfiguration(electrons, protons);

  function change(particle: Particle, delta: number) {
    setCounts((c) => ({ ...c, [particle]: Math.min(LIMITS[particle], Math.max(0, c[particle] + delta)) }));
  }

  const chargeText =
    charge === 0 ? t.neutral : charge > 0 ? format(t.cation, { n: charge }) : format(t.anion, { n: -charge });

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
      <div className="overflow-hidden rounded-2xl bg-ink">
        <AtomDiagram
          protons={protons}
          neutrons={neutrons}
          electrons={electrons}
          animate={!reducedMotion}
          className="mx-auto block aspect-square w-full max-w-[32rem]"
          title={element ? element.name : t.noElement}
        />
      </div>

      <div className="flex flex-col gap-5">
        <section aria-live="polite" className="rounded-2xl border border-line bg-surface p-5">
          <h2 className="text-sm font-normal text-muted">{t.element}</h2>
          {element ? (
            <div className="mt-1 flex items-center gap-4">
              <Nuclide symbol={element.symbol} a={protons + neutrons} z={protons} charge={charge} className="text-6xl" />
              <div>
                <p className="font-serif text-2xl font-bold">{element.name}</p>
                <p className="text-muted">{chargeText}</p>
              </div>
            </div>
          ) : (
            <p className="mt-1 font-serif text-xl">{t.noElement}</p>
          )}
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-muted">{t.atomicNumber}</dt>
              <dd className="text-lg font-bold">{protons}</dd>
            </div>
            <div>
              <dt className="text-muted">{t.massNumber}</dt>
              <dd className="text-lg font-bold">{protons + neutrons}</dd>
            </div>
            <div className="col-span-2">
              <dt className="text-muted">{t.shells}</dt>
              <dd className="mt-1 flex flex-wrap gap-2">
                {shells.length === 0 && <span>—</span>}
                {shells.map((n, i) => (
                  <span key={i} className="rounded-md bg-paper px-2 py-1 font-bold">
                    {SHELL_NAMES[i]}
                    <sup className="ml-0.5">{n}</sup>
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </section>

        <section className="flex flex-col gap-3">
          {(['protons', 'neutrons', 'electrons'] as Particle[]).map((particle) => (
            <Counter
              key={particle}
              label={t[particle]}
              value={counts[particle]}
              swatch={particle === 'protons' ? '#e8793a' : particle === 'neutrons' ? '#8f9bbf' : 'var(--focus)'}
              addLabel={format(t.add, { particle: t.particle[particle] })}
              removeLabel={format(t.remove, { particle: t.particle[particle] })}
              onAdd={() => change(particle, 1)}
              onRemove={() => change(particle, -1)}
              canAdd={counts[particle] < LIMITS[particle]}
              canRemove={counts[particle] > 0}
            />
          ))}
          <p className="text-sm text-muted">{t.isotopeHint}</p>
          <p className="text-sm text-muted">{t.limit}</p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setCounts(initialState(1))}
              className="rounded-full border border-line px-4 py-2 font-bold hover:border-ink"
            >
              {t.reset}
            </button>
            {element && (
              <Link
                href={`/${lang}/tableau-periodique?z=${element.z}`}
                className="rounded-full bg-ink px-4 py-2 font-bold text-on-ink hover:bg-ink-soft"
              >
                {format(t.seeInTable, { name: element.name })}
              </Link>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

interface CounterProps {
  label: string;
  value: number;
  swatch: string;
  addLabel: string;
  removeLabel: string;
  onAdd: () => void;
  onRemove: () => void;
  canAdd: boolean;
  canRemove: boolean;
}

function Counter({ label, value, swatch, addLabel, removeLabel, onAdd, onRemove, canAdd, canRemove }: CounterProps) {
  const button =
    'grid h-12 w-12 place-items-center rounded-full border border-line bg-surface text-2xl font-bold hover:border-ink disabled:opacity-35 disabled:hover:border-line';
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-3">
      <span className="h-4 w-4 shrink-0 rounded-full" style={{ background: swatch }} aria-hidden="true" />
      <span className="flex-1 font-bold">{label}</span>
      <button type="button" className={button} onClick={onRemove} disabled={!canRemove} aria-label={removeLabel}>
        −
      </button>
      <output className="w-8 text-center text-xl font-bold tabular-nums" aria-label={label}>
        {value}
      </output>
      <button type="button" className={button} onClick={onAdd} disabled={!canAdd} aria-label={addLabel}>
        +
      </button>
    </div>
  );
}
