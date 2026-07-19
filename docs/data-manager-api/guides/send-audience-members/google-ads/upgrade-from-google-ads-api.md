# Upgrade from the Google Ads API

Upgrade your [Customer Match](https://support.google.com/google-ads/answer/6379332) workflows from the Google Ads API to the
Data Manager API to gain access to several improvements and features.

Here's a comparison between using the Data Manager API and the Google Ads API to manage
Customer Match audiences:

|   | Data Manager API | Google Ads API |
|---|---|---|
| Ingestion workflow complexity | Streamlined workflow consisting solely of ingestion requests. No management of jobs is required. | Job workflow that requires creating, populating, running, and monitoring offline jobs. |
| Support for [confidential matching](https://support.google.com/google-ads-data-manager/answer/14577185) | Supported. Yes | Not supported. No |
| Encryption | Supports [encryption](https://developers.google.com/data-manager/api/devguides/concepts/encryption). Yes | Not supported. No |
| Developer token | Not required. | Required. |
| Manage multiple audiences | Send data to [multiple audiences in the same request](https://developers.google.com/data-manager/api/devguides/audiences/send-audience-members#multiple-destinations). Yes | Separate offline jobs and requests required for each audience. No |
| Quotas and limits | Project-based [quotas and per-request limits](https://developers.google.com/data-manager/api/devguides/limits). | [Developer token-based quotas](https://developers.google.com/google-ads/api/docs/api-policy/access-levels) and [per-request limits](https://developers.google.com/google-ads/api/docs/remarketing/audience-segments/customer-match/get-started#usage-flow). |
| Error model | Uses a [fast-fail model](https://developers.google.com/data-manager/api/devguides/concepts/understand-errors#fast-fail). | Uses a [partial failure model](https://developers.google.com/google-ads/api/docs/best-practices/partial-failures). |
