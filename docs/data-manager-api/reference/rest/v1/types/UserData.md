# UserData

# UserData

- [JSON representation](https://developers.google.com/data-manager/api/reference/rest/v1/UserData#SCHEMA_REPRESENTATION)
- [UserIdentifier](https://developers.google.com/data-manager/api/reference/rest/v1/UserData#UserIdentifier)
  - [JSON representation](https://developers.google.com/data-manager/api/reference/rest/v1/UserData#UserIdentifier.SCHEMA_REPRESENTATION)
- [AddressInfo](https://developers.google.com/data-manager/api/reference/rest/v1/UserData#AddressInfo)
  - [JSON representation](https://developers.google.com/data-manager/api/reference/rest/v1/UserData#AddressInfo.SCHEMA_REPRESENTATION)

Data that identifies the user. At least one identifier is required.

| JSON representation |
|---|
| ``` { "userIdentifiers": [ { object (`https://developers.google.com/data-manager/api/reference/rest/v1/UserData#UserIdentifier`) } ] } ``` |

| Fields ||
|---|---|
| `userIdentifiers[]` | ``object (`https://developers.google.com/data-manager/api/reference/rest/v1/UserData#UserIdentifier`)`` Required. The identifiers for the user. It's possible to provide multiple instances of the same type of data (for example, multiple email addresses). To increase the likelihood of a match, provide as many identifiers as possible. At most 10 `userIdentifiers` can be provided in a single `https://developers.google.com/data-manager/api/reference/rest/v1/AudienceMember` or `https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#Event`. |

## UserIdentifier

A single identifier for the user.

| JSON representation |
|---|
| ``` { // Union field `identifier` can be only one of the following: "emailAddress": string, "phoneNumber": string, "address": { object (`https://developers.google.com/data-manager/api/reference/rest/v1/UserData#AddressInfo`) } // End of list of possible types for union field `identifier`. } ``` |

| Fields ||
|---|---|
| Union field `identifier`. Exactly one must be specified. `identifier` can be only one of the following: ||
| `emailAddress` | `string` Hashed email address using SHA-256 hash function after normalization. |
| `phoneNumber` | `string` Hashed phone number using SHA-256 hash function after normalization (E164 standard). |
| `address` | ``object (`https://developers.google.com/data-manager/api/reference/rest/v1/UserData#AddressInfo`)`` The known components of a user's address. Holds a grouping of identifiers that are matched all at once. |

## AddressInfo

Address information for the user.

| JSON representation |
|---|
| ``` { "givenName": string, "familyName": string, "regionCode": string, "postalCode": string } ``` |

| Fields ||
|---|---|
| `givenName` | `string` Required. Given (first) name of the user, all lowercase, with no punctuation, no leading or trailing whitespace, and hashed as SHA-256. |
| `familyName` | `string` Required. Family (last) name of the user, all lowercase, with no punctuation, no leading or trailing whitespace, and hashed as SHA-256. |
| `regionCode` | `string` Required. The 2-letter region code in ISO-3166-1 alpha-2 of the user's address. |
| `postalCode` | `string` Required. The postal code of the user's address. |
