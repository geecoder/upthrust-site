import { cookies, headers } from 'next/headers';
import type { Region } from './config';
import {
  REGION_COOKIE,
  isRegion,
  regionForCountry,
  regionFromAcceptLanguage,
} from './region';

// Resolves the visitor's pricing region on the SERVER, so the correct
// currency is in the HTML on first paint — never rendered four ways and
// hidden with CSS, and never guessed from the browser timezone (a timezone
// is not a billing location, and the guess would arrive after hydration,
// flashing the wrong price).
//
// Order of precedence:
//   1. A manual override cookie. This deliberately outranks geo-IP: the
//      switcher exists precisely for people on a VPN, or paying from a
//      different country than they're sitting in. If detection won, the
//      override would be useless to the only people who need it.
//   2. An edge geo header, whichever platform is serving us.
//   3. Accept-Language's region subtag — weak, but better than nothing on a
//      host with no geo header at all.
//   4. USD.

// Checked in order. Netlify's x-nf-geo is JSON; the rest are bare ISO codes.
const GEO_HEADERS = [
  'x-vercel-ip-country',
  'cf-ipcountry',
  'fastly-geo-country',
  'x-geo-country',
] as const;

function countryFromNetlify(raw: string | null): string | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as { country?: { code?: string } };
    return parsed?.country?.code ?? null;
  } catch {
    return null; // header present but not the shape we expect — ignore it
  }
}

export async function getRegionFromRequest(): Promise<Region> {
  try {
    const cookieStore = await cookies();
    const override = cookieStore.get(REGION_COOKIE)?.value;
    if (isRegion(override)) return override;
  } catch {
    // Outside a request scope (static generation) — fall through.
  }

  try {
    const headersList = await headers();

    for (const name of GEO_HEADERS) {
      const value = headersList.get(name);
      if (value) return regionForCountry(value);
    }

    const netlify = countryFromNetlify(headersList.get('x-nf-geo'));
    if (netlify) return regionForCountry(netlify);

    const fromLanguage = regionFromAcceptLanguage(headersList.get('accept-language'));
    if (fromLanguage) return fromLanguage;
  } catch {
    // Outside a request scope during static generation — safe to ignore.
  }

  return 'OTHER';
}

// True when the region came from an explicit choice rather than detection —
// lets the pricing header say so instead of implying we geo-located them.
export async function hasRegionOverride(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    return isRegion(cookieStore.get(REGION_COOKIE)?.value);
  } catch {
    return false;
  }
}
