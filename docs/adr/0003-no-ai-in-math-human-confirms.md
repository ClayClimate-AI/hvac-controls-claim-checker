# 0003 · No AI in math or rules; a human confirms every extracted value

## Status
Accepted (planning phase).

## Context
The output drives a $15,000 to $30,000 purchase decision. AI can return a well-formed wrong number (8% read as 18%) that no schema can catch.

## Decision
The AI only extracts values and quotes their source sentences. The manager confirms or edits every value before any math. `lib/calc.ts` and `lib/rules.ts` are plain, deterministic, unit-tested TypeScript. Rejected: letting the model compute savings or judge the proposal.

## Consequences
Same inputs always give the same outputs, and the worked example is a test. The confirm step adds one screen, which is the main mitigation in the Trustworthy-AI lens (Manage).
