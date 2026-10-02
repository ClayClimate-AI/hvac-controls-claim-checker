# 05 · Build plan

Principle: **every step ends in a state that works, and you can prove it works.** Build in vertical slices. `main` always deploys.

## Units

Slice 0 is **Phase 0** in the Build Engine (P0.1 to P0.6). Slices 1 to 8 are **units U1 to U8**. Each unit runs the Builder Loop: P-I-O-F, C1, test first, implement, Joe runs it, C2 or C3, then a pull request Joe merges. The Status column is updated once per batch (Lean v2, amendment A10).

**Mode: Lean v2** (amendment A10, ADR 0010; contract in `docs/10_Lean_v2_Contract.md`). One contract approval replaces the per-unit C1. Work runs in batches, one pull request each: Phase 0 (P0.3 folded into P0.4, then P0.5; P0.6 dropped, local git hooks cover it) on `chore/phase-0`; Batch A (U2 schema first, then U1 calc and U6 rules in parallel worktrees) on `feat/batch-a`; Batch B (U3, U7, U5 in that order) on `feat/batch-b`; Batch C (U4) on `feat/extract`. Unit branches keep the names in the table below. Tests are written first and fail first; known-bad check for calc only; both reviewers run once per batch; Joe approves every push and merges every PR. U4 is part of the product (D4), never optional. U8's edge-case tests fold into the calc and schema tests; the live-model edge cases and the design check run once at the end on the live URL.

*Superseded:* Full mode (amendment A9), one full loop per unit.

| # | Unit | Done when | How Joe verifies | Branch | Status |
|---|---|---|---|---|---|
| P0 | Phase 0: scaffold, bubble, setup gate, Vitest, CI, deploy | Scaffold live on Vercel; `npm run gate` exits 0; CI green | Open the Vercel URL; run the gate; see the Actions check | `chore/phase-0` | in progress (P0.1, P0.2 committed; P0.3/P0.4 built, CI pending push; P0.5 next) |
| U1 | `calc.ts` with tests | Worked example numbers pass; invariants tested | `npm test` green, read the numbers | `feat/calc` | pending |
| U2 | `schema.ts` with tests | Valid passes, bad shapes fail | `npm test` green | `feat/schema` | pending |
| U3 | Manual path | Typed values, including the site inputs the math needs (kWh, HVAC share, rate, maintenance, schedules, fans, price, claim), produce the three cases on screen, validated by `SiteConditionsSchema` | Type the P01 values by hand, compare to the worked example | `feat/manual-path` | pending |
| U4 | `/api/extract` | Sample returns valid `Proposal` JSON; empty returns 400; bad shape 422 | Page or curl; network tab shows no key | `feat/extract` | pending |
| U5 | Confirm step | Each value shows its source sentence and is editable | Paste sample, edit 18 to 15, results change | `feat/confirm` | pending |
| U6 | Red flag rules | Sample shows four flags + maintenance note | `rules.test.ts` green, visual check | `feat/red-flags` | pending |
| **Cut line** | | **Emergency fallback only, not the plan.** Used only if something outside the build stops work; then U7 and U8 become "next steps" in the presentation. U3 already covers the site inputs the math needs, so F4 is met in basic form. | | | |
| U7 | Polished site form and editable assumptions | Site form asks only for gaps; assumptions editable | Set "runs on schedules" to No: adjusted equals vendor | `feat/site` | pending |
| U8 | Edge-case run, then tag v1.0 | Edge-case tests folded into the calc and schema tests (A10); live-model cases run at the end on the live URL and written into the lens; deps diffed; tag v1.0 | `04_Trustworthy_AI_Lens.md` filled in | `chore/edge-cases` | folded (A10); end steps pending |

U3 comes before the AI on purpose: it proves the math and the screens work without any model, so if the API has problems on gate day the demo still has a working core.

## Commits

One logical change, tests passing, described in one line. Examples:

```
feat(calc): add vendor, adjusted and conservative cases
test(calc): cover worked example from spec
feat(api): add /api/extract with RequestSchema check
fix(extract): return null instead of 0 for missing device power
docs(prompt-log): record generateObject correction
```

## Tests (Vitest)

| File | What it covers |
|---|---|
| `lib/calc.test.ts` | Worked example, zero rate, null device power, zero savings |
| `lib/rules.test.ts` | Each rule fires on the sample, stays quiet on a complete proposal |
| `lib/schema.test.ts` | Valid passes; over-range percent, wrong type, missing quotes fail |

Pure logic gets tests first (red, green, refactor). UI and the AI call get manual checks written down in the slice notes.

CI (GitHub Actions) is **required** (ADR 0008). It runs on every push and pull request, and a pull request merges only when CI is green.

## Branches and pull requests (ADR 0008)

1. The C0 commit is the only direct commit to `main`.
2. Each unit gets the branch named in the table above, created from an up-to-date `main` after C1 approval. The Agent asks before creating, merging or deleting any branch.
3. At C2 the unit is committed on its branch and pushed. CI runs and Vercel builds a preview link.
4. The Agent drafts the pull request title and description (Unit, Tested, Validated, Docs, Refs). Joe opens it, checks CI is green, compares the preview to the design board, and merges with **Squash and merge**. The Agent never merges.
5. After the merge: switch to `main`, pull, confirm the branch is deleted, record the PR number in `progress.md`.

## Order

Phase 0, then U1 to U8 in the order of the table above. No time windows on any unit.

## Using Claude Code (Matt Pocock skills)

| Skill | Use here |
|---|---|
| `/grill-me` | Step 0, before C0: question the existing docs for gaps |
| `/to-spec` | Already done in `02_Specification.md`; use to refresh if scope changes |
| `/to-tickets` | Turn the slice table into tickets |
| `/tdd` | Slices 1, 2, 6 |
| `/implement` | Slices 3 to 5, 7, one ticket at a time |
| `/code-review` | Before merging each branch |

Log each skill run that changes a decision in `prompt_log.md`.

## Is this overkill?

Small project, solo, short-lived code, but a wrong number could cost real money. So: tests on the math and rules (where harm lives), one branch and pull request per unit, no code reviews by others, CI required, planning time-boxed.
