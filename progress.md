# progress.md · living state

> Single source of "where am I?". Updated at every gate, never at the end. Mirrors the git history in readable form. Resume steps: private build method (kept local).

## Snapshot

| Field | Value |
|---|---|
| Stage | **C0 passed. Phase 0 in progress (Lean v2: amendment A10, ADR 0010)** |
| Current unit | Phase 0 batch: P0.3 (folded into P0.4) → P0.4 CI → P0.5 deploy |
| Current checkpoint | Contract approved (2026-10-02). Phase 0 batch built: gate green locally; reviewers run; push awaiting Joe |
| Last commit | `f09bd5a` P0.2 on `chore/phase-0`, after `9b2a120` P0.1 (rebuilt to remove private method file names, failure 8). Local, not pushed; the branch is pushed after the CI step, with Joe's approval. `main` and `origin/main` are at `031a5b0` |
| CI | `.github/workflows/ci.yml` written (setup gate in CI mode, typecheck, lint, test, build; no secrets); first run on Joe-approved push |
| Live URL | Not deployed yet (Phase 0, P0.5) |
| Review mode | **With reviewer** (Joe, 2026-10-01): the code-review skill runs read-only at every C2 and its verdict goes to Joe before he approves the commit (matches `docs/05_Build_Plan.md`, `/code-review` before each merge). NEEDS_CHANGES is handled like C3. Lean v2: both reviewers run in parallel once per batch |
| Permission mode | **Default mode** (asks before every action), as the private build method (kept local) requires. **Process note:** Claude Code was in **auto mode** during P0.2 steps 1 to 3 (script written, red runs, docs edits and both installs ran without per-action prompts), contrary to that rule. Joe switched it off on 2026-10-01 after failure 6. Every action in that window was inside the C1-approved plan or a C3 fix Joe approved. **Process note 2 (2026-10-02):** Claude Code reported auto mode active during the Phase 0 batch failure-9 fix (after the reviews); the Agent flagged it to Joe and limited itself to the approved doc fixes and the commit, stopping before the push. **Local permission settings** (private build method folder, kept local, 2026-10-01): tests, lint, build, typecheck, the setup gate and read-only git run without a prompt; reading or editing `.env*` files, `env`/`printenv`, force pushes, `--no-verify`, history rewrites, forced adds, pushes to `main`, switching to `main`, `git branch -D` and `gh pr merge` are denied (deny shown firing on `cat .env.example`) |
| Working rule | **Lean v2 (A10, ADR 0010), Joe's decision, 2026-10-01 after P0.2.** Read-only commands run without asking; every plain `grep` has `--exclude='.env*'`; `env`/`printenv` never run; `.env.local` never read. Joe approves one contract; then each batch runs tests first (failing first), build, both reviewers in parallel, one summary (tests, reviewers, CI). The Agent stops for Joe: the contract, before every push, before any history change, merges (Joe merges), after 3 failed tries, on spec ambiguity, scope change, or anything security or private-file related. Every failure gets a row. *Superseded rule (P0.2 C2 fixes):* (1) Read-only commands (`git status`, `git diff`, `git log`, `git grep`, `grep`, `ls`, `cat` of public files) run without asking; `.env.local` is never read. (2) For each step the Agent shows the plan once; after Joe's go it runs that step's commands, one state-changing command per call with exit codes, and shows all results together at the end. (3) Always stop for Joe's approval at C1, at C2 (before any commit), before any push, before any history change, and on any failure (C3). Default mode stays on; no auto mode |
| Next single action | Joe approves pushing `chore/phase-0`; the Agent pushes, opens the PR, reports CI; Joe merges; then the Agent walks Joe through Vercel and `ANTHROPIC_API_KEY`. |
| Last updated | 2026-10-02, Phase 0 batch built |

## Step 0 · P-I-O-F for the whole project (confirmed at C0, 2026-10-01)

