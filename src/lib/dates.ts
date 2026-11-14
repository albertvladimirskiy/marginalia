/** Local calendar date as YYYY-MM-DD. */
export function localDate(d: Date = new Date()): string {
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

/** Parse YYYY-MM-DD as a local date at noon (noon avoids DST edge cases). */
export function parseDate(s: string): Date {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y ?? 1970, (m ?? 1) - 1, d ?? 1, 12);
}

export function addDays(s: string, n: number): string {
  const d = parseDate(s);
  d.setDate(d.getDate() + n);
  return localDate(d);
}

/** Monday of the week containing s (weeks run Monday–Sunday). */
export function weekStart(s: string): string {
  const d = parseDate(s);
  const offset = (d.getDay() + 6) % 7;
  return addDays(s, -offset);
}

export function weekday(s: string): number {
  return parseDate(s).getDay();
}
