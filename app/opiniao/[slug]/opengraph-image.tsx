import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from '@/lib/og';
import { allOpinion, authorOf, bySlug, longDate } from '@/lib/content';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Sertão em Pauta — Opinião';

export function generateStaticParams() {
  return allOpinion().map((a) => ({ slug: a.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const a = bySlug('opiniao', (await params).slug);
  if (!a) return ogCard({ kicker: 'Opinião', title: 'Sertão em Pauta' });
  const au = authorOf(a);
  return ogCard({ kicker: `Opinião · ${au.column}`, title: a.title, meta: `Por ${au.name} · ${longDate(a.publishedAt)}` });
}
