> ## Documentation Index
> Fetch the complete documentation index at: https://www.canva.dev/docs/admin/llms.txt
> Use this file to discover all available pages before exploring further.

# Canva Admin API

Manage teams, groups, and users in your organization.

The Canva Admin API lets you manage teams, groups, and users in a Canva organization. This API is designed for administrators who need to automate user management tasks and integrate Canva user administration with other systems.

## First steps

To get started with the Canva Admin API, you must be a member of a Canva organization, and your account role must be an organization admin. Go to [Creating clients](https://www.canva.dev/docs/admin/creating-clients/) to create and configure an Admin API client.

## Canva Admin API vs. Canva SCIM API

The Canva Admin API is distinct from the [Canva SCIM API](https://www.canva.dev/docs/scim/). The SCIM API is specifically designed for provisioning and managing user identities in a standardized way according the SCIM specification. Although both APIs can be used for user management, the Admin API provides additional functionality tailored for Canva's organizational features, including team management and group operations.

## API versions

The Canva Admin API uses date-based versions, which allows Canva to make breaking changes to the API without affecting existing clients.

When breaking changes are made, a new version with the format `YYYY-MM-DD` is released. For superseded API versions, Canva will provide adequate notice and a reasonable support window (for example, 6 months).

API clients can manually add a `X-Canva-Public-Api-Version` header to specify the particular version of the Admin API used in a request. If this header is omitted, then the latest version is assumed.

Non-breaking and backwards compatible changes don't require a new version. For examples comparing breaking and non-breaking changes, see [Breaking vs. non-breaking changes](https://www.canva.dev/docs/apps/deprecation-policy/#canva-rest-apis).

<Note>
  The version number included in endpoint paths (the `v1` in `https://api.canva.com/admin/v1/`) is not used for the API versioning documented here. That version indicator is reserved for any future epoch-level changes where the entire API and its architecture might fundamentally change.
</Note>

## OpenAPI description

Canva provides an OpenAPI description of the Admin API. You can use this with code generation libraries, such as [openapi-generator](https://github.com/OpenAPITools/openapi-generator), to generate client SDKs in various languages. The OpenAPI description is publicly available at [https://www.canva.dev/sources/admin/api/latest/api.yml](https://www.canva.dev/sources/admin/api/latest/api.yml).

## Preview APIs

Some APIs and features have notices declaring they're provided as a preview. Although you can use these APIs for development and experimentation, they are not finalized and we don't recommend them for use in production environments.

Specifically, you should be aware of the following for preview APIs and features:

* There might be unannounced breaking changes.
* Any breaking changes to preview APIs won't produce a new API version.
