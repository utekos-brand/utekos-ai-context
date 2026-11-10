> ## Documentation Index
> Fetch the complete documentation index at: https://developer.affinity.co/llms.txt
> Use this file to discover all available pages before exploring further.

# Gemini

> Connect Gemini to the Affinity MCP Server

## Supported Gemini surfaces

This guide applies to **Gemini CLI**, Google's command-line tool for developers.

**Gemini on the web** (gemini.google.com), the **Gemini mobile apps**, and Gemini in **Google
Workspace** apps do **not currently support MCP**. They run in environments that don't yet
support custom MCP server connections; only the Gemini CLI can launch MCP processes. No
configuration will make MCP work on those surfaces. Watch the Gemini changelog for changes.

## Prerequisites

**Affinity**

* **Plan**: Scale, Advanced, or Enterprise (required for API and MCP access).
* **API key**: Generate one first. See [Authentication](https://developer.affinity.co/pages/mcp/authentication.md#api-key).
  Gemini does not currently support OAuth with Affinity.
* **Admin setup**: None required by default. If an Affinity admin has disabled Gemini under
  **Settings → Affinity MCP**, ask them to re-enable it.

**Gemini**

* **Plan**: A Google account with Gemini CLI access. Each developer configures their own CLI
  install.
* **Admin setup**: None.

> [!TIP]
>
> **Get an Affinity API key in 3 steps**: In Affinity, go to **Settings → Manage Apps → API Keys → Create new key**. Copy the key immediately — you won't see it again. Name it something memorable (e.g., "Gemini MCP").

## Setup

Run the following command in Gemini CLI with your API key filled in:

```bash theme={null}
gemini mcp add --transport http \
    --header "Authorization: Bearer your_api_key_here" \
    affinity-mcp https://mcp.affinity.co/mcp
```

***

## Test your connection

Once configured, try one of these in Gemini CLI:

* *Find 3 companies I emailed in the last 30 days.*
* *Show me my upcoming meetings.*
* *Summarize recent activity on Acme Corp.*

If Affinity data comes back, you're set. If not, see [Troubleshooting](https://developer.affinity.co/pages/mcp/troubleshooting.md).


## Related topics

- [Local MCP](https://developer.affinity.co/pages/mcp/local-setup.md)
- [Supported Clients](https://developer.affinity.co/pages/mcp/supported-clients.md)
- [Other Clients](https://developer.affinity.co/pages/mcp/other-clients.md)


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.



Lagre
