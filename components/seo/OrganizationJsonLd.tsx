import { SITE } from '@/lib/config';

export function OrganizationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    sameAs: [SITE.twitter ? `https://twitter.com/${SITE.twitter.replace('@', '')}` : undefined].filter(Boolean),
  };

  return (
    // eslint-disable-next-line react/no-danger
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
}
