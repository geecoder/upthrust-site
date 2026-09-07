import { Suspense } from 'react';
import { getRegionFromRequest } from '@/lib/geoServer';
import EnrolFlow from './EnrolFlow';

export default async function EnrolPage() {
  const region = await getRegionFromRequest();

  return (
    <Suspense fallback={null}>
      <EnrolFlow initialRegion={region} />
    </Suspense>
  );
}
