import Link from 'next/link';
import type { Metadata } from 'next';
import { allNews } from '@/lib/content';
import { Breadcrumb, BreakingBar, ChronoRow, ListingHeader } from '@/app/components/ui';
import { JsonLd, breadcrumbJsonLd, collectionJsonLd, og, twitter } from '@/lib/seo';

const TITLE = 'Últimas notícias';
const DESC = 'Tudo o que publicamos, em ordem cronológica. Atualizado ao longo do dia.';
const STEP = 8;

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: '/ultimas' },
  openGraph: og({ type: 'website', url: '/ultimas', title: `${TITLE} | Sertão em Pauta`, description: DESC }),
  twitter: twitter(`${TITLE} | Sertão em Pauta`, DESC),
};

export default async function Ultimas({ searchParams }: PageProps<'/ultimas'>) {
  const news = allNews();
  const asked = Number((await searchParams).ver ?? STEP) || STEP;
  const shown = Math.min(Math.max(STEP, asked), news.length);
  const items = news.slice(0, shown);

  return (
    <>
      <BreakingBar />
      <div style={{ padding: 'var(--page-pad)' }}>
        <JsonLd data={collectionJsonLd(TITLE, DESC, '/ultimas', items)} />
        <JsonLd data={breadcrumbJsonLd([{ name: 'Últimas', path: '/ultimas' }])} />
        <Breadcrumb trail={[{ name: 'Últimas' }]} />
        <ListingHeader title={TITLE} desc={DESC} />
        <div style={{ maxWidth: 820 }}>
          {items.map((a) => <ChronoRow key={a.id} a={a} />)}
          {shown < news.length ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '28px 0' }}>
              <Link href={`/ultimas?ver=${shown + 5}`} className="sep-btn-dark" style={{ height: 46, padding: '0 28px', background: '#141414', color: '#fff', borderRadius: 4, fontWeight: 800, fontSize: 13, letterSpacing: '.04em', display: 'inline-flex', alignItems: 'center' }}>
                Carregar mais
              </Link>
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: '#777', fontSize: 13, padding: '24px 0' }}>Você chegou ao fim do arquivo publicado.</p>
          )}
        </div>
      </div>
    </>
  );
}
