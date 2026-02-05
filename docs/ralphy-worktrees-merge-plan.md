# Ralphy Worktrees Merge Plan

## Intended Merge Policy

**Policy**: Standard Merge Commits (non-squash, non-fast-forward when diverged)

## Rationale

The project uses standard merge commits to preserve the complete history of agent worktrees. Each merge creates a merge commit that explicitly records:

1. **Branch Name**: The source agent branch (e.g., `ralphy/agent-11-1770227830941-wda4yl-identify-missing-validation-schema-typing-and-prop`)
2. **Merge Point**: The exact point where the agent's work was integrated
3. **Commit History**: The full commit history from the agent's worktree is preserved

## Evidence

Recent merge commits from `git log` confirm this policy:

```
c0b2e5c Merge ralphy/agent-11-1770227830941-wda4yl-identify-missing-validation-schema-typing-and-prop into main
fdbafb2 Merge ralphy/agent-25-1770230214011-0bm79y-add-npm-run-typecheck-if-missing-run-and-resolve-a into main
4f03874 Merge ralphy/agent-24-1770229875065-mmngzq-update-github-issues-and-sample-project-entries-to into main
```

## Merge Procedure

1. **Checkout main branch**:

   ```bash
   git checkout main
   git pull origin main
   ```

2. **Merge the agent worktree branch**:

   ```bash
   git merge ralphy/agent-XX-<timestamp>-<branch-slug>
   ```

3. **Resolve any conflicts** (if they arise):
   - Edit conflicted files
   - `git add <resolved-files>`
   - `git commit` (to complete the merge)

4. **Push to origin**:
   ```bash
   git push origin main
   ```

## Alternative Policies Considered

| Policy           | Status   | Reason                                                                            |
| ---------------- | -------- | --------------------------------------------------------------------------------- |
| **Squash Merge** | Rejected | Would flatten agent work history, losing traceability of individual agent commits |
| **Fast-Forward** | Rejected | Not applicable when branches have diverged; would not record merge metadata       |

## Notes

- This policy applies specifically to merging Ralphy agent worktrees into main
- The branch naming convention `ralphy/agent-XX-<timestamp>-<slug>` provides traceability
- Merge commit messages follow the pattern: `Merge <branch-name> into main`
