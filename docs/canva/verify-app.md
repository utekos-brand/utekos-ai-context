> ## Documentation Index
> Fetch the complete documentation index at: https://www.canva.dev/docs/apps/llms.txt
> Use this file to discover all available pages before exploring further.

# Verify your Canva MCP app

Confirm your AI application is correctly integrated with the Canva MCP server

WARNING: We're continually improving the Canva MCP server. Got a feature request or bug report? Let us know in the [Canva Developer Community](https://community.canva.dev).

NOTE: Setting up an AI assistant like ChatGPT or Claude to use Canva for your own designs? See the [AI Connector help article](https://www.canva.com/help/mcp-agent-setup/). This guide is for teams integrating the Canva MCP server into their own AI product.

[MCP Inspector](https://github.com/modelcontextprotocol/inspector) is a browser-based MCP client for connecting to a server, listing tools, and inspecting raw requests and responses. Use it as a known-good reference: if Inspector returns the expected result and your app doesn't, the fault is in your app. If Inspector fails too, it's upstream.

## Prerequisites

* An AI application integrating the Canva MCP server.
* An MCP client [registered with Canva](https://www.canva.dev/docs/apps/mcp/access/#getting-access), authenticated using OAuth.
* The Canva MCP server URL: `https://api.canva.com/connect/v1/mcp`.

## Step 1: Connect and list your tools

List tools from your client rather than assuming a fixed set.

1. Start MCP Inspector (requires Node.js v22.7.5 or later):

   ```shell
   npx @modelcontextprotocol/inspector@latest
   ```

2. Set **Transport** to `Streamable HTTP`, enter your MCP server URL, select **Connect**, and sign in to Canva.

3. Open **Tools**, then select **List Tools**.



4. Call a read tool such as `search-designs`. Confirm it succeeds and returns the expected response. Compare the response with the same call from MCP Inspector.



If a step fails, see [Troubleshooting](https://www.canva.dev/#troubleshooting).

### Debug your app with MCP Inspector

If your AI application behaves differently from MCP Inspector, use Inspector as your known-good reference implementation.
Reproduce the same tool call in Inspector with the same arguments, then compare the raw request and response. This will help you determine whether the issue is in your app or upstream.

* **Inspector succeeds, your app fails** → The issue is likely in your app (request formatting, response parsing, or job vs direct response handling).
* **Inspector and your app fail in the same way** → The issue is likely upstream. Check `error.code` on the `job` object when present.
* **Responses differ** → Compare field names carefully. For example:
  * Use `id` rather than `design_id`.
  * Download links are returned in `urls[]` not `download_url`.
  * Editable `element_id`s come from `start-editing-transaction`, not `get-design-content`.
  * The job identifier is `job.id`.
* **URLs don't load** → Export and `media.canva.com` URLs are signed and expire (see [export-design](https://www.canva.dev/docs/apps/mcp/tools/export-design/) and [get-design-pages](https://www.canva.dev/docs/apps/mcp/tools/get-design-pages/)). `design.canva.ai` thumbnails may need redirects resolved before rendering in an `<img>` (see [generate-design](https://www.canva.dev/docs/apps/mcp/tools/generate-design/)).

## Step 2: Verify each tool

Compare your application’s responses against the documented example responses for each tool. Confirm the response structure, required fields, and any asynchronous job handling match the documentation.

### Discovery

* [`search-designs`](https://www.canva.dev/docs/apps/mcp/tools/search-designs/)
* [`get-design-content`](https://www.canva.dev/docs/apps/mcp/tools/get-design-content/)
* [`get-design-pages`](https://www.canva.dev/docs/apps/mcp/tools/get-design-pages/)

### Generation

* [`generate-design`](https://www.canva.dev/docs/apps/mcp/tools/generate-design/)
* [`create-design-from-candidate`](https://www.canva.dev/docs/apps/mcp/tools/create-design-from-candidate/)

### Editing

Open a transaction → apply operations → commit. Edits stay in draft until commit.

* [`start-editing-transaction`](https://www.canva.dev/docs/apps/mcp/tools/start-editing-transaction/)
* [`perform-editing-operations`](https://www.canva.dev/docs/apps/mcp/tools/perform-editing-operations/)
* [`commit-editing-transaction`](https://www.canva.dev/docs/apps/mcp/tools/commit-editing-transaction/)

### Assets and export

* [`upload-asset-from-url`](https://www.canva.dev/docs/apps/mcp/tools/upload-asset-from-url/)
* [`export-design`](https://www.canva.dev/docs/apps/mcp/tools/export-design/)

### Cross-tool checks

* Invalid input fails cleanly (no hang/crash).
* Full round-trip: create → open → edit → commit → export; export reflects the commit.
* Per-user isolation: credentials can't access another user's designs.

## Step 3: Verify natural language tool selection

Send the following prompts to your AI application and confirm it selects the expected Canva tool. Repeat these checks after changing prompts, system instructions, or tool descriptions.

| Prompt                                         | Expected call                  | Expected result                                  |
| :--------------------------------------------- | :----------------------------- | :----------------------------------------------- |
| "Find my onboarding designs"                   | `search-designs`               | a relevant list is returned                      |
| "Create an Instagram post for our summer sale" | `generate-design`              | candidates are returned to choose from           |
| "Use the second option"                        | `create-design-from-candidate` | a new design with an edit link is returned       |
| "What text is on this design?"                 | `get-design-content`           | the design's text is returned                    |
| "How many pages are in this deck?"             | `get-design-pages`             | the page list is returned                        |
| "Open this design so I can edit it"            | `start-editing-transaction`    | a transaction and editable elements are returned |
| "Change the headline to 'Summer Sale'"         | `perform-editing-operations`   | the edit is applied in draft                     |
| "Save those changes"                           | `commit-editing-transaction`   | status is `committed`                            |
| "Export this as a PDF"                         | `export-design`                | a download link is returned                      |

Also confirm *edit* routes to `perform-editing-operations` (not regenerate), and *create* routes to Canva when other servers are connected (see [Step 5](https://www.canva.dev/#step-5-test-tool-selection-across-multiple-servers)).

## Step 4: Verify end-to-end workflows

Test complete workflows rather than individual tools. Many integration issues only appear when chaining multiple tools together and passing data between them.

**Read before targeted edit.** *"Show me the copy on this design, then change only the subheading."*

`get-design-content` → `start-editing-transaction` → `perform-editing-operations` → `commit-editing-transaction`.

`get-design-content` has no editable `element_id`s — those come from the transaction.

**Upload an asset, then place it.** *"Add this logo to the design: https\://\<public-image-url>"*

`upload-asset-from-url` → `start-editing-transaction` → `perform-editing-operations` with the returned `asset_id` (`update_fill` / `insert_fill`).

Don't pass the raw URL into the edit. If `upload-asset-from-url` returns `fetch_failed`, confirm the URL is public HTTPS and returns 200, then retry before continuing without an `asset_id`.

**Create, then generate an image for it.** *"Create a launch poster, then add an AI-generated background image."*

Create should call Canva `generate-design`; the image step is where models often divert to built-in image gen (see [Step 5](https://www.canva.dev/#step-5-test-tool-selection-across-multiple-servers)).

## Step 5: Test tool selection across multiple servers

With multiple MCP servers connected, design prompts may never reach Canva if another tool looks similar (including native image generation).

Connect Canva alongside another server, send ambiguous prompts, and confirm Canva is called:

| Prompt                           | Should call                       |
| :------------------------------- | :-------------------------------- |
| "Create a design for our launch" | Canva `generate-design`           |
| "Make a poster for the event"    | Canva `generate-design`           |
| "Update the text on this design" | Canva `start-editing-transaction` |

If Canva loses the call:

* System-prompt guidance / explicit "in Canva" phrasing.
* Pin or force the tool when the client supports it.
* Reduce overlapping tools in context.
* Ask the user which server to use when it's ambiguous.

## Common tool-call mistakes

* Auto-selecting a generated candidate instead of requiring a user choice.
* Fabricating a `candidate_id` or `transaction_id`.
* Reporting an edit as saved before `commit-editing-transaction`.
* Passing a raw image URL into an edit — upload first for an `asset_id`.

## Automating your tests

After the manual checks are stable, script them into CI: tool list, one call per tool, error cases, and the prompt library. Postman (MCP requests) and MCPJam (tool-selection evals) are common options.

## Troubleshooting

* **Expected tool missing:** Client may not expose it — check Step 1.
* **Auth fails:** Token expired; redirect URI not registered; Inspector CLI can't do interactive sign-in (use the UI or `mcp-remote`).
* **Tool error:** Args vs input schema — usually a missing field or wrong type.
* **`upload-asset-from-url` → `fetch_failed`:** URL must be public HTTPS.
* **Wrong server called:** See [Step 5](https://www.canva.dev/#step-5-test-tool-selection-across-multiple-servers).
* **Edits didn't persist:** Commit required. Concurrent browser edits can stale the transaction — cancel, start fresh, re-apply, commit.
* **Fails in Inspector too:** Likely upstream — check the [Canva status page](https://www.canvastatus.com/) (Connect API).

## Security and privacy

* Per-user OAuth; users only access their own designs.
* Signed thumbnail/export/download URLs are short-lived — don't store or share them.
* Uploads and generated designs land in the authenticated user's account.

## Learn more

* [About Canva MCP](https://www.canva.dev/docs/apps/mcp/)
* [MCP tools and rate limits](https://www.canva.dev/docs/apps/mcp/tools/)
* [Best practices for Canva MCP](https://www.canva.dev/docs/apps/mcp/best-practices/)
* [Troubleshooting and common questions](https://www.canva.dev/docs/apps/mcp/troubleshooting/)
* [Design edit handoff](https://www.canva.dev/docs/apps/mcp/workflows/design-edit/)
