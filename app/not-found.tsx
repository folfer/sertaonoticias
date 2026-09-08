import Link from 'next/link';
import type { Metadata } from 'next';
import { LatestList } from './components/ui';

// O Next já emite <meta name="robots" content="noindex"> nesta rota.
export const metadata: Metadata = { title: 'Página não encontrada' };

export default function NotFound() {
  return (
    <div style={{ padding: 'var(--page-pad)' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40, alignItems: 'flex-start' }}>
        <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: 18, padding: '20px 0' }}>
          <span aria-hidden style={{ fontFamily: 'var(--font-archivo), sans-serif', fontWeight: 900, fontSize: 'clamp(88px,14cqw,160px)', lineHeight: .9, letterSpacing: '-.05em', color: '#1f1f1f', display: 'flex', alignItems: 'flex-end', gap: 14 }}>
            404<span style={{ width: 60, height: 8, background: '#F2A900', marginBottom: 14 }} />
          </span>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-archivo), sans-serif', fontWeight: 800, fontSize: 'clamp(24px,3cqw,34px)', letterSpacing: '-.02em', lineHeight: 1.1 }}>
            Essa página não chegou até aqui.
          </h1>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: '#5a5a5a', maxWidth: 480 }}>
            O endereço pode ter mudado ou a matéria foi despublicada. Busque pelo assunto ou volte para as últimas notícias.
          </p>
          <form action="/busca" style={{ display: 'flex', gap: 8, maxWidth: 480 }}>
            <input className="sep-input" name="q" placeholder="Buscar no Sertão em Pauta" aria-label="Buscar" style={{ flex: 1, height: 46, border: '1px solid #cfcac0', borderRadius: 4, padding: '0 14px', fontSize: 15, outline: 'none' }} />
            <button type="submit" className="sep-btn-dark" style={{ height: 46, padding: '0 18px', background: '#141414', color: '#fff', border: 0, borderRadius: 4, fontWeight: 800, fontSize: 13, cursor: 'pointer' }}>Buscar</button>
          </form>
          <Link href="/" style={{ fontSize: 13, fontWeight: 700, color: '#B07800' }}>← Voltar ao início</Link>
        </div>
        <aside style={{ flex: '1 1 300px', maxWidth: 420 }}>
          <LatestList heading="Últimas notícias" showAll={false} fontSize={15} />
        </aside>
      </div>
    </div>
  );
}
