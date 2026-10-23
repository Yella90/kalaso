'use client';

import { Play, Pause, RotateCcw } from 'lucide-react';

/** Nombre a la francaise : 7.256 -> "7,26" */
export const frNum = (x: number, d = 2) => x.toFixed(d).replace('.', ',');

/** Curseur de parametre (libelle, valeur et unite affichees) */
export function Slider({ label, value, unit, min, max, step, digits = 2, format, onChange }: {
  label: string; value: number; unit: string; min: number; max: number; step: number; digits?: number;
  /** Affichage personnalise de la valeur (sinon : frNum(value, digits)) */
  format?: (v: number) => string;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block space-y-1">
      <span className="flex justify-between gap-2 text-sm">
        <span className="text-slate-300">{label}</span>
        <span className="font-mono text-amber-400 whitespace-nowrap">{format ? format(value) : frNum(value, digits)} {unit}</span>
      </span>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500" />
    </label>
  );
}

/** Petite case de resultat */
export function Stat({ label, value, tone = 'amber' }: { label: string; value: string; tone?: 'amber' | 'emerald' | 'rose' | 'sky' }) {
  const color = { amber: 'text-amber-400', emerald: 'text-emerald-400', rose: 'text-rose-400', sky: 'text-sky-400' }[tone];
  return (
    <div className="p-2.5 rounded-md bg-slate-950/60 border border-slate-800">
      {/* Pas de majuscules CSS : elles changeraient λ en Λ et π en Π */}
      <p className="text-[11px] text-slate-500">{label}</p>
      <p className={`text-sm font-mono font-semibold mt-0.5 ${color}`}>{value}</p>
    </div>
  );
}

/** Boutons lecture / pause et reinitialisation */
export function PlayControls({ running, onToggle, onReset, playLabel = 'Lancer' }: {
  running: boolean; onToggle: () => void; onReset: () => void; playLabel?: string;
}) {
  return (
    <div className="flex gap-2">
      <button onClick={onToggle} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold">
        {running ? <><Pause size={16} /> Pause</> : <><Play size={16} /> {playLabel}</>}
      </button>
      <button onClick={onReset} aria-label="Réinitialiser" className="px-4 py-2.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200">
        <RotateCcw size={16} />
      </button>
    </div>
  );
}

/** Panneau lateral des parametres */
export function ParamPanel({ title = 'Paramètres', children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4 p-5 rounded-lg bg-slate-900 border border-slate-800">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      {children}
    </div>
  );
}

/** Choix parmi quelques options (boutons segmentes) */
export function Segmented<T extends string>({ value, options, onChange, label }: {
  value: T; options: { value: T; label: string }[]; onChange: (v: T) => void; label?: string;
}) {
  return (
    <div className="space-y-1">
      {label && <p className="text-sm text-slate-300">{label}</p>}
      <div className="flex flex-wrap gap-1 p-1 rounded-md bg-slate-950 border border-slate-800" role="radiogroup" aria-label={label}>
        {options.map((o) => (
          <button
            key={o.value}
            role="radio"
            aria-checked={o.value === value}
            onClick={() => onChange(o.value)}
            className={`flex-1 px-2 py-1.5 rounded text-xs font-semibold transition-colors ${
              o.value === value ? 'bg-amber-500 text-slate-900' : 'text-slate-400 hover:text-white'
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
