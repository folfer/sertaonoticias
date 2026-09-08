import { OG_CONTENT_TYPE, OG_SIZE, SITE_OG_ALT, ogCard } from '@/lib/og';
import { SITE_TAGLINE } from '@/lib/seo';

export const alt = SITE_OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return ogCard({
    kicker: 'Sertão de Alagoas',
    title: SITE_TAGLINE,
    meta: 'Jornalismo regional independente · Delmiro Gouveia/AL',
  });
}
