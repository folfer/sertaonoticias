import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  type Block,
  CATS,
  allNews,
  articleHref,
  authorOf,
  bodyOf,
  byId,
  bySlug,
  categoryName,
  clockTime,
  kicker,
  longDate,
  moreFromCategory,
  related,
  slugify,
} from '@/lib/content';
import {
  AdSlot,
  Avatar,
  Breadcrumb,
  Kicker,
  MostRead,
  Photo,
  RULE,
  GOLD,
  INK,
  SectionHeading,
} from '@/app/components/ui';
import { ShareBar } from '@/app/components/client';
import { JsonLd, absolute, articleJsonLd, breadcrumbJsonLd, og, twitter } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return allNews().map((a) => ({ categoria: a.cat, slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<'/[categoria]/[slug]'>): Promise<Metadata> {
  const { categoria, slug } = await params;
  const a = bySlug(categoria, slug);
  if (!a) return {};
  const author = authorOf(a);
  return {
    title: a.title,
    description: a.sub,
    alternates: { canonical: articleHref(a) },
    authors: [{ name: author.name, url: absolute(`/autor/${author.slug}`) }],
    openGraph: og({
      type: 'article',
      url: articleHref(a),
      title: a.title,
      description: a.sub,
      publishedTime: a.publishedAt,
      modifiedTime: a.updatedAt,
      authors: [author.name],
      section: categoryName(a),
      tags: a.tags,
    }),
    twitter: twitter(a.title, a.sub),
  };
}

export default async function ArticlePage({ params }: PageProps<'/[categoria]/[slug]'>) {
  const { categoria, slug } = await params;
  const a = bySlug(categoria, slug);
  if (!a) notFound();

  const cat = CATS.find((c) => c.slug === a.cat)!;
  const author = authorOf(a);
  const url = absolute(articleHref(a));

  return (
    <article style={{ padding: 'var(--page-pad)' }}>
      <JsonLd data={articleJsonLd(a)} />
      <JsonLd data={breadcrumbJsonLd([{ name: cat.name, path: `/${cat.slug}` }, { name: a.title, path: articleHref(a) }])} />

      <Breadcrumb trail={[{ name: cat.name, href: `/${cat.slug}` }]} />

      <div style={{ maxWidth: 920 }}>
        <Kicker text={kicker(a)} />
        <h1 style={{ margin: '14px 0 0', fontFamily: 'var(--font-archivo), sans-serif', fontWeight: 800, fontSize: 'clamp(30px,4.6cqw,54px)', lineHeight: 1.04, letterSpacing: '-.03em', textWrap: 'pretty' }}>{a.title}</h1>
        <p style={{ margin: '18px 0 0', fontSize: 'clamp(16px,1.7cqw,21px)', lineHeight: 1.45, color: '#5a5a5a' }}>{a.sub}</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '12px 20px', marginTop: 22, padding: '14px 0', borderTop: `1px solid ${RULE}`, borderBottom: `1px solid ${RULE}`, fontSize: 13, color: '#5a5a5a' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 16px', alignItems: 'center' }}>
            <span style={{ display: 'flex', gap: 6, alignItems: 'center', whiteSpace: 'nowrap' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>
              <time dateTime={a.publishedAt}>{longDate(a.publishedAt)} · {clockTime(a.publishedAt)}</time>
            </span>
            <span style={{ color: '#bbb' }} aria-hidden>|</span>
            <span style={{ whiteSpace: 'nowrap' }}>
              Atualizado em <time dateTime={a.updatedAt}>{longDate(a.updatedAt)} às {clockTime(a.updatedAt)}</time>
            </span>
            <span style={{ color: '#bbb' }} aria-hidden>|</span>
            <span style={{ whiteSpace: 'nowrap' }}>Por <Link href={`/autor/${author.slug}`} style={{ fontWeight: 700 }}>{author.name}</Link></span>
            <span style={{ color: '#bbb' }} aria-hidden>|</span>
            <span style={{ whiteSpace: 'nowrap' }}>{a.read} de leitura</span>
          </div>
          <ShareBar url={url} title={a.title} variant="inline" />
        </div>
      </div>

      <figure style={{ margin: '26px 0 0' }}>
        <div style={{ aspectRatio: '16/9', background: '#E4DFD6', borderRadius: 4, display: 'grid', placeItems: 'center', color: '#8a847a', fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase' }}>
          <span>Foto de capa · {a.credit}</span>
        </div>
        <figcaption style={{ fontSize: 12, color: '#777', marginTop: 8, lineHeight: 1.4 }}>
          {a.caption ?? a.sub} <span style={{ color: '#999' }}>Foto: {a.credit}</span>
        </figcaption>
      </figure>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40, marginTop: 30 }}>
        <div style={{ flex: '1 1 560px', minWidth: 0, display: 'flex', gap: 28 }}>
          <ShareBar url={url} title={a.title} variant="rail" />

          <div style={{ maxWidth: 680, minWidth: 0, fontSize: 18, lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: 22 }}>
            {bodyOf(a).map((b, i) => <BlockView key={i} b={b} />)}

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, paddingTop: 10 }}>
              {a.tags.map((t) => (
                <Link key={t} href={`/tag/${slugify(t)}`} className="sep-tag" style={{ fontSize: 12, fontWeight: 700, padding: '6px 12px', border: '1px solid #d9d5cd', borderRadius: 999, color: '#5a5a5a', whiteSpace: 'nowrap' }}>#{t}</Link>
              ))}
            </div>

            <Link href={`/autor/${author.slug}`} style={{ display: 'flex', gap: 16, alignItems: 'center', padding: 20, border: `1px solid ${RULE}`, borderRadius: 4, marginTop: 10 }}>
              <Avatar initials={author.initials} size={64} font={18} />
              <span style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 14, lineHeight: 1.5 }}>
                <strong style={{ fontSize: 16 }}>{author.name}</strong>
                <span style={{ color: '#5a5a5a' }}>{author.bio}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#B07800' }}>Ver todas as matérias →</span>
              </span>
            </Link>

            <section style={{ marginTop: 14, borderTop: `2px solid ${INK}`, paddingTop: 16 }}>
              <h2 style={{ margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 12, fontFamily: 'var(--font-archivo), sans-serif', fontWeight: 800, fontSize: 20 }}>
                Relacionadas<span style={{ width: 28, height: 3, background: GOLD }} />
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: 18 }}>
                {related(a).map((r) => (
                  <Link key={r.id} href={articleHref(r)} style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14, lineHeight: 1.3 }}>
                    <Photo label={false} />
                    <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '.14em', color: GOLD }}>{kicker(r)}</span>
                    <span style={{ fontFamily: 'var(--font-archivo), sans-serif', fontWeight: 700, fontSize: 15, letterSpacing: '-.01em', textWrap: 'pretty' }}>{r.title}</span>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>

        <aside style={{ flex: '1 1 280px', maxWidth: 360, display: 'flex', flexDirection: 'column', gap: 32 }}>
          <AdSlot label="Publicidade · 300×250" width={300} height={250} />
          <section>
            <SectionHeading title={`Mais de ${cat.name}`} size={18} dash={28} marginBottom={6} />
            {moreFromCategory(a).map((m) => (
              <Link key={m.id} href={articleHref(m)} style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '12px 0', borderBottom: `1px solid ${RULE}` }}>
                <span style={{ fontFamily: 'var(--font-archivo), sans-serif', fontWeight: 700, fontSize: 15, lineHeight: 1.3, letterSpacing: '-.01em' }}>{m.title}</span>
                <span style={{ fontSize: 11, color: '#777' }}>
                  <time dateTime={m.publishedAt}>{clockTime(m.publishedAt)}</time> · {m.read}
                </span>
              </Link>
            ))}
          </section>
          <MostRead compact />
        </aside>
      </div>

      <ShareBar url={url} title={a.title} variant="bottom" />
    </article>
  );
}

