# Prompt Log · Savings Claim Checker (Phase 1)

**Author:** Joseph Clay
**Tool:** Claude (Cowork, Opus 5.5) for planning, architecture and design
**Period covered:** planning and design phase (through September 30, 2026), pre-kickoff decisions and the C0 grill session (October 1, 2026)
**Next entries:** build phase (Claude Code), starting at Phase 0

## How to read this log

Each entry records a prompt that shaped a decision, what the AI answered, what I judged, and why. Short quotes in "quotation marks" are my wording; the rest is condensed from a long working conversation. Chatter and repeated requests are left out.

The **Judgment** column uses: **Accepted**, **Modified**, **Rejected**, or **Caught** (the AI was wrong and I or a check caught it).

## Phase A · Reading the assignment

| # | Prompt (what I asked) | AI response (summary) | Judgment | Why |
|---|---|---|---|---|
| A1 | Shared the Phase 1 assignment screenshots and asked for a requirements page | Built an HTML requirements page from the screenshots | Modified | The first screenshot was too small to read; I resent it and asked to "break it into chunks." Uncertain words were marked instead of guessed. |
| A2 | Asked whether my original plan (net energy after AI overhead, whole-building kWh, product lookup table) was a good plan, and why grading felt inconsistent with classmates' larger builds | Said to build to the written rubric, not classmates; flagged invented product specs and whole-building kWh as problems; suggested a written scope question | Accepted | The rubric rewards control and explanation, not size. Sending a written question gets an answer I can point to. |
| A3 | "Do prompts in the pre-planning phase count toward the grade?" | Probably yes under "complete Prompt Log"; log decisions, not chatter; confirm in the scope message | Accepted | This log exists because of that answer. |

## Phase B · Choosing the problem

| # | Prompt | AI response | Judgment | Why |
|---|---|---|---|---|
| B1 | "Now is this a good application to build or is this still just a calculator?" | It was mostly a calculator. Suggested reframing into a claim checker: AI reads the vendor proposal, extracts claims with sources, and flags what's missing | Accepted | An AI step inside the product makes "AI-powered" clearly true, and my HVAC background lets me judge the output. |
| B2 | Checked the premise: how big is the controller's own power overhead? | About 150 W × 8,760 h ≈ 1,314 kWh a year, roughly 3% of the savings | Caught (my premise) | My original idea centered on the smallest number in the problem. The real uncertainty is the savings claim. |
| B3 | "So we're using the API to go to the vendor site and fetch the sales document." / why can't Claude fetch the proposal itself | Real proposals are private and building-specific; vendor websites hold marketing; fetching adds prompt injection risk. Keep paste; move research mode to Phase 2 | Accepted | Clearer scope and a smaller attack surface. |
| B4 | "Give me the problem and the presented solution in a simple bullet point." | Four-line problem and solution | Accepted | Became the README summary and the first 20 seconds of the presentation. |
| B5 | Asked how to account for building condition, maintenance, location and weather | Added a site conditions step, three cases, and red flags; assumptions shown as editable | Modified | I asked why the manager should do the work; answer: the AI prefills everything it can find and the manager fills only the gaps. |
| B6 | Asked for the top five problems facility managers face and how AI is used, with a general web search | Five problems with cited sources (technician shortage, alarm fatigue, reactive maintenance, energy costs and laws, data silos) | Accepted | All five share one thread: managers are sold AI they can't verify. My project sits in problem 4. |
| B7 | Asked about an app estimating residents' bill increases from nearby data centers | Possible only as "understand your bill"; estimating one household's increase from a data center would be false precision | Rejected (idea) | No source supports the numbers. Parked for later. |
| B8 | "Okay, we'll stick with the original build." | Confirmed; listed the server-room cooling estimator as a Phase 2 candidate | Accepted | Deadline. Focus beats breadth. |

## Phase C · Choosing the stack

