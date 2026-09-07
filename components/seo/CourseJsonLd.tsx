import { getProgramme, type ProgrammeSlug } from '@/lib/cohort-config';
import { SITE } from '@/lib/config';

export function CourseJsonLd({ slug, name, description }: { slug: ProgrammeSlug; name: string; description: string }) {
  const programme = getProgramme(slug);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: SITE.name,
      sameAs: SITE.url,
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      startDate: programme.start,
    },
  };

  return (
    // eslint-disable-next-line react/no-danger
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
}
