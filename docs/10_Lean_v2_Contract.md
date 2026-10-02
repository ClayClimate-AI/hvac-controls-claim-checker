# 10 · Lean v2 contract (ADR 0010, amendment A10)

One approval covers the rest of the build. "S:n" = line n of `docs/02_Specification.md`. Every test below is written first and must fail first.

**Approved by Joe, 2026-10-02**, with: PR branches `feat/batch-a`, `feat/batch-b` and `feat/extract` (unit branches keep their `docs/05` names); Batch B test-first for the pure helpers plus one confirm-rule helper test; live edge cases run at the end on the live URL, with results recorded in the prompt log and `progress.md`; ADR 0010, this contract, the `progress.md` changes and the `docs/05` Mode update go in the Phase 0 batch commit.

## Order and branches

| Batch | Units (branch from `docs/05`) | PR branch | Done when |
|---|---|---|---|
| Phase 0 | P0.3 folded into P0.4: `typecheck` + `test` + `gate` scripts, Vitest, GitHub Actions; then P0.5 Vercel | `chore/phase-0` | `npm run gate` exits 0; CI green on push and PR; Joe merges; Joe adds `ANTHROPIC_API_KEY` on Vercel; live URL returns 200 |
| A | U2 schema **first** (`feat/schema`), then U1 calc (`feat/calc`) and U6 rules (`feat/red-flags`) in parallel worktrees | `feat/batch-a` | All A tests green; calc known-bad shown failing; both reviewers PASS; CI green; Joe merges |
| B | U3 manual path (`feat/manual-path`) → U7 site walk (`feat/site`) → U5 confirm (`feat/confirm`), in that order (they share the page) | `feat/batch-b` | B tests green; P01 typed by hand shows the worked example on screen; reviewers PASS; CI green; Joe merges |
| C | U4 AI extract (`feat/extract`), model mocked in tests | `feat/extract` | C tests green; reviewers PASS; CI green; Joe merges |
| End | Design check (all boards, live URL, 375 px and 1280 px); live edge cases | — | Joe's check recorded; lens "Actual" column filled |

## Shared schema (built first in Batch A)

`lib/schema.ts` exactly as S:42 to S:69: `RequestSchema`, `ProposalSchema`, `SiteConditionsSchema`, types `Proposal` and `SiteConditions`. Fixtures in `test/fixtures/`: the P01 and P02 answer keys (`samples/BRIEF.md` §4) as typed `Proposal` objects. Changing a field after Batch A is a scope change: ask Joe.

## Acceptance tests (exact answers)

**Calc (U1)**: plain TypeScript; exact numbers out, rounding only on screen (S:117)
- P01 (1,200,000 kWh, 45%, $0.10, $24,000, 18%, schedules yes, fans no, maintenance over 24 months, watts null): HVAC 540,000 kWh (S:84, S:133). Vendor 18%, 97,200 kWh, $9,720, payback 2.469. Adjusted 13.5%, 72,900, $7,290, 3.292. Conservative 10.8%, 58,320, $5,832, 4.115 (S:129 to S:131).
- Site-walk cut: schedules no → 0; yes + no → 0.25; yes + yes → 0.50; unknown on either (schedules not "no") → 0.25 plus the note "Fan behavior unknown. Ask your tech to check on the next site walk." (S:99 to S:102)
- Maintenance cut: `over_24_months` → 0.20; anything else, including `unknown` → 0 (S:108, S:109)
- Overhead: watts null → 0 kWh (S:88, S:118); 50 W → 438 kWh (S:88)
- Payback: net ≤ 0 or rate 0 → "Never", never Infinity or negative (S:119); price null → "Not stated" (S:120); gross price only (S:121)
- Invariant: conservative ≤ adjusted ≤ vendor
- **Known-bad:** with the maintenance cut wrongly applied to the vendor case, the P01 test must fail

**Schema (U2)**, with edge cases 1, 2, 3, 9, 10 folded in
- P01 fixture passes. Fail: `claimedSavingsPct` 150 (S:47; edge 9); `"18"` as text; missing `sourceQuotes` (S:55)
- `RequestSchema`: empty or 50 characters → "Paste the full proposal"; 60,000 characters → "Too long; paste the savings section" (S:43; edges 1 to 3)
- `SiteConditionsSchema`: `hvacSharePct` 0 or 100 rejected (S:60; edge 10)

**Rules (U6)**
- P01 → `missingMandV`, `missingWeather`, `missingBaseline`, `missingDevicePower`, plus the `maintenanceOverdue` note (S:141 to S:144, S:147, S:150)
- P02 → zero flags (S:150)
- `missingClaimPct` fires only when `claimedSavingsPct` is null (S:146). `savingsScopeUnclear` only on `not_stated` (S:145)
- `missingBaseline` question includes "18%" for P01 (S:143)
- "Always ask" shows both questions on every result, never counted as flags (S:152 to S:158)

**Manual path, site walk, confirm (Batch B)**: pure helpers unit-tested (display rounding, form-to-`SiteConditions` mapping); screens checked by Joe at the end
- Display: 18.0% / 97,200 / $9,720 / 2.5 years; 13.5% / 72,900 / $7,290 / 3.3; 10.8% / 58,320 / $5,832 / 4.1 (S:117, S:129 to S:131, S:195)
- Schedules = No → adjusted equals vendor (S:99). Changing an assumption recalculates all three cases (S:198)
- Every value shows its quote or "Not stated" (S:196); no number reaches Results without the confirm step (S:197)
- Confirm-rule helper test: the confirmed claim changed from 18% to 15% changes the calc result (vendor 15.0%, 81,000 kWh, $8,100 for P01 site conditions) (S:196, S:197; `samples/BRIEF.md` U5 check)

**AI extract (U4)**: `extract` mocked; tests never call the API
- Valid → 200 with the P01 fixture (S:165). Empty or X02 → 400, model not called (S:166, S:199). Malformed reply → 422 "The proposal could not be read. Try pasting just the savings section." (S:167, S:200). Thrown error → 502 "The reading service is busy. Try again in a minute." (S:168)
- A logging spy never receives the proposal text (S:172, S:203). Build output contains no `sk-ant` (S:201)

**Live edge cases at the end** (need the real model; Joe pastes on the live URL, the Agent records the results in the lens, the prompt log and `progress.md`): P01 (edge 4), X01 recipe all null (5), P03 percent null (6), P04 percent null (7), P05 15% not 40 (8), P01 five times (11)

## Each batch
Tests first, failing first. Build. Both reviewers in parallel. One summary (tests, reviewers, CI). The Agent asks before the push; Joe merges. Up to 3 retries before asking. Every failure gets a log row.
