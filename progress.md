# progress.md · living state

> Single source of "where am I?". Updated at every gate, never at the end. Mirrors the git history in readable form. Resume steps: private build method (kept local).

## Snapshot

| Field | Value |
|---|---|
| Stage | **C0 passed. Phase 0 in progress (Full mode)** |
| Current unit | P0.1 Scaffold + bubble (verified) |
| Current checkpoint | P0.1 C2: Joe verified; commit awaiting approval |
| Last commit | `807c951` amendment A9 on `chore/phase-0` (`main` is at `031a5b0`, the C0 commit) |
| CI | Not wired yet (Phase 0, P0.4) |
| Live URL | Not deployed yet (Phase 0, P0.5) |
| Next single action | Joe approves the P0.1 commit (and decides on RCA-001); then the Agent presents the P0.2 plan, including the `unrs-resolver` install-script warning. |
| Last updated | 2026-10-01, P0.1 C2 |

## Step 0 · P-I-O-F for the whole project (confirmed at C0, 2026-10-01)

- **Purpose:** Give facility managers a fast, honest check on AI HVAC controller savings claims before they spend $15K to $30K, and show the Phase 1 gate that Joe stays in control of AI (Fluency, Control, Responsible use, Communication).
- **Inputs:** The vendor proposal text (pasted); the manager's site conditions (annual kWh, HVAC share, rate, maintenance, schedules, fan behavior, city); Joe's assumption values; the docs in `docs/`; the Claude API.
- **Outputs:** A deployed web app (live URL) and GitHub repo; three savings cases; red flags as questions; `docs/prompt_log.md`; `docs/04_Trustworthy_AI_Lens.md` with real results; `reflections.md`; a two-minute presentation.
- **Flow:** Paste → server validates → Claude extracts values with source sentences → server and browser validate → manager confirms → site conditions → rules and plain math → results. Full diagrams in `docs/03_Architecture.md`.

### Mode

**Full mode** (amendment A9). Phase 0 runs P0.1 to P0.5; P0.6 pre-commit is optional and Joe decides when we reach it. Then U1 to U8 in order (U2 is never skipped: the schema validates every entry point, including the manual path), each with the full loop: plan Joe approves, failing test first, build, Joe verifies, Joe approves the commit, pull request, CI green, Joe merges. U4 (AI extraction) is part of the product (D4), never optional. U8 runs all eleven edge cases. No time windows on any unit. The cut line in `docs/05_Build_Plan.md` is an emergency fallback only, not the plan.

### Scope

- **In:** F1 to F9 in `docs/02_Specification.md` section 1. U3 covers the site inputs the math needs; U7 builds the polished site form and editable assumptions.
- **Stretch:** F10 PDF upload.
- **Out:** web fetching, accounts, database, weather normalization math, streaming, chat, component test framework, multi-agent crew, new schema fields for fees, kWh-only savings, incentives or controller counts (ADR 0006).

### Assumptions (resolved at C0)

1. Submission is the GitHub repo **and** the live URL, plus the live presentation. The repo stays private while building; at submission Joe makes it public or adds the instructor.
2. Planning prompts count in the Prompt Log: **pending, instructor's answer.** The log is kept either way.
3. The placeholder 25% and 20% are replaced by Joe's values: site-walk cuts 0% / 25% / 50% (unknown → 25%) and maintenance over 24 months → 20% (ADR 0005).
4. Gate date: Thursday, October 1, 2026. Full mode (amendment A9).

## Definition of Done (confirmed at C0, 2026-10-01)

Assignment:

- [ ] Real problem for a named community, stated in one sentence (facility managers)
- [ ] Working AI-powered solution: GitHub repo (public or shared with the instructor at submission) + live URL
- [ ] Fluency: Prompt Log shows advanced prompting and Joe's judgments
- [ ] Control: scoped; Joe can explain every part; Prompt Log complete; AI mistakes caught and logged
- [ ] Responsible use: Map, Measure, Manage written with real test results, failures included; one failure mode named
- [ ] Communication: two-minute presentation rehearsed; likely questions prepared; backup demo video

