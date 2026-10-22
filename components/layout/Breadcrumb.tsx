import Link from 'next/link';

export function Breadcrumb({ label, items }: { label: string; items: { href: string; label: string }[] }) {
  return (
    <nav aria-label={label} className="text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, i) => (
          <li key={item.href} className="flex items-center gap-1">
            {i > 0 && <span aria-hidden="true">›</span>}
            <Link href={item.href} className="hover:text-ink hover:underline">
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
