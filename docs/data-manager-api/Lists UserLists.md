# Lists UserLists

## Authorization Headers

This method supports the following optional headers to define how the API authorizes access for the request:

- `login-account`: (Optional) The resource name of the account where the Google Account of the credentials is a user. If not set, it defaults to the account of the request. Format: `accountTypes/{loginAccountType}/accounts/{loginAccountId}`
- `linked-account`: (Optional) The resource name of the account with an established product link to the `login-account`. Format: `accountTypes/{linkedAccountType}/accounts/{linkedAccountId}`

## HTTP request

`GET https://datamanager.googleapis.com/v1/{parent=accountTypes/*/accounts/*}/userLists`

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

## Path parameters

| Parameters |                                                                                                                                        |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `parent`   | `string` Required. The parent account that owns this collection of user lists. Format: `accountTypes/{accountType}/accounts/{account}` |

## Query parameters

| Parameters  |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pageSize`  | `integer` Optional. The maximum number of user lists to return. The service may return fewer than this value. If unspecified, at most 50 user lists will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `pageToken` | `string` Optional. A page token received from a previous `userLists.list` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `userLists.list` must match the call that provided the page token.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `filter`    | `string` Optional. A [filter string](https://google.aip.dev/160). All fields must be on the left-hand side of each condition (for example: `display_name = "list 1"`). Fields must be specified using either all [camel case](https://en.wikipedia.org/wiki/Camel_case) or all [snake case](https://en.wikipedia.org/wiki/Snake_case). Do not mix camel case and snake case. Supported operations: `AND`, `=`, `!=`, `>`, `>=`, `<`, `<=`, `:` (has). **Supported functions:** `IN(field, value1, value2, ...)`: returns true if the field matches any of the values. Example: `IN(display_name, "name1", "name2")`. Supported fields: `id`, `display_name`, `description`, `membership_status`, `integration_code`, `access_reason`, `ingested_user_list_info.upload_key_types`. |

## Request body

The request body must be empty.

## Response body

Response message for `userLists.list`.

If successful, the response body contains data with the following structure:

| JSON representation                                                                                                                                                        |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ``{ "userLists": [ { object (`https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.userLists#UserList`) } ], "nextPageToken": string }`` |

| Fields          |                                                                                                                                                                   |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `userLists[]`   | `object` (`https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.userLists#UserList`) The user lists from the specified account. |
| `nextPageToken` | `string` A token that can be sent as `pageToken` to retrieve the next page. If this field is omitted, there are no subsequent pages.                              |

## Authorization scopes

Requires the following OAuth scope:

- `https://www.googleapis.com/auth/datamanager`

- [HTTP request](https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.userLists/list#body.HTTP_TEMPLATE)

- [Path parameters](https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.userLists/list#body.PATH_PARAMETERS)

- [Query parameters](https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.userLists/list#body.QUERY_PARAMETERS)

- [Request body](https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.userLists/list#body.request_body)

- [Response body](https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.userLists/list#body.response_body)

  - [JSON representation](https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.userLists/list#body.ListUserListsResponse.SCHEMA_REPRESENTATION)

- [Authorization scopes](https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.userLists/list#body.aspect)

- [Try it!](https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.userLists/list#try-it)
