# Canva documentation — live source instructions

When working with the Canva Developer platform:

1. **First consult** [canva-url-manifest.json](./canva-url-manifest.json) or the official Apps/Admin indexes to locate the correct documentation URL. Placeholder files under this directory intentionally do **not** contain the documentation body.
2. Fetch the *specific* relevant Markdown page directly from its official `https://www.canva.dev/docs/...` source when needed. Prefer the official **Canva Dev MCP** where your agent supports it. In a Node.js workspace, `node scripts/canva-docs-read.mjs apps/quickstart` reads the official page on demand.
3. Verify current signatures, scopes, versions and restrictions against the live official page before implementing API behavior. A source-linked placeholder is not sufficient evidence.
4. Do not batch-mirror the documentation, fill all placeholders with copied text, or commit Canva documentation page bodies to this public repo without documented redistribution permission.
5. The existing daily Actions workflow synchronizes **URL indexes only**. It does not synchronize changes within an unchanged URL.

Official Dev MCP installation is documented at https://www.canva.dev/docs/apps/dev-mcp-server/ . For compatible clients it uses `npx -y @canva/cli@latest mcp`. This access is for *development documentation*. It is distinct from the Canva MCP connector that manipulates designs.
