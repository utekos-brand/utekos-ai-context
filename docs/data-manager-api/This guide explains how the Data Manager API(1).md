This guide explains how the Data Manager API handles and communicates errors.\
Understanding the structure and meaning of API errors is crucial for building\
robust applications that can gracefully handle issues, from invalid input to\
temporary service unavailability.

The Data Manager API follows the standard Google API error model, which is based\
on [gRPC Status codes](https://google.aip.dev/193). Each API response that results in an\
error includes a `Status` object with:

- A numeric error code.
- An error message.
- Optional, additional error details.

## Canonical error codes

The Data Manager API uses a set of [canonical error codes](https://developers.google.com/data-manager/api/reference/rpc/google.rpc#code) defined by\
gRPC and HTTP. These codes provide a high-level indication of the error type.\
You should always check this code first to understand the fundamental nature of\
the problem.

For more details on these codes, see [API Design Guide - Error](https://google.aip.dev/193)\
[codes](https://google.aip.dev/193).

## Fast-fail model

The Data Manager API uses a fast-fail model. If any record in a request fails basic\
validation, the entire request fails, and the API does not process any of the\
data in that request.

> [!IMPORTANT]\
> **Key Point:** The fast-fail model performs a limited set of validation checks to identify basic issues that would *entirely prevent* further processing of data. The Data Manager API performs more complex validations asynchronously during processing, and reports any warnings or errors in [diagnostics](https://developers.google.com/data-manager/api/devguides/diagnostics).

The fast-fail model differs from the partial failure model in some other Google\
APIs, such as the\
[Google Ads API](https://developers.google.com/google-ads/api/docs/best-practices/partial-failures) and the\
[Campaign Manager 360 API](https://developers.google.com/doubleclick-advertisers/guides/conversions_upload#generate_an_insert_request).\
In the partial failure model, a request\
succeeds even if some records have errors, and the response contains error\
details for the failed records.

Although partial failure can be convenient, it carries significant risks because\
the partial failure model doesn't *proactively* alert you to errors---you\
must explicitly check for errors in each response. This can mask important\
issues because a request succeeds even if the API rejects many or even all of\
the records in the request. If a significant portion of the records in a request\
have errors but you don't inspect the response, you may be entirely unaware of\
widespread issues with your data, and only discover those issues days or weeks\
later when cumulative results don't align with your expectations.

The fast-fail model avoids these pitfalls by alerting you to issues with your\
data or integration immediately so you can take appropriate action.

## Handle errors

Follow these steps when a request fails:

1. Check the [error code](https://developers.google.com/data-manager/api/devguides/concepts/understand-errors#canonical-error-codes) to find the type of error.

   - If you use gRPC, the error code is in the `code` field of the [`Status`](https://developers.google.com/data-manager/api/reference/rpc/google.rpc#status). If you [use a client library](https://developers.google.com/data-manager/api/devguides/concepts/understand-errors#access-error-details), it may throw a specific type of exception that corresponds to the error code. For example, the client library for Java throws a `com.google.api.gax.rpc.InvalidArgumentException` if the error code is `INVALID_ARGUMENT`.

   - If you use REST, the error code is in the error response at `error.status`, and the corresponding HTTP status is at `error.code`.



   > [!IMPORTANT]\
   > **Important:** The Data Manager API uses a [fast-fail model](https://developers.google.com/data-manager/api/devguides/concepts/understand-errors#fast-fail). If a request fails, none of the data is processed. Fix the error and resend the **entire** request.

2. Check for the [standard detail payload](https://developers.google.com/data-manager/api/devguides/concepts/understand-errors#standard-detail-payloads) for the\
   error code. The standard detail payloads are a [set of messages for errors](https://google.aip.dev/193#statusdetails)\
   [from Google APIs](https://google.aip.dev/193#statusdetails). They give you error details in a\
   structured and consistent way. Each error from the Data Manager API may have\
   multiple standard detail payload messages. The Data Manager API client libraries\
   [have helper methods](https://developers.google.com/data-manager/api/devguides/concepts/understand-errors#access-error-details) to get the standard detail\
   payloads from an error.

   No matter the error code, we recommend you check for and log the\
   [`ErrorInfo`](https://developers.google.com/data-manager/api/devguides/concepts/understand-errors#error-info), [`RequestInfo`](https://developers.google.com/data-manager/api/devguides/concepts/understand-errors#request-id), [`Help`](https://developers.google.com/data-manager/api/devguides/concepts/understand-errors#help),\
   and [`LocalizedMessage`](https://developers.google.com/data-manager/api/devguides/concepts/understand-errors#help) payloads.

   - `ErrorInfo` has information that might not be in other payloads.
   - `RequestInfo` has the request ID, which is helpful if you need to [contact support](https://developers.google.com/data-manager/api/support/contact).
   - `Help` and `LocalizedMessage` contain links and other details to help you address the error.

   In addition, the `BadRequest` payload is useful for `INVALID_ARGUMENT` errors since it provides information about which fields caused the error.

## Standard detail payloads

The most common standard detail payloads for the Data Manager API are:

- [`BadRequest`](https://developers.google.com/data-manager/api/devguides/concepts/understand-errors#bad-request)
- [`RequestInfo`](https://developers.google.com/data-manager/api/devguides/concepts/understand-errors#request-id)
- [`ErrorInfo`](https://developers.google.com/data-manager/api/devguides/concepts/understand-errors#error-info)
- [`Help`](https://developers.google.com/data-manager/api/devguides/concepts/understand-errors#help)[ and ](https://developers.google.com/data-manager/api/devguides/concepts/understand-errors#help)[`LocalizedMessage`](https://developers.google.com/data-manager/api/devguides/concepts/understand-errors#help)

### `BadRequest`

Check for the [`BadRequest`](https://developers.google.com/data-manager/api/reference/rpc/google.rpc#badrequest) payload when a request fails with\
`INVALID_ARGUMENT` (HTTP status code `400`).

A `BadRequest` message shows that the request had fields with bad values, or was\
missing a value for a required field. Check the `field_violations` list in the\
`BadRequest` to find which fields have errors. Each `field_violations` entry\
has information to help you fix the error:

`field`

:   The location of the field in the request, using a camel case path syntax.

```
If a path points to an item in a list (a `repeated` field), its index is
shown in square brackets (`[...]`) after the list's name.

For example, `destinations[0].operating_account.account_id` is the
`account_id` in the `operating_account` of the first item in the
`destinations` list.
```

`description`

:   An explanation of why the value caused an error.

`reason`

:   The [`ErrorReason`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#errorreason) enum, such as `INVALID_HEX_ENCODING` or\
`INVALID_CURRENCY_CODE`.

#### Examples of `BadRequest`

Here's a sample response for an `INVALID_ARGUMENT` error with a `BadRequest`\
message. The `field_violations` show the error is an `accountId` that is not a\
number. The `field` value `destinations[0].login_account.account_id` shows the\
`accountId` with a field violation is in the `login_account` of the first item\
in the `destinations` list.

```
{
  "error": {
    "code": 400,
    "message": "There was a problem with the request.",
    "status": "INVALID_ARGUMENT",
    "details": [
      {
        "@type": "type.googleapis.com/google.rpc.ErrorInfo",
        "reason": "INVALID_ARGUMENT",
        "domain": "datamanager.googleapis.com",
        "metadata": {
          "requestId": "t-a8896317-069f-4198-afed-182a3872a660"
        }
      },
      {
        "@type": "type.googleapis.com/google.rpc.RequestInfo",
        "requestId": "t-a8896317-069f-4198-afed-182a3872a660"
      },
      {
        "@type": "type.googleapis.com/google.rpc.BadRequest",
        "fieldViolations": [
          {
            "field": "destinations[0].login_account.account_id",
            "description": "String is not a valid number.",
            "reason": "INVALID_NUMBER_FORMAT"
          }
        ]
      }
    ]
  }
}
```

Here's another sample response from an `INVALID_ARGUMENT` error with a\
`BadRequest` message. In this case, the `field_violations` list shows two\
errors:

1. The first `event` has a value that's not hex-encoded on the event's second\
   [user identifier](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#useridentifier).

2. The second `event` has a value that's not hex-encoded on the event's third\
   [user identifier](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#useridentifier).

   {\
   "error": {\
   "code": 400,\
   "message": "There was a problem with the request.",\
   "status": "INVALID\_ARGUMENT",\
   "details": [\
   {\
   "@type": "type.googleapis.com/google.rpc.ErrorInfo",\
   "reason": "INVALID\_ARGUMENT",\
   "domain": "datamanager.googleapis.com",\
   "metadata": {\
   "requestId": "t-6bc8fb83-d648-4942-9c49-2604276638d8"\
   }\
   },\
   {\
   "@type": "type.googleapis.com/google.rpc.RequestInfo",\
   "requestId": "t-6bc8fb83-d648-4942-9c49-2604276638d8"\
   },\
   {\
   "@type": "type.googleapis.com/google.rpc.BadRequest",\
   "fieldViolations": [\
   {\
   "field": "events.events[0].user\_data.user\_identifiers[1]",\
   "description": "The HEX encoded value is malformed.",\
   "reason": "INVALID\_HEX\_ENCODING"\
   },\
   {\
   "field": "events.events[1].user\_data.user\_identifiers[2]",\
   "description": "The HEX encoded value is malformed.",\
   "reason": "INVALID\_HEX\_ENCODING"\
   }\
   ]\
   }\
   ]\
   }\
   }

### `RequestInfo`

Check for the [`RequestInfo`](https://developers.google.com/data-manager/api/reference/rpc/google.rpc#requestinfo) payload whenever a request fails. A `RequestInfo`\
contains the `request_id` that uniquely identifies your API request.

```
{
  "@type": "type.googleapis.com/google.rpc.RequestInfo",
  "requestId": "t-4490c640-dc5d-4c28-91c1-04a1cae0f49f"
}
```

When logging errors or [contacting support](https://developers.google.com/data-manager/api/support/contact), make sure to include\
the request ID to help with diagnosing issues.

### `ErrorInfo`

Check for the [`ErrorInfo`](https://developers.google.com/data-manager/api/reference/rpc/google.rpc#errorinfo) message to retrieve additional information that\
may not be captured in the other standard detail payloads. The `ErrorInfo`\
payload contains a `metadata` map with information about the error.

For example, here's the `ErrorInfo` for a `PERMISSION_DENIED` failure caused by\
using credentials for a Google Cloud project where the Data Manager API isn't\
enabled. The `ErrorInfo` provides additional information about the error, such\
as:

- The project associated with the request, under `metadata.consumer`.
- The name of the service, under `metadata.serviceTitle`.
- The URL where the service can be enabled, under `metadata.activationUrl`.

  {\
  "error": {\
  "code": 403,\
  "message": "Data Manager API has not been used in project PROJECT\_NUMBER before or it is disabled. Enable it by visiting [https://console.cloud.google.com/apis/api/datamanager.googleapis.com/overview?project=PROJECT\_NUMBER](https://console.cloud.google.com/apis/api/datamanager.googleapis.com/overview?project=PROJECT_NUMBER) then retry. If you enabled this API recently, wait a few minutes for the action to propagate to our systems and retry.",\
  "status": "PERMISSION\_DENIED",\
  "details": [\
  {\
  "@type": "type.googleapis.com/google.rpc.ErrorInfo",\
  "reason": "SERVICE\_DISABLED",\
  "domain": "googleapis.com",\
  "metadata": {\
  "consumer": "projects/PROJECT\_NUMBER",\
  "service": "datamanager.googleapis.com",\
  "containerInfo": "PROJECT\_NUMBER",\
  "serviceTitle": "Data Manager API",\
  "activationUrl": "[https://console.cloud.google.com/apis/api/datamanager.googleapis.com/overview?project=PROJECT\_NUMBER](https://console.cloud.google.com/apis/api/datamanager.googleapis.com/overview?project=PROJECT_NUMBER)"\
  }\
  },\
  ...\
  ]\
  }\
  }

### `Help` and `LocalizedMessage`

Check for the [`Help`](https://developers.google.com/data-manager/api/reference/rpc/google.rpc#help) and [`LocalizedMessage`](https://developers.google.com/data-manager/api/reference/rpc/google.rpc#localizedmessage) payloads to get links to\
documentation and localized error messages that help you understand and fix the\
error.

For example, here's the `Help` and `LocalizedMessage` for a `PERMISSION_DENIED`\
failure caused by using credentials for a Google Cloud project where the\
Data Manager API isn't enabled. The `Help` payload shows the URL where the service\
can be enabled, and the `LocalizedMessage` has a description of the error.

```
{
  "error": {
    "code": 403,
    "message": "Data Manager API has not been used in project PROJECT_NUMBER before or it is disabled. Enable it by visiting https://console.cloud.google.com/apis/api/datamanager.googleapis.com/overview?project=PROJECT_NUMBER then retry. If you enabled this API recently, wait a few minutes for the action to propagate to our systems and retry.",
    "status": "PERMISSION_DENIED",
    "details": [
      {
        "@type": "type.googleapis.com/google.rpc.LocalizedMessage",
        "locale": "en-US",
        "message": "Data Manager API has not been used in project PROJECT_NUMBER before or it is disabled. Enable it by visiting https://console.cloud.google.com/apis/api/datamanager.googleapis.com/overview?project=PROJECT_NUMBER then retry. If you enabled this API recently, wait a few minutes for the action to propagate to our systems and retry."
      },
      {
        "@type": "type.googleapis.com/google.rpc.Help",
        "links": [
          {
            "description": "Google API Console API activation",
            "url": "https://console.cloud.google.com/apis/api/datamanager.googleapis.com/overview?project=PROJECT_NUMBER"
          }
        ]
      },
      ...
    ]
  }
}
```

## Access error details

If you are using one of the [client libraries](https://developers.google.com/data-manager/api/devguides/quickstart/set-up-access), use the\
helper methods to get the standard detail payloads.

### .NET

```
try {
    // Send API request
}
catch (Grpc.Core.RpcException rpcException)
{
    Console.WriteLine($"Exception encountered: {rpcException.Message}");
    var statusDetails =
        Google.Api.Gax.Grpc.RpcExceptionExtensions.GetAllStatusDetails(
            rpcException
        );
    foreach (var detail in statusDetails)
    {
        if (detail is Google.Rpc.BadRequest)
        {
            Google.Rpc.BadRequest badRequest = (Google.Rpc.BadRequest)detail;
            foreach (
                BadRequest.Types.FieldViolation? fieldViolation in badRequest.FieldViolations
            )
            {
                // Access attributes such as fieldViolation!.Reason and fieldViolation!.Field
            }
        }
        else if (detail is Google.Rpc.RequestInfo)
        {
            Google.Rpc.RequestInfo requestInfo = (Google.Rpc.RequestInfo)detail;
            string requestId = requestInfo.RequestId;
            // Log the requestId...
        }
        else if (detail is Google.Rpc.ErrorInfo)
        {
            Google.Rpc.ErrorInfo errorInfo = (Google.Rpc.ErrorInfo)detail;
            // Log the errorInfo.Reason and errorInfo.Metadata...

            // Log the details in the 'Metadata' map...
            foreach (
                KeyValuePair<String, String> metadataEntry in errorInfo.Metadata
            )
            {
                // Log the metadataEntry.Key and metadataEntry.Value...
            }
        }
        else
        {
            // ...
        }
    }
}
```

### Java

```
try {
  // Send API request
} catch (com.google.api.gax.rpc.InvalidArgumentException invalidArgumentException) {
  // Gets the standard BadRequest payload from the exception.
  BadRequest badRequest = invalidArgumentException.getErrorDetails().getBadRequest();
  for (int i = 0; i < badRequest.getFieldViolationsCount(); i++) {
    FieldViolation fieldViolation = badRequest.getFieldViolations(i);
    // Access attributes such as fieldViolation.getField() and fieldViolation.getReason()
  }

  // Gets the standard RequestInfo payload from the exception.
  RequestInfo requestInfo = invalidArgumentException.getErrorDetails().getRequestInfo();
  if (requestInfo != null) {
    String requestId = requestInfo.getRequestId();
    // Log the requestId...
  }
} catch (com.google.api.gax.rpc.ApiException apiException) {
  // Fallback exception handler for other types of ApiException.

  // Gets the standard ErrorInfo payload from the exception.
  ErrorInfo errorInfo = apiException.getErrorDetails().getErrorInfo();
  // Log the 'reason' and 'domain'...

  // Log the details in the 'metadata' map...
  for (Entry<String, String> metadataEntry : errorInfo.getMetadataMap().entrySet()) {
    // Log the metadataEntry key and value...
  }

  // Gets the standard RequestInfo payload from the exception.
  RequestInfo requestInfo = invalidArgumentException.getErrorDetails().getRequestInfo();
  if (requestInfo != null) {
    String requestId = requestInfo.getRequestId();
    // Log the requestId...
  }
  ...
}
```

## Best practices for error handling

To build resilient applications, implement the following best practices.

Inspect error details\
:   Always look for one of the [standard detail](https://developers.google.com/data-manager/api/devguides/concepts/understand-errors#standard-detail-payloads)\
[payloads](https://developers.google.com/data-manager/api/devguides/concepts/understand-errors#standard-detail-payloads) such as `BadRequest`. Each standard\
detail payload contains information to help you understand the cause of the\
error.

Differentiate client from server errors

:   Determine if the error is caused by an issue with your implementation (the\
client) or an issue with the API (the server).

```
- Client errors: Codes like `INVALID_ARGUMENT`, `NOT_FOUND`, `PERMISSION_DENIED`, `FAILED_PRECONDITION`, `UNAUTHENTICATED`. These require changes to the request or your application's state/credentials. Don't retry the request without addressing the issue.
- Server errors: Codes like `UNAVAILABLE`, `INTERNAL`, `DEADLINE_EXCEEDED`, `UNKNOWN`. These suggest a temporary issue with the API service.
```

Implement a retry strategy

:   Determine if the error can be retried, and use a retry strategy.

```
- Retry *only* for transient server errors such as `UNAVAILABLE`, `DEADLINE_EXCEEDED`, `INTERNAL`, `UNKNOWN`, and `ABORTED`.
- Use an [exponential backoff algorithm](https://en.wikipedia.org/wiki/Exponential_backoff) to wait for increasing periods between retries. This helps avoid overwhelming an already stressed service. For example, wait 1s, then 2s, then 4s, continuing up to a maximum number of retries or total wait time.
- Add a small random amount of "jitter" to the backoff delays to prevent the "thundering herd" problem where many clients retry simultaneously.
```

Log thoroughly

:   Log the full error response, including all standard detail payloads,\
especially the [request ID](https://developers.google.com/data-manager/api/devguides/concepts/understand-errors#request-id). This information is essential for\
debugging and reporting issues to Google support if needed.

Provide user feedback

:   Based on the codes and messages in the\
[standard detail payloads](https://developers.google.com/data-manager/api/devguides/concepts/understand-errors#standard-detail-payloads), provide clear and\
helpful feedback to your application's users. For example, instead of just "An\
error occurred," you can say "Transaction ID was missing" or "The account ID\
of the destination was not found."

By following these guidelines, you can effectively diagnose and handle errors\
returned by the Data Manager API, leading to more stable and user-friendly\
applications.
