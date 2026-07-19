The Data Manager API supports uploading multiple types of user data. Follow the
formatting, hashing, and encoding requirements for each data element so that
your data is received and processed successfully.

- [`UserData`](https://developers.google.com/data-manager/api/devguides/concepts/formatting#userdata_format): User-provided data such as an email address or phone number.
- [`IpData`](https://developers.google.com/data-manager/api/devguides/concepts/formatting#ipdata_format): IP data such as an IP address and associated timestamps.
- [`PairData`](https://developers.google.com/data-manager/api/devguides/concepts/formatting#pairdata_format): [Publisher Advertiser Identity
  Reconciliation](https://support.google.com/admanager/answer/15067908) (PAIR) IDs.
- [`MobileData`](https://developers.google.com/data-manager/api/devguides/concepts/formatting#mobiledata_format): Data identifying a mobile device.

## `UserData` requirements

A [`UserData`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#userdata) object is a collection of [`UserIdentifier`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#useridentifier) objects. Each
`UserIdentifier` has exactly one of the attributes in the following table.

| UserIdentifier ||
|---|---|
| `email_address` | |---|---| | Format | `string` - Convert to lowercase. - If the email address has the `gmail.com` or `googlemail.com` domain: - Remove all dots (`.`) before the `@` symbol. - Remove the plus sign (`+`) from the local-part and remove all characters that follow it. - Example: `cloudy.sanfrancisco+shopping@gmail.com` → `cloudysanfrancisco@gmail.com` - If the email address has a domain other than `gmail.com` or `googlemail.com`, don't remove dots or plus signs. - Example: `user.name+NYC@Example.com` → `user.name+nyc@example.com` | | Whitespace | Trim leading, trailing and intermediate whitespace. | | Hashing | Hash using the [SHA-256 algorithm](https://en.wikipedia.org/wiki/SHA-2). Encode the hash bytes using hex or Base64 encoding. | |
| `phone_number` | |---|---| | Format | `string` Use [E.164 format](https://en.wikipedia.org/wiki/E.164). Include the plus sign (`+`) and the country code. All characters after the plus sign must be digits. For example, the US phone number `(800)555-0100` should be formatted and normalized to `+18005550100`. | | Whitespace | Trim leading and trailing whitespace. | | Hashing | Hash using the [SHA-256 algorithm](https://en.wikipedia.org/wiki/SHA-2). Encode the hash bytes using hex or Base64 encoding. | |
| `address` | [`AddressInfo`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#addressinfo) object Refer to the [`AddressInfo` format specification](https://developers.google.com/data-manager/api/devguides/concepts/formatting#address_format). |

### `AddressInfo` format

Use the following formatting guidelines to construct the `address`
attribute of a `UserIdentifier`.

| AddressInfo ||
|---|---|
| `given_name` | |---|---| | Format | `string` Convert to lowercase. Don't include prefixes such as `Mrs.` | | Whitespace | Trim leading and trailing whitespace. | | Hashing | Hash using the [SHA-256 algorithm](https://en.wikipedia.org/wiki/SHA-2). Encode the hash bytes using hex or Base64 encoding. | |
| `family_name` | |---|---| | Format | `string` Convert to lowercase. Don't include suffixes such as `Jr.` | | Whitespace | Trim leading and trailing whitespace. | | Hashing | Hash using the [SHA-256 algorithm](https://en.wikipedia.org/wiki/SHA-2). Encode the hash bytes using hex or Base64 encoding. | |
| `region_code` | |---|---| | Format | `string` A two-character [ISO-3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code. | | Whitespace | Trim leading and trailing whitespace. | | Hashing | Don't hash `region_code`. | |
| `postal_code` | |---|---| | Format | `string` Both US and international zip and postal codes are allowed. For US addresses, use either 5 digits or 5 digits followed by a 4-digit extension. Using a 4-digit extension may improve your match rate. For all other countries, don't use postal code extensions. | | Whitespace | Trim leading and trailing whitespace. | | Hashing | Don't hash `postal_code`. | |

## `IpData` requirements

An [`IpData`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#ipdata) object has the following attributes.

| IpData ||
|---|---|
| `ip_address` | |---|---| | Format | `string` IPv4 or IPv6 address. For IPv6 addresses, the case doesn't matter (either uppercase or lowercase can be used). | | Whitespace | Trim leading and trailing whitespace. | | Hashing | Don't hash `ip_address`. | |

## `PairData` requirements

Populate the `pair_ids` field of a [`PairData`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#pairdata) object with a list of IDs.
Format each element in the list using the following steps:

1. Hash the cleanroom-provided PII data using the [SHA-256 algorithm](https://en.wikipedia.org/wiki/SHA-2).
2. Encrypt the hash bytes with an EC commutative cipher using the publisher key for the PAIR user list.
3. Encode the encrypted data using hex or Base64 encoding.

## `MobileData` requirements

Populate the `mobile_ids` field of a [`MobileData`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#mobiledata) object with a list of
[mobile IDs](https://support.google.com/google-ads/answer/9004555). Don't hash mobile
IDs.

## Timestamp format

If using the JSON format for [`Timestamp`](https://protobuf.dev/reference/protobuf/google.protobuf/#timestamp) fields, like
`timestamp` and `last_updated_timestamp` of [`Event`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#event), use the [RFC
3339](https://www.ietf.org/rfc/rfc3339) format. Here are some examples of the UTC time
of August 8, 2025 at 5:18:44.291 PM in the RFC 3339 format and different time
zones:

- UTC time zone: `2025-08-08T17:18:44.291Z`
- EDT time zone, which was 4 hours before UTC at that time: `2025-08-08T13:18:44.291-04:00`
- PDT time zone, which was 7 hours before UTC at that time: `2025-08-08T10:18:44.291-07:00`
- Time zone for Tokyo, Japan, which was 9 hours ahead of UTC and doesn't observe daylight saving time: `2025-08-08T22:18:44.291+09:00`

If using the protocol buffer format, set the `seconds` and, optionally, the
`nanos` when constructing the `Timestamp`. Here are the `seconds` and `nanos`
values for the UTC time of August 8, 2025 at 5:18:44.291 PM:

- `seconds`: `1754683124`
- `nanos`: `291000000`

## Encoding

Keep the following in mind when encoding data:

- The case of the encoding output doesn't matter when using [hexadecimal encoding](https://en.wikipedia.org/wiki/Hexadecimal) (hex).
- The case of the encoding output *matters* when using [Base64
  encoding](https://en.wikipedia.org/wiki/Base64).