Spec (`docs/02_Specification.md` section 8):

- [ ] Sample proposal produces the worked example numbers exactly
- [ ] Every extracted value shows its source sentence or "Not stated"
- [ ] No number reaches Results without the confirm step
- [ ] Changing an assumption recalculates all three cases
- [ ] Empty input returns 400 without calling the model
- [ ] Wrong-shape reply returns 422 with a plain message
- [ ] API key never in browser traffic or client bundle
- [ ] Works at 375 px width with no sideways scroll
- [ ] Paste screen says where the text goes; the server never logs the proposal text

Design (`docs/06_Design.md`, `docs/design/`):

- [ ] Every screen built matches its board in structure, copy and Field Instrument tokens (Joe checked at 375 px and 1280 px)
- [ ] Loading, empty and error states built as in board 05
- [ ] Interaction specs built, each with a reduced-motion version

Engine:

- [ ] Every unit merged through a pull request after Joe verified it; CI green on every PR and on `main`
- [ ] `reflections.md` complete (C4)

## Unit log

Status values: `pending` → `planned (C1)` → `red confirmed` (failing test output recorded) → `verified (C2)` → `PR open` → `merged`. One verified unit = one commit on its branch = one pull request.

| Unit | Name | Done when | Branch | Status | Commit | PR | CI |
|---|---|---|---|---|---|---|---|
| P0.1 | Scaffold + bubble | Next.js app runs locally; `.nvmrc` committed; `npm run build` passes | `chore/phase-0` | verified (C2) | | | |
| P0.2 | Deps + setup gate | `npm run gate:setup` exits 0; exits 1 with `EXTRA_REQUIRED=not-a-real-package` | `chore/phase-0` | pending | | | |
| P0.3 | Test harness | Vitest runs; a deliberately failing sanity test fails, then is removed | `chore/phase-0` | pending | | | |
| P0.4 | CI Tier 1 | Actions workflow green on push and pull request | `chore/phase-0` | pending | | | |
| P0.5 | Deploy | Vercel URL serves the scaffold; env var set on Vercel | `chore/phase-0` | pending | | | |
| P0.6 | Pre-commit (optional) | Hook runs typecheck + tests; blocks a commit with a failing test. Joe decides whether to build it | `chore/phase-0` | pending (optional) | | | |
| U1 | `calc.ts` | Worked example passes; site-walk levels, rounding and payback edge cases tested | `feat/calc` | pending | | | |
| U2 | `schema.ts` | Valid passes; over-range, wrong type, missing quotes fail; `SiteConditionsSchema` with schedules and fans | `feat/schema` | pending | | | |
| U3 | Manual path | Typed values, including site inputs, show three cases on screen | `feat/manual-path` | pending | | | |
| U4 | `/api/extract` | Sample returns valid Proposal; empty → 400; bad shape → 422; proposal text never logged | `feat/extract` | pending | | | |
| U5 | Confirm step | Each value shows source sentence; editing changes results | `feat/confirm` | pending | | | |
| U6 | Red flag rules | P01 shows four flags + maintenance note; P02 none; "Always ask" list shown | `feat/red-flags` | pending | | | |
| **Cut line** | | Emergency fallback only, not the plan (see `docs/05_Build_Plan.md`) | | | | | |
| U7 | Polished site form + assumptions | Form asks only for gaps; assumptions editable | `feat/site` | pending | | | |
| U8 | Edge cases + v1.0 | All eleven cases run, lens filled, deps diffed, tag v1.0 | `chore/edge-cases` | pending | | | |
| C4 | Reflection | `reflections.md` complete | | pending | | | |

Phase 0 items share one branch, `chore/phase-0`, as named in `docs/05_Build_Plan.md`.

### Per-unit P-I-O-F (written at C1, one block per unit)

**P0.1 · Scaffold + bubble** (C1 approved 2026-10-01 with three changes from Joe; this block was written at C2, not at C1 as the rule requires)

