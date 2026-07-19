# Data Manager API

A unified ingestion API for data partners, agencies and advertisers to connect first-party data across Google advertising products.

- [REST Resource: v1.accountTypes.accounts.insights](https://developers.google.com/data-manager/api/reference/rest#v1.accountTypes.accounts.insights)
- [REST Resource: v1.accountTypes.accounts.partnerLinks](https://developers.google.com/data-manager/api/reference/rest#v1.accountTypes.accounts.partnerLinks)
- [REST Resource: v1.accountTypes.accounts.userListDirectLicenses](https://developers.google.com/data-manager/api/reference/rest#v1.accountTypes.accounts.userListDirectLicenses)
- [REST Resource: v1.accountTypes.accounts.userListGlobalLicenses](https://developers.google.com/data-manager/api/reference/rest#v1.accountTypes.accounts.userListGlobalLicenses)
- [REST Resource:
  v1.accountTypes.accounts.userListGlobalLicenses.userListGlobalLicenseCustomerInfos](https://developers.google.com/data-manager/api/reference/rest#v1.accountTypes.accounts.userListGlobalLicenses.userListGlobalLicenseCustomerInfos)
- [REST Resource: v1.accountTypes.accounts.userLists](https://developers.google.com/data-manager/api/reference/rest#v1.accountTypes.accounts.userLists)
- [REST Resource: v1.adEvents](https://developers.google.com/data-manager/api/reference/rest#v1.adEvents)
- [REST Resource: v1.audienceMembers](https://developers.google.com/data-manager/api/reference/rest#v1.audienceMembers)
- [REST Resource: v1.events](https://developers.google.com/data-manager/api/reference/rest#v1.events)
- [REST Resource: v1.requestStatus](https://developers.google.com/data-manager/api/reference/rest#v1.requestStatus)

## Service: datamanager.googleapis.com

To call this service, we recommend that you use the Google-provided [client libraries](https://cloud.google.com/apis/docs/client-libraries-explained). If your application needs to use your own libraries to call this service, use the following information when you make the API requests.

### Discovery document

A [Discovery Document](https://developers.google.com/discovery/v1/reference/apis) is a machine-readable specification for describing and consuming REST APIs. It is used to build client libraries, IDE plugins, and other tools that interact with Google APIs. One service may provide multiple discovery documents. This service provides the following discovery document:

- <https://datamanager.googleapis.com/$discovery/rest?version=v1>

### Service endpoint

A [service endpoint](https://cloud.google.com/apis/design/glossary#api_service_endpoint) is a base URL that specifies the network address of an API service. One service might have multiple service endpoints. This service has the following service endpoint and all URIs below are relative to this service endpoint:

- `https://datamanager.googleapis.com`

## REST Resource: [v1.accountTypes.accounts.insights](https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.insights)

| Methods ||
|---|---|
| `https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.insights/retrieve` | `POST /v1/{parent=accountTypes/*/accounts/*}/insights:retrieve` Retrieves marketing data insights for a given user list. |

## REST Resource: [v1.accountTypes.accounts.partnerLinks](https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.partnerLinks)

| Methods ||
|---|---|
| `https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.partnerLinks/create` | `POST /v1/{parent=accountTypes/*/accounts/*}/partnerLinks` Creates a partner link for the given account. |
| `https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.partnerLinks/delete` | `DELETE /v1/{name=accountTypes/*/accounts/*/partnerLinks/*}` Deletes a partner link for the given account. |
| `https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.partnerLinks/search` | `GET /v1/{parent=accountTypes/*/accounts/*}/partnerLinks:search` Searches for all partner links to and from a given account. |

## REST Resource: [v1.accountTypes.accounts.userListDirectLicenses](https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.userListDirectLicenses)

| Methods ||
|---|---|
| `https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.userListDirectLicenses/create` | `POST /v1/{parent=accountTypes/*/accounts/*}/userListDirectLicenses` Creates a user list direct license. |
| `https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.userListDirectLicenses/get` | `GET /v1/{name=accountTypes/*/accounts/*/userListDirectLicenses/*}` Retrieves a user list direct license. |
| `https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.userListDirectLicenses/list` | `GET /v1/{parent=accountTypes/*/accounts/*}/userListDirectLicenses` Lists all user list direct licenses owned by the parent account. |
| `https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.userListDirectLicenses/patch` | `PATCH /v1/{userListDirectLicense.name=accountTypes/*/accounts/*/userListDirectLicenses/*}` Updates a user list direct license. |

## REST Resource: [v1.accountTypes.accounts.userListGlobalLicenses](https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.userListGlobalLicenses)

| Methods ||
|---|---|
| `https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.userListGlobalLicenses/create` | `POST /v1/{parent=accountTypes/*/accounts/*}/userListGlobalLicenses` Creates a user list global license. |
| `https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.userListGlobalLicenses/get` | `GET /v1/{name=accountTypes/*/accounts/*/userListGlobalLicenses/*}` Retrieves a user list global license. |
| `https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.userListGlobalLicenses/list` | `GET /v1/{parent=accountTypes/*/accounts/*}/userListGlobalLicenses` Lists all user list global licenses owned by the parent account. |
| `https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.userListGlobalLicenses/patch` | `PATCH /v1/{userListGlobalLicense.name=accountTypes/*/accounts/*/userListGlobalLicenses/*}` Updates a user list global license. |

## REST Resource: [v1.accountTypes.accounts.userListGlobalLicenses.userListGlobalLicenseCustomerInfos](https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.userListGlobalLicenses.userListGlobalLicenseCustomerInfos)

| Methods ||
|---|---|
| `https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.userListGlobalLicenses.userListGlobalLicenseCustomerInfos/list` | `GET /v1/{parent=accountTypes/*/accounts/*/userListGlobalLicenses/*}/userListGlobalLicenseCustomerInfos` Lists all customer info for a user list global license. |

## REST Resource: [v1.accountTypes.accounts.userLists](https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.userLists)

| Methods ||
|---|---|
| `https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.userLists/create` | `POST /v1/{parent=accountTypes/*/accounts/*}/userLists` Creates a UserList. |
| `https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.userLists/delete` | `DELETE /v1/{name=accountTypes/*/accounts/*/userLists/*}` Deletes a UserList. |
| `https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.userLists/get` | `GET /v1/{name=accountTypes/*/accounts/*/userLists/*}` Gets a UserList. |
| `https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.userLists/list` | `GET /v1/{parent=accountTypes/*/accounts/*}/userLists` Lists UserLists. |
| `https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.userLists/patch` | `PATCH /v1/{userList.name=accountTypes/*/accounts/*/userLists/*}` Updates a UserList. |

## REST Resource: [v1.adEvents](https://developers.google.com/data-manager/api/reference/rest/v1/adEvents)

| Methods ||
|---|---|
| `https://developers.google.com/data-manager/api/reference/rest/v1/adEvents/ingest` | `POST /v1/adEvents:ingest` Uploads a list of `https://developers.google.com/data-manager/api/reference/rest/v1/adEvents/ingest#AdEvent` resources to Google Analytics. |

## REST Resource: [v1.audienceMembers](https://developers.google.com/data-manager/api/reference/rest/v1/audienceMembers)

| Methods ||
|---|---|
| `https://developers.google.com/data-manager/api/reference/rest/v1/audienceMembers/ingest` | `POST /v1/audienceMembers:ingest` Uploads a list of `https://developers.google.com/data-manager/api/reference/rest/v1/AudienceMember` resources to the provided `https://developers.google.com/data-manager/api/reference/rest/v1/Destination`. |
| `https://developers.google.com/data-manager/api/reference/rest/v1/audienceMembers/remove` | `POST /v1/audienceMembers:remove` Removes a list of `https://developers.google.com/data-manager/api/reference/rest/v1/AudienceMember` resources from the provided `https://developers.google.com/data-manager/api/reference/rest/v1/Destination`. |

## REST Resource: [v1.events](https://developers.google.com/data-manager/api/reference/rest/v1/events)

| Methods ||
|---|---|
| `https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest` | `POST /v1/events:ingest` Uploads a list of `https://developers.google.com/data-manager/api/reference/rest/v1/events/ingest#Event` resources from the provided `https://developers.google.com/data-manager/api/reference/rest/v1/Destination`. |

## REST Resource: [v1.requestStatus](https://developers.google.com/data-manager/api/reference/rest/v1/requestStatus)

| Methods ||
|---|---|
| `https://developers.google.com/data-manager/api/reference/rest/v1/requestStatus/retrieve` | `GET /v1/requestStatus:retrieve` Gets the status of a request given request id. |
