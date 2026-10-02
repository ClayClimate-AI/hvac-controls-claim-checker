# RCA-004 · Typecheck passed locally only because of stale build output

| Field | Value |
|---|---|
| Date | 2026-10-02 |
| Unit | Phase 0 batch (P0.4 CI) |
| Failure log row | progress.md #10 |
| Severity | High (escaped the local gate; CI caught it) |
| Caught by | CI (first run, PR #1) |
| Should have been caught by | The local gate, run from a clean checkout |

## 1. Symptom
The first GitHub Actions run failed on both the push and the pull request at `npm run typecheck`: `app/layout.tsx(20,50): error TS2304: Cannot find name 'LayoutProps'.` (exit code 2). Locally, `npm run typecheck` and `npm run gate` had both exited 0.

## 2. Impact
Nothing reached `main`, and no facility manager would see it: CI blocked the merge, as required (ADR 0008). The cost is trust in the local gate. A green local gate that CI then fails means "the gate passed" was not evidence on its own.

## 3. Timeline
- Detected: 2026-10-02, first CI run on PR #1
- Logged (before any fix): 2026-10-02, Failure log row 10
- Fixed: 2026-10-02, `typecheck` script now runs `next typegen` first; red reproduced and then green in a clean clone (typecheck, CI-mode gate and build all exit 0)
- Verified by Joe:

## 4. Five whys
1. Why did CI fail? `tsc --noEmit` couldn't find `LayoutProps`, which `app/layout.tsx` uses.
2. Why couldn't it? `LayoutProps` is a global type Next.js 16 generates into `.next/types` during `next dev`, `next build` or `next typegen` (bundled docs: `01-app/01-getting-started/03-layouts-and-pages.md`). CI starts from a clean checkout, so there is no `.next`, and the typecheck runs before the build.
3. Why did it pass locally? A `.next` folder left over from earlier `npm run build` runs supplied the generated types.
4. Why didn't the local check notice? The local gate ran in a working copy full of build output, never in a clean checkout like CI's.
5. Why was the script written that way? The Agent wrote `"typecheck": "tsc --noEmit"` from the reference snippet without checking the Next.js 16 docs for generated types. → **Root cause:** the `typecheck` script depended on a side effect of other commands (generated route types) instead of producing what it needs, and nothing tested it from a clean state.

## 5. Root cause category
- [ ] Spec gap (the contract didn't cover it) → amendment required
- [x] AI output (model or coding agent produced it) → prompt log row required (B10)
- [ ] My code
- [x] Test gap (a check existed but couldn't fail on this locally)
- [x] Environment or dependency
- [ ] Design mismatch

## 6. Fix
`package.json`: `"typecheck": "next typegen && tsc --noEmit"`. Red reproduced in a clean clone (`TS2304`, exit 2), then green (typecheck 0, CI-mode gate 0, build 0). Commit: the fix commit on `chore/phase-0` (PR #1).

## 7. Prevention (must change the system) — proposed, awaiting Joe
- **The script itself:** `typecheck` now generates the types it needs, so it gives the same answer from a clean checkout as from a used one (`package.json`).
- **Rule** (private build method, kept local): before asking to push a batch, run the CI sequence once in a clean clone of the branch (`git clone`, `npm ci`, `CI=true npm run gate`, `npm run build`) in the scratchpad.

## 8. Links
- ADR: none
- Amendment: none
- Prompt log row: `docs/prompt_log.md` B10
- Commit:
