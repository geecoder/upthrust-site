// Seed data for the public /verify registry. Records are immutable once issued —
// this module simulates that store. Real records are keyed by Passport ID
// (UP-C{cohort}-{seq}-{track}) and issued only on capstone sign-off.

import { PATHWAY_CONTENT } from './pathways-content';
import { PATHWAYS, formatPassportId, type PathwaySlug } from './cohort-config';

export interface CapabilityLevel {
  area: string;
  level: 'Proficient' | 'Developing';
}

export interface PassportRecord {
  id: string;
  name: string;
  pathway: PathwaySlug;
  pathwayLabel: string;
  cohortLine: string; // e.g. "Business Analysis pathway · Cohort 2 · 2026"
  capabilityLevels: CapabilityLevel[];
  defenceScore: number; // out of 100
  artefactsOnFile: number;
  artefactsTotal: number;
  facilitatorSignOff: string;
  hash: string;
  issuedDate: string; // ISO
}

function buildRecord(
  pathway: PathwaySlug,
  seq: number,
  name: string,
  defenceScore: number,
  proficientCount: number,
  hash: string,
  issuedDate: string,
): PassportRecord {
  const p = PATHWAYS[pathway];
  const caps = PATHWAY_CONTENT[pathway].caps;
  return {
    id: formatPassportId(pathway, seq),
    name,
    pathway,
    pathwayLabel: p.label,
    cohortLine: `${p.label} pathway · Cohort ${p.cohort} · 2026`,
    capabilityLevels: caps.map((area, i) => ({
      area,
      level: i < proficientCount ? 'Proficient' : 'Developing',
    })),
    defenceScore,
    artefactsOnFile: 12,
    artefactsTotal: 12,
    facilitatorSignOff: 'GENESIS N. ENWENYEOKWU · CBAP',
    hash,
    issuedDate,
  };
}

export const VERIFY_REGISTRY: Record<string, PassportRecord> = Object.fromEntries(
  [
    buildRecord('business-analysis', 47, 'Adaeze Okonkwo', 82, 5, '9f3c·7a21·be04·d55e', '2026-12-14'),
    buildRecord('product-management', 31, 'Kelechi Nnamdi', 88, 5, 'a41b·02f9·c7d1·3e8a', '2026-12-14'),
    buildRecord('product-design', 12, 'Fisayo Adewale', 79, 4, '5b6d·f110·9a23·71cc', '2026-12-14'),
    buildRecord('payment-operations', 4, 'Ifeoma Chukwu', 85, 5, 'e02a·88c4·1f6b·d930', '2026-12-14'),
  ].map((r) => [r.id, r]),
);

export function lookupPassport(rawId: string): PassportRecord | null {
  const id = rawId.trim().toUpperCase();
  return VERIFY_REGISTRY[id] ?? null;
}
