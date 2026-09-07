'use client';

import type { Region } from './config';
import { useRegionContext } from './RegionContext';

// Reads the region resolved on the server (edge geo header, or a manual
// override cookie) and shared through RegionProvider in app/layout.tsx.
//
// `initialRegion` is the server-rendered value the calling component was
// given. It's used only as the fallback for the defensive case of no provider
// in the tree; every real page has one, so the two agree. There is no
// client-side detection here on purpose — a browser timezone is not a billing
// location, and detecting after hydration would flash the wrong price.
export function useRegion(initialRegion: Region = 'OTHER'): [Region, (r: Region) => void] {
  const ctx = useRegionContext();
  if (ctx) return [ctx.region, ctx.setRegion];
  return [initialRegion, () => {}];
}
