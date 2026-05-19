'use client';

import { useState, useEffect } from 'react';
import type { Region } from './config';

// Reads the region the server detected (passed via data-region on <body>)
// Falls back to localStorage override, then to 'NG' as default.
export function useRegion(initialRegion: Region = 'NG'): [Region, (r: Region) => void] {
  const [region, setRegionState] = useState<Region>(initialRegion);

  useEffect(() => {
    // 1. Check if user has manually overridden via localStorage
    try {
      const stored = localStorage.getItem('upthrust_region') as Region | null;
      if (stored && ['NG', 'GB', 'CA', 'US', 'OTHER'].includes(stored)) {
        setRegionState(stored);
        return;
      }
    } catch { /* localStorage unavailable */ }

    // 2. Read the region the server geo-detected (set on <body data-region="...">)
    const bodyRegion = document.body.getAttribute('data-region') as Region | null;
    if (bodyRegion && ['NG', 'GB', 'CA', 'US', 'OTHER'].includes(bodyRegion)) {
      setRegionState(bodyRegion);
      return;
    }

    // 3. Fallback: timezone detection
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz.startsWith('Africa') || tz.includes('Lagos')) { setRegionState('NG'); return; }
      if (tz.includes('London') || tz.includes('Dublin')) { setRegionState('GB'); return; }
      if (tz.includes('Toronto') || tz.includes('Vancouver') || tz.includes('Montreal')) { setRegionState('CA'); return; }
      if (tz.startsWith('America/') && !tz.includes('Canada')) { setRegionState('US'); return; }
    } catch { /* Intl unavailable */ }

    setRegionState('NG'); // final default
  }, []);

  const setRegion = (r: Region) => {
    setRegionState(r);
    try { localStorage.setItem('upthrust_region', r); } catch { /* ignore */ }
  };

  return [region, setRegion];
}
