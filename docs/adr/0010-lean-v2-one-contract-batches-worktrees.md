# 0010 · Lean v2: one contract, batches, parallel worktrees

## Status
Accepted (Joe, October 1, 2026, after P0.2). Amendment A10. Supersedes the per-unit cadence of amendment A9 and of ADR 0008; the rest of ADR 0008 stands.

## Context
Phase 0 ran one human gate per small step: plan, red test, build, verify, commit approval, pull request. It caught real problems (eight logged failures, three RCAs, one history clean-up before anything reached GitHub). But most stops were approvals of steps already agreed in the plan, and the remaining work must finish tonight. The rest of the build is already pinned down: schemas, formulas, the worked example, the answer keys and the edge cases fix the expected answers in advance. Local git hooks and permission settings now enforce the security rules (secrets, private files, protected branch, no history rewrites, no bypassing checks) without a manual check.

## Decision
- **One contract.** Joe approves a single one-page contract: exact expected answers, each tied to a line of the product spec; the shared schema built first; branch names; a "done when" per batch.
- **Batches, not units.** Phase 0 (test and typecheck scripts with CI, then deploy), Batch A (calc, schema, red flag rules), Batch B (manual path, site walk, confirm step), Batch C (AI extraction, mocked in tests). Units inside a batch run in parallel git worktrees where they don't depend on each other. One pull request per batch.
- **Kept from the full loop:** tests are written first and must fail first; both reviewers (standards and spec) run on every batch, in parallel; CI must be green; Joe approves every push and makes every merge; every failure gets a log row before the fix.
- **Cut:** the per-unit plan gate; the known-bad check except for the calculator; the manual private-name grep (the hooks enforce it); per-unit document updates (progress and prompt log are updated once per batch); per-screen design checks (one check of every screen against its board at the end, on the live URL, at 375 px and 1280 px). The test-harness step folds into the CI step, the optional pre-commit step is dropped, and the edge-case tests fold into the calculator and schema tests.
- **Escalation.** The agent retries a failure up to three times, then asks Joe. It also asks on spec ambiguity, scope change, anything security or private-file related, before every push and before any history change.
- **Definition of Done** engine line becomes: "Every unit merged after Joe verified its evidence."

Rejected: keeping the per-step gates (would not finish tonight; most stops were rubber stamps); a fully autonomous build with no contract approval (loses the human control this project is graded on).

## Consequences
- Easier: much faster progress; Joe's attention goes to the contract, failures, pushes and merges.
- Harder: fewer, larger reviews, so each batch summary must give the tests, reviewer verdicts, CI result and decisions clearly enough that Joe can explain every part at the gate. Parallel worktrees can conflict; screen units share the page, so Batch B merges its parts in a fixed order.
- Lost: the per-unit "red confirmed" record and per-screen design check. The batch summary records the red output instead, and the end-of-build design check covers every screen.
- Edge cases that need the live model (wrong document type, injection, consistency) can't be proven by mocked tests. They are run once against the live URL and recorded in the Trustworthy-AI lens.
- The evidence of control stays public: the contract, one PR per batch with CI and Joe's merge, the failure log, RCAs, ADRs and the prompt log.
