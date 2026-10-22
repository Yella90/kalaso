/**
 * Frise inspirée des motifs du bogolan : chevrons, points et petits losanges.
 * Elle sépare le haut de page du contenu ; un seul usage par page.
 */
export function BogolanBand({ className = '' }: { className?: string }) {
  return (
    <svg className={`block h-4 w-full ${className}`} aria-hidden="true" preserveAspectRatio="none">
      <defs>
        <pattern id="bogolan" width="48" height="16" patternUnits="userSpaceOnUse">
          <rect width="48" height="16" fill="var(--ink)" />
          <polyline points="0,12 6,4 12,12 18,4 24,12" fill="none" stroke="var(--on-ink-muted)" strokeWidth="1.5" />
          <circle cx="30" cy="8" r="1.6" fill="var(--on-ink-muted)" />
          <circle cx="36" cy="8" r="1.6" fill="var(--on-ink-muted)" />
          <path d="M42 4 L46 8 L42 12 L38 8 Z" fill="none" stroke="var(--focus)" strokeWidth="1.3" />
        </pattern>
      </defs>
      <rect width="100%" height="16" fill="url(#bogolan)" />
    </svg>
  );
}
