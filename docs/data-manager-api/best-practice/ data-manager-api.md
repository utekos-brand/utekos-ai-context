# Best Practices for Using the Data Manager API

Keep the following best practices in mind when using the Data Manager API.

## Send All User Identifiers

When sending audience members or events using [`UserData`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#userdata), include as many `user_identifiers` as possible. This includes sending multiple identifiers of the same type.

For example, if you have multiple email addresses for a user, include a separate [`UserIdentifier`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#useridentifier) for each email address. Likewise, if you have identifiers of different types—such as email addresses, phone numbers, and physical addresses—add a separate `UserIdentifier` for each one, up to the [maximum identifier count](https://developers.google.com/data-manager/api/devguides/limits#request_limits).

## Optimize Requests

To minimize the risk of exceeding daily request limits, batch as many items as possible into each request, up to the [per-request limits](https://developers.google.com/data-manager/api/devguides/limits#request_limits).

For example, if you need to add 10,000 audience members, include all of them in the `audience_members` list within a single [`IngestAudienceMembersRequest`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#ingestaudiencemembersrequest). Sending one batched request is significantly more efficient than sending 10,000 individual requests.

## Send Concurrent Requests

To reduce total ingestion time, send requests concurrently to the [`IngestionService`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#ingestionservice). It is recommended to send up to 10 concurrent requests to avoid exceeding the [requests-per-minute limit](https://developers.google.com/data-manager/api/devguides/limits#project_limits).

Concurrent requests can be sent even if they target the same `destinations`.

## Check Diagnostics

> **Important:** Always review [diagnostics](https://developers.google.com/data-manager/api/devguides/diagnostics) for each ingestion request to identify any errors or warnings related to audience or event processing.

Capture the `request_id` from each [`IngestAudienceMembersResponse`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#ingestaudiencemembersresponse) or [`IngestEventsResponse`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#ingesteventsresponse). Use these IDs to retrieve and review diagnostics.
