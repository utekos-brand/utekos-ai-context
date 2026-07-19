# Destination

- [JSON representation](https://developers.google.com/data-manager/api/reference/rest/v1/Destination#SCHEMA_REPRESENTATION)

The Google product you're sending data to. For example, a Google Ads account.

| JSON representation |
|---|
| ``` { "reference": string, "loginAccount": { object (`https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.partnerLinks#ProductAccount`) }, "linkedAccount": { object (`https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.partnerLinks#ProductAccount`) }, "operatingAccount": { object (`https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.partnerLinks#ProductAccount`) }, "productDestinationId": string } ``` |

| Fields ||
|---|---|
| `reference` | `string` Optional. ID for this `Destination` resource, unique within the request. Use to reference this `Destination` in the `IngestEventsRequest` and `IngestAudienceMembersRequest`. |
| `loginAccount` | ``object (`https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.partnerLinks#ProductAccount`)`` Optional. The account used to make this API call. To add or remove data from the `https://developers.google.com/data-manager/api/reference/rest/v1/Destination#FIELDS.operating_account`, this `loginAccount` must have write access to the `operatingAccount`. For example, a manager account of the `operatingAccount`, or an account with an established link to the `operatingAccount`. |
| `linkedAccount` | ``object (`https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.partnerLinks#ProductAccount`)`` Optional. An account that the calling user's `https://developers.google.com/data-manager/api/reference/rest/v1/Destination#FIELDS.login_account` has access to, through an established account link. For example, a data partner's `loginAccount` might have access to a client's `linkedAccount`. The partner might use this field to send data from the `linkedAccount` to another `https://developers.google.com/data-manager/api/reference/rest/v1/Destination#FIELDS.operating_account`. |
| `operatingAccount` | ``object (`https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.partnerLinks#ProductAccount`)`` Required. The account to send the data to or remove the data from. |
| `productDestinationId` | `string` Required. The object within the product account to ingest into. For example, a Google Ads audience ID, a Display \& Video 360 audience ID or a Google Ads conversion action ID. |
