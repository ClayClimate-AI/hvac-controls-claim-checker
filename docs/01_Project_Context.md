# 01 · Project context

## The assignment

**Phase 1 Project, "The AI-Built Solution":** build and present an AI-powered solution to a real problem, for yourself, someone you know, or a community you're part of. The form is open: a simple website or page, an AI assistant, or a small tool or workflow. Graded on AI fluency, control and responsible use, not a specific technology.

Every project must show:

- **Fluency:** advanced prompting, and reading and judging the AI's output well
- **Control:** scoped, every part explainable, complete Prompt Log, the AI's mistakes caught
- **Responsible use:** the Trustworthy-AI lens applied, and the project's one failure mode known
- **Communication:** clear presentation on gate day, questions handled

**Gate grading:** Technical 40%, Verbal 30%, Applied 30%. Proficient or higher required on all three. A dimension that falls short is reassessed on its own.

## The problem

Commercial facility managers are being sold AI HVAC controllers with specific savings claims ("18% reduction in HVAC energy") in proposals costing $15,000 to $30,000. Those claims are:

- buried in sales language
- often missing the baseline they were measured against
- often missing a measurement and verification method
- often missing any adjustment for weather
- sometimes applied to HVAC energy, sometimes to the whole building, without saying which

A manager has no fast way to check whether the claim holds for *their* building.

## The user

A commercial facility manager or building automation professional. Technical, busy, skeptical of vendor marketing, often working from a tablet or laptop.

## Community research: top five facility management problems and how AI is used

| # | Problem | Key evidence | How AI is being used |
|---|---|---|---|
| 1 | Skilled technician shortage | 53% of trade professionals name a shortage of qualified candidates as the biggest 2026 obstacle; 39% cite retention ([NFPA via Facilitiesnet](https://www.facilitiesnet.com/facilitiesmanagement/article/AI-Labor-Shortages-and-Code-Uncertainty--20900)) | Code and manual lookup, work order drafting, capturing senior techs' knowledge |
| 2 | Alarm fatigue and untrusted fault detection | A controls tech silencing 41 alerts in under three minutes ([AutomatedBuildings](https://www.automatedbuildings.com/2026/08/alarm-fatigue-is-killing-predictive-maintenance-before-it-proves-itself/)); FDD failing from sensor drift and bad point mapping ([FrostLogic](https://www.frostlogic.se/articles/fault-detection-building-automation/)); 30% to 40% of hot and cold calls on hospital floors traced to equipment failures ([FMLink](https://www.fmlink.com/what-hot-cold-complaints-are-really-telling-you/)) | Fault detection, grouping related alarms, ranking by cost, technician feedback loops |
| 3 | Reactive maintenance | 38% of teams still run to failure (vendor source: [MaintainX](https://www.getmaintainx.com/blog/maintenance-stats-trends-and-insights)) | Predictive maintenance; about 32% of teams report partial or full AI adoption (same source) |
| 4 | Rising energy costs and building energy laws | US average electricity about 13 cents per kWh before 2019 to 19 cents by end of 2025 ([EESI](https://www.eesi.org/articles/view/data-center-power-demands-are-contributing-to-higher-energy-bills)); 50+ jurisdictions with performance or benchmarking laws, fines such as $1,000 a day in Boston ([Facilities Dive](https://www.facilitiesdive.com/news/map-tracking-building-performance-standards-across-the-us/743214/)) | HVAC schedule optimization, benchmarking automation, demand management |
| 5 | Data stuck in separate systems | BAS, CMMS and IWMS rarely integrated; vendors often control the data ([IFMA](https://jobboard.ifma.org/career-resources/on-the-job-3/smart-building-and-ai-technology-for-facility-manager-2026-131)) | Connecting systems, plain-language questions over building data |

**The thread through all five:** facility managers are being sold AI they can't verify. This project sits in problem 4 and addresses that thread directly.

## Decision log

| # | Decision | Alternatives considered | Why |
|---|---|---|---|
| D1 | Build to the written rubric; send a written scope question | Match classmates' larger full-stack builds | Nothing in the rubric rewards size or React. "Explain every part" favors a focused build. |
| D2 | Solve a problem in Joe's own domain (HVAC, controls, facilities) | AI compute energy in general | Domain knowledge lets Joe judge the AI's output and answer hard questions |
| D3 | Check the vendor's savings claim, not the controller's power overhead | Original "net energy after AI overhead" calculator | A 150 W device is about 1,314 kWh a year, about 3% of a 40,000 kWh saving. The claim itself is the real uncertainty. |
| D4 | Put one AI step inside the product: extraction with source sentences | A tool built with AI but containing no AI | "AI-powered" is ambiguous. One focused AI step makes the product clearly AI-powered and gives a strong trust story. |
| D5 | Next.js + TypeScript + Zod + Vercel AI SDK + Claude + Tailwind on Vercel | Python + Streamlit | Joe's existing stack; the API route keeps the key server-side; Zod fits the extraction schema. Streamlit remained the fallback if Next.js were unfamiliar. |
| D6 | One AI provider (Claude); no streaming or persona | Grok and ChatGPT from the previous build | Fewer keys, bills and failure points; this app needs one structured answer, not chat |
| D7 | Paste text (PDF upload as stretch); no fetching from vendor websites in Phase 1 | Claude fetching the proposal from the vendor's site | The real proposal is private and building-specific. Websites hold marketing, not proposals. Fetching adds prompt injection risk. Research mode moves to Phase 2. |
| D8 | AI prefills everything it can find; the manager confirms and fills only the gaps | Fully automatic, no human step | The AI can't know facts that aren't in the document. Confirmation is the main safeguard against a well-formed wrong number. |
| D9 | Apply savings to the HVAC share only; add site conditions; show three cases | One net savings number on whole-building kWh | Vendors usually claim HVAC savings. Site conditions change what's realistic. A range is more honest than one number. |
| D10 | Add a red flags panel written as questions to ask the vendor | Score only | Turns the output into a next action, and is where field knowledge shows |
| D11 | Assumptions shown as labeled, editable rules of thumb | Hidden constants | Avoids false precision; strong Map and Manage evidence |
| D12 | Settle on this build | Server-room cooling estimator; residential bill impact from data centers | Deadline. The cooling estimator is a strong Phase 2 candidate. The bill-impact idea would require numbers no source supports. |

## Ideas parked for later

- **Research mode:** name a product, Claude fetches public datasheets from an approved list of URLs and produces "questions to ask the vendor" before a proposal exists.
- **Server-room cooling estimator:** IT load in kW to cooling tons (1 ton = 3.517 kW) and PUE. Where AI compute meets HVAC.
- **Residential "understand your bill":** upload a utility bill, see price trends and pending rate cases, with data center growth shown as context, never as the single cause.
- **Alarm triage assistant** and **manual and code lookup assistant** for short-staffed teams.
