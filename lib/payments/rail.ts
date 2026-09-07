import { railFor, type Region } from '@/lib/config';
import { bankTransferRail } from './bankTransfer';
import { paystackRail } from './paystack';
import type { PaymentRail } from './types';

export { RailUnavailableError } from './rail-error';

export function getPaymentRail(region: Region): PaymentRail {
  const kind = railFor(region);
  return kind === 'bank_transfer' ? bankTransferRail : paystackRail;
}