- **Purpose:** Give facility managers a fast, honest check on AI HVAC controller savings claims before they spend $15K to $30K, and show the Phase 1 gate that Joe stays in control of AI (Fluency, Control, Responsible use, Communication).
- **Inputs:** The vendor proposal text (pasted); the manager's site conditions (annual kWh, HVAC share, rate, maintenance, schedules, fan behavior, city); Joe's assumption values; the docs in `docs/`; the Claude API.
- **Outputs:** A deployed web app (live URL) and GitHub repo; three savings cases; red flags as questions; `docs/prompt_log.md`; `docs/04_Trustworthy_AI_Lens.md` with real results; `reflections.md`; a two-minute presentation.
- **Flow:** Paste → server validates → Claude extracts values with source sentences → server and browser validate → manager confirms → site conditions → rules and plain math → results. Full diagrams in `docs/03_Architecture.md`.

### Mode

**Lean v2** (amendment A10, ADR 0010) from P0.3 on: one contract, batches (Phase 0, A, B, C), parallel worktrees, one PR per batch, tests first, known-bad only for calc, reviewers once per batch, hooks enforce the private-name rule, design check once at the end on the live URL. U4 (AI extraction) stays part of the product.

*Superseded:* **Full mode** (amendment A9). Phase 0 runs P0.1 to P0.5; P0.6 pre-commit is optional and Joe decides when we reach it. Then U1 to U8 in order (U2 is never skipped: the schema validates every entry point, including the manual path), each with the full loop: plan Joe approves, failing test first, build, Joe verifies, Joe approves the commit, pull request, CI green, Joe merges. U4 (AI extraction) is part of the product (D4), never optional. U8 runs all eleven edge cases. No time windows on any unit. The cut line in `docs/05_Build_Plan.md` is an emergency fallback only, not the plan.

### Scope

- **In:** F1 to F9 in `docs/02_Specification.md` section 1. U3 covers the site inputs the math needs; U7 builds the polished site form and editable assumptions.
- **Stretch:** F10 PDF upload.
- **Out:** web fetching, accounts, database, weather normalization math, streaming, chat, component test framework, multi-agent crew, new schema fields for fees, kWh-only savings, incentives or controller counts (ADR 0006).

### Assumptions (resolved at C0)

1. Submission is the GitHub repo **and** the live URL, plus the live presentation. The repo stays private while building; at submission Joe makes it public or adds the instructor.
2. Planning prompts count in the Prompt Log: **pending, instructor's answer.** The log is kept either way.
3. The placeholder 25% and 20% are replaced by Joe's values: site-walk cuts 0% / 25% / 50% (unknown → 25%) and maintenance over 24 months → 20% (ADR 0005).
4. Gate date: Thursday, October 1, 2026. Lean v2 (amendment A10), replacing Full mode (A9).

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

- [ ] Every screen built matches its board in structure, copy and Field Instrument tokens (Joe checked once at the end on the live URL, at 375 px and 1280 px; A10)
- [ ] Loading, empty and error states built as in board 05
- [ ] Interaction specs built, each with a reduced-motion version

Engine:

- [ ] Every unit merged after Joe verified its evidence; CI green on every PR and on `main` (A10, ADR 0010)
- [ ] `reflections.md` complete (C4)

## Unit log

Status values: `pending` → `planned (C1)` → `red confirmed` (failing test output recorded) → `verified (C2)` → `PR open` → `merged`. One verified unit = one commit on its branch = one pull request.

