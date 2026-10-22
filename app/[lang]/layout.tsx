import type { Metadata, Viewport } from 'next';
import { Andika, Gentium_Book_Plus } from 'next/font/google';
import { notFound } from 'next/navigation';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { getDictionary, hasLocale, HTML_LANG, LOCALES } from '@/lib/i18n';
import '../globals.css';

const gentium = Gentium_Book_Plus({
  variable: '--font-gentium',
  weight: ['400', '700'],
  subsets: ['latin', 'latin-ext', 'greek'],
});

const andika = Andika({
  variable: '--font-andika',
  weight: ['400', '700'],
  subsets: ['latin', 'latin-ext'],
});

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  return { title: { default: t.meta.title, template: '%s · Kalanso' }, description: t.meta.description };
}

export const viewport: Viewport = {
  themeColor: '#1a2340',
};

export default async function RootLayout({ children, params }: LayoutProps<'/[lang]'>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <html lang={HTML_LANG[lang]} className={`${gentium.variable} ${andika.variable}`}>
      <body className="flex min-h-dvh flex-col antialiased">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-surface focus:px-4 focus:py-2"
        >
          {t.nav.skip}
        </a>
        <SiteHeader lang={lang} t={t} />
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <SiteFooter t={t} />
      </body>
    </html>
  );
}
