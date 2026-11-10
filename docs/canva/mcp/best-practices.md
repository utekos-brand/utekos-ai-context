> ## Documentation Index
> Fetch the complete documentation index at: https://www.canva.dev/docs/apps/llms.txt
> Use this file to discover all available pages before exploring further.

# Best practices for Canva MCP

Build a reliable, user-trustworthy Canva experience in your AI application.

Use this guide after your Canva MCP connection works. It explains the partner-side decisions that prevent common app problems. Response schemas are on each tool page, such as [`search-designs`](https://www.canva.dev/docs/apps/mcp/tools/search-designs/). For limits and plan availability, see [MCP tools and rate limits](https://www.canva.dev/docs/apps/mcp/tools/). For a problem that has already occurred, see [Troubleshooting and common questions](https://www.canva.dev/docs/apps/mcp/troubleshooting/).

## Route design requests to Canva

### Know when to use Canva

Route requests through Canva when a user wants to create or edit a Canva design, work from a template, or use a Canva design workflow. If a user explicitly asks to use Canva, don't silently substitute a different image or design tool. Instead, use Canva or explain why it is unavailable.

### Resolve ambiguous requests

When multiple MCP servers or native tools can handle similar requests, make Canva's role clear in your system instructions and test its selection alongside those tools. For example, a request to create a presentation, social post, or editable design should select Canva. If the request is genuinely ambiguous, ask the user which tool they want to use. For routing tests and suggested mitigations, see [Test tool selection across multiple servers](https://www.canva.dev/docs/apps/mcp/verify-app/#step-5-test-tool-selection-across-multiple-servers).

### Send complete design briefs

Pass the user's available design context to `create-design`, including the purpose, audience, key copy, tone, format, and brand constraints. Don't replace a detailed outline with a short summary. Ask a focused question only when a missing detail would materially change the result. Otherwise, use the available brief and let the user choose from the generated candidates.

## Handle tool results correctly

Treat every Canva tool result as structured state, not as text for the model to summarize. Where possible, enforce state handling in your client or orchestration layer instead of relying only on system instructions.

### Keep generation state together

`create-design` returns a top-level `job_id`, `status` and `polling_policy`. Associate the job ID with the current generation, user, and conversation. Poll for the results from `get-create-design-async-job` at the provided `polling_policy`. When the `status` is `completed`, provide the `url` to the user.

Don't auto-select, invent, or reuse a candidate ID or job ID. A request to save an edit may require `commit-editing-transaction`, rather than `create-design-from-candidate`. Use the current workflow state to determine the right next tool. For the exact response fields, see [`generate-design`](https://www.canva.dev/docs/apps/mcp/tools/generate-design/) and [`create-design-from-candidate`](https://www.canva.dev/docs/apps/mcp/tools/create-design-from-candidate/).

### Render previews using the right response field

Preview URLs vary by tool. `get-design-pages` returns page thumbnails in `items[].thumbnail.url`. Treat thumbnail and export URLs as short-lived, and don't store or share them.

Handle URL extraction, redirect resolution, and image rendering in your client or tool-result adapter. A system prompt can help an agent select the relevant field, but it can't guarantee that a raw URL renders in every client. For more information, [`get-design-pages`](https://www.canva.dev/docs/apps/mcp/tools/get-design-pages/).

### Complete editing and asset workflows

An edit is a transaction: open it, apply operations, then commit it. Editable `element_id` values come from `start-editing-transaction`, not from `get-design-content`. Only report a saved edit after `commit-editing-transaction` returns a committed status.

### Upload assets before editing

To add an image or video, call `upload-asset-from-url` with a public HTTPS URL, then use the returned `asset_id` in the edit operation. Don't pass a raw asset URL directly into an editing operation. For the complete workflows, see [Verify end-to-end workflows](https://www.canva.dev/docs/apps/mcp/verify-app/#step-4-verify-end-to-end-workflows).

### Respect limits and errors

Set your client timeout to at least 60 seconds for `generate-design`. Implement bounded exponential backoff for 429 responses, and don't use bulk automation to work around per-user limits. Surface actionable errors to the user instead of repeatedly retrying a failing request. For limits and plan availability, see [MCP tools and rate limits](https://www.canva.dev/docs/apps/mcp/tools/).

## Give users a trustworthy experience

### Show progress and accurate completion states

Make the agent's state match Canva's state. Show a working state for a longer request, label generated candidates as options to review, and don't claim that a design was created or an edit was saved until the tool response confirms it.

### Hand off designs to Canva

After a design-touching operation, provide a clear way to continue in Canva. Surface the returned edit URL prominently with a call to action such as "Open in Canva to edit." Don't treat an export or a thumbnail as the end of the workflow. For implementation guidance, see [Design edit handoff](https://www.canva.dev/docs/apps/mcp/workflows/design-edit/).

### Be transparent about credits and plans

Where possible, show Canva credit use in the product experience. Don't hide or obscure credit consumption, quota errors, or plan limitations. For the requirements that apply to credits, data, and user permissions, see the [Usage policy](https://www.canva.dev/docs/apps/mcp/usage-policy/).

## Choose the right brand workflow

### Choose generation, templates, or autofill

Use generation when a user needs a new concept or creative direction. Use a brand template and autofill when the user needs consistent, repeatable output from prepared content and has a Canva Pro, Business, or Enterprise account. Use user-provided, approved assets when the design has brand, legal, or compliance requirements that a generated asset might not meet.

### Handle Brand Kit data safely

Only access a user's designs, folders, Brand Kits, and templates in response to explicit user action. Keep Brand Kit data within Canva design workflows, and don't cache, extract, or reuse it outside Canva-rendered outputs. For the complete requirements, see the [Brand Kit and template handling policy](https://www.canva.dev/docs/apps/mcp/usage-policy/#5-brand-template-and-brand-kit-handling).

## Validate before launch

### Test complete workflows

Use [MCP Inspector](https://github.com/modelcontextprotocol/inspector) as a known-good reference for tool calls and raw responses. Then test the full experience in your AI application, including the following workflows:

* Generate a design, let the user choose a candidate, create the design, and open it in Canva.
* Read a design, start an edit transaction, apply an edit, commit it, and export the result.
* Upload an asset, then add it to a design with the returned asset ID.
* Route design requests correctly when other MCP servers and native image tools are available.

### Test routing with other tools

Repeat these tests after changing system instructions, tool descriptions, routing logic, or response handling. Include tool-list checks, tool-call tests, error cases, and routing prompts in your CI suite. For the full verification procedure, see [Verify your Canva MCP app](https://www.canva.dev/docs/apps/mcp/verify-app/).

### Use the release checklist

Before release, confirm that your app:

* Uses each user's Canva OAuth connection and respects their permissions.
* Preserves job IDs, candidate IDs, transaction IDs, and asset IDs across the right workflow steps.
* Renders previews correctly and handles short-lived URLs.
* Shows accurate pending, successful, and failed states.
* Provides an edit handoff after every design-touching workflow.
* Handles rate limits, timeouts, and user-facing errors predictably.
* Meets the requirements in the [Usage policy](https://www.canva.dev/docs/apps/mcp/usage-policy/).

## Next steps

* [MCP tools and rate limits](https://www.canva.dev/docs/apps/mcp/tools/)
* [Verify your Canva MCP app](https://www.canva.dev/docs/apps/mcp/verify-app/)
* [Design edit handoff](https://www.canva.dev/docs/apps/mcp/workflows/design-edit/)
* [Troubleshooting and common questions](https://www.canva.dev/docs/apps/mcp/troubleshooting/)
* [Usage policy](https://www.canva.dev/docs/apps/mcp/usage-policy/)
