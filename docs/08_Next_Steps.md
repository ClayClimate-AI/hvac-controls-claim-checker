# 08 · Context and next steps

Read this first when you pick the project back up, or paste it into a new Claude or Claude Code session as context.

## Where things stand (October 1, 2026, after C0)

| Area | Status |
|---|---|
| Problem and solution | Decided: Savings Claim Checker |
| Stack | Decided: Next.js, TypeScript, Zod, Vercel AI SDK, Claude Sonnet 5.5, Tailwind, Vercel |
| Specification | Written (`02_Specification.md`) |
| Architecture | Diagrams done (`03_Architecture.md`) |
| Trustworthy-AI lens | Drafted; needs real test results |
| Wireframes | Done, five boards |
| Design system | Done, Field Instrument |
| High-fidelity Results | Done |
| Prompt Log | Planning and grill session logged; build phase empty |
| Assumptions | Set at C0: site-walk cuts 0% / 25% / 50%, maintenance 20% (ADR 0005) |
| Mode | Gate mode; code freeze 11:00, present 12:00 |
| Code | Not started |

## Do these before writing code (in order)

1. **Send the scope message** (below). Save the reply in the repo.
2. **Load about $5 in Anthropic API credits,** auto-reload off, set a monthly limit. Create a key named `savings-claim-checker`.
3. ~~Replace the 25% and 20% placeholders~~ Done at C0 (ADR 0005).
4. **Confirm the Claude Design handoff menu names** in your account (beta).
5. ~~Create the GitHub repo~~ Done: `ClayClimate-AI/hvac-controls-claim-checker` (private while building; made public or shared with the instructor at submission).

## Then build

Open Claude Code in the repo and start the build loop (private build method, kept local). It runs Phase 0, then U1 onward, stopping at every gate.

## Scope message to send the instructor

> Hi Shawn, quick scope check on the Phase 1 project before I build. I'm building a Savings Claim Checker for facility managers: paste an AI HVAC controller proposal, Claude extracts the savings claims with the sentence each came from, the manager confirms them, and plain TypeScript math shows three savings cases and red flags.
>
> 1. "AI-powered solution": does it count if the AI step is inside the product (Claude reading the proposal), with the rest built using AI tools? I want to make sure that's the intended reading.
> 2. Prompt Log: should it include planning and design prompts from before coding, or only build prompts?
> 3. Could I get written feedback on what separated Proficient from Advanced in earlier presentations?
>
> Thanks, Joe

## Open questions

| Question | How it gets answered |
|---|---|
| Does the AI-inside-the-product reading match the instructor's? | Scope message |
| Do planning prompts count in the Prompt Log? | Scope message (log kept either way) |
| What are the right site-walk and maintenance adjustments? | Answered at C0 (ADR 0005); labeled as rules of thumb |
| How consistent is extraction across runs? | Edge case 11 in U8 |
| Does PDF upload fit in time? | Only after U8, if time remains |

## Resuming

Start from the `progress.md` Snapshot: it names the stage, the current unit and the one next action.

## After the gate (Phase 2 candidates)

- Research mode (public datasheets from an approved URL list)
- Server-room cooling estimator
- PDF upload if not done
- Govern, the fourth lens function
