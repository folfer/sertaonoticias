import Link from 'next/link';
import {
  type Article,
  AUTHORS,
  CATS,
  COLUMNIST_KEYS,
  articleHref,
  authorOf,
  breaking,
  clockTime,
  kicker,
  latest,
  mostRead,
  shortDate,
} from '@/lib/content';
import { NewsletterForm } from './client';

export const GOLD = '#F2A900';
export const INK = '#1f1f1f';
export const RULE = '#e5e2dc';

/* ------------------------------------------------------------ primitivas */

export function Photo({ credit, ratio = '16/9', label = true, style, className }: { credit?: string; ratio?: string; label?: boolean; style?: React.CSSProperties; className?: string }) {
  return (
    <div className={className} style={{ aspectRatio: ratio, background: '#E4DFD6', borderRadius: 4, display: 'grid', placeItems: 'center', color: '#8a847a', fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', ...style }}>
      {label && credit ? <span>Foto · {credit}</span> : null}
    </div>
  );
}

export function AdSlot({ label, width, height, className, style }: { label: string; width?: number | string; height: number; className?: string; style?: React.CSSProperties }) {
  return (
    <div aria-label="Publicidade" className={className} style={{ width: width ?? '100%', height, maxWidth: '100%', background: '#EDEBE6', border: '1px dashed #cfcac0', display: 'grid', placeItems: 'center', color: '#8a847a', fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', ...style }}>
      {label}
    </div>
  );
}

export function Kicker({ text, dash = 40, size = 11 }: { text: string; dash?: number; size?: number }) {
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: size, fontWeight: 800, letterSpacing: '.14em', color: GOLD }}>
      {text}
      <span style={{ width: dash, height: 2, background: GOLD }} />
    </span>
  );
}

export function Avatar({ initials, size, font, style }: { initials: string; size: number; font: number; style?: React.CSSProperties }) {
  return (
    <span style={{ flex: 'none', width: size, height: size, borderRadius: '50%', background: INK, color: GOLD, display: 'grid', placeItems: 'center', fontFamily: 'var(--font-archivo), sans-serif', fontWeight: 800, fontSize: font, ...style }}>
      {initials}
    </span>
  );
}

export function SectionHeading({ title, href, linkLabel, size = 22, dash = 36, marginBottom = 18 }: { title: string; href?: string; linkLabel?: string; size?: number; dash?: number; marginBottom?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `2px solid ${INK}`, paddingBottom: 8, marginBottom }}>
      <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 12, fontFamily: 'var(--font-archivo), sans-serif', fontWeight: 800, fontSize: size, letterSpacing: '-.01em' }}>
        {title}
        <span style={{ width: dash, height: 3, background: GOLD }} />
      </h2>
      {href && linkLabel && (
        <Link href={href} style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: '#6b6b6b', whiteSpace: 'nowrap', flex: 'none' }}>{linkLabel}</Link>
      )}
    </div>
  );
}

export function Stamp({ a, showDate = false, suffix = ' de leitura' }: { a: Article; showDate?: boolean; suffix?: string }) {
  return (
    <span style={{ fontSize: 12, color: '#777' }}>
      {showDate && <>{shortDate(a.publishedAt)} · </>}
      <time dateTime={a.publishedAt}>{clockTime(a.publishedAt)}</time> · {a.read}
      {suffix}
    </span>
  );
}

/* ----------------------------------------------------------------- cards */

export function Card({ a, titleSize = 20, showSub = true, showStamp = true, showDate = false, style }: { a: Article; titleSize?: number | string; showSub?: boolean; showStamp?: boolean; showDate?: boolean; style?: React.CSSProperties }) {
  return (
    <Link href={articleHref(a)} style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 0, ...style }}>
      <Photo credit={a.credit || authorOf(a).name} />
      <Kicker text={kicker(a)} dash={24} />
      <h3 style={{ margin: 0, fontFamily: 'var(--font-archivo), sans-serif', fontWeight: 800, fontSize: titleSize, lineHeight: 1.2, letterSpacing: '-.02em', textWrap: 'pretty' }}>{a.title}</h3>
      {showSub && <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: '#5a5a5a' }}>{a.sub}</p>}
      {showStamp && <Stamp a={a} showDate={showDate} suffix={showDate ? '' : ' de leitura'} />}
    </Link>
  );
}

