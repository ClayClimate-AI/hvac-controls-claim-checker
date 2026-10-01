# 0002 · Claude as the single provider; structured output with generateText + Output.object

## Status
Accepted (planning phase). The exact API is verified against current Vercel AI SDK docs in U4. Refined by 0007 (provider-agnostic: switching providers stays a one-line change).

## Context
A previous build used Grok and ChatGPT. This app needs one structured answer per proposal, not chat. Early planning advice named `generateObject`; checking the current docs showed the recommended form is `generateText` with `Output.object({ schema })`.

## Decision
One provider (Claude, Sonnet class) through the Vercel AI SDK Anthropic provider, with the Zod `ProposalSchema` passed as the output schema. No streaming, no persona. Rejected: multiple providers (more keys, bills and failure points), free-text output parsed by hand.

## Consequences
About a cent per run. Model output arrives typed and validated; wrong shape throws and the route returns 422. The model is swappable in one line. This decision is also a logged AI mistake caught (outdated function name).
