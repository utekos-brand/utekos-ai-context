> ## Documentation Index
> Fetch the complete documentation index at: https://www.canva.dev/docs/apps/llms.txt
> Use this file to discover all available pages before exploring further.

# About Canva MCP

Connect AI assistants to Canva's design capabilities.

<Note>
  This documentation is for IT admins integrating Canva into your company's internal tools and platforms, and for teams building AI assistants, platforms, or connectors that want to offer Canva as a capability to your users.

  If you're a user wanting to connect your personal AI assistant to Canva's AI Connector, see our [Help Center](https://www.canva.com/help/mcp-agent-setup/).
</Note>

Canva for AI assistants is one of the three surfaces of the Canva Developers SDK, and it's built on the Canva MCP server. The Canva MCP server enables AI assistants to seamlessly interact with Canva's design capabilities. By exposing Canva's capabilities (including design creation and editing, asset and brand management, library search, export, and commenting) as MCP-compatible tools, you can give your users access to Canva's design capabilities through natural language, directly from the AI tools they already use.

## What's MCP?

The [Model Context Protocol (MCP)](https://modelcontextprotocol.io/docs/getting-started/intro) is a standardized interface that allows AI agents to interact with data sources and tools. Canva provides a remote MCP server that gives your AI assistant access to Canva's design APIs and capabilities.

## What you can do

The Canva MCP server unlocks the following capabilities for AI assistants:

* **Design generation:** Create designs programmatically from text descriptions and specifications
* **Design editing:** Apply targeted modifications to existing designs through natural language commands
* **Design discovery:** Search and retrieve designs, pages, and folders from your design library
* **Asset and brand management:** Upload and organize assets, manage folders, and access brand kits and templates
* **Design export:** Generate exports in multiple formats (PDF, PNG, JPG, PPTX, MP4, and so on) and resize designs for different channels
* **Collaborative workflows:** Add comments to designs and integrate feedback loops directly into your workflows

## Next steps

* [Access and permissions](https://www.canva.dev/docs/apps/mcp/access/)
* [Quickstart](https://www.canva.dev/docs/apps/quickstart/?app-surface=Canva%20for%20AI%20assistants)

## Learn more

* [MCP tools and rate limits](https://www.canva.dev/docs/apps/mcp/tools/) - Detailed tools list and rate limits by operation
* [Verify your Canva MCP app](https://www.canva.dev/docs/apps/mcp/verify-app/) - Confirm your app with MCP Inspector, and tell your own faults apart from upstream ones
* [Best practices for Canva MCP](https://www.canva.dev/docs/apps/mcp/best-practices/) - Decisions that keep a Canva MCP app reliable after the connection works
* [Troubleshooting and common questions](https://www.canva.dev/docs/apps/mcp/troubleshooting/) - Questions on timeouts, per-user authentication, and other common issues
* [Usage policy](https://www.canva.dev/docs/apps/mcp/usage-policy/) - Guidance on how to use the Canva MCP
* [Prohibited use](https://www.canva.dev/docs/apps/mcp/prohibited-use/) - Canva's Developer Terms of Use apply to usage of the MCP
* [Set up the Canva AI Connector](https://www.canva.com/help/mcp-agent-setup/) - Setup guides for specific, popular AI assistants
* [How to use Canva tools in your AI assistant](https://www.canva.com/help/mcp-canva-usage/) - Tips for prompting MCP tools for end users
