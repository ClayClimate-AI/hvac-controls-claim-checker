# Field Instrument

The design system for the Savings Claim Checker: a tool that helps facility managers check a vendor's energy savings claim before they buy. It should feel like a well-made field instrument. Calm, exact, and honest about what it knows and what it doesn't.

Built from the Savings Claim Checker wireframes (Paste, Confirm, Site details, Results, States). This is a first, small system: one light theme, three typefaces, eleven colors, five spacing steps, three radii. Components are specified below and not yet built as code.

## How to use this system

- Load the three Google Fonts faces: Barlow Condensed 700, IBM Plex Sans 400/500/600, IBM Plex Mono 400/500.
- Use only these tokens. No new colors, font sizes, spacing values or radii. If something seems to need one, the design is asking for a change: raise it, don't improvise.
- In Tailwind v4, put the tokens in `app/globals.css` under `@theme` (example at the end). Then classes like `bg-paper`, `text-ink-muted`, `border-rule`, `rounded-lg` come from this system.

## Content fundamentals

Write the way a good field technician talks to a building owner: plain, specific, no hype.

- **Numbers always carry units.** `97,200 kWh per year`, `$24,000 installed`, `3.3 yrs`. Never a bare number.
- **Say what is missing.** Use "Not stated" when the proposal doesn't say something. Never "N/A", never a blank.
- **Buttons say what happens.** "Extract claims", "Continue to site details", "Copy questions for vendor". Never "Submit" or "OK".
- **Red flags are questions, not accusations.** Write each one as a question the manager can ask the vendor. "Ask: How are results adjusted for a hotter or milder year?"
- **Assumptions are labeled as assumptions.** "Assumption: schedules with one-speed fans reduce expected savings by 25%. Rule of thumb, editable. Change." Never present a rule of thumb as a published fact.
- **Errors say what to do next.** "We couldn't find a savings claim in this text. Check that you pasted the body of the proposal." No apologies, no error codes in the words people read.

## Visual foundations

### Color has three jobs, and only three

| Meaning | Tokens | Where it appears |
|---|---|---|
| **Verified** | `steel`, `steel-tint` | Confirmed values, the adjusted result, links, focus ring |
| **Needs a human look** | `gauge`, `gauge-ink`, `gauge-tint` | Check values, red flags, the vendor claim bar |
| **Error** | `fault` | Failed input and failed requests only |

Everything else is `ink` on `paper` and `panel`. The screen should be mostly quiet so the two signal colors mean something when they show up.

- `gauge` is for shapes (bars, borders, icons). For words in the amber family, use `gauge-ink`.
- A red flag is **amber, not red**. It is a question to ask, not a failure.
- Never rely on color alone. Every status also has a word chip: Found, Check, Not stated, Confirmed.

### Typography

- **Barlow Condensed** (`nameplate`) is the equipment-plate voice: screen titles and the single verdict on Results, uppercase. Use it once per screen.
- **IBM Plex Sans** carries everything people read.
- **IBM Plex Mono** carries everything the app reads or calculates: extracted values, results, the quoted source sentences, and the small uppercase `label` style. If it's data, it's mono. This makes the line between "what the vendor said" and "what we're telling you" visible.

### Layout, spacing and shape

- Page margin `space-10`. Cards pad `space-6`. Rows pad `space-4`. Nothing uses a value off this scale.
- Hairline borders (`rule`) instead of shadows. Panels are `panel` on `paper` with a 1px `rule` border and `radius-lg`.
- Chips are `radius-sm`, nearly square, like a printed label. Buttons and inputs are `radius-md`.
- One primary action per screen: `ink` fill, white text, 48px tall.
- Touch targets are at least 44px tall. Facility managers use tablets in mechanical rooms, sometimes with gloves.

### Iconography

Stroke icons only, 1.75px stroke, `currentColor`, 16 or 20px. No emoji, no filled illustration icons. Use icons sparingly: a check on Confirmed, a warning ring on errors, a copy icon on "Copy questions".

## Components (specified, not yet built)

| Component | What it shows | States |
|---|---|---|
| **StepTracker** | The four steps: Paste proposal, Confirm values, Site details, Results | done (steel text), current (ink pill, white text), upcoming (ink-muted) |
| **StatusChip** | The status of one extracted value | Found (steel on steel-tint), Check (gauge-ink on gauge-tint), Not stated (ink-muted, dashed rule border), Confirmed (white on steel with a check icon) |
| **SourceQuote** | The exact sentence a value came from, in mono, with the value highlighted in `steel-tint` | default, hovered (the matching sentence also highlights in the proposal text), missing ("No sentence found") |
| **ConfirmRow** | Field, editable value, StatusChip, SourceQuote, review button | unreviewed, reviewed, Check (whole row on gauge-tint) |
| **CaseBar** | One result case as a bar drawn to a shared scale, with kWh, dollars and payback | vendor claim (hatched `gauge`, unverified), adjusted (solid `steel`), conservative (steel at lighter weight) |
| **RedFlagItem** | A missing item written as a question to ask the vendor | Ask before signing (gauge), Your side (dashed, ink-muted) |
| **AssumptionPill** | One editable rule of thumb with a Change link | default, editing |
| **ErrorBanner** | What went wrong and the next action | no claim found, input too short |

## Interaction specs

These make the logic visible. Each has a reduced-motion version: with `prefers-reduced-motion`, skip the animation and show the end state.

- **Source link on hover:** hovering or focusing a value highlights its source sentence in `steel-tint` in the proposal text. 120ms fade.
- **Fields fill as they're read:** while Claude extracts, each field in the list fills in as its value arrives, instead of a spinner. If the extraction returns all at once, reveal fields 80ms apart.
- **Bars settle:** on Results, all three bars start at the vendor claim's length and settle to their own values over 600ms, so the gap between the claim and the adjusted case is something you watch happen.
- **Live recalculation:** changing an assumption recalculates every case immediately. Changed numbers flash `steel-tint` for 400ms.
- **Copy confirmation:** "Copy questions for vendor" swaps to "Copied" with a check icon for 2 seconds.

## Accessibility

- Text meets 4.5:1 on its background. `ink-muted` is the lightest grey allowed for text. `gauge` is never used for text.
- Every status pairs a color with a word.
- Real `<button>`, `<a>`, `<label>` and `<input>` elements. Focus ring: 2px `steel`, 2px offset.

## Tailwind v4 example

```css
@import "tailwindcss";

@theme {
  --color-paper: #f6f4ee;
  --color-panel: #ffffff;
  --color-ink: #1b1c1e;
  --color-ink-muted: #55575b;
  --color-rule: #d4d1c7;
  --color-steel: #1d5a86;
  --color-steel-tint: #e3edf5;
  --color-gauge: #c9781c;
  --color-gauge-ink: #8a4a00;
  --color-gauge-tint: #f7e6cc;
  --color-fault: #9e3322;
  --font-display: "Barlow Condensed", "Arial Narrow", sans-serif;
  --font-sans: "IBM Plex Sans", system-ui, sans-serif;
  --font-mono: "IBM Plex Mono", ui-monospace, monospace;
  --radius-sm: 3px;
  --radius-md: 6px;
  --radius-lg: 10px;
}
```

Tailwind's default spacing scale is based on 4px steps, so `p-1`, `p-2`, `p-4`, `p-6` and `p-10` line up with `space-1` through `space-10` here.
