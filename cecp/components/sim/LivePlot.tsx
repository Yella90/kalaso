'use client';

import { useEffect, useRef } from 'react';

export interface PlotSample {
  t: number;
  values: number[];
}

export interface PlotSeries {
  label: string;
  color: string;
  /** trait pointille */
  dashed?: boolean;
}

/**
 * Graphique temps reel dessine sur un canvas (60 images/s sans re-rendu React).
 * Le composant parent remplit `buffer.current` ; ce composant le relit a chaque image.
 */
export function LivePlot({
  buffer, series, windowSeconds = 6, yMin, yMax, height = 180, xLabel = 't (s)', yLabel,
}: {
  buffer: React.RefObject<PlotSample[]>;
  series: PlotSeries[];
  windowSeconds?: number;
  yMin?: number;
  yMax?: number;
  height?: number;
  xLabel?: string;
  yLabel?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current, wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let raf = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(wrap.clientWidth * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${wrap.clientWidth}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const draw = () => {
      const W = wrap.clientWidth, H = height;
      const padL = 44, padR = 10, padT = 10, padB = 24;
      const data = buffer.current ?? [];
      ctx.clearRect(0, 0, W, H);

      const tEnd = data.length ? data[data.length - 1].t : 0;
      const tStart = Math.max(0, tEnd - windowSeconds);
      const visible = data.filter((d) => d.t >= tStart);

      let lo = yMin, hi = yMax;
      if (lo === undefined || hi === undefined) {
        let m = 1e-12;
        for (const d of visible) for (const v of d.values) m = Math.max(m, Math.abs(v));
        lo = lo ?? -m * 1.1;
        hi = hi ?? m * 1.1;
      }
      const X = (t: number) => padL + ((t - tStart) / windowSeconds) * (W - padL - padR);
      const Y = (v: number) => padT + (1 - (v - lo!) / (hi! - lo!)) * (H - padT - padB);

      // Grille et axes
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      ctx.font = '10px ui-monospace, monospace';
      ctx.fillStyle = '#64748b';
      for (let i = 0; i <= 4; i++) {
        const v = lo! + ((hi! - lo!) * i) / 4;
        const y = Y(v);
        ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(W - padR, y); ctx.stroke();
        const txt = Math.abs(v) >= 100 || (Math.abs(v) < 0.01 && v !== 0) ? v.toExponential(1) : v.toFixed(2);
        ctx.fillText(txt.replace('.', ','), 2, y + 3);
      }
      for (let s = Math.ceil(tStart); s <= tStart + windowSeconds; s++) {
        const x = X(s);
        ctx.beginPath(); ctx.moveTo(x, padT); ctx.lineTo(x, H - padB); ctx.stroke();
        ctx.fillText(String(s), x - 3, H - padB + 12);
      }
      ctx.strokeStyle = '#475569';
      if (lo! < 0 && hi! > 0) {
        ctx.beginPath(); ctx.moveTo(padL, Y(0)); ctx.lineTo(W - padR, Y(0)); ctx.stroke();
      }
      ctx.fillText(xLabel, W - padR - 28, H - 4);
      if (yLabel) ctx.fillText(yLabel, padL + 4, padT + 10);

      // Courbes
      series.forEach((s, k) => {
        ctx.strokeStyle = s.color;
        ctx.lineWidth = 2;
        ctx.setLineDash(s.dashed ? [5, 4] : []);
        ctx.beginPath();
        visible.forEach((d, i) => {
          const x = X(d.t), y = Y(d.values[k]);
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        });
        ctx.stroke();
      });
      ctx.setLineDash([]);
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [buffer, series, windowSeconds, yMin, yMax, height, xLabel, yLabel]);

  return (
    <div className="rounded-lg bg-slate-950 border border-slate-800 p-2 space-y-1">
      <div ref={wrapRef} className="w-full">
        <canvas ref={canvasRef} className="block" aria-label={`Graphique : ${series.map((s) => s.label).join(', ')}`} />
      </div>
      <div className="flex flex-wrap gap-3 px-1 text-[11px]">
        {series.map((s) => (
          <span key={s.label} className="inline-flex items-center gap-1.5 text-slate-400">
            <span className="w-3 h-0.5" style={{ background: s.color }} />{s.label}
          </span>
        ))}
      </div>
    </div>
  );
}
