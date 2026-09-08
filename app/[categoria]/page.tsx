import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CATS, type CategorySlug, byCategory } from '@/lib/content';
import { Breadcrumb, CardGrid, EmptyState, ListingHeader, Pagination } from '@/app/components/ui';
import { JsonLd, breadcrumbJsonLd, collectionJsonLd, og, twitter } from '@/lib/seo';

export const dynamicParams = false;
const PER_PAGE = 6;

export function generateStaticParams() {
  return CATS.map((c) => ({ categoria: c.slug }));
}

const find = (slug: string) => CATS.find((c) => c.slug === slug);

export async function generateMetadata({ params, searchParams }: PageProps<'/[categoria]'>): Promise<Metadata> {
  const { categoria } = await params;
  const c = find(categoria);
  if (!c) return {};
  const page = Number((await searchParams).page ?? 1) || 1;
  const suffix = page > 1 ? ` — página ${page}` : '';
  const path = page > 1 ? `/${c.slug}?page=${page}` : `/${c.slug}`;
  return {
    title: `${c.name}${suffix}`,
    description: c.desc,
    alternates: { canonical: path },
    openGraph: og({ type: 'website', url: path, title: `${c.name} | Sertão em Pauta`, description: c.desc }),
    twitter: twitter(`${c.name} | Sertão em Pauta`, c.desc),
  };
}

export default async function CategoryPage({ params, searchParams }: PageProps<'/[categoria]'>) {
  const { categoria } = await params;
  const c = find(categoria);
  if (!c) notFound();

  const all = byCategory(c.slug as CategorySlug);
  const pages = Math.max(1, Math.ceil(all.length / PER_PAGE));
  const page = Math.min(Math.max(1, Number((await searchParams).page ?? 1) || 1), pages);
  const items = all.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div style={{ padding: 'var(--page-pad)' }}>
      <JsonLd data={collectionJsonLd(c.name, c.desc, `/${c.slug}`, items)} />
      <JsonLd data={breadcrumbJsonLd([{ name: c.name, path: `/${c.slug}` }])} />

      <Breadcrumb trail={[{ name: c.name }]} />
      <ListingHeader title={c.name} desc={c.desc} />
      {items.length ? <CardGrid items={items} /> : <EmptyState title="Ainda não há matérias aqui" text="Assim que a redação publicar algo nesta seção, aparecerá nesta página. Enquanto isso, veja as últimas notícias." />}
      <Pagination pages={pages} current={page} hrefFor={(n) => (n === 1 ? `/${c.slug}` : `/${c.slug}?page=${n}`)} />
    </div>
  );
}
