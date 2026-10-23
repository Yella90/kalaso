'use client';

import { useState } from 'react';
import { AnimatePresence, motion, type MotionValue } from 'motion/react';
import { Slider, Stat, ParamPanel, PlayControls, frNum } from '@/cecp/components/sim/Controls';
import { useSimClock, useDerived, SimSvg, sci } from '@/cecp/components/sim/motion-sim';
import { LASERS, laserPhotonEnergy, photonsPerSecond, irradiance } from '@/cecp/lib/physics/laser';
import { visibleColorName } from '@/cecp/lib/physics/em-waves';
import { wavelengthToCss } from '@/cecp/lib/physics/light';

const X_LEFT = 104, X_RIGHT = 516;
/** Vitesse des photons a l'ecran (px/s) : ralenti enorme, la lumiere fait 3.10^8 m/s ! */
const V_PHOTON = 260;
const N_PHOTONS = 14;
/** Delai d'apparition entre deux photons (amplification progressive), en s */
const BUILD_UP = 0.35;

/** Position d'un photon qui fait des allers-retours entre les miroirs */
function photonX(s: number, j: number): number {
  const L = X_RIGHT - X_LEFT;
  const d = (V_PHOTON * Math.max(0, s - j * BUILD_UP) + j * 37) % (2 * L);
  return d < L ? X_LEFT + d : X_RIGHT - (d - L);
}

function beamColor(nm: number) {
  return nm > 760 ? '#e11d48' : wavelengthToCss(nm);
}

function Photon({ t, j, color }: { t: MotionValue<number>; j: number; color: string }) {
  const cx = useDerived(t, (s) => photonX(s, j), j);
  const opacity = useDerived(t, (s) => (s > j * BUILD_UP ? 1 : 0), j);
  return <motion.circle cx={cx} cy={100 + (j % 7) * 10} r={4} fill={color} style={{ opacity }} />;
}

/** Atome du milieu amplificateur : excite (anneau colore) ou au repos */
function Atom({ t, i, pumping }: { t: MotionValue<number>; i: number; pumping: boolean }) {
  const phase = (i * 0.618) % 1;
  const excited = useDerived(t, (s) => (pumping && ((s * 0.9 + phase) % 1) < 0.72 ? 1 : 0), pumping);
  const col = i % 6, row = Math.floor(i / 6);
  return (
    <g>
      <circle cx={150 + col * 62} cy={108 + row * 26} r={7} fill="#1e293b" stroke="#475569" />
      <motion.circle cx={150 + col * 62} cy={108 + row * 26} r={7} fill="#a855f7" style={{ opacity: excited }} />
    </g>
  );
}

