# progress.md · living state

> Single source of "where am I?". Updated at every gate, never at the end. Mirrors the git history in readable form. Resume steps: private build method (kept local).

## Snapshot

| Field | Value |
|---|---|
| Stage | **C0 passed. Phase 0 next (Gate mode)** |
| Current unit | P0.1 Scaffold + bubble |
| Current checkpoint | C1 for P0.1 (not yet presented) |
| Last commit | C0 commit on `main` (the only direct commit to `main`) |
| CI | Not wired yet (Phase 0, P0.4) |
| Live URL | Not deployed yet (Phase 0, P0.5) |
| Schedule | Grill + C0 5:45 to 7:00 · Phase 0 7:00 to 8:15 · U1 8:15 · U2 8:45 · U3 9:15 to 10:15 · U4 only if on schedule at 10:15 · **code freeze 11:00** · present 12:00 |
| Next single action | The Agent presents the P0.1 P-I-O-F and branch `chore/phase-0` for C1 approval. |
| Last updated | 2026-10-01, C0 |

## Step 0 · P-I-O-F for the whole project (confirmed at C0, 2026-10-01)

- **Purpose:** Give facility managers a fast, honest check on AI HVAC controller savings claims before they spend $15K to $30K, and show the Phase 1 gate that Joe stays in control of AI (Fluency, Control, Responsible use, Communication).
- **Inputs:** The vendor proposal text (pasted); the manager's site conditions (annual kWh, HVAC share, rate, maintenance, schedules, fan behavior, city); Joe's assumption values; the docs in `docs/`; the Claude API.
- **Outputs:** A deployed web app (live URL) and GitHub repo; three savings cases; red flags as questions; `docs/prompt_log.md`; `docs/04_Trustworthy_AI_Lens.md` with real results; `reflections.md`; a two-minute presentation.
- **Flow:** Paste → server validates → Claude extracts values with source sentences → server and browser validate → manager confirms → site conditions → rules and plain math → results. Full diagrams in `docs/03_Architecture.md`.

### Mode

**Gate mode.** The gate is today (Thursday, October 1, 2026, presentation at 12:00). Phase 0 runs P0.1 to P0.5 (P0.6 pre-commit skipped). Units U1, U2, U3 in that order (U2 is never skipped: the schema validates every entry point, including the manual path), then U4 to U6 as time allows, then U8-lite (five edge cases, lens). Fallback cut points: **U3** minimum safe demo (no AI), then **U4**, then **U6**. All gates still apply; only scope shrinks.

### Scope

- **In:** F1 to F9 in `docs/02_Specification.md` section 1. In Gate mode, F4 is met in basic form by U3 (site inputs the math needs); the polished site form (U7) sits after the cut line.
- **Stretch:** F10 PDF upload.
- **Out:** web fetching, accounts, database, weather normalization math, streaming, chat, component test framework, multi-agent crew, new schema fields for fees, kWh-only savings, incentives or controller counts (ADR 0006).

### Assumptions (resolved at C0)

1. Submission is the GitHub repo **and** the live URL, plus the live presentation. The repo stays private while building; at submission Joe makes it public or adds the instructor.
2. Planning prompts count in the Prompt Log: **pending, instructor's answer.** The log is kept either way.
3. The placeholder 25% and 20% are replaced by Joe's values: site-walk cuts 0% / 25% / 50% (unknown → 25%) and maintenance over 24 months → 20% (ADR 0005).
4. Gate date: Thursday, October 1, 2026, 12:00. Gate mode.

## Definition of Done (confirmed at C0, 2026-10-01)

Assignment:

- [ ] Real problem for a named community, stated in one sentence (facility managers)
- [ ] Working AI-powered solution: GitHub repo (public or shared with the instructor at submission) + live URL
- [ ] Fluency: Prompt Log shows advanced prompting and Joe's judgments
- [ ] Control: scoped; Joe can explain every part; Prompt Log complete; AI mistakes caught and logged
- [ ] Responsible use: Map, Measure, Manage written with real test results, failures included; one failure mode named
- [ ] Communication: two-minute presentation rehearsed; likely questions prepared; backup demo video

Spec (`docs/02_Specification.md` section 8):

- [ ] Sample proposal produces the worked example numbers exactly
- [ ] Every extracted value shows its source sentence or "Not stated"
- [ ] No number reaches Results without the confirm step
- [ ] Changing an assumption recalculates all three cases
- [ ] Empty input returns 400 without calling the model
- [ ] Wrong-shape reply returns 422 with a plain message
- [ ] API key never in browser traffic or client bundle
- [ ] Works at 375 px width with no sideways scroll
- [ ] Paste screen says where the text goes; the server never logs the proposal text

Design (`docs/06_Design.md`, `docs/design/`):

- [ ] Every screen built matches its board in structure, copy and Field Instrument tokens (Joe checked at 375 px and 1280 px)
- [ ] Loading, empty and error states built as in board 05
- [ ] Interaction specs built, each with a reduced-motion version

Engine:

- [ ] Every unit merged through a pull request after Joe verified it; CI green on every PR and on `main`
- [ ] `reflections.md` complete (C4)

## Unit log

Status values: `pending` → `planned (C1)` → `red confirmed` (failing test output recorded) → `verified (C2)` → `PR open` → `merged`. One verified unit = one commit on its branch = one pull request.

