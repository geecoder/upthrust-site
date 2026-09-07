import type { Region } from './config';

// The cookie a manual region override is persisted in. Read on the server so
// the very first paint already carries the right currency — see geoServer.ts.
export const REGION_COOKIE = 'upthrust_region';
export const REGION_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // one year

export const VALID_REGIONS: Region[] = ['NG', 'GB', 'CA', 'US', 'OTHER'];

export function isRegion(value: string | undefined | null): value is Region {
  return !!value && (VALID_REGIONS as string[]).includes(value);
}

// Detection produces exactly four buckets, one per currency: Nigeria (NGN),
// the UK (GBP), Canada (CAD), and everywhere else (USD). 'US' remains in the
// Region union so an older cookie holding it still resolves — it prices
// identically to 'OTHER'.
const COUNTRY_TO_REGION: Record<string, Region> = {
  NG: 'NG',
  GB: 'GB',
  CA: 'CA',
};

export function regionForCountry(country: string | undefined | null): Region {
  if (!country) return 'OTHER';
  return COUNTRY_TO_REGION[country.trim().toUpperCase()] ?? 'OTHER';
}

// A weak last resort before defaulting to USD: a locale's region subtag
// (en-NG, en-GB, en-CA). Only consulted when no edge geo header is present,
// which in practice means a non-Vercel/Cloudflare host or local development.
export function regionFromAcceptLanguage(header: string | undefined | null): Region | null {
  if (!header) return null;
  for (const part of header.split(',')) {
    const tag = part.split(';')[0].trim();
    const subtags = tag.split('-');
    for (const sub of subtags.slice(1)) {
      if (sub.length !== 2) continue;
      const mapped = COUNTRY_TO_REGION[sub.toUpperCase()];
      if (mapped) return mapped;
    }
  }
  return null;
}

// The four options in the pricing-section override switcher, in the order the
// prototype shows them.
export const REGION_SWITCHER: { region: Region; label: string }[] = [
  { region: 'NG', label: 'Nigeria' },
  { region: 'GB', label: 'UK' },
  { region: 'CA', label: 'Canada' },
  { region: 'OTHER', label: 'Elsewhere' },
];
