import type { Metadata } from 'next';
import {
  AUTHORS,
  type Article,
  articleHref,
  authorOf,
  categoryName,
  isOpinion,
  plainText,
} from './content';

export const SITE_NAME = 'Sertão em Pauta';
export const SITE_TAGLINE = 'Informação que chega mais longe';
export const SITE_DESCRIPTION =
  'Jornalismo regional independente do Sertão de Alagoas. Notícias de Delmiro Gouveia, Piranhas, Pão de Açúcar, Água Branca e todo o Alto Sertão alagoano.';
export const LOCALE = 'pt_BR';
export const CONTACT_EMAIL = 'contato@sertaoempauta.com.br';

/**
 * Na Vercel, VERCEL_PROJECT_PRODUCTION_URL já vem preenchida no build de produção com o domínio
 * estável do projeto — então o canônico sai certo sem precisar de um segundo deploy.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000');

export const absolute = (path: string) => new URL(path, SITE_URL).toString();

/**
 * openGraph de um segmento filho substitui o objeto inteiro do pai (o Next não faz deep merge),
 * então todo generateMetadata precisa repetir siteName/locale. Este helper faz isso.
 */
export const og = (o: NonNullable<Metadata['openGraph']>): Metadata['openGraph'] => ({
  siteName: SITE_NAME,
  locale: LOCALE,
  ...o,
});

export const twitter = (title: string, description: string): Metadata['twitter'] => ({
  card: 'summary_large_image',
  title,
  description,
});

/* -------------------------------------------------------------------- JSON-LD */

const publisher = {
  '@type': 'NewsMediaOrganization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  slogan: SITE_TAGLINE,
  foundingDate: '2021',
  logo: { '@type': 'ImageObject', url: absolute('/icon'), width: 512, height: 512 },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Rua Coronel Peixoto, 112',
    addressLocality: 'Delmiro Gouveia',
    addressRegion: 'AL',
    addressCountry: 'BR',
  },
  areaServed: 'Sertão de Alagoas',
};

export const organizationJsonLd = () => ({ '@context': 'https://schema.org', ...publisher });

export const websiteJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: 'pt-BR',
  publisher: { '@id': `${SITE_URL}/#organization` },
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/busca?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
});

const personJsonLd = (slug: string) => {
  const a = Object.values(AUTHORS).find((x) => x.slug === slug)!;
  return {
    '@type': 'Person',
    '@id': `${SITE_URL}/autor/${a.slug}#person`,
    name: a.name,
    url: absolute(`/autor/${a.slug}`),
    jobTitle: a.role,
    description: a.bio,
    worksFor: { '@id': `${SITE_URL}/#organization` },
  };
};

export const authorJsonLd = (slug: string) => ({
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  mainEntity: personJsonLd(slug),
});

export const articleJsonLd = (a: Article) => {
  const author = authorOf(a);
  const url = absolute(articleHref(a));
  return {
    '@context': 'https://schema.org',
    '@type': isOpinion(a) ? 'OpinionNewsArticle' : 'NewsArticle',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    headline: a.title.slice(0, 110),
    alternativeHeadline: a.sub,
    description: a.sub,
    image: [absolute(`${articleHref(a)}/opengraph-image`)],
    datePublished: a.publishedAt,
    dateModified: a.updatedAt,
    author: personJsonLd(author.slug),
    publisher: { '@id': `${SITE_URL}/#organization` },
    articleSection: categoryName(a),
    keywords: a.tags.join(', '),
    inLanguage: 'pt-BR',
    isAccessibleForFree: true,
    articleBody: plainText(a),
  };
};

export const breadcrumbJsonLd = (trail: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [{ name: 'Início', path: '/' }, ...trail].map((t, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: t.name,
    item: absolute(t.path),
  })),
});

export const collectionJsonLd = (name: string, description: string, path: string, items: Article[]) => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name,
  description,
  url: absolute(path),
  inLanguage: 'pt-BR',
  isPartOf: { '@id': `${SITE_URL}/#website` },
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: items.length,
    itemListElement: items.map((a, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: absolute(articleHref(a)),
      name: a.title,
    })),
  },
});

/** O <script> de dados estruturados, com o scrub de `<` que a doc do Next manda manter. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
