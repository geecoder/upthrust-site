import type { Metadata } from 'next';
import { ProgContent } from '@/components/proto/ProgContent';
import { buildProgrammeMetadata } from '@/lib/seo';
import { ASK, P } from '@/lib/proto/data';
import { getRegionFromRequest } from '@/lib/geoServer';
import { getBankDetails } from '@/lib/payments/bank-accounts';
import { CourseJsonLd } from '@/components/seo/CourseJsonLd';
import { FaqJsonLd } from '@/components/seo/FaqJsonLd';

// The prototype renders all six programmes through one `isProg` block keyed on
// route, so every programme route is the same component with a different key.
//
// The payee details are resolved here, on the server, and only the visitor's
// own region is passed down — see lib/payments/bank-accounts.ts. Structured
// data is generated from the same ASK/P constants the page renders, so the
// markup and the schema cannot drift apart.

const SLUG = 'product-design' as const;
const KEY = 'pd' as const;

export const metadata: Metadata = buildProgrammeMetadata(SLUG);

export default async function ProductDesignPathwayPage() {
  const region = await getRegionFromRequest();
  const bank = getBankDetails(region);

  return (
    <>
      <CourseJsonLd slug={SLUG} name={P[KEY].n} description={P[KEY].l} />
      <FaqJsonLd faqs={ASK[KEY]} />
      <ProgContent progKey={KEY} bank={bank} />
    </>
  );
}