| # | Prompt | AI response | Judgment | Why |
|---|---|---|---|---|
| C1 | Proposed Next.js 14, Vercel AI SDK, Tailwind, TypeScript and Zod, with Grok and ChatGPT from a previous build. "What are your thoughts?" | Keep the stack; drop to one AI provider (Claude); no streaming or persona needed; any current Next.js release is fine | Modified | Fewer keys, bills and failure points. The app needs one structured answer, not chat. |
| C2 | "Where does TypeScript come into play?" | TypeScript checks my code at build time; Zod checks data at runtime; a human checks facts | Accepted | This three-layer table became the core of my trust story. |
| C3 | "So does this mean I need to put $20 onto my Claude API?" | API billing is separate from the chat subscription; about 1 cent per run on Sonnet 5.5; load about $5, auto-reload off | Accepted | Enough for development and the demo without risk of runaway cost. |
| C4 | Early advice said to use `generateObject` for structured output | Corrected after checking current Vercel AI SDK docs: `generateText` with `Output.object({ schema })` | Caught | The AI's first answer used an older API. Lesson: confirm library APIs in current docs before coding. |

## Phase D · Architecture

| # | Prompt | AI response | Judgment | Why |
|---|---|---|---|---|
| D1 | Asked for a sequence diagram showing each part of the stack, its role and position and how the parts communicate, plus call graphs, explained end to end | Architecture page: position map with trust zones, roles table, sequence diagram with two refusal points (400, 422), plain-words walkthrough, call graph, checks table, file layout | Accepted | I can now explain every arrow. The 400 and 422 branches show where the app stops instead of guessing. |
| D2 | "Can you also make the savings claim checker a PDF as well" | 10-page landscape PDF of the architecture page | Modified | First render had orphaned headings and oversized diagrams; fixed with page breaks and a height cap. One Mermaid arrow syntax was invalid and was corrected. |
| D3 | Checked the math in the plan against the worked example | Savings applied to the HVAC share (45% of 1,200,000 kWh), not the whole building | Caught | The original plan applied 18% to whole-building kWh, overstating savings by more than double. |

## Phase E · Process

| # | Prompt | AI response | Judgment | Why |
|---|---|---|---|---|
| E1 | Asked about atomic commits, tests, branches, incremental control points, Matt Pocock skills, and when process becomes overkill | Vertical slices 0 to 8 with a cut line after slice 6; one branch per slice; tests on math and rules; CI optional; overkill test | Accepted | Every slice ends working and provable. The cut line protects the demo if I fall behind. |

## Phase F · Design

| # | Prompt | AI response | Judgment | Why |
|---|---|---|---|---|
| F1 | Asked for professional wireframes: "make sure that the wireframe for the UI UX doesn't look like some one-shot AI slop" | Five mid-fidelity boards on a Claude Design canvas using real sample content and computed numbers | Modified | Two copy errors fixed: a character counter that wasn't real, and a site-details note. |
| F2 | Asked about the design sequence and how to implement wireframes with AI | Flow, wireframe, design system, high fidelity, handoff | Accepted | Explains why styling screens on the fly produces dry, inconsistent pages. |
| F3 | Asked how Claude Design works with Cursor and the Claude Code CLI | Handoff to Claude Code from the export menu; `/design-sync` and `/design` in Claude Code; Cursor's own agent doesn't receive the handoff | Accepted, to verify | Claude Design is in beta; I need to confirm menu names in my own account. |
| F4 | "Yes, let's give step one a try" | Offered visual directions; I chose **Field instrument** | Accepted | It reads as built for facility people, not a software demo. Colors each have one job: steel means verified, gauge amber means needs a look, red means error only. |
| F5 | "Let's go ahead with step two" | Interactive high-fidelity Results screen with editable assumptions and interaction specs | Accepted | This is the screen I'll demo. |
| F6 | Reviewed the 25% (existing BAS) and 20% (overdue maintenance) adjustments | The AI stated these were placeholders it made up | Caught | I must replace them with my own field judgment before the demo, and label them as rules of thumb on screen. |

## Phase G · Documentation

| # | Prompt | AI response | Judgment | Why |
|---|---|---|---|---|
| G1 | Asked for two downloadable directories: a sequential learning playbook, and a project folder with a prompt log, specs, context and next steps, after an audit of the whole chat | This folder and `Build-Methodology-Playbook/` | Accepted | One folder teaches the method; this one applies it. |
| G2 | Shared my own build method kit from an ML project and asked to map it onto this assignment: keep what is subject-agnostic, adapt the rest, flag over-engineering, and make every context document update at each gate | Kept the human approval gates, plan before code, test first, one unit per commit, failure logged before fix, ADRs and living state. Adapted the checks to Node, Vitest, Zod, GitHub Actions and a Vercel build. Cut component tests, a commit-message hook and a multi-agent crew | Accepted (C0) | The method stays private (ADR 0009); what it produces is public |

