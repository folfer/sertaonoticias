import { ImageResponse } from 'next/og';
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from './seo';

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

const GOLD = '#F2A900';

const ARCHIVO_TTF =
  'https://raw.githubusercontent.com/google/fonts/main/ofl/archivoblack/ArchivoBlack-Regular.ttf';

/**
 * Baixado uma vez no build (as rotas de OG são pré-renderizadas), nunca em runtime.
 * Se a rede falhar, o card sai na fonte padrão do satori em vez de quebrar o build.
 */
let cached: Promise<ArrayBuffer | null> | undefined;
const archivo = () => {
  cached ??= fetch(ARCHIVO_TTF)
    .then((r) => (r.ok ? r.arrayBuffer() : Promise.reject(new Error(`HTTP ${r.status}`))))
    .catch((e) => {
      console.warn(`[og] Archivo Black indisponível (${e}); usando a fonte padrão.`);
      return null;
    });
  return cached;
};

const clip = (s: string, n: number) => (s.length > n ? `${s.slice(0, n - 1).trimEnd()}…` : s);

const domain = SITE_URL.replace(/^https?:\/\//, '');

/** Card social 1200×630 na identidade do portal: preto, barra dourada e Archivo Black. */
export async function ogCard({ kicker, title, meta }: { kicker: string; title: string; meta?: string }) {
  const short = clip(title, 118);
  const font = await archivo();
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: '#141414', color: '#fff', padding: '64px 72px', fontFamily: font ? 'Archivo' : 'sans-serif', fontWeight: 800 }}>
        {/* Masthead */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16 }}>
          <div style={{ fontSize: 46, letterSpacing: '-2px', lineHeight: 1 }}>SERTÃO</div>
          <div style={{ width: 54, height: 7, background: GOLD, marginBottom: 8 }} />
          <div style={{ fontSize: 17, letterSpacing: '8px', marginBottom: 4, color: '#d8d8d8' }}>EM PAUTA</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', gap: 26 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ fontSize: 22, letterSpacing: '4px', color: GOLD }}>{kicker.toUpperCase()}</div>
            <div style={{ width: 56, height: 4, background: GOLD }} />
          </div>
          <div style={{ fontSize: short.length > 78 ? 54 : 66, lineHeight: 1.08, letterSpacing: '-2px' }}>{short}</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '2px solid #2f2f2f', paddingTop: 26, fontSize: 22, color: '#a9a9a9' }}>
          <div style={{ display: 'flex' }}>{meta ?? SITE_TAGLINE}</div>
          <div style={{ display: 'flex', color: GOLD }}>{domain}</div>
        </div>
      </div>
    ),
    (() => {
      const data = font;
      return { ...OG_SIZE, ...(data && { fonts: [{ name: 'Archivo', data, weight: 400 as const, style: 'normal' as const }] }) };
    })(),
  );
}

export const SITE_OG_ALT = `${SITE_NAME} — ${SITE_TAGLINE}`;
