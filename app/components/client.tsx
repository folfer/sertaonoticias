'use client';

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';

/* ------------------------------------------------------------------- toast */

function useToast() {
  const [msg, setMsg] = useState('');
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const show = useCallback((m: string) => {
    setMsg(m);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMsg(''), 2600);
  }, []);
  useEffect(() => () => clearTimeout(timer.current), []);
  const node = msg ? (
    <div role="status" aria-live="polite" style={{ position: 'fixed', left: '50%', bottom: 28, transform: 'translateX(-50%)', background: '#1f1f1f', color: '#fff', padding: '12px 18px', borderRadius: 4, fontSize: 13, fontWeight: 600, boxShadow: '0 8px 24px rgba(0,0,0,.2)', animation: 'sep-toast 180ms ease-out', zIndex: 50, borderLeft: '3px solid #F2A900' }}>
      {msg}
    </div>
  ) : null;
  return [node, show] as const;
}

/* --------------------------------------------------------------- ShareBar */

const ICON_WA = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M21 12a9 9 0 0 1-13.4 7.8L3 21l1.3-4.4A9 9 0 1 1 21 12z" /></svg>
);
const ICON_LINK = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
    <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1.5 1.5" />
    <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1.5-1.5" />
  </svg>
);

export function ShareBar({ url, title, variant }: { url: string; title: string; variant: 'inline' | 'rail' | 'bottom' }) {
  const [toast, show] = useToast();
  const e = encodeURIComponent;
  const links = {
    wa: `https://wa.me/?text=${e(`${title} ${url}`)}`,
    fb: `https://www.facebook.com/sharer/sharer.php?u=${e(url)}`,
    x: `https://x.com/intent/post?url=${e(url)}&text=${e(title)}`,
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      show('Link copiado');
    } catch {
      show('Não foi possível copiar o link');
    }
  };

  if (variant === 'bottom') {
    const item: React.CSSProperties = { height: 44, flex: 1, background: 'none', border: 0, color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'grid', placeItems: 'center' };
    return (
      <div className="sep-mobile" style={{ position: 'sticky', bottom: 0, margin: '20px -16px -20px', background: '#141414', display: 'flex', justifyContent: 'space-around', padding: '6px 8px', zIndex: 5 }}>
        <a href={links.wa} target="_blank" rel="noopener" style={item}>WhatsApp</a>
        <a href={links.fb} target="_blank" rel="noopener" style={item}>Facebook</a>
        <a href={links.x} target="_blank" rel="noopener" style={item}>X</a>
        <button onClick={copy} style={{ ...item, color: '#F2A900' }}>Copiar link</button>
        {toast}
      </div>
    );
  }

  const size = variant === 'rail' ? 40 : 36;
  const circle: React.CSSProperties = { width: size, height: size, border: '1px solid #e5e2dc', borderRadius: '50%', background: '#fff', display: 'grid', placeItems: 'center', cursor: 'pointer', color: '#1f1f1f' };
  const buttons = (
    <>
      <a className="sep-share-btn" href={links.wa} target="_blank" rel="noopener" aria-label="Compartilhar no WhatsApp" style={circle}>{ICON_WA}</a>
      <a className="sep-share-btn" href={links.fb} target="_blank" rel="noopener" aria-label="Compartilhar no Facebook" style={{ ...circle, fontWeight: 800, fontSize: 14 }}>f</a>
      <a className="sep-share-btn" href={links.x} target="_blank" rel="noopener" aria-label="Compartilhar no X" style={{ ...circle, fontWeight: 800, fontSize: 13 }}>X</a>
      <button className="sep-share-btn" onClick={copy} aria-label="Copiar link" style={circle}>{ICON_LINK}</button>
      {toast}
    </>
  );

  if (variant === 'rail') {
    return (
      <div className="sep-desktop" style={{ flex: 'none', position: 'sticky', top: 130, alignSelf: 'flex-start', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {buttons}
      </div>
    );
  }
  return (
    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
      <span style={{ fontSize: 12, marginRight: 4, whiteSpace: 'nowrap' }}>Compartilhe:</span>
      {buttons}
    </div>
  );
}

/* --------------------------------------------------------- NewsletterForm */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function NewsletterForm({ variant }: { variant: 'sidebar' | 'footer' }) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'error' | 'success'>('idle');
  const sidebar = variant === 'sidebar';

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    setState(EMAIL_RE.test(email) ? 'success' : 'error');
  };

  if (state === 'success') {
    if (!sidebar) return <span style={{ fontSize: 13, color: '#F2A900', fontWeight: 700 }}>Inscrição registrada. Até amanhã às 7h.</span>;
    return (
      <div role="status" style={{ display: 'flex', gap: 12, alignItems: 'flex-start', background: '#1f1f1f', border: '1px solid #333', borderRadius: 4, padding: 14 }}>
        <span style={{ flex: 'none', width: 28, height: 28, borderRadius: '50%', background: '#F2A900', color: '#111', display: 'grid', placeItems: 'center' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12l5 5L20 7" /></svg>
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <strong style={{ fontSize: 14 }}>Inscrição registrada</strong>
          <span style={{ fontSize: 12, color: '#c9c9c9', lineHeight: 1.4 }}>Guardamos {email} para a primeira edição.</span>
          <button onClick={() => { setState('idle'); setEmail(''); }} style={{ fontSize: 12, color: '#F2A900', marginTop: 4, background: 'none', border: 0, padding: 0, cursor: 'pointer', textAlign: 'left' }}>Usar outro e-mail</button>
        </div>
      </div>
    );
  }

  const input: React.CSSProperties = sidebar
    ? { height: 44, background: '#fff', border: '1px solid #444', borderRadius: 4, padding: '0 12px', fontSize: 14, color: '#1f1f1f', outline: 'none' }
    : { height: 44, background: '#1f1f1f', border: '1px solid #333', borderRadius: 4, padding: '0 12px', fontSize: 14, color: '#fff', outline: 'none' };

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <input className="sep-input" type="email" required value={email} onChange={(ev) => { setEmail(ev.target.value); setState('idle'); }} placeholder="seu@email.com" aria-label="E-mail" style={input} />
      <button type="submit" className="sep-btn-gold" style={{ height: 44, background: '#F2A900', color: '#111', border: 0, borderRadius: 4, fontWeight: 800, fontSize: 13, letterSpacing: '.04em', cursor: 'pointer' }}>
        {sidebar ? 'Quero receber' : 'Assinar'}
      </button>
      {state === 'error' && <span role="alert" style={{ fontSize: 12, color: '#ff8f9c' }}>Digite um e-mail válido, como nome@provedor.com.</span>}
      {sidebar && (
        <span style={{ fontSize: 11, color: '#9a9a9a', lineHeight: 1.4 }}>
          Sem spam. Cancele quando quiser.
        </span>
      )}
    </form>
  );
}

