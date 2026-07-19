# Upgrade your server-side event collection

Upgrade your server-side event collection from the [Measurement Protocol](https://developers.google.com/analytics/devguides/collection/protocol/ga4) to\
the Data Manager API to gain access to several improvements and features.

Here's a comparison between using the Data Manager API and Measurement Protocol to send events to\
Google Analytics.

|              | Data Manager API                                                                                                                                                           | Measurement Protocol                                                                                                                                                |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Data model   | Unified data model across all Google advertising products.                                                                                                                 | Data model is specific to Google Analytics.                                                                                                                         |
| Encryption   | Supports [encryption](https://developers.google.com/data-manager/api/devguides/concepts/encryption).                                                                       | Not supported.                                                                                                                                                      |
| Destinations | Supports sending events to [multiple destinations in a single request](https://developers.google.com/data-manager/api/devguides/events/send-events#multiple-destinations). | Supports sending events to only a single data stream (measurement ID or Firebase App ID) per request.                                                               |
| API secret   | Not required.                                                                                                                                                              | Required.                                                                                                                                                           |
| Error model  | Uses a [fast-fail model](https://developers.google.com/data-manager/api/devguides/concepts/understand-errors#fast-fail).                                                   | Only reports errors for test requests [sent to the validation server](https://developers.google.com/analytics/devguides/collection/protocol/ga4/validating-events). |
