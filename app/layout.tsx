import type { Metadata, Viewport } from 'next';
import { Archivo, Manrope } from 'next/font/google';
import Header from './components/Header';
import { Footer } from './components/ui';
import { CookieConsent, ScrollToTop } from './components/client';
import {
  JsonLd,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  og,
  organizationJsonLd,
  twitter,
  websiteJsonLd,
} from '@/lib/seo';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
});

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-archivo',
  display: 'swap',
});

const TITLE = `${SITE_NAME} — ${SITE_TAGLINE}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  generator: 'Next.js',
  publisher: SITE_NAME,
  category: 'news',
  keywords: ['Sertão de Alagoas', 'Delmiro Gouveia', 'Piranhas', 'Alto Sertão', 'notícias de Alagoas', 'jornalismo regional'],
  authors: [{ name: `Redação ${SITE_NAME}`, url: SITE_URL }],
  alternates: {
    canonical: '/',
    types: { 'application/rss+xml': [{ url: '/feed.xml', title: `${SITE_NAME} — últimas notícias` }] },
  },
  openGraph: og({ type: 'website', url: '/', title: TITLE, description: SITE_DESCRIPTION }),
  twitter: twitter(TITLE, SITE_DESCRIPTION),
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: '#141414',
  colorScheme: 'light',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth" className={`${manrope.variable} ${archivo.variable}`}>
      <body>
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <a
          href="#conteudo"
          style={{ position: 'absolute', left: -9999, top: 0, zIndex: 100, background: '#F2A900', color: '#111', padding: '10px 16px', fontWeight: 800 }}
          className="sep-skip"
        >
          Pular para o conteúdo
        </a>
        <div style={{ width: '100%', maxWidth: 1240, margin: '0 auto', background: '#fff', containerType: 'inline-size', position: 'relative', boxShadow: '0 0 0 1px rgba(0,0,0,.06)' }}>
          <Header />
          <main id="conteudo">{children}</main>
          <Footer />
          <CookieConsent />
        </div>
        <ScrollToTop />
      </body>
    </html>
  );
}
