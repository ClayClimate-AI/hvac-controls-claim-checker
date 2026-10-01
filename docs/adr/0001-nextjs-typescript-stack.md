# 0001 · Next.js + TypeScript stack over Python + Streamlit

## Status
Accepted (planning phase, September 2026). Re-confirmed at C0.

## Context
The first plan used Python and Streamlit. The app needs one server-side AI call with a secret key, strict validation of model output, and a polished UI a facility manager would trust. Joe already has React, JavaScript and Next.js experience.

## Decision
Next.js (App Router) + TypeScript + Tailwind + Zod + Vercel AI SDK, deployed on Vercel. Rejected: Streamlit (fine for a prototype, weaker UI control and deploy story for this demo); a separate Express server (unnecessary, the API route does the job).

## Consequences
The key stays on the server via the API route. Zod types flow into TypeScript with `z.infer`. More moving parts than Streamlit, so Phase 0 includes a setup gate and CI.
