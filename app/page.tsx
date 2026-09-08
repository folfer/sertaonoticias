import Link from 'next/link';
import {
  articleHref,
  authorOf,
  allNews,
  allOpinion,
  clockTime,
  featured,
  homeSections,
  kicker,
} from '@/lib/content';
import {
  AdSlot,
  Avatar,
  BreakingBar,
  Card,
  Kicker,
  LatestList,
  MostRead,
  NewsletterBox,
  Photo,
  SectionHeading,
  Stamp,
  ThumbRow,
  INK,
} from './components/ui';
import { JsonLd, collectionJsonLd } from '@/lib/seo';

export default function Home() {
  const hero = featured();
  const rest = allNews().filter((a) => a.id !== hero.id);
  const secondary = rest.slice(0, 3);
  const sections = homeSections();
  const columns = allOpinion();

  return (
    <>
      <BreakingBar />
      <JsonLd data={collectionJsonLd('Sertão em Pauta', 'Últimas notícias do Sertão de Alagoas', '/', allNews().slice(0, 10))} />

      <div style={{ padding: 'var(--page-pad)' }}>
        <AdSlot label="Publicidade · 728×90" width={728} height={90} className="sep-desktop" style={{ margin: '0 auto 22px' }} />

        {/* Hero */}
        <Link href={articleHref(hero)} style={{ display: 'block', position: 'relative', aspectRatio: 'var(--hero-ratio)', overflow: 'hidden', borderRadius: 4, background: '#E4DFD6', color: '#fff' }}>
          <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', color: '#8a847a', fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase' }}>
            <span>Foto · {hero.credit}</span>
          </div>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(0,0,0,0) 30%,rgba(0,0,0,.82) 100%)' }} />
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 'var(--hero-text-pad)', display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 820 }}>
            <Kicker text={kicker(hero)} />
            <h1 style={{ margin: 0, fontFamily: 'var(--font-archivo), sans-serif', fontWeight: 800, fontSize: 'clamp(26px,4.2cqw,52px)', lineHeight: 1.05, letterSpacing: '-.025em', color: '#fff', textWrap: 'pretty' }}>{hero.title}</h1>
            <p style={{ margin: 0, fontSize: 'clamp(14px,1.4cqw,18px)', lineHeight: 1.45, color: '#e6e6e6', maxWidth: 680 }}>{hero.sub}</p>
            <span style={{ fontSize: 12, color: '#c9c9c9' }}>
              <time dateTime={hero.publishedAt}>{clockTime(hero.publishedAt)}</time> · {hero.read} de leitura
            </span>
          </div>
        </Link>

        {/* Secundárias */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: '22px 24px', padding: '26px 0', borderBottom: '1px solid #e5e2dc' }}>
          {secondary.map((a) => <Card key={a.id} a={a} showSub={false} />)}
        </div>

        {/* Corpo 8/4 */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40, paddingTop: 30 }}>
          <div style={{ flex: '1 1 560px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 40 }}>
            {sections.map((s) => (
              <section key={s.cat.slug}>
                <SectionHeading title={s.cat.name} href={`/${s.cat.slug}`} linkLabel="Ver mais →" />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
                  <Link href={articleHref(s.big)} style={{ flex: '1 1 300px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <Photo credit={s.big.credit} />
                    <h3 style={{ margin: 0, fontFamily: 'var(--font-archivo), sans-serif', fontWeight: 800, fontSize: 22, lineHeight: 1.2, letterSpacing: '-.02em', textWrap: 'pretty' }}>{s.big.title}</h3>
                    <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: '#5a5a5a' }}>{s.big.sub}</p>
                    <Stamp a={s.big} />
                  </Link>
                  <div style={{ flex: '1 1 240px', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                    {s.list.map((a) => <ThumbRow key={a.id} a={a} />)}
                  </div>
                </div>
              </section>
            ))}
          </div>

          <aside style={{ flex: '1 1 280px', maxWidth: 360, display: 'flex', flexDirection: 'column', gap: 32 }}>
            <MostRead />
            <AdSlot label="Publicidade · 300×250" width={300} height={250} />
            <LatestList />
            <NewsletterBox />
          </aside>
        </div>

        {/* Opinião */}
        <section style={{ marginTop: 44, borderTop: `2px solid ${INK}`, paddingTop: 18 }}>
          <SectionHeading title="Opinião" href="/opiniao" linkLabel="Colunistas →" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 24 }}>
            {columns.map((c) => {
              const au = authorOf(c);
              return (
                <Link key={c.id} href={articleHref(c)} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: 16, background: '#F7F5F0', borderRadius: 4 }}>
                  <Avatar initials={au.initials} size={56} font={16} />
                  <span style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.12em', color: '#6b6b6b', textTransform: 'uppercase' }}>{au.name}</span>
                    <span style={{ fontFamily: 'var(--font-archivo), sans-serif', fontWeight: 800, fontSize: 17, lineHeight: 1.25, letterSpacing: '-.01em', fontStyle: 'italic' }}>{c.title}</span>
                    <span style={{ fontSize: 12, color: '#777' }}>{au.column}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
