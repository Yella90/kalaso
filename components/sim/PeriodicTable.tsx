'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { commonNeutrons, MAX_PROTONS } from '@/lib/chemistry/atom';
import { ELEMENTS, SHELL_NAMES, type ChemicalElement, type ElementCategory } from '@/lib/chemistry/elements';
import type { Dictionary, Locale } from '@/lib/i18n';
import { AtomDiagram } from './AtomDiagram';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

const CATEGORIES = Object.keys({
  'metal-alcalin': 0,
  'alcalino-terreux': 0,
  transition: 0,
  'metal-pauvre': 0,
  metalloide: 0,
  'non-metal': 0,
  halogene: 0,
  'gaz-noble': 0,
  lanthanide: 0,
  actinide: 0,
} satisfies Record<ElementCategory, 0>) as ElementCategory[];

/** Ligne et colonne de la grille : les lanthanides et actinides sont reportés sous le tableau. */
function cell(e: ChemicalElement): { row: number; col: number } {
  if (e.category === 'lanthanide') return { row: 9, col: e.z - 57 + 3 };
  if (e.category === 'actinide') return { row: 10, col: e.z - 89 + 3 };
  return { row: e.period, col: e.group! };
}

export function PeriodicTable({ lang, t }: { lang: Locale; t: Dictionary['table'] }) {
  const params = useSearchParams();
  const requested = Number(params.get('z'));
  const [selected, setSelected] = useState<number>(requested >= 1 && requested <= 118 ? requested : 8);
  const [family, setFamily] = useState<ElementCategory | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const element = ELEMENTS[selected - 1];

  return (
    <div className="flex flex-col gap-6">
      <fieldset>
        <legend className="mb-2 font-bold">{t.legend}</legend>
        <div className="flex flex-wrap gap-2">
          <FamilyButton active={family === null} onClick={() => setFamily(null)} label={t.filterAll} />
          {CATEGORIES.map((c) => (
            <FamilyButton
              key={c}
              active={family === c}
              onClick={() => setFamily(family === c ? null : c)}
              label={t.categories[c]}
              swatch={`var(--el-${c})`}
            />
          ))}
        </div>
      </fieldset>

      <p className="text-sm text-muted">{t.selectHint}</p>

      {/* Le tableau garde ses 18 colonnes : sur téléphone, il défile dans son cadre et la page reste fixe. */}
      <div className="-mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0" tabIndex={0} aria-label={t.title}>
        <div
          className="grid min-w-[52rem] gap-[3px]"
          style={{ gridTemplateColumns: 'repeat(18, minmax(0, 1fr))', gridTemplateRows: 'repeat(7, auto) 0.75rem auto auto' }}
        >
          {ELEMENTS.map((e) => {
            const { row, col } = cell(e);
            const dimmed = family !== null && e.category !== family;
            const isSelected = e.z === selected;
            return (
              <button
                key={e.z}
                type="button"
                onClick={() => setSelected(e.z)}
                aria-pressed={isSelected}
                aria-label={`${e.name}, ${e.z}`}
                style={{ gridRow: row, gridColumn: col, background: `var(--el-${e.category})` }}
                className={`flex aspect-square flex-col items-start justify-between rounded-[4px] p-1 text-left text-ink transition-opacity ${
                  dimmed ? 'opacity-25' : ''
                } ${isSelected ? 'ring-[3px] ring-ink' : 'hover:ring-2 hover:ring-ink/50'}`}
              >
                <span className="text-[0.62rem] leading-none tabular-nums">{e.z}</span>
                <span className="font-serif text-[1.05rem] font-bold leading-none">{e.symbol}</span>
                <span className="w-full truncate text-[0.52rem] leading-none">{e.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <section aria-live="polite" className="grid gap-5 rounded-2xl border border-line bg-surface p-5 md:grid-cols-[14rem_minmax(0,1fr)]">
        <div className="overflow-hidden rounded-xl bg-ink">
          <AtomDiagram
            protons={element.z}
            neutrons={commonNeutrons(element.z)}
            electrons={element.z}
            animate={!reducedMotion}
            className="mx-auto block aspect-square w-full max-w-[14rem]"
            title={element.name}
          />
        </div>
        <div>
          <div className="flex items-baseline gap-3">
            <span
              className="grid h-16 w-16 place-items-center rounded-lg font-serif text-3xl font-bold"
              style={{ background: `var(--el-${element.category})` }}
            >
              {element.symbol}
            </span>
            <div>
              <h2 className="text-3xl">{element.name}</h2>
              <p className="text-muted">{t.categories[element.category]}</p>
            </div>
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
            <Fact label="Z" value={String(element.z)} />
            <Fact label={t.atomicMass} value={`${element.mass} g/mol`} />
            <Fact label={t.period} value={String(element.period)} />
            <Fact label={t.group} value={element.group ? String(element.group) : '—'} />
          </dl>
          <div className="mt-4">
            <p className="text-sm text-muted">{t.configuration}</p>
            <p className="mt-1 flex flex-wrap gap-2">
              {element.shells.map((n, i) => (
                <span key={i} className="rounded-md bg-paper px-2 py-1 font-bold">
                  {SHELL_NAMES[i]}
                  <sup className="ml-0.5">{n}</sup>
                </span>
              ))}
            </p>
            <p className="mt-2 font-serif text-lg">{element.configuration}</p>
          </div>
          {element.z <= MAX_PROTONS && (
            <Link
              href={`/${lang}/atome?z=${element.z}`}
              className="mt-5 inline-block rounded-full bg-ink px-4 py-2 font-bold text-on-ink hover:bg-ink-soft"
            >
              {t.buildIt}
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="text-lg font-bold">{value}</dd>
    </div>
  );
}

function FamilyButton({ active, onClick, label, swatch }: { active: boolean; onClick: () => void; label: string; swatch?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm ${
        active ? 'border-ink bg-ink text-on-ink' : 'border-line bg-surface hover:border-ink'
      }`}
    >
      {swatch && <span className="h-3 w-3 rounded-full border border-ink/20" style={{ background: swatch }} aria-hidden="true" />}
      {label}
    </button>
  );
}
