# 06 · Design

## Sequence followed

1. **User flow** (in `02_Specification.md`)
2. **Wireframes:** five gray boards with real content and computed numbers
3. **Design system:** "Field Instrument"
4. **High fidelity:** the Results screen, interactive
5. **Handoff:** to Claude Code, when U3 starts (next step)

## Live links

- Wireframes and high-fidelity Results (Claude Design canvas): https://claude.ai/artifact/56x9EpPx2N1ToV7ijuUJ6x
- Field Instrument design system: https://claude.ai/artifact/C2BzUZnkGKEmjjbdMrBP8R

Everything the build needs is in `docs/design/`:

| Folder | Contents | Use it for |
|---|---|---|
| `docs/design/wireframes/` | PNG of every board (01 Paste to 06 high-fidelity Results) | Visual target. Compare the running page against it at C2 |
| `docs/design/html/` | The same boards as static HTML with exact inline styles and copy | Exact spacing, sizes, copy text and structure. Read before building a screen |
| `docs/design/system/` | `tokens.json` and the Field Instrument README | Colors, type, spacing, radii and component rules |

Screen to unit map: Paste (01) and States (05) in U3 and U4; Confirm (02) in U5; Site (03) in U7; Results (04 wireframe, 06 high fidelity) in U3, U6 and U7. The high-fidelity board (06) is the look for every screen; the wireframes set the structure.

## Wireframe boards

| Board | Shows | Key decisions |
|---|---|---|
| Main (Paste) | Paste box, sample link, what happens next | One primary action; tells the user nothing is saved |
| Confirm | Value, status chip (Found / Not stated), source sentence per row | The sentence sits next to the value so checking is fast |
| Site | Only the questions the proposal didn't answer | Prefilled fields show their source; helper text says where to find each number |
| Results | Three cases as bars, red flags as questions, assumptions | Vendor claim shown as a marker so the gap is visible |
| States | Loading, empty, 400, 422, 502 | Every error says what to do next in plain words |

## Design system: Field Instrument

The idea: the app should feel like a calibrated instrument or a printed spec sheet, built for facility people, not a generic software demo.

### Colors (each has one job)

| Token | Hex | Job |
|---|---|---|
| paper | #f6f4ee | Page background |
| panel | #ffffff | Cards, tables, inputs |
| ink | #1b1c1e | Text, primary button |
| ink-muted | #55575b | Secondary text (lightest grey allowed for text) |
| rule | #d4d1c7 | Hairlines only, never text |
| steel | #1d5a86 | **Verified:** confirmed values, adjusted bar, links, focus |
| steel-tint | #e3edf5 | Verified backgrounds, assumption pills |
| gauge | #c9781c | **Needs a human look:** graphics only |
| gauge-ink | #8a4a00 | Text for check and red flag states |
| gauge-tint | #f7e6cc | Background for items needing review |
| fault | #9e3322 | Errors only; never a red flag (a red flag is a question, not an error) |

### Type (each face has one role)

| Role | Face | Use |
|---|---|---|
| Display | Barlow Condensed 700, uppercase | Screen title and the big verdict, once per screen |
| Body | IBM Plex Sans | Headings, labels, running text |
| Data | IBM Plex Mono, tabular figures | Every number, always with its unit; stamped uppercase labels |

### Spacing and shape

Spacing: 4, 8, 16, 24, 40 px. Radii: 3 px (chips), 6 px (buttons, inputs), 10 px (panels).

### Content rules

- Numbers always carry units ("97,200 kWh", "3.3 years").
- "Not stated," never "N/A."
- Red flags are questions.
- Assumptions are labeled "rule of thumb, editable."

### Tailwind v4 tokens (paste into `app/globals.css`)

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
  --font-mono: "IBM Plex Mono", ui-monospace, Menlo, monospace;

  --radius-sm: 3px;
  --radius-md: 6px;
  --radius-lg: 10px;
}
```

Load the three fonts with `next/font/google`.

## High-fidelity Results screen

Built from the sample proposal: verdict "Holds up at 60% to 75% of the promise," three bars (vendor 97,200 kWh, adjusted 72,900, conservative 58,320), paybacks 2.5 / 3.3 / 4.1 years, red flags as questions, and two editable assumption steppers (site-walk cut 25% for schedules with one-speed fans, overdue maintenance 20%).

#### Board changes after C0 (October 1, 2026)

The HTML boards were updated as text only. **The PNG wireframes were not redrawn**, so where a PNG and its HTML board differ on the items below, the HTML board and this table win.

| Change | Boards | Why |
|---|---|---|
| "Existing controls" (None, Basic thermostats, BAS with schedules) replaced by two questions: "Do the units run on schedules?" and "Do the supply fans slow down or shut off?" (Yes, No, Unknown) | Site | ADR 0005: ask about behavior, not equipment |
| Assumption copy: "Schedules with one-speed fans reduce expected savings by 25%", labeled "rule of thumb, editable" | Site, Results, Results high fidelity | ADR 0005 |
| Example last maintenance changed from June 2025 to June 2024 | Site, Results, Results high fidelity | June 2025 is 16 months before the gate, which is not "over 24 months"; the worked example needs the 20% cut |
| "Age of main HVAC equipment" on the Site board is not built | Site | Not in `SiteConditionsSchema` and not used by any formula |
| Paste screen adds a notice: the text is sent to an AI service to be read, nothing is stored, remove names first, or use the manual path | Main (Paste) | ADR 0007; copy is set at U3/U4 C1 |
| Results adds an "Always ask" list (recurring fees; price before or after incentives), styled apart from red flags | Results | ADR 0006 |

### Interaction specs

| Interaction | Behavior | Reduced motion |
|---|---|---|
| Hover or focus a value | Its source sentence highlights | Highlight without transition |
| Results load | Bars start at the vendor claim and settle to their values (about 600 ms, ease-out) | Bars appear at final values |
| Change an assumption | All three cases recalculate; changed numbers flash steel-tint briefly | Numbers update, no flash |
| Extracting | Fields fill in one at a time while "Reading the proposal…" shows | Fields appear together |
| Copy questions | Button reads "Copied" for two seconds | Same |

## Design fidelity rules for the build

- Every UI unit's P-I-O-F names the board(s) it implements and the states it covers.
- Use the Tailwind tokens below. No raw hex values or off-scale spacing in components.
- Copy text comes from the boards and the content rules, not invented.
- At C2, Joe compares the running screen to the board at 375 px and 1280 px. Differences are fixed, or logged as an amendment if the design should change.
- Hover, bar settle, recalculate flash and "Copied" are built in the unit that owns the screen, each with a reduced-motion version.

## Handoff steps (when U3 starts)

1. In the Claude Design canvas, open the export menu and choose **Handoff to Claude Code** (beta; check your own menu names).
2. Choose **Send to local coding agent** (Claude Code CLI) or **Send to Claude Code Web**.
3. In Claude Code, ask it to build `ResultsPanel.tsx` using the tokens above and the values from `calc.ts`, not hardcoded numbers.
4. Visual QA: compare the running page to the design at 375 px and 1280 px; fix differences.
5. After launch, run `/design-sync` so the design system matches the real components.

If you use Cursor's built-in agent instead of the Claude Code CLI, export files and paste the tokens by hand; the handoff doesn't reach Cursor's agent.

## Critique checklist (applied to every board)

First glance, one action, consistency, spacing, readability, states, words, touch targets (44 px minimum).
