'use server';

import { cookies } from 'next/headers';
import type { Region } from '@/lib/config';
import { REGION_COOKIE, REGION_COOKIE_MAX_AGE, isRegion } from '@/lib/region';

// Persists a manual region override. Prices are rendered server-side from
// this cookie (see lib/geoServer.ts), so the caller follows this with a
// router.refresh() to pull down the re-rendered figures.
export async function setRegionOverride(region: Region): Promise<void> {
  if (!isRegion(region)) return;

  const cookieStore = await cookies();
  cookieStore.set(REGION_COOKIE, region, {
    maxAge: REGION_COOKIE_MAX_AGE,
    path: '/',
    sameSite: 'lax',
    httpOnly: false, // no secret here; readable by the client is harmless
  });
}
