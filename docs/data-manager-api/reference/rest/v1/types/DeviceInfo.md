# DeviceInfo

- [JSON representation](https://developers.google.com/data-manager/api/reference/rest/v1/DeviceInfo#SCHEMA_REPRESENTATION)

Information about the device being used (if any) when the event happened.

| JSON representation |
|---|
| ``` { "userAgent": string, "ipAddress": string, "category": string, "languageCode": string, "screenHeight": integer, "screenWidth": integer, "operatingSystem": string, "operatingSystemVersion": string, "model": string, "brand": string, "browser": string, "browserVersion": string } ``` |

| Fields ||
|---|---|
| `userAgent` | `string` Optional. The user-agent string of the device for the given context. |
| `ipAddress` | `string` Optional. The IP address of the device for the given context. **Note:** Google Ads does not support IP address matching for end users in the European Economic Area (EEA), United Kingdom (UK), or Switzerland (CH). Add logic to conditionally exclude sharing IP addresses from users from these regions and ensure that you provide users with clear and comprehensive information about the data you collect on your sites, apps, and other properties and get consent where required by law or any applicable Google policies. See the [About offline conversion imports](https://support.google.com/google-ads/answer/2998031) page for more details. |
| `category` | `string` Optional. The category of device. For example, "desktop", "tablet", "mobile", "smart TV". |
| `languageCode` | `string` Optional. The language the device uses in ISO 639-1 format. |
| `screenHeight` | `integer` Optional. The height of the screen in pixels. |
| `screenWidth` | `integer` Optional. The width of the screen in pixels. |
| `operatingSystem` | `string` Optional. The operating system or platform of the device. |
| `operatingSystemVersion` | `string` Optional. The version of the operating system or platform. |
| `model` | `string` Optional. The model of the device. |
| `brand` | `string` Optional. The brand of the device. |
| `browser` | `string` Optional. The brand or type of the browser. |
| `browserVersion` | `string` Optional. The version of the browser. |
