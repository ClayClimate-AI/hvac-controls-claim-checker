# RCA-003 · Private method file names written into public files and a commit message

| Field | Value |
|---|---|
| Date | 2026-10-01 |
| Unit | P0.2 (origin in P0.1) |
| Failure log row | progress.md #8 |
| Severity | Medium (wrong behavior caught before it reached GitHub) |
| Caught by | Code-review skill at P0.2 C2 (Standards and Spec reviewers) |
| Should have been caught by | A check on every commit, before P0.1 was committed |

## 1. Symptom
The P0.2 C2 review flagged a new Snapshot row in `progress.md` that named a private method file and one of its sections. ADR 0009 allows public files to refer to these files only as "private build method (kept local)". A `git grep` that excluded `.gitignore` then found six more names in the files of the unpushed P0.1 commit (now `9b2a120`; its pre-cleaning hash existed only locally):
- two P0.1 plan lines and Failure row 3 in `progress.md`
- B1 and B2 in `docs/prompt_log.md`
- a comment in `next.config.ts`

That commit's message also contained one. `807c951` and `origin/main` were clean.

## 2. Impact
None of this was pushed. Had it been, the public repo and its history would have shown the names of the private build method files that ADR 0009 keeps out of view. Removing a name from history after a push needs a force-push, and copies may already exist in forks, caches or pull request refs. A grader wouldn't see a wrong number, but Joe's control over what leaves the machine would be visibly broken.

## 3. Timeline
- Detected: 2026-10-01, P0.2 C2 code review
- Logged (before any fix): 2026-10-01, Failure log row 8
- Fixed: 2026-10-01, P0.1 rebuilt as `9b2a120`, working tree cleaned, `pre-commit` and `commit-msg` hooks installed after blocking three known-bad commits in a scratch clone
- Verified by Joe: 2026-10-02 (the hooks passed a clean real commit, `f09bd5a`, and blocked the known-bad commits in the clone test)

## 4. Five whys
1. Why did private file names appear in public files? The Agent wrote them when recording P0.1 and P0.2 facts: the copy-skip list, the Next.js agent-rules message, the permission-mode rule and a code comment.
2. Why did the Agent write them? It described what happened in the most literal terms. It applied the naming rule only to deliberate references, not to raw output, file lists or code comments.
3. Why wasn't it caught at P0.1? The P0.1 C2 check was "`git status` shows no private file". That checks which files are staged, not the text inside staged files or the commit message.
4. Why did that check look only at file paths? Rule 12 lists checks for staging (no `git add -f`, no `git add -A`, check `git status`) but none for content.
5. Why was there no content check? Nothing in the system reads public text for these names. → **Root cause:** rule 12 is enforced on file paths only. Nothing checks the text of public files or commit messages, so a name written in prose or a comment passes every gate.

## 5. Root cause category
- [ ] Spec gap (the contract didn't cover it) → amendment required
- [x] AI output (model or coding agent produced it) → prompt log row required
- [ ] My code
- [ ] Test gap (a test existed but couldn't fail on this)
- [ ] Environment or dependency
- [ ] Design mismatch

## 6. Fix
- Rebuild the unpushed P0.1 commit from cleaned copies of its files and message: `git hash-object` + `git update-index --cacheinfo`, then `git commit --amend -F`. No interactive commands.
- Keep a local backup branch until the first push of `chore/phase-0` and a clean grep of the pushed branch.
- Reword the same lines in the working tree.
- Commit: P0.1 rebuilt as `9b2a120`, and the P0.2 commit on `chore/phase-0`.

## 7. Prevention (must change the system; approved by Joe, 2026-10-01)
- A local `pre-commit` hook and a `commit-msg` hook in `.git/hooks/`. Git never pushes that folder. They block any commit where a staged file other than `.gitignore`, or the commit message, contains a private method file name. Shown to block a known-bad commit before it is relied on.
- Private build method rules (kept local):
  - Grep public diffs and commit messages for private names before every C2.
  - Never use `--no-verify` on a commit.

## 8. Links
- ADR (if the fix carried a decision): ADR 0009 (the rule this enforces)
- Amendment (if spec gap): none
- Prompt log row (if AI-caused): `docs/prompt_log.md` B6
- Commit:
