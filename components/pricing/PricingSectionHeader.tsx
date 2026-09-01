import { CohortStatusLine } from '@/components/CohortStatusLine';
import { RegionSwitcher } from '@/components/pricing/RegionSwitcher';
import { REGION_LABELS, REGION_PROCESSOR, type Region } from '@/lib/config';
import { COHORT } from '@/lib/cohort-config';

export function PricingSectionHeader({ region, isIntensive }: { region: Region; isIntensive?: boolean }) {
  const startDisplay = isIntensive ? COHORT.intensiveStartDateDisplay : COHORT.startDateDisplay;
  const applyByDisplay = isIntensive ? COHORT.intensiveApplyByDateDisplay : COHORT.applyByDateDisplay;
  return (
    <div
      style={{
        marginBottom: 28,
        display: 'flex',
        gap: 20,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
      }}
    >
      <div>
        <CohortStatusLine startDisplay={startDisplay} applyByDisplay={applyByDisplay} />
        <p style={{ fontSize: 13, color: 'var(--fg-3)', marginTop: 8 }}>
          Pricing shown for {REGION_LABELS[region]} · processed via {REGION_PROCESSOR[region]}
        </p>
      </div>
      {/* The only region control on the site — deliberately here rather than in
          the nav, so it's next to the figures it changes. */}
      <RegionSwitcher />
    </div>
  );
}
