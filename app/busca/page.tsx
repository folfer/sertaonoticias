import Link from 'next/link';
import type { Metadata } from 'next';
import { ageInDays, allArticles, CATS, fold } from '@/lib/content';
import { Breadcrumb, ChronoRow, GOLD, INK } from '@/app/components/ui';

export const metadata: Metadata = {
  title: 'Busca',
  description: 'Busque notícias, colunas e reportagens do Sertão em Pauta.',
  // Página de resultado de busca interna: fora do índice, como manda a prática.
  robots: { index: false, follow: true },
};

const PERIODS = [
  { key: 'all', name: 'Qualquer data', days: Infinity },
  { key: '24h', name: 'Últimas 24h', days: 1 },
  { key: '7d', name: '7 dias', days: 7 },
  { key: '30d', name: '30 dias', days: 30 },
];

const SECTIONS = [{ slug: 'all', name: 'Todas' }, ...CATS, { slug: 'opiniao', name: 'Opinião' }];

const one = (v: string | string[] | undefined, fallback: string) => (Array.isArray(v) ? v[0] : v) ?? fallback;

export default async function Busca({ searchParams }: PageProps<'/busca'>) {
  const sp = await searchParams;
  const q = one(sp.q, '').trim();
  const secao = one(sp.secao, 'all');
  const periodo = one(sp.periodo, 'all');
  const days = PERIODS.find((p) => p.key === periodo)?.days ?? Infinity;
  const needle = fold(q);

  const results = allArticles().filter(
    (a) =>
      (secao === 'all' || a.cat === secao) &&
      ageInDays(a.publishedAt) < days &&
      (!needle || fold(`${a.title} ${a.sub} ${a.tags.join(' ')}`).includes(needle)),
  );

  const href = (patch: Record<string, string>) => {
    const p = new URLSearchParams({ ...(q && { q }), ...(secao !== 'all' && { secao }), ...(periodo !== 'all' && { periodo }), ...patch });
    for (const [k, v] of [...p.entries()]) if (v === 'all' || !v) p.delete(k);
    const s = p.toString();
    return s ? `/busca?${s}` : '/busca';
  };

  const chip = (name: string, active: boolean, to: string) => (
    <Link key={name} href={to} aria-current={active ? 'true' : undefined}
      style={{ height: 32, padding: '0 12px', borderRadius: 999, border: `1px solid ${active ? '#141414' : '#cfcac0'}`, background: active ? '#141414' : '#fff', color: active ? '#fff' : INK, fontWeight: 700, fontSize: 12, display: 'inline-flex', alignItems: 'center' }}>
      {name}
    </Link>
  );

  const summary = q
    ? `${results.length} resultado${results.length === 1 ? '' : 's'} para “${q}”`
    : `${results.length} matérias no período selecionado`;

  return (
    <div style={{ padding: 'var(--page-pad)' }}>
      <Breadcrumb trail={[{ name: 'Busca' }]} />
      <header style={{ paddingBottom: 20, borderBottom: `2px solid ${INK}`, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.14em', color: GOLD }}>BUSCA</span>
        <h1 style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap' }}>Busca no Sertão em Pauta</h1>
        <form action="/busca" style={{ display: 'flex', gap: 8, maxWidth: 720 }}>
          {secao !== 'all' && <input type="hidden" name="secao" value={secao} />}
          {periodo !== 'all' && <input type="hidden" name="periodo" value={periodo} />}
          <input className="sep-input" name="q" defaultValue={q} placeholder="O que você procura?" aria-label="Termo de busca" style={{ flex: 1, height: 48, border: '1px solid #cfcac0', borderRadius: 4, padding: '0 14px', fontSize: 17, outline: 'none' }} />
          <button type="submit" className="sep-btn-dark" style={{ height: 48, padding: '0 20px', background: '#141414', color: '#fff', border: 0, borderRadius: 4, fontWeight: 800, fontSize: 13, cursor: 'pointer' }}>Buscar</button>
        </form>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px 28px', fontSize: 12 }}>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontWeight: 800, letterSpacing: '.1em', color: '#6b6b6b', marginRight: 4 }}>SEÇÃO</span>
            {SECTIONS.map((c) => chip(c.name, secao === c.slug, href({ secao: c.slug })))}
          </div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontWeight: 800, letterSpacing: '.1em', color: '#6b6b6b', marginRight: 4 }}>PERÍODO</span>
            {PERIODS.map((p) => chip(p.name, periodo === p.key, href({ periodo: p.key })))}
          </div>
        </div>
      </header>

      <p style={{ margin: '18px 0 6px', fontSize: 14, color: '#5a5a5a' }} aria-live="polite">{summary}</p>

      {results.length === 0 && (
        <div style={{ padding: '50px 20px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
          <strong style={{ fontFamily: 'var(--font-archivo), sans-serif', fontSize: 22, letterSpacing: '-.02em' }}>Nada encontrado{q && <> para “{q}”</>}</strong>
          <p style={{ margin: 0, color: '#5a5a5a', maxWidth: 460, lineHeight: 1.5 }}>
            Tente outra grafia, um termo mais curto ou amplie o período. Nomes de cidades funcionam bem: Piranhas, Delmiro, Pão de Açúcar.
          </p>
        </div>
      )}

      <div style={{ maxWidth: 820 }}>
        {results.map((a) => <ChronoRow key={a.id} a={a} thumb={180} showAuthor />)}
      </div>
    </div>
  );
}
