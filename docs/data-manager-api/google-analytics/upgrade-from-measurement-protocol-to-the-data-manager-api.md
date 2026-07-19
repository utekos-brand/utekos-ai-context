# Upgrade from Measurement Protocol to the Data Manager API

Upgrade your server-side event collection from the [Measurement Protocol](https://developers.google.com/analytics/devguides/collection/protocol/ga4) to
the Data Manager API to gain access to several improvements and features.

Here's a comparison between using the Data Manager API and Measurement Protocol to send events to
Google Analytics.

|   | Data Manager API | Measurement Protocol |
|---|---|---|
| Data model | Unified data model across all Google advertising products. | Data model is specific to Google Analytics. |
| Encryption | Supports [encryption](https://developers.google.com/data-manager/api/devguides/concepts/encryption). | Not supported. |
| Destinations | Supports sending events to [multiple destinations in a single request](https://developers.google.com/data-manager/api/devguides/events/send-events#multiple-destinations). | Supports sending events to only a single data stream (measurement ID or Firebase App ID) per request. |
| API secret | Not required. | Required. |
| Error model | Uses a [fast-fail model](https://developers.google.com/data-manager/api/devguides/concepts/understand-errors#fast-fail). | Only reports errors for test requests [sent to the validation server](https://developers.google.com/analytics/devguides/collection/protocol/ga4/validating-events). |

---

Choose your platform:
<button value="firebase" default="">Firebase</button> <button value="gtag">gtag.js</button>

The Google Analytics Measurement Protocol does not return
`HTTP` error codes, even if an event is malformed or missing required
parameters. To verify your events are valid, you should test them against the
Measurement Protocol validation server before deploying them to production.
After you have validated that your events are structured properly, you should
[verify your implementation](https://developers.google.com/analytics/devguides/collection/protocol/ga4/verify-implementation) to make sure you're using the correct keys.

> [!CAUTION]
> **Caution:** The validation server does *not* validate the `api_secret` or `firebase_app_id`. Carefully review those values to make sure they are correct.

You can either call the validation server directly, or use the [Google Analytics
Event Builder](https://ga-dev-tools.web.app/ga4/event-builder/). The Google Analytics Event Builder lets you interactively
construct events, and uses the Measurement Protocol validation server to
validate them.

This guide describes how to send events to the Measurement Protocol for Google
Analytics validation server and interpret the response.

> [!IMPORTANT]
> **Important:** Events sent to the validation server don't show up in reports.

## Send events for validation

The only difference in the request for events sent to the Measurement Protocol
and the Measurement Protocol validation server is the URL.

| Server | URL |
|---|---|
| Measurement Protocol | `/mp/collect` |
| Measurement Protocol validation server | `/debug/mp/collect` |

All other [request fields](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference) are the same.

We recommend the following approach to validation:

- Use strict validation checks during development using either of the following options:
  - Validate requests with the [Event Builder](https://ga-dev-tools.google/ga4/event-builder/).
  - Send requests to the validation server with `validation_behavior` set to `ENFORCE_RECOMMENDATIONS`.
- In production, send requests without `validation_behavior` set to minimize the data rejected by the Measurement Protocol.

### Example of an invalid event

The following code shows an invalid event being sent to the Measurement Protocol
validation server:

    const firebaseAppId = "FIREBASE_APP_ID";
    const apiSecret = "API_SECRET";

    fetch(`https://www.google-analytics.com/debug/mp/collect?firebase_app_id=${firebaseAppId}&api_secret=${apiSecret}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        app_instance_id: "APP_INSTANCE_ID",
        validation_behavior: "ENFORCE_RECOMMENDATIONS",
        events: [{
          // Event names must start with an alphabetic character.
          name: "_badEventName",
          params: {},
        }]
      })
    });

### Example of a valid event

The following code shows a valid event being sent to the Measurement Protocol
validation server. This request would yield an empty `validationMessages` array
in the response, as shown in the [Validation response](https://developers.google.com/analytics/devguides/collection/protocol/ga4/validating-events#validation-response)
section.


    const firebaseAppId = "FIREBASE_APP_ID";
    const apiSecret = "API_SECRET";

    fetch(`https://www.google-analytics.com/debug/mp/collect?firebase_app_id=${firebaseAppId}&api_secret=${apiSecret}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        app_instance_id: "APP_INSTANCE_ID",
        validation_behavior: "ENFORCE_RECOMMENDATIONS",
        events: [{
          name: "level_up",
          params: {
            level: 2,
            character: "MyHero"
          },
        }]
      })
    });


> [!TIP]
> **Tip:** If you want your data to be collected in the EU, change the URL passed to the `fetch` method to begin with `https://region1.google-analytics.com` instead of `https://www.google-analytics.com`.

## Validation response

Here's the validation server's response to the invalid event example.

```json
    {
      "validationMessages": [
        {
          "fieldPath": "events",
          "description": "Event at index: [0] has invalid name [_badEventName]. Names must start with an alphabetic character.",
          "validationCode": "NAME_INVALID"
        }
      ]
    }

Here's the validation server's response to a request with no validation issues:

    {
      "validationMessages": []
    }
```

### Response

| Key | Type | Description |
|---|---|---|
| `validationMessages` | Array\<[ValidationMessage](https://developers.google.com/analytics/devguides/collection/protocol/ga4/validating-events#validation_message)\> | An array of validation messages. |

### ValidationMessage

| Key | Type | Description |
|---|---|---|
| `fieldPath` | string | The path to the field that was invalid. |
| `description` | string | A description of the error. |
| `validationCode` | [ValidationCode](https://developers.google.com/analytics/devguides/collection/protocol/ga4/validating-events#validation_code) | A validation code that corresponds to the error. |

### ValidationCode

| Value | Description |
|---|---|
| `VALUE_INVALID` | The value provided for a `fieldPath` was invalid. See [limitations](https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events#limitations). |
| `VALUE_REQUIRED` | A required value for a `fieldPath` was not provided. |
| `NAME_INVALID` | The name provided was invalid. See [limitations](https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events#limitations). |
| `NAME_RESERVED` | The name provided was one of the reserved names. See [reserved names](https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference#reserved_names). |
| `VALUE_OUT_OF_BOUNDS` | The value provided was too large. See [limitations](https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events#limitations). |
| `EXCEEDED_MAX_ENTITIES` | There were too many parameters in the request. See [limitations](https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events#limitations). |
| `NAME_DUPLICATED` | The same name was provided more than once in the request. |



---

## Fast-fail model

The Data Manager API uses a fast-fail model. If any record in a request fails basic validation, the entire request fails, and the API does not process any of the data in that request.
**Key Point:** The fast-fail model performs a limited set of validation checks to identify basic issues that would _entirely prevent_ further processing of data. The Data Manager API performs more complex validations asynchronously during processing, and reports any warnings or errors in [diagnostics](https://developers.google.com/data-manager/api/devguides/diagnostics).
The fast-fail model differs from the partial failure model in some other Google APIs, such as the [Google Ads API](https://developers.google.com/google-ads/api/docs/best-practices/partial-failures) and the [Campaign Manager 360 API](https://developers.google.com/doubleclick-advertisers/guides/conversions_upload#generate_an_insert_request). In the partial failure model, a request succeeds even if some records have errors, and the response contains error details for the failed records.
Although partial failure can be convenient, it carries significant risks because the partial failure model doesn't _proactively_ alert you to errors—you must explicitly check for errors in each response. This can mask important issues because a request succeeds even if the API rejects many or even all of the records in the request. If a significant portion of the records in a request have errors but you don't inspect the response, you may be entirely unaware of widespread issues with your data, and only discover those issues days or weeks later when cumulative results don't align with your expectations.

The fast-fail model avoids these pitfalls by alerting you to issues with your data or integration immediately so you can take appropriate action.
