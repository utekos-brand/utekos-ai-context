> ## Documentation Index
> Fetch the complete documentation index at: https://www.canva.dev/docs/apps/llms.txt
> Use this file to discover all available pages before exploring further.

# search-designs

Find a user's existing designs by keyword.

Use `search-designs` to look up designs in the authenticated user's library.

## Example prompt

*"Find my Q1 marketing presentation with 'Q1' in the title."*

## Example response

IDs, URLs, and tokens below are placeholders; field names and structure are exactly as returned.

```json
{
  "results": [
    { "id": "DAF_EXAMPLE1", "title": "Q1 Marketing Presentation", "text": "Q1 Marketing Presentation", "url": "https://www.canva.com/d/EXAMPLE1" },
    { "id": "DAF_EXAMPLE2", "title": "Event Poster Draft", "text": "Event Poster Draft", "url": "https://www.canva.com/d/EXAMPLE2" }
  ],
  "continuation": "EXAMPLE_TOKEN"
}
```

Each result has an `id`, `title`, `text`, and `url`. Paginate with the `continuation` token.

## Learn more

* [MCP tools and rate limits](https://www.canva.dev/docs/apps/mcp/tools/)
* [Verify your Canva MCP app](https://www.canva.dev/docs/apps/mcp/verify-app/)
* [Design edit handoff](https://www.canva.dev/docs/apps/mcp/workflows/design-edit/)
