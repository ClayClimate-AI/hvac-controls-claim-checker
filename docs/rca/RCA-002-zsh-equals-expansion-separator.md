# RCA-002 · Shell separator `======` broke under zsh equals expansion

| Field | Value |
|---|---|
| Date | 2026-10-01 |
| Unit | P0.2 |
| Failure log row | progress.md #6 |
| Severity | Medium (wrong behavior caught before commit) |
| Caught by | Agent, reading the command output |
| Should have been caught by | The agent's own shell rule, before the command ran (RCA-001 covered only word splitting) |

## 1. Symptom
The agent ran one command: `npm install zod ai @ai-sdk/anthropic 2>&1; echo "exit=$?"; echo ======; npm install -D vitest 2>&1; echo "exit=$?"`. The first install succeeded (`added 11 packages`, `exit=0`). Then zsh printed `(eval):1: ===== not found` and the tool returned exit 1. `vitest` was never installed: `node_modules/vitest` was absent and `package.json` didn't list it.

## 2. Impact
Nothing reached a commit or a user. If the agent hadn't read the output, the step would have looked half-done. The next gate run would have reported `MISSING vitest`, so the setup gate would still have caught it. The main cost is trust: it's the second zsh mistake from the agent in one day, after RCA-001.

## 3. Timeline
- Detected: 2026-10-01, P0.2 step 3, from the command output
- Logged (before any fix): 2026-10-01, Failure log row 6, before any retry
- Fixed: 2026-10-01, prevention rules added; `vitest` installed alone after the failure 7 fix (`@types/node` ^24)
- Verified by Joe: 2026-10-01, P0.2 checks (`gate:setup` 0, known-bad 1, lint 0, build 0, `git status` clean)

## 4. Five whys
1. Why wasn't vitest installed? The second `npm install` never ran.
2. Why didn't it run? zsh stopped the command line at `echo ======` with `===== not found`.
3. Why did `echo ======` fail? In zsh, an unquoted word that starts with `=` triggers "equals expansion": `=name` is replaced by the path of the command `name`. `======` asked for a command called `=====`, found none, and zsh aborted the line.
4. Why did the agent write it? It used a bash habit (a bare `=====` separator), and it put two state-changing installs in one call, so one stray error took out the second.
5. Why didn't RCA-001 prevent it? RCA-001's rule covered one zsh trap (word splitting of unquoted variables). It didn't cover the general cause: the agent writes bash idioms and runs them in zsh. → **Root cause:** the shell rule names a single trap instead of a habit that avoids the whole class, and it doesn't limit how much a single call can change.

## 5. Root cause category
- [ ] Spec gap (the contract didn't cover it) → amendment required
- [x] AI output (model or coding agent produced it) → prompt log row required (B5)
- [ ] My code
- [ ] Test gap (a test existed but couldn't fail on this)
- [ ] Environment or dependency
- [ ] Design mismatch

## 6. Fix
Re-run `npm install -D vitest` as a call of its own, then confirm with `npm run gate:setup`. Commit: the P0.2 commit on `chore/phase-0`.

## 7. Prevention (must change the system; confirmed by Joe, 2026-10-01)
Add these to the shell rules in the technical rules of the private build method (kept local), next to the RCA-001 rule:
- Quote every literal string in a shell command (`echo '---'`, never a bare `======`). Never start an unquoted word with `=`.
- One state-changing command (install, copy, move, delete, git write) per tool call. Check its exit code before the next one.

## 8. Links
- ADR (if the fix carried a decision): none
- Amendment (if spec gap): none
- Prompt log row (if AI-caused): `docs/prompt_log.md` B5
- Commit:
