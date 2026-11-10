> ## Documentation Index
> Fetch the complete documentation index at: https://www.canva.dev/docs/apps/llms.txt
> Use this file to discover all available pages before exploring further.

# Access and permissions

How users authenticate to the Canva MCP server, and what they can do once connected.

Every user of the Canva MCP server authenticates individually, and the operations available to them match their own level of access in Canva. This page covers how your AI application gets access to the Canva MCP server, how it authenticates, what a user's permissions allow, and which capabilities require a paid Canva plan.

## Getting access

Before users can authorize your AI application, create an app in the [Developer Portal](https://www.canva.com/developers/apps) and turn on Canva MCP. The app's credentials give you a client ID and client secret, and you manage the app's redirect URLs in the Developer Portal. For the setup steps, follow the Canva for AI assistants path in the [Quickstart](https://www.canva.dev/docs/apps/quickstart/).

## Authentication

The Canva MCP server authenticates your AI application with OAuth. Your app identifies itself with the client ID and client secret from its **Credentials** in the Developer Portal.

Canva requires each user to authenticate individually to access the MCP. This also means each user of Canva's tools in your AI assistant will need to have a Canva account. Canva stores and manages designs, assets, and permissions on a per-user basis, not at the organization level.

## Permissions

The operations available to a user match their level of access to a design or asset. For example, editing operations are only available on designs and assets for which you have edit permissions.

## Availability by plan

Some features require a paid Canva plan:

* **All plans:** Design generation, editing, search, exports, comments, asset uploads, and most core features
* **Canva Pro and above:** Design resizing to new dimensions, autofill, brand kits, and brand templates

## Next steps

* [Quickstart](https://www.canva.dev/docs/apps/quickstart/)
* [MCP tools and rate limits](https://www.canva.dev/docs/apps/mcp/tools/)
* [Verify your Canva MCP app](https://www.canva.dev/docs/apps/mcp/verify-app/)
