import { allArticles, articleHref, authorOf, categoryName } from '@/lib/content';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, absolute } from '@/lib/seo';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export async function GET() {
  const items = allArticles().slice(0, 20);
  const updated = new Date(items[0]?.updatedAt ?? Date.now()).toUTCString();

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${esc(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <description>${esc(SITE_DESCRIPTION)}</description>
    <language>pt-BR</language>
    <lastBuildDate>${updated}</lastBuildDate>
    <atom:link href="${absolute('/feed.xml')}" rel="self" type="application/rss+xml"/>
${items
  .map((a) => {
    const url = absolute(articleHref(a));
    return `    <item>
      <title>${esc(a.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(a.publishedAt).toUTCString()}</pubDate>
      <dc:creator>${esc(authorOf(a).name)}</dc:creator>
      <category>${esc(categoryName(a))}</category>
      <description>${esc(a.sub)}</description>
    </item>`;
  })
  .join('\n')}
  </channel>
</rss>`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8', 'Cache-Control': 's-maxage=600, stale-while-revalidate=3600' },
  });
}
