# Build Scripts

This directory contains TypeScript build scripts for the Awana Labs Showcase project.

## Available Scripts

### fetch-projects.ts

Fetches all issues from `luandro/awana-labs-showcase` with the `publish:yes` label using the GitHub API.

**Usage:**

```bash
# Using the npm script
bun run fetch:projects

# Direct execution
bun scripts/fetch-projects.ts
```

**Environment Variables:**

- `GITHUB_TOKEN` (required): GitHub Personal Access Token with `public_repo` scope

**Setup:**

1. Create a Personal Access Token at https://github.com/settings/tokens
2. Grant the `public_repo` scope (for accessing public repositories)
3. Set the environment variable:
   ```bash
   export GITHUB_TOKEN=your_token_here
   ```

**Output:**

The script returns raw issue data including:

- `number`: Issue number
- `title`: Issue title
- `body`: Issue body/description (Markdown)
- `labels`: Array of labels
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp
- `state`: Issue state (open/closed)
- `html_url`: URL to the issue on GitHub
- `user`: Creator information

**Programmatic Usage:**

```typescript
import { fetchPublishableIssues } from "./scripts/fetch-projects.ts";

const issues = await fetchPublishableIssues();
console.log(`Found ${issues.length} publishable issues`);
```

**Features:**

- Automatic pagination handling (fetches all issues)
- Rate limit detection with helpful messages
- Authentication error handling
- Network error handling with clear messages
- Progress logging for large result sets
- Can be used as a module or executed standalone
- JSON output for piping to other tools
