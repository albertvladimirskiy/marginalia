import { addDays, weekStart } from './dates';

/** Words needed in a day for it to count (the minimum viable session). */
export const MIN_DAILY_WORDS = 100;

export interface StreakInfo {
  /** Days written in the current unbroken run. */
  current: number;
  /** Today already has 100+ words. */
  todayDone: boolean;
  /** The current week's rest day has already been spent. */
  restUsedThisWeek: boolean;
  /** Yesterday was missed (the UI says "pick up where you left off"). */
  missedYesterday: boolean;
}

/**
 * One rest day per Monday–Sunday week does not break the streak; a second
 * missed day in the same week does. Today never breaks it: the day isn't over.
 */
export function computeStreak(wordsByDate: Map<string, number>, today: string): StreakInfo {
  const written = (d: string) => (wordsByDate.get(d) ?? 0) >= MIN_DAILY_WORDS;
  const writtenDays = [...wordsByDate.keys()].filter(written).sort();
  const first = writtenDays[0];
  const todayDone = written(today);
  const missedYesterday = !written(addDays(today, -1));

  const misses = new Map<string, number>();
  let current = 0;
  if (first) {
    let d = todayDone ? today : addDays(today, -1);
    while (d >= first) {
      if (written(d)) {
        current++;
      } else {
        const wk = weekStart(d);
        const m = (misses.get(wk) ?? 0) + 1;
        if (m > 1) break;
        misses.set(wk, m);
      }
      d = addDays(d, -1);
    }
  }

  // Rest used this week: any missed day this week before today, since writing began.
  let restUsedThisWeek = false;
  if (first) {
    for (let d = weekStart(today); d < today; d = addDays(d, 1)) {
      if (d >= first && !written(d)) restUsedThisWeek = true;
    }
  }

  return { current, todayDone, restUsedThisWeek, missedYesterday };
}
