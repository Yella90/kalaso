'use client';

import { useId } from 'react';

/** Format français : virgule décimale, au plus `digits` chiffres après la virgule. */
export function fmt(value: number, digits = 2): string {
  if (!Number.isFinite(value)) return '—';
  return value.toLocaleString('fr-FR', { maximumFractionDigits: digits });
}

interface Props {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (value: number) => void;
}

/** Curseur réglable au doigt, avec sa valeur affichée en clair. */
export function Slider({ label, value, min, max, step, unit, onChange }: Props) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="flex items-baseline justify-between gap-3">
        <span className="font-bold">{label}</span>
        <output htmlFor={id} className="font-serif text-lg font-bold tabular-nums">
          {fmt(value)} {unit}
        </output>
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1 h-8 w-full accent-[var(--subject,var(--ink))]"
      />
    </div>
  );
}

export function Readout({ label, value, unit, strong }: { label: string; value: string; unit?: string; strong?: boolean }) {
  return (
    <div className={`rounded-xl px-3 py-2 ${strong ? 'bg-ink text-on-ink' : 'bg-paper'}`}>
      <dt className={`text-sm ${strong ? 'text-on-ink-muted' : 'text-muted'}`}>{label}</dt>
      <dd className="font-serif text-2xl font-bold tabular-nums">
        {value} <span className="text-base">{unit}</span>
      </dd>
    </div>
  );
}
