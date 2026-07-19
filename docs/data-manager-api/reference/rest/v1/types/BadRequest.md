# BadRequest

- [JSON representation](https://developers.google.com/data-manager/api/reference/rest/v1/BadRequest#SCHEMA_REPRESENTATION)
- [FieldViolation](https://developers.google.com/data-manager/api/reference/rest/v1/BadRequest#FieldViolation)
  - [JSON representation](https://developers.google.com/data-manager/api/reference/rest/v1/BadRequest#FieldViolation.SCHEMA_REPRESENTATION)
- [LocalizedMessage](https://developers.google.com/data-manager/api/reference/rest/v1/BadRequest#LocalizedMessage)
  - [JSON representation](https://developers.google.com/data-manager/api/reference/rest/v1/BadRequest#LocalizedMessage.SCHEMA_REPRESENTATION)

Describes violations in a client request. This error type focuses on the syntactic aspects of the request.

| JSON representation |
|---|
| ``` { "fieldViolations": [ { object (`https://developers.google.com/data-manager/api/reference/rest/v1/BadRequest#FieldViolation`) } ] } ``` |

| Fields ||
|---|---|
| `fieldViolations[]` | ``object (`https://developers.google.com/data-manager/api/reference/rest/v1/BadRequest#FieldViolation`)`` Describes all violations in a client request. |

## FieldViolation

A message type used to describe a single bad request field.

| JSON representation |
|---|
| ``` { "field": string, "description": string, "reason": string, "localizedMessage": { object (`https://developers.google.com/data-manager/api/reference/rest/v1/BadRequest#LocalizedMessage`) } } ``` |

| Fields ||
|---|---|
| `field` | `string` A path that leads to a field in the request body. The value will be a sequence of dot-separated identifiers that identify a protocol buffer field. Consider the following: message CreateContactRequest { message EmailAddress { enum Type { TYPE_UNSPECIFIED = 0; HOME = 1; WORK = 2; } optional string email = 1; repeated EmailType type = 2; } string fullName = 1; repeated EmailAddress email_addresses = 2; } In this example, in proto `field` could take one of the following values: - `fullName` for a violation in the `fullName` value - `email_addresses[0].email` for a violation in the `email` field of the first `email_addresses` message - `email_addresses[2].type[1]` for a violation in the second `type` value in the third `email_addresses` message. In JSON, the same values are represented as: - `fullName` for a violation in the `fullName` value - `emailAddresses[0].email` for a violation in the `email` field of the first `emailAddresses` message - `emailAddresses[2].type[1]` for a violation in the second `type` value in the third `emailAddresses` message. |
| `description` | `string` A description of why the request element is bad. |
| `reason` | `string` The reason of the field-level error. This is a constant value that identifies the proximate cause of the field-level error. It should uniquely identify the type of the FieldViolation within the scope of the google.rpc.ErrorInfo.domain. This should be at most 63 characters and match a regular expression of `[A-Z][A-Z0-9_]+[A-Z0-9]`, which represents UPPER_SNAKE_CASE. |
| `localizedMessage` | ``object (`https://developers.google.com/data-manager/api/reference/rest/v1/BadRequest#LocalizedMessage`)`` Provides a localized error message for field-level errors that is safe to return to the API consumer. |

## LocalizedMessage

Provides a localized error message that is safe to return to the user which can be attached to an RPC error.

| JSON representation |
|---|
| ``` { "locale": string, "message": string } ``` |

| Fields ||
|---|---|
| `locale` | `string` The locale used following the specification defined at <https://www.rfc-editor.org/rfc/bcp/bcp47.txt>. Examples are: "en-US", "fr-CH", "es-MX" |
| `message` | `string` The localized error message in the above locale. |
