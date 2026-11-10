# Canva documentation index synchronization

This repository uses Canva's **official documentation URL indexes**, not a mirror of complete documentation page content.

## Sources

- https://www.canva.dev/docs/apps/llms.txt
- https://www.canva.dev/docs/admin/llms.txt

The automation runs daily at **06:17 UTC** and can be started manually from GitHub Actions. It fetches only these two public indexes. It uses Node.js built-in functionality; no external npm packages or credentials are required to read the indexes.

## Behavior

1. Parse listed documentation URLs and map their paths under `docs/canva/`.
2. Create a small Markdown **source-link placeholder** only when a referenced local file does not exist.
3. Maintain `docs/canva/canva-url-manifest.json` (source URLs, paths and source index).
4. Show URL additions, URL changes and withdrawals through Git diffs. A withdrawal removes an entry from the manifest but **never deletes the existing file**.
5. If a change exists, push `automation/canva-docs-index` and open or update a pull request against `main`. No automatic merge.

**Not supported:** Detecting changes to the *body* of a documentation page whose URL remains unchanged. The workflow intentionally does **not fetch page bodies**, reproduce full documentation, or write into the user's Canva account. Resolve current documentation content through the original URL or Canva Dev MCP when needed.

## Verification

Run `node --test tests/sync-canva-docs-index.test.mjs` to test the parser, safe paths, preservation rules, and repeatability.

Run `node scripts/sync-canva-docs-index.mjs` locally in the repo to synchronize with the live indexes. It only modifies `docs/canva/`.

## GitHub permissions

GitHub Actions needs `contents: write` to push the automation branch and `pull-requests: write` to open its PR. The workflow uses the built-in `GITHUB_TOKEN`. GitHub may additionally require enabling **Settings → Actions → General → Workflow permissions → Allow GitHub Actions to create and approve pull requests**. If this repository setting is disabled, pushing the branch may work, while creating the PR will fail. GitHub settings must be changed by a repository administrator; this implementation does not silently bypass the restriction.

In a public repository GitHub can disable scheduled workflows after 60 days without repository activity. Check the Actions tab if scheduled runs stop. The workflow never overwrites or deletes hand-maintained documentation.
