// The prototype keys its price table by `ng | uk | ca | us`. The server-side
// geo resolution keys by ISO-derived Region. This is the only bridge between
// the two, so the prototype's data stays exactly as written.

import type { Region } from '@/lib/config';
import type { CurKey } from './data';

export const REGION_TO_CUR: Record<Region, CurKey> = {
  NG: 'ng',
  GB: 'uk',
  CA: 'ca',
  US: 'us',
  OTHER: 'us',
};

export const CUR_TO_REGION: Record<CurKey, Region> = {
  ng: 'NG',
  uk: 'GB',
  ca: 'CA',
  us: 'OTHER',
};

// `d.regionName` in the prototype.
export const CUR_REGION_NAME: Record<CurKey, string> = {
  ng: 'Nigeria',
  uk: 'United Kingdom',
  ca: 'Canada',
  us: 'Rest of world',
};
