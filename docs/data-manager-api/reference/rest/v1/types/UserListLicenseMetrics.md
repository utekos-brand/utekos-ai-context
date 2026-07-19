# UserListLicenseMetrics

- [JSON representation](https://developers.google.com/data-manager/api/reference/rest/v1/UserListLicenseMetrics#SCHEMA_REPRESENTATION)

Metrics related to a user list license.

| JSON representation |
|---|
| ``` { "clickCount": string, "impressionCount": string, "revenueUsdMicros": string, "startDate": string, "endDate": string } ``` |

| Fields ||
|---|---|
| `clickCount` | `string (https://developers.google.com/discovery/v1/type-format format)` Output only. The number of clicks for the user list license. |
| `impressionCount` | `string (https://developers.google.com/discovery/v1/type-format format)` Output only. The number of impressions for the user list license. |
| `revenueUsdMicros` | `string (https://developers.google.com/discovery/v1/type-format format)` Output only. The revenue for the user list license in USD micros. |
| `startDate` | `string (https://developers.google.com/discovery/v1/type-format format)` Output only. The start date (inclusive) of the metrics in the format YYYYMMDD. For example, 20260102 represents January 2, 2026. If `endDate` is used in the filter, `startDate` is also required. If neither `startDate` nor `endDate` are included in the filter, the UserListLicenseMetrics fields will not be populated in the response. |
| `endDate` | `string (https://developers.google.com/discovery/v1/type-format format)` Output only. The end date (inclusive) of the metrics in the format YYYYMMDD. For example, 20260102 represents January 2, 2026. If `startDate` is used in the filter, `endDate` is also required. If neither `startDate` nor `endDate` are included in the filter, the UserListLicenseMetrics fields will not be populated in the response. |
