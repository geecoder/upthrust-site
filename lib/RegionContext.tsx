'use client';

import { createContext, useContext, useEffect, useState, useTransition, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import type { Region } from './config';
import { setRegionOverride } from '@/app/actions/region';

type RegionContextValue = {
  region: Region;
  setRegion: (r: Region) => void;
  pending: boolean;
};

const RegionContext = createContext<RegionContextValue | null>(null);

// Shared region state for the page tree. The value always originates on the
// server (lib/geoServer.ts resolves it from an edge geo header or the
// override cookie), so the first paint already shows the right currency —
// this provider only mirrors it so client components can read it without
// threading a prop through every level.
//
// Changing region writes the cookie via a server action and then refreshes,
// which re-renders every price server-side. The local state update is just so
// the switcher's own active pill responds instantly rather than waiting a
// round trip.
export function RegionProvider({ initialRegion, children }: { initialRegion: Region; children: ReactNode }) {
  const [region, setRegionState] = useState<Region>(initialRegion);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  // router.refresh() re-renders the server tree, delivering a new
  // initialRegion. Without this the context would keep serving the value
  // captured at mount and the two would silently disagree.
  useEffect(() => {
    setRegionState(initialRegion);
  }, [initialRegion]);

  const setRegion = (r: Region) => {
    setRegionState(r);
    startTransition(async () => {
      await setRegionOverride(r);
      router.refresh();
    });
  };

  return (
    <RegionContext.Provider value={{ region, setRegion, pending }}>
      {children}
    </RegionContext.Provider>
  );
}

export function useRegionContext(): RegionContextValue | null {
  return useContext(RegionContext);
}
