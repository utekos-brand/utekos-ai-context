# Method: adEvents.ingest

- [HTTP request](https://developers.google.com/data-manager/api/reference/rest/v1/adEvents/ingest#body.HTTP_TEMPLATE)
- [Request body](https://developers.google.com/data-manager/api/reference/rest/v1/adEvents/ingest#body.request_body)
  - [JSON representation](https://developers.google.com/data-manager/api/reference/rest/v1/adEvents/ingest#body.request_body.SCHEMA_REPRESENTATION)
- [Response body](https://developers.google.com/data-manager/api/reference/rest/v1/adEvents/ingest#body.response_body)
- [Authorization scopes](https://developers.google.com/data-manager/api/reference/rest/v1/adEvents/ingest#body.aspect)
- [AdEvent](https://developers.google.com/data-manager/api/reference/rest/v1/adEvents/ingest#AdEvent)
  - [JSON representation](https://developers.google.com/data-manager/api/reference/rest/v1/adEvents/ingest#AdEvent.SCHEMA_REPRESENTATION)
- [EventType](https://developers.google.com/data-manager/api/reference/rest/v1/adEvents/ingest#EventType)
- [EventSubtype](https://developers.google.com/data-manager/api/reference/rest/v1/adEvents/ingest#EventSubtype)
- [AdType](https://developers.google.com/data-manager/api/reference/rest/v1/adEvents/ingest#AdType)
- [AdFormat](https://developers.google.com/data-manager/api/reference/rest/v1/adEvents/ingest#AdFormat)
- [AdPlacement](https://developers.google.com/data-manager/api/reference/rest/v1/adEvents/ingest#AdPlacement)
- [TargetingType](https://developers.google.com/data-manager/api/reference/rest/v1/adEvents/ingest#TargetingType)
- [PlatformType](https://developers.google.com/data-manager/api/reference/rest/v1/adEvents/ingest#PlatformType)
- [Platform](https://developers.google.com/data-manager/api/reference/rest/v1/adEvents/ingest#Platform)
- [AttributionHint](https://developers.google.com/data-manager/api/reference/rest/v1/adEvents/ingest#AttributionHint)
- [ViewabilityInfo](https://developers.google.com/data-manager/api/reference/rest/v1/adEvents/ingest#ViewabilityInfo)
  - [JSON representation](https://developers.google.com/data-manager/api/reference/rest/v1/adEvents/ingest#ViewabilityInfo.SCHEMA_REPRESENTATION)
- [ViewType](https://developers.google.com/data-manager/api/reference/rest/v1/adEvents/ingest#ViewType)
- [MediaQuartile](https://developers.google.com/data-manager/api/reference/rest/v1/adEvents/ingest#MediaQuartile)
- [Try it!](https://developers.google.com/data-manager/api/reference/rest/v1/adEvents/ingest#try-it)

Uploads a list of `https://developers.google.com/data-manager/api/reference/rest/v1/adEvents/ingest#AdEvent` resources to Google Analytics.

This feature is only available to accounts on an allowlist.

### HTTP request

`POST https://datamanager.googleapis.com/v1/adEvents:ingest`

The URL uses [gRPC Transcoding](https://google.aip.dev/127) syntax.

### Request body

The request body contains data with the following structure:

| JSON representation |
|---|
| ``` { "adEvents": [ { object (`https://developers.google.com/data-manager/api/reference/rest/v1/adEvents/ingest#AdEvent`) } ], "encryptionInfo": { object (`https://developers.google.com/data-manager/api/reference/rest/v1/EncryptionInfo`) }, "validateOnly": boolean } ``` |

| Fields ||
|---|---|
| `adEvents[]` | ``object (`https://developers.google.com/data-manager/api/reference/rest/v1/adEvents/ingest#AdEvent`)`` Required. Required (at least 1). A list of ad events. |
| `encryptionInfo` | ``object (`https://developers.google.com/data-manager/api/reference/rest/v1/EncryptionInfo`)`` Optional. Information about encryption keys which are used to encrypt the data. |
| `validateOnly` | `boolean` Optional. If true, the request is validated, but not executed. |

### Response body

If successful, the response body is empty.

### Authorization scopes

Requires the following OAuth scope:

- `https://www.googleapis.com/auth/datamanager`

## AdEvent

An ad event.

| JSON representation |
|---|
| ``` { "advertiserId": string, "eventType": enum (`https://developers.google.com/data-manager/api/reference/rest/v1/adEvents/ingest#EventType`), "timestamp": string, "eventId": string, "userData": { object (`https://developers.google.com/data-manager/api/reference/rest/v1/UserData`) }, "deviceInfo": { object (`https://developers.google.com/data-manager/api/reference/rest/v1/DeviceInfo`) }, "mobileDeviceId": string, "campaignId": string, "campaignName": string, "adGroupId": string, "adId": string, "adHeight": integer, "adWidth": integer, "regionCode": string, "source": string, "medium": string, "attributionHint": enum (`https://developers.google.com/data-manager/api/reference/rest/v1/adEvents/ingest#AttributionHint`), "viewabilityInfo": { object (`https://developers.google.com/data-manager/api/reference/rest/v1/adEvents/ingest#ViewabilityInfo`) }, // Union field `event_subtype_oneof` can be only one of the following: "eventSubtype": enum (`https://developers.google.com/data-manager/api/reference/rest/v1/adEvents/ingest#EventSubtype`), "eventSubtypeString": string // End of list of possible types for union field `event_subtype_oneof`. // Union field `ad_type_oneof` can be only one of the following: "adType": enum (`https://developers.google.com/data-manager/api/reference/rest/v1/adEvents/ingest#AdType`), "adTypeString": string // End of list of possible types for union field `ad_type_oneof`. // Union field `ad_format_oneof` can be only one of the following: "adFormat": enum (`https://developers.google.com/data-manager/api/reference/rest/v1/adEvents/ingest#AdFormat`), "adFormatString": string // End of list of possible types for union field `ad_format_oneof`. // Union field `ad_placement_oneof` can be only one of the following: "adPlacement": enum (`https://developers.google.com/data-manager/api/reference/rest/v1/adEvents/ingest#AdPlacement`), "adPlacementString": string // End of list of possible types for union field `ad_placement_oneof`. // Union field `targeting_type_oneof` can be only one of the following: "targetingType": enum (`https://developers.google.com/data-manager/api/reference/rest/v1/adEvents/ingest#TargetingType`), "targetingTypeString": string // End of list of possible types for union field `targeting_type_oneof`. // Union field `platform_type_oneof` can be only one of the following: "platformType": enum (`https://developers.google.com/data-manager/api/reference/rest/v1/adEvents/ingest#PlatformType`), "platformTypeString": string // End of list of possible types for union field `platform_type_oneof`. // Union field `platform_oneof` can be only one of the following: "platform": enum (`https://developers.google.com/data-manager/api/reference/rest/v1/adEvents/ingest#Platform`), "platformString": string // End of list of possible types for union field `platform_oneof`. "measurementAllowed": boolean } ``` |

| Fields ||
|---|---|
| `advertiserId` | `string` Required. The ID of the advertiser for the ad event. This must match the ID sent in the linking flow. |
| `eventType` | ``enum (`https://developers.google.com/data-manager/api/reference/rest/v1/adEvents/ingest#EventType`)`` Required. The type of the event. |
| `timestamp` | ``string (`https://protobuf.dev/reference/protobuf/google.protobuf#timestamp` format)`` Required. The time the event occurred. Uses RFC 3339, where generated output will always be Z-normalized and use 0, 3, 6 or 9 fractional digits. Offsets other than "Z" are also accepted. Examples: `"2014-10-02T15:01:23Z"`, `"2014-10-02T15:01:23.045123456Z"` or `"2014-10-02T15:01:23+05:30"`. |
| `eventId` | `string` Optional. An ID created and managed by the caller that uniquely identifies this event. Required if you want to deduplicate ad events that are included in multiple requests. Otherwise, this field is optional. |
| `userData` | ``object (`https://developers.google.com/data-manager/api/reference/rest/v1/UserData`)`` Optional. Multiple pieces of user-provided data, representing the user the event is associated with. It is possible to provide multiple instances of the same type of data (e.g. email address). The more data provided, the more likely a match will be found. |
| `deviceInfo` | ``object (`https://developers.google.com/data-manager/api/reference/rest/v1/DeviceInfo`)`` Optional. Information gathered about the device being used when the ad event happened. |
| `mobileDeviceId` | `string` Optional. The device ID of the device that the ad was served to. |
| `campaignId` | `string` Required. The ID of the associated campaign. |
| `campaignName` | `string` Required. The name of the associated campaign. |
| `adGroupId` | `string` Optional. The ID of the associated ad group. |
| `adId` | `string` Optional. The ID of the associated ad within the group. |
| `adHeight` | `integer` Optional. The height of the ad in pixels. |
| `adWidth` | `integer` Optional. The width of the ad in pixels. |
| `regionCode` | `string` Required. The ISO 3166-2 country plus subdivision. |
| `source` | `string` Required. The platform source of the ad, akin to the Google Analytics source. |
| `medium` | `string` Required. The medium of the ad, akin to the Google Analytics medium. |
| `attributionHint` | ``enum (`https://developers.google.com/data-manager/api/reference/rest/v1/adEvents/ingest#AttributionHint`)`` Optional. The partner-assumed attribution status for this ad event. This acts only as a signal for how the partner assumed attribution played out, and does not force an end result in final reports. |
| `viewabilityInfo` | ``object (`https://developers.google.com/data-manager/api/reference/rest/v1/adEvents/ingest#ViewabilityInfo`)`` Required. Details of the viewability of the ad served. |
| Union field `event_subtype_oneof`. Optional. Additional classification about the type of ad event. A raw string is accepted to handle values other than the pure enums. The enum is preferred if possible. `event_subtype_oneof` can be only one of the following: ||
| `eventSubtype` | ``enum (`https://developers.google.com/data-manager/api/reference/rest/v1/adEvents/ingest#EventSubtype`)`` Enum value for event subtype. |
| `eventSubtypeString` | `string` String value for event subtype. |
| Union field `ad_type_oneof`. Optional. The type of the ad served. A raw string is accepted to handle values other than the pure enums. The enum is preferred if possible. `ad_type_oneof` can be only one of the following: ||
| `adType` | ``enum (`https://developers.google.com/data-manager/api/reference/rest/v1/adEvents/ingest#AdType`)`` Enum value for ad type. |
| `adTypeString` | `string` String value for ad type. |
| Union field `ad_format_oneof`. Optional. The type of the ad served. A raw string is accepted to handle values other than the pure enums. The enum is preferred if possible. `ad_format_oneof` can be only one of the following: ||
| `adFormat` | ``enum (`https://developers.google.com/data-manager/api/reference/rest/v1/adEvents/ingest#AdFormat`)`` Enum value for ad format. |
| `adFormatString` | `string` String value for ad format. |
| Union field `ad_placement_oneof`. Optional. The placement of the ad served. A raw string is accepted to handle values other than the pure enums. The enum is preferred if possible. `ad_placement_oneof` can be only one of the following: ||
| `adPlacement` | ``enum (`https://developers.google.com/data-manager/api/reference/rest/v1/adEvents/ingest#AdPlacement`)`` Enum value for ad placement. |
| `adPlacementString` | `string` String value for ad placement. |
| Union field `targeting_type_oneof`. Optional. The type of targeting used to serve the ad. A raw string is accepted to handle values other than the pure enums. The enum is preferred if possible. `targeting_type_oneof` can be only one of the following: ||
| `targetingType` | ``enum (`https://developers.google.com/data-manager/api/reference/rest/v1/adEvents/ingest#TargetingType`)`` Enum value for targeting type. |
| `targetingTypeString` | `string` String value for targeting type. |
| Union field `platform_type_oneof`. Optional. The type of the platform on which the ad was served. A raw string is accepted to handle values other than the pure enums. The enum is preferred if possible. `platform_type_oneof` can be only one of the following: ||
| `platformType` | ``enum (`https://developers.google.com/data-manager/api/reference/rest/v1/adEvents/ingest#PlatformType`)`` Enum value for platform type. |
| `platformTypeString` | `string` String value for platform type. |
| Union field `platform_oneof`. Optional. Further detail of the platform on which the ad was served. A raw string is accepted to handle values other than the pure enums. The enum is preferred if possible. `platform_oneof` can be only one of the following: ||
| `platform` | ``enum (`https://developers.google.com/data-manager/api/reference/rest/v1/adEvents/ingest#Platform`)`` Enum value for platform. |
| `platformString` | `string` String value for platform. |
| `measurementAllowed` | `boolean` Optional. Represents if the row is allowed to be used for measurement purposes, as governed by applicable privacy laws within regional jurisdiction. |

## EventType

The type of the event.

| Enums ||
|---|---|
| `EVENT_TYPE_UNSPECIFIED` | Unspecified event type. |
| `EVENT_TYPE_VIEW` | View event. |
| `EVENT_TYPE_CLICK` | Click event. |

## EventSubtype

Additional classification about the type of ad event.

| Enums ||
|---|---|
| `EVENT_SUBTYPE_UNSPECIFIED` | Unspecified event subtype. |
| `EVENT_SUBTYPE_IMPRESSION` | Impression event. |
| `EVENT_SUBTYPE_ENGAGED_VIEW` | Engaged view event. |
| `EVENT_SUBTYPE_ONSITE_CLICK` | Onsite click event. |
| `EVENT_SUBTYPE_OUTBOUND_CLICK` | Outbound click event. |

## AdType

The type of the ad served.

| Enums ||
|---|---|
| `AD_TYPE_UNSPECIFIED` | Unspecified ad type. |
| `AD_TYPE_DISPLAY` | Display ad. |
| `AD_TYPE_TEXT` | Text ad. |
| `AD_TYPE_IMAGE` | Image ad. |
| `AD_TYPE_RICH_MEDIA` | Rich media ad. |
| `AD_TYPE_HTML` | HTML ad. |
| `AD_TYPE_AUDIO` | Audio ad. |
| `AD_TYPE_VIDEO` | Video ad. |

## AdFormat

The format of the ad served.

| Enums ||
|---|---|
| `AD_FORMAT_UNSPECIFIED` | Unspecified ad format. |
| `AD_FORMAT_AR` | AR ad. |
| `AD_FORMAT_AUDIO` | Audio ad. |
| `AD_FORMAT_BANNER` | Banner ad. |
| `AD_FORMAT_BUMPER` | Bumper ad. |
| `AD_FORMAT_CAROUSEL` | Carousel ad. |
| `AD_FORMAT_COLLECTION` | Collection ad. |
| `AD_FORMAT_IMAGE` | Image ad. |
| `AD_FORMAT_INTERACTIVE` | Interactive ad. |
| `AD_FORMAT_INTERSTITIAL` | Interstitial ad. |
| `AD_FORMAT_IN_FEED` | In-feed ad. |
| `AD_FORMAT_IN_STREAM` | In-stream ad. |
| `AD_FORMAT_IN_STREAM_SKIPPABLE` | In-stream skippable ad. |
| `AD_FORMAT_IN_STREAM_NON_SKIPPABLE` | In-stream non-skippable ad. |
| `AD_FORMAT_NATIVE` | Native ad. |
| `AD_FORMAT_SHORTS` | Shorts ad. |
| `AD_FORMAT_STORY` | Story ad. |
| `AD_FORMAT_SPONSORED` | Sponsored ad. |
| `AD_FORMAT_VIDEO` | Video ad. |

## AdPlacement

The placement of the ad served.

| Enums ||
|---|---|
| `AD_PLACEMENT_UNSPECIFIED` | Unspecified ad placement. |
| `AD_PLACEMENT_DISCOVER` | Discover placement. |
| `AD_PLACEMENT_FEED` | Feed placement. |
| `AD_PLACEMENT_FOOTER` | Footer placement. |
| `AD_PLACEMENT_HEADER` | Header placement. |
| `AD_PLACEMENT_HOME` | Home placement. |
| `AD_PLACEMENT_IN_CONTENT` | In-content placement. |
| `AD_PLACEMENT_PROMOTED` | Promoted placement. |
| `AD_PLACEMENT_SEARCH` | Search placement. |
| `AD_PLACEMENT_STORY` | Story placement. |

## TargetingType

The type of targeting used to serve the ad.

| Enums ||
|---|---|
| `TARGETING_TYPE_UNSPECIFIED` | Unspecified targeting type. |
| `TARGETING_TYPE_AUDIENCE` | Audience targeting. |
| `TARGETING_TYPE_CONTEXTUAL` | Contextual targeting. |
| `TARGETING_TYPE_DEMOGRAPHIC` | Demographic targeting. |
| `TARGETING_TYPE_DEVICE` | Device targeting. |
| `TARGETING_TYPE_GEO` | Geo targeting. |
| `TARGETING_TYPE_INTEREST` | Interest targeting. |
| `TARGETING_TYPE_PURCHASE_INTENT` | Purchase intent targeting. |
| `TARGETING_TYPE_REMARKETING` | Remarketing targeting. |

## PlatformType

The type of the platform on which the ad was served.

| Enums ||
|---|---|
| `PLATFORM_TYPE_UNSPECIFIED` | Unspecified platform type. |
| `PLATFORM_TYPE_MOBILE` | Mobile platform. |
| `PLATFORM_TYPE_DESKTOP` | Desktop platform. |
| `PLATFORM_TYPE_CTV` | CTV platform. |
| `PLATFORM_TYPE_PHONE` | Phone platform. |
| `PLATFORM_TYPE_TABLET` | Tablet platform. |

## Platform

Further detail of the platform on which the ad was served.

| Enums ||
|---|---|
| `PLATFORM_UNSPECIFIED` | Unspecified platform. |
| `PLATFORM_IOS` | iOS platform. |
| `PLATFORM_ANDROID` | Android platform. |
| `PLATFORM_WEB` | Web platform. |

## AttributionHint

The partner-assumed attribution status for this ad event.

| Enums ||
|---|---|
| `ATTRIBUTION_HINT_UNSPECIFIED` | Unknown attribution status. |
| `ATTRIBUTION_HINT_CONVERTED` | Converted status. |
| `ATTRIBUTION_HINT_NOT_CONVERTED` | Not converted status. |

## ViewabilityInfo

Details of the viewability of the ad served.

| JSON representation |
|---|
| ``` { "viewType": enum (`https://developers.google.com/data-manager/api/reference/rest/v1/adEvents/ingest#ViewType`), "viewablePercent": integer, "viewableDuration": string, "mediaSkippable": boolean, "mediaQuartile": enum (`https://developers.google.com/data-manager/api/reference/rest/v1/adEvents/ingest#MediaQuartile`), "mediaDuration": string, "mediaVolumePercent": integer, "playbackDuration": string } ``` |

| Fields ||
|---|---|
| `viewType` | ``enum (`https://developers.google.com/data-manager/api/reference/rest/v1/adEvents/ingest#ViewType`)`` Required. The type of the event. |
| `viewablePercent` | `integer` Optional. The numerical percent (0-100) of the pixels that were viewable. |
| `viewableDuration` | ``string (`https://protobuf.dev/reference/protobuf/google.protobuf#duration` format)`` Optional. The amount of time the ad was viewable for. A duration in seconds with up to nine fractional digits, ending with '`s`'. Example: `"3.5s"`. |
| `mediaSkippable` | `boolean` Optional. Whether the ad media was skippable or not. |
| `mediaQuartile` | ``enum (`https://developers.google.com/data-manager/api/reference/rest/v1/adEvents/ingest#MediaQuartile`)`` Optional. The amount of the media that was played as discrete quartiles. |
| `mediaDuration` | ``string (`https://protobuf.dev/reference/protobuf/google.protobuf#duration` format)`` Optional. The duration of the ad media. A duration in seconds with up to nine fractional digits, ending with '`s`'. Example: `"3.5s"`. |
| `mediaVolumePercent` | `integer` Optional. The numerical percent (0-100) of the volume of the media playback. |
| `playbackDuration` | ``string (`https://protobuf.dev/reference/protobuf/google.protobuf#duration` format)`` Optional. The duration of playback of the ad media, regardless of whether it was viewable or not. A duration in seconds with up to nine fractional digits, ending with '`s`'. Example: `"3.5s"`. |

## ViewType

The type of the event.

| Enums ||
|---|---|
| `VIEW_TYPE_UNSPECIFIED` | Unspecified view type. |
| `VIEW_TYPE_MRC_VIEWED` | MRC viewed. |
| `VIEW_TYPE_MRC_RENDERED` | MRC rendered. |

## MediaQuartile

The amount of the media that was played as discrete quartiles.

| Enums ||
|---|---|
| `MEDIA_QUARTILE_UNSPECIFIED` | Unspecified media quartile. |
| `MEDIA_QUARTILE_START` | Start. |
| `MEDIA_QUARTILE_FIRST_QUARTILE` | First quartile. |
| `MEDIA_QUARTILE_MIDPOINT` | Midpoint. |
| `MEDIA_QUARTILE_THIRD_QUARTILE` | Third quartile. |
| `MEDIA_QUARTILE_COMPLETE` | Complete. |
