# 0007 · Confidentiality notice, nothing stored, provider-agnostic design

## Status
Accepted (C0, October 1, 2026). Refines 0002: Claude stays the single provider in this build; this ADR adds the requirement that switching providers remains a one-line change.

## Context
A pasted proposal leaves the manager's computer: browser → our server → the AI provider. Real proposals are private between a vendor and a building owner. Many companies already have an approved enterprise AI service with their own data terms.

## Decision
- The Paste screen says where the text goes, that nothing is stored, and suggests removing names and anything identifying (not prices: payback needs the price).
- The server never logs or stores the proposal text. Logs may record only the text length and the status code.
- The manual path (U3) uses no AI at all.
- The AI call stays behind the Vercel AI SDK so a company can run the app on the provider its IT already approved. The Anthropic API is the proof of concept.
- Ownership, as Joe understands Anthropic's commercial terms: the user owns outputs, and the proposal stays its owner's. Not legal advice; check the provider's current terms.

Rejected: telling users to strip prices (breaks payback); storing proposals for history (out of scope and a new risk).

## Consequences
"Nothing is stored" becomes a checkable rule (the U4 contract), not just a promise on screen. The app can't promise what the provider does with the text; the notice and the provider choice are the mitigations. Strengthens Map and Manage and previews Govern.
