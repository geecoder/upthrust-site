import 'server-only';

// Real payee details for the bank-transfer rails.
//
// `server-only` is load-bearing here. The prototype carried these as a plain
// constant in the shared data module, which is imported by 'use client'
// components — so every region's account details were compiled into the
// JavaScript bundle and shipped to every visitor of every page. This module
// can only be imported from a server component or route handler; the build
// fails if anything client-side reaches for it.
//
// The values live in .env.local (gitignored), so they can be rotated without a
// code change and never enter git history. The pathway page resolves the
// visitor's region server-side and passes down only that region's rows, so a
// UK visitor's browser never receives the Nigerian or Canadian accounts.

import type { Region } from '@/lib/config';

export type BankRow = {
  k: string;
  v: string;
  /** Only needed when paying from outside the account's own country. */
  intl?: boolean;
};

export type BankDetails = {
  /** False when any required field is unset — the panel then says details will follow. */
  configured: boolean;
  title: string;
  rows: BankRow[];
  proofEmail: string;
};

const env = (k: string) => (process.env[k] || '').trim();

/** A region resolves only if every row it needs is actually populated. */
function build(title: string, rows: (BankRow | null)[], payee: string): BankDetails {
  const present = rows.filter((r): r is BankRow => !!r && !!r.v);
  const required = rows.filter(Boolean).length;
  return {
    configured: !!payee && present.length === required && required > 0,
    title,
    rows: payee ? [{ k: 'Account name', v: payee }, ...present] : present,
    proofEmail: env('PAYMENT_PROOF_EMAIL'),
  };
}

const row = (k: string, envKey: string, intl = false): BankRow | null => {
  const v = env(envKey);
  return v ? { k, v, intl } : null;
};

export function getBankDetails(region: Region): BankDetails {
  const payee = env('BANK_PAYEE_NAME');

  switch (region) {
    case 'NG':
      return build('NGN bank transfer', [
        row('Bank', 'BANK_NGN_BANK'),
        row('Account number', 'BANK_NGN_ACCOUNT'),
        row('Account type', 'BANK_NGN_TYPE'),
      ], payee);

    case 'GB':
      return build('GBP bank transfer', [
        row('Bank', 'BANK_GBP_BANK'),
        row('Account number', 'BANK_GBP_ACCOUNT'),
        row('Sort code', 'BANK_GBP_SORT'),
        row('IBAN', 'BANK_GBP_IBAN', true),
        row('SWIFT / BIC', 'BANK_GBP_SWIFT', true),
      ], payee);

    case 'CA':
      return build('CAD bank transfer', [
        row('Bank', 'BANK_CAD_BANK'),
        row('Account number', 'BANK_CAD_ACCOUNT'),
        row('Institution number', 'BANK_CAD_INSTITUTION'),
        row('Transit number', 'BANK_CAD_TRANSIT'),
        row('SWIFT / BIC', 'BANK_CAD_SWIFT', true),
      ], payee);

    // US and everywhere else settle in USD.
    default:
      return build('USD bank transfer', [
        row('Bank', 'BANK_USD_BANK'),
        row('Account number', 'BANK_USD_ACCOUNT'),
        row('Routing number (ACH and wire)', 'BANK_USD_ROUTING'),
        row('Account type', 'BANK_USD_TYPE'),
        row('SWIFT / BIC', 'BANK_USD_SWIFT', true),
      ], payee);
  }
}
