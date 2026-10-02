# RCA-001 · Copy loop broke under zsh word splitting

| Field | Value |
|---|---|
| Date | 2026-10-01 |
| Unit | P0.1 |
| Failure log row | progress.md #4 |
| Severity | Medium (wrong behavior caught before commit) |
| Caught by | Agent, reading the command output |
| Should have been caught by | The command itself: list items inline, then check `git status --untracked-files=all` before going on |

## 1. Symptom
The agent copied the scaffold files with `for f in $FILES; do … done`, where `FILES` was one space-separated string. Raw output: `cp: …/scaffold/app/favicon.ico app/globals.css … tsconfig.json: No such file or directory`, followed by one line `copied: app/favicon.ico app/globals.css … tsconfig.json`. Nothing was copied. `mkdir -p "$(dirname "$f")"` created an empty nested folder tree under `app/` named after the whole list.

## 2. Impact
None reached git or a user: the tree held no files and was removed before any commit. Two risks if it had gone unnoticed: a later "copy" step reporting success when nothing was copied, and junk folders committed into the public repo. The misleading "copied:" line shows that a script's own success message can't be trusted.

## 3. Timeline
- Detected: immediately, from the `cp` error in the output
- Logged (before any fix): **No.** The agent removed the empty tree and re-ran the copy before writing the Failure log row. Logged afterwards as row #4 at P0.1 C2
- Fixed: tree removed after confirming 0 files inside; files copied one at a time with an inline list; `git status --untracked-files=all` showed only expected paths
- Verified by Joe: P0.1 checks (build passes, `git status` clean of private files, starter page loads)

## 4. Five whys (confirmed by Joe, 2026-10-01)
1. Why did nothing copy? The loop ran once, with the whole list as one file name.
2. Why one item? The shell is zsh, and zsh does not split an unquoted string variable into words; bash does.
3. Why was bash behavior assumed? The agent wrote the loop in bash style without checking which shell runs its commands.
4. Why did it also print "copied:"? The success message was printed whether or not `cp` succeeded, and `set -e` didn't stop the loop.
5. Why could this slip through? No rule required checking the shell's behavior, and no check of the working tree ran after a bulk file operation. → **Root cause:** shell-specific scripting with no verification step after bulk file changes.

## 5. Root cause category
- [ ] Spec gap
- [x] AI output (coding agent produced it) → prompt log row B3
- [ ] My code
- [ ] Test gap
- [ ] Environment or dependency
- [ ] Design mismatch

## 6. Fix
Empty tree removed (after confirming it held 0 files), files copied one at a time with an inline list, result checked with `git status --untracked-files=all`. Ships in the P0.1 commit.

## 7. Prevention (must change the system; confirmed by Joe, 2026-10-01)
Standing rules for the coding agent, added to the technical rules of the private build method (kept local):
- Never loop over an unquoted string variable. Write lists inline or use an array.
- Print "done" only when the command actually succeeded (`cmd && echo ok || echo FAILED`).
- After any bulk file operation (copy, move, generate), run `git status --untracked-files=all` and check for unexpected paths before the next step.
- A failure is logged before anything is cleaned up or retried, including the agent's own mistakes.

## 8. Links
- ADR: none
- Amendment: none
- Prompt log row: B3
- Commit: P0.1 commit (hash added after merge)
