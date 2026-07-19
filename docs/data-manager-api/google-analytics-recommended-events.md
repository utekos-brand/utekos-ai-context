# Google Analytics recommended events

The following is a list of recommended events. You can also create and send your
own [custom events](https://support.google.com/analytics/answer/12229021).

> [!IMPORTANT]
> **Important:** Use `app_instance_id` instead of `client_id` for events sent to app data streams.

When creating custom event names, you must:

1. Follow the [Event naming rules](https://support.google.com/analytics/answer/13316687).
2. Avoid [Reserved names and prefixes](https://support.google.com/analytics/answer/13316687#reserved).
3. Stay within the [Event collection limits](https://support.google.com/analytics/answer/9267744), such as the 40-character limit for event and parameter names.

Check out [Get started](https://developers.google.com/data-manager/api/devguides/events/send-events) for details.

If you're upgrading from the Measurement Protocol, check out
[Upgrade from Measurement Protocol](https://developers.google.com/data-manager/api/devguides/events/analytics/measurement-protocol/upgrade)
for instructions.

## For all properties

### `ad_impression`

This event is available only for App streams.

Use this event when a user sees an ad impression.

- An `ad_impression` sent using the Measurement Protocol will *not* be included in exports to other advertising platforms such as Google Ads.
- Sending `ad_impression` events using the Measurement Protocol can cause duplicate impressions if you've configured tagging or the SDK for your linked [Google advertising products](https://support.google.com/analytics/answer/12800258). Only send an `ad_impression` event using the Measurement Protocol if the event wasn't captured by tagging or the SDK.

#### Event fields

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `currency` | `string` | No | USD | Currency of the items associated with the event, in [3-letter ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format. <br /> \* If you set `conversion_value` then `currency` is required for revenue metrics to be computed accurately. |
| `conversion_value` | `number` | No | 3.99 | The value of the ad impression. \* `conversion_value` is typically required for meaningful reporting. \* `currency` is required if you set `conversion_value`. |

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `ad_platform` | `string` | No | MoPub | The ad platform. |
| `ad_source` | `string` | No | AdColony | The ad source. |
| `ad_format` | `string` | No | Banner | The ad format. |
| `ad_unit_name` | `string` | No | Banner_03 | The ad unit name. |

#### Example

The following example shows how to send an `ad_impression` event using the Data
Manager API. If you're upgrading from the Measurement Protocol, use the
tabs to migrate your requests to the Data Manager API.

### Data Manager API


    {
      "destinations": [
        {
          "operatingAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "loginAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "productDestinationId": "FIREBASE_APP_ID"
        }
      ],
      "events": [
        {
          "eventName": "ad_impression",
          "eventTimestamp": "2025-06-10T23:42:33-05:00",
          "eventSource": "APP",
          "appInstanceId": "APP_INSTANCE_ID",
          "currency": "USD",
          "conversionValue": 3.99,
          "additionalEventParameters": [
            {
              "parameterName": "ad_platform",
              "value": "MoPub"
            },
            {
              "parameterName": "ad_source",
              "value": "AdColony"
            },
            {
              "parameterName": "ad_format",
              "value": "Banner"
            },
            {
              "parameterName": "ad_unit_name",
              "value": "Banner_03"
            }
          ]
        }
      ]
    }

### Measurement Protocol


```javascript
const measurementId = 'G-XXXXXXXXXX';
const apiSecret = '<secret_value>';
 
fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
  method: "POST",
  body: JSON.stringify({
    "app_instance_id": "app_instance_id",
    "events": [{
      "name": "ad_impression",
      "params": {
        "ad_platform": "MoPub",
        "ad_source": "AdColony",
        "ad_format": "Banner",
        "ad_unit_name": "Banner_03",
        "currency": "USD",
        "value": 3.99
      }
    }]
  })
});
```

<br />

### `earn_virtual_currency`

This event measures when a user is awarded virtual currency in a game.
Log this along with [spend_virtual_currency](https://developers.google.com/data-manager/api/reference/analytics/recommended-events#spend_virtual_currency) to better understand your
virtual economy.

#### Event fields

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `conversion_value` | `number` | No | 5 | The value of the virtual currency. |

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `virtual_currency_name` | `string` | No | Gems | The name of the virtual currency. |

#### Example

The following example shows how to send a `earn_virtual_currency` event using
the Data Manager API. If you're upgrading from the Measurement Protocol, use the
tabs to migrate your requests to the Data Manager API.

### Data Manager API


    {
      "destinations": [
        {
          "operatingAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "loginAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "productDestinationId": "MEASUREMENT_ID"
        }
      ],
      "events": [
        {
          "eventName": "earn_virtual_currency",
          "eventTimestamp": "2025-06-10T23:42:33-05:00",
          "eventSource": "WEB",
          "clientId": "CLIENT_ID",
          "conversionValue": 5,
          "additionalEventParameters": [
            {
              "parameterName": "virtual_currency_name",
              "value": "Gems"
            }
          ]
        }
      ]
    }

### Measurement Protocol


```javascript
const measurementId = 'G-XXXXXXXXXX';
const apiSecret = '<secret_value>';
 
fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
  method: "POST",
  body: JSON.stringify({
    "client_id": "client_id",
    "events": [{
      "name": "earn_virtual_currency",
      "params": {
        "virtual_currency_name": "Gems",
        "value": 5
      }
    }]
  })
});
```

<br />

### `join_group`

Log this event when a user joins a group such as a guild, team, or family. Use
this event to analyze how popular certain groups or social features are.

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `group_id` | `string` | No | G_12345 | The ID of the group. |

#### Example

The following example shows how to send a `join_group` event using the Data
Manager API. If you're upgrading from the Measurement Protocol, use the
tabs to migrate your requests to the Data Manager API.

### Data Manager API


    {
      "destinations": [
        {
          "operatingAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "loginAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "productDestinationId": "MEASUREMENT_ID"
        }
      ],
      "events": [
        {
          "eventName": "join_group",
          "eventTimestamp": "2025-06-10T23:42:33-05:00",
          "eventSource": "WEB",
          "clientId": "CLIENT_ID",
          "additionalEventParameters": [
            {
              "parameterName": "group_id",
              "value": "G_12345"
            }
          ]
        }
      ]
    }

### Measurement Protocol


```javascript
const measurementId = 'G-XXXXXXXXXX';
const apiSecret = '<secret_value>';
 
fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
  method: "POST",
  body: JSON.stringify({
    "client_id": "client_id",
    "events":[{
      "name":"join_group",
      "params":{
        "group_id":"G_12345"
      }
    }]
  })
});
```

<br />

### `login`

Send this event to signify that a user has logged in to your website or app.

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `method` | `string` | No | Google | The method used to login. |

#### Example

The following example shows how to send a `login` event using the Data
Manager API. If you're upgrading from the Measurement Protocol, use the
tabs to migrate your requests to the Data Manager API.

### Data Manager API


    {
      "destinations": [
        {
          "operatingAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "loginAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "productDestinationId": "MEASUREMENT_ID"
        }
      ],
      "events": [
        {
          "eventName": "login",
          "eventTimestamp": "2025-06-10T23:42:33-05:00",
          "eventSource": "WEB",
          "clientId": "CLIENT_ID",
          "additionalEventParameters": [
            {
              "parameterName": "method",
              "value": "Google"
            }
          ]
        }
      ]
    }

### Measurement Protocol


```javascript
const measurementId = 'G-XXXXXXXXXX';
const apiSecret = '<secret_value>';
 
fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
  method: "POST",
  body: JSON.stringify({
    "client_id": "client_id",
    "events": [{
      "name": "login",
      "params": {
        "method": "Google"
      }
    }]
  })
});
```

<br />

### `screen_view`

This event is available only for App streams.

Use this event to signify a screen transition has occurred.

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `screen_class` | `string` | No | MainActivity | The class of the screen. |
| `screen_name` | `string` | No | About | The name of the screen. |

#### Example

The following example shows how to send a `screen_view` event using the Data
Manager API. If you're upgrading from the Measurement Protocol, use the
tabs to migrate your requests to the Data Manager API.

### Data Manager API


    {
      "destinations": [
        {
          "operatingAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "loginAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "productDestinationId": "FIREBASE_APP_ID"
        }
      ],
      "events": [
        {
          "eventName": "screen_view",
          "eventTimestamp": "2025-06-10T23:42:33-05:00",
          "eventSource": "APP",
          "appInstanceId": "APP_INSTANCE_ID",
          "additionalEventParameters": [
            {
              "parameterName": "screen_class",
              "value": "MainActivity"
            },
            {
              "parameterName": "screen_name",
              "value": "About"
            }
          ]
        }
      ]
    }

### Measurement Protocol


```javascript
const measurementId = 'G-XXXXXXXXXX';
const apiSecret = '<secret_value>';
 
fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
  method: "POST",
  body: JSON.stringify({
    "app_instance_id": "app_instance_id",
    "events": [{
      "name": "screen_view",
      "params": {
        "screen_class": "MainActivity",
        "screen_name": "About"
      }
    }]
  })
});
```

<br />

### `search`

Log this event to indicate when the user has performed a search. You can use
this event to identify what users are searching for on your website or app. For
example, you could send this event when a user views a search results page after
performing a search.

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `search_term` | `string` | **Yes** | t-shirts | The term that was searched for. |

#### Example

The following example shows how to send a `search` event using the Data
Manager API. If you're upgrading from the Measurement Protocol, use the
tabs to migrate your requests to the Data Manager API.

### Data Manager API


    {
      "destinations": [
        {
          "operatingAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "loginAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "productDestinationId": "MEASUREMENT_ID"
        }
      ],
      "events": [
        {
          "eventName": "search",
          "eventTimestamp": "2025-06-10T23:42:33-05:00",
          "eventSource": "WEB",
          "clientId": "CLIENT_ID",
          "additionalEventParameters": [
            {
              "parameterName": "search_term",
              "value": "t-shirts"
            }
          ]
        }
      ]
    }

### Measurement Protocol


```javascript
const measurementId = 'G-XXXXXXXXXX';
const apiSecret = '<secret_value>';
 
fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
  method: "POST",
  body: JSON.stringify({
    "client_id": "client_id",
    "events": [{
      "name": "search",
      "params": {
        "search_term": "t-shirts"
      }
    }]
  })
});
```

<br />

### `select_content`

This event signifies that a user has selected some content of a certain type.
This event can help you identify popular content and categories of content on
your website or app.

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `content_type` | `string` | No | product | The type of selected content. |
| `content_id` | `string` | No | C_12345 | An identifier for the content that was selected. The value must include at least one non-numeric character. |

#### Example

The following example shows how to send a `select_content` event using the Data
Manager API. If you're upgrading from the Measurement Protocol, use the
tabs to migrate your requests to the Data Manager API.

### Data Manager API


    {
      "destinations": [
        {
          "operatingAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "loginAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "productDestinationId": "MEASUREMENT_ID"
        }
      ],
      "events": [
        {
          "eventName": "select_content",
          "eventTimestamp": "2025-06-10T23:42:33-05:00",
          "eventSource": "WEB",
          "clientId": "CLIENT_ID",
          "userId": "USER_ID",
          "additionalEventParameters": [
            {
              "parameterName": "content_type",
              "value": "product"
            },
            {
              "parameterName": "content_id",
              "value": "C_12345"
            }
          ]
        }
      ]
    }

### Measurement Protocol


```javascript
const measurementId = 'G-XXXXXXXXXX';
const apiSecret = '<secret_value>';
 
fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
  method: "POST",
  body: JSON.stringify({
    "client_id": "client_id",
    "events": [{
      "name": "select_content",
      "params": {
        "content_type": "product",
        "content_id": "C_12345"
      }
    }]
  })
});
```

<br />

### `share`

Use this event when a user has shared content.

#### Event fields

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `cart_data.items` | `https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#item` | No |   | The items for the event. <br /> Set the `cart_data.items` field on the [`Event`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#event) object. |

#### Item fields

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `item_id` | `string` | Yes | I_12345 | A unique identifier for the item. Set the `item_id` field on the [`Item`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#item) object. |
| `unit_price` | `number` | Yes | 27.67 | The unit price excluding tax, shipping, and event scoped (transaction-level) discounts for this item. <br /> If the item has an item scoped discount, use the discounted unit price. For example, if an item has a unit price of 27.67 and a unit discount of 6.66, then set `unitPrice` to 21.01. |
| `quantity` | `number` | Yes | 1 | The quantity of units purchased for this particular item. |

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `method` | `string` | No | Twitter | The method in which the content is shared. |
| `content_type` | `string` | No | image | The type of shared content. |

#### Example

The following example shows how to send a `share` event using the Data
Manager API. If you're upgrading from the Measurement Protocol, use the
tabs to migrate your requests to the Data Manager API.

### Data Manager API


    {
      "destinations": [
        {
          "operatingAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "loginAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "productDestinationId": "MEASUREMENT_ID"
        }
      ],
      "events": [
        {
          "eventName": "share",
          "eventTimestamp": "2025-06-10T23:42:33-05:00",
          "eventSource": "WEB",
          "clientId": "CLIENT_ID",
          "cartData": {
            "items": [
              {
                "itemId": "C_12345",
                "quantity": 1,
                "unitPrice": 27.67
              }
            ]
          },
          "additionalEventParameters": [
            {
              "parameterName": "method",
              "value": "Twitter"
            },
            {
              "parameterName": "content_type",
              "value": "image"
            }
          ]
        }
      ]
    }

### Measurement Protocol


```javascript
const measurementId = 'G-XXXXXXXXXX';
const apiSecret = '<secret_value>';
 
fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
  method: "POST",
  body: JSON.stringify({
    "client_id": "client_id",
    "events": [{
      "name": "share",
      "params": {
        "method": "Twitter",
        "content_type": "image",
        "item_id": "C_12345"
      }
    }]
  })
});
```

<br />

### `sign_up`

This event indicates that a user has signed up for an account. Use this event to
understand the different behaviors of logged in and logged out users.

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `method` | `string` | No | Google | The method used for sign up. |

#### Example

The following example shows how to send a `sign_up` event using the Data
Manager API. If you're upgrading from the Measurement Protocol, use the
tabs to migrate your requests to the Data Manager API.

### Data Manager API


    {
      "destinations": [
        {
          "operatingAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "loginAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "productDestinationId": "MEASUREMENT_ID"
        }
      ],
      "events": [
        {
          "eventName": "sign_up",
          "eventTimestamp": "2025-06-10T23:42:33-05:00",
          "eventSource": "WEB",
          "clientId": "CLIENT_ID",
          "additionalEventParameters": [
            {
              "parameterName": "method",
              "value": "Google"
            }
          ]
        }
      ]
    }

### Measurement Protocol


```javascript
const measurementId = 'G-XXXXXXXXXX';
const apiSecret = '<secret_value>';
 
fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
  method: "POST",
  body: JSON.stringify({
    "client_id": "client_id",
    "events": [{
      "name": "sign_up",
      "params": {
        "method": "Google"
      }
    }]
  })
});
```

<br />

### `spend_virtual_currency`

This event measures the sale of virtual goods in your app and helps you identify
which virtual goods are the most popular.

#### Event fields

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `conversion_value` | `number` | **Yes** | 5 | The value of the virtual currency. |
| `cart_data.items` | `https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#item` | No |   | The items for the event. <br /> Set the `cart_data.items` field on the [`Event`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#event) object. |

#### Item fields

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `item_id` | `string` | Yes | I_12345 | A unique identifier for the item. Set the `item_id` field on the [`Item`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#item) object. |
| `unit_price` | `number` | Yes | 27.67 | The unit price excluding tax, shipping, and event scoped (transaction-level) discounts for this item. <br /> If the item has an item scoped discount, use the discounted unit price. For example, if an item has a unit price of 27.67 and a unit discount of 6.66, then set `unitPrice` to 21.01. |
| `quantity` | `number` | Yes | 1 | The quantity of units purchased for this particular item. |

#### Item parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `item_name` | `string` | No | Starter Boost | The name of the item the virtual currency is being used for. |

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `virtual_currency_name` | `string` | **Yes** | Gems | The name of the virtual currency. |

#### Example

The following example shows how to send a `spend_virtual_currency` event using
the Data Manager API. If you're upgrading from the Measurement Protocol, use the
tabs to migrate your requests to the Data Manager API.

### Data Manager API


    {
      "destinations": [
        {
          "operatingAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "loginAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "productDestinationId": "MEASUREMENT_ID"
        }
      ],
      "events": [
        {
          "eventName": "spend_virtual_currency",
          "eventTimestamp": "2025-06-10T23:42:33-05:00",
          "eventSource": "WEB",
          "clientId": "CLIENT_ID",
          "cartData": {
            "items": [
              {
                "itemId": "I_12345",
                "quantity": 1,
                "unitPrice": 27.67,
                "additionalItemParameters": [
                  {
                    "parameterName": "item_name",
                    "value": "Starter Boost"
                  }
                ]
              }
            ]
          },
          "conversionValue": 5,
          "additionalEventParameters": [
            {
              "parameterName": "virtual_currency_name",
              "value": "Gems"
            }
          ]
        }
      ]
    }

### Measurement Protocol


```javascript
const measurementId = 'G-XXXXXXXXXX';
const apiSecret = '<secret_value>';
 
fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
  method: "POST",
  body: JSON.stringify({
    "client_id": "client_id",
    "events": [{
      "name": "spend_virtual_currency",
      "params": {
        "value": 5,
        "virtual_currency_name": "Gems",
        "item_name": "Starter Boost"
      }
    }]
  })
});
```

<br />

### `tutorial_begin`

This event signifies the start of the on-boarding process. Use this in a funnel
with [tutorial_complete](https://developers.google.com/data-manager/api/reference/analytics/recommended-events#tutorial_complete) to understand how many users complete the tutorial.

#### Parameters

No parameters are suggested for this event.

#### Example

The following example shows how to send a `tutorial_begin` event using the Data
Manager API. If you're upgrading from the Measurement Protocol, use the
tabs to migrate your requests to the Data Manager API.

### Data Manager API


    {
      "destinations": [
        {
          "operatingAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "loginAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "productDestinationId": "MEASUREMENT_ID"
        }
      ],
      "events": [
        {
          "eventName": "tutorial_begin",
          "eventTimestamp": "2025-06-10T23:42:33-05:00",
          "eventSource": "WEB",
          "clientId": "CLIENT_ID"
        }
      ]
    }

### Measurement Protocol


```javascript
const measurementId = 'G-XXXXXXXXXX';
const apiSecret = '<secret_value>';
 
fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
  method: "POST",
  body: JSON.stringify({
    "client_id": "client_id",
    "events": [{
      "name": "tutorial_begin"
    }]
  })
});
```

<br />

### `tutorial_complete`

This event signifies the user's completion of your on-boarding process. Use this
in a funnel with [tutorial_begin](https://developers.google.com/data-manager/api/reference/analytics/recommended-events#tutorial_begin) to understand how many users complete the
tutorial.

#### Parameters

No parameters are suggested for this event.

#### Example

The following example shows how to send a `tutorial_complete` event using the
Data Manager API. If you're upgrading from the Measurement Protocol, use the
tabs to migrate your requests to the Data Manager API.

### Data Manager API


    {
      "destinations": [
        {
          "operatingAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "loginAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "productDestinationId": "MEASUREMENT_ID"
        }
      ],
      "events": [
        {
          "eventName": "tutorial_complete",
          "eventTimestamp": "2025-06-10T23:42:33-05:00",
          "eventSource": "WEB",
          "clientId": "CLIENT_ID"
        }
      ]
    }

### Measurement Protocol


```javascript
const measurementId = 'G-XXXXXXXXXX';
const apiSecret = '<secret_value>';
 
fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
  method: "POST",
  body: JSON.stringify({
    "client_id": "client_id",
    "events": [{
      "name": "tutorial_complete"
    }]
  })
});
```

<br />

### `view_search_results`

Log this event when the user has been presented with the results of a search. Note that you can enable the view_search_results event for automatic collection through [Enhanced event measurement](https://support.google.com/analytics/answer/9216061) in Google Analytics.

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `search_term` | `string` | No | Clothing | The term used for the search. |

> [!NOTE]
> **Note:** The `view_search_results` event sends the `unique_search_term` parameter with a value of 1 if the search term is unique in the current session. If the search term has already been submitted in the current session, the parameter value is 0.

#### Example

The following example shows how to send a `view_search_results` event using the
Data Manager API. If you're upgrading from the Measurement Protocol, use the
tabs to migrate your requests to the Data Manager API.

### Data Manager API


    {
      "destinations": [
        {
          "operatingAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "loginAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "productDestinationId": "MEASUREMENT_ID"
        }
      ],
      "events": [
        {
          "eventName": "view_search_results",
          "eventTimestamp": "2025-06-10T23:42:33-05:00",
          "eventSource": "WEB",
          "clientId": "CLIENT_ID",
          "additionalEventParameters": [
            {
              "parameterName": "search_term",
              "value": "Clothing"
            }
          ]
        }
      ]
    }

### Measurement Protocol


```javascript
const measurementId = 'G-XXXXXXXXXX';
const apiSecret = '<secret_value>';
 
fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
  method: "POST",
  body: JSON.stringify({
    "client_id": "client_id",
    "events": [{
      "name": "view_search_results",
      "params": {
        "search_term": "Clothing"
      }
    }]
  })
});
```

<br />

### `campaign_details`

Use this event to send campaign details that will be applied to events with a
timestamp greater than or equal to the timestamp of the `campaign_details`
event.

> [!NOTE]
> **Note:** The `campaign_details` event won't be visible in Google Analytics reports or DebugView. If you have BigQuery export enabled, this event will be present in your BigQuery event export data.

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `campaign_id` | `string` | No | google_1234 | The campaign id. |
| `campaign` | `string` | No | Summer_fun | The name used to identify a specific promotion or strategic campaign. |
| `source` | `string` | No | google | The campaign traffic source (e.g. google, email, etc.). |
| `medium` | `string` | No | cpc | The campaign medium (e.g. email, cost-per-click, etc.) |
| `term` | `string` | No | summer+travel | The campaign term used with paid search to supply the keywords for ads. |
| `content` | `string` | No | logolink | The campaign content used for A/B testing and content-targeted ads to differentiate ads or links that point to the same URL. |

#### Example

The following example shows how to send a `campaign_details` event using the
Data Manager API. If you're upgrading from the Measurement Protocol, use the
tabs to migrate your requests to the Data Manager API.

### Data Manager API


    {
      "destinations": [
        {
          "operatingAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "loginAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "productDestinationId": "MEASUREMENT_ID"
        }
      ],
      "events": [
        {
          "eventName": "campaign_details",
          "eventTimestamp": "2025-06-10T23:42:33-05:00",
          "eventSource": "WEB",
          "clientId": "CLIENT_ID",
          "additionalEventParameters": [
            {
              "parameterName": "campaign_id",
              "value": "google_1234"
            },
            {
              "parameterName": "campaign",
              "value": "Summer_fun"
            },
            {
              "parameterName": "source",
              "value": "google"
            },
            {
              "parameterName": "medium",
              "value": "cpc"
            },
            {
              "parameterName": "term",
              "value": "summer+travel"
            },
            {
              "parameterName": "content",
              "value": "logolink"
            }
          ]
        }
      ]
    }

### Measurement Protocol


```javascript
const measurementId = 'G-XXXXXXXXXX';
const apiSecret = '<secret_value>';
 
fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
  method: "POST",
  body: JSON.stringify({
    "client_id": "client_id",
    "events": [{
      "name": "campaign_details",
      "params": {
        "campaign_id": "google_1234",
        "campaign": "Summer_fun",
        "source": "google",
        "medium": "cpc",
        "term": "summer+travel",
        "content": "logolink"
      }
    }]
  })
});
```

<br />

## Online sales

### `add_payment_info`

This event signifies a user has submitted their payment information in an
ecommerce checkout process.

#### Event fields

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `currency` | `string` | **Yes\*** | USD | Currency of the items associated with the event, in [3-letter ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format. <br /> \* Value metrics on the `view_item` event to not contribute to revenue <br /> \* If you set `conversion_value` then `currency` is required for revenue metrics to be computed accurately. |
| `conversion_value` | `number` | **Yes\*** | 30.03 | The monetary value of the event. <br /> \* Set `conversion_value` to the sum of `(price * quantity)` for all items in `items`. Don't include `shipping` or `tax`. \* `conversion_value` is typically required for meaningful reporting. If you [mark the event as a key event](https://support.google.com/analytics/answer/9267568) then it's recommended you set `conversion_value`. \* `currency` is required if you set `conversion_value`. |
| `cart_data.items` | `https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#item` | **Yes** |   | The items for the event. <br /> Set the `cart_data.items` field on the [`Event`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#event) object. |
| `cart_data.coupon_codes` | `string[]` | No | SUMMER_FUN | The coupon code associated with the event. <br /> <br /> Set the `coupon_codes` field on the [`CartData`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#cartdata) object. \* Only provide one coupon code in this list. \* This is independent from item-level coupon codes. |

#### Item fields

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `item_id` | `string` | Yes | I_12345 | A unique identifier for the item. Set the `item_id` field on the [`Item`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#item) object. |
| `unit_price` | `number` | Yes | 27.67 | The unit price excluding tax, shipping, and event scoped (transaction-level) discounts for this item. <br /> If the item has an item scoped discount, use the discounted unit price. For example, if an item has a unit price of 27.67 and a unit discount of 6.66, then set `unitPrice` to 21.01. |
| `quantity` | `number` | Yes | 1 | The quantity of units purchased for this particular item. |

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `payment_type` | `string` | No | Credit Card | The chosen method of payment. |

#### Example

The following example shows how to send a `add_payment_info` event using the
Data Manager API. If you're upgrading from the Measurement Protocol, use the
tabs to migrate your requests to the Data Manager API.

### Data Manager API


    {
      "destinations": [
        {
          "operatingAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "loginAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "productDestinationId": "MEASUREMENT_ID"
        }
      ],
      "events": [
        {
          "eventName": "add_payment_info",
          "conversionValue": 30.03,
          "currency": "USD",
          "eventTimestamp": "2025-06-10T23:42:33-05:00",
          "eventSource": "WEB",
          "clientId": "CLIENT_ID",
          "userId": "USER_ID",
          "additionalEventParameters": [
            {
              "parameterName": "payment_type",
              "value": "Credit Card"
            }
          ],
          "cartData": {
            "couponCodes": [
              "SUMMER_FUN"
            ],
            "items": [
              {
                "itemId": "SKU_12345",
                "quantity": 1,
                "unitPrice": 29.99,
                "additionalItemParameters": [
                  {
                    "parameterName": "item_name",
                    "value": "Triblend Android T-Shirt"
                  }
                ]
              }
            ]
          }
        }
      ]
    }

### Measurement Protocol


```javascript
const measurementId = 'G-XXXXXXXXXX';
const apiSecret = '<secret_value>';
 
fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
  method: "POST",
  body: JSON.stringify({
    "client_id": "client_id",
    "events": [{
      "name": "add_payment_info",
      "params": {
        "currency": "USD",
        "value": 30.03,
        "coupon": "SUMMER_FUN",
        "payment_type": "Credit Card",
        "items": [
          {
            "item_id": "SKU_12345",
            "item_name": "Stan and Friends Tee",
            "affiliation": "Google Merchandise Store",
            "coupon": "SUMMER_FUN",
            "currency": "USD",
            "discount": 2.22,
            "index": 0,
            "item_brand": "Google",
            "item_category": "Apparel",
            "item_category2": "Adult",
            "item_category3": "Shirts",
            "item_category4": "Crew",
            "item_category5": "Short sleeve",
            "item_list_id": "related_products",
            "item_list_name": "Related Products",
            "item_variant": "green",
            "location_id": "ChIJIQBpAG2ahYAR_6128GcTUEo",
            "price": 10.01,
            "google_business_vertical": "retail",
            "quantity": 3
          }
        ]
      }
    }]
  })
});
```

<br />

### `add_shipping_info`

This event signifies a user has submitted their shipping information in an
ecommerce checkout process.

#### Event fields

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `currency` | `string` | **Yes\*** | USD | Currency of the items associated with the event, in [3-letter ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format. <br /> \* Value metrics on the `view_item` event to not contribute to revenue <br /> \* If you set `conversion_value` then `currency` is required for revenue metrics to be computed accurately. |
| `conversion_value` | `number` | **Yes\*** | 30.03 | The monetary value of the event. <br /> \* Set `conversion_value` to the sum of `(price * quantity)` for all items in `items`. Don't include `shipping` or `tax`. \* `conversion_value` is typically required for meaningful reporting. If you [mark the event as a key event](https://support.google.com/analytics/answer/9267568) then it's recommended you set `conversion_value`. \* `currency` is required if you set `conversion_value`. |
| `cart_data.items` | `https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#item` | **Yes** |   | The items for the event. <br /> Set the `cart_data.items` field on the [`Event`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#event) object. |
| `cart_data.coupon_codes` | `string[]` | No | SUMMER_FUN | The coupon code associated with the event. <br /> <br /> Set the `coupon_codes` field on the [`CartData`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#cartdata) object. \* Only provide one coupon code in this list. \* This is independent from item-level coupon codes. |

#### Item fields

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `item_id` | `string` | Yes | I_12345 | A unique identifier for the item. Set the `item_id` field on the [`Item`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#item) object. |
| `unit_price` | `number` | Yes | 27.67 | The unit price excluding tax, shipping, and event scoped (transaction-level) discounts for this item. <br /> If the item has an item scoped discount, use the discounted unit price. For example, if an item has a unit price of 27.67 and a unit discount of 6.66, then set `unitPrice` to 21.01. |
| `quantity` | `number` | Yes | 1 | The quantity of units purchased for this particular item. |

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `shipping_tier` | `string` | No | Ground | The shipping tier (e.g. `Ground`, `Air`, `Next-day`) selected for delivery of the purchased item. |

#### Example

The following example shows how to send a `add_shipping_info` event using the
Data Manager API. If you're upgrading from the Measurement Protocol, use the
tabs to migrate your requests to the Data Manager API.

### Data Manager API


    {
      "destinations": [
        {
          "operatingAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "loginAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "productDestinationId": "MEASUREMENT_ID"
        }
      ],
      "events": [
        {
          "eventName": "add_shipping_info",
          "conversionValue": 30.03,
          "currency": "USD",
          "eventTimestamp": "2025-06-10T23:42:33-05:00",
          "eventSource": "WEB",
          "clientId": "CLIENT_ID",
          "userId": "USER_ID",
          "additionalEventParameters": [
            {
              "parameterName": "shipping_tier",
              "value": "Ground"
            }
          ],
          "cartData": {
            "couponCodes": [
              "SUMMER_FUN"
            ],
            "items": [
              {
                "itemId": "SKU_12345",
                "quantity": 1,
                "unitPrice": 29.99,
                "additionalItemParameters": [
                  {
                    "parameterName": "item_name",
                    "value": "Triblend Android T-Shirt"
                  }
                ]
              }
            ]
          }
        }
      ]
    }

### Measurement Protocol


```javascript
const measurementId = 'G-XXXXXXXXXX';
const apiSecret = '<secret_value>';
 
fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
  method: "POST",
  body: JSON.stringify({
    "client_id": "client_id",
    "events": [{
      "name": "add_shipping_info",
      "params": {
        "currency": "USD",
        "value": 30.03,
        "coupon": "SUMMER_FUN",
        "shipping_tier": "Ground",
        "items": [
          {
            "item_id": "SKU_12345",
            "item_name": "Stan and Friends Tee",
            "affiliation": "Google Merchandise Store",
            "coupon": "SUMMER_FUN",
            "currency": "USD",
            "discount": 2.22,
            "index": 0,
            "item_brand": "Google",
            "item_category": "Apparel",
            "item_category2": "Adult",
            "item_category3": "Shirts",
            "item_category4": "Crew",
            "item_category5": "Short sleeve",
            "item_list_id": "related_products",
            "item_list_name": "Related Products",
            "item_variant": "green",
            "location_id": "ChIJIQBpAG2ahYAR_6128GcTUEo",
            "price": 10.01,
            "google_business_vertical": "retail",
            "quantity": 3
          }
        ]
      }
    }]
  })
});
```

<br />

### `add_to_cart`

This event signifies that an item was added to a cart for purchase.

#### Event fields

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `currency` | `string` | **Yes\*** | USD | Currency of the items associated with the event, in [3-letter ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format. <br /> \* Value metrics on the `view_item` event to not contribute to revenue <br /> \* If you set `conversion_value` then `currency` is required for revenue metrics to be computed accurately. |
| `conversion_value` | `number` | **Yes\*** | 30.03 | The monetary value of the event. <br /> \* Set `conversion_value` to the sum of `(price * quantity)` for all items in `items`. Don't include `shipping` or `tax`. \* `conversion_value` is typically required for meaningful reporting. If you [mark the event as a key event](https://support.google.com/analytics/answer/9267568) then it's recommended you set `conversion_value`. \* `currency` is required if you set `conversion_value`. |
| `cart_data.items` | `https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#item` | **Yes** |   | The items for the event. <br /> Set the `cart_data.items` field on the [`Event`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#event) object. |

#### Item fields

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `item_id` | `string` | Yes | I_12345 | A unique identifier for the item. Set the `item_id` field on the [`Item`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#item) object. |
| `unit_price` | `number` | Yes | 27.67 | The unit price excluding tax, shipping, and event scoped (transaction-level) discounts for this item. <br /> If the item has an item scoped discount, use the discounted unit price. For example, if an item has a unit price of 27.67 and a unit discount of 6.66, then set `unitPrice` to 21.01. |
| `quantity` | `number` | Yes | 1 | The quantity of units purchased for this particular item. |


#### Item parameters

<br />

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `item_name` | `string` | **Yes\*** | Stan and Friends Tee | The name of the item. \*One of `item_id` or `item_name` is required. |
| `affiliation` | `string` | No | Google Store | A product affiliation to designate a supplying company or brick and mortar store location. Note: `affiliation` is only available at the item-scope. |
| `coupon` | `string` | No | SUMMER_FUN | The coupon name/code associated with the item. <br /> Event-level and item-level `coupon` parameters are independent. |
| `discount` | `number` | No | 2.22 | The unit monetary discount value associated with the item. |
| `index` | `number` | No | 5 | The index/position of the item in a list. |
| `item_brand` | `string` | No | Google | The brand of the item. |
| `item_category` | `string` | No | Apparel | The category of the item. If used as part of a category hierarchy or taxonomy then this will be the first category. |
| `item_category2` | `string` | No | Adult | The second category hierarchy or additional taxonomy for the item. |
| `item_category3` | `string` | No | Shirts | The third category hierarchy or additional taxonomy for the item. |
| `item_category4` | `string` | No | Crew | The fourth category hierarchy or additional taxonomy for the item. |
| `item_category5` | `string` | No | Short sleeve | The fifth category hierarchy or additional taxonomy for the item. |
| `item_list_id` | `string` | No | related_products | The ID of the list in which the item was presented to the user. <br /> If set, event-level `item_list_id` is ignored. If not set, event-level `item_list_id` is used, if present. |
| `item_list_name` | `string` | No | Related products | The name of the list in which the item was presented to the user. <br /> If set, event-level `item_list_name` is ignored. If not set, event-level `item_list_name` is used, if present. |
| `item_variant` | `string` | No | green | The item variant or unique code or description for additional item details/options. |
| `location_id` | `string` | No | ChIJIQBpAG2ahYAR_6128GcTUEo (the Google Place ID for San Francisco) | The physical location associated with the item (e.g. the physical store location). It's recommended to use the [Google Place ID](https://developers.google.com/maps/documentation/places/web-service/place-id) that corresponds to the associated item. A custom location ID can also be used. Note: `location_id` is only available at the item-scope. |

In addition to the prescribed parameters, you can include up to 27 [custom parameters](https://developers.google.com/analytics/devguides/collection/ga4/item-scoped-ecommerce) in the `items` array.

#### Example

The following example shows how to send a `add_to_cart` event using the Data
Manager API. If you're upgrading from the Measurement Protocol, use the
tabs to migrate your requests to the Data Manager API.

### Data Manager API


    {
      "destinations": [
        {
          "operatingAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "loginAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "productDestinationId": "MEASUREMENT_ID"
        }
      ],
      "events": [
        {
          "eventName": "add_to_cart",
          "conversionValue": 30.03,
          "currency": "USD",
          "eventTimestamp": "2025-06-10T23:42:33-05:00",
          "eventSource": "WEB",
          "clientId": "CLIENT_ID",
          "userId": "USER_ID",
          "cartData": {
            "items": [
              {
                "itemId": "SKU_12345",
                "quantity": 1,
                "unitPrice": 29.99,
                "additionalItemParameters": [
                  {
                    "parameterName": "item_name",
                    "value": "Triblend Android T-Shirt"
                  }
                ]
              }
            ]
          }
        }
      ]
    }

### Measurement Protocol


```javascript
const measurementId = 'G-XXXXXXXXXX';
const apiSecret = '<secret_value>';
 
fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
  method: "POST",
  body: JSON.stringify({
    "client_id": "client_id",
    "events": [{
      "name": "add_to_cart",
      "params": {
        "currency": "USD",
        "value": 30.03,
        "items": [
          {
            "item_id": "SKU_12345",
            "item_name": "Stan and Friends Tee",
            "affiliation": "Google Merchandise Store",
            "coupon": "SUMMER_FUN",
            "currency": "USD",
            "discount": 2.22,
            "index": 0,
            "item_brand": "Google",
            "item_category": "Apparel",
            "item_category2": "Adult",
            "item_category3": "Shirts",
            "item_category4": "Crew",
            "item_category5": "Short sleeve",
            "item_list_id": "related_products",
            "item_list_name": "Related Products",
            "item_variant": "green",
            "location_id": "ChIJIQBpAG2ahYAR_6128GcTUEo",
            "price": 10.01,
            "google_business_vertical": "retail",
            "quantity": 3
          }
        ]
      }
    }]
  })
});
```

<br />

### `add_to_wishlist`

The event signifies that an item was added to a wishlist. Use this event to
identify popular gift items in your app.

#### Event fields

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `currency` | `string` | **Yes\*** | USD | Currency of the items associated with the event, in [3-letter ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format. <br /> \* Value metrics on the `view_item` event to not contribute to revenue <br /> \* If you set `conversion_value` then `currency` is required for revenue metrics to be computed accurately. |
| `conversion_value` | `number` | **Yes\*** | 30.03 | The monetary value of the event. <br /> \* Set `conversion_value` to the sum of `(price * quantity)` for all items in `items`. Don't include `shipping` or `tax`. \* `conversion_value` is typically required for meaningful reporting. If you [mark the event as a key event](https://support.google.com/analytics/answer/9267568) then it's recommended you set `conversion_value`. \* `currency` is required if you set `conversion_value`. |
| `cart_data.items` | `https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#item` | **Yes** |   | The items for the event. <br /> Set the `cart_data.items` field on the [`Event`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#event) object. |

#### Item fields

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `item_id` | `string` | Yes | I_12345 | A unique identifier for the item. Set the `item_id` field on the [`Item`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#item) object. |
| `unit_price` | `number` | Yes | 27.67 | The unit price excluding tax, shipping, and event scoped (transaction-level) discounts for this item. <br /> If the item has an item scoped discount, use the discounted unit price. For example, if an item has a unit price of 27.67 and a unit discount of 6.66, then set `unitPrice` to 21.01. |
| `quantity` | `number` | Yes | 1 | The quantity of units purchased for this particular item. |


#### Item parameters

<br />

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `item_name` | `string` | **Yes\*** | Stan and Friends Tee | The name of the item. \*One of `item_id` or `item_name` is required. |
| `affiliation` | `string` | No | Google Store | A product affiliation to designate a supplying company or brick and mortar store location. Note: `affiliation` is only available at the item-scope. |
| `coupon` | `string` | No | SUMMER_FUN | The coupon name/code associated with the item. <br /> Event-level and item-level `coupon` parameters are independent. |
| `discount` | `number` | No | 2.22 | The unit monetary discount value associated with the item. |
| `index` | `number` | No | 5 | The index/position of the item in a list. |
| `item_brand` | `string` | No | Google | The brand of the item. |
| `item_category` | `string` | No | Apparel | The category of the item. If used as part of a category hierarchy or taxonomy then this will be the first category. |
| `item_category2` | `string` | No | Adult | The second category hierarchy or additional taxonomy for the item. |
| `item_category3` | `string` | No | Shirts | The third category hierarchy or additional taxonomy for the item. |
| `item_category4` | `string` | No | Crew | The fourth category hierarchy or additional taxonomy for the item. |
| `item_category5` | `string` | No | Short sleeve | The fifth category hierarchy or additional taxonomy for the item. |
| `item_list_id` | `string` | No | related_products | The ID of the list in which the item was presented to the user. <br /> If set, event-level `item_list_id` is ignored. If not set, event-level `item_list_id` is used, if present. |
| `item_list_name` | `string` | No | Related products | The name of the list in which the item was presented to the user. <br /> If set, event-level `item_list_name` is ignored. If not set, event-level `item_list_name` is used, if present. |
| `item_variant` | `string` | No | green | The item variant or unique code or description for additional item details/options. |
| `location_id` | `string` | No | ChIJIQBpAG2ahYAR_6128GcTUEo (the Google Place ID for San Francisco) | The physical location associated with the item (e.g. the physical store location). It's recommended to use the [Google Place ID](https://developers.google.com/maps/documentation/places/web-service/place-id) that corresponds to the associated item. A custom location ID can also be used. Note: `location_id` is only available at the item-scope. |

In addition to the prescribed parameters, you can include up to 27 [custom parameters](https://developers.google.com/analytics/devguides/collection/ga4/item-scoped-ecommerce) in the `items` array.

#### Example

The following example shows how to send a `add_to_wishlist` event using the Data
Manager API. If you're upgrading from the Measurement Protocol, use the
tabs to migrate your requests to the Data Manager API.

### Data Manager API


    {
      "destinations": [
        {
          "operatingAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "loginAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "productDestinationId": "MEASUREMENT_ID"
        }
      ],
      "events": [
        {
          "eventName": "add_to_wishlist",
          "conversionValue": 30.03,
          "currency": "USD",
          "eventTimestamp": "2025-06-10T23:42:33-05:00",
          "eventSource": "WEB",
          "clientId": "CLIENT_ID",
          "userId": "USER_ID",
          "cartData": {
            "items": [
              {
                "itemId": "SKU_12345",
                "quantity": 1,
                "unitPrice": 29.99,
                "additionalItemParameters": [
                  {
                    "parameterName": "item_name",
                    "value": "Triblend Android T-Shirt"
                  }
                ]
              }
            ]
          }
        }
      ]
    }

### Measurement Protocol


```javascript
const measurementId = 'G-XXXXXXXXXX';
const apiSecret = '<secret_value>';
 
fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
  method: "POST",
  body: JSON.stringify({
    "client_id": "client_id",
    "events": [{
      "name": "add_to_wishlist",
      "params": {
        "currency": "USD",
        "value": 30.03,
        "items": [
          {
            "item_id": "SKU_12345",
            "item_name": "Stan and Friends Tee",
            "affiliation": "Google Merchandise Store",
            "coupon": "SUMMER_FUN",
            "currency": "USD",
            "discount": 2.22,
            "index": 0,
            "item_brand": "Google",
            "item_category": "Apparel",
            "item_category2": "Adult",
            "item_category3": "Shirts",
            "item_category4": "Crew",
            "item_category5": "Short sleeve",
            "item_list_id": "related_products",
            "item_list_name": "Related Products",
            "item_variant": "green",
            "location_id": "ChIJIQBpAG2ahYAR_6128GcTUEo",
            "price": 10.01,
            "google_business_vertical": "retail",
            "quantity": 3
          }
        ]
      }
    }]
  })
});
```

<br />

### `begin_checkout`

This event signifies that a user has begun a checkout.

#### Event fields

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `currency` | `string` | **Yes\*** | USD | Currency of the items associated with the event, in [3-letter ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format. <br /> \* Value metrics on the `view_item` event to not contribute to revenue <br /> \* If you set `conversion_value` then `currency` is required for revenue metrics to be computed accurately. |
| `conversion_value` | `number` | **Yes\*** | 30.03 | The monetary value of the event. <br /> \* Set `conversion_value` to the sum of `(price * quantity)` for all items in `items`. Don't include `shipping` or `tax`. \* `conversion_value` is typically required for meaningful reporting. If you [mark the event as a key event](https://support.google.com/analytics/answer/9267568) then it's recommended you set `conversion_value`. \* `currency` is required if you set `conversion_value`. |
| `cart_data.items` | `https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#item` | **Yes** |   | The items for the event. <br /> Set the `cart_data.items` field on the [`Event`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#event) object. |
| `cart_data.coupon_codes` | `string[]` | No | SUMMER_FUN | The coupon code associated with the event. <br /> <br /> Set the `coupon_codes` field on the [`CartData`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#cartdata) object. \* Only provide one coupon code in this list. \* This is independent from item-level coupon codes. |

#### Item fields

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `item_id` | `string` | Yes | I_12345 | A unique identifier for the item. Set the `item_id` field on the [`Item`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#item) object. |
| `unit_price` | `number` | Yes | 27.67 | The unit price excluding tax, shipping, and event scoped (transaction-level) discounts for this item. <br /> If the item has an item scoped discount, use the discounted unit price. For example, if an item has a unit price of 27.67 and a unit discount of 6.66, then set `unitPrice` to 21.01. |
| `quantity` | `number` | Yes | 1 | The quantity of units purchased for this particular item. |

#### Item parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `item_name` | `string` | **Yes\*** | Stan and Friends Tee | The name of the item. \*One of `item_id` or `item_name` is required. |
| `affiliation` | `string` | No | Google Store | A product affiliation to designate a supplying company or brick and mortar store location. Note: `affiliation` is only available at the item-scope. |
| `coupon` | `string` | No | SUMMER_FUN | The coupon name/code associated with the item. <br /> Event-level and item-level `coupon` parameters are independent. |
| `discount` | `number` | No | 2.22 | The unit monetary discount value associated with the item. |
| `index` | `number` | No | 5 | The index/position of the item in a list. |
| `item_brand` | `string` | No | Google | The brand of the item. |
| `item_category` | `string` | No | Apparel | The category of the item. If used as part of a category hierarchy or taxonomy then this will be the first category. |
| `item_category2` | `string` | No | Adult | The second category hierarchy or additional taxonomy for the item. |
| `item_category3` | `string` | No | Shirts | The third category hierarchy or additional taxonomy for the item. |
| `item_category4` | `string` | No | Crew | The fourth category hierarchy or additional taxonomy for the item. |
| `item_category5` | `string` | No | Short sleeve | The fifth category hierarchy or additional taxonomy for the item. |
| `item_list_id` | `string` | No | related_products | The ID of the list in which the item was presented to the user. <br /> If set, event-level `item_list_id` is ignored. If not set, event-level `item_list_id` is used, if present. |
| `item_list_name` | `string` | No | Related products | The name of the list in which the item was presented to the user. <br /> If set, event-level `item_list_name` is ignored. If not set, event-level `item_list_name` is used, if present. |
| `item_variant` | `string` | No | green | The item variant or unique code or description for additional item details/options. |
| `location_id` | `string` | No | ChIJIQBpAG2ahYAR_6128GcTUEo (the Google Place ID for San Francisco) | The physical location associated with the item (e.g. the physical store location). It's recommended to use the [Google Place ID](https://developers.google.com/maps/documentation/places/web-service/place-id) that corresponds to the associated item. A custom location ID can also be used. Note: `location_id` is only available at the item-scope. |

In addition to the prescribed parameters, you can include up to 27 [custom parameters](https://developers.google.com/analytics/devguides/collection/ga4/item-scoped-ecommerce) in the `items` array.

#### Example

The following example shows how to send a `begin_checkout` event using the Data
Manager API. If you're upgrading from the Measurement Protocol, use the
tabs to migrate your requests to the Data Manager API.

### Data Manager API


    {
      "destinations": [
        {
          "operatingAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "loginAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "productDestinationId": "MEASUREMENT_ID"
        }
      ],
      "events": [
        {
          "eventName": "begin_checkout",
          "conversionValue": 30.03,
          "currency": "USD",
          "eventTimestamp": "2025-06-10T23:42:33-05:00",
          "eventSource": "WEB",
          "clientId": "CLIENT_ID",
          "userId": "USER_ID",
          "cartData": {
            "couponCodes": [
              "SUMMER_FUN"
            ],
            "items": [
              {
                "itemId": "SKU_12345",
                "quantity": 1,
                "unitPrice": 29.99,
                "additionalItemParameters": [
                  {
                    "parameterName": "item_name",
                    "value": "Triblend Android T-Shirt"
                  }
                ]
              }
            ]
          }
        }
      ]
    }

### Measurement Protocol


```javascript
const measurementId = 'G-XXXXXXXXXX';
const apiSecret = '<secret_value>';
 
fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
  method: "POST",
  body: JSON.stringify({
    "client_id": "client_id",
    "events": [{
      "name": "begin_checkout",
      "params": {
        "currency": "USD",
        "value": 30.03,
        "coupon": "SUMMER_FUN",
        "items": [
          {
            "item_id": "SKU_12345",
            "item_name": "Stan and Friends Tee",
            "affiliation": "Google Merchandise Store",
            "coupon": "SUMMER_FUN",
            "currency": "USD",
            "discount": 2.22,
            "index": 0,
            "item_brand": "Google",
            "item_category": "Apparel",
            "item_category2": "Adult",
            "item_category3": "Shirts",
            "item_category4": "Crew",
            "item_category5": "Short sleeve",
            "item_list_id": "related_products",
            "item_list_name": "Related Products",
            "item_variant": "green",
            "location_id": "ChIJIQBpAG2ahYAR_6128GcTUEo",
            "price": 10.01,
            "google_business_vertical": "retail",
            "quantity": 3
          }
        ]
      }
    }]
  })
});
```

<br />

### `in_app_purchase`

This event is available only for App streams.

Use this event when a user [makes an in app
purchase](https://developers.google.com/firebase/docs/analytics/measure-in-app-purchases).

#### Event fields

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `currency` | `string` | Yes\* | USD | Currency of the `conversion_value` of the event, in [3-letter ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format. <br /> \* If you set `conversion_value` then `currency` is required for revenue metrics to be computed accurately. |
| `conversion_value` | `number` | Yes\* | 30.03 | The monetary value of the event. <br /> \* `conversion_value` is typically required for meaningful reporting. If you [mark the event as a key event](https://support.google.com/analytics/answer/9267568) then it's recommended you set `conversion_value`. \* `currency` is required if you set `conversion_value`. |
| `cart_data.items` | `https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#item` | No |   | The items for the event. <br /> Set the `cart_data.items` field on the [`Event`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#event) object. |

#### Item fields

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `item_id` | `string` | Yes | I_12345 | A unique identifier for the item. Set the `item_id` field on the [`Item`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#item) object. |
| `unit_price` | `number` | Yes | 27.67 | The unit price excluding tax, shipping, and event scoped (transaction-level) discounts for this item. <br /> If the item has an item scoped discount, use the discounted unit price. For example, if an item has a unit price of 27.67 and a unit discount of 6.66, then set `unitPrice` to 21.01. |
| `quantity` | `number` | Yes | 1 | The quantity of units purchased for this particular item. |

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `product_id` | `string` | No | ABC123456789 | The ID of the product. |
| `subscription` | `boolean` | No | true | Indicates if the purchase is a subscription. If not set, defaults to `false`. |
| `free_trial` | `boolean` | No | true | Indicates if the event is for a free trial of a subscription. If not set, defaults to `false`. |
| `price_is_discounted` | `boolean` | No | false | Indicates if the `price` is discounted. If not set, defaults to `false`. |

#### Example

The following example shows how to send a `in_app_purchase` event using the Data
Manager API. If you're upgrading from the Measurement Protocol, use the
tabs to migrate your requests to the Data Manager API.

### Data Manager API


    {
      "destinations": [
        {
          "operatingAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "loginAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "productDestinationId": "FIREBASE_APP_ID"
        }
      ],
      "events": [
        {
          "eventName": "in_app_purchase",
          "eventTimestamp": "2025-06-10T23:42:33-05:00",
          "eventSource": "APP",
          "appInstanceId": "APP_INSTANCE_ID",
          "currency": "USD",
          "conversionValue": 30.03,
          "cartData": {
            "items": [
              {
                "itemId": "ABC123456789",
                "quantity": 3,
                "unitPrice": 10.01
              }
            ]
          },
          "additionalEventParameters": [
            {
              "parameterName": "subscription",
              "value": true
            },
            {
              "parameterName": "free_trial",
              "value": false
            },
            {
              "parameterName": "price_is_discounted",
              "value": false
            }
          ]
        }
      ]
    }

### Measurement Protocol


```javascript
const measurementId = 'G-XXXXXXXXXX';
const apiSecret = '<secret_value>';
 
fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
  method: "POST",
  body: JSON.stringify({
    "app_instance_id": "app_instance_id",
    "events":[{
      "name":"in_app_purchase",
      "params":{
        "currency": "USD",
        "value": 30.03,
        "quantity": 3,
        "product_id": "ABC123456789",
        "subscription": true,
        "free_trial": false,
        "price_is_discounted": false
      }
    }]
  })
});
```

<br />

### `purchase`

This event signifies when one or more items is purchased by a user.

#### Event fields

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `currency` | `string` | **Yes\*** | USD | Currency of the items associated with the event, in [3-letter ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format. <br /> \* Value metrics on the `view_item` event to not contribute to revenue <br /> \* If you set `conversion_value` then `currency` is required for revenue metrics to be computed accurately. |
| `conversion_value` | `number` | **Yes\*** | 30.03 | The monetary value of the event. <br /> \* Set `conversion_value` to the sum of `(price * quantity)` for all items in `items`. Don't include `shipping` or `tax`. \* `conversion_value` is typically required for meaningful reporting. If you [mark the event as a key event](https://support.google.com/analytics/answer/9267568) then it's recommended you set `conversion_value`. \* `currency` is required if you set `conversion_value`. |
| `transaction_id` | `string` | **Yes** | T_12345 | The unique identifier of a transaction. <br /> The `transaction_id` parameter helps you avoid getting duplicate events for a purchase. Set the `transaction_id` field on the [`Event`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#event) object. |
| `user_properties.customer_type` | [`CustomerType`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#google.ads.datamanager.v1.CustomerType) | No | `NEW` | Whether the conversion is from a `NEW` or `RETURNING` customer. |
| `cart_data.items` | `https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#item` | **Yes** |   | The items for the event. <br /> Set the `cart_data.items` field on the [`Event`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#event) object. |
| `cart_data.coupon_codes` | `string[]` | No | SUMMER_FUN | The coupon code associated with the event. <br /> <br /> Set the `coupon_codes` field on the [`CartData`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#cartdata) object. \* Only provide one coupon code in this list. \* This is independent from item-level coupon codes. |

#### Item fields

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `item_id` | `string` | Yes | I_12345 | A unique identifier for the item. Set the `item_id` field on the [`Item`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#item) object. |
| `unit_price` | `number` | Yes | 27.67 | The unit price excluding tax, shipping, and event scoped (transaction-level) discounts for this item. <br /> If the item has an item scoped discount, use the discounted unit price. For example, if an item has a unit price of 27.67 and a unit discount of 6.66, then set `unitPrice` to 21.01. |
| `quantity` | `number` | Yes | 1 | The quantity of units purchased for this particular item. |

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `shipping` | `number` | No | 3.33 | Shipping cost associated with a transaction. |
| `tax` | `number` | No | 1.11 | Tax cost associated with a transaction. |

#### Item parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `item_name` | `string` | **Yes\*** | Stan and Friends Tee | The name of the item. \*One of `item_id` or `item_name` is required. |
| `affiliation` | `string` | No | Google Store | A product affiliation to designate a supplying company or brick and mortar store location. Note: `affiliation` is only available at the item-scope. |
| `coupon` | `string` | No | SUMMER_FUN | The coupon name/code associated with the item. <br /> Event-level and item-level `coupon` parameters are independent. |
| `discount` | `number` | No | 2.22 | The unit monetary discount value associated with the item. |
| `index` | `number` | No | 5 | The index/position of the item in a list. |
| `item_brand` | `string` | No | Google | The brand of the item. |
| `item_category` | `string` | No | Apparel | The category of the item. If used as part of a category hierarchy or taxonomy then this will be the first category. |
| `item_category2` | `string` | No | Adult | The second category hierarchy or additional taxonomy for the item. |
| `item_category3` | `string` | No | Shirts | The third category hierarchy or additional taxonomy for the item. |
| `item_category4` | `string` | No | Crew | The fourth category hierarchy or additional taxonomy for the item. |
| `item_category5` | `string` | No | Short sleeve | The fifth category hierarchy or additional taxonomy for the item. |
| `item_list_id` | `string` | No | related_products | The ID of the list in which the item was presented to the user. <br /> If set, event-level `item_list_id` is ignored. If not set, event-level `item_list_id` is used, if present. |
| `item_list_name` | `string` | No | Related products | The name of the list in which the item was presented to the user. <br /> If set, event-level `item_list_name` is ignored. If not set, event-level `item_list_name` is used, if present. |
| `item_variant` | `string` | No | green | The item variant or unique code or description for additional item details/options. |
| `location_id` | `string` | No | ChIJIQBpAG2ahYAR_6128GcTUEo (the Google Place ID for San Francisco) | The physical location associated with the item (e.g. the physical store location). It's recommended to use the [Google Place ID](https://developers.google.com/maps/documentation/places/web-service/place-id) that corresponds to the associated item. A custom location ID can also be used. Note: `location_id` is only available at the item-scope. |

In addition to the prescribed parameters, you can include up to 27 [custom parameters](https://developers.google.com/analytics/devguides/collection/ga4/item-scoped-ecommerce) in the `items` array.

#### Example

The following example shows how to send a `purchase` event using the Data
Manager API. If you're upgrading from the Measurement Protocol, use the
tabs to migrate your requests to the Data Manager API.

### Data Manager API


    {
      "destinations": [
        {
          "operatingAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "loginAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "productDestinationId": "MEASUREMENT_ID"
        }
      ],
      "events": [
        {
          "eventName": "purchase",
          "transactionId": "TRANSACTION_ID",
          "conversionValue": 83.99,
          "currency": "USD",
          "eventTimestamp": "2025-06-10T23:42:33-05:00",
          "eventSource": "WEB",
          "clientId": "CLIENT_ID",
          "userId": "USER_ID",
          "userProperties": {
            "customerType": "RETURNING"
          },
          "cartData": {
            "couponCodes": [
              "SUMMER_FUN"
            ],
            "items": [
              {
                "itemId": "SKU_12345",
                "quantity": 3,
                "unitPrice": 10.01,
                "additionalItemParameters": [
                  {
                    "parameterName": "item_name",
                    "value": "Stan and Friends Tee"
                  },
                  {
                    "parameterName": "affiliation",
                    "value": "Google Merchandise Store"
                  },
                  {
                    "parameterName": "discount",
                    "value": "2.22"
                  },
                  {
                    "parameterName": "index",
                    "value": "0"
                  },
                  {
                    "parameterName": "item_brand",
                    "value": "Google"
                  },
                  {
                    "parameterName": "item_category",
                    "value": "Apparel"
                  },
                  {
                    "parameterName": "item_category2",
                    "value": "Adult"
                  },
                  {
                    "parameterName": "item_category3",
                    "value": "Shirts"
                  },
                  {
                    "parameterName": "item_category4",
                    "value": "Crew"
                  },
                  {
                    "parameterName": "item_category5",
                    "value": "Short sleeve"
                  },
                  {
                    "parameterName": "item_list_id",
                    "value": "related_products"
                  },
                  {
                    "parameterName": "item_list_name",
                    "value": "Related Products"
                  },
                  {
                    "parameterName": "item_variant",
                    "value": "green"
                  },
                  {
                    "parameterName": "location_id",
                    "value": "ChIJIQBpAG2ahYAR_6128GcTUEo"
                  },
                  {
                    "parameterName": "google_business_vertical",
                    "value": "retail"
                  }
                ]
              }
            ]
          },
          "additionalEventParameters": [
            {
              "parameterName": "shipping",
              "value": "3.33"
            },
            {
              "parameterName": "tax",
              "value": "1.11"
            }
          ]
        }
      ]
    }

### Measurement Protocol


```javascript
const measurementId = 'G-XXXXXXXXXX';
const apiSecret = '<secret_value>';
 
fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
    method: "POST",
    body: JSON.stringify({
    "client_id": "client_id",
    "events": [{
      "name": "purchase",
      "params": {
        "currency": "USD",
        "transaction_id": "T_12345",
        "value": 30.03,
        "coupon": "SUMMER_FUN",
        "shipping": 3.33,
        "tax": 1.11,
        "items": [
            {
            "item_id": "SKU_12345",
            "item_name": "Stan and Friends Tee",
            "affiliation": "Google Merchandise Store",
            "coupon": "SUMMER_FUN",
            "currency": "USD",
            "discount": 2.22,
            "index": 0,
            "item_brand": "Google",
            "item_category": "Apparel",
            "item_category2": "Adult",
            "item_category3": "Shirts",
            "item_category4": "Crew",
            "item_category5": "Short sleeve",
            "item_list_id": "related_products",
            "item_list_name": "Related Products",
            "item_variant": "green",
            "location_id": "ChIJIQBpAG2ahYAR_6128GcTUEo",
            "price": 10.01,
            "google_business_vertical": "retail",
            "quantity": 3
          }
        ]
      }
    }]
  })
});
```

<br />

### `refund`

This event signifies when one or more items is refunded to a user.

> [!NOTE]
> **Note:** We recommend that you include item information in your `refund` event to see item-level refund metrics in Analytics.

#### Event fields

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `currency` | `string` | **Yes\*** | USD | Currency of the items associated with the event, in [3-letter ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format. <br /> \* Value metrics on the `view_item` event to not contribute to revenue <br /> \* If you set `conversion_value` then `currency` is required for revenue metrics to be computed accurately. |
| `conversion_value` | `number` | **Yes\*** | 30.03 | The monetary value of the event. <br /> \* Set `conversion_value` to the sum of `(price * quantity)` for all items in `items`. Don't include `shipping` or `tax`. \* `conversion_value` is typically required for meaningful reporting. If you [mark the event as a key event](https://support.google.com/analytics/answer/9267568) then it's recommended you set `conversion_value`. \* `currency` is required if you set `conversion_value`. |
| `transaction_id` | `string` | **Yes** | T_12345 | The unique identifier of a transaction. |
| `cart_data.items` | `https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#item` | No |   | The items for the event. <br /> Set the `cart_data.items` field on the [`Event`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#event) object. |
| `cart_data.coupon_codes` | `string[]` | No | SUMMER_FUN | The coupon code associated with the event. <br /> <br /> Set the `coupon_codes` field on the [`CartData`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#cartdata) object. \* Only provide one coupon code in this list. \* This is independent from item-level coupon codes. |

#### Item fields

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `item_id` | `string` | Yes | I_12345 | A unique identifier for the item. Set the `item_id` field on the [`Item`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#item) object. |
| `unit_price` | `number` | Yes | 27.67 | The unit price excluding tax, shipping, and event scoped (transaction-level) discounts for this item. <br /> If the item has an item scoped discount, use the discounted unit price. For example, if an item has a unit price of 27.67 and a unit discount of 6.66, then set `unitPrice` to 21.01. |
| `quantity` | `number` | Yes | 1 | The quantity of units purchased for this particular item. |

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `shipping` | `number` | No | 3.33 | Shipping cost associated with a transaction. |
| `tax` | `number` | No | 1.11 | Tax cost associated with a transaction. |

#### Item parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `item_name` | `string` | **Yes\*** | Stan and Friends Tee | The name of the item. \*One of `item_id` or `item_name` is required. |
| `affiliation` | `string` | No | Google Store | A product affiliation to designate a supplying company or brick and mortar store location. Note: `affiliation` is only available at the item-scope. |
| `coupon` | `string` | No | SUMMER_FUN | The coupon name/code associated with the item. <br /> Event-level and item-level `coupon` parameters are independent. |
| `discount` | `number` | No | 2.22 | The unit monetary discount value associated with the item. |
| `index` | `number` | No | 5 | The index/position of the item in a list. |
| `item_brand` | `string` | No | Google | The brand of the item. |
| `item_category` | `string` | No | Apparel | The category of the item. If used as part of a category hierarchy or taxonomy then this will be the first category. |
| `item_category2` | `string` | No | Adult | The second category hierarchy or additional taxonomy for the item. |
| `item_category3` | `string` | No | Shirts | The third category hierarchy or additional taxonomy for the item. |
| `item_category4` | `string` | No | Crew | The fourth category hierarchy or additional taxonomy for the item. |
| `item_category5` | `string` | No | Short sleeve | The fifth category hierarchy or additional taxonomy for the item. |
| `item_list_id` | `string` | No | related_products | The ID of the list in which the item was presented to the user. <br /> If set, event-level `item_list_id` is ignored. If not set, event-level `item_list_id` is used, if present. |
| `item_list_name` | `string` | No | Related products | The name of the list in which the item was presented to the user. <br /> If set, event-level `item_list_name` is ignored. If not set, event-level `item_list_name` is used, if present. |
| `item_variant` | `string` | No | green | The item variant or unique code or description for additional item details/options. |
| `location_id` | `string` | No | ChIJIQBpAG2ahYAR_6128GcTUEo (the Google Place ID for San Francisco) | The physical location associated with the item (e.g. the physical store location). It's recommended to use the [Google Place ID](https://developers.google.com/maps/documentation/places/web-service/place-id) that corresponds to the associated item. A custom location ID can also be used. Note: `location_id` is only available at the item-scope. |

In addition to the prescribed parameters, you can include up to 27 [custom parameters](https://developers.google.com/analytics/devguides/collection/ga4/item-scoped-ecommerce) in the `items` array.

#### Example

The following example shows how to send a `refund` event using the Data
Manager API. If you're upgrading from the Measurement Protocol, use the
tabs to migrate your requests to the Data Manager API.

### Data Manager API


    {
      "destinations": [
        {
          "operatingAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "loginAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "productDestinationId": "MEASUREMENT_ID"
        }
      ],
      "events": [
        {
          "eventName": "refund",
          "conversionValue": 30.03,
          "currency": "USD",
          "transactionId": "T_12345",
          "eventTimestamp": "2025-06-10T23:42:33-05:00",
          "eventSource": "WEB",
          "clientId": "CLIENT_ID",
          "userId": "USER_ID",
          "additionalEventParameters": [
            {
              "parameterName": "shipping",
              "value": 3.33
            },
            {
              "parameterName": "tax",
              "value": 1.11
            }
          ],
          "cartData": {
            "couponCodes": [
              "SUMMER_FUN"
            ],
            "items": [
              {
                "itemId": "SKU_12345",
                "quantity": 1,
                "unitPrice": 29.99,
                "additionalItemParameters": [
                  {
                    "parameterName": "item_name",
                    "value": "Triblend Android T-Shirt"
                  }
                ]
              }
            ]
          }
        }
      ]
    }

### Measurement Protocol


```javascript
const measurementId = 'G-XXXXXXXXXX';
const apiSecret = '<secret_value>';
 
fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
  method: "POST",
  body: JSON.stringify({
    "client_id": "client_id",
    "events": [{
      "name": "refund",
      "params": {
        "currency": "USD",
        "transaction_id": "T_12345",
        "value": 30.03,
        "coupon": "SUMMER_FUN",
        "shipping": 3.33,
        "tax": 1.11,
        "items": [
          {
            "item_id": "SKU_12345",
            "item_name": "Stan and Friends Tee",
            "affiliation": "Google Merchandise Store",
            "coupon": "SUMMER_FUN",
            "currency": "USD",
            "discount": 2.22,
            "index": 0,
            "item_brand": "Google",
            "item_category": "Apparel",
            "item_category2": "Adult",
            "item_category3": "Shirts",
            "item_category4": "Crew",
            "item_category5": "Short sleeve",
            "item_list_id": "related_products",
            "item_list_name": "Related Products",
            "item_variant": "green",
            "location_id": "ChIJIQBpAG2ahYAR_6128GcTUEo",
            "price": 10.01,
            "google_business_vertical": "retail",
            "quantity": 3
          }
        ]
      }
    }]
  })
});
```

<br />

### `remove_from_cart`

This event signifies that an item was removed from a cart.

#### Event fields

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `currency` | `string` | **Yes\*** | USD | Currency of the items associated with the event, in [3-letter ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format. <br /> \* Value metrics on the `view_item` event to not contribute to revenue <br /> \* If you set `conversion_value` then `currency` is required for revenue metrics to be computed accurately. |
| `conversion_value` | `number` | **Yes\*** | 30.03 | The monetary value of the event. <br /> \* Set `conversion_value` to the sum of `(price * quantity)` for all items in `items`. Don't include `shipping` or `tax`. \* `conversion_value` is typically required for meaningful reporting. If you [mark the event as a key event](https://support.google.com/analytics/answer/9267568) then it's recommended you set `conversion_value`. \* `currency` is required if you set `conversion_value`. |
| `cart_data.items` | `https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#item` | **Yes** |   | The items for the event. <br /> Set the `cart_data.items` field on the [`Event`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#event) object. |

#### Item fields

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `item_id` | `string` | Yes | I_12345 | A unique identifier for the item. Set the `item_id` field on the [`Item`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#item) object. |
| `unit_price` | `number` | Yes | 27.67 | The unit price excluding tax, shipping, and event scoped (transaction-level) discounts for this item. <br /> If the item has an item scoped discount, use the discounted unit price. For example, if an item has a unit price of 27.67 and a unit discount of 6.66, then set `unitPrice` to 21.01. |
| `quantity` | `number` | Yes | 1 | The quantity of units purchased for this particular item. |


#### Item parameters

<br />

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `item_name` | `string` | **Yes\*** | Stan and Friends Tee | The name of the item. \*One of `item_id` or `item_name` is required. |
| `affiliation` | `string` | No | Google Store | A product affiliation to designate a supplying company or brick and mortar store location. Note: `affiliation` is only available at the item-scope. |
| `coupon` | `string` | No | SUMMER_FUN | The coupon name/code associated with the item. <br /> Event-level and item-level `coupon` parameters are independent. |
| `discount` | `number` | No | 2.22 | The unit monetary discount value associated with the item. |
| `index` | `number` | No | 5 | The index/position of the item in a list. |
| `item_brand` | `string` | No | Google | The brand of the item. |
| `item_category` | `string` | No | Apparel | The category of the item. If used as part of a category hierarchy or taxonomy then this will be the first category. |
| `item_category2` | `string` | No | Adult | The second category hierarchy or additional taxonomy for the item. |
| `item_category3` | `string` | No | Shirts | The third category hierarchy or additional taxonomy for the item. |
| `item_category4` | `string` | No | Crew | The fourth category hierarchy or additional taxonomy for the item. |
| `item_category5` | `string` | No | Short sleeve | The fifth category hierarchy or additional taxonomy for the item. |
| `item_list_id` | `string` | No | related_products | The ID of the list in which the item was presented to the user. <br /> If set, event-level `item_list_id` is ignored. If not set, event-level `item_list_id` is used, if present. |
| `item_list_name` | `string` | No | Related products | The name of the list in which the item was presented to the user. <br /> If set, event-level `item_list_name` is ignored. If not set, event-level `item_list_name` is used, if present. |
| `item_variant` | `string` | No | green | The item variant or unique code or description for additional item details/options. |
| `location_id` | `string` | No | ChIJIQBpAG2ahYAR_6128GcTUEo (the Google Place ID for San Francisco) | The physical location associated with the item (e.g. the physical store location). It's recommended to use the [Google Place ID](https://developers.google.com/maps/documentation/places/web-service/place-id) that corresponds to the associated item. A custom location ID can also be used. Note: `location_id` is only available at the item-scope. |

In addition to the prescribed parameters, you can include up to 27 [custom parameters](https://developers.google.com/analytics/devguides/collection/ga4/item-scoped-ecommerce) in the `items` array.

#### Example

The following example shows how to send a `remove_from_cart` event using the
Data Manager API. If you're upgrading from the Measurement Protocol, use the
tabs to migrate your requests to the Data Manager API.

### Data Manager API


    {
      "destinations": [
        {
          "operatingAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "loginAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "productDestinationId": "MEASUREMENT_ID"
        }
      ],
      "events": [
        {
          "eventName": "remove_from_cart",
          "conversionValue": 30.03,
          "currency": "USD",
          "eventTimestamp": "2025-06-10T23:42:33-05:00",
          "eventSource": "WEB",
          "clientId": "CLIENT_ID",
          "userId": "USER_ID",
          "cartData": {
            "items": [
              {
                "itemId": "SKU_12345",
                "quantity": 1,
                "unitPrice": 29.99,
                "additionalItemParameters": [
                  {
                    "parameterName": "item_name",
                    "value": "Triblend Android T-Shirt"
                  }
                ]
              }
            ]
          }
        }
      ]
    }

### Measurement Protocol


```javascript
const measurementId = 'G-XXXXXXXXXX';
const apiSecret = '<secret_value>';
 
fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
  method: "POST",
  body: JSON.stringify({
    "client_id": "client_id",
    "events": [{
      "name": "remove_from_cart",
      "params": {
        "currency": "USD",
        "value": 30.03,
        "items": [
          {
            "item_id": "SKU_12345",
            "item_name": "Stan and Friends Tee",
            "affiliation": "Google Merchandise Store",
            "coupon": "SUMMER_FUN",
            "currency": "USD",
            "discount": 2.22,
            "index": 0,
            "item_brand": "Google",
            "item_category": "Apparel",
            "item_category2": "Adult",
            "item_category3": "Shirts",
            "item_category4": "Crew",
            "item_category5": "Short sleeve",
            "item_list_id": "related_products",
            "item_list_name": "Related Products",
            "item_variant": "green",
            "location_id": "ChIJIQBpAG2ahYAR_6128GcTUEo",
            "price": 10.01,
            "google_business_vertical": "retail",
            "quantity": 3
          }
        ]
      }
    }]
  })
});
```

<br />

### `select_item`

This event signifies an item was selected from a list.

#### Event fields

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `cart_data.items` | `https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#item` | **Yes\*** |   | The items for the event. <br /> \* The `items` array is expected to have a single element, representing the selected item. If multiple elements are provided, only the first element in `items` will be used. <br /> Set the `cart_data.items` field on the [`Event`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#event) object. |

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `item_list_id` | `string` | No | related_products | The ID of the list in which the item was presented to the user. <br /> Ignored if set at the item-level. |
| `item_list_name` | `string` | No | Related products | The name of the list in which the item was presented to the user. <br /> Ignored if set at the item-level. |

#### Item parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `item_name` | `string` | **Yes\*** | Stan and Friends Tee | The name of the item. \*One of `item_id` or `item_name` is required. |
| `affiliation` | `string` | No | Google Store | A product affiliation to designate a supplying company or brick and mortar store location. Note: `affiliation` is only available at the item-scope. |
| `coupon` | `string` | No | SUMMER_FUN | The coupon name/code associated with the item. <br /> Event-level and item-level `coupon` parameters are independent. |
| `discount` | `number` | No | 2.22 | The unit monetary discount value associated with the item. |
| `index` | `number` | No | 5 | The index/position of the item in a list. |
| `item_brand` | `string` | No | Google | The brand of the item. |
| `item_category` | `string` | No | Apparel | The category of the item. If used as part of a category hierarchy or taxonomy then this will be the first category. |
| `item_category2` | `string` | No | Adult | The second category hierarchy or additional taxonomy for the item. |
| `item_category3` | `string` | No | Shirts | The third category hierarchy or additional taxonomy for the item. |
| `item_category4` | `string` | No | Crew | The fourth category hierarchy or additional taxonomy for the item. |
| `item_category5` | `string` | No | Short sleeve | The fifth category hierarchy or additional taxonomy for the item. |
| `item_list_id` | `string` | No | related_products | The ID of the list in which the item was presented to the user. <br /> If set, event-level `item_list_id` is ignored. If not set, event-level `item_list_id` is used, if present. |
| `item_list_name` | `string` | No | Related products | The name of the list in which the item was presented to the user. <br /> If set, event-level `item_list_name` is ignored. If not set, event-level `item_list_name` is used, if present. |
| `item_variant` | `string` | No | green | The item variant or unique code or description for additional item details/options. |
| `location_id` | `string` | No | ChIJIQBpAG2ahYAR_6128GcTUEo (the Google Place ID for San Francisco) | The physical location associated with the item (e.g. the physical store location). It's recommended to use the [Google Place ID](https://developers.google.com/maps/documentation/places/web-service/place-id) that corresponds to the associated item. A custom location ID can also be used. Note: `location_id` is only available at the item-scope. |

In addition to the prescribed parameters, you can include up to 27 [custom parameters](https://developers.google.com/analytics/devguides/collection/ga4/item-scoped-ecommerce) in the `items` array.

#### Example

The following example shows how to send a `select_item` event using the Data
Manager API. If you're upgrading from the Measurement Protocol, use the
tabs to migrate your requests to the Data Manager API.

### Data Manager API


    {
      "destinations": [
        {
          "operatingAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "loginAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "productDestinationId": "MEASUREMENT_ID"
        }
      ],
      "events": [
        {
          "eventName": "select_item",
          "eventTimestamp": "2025-06-10T23:42:33-05:00",
          "eventSource": "WEB",
          "clientId": "CLIENT_ID",
          "userId": "USER_ID",
          "additionalEventParameters": [
            {
              "parameterName": "item_list_id",
              "value": "related_products"
            },
            {
              "parameterName": "item_list_name",
              "value": "Related products"
            }
          ],
          "cartData": {
            "items": [
              {
                "itemId": "SKU_12345",
                "quantity": 1,
                "unitPrice": 29.99,
                "additionalItemParameters": [
                  {
                    "parameterName": "item_name",
                    "value": "Triblend Android T-Shirt"
                  }
                ]
              }
            ]
          }
        }
      ]
    }

### Measurement Protocol


```javascript
const measurementId = 'G-XXXXXXXXXX';
const apiSecret = '<secret_value>';
 
fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
  method: "POST",
  body: JSON.stringify({
    "client_id": "client_id",
    "events": [{
      "name": "select_item",
      "params": {
        "item_list_id": "related_products",
        "item_list_name": "Related products",
        "items": [
          {
            "item_id": "SKU_12345",
            "item_name": "Stan and Friends Tee",
            "affiliation": "Google Merchandise Store",
            "coupon": "SUMMER_FUN",
            "currency": "USD",
            "discount": 2.22,
            "index": 0,
            "item_brand": "Google",
            "item_category": "Apparel",
            "item_category2": "Adult",
            "item_category3": "Shirts",
            "item_category4": "Crew",
            "item_category5": "Short sleeve",
            "item_list_id": "related_products",
            "item_list_name": "Related Products",
            "item_variant": "green",
            "location_id": "ChIJIQBpAG2ahYAR_6128GcTUEo",
            "price": 10.01,
            "google_business_vertical": "retail",
            "quantity": 3
          }
        ]
      }
    }]
  })
});
```

<br />

### `select_promotion`

This event signifies a promotion was selected from a list.

#### Event fields

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `cart_data.items` | `https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#item` | No |   | The items for the event. <br /> Set the `cart_data.items` field on the [`Event`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#event) object. |

#### Item fields

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `item_id` | `string` | Yes | I_12345 | A unique identifier for the item. Set the `item_id` field on the [`Item`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#item) object. |
| `unit_price` | `number` | Yes | 27.67 | The unit price excluding tax, shipping, and event scoped (transaction-level) discounts for this item. <br /> If the item has an item scoped discount, use the discounted unit price. For example, if an item has a unit price of 27.67 and a unit discount of 6.66, then set `unitPrice` to 21.01. |
| `quantity` | `number` | Yes | 1 | The quantity of units purchased for this particular item. |

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `creative_name` | `string` | No | summer_banner2 | The name of the promotional creative. |
| `creative_slot` | `string` | No | featured_app_1 | The name of the promotional creative slot associated with the event. |
| `promotion_id` | `string` | No | P_12345 | The ID of the promotion associated with the event. |
| `promotion_name` | `string` | No | Summer Sale | The name of the promotion associated with the event. |

> [!NOTE]
> To populate item-scoped promotion dimensions, such as "Item promotion ID" or "Item promotion name", in Google Analytics reports, Google Analytics first looks for the corresponding promotion parameters (`promotion_id`, `promotion_name`, `creative_name`, and `creative_slot`) within each specific object in the `items` array of your ecommerce events. If a parameter is not found within the item object, Google Analytics will then use the value from the \*event-level\* parameter if one is provided. An item-scoped promotion dimension for a particular item will only report as "(not set)" if the relevant parameter is missing from \*both\* the item object and the event-level parameters. Item-level parameters always take precedence over event-level parameters.

#### Item parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `item_name` | `string` | **Yes\*** | Stan and Friends Tee | The name of the item. \*One of `item_id` or `item_name` is required. |
| `affiliation` | `string` | No | Google Store | A product affiliation to designate a supplying company or brick and mortar store location. Note: `affiliation` is only available at the item-scope. |
| `coupon` | `string` | No | SUMMER_FUN | The coupon name/code associated with the item. <br /> Event-level and item-level `coupon` parameters are independent. |
| `creative_name` | `string` | No | summer_banner2 | The name of the promotional creative. <br /> Defaults to event-level `creative_name` if not set. |
| `creative_slot` | `string` | No | featured_app_1 | The name of the promotional creative slot associated with the item. <br /> Defaults to event-level `creative_slot` if not set. |
| `discount` | `number` | No | 2.22 | The unit monetary discount value associated with the item. |
| `index` | `number` | No | 5 | The index/position of the item in a list. |
| `item_brand` | `string` | No | Google | The brand of the item. |
| `item_category` | `string` | No | Apparel | The category of the item. If used as part of a category hierarchy or taxonomy then this will be the first category. |
| `item_category2` | `string` | No | Adult | The second category hierarchy or additional taxonomy for the item. |
| `item_category3` | `string` | No | Shirts | The third category hierarchy or additional taxonomy for the item. |
| `item_category4` | `string` | No | Crew | The fourth category hierarchy or additional taxonomy for the item. |
| `item_category5` | `string` | No | Short sleeve | The fifth category hierarchy or additional taxonomy for the item. |
| `item_list_id` | `string` | No | related_products | The ID of the list in which the item was presented to the user. <br /> If set, event-level `item_list_id` is ignored. If not set, event-level `item_list_id` is used, if present. |
| `item_list_name` | `string` | No | Related products | The name of the list in which the item was presented to the user. <br /> If set, event-level `item_list_name` is ignored. If not set, event-level `item_list_name` is used, if present. |
| `item_variant` | `string` | No | green | The item variant or unique code or description for additional item details/options. |
| `location_id` | `string` | No | ChIJIQBpAG2ahYAR_6128GcTUEo (the Google Place ID for San Francisco) | The physical location associated with the item (e.g. the physical store location). It's recommended to use the [Google Place ID](https://developers.google.com/maps/documentation/places/web-service/place-id) that corresponds to the associated item. A custom location ID can also be used. Note: `location_id` is only available at the item-scope. |
| `promotion_id` | `string` | No | P_12345 | The ID of the promotion associated with the item. <br /> Defaults to event-level `promotion_id` if not set. |
| `promotion_name` | `string` | No | Summer Sale | The name of the promotion associated with the item. <br /> Defaults to event-level `promotion_name` if not set. |

In addition to the prescribed parameters, you can include up to 27 [custom parameters](https://developers.google.com/analytics/devguides/collection/ga4/item-scoped-ecommerce) in the `items` array.

#### Example

The following example shows how to send a `select_promotion` event using the
Data Manager API. If you're upgrading from the Measurement Protocol, use the
tabs to migrate your requests to the Data Manager API.

### Data Manager API


    {
      "destinations": [
        {
          "operatingAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "loginAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "productDestinationId": "MEASUREMENT_ID"
        }
      ],
      "events": [
        {
          "eventName": "select_promotion",
          "eventTimestamp": "2025-06-10T23:42:33-05:00",
          "eventSource": "WEB",
          "clientId": "CLIENT_ID",
          "userId": "USER_ID",
          "additionalEventParameters": [
            {
              "parameterName": "creative_name",
              "value": "Summer Banner"
            },
            {
              "parameterName": "creative_slot",
              "value": "featured_app_1"
            },
            {
              "parameterName": "promotion_id",
              "value": "P_12345"
            },
            {
              "parameterName": "promotion_name",
              "value": "Summer Sale"
            }
          ],
          "cartData": {
            "items": [
              {
                "itemId": "SKU_12345",
                "quantity": 1,
                "unitPrice": 29.99,
                "additionalItemParameters": [
                  {
                    "parameterName": "item_name",
                    "value": "Triblend Android T-Shirt"
                  }
                ]
              }
            ]
          }
        }
      ]
    }

### Measurement Protocol


```javascript
const measurementId = 'G-XXXXXXXXXX';
const apiSecret = '<secret_value>';
 
fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
  method: "POST",
  body: JSON.stringify({
    "client_id": "client_id",
    "events": [{
      "name": "select_promotion",
      "params": {
        "creative_name": "Summer Banner",
        "creative_slot": "featured_app_1",
        "promotion_id": "P_12345",
        "promotion_name": "Summer Sale",
        "items": [
          {
            "item_id": "SKU_12345",
            "item_name": "Stan and Friends Tee",
            "affiliation": "Google Merchandise Store",
            "coupon": "SUMMER_FUN",
            "creative_name": "summer_banner2",
            "creative_slot": "featured_app_1",
            "currency": "USD",
            "discount": 2.22,
            "index": 0,
            "item_brand": "Google",
            "item_category": "Apparel",
            "item_category2": "Adult",
            "item_category3": "Shirts",
            "item_category4": "Crew",
            "item_category5": "Short sleeve",
            "item_list_id": "related_products",
            "item_list_name": "Related Products",
            "item_variant": "green",
            "location_id": "ChIJIQBpAG2ahYAR_6128GcTUEo",
            "price": 10.01,
            "promotion_id": "P_12345",
            "promotion_name": "Summer Sale",
            "google_business_vertical": "retail",
            "quantity": 3
          }
        ]
      }
    }]
  })
});
```

<br />

### `view_cart`

This event signifies that a user viewed their cart.

#### Event fields

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `currency` | `string` | **Yes\*** | USD | Currency of the items associated with the event, in [3-letter ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format. <br /> \* Value metrics on the `view_item` event to not contribute to revenue <br /> \* If you set `conversion_value` then `currency` is required for revenue metrics to be computed accurately. |
| `conversion_value` | `number` | **Yes\*** | 30.03 | The monetary value of the event. <br /> \* Set `conversion_value` to the sum of `(price * quantity)` for all items in `items`. Don't include `shipping` or `tax`. \* `conversion_value` is typically required for meaningful reporting. If you [mark the event as a key event](https://support.google.com/analytics/answer/9267568) then it's recommended you set `conversion_value`. \* `currency` is required if you set `conversion_value`. |
| `cart_data.items` | `https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#item` | **Yes** |   | The items for the event. <br /> Set the `cart_data.items` field on the [`Event`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#event) object. |

#### Item fields

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `item_id` | `string` | Yes | I_12345 | A unique identifier for the item. Set the `item_id` field on the [`Item`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#item) object. |
| `unit_price` | `number` | Yes | 27.67 | The unit price excluding tax, shipping, and event scoped (transaction-level) discounts for this item. <br /> If the item has an item scoped discount, use the discounted unit price. For example, if an item has a unit price of 27.67 and a unit discount of 6.66, then set `unitPrice` to 21.01. |
| `quantity` | `number` | Yes | 1 | The quantity of units purchased for this particular item. |


#### Item parameters

<br />

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `item_name` | `string` | **Yes\*** | Stan and Friends Tee | The name of the item. \*One of `item_id` or `item_name` is required. |
| `affiliation` | `string` | No | Google Store | A product affiliation to designate a supplying company or brick and mortar store location. Note: `affiliation` is only available at the item-scope. |
| `coupon` | `string` | No | SUMMER_FUN | The coupon name/code associated with the item. <br /> Event-level and item-level `coupon` parameters are independent. |
| `discount` | `number` | No | 2.22 | The unit monetary discount value associated with the item. |
| `index` | `number` | No | 5 | The index/position of the item in a list. |
| `item_brand` | `string` | No | Google | The brand of the item. |
| `item_category` | `string` | No | Apparel | The category of the item. If used as part of a category hierarchy or taxonomy then this will be the first category. |
| `item_category2` | `string` | No | Adult | The second category hierarchy or additional taxonomy for the item. |
| `item_category3` | `string` | No | Shirts | The third category hierarchy or additional taxonomy for the item. |
| `item_category4` | `string` | No | Crew | The fourth category hierarchy or additional taxonomy for the item. |
| `item_category5` | `string` | No | Short sleeve | The fifth category hierarchy or additional taxonomy for the item. |
| `item_list_id` | `string` | No | related_products | The ID of the list in which the item was presented to the user. <br /> If set, event-level `item_list_id` is ignored. If not set, event-level `item_list_id` is used, if present. |
| `item_list_name` | `string` | No | Related products | The name of the list in which the item was presented to the user. <br /> If set, event-level `item_list_name` is ignored. If not set, event-level `item_list_name` is used, if present. |
| `item_variant` | `string` | No | green | The item variant or unique code or description for additional item details/options. |
| `location_id` | `string` | No | ChIJIQBpAG2ahYAR_6128GcTUEo (the Google Place ID for San Francisco) | The physical location associated with the item (e.g. the physical store location). It's recommended to use the [Google Place ID](https://developers.google.com/maps/documentation/places/web-service/place-id) that corresponds to the associated item. A custom location ID can also be used. Note: `location_id` is only available at the item-scope. |

In addition to the prescribed parameters, you can include up to 27 [custom parameters](https://developers.google.com/analytics/devguides/collection/ga4/item-scoped-ecommerce) in the `items` array.

#### Example

The following example shows how to send a `view_cart` event using the Data
Manager API. If you're upgrading from the Measurement Protocol, use the
tabs to migrate your requests to the Data Manager API.

### Data Manager API


    {
      "destinations": [
        {
          "operatingAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "loginAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "productDestinationId": "MEASUREMENT_ID"
        }
      ],
      "events": [
        {
          "eventName": "view_cart",
          "conversionValue": 7.77,
          "currency": "USD",
          "eventTimestamp": "2025-06-10T23:42:33-05:00",
          "eventSource": "WEB",
          "clientId": "CLIENT_ID",
          "userId": "USER_ID",
          "cartData": {
            "items": [
              {
                "itemId": "SKU_12345",
                "quantity": 1,
                "unitPrice": 29.99,
                "additionalItemParameters": [
                  {
                    "parameterName": "item_name",
                    "value": "Triblend Android T-Shirt"
                  }
                ]
              },
              {
                "itemId": "SKU_67890",
                "quantity": 2,
                "unitPrice": 24.00,
                "additionalItemParameters": [
                  {
                    "parameterName": "item_name",
                    "value": "Google Red Team Hat"
                  }
                ]
              }
            ]
          }
        }
      ]
    }

### Measurement Protocol


```javascript
const measurementId = 'G-XXXXXXXXXX';
const apiSecret = '<secret_value>';
 
fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
  method: "POST",
  body: JSON.stringify({
    "client_id": "client_id",
    "events": [{
      "name": "view_cart",
      "params": {
        "currency": "USD",
        "value": 7.77,
        "items": [
          {
            "item_id": "SKU_12345",
            "item_name": "Stan and Friends Tee",
            "affiliation": "Google Merchandise Store",
            "coupon": "SUMMER_FUN",
            "currency": "USD",
            "discount": 2.22,
            "index": 0,
            "item_brand": "Google",
            "item_category": "Apparel",
            "item_category2": "Adult",
            "item_category3": "Shirts",
            "item_category4": "Crew",
            "item_category5": "Short sleeve",
            "item_list_id": "related_products",
            "item_list_name": "Related Products",
            "item_variant": "green",
            "location_id": "ChIJIQBpAG2ahYAR_6128GcTUEo",
            "price": 10.01,
            "google_business_vertical": "retail",
            "quantity": 3
          }
        ]
      }
    }]
  })
});
```

<br />

### `view_item`

This event signifies that some content was shown to the user. Use this event to
discover the most popular items viewed.

#### Event fields

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `currency` | `string` | **Yes\*** | USD | Currency of the items associated with the event, in [3-letter ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format. <br /> \* Value metrics on the `view_item` event to not contribute to revenue <br /> \* If you set `conversion_value` then `currency` is required for revenue metrics to be computed accurately. |
| `conversion_value` | `number` | **Yes\*** | 30.03 | The monetary value of the event. <br /> \* Set `conversion_value` to the sum of `(price * quantity)` for all items in `items`. Don't include `shipping` or `tax`. \* `conversion_value` is typically required for meaningful reporting. If you [mark the event as a key event](https://support.google.com/analytics/answer/9267568) then it's recommended you set `conversion_value`. \* `currency` is required if you set `conversion_value`. |
| `cart_data.items` | `https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#item` | **Yes** |   | The items for the event. <br /> Set the `cart_data.items` field on the [`Event`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#event) object. |

#### Item fields

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `item_id` | `string` | Yes | I_12345 | A unique identifier for the item. Set the `item_id` field on the [`Item`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#item) object. |
| `unit_price` | `number` | Yes | 27.67 | The unit price excluding tax, shipping, and event scoped (transaction-level) discounts for this item. <br /> If the item has an item scoped discount, use the discounted unit price. For example, if an item has a unit price of 27.67 and a unit discount of 6.66, then set `unitPrice` to 21.01. |
| `quantity` | `number` | Yes | 1 | The quantity of units purchased for this particular item. |


#### Item parameters

<br />

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `item_name` | `string` | **Yes\*** | Stan and Friends Tee | The name of the item. \*One of `item_id` or `item_name` is required. |
| `affiliation` | `string` | No | Google Store | A product affiliation to designate a supplying company or brick and mortar store location. Note: `affiliation` is only available at the item-scope. |
| `coupon` | `string` | No | SUMMER_FUN | The coupon name/code associated with the item. <br /> Event-level and item-level `coupon` parameters are independent. |
| `discount` | `number` | No | 2.22 | The unit monetary discount value associated with the item. |
| `index` | `number` | No | 5 | The index/position of the item in a list. |
| `item_brand` | `string` | No | Google | The brand of the item. |
| `item_category` | `string` | No | Apparel | The category of the item. If used as part of a category hierarchy or taxonomy then this will be the first category. |
| `item_category2` | `string` | No | Adult | The second category hierarchy or additional taxonomy for the item. |
| `item_category3` | `string` | No | Shirts | The third category hierarchy or additional taxonomy for the item. |
| `item_category4` | `string` | No | Crew | The fourth category hierarchy or additional taxonomy for the item. |
| `item_category5` | `string` | No | Short sleeve | The fifth category hierarchy or additional taxonomy for the item. |
| `item_list_id` | `string` | No | related_products | The ID of the list in which the item was presented to the user. <br /> If set, event-level `item_list_id` is ignored. If not set, event-level `item_list_id` is used, if present. |
| `item_list_name` | `string` | No | Related products | The name of the list in which the item was presented to the user. <br /> If set, event-level `item_list_name` is ignored. If not set, event-level `item_list_name` is used, if present. |
| `item_variant` | `string` | No | green | The item variant or unique code or description for additional item details/options. |
| `location_id` | `string` | No | ChIJIQBpAG2ahYAR_6128GcTUEo (the Google Place ID for San Francisco) | The physical location associated with the item (e.g. the physical store location). It's recommended to use the [Google Place ID](https://developers.google.com/maps/documentation/places/web-service/place-id) that corresponds to the associated item. A custom location ID can also be used. Note: `location_id` is only available at the item-scope. |

In addition to the prescribed parameters, you can include up to 27 [custom parameters](https://developers.google.com/analytics/devguides/collection/ga4/item-scoped-ecommerce) in the `items` array.

#### Example

The following example shows how to send a `view_item` event using the Data
Manager API. If you're upgrading from the Measurement Protocol, use the
tabs to migrate your requests to the Data Manager API.

### Data Manager API


    {
      "destinations": [
        {
          "operatingAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "loginAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "productDestinationId": "MEASUREMENT_ID"
        }
      ],
      "events": [
        {
          "eventName": "view_item",
          "conversionValue": 7.77,
          "currency": "USD",
          "eventTimestamp": "2025-06-10T23:42:33-05:00",
          "eventSource": "WEB",
          "clientId": "CLIENT_ID",
          "userId": "USER_ID",
          "cartData": {
            "items": [
              {
                "itemId": "SKU_12345",
                "quantity": 1,
                "unitPrice": 29.99,
                "additionalItemParameters": [
                  {
                    "parameterName": "item_name",
                    "value": "Triblend Android T-Shirt"
                  }
                ]
              },
              {
                "itemId": "SKU_67890",
                "quantity": 2,
                "unitPrice": 24.00,
                "additionalItemParameters": [
                  {
                    "parameterName": "item_name",
                    "value": "Google Red Team Hat"
                  }
                ]
              }
            ]
          }
        }
      ]
    }

### Measurement Protocol


```javascript
const measurementId = 'G-XXXXXXXXXX';
const apiSecret = '<secret_value>';
 
fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
  method: "POST",
  body: JSON.stringify({
    "client_id": "client_id",
    "events": [{
      "name": "view_item",
      "params": {
        "currency": "USD",
        "value": 7.77,
        "items": [
          {
            "item_id": "SKU_12345",
            "item_name": "Stan and Friends Tee",
            "affiliation": "Google Merchandise Store",
            "coupon": "SUMMER_FUN",
            "currency": "USD",
            "discount": 2.22,
            "index": 0,
            "item_brand": "Google",
            "item_category": "Apparel",
            "item_category2": "Adult",
            "item_category3": "Shirts",
            "item_category4": "Crew",
            "item_category5": "Short sleeve",
            "item_list_id": "related_products",
            "item_list_name": "Related Products",
            "item_variant": "green",
            "location_id": "ChIJIQBpAG2ahYAR_6128GcTUEo",
            "price": 10.01,
            "google_business_vertical": "retail",
            "quantity": 3
          }
        ],
      }
    }]
  })
});
```

<br />

### `view_item_list`

Log this event when the user has been presented with a list of items of a
certain category.

#### Event fields

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `currency` | `string` | **Yes\*** | USD | Currency of the items associated with the event, in [3-letter ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format. <br /> \* Value metrics on the `view_item` event to not contribute to revenue <br /> \* If you set `conversion_value` then `currency` is required for revenue metrics to be computed accurately. |
| `cart_data.items` | `https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#item` | **Yes** |   | The items for the event. <br /> Set the `cart_data.items` field on the [`Event`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#event) object. |

#### Item fields

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `item_id` | `string` | Yes | I_12345 | A unique identifier for the item. Set the `item_id` field on the [`Item`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#item) object. |
| `unit_price` | `number` | Yes | 27.67 | The unit price excluding tax, shipping, and event scoped (transaction-level) discounts for this item. <br /> If the item has an item scoped discount, use the discounted unit price. For example, if an item has a unit price of 27.67 and a unit discount of 6.66, then set `unitPrice` to 21.01. |
| `quantity` | `number` | Yes | 1 | The quantity of units purchased for this particular item. |


#### Item parameters

<br />

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `item_name` | `string` | **Yes\*** | Stan and Friends Tee | The name of the item. \*One of `item_id` or `item_name` is required. |
| `affiliation` | `string` | No | Google Store | A product affiliation to designate a supplying company or brick and mortar store location. Note: `affiliation` is only available at the item-scope. |
| `coupon` | `string` | No | SUMMER_FUN | The coupon name/code associated with the item. <br /> Event-level and item-level `coupon` parameters are independent. |
| `discount` | `number` | No | 2.22 | The unit monetary discount value associated with the item. |
| `index` | `number` | No | 5 | The index/position of the item in a list. |
| `item_brand` | `string` | No | Google | The brand of the item. |
| `item_category` | `string` | No | Apparel | The category of the item. If used as part of a category hierarchy or taxonomy then this will be the first category. |
| `item_category2` | `string` | No | Adult | The second category hierarchy or additional taxonomy for the item. |
| `item_category3` | `string` | No | Shirts | The third category hierarchy or additional taxonomy for the item. |
| `item_category4` | `string` | No | Crew | The fourth category hierarchy or additional taxonomy for the item. |
| `item_category5` | `string` | No | Short sleeve | The fifth category hierarchy or additional taxonomy for the item. |
| `item_list_id` | `string` | No | related_products | The ID of the list in which the item was presented to the user. <br /> If set, event-level `item_list_id` is ignored. If not set, event-level `item_list_id` is used, if present. |
| `item_list_name` | `string` | No | Related products | The name of the list in which the item was presented to the user. <br /> If set, event-level `item_list_name` is ignored. If not set, event-level `item_list_name` is used, if present. |
| `item_variant` | `string` | No | green | The item variant or unique code or description for additional item details/options. |
| `location_id` | `string` | No | ChIJIQBpAG2ahYAR_6128GcTUEo (the Google Place ID for San Francisco) | The physical location associated with the item (e.g. the physical store location). It's recommended to use the [Google Place ID](https://developers.google.com/maps/documentation/places/web-service/place-id) that corresponds to the associated item. A custom location ID can also be used. Note: `location_id` is only available at the item-scope. |

In addition to the prescribed parameters, you can include up to 27 [custom parameters](https://developers.google.com/analytics/devguides/collection/ga4/item-scoped-ecommerce) in the `items` array.

#### Example

The following example shows how to send a `view_item_list` event using the Data
Manager API. If you're upgrading from the Measurement Protocol, use the
tabs to migrate your requests to the Data Manager API.

### Data Manager API


    {
      "destinations": [
        {
          "operatingAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "loginAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "productDestinationId": "MEASUREMENT_ID"
        }
      ],
      "events": [
        {
          "eventName": "view_item_list",
          "currency": "USD",
          "eventTimestamp": "2025-06-10T23:42:33-05:00",
          "eventSource": "WEB",
          "clientId": "CLIENT_ID",
          "userId": "USER_ID",
          "additionalEventParameters": [
            {
              "parameterName": "item_list_id",
              "value": "related_products"
            },
            {
              "parameterName": "item_list_name",
              "value": "Related products"
            }
          ],
          "cartData": {
            "items": [
              {
                "itemId": "SKU_12345",
                "quantity": 1,
                "unitPrice": 29.99,
                "additionalItemParameters": [
                  {
                    "parameterName": "item_name",
                    "value": "Triblend Android T-Shirt"
                  }
                ]
              }
            ]
          }
        }
      ]
    }

### Measurement Protocol


```javascript
const measurementId = 'G-XXXXXXXXXX';
const apiSecret = '<secret_value>';
 
fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
  method: "POST",
  body: JSON.stringify({
    "client_id": "client_id",
    "events": [{
      "name": "view_item_list",
      "params": {
        "item_list_id": "related_products",
        "item_list_name": "Related products",
        "items": [
          {
            "item_id": "SKU_12345",
            "item_name": "Stan and Friends Tee",
            "affiliation": "Google Merchandise Store",
            "coupon": "SUMMER_FUN",
            "currency": "USD",
            "discount": 2.22,
            "index": 0,
            "item_brand": "Google",
            "item_category": "Apparel",
            "item_category2": "Adult",
            "item_category3": "Shirts",
            "item_category4": "Crew",
            "item_category5": "Short sleeve",
            "item_list_id": "related_products",
            "item_list_name": "Related Products",
            "item_variant": "green",
            "location_id": "ChIJIQBpAG2ahYAR_6128GcTUEo",
            "price": 10.01,
            "google_business_vertical": "retail",
            "quantity": 3
          }
        ]
      }
    }]
  })
});
```

<br />

### `view_promotion`

This event signifies a promotion was viewed from a list.

#### Event fields

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `cart_data.items` | `https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#item` | **Yes\*** |   | The items for the event. <br /> \* The `items` array is expected to have a single element, representing the item associated with the promotion. If multiple elements are provided, only the first element in `items` will be used. <br /> Set the `cart_data.items` field on the [`Event`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#event) object. |

#### Item fields

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `item_id` | `string` | Yes | I_12345 | A unique identifier for the item. Set the `item_id` field on the [`Item`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#item) object. |
| `unit_price` | `number` | Yes | 27.67 | The unit price excluding tax, shipping, and event scoped (transaction-level) discounts for this item. <br /> If the item has an item scoped discount, use the discounted unit price. For example, if an item has a unit price of 27.67 and a unit discount of 6.66, then set `unitPrice` to 21.01. |
| `quantity` | `number` | Yes | 1 | The quantity of units purchased for this particular item. |

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `creative_name` | `string` | No | summer_banner2 | The name of the promotional creative. |
| `creative_slot` | `string` | No | featured_app_1 | The name of the promotional creative slot associated with the event. |
| `promotion_id` | `string` | No | P_12345 | The ID of the promotion associated with the event. |
| `promotion_name` | `string` | No | Summer Sale | The name of the promotion associated with the event. |

> [!NOTE]
> To populate item-scoped promotion dimensions, such as "Item promotion ID" or "Item promotion name", in Google Analytics reports, Google Analytics first looks for the corresponding promotion parameters (`promotion_id`, `promotion_name`, `creative_name`, and `creative_slot`) within each specific object in the `items` array of your ecommerce events. If a parameter is not found within the item object, Google Analytics will then use the value from the \*event-level\* parameter if one is provided. An item-scoped promotion dimensions for a particular item will only report as "(not set)" if the relevant parameter is missing from \*both\* the item object and the event-level parameters. Item-level parameters always take precedence over event-level parameters.

#### Item parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `item_name` | `string` | **Yes\*** | Stan and Friends Tee | The name of the item. \*One of `item_id` or `item_name` is required. |
| `affiliation` | `string` | No | Google Store | A product affiliation to designate a supplying company or brick and mortar store location. Note: `affiliation` is only available at the item-scope. |
| `coupon` | `string` | No | SUMMER_FUN | The coupon name/code associated with the item. <br /> Event-level and item-level `coupon` parameters are independent. |
| `creative_name` | `string` | No | summer_banner2 | The name of the promotional creative. <br /> Defaults to event-level `creative_name` if not set. |
| `creative_slot` | `string` | No | featured_app_1 | The name of the promotional creative slot associated with the item. <br /> Defaults to event-level `creative_slot` if not set. |
| `discount` | `number` | No | 2.22 | The unit monetary discount value associated with the item. |
| `index` | `number` | No | 5 | The index/position of the item in a list. |
| `item_brand` | `string` | No | Google | The brand of the item. |
| `item_category` | `string` | No | Apparel | The category of the item. If used as part of a category hierarchy or taxonomy then this will be the first category. |
| `item_category2` | `string` | No | Adult | The second category hierarchy or additional taxonomy for the item. |
| `item_category3` | `string` | No | Shirts | The third category hierarchy or additional taxonomy for the item. |
| `item_category4` | `string` | No | Crew | The fourth category hierarchy or additional taxonomy for the item. |
| `item_category5` | `string` | No | Short sleeve | The fifth category hierarchy or additional taxonomy for the item. |
| `item_list_id` | `string` | No | related_products | The ID of the list in which the item was presented to the user. <br /> If set, event-level `item_list_id` is ignored. If not set, event-level `item_list_id` is used, if present. |
| `item_list_name` | `string` | No | Related products | The name of the list in which the item was presented to the user. <br /> If set, event-level `item_list_name` is ignored. If not set, event-level `item_list_name` is used, if present. |
| `item_variant` | `string` | No | green | The item variant or unique code or description for additional item details/options. |
| `location_id` | `string` | No | ChIJIQBpAG2ahYAR_6128GcTUEo (the Google Place ID for San Francisco) | The physical location associated with the item (e.g. the physical store location). It's recommended to use the [Google Place ID](https://developers.google.com/maps/documentation/places/web-service/place-id) that corresponds to the associated item. A custom location ID can also be used. Note: `location_id` is only available at the item-scope. |
| `promotion_id` | `string` | No | P_12345 | The ID of the promotion associated with the item. <br /> Defaults to event-level `promotion_id` if not set. |
| `promotion_name` | `string` | No | Summer Sale | The name of the promotion associated with the item. <br /> Defaults to event-level `promotion_name` if not set. |

In addition to the prescribed parameters, you can include up to 27 [custom parameters](https://developers.google.com/analytics/devguides/collection/ga4/item-scoped-ecommerce) in the `items` array.

#### Example

The following example shows how to send a `view_promotion` event using the Data
Manager API. If you're upgrading from the Measurement Protocol, use the
tabs to migrate your requests to the Data Manager API.

### Data Manager API


    {
      "destinations": [
        {
          "operatingAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "loginAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "productDestinationId": "MEASUREMENT_ID"
        }
      ],
      "events": [
        {
          "eventName": "view_promotion",
          "eventTimestamp": "2025-06-10T23:42:33-05:00",
          "eventSource": "WEB",
          "clientId": "CLIENT_ID",
          "userId": "USER_ID",
          "additionalEventParameters": [
            {
              "parameterName": "creative_name",
              "value": "Summer Banner"
            },
            {
              "parameterName": "creative_slot",
              "value": "featured_app_1"
            },
            {
              "parameterName": "promotion_id",
              "value": "P_12345"
            },
            {
              "parameterName": "promotion_name",
              "value": "Summer Sale"
            }
          ],
          "cartData": {
            "items": [
              {
                "itemId": "SKU_12345",
                "quantity": 1,
                "unitPrice": 29.99,
                "additionalItemParameters": [
                  {
                    "parameterName": "item_name",
                    "value": "Triblend Android T-Shirt"
                  }
                ]
              }
            ]
          }
        }
      ]
    }

### Measurement Protocol


```javascript
const measurementId = 'G-XXXXXXXXXX';
const apiSecret = '<secret_value>';
 
fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
  method: "POST",
  body: JSON.stringify({
    "client_id": "client_id",
    "events": [{
      "name": "view_promotion",
      "params": {
        "creative_name": "Summer Banner",
        "creative_slot": "featured_app_1",
        "promotion_id": "P_12345",
        "promotion_name": "Summer Sale",
        "items": [
          {
            "item_id": "SKU_12345",
            "item_name": "Stan and Friends Tee",
            "affiliation": "Google Merchandise Store",
            "coupon": "SUMMER_FUN",
            "creative_name": "summer_banner2",
            "creative_slot": "featured_app_1",
            "currency": "USD",
            "discount": 2.22,
            "index": 0,
            "item_brand": "Google",
            "item_category": "Apparel",
            "item_category2": "Adult",
            "item_category3": "Shirts",
            "item_category4": "Crew",
            "item_category5": "Short sleeve",
            "item_list_id": "related_products",
            "item_list_name": "Related Products",
            "item_variant": "green",
            "location_id": "ChIJIQBpAG2ahYAR_6128GcTUEo",
            "price": 10.01,
            "promotion_id": "P_12345",
            "promotion_name": "Summer Sale",
            "google_business_vertical": "retail",
            "quantity": 3
          }
        ]
      }
    }]
  })
});
```

<br />

## Games

### `level_up`

This event signifies that a player has leveled up in a game. Use it to gauge the
level distribution of your user base and identify levels that are difficult to
complete.

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `level` | `number` | No | 5 | The level of the character. |
| `character` | `string` | No | Player 1 | The character that leveled up. |

#### Example

The following example shows how to send a `level_up` event using the Data
Manager API. If you're upgrading from the Measurement Protocol, use the
tabs to migrate your requests to the Data Manager API.

### Data Manager API


    {
      "destinations": [
        {
          "operatingAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "loginAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "productDestinationId": "MEASUREMENT_ID"
        }
      ],
      "events": [
        {
          "eventName": "level_up",
          "eventTimestamp": "2025-06-10T23:42:33-05:00",
          "eventSource": "WEB",
          "clientId": "CLIENT_ID",
          "additionalEventParameters": [
            {
              "parameterName": "level",
              "value": 5
            },
            {
              "parameterName": "character",
              "value": "Player 1"
            }
          ]
        }
      ]
    }

### Measurement Protocol


```javascript
const measurementId = 'G-XXXXXXXXXX';
const apiSecret = '<secret_value>';
 
fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
  method: "POST",
  body: JSON.stringify({
    "client_id": "client_id",
    "events": [{
      "name": "level_up",
      "params": {
        "level": 5,
        "character": "Player 1"
      }
    }]
  })
});
```

<br />

### `post_score`

Send this event when the user posts a score. Use this event to understand how
users are performing in your game and correlate high scores with audiences or
behaviors.

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `score` | `number` | **Yes** | 10000 | The score to post. |
| `level` | `number` | No | 5 | The level for the score. |
| `character` | `string` | No | Player 1 | The character that achieved the score. |

#### Example

The following example shows how to send a `post_score` event using the Data
Manager API. If you're upgrading from the Measurement Protocol, use the
tabs to migrate your requests to the Data Manager API.

### Data Manager API


    {
      "destinations": [
        {
          "operatingAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "loginAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "productDestinationId": "MEASUREMENT_ID"
        }
      ],
      "events": [
        {
          "eventName": "post_score",
          "eventTimestamp": "2025-06-10T23:42:33-05:00",
          "eventSource": "WEB",
          "clientId": "CLIENT_ID",
          "additionalEventParameters": [
            {
              "parameterName": "score",
              "value": 10000
            },
            {
              "parameterName": "level",
              "value": 5
            },
            {
              "parameterName": "character",
              "value": "Player 1"
            }
          ]
        }
      ]
    }

### Measurement Protocol


```javascript
const measurementId = 'G-XXXXXXXXXX';
const apiSecret = '<secret_value>';
 
fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
  method: "POST",
  body: JSON.stringify({
    "client_id": "client_id",
    "events": [{
      "name": "post_score",
      "params": {
        "score": 10000,
        "level": 5,
        "character": "Player 1"
      }
    }]
  })
});
```

<br />

### `unlock_achievement`

Log this event when the user has unlocked an achievement. This event can help
you understand how users are experiencing your game.

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `achievement_id` | `string` | **Yes** | A_12345 | The id of the achievement that was unlocked. |

#### Example

The following example shows how to send a `unlock_achievement` event using the
Data Manager API. If you're upgrading from the Measurement Protocol, use the
tabs to migrate your requests to the Data Manager API.

### Data Manager API


    {
      "destinations": [
        {
          "operatingAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "loginAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "productDestinationId": "MEASUREMENT_ID"
        }
      ],
      "events": [
        {
          "eventName": "unlock_achievement",
          "eventTimestamp": "2025-06-10T23:42:33-05:00",
          "eventSource": "WEB",
          "clientId": "CLIENT_ID",
          "additionalEventParameters": [
            {
              "parameterName": "achievement_id",
              "value": "A_12345"
            }
          ]
        }
      ]
    }

### Measurement Protocol


```javascript
const measurementId = 'G-XXXXXXXXXX';
const apiSecret = '<secret_value>';
 
fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
  method: "POST",
  body: JSON.stringify({
    "client_id": "client_id",
    "events": [{
      "name": "unlock_achievement",
      "params": {
        "achievement_id": "A_12345"
      }
    }]
  })
});
```

<br />

## Lead generation

### `close_convert_lead`

Log this event when a qualified lead is successfully converted into a customer.
This typically signifies the end of the lead nurturing process, such as when a
contract is signed, a paid subscription starts, or a final sale is completed.

- **Note:** To track initial lead acquisition, such as form submissions, newsletter sign-ups, or demo requests, use the [`generate_lead`](https://developers.google.com/data-manager/api/reference/analytics/recommended-events#generate_lead) event.

#### Event fields

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `currency` | `string` | Yes\* | USD | Currency of the `conversion_value` of the event, in [3-letter ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format. <br /> \* If you set `conversion_value` then `currency` is required for revenue metrics to be computed accurately. |
| `conversion_value` | `number` | Yes\* | 30.03 | The monetary value of the event. <br /> \* `conversion_value` is typically required for meaningful reporting. If you [mark the event as a key event](https://support.google.com/analytics/answer/9267568) then it's recommended you set `conversion_value`. \* `currency` is required if you set `conversion_value`. |
| `cart_data.items` | `https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#item` | No |   | The items associated with the event. <br /> Set the `cart_data.items` field on the [`Event`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#event) object. |

#### Item fields

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `item_id` | `string` | Yes | I_12345 | A unique identifier for the item. Set the `item_id` field on the [`Item`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#item) object. |
| `unit_price` | `number` | Yes | 27.67 | The unit price excluding tax, shipping, and event scoped (transaction-level) discounts for this item. <br /> If the item has an item scoped discount, use the discounted unit price. For example, if an item has a unit price of 27.67 and a unit discount of 6.66, then set `unitPrice` to 21.01. |
| `quantity` | `number` | Yes | 1 | The quantity of units purchased for this particular item. |

#### Item parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `item_name` | `string` | **Yes\*** | Stan and Friends Tee | The name of the item. \*One of `item_id` or `item_name` is required. |
| `affiliation` | `string` | No | Google Store | A product affiliation to designate a supplying company or brick and mortar store location. Note: `affiliation` is only available at the item-scope. |
| `coupon` | `string` | No | SUMMER_FUN | The coupon name/code associated with the item. <br /> Event-level and item-level `coupon` parameters are independent. |
| `discount` | `number` | No | 2.22 | The unit monetary discount value associated with the item. |
| `index` | `number` | No | 5 | The index/position of the item in a list. |
| `item_brand` | `string` | No | Google | The brand of the item. |
| `item_category` | `string` | No | Apparel | The category of the item. If used as part of a category hierarchy or taxonomy then this will be the first category. |
| `item_category2` | `string` | No | Adult | The second category hierarchy or additional taxonomy for the item. |
| `item_category3` | `string` | No | Shirts | The third category hierarchy or additional taxonomy for the item. |
| `item_category4` | `string` | No | Crew | The fourth category hierarchy or additional taxonomy for the item. |
| `item_category5` | `string` | No | Short sleeve | The fifth category hierarchy or additional taxonomy for the item. |
| `item_list_id` | `string` | No | related_products | The ID of the list in which the item was presented to the user. <br /> If set, event-level `item_list_id` is ignored. If not set, event-level `item_list_id` is used, if present. |
| `item_list_name` | `string` | No | Related products | The name of the list in which the item was presented to the user. <br /> If set, event-level `item_list_name` is ignored. If not set, event-level `item_list_name` is used, if present. |
| `item_variant` | `string` | No | green | The item variant or unique code or description for additional item details/options. |
| `location_id` | `string` | No | ChIJIQBpAG2ahYAR_6128GcTUEo (the Google Place ID for San Francisco) | The physical location associated with the item (e.g. the physical store location). It's recommended to use the [Google Place ID](https://developers.google.com/maps/documentation/places/web-service/place-id) that corresponds to the associated item. A custom location ID can also be used. Note: `location_id` is only available at the item-scope. |

In addition to the prescribed parameters, you can include up to 27 [custom parameters](https://developers.google.com/analytics/devguides/collection/ga4/item-scoped-ecommerce) in the `items` array.

#### Example

Review the following example:

### Data Manager API


    {
      "destinations": [
        {
          "operatingAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "loginAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "productDestinationId": "MEASUREMENT_ID"
        }
      ],
      "events": [
        {
          "eventName": "close_convert_lead",
          "eventTimestamp": "2025-06-10T23:42:33-05:00",
          "eventSource": "WEB",
          "clientId": "CLIENT_ID",
          "currency": "USD",
          "conversionValue": 30.03,
          "cartData": {
            "items": [
              {
                "itemId": "SKU_12345",
                "quantity": 1,
                "unitPrice": 29.99,
                "additionalItemParameters": [
                  {
                    "parameterName": "item_name",
                    "value": "Stan and Friends Tee"
                  }
                ]
              }
            ]
          }
        }
      ]
    }

### Measurement Protocol


```javascript
const measurementId = 'G-XXXXXXXXXX';
const apiSecret = '<secret_value>';
 
fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
  method: "POST",
  body: JSON.stringify({
    "client_id": "client_id",
    "events": [{
      "name": "close_convert_lead",
      "params": {
        "currency": "USD",
        "value": 30.03,
        "items": [
          {
            "item_id": "SKU_12345",
            "item_name": "Stan and Friends Tee"
          }
        ]
      }
    }]
  })
});
```

<br />

### `close_unconvert_lead`

This event measures when a user is marked as not becoming a converted lead,
along with the reason.

#### Event fields

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `currency` | `string` | Yes\* | USD | Currency of the `conversion_value` of the event, in [3-letter ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format. <br /> \* If you set `conversion_value` then `currency` is required for revenue metrics to be computed accurately. |
| `conversion_value` | `number` | Yes\* | 30.03 | The monetary value of the event. <br /> \* `conversion_value` is typically required for meaningful reporting. If you [mark the event as a key event](https://support.google.com/analytics/answer/9267568) then it's recommended you set `conversion_value`. \* `currency` is required if you set `conversion_value`. |
| `cart_data.items` | `https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#item` | No |   | The items associated with the event. <br /> Set the `cart_data.items` field on the [`Event`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#event) object. |

#### Item fields

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `item_id` | `string` | Yes | I_12345 | A unique identifier for the item. Set the `item_id` field on the [`Item`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#item) object. |
| `unit_price` | `number` | Yes | 27.67 | The unit price excluding tax, shipping, and event scoped (transaction-level) discounts for this item. <br /> If the item has an item scoped discount, use the discounted unit price. For example, if an item has a unit price of 27.67 and a unit discount of 6.66, then set `unitPrice` to 21.01. |
| `quantity` | `number` | Yes | 1 | The quantity of units purchased for this particular item. |

#### Item parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `item_name` | `string` | **Yes\*** | Stan and Friends Tee | The name of the item. \*One of `item_id` or `item_name` is required. |
| `affiliation` | `string` | No | Google Store | A product affiliation to designate a supplying company or brick and mortar store location. Note: `affiliation` is only available at the item-scope. |
| `coupon` | `string` | No | SUMMER_FUN | The coupon name/code associated with the item. <br /> Event-level and item-level `coupon` parameters are independent. |
| `discount` | `number` | No | 2.22 | The unit monetary discount value associated with the item. |
| `index` | `number` | No | 5 | The index/position of the item in a list. |
| `item_brand` | `string` | No | Google | The brand of the item. |
| `item_category` | `string` | No | Apparel | The category of the item. If used as part of a category hierarchy or taxonomy then this will be the first category. |
| `item_category2` | `string` | No | Adult | The second category hierarchy or additional taxonomy for the item. |
| `item_category3` | `string` | No | Shirts | The third category hierarchy or additional taxonomy for the item. |
| `item_category4` | `string` | No | Crew | The fourth category hierarchy or additional taxonomy for the item. |
| `item_category5` | `string` | No | Short sleeve | The fifth category hierarchy or additional taxonomy for the item. |
| `item_list_id` | `string` | No | related_products | The ID of the list in which the item was presented to the user. <br /> If set, event-level `item_list_id` is ignored. If not set, event-level `item_list_id` is used, if present. |
| `item_list_name` | `string` | No | Related products | The name of the list in which the item was presented to the user. <br /> If set, event-level `item_list_name` is ignored. If not set, event-level `item_list_name` is used, if present. |
| `item_variant` | `string` | No | green | The item variant or unique code or description for additional item details/options. |
| `location_id` | `string` | No | ChIJIQBpAG2ahYAR_6128GcTUEo (the Google Place ID for San Francisco) | The physical location associated with the item (e.g. the physical store location). It's recommended to use the [Google Place ID](https://developers.google.com/maps/documentation/places/web-service/place-id) that corresponds to the associated item. A custom location ID can also be used. Note: `location_id` is only available at the item-scope. |

In addition to the prescribed parameters, you can include up to 27 [custom parameters](https://developers.google.com/analytics/devguides/collection/ga4/item-scoped-ecommerce) in the `items` array.

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `unconvert_lead_reason` | `string` | No | Never responded | The reason the lead was unconverted. |
| `items` | `Array<Item>` | No |   | The items associated with the event. |

#### Example

Review the following example:

### Data Manager API


    {
      "destinations": [
        {
          "operatingAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "loginAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "productDestinationId": "MEASUREMENT_ID"
        }
      ],
      "events": [
        {
          "eventName": "close_unconvert_lead",
          "eventTimestamp": "2025-06-10T23:42:33-05:00",
          "eventSource": "WEB",
          "clientId": "CLIENT_ID",
          "currency": "USD",
          "conversionValue": 30.03,
          "additionalEventParameters": [
            {
              "parameterName": "unconvert_lead_reason",
              "value": "Never responded"
            }
          ],
          "cartData": {
            "items": [
              {
                "itemId": "SKU_12345",
                "quantity": 1,
                "unitPrice": 29.99,
                "additionalItemParameters": [
                  {
                    "parameterName": "item_name",
                    "value": "Stan and Friends Tee"
                  }
                ]
              }
            ]
          }
        }
      ]
    }

### Measurement Protocol


```javascript
const measurementId = 'G-XXXXXXXXXX';
const apiSecret = '<secret_value>';
 
fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
  method: "POST",
  body: JSON.stringify({
    "client_id": "client_id",
    "events": [{
      "name": "close_unconvert_lead",
      "params": {
        "currency": "USD",
        "value": 30.03,
        "unconvert_lead_reason": "Never responded",
        "items": [
          {
            "item_id": "SKU_12345",
            "item_name": "Stan and Friends Tee"
          }
        ]
      }
    }]
  })
});
```

<br />

### `disqualify_lead`

This event measures when a user is marked as disqualified to become a lead,
along with the reason for the disqualification.

#### Event fields

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `currency` | `string` | Yes\* | USD | Currency of the `conversion_value` of the event, in [3-letter ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format. <br /> \* If you set `conversion_value` then `currency` is required for revenue metrics to be computed accurately. |
| `conversion_value` | `number` | Yes\* | 30.03 | The monetary value of the event. <br /> \* `conversion_value` is typically required for meaningful reporting. If you [mark the event as a key event](https://support.google.com/analytics/answer/9267568) then it's recommended you set `conversion_value`. \* `currency` is required if you set `conversion_value`. |
| `cart_data.items` | `https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#item` | No |   | The items associated with the event. <br /> Set the `cart_data.items` field on the [`Event`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#event) object. |

#### Item fields

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `item_id` | `string` | Yes | I_12345 | A unique identifier for the item. Set the `item_id` field on the [`Item`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#item) object. |
| `unit_price` | `number` | Yes | 27.67 | The unit price excluding tax, shipping, and event scoped (transaction-level) discounts for this item. <br /> If the item has an item scoped discount, use the discounted unit price. For example, if an item has a unit price of 27.67 and a unit discount of 6.66, then set `unitPrice` to 21.01. |
| `quantity` | `number` | Yes | 1 | The quantity of units purchased for this particular item. |

#### Item parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `item_name` | `string` | **Yes\*** | Stan and Friends Tee | The name of the item. \*One of `item_id` or `item_name` is required. |
| `affiliation` | `string` | No | Google Store | A product affiliation to designate a supplying company or brick and mortar store location. Note: `affiliation` is only available at the item-scope. |
| `coupon` | `string` | No | SUMMER_FUN | The coupon name/code associated with the item. <br /> Event-level and item-level `coupon` parameters are independent. |
| `discount` | `number` | No | 2.22 | The unit monetary discount value associated with the item. |
| `index` | `number` | No | 5 | The index/position of the item in a list. |
| `item_brand` | `string` | No | Google | The brand of the item. |
| `item_category` | `string` | No | Apparel | The category of the item. If used as part of a category hierarchy or taxonomy then this will be the first category. |
| `item_category2` | `string` | No | Adult | The second category hierarchy or additional taxonomy for the item. |
| `item_category3` | `string` | No | Shirts | The third category hierarchy or additional taxonomy for the item. |
| `item_category4` | `string` | No | Crew | The fourth category hierarchy or additional taxonomy for the item. |
| `item_category5` | `string` | No | Short sleeve | The fifth category hierarchy or additional taxonomy for the item. |
| `item_list_id` | `string` | No | related_products | The ID of the list in which the item was presented to the user. <br /> If set, event-level `item_list_id` is ignored. If not set, event-level `item_list_id` is used, if present. |
| `item_list_name` | `string` | No | Related products | The name of the list in which the item was presented to the user. <br /> If set, event-level `item_list_name` is ignored. If not set, event-level `item_list_name` is used, if present. |
| `item_variant` | `string` | No | green | The item variant or unique code or description for additional item details/options. |
| `location_id` | `string` | No | ChIJIQBpAG2ahYAR_6128GcTUEo (the Google Place ID for San Francisco) | The physical location associated with the item (e.g. the physical store location). It's recommended to use the [Google Place ID](https://developers.google.com/maps/documentation/places/web-service/place-id) that corresponds to the associated item. A custom location ID can also be used. Note: `location_id` is only available at the item-scope. |

In addition to the prescribed parameters, you can include up to 27 [custom parameters](https://developers.google.com/analytics/devguides/collection/ga4/item-scoped-ecommerce) in the `items` array.

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `disqualified_lead_reason` | `string` | No | Not looking to buy | The reason a lead was marked as disqualified. |
| `items` | `Array<Item>` | No |   | The items associated with the event. |

#### Example

The following example shows how to send a `disqualify_lead` event using the Data
Manager API. If you're upgrading from the Measurement Protocol, use the
tabs to migrate your requests to the Data Manager API.

### Data Manager API


    {
      "destinations": [
        {
          "operatingAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "loginAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "productDestinationId": "MEASUREMENT_ID"
        }
      ],
      "events": [
        {
          "eventName": "disqualify_lead",
          "eventTimestamp": "2025-06-10T23:42:33-05:00",
          "eventSource": "WEB",
          "clientId": "CLIENT_ID",
          "currency": "USD",
          "conversionValue": 30.03,
          "additionalEventParameters": [
            {
              "parameterName": "disqualified_lead_reason",
              "value": "Not looking to buy"
            }
          ],
          "cartData": {
            "items": [
              {
                "itemId": "SKU_12345",
                "quantity": 1,
                "unitPrice": 29.99,
                "additionalItemParameters": [
                  {
                    "parameterName": "item_name",
                    "value": "Stan and Friends Tee"
                  }
                ]
              }
            ]
          }
        }
      ]
    }

### Measurement Protocol


```javascript
const measurementId = 'G-XXXXXXXXXX';
const apiSecret = '<secret_value>';
 
fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
  method: "POST",
  body: JSON.stringify({
    "client_id": "client_id",
    "events": [{
      "name": "disqualify_lead",
      "params": {
        "currency": "USD",
        "value": 30.03,
        "disqualified_lead_reason": "Not looking to buy",
        "items": [
          {
            "item_id": "SKU_12345",
            "item_name": "Stan and Friends Tee"
          }
        ]
      }
    }]
  })
});
```

<br />

### `generate_lead`

This event measures when a lead has been generated (for example, through a
form). Log this to understand the effectiveness of your marketing campaigns and
how many customers re-engage with your business after remarketing to the
customers.

#### Event fields

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `currency` | `string` | Yes\* | USD | Currency of the `conversion_value` of the event, in [3-letter ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format. <br /> \* If you set `conversion_value` then `currency` is required for revenue metrics to be computed accurately. |
| `conversion_value` | `number` | Yes\* | 30.03 | The monetary value of the event. <br /> \* `conversion_value` is typically required for meaningful reporting. If you [mark the event as a key event](https://support.google.com/analytics/answer/9267568) then it's recommended you set `conversion_value`. \* `currency` is required if you set `conversion_value`. |
| `cart_data.items` | `https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#item` | No |   | The items associated with the event. <br /> Set the `cart_data.items` field on the [`Event`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#event) object. |

#### Item fields

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `item_id` | `string` | Yes | I_12345 | A unique identifier for the item. Set the `item_id` field on the [`Item`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#item) object. |
| `unit_price` | `number` | Yes | 27.67 | The unit price excluding tax, shipping, and event scoped (transaction-level) discounts for this item. <br /> If the item has an item scoped discount, use the discounted unit price. For example, if an item has a unit price of 27.67 and a unit discount of 6.66, then set `unitPrice` to 21.01. |
| `quantity` | `number` | Yes | 1 | The quantity of units purchased for this particular item. |

#### Item parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `item_name` | `string` | **Yes\*** | Stan and Friends Tee | The name of the item. \*One of `item_id` or `item_name` is required. |
| `affiliation` | `string` | No | Google Store | A product affiliation to designate a supplying company or brick and mortar store location. Note: `affiliation` is only available at the item-scope. |
| `coupon` | `string` | No | SUMMER_FUN | The coupon name/code associated with the item. <br /> Event-level and item-level `coupon` parameters are independent. |
| `discount` | `number` | No | 2.22 | The unit monetary discount value associated with the item. |
| `index` | `number` | No | 5 | The index/position of the item in a list. |
| `item_brand` | `string` | No | Google | The brand of the item. |
| `item_category` | `string` | No | Apparel | The category of the item. If used as part of a category hierarchy or taxonomy then this will be the first category. |
| `item_category2` | `string` | No | Adult | The second category hierarchy or additional taxonomy for the item. |
| `item_category3` | `string` | No | Shirts | The third category hierarchy or additional taxonomy for the item. |
| `item_category4` | `string` | No | Crew | The fourth category hierarchy or additional taxonomy for the item. |
| `item_category5` | `string` | No | Short sleeve | The fifth category hierarchy or additional taxonomy for the item. |
| `item_list_id` | `string` | No | related_products | The ID of the list in which the item was presented to the user. <br /> If set, event-level `item_list_id` is ignored. If not set, event-level `item_list_id` is used, if present. |
| `item_list_name` | `string` | No | Related products | The name of the list in which the item was presented to the user. <br /> If set, event-level `item_list_name` is ignored. If not set, event-level `item_list_name` is used, if present. |
| `item_variant` | `string` | No | green | The item variant or unique code or description for additional item details/options. |
| `location_id` | `string` | No | ChIJIQBpAG2ahYAR_6128GcTUEo (the Google Place ID for San Francisco) | The physical location associated with the item (e.g. the physical store location). It's recommended to use the [Google Place ID](https://developers.google.com/maps/documentation/places/web-service/place-id) that corresponds to the associated item. A custom location ID can also be used. Note: `location_id` is only available at the item-scope. |

In addition to the prescribed parameters, you can include up to 27 [custom parameters](https://developers.google.com/analytics/devguides/collection/ga4/item-scoped-ecommerce) in the `items` array.

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `lead_source` | `string` | No | Trade show | The source of the lead. |
| `items` | `Array<Item>` | No |   | The items associated with the event. |

#### Example

The following example shows how to send a `generate_lead` event using the Data
Manager API. If you're upgrading from the Measurement Protocol, use the
tabs to migrate your requests to the Data Manager API.

### Data Manager API


    {
      "destinations": [
        {
          "operatingAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "loginAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "productDestinationId": "MEASUREMENT_ID"
        }
      ],
      "events": [
        {
          "eventName": "generate_lead",
          "eventTimestamp": "2025-06-10T23:42:33-05:00",
          "eventSource": "WEB",
          "clientId": "CLIENT_ID",
          "currency": "USD",
          "conversionValue": 30.03,
          "additionalEventParameters": [
            {
              "parameterName": "lead_source",
              "value": "Trade show"
            }
          ],
          "cartData": {
            "items": [
              {
                "itemId": "SKU_12345",
                "quantity": 1,
                "unitPrice": 29.99,
                "additionalItemParameters": [
                  {
                    "parameterName": "item_name",
                    "value": "Stan and Friends Tee"
                  }
                ]
              }
            ]
          }
        }
      ]
    }

### Measurement Protocol


```javascript
const measurementId = 'G-XXXXXXXXXX';
const apiSecret = '<secret_value>';
 
fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
  method: "POST",
  body: JSON.stringify({
    "client_id": "client_id",
    "events": [{
      "name": "generate_lead",
      "params": {
        "currency": "USD",
        "value": 30.03,
        "lead_source": "Trade show",
        "items": [
          {
            "item_id": "SKU_12345",
            "item_name": "Stan and Friends Tee"
          }
        ]
      }
    }]
  })
});
```

<br />

### `qualify_lead`

This event measures when a user is marked as meeting the criteria to become a
qualified lead.

#### Event fields

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `currency` | `string` | Yes\* | USD | Currency of the `conversion_value` of the event, in [3-letter ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format. <br /> \* If you set `conversion_value` then `currency` is required for revenue metrics to be computed accurately. |
| `conversion_value` | `number` | Yes\* | 30.03 | The monetary value of the event. <br /> \* `conversion_value` is typically required for meaningful reporting. If you [mark the event as a key event](https://support.google.com/analytics/answer/9267568) then it's recommended you set `conversion_value`. \* `currency` is required if you set `conversion_value`. |
| `cart_data.items` | `https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#item` | No |   | The items associated with the event. <br /> Set the `cart_data.items` field on the [`Event`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#event) object. |

#### Item fields

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `item_id` | `string` | Yes | I_12345 | A unique identifier for the item. Set the `item_id` field on the [`Item`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#item) object. |
| `unit_price` | `number` | Yes | 27.67 | The unit price excluding tax, shipping, and event scoped (transaction-level) discounts for this item. <br /> If the item has an item scoped discount, use the discounted unit price. For example, if an item has a unit price of 27.67 and a unit discount of 6.66, then set `unitPrice` to 21.01. |
| `quantity` | `number` | Yes | 1 | The quantity of units purchased for this particular item. |

#### Item parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `item_name` | `string` | **Yes\*** | Stan and Friends Tee | The name of the item. \*One of `item_id` or `item_name` is required. |
| `affiliation` | `string` | No | Google Store | A product affiliation to designate a supplying company or brick and mortar store location. Note: `affiliation` is only available at the item-scope. |
| `coupon` | `string` | No | SUMMER_FUN | The coupon name/code associated with the item. <br /> Event-level and item-level `coupon` parameters are independent. |
| `discount` | `number` | No | 2.22 | The unit monetary discount value associated with the item. |
| `index` | `number` | No | 5 | The index/position of the item in a list. |
| `item_brand` | `string` | No | Google | The brand of the item. |
| `item_category` | `string` | No | Apparel | The category of the item. If used as part of a category hierarchy or taxonomy then this will be the first category. |
| `item_category2` | `string` | No | Adult | The second category hierarchy or additional taxonomy for the item. |
| `item_category3` | `string` | No | Shirts | The third category hierarchy or additional taxonomy for the item. |
| `item_category4` | `string` | No | Crew | The fourth category hierarchy or additional taxonomy for the item. |
| `item_category5` | `string` | No | Short sleeve | The fifth category hierarchy or additional taxonomy for the item. |
| `item_list_id` | `string` | No | related_products | The ID of the list in which the item was presented to the user. <br /> If set, event-level `item_list_id` is ignored. If not set, event-level `item_list_id` is used, if present. |
| `item_list_name` | `string` | No | Related products | The name of the list in which the item was presented to the user. <br /> If set, event-level `item_list_name` is ignored. If not set, event-level `item_list_name` is used, if present. |
| `item_variant` | `string` | No | green | The item variant or unique code or description for additional item details/options. |
| `location_id` | `string` | No | ChIJIQBpAG2ahYAR_6128GcTUEo (the Google Place ID for San Francisco) | The physical location associated with the item (e.g. the physical store location). It's recommended to use the [Google Place ID](https://developers.google.com/maps/documentation/places/web-service/place-id) that corresponds to the associated item. A custom location ID can also be used. Note: `location_id` is only available at the item-scope. |

In addition to the prescribed parameters, you can include up to 27 [custom parameters](https://developers.google.com/analytics/devguides/collection/ga4/item-scoped-ecommerce) in the `items` array.

#### Example

The following example shows how to send a `qualify_lead` event using the Data
Manager API. If you're upgrading from the Measurement Protocol, use the
tabs to migrate your requests to the Data Manager API.

### Data Manager API


    {
      "destinations": [
        {
          "operatingAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "loginAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "productDestinationId": "MEASUREMENT_ID"
        }
      ],
      "events": [
        {
          "eventName": "qualify_lead",
          "eventTimestamp": "2025-06-10T23:42:33-05:00",
          "eventSource": "WEB",
          "clientId": "CLIENT_ID",
          "currency": "USD",
          "conversionValue": 30.03,
          "cartData": {
            "items": [
              {
                "itemId": "SKU_12345",
                "quantity": 1,
                "unitPrice": 29.99,
                "additionalItemParameters": [
                  {
                    "parameterName": "item_name",
                    "value": "Stan and Friends Tee"
                  }
                ]
              }
            ]
          }
        }
      ]
    }

### Measurement Protocol


```javascript
const measurementId = 'G-XXXXXXXXXX';
const apiSecret = '<secret_value>';
 
fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
  method: "POST",
  body: JSON.stringify({
    "client_id": "client_id",
    "events": [{
      "name": "qualify_lead",
      "params": {
        "currency": "USD",
        "value": 30.03,
        "items": [
          {
            "item_id": "SKU_12345",
            "item_name": "Stan and Friends Tee"
          }
        ]
      }
    }]
  })
});
```

<br />

### `working_lead`

This event measures when a user contacts or is contacted by a representative.

#### Event fields

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `currency` | `string` | Yes\* | USD | Currency of the `conversion_value` of the event, in [3-letter ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes) format. <br /> \* If you set `conversion_value` then `currency` is required for revenue metrics to be computed accurately. |
| `conversion_value` | `number` | Yes\* | 30.03 | The monetary value of the event. <br /> \* `conversion_value` is typically required for meaningful reporting. If you [mark the event as a key event](https://support.google.com/analytics/answer/9267568) then it's recommended you set `conversion_value`. \* `currency` is required if you set `conversion_value`. |
| `cart_data.items` | `https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#item` | No |   | The items associated with the event. <br /> Set the `cart_data.items` field on the [`Event`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#event) object. |

#### Item fields

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `item_id` | `string` | Yes | I_12345 | A unique identifier for the item. Set the `item_id` field on the [`Item`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#item) object. |
| `unit_price` | `number` | Yes | 27.67 | The unit price excluding tax, shipping, and event scoped (transaction-level) discounts for this item. <br /> If the item has an item scoped discount, use the discounted unit price. For example, if an item has a unit price of 27.67 and a unit discount of 6.66, then set `unitPrice` to 21.01. |
| `quantity` | `number` | Yes | 1 | The quantity of units purchased for this particular item. |

#### Item parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `item_name` | `string` | **Yes\*** | Stan and Friends Tee | The name of the item. \*One of `item_id` or `item_name` is required. |
| `affiliation` | `string` | No | Google Store | A product affiliation to designate a supplying company or brick and mortar store location. Note: `affiliation` is only available at the item-scope. |
| `coupon` | `string` | No | SUMMER_FUN | The coupon name/code associated with the item. <br /> Event-level and item-level `coupon` parameters are independent. |
| `discount` | `number` | No | 2.22 | The unit monetary discount value associated with the item. |
| `index` | `number` | No | 5 | The index/position of the item in a list. |
| `item_brand` | `string` | No | Google | The brand of the item. |
| `item_category` | `string` | No | Apparel | The category of the item. If used as part of a category hierarchy or taxonomy then this will be the first category. |
| `item_category2` | `string` | No | Adult | The second category hierarchy or additional taxonomy for the item. |
| `item_category3` | `string` | No | Shirts | The third category hierarchy or additional taxonomy for the item. |
| `item_category4` | `string` | No | Crew | The fourth category hierarchy or additional taxonomy for the item. |
| `item_category5` | `string` | No | Short sleeve | The fifth category hierarchy or additional taxonomy for the item. |
| `item_list_id` | `string` | No | related_products | The ID of the list in which the item was presented to the user. <br /> If set, event-level `item_list_id` is ignored. If not set, event-level `item_list_id` is used, if present. |
| `item_list_name` | `string` | No | Related products | The name of the list in which the item was presented to the user. <br /> If set, event-level `item_list_name` is ignored. If not set, event-level `item_list_name` is used, if present. |
| `item_variant` | `string` | No | green | The item variant or unique code or description for additional item details/options. |
| `location_id` | `string` | No | ChIJIQBpAG2ahYAR_6128GcTUEo (the Google Place ID for San Francisco) | The physical location associated with the item (e.g. the physical store location). It's recommended to use the [Google Place ID](https://developers.google.com/maps/documentation/places/web-service/place-id) that corresponds to the associated item. A custom location ID can also be used. Note: `location_id` is only available at the item-scope. |

In addition to the prescribed parameters, you can include up to 27 [custom parameters](https://developers.google.com/analytics/devguides/collection/ga4/item-scoped-ecommerce) in the `items` array.

#### Parameters

| Name | Type | Required | Example value | Description |
|---|---|---|---|---|
| `lead_status` | `string` | No | Started conversations | The status of the lead. |
| `items` | `Array<Item>` | No |   | The items associated with the event. |

#### Example

Review the following example:

### Data Manager API


    {
      "destinations": [
        {
          "operatingAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "loginAccount": {
            "accountType": "GOOGLE_ANALYTICS_PROPERTY",
            "accountId": "GOOGLE_ANALYTICS_PROPERTY_ID"
          },
          "productDestinationId": "MEASUREMENT_ID"
        }
      ],
      "events": [
        {
          "eventName": "working_lead",
          "eventTimestamp": "2025-06-10T23:42:33-05:00",
          "eventSource": "WEB",
          "clientId": "CLIENT_ID",
          "currency": "USD",
          "conversionValue": 30.03,
          "additionalEventParameters": [
            {
              "parameterName": "lead_status",
              "value": "Started conversations"
            }
          ],
          "cartData": {
            "items": [
              {
                "itemId": "SKU_12345",
                "quantity": 1,
                "unitPrice": 29.99,
                "additionalItemParameters": [
                  {
                    "parameterName": "item_name",
                    "value": "Stan and Friends Tee"
                  }
                ]
              }
            ]
          }
        }
      ]
    }

### Measurement Protocol


```javascript
const measurementId = 'G-XXXXXXXXXX';
const apiSecret = '<secret_value>';
 
fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
  method: "POST",
  body: JSON.stringify({
    "client_id": "client_id",
    "events": [{
      "name": "working_lead",
      "params": {
        "currency": "USD",
        "value": 30.03,
        "lead_status": "Started conversations",
        "items": [
          {
            "item_id": "SKU_12345",
            "item_name": "Stan and Friends Tee"
          }
        ]
      }
    }]
  })
});
```

<br />