| Unit | Name | Done when | Branch | Status | Commit | PR | CI |
|---|---|---|---|---|---|---|---|
| P0.1 | Scaffold + bubble | Next.js app runs locally; `.nvmrc` committed; `npm run build` passes | `chore/phase-0` | committed (C2) | `9b2a120` | Phase 0 PR (after P0.4) | |
| P0.2 | Deps + setup gate | `npm run gate:setup` exits 0; exits 1 with `EXTRA_REQUIRED=not-a-real-package` | `chore/phase-0` | committed (C2) | `f09bd5a` | Phase 0 PR (after P0.4) | |
| P0.3 | Test harness | Vitest runs; a test fails first for the right reason (red 2: `@/` alias unresolved replaced the throwaway sanity test, A10) | `chore/phase-0` | folded into P0.4 (A10) | | | |
| P0.4 | CI Tier 1 (with P0.3 harness) | `typecheck`, `test`, `gate` scripts; Vitest; Actions workflow green on push and pull request | `chore/phase-0` | built, gate green locally; CI pending push | | Phase 0 PR | |
| P0.5 | Deploy | Vercel URL serves the scaffold; env var set on Vercel | `chore/phase-0` | pending | | | |
| P0.6 | Pre-commit (optional) | Hook runs typecheck + tests; blocks a commit with a failing test. Joe decides whether to build it | `chore/phase-0` | dropped (A10): local git hooks cover pre-commit checks | | | |
| U1 | `calc.ts` | Worked example passes; site-walk levels, rounding and payback edge cases tested | `feat/calc` | pending | | | |
| U2 | `schema.ts` | Valid passes; over-range, wrong type, missing quotes fail; `SiteConditionsSchema` with schedules and fans | `feat/schema` | pending | | | |
| U3 | Manual path | Typed values, including site inputs, show three cases on screen | `feat/manual-path` | pending | | | |
| U4 | `/api/extract` | Sample returns valid Proposal; empty → 400; bad shape → 422; proposal text never logged | `feat/extract` | pending | | | |
| U5 | Confirm step | Each value shows source sentence; editing changes results | `feat/confirm` | pending | | | |
| U6 | Red flag rules | P01 shows four flags + maintenance note; P02 none; "Always ask" list shown | `feat/red-flags` | pending | | | |
| **Cut line** | | Emergency fallback only, not the plan (see `docs/05_Build_Plan.md`) | | | | | |
| U7 | Polished site form + assumptions | Form asks only for gaps; assumptions editable | `feat/site` | pending | | | |
| U8 | Edge cases + v1.0 | Edge-case tests folded into the calc and schema tests (A10); live-model cases at the end, lens filled, deps diffed, tag v1.0 | `chore/edge-cases` | folded (A10) | | | |
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

**P0.2 · Deps + setup gate** (C1 approved 2026-10-01 with six additions from Joe, listed at the end of this block)

- **Purpose:** guardrail L1. One command, `npm run gate:setup`, exits 0 only when every real dependency is present: the right Node version, every required package, and the API key in `.env.local` (locally only). This is the first step of every session and of CI.
- **Inputs:** `.nvmrc` (24); runtime deps `zod`, `ai`, `@ai-sdk/anthropic`; dev dep `vitest`; `.env.example`; the setup-gate shape in the private build method.
- **Outputs:** `scripts/setup-gate.mjs`; `package.json` script `"gate:setup": "node scripts/setup-gate.mjs"` plus the four new deps; updated `package-lock.json`; `.env.local` created by Joe (git-ignored by `.env*`, never committed, key never in chat).
- **Scope line:** only `gate:setup` is added. `typecheck`, `test` and the combined `gate` script come in P0.3 with the Vitest harness. No UI or library code.
- **Flow:**
  1. Write `scripts/setup-gate.mjs` and the `gate:setup` script **before** installing anything.
  2. **Red:** run `npm run gate:setup`. It should exit 1, listing `MISSING` for `zod`, `ai`, `@ai-sdk/anthropic`, `vitest` and the key. Record the output here.
  3. Install with `npm install zod ai @ai-sdk/anthropic` and `npm install -D vitest`. Report the resolved versions and any install warnings word for word.
  4. Check that the installed `ai` exports `Output` (ADR 0002 needs `generateText` + `Output.object`). If it doesn't, stop and raise an amendment.
  5. Joe creates `.env.local` from `.env.example` and adds his key himself.
  6. **Green:** `npm run gate:setup` exits 0.
  7. **Known-bad:** `EXTRA_REQUIRED=not-a-real-package npm run gate:setup` exits 1.
