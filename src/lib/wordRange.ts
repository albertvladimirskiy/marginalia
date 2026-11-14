/**
 * Word ranges also come from AI-written lessons, so treat them as untrusted:
 * the minimum gates "Submit Draft 1" and must stay achievable. The maximum is
 * only advisory (the editor says "over the range"), so it gets a loose cap.
 */
export const RANGE_LIMITS = { minFloor: 50, minCeiling: 800, gap: 100, maxCeiling: 5000 } as const;

export function saneRange(min: number, max: number): { min: number; max: number } {
  const { minFloor, minCeiling, gap, maxCeiling } = RANGE_LIMITS;
  const lo = Number.isFinite(min) ? Math.round(Math.min(Math.max(min, minFloor), minCeiling)) : 200;
  const hi = Number.isFinite(max) ? Math.round(max) : 600;
  return { min: lo, max: Math.min(Math.max(hi, lo + gap), maxCeiling) };
}
