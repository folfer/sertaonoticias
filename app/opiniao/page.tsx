import type { Metadata } from 'next';
import { allOpinion } from '@/lib/content';
import { Breadcrumb, CardGrid, ColumnistsRow, ListingHeader } from '@/app/components/ui';
import { JsonLd, breadcrumbJsonLd, collectionJsonLd, og, twitter } from '@/lib/seo';

const TITLE = 'Opinião';
const DESC = 'Colunas e artigos de quem pensa o Sertão de perto. Os textos não refletem necessariamente a posição do portal.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: '/opiniao' },
  openGraph: og({ type: 'website', url: '/opiniao', title: 'Opinião | Sertão em Pauta', description: DESC }),
  twitter: twitter('Opinião | Sertão em Pauta', DESC),
};

export default function OpinionIndex() {
  const items = allOpinion();
  return (
    <div style={{ padding: 'var(--page-pad)' }}>
      <JsonLd data={collectionJsonLd(TITLE, DESC, '/opiniao', items)} />
      <JsonLd data={breadcrumbJsonLd([{ name: TITLE, path: '/opiniao' }])} />
      <Breadcrumb trail={[{ name: TITLE }]} />
      <ListingHeader title={TITLE} desc={DESC} />
      <ColumnistsRow />
      <CardGrid items={items} />
    </div>
  );
}
