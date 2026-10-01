# 0008 · One branch and pull request per unit; CI required

## Status
Accepted (C0, October 1, 2026). Decided in planning (prompt log E1) but missing from the operating rules until C0.

## Context
The build plan named a branch per unit, but the operating rules committed and pushed straight to `main`, with no merge step and CI marked optional in one doc and kept in another. Vercel deploys `main` to the live URL, which is the demo on gate day.

## Decision
- The C0 commit is the only direct commit to `main`.
- Each unit gets its branch from the build plan, created from an up-to-date `main` after the plan is approved. The Agent asks before creating, merging or deleting any branch.
- When the unit is verified, it is committed on its branch and pushed; CI runs and Vercel builds a preview.
- The Agent drafts the pull request description. Joe checks CI is green, compares the preview to the design board, and merges with Squash and merge. The Agent never merges.
- CI is required: a pull request merges only when CI is green.
- The progress log records the branch and PR number for every unit.

Rejected: committing straight to `main` (one bad unit breaks the live demo); merge commits (noisy history).

## Consequences
`main` always works, so the live URL always shows the last unit Joe approved. A unit that goes wrong is deleted with its branch. Each PR shows the full change, the passing CI check, a preview link and Joe's merge: visible proof of approval. Costs a few minutes per unit on a tight day. With squash merges, `main` shows one commit per unit and the PR keeps the detail.
