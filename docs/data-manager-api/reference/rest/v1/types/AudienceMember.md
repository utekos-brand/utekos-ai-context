# AudienceMember

- [JSON representation](https://developers.google.com/data-manager/api/reference/rest/v1/AudienceMember#SCHEMA_REPRESENTATION)
- [PairData](https://developers.google.com/data-manager/api/reference/rest/v1/AudienceMember#PairData)
  - [JSON representation](https://developers.google.com/data-manager/api/reference/rest/v1/AudienceMember#PairData.SCHEMA_REPRESENTATION)
- [MobileData](https://developers.google.com/data-manager/api/reference/rest/v1/AudienceMember#MobileData)
  - [JSON representation](https://developers.google.com/data-manager/api/reference/rest/v1/AudienceMember#MobileData.SCHEMA_REPRESENTATION)
- [UserIdData](https://developers.google.com/data-manager/api/reference/rest/v1/AudienceMember#UserIdData)
  - [JSON representation](https://developers.google.com/data-manager/api/reference/rest/v1/AudienceMember#UserIdData.SCHEMA_REPRESENTATION)
- [PpidData](https://developers.google.com/data-manager/api/reference/rest/v1/AudienceMember#PpidData)
  - [JSON representation](https://developers.google.com/data-manager/api/reference/rest/v1/AudienceMember#PpidData.SCHEMA_REPRESENTATION)
- [CompositeData](https://developers.google.com/data-manager/api/reference/rest/v1/AudienceMember#CompositeData)
  - [JSON representation](https://developers.google.com/data-manager/api/reference/rest/v1/AudienceMember#CompositeData.SCHEMA_REPRESENTATION)
- [IpData](https://developers.google.com/data-manager/api/reference/rest/v1/AudienceMember#IpData)
  - [JSON representation](https://developers.google.com/data-manager/api/reference/rest/v1/AudienceMember#IpData.SCHEMA_REPRESENTATION)

The audience member to be operated on.

| JSON representation |
|---|
| ``` { "destinationReferences": [ string ], "consent": { object (`https://developers.google.com/data-manager/api/reference/rest/v1/Consent`) }, // Union field `data` can be only one of the following: "userData": { object (`https://developers.google.com/data-manager/api/reference/rest/v1/UserData`) }, "pairData": { object (`https://developers.google.com/data-manager/api/reference/rest/v1/AudienceMember#PairData`) }, "mobileData": { object (`https://developers.google.com/data-manager/api/reference/rest/v1/AudienceMember#MobileData`) }, "userIdData": { object (`https://developers.google.com/data-manager/api/reference/rest/v1/AudienceMember#UserIdData`) }, "ppidData": { object (`https://developers.google.com/data-manager/api/reference/rest/v1/AudienceMember#PpidData`) }, "compositeData": { object (`https://developers.google.com/data-manager/api/reference/rest/v1/AudienceMember#CompositeData`) } // End of list of possible types for union field `data`. } ``` |

| Fields ||
|---|---|
| `destinationReferences[]` | `string` Optional. Defines which `https://developers.google.com/data-manager/api/reference/rest/v1/Destination` to send the audience member to. |
| `consent` | ``object (`https://developers.google.com/data-manager/api/reference/rest/v1/Consent`)`` Optional. The consent setting for the user. |
| Union field `data`. The type of identifying data to be operated on. `data` can be only one of the following: ||
| `userData` | ``object (`https://developers.google.com/data-manager/api/reference/rest/v1/UserData`)`` User-provided data that identifies the user. |
| `pairData` | ``object (`https://developers.google.com/data-manager/api/reference/rest/v1/AudienceMember#PairData`)`` [Publisher Advertiser Identity Reconciliation (PAIR) IDs](https://support.google.com/admanager/answer/15067908). This feature is only available to data partners. |
| `mobileData` | ``object (`https://developers.google.com/data-manager/api/reference/rest/v1/AudienceMember#MobileData`)`` Data identifying the user's mobile devices. |
| `userIdData` | ``object (`https://developers.google.com/data-manager/api/reference/rest/v1/AudienceMember#UserIdData`)`` Data related to unique identifiers for a user, as defined by the advertiser. |
| `ppidData` | ``object (`https://developers.google.com/data-manager/api/reference/rest/v1/AudienceMember#PpidData`)`` Data related to publisher provided identifiers. This feature is only available to data partners. |
| `compositeData` | ``object (`https://developers.google.com/data-manager/api/reference/rest/v1/AudienceMember#CompositeData`)`` Group of multiple identifier types. |

## PairData

[PAIR](https://support.google.com/admanager/answer/15067908) IDs for the audience. At least one PAIR ID is required.

This feature is only available to data partners.

| JSON representation |
|---|
| ``` { "pairIds": [ string ] } ``` |

| Fields ||
|---|---|
| `pairIds[]` | `string` Required. Cleanroom-provided PII data, hashed with SHA256, and encrypted with an EC commutative cipher using publisher key for the [PAIR](https://support.google.com/admanager/answer/15067908) user list. At most 10 `pairIds` can be provided in a single `https://developers.google.com/data-manager/api/reference/rest/v1/AudienceMember`. |

## MobileData

Mobile IDs for the audience. At least one mobile ID is required.

| JSON representation |
|---|
| ``` { "mobileIds": [ string ] } ``` |

| Fields ||
|---|---|
| `mobileIds[]` | `string` Required. The list of mobile device IDs (advertising ID/IDFA). At most 10 `mobileIds` can be provided in a single `https://developers.google.com/data-manager/api/reference/rest/v1/AudienceMember`. |

## UserIdData

User id data holding the user id.

| JSON representation |
|---|
| ``` { "userId": string } ``` |

| Fields ||
|---|---|
| `userId` | `string` Required. A unique identifier for a user, as defined by the advertiser. |

## PpidData

Publisher provided identifiers data holding the ppids. At least one ppid is required.

This feature is only available to data partners.

| JSON representation |
|---|
| ``` { "ppids": [ string ] } ``` |

| Fields ||
|---|---|
| `ppids[]` | `string` Required. The list of publisher provided identifiers for a user. |

## CompositeData

Composite data holding identifiers and associated data for a user. At least one of `userData` or `ipData` is required.

| JSON representation |
|---|
| ``` { "userData": { object (`https://developers.google.com/data-manager/api/reference/rest/v1/UserData`) }, "ipData": [ { object (`https://developers.google.com/data-manager/api/reference/rest/v1/AudienceMember#IpData`) } ] } ``` |

| Fields ||
|---|---|
| `userData` | ``object (`https://developers.google.com/data-manager/api/reference/rest/v1/UserData`)`` Optional. User-provided data that identifies the user. |
| `ipData[]` | ``object (`https://developers.google.com/data-manager/api/reference/rest/v1/AudienceMember#IpData`)`` Optional. IP address data representing customer interaction used to build the audience. |

## IpData

IP address information for a user. We recommend including observeStartTime and observeEndTime to help improve Customer Match match rates.

| JSON representation |
|---|
| ``` { "ipAddress": string, "observeStartTime": string, "observeEndTime": string } ``` |

| Fields ||
|---|---|
| `ipAddress` | `string` Required. IP address captured at the time of customer interaction. Accepts standard string formats for both IPv4 and IPv6. |
| `observeStartTime` | ``string (`https://protobuf.dev/reference/protobuf/google.protobuf#timestamp` format)`` Optional. First recorded interaction time from this IP address in a session. Uses RFC 3339, where generated output will always be Z-normalized and use 0, 3, 6 or 9 fractional digits. Offsets other than "Z" are also accepted. Examples: `"2014-10-02T15:01:23Z"`, `"2014-10-02T15:01:23.045123456Z"` or `"2014-10-02T15:01:23+05:30"`. |
| `observeEndTime` | ``string (`https://protobuf.dev/reference/protobuf/google.protobuf#timestamp` format)`` Optional. Last recorded interaction time from this IP address in a session. Uses RFC 3339, where generated output will always be Z-normalized and use 0, 3, 6 or 9 fractional digits. Offsets other than "Z" are also accepted. Examples: `"2014-10-02T15:01:23Z"`, `"2014-10-02T15:01:23.045123456Z"` or `"2014-10-02T15:01:23+05:30"`. |
