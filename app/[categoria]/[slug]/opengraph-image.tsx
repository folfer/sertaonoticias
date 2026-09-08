import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from '@/lib/og';
import { allNews, authorOf, bySlug, kicker, longDate } from '@/lib/content';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Sertão em Pauta';

export function generateStaticParams() {
  return allNews().map((a) => ({ categoria: a.cat, slug: a.slug }));
}

export default async function Image({ params }: { params: Promise<{ categoria: string; slug: string }> }) {
  const { categoria, slug } = await params;
  const a = bySlug(categoria, slug);
  if (!a) return ogCard({ kicker: 'Sertão em Pauta', title: 'Informação que chega mais longe' });
  return ogCard({ kicker: kicker(a), title: a.title, meta: `Por ${authorOf(a).name} · ${longDate(a.publishedAt)}` });
}
