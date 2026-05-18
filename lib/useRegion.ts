'use client';

import { useState, useEffect } from 'react';
import type { Region } from './config';

// Maps country codes to our pricing regions
const COUNTRY_TO_REGION: Record<string, Region> = {
  NG: 'NG', GH: 'NG', KE: 'NG', ZA: 'NG', UG: 'NG', TZ: 'NG', RW: 'NG', SN: 'NG', CI: 'NG', EG: 'NG',
  GB: 'GB', IE: 'GB',
  CA: 'CA',
  AU: 'AU', NZ: 'AU',
};

// Detects region from browser timezone (fast, no network call)
function detectRegionFromTimezone(): Region {
  if (typeof window === 'undefined') return 'OTHER';
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz.includes('Africa') || tz.includes('Lagos') || tz.includes('Nairobi') || tz.includes('Cairo')) return 'NG';
    if (tz.includes('London') || tz.includes('Dublin') || tz.includes('Europe/Lon')) return 'GB';
    if (tz.includes('America/Toronto') || tz.includes('America/Vancouver') || tz.includes('America/Montreal') || tz.includes('America/Edmonton')) return 'CA';
    if (tz.includes('Australia') || tz.includes('Pacific/Auckland')) return 'AU';
  } catch {
    // Intl not available
  }
  return 'OTHER';
}

export function useRegion(): [Region, (r: Region) => void] {
  const [region, setRegion] = useState<Region>('NG'); // Default to NG since most leads are Nigerian

  useEffect(() => {
    // Check localStorage first (if user has manually selected)
    try {
      const stored = localStorage.getItem('upthrust_region') as Region | null;
      if (stored && ['NG', 'GB', 'CA', 'AU', 'OTHER'].includes(stored)) {
        setRegion(stored);
        return;
      }
    } catch {
      // localStorage not available
    }
    // Otherwise detect from timezone
    setRegion(detectRegionFromTimezone());
  }, []);

  const updateRegion = (r: Region) => {
    setRegion(r);
    try {
      localStorage.setItem('upthrust_region', r);
    } catch {
      // localStorage not available
    }
  };

  return [region, updateRegion];
}
