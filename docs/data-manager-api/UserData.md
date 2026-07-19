## UserData

Data that identifies the user. At least one identifier is required.

### Fields

| Field                | Type                                                                                                                                                | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `user_identifiers[]` | [`UserIdentifier`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#google.ads.datamanager.v1.UserIdentifier) | Required. The identifiers for the user. Multiple instances of the same type (e.g., multiple email addresses) can be provided. To increase match likelihood, include as many identifiers as possible. A maximum of 10 `userIdentifiers` can be included in a single [`AudienceMember`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#google.ads.datamanager.v1.AudienceMember) or [`Event`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#google.ads.datamanager.v1.Event). |

---

## UserIdData

User ID data holding the user ID.

### Fields

| Field     | Type   | Description                                                             |
| --------- | ------ | ----------------------------------------------------------------------- |
| `user_id` | string | Required. A unique identifier for a user, as defined by the advertiser. |

---

## UserIdInfo

Additional information when `USER_ID` is one of the `upload_key_types`.

### Fields

| Field              | Type                                                                                                                                                | Description                                     |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `data_source_type` | [`DataSourceType`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#google.ads.datamanager.v1.DataSourceType) | Optional. Immutable. Source of the upload data. |

---

## UserIdentifier

A single identifier for the user.

### Fields

**Union field ****`identifier`** — Exactly one must be specified. Can be one of the following:

| Field           | Type                                                                                                                                          | Description                                                                                             |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `email_address` | string                                                                                                                                        | Hashed email address using SHA-256 hash function after normalization.                                   |
| `phone_number`  | string                                                                                                                                        | Hashed phone number using SHA-256 hash function after normalization (E164 standard).                    |
| `address`       | [`AddressInfo`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#google.ads.datamanager.v1.AddressInfo) | The known components of a user's address. Holds a grouping of identifiers that are matched all at once. |

---

## UserList

A user list resource.

### Fields

| Field                   | Type                                                                                                                                                             | Description                                                                                                                                            |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `name`                  | string                                                                                                                                                           | Identifier. The resource name of the user list. Format: `accountTypes/{account_type}/accounts/{account}/userLists/{user_list}`                         |
| `id`                    | int64                                                                                                                                                            | Output only. The unique ID of the user list.                                                                                                           |
| `read_only`             | bool                                                                                                                                                             | Output only. Indicates if a user may edit a list.                                                                                                      |
| `membership_duration`   | [`Duration`](https://protobuf.dev/reference/protobuf/google.protobuf/#duration)                                                                                  | Optional. Duration a user remains in the list. Must be exact multiples of 24 hours (86400 seconds). Otherwise, results in an `INVALID_ARGUMENT` error. |
| `access_reason`         | [`AccessReason`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#google.ads.datamanager.v1.UserList.AccessReason)         | Output only. Reason this account has access to the list.                                                                                               |
| `size_info`             | [`SizeInfo`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#google.ads.datamanager.v1.SizeInfo)                          | Output only. Estimated number of members across different target networks.                                                                             |
| `target_network_info`   | [`TargetNetworkInfo`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#google.ads.datamanager.v1.TargetNetworkInfo)        | Optional. Eligibility information for different target networks.                                                                                       |
| `display_name`          | string                                                                                                                                                           | Required. Display name of the user list.                                                                                                               |
| `description`           | string                                                                                                                                                           | Optional. Description of the user list.                                                                                                                |
| `membership_status`     | [`MembershipStatus`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#google.ads.datamanager.v1.UserList.MembershipStatus) | Optional. Membership status of the user list.                                                                                                          |
| `integration_code`      | string                                                                                                                                                           | Optional. External system ID used by user list sellers to correlate IDs.                                                                               |
| `closing_reason`        | [`ClosingReason`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#google.ads.datamanager.v1.UserList.ClosingReason)       | Output only. Reason why the user list membership status is closed.                                                                                     |
| `account_access_status` | [`AccessStatus`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#google.ads.datamanager.v1.UserList.AccessStatus)         | Optional. Indicates if sharing is enabled. When shared, set to `ENABLED`. Can later be revoked and set to `DISABLED`.                                  |

### Union Field: `user_list_info`

Additional information about the user list. Only one of the following can be specified:

| Field                     | Type                                                                                                                                                            | Description                                                       |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `ingested_user_list_info` | [`IngestedUserListInfo`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#google.ads.datamanager.v1.IngestedUserListInfo) | Optional. Represents a user list populated by ingested user data. |
