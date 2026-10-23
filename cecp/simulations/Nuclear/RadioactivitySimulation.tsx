'use client';

import { useEffect, useMemo, useRef, useState, useReducer } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useAnimationFrame } from '@/cecp/components/sim/useAnimationFrame';
import { LivePlot, type PlotSample, type PlotSeries } from '@/cecp/components/sim/LivePlot';
import { Formula } from '@/cecp/components/lesson/Formula';
import { ISOTOPES, YEAR_S } from '@/cecp/lib/physics/nuclear';

const fr = (x: number, d = 2) => x.toFixed(d).replace('.', ',');
const N0 = 400;
const COLS = 25;
/** Duree d'une demi-vie a l'ecran (s) */
const DISPLAY_HALF = 3;

const SERIES: PlotSeries[] = [
  { label: 'Noyaux restants (simulation)', color: '#f59e0b' },
  { label: 'Loi N0·e^(−λt)', color: '#38bdf8', dashed: true },
];

function formatRealTime(s: number): string {
  if (s < 3600) return `${fr(s / 60, 1)} min`;
  if (s < 2 * 86400) return `${fr(s / 3600, 1)} h`;
  if (s < 2 * YEAR_S) return `${fr(s / 86400, 1)} jours`;
  if (s < 1e6 * YEAR_S) return `${Math.round(s / YEAR_S).toLocaleString('fr-FR')} ans`;
  return `${fr(s / YEAR_S / 1e9, 2)} milliards d'années`;
}

export function RadioactivitySimulation() {
  const [isoId, setIsoId] = useState('c14');
  const [running, setRunning] = useState(false);
  const iso = ISOTOPES.find((i) => i.id === isoId)!;
  const alive = useRef<boolean[]>(Array(N0).fill(true));
  const decayFlash = useRef<number[]>(Array(N0).fill(0));
  const t = useRef(0);
  const buf = useRef<PlotSample[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [, force] = useReducer((n: number) => n + 1, 0);

  const lambdaDisp = Math.LN2 / DISPLAY_HALF;

  const reset = () => {
    setRunning(false);
    alive.current = Array(N0).fill(true);
    decayFlash.current = Array(N0).fill(0);
    t.current = 0;
    buf.current = [{ t: 0, values: [N0, N0] }];
    force();
  };

  useEffect(reset, [isoId]); // eslint-disable-line react-hooks/exhaustive-deps

  const drawGrid = () => {
    const c = canvasRef.current, ctx = c?.getContext('2d');
    if (!c || !ctx) return;
    const W = 500, H = 320, dpr = window.devicePixelRatio || 1;
    if (c.width !== W * dpr) { c.width = W * dpr; c.height = H * dpr; }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, W, H);
    const rows = Math.ceil(N0 / COLS), cell = Math.min(W / COLS, H / rows);
    const ox = (W - cell * COLS) / 2, oy = (H - cell * rows) / 2;
    for (let i = 0; i < N0; i++) {
      const cx = ox + (i % COLS) * cell + cell / 2, cy = oy + Math.floor(i / COLS) * cell + cell / 2;
      const flash = decayFlash.current[i];
      ctx.beginPath();
      ctx.arc(cx, cy, cell * 0.36, 0, Math.PI * 2);
      if (alive.current[i]) ctx.fillStyle = '#f59e0b';
      else ctx.fillStyle = flash > 0 ? `rgba(248,113,113,${0.3 + flash})` : '#334155';
      ctx.fill();
    }
  };

  useAnimationFrame((dt) => {
    t.current += dt;
    const p = 1 - Math.exp(-lambdaDisp * dt);
    for (let i = 0; i < N0; i++) {
      if (alive.current[i] && Math.random() < p) { alive.current[i] = false; decayFlash.current[i] = 0.7; }
      if (decayFlash.current[i] > 0) decayFlash.current[i] = Math.max(0, decayFlash.current[i] - dt * 1.5);
    }
    const n = alive.current.filter(Boolean).length;
    buf.current.push({ t: t.current, values: [n, N0 * Math.exp(-lambdaDisp * t.current)] });
    if (buf.current.length > 3000) buf.current.shift();
    drawGrid();
    force();
    if (n === 0) setRunning(false);
  }, running);

  useEffect(() => { drawGrid(); });

  const n = alive.current.filter(Boolean).length;
  const halfLives = t.current / DISPLAY_HALF;
  const realT = halfLives * iso.halfLife;
  const theo = N0 * Math.pow(0.5, halfLives);
  const windowS = useMemo(() => DISPLAY_HALF * 6, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
      <div className="lg:col-span-2 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="rounded-lg bg-slate-950 border border-slate-800 overflow-hidden">
            <canvas ref={canvasRef} style={{ width: '100%', height: 'auto', aspectRatio: '500 / 320' }} aria-label="Noyaux radioactifs" />
            <div className="flex justify-between px-3 py-2 text-[11px] text-slate-400">
              <span><span className="inline-block w-2 h-2 rounded-full bg-amber-500 mr-1" />{iso.symbol} non désintégré</span>
              <span><span className="inline-block w-2 h-2 rounded-full bg-slate-600 mr-1" />noyau fils</span>
            </div>
          </div>
          <LivePlot buffer={buf} series={SERIES} yMin={0} yMax={N0} height={250} windowSeconds={windowS} xLabel="t (écran)" />
        </div>
        <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
          <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Désintégration {iso.type}</p>
          <Formula block>{iso.equation}</Formula>
          <p className="text-sm text-slate-400">{iso.use}</p>
        </div>
      </div>

      <div className="space-y-4 p-5 rounded-lg bg-slate-900 border border-slate-800">
        <h3 className="text-lg font-semibold text-white">Paramètres</h3>
        <label className="block space-y-1">
          <span className="text-xs text-slate-400">Isotope</span>
          <select value={isoId} onChange={(e) => setIsoId(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-sm text-white">
            {ISOTOPES.map((i) => <option key={i.id} value={i.id}>{i.name} ({i.symbol}) – T = {i.halfLifeLabel}</option>)}
          </select>
        </label>
        <div className="flex gap-2">
          <button onClick={() => setRunning((r) => !r)} disabled={n === 0} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-amber-500 hover:bg-amber-400 disabled:bg-slate-700 text-slate-900 font-semibold">
            {running ? <><Pause size={16} /> Pause</> : <><Play size={16} /> Démarrer</>}
          </button>
          <button onClick={reset} aria-label="Réinitialiser" className="px-4 py-2.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200">
            <RotateCcw size={16} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            ['Temps réel écoulé', formatRealTime(realT)],
            ['Demi-vies écoulées', fr(halfLives, 2)],
            ['Noyaux restants', `${n} / ${N0}`],
            ['Prévu par la loi', fr(theo, 0)],
          ].map(([k, v]) => (
            <div key={k} className="p-2.5 rounded-md bg-slate-950/60 border border-slate-800">
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">{k}</p>
              <p className="text-sm font-mono font-semibold text-amber-400 mt-0.5">{v}</p>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          Chaque noyau se désintègre au hasard : on ne peut pas prévoir lequel. Mais sur un grand nombre, la moitié a disparu au
          bout d&apos;une demi-vie, il en reste un quart après deux demi-vies, etc. Relance plusieurs fois : la courbe fluctue autour de
          la loi exponentielle.
        </p>
      </div>
    </div>
  );
}
