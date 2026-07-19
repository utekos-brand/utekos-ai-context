# Consent

- [JSON representation](https://developers.google.com/data-manager/api/reference/rest/v1/Consent#SCHEMA_REPRESENTATION)
- [ConsentStatus](https://developers.google.com/data-manager/api/reference/rest/v1/Consent#ConsentStatus)

[Digital Markets Act (DMA)](https://digital-markets-act.ec.europa.eu/index_en) consent settings for the user.

| JSON representation |
|---|
| ``` { "adUserData": enum (`https://developers.google.com/data-manager/api/reference/rest/v1/Consent#ConsentStatus`), "adPersonalization": enum (`https://developers.google.com/data-manager/api/reference/rest/v1/Consent#ConsentStatus`) } ``` |

| Fields ||
|---|---|
| `adUserData` | ``enum (`https://developers.google.com/data-manager/api/reference/rest/v1/Consent#ConsentStatus`)`` Optional. Represents if the user consents to ad user data. |
| `adPersonalization` | ``enum (`https://developers.google.com/data-manager/api/reference/rest/v1/Consent#ConsentStatus`)`` Optional. Represents if the user consents to ad personalization. |

## ConsentStatus

Represents if the user granted, denied, or hasn't specified consent.

| Enums ||
|---|---|
| `CONSENT_STATUS_UNSPECIFIED` | Not specified. |
| `CONSENT_GRANTED` | Granted. |
| `CONSENT_DENIED` | Denied. |
