import { electronConfiguration } from '@/lib/chemistry/elements';

const C = 150;
const MAX_DRAWN_NUCLEONS = 120;

interface Props {
  protons: number;
  neutrons: number;
  electrons: number;
  /** Fait tourner les électrons (désactivé automatiquement si l'utilisateur réduit les animations). */
  animate?: boolean;
  className?: string;
  title?: string;
}

/** Arrondi au centième : le serveur et le navigateur doivent produire exactement le même SVG. */
const round = (v: number) => Math.round(v * 100) / 100;

/** Positions des nucléons en spirale de tournesol : un noyau compact quelle que soit sa taille. */
function nucleonPositions(count: number, step: number) {
  return Array.from({ length: count }, (_, i) => {
    const r = step * Math.sqrt(i + 0.5);
    const a = i * 2.39996; // angle d'or
    return { x: round(C + r * Math.cos(a)), y: round(C + r * Math.sin(a)) };
  });
}

/** Mélange régulièrement protons et neutrons pour que le noyau ne soit pas coupé en deux. */
function isProton(i: number, protons: number, total: number) {
  return Math.floor(((i + 1) * protons) / total) > Math.floor((i * protons) / total);
}

/** Modèle de Bohr : noyau au centre, électrons répartis sur les couches K, L, M… */
export function AtomDiagram({ protons, neutrons, electrons, animate = true, className, title }: Props) {
  const total = protons + neutrons;
  const drawn = total <= MAX_DRAWN_NUCLEONS;
  const radius = total > 40 ? 4 : 5.5;
  const step = radius * 1.05;
  const nucleusRadius = drawn ? step * Math.sqrt(Math.max(total, 1)) + radius : 34;

  const { shells } = electronConfiguration(electrons, protons);
  const first = Math.max(nucleusRadius + 16, 44);
  const gap = shells.length > 1 ? Math.min(26, (140 - first) / (shells.length - 1)) : 0;

  return (
    <svg viewBox="0 0 300 300" className={className} role="img" aria-label={title}>
      {title && <title>{title}</title>}
      {shells.map((count, k) => {
        const r = round(first + k * gap);
        return (
          <g key={k}>
            <circle cx={C} cy={C} r={r} fill="none" stroke="var(--on-ink-muted)" strokeOpacity="0.45" strokeWidth="1" />
            <g className={animate ? 'orbit' : undefined} style={animate ? { animationDuration: `${14 + k * 7}s` } : undefined}>
              {Array.from({ length: count }, (_, i) => {
                const a = (i / count) * Math.PI * 2 + k * 0.6;
                return <circle key={i} cx={round(C + r * Math.cos(a))} cy={round(C + r * Math.sin(a))} r={4.2} fill="var(--focus)" />;
              })}
            </g>
          </g>
        );
      })}
      {drawn ? (
        nucleonPositions(total, step).map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={radius}
            fill={isProton(i, protons, total) ? '#e8793a' : '#8f9bbf'}
            stroke="var(--ink)"
            strokeWidth="0.8"
          />
        ))
      ) : (
        <circle cx={C} cy={C} r={nucleusRadius} fill="#e8793a" stroke="#8f9bbf" strokeWidth="6" />
      )}
    </svg>
  );
}
