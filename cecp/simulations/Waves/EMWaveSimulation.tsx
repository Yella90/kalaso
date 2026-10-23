'use client';

import { useState } from 'react';
import { AnimatePresence, motion, type MotionValue } from 'motion/react';
import { Slider, Stat, ParamPanel, PlayControls, frNum } from '@/cecp/components/sim/Controls';
import { useSimClock, useDerived, polyline, SimSvg } from '@/cecp/components/sim/motion-sim';
import { SPECTRUM, bandOf, emFrequency, emPeriod, emPhotonEnergyEV, visibleColorName } from '@/cecp/lib/physics/em-waves';
import { wavelengthToCss } from '@/cecp/lib/physics/light';

// ---------------- Mise en forme des grandeurs ----------------
function withPrefix(x: number, unit: string, prefixes: [number, string][]): string {
  for (const [p, name] of prefixes) {
    if (Math.abs(x) >= p) {
      const v = x / p;
      return `${frNum(v, v >= 100 ? 0 : v >= 10 ? 1 : 2)} ${name}${unit}`;
    }
  }
  const [p, name] = prefixes[prefixes.length - 1];
  return `${frNum(x / p, 2)} ${name}${unit}`;
}
const fmtLength = (m: number) => withPrefix(m, 'm', [[1e3, 'k'], [1, ''], [1e-2, 'c'], [1e-3, 'm'], [1e-6, 'µ'], [1e-9, 'n'], [1e-12, 'p'], [1e-15, 'f']]);
const fmtFreq = (f: number) => withPrefix(f, 'Hz', [[1e18, 'E'], [1e15, 'P'], [1e12, 'T'], [1e9, 'G'], [1e6, 'M'], [1e3, 'k'], [1, '']]);
const fmtTime = (s: number) => withPrefix(s, 's', [[1, ''], [1e-3, 'm'], [1e-6, 'µ'], [1e-9, 'n'], [1e-12, 'p'], [1e-15, 'f'], [1e-18, 'a'], [1e-21, 'z']]);
const fmtEV = (e: number) => withPrefix(e, 'eV', [[1e6, 'M'], [1e3, 'k'], [1, ''], [1e-3, 'm'], [1e-6, 'µ'], [1e-9, 'n'], [1e-12, 'p']]);

// ---------------- Onde : geometrie ----------------
const X0 = 40, X1 = 600, AXIS_Y = 118;
const LAMBDA_PX = 170;   // longueur d'onde a l'ecran
const F_VIS = 0.6;       // frequence a l'ecran (Hz)
const AMP = 62;
/** Direction oblique representant l'axe horizontal perpendiculaire (perspective) */
const BX = 0.62, BY = 0.36;

const phase = (x: number, s: number) => (2 * Math.PI * (x - X0)) / LAMBDA_PX - 2 * Math.PI * F_VIS * s;

const r2 = (v: number) => Math.round(v * 100) / 100;

function EArrow({ t, x, color }: { t: MotionValue<number>; x: number; color: string }) {
  const y2 = useDerived(t, (s) => AXIS_Y - AMP * Math.sin(phase(x, s)), x);
  return <motion.line x1={x} y1={AXIS_Y} x2={x} y2={y2} stroke={color} strokeWidth={1.5} opacity={0.75} />;
}

function BArrow({ t, x }: { t: MotionValue<number>; x: number }) {
  const x2 = useDerived(t, (s) => x + BX * AMP * 0.8 * Math.sin(phase(x, s)), x);
  const y2 = useDerived(t, (s) => AXIS_Y + BY * AMP * 0.8 * Math.sin(phase(x, s)), x);
  return <motion.line x1={x} y1={AXIS_Y} x2={x2} y2={y2} stroke="#38bdf8" strokeWidth={1.5} opacity={0.7} />;
}

// ---------------- Spectre (echelle logarithmique) ----------------
const LOG_MIN = -13, LOG_MAX = 3;
const SPX0 = 40, SPX1 = 600, SPY = 236, SPH = 30;
const xOfLog = (lg: number) => SPX0 + ((lg - LOG_MIN) / (LOG_MAX - LOG_MIN)) * (SPX1 - SPX0);

