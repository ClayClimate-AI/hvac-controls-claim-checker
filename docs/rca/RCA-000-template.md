# RCA-NNN · Short title of the failure

| Field | Value |
|---|---|
| Date | YYYY-MM-DD |
| Unit | U<n> |
| Failure log row | progress.md #<n> |
| Severity | Low (cosmetic) / Medium (wrong behavior caught before commit) / High (escaped a gate, or a wrong number reached the screen) |
| Caught by | Test / typecheck / setup gate / Joe's manual check / design comparison / CI / Vercel build / edge-case run |
| Should have been caught by | The earliest gate that could have caught it |

## 1. Symptom
What was observed, raw and unedited (error text, wrong value, screenshot description). Copied from the Failure log.

## 2. Impact
What would have happened if this reached a facility manager. Who is affected, and would they notice?

## 3. Timeline
- Detected:
- Logged (before any fix):
- Fixed:
- Verified by Joe:

## 4. Five whys
1. Why did it fail?
2. Why?
3. Why?
4. Why?
5. Why? → root cause

## 5. Root cause category
- [ ] Spec gap (the contract didn't cover it) → amendment required
- [ ] AI output (model or coding agent produced it) → prompt log row required
- [ ] My code
- [ ] Test gap (a test existed but couldn't fail on this)
- [ ] Environment or dependency
- [ ] Design mismatch

## 6. Fix
What changed, and the commit that contains it.

## 7. Prevention (must change the system)
The test, assertion, rule, schema change or gate that would catch this tomorrow. "Be more careful" is not a prevention. Name the file.

## 8. Links
- ADR (if the fix carried a decision):
- Amendment (if spec gap):
- Prompt log row (if AI-caused):
- Commit:
