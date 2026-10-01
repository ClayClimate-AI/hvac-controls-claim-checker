# 0006 · Gaps exposed by the sample proposals: flag them, don't add math

## Status
Accepted (C0, October 1, 2026).

## Context
The fictional sample proposals (`samples/`) exposed five gaps between realistic proposals and the schema: recurring software fees (P02, P05), savings stated only in kWh (P04), gross vs net price after incentives (P03, P06), watts per controller instead of a total (P04), and marketing figures ("up to 30%", "typical customer sees 12%") instead of a claim for this building (P03).

## Decision
Option (a) for all five: keep `ProposalSchema` small and surface each gap instead of computing with it.

1. Recurring fees: not in payback. Covered by the "Always ask" question on recurring fees.
2. kWh-only savings: percent stays null; the new `missingClaimPct` red flag fires.
3. Gross vs net: payback uses the gross price. A rebate isn't money until it's approved and paid. Covered by the "Always ask" question on incentives.
4. Watts per controller: null unless a total is stated; `missingDevicePower` fires.
5. Marketing figures: null for this building; `missingClaimPct` fires.

Two additions were needed because option (a) could not run as written: rules can only flag what the schema captures. So: a `missingClaimPct` rule, and an "Always ask" list of two fixed questions (fees, incentives), shown apart from red flags so the control case P02 still shows zero red flags.

Every answer key in `samples/BRIEF.md` now has one expected value per field (one expected answer per test).

Rejected: adding `annualFeeUsd`, `claimedSavingsKwh`, a controller count or a "not building specific" marker. Each adds a field the AI could get wrong, more math and more tests, on gate day.

## Consequences
Fewer fields means fewer chances for a confident wrong number on screen. Known limit: payback ignores recurring fees, so it looks better than reality when a subscription exists. The "Always ask" fee question is what keeps that honest. Re-open for Phase 2 if real proposals show the gaps are common.
