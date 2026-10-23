'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Dictionary } from '@/lib/i18n';
import { Slider, fmt } from './Slider';

type T = Dictionary['sims']['skate-park'];
type Preset = 'u' | 'w' | 'bosse';
type Pt = [number, number];

// Monde en mètres : x de -8 à 8, y de 0 à 9. Écran : 46 px par mètre.
const W = 800;
const H = 470;
const PX = 46;
const toX = (x: number) => W / 2 + x * PX;
const toY = (y: number) => H - 26 - y * PX;
const fromX = (px: number) => (px - W / 2) / PX;
const fromY = (py: number) => (H - 26 - py) / PX;

const PRESETS: Record<Preset, Pt[]> = {
  u: [[-7, 7.5], [-5.6, 3.4], [-3.2, 0.9], [0, 0.4], [3.2, 0.9], [5.6, 3.4], [7, 7.5]],
  w: [[-7, 7], [-5, 2.2], [-2.8, 0.5], [0, 2.4], [2.8, 0.5], [5, 2.2], [7, 7]],
  bosse: [[-7, 7], [-5, 2.4], [-2.6, 0.5], [0, 4.6], [2.6, 0.5], [5, 2.4], [7, 7]],
};

const GRAVITY = { terre: 9.8, lune: 1.6, jupiter: 24.8 } as const;
type Planet = keyof typeof GRAVITY;

interface Track {
  pts: Pt[];
  len: number[];
  total: number;
}

