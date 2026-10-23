'use client';

import { useEffect, useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';
import { useAnimationFrame } from '@/cecp/components/sim/useAnimationFrame';
import { fringeSpacing, youngIntensity, wavelengthToRGB, wavelengthToCss } from '@/cecp/lib/physics/light';

const fr = (x: number, d = 2) => x.toFixed(d).replace('.', ',');

const W = 900, H = 380, CY = 190;
const PLATE_X = 150, SCREEN_X = 560;
const HALF_RANGE_MM = 5;
const PX_PER_MM = (H - 40) / (2 * HALF_RANGE_MM);
const WHITE = Array.from({ length: 31 }, (_, i) => 400 + i * 10);
/** Sommes des composantes pour que la frange centrale soit d'un blanc neutre */
const WHITE_SUM = WHITE.reduce(
  (acc, nm) => { const c = wavelengthToRGB(nm); return [acc[0] + c[0], acc[1] + c[1], acc[2] + c[2]]; },
  [0, 0, 0],
);

function Slider({ label, value, display, min, max, step, onChange, accent }: {
  label: string; value: number; display: string; min: number; max: number; step: number; onChange: (v: number) => void; accent?: string;
}) {
  return (
    <label className="block space-y-1">
      <span className="flex justify-between text-sm">
        <span className="text-slate-300">{label}</span>
        <span className="font-mono" style={{ color: accent ?? '#fbbf24' }}>{display}</span>
      </span>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500" />
    </label>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-2.5 rounded-md bg-slate-950/60 border border-slate-800">
      <p className="text-[10px] text-slate-500 uppercase tracking-wider">{label}</p>
      <p className="text-sm font-mono font-semibold text-amber-400 mt-0.5">{value}</p>
    </div>
  );
}

export function InterferenceSimulation() {
  const [lambdaNm, setLambdaNm] = useState(600);
  const [aMm, setAMm] = useState(0.5);
  const [D, setD] = useState(2);
  const [white, setWhite] = useState(false);
  const [running, setRunning] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phase = useRef(0);

  const lambda = lambdaNm * 1e-9, a = aMm * 1e-3;
  const iMm = fringeSpacing(lambda, D, a) * 1000;

  const draw = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const dpr = window.devicePixelRatio || 1;
    if (canvas.width !== W * dpr) { canvas.width = W * dpr; canvas.height = H * dpr; }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, W, H);

    const colA = (al: number) => (white ? `rgba(255,255,255,${al})` : wavelengthToCss(lambdaNm, al));

    // --- Vue de dessus (non a l'echelle) ---
    const lamD = 16 * ((white ? 550 : lambdaNm) / 550);
    const aD = 30 + aMm * 50;
    const s1 = CY - aD / 2, s2 = CY + aD / 2;
    // Source laser
    ctx.fillStyle = '#334155';
    ctx.fillRect(14, CY - 16, 40, 32);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px sans-serif';
    ctx.fillText(white ? 'Lampe' : 'Laser', 16, CY + 30);
    // Ondes planes
    ctx.strokeStyle = colA(0.45);
    ctx.lineWidth = 2;
    for (let x = 60 + (phase.current % lamD); x < PLATE_X; x += lamD) {
      ctx.beginPath(); ctx.moveTo(x, CY - 50); ctx.lineTo(x, CY + 50); ctx.stroke();
    }
    // Plaque et fentes
    ctx.fillStyle = '#64748b';
    ctx.fillRect(PLATE_X - 3, 10, 6, s1 - 4 - 10);
    ctx.fillRect(PLATE_X - 3, s1 + 4, 6, s2 - s1 - 8);
    ctx.fillRect(PLATE_X - 3, s2 + 4, 6, H - 10 - s2 - 4);
    ctx.fillStyle = '#cbd5e1';
    ctx.fillText('F₁', PLATE_X - 22, s1 + 4);
    ctx.fillText('F₂', PLATE_X - 22, s2 + 4);
    // Ondes circulaires issues des deux fentes
    ctx.lineWidth = 1.6;
    for (const sy of [s1, s2]) {
      for (let r = phase.current % lamD; r < SCREEN_X - PLATE_X + 40; r += lamD) {
        if (r < 2) continue;
        const fade = Math.max(0.06, 0.5 - r / 900);
        ctx.strokeStyle = colA(fade);
        ctx.beginPath();
        ctx.arc(PLATE_X, sy, r, -1.35, 1.35);
        ctx.stroke();
      }
    }
    // Cote D et a
    ctx.strokeStyle = '#475569';
    ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(PLATE_X, H - 18); ctx.lineTo(SCREEN_X, H - 18); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(`D = ${fr(D, 2)} m`, (PLATE_X + SCREEN_X) / 2 - 24, H - 22);
    ctx.fillText(`a = ${fr(aMm, 2)} mm`, PLATE_X + 8, 24);

    // --- Ecran : figure d'interference (a l'echelle) ---
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(SCREEN_X - 2, 10, 3, H - 20);
    const bandX = SCREEN_X + 12, bandW = 80;
    const graphX = bandX + bandW + 20, graphW = W - graphX - 14;
    ctx.strokeStyle = '#334155';
    ctx.strokeRect(graphX, 20, graphW, H - 40);
    ctx.beginPath();
    for (let py = 20; py <= H - 20; py++) {
      const xmm = (py - CY) / PX_PER_MM;
      const x = xmm * 1e-3;
      let r = 0, g = 0, b = 0, I = 0;
      if (white) {
        for (const nm of WHITE) {
          const k = youngIntensity(x, nm * 1e-9, D, a);
          const [cr, cg, cb] = wavelengthToRGB(nm);
          r += cr * k; g += cg * k; b += cb * k; I += k;
        }
        r /= WHITE_SUM[0]; g /= WHITE_SUM[1]; b /= WHITE_SUM[2]; I /= WHITE.length;
      } else {
        I = youngIntensity(x, lambda, D, a);
        const [cr, cg, cb] = wavelengthToRGB(lambdaNm);
        r = cr * I; g = cg * I; b = cb * I;
      }
      ctx.fillStyle = `rgb(${Math.min(255, r * 255) | 0},${Math.min(255, g * 255) | 0},${Math.min(255, b * 255) | 0})`;
      ctx.fillRect(bandX, py, bandW, 1);
      const gx = graphX + 4 + I * (graphW - 10);
      if (py === 20) ctx.moveTo(gx, py); else ctx.lineTo(gx, py);
    }
    ctx.strokeStyle = white ? '#e2e8f0' : wavelengthToCss(lambdaNm, 1);
    ctx.lineWidth = 2;
    ctx.stroke();
    // Graduations en mm
    ctx.fillStyle = '#64748b';
    ctx.font = '10px monospace';
    for (let mm = -HALF_RANGE_MM; mm <= HALF_RANGE_MM; mm++) {
      const py = CY + mm * PX_PER_MM;
      ctx.fillRect(bandX - 6, py, 5, 1);
      if (mm % 2 === 0) ctx.fillText(`${mm}`, bandX - 26 + (mm < 0 ? 0 : 6), py + 3);
    }
    ctx.fillText('x (mm)', bandX - 4, 14);
    ctx.fillText('I(x)', graphX + graphW - 30, 14);
    // Mesure de l'interfrange
    if (!white && iMm * PX_PER_MM > 12) {
      const y1 = CY, y2 = CY + iMm * PX_PER_MM;
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(bandX + bandW + 6, y1); ctx.lineTo(bandX + bandW + 14, y1);
      ctx.moveTo(bandX + bandW + 10, y1); ctx.lineTo(bandX + bandW + 10, y2);
      ctx.moveTo(bandX + bandW + 6, y2); ctx.lineTo(bandX + bandW + 14, y2);
      ctx.stroke();
      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText('i', bandX + bandW + 12, (y1 + y2) / 2 + 4);
    }
  };

  useAnimationFrame((dt) => {
    phase.current += dt * 22;
    draw();
  }, running);

  // Redessin quand les parametres changent (meme en pause)
  useEffect(() => { draw(); });

  const nBright = 2 * Math.floor(HALF_RANGE_MM / iMm) + 1;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
      <div className="lg:col-span-2 rounded-lg bg-slate-950 border border-slate-800 overflow-hidden">
        <canvas ref={canvasRef} style={{ width: '100%', height: 'auto', aspectRatio: `${W} / ${H}` }} aria-label="Expérience des fentes de Young" />
      </div>
      <div className="space-y-4 p-5 rounded-lg bg-slate-900 border border-slate-800">
        <h3 className="text-lg font-semibold text-white">Paramètres</h3>
        <div className="grid grid-cols-2 gap-1 p-1 rounded-lg bg-slate-950 border border-slate-800">
          <button onClick={() => setWhite(false)} className={`px-2 py-1.5 rounded-md text-xs font-semibold ${!white ? 'bg-amber-500 text-slate-900' : 'text-slate-300'}`}>Monochromatique</button>
          <button onClick={() => setWhite(true)} className={`px-2 py-1.5 rounded-md text-xs font-semibold ${white ? 'bg-amber-500 text-slate-900' : 'text-slate-300'}`}>Lumière blanche</button>
        </div>
        {!white && (
          <Slider label="Longueur d'onde λ" value={lambdaNm} display={`${lambdaNm} nm`} min={400} max={750} step={5} onChange={setLambdaNm} accent={wavelengthToCss(lambdaNm)} />
        )}
        <Slider label="Distance entre les fentes a" value={aMm} display={`${fr(aMm, 2)} mm`} min={0.2} max={1.5} step={0.05} onChange={setAMm} />
        <Slider label="Distance fentes-écran D" value={D} display={`${fr(D, 2)} m`} min={0.5} max={3} step={0.05} onChange={setD} />
        <button onClick={() => setRunning((r) => !r)} className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm">
          {running ? <><Pause size={14} /> Figer les ondes</> : <><Play size={14} /> Animer les ondes</>}
        </button>
        <div className="grid grid-cols-2 gap-2">
          <Stat label="Interfrange i = λD/a" value={white ? '—' : `${fr(iMm, 2)} mm`} />
          <Stat label="Franges brillantes visibles" value={white ? 'quelques-unes' : `${nBright}`} />
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          {white
            ? 'En lumière blanche, chaque couleur a son propre interfrange : seule la frange centrale est blanche, les suivantes sont irisées puis se brouillent.'
            : 'Augmente λ ou D : les franges s\'écartent. Rapproche les fentes (a plus petit) : elles s\'écartent aussi. La vue de gauche n\'est pas à l\'échelle, l\'écran l\'est.'}
        </p>
      </div>
    </div>
  );
}