/* --------------------------------------------------------- CookieConsent */

const COOKIE_KEY = 'sep-cookies-v1';

const readCookieChoice = () => {
  try {
    return localStorage.getItem(COOKIE_KEY);
  } catch {
    return 'essential';
  }
};

export function CookieConsent() {
  // No servidor a faixa não existe; depois da hidratação ela só aparece para quem ainda não decidiu.
  const stored = useSyncExternalStore(() => () => {}, readCookieChoice, () => 'ssr');
  const [picked, setPicked] = useState<string | null>(null);
  const decide = (v: string) => {
    setPicked(v);
    try {
      localStorage.setItem(COOKIE_KEY, v);
    } catch {}
  };
  if ((picked ?? stored) !== null) return null;
  return (
    <div role="dialog" aria-label="Cookies" style={{ position: 'sticky', bottom: 0, background: '#fff', borderTop: '3px solid #F2A900', boxShadow: '0 -4px 20px rgba(0,0,0,.08)', padding: '14px 20px', display: 'flex', flexWrap: 'wrap', gap: '12px 20px', alignItems: 'center', justifyContent: 'space-between', zIndex: 30 }}>
      <span style={{ fontSize: 13, lineHeight: 1.5, color: '#3a3a3a', flex: '1 1 320px' }}>
        Usamos cookies para medir audiência e melhorar o site. Analytics só é carregado após o seu aceite, conforme a LGPD.
      </span>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => decide('essential')} style={{ height: 40, padding: '0 16px', border: '1px solid #cfcac0', background: '#fff', borderRadius: 4, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>Só essenciais</button>
        <button onClick={() => decide('all')} className="sep-btn-dark" style={{ height: 40, padding: '0 18px', border: 0, background: '#141414', color: '#fff', borderRadius: 4, fontWeight: 800, fontSize: 13, cursor: 'pointer' }}>Aceitar</button>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------- ScrollToTop */

export function ScrollToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(document.documentElement.scrollTop > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  if (!show) return null;
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Voltar ao topo"
      style={{ position: 'fixed', right: 24, bottom: 28, width: 44, height: 44, borderRadius: '50%', background: '#141414', color: '#F2A900', border: 0, cursor: 'pointer', display: 'grid', placeItems: 'center', boxShadow: '0 4px 14px rgba(0,0,0,.2)', zIndex: 40 }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M12 19V5M5 12l7-7 7 7" /></svg>
    </button>
  );
}