## Phase H · Pre-kickoff decisions (October 1, 2026, before the grill)

| # | Prompt | AI response | Judgment | Why |
|---|---|---|---|---|
| H1 | Asked where controller savings actually come from, and whether "has a BAS" is the right question for the discount | Research: PNNL field test (66 rooftop units, 8 buildings, rooftop-unit energy down 57% on average, mostly fan control); LBNL (about 1,500 buildings, tune-ups alone saved a median 5% to 14%). Proposed a fan question and three levels | Modified | I set the levels from field experience; the research shows where savings come from, not the size of the cut (ADR 0005) |
| H2 | Asked how to demo and test without real proposals | Fictional samples written like real proposals, each with an answer key, plus break-it cases (injection, recipe, too short) | Accepted | Real proposals are private to the building that received them; each sample needs a known right answer |
| H3 | Asked whether sending a proposal to an AI service is a confidentiality problem, and how companies handle it | Notice on screen, nothing stored, remove names first, manual no-AI path; many companies have an approved enterprise AI provider; the SDK switches providers in one line | Accepted | Strengthens Map and Manage and previews Govern (ADR 0007) |
| H4 | Asked who owns the outputs and the proposal | As understood from Anthropic's commercial terms, the user owns outputs; the proposal stays its owner's. Not legal advice | Accepted, to verify | I state it hedged and point to the provider's current terms |
| H5 | Found that my operating rules committed straight to `main` even though planning (E1) chose a branch per unit | Proposed a branch and pull request per unit, me merging, CI required | Accepted | Keeps `main` and the live demo working; makes my approval visible (ADR 0008) |
| H6 | Decided my build method files stay private, and asked what that breaks | Public docs linked to files that won't be on GitHub; nothing stopped an accidental commit; the public repo needs its own evidence | Accepted | My method is my own work; the evidence of control is public (ADR 0009) |
| H7 | Kickoff: asked the agent to read every source, list contradictions, and grill me before any code | 16 contradictions and gaps found across the docs, including a repo marked private while the DoD said public, a Must feature (F4) behind the cut line, and an edge-case table that disagreed with the answer keys | Accepted | All resolved at C0 (progress.md Amendments A1 to A8) |

## Phase I · C0 grill session (October 1, 2026)

The grill doubled as presentation rehearsal: for decisions already made, I explained them in my own words and the agent tightened the wording.