- **Script rules:** it prints only status lines: `ok <name>`, `MISSING <name>`, and `skip ANTHROPIC_API_KEY (CI)` when the key check is skipped (added at C2 review: makes the CI skip visible, leaks nothing). It never prints the key or any `.env.local` content. It skips the key check when `CI` is set, because CI needs no secrets.
- **Decision 1 (Joe):** how the script checks packages. The reference shape uses `require.resolve("<pkg>/package.json")`. That reports a package as `MISSING` even when it is installed if the package's `exports` map hides `package.json`. Recommendation: check `node_modules/<pkg>/package.json` exists. If it is missing, we'd get a false red that we'd have to log at C3.
- **Decision 2 (Joe):** the `unrs-resolver` install-script warning. `unrs-resolver@1.12.2` is already installed. It is a dev-only lint dependency that the scaffold pulls in (`eslint-config-next` → `eslint-import-resolver-typescript`). The Agent captures the exact warning text from step 3 and brings it to Joe. The Agent recommends no action if `npm run lint` still works, but Joe decides.
- **Test and known-bad:** the red in step 2 (deps truly absent) and the `EXTRA_REQUIRED` case in step 7. Both must exit 1.
- **Done when:** `npm run gate:setup` exits 0, the known-bad case exits 1, `npm run lint` passes, `npm run build` still exits 0, and `git status` shows no `.env.local` and no private file.
- **How Joe verifies:** `npm run gate:setup; echo $?` → `0`. `EXTRA_REQUIRED=not-a-real-package npm run gate:setup; echo $?` → `1`. `npm run lint` → exit 0. `npm run build` → exit 0. `git status` → no `.env*` file except the tracked `.env.example`.
- **Red confirmed (after failure 5 fix), before any install:**
  ```
  ok   node 24
  ok   next
  ok   react
  ok   react-dom
  MISSING zod (not declared in package.json)
  MISSING ai (not declared in package.json)
  MISSING @ai-sdk/anthropic (not declared in package.json)
  MISSING vitest (not declared in package.json)
  MISSING ANTHROPIC_API_KEY in .env.local (absent or empty)
  exit=1
  ```
- **Steps 3 and 4 (after failures 6 and 7):** installed `zod` 4.6.5, `ai` 7.0.127, `@ai-sdk/anthropic` 4.0.71 (dependencies); `vitest` 5.0.3, `@types/node` 24.19.0 (devDependencies, failure 7). Every install printed `found 0 vulnerabilities` and the `unrs-resolver@1.12.2 (postinstall: node postinstall.js)` allowScripts warning (Joe: no action if lint passes). Step 4: `ai` exports `generateText` with an `output` option and `Output.object` (`node_modules/ai/dist/index.d.ts:3968`, `:5220`), as ADR 0002 requires; no amendment needed.
- **Step 5:** Joe created `.env.local` himself (the Agent never opened it).
- **Step 6 (green, Agent run):** `npm run gate:setup` → `ok` for node 24, next, react, react-dom, zod, ai, @ai-sdk/anthropic, vitest, ANTHROPIC_API_KEY; `exit=0`.
- **Step 7 (known-bad, Agent run):** `EXTRA_REQUIRED=not-a-real-package npm run gate:setup` → `MISSING not-a-real-package (not declared in package.json)`; `exit=1`.
- **Joe verified (2026-10-01):** `gate:setup` → 0; known-bad → 1; `npm run lint` → 0 (so no action on `unrs-resolver`); `npm run build` → 0; `git status` shows only the six expected files (eight after failure 8 added `prompt_log.md` B6 and RCA-003), with no `.env.local` and no private file.
- **Joe's C1 additions:**
  1. Package check: `node_modules/<pkg>/package.json` exists (Decision 1 accepted).
  2. `unrs-resolver`: no action if lint works. "`npm run lint` passes" added to Done when and to Joe's verification steps.
  3. The key check needs a non-empty value. `ANTHROPIC_API_KEY=` with nothing after it counts as `MISSING`.
  4. The key check is skipped only when the `CI` environment variable is set. A comment in the script says so.
  5. The Agent never opens, reads, prints or `cat`s `.env.local`. Only the script checks it, and it prints only `ok` or `MISSING`.
  6. `.env.example` stays committed with an empty value.
