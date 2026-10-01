# Savings Claim Checker

**Check an AI HVAC controller's savings claim before you buy it.**

Facility managers are sold AI HVAC controllers for $15,000 to $30,000 with claims like "18% HVAC energy savings." Most proposals never state the baseline, the verification method or the weather adjustment. This app reads the proposal, shows the sentence behind every number, lets the manager confirm each value, and turns the claim into three honest cases and a list of questions to ask the vendor.

> Phase 1 gate project · Next Chapter (NEXTCH-S26) · Joseph Clay

## Status

| | |
|---|---|
| Stage | Scope confirmed (C0, October 1, 2026); build starting |
| Live URL | _added at Phase 0 (P0.5)_ |
| CI | _added at Phase 0 (P0.4)_ |
| Current progress | see [`progress.md`](progress.md) |
| Repository | Private while building; made public or shared with the instructor at submission |

_This section is updated whenever a unit makes a feature usable._

## How it works

1. **Paste** the vendor proposal.
2. **Extract:** Claude returns each claimed value with the exact sentence it came from. Missing values show "Not stated."
3. **Confirm:** the manager checks every value against its sentence and edits anything misread.
4. **Site details:** only what the proposal didn't say (annual kWh, HVAC share, rate, maintenance, whether the units run on schedules, whether the fans slow down or shut off).
5. **Results:** plain TypeScript math shows the vendor, adjusted and conservative cases, plus red flags written as questions for the vendor.

Your text is sent to an AI service to be read; nothing is stored. A manual path works with no AI at all. No AI touches the math. Full diagrams: [`docs/03_Architecture.md`](docs/03_Architecture.md).

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS · Zod · Vercel AI SDK · Claude API · Vitest · GitHub Actions · Vercel

## Run it locally

```bash
nvm use                      # Node version from .nvmrc
npm ci
cp .env.example .env.local   # then add your ANTHROPIC_API_KEY
npm run gate                 # setup gate, typecheck, lint, tests
npm run dev
```

_Commands become real during Phase 0; until then this section is the plan._

## How this was built
Built with AI as a collaborator I supervise, not an oracle I accept. The build method itself is private and kept local; what it produces is all here.

- **Small units.** The work is split into small units (see `docs/05_Build_Plan.md`), built one at a time.
- **Plan first.** Each unit is planned (purpose, inputs, outputs, flow) and I approve the plan before any code is written.
- **Test first.** A failing test is written before the code that makes it pass.
- **I check it.** I run each unit myself and approve it before it is committed.
- **I merge it.** Every unit arrives as a pull request with CI green, and I merge it myself.
- **Decisions and failures are written down.** Decisions with tradeoffs get an ADR. Failures are logged before they are fixed, and significant ones get a root cause analysis with a prevention built into the system. AI use is recorded in the Prompt Log.

Where to see the evidence:

| Evidence | File |
|---|---|
| Where the build stands, every unit, branch, PR and failure | [`progress.md`](progress.md) |
| Every AI-assisted decision and mistake caught | [`docs/prompt_log.md`](docs/prompt_log.md) |
| Why decisions were made | [`docs/adr/`](docs/adr/) |
| Why failures happened and what now prevents them | [`docs/rca/`](docs/rca/) |
| Trustworthy-AI lens (Map, Measure, Manage) | [`docs/04_Trustworthy_AI_Lens.md`](docs/04_Trustworthy_AI_Lens.md) |
| Every unit's change, CI check and merge | Pull requests on GitHub |
| Reflection (my own words) | `reflections.md` _(written at the end)_ |

## Documentation map

| File | Purpose |
|---|---|
| `progress.md` | Living state: DoD, units, failures, amendments |
| `docs/01` to `docs/09` | Context, spec, architecture, lens, build plan, design, gate script, next steps, assignment answer map |
| `docs/design/` | Wireframes, high-fidelity board, exact HTML, design tokens |
| `docs/prompt_log.md` | Prompt Log |
| `docs/adr/` | Decision records |
| `docs/rca/` | Root cause analyses |
| `samples/` | Fictional test proposals and their answer keys |

## Limits (read before trusting a result)

The adjusted and conservative cases use rules of thumb that the user can edit. They are estimates for comparing claims before a purchase, not measured savings. Confirm with metered data after installation.
