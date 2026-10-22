'use client';

import { useState } from 'react';
import type { Dictionary } from '@/lib/i18n';
import { fmt, Readout, Slider } from './Slider';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

type Mode = 'seule' | 'serie' | 'derivation';

/**
 * Circuit simple : un générateur et une ou deux résistances.
 * Loi d'Ohm U = R × I, associations en série et en dérivation, puissance P = U × I.
 */
export function CircuitSim({ t }: { t: Dictionary['sims']['circuit'] }) {
  const [u, setU] = useState(12);
  const [r1, setR1] = useState(20);
  const [r2, setR2] = useState(30);
  const [mode, setMode] = useState<Mode>('seule');
  const reducedMotion = usePrefersReducedMotion();

  const req = mode === 'seule' ? r1 : mode === 'serie' ? r1 + r2 : (r1 * r2) / (r1 + r2);
  const i = u / req;
  const p = u * i;
  // Tension et intensité dans R1 selon le montage.
  const u1 = mode === 'derivation' ? u : i * r1;
  const i1 = u1 / r1;
  // Vitesse apparente des charges : proportionnelle à l'intensité, bornée pour rester lisible.
  const speed = Math.max(0.6, Math.min(8, 10 / Math.max(i, 0.05)));

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div className="rounded-2xl bg-ink p-4">
        <svg viewBox="0 0 400 260" className="w-full" role="img" aria-label={t.title}>
          <defs>
            <path id="boucle" d="M60 210 L60 50 L340 50 L340 210 Z" />
          </defs>
          {/* Fils */}
          <use href="#boucle" fill="none" stroke="#a9b2cf" strokeWidth="3" />
          {mode === 'derivation' && <path d="M150 50 L150 120 L250 120 L250 50" fill="none" stroke="#a9b2cf" strokeWidth="3" />}
          {/* Charges en mouvement */}
          {!reducedMotion &&
            Array.from({ length: 10 }, (_, k) => (
              <circle key={k} r="4" fill="var(--focus)">
                <animateMotion dur={`${speed}s`} repeatCount="indefinite" begin={`-${(k * speed) / 10}s`}>
                  <mpath href="#boucle" />
                </animateMotion>
              </circle>
            ))}
          {/* Générateur */}
          <rect x="40" y="110" width="40" height="40" fill="#1a2340" />
          <line x1="44" y1="122" x2="76" y2="122" stroke="#eef1fa" strokeWidth="4" />
          <line x1="52" y1="136" x2="68" y2="136" stroke="#eef1fa" strokeWidth="4" />
          <text x="92" y="135" fill="#eef1fa" fontSize="16" fontWeight="bold">{fmt(u, 1)} V</text>
          {/* R1 */}
          <rect x="170" y="38" width="60" height="24" rx="3" fill="#e8793a" />
          <text x="200" y="30" textAnchor="middle" fill="#eef1fa" fontSize="14">R₁ = {fmt(r1, 0)} Ω</text>
          {/* R2 */}
          {mode !== 'seule' && (
            <>
              <rect
                x={mode === 'serie' ? 270 : 170}
                y={mode === 'serie' ? 38 : 108}
                width="60"
                height="24"
                rx="3"
                fill="#8f9bbf"
              />
              <text
                x={mode === 'serie' ? 300 : 200}
                y={mode === 'serie' ? 30 : 150}
                textAnchor="middle"
                fill="#eef1fa"
                fontSize="14"
              >
                R₂ = {fmt(r2, 0)} Ω
              </text>
            </>
          )}
          {/* Ampèremètre */}
          <circle cx="200" cy="210" r="20" fill="#1a2340" stroke="#eef1fa" strokeWidth="2" />
          <text x="200" y="216" textAnchor="middle" fill="#eef1fa" fontSize="16" fontWeight="bold">A</text>
          <text x="200" y="250" textAnchor="middle" fill="var(--focus)" fontSize="16" fontWeight="bold">I = {fmt(i)} A</text>
        </svg>
      </div>

      <div className="flex flex-col gap-4">
        <fieldset>
          <legend className="font-bold">{t.mode}</legend>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {(['seule', 'serie', 'derivation'] as Mode[]).map((m) => (
              <button
                key={m}
                type="button"
                aria-pressed={mode === m}
                onClick={() => setMode(m)}
                className={`rounded-lg border-2 px-2 py-2 text-sm font-bold ${mode === m ? 'border-ink bg-ink text-on-ink' : 'border-line bg-surface'}`}
              >
                {t.modes[m]}
              </button>
            ))}
          </div>
        </fieldset>
        <Slider label={t.voltage} value={u} min={1.5} max={24} step={0.5} unit="V" onChange={setU} />
        <Slider label="R₁" value={r1} min={1} max={100} step={1} unit="Ω" onChange={setR1} />
        {mode !== 'seule' && <Slider label="R₂" value={r2} min={1} max={100} step={1} unit="Ω" onChange={setR2} />}
        <dl className="grid grid-cols-2 gap-2">
          <Readout label={t.current} value={fmt(i)} unit="A" strong />
          <Readout label={t.equivalent} value={fmt(req, 1)} unit="Ω" />
          <Readout label={t.voltageR1} value={fmt(u1)} unit="V" />
          <Readout label={t.currentR1} value={fmt(i1)} unit="A" />
          <Readout label={t.power} value={fmt(p, 1)} unit="W" />
        </dl>
        <p className="text-sm text-muted">{t.formulas[mode]}</p>
      </div>
    </div>
  );
}