function BlockView({ b }: { b: Block }) {
  switch (b.t) {
    case 'p':
      return <p style={{ margin: 0, textWrap: 'pretty' }}>{b.text}</p>;
    case 'h2':
      return <h2 style={{ margin: '12px 0 -6px', fontFamily: 'var(--font-archivo), sans-serif', fontWeight: 800, fontSize: 26, lineHeight: 1.2, letterSpacing: '-.02em' }}>{b.text}</h2>;
    case 'quote':
      return (
        <blockquote style={{ margin: '6px 0', padding: '8px 0 8px 24px', borderLeft: `4px solid ${GOLD}`, fontFamily: 'var(--font-archivo), sans-serif', fontWeight: 700, fontSize: 24, lineHeight: 1.3, letterSpacing: '-.01em' }}>
          <p style={{ margin: 0 }}>“{b.text}”</p>
          {b.by && <footer style={{ fontFamily: 'var(--font-manrope), sans-serif', fontWeight: 500, fontSize: 13, color: '#777', marginTop: 10 }}>— {b.by}</footer>}
        </blockquote>
      );
    case 'img':
      return (
        <figure style={{ margin: '6px 0' }}>
          <Photo ratio="3/2" credit={b.by} />
          <figcaption style={{ fontSize: 12, color: '#777', marginTop: 8, lineHeight: 1.4 }}>
            {b.text} <span style={{ color: '#999' }}>Foto: {b.by}</span>
          </figcaption>
        </figure>
      );
    case 'also': {
      const ref = byId(b.ref);
      if (!ref) return null;
      return (
        <Link href={articleHref(ref)} style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '14px 18px', background: '#F7F5F0', borderRadius: 4, borderTop: `2px solid ${GOLD}` }}>
          <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.14em', color: '#6b6b6b' }}>LEIA TAMBÉM</span>
          <span style={{ fontFamily: 'var(--font-archivo), sans-serif', fontWeight: 700, fontSize: 17, lineHeight: 1.3, letterSpacing: '-.01em' }}>{ref.title}</span>
        </Link>
      );
    }
    case 'ad':
      return <AdSlot label="Publicidade · in-article" height={120} />;
  }
}