const PRESETS: { label: string; lambda: number }[] = [
  { label: 'Radio FM', lambda: 3.05 },
  { label: 'Wi-Fi', lambda: 0.125 },
  { label: 'Four µ-ondes', lambda: 0.122 },
  { label: 'Caméra IR', lambda: 10e-6 },
  { label: 'Rouge', lambda: 650e-9 },
  { label: 'Vert', lambda: 532e-9 },
  { label: 'Violet', lambda: 410e-9 },
  { label: 'UV (Soleil)', lambda: 300e-9 },
  { label: 'Radiographie (X)', lambda: 0.05e-9 },
  { label: 'Rayons γ', lambda: 1e-12 },
];

export function EMWaveSimulation() {
  const [lg, setLg] = useState(Math.log10(650e-9));
  const [running, setRunning] = useState(true);
  const { t, reset } = useSimClock(running, 1);

  const lambda = 10 ** lg;
  const band = bandOf(lambda);
  const colorName = visibleColorName(lambda);
  const eColor = colorName ? wavelengthToCss(lambda * 1e9) : '#f59e0b';
  const f = emFrequency(lambda);

  const ePath = useDerived(t, (s) => polyline(200, (i) => X0 + (i / 199) * (X1 - X0), (i) => {
    const x = X0 + (i / 199) * (X1 - X0);
    return AXIS_Y - AMP * Math.sin(phase(x, s));
  }), 'e');
  const bPath = useDerived(t, (s) => polyline(200, (i) => {
    const x = X0 + (i / 199) * (X1 - X0);
    return x + BX * AMP * 0.8 * Math.sin(phase(x, s));
  }, (i) => {
    const x = X0 + (i / 199) * (X1 - X0);
    return AXIS_Y + BY * AMP * 0.8 * Math.sin(phase(x, s));
  }), 'b');

  const arrows = Array.from({ length: 20 }, (_, i) => X0 + 8 + i * 28);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
      <div className="lg:col-span-2 space-y-2">
        <SimSvg width={640} height={330} label="Onde électromagnétique : champs E et B, et position dans le spectre">
          {/* Onde */}
          <line x1={X0 - 10} x2={X1 + 30} y1={AXIS_Y} y2={AXIS_Y} stroke="#64748b" strokeWidth={1.5} markerEnd="url(#em-arrow)" />
          <text x={X1 + 30} y={AXIS_Y + 18} textAnchor="end" fill="#94a3b8" fontSize={11}>propagation →</text>
          {arrows.map((x) => <BArrow key={`b${x}`} t={t} x={x} />)}
          <motion.path d={bPath} fill="none" stroke="#38bdf8" strokeWidth={2.2} />
          {arrows.map((x) => <EArrow key={`e${x}`} t={t} x={x} color={eColor} />)}
          <motion.path d={ePath} fill="none" stroke={eColor} strokeWidth={2.6} />
          <text x={X0} y={40} fill={eColor} fontSize={13} fontWeight={700}>champ électrique E</text>
          <text x={X0} y={208} fill="#38bdf8" fontSize={13} fontWeight={700}>champ magnétique B</text>
          <line x1={X0 + 10} x2={X0 + 10 + LAMBDA_PX} y1={56} y2={56} stroke="#e2e8f0" markerStart="url(#em-arrow)" markerEnd="url(#em-arrow)" />
          <text x={X0 + 10 + LAMBDA_PX / 2} y={50} textAnchor="middle" fill="#e2e8f0" fontSize={11}>λ = {fmtLength(lambda)}</text>
          <defs>
            <marker id="em-arrow" viewBox="0 0 10 10" refX={8} refY={5} markerWidth={6} markerHeight={6} orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" fill="#e2e8f0" />
            </marker>
            <linearGradient id="em-visible" x1="0" x2="1">
              {[400, 450, 500, 550, 600, 650, 700, 780].map((nm, i) => (
                <stop key={nm} offset={i / 7} stopColor={wavelengthToCss(nm)} />
              ))}
            </linearGradient>
          </defs>

          {/* Spectre */}
          {SPECTRUM.map((b) => {
            const lo = b.min > 0 ? Math.max(LOG_MIN, Math.log10(b.min)) : LOG_MIN;
            const hi = Number.isFinite(b.max) ? Math.min(LOG_MAX, Math.log10(b.max)) : LOG_MAX;
            const x = xOfLog(lo), w = xOfLog(hi) - x;
            return (
              <g key={b.id}>
                <rect x={x} y={SPY} width={Math.max(w, 2)} height={SPH}
                  fill={b.id === 'visible' ? 'url(#em-visible)' : b.color}
                  opacity={b.id === band.id ? 1 : 0.35} />
                {b.id !== 'visible' && w > 40 && (
                  <text x={x + w / 2} y={SPY + SPH / 2 + 4} textAnchor="middle" fill="#0f172a" fontSize={10} fontWeight={700}>{b.name}</text>
                )}
              </g>
            );
          })}
          {[-12, -9, -6, -3, 0, 3].map((p) => (
            <g key={p}>
              <line x1={xOfLog(p)} x2={xOfLog(p)} y1={SPY + SPH} y2={SPY + SPH + 5} stroke="#64748b" />
              <text x={xOfLog(p)} y={SPY + SPH + 17} textAnchor="middle" fill="#64748b" fontSize={10}>{fmtLength(10 ** p)}</text>
            </g>
          ))}
          <text x={SPX0} y={SPY - 8} fill="#64748b" fontSize={10}>énergie du photon ↑ (λ courte)</text>
          <text x={SPX1} y={SPY - 8} textAnchor="end" fill="#64748b" fontSize={10}>λ longue →</text>
          <motion.g initial={false} animate={{ x: r2(xOfLog(lg)) }} transition={{ type: 'spring', stiffness: 260, damping: 26 }}>
            <path d={`M0,${SPY - 2} l-7,-10 h14 z`} fill="#f8fafc" />
            <line x1={0} x2={0} y1={SPY} y2={SPY + SPH} stroke="#f8fafc" strokeWidth={2} />
          </motion.g>
          <AnimatePresence mode="wait">
            <motion.g
              key={band.id}
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}
            >
              <text x={320} y={318} textAnchor="middle" fill="#e2e8f0" fontSize={13} fontWeight={600}>
                {band.name}{colorName ? ` (${colorName})` : ''} — {band.examples}
              </text>
            </motion.g>
          </AnimatePresence>
        </SimSvg>
        <p className="text-[11px] text-slate-500">
          À l&apos;écran, la longueur d&apos;onde est toujours dessinée avec la même taille et l&apos;onde est ralentie : seule l&apos;échelle change.
          Les champs E et B sont perpendiculaires entre eux et à la direction de propagation.
        </p>
      </div>

      <ParamPanel>
        <Slider label="Longueur d'onde λ" value={lg} unit="" min={LOG_MIN} max={LOG_MAX} step={0.01} format={(v) => fmtLength(10 ** v)} onChange={setLg} />
        <div className="grid grid-cols-2 gap-1.5">
          {PRESETS.map((p) => (
            <button key={p.label} onClick={() => setLg(Math.log10(p.lambda))}
              className="px-2 py-1.5 rounded-md text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200">
              {p.label}
            </button>
          ))}
        </div>
        <PlayControls running={running} onToggle={() => setRunning((r) => !r)} onReset={reset} />
        <div className="grid grid-cols-2 gap-2">
          <Stat label="Domaine" value={band.name} tone="emerald" />
          <Stat label="f = c/λ" value={fmtFreq(f)} tone="sky" />
          <Stat label="T = 1/f" value={fmtTime(emPeriod(lambda))} />
          <Stat label="E = hc/λ" value={fmtEV(emPhotonEnergyEV(lambda))} tone="rose" />
        </div>
      </ParamPanel>
    </div>
  );
}
