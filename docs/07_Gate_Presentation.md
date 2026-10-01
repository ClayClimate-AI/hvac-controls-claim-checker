# 07 · Gate presentation

Two minutes. Grading: Technical 40%, Verbal 30%, Applied 30%.

## Script

**0:00 to 0:20 · The problem**
> "Facility managers are being sold AI HVAC controllers for fifteen to thirty thousand dollars, with claims like 18% savings. Most proposals never say what baseline that's measured against or how it'll be verified. I worked commercial HVAC; managers can't check these claims, so they buy blind."

**0:20 to 1:20 · Live demo**
1. Paste the sample proposal. Click **Extract claims**.
2. Point at one row: "Claude found 18%, and here's the exact sentence it came from. Baseline: not stated."
3. Confirm. Fill site conditions: 45% HVAC share, runs on schedules, fans at one speed all day, maintenance over two years.
4. Results: "The vendor says $9,720 a year and a two-and-a-half-year payback. Adjusted for this building, it's closer to $5,800 to $7,300, and four years."
5. Red flags: "And here are the questions to send back: how will you verify it, is it weather adjusted, what's the baseline kWh."

**1:20 to 1:50 · Trustworthy AI**
> "Map: the failure I worry about is a wrong number that looks right. Measure: I ran eleven edge cases, including a proposal with hidden instructions, and [what happened]. Manage: every value shows its source sentence, a person confirms it, and the math has no AI in it."

**1:50 to 2:00 · Next**
> "Next I'd add research mode, where you name a product and it pulls the public datasheet before a proposal even exists."

## Likely questions

| Question | Answer |
|---|---|
| Why this stack? | "It's the stack I already know. The Next.js API route keeps the key on the server, Zod checks the model's output, and the AI SDK makes structured output one call." |
| What if the AI is wrong? | "Two layers. Zod rejects the wrong shape automatically. For a wrong number in the right shape, the person sees the source sentence and confirms before any math runs." |
| Why not let the AI do the math? | "The number drives a $24,000 decision. Plain code gives the same answer every time, and I can test it." |
| Where do the cuts come from? | Say it in your own words (grill, Q1 and Q3). Points: most controller savings come from fan control (PNNL: rooftop-unit energy down 57% on average, mostly fans); the fan question tells you whether that waste is still there; 0% / 25% / 50% and the 20% maintenance cut are my rules of thumb, anchored by that research, labeled and editable. The research shows where savings come from, not the size of the cut. |
| Isn't sending a proposal to an AI a privacy risk? | Own words (grill, Q5). Points: browser → my server → the AI provider; the screen says so; nothing stored or logged; remove names first; manual path with no AI; a company runs it on its approved provider. Can't promise what the provider does; check their terms. |
| Your samples are fictional. Does it work on real proposals? | Own words (grill, Q6). Points: fictional on purpose so each has a known right answer; built to break the tool; the user is the manager who received the proposal; not yet tested on a real one, so every value shows its sentence; a real pilot is next. |
| What did you cut? | "Fetching proposals from the web: they're private, and it opens prompt injection risk. Weather normalization: I flag it instead of faking it." |
| Is this just a calculator? | "No. The AI reads an unstructured document and finds what's missing. The calculator is the part I deliberately kept away from the AI." |
| How much does it cost to run? | "About a cent per proposal on Sonnet 5.5." |

## Before gate day

- [ ] Backup demo video recorded (in case Wi-Fi or the API fails)
- [ ] Manual path (U3) works without the API as a fallback
- [ ] Rehearsed out loud three times, timed
- [ ] Lens lines filled in with real test results
- [ ] Prompt Log complete and linked in the repo README
