'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useAnimationFrame } from '@/cecp/components/sim/useAnimationFrame';
import { Slider, Stat, ParamPanel, PlayControls, Segmented, frNum } from '@/cecp/components/sim/Controls';
import {
  wavelength, interferenceElongation, interferenceAmplitude, fringeKind, countMaximaBetween, countMinimaBetween,
} from '@/cecp/lib/physics/waves';

// Zone observee de la cuve (m)
const AREA_W = 0.16, AREA_H = 0.11;
// Resolution de calcul (cellules)
const GW = 200, GH = Math.round((GW * AREA_H) / AREA_W);
const PERIODS_PER_SECOND = 0.8;
const A = 1; // amplitude de chaque source (unite arbitraire)

type Mode = 'instant' | 'amplitude';

/** Position d'une source (sign = -1 : S1, +1 : S2), pres du haut de la zone */
const sourcePos = (d: number, sign: -1 | 1) => ({ x: AREA_W / 2 + (sign * d) / 2, y: 0.02 });

export function RippleTankSimulation() {
  const [N, setN] = useState(20);
  const [v, setV] = useState(0.3);
  const [dCm, setDCm] = useState(5);
  const [mode, setMode] = useState<Mode>('instant');
  const [running, setRunning] = useState(true);
  const [probe, setProbe] = useState<{ x: number; y: number } | null>({ x: 0.11, y: 0.075 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridRef = useRef<HTMLCanvasElement | null>(null);
  const t = useRef(0);
  const [time, setTime] = useState(0); // copie de t (en periodes) pour le rendu

  const lambda = wavelength(v, N);
  const d = dCm / 100;
  // Sources sur l'axe horizontal, pres du haut de la zone
  const s1 = sourcePos(d, -1);
  const s2 = sourcePos(d, 1);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!gridRef.current) {
      gridRef.current = document.createElement('canvas');
      gridRef.current.width = GW;
      gridRef.current.height = GH;
    }
    const g = gridRef.current.getContext('2d');
    const ctx = canvas.getContext('2d');
    if (!g || !ctx) return;
    const img = g.createImageData(GW, GH);
    const s1 = sourcePos(d, -1), s2 = sourcePos(d, 1);
    const time = t.current / N;
    for (let j = 0; j < GH; j++) {
      const y = ((j + 0.5) / GH) * AREA_H;
      for (let i = 0; i < GW; i++) {
        const x = ((i + 0.5) / GW) * AREA_W;
        const d1 = Math.hypot(x - s1.x, y - s1.y);
        const d2 = Math.hypot(x - s2.x, y - s2.y);
        let r: number, gg: number, b: number;
        if (mode === 'instant') {
          // On ne represente que les ondes deja emises (fronts circulaires)
          const reach = v * time;
          const e1 = d1 <= reach ? Math.sin(2 * Math.PI * (N * time - d1 / lambda)) : 0;
          const e2 = d2 <= reach ? Math.sin(2 * Math.PI * (N * time - d2 / lambda)) : 0;
          const e = (A * (e1 + e2)) / 2; // -1 .. 1
          r = 20 + 90 * (e + 1); gg = 60 + 85 * (e + 1); b = 120 + 65 * (e + 1);
        } else {
          const amp = interferenceAmplitude(A, d2 - d1, lambda) / (2 * A); // 0 .. 1
          r = 15 + 230 * amp * amp; gg = 23 + 170 * amp; b = 42 + 40 * amp;
        }
        const k = 4 * (j * GW + i);
        img.data[k] = r; img.data[k + 1] = gg; img.data[k + 2] = b; img.data[k + 3] = 255;
      }
    }
    g.putImageData(img, 0, 0);
    const W = canvas.width, H = canvas.height;
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(gridRef.current, 0, 0, W, H);
    const px = (x: number) => (x / AREA_W) * W;
    const py = (y: number) => (y / AREA_H) * H;
    // Segment S1S2 et sources
    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(px(s1.x), py(s1.y)); ctx.lineTo(px(s2.x), py(s2.y)); ctx.stroke();
    ctx.setLineDash([]);
    for (const [s, label] of [[s1, 'S₁'], [s2, 'S₂']] as const) {
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath(); ctx.arc(px(s.x), py(s.y), 6, 0, 2 * Math.PI); ctx.fill();
      ctx.fillStyle = '#fde68a';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText(label, px(s.x) - 8, py(s.y) - 10 < 12 ? py(s.y) + 24 : py(s.y) - 10);
    }
    if (probe) {
      ctx.strokeStyle = '#f472b6';
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(px(s1.x), py(s1.y)); ctx.lineTo(px(probe.x), py(probe.y)); ctx.lineTo(px(s2.x), py(s2.y)); ctx.stroke();
      ctx.fillStyle = '#f472b6';
      ctx.beginPath(); ctx.arc(px(probe.x), py(probe.y), 6, 0, 2 * Math.PI); ctx.fill();
      ctx.fillText('M', px(probe.x) + 9, py(probe.y) + 5);
      ctx.lineWidth = 1;
    }
    // Echelle
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(12, H - 16, px(0.01), 3);
    ctx.font = '12px sans-serif';
    ctx.fillText('1 cm', 12, H - 22);
  }, [N, v, lambda, mode, probe, d]);

  useEffect(() => { draw(); }, [draw]);

  useAnimationFrame((dt) => {
    t.current += dt * PERIODS_PER_SECOND;
    draw();
    setTime(t.current);
  }, running && mode === 'instant');

  const onPick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setProbe({
      x: ((e.clientX - rect.left) / rect.width) * AREA_W,
      y: ((e.clientY - rect.top) / rect.height) * AREA_H,
    });
  };

  const restart = () => { t.current = 0; setTime(0); draw(); };

  const d1 = probe ? Math.hypot(probe.x - s1.x, probe.y - s1.y) : 0;
  const d2 = probe ? Math.hypot(probe.x - s2.x, probe.y - s2.y) : 0;
  const ratio = (d2 - d1) / lambda;
  const kind = fringeKind(d2 - d1, lambda, 0.06);
  const amp = interferenceAmplitude(1, d2 - d1, lambda);
  // Elongation instantanee de M (affichage)
  const yM = probe ? interferenceElongation(1, N, lambda, d1, d2, time / N) : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
      <div className="lg:col-span-2 space-y-3">
        <div className="rounded-lg bg-slate-950 border border-slate-800 overflow-hidden">
          <canvas
            ref={canvasRef}
            width={800}
            height={Math.round((800 * AREA_H) / AREA_W)}
            onClick={onPick}
            className="w-full h-auto block cursor-crosshair"
            aria-label="Cuve à ondes vue de dessus : interférences entre deux sources. Clique pour placer le point M."
          />
        </div>
        <p className="text-xs text-slate-500">
          Vue de dessus de la cuve (16 cm × 11 cm). Clique n&apos;importe où pour placer le point M.
          {mode === 'amplitude'
            ? ' Les zones claires vibrent avec une amplitude maximale, les zones sombres restent immobiles : ce sont des hyperboles.'
            : ' Mouvement ralenti : clair = crête, sombre = creux.'}
        </p>
      </div>

      <ParamPanel>
        <Segmented<Mode> label="Affichage" value={mode} onChange={setMode}
          options={[{ value: 'instant', label: 'Surface (instantané)' }, { value: 'amplitude', label: 'Amplitude' }]} />
        <Slider label="Fréquence N" value={N} unit="Hz" min={10} max={40} step={1} digits={0} onChange={(x) => { setN(x); restart(); }} />
        <Slider label="Célérité v" value={v} unit="m/s" min={0.15} max={0.5} step={0.01} onChange={(x) => { setV(x); restart(); }} />
        <Slider label="Distance S₁S₂ = d" value={dCm} unit="cm" min={1} max={9} step={0.25} onChange={(x) => { setDCm(x); restart(); }} />
        {mode === 'instant' && (
          <PlayControls running={running} onToggle={() => setRunning((r) => !r)} onReset={restart} playLabel="Lancer" />
        )}
        <div className="grid grid-cols-2 gap-2">
          <Stat label="λ = v / N" value={`${frNum(lambda * 100, 2)} cm`} tone="emerald" />
          <Stat label="d / λ" value={frNum(d / lambda, 2)} />
          <Stat label="Maxima sur S₁S₂" value={String(countMaximaBetween(d, lambda))} tone="sky" />
          <Stat label="Minima sur S₁S₂" value={String(countMinimaBetween(d, lambda))} tone="rose" />
        </div>
        {probe && (
          <div className="p-3 rounded-md bg-slate-950/60 border border-pink-900/60 text-xs space-y-1 font-mono">
            <p className="text-pink-300 font-sans font-semibold text-sm">Point M</p>
            <p className="text-slate-300">S₁M = {frNum(d1 * 100, 2)} cm ; S₂M = {frNum(d2 * 100, 2)} cm</p>
            <p className="text-slate-300">δ = S₂M − S₁M = {frNum((d2 - d1) * 100, 2)} cm</p>
            <p className="text-slate-300">δ / λ = {frNum(ratio, 2)}</p>
            <p className="text-slate-300">Amplitude : {frNum(amp, 2)} a {mode === 'instant' && `(élongation ${frNum(yM, 2)} a)`}</p>
            <p className="font-sans text-amber-400 font-semibold">
              {kind === 'maximum' ? 'Amplitude maximale (δ = kλ)' : kind === 'minimum' ? 'Point quasi immobile (δ = (k + ½)λ)' : 'Amplitude intermédiaire'}
            </p>
          </div>
        )}
      </ParamPanel>
    </div>
  );
}
