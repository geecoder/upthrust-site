import { headers } from 'next/headers';
import type { Region } from './config';

const COUNTRY_TO_REGION: Record<string, Region> = {
  NG: 'NG', GH: 'NG', KE: 'NG', ZA: 'NG', UG: 'NG', TZ: 'NG',
  RW: 'NG', SN: 'NG', CI: 'NG', EG: 'NG', CM: 'NG', ET: 'NG',
  ZM: 'NG', ZW: 'NG', MW: 'NG', MZ: 'NG', BJ: 'NG', TG: 'NG',
  AO: 'NG', GA: 'NG', CD: 'NG', CG: 'NG', NE: 'NG', ML: 'NG',
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
  } catch {}
  return 'OTHER';
}

export function getRegionFromCookie(cookieValue: string | undefined): Region {
  if (cookieValue && ['NG', 'GB', 'CA', 'US', 'OTHER'].includes(cookieValue)) {
    return cookieValue as Region;
  }
  return 'NG';
}
