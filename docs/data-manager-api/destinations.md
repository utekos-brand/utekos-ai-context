Both the [`Destination`](https://developers.google.com/data-manager/api/reference/rest/v1/Destination) concept and request headers appear
frequently when working with the Data Manager API. Read this guide to understand
how to configure destinations and headers for different scenarios.

## When to use destinations or headers

- Use a [`Destination`](https://developers.google.com/data-manager/api/reference/rest/v1/Destination) in **ingestion requests** . An
  ingestion request uses the [`IngestionService`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#ingestionservice) to add or
  remove members in an audience or send events. The `destinations` list in an
  [`IngestAudienceMembersRequest`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#ingestaudiencemembersrequest) or
  [`IngestEventsRequest`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#ingesteventsrequest) defines:

  1. The account that receives the data. For example, a Google Ads account or a Google Analytics property.
  2. The destination entity for the data within the account, such as a Google Ads conversion action or a Google Analytics stream.
  3. The access path for the request's credentials to the account that receives the data.

  You can include multiple destinations in the same ingestion request.

  > [!TIP]
  > **Tip:** Don't set request headers in an `IngestionService` request. The Data Manager API ignores headers in an ingestion request.

- Use request headers in **resource management requests** that create, update,
  delete, or retrieve resources. Headers define the access path for the
  request's credentials to the target account of the resource management
  request. Here's the list of resources with resource management methods that
  support request headers:

  - [`Insights`](https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.insights)
  - [`PartnerLink`](https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.partnerLinks)
  - [`UserList`](https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.userLists)
  - [`UserListDirectLicense`](https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.userListDirectLicenses)
  - [`UserListGlobalLicense`](https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.userListGlobalLicenses)
  - [`UserListGlobalLicenseCustomerInfo`](https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.userListGlobalLicenses.userListGlobalLicenseCustomerInfos)

For example, if you want to create an audience, add members to the audience,
check diagnostics, and then retrieve the audience to check its size, here's each
step, the type of request to use, and whether you should use destinations or
request headers:

| Step | Request type | Destination or request headers |
|---|---|---|
| Create an audience | Resource management | Request headers |
| Add members to an audience | Ingestion | Destinations |
| Check diagnostics | Ingestion | Destinations |
| Retrieve the audience | Resource management | Request headers |

Toggle between the details in this guide for each request type by clicking on
the **Ingestion** or **Resource management** tab surrounding each table.

**If you're an advertiser or an agency** , jump to the
[Advertiser scenarios](https://developers.google.com/data-manager/api/devguides/concepts/destinations#advertiser) for examples of how to set headers and
construct a `Destination`:

- [Google Ads](https://developers.google.com/data-manager/api/devguides/concepts/destinations#ads-advertiser)
- [Display \& Video 360](https://developers.google.com/data-manager/api/devguides/concepts/destinations#dv3-advertiser)
- [Google Analytics](https://developers.google.com/data-manager/api/devguides/concepts/destinations#ga-advertiser)
- [Floodlight](https://developers.google.com/data-manager/api/devguides/concepts/destinations#floodlight-advertiser)

**If you're a data partner** , jump to the
[Data partner scenarios](https://developers.google.com/data-manager/api/devguides/concepts/destinations#data-partner) for examples of how to set headers and
construct a `Destination` to manage resources and send data to an account with a
[partner link](https://developers.google.com/data-manager/api/devguides/accounts/partner-links) to your data partner account:

- [Google Ads](https://developers.google.com/data-manager/api/devguides/concepts/destinations#ads-data-partner)
- [Display \& Video 360](https://developers.google.com/data-manager/api/devguides/concepts/destinations#dv3-data-partner)
- [Google Analytics](https://developers.google.com/data-manager/api/devguides/concepts/destinations#ga-data-partner)
- [Floodlight](https://developers.google.com/data-manager/api/devguides/concepts/destinations#floodlight-data-partner)

The [Detailed requirements](https://developers.google.com/data-manager/api/devguides/concepts/destinations#requirements) section covers the requirements and
validation rules in depth.

## Advertiser scenarios

Here's how to configure a `Destination` or request headers for common scenarios
for advertisers and agencies. This diagram shows how the Data Manager API uses the
credentials and `Destination` fields to access the advertiser account.

![Advertiser access path](https://developers.google.com/static/data-manager/api/images/destinations-advertiser-path.svg)

### Google Ads

Here's a diagram showing an example of a set of Google Ads accounts and users.

![Google Ads accounts and users](https://developers.google.com/static/data-manager/api/images/destinations-advertiser-accounts.svg)

Manager account M1

:   M1 has two direct child accounts:

    1. Manager account M2
    2. Client account C1

    Google Account `cloudysanfrancisco@gmail.com` is a user in M1.

Manager account M2

:   M2 has two direct child accounts:

    1. Client account C1
    2. Client account C2

    Google Account `baklavainthebalkans@gmail.com` is a user in M2.

Client account C1

:   C1 has two direct parent manager accounts:

    1. Manager account M1
    2. Manager account M2

    Google Account `jeffersonloveshiking@gmail.com` is a user in C1.

Client account C2

:   Manager account M2 is the only direct parent of C2.

    None of the Google Accounts listed is a user in C2.

The [Direct access scenario](https://developers.google.com/data-manager/api/devguides/concepts/destinations#ads-direct-access) and
[Manager access scenario](https://developers.google.com/data-manager/api/devguides/concepts/destinations#ads-manager-access) show how you'd configure a
destination to send data to these accounts.

#### Direct access scenario

If you want to send data to a Google Ads account and your credentials are for
a Google Account that's a user in the Google Ads account:

##### Ingestion

| Destination ||
|---|---|
| `operating_account` | |---|---| | `account_id` | The customer ID of the Google Ads account | | `account_type` | `GOOGLE_ADS` | |
| `login_account` | Either don't set the `login_account`, or set to the same values as `operating_account`. |
| `linked_account` | Don't set the `linked_account` field. |
| `product_destination_id` | The ID of the audience or conversion action. |

##### Resource management

| Request headers ||
|---|---|
| `login-account` | `accountTypes/GOOGLE_ADS/accounts/GOOGLE_ADS_CUSTOMER_ID` |
| `linked-account` | Don't set the `linked-account` header. |

Here's an example of a direct access scenario, using the accounts from the
[diagram](https://developers.google.com/data-manager/api/devguides/concepts/destinations#ads-advertiser) and credentials for Google Account
`jeffersonloveshiking@gmail.com`:

##### Ingestion

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

##### Resource management

| Request headers ||
|---|---|
| `login-account` | `accountTypes/GOOGLE_ADS/accounts/C1_CUSTOMER_ID` |
| `linked-account` | Don't set the `linked-account` header. |

#### Manager access scenario

If you want to send data to a Google Ads account and your credentials are for
a Google Account that's a user in a Google Ads manager account where the
advertiser account is a child account:

##### Ingestion

| Destination ||
|---|---|
| `operating_account` | |---|---| | `account_id` | The customer ID of the Google Ads client account | | `account_type` | `GOOGLE_ADS` | |
| `login_account` | |---|---| | `account_id` | The customer ID of the Google Ads manager account | | `account_type` | `GOOGLE_ADS` | |
| `linked_account` | Don't set the `linked_account` field. |
| `product_destination_id` | The ID of the audience or conversion action. |

##### Resource management

| Request headers ||
|---|---|
| `login-account` | `accountTypes/GOOGLE_ADS/accounts/MANAGER_CUSTOMER_ID` |
| `linked-account` | Don't set the `linked-account` header. |

Here's an example of a manager access scenario for Google Ads client account
C2 from the [diagram](https://developers.google.com/data-manager/api/devguides/concepts/destinations#ads-advertiser) and credentials for Google Account
`baklavainthebalkans@gmail.com`:

##### Ingestion

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

##### Resource management

| Request headers ||
|---|---|
| `login-account` | `accountTypes/GOOGLE_ADS/accounts/M2_CUSTOMER_ID` |
| `linked-account` | Don't set the `linked-account` header. |

Here's another example of a manager access scenario for Google Ads client account
C2 and credentials for Google Account `cloudysanfrancisco@gmail.com`, which
is a user on Google Ads manager account M1:

##### Ingestion

```
{
  "destinations": [
    {
      "operatingAccount": {
        "accountId": "C2_CUSTOMER_ID",
        "accountType": "GOOGLE_ADS"
      },
      "loginAccount": {
        "accountId": "M1_CUSTOMER_ID",
        "accountType": "GOOGLE_ADS"
      },
      "productDestinationId": "USER_LIST_ID"
    }
  ]
}
```

##### Resource management

| Request headers ||
|---|---|
| `login-account` | `accountTypes/GOOGLE_ADS/accounts/M1_CUSTOMER_ID` |
| `linked-account` | Don't set the `linked-account` header. |

### Display \& Video 360

You can send data to a Display \& Video 360 using two approaches:

1. Direct access, where the credentials are for a Google Account that's a user in the Display \& Video 360 advertiser or partner account.
2. Display \& Video 360 partner access, where the credentials are for a Google Account that's a user in the Display \& Video 360 partner account, and the operating account is a Display \& Video 360 advertiser account under the partner account.

#### Direct access scenarios

If you want to send data to a Display \& Video 360 *advertiser* account and your credentials
are for a Google Account that's a user in the advertiser account:

##### Ingestion

| Destination ||
|---|---|
| `operating_account` | |---|---| | `account_id` | The ID of the Display \& Video 360 advertiser account | | `account_type` | `DISPLAY_VIDEO_ADVERTISER` | |
| `login_account` | Either don't set the `login_account`, or set to the same values as `operating_account`. |
| `linked_account` | Don't set the `linked_account` field. |
| `product_destination_id` | The ID of the audience. |

##### Resource management

| Request headers ||
|---|---|
| `login-account` | `accountTypes/DISPLAY_VIDEO_ADVERTISER/accounts/DISPLAY_VIDEO_ADVERTISER_ID` |
| `linked-account` | Don't set the `linked-account` header. |

Here's an example of a `Destination` for a direct access scenario to send data
to a Display \& Video 360 *advertiser*:

##### Ingestion

```
{
  "destinations": [
    {
      "operatingAccount": {
        "accountId": "DISPLAY_VIDEO_ADVERTISER_ID",
        "accountType": "DISPLAY_VIDEO_ADVERTISER"
      },
      "loginAccount": {
        "accountId": "DISPLAY_VIDEO_ADVERTISER_ID",
        "accountType": "DISPLAY_VIDEO_ADVERTISER"
      },
      "productDestinationId": "AUDIENCE_ID"
    }
  ]
}
```

##### Resource management

| Request headers ||
|---|---|
| `login-account` | `accountTypes/DISPLAY_VIDEO_ADVERTISER/accounts/DISPLAY_VIDEO_ADVERTISER_ID` |
| `linked-account` | Don't set the `linked-account` header. |

Similarly, if you want to send data to a Display \& Video 360 *partner* account and your
credentials are for a Google Account that's a user in the partner account:

##### Ingestion

| Destination ||
|---|---|
| `operating_account` | |---|---| | `account_id` | The ID of the Display \& Video 360 partner account | | `account_type` | `DISPLAY_VIDEO_PARTNER` | |
| `login_account` | Either don't set the `login_account`, or set to the same values as `operating_account`. |
| `linked_account` | Don't set the `linked_account` field. |
| `product_destination_id` | The ID of the audience. |

##### Resource management

| Request headers ||
|---|---|
| `login-account` | `accountTypes/DISPLAY_VIDEO_PARTNER/accounts/DISPLAY_VIDEO_PARTNER_ID` |
| `linked-account` | Don't set the `linked-account` header. |

Here's an example of a `Destination` for a direct access scenario to send data
to a Display \& Video 360 *partner*:

##### Ingestion

```
{
  "destinations": [
    {
      "operatingAccount": {
        "accountId": "DISPLAY_VIDEO_PARTNER_ID",
        "accountType": "DISPLAY_VIDEO_PARTNER"
      },
      "loginAccount": {
        "accountId": "DISPLAY_VIDEO_PARTNER_ID",
        "accountType": "DISPLAY_VIDEO_PARTNER"
      },
      "productDestinationId": "AUDIENCE_ID"
    }
  ]
}
```

##### Resource management

| Request headers ||
|---|---|
| `login-account` | `accountTypes/DISPLAY_VIDEO_PARTNER/accounts/DISPLAY_VIDEO_PARTNER_ID` |
| `linked-account` | Don't set the `linked-account` header. |

#### Display \& Video 360 partner access scenario

If you want to send data to a Display \& Video 360 *advertiser* and your credentials are for
a Google Account that's a user in the advertiser's parent Display \& Video 360 partner
account:

##### Ingestion

| Destination ||
|---|---|
| `operating_account` | |---|---| | `account_id` | The ID of the Display \& Video 360 advertiser account | | `account_type` | `DISPLAY_VIDEO_ADVERTISER` | |
| `login_account` | |---|---| | `account_id` | The ID of the Display \& Video 360 partner account | | `account_type` | `DISPLAY_VIDEO_PARTNER` | |
| `linked_account` | Don't set the `linked_account` field. |
| `product_destination_id` | The ID of the audience. |

##### Resource management

| Request headers ||
|---|---|
| `login-account` | `accountTypes/DISPLAY_VIDEO_PARTNER/accounts/DISPLAY_VIDEO_PARTNER_ID` |
| `linked-account` | Don't set the `linked-account` header. |

Here's an example of a `Destination` for a partner access scenario to send data
to a Display \& Video 360 advertiser. In this scenario, the credentials must be for a Google
Account that's a user in the Display \& Video 360 partner account
<var translate="no">DISPLAY_VIDEO_PARTNER_ID</var>, and Display \& Video 360 advertiser account
<var translate="no">DISPLAY_VIDEO_ADVERTISER_ID</var> must be a child of partner account
<var translate="no">DISPLAY_VIDEO_PARTNER_ID</var>.

##### Ingestion

```
{
  "destinations": [
    {
      "operatingAccount": {
        "accountId": "DISPLAY_VIDEO_ADVERTISER_ID",
        "accountType": "DISPLAY_VIDEO_ADVERTISER"
      },
      "loginAccount": {
        "accountId": "DISPLAY_VIDEO_PARTNER_ID",
        "accountType": "DISPLAY_VIDEO_PARTNER"
      },
      "productDestinationId": "AUDIENCE_ID"
    }
  ]
}
```

##### Resource management

| Request headers ||
|---|---|
| `login-account` | `accountTypes/DISPLAY_VIDEO_PARTNER/accounts/DISPLAY_VIDEO_PARTNER_ID` |
| `linked-account` | Don't set the `linked-account` header. |

### Google Analytics

**Note:** If the `operating_account` is a Google Analytics account, then either
don't set the `login_account` or set it to the same values as the
`operating_account`. Otherwise, the request fails with the error
`OPERATING_ACCOUNT_LOGIN_ACCOUNT_MISMATCH`.

##### Ingestion

| Destination ||
|---|---|
| `operating_account` | |---|---| | `account_id` | The ID of the Google Analytics property | | `account_type` | `GOOGLE_ANALYTICS_PROPERTY` | |
| `login_account` | Either don't set the `login_account`, or set to the same values as `operating_account`. |
| `linked_account` | Don't set the `linked_account` field. |
| `product_destination_id` | - The [measurement ID](https://developers.google.com/data-manager/api/devguides/concepts/destinations#ga-event) of a web data stream. - The [Firebase App ID](https://developers.google.com/data-manager/api/devguides/concepts/destinations#ga-event) of an app data stream. |

##### Resource management

| Request headers ||
|---|---|
| `login-account` | `accountTypes/GOOGLE_ANALYTICS_PROPERTY/accounts/PROPERTY_ID` |
| `linked-account` | Don't set the `linked-account` header. |

Here's an example of a `Destination` for sending events to Google Analytics:

##### Ingestion

```
{
  "destinations": [
    {
      "operatingAccount": {
        "accountId": "PROPERTY_ID",
        "accountType": "GOOGLE_ANALYTICS_PROPERTY"
      },
      "loginAccount": {
        "accountId": "PROPERTY_ID",
        "accountType": "GOOGLE_ANALYTICS_PROPERTY"
      },
      "productDestinationId": "MEASUREMENT_ID"
    }
  ]
}
```

##### Resource management

| Request headers ||
|---|---|
| `login-account` | `accountTypes/GOOGLE_ANALYTICS_PROPERTY/accounts/PROPERTY_ID` |
| `linked-account` | Don't set the `linked-account` header. |

### Floodlight

> [!NOTE]
> **Note:** If the `operating_account` is a Floodlight configuration, then either don't set the `login_account` or set it to the same values as the `operating_account`. Otherwise, the request fails with the error `OPERATING_ACCOUNT_LOGIN_ACCOUNT_MISMATCH`.

##### Ingestion

| Destination ||
|---|---|
| `operating_account` | |---|---| | `account_id` | The Floodlight configuration ID If your advertiser is a child of a parent advertiser, use the ID of the parent advertiser in Campaign Manager 360 as your Floodlight configuration ID. Otherwise, use the ID of your advertiser. [See how to find the advertiser ID in the Campaign Manager 360 UI](https://support.google.com/campaignmanager/answer/11568119). | | `account_type` | `FLOODLIGHT_CONFIG` | |
| `login_account` | Either don't set the `login_account`, or set to the same values as `operating_account`. |
| `linked_account` | Don't set the `linked_account` field. |
| `product_destination_id` | The [Floodlight activity ID](https://developers.google.com/data-manager/api/devguides/concepts/destinations#floodlight-event) |

Here's an example of a `Destination` for sending events to Floodlight:

##### Ingestion

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

## Data partner scenarios

Here's how to configure a `Destination` for common scenarios for a data partner
that sends data to advertiser accounts with an established
[partner link](https://developers.google.com/data-manager/api/devguides/accounts/partner-links) to the data partner account.

> [!NOTE]
> **Note:** In every data partner scenario, the credentials must be for a Google Account that's a user in the data partner account.

This diagram shows how the Data Manager API uses the credentials and
`Destination` fields to access the advertiser account through a partner link.

![Data partner access path](https://developers.google.com/static/data-manager/api/images/destinations-datapartner-path.svg)

### Google Ads

Here's a diagram showing an example of a set of Google Ads and data partner
accounts. The diagram also shows which Google Account is a user in each
Google Ads or data partner account, as well as the
[partner links](https://developers.google.com/data-manager/api/devguides/accounts/partner-links) between accounts.

![Data partner and Google Ads accounts and users](https://developers.google.com/static/data-manager/api/images/destinations-datapartner-accounts.svg)

Data partner D1

:   A [partner link](https://developers.google.com/data-manager/api/devguides/accounts/partner-links) exists between D1 and Google Ads manager
    account M2.

    Google Account `222larabrown@gmail.com` is a user in D1.

Data partner D2

:   A [partner link](https://developers.google.com/data-manager/api/devguides/accounts/partner-links) exists between D2 and Google Ads client
    account C1.

    Google Account `jeffersonloveshiking@gmail.com` is a user in D2.

Manager account M1

:   M1 has two direct child accounts:

    1. Manager account M2
    2. Client account C1

Manager account M2

:   M2 has two direct child accounts:

    1. Client account C1
    2. Client account C2

Client account C1

:   C1 has two direct parent manager accounts:

    1. Manager account M1
    2. Manager account M2

Client account C2

:   Manager account M2 is the only direct parent of C2.

Here's what you can do with this set of accounts:

Act as data partner D1

:   To act as data partner D1, use credentials for Google Account
    `222larabrown@gmail.com` to send data to manager account M2, client account
    C1, or client account C2, using a destination with `login_account` set to data
    partner account D1 and `linked_account` set to manager account M2.

    As data partner D1, you can't send data to manager account M1 because there
    isn't a partner link between D1 and M1.

Act as data partner D2

:   To act as data partner D2, use credentials for Google Account
    `jeffersonloveshiking@gmail.com` to send data to client account C1, using a
    destination with `login_account` set to data partner account D2 and
    `linked_account` set to client account C1.

    As data partner D2, you can't send data to manager account M1, manager
    account M2, or client account C2 because there isn't a partner link between
    D2 and any of those accounts or their parent manager accounts.

The key difference between data partners D1 and D2 is how the data partner is
linked to Google Ads accounts.

- Data partner D1 is linked to a Google Ads manager account. This is an example of the [manager partner link scenario](https://developers.google.com/data-manager/api/devguides/concepts/destinations#ads-data-partner-manager).
- Data partner D2 is linked to a Google Ads client account. This is an example of the [direct partner link scenario](https://developers.google.com/data-manager/api/devguides/concepts/destinations#ads-data-partner-direct).

#### Direct partner link scenario

If you want to send data to a Google Ads account and the
[partner link](https://developers.google.com/data-manager/api/devguides/accounts/partner-links) is between the Google Ads account and your data
partner account:

##### Ingestion

| Destination ||
|---|---|
| `operating_account` | |---|---| | `account_id` | The customer ID of the Google Ads account | | `account_type` | `GOOGLE_ADS` | |
| `login_account` | |---|---| | `account_id` | The customer ID of the data partner account | | `account_type` | `DATA_PARTNER` | |
| `linked_account` | Don't set the `linked_account` field. |
| `product_destination_id` | The ID of the audience or conversion action. |

##### Resource management

| Request headers ||
|---|---|
| `login-account` | `accountTypes/DATA_PARTNER/accounts/DATA_PARTNER_ID` |
| `linked-account` | Don't set the `linked-account` header. |

Here's an example of a direct partner link scenario using accounts from the
[diagram](https://developers.google.com/data-manager/api/devguides/concepts/destinations#ads-data-partner), and the corresponding request headers for resource
management requests. In this scenario, data partner D2 sends audience member
data to Google Ads client customer C1 using the partner link between D2 and
C1, and credentials for Google Account `jeffersonloveshiking@gmail.com`:

##### Ingestion

```
{
  "destinations": [
    {
      "operatingAccount": {
        "accountId": "C1_CUSTOMER_ID",
        "accountType": "GOOGLE_ADS"
      },
      "loginAccount": {
        "accountId": "D2_CUSTOMER_ID",
        "accountType": "DATA_PARTNER"
      },
      "productDestinationId": "USER_LIST_ID"
    }
  ]
}
```

##### Resource management

| Request headers ||
|---|---|
| `login-account` | `accountTypes/DATA_PARTNER/accounts/D2_CUSTOMER_ID` |
| `linked-account` | Don't set the `linked-account` header. |

#### Manager partner link scenario

If you want to send data to a Google Ads account and the
[partner link](https://developers.google.com/data-manager/api/devguides/accounts/partner-links) is between a parent Google Ads manager account
and your data partner account:

##### Ingestion

| Destination ||
|---|---|
| `operating_account` | |---|---| | `account_id` | The customer ID of the Google Ads client account | | `account_type` | `GOOGLE_ADS` | |
| `login_account` | |---|---| | `account_id` | The customer ID of the data partner account | | `account_type` | `DATA_PARTNER` | |
| `linked_account` | |---|---| | `account_id` | The customer ID of the Google Ads manager account | | `account_type` | `GOOGLE_ADS` | |
| `product_destination_id` | The ID of the audience or conversion action. |

##### Resource management

| Request headers ||
|---|---|
| `login-account` | `accountTypes/DATA_PARTNER/accounts/DATA_PARTNER_ID` |
| `linked-account` | `accountTypes/GOOGLE_ADS/accounts/MANAGER_CUSTOMER_ID` |

Here's an example of a manager partner link scenario using accounts from the
[diagram](https://developers.google.com/data-manager/api/devguides/concepts/destinations#ads-data-partner). In this scenario, data partner D1 sends audience
member data to Google Ads client customer C2 using the partner link between D1
and M2, and credentials for Google Account `222larabrown@gmail.com`:

##### Ingestion

```
{
  "destinations": [
    {
      "operatingAccount": {
        "accountId": "C2_CUSTOMER_ID",
        "accountType": "GOOGLE_ADS"
      },
      "loginAccount": {
        "accountId": "D1_CUSTOMER_ID",
        "accountType": "DATA_PARTNER"
      },
      "linkedAccount": {
        "accountId": "M2_CUSTOMER_ID",
        "accountType": "GOOGLE_ADS"
      },
      "productDestinationId": "USER_LIST_ID"
    }
  ]
}
```

##### Resource management

| Request headers ||
|---|---|
| `login-account` | `accountTypes/DATA_PARTNER/accounts/D1_CUSTOMER_ID` |
| `linked-account` | `accountTypes/GOOGLE_ADS/accounts/M2_CUSTOMER_ID` |

### Display \& Video 360

As a data partner, you can send data to a Display \& Video 360 account using two approaches:

1. Use a direct [partner link](https://developers.google.com/data-manager/api/devguides/accounts/partner-links) between a data partner account and the Display \& Video 360 partner or advertiser account.
2. Send data to a Display \& Video 360 advertiser using a [partner link](https://developers.google.com/data-manager/api/devguides/accounts/partner-links) between a data partner account and the advertiser's parent Display \& Video 360 partner account.

#### Direct partner link scenarios

If you want to send data to a Display \& Video 360 *advertiser* and the
[partner link](https://developers.google.com/data-manager/api/devguides/accounts/partner-links) is between the Display \& Video 360 advertiser account and your
data partner account:

##### Ingestion

| Destination ||
|---|---|
| `operating_account` | |---|---| | `account_id` | The ID of the Display \& Video 360 advertiser account | | `account_type` | `DISPLAY_VIDEO_ADVERTISER` | |
| `login_account` | |---|---| | `account_id` | The customer ID of the data partner account | | `account_type` | `DATA_PARTNER` | |
| `linked_account` | Don't set the `linked_account` field. |
| `product_destination_id` | The ID of the audience or conversion action. |

##### Resource management

| Request headers ||
|---|---|
| `login-account` | `accountTypes/DATA_PARTNER/accounts/DATA_PARTNER_ID` |
| `linked-account` | Don't set the `linked-account` header. |

Here's an example of a `Destination` for a direct partner link scenario to send
data to a Display \& Video 360 advertiser, and the corresponding request headers for resource
management requests:

##### Ingestion

```
{
  "destinations": [
    {
      "operatingAccount": {
        "accountId": "DISPLAY_VIDEO_ADVERTISER_ID",
        "accountType": "DISPLAY_VIDEO_ADVERTISER"
      },
      "loginAccount": {
        "accountId": "DATA_PARTNER_ID",
        "accountType": "DATA_PARTNER"
      },
      "productDestinationId": "AUDIENCE_ID"
    }
  ]
}
```

##### Resource management

| Request headers ||
|---|---|
| `login-account` | `accountTypes/DATA_PARTNER/accounts/DATA_PARTNER_ID` |
| `linked-account` | Don't set the `linked-account` header. |

If you want to send data to a Display \& Video 360 *partner* account, you must have a
[partner link](https://developers.google.com/data-manager/api/devguides/accounts/partner-links) between the Display \& Video 360 partner account and your data
partner account.

##### Ingestion

| Destination ||
|---|---|
| `operating_account` | |---|---| | `account_id` | The ID of the Display \& Video 360 partner account | | `account_type` | `DISPLAY_VIDEO_PARTNER` | |
| `login_account` | |---|---| | `account_id` | The customer ID of the data partner account | | `account_type` | `DATA_PARTNER` | |
| `linked_account` | Don't set the `linked_account` field. |
| `product_destination_id` | The ID of the audience or conversion action. |

##### Resource management

| Request headers ||
|---|---|
| `login-account` | `accountTypes/DATA_PARTNER/accounts/DATA_PARTNER_ID` |
| `linked-account` | Don't set the `linked-account` header. |

Here's an example of a `Destination` for a direct partner link scenario to send
data to a Display \& Video 360 partner, and the corresponding request headers for resource
management requests:

##### Ingestion

```
{
  "destinations": [
    {
      "operatingAccount": {
        "accountId": "DISPLAY_VIDEO_PARTNER_ID",
        "accountType": "DISPLAY_VIDEO_PARTNER"
      },
      "loginAccount": {
        "accountId": "DATA_PARTNER_ID",
        "accountType": "DATA_PARTNER"
      },
      "productDestinationId": "AUDIENCE_ID"
    }
  ]
}
```

##### Resource management

| Request headers ||
|---|---|
| `login-account` | `accountTypes/DATA_PARTNER/accounts/DATA_PARTNER_ID` |
| `linked-account` | Don't set the `linked-account` header. |

#### Parent partner link scenario

If you want to send data to a Display \& Video 360 *advertiser* and the
[partner link](https://developers.google.com/data-manager/api/devguides/accounts/partner-links) to your data partner account is with a Display \& Video 360
partner account where the advertiser account is a child account:

##### Ingestion

| Destination ||
|---|---|
| `operating_account` | |---|---| | `account_id` | The ID of the Display \& Video 360 advertiser account | | `account_type` | `DISPLAY_VIDEO_ADVERTISER` | |
| `login_account` | |---|---| | `account_id` | The customer ID of the data partner account | | `account_type` | `DATA_PARTNER` | |
| `linked_account` | |---|---| | `account_id` | The ID of the Display \& Video 360 partner account | | `account_type` | `DISPLAY_VIDEO_PARTNER` | |
| `product_destination_id` | The ID of the audience or conversion action. |

##### Resource management

| Request headers ||
|---|---|
| `login-account` | `accountTypes/DATA_PARTNER/accounts/DATA_PARTNER_ID` |
| `linked-account` | `accountTypes/DISPLAY_VIDEO_PARTNER/accounts/DISPLAY_VIDEO_PARTNER_ID` |

Here's an example of a `Destination` for a partner link scenario to send data to
a Display \& Video 360 advertiser using a partner link between the data partner and the
advertiser's parent Display \& Video 360 partner:

##### Ingestion

```
{
  "destinations": [
    {
      "operatingAccount": {
        "accountId": "DISPLAY_VIDEO_ADVERTISER_ID",
        "accountType": "DISPLAY_VIDEO_ADVERTISER"
      },
      "loginAccount": {
        "accountId": "DATA_PARTNER_ID",
        "accountType": "DATA_PARTNER"
      },
      "linkedAccount": {
        "accountId": "DISPLAY_VIDEO_PARTNER_ID",
        "accountType": "DISPLAY_VIDEO_PARTNER"
      },
      "productDestinationId": "AUDIENCE_ID"
    }
  ]
}
```

##### Resource management

| Request headers ||
|---|---|
| `login-account` | `accountTypes/DATA_PARTNER/accounts/DATA_PARTNER_ID` |
| `linked-account` | `accountTypes/DISPLAY_VIDEO_PARTNER/accounts/DISPLAY_VIDEO_PARTNER_ID` |

### Google Analytics

The Data Manager API doesn't support sending data to a Google Analytics account
using a [partner link](https://developers.google.com/data-manager/api/devguides/accounts/partner-links). Use the [advertiser scenarios for Google
Analytics](https://developers.google.com/data-manager/api/devguides/concepts/destinations#ga-advertiser) approach instead.

### Floodlight

The Data Manager API doesn't support sending data to a Floodlight configuration
using a [partner link](https://developers.google.com/data-manager/api/devguides/accounts/partner-links). Use the
[advertiser scenarios for Floodlight](https://developers.google.com/data-manager/api/devguides/concepts/destinations#floodlight-advertiser) approach instead.

## Detailed requirements

This section contains detailed requirements for the
[account fields](https://developers.google.com/data-manager/api/devguides/concepts/destinations#account-fields) of a `Destination` for an
[`IngestionService`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#ingestionservice) request, the equivalent request headers for
resource managent requests, [tips for how to set the
`product_destination_id`](https://developers.google.com/data-manager/api/devguides/concepts/destinations#product-destination-id), and how to [determine where
your credentials have access](https://developers.google.com/data-manager/api/devguides/concepts/destinations#check-credentials).

### Account fields

A `Destination` can have up to 3 different accounts:

`operating_account`

:   The `operating_account` is *required*.

    The `operating_account` indicates which account receives the data in the
    request. The `operating_account` can be any of the following:

    - A Google Ads account
    - A [Display \& Video 360 advertiser](https://support.google.com/displayvideo/answer/2696883) account
    - A [Display \& Video 360 partner](https://support.google.com/displayvideo/answer/7622449) account
    - A [Google Analytics property](https://support.google.com/analytics/answer/9355666)
    - A data partner account if sending data to an audience owned by the data partner account.

    There isn't a request header that corresponds to the `operating_account`
    field of a `Destination`. When sending a resource management request, the
    target account of the request is the operating account.

`login_account` field and `login-account` request header

:   The `login_account` isn't always required, and defaults to the
    `operating_account` in an [`IngestionService`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#ingestionservice) request, and
    the target account in a resource management request. In a resource management
    request, use the `login-account` request header to identify the login
    account.

    The Data Manager API verifies that:

    1. The Google Account of the credentials is a user in the login account.

    2. The login account is one of the following:

       - The same as the `operating_account`. This is the default if you
         don't set the `login_account` of a `Destination` in an
         [`IngestionService`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#ingestionservice) request, or don't set the
         `login-account` header in a resource management request.

       - A [Google Ads manager](https://support.google.com/google-ads/answer/6139186) or
         [Display \& Video 360 partner](https://support.google.com/displayvideo/answer/7622449) account that is a parent
         of the `operating_account` in an
         [`IngestionService`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#ingestionservice) request, or a parent of the
         target account in a resource management request.

       - A data partner account with a [partner link](https://developers.google.com/data-manager/api/devguides/accounts/partner-links) to the
         `linked_account` in an [`IngestionService`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#ingestionservice) request,
         or the `linked-account` header in a resource management request.

`linked_account` field and `linked-account` request header
:

    > [!NOTE]
    > **Note:** Only specify a linked account if the login account has `account_type` set to `DATA_PARTNER` and a *parent* of the `operating_account` is linked to the data partner account. If the `operating_account` is directly linked to the data partner account, don't set `linked_account`.


    The `linked_account` indicates which account has a
    [partner link](https://developers.google.com/data-manager/api/devguides/accounts/partner-links) to the `login_account` of an
    [`IngestionService`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#ingestionservice) request, or the target account of a
    resource management request.

### Product destination ID

The `product_destination_id` of a `Destination` identifies which object in the
`operating_account` receives the data. For example, this could be an audience ID
for Google Ads or Display \& Video 360, a conversion action ID for Google Ads, or a
[measurement ID](https://support.google.com/analytics/answer/12270356) for a Google Analytics data stream.

Here's how to find the ID for each type of product destination.

#### Google Ads audience

The product destination ID for ingesting audience members is the audience ID.
Retrieve this ID using the Google Ads UI or the Data Manager API.

### Google Ads UI


To get the audience ID from the Google Ads UI:

1. Go to [**Audience manager**](https://ads.google.com/aw/audiences/management) in the Google Ads UI.
2. Click the audience name to view details.
3. The audience ID is listed next to **List ID**.

### Data Manager API


Retrieve the [`UserList`](https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.userLists) using the [List](https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.userLists/list)
method, [providing request headers if required](https://developers.google.com/data-manager/api/devguides/concepts/destinations#when-to-use), and use the
`id` of the `UserList` for the product destination ID.

#### Google Ads event

The product destination ID for ingesting events is the conversion action ID.

To get the conversion action ID from the Google Ads UI:

1. Go to [**Conversions**](https://ads.google.com/aw/conversions) in the Google Ads UI.
2. Click the conversion action name to view details.
3. The conversion action ID is the value for the URL query parameter named
   `ctId`.

         https://ads.google.com/aw/conversions/detail?ocid=...&ctId=CONVERSION_ACTION_ID&...

To get the conversion action ID from the Google Ads API:

1. Send a `Search` or `SearchStream` request to
   [`GoogleAdsService`](https://developers.google.com/google-ads/api/reference/rpc/latest/GoogleAdsService)
   with the following query:

         SELECT
           conversion_action.id,
           conversion_action.name
         FROM conversion_action
         WHERE conversion_action.name = 'CONVERSION_ACTION_NAME'

2. Get the conversion action ID from the `id` field in the
   `conversion_action` in the response.

         [
           {
             "results": [
               {
                 "conversionAction": {
                   "resourceName": "customers/CUSTOMER_ID/conversionActions/CONVERSION_ACTION_ID",
                   "id": "CONVERSION_ACTION_ID",
                   "name": "CONVERSION_ACTION_NAME"
                 }
               }
             ]
           }
         ]

#### Display \& Video 360 audience

The product destination ID for ingesting audience members is the audience ID.
Retrieve this ID using the Display \& Video 360 UI or the Data Manager API.

### Display \& Video 360 UI


To get the audience ID from the Display \& Video 360 UI:

1. Sign in to the Display \& Video 360 UI at <https://displayvideo.google.com>.
2. Navigate to the Display \& Video 360 partner or advertiser you're using for the `operating_account`.
3. Go to **Audiences** on the left menu, then select **All audiences**.
4. Find the audience in the list. The audience ID is the number next to the name in the **Name** column.

### Data Manager API


Retrieve the [`UserList`](https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.userLists) using the [List](https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.userLists/list) method,
[providing request headers if required](https://developers.google.com/data-manager/api/devguides/concepts/destinations#when-to-use), and use the `id` of the
`UserList` for the product destination ID.

#### Google Analytics event

The product destination ID depends on the type of data stream.

Web data stream
:   Use the [measurement ID](https://support.google.com/analytics/answer/12270356) of the data stream.

App data stream

:   Use the Firebase App ID of the data stream. Here are two options for finding
    your Firebase App ID:

    - In the Google Analytics UI, go to [Data streams](https://analytics.google.com/analytics/web/#/?pagename=admin-streams), click the data stream, and look for the **FIREBASE APP ID**.
    - [Use the Firebase console](https://firebase.google.com/support/faq#find-app-id).

#### Floodlight event

The product destination ID for ingesting events to Floodlight is
the Floodlight activity ID. Retrieve this ID using the Campaign Manager 360 UI or the
Campaign Manager 360 API.

### Campaign Manager 360 UI

To get the Floodlight activity ID from the Campaign Manager 360 UI:

1. Sign in to the Campaign Manager 360 UI.
2. Navigate to the Campaign Manager 360 advertiser you're using for the `operating_account`.
3. Go to **Floodlight** on the left menu, then select **Activities**.
4. Find the Floodlight activity in the list. The ID is the number next to the name in the **Activity name** column.

### Campaign Manager 360 API

To get the Floodlight activity ID from the Campaign Manager 360 API:

1. Send a `list` request to the [`floodlightActivities`](https://developers.google.com/doubleclick-advertisers/current/floodlightActivities/list) resource.
2. Specify the `floodlightConfigurationId` of the Floodlight configuration.
3. Optionally, use the `searchString` parameter to filter by activity name.
4. Get the Floodlight activity ID from the `id` field of the selected `FloodlightActivity` in the response.

### Determine where credentials have access

The credentials that you use to authorize a Data Manager API request are
associated with a specific Google Account.

- If you use user credentials, requests are authorized as the Google Account of the user who granted permission to act on their behalf when you generated the credentials.
- If you use service account credentials, requests are authorized as the service account's Google Account.

Here's how to verify that the Google Account for your credentials has access
to a Google Ads, Display \& Video 360, Google Analytics, or Campaign Manager 360 account.

#### Google Ads or data partner

1. Go to [**Access and security**](https://ads.google.com/aw/accountaccess/users) in the Google Ads UI for the `login_account`.
2. Select the **Users** tab.
3. If the `login_account` is a Google Ads manager account, turn off the **Show users in full hierarchy** toggle to hide users from child accounts.
4. Verify that the Google Account for your credentials is in the list of accounts shown on the **Users** tab.

#### Display \& Video 360

1. Go to [**User management and email preferences**](https://displayvideo.google.com/ng_nav/users) in the Display \& Video 360 UI.
2. Verify that the **User management** shows that the Google Account for your credentials is a user on the `login_account`.

#### Google Analytics

1. Go to [**Property access management**](https://analytics.google.com/analytics/web/#/?pagename=admin-access-management-property) in the Google Analytics UI.
2. Confirm that the Google Analytics property specified in the `login_account` is selected.
3. Verify that the Google Account for your credentials has the [Editor or Administrator role](https://support.google.com/analytics/answer/9305587) on the property.

#### Floodlight (Campaign Manager 360)

1. Sign in to the Campaign Manager 360 UI.
2. Go to **Admin** \> **User profiles** in the left menu.
3. Verify that the Google Account for your credentials is in the list of profiles shown.
4. Click the profile and verify that it has access to the advertiser account used as the `login_account`. If you don't set a `login_account` in the request, it defaults to the `operating_account`. Make sure the account has a user role with the **Insert offline conversions** permission.