- **C2:** the code-review skill runs read-only, and its verdict goes to Joe. Then the commit `chore(phase-0): P0.2 add deps and setup gate` goes on `chore/phase-0` (no new branch; Phase 0 shares one). It includes `package.json`, `package-lock.json`, `scripts/setup-gate.mjs`, `progress.md` (including the carried-over post-P0.1 updates), `docs/05_Build_Plan.md` status, `docs/prompt_log.md` (B4 to B6), `docs/rca/RCA-002-zsh-equals-expansion-separator.md` and `docs/rca/RCA-003-private-file-names-in-public-files.md` (list corrected at C2 review, failure 8). The branch is not pushed until P0.4.

**Phase 0 batch · P0.3 folded into P0.4** (Lean v2; contract approved by Joe 2026-10-02)

- **Built:** `package.json` scripts `typecheck` (`tsc --noEmit`), `test` (`vitest run`), `gate` (setup gate, typecheck, lint, test); `vitest.config.mts` (node environment, `@/` alias; no component-test packages, spec section 1); `test/harness.test.ts`; `.github/workflows/ci.yml` (`actions/checkout@v7`, `actions/setup-node@v7` from `.nvmrc`, `npm ci`, setup gate, typecheck, lint, test, build; read-only permissions, no secrets). Next.js guide checked: `node_modules/next/dist/docs/01-app/02-guides/testing/vitest.md` (its React and jsdom packages are for component tests, so not added).
- **Red 1:** `npm test` before the script existed → `Missing script`, exit 1.
- **Red 2:** with the scripts but no config, the harness test failed for the right reason: `Error: Cannot find package '@/next.config'`, exit 1.
- **Green:** `npm test` 1 passed; `npm run typecheck` 0; `npm run gate` 0; `CI=true npm run gate:setup` → `skip ANTHROPIC_API_KEY (CI)`; `npm run build` 0; client bundle files containing `sk-ant`: 0.
- **Docs in this commit:** amendment A10, ADR 0010, `docs/10_Lean_v2_Contract.md` (approved with Joe's four points), `docs/05` Mode, RCA-003 verified by Joe (2026-10-02), prompt log B7 to B9.

## Failure log (write BEFORE fixing)

| # | When | Unit | Symptom (raw) | Caught by | Cause | Fix | RCA | ADR | AI-caused? |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 2026-10-01, after C0 commit | C0 push | `git push -u origin main` → `remote: Invalid username or token. Password authentication is not supported for Git operations.` `fatal: Authentication failed` (exit 128). `origin/main` does not exist | The push itself | Git's `store` credential helper holds an invalid or expired GitHub credential; `gh` is not logged in | Joe ran `gh auth login`; authentication now works (failure 2 is a new cause) | none (no trigger) | none | No |
| 2 | 2026-10-01, push retry | C0 push | `remote: error: GH007: Your push would publish a private email address.` `! [remote rejected] main -> main (push declined due to email privacy restrictions)` (exit 1). `origin/main` still does not exist | The push itself (GitHub email privacy protection) | Commit `e405e17` is authored with the global git email, which GitHub marks private; no repo-level `user.email` is set | Repo `user.email` set to the GitHub noreply address; unpushed commit re-authored (`e405e17` → `031a5b0`); push succeeded | none (Joe: failure row is enough) | none | No |
| 3 | 2026-10-01, P0.1 `npm run dev` | P0.1 | Dev server printed `✓ Generated [private agent file] for AI agents. Set agentRules: false in next.config to disable.` (name withheld, ADR 0009). That private agent file gained a `nextjs-agent-rules` block (original text kept; file is git-ignored, nothing reached git) | Agent, reading the dev server output | Next.js 16 `next dev` writes agent rules into the private agent file by default; the P0.1 plan didn't account for it | Joe chose (a): `agentRules: false` in `next.config.ts`; added lines removed from the private agent file; the block's useful rule (read `node_modules/next/dist/docs/` before Next.js code) kept as a private standing rule | none | none | No |
| 4 | 2026-10-01, P0.1 copy step | P0.1 | Agent's copy loop `for f in $FILES` in zsh: `cp: …/scaffold/app/favicon.ico app/globals.css … tsconfig.json: No such file or directory`; loop ran once, copied nothing, and `mkdir -p` created an empty nested folder tree under `app/` named after the whole file list | Agent, reading the command output | zsh does not split an unquoted string variable into words (bash does); the agent wrote bash-style code for a zsh shell. **Process slip:** the agent fixed it (deleted the empty tree, re-ran with an inline list) before writing this row | Empty tree removed after confirming 0 files inside; files copied one at a time with an inline list; `git status --untracked-files=all` confirmed only expected paths | RCA-001 (trigger 3: AI-caused) | none | Yes (coding agent) |
| 5 | 2026-10-01, P0.2 step 2 (red run) | P0.2 | Before any install, `npm run gate:setup` printed `ok   zod` (exit 1 overall from `MISSING ai`, `MISSING @ai-sdk/anthropic`, `MISSING vitest`, `MISSING ANTHROPIC_API_KEY`). Plan expected `MISSING zod`. `npm ls zod`: `zod@4.6.5` installed transitively via `eslint-config-next` → `eslint-plugin-react-hooks@7.1.1`; not in `package.json` | Agent, comparing the red output to the plan | The gate checks only that `node_modules/<pkg>/package.json` exists, not that the project declares the package. A transitive copy passes the check, so the gate can be green while a real dependency is undeclared (its version is set by a lint plugin, and it would vanish if that plugin changed) | Joe approved: the gate also requires each package to be declared in `package.json` `dependencies` or `devDependencies` (`scripts/setup-gate.mjs`); the private reference script got the same fix. Re-run red: `MISSING zod (not declared in package.json)` | none (Joe: failure row plus the reference-script fix) | none | Partly (the Agent's plan predicted the wrong red); prompt log B4 |
| 6 | 2026-10-01, P0.2 step 3 (install) | P0.2 | Agent ran `npm install zod ai @ai-sdk/anthropic …; echo "exit=$?"; echo ======; npm install -D vitest …` in one call. First install succeeded (`exit=0`, added 11 packages). Then `(eval):1: ===== not found`, tool exit 1; `vitest` never installed (`node_modules/vitest` absent, not in `package.json`) | Agent, reading the command output | zsh "equals expansion": an unquoted word starting with `=` is replaced by the path of the command named after it, so `======` looked up a command `=====`, failed, and aborted the rest of the line. The agent wrote a bash-habit separator in zsh again (same kind as failure 4) and chained two state-changing installs in one call | Joe approved: RCA-002 prevention added first (private shell rules), then `npm install -D vitest` run alone. Auto mode was on during this step (see Snapshot process note) | RCA-002 (triggers 3: AI-caused, 5: same kind as failure 4) | none | Yes (coding agent); prompt log B5 |
| 7 | 2026-10-01, P0.2 failure 6 fix (`npm install -D vitest`, run alone, default mode) | P0.2 | `npm error code ERESOLVE` … `While resolving: vitest@5.0.3` `Found: @types/node@20.19.43` (`dev @types/node@"^20" from the root project`) `Could not resolve dependency: peerOptional @types/node@"^22.0.0 \|\| >=24.0.0" from vitest@5.0.3` … `Fix the upstream dependency conflict, or retry this command with --force or --legacy-peer-deps`. `FAILED`; vitest not installed | npm (peer dependency check) | The scaffold pins `@types/node` to `^20` (Node 20 type definitions), but the project runs Node 24 (`.nvmrc`, `engines` `24.x`). vitest 5 accepts only `@types/node` `^22` or `>=24` as a peer | Joe chose option 1: `npm install -D @types/node@^24` (→ 24.19.0, matches the Node 24 runtime), then `npm install -D vitest` (→ 5.0.3), each alone, both exit 0. Rejected: `--legacy-peer-deps` / `--force` (hides the conflict), older vitest (keeps types out of step with Node 24) | none (Joe: row only) | none (Joe: follows from the P0.1 Node 24 decision) | No |
| 8 | 2026-10-01, P0.2 C2 review | P0.2 (and P0.1) | Code review, both axes NEEDS_CHANGES. (1) The new Snapshot "Permission mode" row names a private method file and one of its sections; ADR 0009 allows only "private build method (kept local)". `git grep` (excluding `.gitignore`) finds six more private method file names in files of the unpushed P0.1 commit (now `9b2a120`; its pre-cleaning hash existed only locally): two P0.1 plan lines and Failure row 3 in `progress.md`, B1 and B2 in `docs/prompt_log.md`, a comment in `next.config.ts`; plus one in that commit's message. `807c951` and `origin/main`: none. (2) The P0.2 C2 file list leaves out `docs/prompt_log.md` (B4, B5) and `docs/rca/RCA-002-…` | Code-review skill (C2 reviewer) | The Agent wrote private method file names into public files in P0.1 and P0.2, and no gate checks public files or commit messages for them. The C2 list was written at C1, before failures 5 and 6 added docs | Joe approved: rebuild the unpushed P0.1 commit from cleaned copies of its files and message (no interactive commands, local backup branch), clean the working tree, add the two missing files to the P0.2 commit | RCA-003 (triggers 3: AI-caused, 5: same kind happened in P0.1) | none | Yes (coding agent) |
| 9 | 2026-10-02, Phase 0 batch review | Phase 0 batch | Spec reviewer NEEDS_CHANGES: `docs/10_Lean_v2_Contract.md` line 5 records only three of Joe's four approval points (missing: ADR 0010, the contract, the progress.md changes and the docs/05 Mode update go in the Phase 0 batch commit). Standards reviewer PASS with doc notes: docs/05 U8 row still "eleven cases run, deps diffed, pending" and its Status paragraph still says "at every C2"; P0.3 Unit-log row keeps its old done-when | Code-review skill (spec and standards) | The Agent summarised Joe's approval from memory of the plan rather than from his message, and updated docs/05's Mode paragraph without the table rows it governs | Add point 4 to the contract; docs/05 U8 row folded with "deps diffed" kept as an end step, Status paragraph updated to once per batch; P0.3 row notes red 2 replaces the sanity test | none (row only, fixed on first try) | none | Yes (coding agent) |
| 10 | 2026-10-02, first CI run (PR #1) | Phase 0 batch | GitHub Actions `gates` failed on push and on pull_request at `npm run typecheck`: `app/layout.tsx(20,50): error TS2304: Cannot find name 'LayoutProps'.` `Process completed with exit code 2.` Locally `npm run typecheck` and `npm run gate` had exited 0 | CI (escaped the local gate) | `LayoutProps` is a global type Next.js 16 generates into `.next/types` (by `next dev`, `next build` or `next typegen`). Locally a stale `.next` from earlier builds supplied it; CI starts from a clean checkout with no `.next`, so `tsc --noEmit` fails. The local gate was never run from a clean checkout | `typecheck` = `next typegen && tsc --noEmit` (Next.js docs `01-app/01-getting-started/03-layouts-and-pages.md`). Clean clone of the branch: red reproduced (`TS2304`, exit 2), then green (typecheck 0, `CI=true npm run gate` 0, build 0). First fix attempt | RCA-004 (trigger 1: escaped a gate; trigger 3: AI-caused) | none | Yes (coding agent) |

## Follow-ups (logged, not scheduled)

| # | From | What | Why it waits |
|---|---|---|---|
| F1 | P0.2 C2 review (Spec) | `setup-gate.mjs` key check disagrees with the Next.js env loader in three cases: `ANTHROPIC_API_KEY= # comment` passes (false green); with two key lines the gate reads the first, the loader uses the last (possible false green); `export ANTHROPIC_API_KEY=…` reports MISSING (false red) | Joe's current `.env.local` passes the gate cleanly and hits none of these |
| F2 | P0.2 C2 review (Standards and Spec) | `setup-gate.mjs` crashes with a stack trace (still exit 1) instead of printing `MISSING` when `.nvmrc` or `package.json` is missing, or when run outside the project root | `npm run gate:setup` always starts in the project root, where both files exist |

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
| A10 | 2026-10-01 after P0.2 | **Lean v2** replaces Full mode for the rest of the project: one contract approval instead of a C1 per unit; work in batches (Phase 0, A: U1 calc + U2 schema + U6 rules, B: U3 manual path + U7 site walk + U5 confirm, C: U4 AI extract), units in parallel worktrees, one PR per batch; tests still written first and must fail first, known-bad check only for calc; both reviewers run in parallel once per batch; up to 3 retries before escalating, every failure logged; local hooks enforce the private-name rule (no manual grep at C2); progress.md and prompt log updated once per batch; design board check once at the end on the live URL; P0.3 folds into P0.4, P0.6 dropped (hooks cover it), U8 edge-case tests fold into the calc and schema tests. DoD engine line becomes "every unit merged after Joe verified its evidence." Supersedes the per-unit cadence of A9 and ADR 0008 | Joe's decision: finish tonight with a smaller set of human gates, keeping the contract, test-first, reviews, CI and Joe-only merges | progress, 05, ADR 0010, prompt_log (at batch close) | Yes (Joe's decision) |

## Root cause analyses (RCA index)

Each RCA names a prevention that changes the system.

| RCA | Title | Unit | Category | Prevention (file) | Status |
|---|---|---|---|---|---|
| RCA-001 | Copy loop broke under zsh word splitting | P0.1 | AI output (coding agent) | Rule: no loops over unquoted string variables; inline lists or arrays; check `git status --untracked-files=all` after any bulk file operation; log before cleanup (private build method, kept local) | Confirmed by Joe; prevention in place |
| RCA-002 | Shell separator `======` broke under zsh equals expansion | P0.2 | AI output (coding agent) | Rules: quote every literal in shell commands, never start an unquoted word with `=`; one state-changing command per call (private build method, kept local) | Confirmed by Joe; prevention in place |
| RCA-003 | Private method file names written into public files and a commit message | P0.2 (origin P0.1) | AI output (coding agent) | Local `pre-commit` + `commit-msg` hooks in `.git/hooks/` (never pushed) block private names in staged files and messages; rules: grep public diffs before every C2, never `--no-verify` (private build method, kept local) | Approved by Joe; prevention in place (hooks shown blocking three known-bad commits in a scratch clone) |
| RCA-004 | Typecheck passed locally only because of stale build output | Phase 0 batch | AI output (coding agent); test gap; environment | `typecheck` generates route types itself (`package.json`); rule: run the CI sequence in a clean clone before asking to push (private build method, kept local) | Draft, awaiting Joe |

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
