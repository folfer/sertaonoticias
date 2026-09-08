import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { allOpinion, articleHref, authorOf, bodyOf, bySlug, clockTime, longDate } from '@/lib/content';
import { Avatar, Breadcrumb, GOLD, INK, RULE } from '@/app/components/ui';
import { ShareBar } from '@/app/components/client';
import { JsonLd, absolute, articleJsonLd, breadcrumbJsonLd, og, twitter } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return allOpinion().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<'/opiniao/[slug]'>): Promise<Metadata> {
  const a = bySlug('opiniao', (await params).slug);
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
      section: 'Opinião',
      tags: a.tags,
    }),
    twitter: twitter(a.title, a.sub),
  };
}

export default async function OpinionArticle({ params }: PageProps<'/opiniao/[slug]'>) {
  const a = bySlug('opiniao', (await params).slug);
  if (!a) notFound();
  const author = authorOf(a);
  const others = allOpinion().filter((o) => o.id !== a.id);

  return (
    <article style={{ padding: 'var(--page-pad)' }}>
      <JsonLd data={articleJsonLd(a)} />
      <JsonLd data={breadcrumbJsonLd([{ name: 'Opinião', path: '/opiniao' }, { name: a.title, path: articleHref(a) }])} />

      <Breadcrumb trail={[{ name: 'Opinião', href: '/opiniao' }]} />

      <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 16, paddingBottom: 28, borderBottom: `1px solid ${RULE}` }}>
        <Avatar initials={author.initials} size={104} font={30} style={{ border: `4px solid ${GOLD}` }} />
        <span style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Link href={`/autor/${author.slug}`} style={{ fontWeight: 800, fontSize: 15 }}>{author.name}</Link>
          <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.14em', color: GOLD, textTransform: 'uppercase' }}>{author.column}</span>
        </span>
        <h1 style={{ margin: 0, fontFamily: 'var(--font-archivo), sans-serif', fontWeight: 800, fontStyle: 'italic', fontSize: 'clamp(28px,4cqw,46px)', lineHeight: 1.08, letterSpacing: '-.025em', textWrap: 'pretty' }}>{a.title}</h1>
        <p style={{ margin: 0, fontSize: 18, lineHeight: 1.5, color: '#5a5a5a' }}>{a.sub}</p>
        <span style={{ fontSize: 12, color: '#777' }}>
          <time dateTime={a.publishedAt}>{longDate(a.publishedAt)} · {clockTime(a.publishedAt)}</time> · {a.read} de leitura
        </span>
        <ShareBar url={absolute(articleHref(a))} title={a.title} variant="inline" />
      </div>

      <div style={{ maxWidth: 680, margin: '28px auto 0', fontSize: 18, lineHeight: 1.75, display: 'flex', flexDirection: 'column', gap: 22 }}>
        {bodyOf(a).map((b, i) => {
          if (b.t === 'h2') return <h2 key={i} style={{ margin: '12px 0 -6px', fontFamily: 'var(--font-archivo), sans-serif', fontWeight: 800, fontSize: 24, lineHeight: 1.2, letterSpacing: '-.02em' }}>{b.text}</h2>;
          if (b.t === 'quote') return (
            <blockquote key={i} style={{ margin: '6px 0', padding: '0 24px', textAlign: 'center', fontFamily: 'var(--font-archivo), sans-serif', fontWeight: 700, fontStyle: 'italic', fontSize: 24, lineHeight: 1.3 }}>
              <p style={{ margin: 0 }}>“{b.text}”</p>
            </blockquote>
          );
          if (b.t === 'p') return <p key={i} style={{ margin: 0, textWrap: 'pretty' }}>{b.text}</p>;
          return null;
        })}
        <p style={{ margin: '10px 0 0', padding: 16, background: '#F7F5F0', borderRadius: 4, fontSize: 13, lineHeight: 1.5, color: '#5a5a5a' }}>
          <strong>{author.name}</strong> — {author.bio} Os artigos de opinião não refletem necessariamente a posição do Sertão em Pauta.
        </p>
      </div>

      <section style={{ maxWidth: 680, margin: '36px auto 0', borderTop: `2px solid ${INK}`, paddingTop: 16 }}>
        <h2 style={{ margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: 12, fontFamily: 'var(--font-archivo), sans-serif', fontWeight: 800, fontSize: 20 }}>
          Outras colunas<span style={{ width: 28, height: 3, background: GOLD }} />
        </h2>
        {others.map((c) => {
          const au = authorOf(c);
          return (
            <Link key={c.id} href={articleHref(c)} style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${RULE}` }}>
              <Avatar initials={au.initials} size={44} font={13} />
              <span style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.12em', color: '#6b6b6b', textTransform: 'uppercase' }}>{au.name}</span>
                <span style={{ fontFamily: 'var(--font-archivo), sans-serif', fontWeight: 700, fontStyle: 'italic', fontSize: 16, letterSpacing: '-.01em' }}>{c.title}</span>
              </span>
            </Link>
          );
        })}
      </section>
    </article>
  );
}
