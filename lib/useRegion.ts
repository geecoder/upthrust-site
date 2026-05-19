'use client';
import { useState, useEffect } from 'react';
import type { Region } from './config';

export function useRegion(): [Region, (r: Region) => void] {
  const [region, setRegionState] = useState<Region>('NG');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('upthrust_region') as Region | null;
      if (stored && ['NG', 'GB', 'CA', 'US', 'OTHER'].includes(stored)) {
        setRegionState(stored);
        return;
      }
    } catch {}
    const bodyRegion = document.body.getAttribute('data-region') as Region | null;
    if (bodyRegion && ['NG', 'GB', 'CA', 'US', 'OTHER'].includes(bodyRegion)) {
      setRegionState(bodyRegion);
      return;
    }
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz.startsWith('Africa') || tz.includes('Lagos')) { setRegionState('NG'); return; }
      if (tz.includes('London') || tz.includes('Dublin')) { setRegionState('GB'); return; }
      if (tz.includes('Toronto') || tz.includes('Vancouver') || tz.includes('Montreal')) { setRegionState('CA'); return; }
      if (tz.startsWith('America/') && !tz.includes('Canada')) { setRegionState('US'); return; }
    } catch {}
    setRegionState('NG');
  }, []);

  const setRegion = (r: Region) => {
    setRegionState(r);
    try { localStorage.setItem('upthrust_region', r); } catch {}
  };

  return [region, setRegion];
}
