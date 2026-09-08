'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { CATS, todayLong } from '@/lib/content';

const NAV = [{ href: '/', label: 'Início' }, ...CATS.map((c) => ({ href: `/${c.slug}`, label: c.name }))];

const MENU = [
  ...NAV,
  { href: '/ultimas', label: 'Últimas' },
  { href: '/opiniao', label: 'Opinião' },
  { href: '/busca', label: 'Busca' },
];

const SEARCH_ICON = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  // Só no cliente: no HTML estático a data congelaria no momento do build.
  const today = useSyncExternalStore(neverChanges, todayLong, () => '');

  const close = () => {
    setMenuOpen(false);
    setSearchOpen(false);
  };

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  // Matéria = /{editoria}/{slug}; /autor/x e /tag/x têm a mesma forma mas não são leitura.
  const seg = pathname.split('/').filter(Boolean);
  const isArticle = seg.length === 2 && !['autor', 'tag'].includes(seg[0]);

  return (
    <>
      {/* TopBar */}
      <div
        className="sep-desktop"
        style={{ background: '#0d0d0d', color: '#a9a9a9', fontSize: 11, letterSpacing: '.04em', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 28px', borderBottom: '1px solid #222' }}
      >
        <span style={{ flex: 'none', whiteSpace: 'nowrap', minHeight: 16 }}>{today}</span>
        <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
          <a href="https://instagram.com" rel="me noopener" style={{ color: '#a9a9a9' }}>Instagram</a>
          <a href="https://wa.me/" rel="noopener" style={{ color: '#a9a9a9' }}>WhatsApp</a>
          <a href="https://youtube.com" rel="me noopener" style={{ color: '#a9a9a9' }}>YouTube</a>
          <span style={{ width: 1, height: 12, background: '#333' }} />
          <Link href="/#newsletter" style={{ color: '#F2A900', fontWeight: 700 }}>Receba a newsletter</Link>
        </div>
      </div>

      <header style={{ background: '#141414', color: '#fff', position: 'sticky', top: 0, zIndex: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--header-pad)' }}>
          <Link href="/" style={{ display: 'flex', flexDirection: 'column', color: '#fff', lineHeight: 1 }} aria-label="Sertão em Pauta — página inicial">
            <span style={{ display: 'flex', alignItems: 'flex-end', gap: 10 }}>
              <span style={{ fontFamily: 'var(--font-archivo), sans-serif', fontWeight: 900, fontSize: 'var(--logo-size)', letterSpacing: '-.02em' }}>SERTÃO</span>
              <span style={{ width: 44, height: 5, background: '#F2A900', marginBottom: 6 }} />
            </span>
            <span style={{ fontSize: 'var(--logo-sub-size)', letterSpacing: '.22em', fontWeight: 600, marginLeft: 'var(--logo-sub-indent)', marginTop: 6 }}>EM PAUTA</span>
          </Link>

          <div className="sep-desktop" style={{ display: 'flex', alignItems: 'center', gap: 14, borderLeft: '2px solid #F2A900', paddingLeft: 14, fontSize: 11, letterSpacing: '.14em', lineHeight: 1.4, color: '#d8d8d8', maxWidth: 150 }}>
            INFORMAÇÃO QUE CHEGA MAIS LONGE
          </div>

          <div className="sep-mobile" style={{ display: 'flex', gap: 6 }}>
            <button onClick={() => { setSearchOpen((v) => !v); setMenuOpen(false); }} aria-label="Buscar" aria-expanded={searchOpen} style={btnIcon}>{SEARCH_ICON}</button>
            <button onClick={() => { setMenuOpen((v) => !v); setSearchOpen(false); }} aria-label="Menu" aria-expanded={menuOpen} style={btnIcon}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden><path d="M3 6h18M3 12h18M3 18h18" /></svg>
            </button>
          </div>
        </div>

        {/* Nav desktop */}
        <nav className="sep-desktop" aria-label="Seções" style={{ background: '#2a2a2a', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px' }}>
          <div style={{ display: 'flex' }}>
            {NAV.map((n) => {
              const on = isActive(n.href);
              return (
                <Link key={n.href} href={n.href} className="sep-nav-link" aria-current={on ? 'page' : undefined}
                  style={{ display: 'block', padding: '14px 18px', fontSize: 12, letterSpacing: '.08em', textTransform: 'uppercase', color: '#fff', fontWeight: on ? 800 : 500, background: on ? '#3a3a3a' : 'transparent', borderBottom: `3px solid ${on ? '#F2A900' : 'transparent'}` }}>
                  {n.label}
                </Link>
              );
            })}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {searchOpen && (
              <form action="/busca" style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <input name="q" autoFocus placeholder="Buscar no Sertão em Pauta…" aria-label="Termo de busca" style={{ height: 32, width: 260, background: '#1a1a1a', border: '1px solid #444', color: '#fff', padding: '0 10px', fontSize: 13, borderRadius: 4, outline: 'none' }} />
                <button type="submit" style={{ height: 32, padding: '0 12px', background: '#F2A900', color: '#111', fontWeight: 800, border: 0, borderRadius: 4, fontSize: 12, cursor: 'pointer' }}>Buscar</button>
              </form>
            )}
            <button onClick={() => setSearchOpen((v) => !v)} aria-label="Buscar" aria-expanded={searchOpen} style={btnIcon}>{SEARCH_ICON}</button>
          </div>
        </nav>

        {/* Nav mobile: faixa com scroll-snap */}
        <div className="sep-mobile">
          <nav className="sep-nav-strip" aria-label="Seções" style={{ background: '#2a2a2a', display: 'flex', overflowX: 'auto', scrollSnapType: 'x mandatory', scrollbarWidth: 'none' }}>
            {NAV.map((n) => {
              const on = isActive(n.href);
              return (
                <Link key={n.href} href={n.href} onClick={close} aria-current={on ? 'page' : undefined}
                  style={{ flex: 'none', scrollSnapAlign: 'start', padding: '13px 16px', fontSize: 12, letterSpacing: '.08em', textTransform: 'uppercase', color: '#fff', fontWeight: on ? 800 : 500, borderBottom: `3px solid ${on ? '#F2A900' : 'transparent'}` }}>
                  {n.label}
                </Link>
              );
            })}
          </nav>
          {searchOpen && (
            <form action="/busca" style={{ display: 'flex', gap: 8, padding: '10px 12px', background: '#1a1a1a' }}>
              <input name="q" placeholder="Buscar…" aria-label="Termo de busca" style={{ flex: 1, height: 44, background: '#111', border: '1px solid #444', color: '#fff', padding: '0 12px', fontSize: 14, borderRadius: 4, outline: 'none' }} />
              <button type="submit" style={{ height: 44, padding: '0 14px', background: '#F2A900', color: '#111', fontWeight: 800, border: 0, borderRadius: 4, cursor: 'pointer' }}>Buscar</button>
            </form>
          )}
          {menuOpen && (
            <div style={{ background: '#1a1a1a', padding: '8px 0', borderTop: '1px solid #333' }}>
              {MENU.map((m) => (
                <Link key={m.href} href={m.href} onClick={close} style={{ display: 'block', padding: '12px 20px', color: '#fff', fontSize: 15, fontWeight: 600, minHeight: 44 }}>{m.label}</Link>
              ))}
            </div>
          )}
        </div>

        {isArticle && <ReadingProgress />}
      </header>
    </>
  );
}

function ReadingProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setPct(max > 0 ? Math.min(100, Math.round((h.scrollTop / max) * 100)) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div style={{ height: 3, background: '#2a2a2a' }} role="progressbar" aria-label="Progresso da leitura" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
      <div style={{ height: 3, background: '#F2A900', width: `${pct}%`, transition: 'width 80ms linear' }} />
    </div>
  );
}

const neverChanges = () => () => {};

const btnIcon: React.CSSProperties = { width: 44, height: 44, background: 'none', border: 0, color: '#fff', display: 'grid', placeItems: 'center', cursor: 'pointer' };
