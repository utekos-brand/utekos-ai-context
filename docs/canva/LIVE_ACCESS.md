# Canva documentation — first access without manual downloads

The original source index lists 550 local document paths. Of these, the generated files are lightweight URL placeholders rather than copies of Canva's documentation.

## Automatic first access to the actual content

- **In Cursor:** use the repository's `.cursor/mcp.json` (official Canva Dev MCP).
- **In VS Code / compatible agent:** use `.vscode/mcp.json` (official Canva Dev MCP).
- **In the repo's existing Copilot MCP configuration:** a `canva-dev` entry is added without removing existing servers.
- **From Node.js:** `node scripts/canva-docs-read.mjs apps/quickstart` prints the current official Markdown page. Other examples: `admin/authentication` or `admin/api-reference/groups/create-group`. Use `--source-only` for the URL or `--list` to display known paths.

No page-by-page preparation is required for agent lookups: the agent selects the required page using the manifest and obtains the current text through the official source or Dev MCP.

**Important distinction:** This is *automatic on-demand retrieval* and **not** an initial bulk copy of all page bodies. Canva's published terms do not establish permission to republish the entire documentation library to a public GitHub repo. The repo therefore does not mirror those bodies, and the reader intentionally does not write downloaded content into tracked files.

The index synchronizer can also run immediately after changes to its workflow or script are merged into `main`, in addition to its daily schedule. GitHub will run unit tests and synchronize URL mappings; no manual initial dispatch is required.

Official references: https://www.canva.dev/docs/apps/dev-mcp-server/ and https://www.canva.com/policies/terms-of-use/
