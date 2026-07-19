Both the [`Destination`](https://developers.google.com/data-manager/api/reference/rest/v1/Destination) concept and request headers are used frequently when working with the Data Manager API. This guide explains how to configure destinations and headers for different scenarios.

## When to use destinations or headers

- Use a [`Destination`](https://developers.google.com/data-manager/api/reference/rest/v1/Destination) in **ingestion requests**.\
  An ingestion request uses the [`IngestionService`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#ingestionservice) to add or remove audience members or send events. The `destinations` list in an [`IngestAudienceMembersRequest`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#ingestaudiencemembersrequest) or [`IngestEventsRequest`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#ingesteventsrequest) defines:

  1. The account that receives the data (for example, a Google Ads account or a Google Analytics property).
  2. The destination entity within the account (such as a Google Ads conversion action or a Google Analytics stream).
  3. The access path for the request credentials to the receiving account.

  You can include multiple destinations in a single ingestion request.

  > [!TIP]\
  > **Tip:** Do not set request headers in an `IngestionService` request. The Data Manager API ignores headers in ingestion requests.

- Use request headers in **resource management requests** that create, update, delete, or retrieve resources.\
  Headers define the access path for the request credentials to the target account. The following resources support request headers:

  - [`Insights`](https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.insights)
  - [`PartnerLink`](https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.partnerLinks)
  - [`UserList`](https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.userLists)
  - [`UserListDirectLicense`](https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.userListDirectLicenses)
  - [`UserListGlobalLicense`](https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.userListGlobalLicenses)
  - [`UserListGlobalLicenseCustomerInfo`](https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.userListGlobalLicenses.userListGlobalLicenseCustomerInfos)

### Example workflow

| Step                       | Request type        | Destination or headers |
| -------------------------- | ------------------- | ---------------------- |
| Create an audience         | Resource management | Request headers        |
| Add members to an audience | Ingestion           | Destinations           |
| Check diagnostics          | Ingestion           | Destinations           |
| Retrieve the audience      | Resource management | Request headers        |

Use the **Ingestion** or **Resource management** tabs in this guide to view details for each request type.

---

If you are an advertiser or agency, see the [Advertiser scenarios](https://developers.google.com/data-manager/api/devguides/concepts/destinations#advertiser):

- [Google Ads](https://developers.google.com/data-manager/api/devguides/concepts/destinations#ads-advertiser)
- [Display & Video 360](https://developers.google.com/data-manager/api/devguides/concepts/destinations#dv3-advertiser)
- [Google Analytics](https://developers.google.com/data-manager/api/devguides/concepts/destinations#ga-advertiser)
- [Floodlight](https://developers.google.com/data-manager/api/devguides/concepts/destinations#floodlight-advertiser)

If you are a data partner, see the [Data partner scenarios](https://developers.google.com/data-manager/api/devguides/concepts/destinations#data-partner):

- [Google Ads](https://developers.google.com/data-manager/api/devguides/concepts/destinations#ads-data-partner)
- [Display & Video 360](https://developers.google.com/data-manager/api/devguides/concepts/destinations#dv3-data-partner)
- [Google Analytics](https://developers.google.com/data-manager/api/devguides/concepts/destinations#ga-data-partner)
- [Floodlight](https://developers.google.com/data-manager/api/devguides/concepts/destinations#floodlight-data-partner)

See [Detailed requirements](https://developers.google.com/data-manager/api/devguides/concepts/destinations#requirements) for validation rules and requirements.

---

## Advertiser scenarios

This section explains how to configure a `Destination` or request headers for common advertiser and agency scenarios.



### Google Ads

Example account structure:



**Manager account M1**

- Child accounts:
  1. Manager account M2
  2. Client account C1
- User: `cloudysanfrancisco@gmail.com`

**Manager account M2**

- Child accounts:
  1. Client account C1
  2. Client account C2
- User: `baklavainthebalkans@gmail.com`

**Client account C1**

- Parent accounts:
  1. Manager account M1
  2. Manager account M2
- User: `jeffersonloveshiking@gmail.com`

**Client account C2**

- Parent account: M2
- No listed users

---

### Direct access scenario

Use this when your credentials belong to a user in the target Google Ads account.

#### Ingestion

| Field                            | Value                                  |
| -------------------------------- | -------------------------------------- |
| `operating_account.account_id`   | Google Ads customer ID                 |
| `operating_account.account_type` | `GOOGLE_ADS`                           |
| `login_account`                  | Same as `operating_account` or omitted |
| `linked_account`                 | Not set                                |
| `product_destination_id`         | Audience or conversion action ID       |

#### Resource management

| Header           | Value                                                     |
| ---------------- | --------------------------------------------------------- |
| `login-account`  | `accountTypes/GOOGLE_ADS/accounts/GOOGLE_ADS_CUSTOMER_ID` |
| `linked-account` | Not set                                                   |

Example:

```
{
  "destinations": [
    {
      "operatingAccount": {
        "accountId": "C1_CUSTOMER_ID",
        "accountType": "GOOGLE_ADS"
      },
      "loginAccount": {
        "accountId": "C1_CUSTOMER_ID",
        "accountType": "GOOGLE_ADS"
      },
      "productDestinationId": "USER_LIST_ID"
    }
  ]
}
```

---

### Manager access scenario

Use this when your credentials belong to a manager account that has access to the client account.

#### Ingestion

| Field                            | Value                            |
| -------------------------------- | -------------------------------- |
| `operating_account.account_id`   | Client account ID                |
| `operating_account.account_type` | `GOOGLE_ADS`                     |
| `login_account.account_id`       | Manager account ID               |
| `login_account.account_type`     | `GOOGLE_ADS`                     |
| `linked_account`                 | Not set                          |
| `product_destination_id`         | Audience or conversion action ID |

#### Resource management

| Header           | Value                                                  |
| ---------------- | ------------------------------------------------------ |
| `login-account`  | `accountTypes/GOOGLE_ADS/accounts/MANAGER_CUSTOMER_ID` |
| `linked-account` | Not set                                                |

Example:

```
{
  "destinations": [
    {
      "operatingAccount": {
        "accountId": "C2_CUSTOMER_ID",
        "accountType": "GOOGLE_ADS"
      },
      "loginAccount": {
        "accountId": "M2_CUSTOMER_ID",
        "accountType": "GOOGLE_ADS"
      },
      "productDestinationId": "USER_LIST_ID"
    }
  ]
}
```

---

## Display & Video 360

Two access approaches:

1. Direct access (user belongs to advertiser or partner account)
2. Partner access (user belongs to partner account, targeting advertiser account)

### Direct access (advertiser)

#### Ingestion

| Field                            | Value                        |
| -------------------------------- | ---------------------------- |
| `operating_account.account_id`   | Advertiser ID                |
| `operating_account.account_type` | `DISPLAY_VIDEO_ADVERTISER`   |
| `login_account`                  | Same as operating or omitted |
| `linked_account`                 | Not set                      |
| `product_destination_id`         | Audience ID                  |

#### Resource management

| Header           | Value                                               |
| ---------------- | --------------------------------------------------- |
| `login-account`  | `accountTypes/DISPLAY_VIDEO_ADVERTISER/accounts/ID` |
| `linked-account` | Not set                                             |

---

### Partner access

#### Ingestion

| Field                            | Value                      |
| -------------------------------- | -------------------------- |
| `operating_account.account_id`   | Advertiser ID              |
| `operating_account.account_type` | `DISPLAY_VIDEO_ADVERTISER` |
| `login_account.account_id`       | Partner ID                 |
| `login_account.account_type`     | `DISPLAY_VIDEO_PARTNER`    |
| `linked_account`                 | Not set                    |
| `product_destination_id`         | Audience ID                |

---

## Google Analytics

> **Note:** If `operating_account` is a Google Analytics property, `login_account` must match or be omitted.

#### Ingestion

| Field                            | Value                             |
| -------------------------------- | --------------------------------- |
| `operating_account.account_id`   | Property ID                       |
| `operating_account.account_type` | `GOOGLE_ANALYTICS_PROPERTY`       |
| `login_account`                  | Same or omitted                   |
| `linked_account`                 | Not set                           |
| `product_destination_id`         | Measurement ID or Firebase App ID |

---

## Floodlight

> **Note:** `login_account` must match `operating_account` or be omitted.

#### Ingestion

| Field                            | Value                       |
| -------------------------------- | --------------------------- |
| `operating_account.account_id`   | Floodlight configuration ID |
| `operating_account.account_type` | `FLOODLIGHT_CONFIG`         |
| `login_account`                  | Same or omitted             |
| `linked_account`                 | Not set                     |
| `product_destination_id`         | Floodlight activity ID      |

Example:

```
{
  "destinations": [
    {
      "operatingAccount": {
        "accountId": "FLOODLIGHT_CONFIG_ID",
        "accountType": "FLOODLIGHT_CONFIG"
      },
      "loginAccount": {
        "accountId": "FLOODLIGHT_CONFIG_ID",
        "accountType": "FLOODLIGHT_CONFIG"
      },
      "productDestinationId": "FLOODLIGHT_ACTIVITY_ID"
    }
  ]
}
```

---

## Data partner scenarios

This section explains how data partners configure `Destination` objects when sending data to advertiser accounts with an established [partner link](https://developers.google.com/data-manager/api/devguides/accounts/partner-links).
