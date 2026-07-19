# Field mappings

Use the mappings in the tables to map a [Measurement Protocol](https://developers.google.com/analytics/devguides/collection/protocol/ga4) data collection
request (`/mp/collect`) to its [`IngestEventsRequest`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#ingesteventsrequest)
equivalent in the Data Manager API.

## Request fields

| [`/mp/collect`](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference) request (Measurement Protocol) | [`IngestEventsRequest`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#ingesteventsrequest) (Data Manager API) | Notes |
|---|---|---|
| `measurement_id` (Query parameter) | `destinations` | Map to `product_destination_id` for **web events** . See [Destination fields](https://developers.google.com/data-manager/api/devguides/events/analytics/measurement-protocol/upgrade/field-mappings#destination) for details. |
| `firebase_app_id` (Query parameter) | `destinations` | Map to `product_destination_id` for **app events** . See [Destination fields](https://developers.google.com/data-manager/api/devguides/events/analytics/measurement-protocol/upgrade/field-mappings#destination) for details. |
| `api_secret` (Query parameter) | No equivalent | See [Set up API access](https://developers.google.com/data-manager/api/devguides/quickstart/set-up-access) to learn how to authenticate requests in Data Manager API |
| `consent` | `consent` | Set to a [`Consent`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#consent) object. |
| `events` | `events` | Set to a list of [`Event`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#event) resources. See the [Event fields section](https://developers.google.com/data-manager/api/devguides/events/analytics/measurement-protocol/upgrade/field-mappings#event-fields) for details. |
| `client_id` | `events.client_id` | Required for **web events**. |
| `app_instance_id` | `events.app_instance_id` | Required for **app events**. |
| `user_id` | `events.user_id` | Optional. A unique identifier for a user. |
| `timestamp_micros` | `events.event_timestamp` | In Measurement Protocol, this can be provided at the request level or for an individual event. In the Data Manager API, there isn't a request level timestamp. Set `event_timestamp` on each event to the time the event occurred. - If using the JSON format, set to a value in [RFC 3339](https://www.ietf.org/rfc/rfc3339) format. - If using protocol buffers, use a [`Timestamp`](https://protobuf.dev/reference/protobuf/google.protobuf/#timestamp) and set the `seconds` and (optionally) the `nanoseconds` fields. <br /> See [Timestamp format](https://developers.google.com/data-manager/api/devguides/concepts/formatting#timestamp_format) for details. |
| `user_properties` | `events.user_properties` | Set to a [`UserProperties`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#userproperties) object. Data Manager API does not support [setting timestamps for individual user properties](https://developers.google.com/analytics/devguides/collection/protocol/ga4/user-properties#override_timestamp). Timestamps associated with changes to user properties are inferred from the timestamp of the event (`event_timestamp`). |
| `user_data` | `events.user_data` | Set to a [`UserData`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#userdata) object. See [User identifier fields](https://developers.google.com/data-manager/api/devguides/events/analytics/measurement-protocol/upgrade/field-mappings#user-identifiers) for details. |
| `non_personalized_ads` | `events.consent.ad_personalization` | If `non_personalized_ads` is `true`, set `ad_personalization` to `DENIED`. |
| `user_location` | `events.event_location` | See [User location fields](https://developers.google.com/data-manager/api/devguides/events/analytics/measurement-protocol/upgrade/field-mappings#user-location) for details. |
| `ip_override` | `events.event_device_info.ip_address` |   |
| `device` | `events.event_device_info` | See [Device fields](https://developers.google.com/data-manager/api/devguides/events/analytics/measurement-protocol/upgrade/field-mappings#device) for details. |
| `user_agent` | `events.event_device_info.user_agent` |   |
| `validation_behavior` | No equivalent | Use [Diagnostics](https://developers.google.com/data-manager/api/devguides/diagnostics) to retrieve the status of your upload as well as errors and warnings for individual events during downstream processing. If the `IngestEventsRequest` [fails](https://developers.google.com/data-manager/api/devguides/events/send-events#failure_responses) (for example, due to missing required fields), no events are processed and you will need to resolve the error and retry the request. See [Understand API errors](https://developers.google.com/data-manager/api/devguides/concepts/understand-errors) for more information. |
| `/debug/mp/collect` | `validate_only` | Set `validate_only` to `true` to validate events without ingesting any data, similar to the [Measurement Protocol validation server](https://developers.google.com/analytics/devguides/collection/protocol/ga4/validating-events). |
| No equivalent | `encoding` | Required for [`UserData`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#userdata) uploads. Set to the [`Encoding`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#encoding) used for `UserIdentifier` values. |

## Destination fields

The Measurement Protocol sends events directly to a specific data stream using the
`measurement_id` or `firebase_app_id` query parameter.

The Data Manager API uses a `Destination` object to specify where to send data.
Check out [Configure destinations](https://developers.google.com/data-manager/api/devguides/concepts/destinations) for more information
about destinations.

Here's how to map the Measurement Protocol fields to the equivalent fields in a `Destination`:

| Measurement Protocol | [`Destination`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#destination) (Data Manager API) | Notes |
|---|---|---|
| `measurement_id` (Query parameter) | `product_destination_id` | Set to the measurement ID of the Google Analytics **web data stream** |
| `firebase_app_id` (Query parameter) | `product_destination_id` | Set to the Firebase App ID of the Google Analytics **app data stream** |
| No equivalent | `operating_account` | Set the `account_id` to the Google Analytics property ID. Set `account_type` to `GOOGLE_ANALYTICS_PROPERTY`. |
| No equivalent | `login_account` | Set the `account_id` to the Google Analytics property ID. Set `account_type` to `GOOGLE_ANALYTICS_PROPERTY`. |

## Event fields

| Measurement Protocol `events[]` | [`Event`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#event) (Data Manager API) | Notes |
|---|---|---|
| `name` | `event_name` | If `event_name` uses a [reserved name](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference#reserved_names), the API rejects the event with an `INVALID_EVENT_NAME` error. |
| No equivalent | `event_source` | Set to `WEB` if the event was generated from a web browser, and `APP` if the event was generated from an app. |
| No equivalent | `destination_references` | Required if the request-level `destinations` list contains more than one Google Analytics [`Destination`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#destination). Add an entry to specify which destination should receive the event. |
| `timestamp_micros` | `event_timestamp` | - If using the JSON format, set to a value in [RFC 3339](https://www.ietf.org/rfc/rfc3339) format. - If using protocol buffers, use a [`Timestamp`](https://protobuf.dev/reference/protobuf/google.protobuf/#timestamp) and set the `seconds` and (optionally) the `nanoseconds` fields. <br /> See [Timestamp format](https://developers.google.com/data-manager/api/devguides/concepts/formatting#timestamp_format) for details. |
| `params.currency` | `currency` |   |
| `params.value` | `conversion_value` |   |
| `params.customer_type` | `user_properties.customer_type` | In Measurement Protocol, the `customer_type` parameter is set as an event parameter. In Data Manager API, set it in the `customer_type` field in the [`UserProperties`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#userproperties) object on the event. |
| `params.transaction_id` | `transaction_id` | **Required** for some events and use cases. See [Convert the data to `Event` objects](https://developers.google.com/data-manager/api/devguides/events/send-events#convert_to_events) for more details. |
| `params.items` | `cart_data.items` | See [Item fields for cart data](https://developers.google.com/data-manager/api/devguides/events/analytics/measurement-protocol/upgrade/field-mappings#items) for details. |
| `params.coupon` | `cart_data.coupon_codes` | Use the `coupon_codes` field to provide the coupons that were applied to the cart. Only provide a single coupon for Google Analytics. This is independent from [`Item`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#item) level coupons, which can be set using `cart_data.items.additional_item_parameters` for individual items. |
| `params.session_id` | `additional_event_parameters` | Map to an entry with `parameter_name` set to `session_id`. |
| `params.engagement_time_msec` | `additional_event_parameters` | Map to an entry with `parameter_name` set to `engagement_time_msec`. |
| Other `params` | `additional_event_parameters` | Map other parameters as a list of objects with `parameter_name` and `value`. <br /> **Note:** Don't add entries for `transaction_id`, `currency`, or `value` here; use the top-level fields on the `Event` instead. |

## User identifier fields

| [`Measurement Protocol user_data`](https://developers.google.com/analytics/devguides/collection/ga4/uid-data) | [`UserIdentifier`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#useridentifier) (Data Manager API) | Notes |
|---|---|---|
| `sha256_email_address[]` | `email_address` | Set to the [formatted and hashed](https://developers.google.com/data-manager/api/devguides/concepts/formatting) email address. You can also [encrypt the hashed email address](https://developers.google.com/data-manager/api/devguides/concepts/encryption). |
| `sha256_phone_number[]` | `phone_number` | Set to the [formatted and hashed](https://developers.google.com/data-manager/api/devguides/concepts/formatting) phone number. You can also [encrypt the hashed phone number](https://developers.google.com/data-manager/api/devguides/concepts/encryption). |
| `address[]` | `address` | Set to an [`AddressInfo`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#addressinfo) object. Follow the [formatting and hashing guidelines](https://developers.google.com/data-manager/api/devguides/concepts/formatting). |
| `address[].sha256_first_name` | `address.given_name` | Set to the [formatted and hashed](https://developers.google.com/data-manager/api/devguides/concepts/formatting) given name. You can also [encrypt the hashed given name](https://developers.google.com/data-manager/api/devguides/concepts/encryption). |
| `address[].sha256_last_name` | `address.family_name` | Set to the [formatted and hashed](https://developers.google.com/data-manager/api/devguides/concepts/formatting) family name. You can also [encrypt the hashed family name](https://developers.google.com/data-manager/api/devguides/concepts/encryption). |
| `address[].country` | `address.region_code` |   |
| `address[].postal_code` | `address.postal_code` |   |
| `address[].city` | No equivalent | Not supported in the current version of the Data Manager API. |
| `address[].region` | No equivalent | Not supported in the current version of the Data Manager API. |
| `address[].sha256_street` | No equivalent | Not supported in the current version of the Data Manager API. |

## Item fields for cart data

| Measurement Protocol `items[]` | [`Item`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#item) (Data Manager API) | Notes |
|---|---|---|
| `item_id` | `item_id` | **Required.** |
| `item_name` | `additional_item_parameters` | Map to an entry with `parameter_name` set to `item_name`. |
| `quantity` | `quantity` | **Required.** |
| `price` | `unit_price` | **Required.** |
| Other item fields | `additional_item_parameters` | Map other item parameters (such as `discount`, `affiliation`, `item_brand`, etc.) as a list of objects with `parameter_name` and `value`. <br /> **Note:** Don't add entries for `quantity`, `price`, or `item_id` here; use the top-level fields on the `Item` instead. |

## User location fields

| [`Measurement Protocol user_location`](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference/events#payload_geo_info) | [`EventLocation`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#eventlocation) (Data Manager API) | Notes |
|---|---|---|
| `city` | `city` | The [name of the city](https://en.wikipedia.org/wiki/Lists_of_cities) where the event occurred. |
| `country_id` | `region_code` | Set to the [2-letter CLDR region code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). |
| `region_id` | `subdivision_code` | Set to the [ISO 3166-2 subdivision code](https://en.wikipedia.org/wiki/ISO_3166-2). |
| `continent_id` | `continent_code` | Set to the continent code in [UN M49 format](https://en.wikipedia.org/wiki/UN_M49). |
| `subcontinent_id` | `subcontinent_code` | Set to the subcontinent code in [UN M49 format](https://en.wikipedia.org/wiki/UN_M49). |

## Device fields

| [`Measurement Protocol device`](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference/events#payload_device_info) | [`DeviceInfo`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#deviceinfo) (Data Manager API) | Notes |
|---|---|---|
| `category` | `category` |   |
| `language` | `language_code` |   |
| `screen_resolution` | `screen_height` and `screen_width` | In Measurement Protocol, `screen_resolution` is provided as a string (`"1280x720"`). In Data Manager API, send `screen_height` and `screen_width` as separate integer values. |
| `operating_system` | `operating_system` |   |
| `operating_system_version` | `operating_system_version` |   |
| `model` | `model` |   |
| `brand` | `brand` |   |
| `browser` | `browser` |   |
| `browser_version` | `browser_version` |   |
