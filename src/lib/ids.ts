/**
 * Tracking ID Generator & Parser for CivicPulse AI
 * Format: CP-YYYY-XXXXXX (e.g. CP-2026-008421)
 */

let counter = 8421;

export function generateTrackingId(year = 2026): string {
  const currentCount = counter++;
  const padded = currentCount.toString().padStart(6, '0');
  return `CP-${year}-${padded}`;
}

export function isValidTrackingId(id: string): boolean {
  return /^CP-\d{4}-\d{6}$/.test(id.trim());
}
