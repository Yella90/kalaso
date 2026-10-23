'use client';

import { Play, Pause, RotateCcw } from 'lucide-react';
import { useProjectileStore } from './ProjectileSimulation';

interface SliderProps {
  label: string;
  unit: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}

function ParamSlider({ label, unit, value, min, max, step, onChange }: SliderProps) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center text-sm gap-2">
        <span className="text-slate-300">{label}</span>
        <span className="flex items-center gap-1 font-mono text-amber-400">
          {/* Saisie precise (ex : 7,26 m/s pour le lancer franc) */}
          <input
            type="number"
            min={min}
            max={max}
            step={0.01}
            value={Number(value.toFixed(2))}
            onChange={(e) => {
              const v = parseFloat(e.target.value);
              if (Number.isFinite(v)) onChange(Math.min(max, Math.max(min, v)));
            }}
            aria-label={label}
            className="w-20 bg-slate-800 border border-slate-700 rounded px-1.5 py-0.5 text-right text-amber-400 focus:outline-none focus:border-amber-500"
          />
          <span className="text-xs text-slate-400">{unit}</span>
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
      />
    </div>
  );
}

export function ProjectileParameterPanel() {
  const {
    v0, alphaDeg, g, h0, running, landed,
    setV0, setAlpha, setG, setH0,
    toggleRun, reset,
  } = useProjectileStore();

  return (
    <div className="space-y-5 p-5 rounded-lg bg-slate-900 border border-slate-800">
      <h3 className="text-lg font-semibold text-white">Paramètres de tir</h3>

      <ParamSlider
        label="Vitesse initiale v0" unit="m/s"
        value={v0} min={1} max={60} step={0.5}
        onChange={setV0}
      />
      <ParamSlider
        label="Angle de tir alpha" unit="°"
        value={alphaDeg} min={0} max={90} step={1}
        onChange={setAlpha}
      />
      <ParamSlider
        label="Gravité g" unit="m/s²"
        value={g} min={1} max={20} step={0.01}
        onChange={setG}
      />
      <ParamSlider
        label="Hauteur initiale h0" unit="m"
        value={h0} min={0} max={20} step={0.1}
        onChange={setH0}
      />

      <div className="flex gap-2 pt-2">
        <button
          onClick={toggleRun}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-900 font-semibold transition-colors"
        >
          {running ? (
            <><Pause size={16} /> Pause</>
          ) : landed ? (
            <><RotateCcw size={16} /> Relancer</>
          ) : (
            <><Play size={16} /> Lancer</>
          )}
        </button>
        <button
          onClick={reset}
          title="Réinitialiser"
          className="px-4 py-2.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
        >
          <RotateCcw size={16} />
        </button>
      </div>
    </div>
  );
}