import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AUTHORS, byAuthorSlug } from '@/lib/content';
import { Avatar, Breadcrumb, CardGrid, EmptyState, GOLD, INK } from '@/app/components/ui';
import { JsonLd, authorJsonLd, breadcrumbJsonLd, collectionJsonLd, og, twitter } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.values(AUTHORS).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<'/autor/[slug]'>): Promise<Metadata> {
  const found = byAuthorSlug((await params).slug);
  if (!found) return {};
  const { author } = found;
  const title = `${author.name} — ${author.role}`;
  return {
    title: author.name,
    description: author.bio,
    alternates: { canonical: `/autor/${author.slug}` },
    openGraph: og({ type: 'profile', url: `/autor/${author.slug}`, title, description: author.bio }),
    twitter: twitter(title, author.bio),
  };
}

export default async function AuthorPage({ params }: PageProps<'/autor/[slug]'>) {
  const found = byAuthorSlug((await params).slug);
  if (!found) notFound();
  const { author, items } = found;

  return (
    <div style={{ padding: 'var(--page-pad)' }}>
      <JsonLd data={authorJsonLd(author.slug)} />
      <JsonLd data={collectionJsonLd(author.name, author.bio, `/autor/${author.slug}`, items)} />
      <JsonLd data={breadcrumbJsonLd([{ name: author.name, path: `/autor/${author.slug}` }])} />

      <Breadcrumb trail={[{ name: author.name }]} />

      <header style={{ display: 'flex', flexWrap: 'wrap', gap: 22, alignItems: 'center', paddingBottom: 24, borderBottom: `2px solid ${INK}` }}>
        <Avatar initials={author.initials} size={96} font={28} />
        <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.14em', color: GOLD, textTransform: 'uppercase' }}>{author.role}</span>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-archivo), sans-serif', fontWeight: 800, fontSize: 'clamp(28px,3.4cqw,40px)', letterSpacing: '-.025em', lineHeight: 1.05 }}>{author.name}</h1>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: '#5a5a5a', maxWidth: 620 }}>{author.bio}</p>
          <div style={{ display: 'flex', gap: 14, fontSize: 12, fontWeight: 700 }}>
            <a href="https://instagram.com" rel="noopener">Instagram</a>
            <a href="https://x.com" rel="noopener">X</a>
            <a href={`mailto:redacao@sertaoempauta.com.br?subject=${encodeURIComponent(author.name)}`}>E-mail</a>
          </div>
        </div>
      </header>

      {items.length ? <CardGrid items={items} /> : <EmptyState title="Nenhuma matéria publicada" text="Assim que este autor publicar, as matérias aparecem aqui." />}
    </div>
  );
}
