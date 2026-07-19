- [HTTP request](https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#body.HTTP_TEMPLATE)
- [Request body](https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#body.request_body)
  - [JSON representation](https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#body.request_body.SCHEMA_REPRESENTATION)
- [Response body](https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#body.response_body)
  - [JSON representation](https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#body.IngestEventsResponse.SCHEMA_REPRESENTATION)
- [Authorization scopes](https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#body.aspect)
- [Event](https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#Event)
  - [JSON representation](https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#Event.SCHEMA_REPRESENTATION)
- [AdIdentifiers](https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#AdIdentifiers)
  - [JSON representation](https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#AdIdentifiers.SCHEMA_REPRESENTATION)
- [EncryptedUserId](https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#EncryptedUserId)
  - [JSON representation](https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#EncryptedUserId.SCHEMA_REPRESENTATION)
- [EncryptionEntityType](https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#EncryptionEntityType)
- [EncryptionSource](https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#EncryptionSource)
- [EventSource](https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#EventSource)
- [CartData](https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#CartData)
  - [JSON representation](https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#CartData.SCHEMA_REPRESENTATION)
- [Item](https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#Item)
  - [JSON representation](https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#Item.SCHEMA_REPRESENTATION)
- [ItemParameter](https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#ItemParameter)
  - [JSON representation](https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#ItemParameter.SCHEMA_REPRESENTATION)
- [ItemCustomVariable](https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#ItemCustomVariable)
  - [JSON representation](https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#ItemCustomVariable.SCHEMA_REPRESENTATION)
- [CustomVariable](https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#CustomVariable)
  - [JSON representation](https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#CustomVariable.SCHEMA_REPRESENTATION)
- [ExperimentalField](https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#ExperimentalField)
  - [JSON representation](https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#ExperimentalField.SCHEMA_REPRESENTATION)
- [UserProperties](https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#UserProperties)
  - [JSON representation](https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#UserProperties.SCHEMA_REPRESENTATION)
- [CustomerType](https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#CustomerType)
- [CustomerValueBucket](https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#CustomerValueBucket)
- [UserProperty](https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#UserProperty)
  - [JSON representation](https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#UserProperty.SCHEMA_REPRESENTATION)
- [EventParameter](https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#EventParameter)
  - [JSON representation](https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#EventParameter.SCHEMA_REPRESENTATION)
- [EventLocation](https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#EventLocation)
  - [JSON representation](https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#EventLocation.SCHEMA_REPRESENTATION)
- [Try it!](https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#try-it)

Uploads a list of `https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#Event` resources from the provided `https://developers.google.com/data-manager/api/reference/rest/v1/Destination`.

### HTTP request

`POST https://datamanager.googleapis.com/v1/events:ingest`

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

### Request body

The request body contains data with the following structure:

| JSON representation |
|---|
| ``` { "destinations": [ { object (`https://developers.google.com/data-manager/api/reference/rest/v1/Destination`) } ], "events": [ { object (`https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#Event`) } ], "consent": { object (`https://developers.google.com/data-manager/api/reference/rest/v1/Consent`) }, "validateOnly": boolean, "encoding": enum (`https://developers.google.com/data-manager/api/reference/rest/v1/Encoding`), "encryptionInfo": { object (`https://developers.google.com/data-manager/api/reference/rest/v1/EncryptionInfo`) } } ``` |

| Fields ||
|---|---|
| `destinations[]` | ``object (`https://developers.google.com/data-manager/api/reference/rest/v1/Destination`)`` Required. The list of destinations to send the events to. |
| `events[]` | ``object (`https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#Event`)`` Required. The list of events to send to the specified destinations. At most 2000 `https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#Event` resources can be sent in a single request. |
| `consent` | ``object (`https://developers.google.com/data-manager/api/reference/rest/v1/Consent`)`` Optional. Request-level consent to apply to all users in the request. User-level consent overrides request-level consent, and can be specified in each `https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#Event`. |
| `validateOnly` | `boolean` Optional. For testing purposes. If `true`, the request is validated but not executed. Only errors are returned, not results. |
| `encoding` | ``enum (`https://developers.google.com/data-manager/api/reference/rest/v1/Encoding`)`` Optional. Required for `https://developers.google.com/data-manager/api/reference/rest/v1/UserData` uploads. The encoding type of the user identifiers. For hashed user identifiers, this is the encoding type of the hashed string. For encrypted hashed user identifiers, this is the encoding type of the outer encrypted string, but not necessarily the inner hashed string, meaning the inner hashed string could be encoded in a different way than the outer encrypted string. For non `UserData` uploads, this field is ignored. |
| `encryptionInfo` | ``object (`https://developers.google.com/data-manager/api/reference/rest/v1/EncryptionInfo`)`` Optional. Encryption information for `https://developers.google.com/data-manager/api/reference/rest/v1/UserData` uploads. If not set, it's assumed that uploaded identifying information is hashed but not encrypted. For non `UserData` uploads, this field is ignored. |

### Response body

Response from the `IngestEventsRequest`.

If successful, the response body contains data with the following structure:

| JSON representation |
|---|
| ``` { "requestId": string } ``` |

| Fields ||
|---|---|
| `requestId` | `string` The auto-generated ID of the request. |

### Authorization scopes

Requires the following OAuth scope:

- `https://www.googleapis.com/auth/datamanager`

## Event

An event representing a user interaction with an advertiser's website or app.

| JSON representation |
|---|
| ``` { "destinationReferences": [ string ], "transactionId": string, "eventTimestamp": string, "lastUpdatedTimestamp": string, "userData": { object (`https://developers.google.com/data-manager/api/reference/rest/v1/UserData`) }, "consent": { object (`https://developers.google.com/data-manager/api/reference/rest/v1/Consent`) }, "adIdentifiers": { object (`https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#AdIdentifiers`) }, "currency": string, "eventSource": enum (`https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#EventSource`), "eventDeviceInfo": { object (`https://developers.google.com/data-manager/api/reference/rest/v1/DeviceInfo`) }, "cartData": { object (`https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#CartData`) }, "customVariables": [ { object (`https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#CustomVariable`) } ], "experimentalFields": [ { object (`https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#ExperimentalField`) } ], "userProperties": { object (`https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#UserProperties`) }, "eventName": string, "clientId": string, "userId": string, "additionalEventParameters": [ { object (`https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#EventParameter`) } ], "thirdPartyUserData": { object (`https://developers.google.com/data-manager/api/reference/rest/v1/UserData`) }, "eventLocation": { object (`https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#EventLocation`) }, "appInstanceId": string, "conversionValue": number, "conversionCount": number } ``` |

| Fields ||
|---|---|
| `destinationReferences[]` | `string` Optional. Reference string used to determine the destination. If empty, the event will be sent to all `https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#body.request_body.FIELDS.destinations` in the request. |
| `transactionId` | `string` Optional. The unique identifier for this event. Required for events sent as an additional data source for tag conversions. |
| `eventTimestamp` | ``string (`https://protobuf.dev/reference/protobuf/google.protobuf#timestamp` format)`` Required. The time the event occurred. Uses RFC 3339, where generated output will always be Z-normalized and use 0, 3, 6 or 9 fractional digits. Offsets other than "Z" are also accepted. Examples: `"2014-10-02T15:01:23Z"`, `"2014-10-02T15:01:23.045123456Z"` or `"2014-10-02T15:01:23+05:30"`. |
| `lastUpdatedTimestamp` | ``string (`https://protobuf.dev/reference/protobuf/google.protobuf#timestamp` format)`` Optional. The last time the event was updated. Uses RFC 3339, where generated output will always be Z-normalized and use 0, 3, 6 or 9 fractional digits. Offsets other than "Z" are also accepted. Examples: `"2014-10-02T15:01:23Z"`, `"2014-10-02T15:01:23.045123456Z"` or `"2014-10-02T15:01:23+05:30"`. |
| `userData` | ``object (`https://developers.google.com/data-manager/api/reference/rest/v1/UserData`)`` Optional. Pieces of user provided data, representing the user the event is associated with. |
| `consent` | ``object (`https://developers.google.com/data-manager/api/reference/rest/v1/Consent`)`` Optional. Information about whether the associated user has provided different types of consent. |
| `adIdentifiers` | ``object (`https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#AdIdentifiers`)`` Optional. Identifiers and other information used to match the conversion event with other online activity (such as ad clicks). |
| `currency` | `string` Optional. The currency code associated with all monetary values within this event. |
| `eventSource` | ``enum (`https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#EventSource`)`` Optional. Signal for where the event happened (web, app, in-store, etc.). |
| `eventDeviceInfo` | ``object (`https://developers.google.com/data-manager/api/reference/rest/v1/DeviceInfo`)`` Optional. Information gathered about the device being used (if any) when the event happened. |
| `cartData` | ``object (`https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#CartData`)`` Optional. Information about the transaction and items associated with the event. |
| `customVariables[]` | ``object (`https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#CustomVariable`)`` Optional. Additional key/value pair information to send to the conversion containers (conversion action or FL activity). |
| `experimentalFields[]` | ``object (`https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#ExperimentalField`)`` Optional. A list of key/value pairs for experimental fields that may eventually be promoted to be part of the API. |
| `userProperties` | ``object (`https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#UserProperties`)`` Optional. Advertiser-assessed information about the user at the time that the event happened. |
| `eventName` | `string` Optional. The name of the event. Required for GA4 events. |
| `clientId` | `string` Optional. A unique identifier for the user instance of a web client for this GA4 web stream. |
| `userId` | `string` Optional. A unique identifier for a user, as defined by the advertiser. |
| `additionalEventParameters[]` | ``object (`https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#EventParameter`)`` Optional. A bucket of any [event parameters](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference/events) to be included within the event that were not already specified using other structured fields. |
| `thirdPartyUserData` | ``object (`https://developers.google.com/data-manager/api/reference/rest/v1/UserData`)`` Optional. The same type of data provided in userData, but explicitly flagged as being provided as owned by a third-party and not first-party advertiser data. |
| `eventLocation` | ``object (`https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#EventLocation`)`` Optional. Information gathered about the location of the user when this event occurred. |
| `appInstanceId` | `string` Optional. A unique identifier for the user instance of an app client for this GA4 app stream. |
| `conversionValue` | `number` Optional. The conversion value associated with the event, for value-based conversions. |
| `conversionCount` | `number` Optional. The conversion quantity associated with the event, for counting-based conversions. |

## AdIdentifiers

Identifiers and other information used to match the conversion event with other online activity (such as ad clicks).

| JSON representation |
|---|
| ``` { "sessionAttributes": string, "gclid": string, "gbraid": string, "wbraid": string, "landingPageDeviceInfo": { object (`https://developers.google.com/data-manager/api/reference/rest/v1/DeviceInfo`) }, "mobileDeviceId": string, "dclid": string, "impressionId": string, "matchId": string, "encryptedUserIds": [ { object (`https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#EncryptedUserId`) } ] } ``` |

| Fields ||
|---|---|
| `sessionAttributes` | `string` Optional. Session attributes for event attribution and modeling. |
| `gclid` | `string` Optional. The Google click ID (gclid) associated with this event. |
| `gbraid` | `string` Optional. The click identifier for clicks associated with app events and originating from iOS devices starting with iOS14. |
| `wbraid` | `string` Optional. The click identifier for clicks associated with web events and originating from iOS devices starting with iOS14. |
| `landingPageDeviceInfo` | ``object (`https://developers.google.com/data-manager/api/reference/rest/v1/DeviceInfo`)`` Optional. Information gathered about the device being used (if any) at the time of landing onto the advertiser's site after interacting with the ad. |
| `mobileDeviceId` | `string` Optional. The mobile identifier for advertisers. This would be IDFA on iOS, AdID on Android, or other platforms' identifiers for advertisers. |
| `dclid` | `string` Optional. The display click ID associated with this event. |
| `impressionId` | `string` Optional. The impression ID associated with this event. |
| `matchId` | `string` Optional. The match ID field used to join this event with a previous event. |
| `encryptedUserIds[]` | ``object (`https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#EncryptedUserId`)`` Optional. Any number of encrypted user IDs. |

## EncryptedUserId

A user identifier issued to be used for attribution. All fields are required if this is used.

| JSON representation |
|---|
| ``` { "encryptedId": string, "entityType": enum (`https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#EncryptionEntityType`), "entityId": string, "source": enum (`https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#EncryptionSource`) } ``` |

| Fields ||
|---|---|
| `encryptedId` | `string` Required. The alphanumeric encrypted id. |
| `entityType` | ``enum (`https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#EncryptionEntityType`)`` Required. The encryption entity type. This should match the encryption configuration for ad serving or Data Transfer. |
| `entityId` | `string (https://developers.google.com/discovery/v1/type-format format)` Required. The encryption entity ID. This should match the encryption configuration for ad serving or Data Transfer. |
| `source` | ``enum (`https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#EncryptionSource`)`` Required. Describes whether the encrypted cookie was received from ad serving (the %m macro) or from Data Transfer. |

## EncryptionEntityType

The encryption entity type.

| Enums ||
|---|---|
| `ENCRYPTION_ENTITY_TYPE_UNSPECIFIED` | Unspecified encryption entity type. |
| `CAMPAIGN_MANAGER_ACCOUNT` | Campaign Manager 360 account. |
| `CAMPAIGN_MANAGER_ADVERTISER` | Campaign Manager 360 advertiser. |
| `DISPLAY_VIDEO_PARTNER` | Display \& Video 360 partner. |
| `DISPLAY_VIDEO_ADVERTISER` | Display \& Video 360 advertiser. |
| `GOOGLE_ADS_CUSTOMER` | Google Ads customer. |
| `GOOGLE_AD_MANAGER_NETWORK_CODE` | Google Ad Manager network code. |

## EncryptionSource

The encryption source.

| Enums ||
|---|---|
| `ENCRYPTION_SOURCE_UNSPECIFIED` | Unspecified encryption source. |
| `AD_SERVING` | Ad serving encryption source. |
| `DATA_TRANSFER` | Data transfer encryption source. |

## EventSource

The source of the event.

| Enums ||
|---|---|
| `EVENT_SOURCE_UNSPECIFIED` | Unspecified EventSource. Should never be used. |
| `WEB` | The event was generated from a web browser. |
| `APP` | The event was generated from an app. |
| `IN_STORE` | The event was generated from an in-store transaction. |
| `PHONE` | The event was generated from a phone call. |
| `MESSAGE` | The event was generated from a message. |
| `OTHER` | The event was generated from other sources. |

## CartData

The cart data associated with the event.

| JSON representation |
|---|
| ``` { "merchantId": string, "merchantFeedLabel": string, "merchantFeedLanguageCode": string, "transactionDiscount": number, "items": [ { object (`https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#Item`) } ], "couponCodes": [ string ] } ``` |

| Fields ||
|---|---|
| `merchantId` | `string` Optional. The Merchant Center ID associated with the items. |
| `merchantFeedLabel` | `string` Optional. The Merchant Center feed label associated with the feed of the items. |
| `merchantFeedLanguageCode` | `string` Optional. The language code in ISO 639-1 associated with the Merchant Center feed of the items.where your items are uploaded. |
| `transactionDiscount` | `number` Optional. The sum of all discounts associated with the transaction. |
| `items[]` | ``object (`https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#Item`)`` Optional. The list of items associated with the event. |
| `couponCodes[]` | `string` Optional. The list of coupon codes that were applied to the cart. Cart-level and item-level coupon codes are independent. If the event is for a Google Analytics destination, only provide a single coupon code. Google Analytics ignores additional coupon codes. |

## Item

Represents an item in the cart associated with the event.

| JSON representation |
|---|
| ``` { "merchantProductId": string, "quantity": string, "unitPrice": number, "itemId": string, "additionalItemParameters": [ { object (`https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#ItemParameter`) } ], "merchantId": string, "merchantFeedLabel": string, "merchantFeedLanguageCode": string, "customVariables": [ { object (`https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#ItemCustomVariable`) } ], "conversionValue": number } ``` |

| Fields ||
|---|---|
| `merchantProductId` | `string` Optional. The product ID within the Merchant Center account. |
| `quantity` | `string (https://developers.google.com/discovery/v1/type-format format)` Optional. The number of this item associated with the event. |
| `unitPrice` | `number` Optional. The unit price excluding tax, shipping, and any transaction level discounts. |
| `itemId` | `string` Optional. A unique identifier to reference the item. |
| `additionalItemParameters[]` | ``object (`https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#ItemParameter`)`` Optional. A bucket of any [event parameters related to an item](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference/events) to be included within the event that were not already specified using other structured fields. |
| `merchantId` | `string` Optional. The Merchant Center ID associated with the item. For Store Sales events this will override the value set at the cart level. This field is ignored for other events. |
| `merchantFeedLabel` | `string` Optional. The feed label of the Merchant Center feed. If countries are still being used, the 2-letter country code in ISO-3166-1 alpha-2 can be used instead. For Store Sales events this will override the value set at the cart level. This field is ignored for other events. |
| `merchantFeedLanguageCode` | `string` Optional. The language code in ISO 639-1 associated with the Merchant Center feed where your items are uploaded. |
| `customVariables[]` | ``object (`https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#ItemCustomVariable`)`` Optional. Additional key/value pair information to send to the conversion containers (conversion action or Floodlight activity), when tracking per-item conversions. |
| `conversionValue` | `number` Optional. The conversion value associated with this item within the event, for cases where the conversion value is different for each item. |

## ItemParameter

A bucket of any [event parameters related to an item](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference/events) to be included within the event that were not already specified using other structured fields.

| JSON representation |
|---|
| ``` { "parameterName": string, "value": string } ``` |

| Fields ||
|---|---|
| `parameterName` | `string` Required. The name of the parameter to use. |
| `value` | `string` Required. The string representation of the value of the parameter to set. |

## ItemCustomVariable

Item-level custom variable for ads conversions.

| JSON representation |
|---|
| ``` { "variable": string, "value": string, "destinationReferences": [ string ] } ``` |

| Fields ||
|---|---|
| `variable` | `string` Optional. The name of the custom variable to set. If the variable is not found for the given destination, it will be ignored. |
| `value` | `string` Optional. The value to store for the custom variable. |
| `destinationReferences[]` | `string` Optional. Reference string used to determine which of the `https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#Event.FIELDS.destination_references` the custom variable should be sent to. If empty, the `https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#Event.FIELDS.destination_references` will be used. |

## CustomVariable

Custom variable for ads conversions.

| JSON representation |
|---|
| ``` { "variable": string, "value": string, "destinationReferences": [ string ] } ``` |

| Fields ||
|---|---|
| `variable` | `string` Optional. The name of the custom variable to set. If the variable is not found for the given destination, it will be ignored. |
| `value` | `string` Optional. The value to store for the custom variable. |
| `destinationReferences[]` | `string` Optional. Reference string used to determine which of the `https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#Event.FIELDS.destination_references` the custom variable should be sent to. If empty, the `https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#Event.FIELDS.destination_references` will be used. |

## ExperimentalField

Experimental field representing unofficial fields.

| JSON representation |
|---|
| ``` { "field": string, "value": string } ``` |

| Fields ||
|---|---|
| `field` | `string` Optional. The name of the field to use. |
| `value` | `string` Optional. The value the field to set. |

## UserProperties

Advertiser-assessed information about the user at the time that the event happened. See <https://support.google.com/google-ads/answer/14007601> for more details.

| JSON representation |
|---|
| ``` { "customerType": enum (`https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#CustomerType`), "customerValueBucket": enum (`https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#CustomerValueBucket`), "additionalUserProperties": [ { object (`https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#UserProperty`) } ] } ``` |

| Fields ||
|---|---|
| `customerType` | ``enum (`https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#CustomerType`)`` Optional. Type of the customer associated with the event. |
| `customerValueBucket` | ``enum (`https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#CustomerValueBucket`)`` Optional. The advertiser-assessed value of the customer. |
| `additionalUserProperties[]` | ``object (`https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#UserProperty`)`` Optional. A bucket of any additional [user properties](https://developers.google.com/analytics/devguides/collection/protocol/ga4/user-properties) for the user associated with this event. |

## CustomerType

Type of the customer associated with the event.

| Enums ||
|---|---|
| `CUSTOMER_TYPE_UNSPECIFIED` | Unspecified CustomerType. Should never be used. |
| `NEW` | The customer is new to the advertiser. |
| `RETURNING` | The customer is returning to the advertiser. |
| `REENGAGED` | The customer has re-engaged with the advertiser. |

## CustomerValueBucket

The advertiser-assessed value of the customer.

| Enums ||
|---|---|
| `CUSTOMER_VALUE_BUCKET_UNSPECIFIED` | Unspecified CustomerValueBucket. Should never be used. |
| `LOW` | The customer is low value. |
| `MEDIUM` | The customer is medium value. |
| `HIGH` | The customer is high value. |

## UserProperty

A bucket of any additional [user properties](https://developers.google.com/analytics/devguides/collection/protocol/ga4/user-properties) for the user associated with this event.

| JSON representation |
|---|
| ``` { "propertyName": string, "value": string } ``` |

| Fields ||
|---|---|
| `propertyName` | `string` Required. The name of the user property to use. |
| `value` | `string` Required. The string representation of the value of the user property to use. |

## EventParameter

Event parameter for GA4 events.

| JSON representation |
|---|
| ``` { "parameterName": string, "value": string } ``` |

| Fields ||
|---|---|
| `parameterName` | `string` Required. The name of the parameter to use. |
| `value` | `string` Required. The string representation of the value of the parameter to set. |

## EventLocation

The location where the event occurred.

| JSON representation |
|---|
| ``` { "storeId": string, "city": string, "subdivisionCode": string, "regionCode": string, "subcontinentCode": string, "continentCode": string } ``` |

| Fields ||
|---|---|
| `storeId` | `string` Optional. Required for Store Sales. The identifier to represent a physical store where the event happened. |
| `city` | `string` Optional. The name of the city where the event occurred. |
| `subdivisionCode` | `string` Optional. The ISO 3166-2 subdivision code where the event occurred. |
| `regionCode` | `string` Optional. The 2-letter CLDR region code of the user's address. |
| `subcontinentCode` | `string` Optional. The subcontinent code in UN M49 format where the event occurred. |
| `continentCode` | `string` Optional. The continent code in UN M49 format where the event occurred. |
