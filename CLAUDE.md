# Marginalia — notes for Claude

Daily writing tutor PWA. Vite + React 19 + TypeScript (strict, `noUncheckedIndexedAccess`), Dexie, zod, plain CSS. Spec: `PROMPT.md` (local only, git-ignored; it may be absent). Plan: `PLAN.md`. User docs, assumptions and known limits: `README.md`.

## Commands

- `npm run dev` / `npm run build` / `npm run lint` / `npm test` / `npm run preview`
- All three of build, lint and test must pass before committing.

## Map

- `src/ai/client.ts` is the **only** place that talks to the Anthropic API (SDK lazy-imported, `dangerouslyAllowBrowser`). Errors are normalized to `AiError` with readable messages.
- Structured output: `output_config.format` from zod via `zodOutputFormat`, then `getStructured` (validate → one repair → raw fallback). Forced `tool_choice` is a 400 on Sonnet/Opus 5.5; don't use it.
- `src/ai/prompts.ts` holds the persona and task prompts. The Tutor never writes the student's prose.
- `src/data/db.ts`: Dexie schema v1 + first-run seed (novel project, reading log). Bump the version and add an upgrade if the schema changes.
- `src/data/drafts.ts`: `saveDraftText` is the single write path for writing. It logs positive word deltas to `wordLog` (streak/stats source) and snapshots versions (max 20).
- `src/lib/scheduler.ts` (rotation) and `src/lib/streak.ts` are pure and unit-tested; keep them free of React and Dexie.
- `src/features/session/Session.tsx`: the step machine (warmup → lesson → study → draft → feedback → revise → reflect → done). Session drafts are created once via `ensureDraft`; read their ids from the live session row.
- Curriculum: `src/curriculum/syllabus.ts` (rows per track), 37 written lessons in `foundations-*.ts` and `level1-*.ts` (a test requires every level-1 entry to have one). Some model passages are labelled original demonstrations where no public-domain text fit.

## Conventions

- Hash routes (`#/archive/:id`), see `src/lib/router.ts`.
- Inputs bound to Dexie rows use `src/lib/Field.tsx` (local state, so live queries don't move the cursor).
- Colors are CSS variables in `src/styles/global.css`; one accent. No emoji, badges or confetti anywhere, including UI copy.
- In JSX text, type real characters (’ —), not `\u` escapes; escapes only work inside JS strings.
- Copyright: original lesson prose; public-domain passages only; describe in-copyright authors in your own words.
- localStorage access goes through the guarded helpers in `src/lib/settings.ts`.
