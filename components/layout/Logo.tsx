/** Marque Kalanso : un noyau et deux orbites, comme une case vue d'en haut. */
export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <ellipse cx="16" cy="16" rx="14" ry="6" fill="none" stroke="currentColor" strokeWidth="1.6" transform="rotate(-30 16 16)" />
      <ellipse cx="16" cy="16" rx="14" ry="6" fill="none" stroke="currentColor" strokeWidth="1.6" transform="rotate(30 16 16)" />
      <circle cx="16" cy="16" r="4" fill="var(--focus)" />
    </svg>
  );
}