| # | Prompt (agent's question) | My answer (condensed) | Judgment | Why |
|---|---|---|---|---|
| I1 | Why does the fan question decide the discount instead of "has a BAS"? Why 50% for schedules with fans that slow down, 0% for fans running all day? | Most controller savings come from fan control (PNNL). Plenty of BAS buildings still run fans all day, so the system alone can't tell you the waste is there. If the waste is already gone, the vendor is promising savings the building already gets; if fans run all day, the claim is believable as stated. "You can't save money on a light that's already cut off." | Accepted, wording corrected | The agent caught two wording issues: PNNL's 57% was rooftop-unit energy, not whole-company savings; and the 50% is my rule of thumb, not a research number |
| I2 | What cut applies when fan behavior is unknown, and where do basic thermostats fit? | Accepted the recommendation: unknown → 25% with an "ask your tech" note; ask about behavior (schedules, fans), not equipment | Accepted | "If the manager doesn't know, the app uses the middle level and asks them to check, instead of guessing either extreme." |
| I3 | Why does overdue maintenance shrink what a controller can claim, and where does 20% come from? | It's about allocating credit: dirty filters and coils, stuck dampers and bad sensors get fixed during the install, and the controller gets the credit; a tune-up costs far less. LBNL: tune-ups alone save a median 5% to 14%, so 20% is a cautious, labeled, editable rule of thumb | Accepted, two corrections | The agent caught that I flipped the condition (the cut applies when maintenance is overdue, not done) and that 5% to 14% is of whole-building energy while 20% is a share of the claim |
| I4 | Why flag the sample gaps instead of adding math? Why does payback use the gross price? | A guess becomes a confident wrong number on screen, the opposite of what the tool is for. A red flag says what's missing and gives the manager a question to send back. Fewer fields, fewer chances for the AI to be wrong, less untested math. A rebate isn't guaranteed until approved | Accepted | Agent added: payback ignores recurring fees, so say that limit before a reviewer does (ADR 0006) |
| I5 | Isn't pasting a confidential proposal a privacy risk? | Text goes browser → my server → the Anthropic API. The app says so, stores nothing, suggests removing names, and has a no-AI manual path. I can't promise what the provider does; a company should use its IT-approved AI service, and the app switches providers easily | Accepted, one correction | The agent caught "remove prices" (payback needs the price) and turned "stores nothing" into a checkable rule: the server never logs the proposal text (ADR 0007) |
| I6 | Your samples are fictional. How do I know it works on a real one, and who could use it? | Fictional on purpose, so each has a known right answer. The user is the manager who received the proposal. Honest limit: not tested on a real proposal yet, so every value shows its sentence; a real pilot is next | Accepted | Agent added: the samples copy real tricks ("up to", rebates, a dashboard as verification, hidden instructions) |
| I7 | Why branches and pull requests when working solo on a tight day? | Branches keep `main` working; a bad unit is deleted with its branch. A PR shows the full change, passing CI, a preview link and my own merge, so approval is visible proof | Accepted | Agent added: Vercel deploys `main`, so the live URL always shows the last unit I approved (ADR 0008) |
| I8 | With the method private, how does a reviewer know you controlled the AI? | The evidence is what the process produced: a PR per unit with CI and my merge, the failure log and RCAs, and the prompt log with what I accepted and rejected | Accepted | Agent caught that a PR can't show the test came first; `progress.md` records "red confirmed" with the failing output (ADR 0009) |
| I9 | Recommendations for U1 and U6: display-only rounding, null watts = 0 W, payback "Never" / "Not stated", `missingBaseline` uses the real claim, edge-case table aligned to answer keys, new `missingClaimPct` rule, "Always ask" list | Approved 9.1 to 9.7, with one change to 9.5: case 6 (P03) expects null only. "One expected answer per test." | Modified | "One expected answer per test, so a test either passes or fails. A test that accepts two answers can't catch a mistake." The agent applied the same rule to five more answer keys (P03 price, P04 watts and weather, P05 verification, X01) |
| I10 | Schedule and boundary | Gate mode; code freeze 11:00; U3 is the minimum safe demo; unit order stays U1, U2, U3, never skipping U2 | Accepted | The schema validates every entry point, including the manual path |

## Mistakes caught (summary for the gate)

1. **Invented specs under real brand names** in the original plan's lookup table. Removed.
2. **Savings applied to whole-building kWh** instead of the HVAC share. Fixed in the formulas.
3. **Outdated SDK function** (`generateObject`), corrected to `generateText` with `Output.object`.
4. **Wrong premise:** controller overhead is about 3% of savings; the claim itself is the real uncertainty.
5. **Placeholder assumptions** (25%, 20%) made up by the AI; replaced at C0 by site-walk levels and a maintenance cut (ADR 0005).
6. **Red flags that couldn't run** (C0): option (a) for the sample gaps flagged fees and kWh-only claims the schema can't capture. Fixed with a `missingClaimPct` rule and an "Always ask" list.
7. **A design board that contradicted the math** (C0): the boards showed last maintenance as June 2025, which is not "over 24 months" before the gate, yet applied the 20% cut. Corrected to June 2024.
8. **An edge-case table that disagreed with the answer keys** (C0): it expected 18% from the injection sample, whose real claim is 15%.

## Product prompt versions (fill in during build)

| Version | Date | Change | Why | Result on sample |
|---|---|---|---|---|
| v1 | | Initial extraction prompt from `02_Specification.md` section 6 | | |
| v2 | | | | |

## Build phase entries (fill in from slice 0)

| # | Slice | Prompt | AI response | Judgment | Why |
|---|---|---|---|---|---|
| | | | | | |