- **Purpose:** a working Next.js app with the Node version pinned, so the laptop, CI and Vercel run the same setup.
- **Inputs:** `create-next-app@latest` (Next.js 16.3.8): TypeScript, Tailwind, ESLint, App Router, no `src/`, `@/*` alias; Node 24 LTS via nvm.
- **Outputs:** scaffold files; `.nvmrc` = `24`; `package.json` with `"engines": { "node": "24.x" }` (Vercel reads `engines`, not `.nvmrc`; Joe's change 1); merged `.gitignore` keeping every private-method line; `next.config.ts` with `agentRules: false` (failure 3).
- **Flow:** generate in the scratchpad → copy in, skipping `.git`, `node_modules`, `README.md`, `.gitignore` and the private method files (Joe's change 2) → `npm install` → build → dev.
- **Known-bad:** under Node 26, `nvm use` must switch to 24 → `node -v` = `v24.21.0`.
- **Done when (Joe verified):** `node -v` v24.21.0; `npm run build` exit 0 (Joe's change 3); starter page at localhost:3000; `git status` shows no private or `.env` file; the private method files and folders ignored.

## Failure log (write BEFORE fixing)

| # | When | Unit | Symptom (raw) | Caught by | Cause | Fix | RCA | ADR | AI-caused? |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 2026-10-01, after C0 commit | C0 push | `git push -u origin main` → `remote: Invalid username or token. Password authentication is not supported for Git operations.` `fatal: Authentication failed` (exit 128). `origin/main` does not exist | The push itself | Git's `store` credential helper holds an invalid or expired GitHub credential; `gh` is not logged in | Joe ran `gh auth login`; authentication now works (failure 2 is a new cause) | none (no trigger) | none | No |
| 2 | 2026-10-01, push retry | C0 push | `remote: error: GH007: Your push would publish a private email address.` `! [remote rejected] main -> main (push declined due to email privacy restrictions)` (exit 1). `origin/main` still does not exist | The push itself (GitHub email privacy protection) | Commit `e405e17` is authored with the global git email, which GitHub marks private; no repo-level `user.email` is set | Repo `user.email` set to the GitHub noreply address; unpushed commit re-authored (`e405e17` → `031a5b0`); push succeeded | none (Joe: failure row is enough) | none | No |
| 3 | 2026-10-01, P0.1 `npm run dev` | P0.1 | Dev server printed `✓ Generated [private agent file] for AI agents. Set agentRules: false in next.config to disable.` (name withheld, ADR 0009). That private agent file gained a `nextjs-agent-rules` block (original text kept; file is git-ignored, nothing reached git) | Agent, reading the dev server output | Next.js 16 `next dev` writes agent rules into the private agent file by default; the P0.1 plan didn't account for it | Joe chose (a): `agentRules: false` in `next.config.ts`; added lines removed from the private agent file; the block's useful rule (read `node_modules/next/dist/docs/` before Next.js code) kept as a private standing rule | none | none | No |
| 4 | 2026-10-01, P0.1 copy step | P0.1 | Agent's copy loop `for f in $FILES` in zsh: `cp: …/scaffold/app/favicon.ico app/globals.css … tsconfig.json: No such file or directory`; loop ran once, copied nothing, and `mkdir -p` created an empty nested folder tree under `app/` named after the whole file list | Agent, reading the command output | zsh does not split an unquoted string variable into words (bash does); the agent wrote bash-style code for a zsh shell. **Process slip:** the agent fixed it (deleted the empty tree, re-ran with an inline list) before writing this row | Empty tree removed after confirming 0 files inside; files copied one at a time with an inline list; `git status --untracked-files=all` confirmed only expected paths | RCA-001 (trigger 3: AI-caused) | none | Yes (coding agent) |

## Amendments (changes to the C0 contract)

| # | When | What changed | Why | Docs changed | Joe approved |
|---|---|---|---|---|---|
| A1 | 2026-10-01 C0 | Site-walk discounts: `existingControls` replaced by schedules and fan questions; cuts 0% / 25% / 50%, unknown → 25% + note; maintenance over 24 months → 20%, unknown → 0% | Most controller savings come from fan control (PNNL); "has a BAS" can't tell whether the fan waste is still there | 02, 04, 05, 06, design boards, BRIEF, 07, 08, 09 | Yes (grill Q1 to Q3) |
| A2 | 2026-10-01 C0 | Sample gaps: option (a) for fees, kWh-only, gross vs net, per-controller watts, marketing figures; new `missingClaimPct` rule and "Always ask" list | Keep the schema small; a guess becomes a confident wrong number on screen | 02, 04, BRIEF | Yes (grill Q4, 9.6, 9.7) |
| A3 | 2026-10-01 C0 | Confidentiality notice; proposal text never logged or stored; provider-agnostic design | Text leaves the manager's computer | 02, 03, 04, 06 | Yes (grill Q5) |
| A4 | 2026-10-01 C0 | Branch and pull request per unit; Joe merges; CI required; Branch and PR columns | `main` always works and deploys the demo; approval becomes visible | 05, progress, README | Yes (grill Q7) |
| A5 | 2026-10-01 C0 | Build method kept private; public links replaced; README "How this was built" | Joe's intellectual property; public repo shows the evidence instead | README, progress, 05, 08, 09, prompt_log | Yes (grill Q8) |
| A6 | 2026-10-01 C0 | Math rules: display-only rounding, null device power = 0 W, payback "Never" / "Not stated", `missingBaseline` uses the real claim | U1 tests need exact rules | 02, 04 | Yes (9.1 to 9.4) |
| A7 | 2026-10-01 C0 | One expected answer per test: P03 percent and price null, P04 watts and weather null, P05 verification null, X01 all null (200); edge-case table aligned to the answer keys | A test with two right answers can't fail cleanly | 04, BRIEF | Yes (9.5 with change) |
| A8 | 2026-10-01 C0 | Gate mode; U3 includes the site inputs; repo private until submission; doc paths fixed; 400 for too-short text | Gate is today; F4 must survive the cut line | 03, 05, 08, 09, README, progress | Yes |
| A9 | 2026-10-01 Phase 0 | Gate mode replaced by Full mode. Time-based schedule, fallback cut points and code freeze removed. P0.6 restored as optional. U7 and full U8 (eleven cases) follow U6; U8-lite removed. Cut line kept only as an emergency fallback. Supersedes the Gate mode part of A8 | Joe: follow the plan exactly as established at C0, with the full loop on every unit; no shortcuts because of the clock | progress, 05, 08, 09, prompt_log | Yes |

## Root cause analyses (RCA index)

Each RCA names a prevention that changes the system.

| RCA | Title | Unit | Category | Prevention (file) | Status |
|---|---|---|---|---|---|
| RCA-001 | Copy loop broke under zsh word splitting | P0.1 | AI output (coding agent) | Rule: no loops over unquoted string variables; inline lists or arrays; check `git status --untracked-files=all` after any bulk file operation; log before cleanup (private build method, kept local) | Confirmed by Joe; prevention in place |

## Decisions (ADR index)

| ADR | Title | Status |
|---|---|---|
| 0001 | Next.js + TypeScript stack over Python + Streamlit | Accepted (planning) |
| 0002 | Claude as the single provider; structured output with `generateText` + `Output.object` | Accepted (planning); refined by 0007 |
| 0003 | No AI in math or rules; human confirms every extracted value | Accepted (planning) |
| 0004 | Paste text only; no fetching proposals from the web in Phase 1 | Accepted (planning) |
| 0005 | Site-walk discounts: schedules and fan behavior, not "has a BAS" | Accepted (C0) |
| 0006 | Gaps exposed by the sample proposals: flag them, don't add math | Accepted (C0) |
| 0007 | Confidentiality notice, nothing stored, provider-agnostic design | Accepted (C0) |
| 0008 | One branch and pull request per unit; CI required | Accepted (C0) |
| 0009 | The build method stays private; its evidence is public | Accepted (C0) |
