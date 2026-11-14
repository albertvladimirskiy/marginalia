# Marginalia

A daily writing tutor that makes you write. One button on the Today screen, a ~45-minute session (warm-up, short lesson, study, draft, feedback, mandatory revision, one-line reflection), and an AI mentor that judges your sentences and never writes your work.

Everything lives in your browser (IndexedDB). It works offline, installs as a PWA, and calls the Anthropic API directly with your own key, only for feedback and generated lessons.

## Setup

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # vitest: streak, word count, scheduler, feedback schema/repair, backup round trip
npm run lint
npm run build      # type-check + production build into dist/
npm run preview    # serve dist/ (service worker active)
```

Node 20+ (built with Node 25).

### API key

Settings → *Anthropic API key*. Use a **dedicated key with a spending limit**. The key is stored in this browser's localStorage only, sent only to `api.anthropic.com`, and never included in backups. Without a key, the 37 hand-written lessons, writing, the self-check feedback path, the Studio and the Archive all work; the app tells you where a key would add mentor feedback.

Default models: feedback and chat on `claude-sonnet-5-5`, lesson generation on `claude-haiku-5-5`. Both are selectable in Settings (Haiku 5.5 / Sonnet 5.5 / Opus 5.5).

## Deploy to GitHub Pages

1. Push this folder to a GitHub repository on the `main` branch.
2. In the repository: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. The workflow in `.github/workflows/deploy.yml` lints, tests, builds with `BASE_PATH=/<repo-name>/`, and deploys. The site appears at `https://<user>.github.io/<repo-name>/`.

Routing uses `#/hash` URLs, so Pages needs no SPA fallback. To serve from a custom domain at the root, set `BASE_PATH=/` in the workflow.

## Adding lessons

- **Syllabus entries** live in `src/curriculum/syllabus.ts`, one array per track. Append a row:
  ```ts
  { level: 2, title: 'The unsent letter', objective: 'One sentence.', masterLens: 'Seneca: …', exerciseSeed: '…' }
  ```
  The id (`e-19`), default prerequisite (the previous lesson in the track), default rubric and estimated minutes are filled in by `build()`. Override any of them on the row. Any entry without a written lesson is generated just-in-time by the Tutor and cached in IndexedDB.
- **Fully written lessons** (37: the Foundations fortnight plus level 1 of every other track) live in `src/curriculum/foundations-a.ts`, `foundations-b.ts` and `level1-*.ts` as `LessonContent` objects, registered in `WRITTEN_LESSONS` (`src/curriculum/index.ts`). A written lesson for any syllabus id overrides generation. The test suite checks every level-1 lesson is written, bodies are 350–600 words, passages are short and sourced, with 2 questions and 3 pitfalls.
- **Copyright:** lesson prose must be original. Model passages: public-domain texts in public-domain translations only, short excerpts.

## Adding masters

Append to `MASTERS` in `src/masters/masters.ts`: method paragraph, five techniques, what to steal/avoid, three exercise templates, reading order. Describe in-copyright authors in your own words. Epigraphs for Today are in `src/masters/epigraphs.ts` (public domain and certain, or labelled "after …").

## Manual test script: the Daily Session

1. Fresh browser profile → onboarding appears. Enter a name, keep Standard, leave the key blank → **Begin Day 0**.
2. Write 100+ words. The counter shows "target 100+". Click **Save it and go to Today**. The footer shows the total.
3. Today shows only the heading, one primary button, a quiet status line, and an epigraph. The lesson is *The plain sentence*.
4. **Begin today's session** → Warm-up (5:00 timer). Write a few lines. Wait a minute idle: a "keep the pen moving" prompt appears and nothing is deleted. Try **Focus** (Esc exits) and **History**.
5. **Continue to the lesson** → read → **Study the model passage** → the button stays disabled until both answers have a sentence.
6. **Go to the exercise** → Draft 1. **Submit Draft 1** stays disabled under the minimum word count.
7. Without a key: the Self-check appears. Score each rubric line and name your priority #1 → **Revise**.
   With a key: **Get feedback** → reader response, strongest moment, ≤3 priorities with quotes, revision challenge, scores, weakness tags.
8. Draft 2 is prefilled from Draft 1. **Finish revision** without changing anything → refused ("change something"). Edit, then finish. With a key, **Did my revision fix it?** returns yes/partially/no with evidence.
9. Reflect: one sentence → **Finish today's session** → Done screen with today's word total.
10. Archive: the streak is 1, the heat map has today, and search finds a word from your draft. **Export all as Markdown (.zip)** and **Download full backup (.json)** both download. **Restore from backup…** with the JSON restores it.
11. Reload offline (DevTools → Network → Offline, after one online load of the production build): Today, the written lessons, the editor and the Archive all work. A mentor action says you are offline.

## Dependencies

| Package | Why |
|---|---|
| react, react-dom | UI (required stack) |
| dexie, dexie-react-hooks | IndexedDB with live queries (required stack) |
| zod | Validates AI output and backup files (required stack) |
| jszip | Markdown ZIP export (required stack) |
| react-markdown | Renders lesson bodies and chapter previews (required stack) |
| @anthropic-ai/sdk | Official client for the Messages API: typed errors, streaming, retry with `retry-after`, browser header. Lazy-loaded on first mentor call |
| @fontsource-variable/literata | Self-hosted Literata (no font CDN) |
| vite, @vitejs/plugin-react, typescript, vite-plugin-pwa, vitest | Build, PWA, tests (required stack) |
| fake-indexeddb (dev) | Runs the real Dexie schema in tests for the export/import round trip |
| eslint, @eslint/js, typescript-eslint, eslint-plugin-react-hooks, globals (dev) | `npm run lint` |

