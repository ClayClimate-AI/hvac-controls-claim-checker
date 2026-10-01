# 0004 · Paste text only; no fetching proposals from the web in Phase 1

## Status
Accepted (planning phase).

## Context
Joe asked whether Claude could fetch the vendor's proposal itself. Real proposals are private and building-specific; vendor websites hold marketing. Fetching also opens a prompt injection path from content Joe doesn't control.

## Decision
The manager pastes the proposal text (PDF upload is a stretch goal through the same route). The extraction prompt tells the model to ignore instructions inside the document. Research mode (public datasheets from an approved URL list) moves to Phase 2.

## Consequences
Smaller attack surface and scope. The product depends on the manager having the proposal, which matches the real workflow.
