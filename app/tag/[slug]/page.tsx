import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allTags, byTagSlug, slugify } from '@/lib/content';
import { Breadcrumb, CardGrid, EmptyState, ListingHeader } from '@/app/components/ui';
import { JsonLd, breadcrumbJsonLd, collectionJsonLd, og, twitter } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return allTags().map((t) => ({ slug: slugify(t) }));
}

const describe = (name: string) => `Todas as matérias do Sertão em Pauta marcadas com “${name}”.`;

export async function generateMetadata({ params }: PageProps<'/tag/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const found = byTagSlug(slug);
  if (!found) return {};
  const desc = describe(found.name);
  return {
    title: found.name,
    description: desc,
    alternates: { canonical: `/tag/${slug}` },
    openGraph: og({ type: 'website', url: `/tag/${slug}`, title: `${found.name} | Sertão em Pauta`, description: desc }),
    twitter: twitter(`${found.name} | Sertão em Pauta`, desc),
  };
}

export default async function TagPage({ params }: PageProps<'/tag/[slug]'>) {
  const { slug } = await params;
  const found = byTagSlug(slug);
  if (!found) notFound();
  const desc = describe(found.name);

  return (
    <div style={{ padding: 'var(--page-pad)' }}>
      <JsonLd data={collectionJsonLd(found.name, desc, `/tag/${slug}`, found.items)} />
      <JsonLd data={breadcrumbJsonLd([{ name: found.name, path: `/tag/${slug}` }])} />
      <Breadcrumb trail={[{ name: `#${found.name}` }]} />
      <ListingHeader title={`#${found.name}`} desc={desc} />
      {found.items.length ? <CardGrid items={found.items} /> : <EmptyState title="Ainda não há matérias aqui" text="Nada publicado com esta tag até agora." />}
    </div>
  );
}