/** Linha compacta com miniatura, usada nas listas das seções da home. */
export function ThumbRow({ a }: { a: Article }) {
  return (
    <Link href={articleHref(a)} style={{ display: 'flex', gap: 12, padding: '12px 0', borderTop: `1px solid ${RULE}` }}>
      <Photo ratio="4/3" label={false} style={{ flex: 'none', width: 96, borderRadius: 3 }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
        <h4 style={{ margin: 0, fontFamily: 'var(--font-archivo), sans-serif', fontWeight: 700, fontSize: 15, lineHeight: 1.3, letterSpacing: '-.01em', textWrap: 'pretty' }}>{a.title}</h4>
        <Stamp a={a} suffix="" />
      </div>
    </Link>
  );
}

/** Linha cronológica de /ultimas e da busca. */
export function ChronoRow({ a, thumb = 160, showAuthor = false }: { a: Article; thumb?: number; showAuthor?: boolean }) {
  return (
    <Link href={articleHref(a)} style={{ display: 'flex', gap: 18, padding: '18px 0', borderBottom: `1px solid ${RULE}`, alignItems: 'flex-start' }}>
      {!showAuthor && (
        <span style={{ flex: 'none', width: 56, fontSize: 13, fontWeight: 800, color: GOLD, fontVariantNumeric: 'tabular-nums', paddingTop: 3 }}>
          <time dateTime={a.publishedAt}>{clockTime(a.publishedAt)}</time>
        </span>
      )}
      {showAuthor && <Photo label={false} className="sep-desktop" style={{ flex: 'none', width: thumb, aspectRatio: '16/10', borderRadius: 3 }} />}
      <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
        <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '.14em', color: showAuthor ? GOLD : '#6b6b6b' }}>{kicker(a)}</span>
        <span style={{ fontFamily: 'var(--font-archivo), sans-serif', fontWeight: 800, fontSize: 19, lineHeight: 1.25, letterSpacing: '-.015em', textWrap: 'pretty' }}>{a.title}</span>
        <span style={{ fontSize: 14, lineHeight: 1.45, color: '#5a5a5a' }}>{a.sub}</span>
        {showAuthor && (
          <span style={{ fontSize: 12, color: '#777' }}>
            {shortDate(a.publishedAt)} · <time dateTime={a.publishedAt}>{clockTime(a.publishedAt)}</time> · Por {authorOf(a).name}
          </span>
        )}
      </span>
      {!showAuthor && <Photo label={false} style={{ flex: 'none', width: thumb, aspectRatio: '16/10', borderRadius: 3 }} className="sep-desktop" />}
    </Link>
  );
}

/* --------------------------------------------------------------- sidebar */

