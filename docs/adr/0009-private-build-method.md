# 0009 · The build method stays private; its evidence is public

## Status
Accepted (C0, October 1, 2026).

## Context
Joe's build method (the agent's standing orders, the gate definitions and the method explanation) is his own work and still in progress. Public docs linked to those files, which would be broken links on GitHub, and nothing stopped one from being committed by accident. With the method private, the public repo needs its own evidence that a human controlled the AI.

## Decision
- The method files stay local, listed in `.gitignore`. They are never staged, committed or pushed; no forced adds, and no bulk adds without checking `git status` first.
- Public files refer to them only as "private build method (kept local)."
- The README gets a "How this was built" section that describes the process, not the method's internals.
- Before every commit, `git status` confirms no private file and no `.env` file is staged.
- CI and Vercel never depend on a private file.

Rejected: publishing the method (Joe's intellectual property, unfinished); deleting the references (hides how the work was controlled).

## Consequences
The evidence of control is what the process produces, and all of it is public: one PR per unit with CI green and Joe's merge, `progress.md` rows (including "red confirmed" with the failing test output, since a PR alone can't show the test came first), the failure log and RCAs, ADRs, and the prompt log with Judgment and Why. These must be kept complete.