| Unit | Name | Done when | Branch | Status | Commit | PR | CI |
|---|---|---|---|---|---|---|---|
| P0.1 | Scaffold + bubble | Next.js app runs locally; `.nvmrc` committed | `chore/phase-0` | pending | | | |
| P0.2 | Deps + setup gate | `npm run gate:setup` exits 0; exits 1 with `EXTRA_REQUIRED=not-a-real-package` | `chore/phase-0` | pending | | | |
| P0.3 | Test harness | Vitest runs; a deliberately failing sanity test fails, then is removed | `chore/phase-0` | pending | | | |
| P0.4 | CI Tier 1 | Actions workflow green on push and pull request | `chore/phase-0` | pending | | | |
| P0.5 | Deploy | Vercel URL serves the scaffold; env var set on Vercel | `chore/phase-0` | pending | | | |
| P0.6 | Pre-commit (optional) | Skipped in Gate mode | | skipped | | | |
| U1 | `calc.ts` | Worked example passes; site-walk levels, rounding and payback edge cases tested | `feat/calc` | pending | | | |
| U2 | `schema.ts` | Valid passes; over-range, wrong type, missing quotes fail; `SiteConditionsSchema` with schedules and fans | `feat/schema` | pending | | | |
| U3 | Manual path | Typed values, including site inputs, show three cases on screen | `feat/manual-path` | pending | | | |
| U4 | `/api/extract` | Sample returns valid Proposal; empty → 400; bad shape → 422; proposal text never logged | `feat/extract` | pending | | | |
| U5 | Confirm step | Each value shows source sentence; editing changes results | `feat/confirm` | pending | | | |
| U6 | Red flag rules | P01 shows four flags + maintenance note; P02 none; "Always ask" list shown | `feat/red-flags` | pending | | | |
| **Cut line** | | If behind, stop here; U7 and U8 become "next steps" (U8-lite still runs) | | | | | |
| U7 | Polished site form + assumptions | Form asks only for gaps; assumptions editable | `feat/site` | pending | | | |
| U8 | Edge cases + v1.0 | Gate mode: five cases run, lens filled, deps diffed, tag v1.0 | `chore/edge-cases` | pending | | | |
| C4 | Reflection | `reflections.md` complete | | pending | | | |

Phase 0 items share one branch, `chore/phase-0`, as named in `docs/05_Build_Plan.md`.

### Per-unit P-I-O-F (written at C1, one block per unit)

_Empty until the first C1._

## Failure log (write BEFORE fixing)

| # | When | Unit | Symptom (raw) | Caught by | Cause | Fix | RCA | ADR | AI-caused? |
|---|---|---|---|---|---|---|---|---|---|

## Amendments (changes to the C0 contract)

| # | When | What changed | Why | Docs changed | Joe approved |
|---|---|---|---|---|---|
| A1 | 2026-10-01 C0 | Site-walk discounts: `existingControls` replaced by schedules and fan questions; cuts 0% / 25% / 50%, unknown → 25% + note; maintenance over 24 months → 20%, unknown → 0% | Most controller savings come from fan control (PNNL); "has a BAS" can't tell whether the fan waste is still there | 02, 04, 05, 06, design boards, BRIEF, 07, 08, 09 | Yes (grill Q1 to Q3) |
| A2 | 2026-10-01 C0 | Sample gaps: option (a) for fees, kWh-only, gross vs net, per-controller watts, marketing figures; new `missingClaimPct` rule and "Always ask" list | Keep the schema small; a guess becomes a confident wrong number on screen | 02, 04, BRIEF | Yes (grill Q4, 9.6, 9.7) |
| A3 | 2026-10-01 C0 | Confidentiality notice; proposal text never logged or stored; provider-agnostic design | Text leaves the manager's computer | 02, 03, 04, 06 | Yes (grill Q5) |
| A4 | 2026-10-01 C0 | Branch and pull request per unit; Joe merges; CI required; Branch and PR columns | `main` always works and deploys the demo; approval becomes visible | 05, progress, README | Yes (grill Q7) |
| A5 | 2026-10-01 C0 | Build method kept private; public links replaced; README "How this was built" | Joe's intellectual property; public repo shows the evidence instead | README, progress, 05, 08, 09, prompt_log | Yes (grill Q8) |
| A6 | 2026-10-01 C0 | Math rules: display-only rounding, null device power = 0 W, payback "Never" / "Not stated", `missingBaseline` uses the real claim | U1 tests need exact rules | 02, 04 | Yes (9.1 to 9.4) |
| A7 | 2026-10-01 C0 | One expected answer per test: P03 percent and price null, P04 watts and weather null, P05 verification null, X01 all null (200); edge-case table aligned to the answer keys | A test with two right answers can't fail cleanly | 04, BRIEF | Yes (9.5 with change) |
| A8 | 2026-10-01 C0 | Gate mode; U3 includes the site inputs; repo private until submission; doc paths fixed; 400 for too-short text | Gate is today; F4 must survive the cut line | 03, 05, 08, 09, README, progress | Yes |

## Root cause analyses (RCA index)

Each RCA names a prevention that changes the system.

| RCA | Title | Unit | Category | Prevention (file) | Status |
|---|---|---|---|---|---|

## Decisions (ADR index)

| ADR | Title | Status |
|---|---|---|
| 0001 | Next.js + TypeScript stack over Python + Streamlit | Accepted (planning) |
| 0002 | Claude as the single provider; structured output with `generateText` + `Output.object` | Accepted (planning); refined by 0007 |
| 0003 | No AI in math or rules; human confirms every extracted value | Accepted (planning) |
| 0004 | Paste text only; no fetching proposals from the web in Phase 1 | Accepted (planning) |
| 0005 | Site-walk discounts: schedules and fan behavior, not "has a BAS" | Accepted (C0) |
| 0006 | Gaps exposed by the sample proposals: flag them, don't add math | Accepted (C0) |
| 0007 | Confidentiality notice, nothing stored, provider-agnostic design | Accepted (C0) |
| 0008 | One branch and pull request per unit; CI required | Accepted (C0) |
| 0009 | The build method stays private; its evidence is public | Accepted (C0) |