export function MostRead({ compact = false }: { compact?: boolean }) {
  const items = mostRead();
  return (
    <section>
      <h2 style={{ margin: `0 0 ${compact ? 6 : 14}px`, display: 'flex', alignItems: 'center', gap: 12, fontFamily: 'var(--font-archivo), sans-serif', fontWeight: 800, fontSize: 18, borderBottom: `2px solid ${INK}`, paddingBottom: 8 }}>
        Mais lidas<span style={{ width: 28, height: 3, background: GOLD }} />
      </h2>
      <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column' }}>
        {items.map((a, i) => (
          <li key={a.id} style={{ borderBottom: `1px solid ${RULE}` }}>
            <Link href={articleHref(a)} style={{ display: 'flex', gap: 14, padding: '12px 0', alignItems: 'flex-start' }}>
              <span aria-hidden style={{ fontFamily: 'var(--font-archivo), sans-serif', fontWeight: 900, fontSize: compact ? 26 : 30, lineHeight: 1, color: GOLD, minWidth: compact ? 24 : 28 }}>{i + 1}</span>
              <span style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {!compact && <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '.14em', color: '#6b6b6b' }}>{kicker(a)}</span>}
                <span style={{ fontFamily: 'var(--font-archivo), sans-serif', fontWeight: 700, fontSize: 15, lineHeight: 1.3, letterSpacing: '-.01em' }}>{a.title}</span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function LatestList({ heading = 'Últimas', showAll = true, fontSize = 14 }: { heading?: string; showAll?: boolean; fontSize?: number }) {
  return (
    <section>
      <SectionHeading title={heading} href={showAll ? '/ultimas' : undefined} linkLabel={showAll ? 'Todas →' : undefined} size={18} dash={28} marginBottom={6} />
      {latest().map((a) => (
        <Link key={a.id} href={articleHref(a)} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: `1px solid ${RULE}`, alignItems: 'baseline' }}>
          <span style={{ flex: 'none', fontSize: 12, fontWeight: 700, color: GOLD, fontVariantNumeric: 'tabular-nums', width: 44 }}>
            <time dateTime={a.publishedAt}>{clockTime(a.publishedAt)}</time>
          </span>
          <span style={{ fontSize: fontSize, lineHeight: 1.35, fontWeight: 600 }}>{a.title}</span>
        </Link>
      ))}
    </section>
  );
}

export function NewsletterBox() {
  return (
    <section id="newsletter" style={{ background: '#141414', color: '#fff', padding: 22, borderRadius: 4, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Kicker text="NEWSLETTER" dash={24} />
      <h3 style={{ margin: 0, fontFamily: 'var(--font-archivo), sans-serif', fontWeight: 800, fontSize: 20, lineHeight: 1.2, letterSpacing: '-.02em' }}>
        O Sertão na sua caixa de entrada, todo dia às 7h
      </h3>
      <NewsletterForm variant="sidebar" />
    </section>
  );
}

/* ------------------------------------------------------------- navegação */

export function Breadcrumb({ trail }: { trail: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Você está aqui" style={{ fontSize: 12, color: '#777', display: 'flex', gap: 8, marginBottom: 22, flexWrap: 'wrap' }}>
      <Link href="/" style={{ color: '#777' }}>Início</Link>
      {trail.map((t) => (
        <span key={t.name} style={{ display: 'contents' }}>
          <span>/</span>
          {t.href ? <Link href={t.href} style={{ color: '#777' }}>{t.name}</Link> : <span>{t.name}</span>}
        </span>
      ))}
    </nav>
  );
}

export function Pagination({ pages, current, hrefFor }: { pages: number; current: number; hrefFor: (n: number) => string }) {
  if (pages <= 1) return null;
  return (
    <nav aria-label="Paginação" style={{ display: 'flex', justifyContent: 'center', gap: 6, padding: '36px 0 8px' }}>
      {Array.from({ length: pages }, (_, i) => i + 1).map((n) => {
        const on = n === current;
        return (
          <Link key={n} href={hrefFor(n)} aria-current={on ? 'page' : undefined}
            style={{ minWidth: 44, height: 44, padding: '0 12px', border: `1px solid ${on ? '#141414' : '#cfcac0'}`, background: on ? '#141414' : '#fff', color: on ? '#fff' : INK, borderRadius: 4, fontWeight: 800, fontSize: 14, display: 'grid', placeItems: 'center' }}>
            {n}
          </Link>
        );
      })}
    </nav>
  );
}

export function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <div style={{ padding: '60px 20px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
      <strong style={{ fontFamily: 'var(--font-archivo), sans-serif', fontSize: 22 }}>{title}</strong>
      <p style={{ margin: 0, color: '#5a5a5a', maxWidth: 420, lineHeight: 1.5 }}>{text}</p>
      <Link href="/ultimas" className="sep-btn-dark" style={{ marginTop: 8, height: 44, padding: '0 22px', display: 'inline-flex', alignItems: 'center', background: '#141414', color: '#fff', borderRadius: 4, fontWeight: 800, fontSize: 13 }}>Ver últimas</Link>
    </div>
  );
}

/* -------------------------------------------------------- barra e rodapé */

export function BreakingBar() {
  const items = breaking();
  if (!items.length) return null;
  const ticker = [...items, ...items, ...items, ...items];
  return (
    <div role="status" aria-live="polite" style={{ background: '#C8102E', color: '#fff', display: 'flex', alignItems: 'center', overflow: 'hidden', height: 34 }}>
      <span style={{ flex: 'none', background: '#8f0a20', fontSize: 11, fontWeight: 800, letterSpacing: '.12em', padding: '0 14px', height: '100%', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#fff' }} />URGENTE
      </span>
      <div style={{ flex: 1, overflow: 'hidden', whiteSpace: 'nowrap' }}>
        <div style={{ display: 'inline-flex', gap: 64, paddingLeft: 24, animation: 'sep-ticker 28s linear infinite', fontSize: 13, fontWeight: 600 }}>
          {ticker.map((a, i) => (
            <Link key={i} href={articleHref(a)} style={{ color: '#fff' }} tabIndex={i < items.length ? 0 : -1} aria-hidden={i >= items.length}>{a.title}</Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer style={{ background: '#141414', color: '#c9c9c9', marginTop: 40 }}>
      <div style={{ padding: 'var(--page-pad)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 32 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <span style={{ display: 'flex', flexDirection: 'column', color: '#fff', lineHeight: 1 }}>
            <span style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
              <span style={{ fontFamily: 'var(--font-archivo), sans-serif', fontWeight: 900, fontSize: 26, letterSpacing: '-.02em' }}>SERTÃO</span>
              <span style={{ width: 32, height: 4, background: GOLD, marginBottom: 4 }} />
            </span>
            <span style={{ fontSize: 10, letterSpacing: '.22em', fontWeight: 600, marginTop: 5, marginLeft: 2 }}>EM PAUTA</span>
          </span>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.55, maxWidth: 280 }}>
            Informação que chega mais longe. Jornalismo regional independente com sede em Delmiro Gouveia, cobrindo o Sertão de Alagoas desde 2021.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13 }}>
          <strong style={{ color: '#fff', fontSize: 11, letterSpacing: '.14em', marginBottom: 6 }}>SEÇÕES</strong>
          <Link href="/" style={{ color: '#c9c9c9' }}>Início</Link>
          {CATS.map((c) => <Link key={c.slug} href={`/${c.slug}`} style={{ color: '#c9c9c9' }}>{c.name}</Link>)}
          <Link href="/opiniao" style={{ color: '#c9c9c9' }}>Opinião</Link>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13 }}>
          <strong style={{ color: '#fff', fontSize: 11, letterSpacing: '.14em', marginBottom: 6 }}>COLUNISTAS</strong>
          {COLUMNIST_KEYS.map((k) => (
            <Link key={k} href={`/autor/${AUTHORS[k].slug}`} style={{ color: '#c9c9c9' }}>{AUTHORS[k].name}</Link>
          ))}
          <Link href="/ultimas" style={{ color: '#c9c9c9' }}>Últimas notícias</Link>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 13 }}>
          <strong style={{ color: '#fff', fontSize: 11, letterSpacing: '.14em' }}>NEWSLETTER</strong>
          <NewsletterForm variant="footer" />
          <div style={{ display: 'flex', gap: 14, fontSize: 12, fontWeight: 700, flexWrap: 'wrap' }}>
            <a href="https://instagram.com" rel="me noopener" style={{ color: '#c9c9c9' }}>Instagram</a>
            <a href="https://wa.me/" rel="noopener" style={{ color: '#c9c9c9' }}>WhatsApp</a>
            <a href="https://youtube.com" rel="me noopener" style={{ color: '#c9c9c9' }}>YouTube</a>
            <a href="/feed.xml" style={{ color: '#c9c9c9' }}>RSS</a>
          </div>
        </div>
      </div>
      <div style={{ borderTop: '1px solid #2a2a2a', padding: '16px 28px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 10, fontSize: 11, color: '#8a8a8a', lineHeight: 1.5 }}>
        <span>Editor-chefe: Carlos Eduardo Nunes · Redação: Rua Coronel Peixoto, 112, Delmiro Gouveia/AL</span>
        <span>© {new Date().getFullYear()} Sertão em Pauta. Todos os direitos reservados.</span>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------- listagens */

export function ListingHeader({ title, desc }: { title: string; desc: string }) {
  return (
    <header style={{ paddingBottom: 20, borderBottom: `2px solid ${INK}`, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <h1 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 14, fontFamily: 'var(--font-archivo), sans-serif', fontWeight: 800, fontSize: 'clamp(30px,4cqw,44px)', letterSpacing: '-.025em', lineHeight: 1 }}>
        {title}
        <span style={{ width: 48, height: 4, background: GOLD, flex: 'none' }} />
      </h1>
      <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: '#5a5a5a', maxWidth: 680 }}>{desc}</p>
    </header>
  );
}

export function CardGrid({ items }: { items: Article[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(270px,1fr))', gap: '26px 24px', paddingTop: 26 }}>
      {items.map((a) => <Card key={a.id} a={a} showDate />)}
    </div>
  );
}

export function ColumnistsRow() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 16, padding: '24px 0', borderBottom: `1px solid ${RULE}` }}>
      {COLUMNIST_KEYS.map((k) => {
        const c = AUTHORS[k];
        return (
          <Link key={k} href={`/autor/${c.slug}`} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Avatar initials={c.initials} size={52} font={15} />
            <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <strong style={{ fontSize: 14 }}>{c.name}</strong>
              <span style={{ fontSize: 11, color: '#777' }}>{c.column} · {c.day}</span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}
