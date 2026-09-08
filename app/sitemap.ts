import type { MetadataRoute } from 'next';
import { AUTHORS, CATS, allArticles, allTags, articleHref, slugify } from '@/lib/content';
import { absolute } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = allArticles();
  const newest = articles[0]?.updatedAt ?? new Date().toISOString();

  return [
    { url: absolute('/'), lastModified: newest, changeFrequency: 'hourly', priority: 1 },
    { url: absolute('/ultimas'), lastModified: newest, changeFrequency: 'hourly', priority: 0.9 },
    { url: absolute('/opiniao'), lastModified: newest, changeFrequency: 'daily', priority: 0.7 },

    ...CATS.map((c) => ({
      url: absolute(`/${c.slug}`),
      lastModified: articles.find((a) => a.cat === c.slug)?.updatedAt ?? newest,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    })),

    ...articles.map((a) => ({
      url: absolute(articleHref(a)),
      lastModified: a.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: a.featured ? 0.9 : 0.7,
    })),

    ...Object.values(AUTHORS).map((a) => ({
      url: absolute(`/autor/${a.slug}`),
      lastModified: newest,
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    })),

    ...allTags().map((t) => ({
      url: absolute(`/tag/${slugify(t)}`),
      lastModified: newest,
      changeFrequency: 'weekly' as const,
      priority: 0.4,
    })),
  ];
}
