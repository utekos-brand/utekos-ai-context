Work through this guide to get familiar with the process of sending audience
members with the Data Manager API.

In this guide, you complete the following steps:

1. Prepare a [`Destination`](https://developers.google.com/data-manager/api/reference/rest/v1/Destination) to receive audience data.
2. Prepare audience data to send.
3. Build an [`IngestionService`](https://developers.google.com/data-manager/api/reference/rest/v1/audienceMembers/ingest) request for audience members.
4. Send the request with the Google APIs Explorer.
5. Understand success and failure responses.

> [!NOTE]
> **Note:** An audience must have at least 100 members in order for it to be eligible for targeting.

> [!NOTE]
> **Note:** Audience member ingestion requests must comply with the [EU Political Ads Regulation (EU PAR) policy](https://developers.google.com/google-ads/api/docs/api-policy/eu-par) and may return an `EU_POLITICAL_ADVERTISING_DECLARATION_REQUIRED` error if the operation is on an account that lacks the required declaration.

## Prepare a destination

Before you can send data, you need to prepare the destination to send the data
to. Here's a sample `Destination` for you to use. Check out [Configure
destinations](https://developers.google.com/data-manager/api/devguides/concepts/destinations) for examples of destinations
for different scenarios.

Select the tab that corresponds to your use case.

- Select **Advertiser** if you're using credentials for a Google Account that is a user in the advertiser accounts you want to manage.
- Select **Data Partner** if you're using credentials for a Google Account that is a user in a data partner account, and you want to manage advertiser accounts that have a [partner
  link](https://developers.google.com/data-manager/api/devguides/accounts/partner-links) to the data partner account.

<br />

### Advertiser

`operatingAccount`

:   The account that receives the audience data. Set this to the advertiser
    account that owns the audience.

    > [!NOTE]
    > **Note:** Attempts to send audience data to an unsupported operating account type fail with an `INVALID_ARGUMENT` error and the `INVALID_DESTINATION` [`ErrorReason`](https://developers.google.com/data-manager/api/reference/rest/v1/ErrorReason) code.

`loginAccount`

:   The account where the Google Account for the credentials is a user.

    If your OAuth credentials are for a user with access to a [Google Ads
    manager account](https://support.google.com/google-ads/answer/6139186), that has the `operatingAccount` as one of its
    subaccounts, set the `loginAccount` to the account type and ID of the
    manager account.

    If the OAuth credentials are for a user with direct access to the
    `operatingAccount`, you don't need to set `loginAccount`.

`productDestinationId`

:   The ID of the audience in the `operatingAccount` that receives the
    member data.

    {
      "operatingAccount": {
        "accountType": "OPERATING_ACCOUNT_TYPE",
        "accountId": "OPERATING_ACCOUNT_ID"
      },
      "loginAccount": {
        "accountType": "LOGIN_ACCOUNT_TYPE",
        "accountId": "LOGIN_ACCOUNT_ID"
      },
      "productDestinationId": "AUDIENCE_ID"
    }

### Data Partner

`operatingAccount`

:   The account type and ID of the account that receives the audience data.
    Set this to the advertiser account that owns the audience.

    > [!NOTE]
    > **Note:** Attempts to send audience data to an unsupported operating account type fail with an `INVALID_ARGUMENT` error and the `INVALID_DESTINATION` [`ErrorReason`](https://developers.google.com/data-manager/api/reference/rest/v1/ErrorReason) code.

`loginAccount`

:   The account type and ID of your data partner account.

`linkedAccount`

:   The account with an established [partner link](https://developers.google.com/data-manager/api/devguides/accounts/partner-links) through
    which the credential's user has access to the `operatingAccount`.

    If a *parent* of the `operatingAccount` is linked to your data partner
    account, set the `linkedAccount` to the parent of the
    `operatingAccount`. If the `operatingAccount` is directly linked to your
    data partner account, don't set `linkedAccount`.

`productDestinationId`

:   The ID of the audience in the `operatingAccount` that receives the
    member data.

    {
      "operatingAccount": {
        "accountType": "OPERATING_ACCOUNT_TYPE",
        "accountId": "OPERATING_ACCOUNT_ID"
      },
      "loginAccount": {
        "accountType": "DATA_PARTNER",
        "accountId": "DATA_PARTNER_ACCOUNT_ID"
      },
      "linkedAccount": {
        "accountType": "LINKED_ACCOUNT_TYPE",
        "accountId": "LINKED_ACCOUNT_ID"
      },
      "productDestinationId": "AUDIENCE_ID"
    }

## Prepare audience data

Consider the following sample data. Each table corresponds to one member of the
audience. A member can have up to three email addresses, and may also have IP
address information or phone numbers.

Here's the audience member data:

### Member 1


| Member #1 ||
|---|---|
| `email_1` | `dana@example.com` |
| `email_2` | `DanaM@example.com` |
| `email_3` |   |
| `ip_1` | `192.0.2.211` |
| `ip_2` | `198.51.100.14` |

<br />

### Member 2


| Member #2 ||
|---|---|
| `email_1` | `ALEXF@example.com` |
| `email_2` | `AlexF@cymbalgroup.com` |
| `email_3` | `alexF@altostrat.com` |
| `phone_1` | `+1-800-555-0100` |
| `phone_2` | `+1 800-555-0101` |
| `phone_3` | `+1 800-555-0102` |

<br />

### Member 3


| Member #3 ||
|---|---|
| `email_1` | `quinn@CYMBALGROUP.com` |
| `email_2` | `baklavainthebalkans@gmail.com` |
| `email_3` |   |
| `ip_1` | `203.0.113.98` |
| `ip_1_start_time` | `Jun 10, 2026 8:17:52 PM EDT` |
| `ip_1_end_time` | `Jun 17, 2026 4:02:04.123 AM EDT` |

<br />

### Member 4


| Member #4 ||
|---|---|
| `email_1` | `rosario@example.org` |
| `email_2` | `cloudySanFrancisco@GMAIL.com` |
| `email_3` |   |
| `phone_1` | `+1-800-555-0110` |

<br />

### Format the data

Format the fields as specified in the [formatting
guide](https://developers.google.com/data-manager/api/devguides/concepts/formatting).

Here's the audience data after formatting:

### Member 1


| Member #1 ||
|---|---|
| `email_1` | `dana@example.com` |
| `email_2` | `danam@example.com` |
| `email_3` |   |
| `ip_1` | `192.0.2.211` |
| `ip_2` | `198.51.100.14` |

<br />

### Member 2


| Member #2 ||
|---|---|
| `email_1` | `alexf@example.com` |
| `email_2` | `alexf@cymbalgroup.com` |
| `email_3` | `alexf@altostrat.com` |
| `phone_1` | `+18005550100` |
| `phone_2` | `+18005550101` |
| `phone_3` | `+18005550102` |

<br />

### Member 3


| Member #3 ||
|---|---|
| `email_1` | `quinn@cymbalgroup.com` |
| `email_2` | `baklavainthebalkans@gmail.com` |
| `email_3` |   |
| `ip_1` | `203.0.113.98` |
| `ip_1_start_time` | `2026-06-10T20:17:52.0-04:00` |
| `ip_1_end_time` | `2026-06-17T04:02:04.123-04:00` |

<br />

### Member 4


| Member #4 ||
|---|---|
| `email_1` | `rosario@example.org` |
| `email_2` | `cloudysanfrancisco@gmail.com` |
| `email_3` |   |
| `phone_1` | `+18005550110` |

<br />

### Hash and encode the data

In addition, the formatted email addresses and phone numbers must be hashed
using the [SHA-256 algorithm](https://en.wikipedia.org/wiki/SHA-2) and encoded using either
[hexadecimal](https://en.wikipedia.org/wiki/Hexadecimal) (hex) or
[Base64 encoding](https://en.wikipedia.org/wiki/Base64). The examples in this
guide use hex encoding.

Don't hash IP addresses or timestamps.

Here's the data after being hashed and encoded:

### Member 1


| Member #1 ||
|---|---|
| `email_1` | `07e2f1394b0ea80e2adca010ea8318df697001a005ba7452720edda4b0ce57b3` |
| `email_2` | `1df6b43bc68dd38eca94e6a65b4f466ae537b796c81a526918b40ac4a7b906c7` |
| `email_3` |   |
| `ip_1` | `192.0.2.211` |
| `ip_2` | `198.51.100.14` |

<br />

### Member 2


| Member #2 ||
|---|---|
| `email_1` | `19de0a9906ebee29fe82087be5ec44f3c01e40730bc808b663c71f19dd6b12f2` |
| `email_2` | `7d2d80e240594dcee2e57f57885ee286c4b232dd142234d7a0af6d31cc86679b` |
| `email_3` | `063c45291827d4994f98357b72862b25885834fd53cf8f0e4af359916fc03c62` |
| `phone_1` | `fb4f73a6ec5fdb7077d564cdd22c3554b43ce49168550c3b12c547b78c517b30` |
| `phone_2` | `61d6c2976b5d92b1ad63073a12fddd26040cd980067d03a93dd1cc50f1a3ac68` |
| `phone_3` | `c5383c2eeada28210d27f011bc127d4f9562cf38ff0c9bba33dd45ae79b9fe7c` |

<br />

### Member 3


| Member #3 ||
|---|---|
| `email_1` | `05bb62526f091b45d20e243d194766cca8869137421047dc53fa4876d111a6f0` |
| `email_2` | `f1fcde379f31f4d446b76ee8f34860eca2288adc6b6d6c0fdc56d9eee75a2fa5` |
| `email_3` |   |
| `ip_1` | `203.0.113.98` |
| `ip_1_start_time` | `2026-06-10T20:17:52.0-04:00` |
| `ip_1_end_time` | `2026-06-17T04:02:04.123-04:00` |

<br />

### Member 4


| Member #4 ||
|---|---|
| `email_1` | `83a834cc5327bc4dee7c5408988040dc5813c7662611cd93b707aff72bf7d33f` |
| `email_2` | `223ebda6f6889b1494551ba902d9d381daf2f642bae055888e96343d53e9f9c4` |
| `email_3` |   |
| `phone_1` | `525c2390a4e2a9766fa8ddc341dd10414603baebefa401f5a5e29f55e176525d` |

<br />

Here's a sample `AudienceMember` for the first member in the sample data,
showing the formatted, hashed, and encoded email addresses, and the unhashed IP
addresses:

    {
      "compositeData": {
        "userData": {
          "userIdentifiers": [
            {
              "emailAddress": "07e2f1394b0ea80e2adca010ea8318df697001a005ba7452720edda4b0ce57b3"
            },
            {
              "emailAddress": "1df6b43bc68dd38eca94e6a65b4f466ae537b796c81a526918b40ac4a7b906c7"
            }
          ]
        },
        "ipData": [
          {
            "ipAddress": "192.0.2.211"
          },
          {
            "ipAddress": "198.51.100.14"
          }
        ]
      }
    }

### Composite data

There are two ways you can provide user identifiers for an
[`AudienceMember`](https://developers.google.com/data-manager/api/reference/rest/v1/AudienceMember) upload.

1. [`compositeData`](https://developers.google.com/data-manager/api/reference/rest/v1/AudienceMember#FIELDS.composite_data) (**Recommended**)

   This is the recommended approach for all integrations.

   Set the `compositeData` field on the `AudienceMember` to a [`CompositeData`](https://developers.google.com/data-manager/api/reference/rest/v1/AudienceMember#compositedata)
   object, which has a nested `userData` field where user identifiers can be
   provided. The functionality of the `userData` field within `compositeData`
   is the same as the functionality of the `userData` field on the
   `AudienceMember`.

   [`CompositeData`](https://developers.google.com/data-manager/api/reference/rest/v1/AudienceMember#compositedata) can contain one of the following:
   - **User identifiers only** : `userData` is populated with at least one [`UserIdentifier`](https://developers.google.com/data-manager/api/reference/rest/v1/UserData#UserIdentifier).
   - **IP address data only** : See [IP ingestion for Google Ads Customer Match](https://developers.google.com/data-manager/api/devguides/audiences/send-audience-members#send-ip-timestamp) for guidelines on populating `ipData` (supported for Google Ads Customer Match).
   - **Both user identifiers and IP address data** : `userData` and `ipData` are both populated with valid values. See [IP ingestion for Google Ads Customer Match](https://developers.google.com/data-manager/api/devguides/audiences/send-audience-members#send-ip-timestamp) for guidelines on populating `ipData` (supported for Google Ads Customer Match).

   > [!NOTE]
   > **Note:** [Sending IP address data](https://developers.google.com/data-manager/api/devguides/audiences/send-audience-members#send-ip-timestamp) is not supported for Display \& Video 360 Customer Match uploads. Display \& Video 360 users can still use `CompositeData` as long as *only* `userData` is populated.

2. [`userData`](https://developers.google.com/data-manager/api/reference/rest/v1/AudienceMember#FIELDS.user_data)

   You can also provide user identifiers by setting the `userData` field directly
   on the `AudienceMember` to a [`UserData`](https://developers.google.com/data-manager/api/reference/rest/v1/UserData) object.

   While `https://developers.google.com/data-manager/api/reference/rest/v1/AudienceMember#FIELDS.user_data`
   is still supported, we recommend using
   `https://developers.google.com/data-manager/api/reference/rest/v1/AudienceMember#FIELDS.composite_data`
   to ensure your integration is prepared for future improvements.

   <br />

### IP ingestion for Google Ads Customer Match

Data Manager API supports including IP addresses for Google Ads Customer Match uploads
in [`CompositeData`](https://developers.google.com/data-manager/api/reference/rest/v1/AudienceMember#compositedata). For each IP address, add an [`IpData`](https://developers.google.com/data-manager/api/reference/rest/v1/AudienceMember#ipdata) resource to the
`ipData` repeated field. Sending [`IpData`](https://developers.google.com/data-manager/api/reference/rest/v1/AudienceMember#ipdata) isn't supported for Display \& Video 360
Customer Match uploads.

[`IpData`](https://developers.google.com/data-manager/api/reference/rest/v1/AudienceMember#ipdata) contains a required `ipAddress` field and two optional timestamp
fields `observeStartTime` and `observeEndTime`, which represent when the IP
address was observed for the user. We recommend including these timestamp fields
to help improve Customer Match match rates.

> [!NOTE]
> **Note:** While we encourage you to include IP address and timestamp, match rate improvements from these signals are expected to begin in Q3 2026.

Here are the guidelines for including IP addresses:

- Both IPv4 and IPv6 are supported.
- Don't hash or encode these fields.
- See the formatting guide for [details on how to format the
  `ipAddress`](https://developers.google.com/data-manager/api/devguides/concepts/formatting#ipdata_format) and [timestamp fields](https://developers.google.com/data-manager/api/devguides/concepts/formatting#timestamp_format).
- Each object in the `ipData` list must contain a non-empty value for the `ipAddress` field. We recommend also sending `observeStartTime` and `observeEndTime`.
- You can send user identifiers and IP address data in your Google Ads Customer Match uploads by populating both `userData` and `ipData` in [`CompositeData`](https://developers.google.com/data-manager/api/reference/rest/v1/AudienceMember#compositedata). Make sure `userData` has at least one [`UserIdentifier`](https://developers.google.com/data-manager/api/reference/rest/v1/UserData#UserIdentifier).
- The destination audience must have `CONTACT_ID` in its [`uploadKeyTypes`](https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.userLists#IngestedUserListInfo.FIELDS.upload_key_types). Requests sending `compositeData` to audiences missing this key type will be rejected.

Here's the `AudienceMember` object for the third member of the sample data,
showing how to include `userData` and `ipData` (including observation
timestamps) nested within the `compositeData` field.

    {
      "compositeData": {
        "userData": {
          "userIdentifiers": [
            {
              "emailAddress": "05bb62526f091b45d20e243d194766cca8869137421047dc53fa4876d111a6f0"
            },
            {
              "emailAddress": "f1fcde379f31f4d446b76ee8f34860eca2288adc6b6d6c0fdc56d9eee75a2fa5"
            }
          ]
        },
        "ipData": [
          {
            "ipAddress": "203.0.113.98",
            "observeStartTime": "2026-06-10T20:17:52.0-04:00",
            "observeEndTime": "2026-06-17T04:02:04.123-04:00"
          }
        ]
      }
    }

> [!NOTE]
> **Note:** Google Ads does not support IP address matching for end users in the European Economic Area (EEA), United Kingdom (UK), or Switzerland (CH). Add logic to conditionally exclude sharing IP addresses from users from these regions and ensure that you provide users with clear and comprehensive information about the data you collect on your sites, apps, and other properties and get consent where required by law or any applicable Google policies.

## Build the request body

To build the request body, combine the `destinations` and `audienceMembers`, set
the `encoding` field, and add any other request fields you want to include such
as `validateOnly` and `consent`.

If sending audience members for Customer Match, set `termsOfService` to indicate
whether the user has accepted the [Customer Match terms of service](https://support.google.com/adspolicy/answer/6299717).

The examples in this guide don't use encryption, but you can follow the
instructions in [Encrypt user data](https://developers.google.com/data-manager/api/devguides/concepts/encryption) to add encryption to your
process.

## Send the request

Here are the steps to try a request from your browser:

1. Select the **REST** tab and click **Open in API Explorer** to open the API Explorer in a new tab or window.
2. In the request body in the API Explorer, replace each string beginning with `REPLACE_WITH`, such as `REPLACE_WITH_OPERATING_ACCOUNT_TYPE`, with the relevant value.
3. Click **Execute** at the bottom of the API Explorer page and complete the authorization prompts to send the request.
4. Set `validateOnly` to `true` to validate the request without applying the changes. When you're ready to apply the changes, set `validateOnly` to `false`.

If you [installed a client library](https://developers.google.com/data-manager/api/devguides/quickstart/install-library),
select the tab for your chosen programming language to see a complete code
sample of how to construct and send a request.

### REST

<br />

### Advertiser


[Open in API Explorer](https://developers.google.com/data-manager/api/reference/rest/v1/audienceMembers/ingest?apix=true&apix_params=%0A%7B%22resource%22:%7B%22destinations%22:%5B%7B%22operatingAccount%22:%7B%22accountType%22:%22REPLACE_WITH_OPERATING_ACCOUNT_TYPE%22,%22accountId%22:%22REPLACE_WITH_OPERATING_ACCOUNT_ID%22%7D,%22loginAccount%22:%7B%22accountType%22:%22REPLACE_WITH_LOGIN_ACCOUNT_TYPE%22,%22accountId%22:%22REPLACE_WITH_LOGIN_ACCOUNT_ID%22%7D,%22productDestinationId%22:%22REPLACE_WITH_AUDIENCE_ID%22%7D%5D,%22audienceMembers%22:%5B%7B%22compositeData%22:%7B%22userData%22:%7B%22userIdentifiers%22:%5B%7B%22emailAddress%22:%2207e2f1394b0ea80e2adca010ea8318df697001a005ba7452720edda4b0ce57b3%22%7D,%7B%22emailAddress%22:%221df6b43bc68dd38eca94e6a65b4f466ae537b796c81a526918b40ac4a7b906c7%22%7D%5D%7D,%22ipData%22:%5B%7B%22ipAddress%22:%22192.0.2.211%22%7D,%7B%22ipAddress%22:%22198.51.100.14%22%7D%5D%7D%7D,%7B%22compositeData%22:%7B%22userData%22:%7B%22userIdentifiers%22:%5B%7B%22emailAddress%22:%2219de0a9906ebee29fe82087be5ec44f3c01e40730bc808b663c71f19dd6b12f2%22%7D,%7B%22emailAddress%22:%227d2d80e240594dcee2e57f57885ee286c4b232dd142234d7a0af6d31cc86679b%22%7D,%7B%22emailAddress%22:%22063c45291827d4994f98357b72862b25885834fd53cf8f0e4af359916fc03c62%22%7D,%7B%22phoneNumber%22:%22fb4f73a6ec5fdb7077d564cdd22c3554b43ce49168550c3b12c547b78c517b30%22%7D,%7B%22phoneNumber%22:%2261d6c2976b5d92b1ad63073a12fddd26040cd980067d03a93dd1cc50f1a3ac68%22%7D,%7B%22phoneNumber%22:%22c5383c2eeada28210d27f011bc127d4f9562cf38ff0c9bba33dd45ae79b9fe7c%22%7D%5D%7D%7D%7D,%7B%22compositeData%22:%7B%22userData%22:%7B%22userIdentifiers%22:%5B%7B%22emailAddress%22:%2205bb62526f091b45d20e243d194766cca8869137421047dc53fa4876d111a6f0%22%7D,%7B%22emailAddress%22:%22f1fcde379f31f4d446b76ee8f34860eca2288adc6b6d6c0fdc56d9eee75a2fa5%22%7D%5D%7D,%22ipData%22:%5B%7B%22ipAddress%22:%22203.0.113.98%22,%22observeStartTime%22:%222026-06-10T20:17:52.0-04:00%22,%22observeEndTime%22:%222026-06-17T04:02:04.123-04:00%22%7D%5D%7D%7D,%7B%22compositeData%22:%7B%22userData%22:%7B%22userIdentifiers%22:%5B%7B%22emailAddress%22:%2283a834cc5327bc4dee7c5408988040dc5813c7662611cd93b707aff72bf7d33f%22%7D,%7B%22emailAddress%22:%22223ebda6f6889b1494551ba902d9d381daf2f642bae055888e96343d53e9f9c4%22%7D,%7B%22phoneNumber%22:%22525c2390a4e2a9766fa8ddc341dd10414603baebefa401f5a5e29f55e176525d%22%7D%5D%7D%7D%7D%5D,%22consent%22:%7B%22adUserData%22:%22CONSENT_GRANTED%22,%22adPersonalization%22:%22CONSENT_GRANTED%22%7D,%22encoding%22:%22HEX%22,%22termsOfService%22:%7B%22customerMatchTermsOfServiceStatus%22:%22ACCEPTED%22%7D,%22validateOnly%22:true%7D%7D "Open this sample in API Explorer")

```json
{
    "destinations": [
        {
            "operatingAccount": {
                "accountType": "OPERATING_ACCOUNT_TYPE",
                "accountId": "OPERATING_ACCOUNT_ID"
            },
            "loginAccount": {
                "accountType": "LOGIN_ACCOUNT_TYPE",
                "accountId": "LOGIN_ACCOUNT_ID"
            },
            "productDestinationId": "AUDIENCE_ID"
        }
    ],
    "audienceMembers": [
        {
            "compositeData": {
                "userData": {
                    "userIdentifiers": [
                        {
                            "emailAddress": "07e2f1394b0ea80e2adca010ea8318df697001a005ba7452720edda4b0ce57b3"
                        },
                        {
                            "emailAddress": "1df6b43bc68dd38eca94e6a65b4f466ae537b796c81a526918b40ac4a7b906c7"
                        }
                    ]
                },
                "ipData": [
                    {
                        "ipAddress": "192.0.2.211"
                    },
                    {
                        "ipAddress": "198.51.100.14"
                    }
                ]
            }
        },
        {
            "compositeData": {
                "userData": {
                    "userIdentifiers": [
                        {
                            "emailAddress": "19de0a9906ebee29fe82087be5ec44f3c01e40730bc808b663c71f19dd6b12f2"
                        },
                        {
                            "emailAddress": "7d2d80e240594dcee2e57f57885ee286c4b232dd142234d7a0af6d31cc86679b"
                        },
                        {
                            "emailAddress": "063c45291827d4994f98357b72862b25885834fd53cf8f0e4af359916fc03c62"
                        },
                        {
                            "phoneNumber": "fb4f73a6ec5fdb7077d564cdd22c3554b43ce49168550c3b12c547b78c517b30"
                        },
                        {
                            "phoneNumber": "61d6c2976b5d92b1ad63073a12fddd26040cd980067d03a93dd1cc50f1a3ac68"
                        },
                        {
                            "phoneNumber": "c5383c2eeada28210d27f011bc127d4f9562cf38ff0c9bba33dd45ae79b9fe7c"
                        }
                    ]
                }
            }
        },
        {
            "compositeData": {
                "userData": {
                    "userIdentifiers": [
                        {
                            "emailAddress": "05bb62526f091b45d20e243d194766cca8869137421047dc53fa4876d111a6f0"
                        },
                        {
                            "emailAddress": "f1fcde379f31f4d446b76ee8f34860eca2288adc6b6d6c0fdc56d9eee75a2fa5"
                        }
                    ]
                },
                "ipData": [
                    {
                        "ipAddress": "203.0.113.98",
                        "observeStartTime": "2026-06-10T20:17:52.0-04:00",
                        "observeEndTime": "2026-06-17T04:02:04.123-04:00"
                    }
                ]
            }
        },
        {
            "compositeData": {
                "userData": {
                    "userIdentifiers": [
                        {
                            "emailAddress": "83a834cc5327bc4dee7c5408988040dc5813c7662611cd93b707aff72bf7d33f"
                        },
                        {
                            "emailAddress": "223ebda6f6889b1494551ba902d9d381daf2f642bae055888e96343d53e9f9c4"
                        },
                        {
                            "phoneNumber": "525c2390a4e2a9766fa8ddc341dd10414603baebefa401f5a5e29f55e176525d"
                        }
                    ]
                }
            }
        }
    ],
    "consent": {
        "adUserData": "CONSENT_GRANTED",
        "adPersonalization": "CONSENT_GRANTED"
    },
    "encoding": "HEX",
    "termsOfService": {
        "customerMatchTermsOfServiceStatus": "ACCEPTED"
    },
    "validateOnly": true
}
```

<br />

### Data Partner


[Open in API Explorer](https://developers.google.com/data-manager/api/reference/rest/v1/audienceMembers/ingest?apix=true&apix_params=%0A%7B%22resource%22:%7B%22destinations%22:%5B%7B%22operatingAccount%22:%7B%22accountType%22:%22REPLACE_WITH_OPERATING_ACCOUNT_TYPE%22,%22accountId%22:%22REPLACE_WITH_OPERATING_ACCOUNT_ID%22%7D,%22loginAccount%22:%7B%22accountType%22:%22DATA_PARTNER%22,%22accountId%22:%22REPLACE_WITH_DATA_PARTNER_ACCOUNT_ID%22%7D,%22linkedAccount%22:%7B%22accountType%22:%22REPLACE_WITH_LINKED_ACCOUNT_TYPE%22,%22accountId%22:%22REPLACE_WITH_LINKED_ACCOUNT_ID%22%7D,%22productDestinationId%22:%22REPLACE_WITH_AUDIENCE_ID%22%7D%5D,%22audienceMembers%22:%5B%7B%22compositeData%22:%7B%22userData%22:%7B%22userIdentifiers%22:%5B%7B%22emailAddress%22:%2207e2f1394b0ea80e2adca010ea8318df697001a005ba7452720edda4b0ce57b3%22%7D,%7B%22emailAddress%22:%221df6b43bc68dd38eca94e6a65b4f466ae537b796c81a526918b40ac4a7b906c7%22%7D%5D%7D,%22ipData%22:%5B%7B%22ipAddress%22:%22192.0.2.211%22%7D,%7B%22ipAddress%22:%22198.51.100.14%22%7D%5D%7D%7D,%7B%22compositeData%22:%7B%22userData%22:%7B%22userIdentifiers%22:%5B%7B%22emailAddress%22:%2219de0a9906ebee29fe82087be5ec44f3c01e40730bc808b663c71f19dd6b12f2%22%7D,%7B%22emailAddress%22:%227d2d80e240594dcee2e57f57885ee286c4b232dd142234d7a0af6d31cc86679b%22%7D,%7B%22emailAddress%22:%22063c45291827d4994f98357b72862b25885834fd53cf8f0e4af359916fc03c62%22%7D,%7B%22phoneNumber%22:%22fb4f73a6ec5fdb7077d564cdd22c3554b43ce49168550c3b12c547b78c517b30%22%7D,%7B%22phoneNumber%22:%2261d6c2976b5d92b1ad63073a12fddd26040cd980067d03a93dd1cc50f1a3ac68%22%7D,%7B%22phoneNumber%22:%22c5383c2eeada28210d27f011bc127d4f9562cf38ff0c9bba33dd45ae79b9fe7c%22%7D%5D%7D%7D%7D,%7B%22compositeData%22:%7B%22userData%22:%7B%22userIdentifiers%22:%5B%7B%22emailAddress%22:%2205bb62526f091b45d20e243d194766cca8869137421047dc53fa4876d111a6f0%22%7D,%7B%22emailAddress%22:%22f1fcde379f31f4d446b76ee8f34860eca2288adc6b6d6c0fdc56d9eee75a2fa5%22%7D%5D%7D,%22ipData%22:%5B%7B%22ipAddress%22:%22203.0.113.98%22,%22observeStartTime%22:%222026-06-10T20:17:52.0-04:00%22,%22observeEndTime%22:%222026-06-17T04:02:04.123-04:00%22%7D%5D%7D%7D,%7B%22compositeData%22:%7B%22userData%22:%7B%22userIdentifiers%22:%5B%7B%22emailAddress%22:%2283a834cc5327bc4dee7c5408988040dc5813c7662611cd93b707aff72bf7d33f%22%7D,%7B%22emailAddress%22:%22223ebda6f6889b1494551ba902d9d381daf2f642bae055888e96343d53e9f9c4%22%7D,%7B%22phoneNumber%22:%22525c2390a4e2a9766fa8ddc341dd10414603baebefa401f5a5e29f55e176525d%22%7D%5D%7D%7D%7D%5D,%22consent%22:%7B%22adUserData%22:%22CONSENT_GRANTED%22,%22adPersonalization%22:%22CONSENT_GRANTED%22%7D,%22encoding%22:%22HEX%22,%22termsOfService%22:%7B%22customerMatchTermsOfServiceStatus%22:%22ACCEPTED%22%7D,%22validateOnly%22:true%7D%7D "Open this sample in API Explorer")

```json
{
    "destinations": [
        {
            "operatingAccount": {
                "accountType": "OPERATING_ACCOUNT_TYPE",
                "accountId": "OPERATING_ACCOUNT_ID"
            },
            "loginAccount": {
                "accountType": "DATA_PARTNER",
                "accountId": "DATA_PARTNER_ACCOUNT_ID"
            },
            "linkedAccount": {
                "accountType": "LINKED_ACCOUNT_TYPE",
                "accountId": "LINKED_ACCOUNT_ID"
            },
            "productDestinationId": "AUDIENCE_ID"
        }
    ],
    "audienceMembers": [
        {
            "compositeData": {
                "userData": {
                    "userIdentifiers": [
                        {
                            "emailAddress": "07e2f1394b0ea80e2adca010ea8318df697001a005ba7452720edda4b0ce57b3"
                        },
                        {
                            "emailAddress": "1df6b43bc68dd38eca94e6a65b4f466ae537b796c81a526918b40ac4a7b906c7"
                        }
                    ]
                },
                "ipData": [
                    {
                        "ipAddress": "192.0.2.211"
                    },
                    {
                        "ipAddress": "198.51.100.14"
                    }
                ]
            }
        },
        {
            "compositeData": {
                "userData": {
                    "userIdentifiers": [
                        {
                            "emailAddress": "19de0a9906ebee29fe82087be5ec44f3c01e40730bc808b663c71f19dd6b12f2"
                        },
                        {
                            "emailAddress": "7d2d80e240594dcee2e57f57885ee286c4b232dd142234d7a0af6d31cc86679b"
                        },
                        {
                            "emailAddress": "063c45291827d4994f98357b72862b25885834fd53cf8f0e4af359916fc03c62"
                        },
                        {
                            "phoneNumber": "fb4f73a6ec5fdb7077d564cdd22c3554b43ce49168550c3b12c547b78c517b30"
                        },
                        {
                            "phoneNumber": "61d6c2976b5d92b1ad63073a12fddd26040cd980067d03a93dd1cc50f1a3ac68"
                        },
                        {
                            "phoneNumber": "c5383c2eeada28210d27f011bc127d4f9562cf38ff0c9bba33dd45ae79b9fe7c"
                        }
                    ]
                }
            }
        },
        {
            "compositeData": {
                "userData": {
                    "userIdentifiers": [
                        {
                            "emailAddress": "05bb62526f091b45d20e243d194766cca8869137421047dc53fa4876d111a6f0"
                        },
                        {
                            "emailAddress": "f1fcde379f31f4d446b76ee8f34860eca2288adc6b6d6c0fdc56d9eee75a2fa5"
                        }
                    ]
                },
                "ipData": [
                    {
                        "ipAddress": "203.0.113.98",
                        "observeStartTime": "2026-06-10T20:17:52.0-04:00",
                        "observeEndTime": "2026-06-17T04:02:04.123-04:00"
                    }
                ]
            }
        },
        {
            "compositeData": {
                "userData": {
                    "userIdentifiers": [
                        {
                            "emailAddress": "83a834cc5327bc4dee7c5408988040dc5813c7662611cd93b707aff72bf7d33f"
                        },
                        {
                            "emailAddress": "223ebda6f6889b1494551ba902d9d381daf2f642bae055888e96343d53e9f9c4"
                        },
                        {
                            "phoneNumber": "525c2390a4e2a9766fa8ddc341dd10414603baebefa401f5a5e29f55e176525d"
                        }
                    ]
                }
            }
        }
    ],
    "consent": {
        "adUserData": "CONSENT_GRANTED",
        "adPersonalization": "CONSENT_GRANTED"
    },
    "encoding": "HEX",
    "termsOfService": {
        "customerMatchTermsOfServiceStatus": "ACCEPTED"
    },
    "validateOnly": true
}
```

<br />

### .NET

```
// Copyright 2025 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

using System.Text.Json;
using CommandLine;
using Google.Ads.DataManager.Util;
using Google.Ads.DataManager.V1;
using Google.Protobuf.WellKnownTypes;
using static Google.Ads.DataManager.V1.ProductAccount.Types;

namespace Google.Ads.DataManager.Samples
{
    // <summary>
    // Sends a <see cref="IngestAudienceMembersRequest" /> without using encryption.
    //
    // User data is read from a data file. See the <c>audience_members_1.json</c> file in the
    // <c>sampledata</c> directory for an example.
    // </summary>
    public class IngestAudienceMembers
    {
        private static readonly int MaxMembersPerRequest = 10_000;

        [Verb(
            "ingest-audience-members",
            HelpText = "Sends an IngestAudienceMembersRequest without using encryption."
        )]
        public class Options
        {
            [Option(
                "operatingAccountType",
                Required = true,
                HelpText = "Account type of the operating account"
            )]
            public AccountType OperatingAccountType { get; set; }

            [Option(
                "operatingAccountId",
                Required = true,
                HelpText = "ID of the operating account"
            )]
            public string OperatingAccountId { get; set; } = null!;

            [Option(
                "loginAccountType",
                Required = false,
                HelpText = "Account type of the login account"
            )]
            public AccountType? LoginAccountType { get; set; }

            [Option("loginAccountId", Required = false, HelpText = "ID of the login account")]
            public string? LoginAccountId { get; set; }

            [Option(
                "linkedAccountType",
                Required = false,
                HelpText = "Account type of the linked account"
            )]
            public AccountType? LinkedAccountType { get; set; }

            [Option("linkedAccountId", Required = false, HelpText = "ID of the linked account")]
            public string? LinkedAccountId { get; set; }

            [Option("audienceId", Required = true, HelpText = "ID of the audience")]
            public string AudienceId { get; set; } = null!;

            [Option(
                "jsonFile",
                Required = true,
                HelpText = "JSON file containing user data to ingest"
            )]
            public string JsonFile { get; set; } = null!;

            [Option(
                "validateOnly",
                Default = true,
                HelpText = "Whether to enable validateOnly on the request"
            )]
            public bool ValidateOnly { get; set; }
        }

        public void Run(Options options)
        {
            RunExample(
                options.OperatingAccountType,
                options.OperatingAccountId,
                options.LoginAccountType,
                options.LoginAccountId,
                options.LinkedAccountType,
                options.LinkedAccountId,
                options.AudienceId,
                options.JsonFile,
                options.ValidateOnly
            );
        }

        // Runs the example.
        private void RunExample(
            AccountType operatingAccountType,
            string operatingAccountId,
            AccountType? loginAccountType,
            string? loginAccountId,
            AccountType? linkedAccountType,
            string? linkedAccountId,
            string audienceId,
            string jsonFile,
            bool validateOnly
        )
        {
            if (loginAccountId == null ^ loginAccountType == null)
            {
                throw new ArgumentException(
                    "Must specify either both or neither of login account ID and login account "
                        + "type"
                );
            }
            if (linkedAccountId == null ^ linkedAccountType == null)
            {
                throw new ArgumentException(
                    "Must specify either both or neither of linked account ID and linked account "
                        + "type"
                );
            }

            // Reads the audience members from the JSON file.
            List<Member> memberList = ReadMemberData(jsonFile);

            // Creates a factory that will be used to generate the appropriate data manager.
            var userDataFormatter = new UserDataFormatter();

            var audienceMembers = new List<AudienceMember>();

            // Processes each batch of audience members.
            foreach (var member in memberList)
            {
                var compositeData = new CompositeData();
                var userDataBuilder = new UserData();

                // Adds a UserIdentifier for each valid email address for the member.
                foreach (var email in member.Emails)
                {
                    try
                    {
                        string processedEmail = userDataFormatter.ProcessEmailAddress(
                            email,
                            UserDataFormatter.Encoding.Hex
                        );
                        // Sets the email address identifier to the encoded hash.
                        userDataBuilder.UserIdentifiers.Add(
                            new UserIdentifier { EmailAddress = processedEmail }
                        );
                    }
                    catch (ArgumentException)
                    {
                        // Skips invalid input.
                        continue;
                    }
                }

                // Adds a UserIdentifier for each valid phone number for the member.
                foreach (var phoneNumber in member.PhoneNumbers)
                {
                    try
                    {
                        string processedPhoneNumber = userDataFormatter.ProcessPhoneNumber(
                            phoneNumber,
                            UserDataFormatter.Encoding.Hex
                        );
                        // Sets the phone number identifier to the encoded hash.
                        userDataBuilder.UserIdentifiers.Add(
                            new UserIdentifier { PhoneNumber = processedPhoneNumber }
                        );
                    }
                    catch (ArgumentException)
                    {
                        // Skips invalid input.
                        continue;
                    }
                }

                // Adds IP address information for each valid entry for the member.
                var ipDatas = new List<IpData>();
                foreach (var ipInfo in member.IpInfos)
                {
                    if (operatingAccountType != AccountType.GoogleAds)
                    {
                        Console.WriteLine(
                            $"Skipping IP address information for operating account type {operatingAccountType}. "
                                + "Sending IP address is only supported for operating account type GOOGLE_ADS."
                        );
                        continue;
                    }

                    string processedIpAddress = (ipInfo.IpAddress ?? "").Trim();
                    if (string.IsNullOrEmpty(processedIpAddress))
                    {
                        Console.WriteLine("Skipping IP address information with no IP address");
                        continue;
                    }

                    var ipData = new IpData { IpAddress = processedIpAddress };

                    string startTimeString = (ipInfo.ObserveStartTime ?? "").Trim();
                    if (!string.IsNullOrEmpty(startTimeString))
                    {
                        try
                        {
                            ipData.ObserveStartTime = Timestamp.FromDateTime(
                                DateTime.Parse(startTimeString).ToUniversalTime()
                            );
                        }
                        catch (FormatException)
                        {
                            Console.WriteLine(
                                $"Ignoring observe start time '{startTimeString}' since it can't be parsed"
                            );
                        }
                    }

                    string endTimeString = (ipInfo.ObserveEndTime ?? "").Trim();
                    if (!string.IsNullOrEmpty(endTimeString))
                    {
                        try
                        {
                            ipData.ObserveEndTime = Timestamp.FromDateTime(
                                DateTime.Parse(endTimeString).ToUniversalTime()
                            );
                        }
                        catch (FormatException)
                        {
                            Console.WriteLine(
                                $"Ignoring observe end time '{endTimeString}' since it can't be parsed"
                            );
                        }
                    }

                    ipDatas.Add(ipData);
                }

                if (userDataBuilder.UserIdentifiers.Any() || ipDatas.Any())
                {
                    if (userDataBuilder.UserIdentifiers.Any())
                    {
                        compositeData.UserData = userDataBuilder;
                    }
                    if (ipDatas.Any())
                    {
                        compositeData.IpData.AddRange(ipDatas);
                    }
                    audienceMembers.Add(new AudienceMember { CompositeData = compositeData });
                }
            }

            // Builds the Destination for the request.
            var destinationBuilder = new Destination
            {
                // The destination account for the data.
                OperatingAccount = new ProductAccount
                {
                    AccountType = operatingAccountType,
                    AccountId = operatingAccountId,
                },
                // The ID of the user list that is being updated.
                ProductDestinationId = audienceId,
            };

            if (loginAccountType.HasValue && loginAccountId != null)
            {
                destinationBuilder.LoginAccount = new ProductAccount
                {
                    AccountType = loginAccountType.Value,
                    AccountId = loginAccountId,
                };
            }

            if (linkedAccountType.HasValue && linkedAccountId != null)
            {
                destinationBuilder.LinkedAccount = new ProductAccount
                {
                    AccountType = linkedAccountType.Value,
                    AccountId = linkedAccountId,
                };
            }

            IngestionServiceClient ingestionServiceClient = IngestionServiceClient.Create();

            int requestCount = 0;

            // Batches requests to send up to the maximum number of audience members per request.
            for (var i = 0; i < audienceMembers.Count; i += MaxMembersPerRequest)
            {
                IEnumerable<AudienceMember> membersBatch = audienceMembers
                    .Skip(i)
                    .Take(MaxMembersPerRequest);
                requestCount++;
                // Builds the request.
                var request = new IngestAudienceMembersRequest
                {
                    Destinations = { destinationBuilder },
                    // Adds members from the current batch.
                    AudienceMembers = { membersBatch },
                    Consent = new Consent
                    {
                        AdPersonalization = ConsentStatus.ConsentGranted,
                        AdUserData = ConsentStatus.ConsentGranted,
                    },
                    // Sets validate_only. If true, then the Data Manager API only validates the
                    // request but doesn't apply changes.
                    ValidateOnly = validateOnly,
                    Encoding = V1.Encoding.Hex,
                    TermsOfService = new TermsOfService
                    {
                        CustomerMatchTermsOfServiceStatus = TermsOfServiceStatus.Accepted,
                    },
                };

                // Logs the request.
                Console.WriteLine($"Request #{requestCount}:\n{request}");

                // Sends the data to the Data Manager API.
                IngestAudienceMembersResponse response =
                    ingestionServiceClient.IngestAudienceMembers(request);
                Console.WriteLine($"Response for request #{requestCount}:\n{response}");
            }
            Console.WriteLine($"# of requests sent: {requestCount}");
        }

        private class Member
        {
            public List<string> Emails { get; set; } = new List<string>();
            public List<string> PhoneNumbers { get; set; } = new List<string>();
            public List<IpInfo> IpInfos { get; set; } = new List<IpInfo>();

            public class IpInfo
            {
                public string? IpAddress { get; set; }
                public string? ObserveStartTime { get; set; }
                public string? ObserveEndTime { get; set; }
            }
        }

        private List<Member> ReadMemberData(string jsonFile)
        {
            string jsonString = File.ReadAllText(jsonFile);
            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
            return JsonSerializer.Deserialize<List<Member>>(jsonString, options)
                ?? new List<Member>();
        }
    }
}
```

### Java

```java
// Copyright 2025 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.ads.datamanager.samples;

import com.beust.jcommander.Parameter;
import com.google.ads.datamanager.samples.common.BaseParamsConfig;
import com.google.ads.datamanager.util.Encrypter;
import com.google.ads.datamanager.util.UserDataFormatter;
import com.google.ads.datamanager.util.UserDataFormatter.Encoding;
import com.google.ads.datamanager.v1.AudienceMember;
import com.google.ads.datamanager.v1.CompositeData;
import com.google.ads.datamanager.v1.Consent;
import com.google.ads.datamanager.v1.ConsentStatus;
import com.google.ads.datamanager.v1.Destination;
import com.google.ads.datamanager.v1.EncryptionInfo;
import com.google.ads.datamanager.v1.GcpWrappedKeyInfo;
import com.google.ads.datamanager.v1.GcpWrappedKeyInfo.KeyType;
import com.google.ads.datamanager.v1.IngestAudienceMembersRequest;
import com.google.ads.datamanager.v1.IngestAudienceMembersResponse;
import com.google.ads.datamanager.v1.IngestionServiceClient;
import com.google.ads.datamanager.v1.IpData;
import com.google.ads.datamanager.v1.ProductAccount;
import com.google.ads.datamanager.v1.ProductAccount.AccountType;
import com.google.ads.datamanager.v1.TermsOfService;
import com.google.ads.datamanager.v1.TermsOfServiceStatus;
import com.google.ads.datamanager.v1.UserData;
import com.google.ads.datamanager.v1.UserIdentifier;
import com.google.common.base.Strings;
import com.google.common.collect.Lists;
import com.google.common.reflect.TypeToken;
import com.google.gson.GsonBuilder;
import com.google.protobuf.util.Timestamps;
import java.io.BufferedReader;
import java.io.IOException;
import java.lang.reflect.Type;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.GeneralSecurityException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Sends an {@link IngestAudienceMembersRequest} with the option to use encryption.
 *
 * <p>User data is read from a data file. See the {@code audience_members_1.json} file in the {@code
 * resources/sampledata} directory for a sample file.
 */
public class IngestAudienceMembers {
  private static final Logger LOGGER = Logger.getLogger(IngestAudienceMembers.class.getName());

  /** The maximum number of audience members allowed per request. */
  private static final int MAX_MEMBERS_PER_REQUEST = 10_000;

  private static final class ParamsConfig extends BaseParamsConfig<ParamsConfig> {

    @Parameter(
        names = "--operatingAccountType",
        required = true,
        description = "Account type of the operating account")
    AccountType operatingAccountType;

    @Parameter(
        names = "--operatingAccountId",
        required = true,
        description = "ID of the operating account")
    String operatingAccountId;

    @Parameter(
        names = "--loginAccountType",
        required = false,
        description = "Account type of the login account")
    AccountType loginAccountType;

    @Parameter(
        names = "--loginAccountId",
        required = false,
        description = "ID of the login account")
    String loginAccountId;

    @Parameter(
        names = "--linkedAccountType",
        required = false,
        description = "Account type of the linked account")
    AccountType linkedAccountType;

    @Parameter(
        names = "--linkedAccountId",
        required = false,
        description = "ID of the linked account")
    String linkedAccountId;

    @Parameter(names = "--audienceId", required = true, description = "ID of the audience")
    String audienceId;

    @Parameter(
        names = "--jsonFile",
        required = true,
        description = "JSON file containing user data to ingest")
    String jsonFile;

    @Parameter(
        names = "--keyUri",
        required = false,
        description =
            "URI of the Google Cloud KMS key for encrypting data. If this parameter is set, you"
                + " must also set the --wipProvider parameter.")
    String keyUri;

    @Parameter(
        names = "--wipProvider",
        required = false,
        description =
            "Workload Identity Pool provider name for encrypting data. If this parameter is set,"
                + " you must also set the --keyUri parameter. The argument for this parameter must"
                + " follow the pattern:"
                + " projects/PROJECT_ID/locations/global/workloadIdentityPools/WIP_ID/providers/PROVIDER_ID")
    String wipProvider;

    @Parameter(
        names = "--validateOnly",
        required = false,
        arity = 1,
        description = "Whether to enable validateOnly on the request")
    boolean validateOnly = true;
  }

  public static void main(String[] args) throws IOException, GeneralSecurityException {
    ParamsConfig paramsConfig = new ParamsConfig().parseOrExit(args);
    if ((paramsConfig.loginAccountId == null) != (paramsConfig.loginAccountType == null)) {
      throw new IllegalArgumentException(
          "Must specify either both or neither of login account ID and login account type");
    }
    if ((paramsConfig.linkedAccountId == null) != (paramsConfig.linkedAccountType == null)) {
      throw new IllegalArgumentException(
          "Must specify either both or neither of linked account ID and linked account type");
    }
    if ((paramsConfig.keyUri == null) != (paramsConfig.wipProvider == null)) {
      throw new IllegalArgumentException(
          "Must specify either both or neither of key URI and WIP provider");
    }
    new IngestAudienceMembers().runExample(paramsConfig);
  }

  /**
   * Runs the example.
   *
   * @param params the parameters for the example
   */
  private void runExample(ParamsConfig params) throws IOException, GeneralSecurityException {
    // Reads member data from the data file.
    List<Member> memberList = readMemberData(params.jsonFile);

    // Gets an instance of the UserDataFormatter for normalizing and formatting the data.
    UserDataFormatter userDataFormatter = UserDataFormatter.create();

    // Determines if encryption parameters are set.
    boolean useEncryption = (params.keyUri != null && params.wipProvider != null);
    Encrypter encrypter = null;
    if (useEncryption) {
      // Gets an instance of the encryption utility.
      encrypter = Encrypter.createForGcpKms(params.keyUri, null);
    }
    // Builds the audience_members collection for the request.
    List<AudienceMember> audienceMembers = new ArrayList<>();
    for (Member member : memberList) {
      // Creates a builder for CompositeData to add user data and/or IP address information.
      CompositeData.Builder compositeDataBuilder = CompositeData.newBuilder();

      // Creates a builder for user data for hashed emails and phone numbers.
      UserData.Builder userDataBuilder = compositeDataBuilder.getUserDataBuilder();

      // Adds a UserIdentifier for each valid email address for the member.
      for (String email : member.emails) {
        String processedEmail;
        try {
          processedEmail =
              useEncryption
                  ? userDataFormatter.processEmailAddress(email, Encoding.HEX, encrypter)
                  : userDataFormatter.processEmailAddress(email, Encoding.HEX);
        } catch (IllegalArgumentException iae) {
          // Skips invalid input.
          continue;
        }
        // Sets the email address identifier to the encoded and possibly encrypted email hash.
        userDataBuilder.addUserIdentifiers(
            UserIdentifier.newBuilder().setEmailAddress(processedEmail));
      }

      // Adds a UserIdentifier for each valid phone number for the member.
      for (String phoneNumber : member.phoneNumbers) {
        String processedPhoneNumber;
        try {
          processedPhoneNumber =
              useEncryption
                  ? userDataFormatter.processPhoneNumber(phoneNumber, Encoding.HEX, encrypter)
                  : userDataFormatter.processPhoneNumber(phoneNumber, Encoding.HEX);
        } catch (IllegalArgumentException iae) {
          // Skips invalid input.
          continue;
        }
        // Sets the phone number identifier to the encoded and possibly encrypted phone number
        // hash.
        userDataBuilder.addUserIdentifiers(
            UserIdentifier.newBuilder().setPhoneNumber(processedPhoneNumber));
      }

      // Adds IP address information for each valid entry for the member.
      for (Member.IpInfo ipInfo : member.ipInfos) {
        if (!AccountType.GOOGLE_ADS.equals(params.operatingAccountType)) {
          LOGGER.log(
              Level.INFO,
              "Skipping IP address information for operating account type {0}. "
                  + "Sending IP address is only supported for operating account type {1}.",
              new Object[] {params.operatingAccountType, AccountType.GOOGLE_ADS});
        }

        // Trims leading and trailing whitespace from the IP address.
        String processedIpAddress = Strings.nullToEmpty(ipInfo.ipAddress).trim();
        if (processedIpAddress.isEmpty()) {
          // Skips the IP information from the input file since it is missing IP address, which is
          // required.
          LOGGER.info("Skipping IP address information with no IP address");
          continue;
        }

        // Creates an IpData builder and sets its IP address.
        IpData.Builder ipDataBuilder =
            compositeDataBuilder.addIpDataBuilder().setIpAddress(processedIpAddress);

        // Adds observe start time to the IpData if present and in the expected timestamp format.
        String startTimeString = Strings.nullToEmpty(ipInfo.observeStartTime).trim();
        if (!startTimeString.isEmpty()) {
          try {
            ipDataBuilder.setObserveStartTime(Timestamps.parse(startTimeString));
          } catch (ParseException e) {
            LOGGER.log(
                Level.INFO,
                "Ignoring observe start time '{0} since it can't be parsed",
                startTimeString);
          }
        }

        // Adds observe end time to the IpData if present and in the expected timestamp format.
        String endTimeString = Strings.nullToEmpty(ipInfo.observeEndTime).trim();
        if (!endTimeString.isEmpty()) {
          try {
            ipDataBuilder.setObserveEndTime(Timestamps.parse(endTimeString));
          } catch (ParseException e) {
            LOGGER.log(
                Level.INFO,
                "Ignoring observe end time '{0}' since it can't be parsed",
                endTimeString);
          }
        }
      }

      if (userDataBuilder.getUserIdentifiersCount() > 0
          || compositeDataBuilder.getIpDataCount() > 0) {
        // Adds the CompositeData containing user data, IP address information, or both.
        audienceMembers.add(
            AudienceMember.newBuilder().setCompositeData(compositeDataBuilder).build());
      }
    }

    // Builds the Destination for the request.
    Destination.Builder destinationBuilder =
        Destination.newBuilder()
            .setOperatingAccount(
                ProductAccount.newBuilder()
                    .setAccountType(params.operatingAccountType)
                    .setAccountId(params.operatingAccountId))
            .setProductDestinationId(params.audienceId);
    if (params.loginAccountType != null && params.loginAccountId != null) {
      destinationBuilder.setLoginAccount(
          ProductAccount.newBuilder()
              .setAccountType(params.loginAccountType)
              .setAccountId(params.loginAccountId));
    }
    if (params.linkedAccountType != null && params.linkedAccountId != null) {
      destinationBuilder.setLinkedAccount(
          ProductAccount.newBuilder()
              .setAccountType(params.linkedAccountType)
              .setAccountId(params.linkedAccountId));
    }

    // Configures the EncryptionInfo for the request if encryption parameters provided.
    EncryptionInfo encryptionInfo = null;
    if (useEncryption) {
      encryptionInfo =
          EncryptionInfo.newBuilder()
              .setGcpWrappedKeyInfo(
                  GcpWrappedKeyInfo.newBuilder()
                      .setKekUri(params.keyUri)
                      .setWipProvider(params.wipProvider)
                      .setKeyType(KeyType.XCHACHA20_POLY1305)
                      // Sets the encrypted_dek field to the Base64-encoded encrypted DEK.
                      .setEncryptedDek(
                          userDataFormatter.base64Encode(
                              encrypter.getEncryptedDek().toByteArray())))
              .build();
    }

    try (IngestionServiceClient ingestionServiceClient = IngestionServiceClient.create()) {
      int requestCount = 0;
      // Batches requests to send up to the maximum number of audience members per request.
      for (List<AudienceMember> audienceMembersBatch :
          Lists.partition(audienceMembers, MAX_MEMBERS_PER_REQUEST)) {
        requestCount++;
        // Builds the request.
        IngestAudienceMembersRequest.Builder requestBuilder =
            IngestAudienceMembersRequest.newBuilder()
                .addDestinations(destinationBuilder)
                // Adds members from the current batch.
                .addAllAudienceMembers(audienceMembersBatch)
                .setConsent(
                    Consent.newBuilder()
                        .setAdPersonalization(ConsentStatus.CONSENT_GRANTED)
                        .setAdUserData(ConsentStatus.CONSENT_GRANTED))
                // Sets validate_only. If true, then the Data Manager API only validates the request
                // but doesn't apply changes.
                .setValidateOnly(params.validateOnly)
                // Sets encoding to match the encoding used.
                .setEncoding(com.google.ads.datamanager.v1.Encoding.HEX)
                .setTermsOfService(
                    TermsOfService.newBuilder()
                        .setCustomerMatchTermsOfServiceStatus(TermsOfServiceStatus.ACCEPTED));

        if (useEncryption) {
          // Sets encryption info on the request.
          requestBuilder.setEncryptionInfo(encryptionInfo);
        }

        // Builds and logs the request.
        IngestAudienceMembersRequest request = requestBuilder.build();
        if (LOGGER.isLoggable(Level.INFO)) {
          LOGGER.info(String.format("Request #%d:%n%s", requestCount, request));
        }

        // Sends the request.
        IngestAudienceMembersResponse response =
            ingestionServiceClient.ingestAudienceMembers(request);

        // Logs the response.
        if (LOGGER.isLoggable(Level.INFO)) {
          LOGGER.info(String.format("Response for request #%d:%n%s", requestCount, response));
        }
      }
      LOGGER.info("# of requests sent: " + requestCount);
    }
  }

  /** Data object for a single row of input data. */
  @SuppressWarnings("unused")
  private static class Member {
    private List<String> emails = new ArrayList<>();
    private List<String> phoneNumbers = new ArrayList<>();
    private List<IpInfo> ipInfos = new ArrayList<>();

    private static class IpInfo {
      private String ipAddress;
      private String observeStartTime;
      private String observeEndTime;
    }
  }

  /**
   * Reads the data file and parses it into a list of {@link IngestAudienceMembers.Member} objects.
   *
   * @param jsonFile the JSON data file
   * @return a list of Member objects
   */
  private List<Member> readMemberData(String jsonFile) throws IOException {
    try (BufferedReader jsonReader =
        Files.newBufferedReader(Paths.get(jsonFile), StandardCharsets.UTF_8)) {
      // Define the type for Gson to deserialize into (List of Member objects)
      Type recordListType = new TypeToken<ArrayList<Member>>() {}.getType();

      // Parse the JSON string from the file into a List of Member objects
      return new GsonBuilder().create().fromJson(jsonReader, recordListType);
    }
  }
}
```

### Node

```javascript
#!/usr/bin/env node
// Copyright 2025 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

import {IngestionServiceClient} from '@google-ads/datamanager';
import {protos} from '@google-ads/datamanager';
const {
  AudienceMember,
  CompositeData,
  Destination,
  Encoding: DataManagerEncoding,
  Consent,
  ConsentStatus,
  IngestAudienceMembersRequest,
  IpData,
  ProductAccount,
  TermsOfService,
  TermsOfServiceStatus,
  UserData,
  UserIdentifier,
} = protos.google.ads.datamanager.v1;
import {UserDataFormatter, Encoding} from '@google-ads/data-manager-util';
import * as fs from 'fs';
import * as yargs from 'yargs';

const MAX_MEMBERS_PER_REQUEST = 10000;

interface Arguments {
  operating_account_type: string;
  operating_account_id: string;
  audience_id: string;
  json_file: string;
  validate_only: boolean;
  login_account_type?: string;
  login_account_id?: string;
  linked_account_type?: string;
  linked_account_id?: string;
  [x: string]: unknown;
}

interface MemberRow {
  emails?: string[];
  phoneNumbers?: string[];
  ipInfos?: {
    ipAddress: string;
    observeStartTime?: string;
    observeEndTime?: string;
  }[];
}

/**
 * The main function for the IngestAudienceMembers sample.
 */
async function main() {
  const argv: Arguments = yargs
    .option('operating_account_type', {
      describe: 'The account type of the operating account.',
      type: 'string',
      required: true,
    })
    .option('operating_account_id', {
      describe: 'The ID of the operating account.',
      type: 'string',
      required: true,
    })
    .option('audience_id', {
      describe: 'The ID of the destination audience.',
      type: 'string',
      required: true,
    })
    .option('json_file', {
      describe: 'JSON file containing user data to ingest.',
      type: 'string',
      required: true,
    })
    .option('validate_only', {
      describe: 'Whether to enable validate_only on the request.',
      type: 'boolean',
      default: true,
    })
    .option('login_account_type', {
      describe: 'The account type of the login account.',
      type: 'string',
    })
    .option('login_account_id', {
      describe: 'The ID of the login account.',
      type: 'string',
    })
    .option('linked_account_type', {
      describe: 'The account type of the linked account.',
      type: 'string',
    })
    .option('linked_account_id', {
      describe: 'The ID of the linked account.',
      type: 'string',
    })
    .option('config', {
      describe: 'Path to a JSON file with arguments.',
      type: 'string',
    })
    .config('config')
    .check((args: Arguments) => {
      if (
        (args.login_account_type && !args.login_account_id) ||
        (!args.login_account_type && args.login_account_id)
      ) {
        throw new Error(
          'Must specify either both or neither of login account type and ' +
            'login account ID',
        );
      }
      if (
        (args.linked_account_type && !args.linked_account_id) ||
        (!args.linked_account_type && args.linked_account_id)
      ) {
        throw new Error(
          'Must specify either both or neither of linked account ' +
            'type and linked account ID',
        );
      }
      return true;
    })
    .parseSync();

  const formatter = new UserDataFormatter();

  const memberRows: MemberRow[] = await readMemberData(argv.json_file);

  // Converts the operating account type argument to the corresponding enum
  // so IP address checks can compare enums to enums.
  const operatingAccountType = convertToAccountType(
    argv.operating_account_type,
    'operating_account_type',
  );

  // Builds the audience_members collection for the request.
  const audienceMembers = [];
  for (const memberRow of memberRows) {
    const userData = UserData.create();

    // Adds a UserIdentifier for each valid email address for the member.
    for (const email of memberRow.emails || []) {
      try {
        const processedEmail = formatter.processEmailAddress(
          email,
          Encoding.HEX,
        );
        userData.userIdentifiers.push(
          UserIdentifier.create({emailAddress: processedEmail}),
        );
      } catch (e) {
        // Skip invalid input.
      }
    }

    // Adds a UserIdentifier for each valid phone number for the member.
    for (const phone of memberRow.phoneNumbers || []) {
      try {
        const processedPhone = formatter.processPhoneNumber(
          phone,
          Encoding.HEX,
        );
        userData.userIdentifiers.push(
          UserIdentifier.create({phoneNumber: processedPhone}),
        );
      } catch (e) {
        // Skip invalid input.
      }
    }

    // Process IP address information
    const ipDatas = [];
    for (const ipInfo of memberRow.ipInfos || []) {
      if (operatingAccountType !== ProductAccount.AccountType.GOOGLE_ADS) {
        console.log(
          `Skipping IP address information for operating account type ${operatingAccountType}. ` +
            'Sending IP address is only supported for operating account type GOOGLE_ADS.',
        );
        continue;
      }

      const ipAddress = (ipInfo.ipAddress || '').trim();
      if (!ipAddress) {
        console.log('Skipping IP address information with no IP address');
        continue;
      }

      const ipData = IpData.create({ipAddress});

      if (ipInfo.observeStartTime) {
        const startTimeStr = ipInfo.observeStartTime.trim();
        if (startTimeStr) {
          try {
            const date = new Date(startTimeStr);
            if (isNaN(date.getTime())) {
              throw new Error('Invalid date');
            }
            ipData.observeStartTime = {
              seconds: Math.floor(date.getTime() / 1000),
              nanos: (date.getTime() % 1000) * 1e6,
            };
          } catch (e) {
            console.log(
              `Ignoring observe start time '${startTimeStr}' since it can't be parsed`,
            );
          }
        }
      }

      if (ipInfo.observeEndTime) {
        const endTimeStr = ipInfo.observeEndTime.trim();
        if (endTimeStr) {
          try {
            const date = new Date(endTimeStr);
            if (isNaN(date.getTime())) {
              throw new Error('Invalid date');
            }
            ipData.observeEndTime = {
              seconds: Math.floor(date.getTime() / 1000),
              nanos: (date.getTime() % 1000) * 1e6,
            };
          } catch (e) {
            console.log(
              `Ignoring observe end time '${endTimeStr}' since it can't be parsed`,
            );
          }
        }
      }

      ipDatas.push(ipData);
    }

    if (userData.userIdentifiers.length > 0 || ipDatas.length > 0) {
      const compositeData = CompositeData.create();
      if (userData.userIdentifiers.length > 0) {
        compositeData.userData = userData;
      }
      if (ipDatas.length > 0) {
        compositeData.ipData = ipDatas;
      }
      audienceMembers.push(AudienceMember.create({compositeData}));
    } else {
      console.warn('Ignoring line. No data.');
    }
  }

  const destination = Destination.create({
    operatingAccount: ProductAccount.create({
      accountType: operatingAccountType,
      accountId: argv.operating_account_id,
    }),
    productDestinationId: argv.audience_id,
  });

  // The login account is optional.
  if (argv.login_account_type) {
    const loginAccountType = convertToAccountType(
      argv.login_account_type,
      'login_account_type',
    );
    destination.loginAccount = ProductAccount.create({
      accountType: loginAccountType,
      accountId: argv.login_account_id,
    });
  }

  // The linked account is optional.
  if (argv.linked_account_type) {
    const linkedAccountType = convertToAccountType(
      argv.linked_account_type,
      'linked_account_type',
    );
    destination.linkedAccount = ProductAccount.create({
      accountType: linkedAccountType,
      accountId: argv.linked_account_id,
    });
  }

  const client = new IngestionServiceClient();

  let requestCount = 0;
  // Batches requests to send up to the maximum number of audience members per request.
  for (let i = 0; i < audienceMembers.length; i += MAX_MEMBERS_PER_REQUEST) {
    requestCount++;
    const audienceMembersBatch = audienceMembers.slice(
      i,
      i + MAX_MEMBERS_PER_REQUEST,
    );

    const request = IngestAudienceMembersRequest.create({
      destinations: [destination],
      // Adds members from the current batch.
      audienceMembers: audienceMembersBatch,
      consent: Consent.create({
        adUserData: ConsentStatus.CONSENT_GRANTED,
        adPersonalization: ConsentStatus.CONSENT_GRANTED,
      }),
      termsOfService: TermsOfService.create({
        customerMatchTermsOfServiceStatus: TermsOfServiceStatus.ACCEPTED,
      }),
      // Sets encoding to match the encoding used.
      encoding: DataManagerEncoding.HEX,
      // Sets validate_only. If true, then the Data Manager API only validates the request
      // but doesn't apply changes.
      validateOnly: argv.validate_only,
    });

    console.log(`Request #${requestCount}:\n `, request);

    const [response] = await client.ingestAudienceMembers(request);
    console.log(`Response for request #${requestCount}:\n `, response);
  }
  console.log(`# of requests sent: ${requestCount}`);
}

/**
 * Reads the user data from the given JSON file.
 * @param {string} jsonFile The path to the JSON file.
 * @return {Promise<MemberRow[]>} A promise that resolves with an array of user data.
 */
async function readMemberData(jsonFile: string): Promise<MemberRow[]> {
  const data = await fs.promises.readFile(jsonFile, 'utf8');
  return JSON.parse(data) as MemberRow[];
}

/**
 * Validates that a given string is an enum value for the AccountType enum, and
 * if validation passes, returns the AccountType enum value.
 * @param proposedValue the name of an AccountType enum value
 * @param paramName the name of the parameter to use in the error message if validation fails
 * @returns {protos.google.ads.datamanager.v1.ProductAccount.AccountType} The corresponding enum value.
 * @throws {Error} If the string is not an AccountType enum value.
 */
function convertToAccountType(
  proposedValue: string,
  paramName: string,
): protos.google.ads.datamanager.v1.ProductAccount.AccountType {
  const AccountType = ProductAccount.AccountType;
  const accountTypeEnumNames = Object.keys(AccountType).filter(key =>
    isNaN(Number(key)),
  );
  if (!accountTypeEnumNames.includes(proposedValue)) {
    throw new Error(`Invalid ${paramName}: ${proposedValue}`);
  }
  return AccountType[proposedValue as keyof typeof AccountType];
}

if (require.main === module) {
  main().catch(console.error);
}
```

### PHP

```php
<?php
// Copyright 2025 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Sample of sending an IngestAudienceMembersRequest without encryption.
 */

require_once dirname(__DIR__, 1) . '/vendor/autoload.php';

use Google\Ads\DataManager\V1\AudienceMember;
use Google\Ads\DataManager\V1\Client\IngestionServiceClient;
use Google\Ads\DataManager\V1\CompositeData;
use Google\Ads\DataManager\V1\Consent;
use Google\Ads\DataManager\V1\ConsentStatus;
use Google\Ads\DataManager\V1\Destination;
use Google\Ads\DataManager\V1\Encoding as DataManagerEncoding;
use Google\Ads\DataManager\V1\IngestAudienceMembersRequest;
use Google\Ads\DataManager\V1\IpData;
use Google\Ads\DataManager\V1\ProductAccount;
use Google\Ads\DataManager\V1\ProductAccount\AccountType;
use Google\Ads\DataManager\V1\TermsOfService;
use Google\Ads\DataManager\V1\TermsOfServiceStatus;
use Google\Ads\DataManager\V1\UserData;
use Google\Ads\DataManager\V1\UserIdentifier;
use Google\Ads\DataManagerUtil\Encoding;
use Google\Ads\DataManagerUtil\Formatter;
use Google\ApiCore\ApiException;
use Google\Protobuf\Timestamp;

/**
 * Reads the JSON member data file.
 *
 * @param string $jsonFile The member data file. Expected format is a JSON array of
 * objects, where each object can contain "emails" and "phoneNumbers" arrays.
 * @return array A list of associative arrays, each representing a member.
 */
function readMemberData(string $jsonFile): array
{
    $content = file_get_contents($jsonFile);
    if ($content === false) {
        throw new \RuntimeException(sprintf('Could not read JSON file: %s', $jsonFile));
    }
    $data = json_decode($content, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new \RuntimeException(sprintf('Error decoding JSON: %s', json_last_error_msg()));
    }
    return $data;
}

/**
 * Runs the sample.
 *
 * @param int $operatingAccountType The account type of the operating account.
 * @param string $operatingAccountId The ID of the operating account.
 * @param string $audienceId The ID of the destination audience.
 * @param string $jsonFile The JSON file containing member data.
 * @param bool $validateOnly Whether to enable validateOnly on the request.
 * @param int|null $loginAccountType The account type of the login account.
 * @param string|null $loginAccountId The ID of the login account.
 * @param int|null $linkedAccountType The account type of the linked account.
 * @param string|null $linkedAccountId The ID of the linked account.
 */
function main(
    int $operatingAccountType,
    string $operatingAccountId,
    string $audienceId,
    string $jsonFile,
    bool $validateOnly,
    ?int $loginAccountType = null,
    ?string $loginAccountId = null,
    ?int $linkedAccountType = null,
    ?string $linkedAccountId = null
): void {
    // Reads member data from the data file.
    $memberRows = readMemberData($jsonFile);

    // Gets an instance of the UserDataFormatter for normalizing and formatting the data.
    $formatter = new Formatter();

    // Builds the audience_members collection for the request.
    $audienceMembers = [];
    foreach ($memberRows as $memberRow) {
        $identifiers = [];
        // Adds a UserIdentifier for each valid email address for the member.
        $emails = $memberRow['emails'] ?? [];
        foreach ($emails as $email) {
            try {
                // Formats, hashes, and encodes the email address.
                $processedEmail = $formatter->processEmailAddress($email, Encoding::Hex);
                // Sets the email address identifier to the encoded email hash.
                $identifiers[] = (new UserIdentifier())->setEmailAddress($processedEmail);
            } catch (\InvalidArgumentException $e) {
                // Skips invalid input.
                error_log(sprintf('Skipping invalid email: %s', $e->getMessage()));
                continue;
            }
        }

        // Adds a UserIdentifier for each valid phone number for the member.
        $phoneNumbers = $memberRow['phoneNumbers'] ?? [];
        foreach ($phoneNumbers as $phone) {
            try {
                // Formats, hashes, and encodes the phone number.
                $processedPhone = $formatter->processPhoneNumber($phone, Encoding::Hex);
                // Sets the phone number identifier to the encoded phone number hash.
                $identifiers[] = (new UserIdentifier())->setPhoneNumber($processedPhone);
            } catch (\InvalidArgumentException $e) {
                // Skips invalid input.
                error_log(sprintf('Skipping invalid phone: %s', $e->getMessage()));
                continue;
            }
        }

        // Adds IP address information for each valid entry for the member.
        $ipDatas = [];
        $ipInfos = $memberRow['ipInfos'] ?? [];
        foreach ($ipInfos as $ipInfo) {
            if ($operatingAccountType !== AccountType::GOOGLE_ADS) {
                error_log(sprintf(
                    'Skipping IP address information for operating account type %s. '
                    . 'Sending IP address is only supported for operating account type GOOGLE_ADS.',
                    AccountType::name($operatingAccountType)
                ));
                continue;
            }

            // Trims leading and trailing whitespace from the IP address.
            $ipAddress = trim($ipInfo['ipAddress'] ?? '');
            if (empty($ipAddress)) {
                // Skips the IP information from the input file since it is missing IP address, which is
                // required.
                error_log('Skipping IP address information with no IP address');
                continue;
            }

            // Creates an IpData message and sets its IP address.
            $ipData = (new IpData())->setIpAddress($ipAddress);

            // Adds observe start time to the IpData if present and in the expected timestamp format.
            $startTimeStr = trim($ipInfo['observeStartTime'] ?? '');
            if (!empty($startTimeStr)) {
                try {
                    $startTime = new Timestamp();
                    $startTime->fromDateTime(new \DateTime($startTimeStr));
                    $ipData->setObserveStartTime($startTime);
                } catch (\Exception $e) {
                    error_log(sprintf("Ignoring observe start time '%s' since it can't be parsed", $startTimeStr));
                }
            }

            // Adds observe end time to the IpData if present and in the expected timestamp format.
            $endTimeStr = trim($ipInfo['observeEndTime'] ?? '');
            if (!empty($endTimeStr)) {
                try {
                    $endTime = new Timestamp();
                    $endTime->fromDateTime(new \DateTime($endTimeStr));
                    $ipData->setObserveEndTime($endTime);
                } catch (\Exception $e) {
                    error_log(sprintf("Ignoring observe end time '%s' since it can't be parsed", $endTimeStr));
                }
            }

            $ipDatas[] = $ipData;
        }

        if (!empty($identifiers) || !empty($ipDatas)) {
            $compositeData = new CompositeData();
            if (!empty($identifiers)) {
                $userData = (new UserData())->setUserIdentifiers($identifiers);
                $compositeData->setUserData($userData);
            }
            if (!empty($ipDatas)) {
                $compositeData->setIpData($ipDatas);
            }

            // Adds an AudienceMember with the CompositeData.
            $audienceMember = (new AudienceMember())->setCompositeData($compositeData);
            $audienceMembers[] = $audienceMember;
        }
    }

    // Builds the destination for the request.
    $destination = new Destination();
    $destination->setOperatingAccount(new ProductAccount()
        ->setAccountType($operatingAccountType)
        ->setAccountId($operatingAccountId));

    if ($loginAccountType !== null && $loginAccountId !== null) {
        $destination->setLoginAccount(new ProductAccount()
            ->setAccountType($loginAccountType)
            ->setAccountId($loginAccountId));
    }

    if ($linkedAccountType !== null && $linkedAccountId !== null) {
        $destination->setLinkedAccount(new ProductAccount()
            ->setAccountType($linkedAccountType)
            ->setAccountId($linkedAccountId));
    }

    $destination->setProductDestinationId($audienceId);

    // Builds the request.
    $request = (new IngestAudienceMembersRequest())
        ->setDestinations([$destination])
        ->setAudienceMembers($audienceMembers)
        ->setConsent((new Consent())
            ->setAdUserData(ConsentStatus::CONSENT_GRANTED)
            ->setAdPersonalization(ConsentStatus::CONSENT_GRANTED)
        )
        ->setTermsOfService((new TermsOfService())
            ->setCustomerMatchTermsOfServiceStatus(TermsOfServiceStatus::ACCEPTED)
        )
        // Sets encoding to match the encoding used.
        ->setEncoding(DataManagerEncoding::HEX)
        // Sets validate_only to true to validate but not apply the changes in the request.
        ->setValidateOnly(true);

    // Creates a client for the ingestion service.
    $client = new IngestionServiceClient();
    try {
        // Logs the request.
        echo "Request:\n" . json_encode(json_decode($request->serializeToJsonString()), JSON_PRETTY_PRINT) . "\n";

        // Sends the request.
        $response = $client->ingestAudienceMembers($request);
        echo "Response:\n" . json_encode(json_decode($response->serializeToJsonString()), JSON_PRETTY_PRINT) . "\n";
    } catch (ApiException $e) {
        echo 'Error sending request: ' . $e->getMessage() . "\n";
    } finally {
        $client->close();
    }
}

// Command-line argument parsing
$options = getopt(
    '',
    [
        'operating_account_type:',
        'operating_account_id:',
        'login_account_type::',
        'login_account_id::',
        'linked_account_type::',
        'linked_account_id::',
        'audience_id:',
        'json_file:',
        'validate_only::'
    ]
);

$operatingAccountType = $options['operating_account_type'] ?? null;
$operatingAccountId = $options['operating_account_id'] ?? null;
$audienceId = $options['audience_id'] ?? null;
$jsonFile = $options['json_file'] ?? null;

// Only validates requests by default.
$validateOnly = true;
if (array_key_exists('validate_only', $options)) {
    $value = $options['validate_only'];
    // `getopt` with `::` returns boolean `false` if the option is passed without a value.
    if ($value === false || !in_array($value, ['true', 'false'], true)) {
        echo "Error: --validate_only requires a value of 'true' or 'false'.\n";
        exit(1);
    }
    $validateOnly = ($value === 'true');
}

if (empty($operatingAccountType) || empty($operatingAccountId) || empty($audienceId) || empty($jsonFile)) {
    echo 'Usage: php ingest_audience_members.php ' .
        '--operating_account_type=<account_type> ' .
        '--operating_account_id=<account_id> ' .
        '--audience_id=<audience_id> ' .
        "--json_file=<path_to_json>\n" .
        'Optional: --login_account_type=<account_type> --login_account_id=<account_id> ' .
        '--linked_account_type=<account_type> --linked_account_id=<account_id> ' .
        "--validate_only=<true|false>\n";
    exit(1);
}

// Converts the operating account type string to an AccountType enum.
$parsedOperatingAccountType = AccountType::value($operatingAccountType);

if (isset($options['login_account_type']) != isset($options['login_account_id'])) {
    throw new \InvalidArgumentException(
        'Must specify either both or neither of login account type and login account ID'
    );
}

$parsedLoginAccountType = null;
if (isset($options['login_account_type'])) {
    // Converts the login account type string to an AccountType enum.
    $parsedLoginAccountType = AccountType::value($options['login_account_type']);
}

if (isset($options['linked_account_type']) != isset($options['linked_account_id'])) {
    throw new \InvalidArgumentException(
        'Must specify either both or neither of linked account type and linked account ID'
    );
}

$parsedLinkedAccountType = null;
if (isset($options['linked_account_type'])) {
    // Converts the linked account type string to an AccountType enum.
    $parsedLinkedAccountType = AccountType::value($options['linked_account_type']);
}

main(
    $parsedOperatingAccountType,
    $operatingAccountId,
    $audienceId,
    $jsonFile,
    $validateOnly,
    $parsedLoginAccountType,
    $options['login_account_id'] ?? null,
    $parsedLinkedAccountType,
    $options['linked_account_id'] ?? null
);
```

### Python

```python
#!/usr/bin/env python
# Copyright 2025 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
"""Sample of sending an IngestAudienceMembersRequest with the option to use encryption."""

import argparse
import json
import logging
from typing import Any, Dict, List, Optional

from google.ads import datamanager_v1
from google.ads.datamanager_util import Encrypter
from google.ads.datamanager_util import Formatter
from google.ads.datamanager_util.format import Encoding
from google.protobuf.timestamp_pb2 import Timestamp

_logger = logging.getLogger(__name__)

# The maximum number of audience members allowed per request.
_MAX_MEMBERS_PER_REQUEST = 10_000


def main(
    operating_account_type: str,
    operating_account_id: str,
    audience_id: str,
    json_file: str,
    validate_only: bool,
    login_account_type: Optional[str] = None,
    login_account_id: Optional[str] = None,
    linked_account_type: Optional[str] = None,
    linked_account_id: Optional[str] = None,
    key_uri: str = None,
    wip_provider: str = None,
) -> None:
    """Runs the sample.

    Args:
     operating_account_type: the account type of the operating account.
     operating_account_id: the ID of the operating account.
     audience_id: the ID of the destination audience.
     json_file: the JSON file containing member data.
     validate_only: whether to enable validate_only on the request.
     login_account_type: the account type of the login account.
     login_account_id: the ID of the login account.
     linked_account_type: the account type of the linked account.
     linked_account_id: the ID of the linked account.
     key_uri: the URI of the Google Cloud KMS key.
     wip_provider: the Workload Identity Pool provider name. Must follow the pattern:
       projects/PROJECT_ID/locations/global/workloadIdentityPools/WIP_ID/providers/PROVIDER_ID
    """

    # Validates parameter pairs.
    if bool(login_account_type) != bool(login_account_id):
        raise ValueError(
            "Must specify either both or neither of login account type and login account ID"
        )
    if bool(linked_account_type) != bool(linked_account_id):
        raise ValueError(
            "Must specify either both or neither of linked account type and linked account ID"
        )
    if bool(key_uri) != bool(wip_provider):
        raise ValueError(
            "Must specify either both or neither of key URI and WIP provider"
        )

    # Gets an instance of the formatter.
    formatter: Formatter = Formatter()

    # Determines if encryption parameters are set.
    use_encryption: bool = key_uri and wip_provider

    encrypter: Encrypter = None
    if use_encryption:
        # Creates an instance of the encryption utility.
        encrypter = Encrypter.create_for_gcp_kms(key_uri)

    # Reads the input file.
    member_rows: List[Dict[str, Any]] = read_member_data(json_file)
    audience_members: List[datamanager_v1.AudienceMember] = []
    member_row: Dict[str, Any]
    for member_row in member_rows:
        composite_data = datamanager_v1.CompositeData()
        user_data = datamanager_v1.UserData()
        email: str
        for email in member_row.get("emails", []):
            try:
                processed_email: str = formatter.process_email_address(
                    email, Encoding.HEX, encrypter
                )
                user_data.user_identifiers.append(
                    datamanager_v1.UserIdentifier(email_address=processed_email)
                )
            except ValueError:
                # Skips invalid input.
                continue
        phone: str
        for phone in member_row.get("phoneNumbers", []):
            try:
                processed_phone: str = formatter.process_phone_number(
                    phone, Encoding.HEX, encrypter
                )
                user_data.user_identifiers.append(
                    datamanager_v1.UserIdentifier(phone_number=processed_phone)
                )
            except ValueError:
                # Skips invalid input.
                continue

        for ip_info in member_row.get("ipInfos", []):
            if (
                operating_account_type
                != datamanager_v1.ProductAccount.AccountType.GOOGLE_ADS.name
            ):
                _logger.info(
                    "Skipping IP address information for operating account type %s. "
                    "Sending IP address is only supported for operating account type GOOGLE_ADS.",
                    operating_account_type,
                )
                continue

            ip_address = ip_info.get("ipAddress", "").strip()
            if not ip_address:
                _logger.info(
                    "Skipping IP address information with no IP address"
                )
                continue

            ip_data = datamanager_v1.IpData(ip_address=ip_address)

            start_time_str = ip_info.get("observeStartTime", "").strip()
            if start_time_str:
                try:
                    start_time = Timestamp()
                    start_time.FromJsonString(start_time_str)
                    ip_data.observe_start_time = start_time
                except ValueError:
                    _logger.info(
                        "Ignoring observe start time '%s' since it can't be parsed",
                        start_time_str,
                    )

            end_time_str = ip_info.get("observeEndTime", "").strip()
            if end_time_str:
                try:
                    end_time = Timestamp()
                    end_time.FromJsonString(end_time_str)
                    ip_data.observe_end_time = end_time
                except ValueError:
                    _logger.info(
                        "Ignoring observe end time '%s' since it can't be parsed",
                        end_time_str,
                    )

            composite_data.ip_data.append(ip_data)

        if user_data.user_identifiers or composite_data.ip_data:
            if user_data.user_identifiers:
                composite_data.user_data = user_data
            audience_member = datamanager_v1.AudienceMember(
                composite_data=composite_data
            )
            audience_members.append(audience_member)

    # Configures the destination.
    destination: datamanager_v1.Destination = datamanager_v1.Destination()
    destination.operating_account.account_type = operating_account_type
    destination.operating_account.account_id = operating_account_id
    if login_account_type or login_account_id:
        destination.login_account.account_type = login_account_type
        destination.login_account.account_id = login_account_id
    if linked_account_type or linked_account_id:
        destination.linked_account.account_type = linked_account_type
        destination.linked_account.account_id = linked_account_id

    destination.product_destination_id = audience_id

    # Configures the EncryptionInfo for the request if encryption parameters provided.
    if use_encryption:
        encryption_info: datamanager_v1.EncryptionInfo = (
            datamanager_v1.EncryptionInfo(
                gcp_wrapped_key_info=datamanager_v1.GcpWrappedKeyInfo(
                    kek_uri=key_uri,
                    wip_provider=wip_provider,
                    key_type=datamanager_v1.GcpWrappedKeyInfo.KeyType.XCHACHA20_POLY1305,
                    # Sets the encrypted_dek field to the Base64-encoded encrypted DEK.
                    encrypted_dek=formatter.base64_encode(
                        encrypter.encrypted_dek_bytes
                    ),
                )
            )
        )

    # Creates a client for the ingestion service.
    client: datamanager_v1.IngestionServiceClient = (
        datamanager_v1.IngestionServiceClient()
    )

    # Batches requests to send up to the maximum number of audience members per
    # request.
    request_count = 0
    for i in range(0, len(audience_members), _MAX_MEMBERS_PER_REQUEST):
        request_count += 1
        audience_members_batch = audience_members[
            i : i + _MAX_MEMBERS_PER_REQUEST
        ]
        # Sends the request.
        request: datamanager_v1.IngestAudienceMembersRequest = (
            datamanager_v1.IngestAudienceMembersRequest(
                destinations=[destination],
                # Adds members from the current batch.
                audience_members=audience_members_batch,
                consent=datamanager_v1.Consent(
                    ad_user_data=datamanager_v1.ConsentStatus.CONSENT_GRANTED,
                    ad_personalization=datamanager_v1.ConsentStatus.CONSENT_GRANTED,
                ),
                terms_of_service=datamanager_v1.TermsOfService(
                    customer_match_terms_of_service_status=datamanager_v1.TermsOfServiceStatus.ACCEPTED,
                ),
                # Sets encoding to match the encoding used.
                encoding=datamanager_v1.Encoding.HEX,
                # Sets validate_only. If true, then the Data Manager API only
                # validates the request but doesn't apply changes.
                validate_only=validate_only,
            )
        )

        if use_encryption:
            # Sets encryption info on the request.
            request.encryption_info = encryption_info

        # Logs the request.
        _logger.info("Request #%d:\n%s", request_count, request)

        # Sends the request.
        response: datamanager_v1.IngestAudienceMembersResponse = (
            client.ingest_audience_members(request=request)
        )

        # Logs the response.
        _logger.info("Response for request #%d:\n%s", request_count, response)

    _logger.info("# of requests sent: %d", request_count)


def read_member_data(json_file: str) -> List[Dict[str, Any]]:
    """Reads the JSON member data file.

    Args:
      json_file: the member data file. Expected format is a JSON array of
        objects, where each object can contain "emails" and "phoneNumbers"
        arrays.
    """
    with open(json_file, "r") as f:
        return json.load(f)


if __name__ == "__main__":
    # Configures logging.
    logging.basicConfig(level=logging.INFO)

    parser = argparse.ArgumentParser(
        description=(
            "Sends audience members from a CSV file to a destination."
        ),
        fromfile_prefix_chars="@",
    )
    # The following argument(s) should be provided to run the example.
    parser.add_argument(
        "--operating_account_type",
        type=str,
        required=True,
        help="The account type of the operating account.",
    )
    parser.add_argument(
        "--operating_account_id",
        type=str,
        required=True,
        help="The ID of the operating account.",
    )
    parser.add_argument(
        "--login_account_type",
        type=str,
        required=False,
        help="The account type of the login account.",
    )
    parser.add_argument(
        "--login_account_id",
        type=str,
        required=False,
        help="The ID of the login account.",
    )
    parser.add_argument(
        "--linked_account_type",
        type=str,
        required=False,
        help="The account type of the linked account.",
    )
    parser.add_argument(
        "--linked_account_id",
        type=str,
        required=False,
        help="The ID of the linked account.",
    )
    parser.add_argument(
        "--audience_id",
        type=str,
        required=True,
        help="The ID of the destination audience.",
    )
    parser.add_argument(
        "--json_file",
        type=str,
        required=True,
        help="JSON file containing user data to ingest.",
    )
    parser.add_argument(
        "--key_uri",
        type=str,
        required=False,
        help="URI of the Google Cloud KMS key for encrypting data. If this parameter is set, you "
        + "must also set the --wip_provider parameter.",
    )
    parser.add_argument(
        "--wip_provider",
        type=str,
        required=False,
        help="Workload Identity Pool provider name for encrypting data. If this parameter is set, "
        + "you must also set the --key_uri parameter. The argument for this parameter must follow "
        + "the pattern: "
        + "projects/PROJECT_ID/locations/global/workloadIdentityPools/WIP_ID/providers/PROVIDER_ID",
    )
    parser.add_argument(
        "--validate_only",
        choices=["true", "false"],
        default="true",
        help="Whether to enable validate_only on the request. Must be 'true' or 'false'. "
        + "Defaults to 'true'.",
    )
    args = parser.parse_args()

    main(
        args.operating_account_type,
        args.operating_account_id,
        args.audience_id,
        args.json_file,
        args.validate_only == "true",
        args.login_account_type,
        args.login_account_id,
        args.linked_account_type,
        args.linked_account_id,
        args.key_uri,
        args.wip_provider,
    )
```

## Success responses

A successful request returns a response with an object containing a `requestId`.

    {
      "requestId": "126365e1-16d0-4c81-9de9-f362711e250a"
    }

Record the `requestId` returned so you can retrieve [diagnostics](https://developers.google.com/data-manager/api/devguides/diagnostics)
as each destination in the request is processed.

> [!NOTE]
> **Note:** You can only retrieve diagnostics for requests that succeed and don't have `validateOnly` set to `true`.

## Failure responses

A failed request results in an error response status code such as `400 Bad
Request`, and a response with error details.

For example, an `emailAddress` containing a plain text string instead of a hex
encoded value produces the following response:

    {
      "error": {
        "code": 400,
        "message": "There was a problem with the request.",
        "status": "INVALID_ARGUMENT",
        "details": [
          {
            "@type": "type.googleapis.com/google.rpc.ErrorInfo",
            "reason": "INVALID_ARGUMENT",
            "domain": "datamanager.googleapis.com"
          },
          {
            "@type": "type.googleapis.com/google.rpc.BadRequest",
            "fieldViolations": [
              {
                "field": "audience_members.audience_members[0].composite_data.user_data.user_identifiers",
                "description": "Email is not hex encoded.",
                "reason": "INVALID_HEX_ENCODING"
              }
            ]
          }
        ]
      }
    }

An `emailAddress` that isn't hashed and is only hex encoded produces the
following response:

    {
      "error": {
        "code": 400,
        "message": "There was a problem with the request.",
        "status": "INVALID_ARGUMENT",
        "details": [
          {
            "@type": "type.googleapis.com/google.rpc.ErrorInfo",
            "reason": "INVALID_ARGUMENT",
            "domain": "datamanager.googleapis.com"
          },
          {
            "@type": "type.googleapis.com/google.rpc.BadRequest",
            "fieldViolations": [
              {
                "field": "audience_members.audience_members[0].composite_data.user_data",
                "reason": "INVALID_SHA256_FORMAT"
              }
            ]
          }
        ]
      }
    }

## Send events for multiple destinations

If your data contains audience members for different destinations, you can send
them in the same request by using destination references. See [Limits and
quotas](https://developers.google.com/data-manager/api/devguides/limits#request_limits) for the maximum number of destinations per request.

For example, if you have an audience member for user list ID `11112222` and
another audience member for user list ID `77778888`, send both audience members
in a single request by setting the `reference` of each `Destination`. The
`reference` is user-defined---the only requirement is that each
`Destination` has a unique `reference`. Here's the modified `destinations` list
for the request:

### Advertiser

      "destinations": [
        {
          "operatingAccount": {
            "accountType": "OPERATING_ACCOUNT_TYPE",
            "accountId": "OPERATING_ACCOUNT_ID"
          },
          "loginAccount": {
            "accountType": "LOGIN_ACCOUNT_TYPE",
            "accountId": "LOGIN_ACCOUNT_ID"
          },
          "productDestinationId": "11112222",
          "reference": "audience_1"
        },
        {
          "operatingAccount": {
            "accountType": "OPERATING_ACCOUNT_2_TYPE",
            "accountId": "OPERATING_ACCOUNT_2_ID"
          },
          "loginAccount": {
            "accountType": "LOGIN_ACCOUNT_2_TYPE",
            "accountId": "LOGIN_ACCOUNT_2_ID"
          },
          "productDestinationId": "77778888",
          "reference": "audience_2"
        }
      ]

### Data Partner

      "destinations": [
        {
          "operatingAccount": {
            "accountType": "OPERATING_ACCOUNT_TYPE",
            "accountId": "OPERATING_ACCOUNT_ID"
          },
          "loginAccount": {
            "accountType": "DATA_PARTNER",
            "accountId": "DATA_PARTNER_ACCOUNT_ID"
          },
          "linkedAccount": {
            "accountType": "LINKED_ACCOUNT_TYPE",
            "accountId": "LINKED_ACCOUNT_ID"
          },
          "productDestinationId": "11112222",
          "reference": "audience_1"
        },
        {
          "operatingAccount": {
            "accountType": "OPERATING_ACCOUNT_2_TYPE",
            "accountId": "OPERATING_ACCOUNT_2_ID"
          },
          "loginAccount": {
            "accountType": "DATA_PARTNER",
            "accountId": "DATA_PARTNER_ACCOUNT_2_ID"
          },
          "linkedAccount": {
            "accountType": "LINKED_ACCOUNT_2_TYPE",
            "accountId": "LINKED_ACCOUNT_2_ID"
          },
          "productDestinationId": "77778888",
          "reference": "audience_2"
        }
      ]

Set the `destination_references` of each `AudienceMember` to send it to one or
more specific destinations. For example, here's an `AudienceMember` that's only
for the first `Destination`, so its `destination_references` list only contains
the `reference` of the first `Destination`:

    {
      "compositeData": {
        "userData": {
          "userIdentifiers": [
            {
              "emailAddress": "07e2f1394b0ea80e2adca010ea8318df697001a005ba7452720edda4b0ce57b3"
            },
            {
              "emailAddress": "1df6b43bc68dd38eca94e6a65b4f466ae537b796c81a526918b40ac4a7b906c7"
            }
          ]
        }
      },
      "destinationReferences": [
        "audience_1"
      ]
    }

The `destination_references` field is a list, so you can specify multiple
destinations for an audience member. If you don't set the
`destination_references` of an `AudienceMember`, the Data Manager API sends the
audience member to all of the destinations in the request.

## Next steps

- [Configure](https://developers.google.com/data-manager/api/devguides/quickstart/set-up-access) authentication and setup your environment with a client library.
- Learn about the [formatting, hashing, and encoding requirements](https://developers.google.com/data-manager/api/devguides/concepts/formatting) for each type of data.
- Learn how to [encrypt user data](https://developers.google.com/data-manager/api/devguides/concepts/encryption).
- Learn how to [retrieve diagnostics](https://developers.google.com/data-manager/api/devguides/diagnostics) for your requests.
- Learn about [best practices](https://developers.google.com/data-manager/api/devguides/concepts/best-practices).
- Learn about [limits and quotas](https://developers.google.com/data-manager/api/devguides/limits).
