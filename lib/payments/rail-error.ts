// Split into its own module so both rail.ts and paystack.ts can import it
// without a circular dependency (rail.ts imports paystackRail from
// paystack.ts, which needs to throw this same error type).
export class RailUnavailableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RailUnavailableError';
  }
}