No router, UI kit, or state library: hash routing is 20 lines (`src/lib/router.ts`), styling is plain CSS variables.

## Architecture

```
src/
  ai/           client.ts (the only API gateway), prompts.ts, schemas.ts (zod), structured.ts (validate → repair once → raw), tutor.ts, context.ts
  curriculum/   syllabus.ts (122 entries), foundations-a/b.ts + level1-*.ts (37 written lessons), types.ts
  masters/      masters.ts (20), epigraphs.ts
  data/         db.ts (Dexie schema + seed), drafts.ts (autosave, word log, versions), backup.ts (JSON + Markdown ZIP), types.ts
  lib/          streak.ts, scheduler.ts, words.ts, dates.ts, settings.ts, ics.ts, router.ts, Field.tsx
  features/     today, session, editor, lessons, library, studio, archive, settings, onboarding
  styles/       global.css
```

Domain logic (`lib/`, `data/`, `ai/`, `curriculum/`) has no React imports except the settings hook, so it can move into another app (e.g. FORGE) as plain modules.

## Assumptions

1. **Structured feedback uses `output_config.format` (JSON schema), not forced tool use.** Current docs: forcing `tool_choice` returns HTTP 400 on Sonnet 5.5 and Opus 5.5. Structured outputs give the same guarantee. Zod still validates, one repair call follows a failure, then the raw text is shown.
2. **Refusal fallback is on** for Sonnet/Opus (`fallbacks: "default"` with the `server-side-fallback-2026-07-01` beta), so a safety-classifier false positive is retried server-side on another model. Haiku has no server-side fallback. Remove it in `src/ai/client.ts` if unwanted.
3. Thinking is left adaptive (Opus 5.5 cannot disable it). Effort: `medium` for feedback, `low` for chat, lesson generation and repairs.
4. The "first 14 days fixed at Foundations" means the first 14 *completed lessons*, so a missed day never skips a lesson.
5. A day counts for the streak at **100 words added** that day (across any writing). Deleting never subtracts. Weeks run Monday–Sunday; one missed day per week is a rest; a second breaks the streak; today never breaks it.
6. "Words written" counts positive deltas on save. Draft 2's prefilled copy of Draft 1 does not count; only what you add does.
7. The rolling summary of the last 10 sessions is computed (lesson, average score, tags, revision outcome, reflection), not generated: zero cost, offline.
8. Weakness Profile = tag counts over the last 20 feedback rounds. A tag is "recurring" at 3+. Written lessons get a micro-constraint from a fixed map; generated lessons get one written by the Tutor.
9. Without a key, the Feedback step becomes a self-check (rubric self-scores plus your own priority #1) so revision stays mandatory and meaningful.
10. Sunday review picks the oldest untouched Draft 1/Draft 2/freewrite that is 3+ days old, 50+ words, and not reviewed before. If none exist, a lesson runs instead.
11. Friday (Long Project) opens the Studio's Daily 500 instead of a lesson. Saturday long-form cycles fiction → essay → novel → screenwriting → philosophy → compression, at 800–1,500 words.
12. Ungenerated lessons start generating automatically when a session opens on them (with a key). Without a key you can still do the exercise from the syllabus entry's objective and seed; the app says so plainly.
13. Settings live in localStorage and are included in the JSON backup; the API key is stored separately and never exported.
14. Cost estimates use list prices per million tokens: Haiku 5.5 $0.10/$0.50, Sonnet 5.5 $2/$10, Opus 5.5 $4/$20.
15. Model passages are public domain in the US: Garnett, Maude, Long, Trotter and Zimmern translations, the KJV, and works published before 1930 (including *A Farewell to Arms*, "Hills Like White Elephants", and *Mrs Dalloway*). Status differs in other countries.
16. UI sans-serif is the system font stack (nothing to download); Literata is used for reading and the editor.
17. Versions are snapshotted at most every 2 minutes while typing, plus on blur, tab hide and leaving the page; 20 kept per draft.

## Known limits

- **Live API calls were not exercised during the build** (no key was available). Request shapes follow the installed SDK's types and the current docs; the parsing, repair and fallback logic is unit-tested with a mocked model. The no-key and offline paths were checked in a browser. Check one feedback round on first use.
- Model passages were transcribed from well-known public-domain texts; spot-check them against Project Gutenberg if exact wording matters to you.
- Single-device: no sync. Back up from the Archive; restoring replaces everything.
- Structured feedback shows a "Reading your draft…" state rather than streaming tokens (partial JSON isn't readable). Chat streams.
- Archive search is an in-memory substring match (fine for thousands of drafts).
- Daily reminders are an `.ics` calendar file only, by design (no push server).
- Browsers may decline `navigator.storage.persist()`; the Archive shows the status.
- Main bundle is ~270 kB gzipped (React, Dexie, zod, Markdown, lesson text); the SDK (~80 kB) loads on first mentor call.
- `npm audit` reports moderate/low advisories in build-time tooling only (typescript-eslint, workbox-build); `npm audit --omit=dev` is clean.
- Not built (stretch): Cloudflare Worker proxy, spaced repetition of techniques, weekly review report.