/** Échantillonne une spline de Catmull-Rom passant par les points de contrôle. */
function buildTrack(ctrl: Pt[]): Track {
  const pts: Pt[] = [];
  const get = (i: number) => ctrl[Math.max(0, Math.min(ctrl.length - 1, i))];
  for (let i = 0; i < ctrl.length - 1; i++) {
    const [p0, p1, p2, p3] = [get(i - 1), get(i), get(i + 1), get(i + 2)];
    for (let k = 0; k < 60; k++) {
      const t = k / 60;
      const t2 = t * t;
      const t3 = t2 * t;
      const f = (a: number, b: number, c: number, d: number) =>
        0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
      pts.push([f(p0[0], p1[0], p2[0], p3[0]), Math.max(0.05, f(p0[1], p1[1], p2[1], p3[1]))]);
    }
  }
  pts.push(ctrl[ctrl.length - 1]);
  const len = [0];
  for (let i = 1; i < pts.length; i++) len.push(len[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  return { pts, len, total: len[len.length - 1] };
}

/** Point, pente (dy/ds) et angle à l’abscisse curviligne s. */
function at(track: Track, s: number) {
  const { pts, len } = track;
  let lo = 0;
  let hi = len.length - 1;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (len[mid] <= s) lo = mid;
    else hi = mid;
  }
  const seg = len[hi] - len[lo] || 1e-6;
  const u = Math.min(1, Math.max(0, (s - len[lo]) / seg));
  const x = pts[lo][0] + (pts[hi][0] - pts[lo][0]) * u;
  const y = pts[lo][1] + (pts[hi][1] - pts[lo][1]) * u;
  const dx = (pts[hi][0] - pts[lo][0]) / seg;
  const dy = (pts[hi][1] - pts[lo][1]) / seg;
  return { x, y, dy, angle: Math.atan2(dy, dx) };
}

function nearest(track: Track, x: number, y: number) {
  let best = 0;
  let bestD = Infinity;
  track.pts.forEach((p, i) => {
    const d = (p[0] - x) ** 2 + (p[1] - y) ** 2;
    if (d < bestD) {
      bestD = d;
      best = i;
    }
  });
  return track.len[best];
}

interface Sim {
  s: number;
  v: number;
  eth: number;
  e0: number;
}

interface Sample {
  ec: number;
  epp: number;
  eth: number;
}

/** Le skateur, dessiné sur sa planche et incliné comme la piste. */
function Skater({ x, y, angle, active }: { x: number; y: number; angle: number; active: boolean }) {
  const deg = (-angle * 180) / Math.PI;
  return (
    <g transform={`translate(${toX(x)} ${toY(y)}) rotate(${deg})`} style={{ cursor: 'grab' }}>
      <ellipse cx="0" cy="-34" rx="30" ry="42" fill={active ? 'rgba(250,204,21,0.25)' : 'transparent'} />
      <rect x="-22" y="-9" width="44" height="6" rx="3" fill="#1f2937" />
      <circle cx="-14" cy="-2" r="3.5" fill="#f59e0b" />
      <circle cx="14" cy="-2" r="3.5" fill="#f59e0b" />
      <g stroke="#1e3a8a" strokeWidth="5" strokeLinecap="round" fill="none">
        <path d="M-8 -10 L -4 -26 L 2 -36" />
        <path d="M8 -10 L 5 -24 L 2 -36" />
      </g>
      <path d="M2 -36 L 0 -56" stroke="#e0533d" strokeWidth="9" strokeLinecap="round" />
      <g stroke="#7c4a2d" strokeWidth="3.5" strokeLinecap="round" fill="none">
        <path d="M0 -52 L -14 -44" />
        <path d="M0 -52 L 15 -47" />
      </g>
      <circle cx="0" cy="-64" r="7.5" fill="#7c4a2d" />
      <path d="M-8 -66 Q 0 -78 8 -66 Z" fill="#facc15" stroke="#a16207" strokeWidth="1" />
    </g>
  );
}

function Bars({ ec, epp, eth, max, t }: { ec: number; epp: number; eth: number; max: number; t: T }) {
  const items = [
    { k: t.ec, v: ec, c: '#22c55e' },
    { k: t.epp, v: epp, c: '#3b82f6' },
    { k: t.eth, v: eth, c: '#ef4444' },
    { k: t.em, v: ec + epp, c: '#facc15' },
  ];
  return (
    <svg viewBox="0 0 230 190" className="h-auto w-full" role="img" aria-label={t.barsTitle}>
      <line x1="10" x2="225" y1="160" y2="160" stroke="#94a3b8" />
      {items.map((it, i) => {
        const h = Math.max(0, Math.min(1, it.v / max)) * 140;
        return (
          <g key={it.k}>
            <rect x={18 + i * 52} y={160 - h} width="36" height={h} rx="4" fill={it.c} />
            <text x={36 + i * 52} y="176" fontSize="11" textAnchor="middle" fill="currentColor">{it.k}</text>
            <text x={36 + i * 52} y={154 - h} fontSize="10" textAnchor="middle" fill="currentColor">
              {fmt(it.v / 1000, 1)}
            </text>
          </g>
        );
      })}
      <text x="10" y="12" fontSize="10" fill="#64748b">kJ</text>
    </svg>
  );
}

function Pie({ ec, epp, eth, t }: { ec: number; epp: number; eth: number; t: T }) {
  const total = ec + epp + eth || 1;
  const parts = [
    { v: ec, c: '#22c55e' },
    { v: epp, c: '#3b82f6' },
    { v: eth, c: '#ef4444' },
  ];
  let a0 = -Math.PI / 2;
  return (
    <svg viewBox="-60 -60 120 120" className="mx-auto h-32 w-32" role="img" aria-label={t.pieTitle}>
      {parts.map((p, i) => {
        const a1 = a0 + (p.v / total) * Math.PI * 2;
        const large = a1 - a0 > Math.PI ? 1 : 0;
        const d =
          p.v / total > 0.999
            ? 'M -50 0 A 50 50 0 1 1 50 0 A 50 50 0 1 1 -50 0'
            : `M0 0 L ${(50 * Math.cos(a0)).toFixed(2)} ${(50 * Math.sin(a0)).toFixed(2)} A 50 50 0 ${large} 1 ${(50 * Math.cos(a1)).toFixed(2)} ${(50 * Math.sin(a1)).toFixed(2)} Z`;
        a0 = a1;
        return p.v > 0 ? <path key={i} d={d} fill={p.c} /> : null;
      })}
    </svg>
  );
}

const CHALLENGES = [
  { setup: { preset: 'u', mu: 0, planet: 'terre', mass: 50, start: 6 }, answer: 1 },
  { setup: { preset: 'u', mu: 0.12, planet: 'terre', mass: 50, start: 6 }, answer: 0 },
  { setup: { preset: 'u', mu: 0, planet: 'terre', mass: 50, start: 6 }, answer: 2 },
  { setup: { preset: 'u', mu: 0, planet: 'terre', mass: 100, start: 6 }, answer: 1 },
  { setup: { preset: 'bosse', mu: 0, planet: 'terre', mass: 50, start: 4 }, answer: 0 },
  { setup: { preset: 'u', mu: 0, planet: 'lune', mass: 50, start: 6 }, answer: 0 },
] as const;

export function SkateParkSim({ t }: { t: T }) {
  const [preset, setPreset] = useState<Preset>('u');
  const [ctrl, setCtrl] = useState<Pt[]>(PRESETS.u);
  const track = useMemo(() => buildTrack(ctrl), [ctrl]);
  const [mass, setMass] = useState(50);
  const [mu, setMu] = useState(0);
  const [planet, setPlanet] = useState<Planet>('terre');
  const [slow, setSlow] = useState(false);
  const [running, setRunning] = useState(true);
  const [edit, setEdit] = useState(false);
  const [grid, setGrid] = useState(true);
  const g = GRAVITY[planet];

  const startS = useCallback((tr: Track, height: number) => {
    // Point de la moitié gauche de la piste à la hauteur voulue.
    let s = 0;
    for (let i = 0; i < tr.pts.length / 2; i++) {
      if (tr.pts[i][1] <= height) {
        s = tr.len[i];
        break;
      }
    }
    return s;
  }, []);

  // La physique avance dans `sim` (hors rendu) ; l’affichage lit la copie `snap`, mise à jour à chaque image.
  const sim = useRef<Sim>({ s: 0, v: 0, eth: 0, e0: 0 });
  const history = useRef<Sample[]>([]);
  const [snap, setSnap] = useState<Sim & { hist: Sample[] }>(() => {
    const tr = buildTrack(PRESETS.u);
    const s = startS(tr, 6);
    return { s, v: 0, eth: 0, e0: 50 * GRAVITY.terre * at(tr, s).y, hist: [] };
  });
  const dragging = useRef<'skater' | number | null>(null);
  const [holding, setHolding] = useState(false);
  const pendingStart = useRef(6);
  const svgRef = useRef<SVGSVGElement>(null);

  const publish = useCallback(() => setSnap({ ...sim.current, hist: history.current.slice() }), []);

  const place = useCallback(
    (s: number) => {
      sim.current = { s, v: 0, eth: 0, e0: mass * g * at(track, s).y };
      history.current = [];
      publish();
    },
    [track, mass, g, publish],
  );

  // À chaque nouvelle piste, la skateuse repart du haut, à gauche.
  useEffect(() => {
    const s = startS(track, pendingStart.current);
    pendingStart.current = 6;
    sim.current = { s, v: 0, eth: 0, e0: mass * g * at(track, s).y };
    history.current = [];
    publish();
    // La masse et la pesanteur ne replacent pas la skateuse : seule la piste compte ici.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track]);

  // Nouvelle masse ou nouvelle planète : on garde la position et la vitesse, l’énergie est recalculée.
  useEffect(() => {
    const st = sim.current;
    st.eth = 0;
    st.e0 = 0.5 * mass * st.v * st.v + mass * g * at(track, st.s).y;
    history.current = [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mass, g]);

  useEffect(() => {
    if (!running) return;
    let last = performance.now();
    let raf = 0;
    let acc = 0;
    const tick = (now: number) => {
      const dt = Math.min(1 / 30, (now - last) / 1000) * (slow ? 0.25 : 1);
      last = now;
      if (dragging.current === null) {
        const st = sim.current;
        const steps = 10;
        const h = dt / steps;
        for (let k = 0; k < steps; k++) {
          const p = at(track, st.s);
          const cos = Math.sqrt(Math.max(0, 1 - p.dy * p.dy));
          const drive = -g * p.dy;
          const fr = mu * g * cos;
          if (Math.abs(st.v) < 0.02 && Math.abs(drive) <= fr) {
            st.v = 0;
            continue;
          }
          const a = drive - Math.sign(st.v || drive) * fr;
          st.v += a * h;
          st.s += st.v * h;
          st.eth += mu * mass * g * cos * Math.abs(st.v) * h;
          // Bords de la piste : le skateur rebondit sur un petit mur.
          if (st.s < 0 || st.s > track.total) {
            st.s = Math.min(track.total, Math.max(0, st.s));
            const before = 0.5 * mass * st.v * st.v;
            st.v = -0.5 * st.v;
            st.eth += before - 0.5 * mass * st.v * st.v;
          }
          // Correction : l’énergie totale se conserve exactement.
          const q = at(track, st.s);
          const ek = st.e0 - mass * g * q.y - st.eth;
          if (ek > 0) st.v = Math.sign(st.v || 1) * Math.sqrt((2 * ek) / mass);
        }
        acc += dt;
        if (acc > 1 / 20) {
          acc = 0;
          const q = at(track, st.s);
          history.current.push({ ec: 0.5 * mass * st.v * st.v, epp: mass * g * q.y, eth: st.eth });
          if (history.current.length > 240) history.current.shift();
        }
      }
      publish();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running, slow, track, mass, mu, g, publish]);

  function pointer(e: React.PointerEvent) {
    const svg = svgRef.current;
    if (!svg) return null;
    const r = svg.getBoundingClientRect();
    return { x: fromX(((e.clientX - r.left) / r.width) * W), y: fromY(((e.clientY - r.top) / r.height) * H) };
  }

  function onMove(e: React.PointerEvent) {
    const p = pointer(e);
    if (!p || dragging.current === null) return;
    if (dragging.current === 'skater') place(nearest(track, p.x, p.y));
    else {
      const i = dragging.current;
      setCtrl((c) => c.map((q, j) => (j === i ? [i === 0 || i === c.length - 1 ? q[0] : Math.max(-7.5, Math.min(7.5, p.x)), Math.max(0.2, Math.min(8.5, p.y))] : q)));
    }
  }

  const st = snap;
  const pos = at(track, st.s);
  const ec = 0.5 * mass * st.v * st.v;
  const epp = mass * g * pos.y;
  const max = Math.max(mass * g * 8.5, st.e0) * 1.05;
  const d = track.pts.map((p, i) => `${i ? 'L' : 'M'}${toX(p[0]).toFixed(1)} ${toY(p[1]).toFixed(1)}`).join(' ');

  function choosePreset(p: Preset) {
    setPreset(p);
    setCtrl(PRESETS[p]);
  }

  // Défis : prédire, puis vérifier dans la simulation.
  const [ci, setCi] = useState<number | null>(null);
  const [picked, setPicked] = useState<number | null>(null);
  function setupChallenge(i: number) {
    const c = CHALLENGES[i].setup;
    if (c.preset !== preset) {
      setPreset(c.preset);
      setCtrl(PRESETS[c.preset]);
    }
    setMu(c.mu);
    setPlanet(c.planet);
    setMass(c.mass);
    setRunning(true);
    if (c.preset === preset) {
      const s = startS(track, c.start);
      sim.current = { s, v: 0, eth: 0, e0: c.mass * GRAVITY[c.planet] * at(track, s).y };
      history.current = [];
      publish();
    } else {
      pendingStart.current = c.start;
    }
  }

  const hist = snap.hist;
  const hmax = max;
  const line = (key: 'ec' | 'epp' | 'eth' | 'em') =>
    hist
      .map((h, i) => {
        const v = key === 'em' ? h.ec + h.epp : h[key];
        return `${(i / 239) * 300},${(90 - (v / hmax) * 86).toFixed(1)}`;
      })
      .join(' ');

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        {(['u', 'w', 'bosse'] as const).map((p) => (
          <button
            key={p}
            type="button"
            aria-pressed={preset === p}
            onClick={() => choosePreset(p)}
            className={`rounded-full border-2 px-3 py-1 text-sm font-bold ${preset === p ? 'border-ink bg-ink text-on-ink' : 'border-line bg-surface'}`}
          >
            {t.tracks[p]}
          </button>
        ))}
        <label className="flex items-center gap-1.5 text-sm">
          <input type="checkbox" checked={edit} onChange={(e) => setEdit(e.target.checked)} className="h-4 w-4" />
          {t.edit}
        </label>
        <label className="flex items-center gap-1.5 text-sm">
          <input type="checkbox" checked={grid} onChange={(e) => setGrid(e.target.checked)} className="h-4 w-4" />
          {t.grid}
        </label>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_17rem]">
        <div className="flex flex-col gap-3">
          <div className="overflow-hidden rounded-2xl border border-line">
            <svg
              ref={svgRef}
              viewBox={`0 0 ${W} ${H}`}
              className="h-auto w-full touch-none select-none"
              role="img"
              aria-label={t.sceneLabel}
              onPointerMove={onMove}
              onPointerUp={() => {
                dragging.current = null;
                setHolding(false);
              }}
              onPointerLeave={() => {
                dragging.current = null;
                setHolding(false);
              }}
            >
              <defs>
                <linearGradient id="ciel" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={planet === 'lune' ? '#0f172a' : planet === 'jupiter' ? '#7c2d12' : '#7dd3fc'} />
                  <stop offset="100%" stopColor={planet === 'lune' ? '#334155' : planet === 'jupiter' ? '#fdba74' : '#e0f2fe'} />
                </linearGradient>
              </defs>
              <rect width={W} height={H} fill="url(#ciel)" />
              {planet === 'terre' && (
                <g opacity="0.9">
                  <circle cx="700" cy="70" r="30" fill="#fde047" />
                  <path d="M40 444 Q 120 380 210 444 Z M600 444 Q 690 360 790 444 Z" fill="#86efac" />
                  {/* Baobab au loin. */}
                  <path d="M118 444 V 380 M118 384 q -24 -14 -30 -30 M118 388 q 22 -16 30 -34" stroke="#78350f" strokeWidth="7" fill="none" strokeLinecap="round" />
                  <ellipse cx="118" cy="352" rx="40" ry="16" fill="#4d7c0f" opacity="0.8" />
                </g>
              )}
              <rect y={H - 26} width={W} height="26" fill={planet === 'lune' ? '#64748b' : planet === 'jupiter' ? '#9a3412' : '#a16207'} />
              {grid &&
                Array.from({ length: 10 }, (_, k) => (
                  <g key={k}>
                    <line x1="0" x2={W} y1={toY(k)} y2={toY(k)} stroke="#0f172a" strokeOpacity="0.12" />
                    <text x="6" y={toY(k) - 3} fontSize="11" fill="#0f172a" fillOpacity="0.55">{k} m</text>
                  </g>
                ))}
              {/* Piste : supports, puis rail. */}
              {track.pts
                .filter((_, i) => i % 24 === 0)
                .map((p, i) => (
                  <line key={i} x1={toX(p[0])} x2={toX(p[0])} y1={toY(p[1])} y2={H - 26} stroke="#64748b" strokeWidth="3" />
                ))}
              <path d={d} fill="none" stroke="#475569" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
              <path d={d} fill="none" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              {edit &&
                ctrl.map((p, i) => (
                  <circle
                    key={i}
                    cx={toX(p[0])}
                    cy={toY(p[1])}
                    r="11"
                    fill="#f59e0b"
                    stroke="#fff"
                    strokeWidth="3"
                    style={{ cursor: 'move' }}
                    onPointerDown={(e) => {
                      (e.target as Element).setPointerCapture?.(e.pointerId);
                      dragging.current = i;
                    }}
                  />
                ))}
              {/* Hauteur du skateur. */}
              <line x1={toX(pos.x)} x2={toX(pos.x)} y1={toY(pos.y)} y2={H - 26} stroke="#0f172a" strokeDasharray="4 4" strokeOpacity="0.5" />
              <text x={toX(pos.x) + 6} y={(toY(pos.y) + H - 26) / 2} fontSize="12" fill="#0f172a">
                h = {fmt(pos.y, 1)} m
              </text>
              <g
                onPointerDown={(e) => {
                  (e.target as Element).setPointerCapture?.(e.pointerId);
                  dragging.current = 'skater';
                  setHolding(true);
                }}
              >
                <Skater x={pos.x} y={pos.y} angle={pos.angle} active={holding} />
              </g>
              <g transform="translate(560 18)">
                <rect width="224" height="34" rx="10" fill="#0f172a" opacity="0.75" />
                <text x="12" y="22" fontSize="14" fill="#fff" fontWeight="700">
                  v = {fmt(Math.abs(st.v), 1)} m/s · {fmt(Math.abs(st.v) * 3.6, 0)} km/h
                </text>
              </g>
            </svg>
          </div>
          <p className="text-sm text-muted">{edit ? t.editHelp : t.dragHelp}</p>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => setRunning((r) => !r)} className="rounded-full bg-ink px-5 py-2 font-bold text-on-ink">
              {running ? t.pause : t.play}
            </button>
            <button type="button" onClick={() => place(startS(track, 6))} className="rounded-full border-2 border-line px-4 py-2 font-bold">
              {t.reset}
            </button>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={slow} onChange={(e) => setSlow(e.target.checked)} className="h-4 w-4" />
              {t.slow}
            </label>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Slider label={t.mass} value={mass} min={20} max={100} step={1} unit="kg" onChange={setMass} />
            <Slider label={t.friction} value={mu} min={0} max={0.3} step={0.01} onChange={setMu} />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-bold text-muted">{t.gravity}</span>
            {(Object.keys(GRAVITY) as Planet[]).map((k) => (
              <button
                key={k}
                type="button"
                aria-pressed={planet === k}
                onClick={() => setPlanet(k)}
                className={`rounded-full border-2 px-3 py-1 text-sm font-bold ${planet === k ? 'border-ink bg-ink text-on-ink' : 'border-line bg-surface'}`}
              >
                {t.planets[k]} ({fmt(GRAVITY[k], 1)} N/kg)
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <section className="rounded-2xl border border-line bg-surface p-3">
            <p className="text-sm font-bold text-muted">{t.barsTitle}</p>
            <Bars ec={ec} epp={epp} eth={st.eth} max={max} t={t} />
            <Pie ec={ec} epp={epp} eth={st.eth} t={t} />
          </section>
          <section className="rounded-2xl border border-line bg-surface p-3">
            <p className="text-sm font-bold text-muted">{t.graphTitle}</p>
            <svg viewBox="0 0 300 94" className="h-auto w-full" role="img" aria-label={t.graphTitle}>
              <polyline points={line('em')} fill="none" stroke="#eab308" strokeWidth="2.5" />
              <polyline points={line('ec')} fill="none" stroke="#22c55e" strokeWidth="2" />
              <polyline points={line('epp')} fill="none" stroke="#3b82f6" strokeWidth="2" />
              <polyline points={line('eth')} fill="none" stroke="#ef4444" strokeWidth="2" />
            </svg>
          </section>
          <section className="rounded-2xl bg-ink p-4 text-on-ink">
            <p className="text-sm font-bold text-on-ink-muted">{t.challenge}</p>
            {ci === null ? (
              <button type="button" onClick={() => { setCi(0); setPicked(null); }} className="mt-2 rounded-full bg-amber-300 px-4 py-2 font-bold text-slate-950">
                {t.challengeStart}
              </button>
            ) : ci >= CHALLENGES.length ? (
              <>
                <p className="mt-1 font-bold">{t.challengeDone}</p>
                <button type="button" onClick={() => { setCi(0); setPicked(null); }} className="mt-2 underline">
                  {t.challengeAgain}
                </button>
              </>
            ) : (
              <>
                <p className="mt-1">{t.challenges[ci].q}</p>
                <div className="mt-2 grid gap-1.5">
                  {t.challenges[ci].choices.map((c, j) => (
                    <button
                      key={c}
                      type="button"
                      disabled={picked !== null}
                      onClick={() => {
                        setPicked(j);
                        setupChallenge(ci);
                      }}
                      className={`rounded-lg border-2 px-3 py-1.5 text-left text-sm ${
                        picked === null
                          ? 'border-on-ink-muted hover:border-amber-300'
                          : j === CHALLENGES[ci].answer
                            ? 'border-emerald-300 bg-emerald-300/20'
                            : picked === j
                              ? 'border-amber-200 bg-amber-200/10'
                              : 'border-transparent opacity-60'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
                {picked !== null && (
                  <>
                    <p className={`mt-2 font-bold ${picked === CHALLENGES[ci].answer ? 'text-emerald-300' : 'text-amber-200'}`}>
                      {picked === CHALLENGES[ci].answer ? t.predictRight : t.predictWrong}
                    </p>
                    <p className="mt-1 text-sm text-on-ink-muted">{t.challenges[ci].why}</p>
                    <button type="button" onClick={() => { setCi(ci + 1); setPicked(null); }} className="mt-2 rounded-full bg-amber-300 px-4 py-1.5 text-sm font-bold text-slate-950">
                      {t.next}
                    </button>
                  </>
                )}
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