export function LaserSimulation() {
  const [laserId, setLaserId] = useState('hene');
  const [diam, setDiam] = useState(1);
  const [pumping, setPumping] = useState(true);
  const { t, reset } = useSimClock(pumping, 1);

  const laser = LASERS.find((l) => l.id === laserId)!;
  const nm = laser.lambda * 1e9;
  const color = beamColor(nm);
  const visible = visibleColorName(laser.lambda);
  const E = laserPhotonEnergy(laser.lambda);
  const N = photonsPerSecond(laser.power, laser.lambda);
  const Ecl = irradiance(laser.power, diam * 1e-3);

  // Faisceau de sortie : apparait apres l'amplification
  const beamOpacity = useDerived(t, (s) => Math.min(1, Math.max(0, (s - 2) / 1.5)), 'beam');
  const beamDash = useDerived(t, (s) => -V_PHOTON * s, 'beam');

  const changeLaser = (id: string) => { setLaserId(id); reset(); };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
      <div className="lg:col-span-2 space-y-2">
        <SimSvg width={640} height={340} label="Cavité laser : pompage, émission stimulée et faisceau de sortie">
          {/* Pompage */}
          <motion.rect
            x={130} y={44} width={360} height={14} rx={7} fill="#c084fc"
            animate={pumping ? { opacity: [0.25, 0.9, 0.25] } : { opacity: 0.08 }}
            transition={pumping ? { duration: 0.6, repeat: Infinity } : { duration: 0.3 }}
          />
          <text x={310} y={36} textAnchor="middle" fill="#c084fc" fontSize={11}>pompage (décharge électrique / lampe flash)</text>

          {/* Milieu amplificateur */}
          <rect x={X_LEFT + 6} y={84} width={X_RIGHT - X_LEFT - 12} height={92} rx={8} fill="#0f172a" stroke="#334155" />
          {Array.from({ length: 18 }, (_, i) => <Atom key={i} t={t} i={i} pumping={pumping} />)}

          {/* Miroirs */}
          <rect x={X_LEFT - 12} y={70} width={10} height={120} rx={2} fill="#cbd5e1" />
          <rect x={X_RIGHT + 2} y={70} width={10} height={120} rx={2} fill="#cbd5e1" opacity={0.55} />
          <text x={X_LEFT - 7} y={208} textAnchor="middle" fill="#94a3b8" fontSize={10}>miroir 100 %</text>
          <text x={X_RIGHT + 7} y={208} textAnchor="middle" fill="#94a3b8" fontSize={10}>miroir 99 %</text>

          {Array.from({ length: N_PHOTONS }, (_, j) => <Photon key={j} t={t} j={j} color={color} />)}

          {/* Faisceau de sortie */}
          <motion.line
            x1={X_RIGHT + 14} y1={130} x2={636} y2={130} stroke={color} strokeWidth={6} strokeLinecap="round"
            strokeDasharray="18 10" style={{ opacity: beamOpacity, strokeDashoffset: beamDash }}
          />

          {/* Diagramme des niveaux d'energie (laser a 3 niveaux) */}
          <g transform="translate(40 228)">
            <text x={0} y={0} fill="#94a3b8" fontSize={11}>Niveaux d&apos;énergie</text>
            <line x1={0} x2={150} y1={20} y2={20} stroke="#64748b" />
            <line x1={0} x2={150} y1={42} y2={42} stroke="#64748b" />
            <line x1={0} x2={150} y1={96} y2={96} stroke="#64748b" />
            <text x={156} y={24} fill="#64748b" fontSize={10}>E₃</text>
            <text x={156} y={46} fill="#64748b" fontSize={10}>E₂ (métastable)</text>
            <text x={156} y={100} fill="#64748b" fontSize={10}>E₁</text>
            {[
              { d: 'M30,96 L30,22', c: '#c084fc', delay: 0 },
              { d: 'M60,20 L60,40', c: '#64748b', delay: 0.4 },
              { d: 'M100,42 L100,94', c: color, delay: 0.8 },
            ].map((a) => (
              <motion.path
                key={a.d} d={a.d} stroke={a.c} strokeWidth={3} markerEnd="url(#laser-arrow)" fill="none"
                animate={pumping ? { opacity: [0.15, 1, 0.15] } : { opacity: 0.15 }}
                transition={pumping ? { duration: 1.2, repeat: Infinity, delay: a.delay } : { duration: 0.3 }}
              />
            ))}
            <text x={34} y={70} fill="#c084fc" fontSize={10}>pompage</text>
            <text x={106} y={72} fill={color} fontSize={10}>émission stimulée hν</text>
          </g>
          <defs>
            <marker id="laser-arrow" viewBox="0 0 10 10" refX={8} refY={5} markerWidth={5} markerHeight={5} orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" fill="#e2e8f0" />
            </marker>
          </defs>

          {/* Legende */}
          <g transform="translate(360 240)">
            <circle cx={6} cy={0} r={6} fill="#a855f7" />
            <text x={18} y={4} fill="#94a3b8" fontSize={11}>atome excité (E₂)</text>
            <circle cx={6} cy={22} r={6} fill="#1e293b" stroke="#475569" />
            <text x={18} y={26} fill="#94a3b8" fontSize={11}>atome au repos (E₁)</text>
            <circle cx={6} cy={44} r={4} fill={color} />
            <text x={18} y={48} fill="#94a3b8" fontSize={11}>photon ({frNum(nm, nm < 1000 ? 1 : 0)} nm)</text>
            <AnimatePresence>
              {!visible && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <text x={0} y={74} fill="#fda4af" fontSize={11}>infrarouge : invisible (couleur symbolique)</text>
                </motion.g>
              )}
            </AnimatePresence>
          </g>
        </SimSvg>
        <p className="text-[11px] text-slate-500">
          Les photons font des allers-retours entre les miroirs ; à chaque passage sur un atome excité, ils en libèrent un identique.
          Une petite partie sort par le miroir semi-transparent.
        </p>
      </div>

      <ParamPanel>
        <label className="block space-y-1">
          <span className="text-xs text-slate-400">Type de laser</span>
          <select value={laserId} onChange={(e) => changeLaser(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-sm text-white">
            {LASERS.map((l) => <option key={l.id} value={l.id}>{l.name} – {frNum(l.lambda * 1e9, l.lambda < 1e-6 ? 1 : 0)} nm</option>)}
          </select>
        </label>
        <Slider label="Diamètre du faisceau" value={diam} unit="mm" min={0.5} max={5} step={0.1} digits={1} onChange={setDiam} />
        <PlayControls running={pumping} onToggle={() => setPumping((p) => !p)} onReset={reset} playLabel="Pomper" />
        <div className="grid grid-cols-2 gap-2">
          <Stat label="Couleur" value={visible ?? 'infrarouge'} tone={visible ? 'emerald' : 'rose'} />
          <Stat label="Puissance P" value={laser.power >= 1 ? `${frNum(laser.power, 0)} W` : `${frNum(laser.power * 1000, 0)} mW`} />
          <Stat label="E photon = hc/λ" value={`${frNum(E / 1.6e-19, 2)} eV`} tone="sky" />
          <Stat label="Photons par seconde" value={sci(N)} tone="sky" />
          <Stat label="Éclairement P/S" value={Ecl >= 1e6 ? `${frNum(Ecl / 1e6, 1)} MW/m²` : `${frNum(Ecl, 0)} W/m²`} tone="rose" />
          <Stat label="Soleil (référence)" value="≈ 1 000 W/m²" />
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">{laser.use}</p>
      </ParamPanel>
    </div>
  );
}
