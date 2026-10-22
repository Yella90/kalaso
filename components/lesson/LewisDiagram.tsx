import type { LewisMolecule } from '@/lib/lessons/types';

const UNIT = 46; // pixels par unité de liaison
const PAIR_LENGTH = 11;
const PAD = 28;

const round = (v: number) => Math.round(v * 100) / 100;

/**
 * Distance entre le centre d'un symbole et son bord dans une direction donnée.
 * Le symbole est vu comme une ellipse, plus large pour « Cl » que pour « H ».
 */
function edge(symbol: string, ux: number, uy: number): number {
  const rx = 5 + 5.5 * symbol.length;
  const ry = 10;
  return 1 / Math.hypot(ux / rx, uy / ry);
}

/**
 * Schéma de Lewis à la française : liaisons en traits, doublets non liants en petits tirets.
 * Rendu côté serveur, sans JavaScript.
 */
export function LewisDiagram({ molecule }: { molecule: LewisMolecule }) {
  const xs = molecule.atoms.map((a) => a.x * UNIT);
  const ys = molecule.atoms.map((a) => a.y * UNIT);
  const minX = Math.min(...xs) - PAD;
  const minY = Math.min(...ys) - PAD;
  const width = Math.max(...xs) - minX + PAD;
  const height = Math.max(...ys) - minY + PAD;
  const px = (i: number) => molecule.atoms[i].x * UNIT;
  const py = (i: number) => molecule.atoms[i].y * UNIT;

  return (
    <figure className="flex flex-col items-center">
      <svg
        viewBox={`${round(minX)} ${round(minY)} ${round(width)} ${round(height)}`}
        width={round(width)}
        height={round(height)}
        className="max-w-full"
        role="img"
        aria-label={molecule.name}
      >
        <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {molecule.bonds.map(([a, b, order], i) => {
            const dx = px(b) - px(a);
            const dy = py(b) - py(a);
            const len = Math.hypot(dx, dy);
            const ux = dx / len;
            const uy = dy / len;
            // Décalage perpendiculaire pour les liaisons doubles et triples.
            const offsets = order === 1 ? [0] : order === 2 ? [-3.5, 3.5] : [-5, 0, 5];
            const gapA = edge(molecule.atoms[a].symbol, ux, uy) + 2;
            const gapB = edge(molecule.atoms[b].symbol, ux, uy) + 2;
            return offsets.map((o) => (
              <line
                key={`${i}-${o}`}
                x1={round(px(a) + ux * gapA - uy * o)}
                y1={round(py(a) + uy * gapA + ux * o)}
                x2={round(px(b) - ux * gapB - uy * o)}
                y2={round(py(b) - uy * gapB + ux * o)}
              />
            ));
          })}
          {molecule.atoms.flatMap((atom, i) =>
            (atom.pairs ?? []).map((angle) => {
              const rad = (angle * Math.PI) / 180;
              const distance = edge(atom.symbol, Math.cos(rad), Math.sin(rad)) + 5;
              const cx = px(i) + Math.cos(rad) * distance;
              const cy = py(i) - Math.sin(rad) * distance;
              // Le tiret est perpendiculaire à la direction du doublet.
              const tx = Math.sin(rad) * (PAIR_LENGTH / 2);
              const ty = Math.cos(rad) * (PAIR_LENGTH / 2);
              return (
                <line
                  key={`p${i}-${angle}`}
                  x1={round(cx - tx)}
                  y1={round(cy - ty)}
                  x2={round(cx + tx)}
                  y2={round(cy + ty)}
                  stroke="var(--alert)"
                />
              );
            }),
          )}
        </g>
        {molecule.atoms.map((atom, i) => (
          <text
            key={i}
            x={round(px(i))}
            y={round(py(i))}
            textAnchor="middle"
            dominantBaseline="central"
            className="fill-current font-serif text-[18px] font-bold"
          >
            {atom.symbol}
          </text>
        ))}
      </svg>
      <figcaption className="mt-1 text-sm text-muted">{molecule.name}</figcaption>
    </figure>
  );
}
