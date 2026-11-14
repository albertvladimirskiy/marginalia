# Marginalia — build plan

One principle: the app exists to put words on the page. Everything else is subordinate.

## Milestones (build order from PROMPT.md §9)

| # | Scope | Done when |
|---|-------|-----------|
| M0 | Vite + React + TS strict scaffold, CSS-variable theme (paper/ink), hash routing (Today · Lessons · Library · Studio · Archive · Settings), GitHub Pages workflow | `npm run build` passes, routes render |
| M1 | Dexie schema, autosave, last-20 version history, JSON backup/restore, Markdown ZIP export, editor (word count, timer, idle nudge, focus/typewriter mode) | round-trip test passes |
| M2 | Syllabus (≥120 entries), 14 fully written Foundations lessons, scheduler/rotation, full Daily Session without AI | a whole session completes offline |
| M3 | `src/ai/client.ts` (single gateway), structured feedback (JSON schema output + zod + one repair + raw fallback), revision round, Weakness Profile | schema/repair tests pass |
| M4 | JIT lesson generation (Haiku), IndexedDB cache, regenerate, adaptive micro-constraints | uncached lesson generates; cached lesson works offline |
| M5 | Master Library (20), Reading Log, Imitation Gym | |
| M6 | Studio: multiple projects, Premise Workshop, Premise Card, characters, scene cards, reorderable outline, chapters, Daily 500, Editor mode | |
| M7 | Streak with one weekly rest day, heat map, totals, 100k progress, `.ics` reminder | streak tests pass |
| M8 | PWA manifest + offline precache, a11y pass, README, CLAUDE.md, final verification | build, lint, test green; browser run-through clean |

## Decisions

- **Structured output via `output_config.format` (JSON schema), not forced tool use.** Current docs: forced `tool_choice` (`any`/`tool`) returns 400 on Sonnet 5.5 and Opus 5.5. Structured outputs give the same guarantee. Zod still validates, one repair call, then raw-text fallback.
- **Official `@anthropic-ai/sdk` in the browser** (`dangerouslyAllowBrowser: true` sends the `anthropic-dangerous-direct-browser-access` header). All calls go through `src/ai/client.ts`.
- **Hash routing, no router library.** GitHub Pages has no SPA fallback; `#/path` needs none.
- **Settings in localStorage, writing in IndexedDB.** API key lives in its own localStorage key and is never exported.
- **Rolling summary is computed, not generated.** Last 10 sessions compress deterministically (lesson, scores, tags, reflection): zero cost, works offline.
- **Streak counts days with ≥100 words**, from a per-day word log fed by autosave deltas.

## Risks

- No API key available during the build: AI paths are covered by unit tests with a mocked caller, and verified for graceful degradation in the browser. Live calls are unverified.
- Model passage accuracy: only short public-domain excerpts the author is confident of (Garnett, Maude, Long, Trotter, Zimmern, KJV, Hemingway/Woolf works now PD in the US).
- Content volume (14 lessons, 120 syllabus entries, 20 masters) is the bulk of the work; quality over quantity where they conflict.
