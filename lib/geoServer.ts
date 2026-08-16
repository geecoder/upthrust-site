import { headers } from 'next/headers';
import type { Region } from './config';

// Pricing shows exactly one of four currencies, by visitor location:
// Nigeria -> NGN. UK -> GBP. Canada -> CAD. Everyone else (rest of Africa,
// the US, and the rest of the world) -> USD. Do not add other African
// countries to the NG bucket — only Nigeria itself gets NGN pricing.
const COUNTRY_TO_REGION: Record<string, Region> = {
  NG: 'NG',
  GB: 'GB', IE: 'GB',
  CA: 'CA',
  US: 'US',
};

export async function getRegionFromRequest(): Promise<Region> {
  try {
    const headersList = await headers();
    const country = headersList.get('x-vercel-ip-country');
    if (country && COUNTRY_TO_REGION[country]) {
      return COUNTRY_TO_REGION[country];
    }
  } catch {
    // Outside request context during static generation — safe to ignore
  }
  return 'OTHER';
}

export function getRegionFromCookie(cookieValue: string | undefined): Region {
  if (cookieValue && ['NG', 'GB', 'CA', 'US', 'OTHER'].includes(cookieValue)) {
    return cookieValue as Region;
  }
  return 'OTHER';
}
