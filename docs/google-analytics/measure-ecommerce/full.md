# Measure ecommerce Stay organized with collections Save and categorize content based on your preferences.

- On this page
- [Before you begin](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtm#before_you_begin)
    - [Add the GA4 configuration tag to your website](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtm#add_the_ga4_configuration_tag_to_your_website)
    - [Measure ecommerce events with the GA4 Event tag](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtm#send_ecommerce)
- [Recommendations](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtm#recommendations)
- [Set up Google Ads Dynamic remarketing](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtm#set_up_google_ads_dynamic_remarketing)
- [Implementation](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtm#implementation)
- [Select an item from a list](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtm#select_an_item_from_a_list)
- [View item details](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtm#view_item_details)
- [Add or remove an item from a shopping cart](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtm#add_or_remove_an_item_from_a_shopping_cart)
- [Initiate the checkout process](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtm#initiate_the_checkout_process)
- [Make a purchase or issue a refund](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtm#make_a_purchase_or_issue_a_refund)
- [Apply promotions](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtm#apply_promotions)
- [Use a Custom JavaScript Variable](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtm#use_a_custom_javascript_variable)

![Spark icon](/_static/images/icons/spark.svg)

## Page Summary

outlined\_flag

- Ecommerce events track user shopping behavior to measure product popularity and the impact of promotions and product placement on revenue.
    
- Implementing ecommerce events requires adding the Google tag to your website and accessing Analytics and website source code.
    
- Recommendations for implementation include enabling debug mode, reviewing custom dimension and metric limits, setting currency for value data, setting all available ecommerce parameters, and using the sample ecommerce website.
    
- A typical ecommerce implementation measures actions such as viewing item lists or details, adding or removing items from a cart, initiating checkout, making purchases or refunds, and applying promotions.
    
- Products and services can be represented as an array of items within ecommerce events, allowing for detailed tracking of individual items.
    

You can set up ecommerce events to collect information about the shopping behavior of your users. The events enable you to quantify your most popular products and see the influence of promotions and product placement on revenue.

This document describes each ecommerce event and when to set up the event. For a step-by-step example of how to set up an ecommerce event, see [Set up a purchase event](https://developers.google.com/analytics/devguides/collection/ga4/set-up-ecommerce).

**Important:** [Web display dynamic remarketing](https://developers.google.com/tag-platform/devguides/dynamic-remarketing) is available in Google Analytics. This feature allows advertisers to transfer dynamic attributes, such as product IDs or price values, directly to Google Ads for dynamic remarketing campaigns. This eliminates the need to manually define and map parameters, simplifying the setup process and enabling more dynamic and relevant ad experiences.

**Got 3 mins?** Help us improve the Google Analytics ecommerce documentation by taking [a quick online survey](https://forms.gle/tVx6iijCWP2zWyUU9).

gtag.js Tag Manager

## Before you begin

### Add the GA4 configuration tag to your website

Make sure you've [added the Google Analytics: GA4 Configuration tag to your website](https://support.google.com/analytics/answer/9304153#add-tag&zippy=%2Cadd-your-tag-using-google-tag-manager) and can access Analytics and the website source code.

### Measure ecommerce events with the GA4 Event tag

To send ecommerce events and parameters to your Google Analytics property:

1. [Open Google Tag Manager](https://tagmanager.google.com/)
    
2. In your workspace, open the **Tags** menu.
    
3. Create a **New** tag. Click the **Tag Configuration** box and select the **Google Analytics: GA4 Event** tag.
    
4. For **Event Name** use the built-in variable `{{Event}}`. This will use the Google Analytics ecommerce event name sent using the gtag.js API.
    
5. Under **More Settings > Ecommerce**, check **Send Ecommerce data**.
    
6. For **Data Source** select **Data Layer**. ![Tag Manager UI showing ecommerce tag configuration.](/static/analytics/devguides/collection/ga4/img/send-ecommerce-data.png)
    
7. Set up a trigger for the GA4 Event, for example when a user clicks a checkout button. [See all available trigger types](https://support.google.com/tagmanager/topic/7679108).
    
8. Name and **Save** the tag.
    

## Recommendations

- [Enable debug mode](https://support.google.com/analytics/answer/7201382) so you can see events in realtime and troubleshoot issues.
- Review [the custom dimension and metric limits](https://support.google.com/analytics/answer/10075209#limits) when sending custom parameters with ecommerce events.
- Set `currency` at the event level when sending `value` (revenue) data. This is the primary currency for the transaction and is used for standard reporting within the Google Analytics interface.
- Set each ecommerce parameter you have data for, regardless of whether the parameter is optional.
- Use [the sample ecommerce website](https://enhancedecommerce.appspot.com/) to see an example of how to tag your website.
- To ensure data populates properly in reports, follow the format in this document. If you need to set the items array outside of the ecommerce array, set the `currency` parameter at the event level when you send `value` (revenue) data.

## Set up Google Ads Dynamic remarketing

Dynamic remarketing lets you show your website and app users ads that are relevant to the specific products and services they viewed. Other benefits include:

- **Simple implementation**: You don't need to manually map parameters between your website and Google Ads.
- **Event-based setup**: To enable dynamic remarketing, implement the recommended events for your business type. Learn more about [Dynamic remarketing events and parameters](https://support.google.com/google-ads/answer/7305793).

## Implementation

A typical ecommerce implementation measures any of the following actions:

- [Select an item from a list](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtm#select_an_item_from_a_list)
- [View item details](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtm#view_item_details)
- [Add/remove a product from a shopping cart](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtm#add_or_remove_an_item_from_a_shopping_cart)
- [Initiate the checkout process](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtm#initiate_the_checkout_process)
- [Make purchases or refunds](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtm#make_a_purchase_or_issue_a_refund)
- [Apply promotions](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtm#apply_promotions)

At the heart of these actions are the products and services you sell. You can represent products and services as an array of items that can be added to ecommerce events. You can include up to 27 custom parameters in the items array, in addition to the prescribed parameters.

The following example demonstrates how to create the collection of `items` that are referenced throughout this guide. The `items` array can include up to 200 elements.

```
items: [
    {
      item_id: "SKU_12345",
      item_name: "Stan and Friends Tee",
      affiliation: "Google Merchandise Store",
      coupon: "SUMMER_FUN",
      discount: 2.22,
      index: 0,
      item_brand: "Google",
      item_category: "Apparel",
      item_category2: "Adult",
      item_category3: "Shirts",
      item_category4: "Crew",
      item_category5: "Short sleeve",
      item_list_id: "related_products",
      item_list_name: "Related Products",
      item_variant: "green",
      location_id: "ChIJIQBpAG2ahYAR_6128GcTUEo",
      price: 10.01,
      google_business_vertical: "retail",
      quantity: 3
    },
    {
      item_id: "SKU_12346",
      item_name: "Google Grey Women's Tee",
      affiliation: "Google Merchandise Store",
      coupon: "SUMMER_FUN",
      discount: 3.33,
      index: 1,
      item_brand: "Google",
      item_category: "Apparel",
      item_category2: "Adult",
      item_category3: "Shirts",
      item_category4: "Crew",
      item_category5: "Short sleeve",
      item_list_id: "related_products",
      item_list_name: "Related Products",
      item_variant: "green",
      location_id: "ChIJIQBpAG2ahYAR_6128GcTUEo",
      price: 21.01,
      google_business_vertical: "retail",
      quantity: 2
    }
]
```

## Select an item from a list

When a user is presented with a list of results, send a `view_item_list` event including an `items` array parameter containing the displayed items. For details on the parameters to send, see the [Events reference](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#view_item_list).

**Note:** The [Send Ecommerce data](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtm#send_ecommerce) option can be used as an alternative to the following tag configuration.

#### Show me the tag configuration

Tag configuration:

- Tag type: **Google Analytics: GA4 Event**
- Event Name: `view_item_list`
- Data Layer Variables (Name - Data Layer Variable Name):

- Ecommerce Items - `ecommerce.items`
- Ecommerce Item List ID - `ecommerce.item_list_id`
- Ecommerce Item List Name - `ecommerce.item_list_name`

- Event Parameters (Parameter Name - Value):

- `items` - `{{Ecommerce Items}}`
- `item_list_id` - `{{Ecommerce Item List ID}}`
- `item_list_name` - `{{Ecommerce Item List Name}}`

- Trigger: event equals `view_item_list`

Trigger configuration:

- Trigger Type: Custom Event
- Event Name: `view_item_list`
- This trigger fires on: All Custom Events

```
dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
dataLayer.push({
  event: "view_item_list",
  ecommerce: {
    currency: "USD",
    item_list_id: "related_products",
    item_list_name: "Related products",
    items: [
     {
      item_id: "SKU_12345",
      item_name: "Stan and Friends Tee",
      affiliation: "Google Merchandise Store",
      coupon: "SUMMER_FUN",
      discount: 2.22,
      index: 0,
      item_brand: "Google",
      item_category: "Apparel",
      item_category2: "Adult",
      item_category3: "Shirts",
      item_category4: "Crew",
      item_category5: "Short sleeve",
      item_list_id: "related_products",
      item_list_name: "Related Products",
      item_variant: "green",
      location_id: "ChIJIQBpAG2ahYAR_6128GcTUEo",
      price: 10.03,
      google_business_vertical: "retail",
      quantity: 3
    },
    {
      item_id: "SKU_12346",
      item_name: "Google Grey Women's Tee",
      affiliation: "Google Merchandise Store",
      coupon: "SUMMER_FUN",
      discount: 3.33,
      index: 1,
      item_brand: "Google",
      item_category: "Apparel",
      item_category2: "Adult",
      item_category3: "Shirts",
      item_category4: "Crew",
      item_category5: "Short sleeve",
      item_list_id: "related_products",
      item_list_name: "Related Products",
      item_variant: "gray",
      location_id: "ChIJIQBpAG2ahYAR_6128GcTUEo",
      price: 21.01,
      promotion_id: "P_12345",
      promotion_name: "Summer Sale",
      google_business_vertical: "retail",
      quantity: 2
    }
  }
});
```

Once a user selects an item from the list, send the `select_item` event with the selected item in an `items` array parameter. For details on the parameters to send, see the [Events reference](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#select_item).

**Note:** The [Send Ecommerce data](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtm#send_ecommerce) option can be used as an alternative to the following tag configuration.

#### Show me the tag configuration

Tag configuration:

- Tag type: **Google Analytics: GA4 Event**
- Event Name: `select_item`
- Data Layer Variables (Name - Data Layer Variable Name):

- Ecommerce Items - `ecommerce.items`
- Ecommerce Item List ID - `ecommerce.item_list_id`
- Ecommerce Item List Name - `ecommerce.item_list_name`

- Event Parameters (Parameter Name - Value):

- `items` - `{{Ecommerce Items}}`
- `item_list_id` - `{{Ecommerce Item List ID}}`
- `item_list_name` - `{{Ecommerce Item List Name}}`

- Trigger: event equals `select_item`

Trigger configuration:

- Trigger Type: Custom Event
- Event Name: `select_item`
- This trigger fires on: All Custom Events

```
dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
dataLayer.push({
  event: "select_item",
  ecommerce: {
    currency: "USD",
    item_list_id: "related_products",
    item_list_name: "Related products",
    items: [
    {
      item_id: "SKU_12345",
      item_name: "Stan and Friends Tee",
      affiliation: "Google Merchandise Store",
      coupon: "SUMMER_FUN",
      discount: 2.22,
      index: 0,
      item_brand: "Google",
      item_category: "Apparel",
      item_category2: "Adult",
      item_category3: "Shirts",
      item_category4: "Crew",
      item_category5: "Short sleeve",
      item_list_id: "related_products",
      item_list_name: "Related Products",
      item_variant: "green",
      location_id: "ChIJIQBpAG2ahYAR_6128GcTUEo",
      price: 10.01,
      google_business_vertical: "retail",
      quantity: 3
    }
    ]
  }
});
```

## View item details

To measure how many times item details are viewed, send a `view_item` event whenever a user views an item's details screen. For details on the parameters to send, see the [Events reference](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#view_item).

**Note:** The [Send Ecommerce data](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtm#send_ecommerce) option can be used as an alternative to the following tag configuration.

#### Show me the tag configuration

Tag configuration:

- Tag type: **Google Analytics: GA4 Event**
- Event Name: `view_item`
- Data Layer Variables (Name - Data Layer Variable Name):

- Ecommerce Items - `ecommerce.items`
- Ecommerce Value - `ecommerce.value`
- Ecommerce Currency - `ecommerce.currency`

- Event Parameters (Parameter Name - Value):

- `items` - `{{Ecommerce Items}}`
- `value` - `{{Ecommerce Value}}`
- `currency` - `{{Ecommerce Currency}}`

- Trigger: event equals `view_item`

Trigger configuration:

- Trigger Type: Custom Event
- Event Name: `view_item`
- This trigger fires on: All Custom Events

```
dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
dataLayer.push({
  event: "view_item",
  ecommerce: {
    currency: "USD",
    value: 30.03,
    items: [
    {
      item_id: "SKU_12345",
      item_name: "Stan and Friends Tee",
      affiliation: "Google Merchandise Store",
      coupon: "SUMMER_FUN",
      discount: 2.22,
      index: 0,
      item_brand: "Google",
      item_category: "Apparel",
      item_category2: "Adult",
      item_category3: "Shirts",
      item_category4: "Crew",
      item_category5: "Short sleeve",
      item_list_id: "related_products",
      item_list_name: "Related Products",
      item_variant: "green",
      location_id: "ChIJIQBpAG2ahYAR_6128GcTUEo",
      price: 10.01,
      google_business_vertical: "retail",
      quantity: 3
    }
    ]
  }
});
```

## Add or remove an item from a shopping cart

Measure an item being added to a shopping cart by sending an `add_to_cart` event with the relevant items in an `items` array. For details on the parameters to send, see the [Events reference](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#add_to_cart).

**Note:** The [Send Ecommerce data](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtm#send_ecommerce) option can be used as an alternative to the following tag configuration.

#### Show me the tag configuration

Tag configuration:

- Tag type: **Google Analytics: GA4 Event**
- Event Name: `add_to_cart`
- Data Layer Variables (Name - Data Layer Variable Name):

- Ecommerce Items - `ecommerce.items`
- Ecommerce Value - `ecommerce.value`
- Ecommerce Currency - `ecommerce.currency`

- Event Parameters (Parameter Name - Value):

- `items` - `{{Ecommerce Items}}`
- `value` - `{{Ecommerce Value}}`
- `currency` - `{{Ecommerce Currency}}`

- Trigger: event equals `add_to_cart`

Trigger configuration:

- Trigger Type: Custom Event
- Event Name: `add_to_cart`
- This trigger fires on: All Custom Events

```
dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
dataLayer.push({
  event: "add_to_cart",
  ecommerce: {
    currency: "USD",
    value: 30.03,
    items: [
    {
      item_id: "SKU_12345",
      item_name: "Stan and Friends Tee",
      affiliation: "Google Merchandise Store",
      coupon: "SUMMER_FUN",
      discount: 2.22,
      index: 0,
      item_brand: "Google",
      item_category: "Apparel",
      item_category2: "Adult",
      item_category3: "Shirts",
      item_category4: "Crew",
      item_category5: "Short sleeve",
      item_list_id: "related_products",
      item_list_name: "Related Products",
      item_variant: "green",
      location_id: "ChIJIQBpAG2ahYAR_6128GcTUEo",
      price: 10.01,
      google_business_vertical: "retail",
      quantity: 3
    }
    ]
  }
});
```

You can also measure when an item is added to a wishlist by sending an `add_to_wishlist` event with the relevant items in an `items` array. For details on the parameters to send, see the [Events reference](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#add_to_wishlist).

**Note:** The [Send Ecommerce data](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtm#send_ecommerce) option can be used as an alternative to the following tag configuration.

#### Show me the tag configuration

Tag configuration:

- Tag type: **Google Analytics: GA4 Event**
- Event Name: `add_to_wishlist`
- Data Layer Variables (Name - Data Layer Variable Name):

- Ecommerce Items - `ecommerce.items`
- Ecommerce Value - `ecommerce.value`
- Ecommerce Currency - `ecommerce.currency`

- Event Parameters (Parameter Name - Value):

- `items` - `{{Ecommerce Items}}`
- `value` - `{{Ecommerce Value}}`
- `currency` - `{{Ecommerce Currency}}`

- Trigger: event equals `add_to_wishlist`

Trigger configuration:

- Trigger Type: Custom Event
- Event Name: `add_to_wishlist`
- This trigger fires on: All Custom Events

```
dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
dataLayer.push({
  event: "add_to_wishlist",
  ecommerce: {
    currency: "USD",
    value: 30.03,
    items: [
    {
      item_id: "SKU_12345",
      item_name: "Stan and Friends Tee",
      affiliation: "Google Merchandise Store",
      coupon: "SUMMER_FUN",
      discount: 2.22,
      index: 0,
      item_brand: "Google",
      item_category: "Apparel",
      item_category2: "Adult",
      item_category3: "Shirts",
      item_category4: "Crew",
      item_category5: "Short sleeve",
      item_list_id: "related_products",
      item_list_name: "Related Products",
      item_variant: "green",
      location_id: "ChIJIQBpAG2ahYAR_6128GcTUEo",
      price: 10.01,
      google_business_vertical: "retail",
      quantity: 3
    }
    ]
  }
});
```

When a user subsequently views the cart, send the `view_cart` event with all items in the cart. For details on the parameters to send, see the [Events reference](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#view_cart).

**Note:** The [Send Ecommerce data](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtm#send_ecommerce) option can be used as an alternative to the following tag configuration.

#### Show me the tag configuration

Tag configuration:

- Tag type: **Google Analytics: GA4 Event**
- Event Name: `view_cart`
- Data Layer Variables (Name - Data Layer Variable Name):

- Ecommerce Items - `ecommerce.items`
- Ecommerce Value - `ecommerce.value`
- Ecommerce Currency - `ecommerce.currency`

- Event Parameters (Parameter Name - Value):

- `items` - `{{Ecommerce Items}}`
- `value` - `{{Ecommerce Value}}`
- `currency` - `{{Ecommerce Currency}}`

- Trigger: event equals `view_cart`

Trigger configuration:

- Trigger Type: Custom Event
- Event Name: `view_cart`
- This trigger fires on: All Custom Events

```
dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
dataLayer.push({
  event: "view_cart",
  ecommerce: {
    currency: "USD",
    value: 30.03,
    items: [
    {
      item_id: "SKU_12345",
      item_name: "Stan and Friends Tee",
      affiliation: "Google Merchandise Store",
      coupon: "SUMMER_FUN",
      discount: 2.22,
      index: 0,
      item_brand: "Google",
      item_category: "Apparel",
      item_category2: "Adult",
      item_category3: "Shirts",
      item_category4: "Crew",
      item_category5: "Short sleeve",
      item_list_id: "related_products",
      item_list_name: "Related Products",
      item_variant: "green",
      location_id: "ChIJIQBpAG2ahYAR_6128GcTUEo",
      price: 10.01,
      google_business_vertical: "retail",
      quantity: 3
    }
    ]
  }
});
```

To measure when a user removes an item from a cart, send the `remove_from_cart` event. For details on the parameters to send, see the [Events reference](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#remove_from_cart).

**Note:** The [Send Ecommerce data](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtm#send_ecommerce) option can be used as an alternative to the following tag configuration.

#### Show me the tag configuration

Tag configuration:

- Tag type: **Google Analytics: GA4 Event**
- Event Name: `remove_from_cart`
- Data Layer Variables (Name - Data Layer Variable Name):

- Ecommerce Items - `ecommerce.items`
- Ecommerce Value - `ecommerce.value`
- Ecommerce Currency - `ecommerce.currency`

- Event Parameters (Parameter Name - Value):

- `items` - `{{Ecommerce Items}}`
- `value` - `{{Ecommerce Value}}`
- `currency` - `{{Ecommerce Currency}}`

- Trigger: event equals `remove_from_cart`

Trigger configuration:

- Trigger Type: Custom Event
- Event Name: `remove_from_cart`
- This trigger fires on: All Custom Events

```
dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
dataLayer.push({
  event: "remove_from_cart",
  ecommerce: {
    currency: "USD",
    value: 30.03,
    items: [
    {
      item_id: "SKU_12345",
      item_name: "Stan and Friends Tee",
      affiliation: "Google Merchandise Store",
      coupon: "SUMMER_FUN",
      discount: 2.22,
      index: 0,
      item_brand: "Google",
      item_category: "Apparel",
      item_category2: "Adult",
      item_category3: "Shirts",
      item_category4: "Crew",
      item_category5: "Short sleeve",
      item_list_id: "related_products",
      item_list_name: "Related Products",
      item_variant: "green",
      location_id: "ChIJIQBpAG2ahYAR_6128GcTUEo",
      price: 10.01,
      google_business_vertical: "retail",
      quantity: 3
    }
    ]
  }
});
```

## Initiate the checkout process

Measure the first step in a checkout process by sending a `begin_checkout` event with one or more items defined with the relevant fields. A coupon can also be added at this stage to the entire order by adding it to the event or applied to a particular item by adding it to specific elements in the `items` array. For details on the parameters to send, see the [Events reference](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#begin_checkout).

**Note:** The [Send Ecommerce data](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtm#send_ecommerce) option can be used as an alternative to the following tag configuration.

#### Show me the tag configuration

Tag configuration:

- Tag type: **Google Analytics: GA4 Event**
- Event Name: `begin_checkout`
- Data Layer Variables (Name - Data Layer Variable Name):

- Ecommerce Items - `ecommerce.items`
- Ecommerce Value - `ecommerce.value`
- Ecommerce Currency - `ecommerce.currency`
- Ecommerce Coupon - `ecommerce.coupon`

- Event Parameters (Parameter Name - Value):

- `items` - `{{Ecommerce Items}}`
- `value` - `{{Ecommerce Value}}`
- `currency` - `{{Ecommerce Currency}}`
- `coupon` - `{{Ecommerce Coupon}}`

- Trigger: event equals `begin_checkout`

Trigger configuration:

- Trigger Type: Custom Event
- Event Name: `begin_checkout`
- This trigger fires on: All Custom Events

```
dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
dataLayer.push({
  event: "begin_checkout",
  ecommerce: {
    currency: "USD",
    value: 30.03,
    coupon: "SUMMER_FUN",
    items: [
    {
      item_id: "SKU_12345",
      item_name: "Stan and Friends Tee",
      affiliation: "Google Merchandise Store",
      coupon: "SUMMER_FUN",
      discount: 2.22,
      index: 0,
      item_brand: "Google",
      item_category: "Apparel",
      item_category2: "Adult",
      item_category3: "Shirts",
      item_category4: "Crew",
      item_category5: "Short sleeve",
      item_list_id: "related_products",
      item_list_name: "Related Products",
      item_variant: "green",
      location_id: "ChIJIQBpAG2ahYAR_6128GcTUEo",
      price: 10.01,
      google_business_vertical: "retail",
      quantity: 3
    }
    ]
  }
});
```

When a user proceeds to the next step in the checkout process and adds shipping information, send an `add_shipping_info` event. Use the parameter `shipping_tier` to specify the user's delivery option, such as "Ground", "Air", or "Next-day". For details on the parameters to send, see the [Events reference](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#add_shipping_info).

**Note:** The [Send Ecommerce data](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtm#send_ecommerce) option can be used as an alternative to the following tag configuration.

#### Show me the tag configuration

Tag configuration:

- Tag type: **Google Analytics: GA4 Event**
- Event Name: `add_shipping_info`
- Data Layer Variables (Name - Data Layer Variable Name):

- Ecommerce Items - `ecommerce.items`
- Ecommerce Value - `ecommerce.value`
- Ecommerce Currency - `ecommerce.currency`
- Ecommerce Coupon - `ecommerce.coupon`
- Ecommerce Shipping Tier - `ecommerce.shipping_tier`

- Event Parameters (Parameter Name - Value):

- `items` - `{{Ecommerce Items}}`
- `value` - `{{Ecommerce Value}}`
- `currency` - `{{Ecommerce Currency}}`
- `coupon` - `{{Ecommerce Coupon}}`
- `shipping_tier` - `{{Ecommerce Shipping Tier}}`

- Trigger: event equals `add_shipping_info`

Trigger configuration:

- Trigger Type: Custom Event
- Event Name: `add_shipping_info`
- This trigger fires on: All Custom Events

```
dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
dataLayer.push({
  event: "add_shipping_info",
  ecommerce: {
    currency: "USD",
    value: 30.03,
    coupon: "SUMMER_FUN",
    shipping_tier: "Ground",
    items: [
    {
      item_id: "SKU_12345",
      item_name: "Stan and Friends Tee",
      affiliation: "Google Merchandise Store",
      coupon: "SUMMER_FUN",
      discount: 2.22,
      index: 0,
      item_brand: "Google",
      item_category: "Apparel",
      item_category2: "Adult",
      item_category3: "Shirts",
      item_category4: "Crew",
      item_category5: "Short sleeve",
      item_list_id: "related_products",
      item_list_name: "Related Products",
      item_variant: "green",
      location_id: "ChIJIQBpAG2ahYAR_6128GcTUEo",
      price: 10.01,
      google_business_vertical: "retail",
      quantity: 3
    }
    ]
  }
});
```

Send the `add_payment_info` event when a user submits their payment information. If applicable, include `payment_type` with this event for the chosen method of payment. For details on the parameters to send, see the [Events reference](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#add_payment_info).

**Note:** The [Send Ecommerce data](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtm#send_ecommerce) option can be used as an alternative to the following tag configuration.

#### Show me the tag configuration

Tag configuration:

- Tag type: **Google Analytics: GA4 Event**
- Event Name: `add_payment_info`
- Data Layer Variables (Name - Data Layer Variable Name):

- Ecommerce Items - `ecommerce.items`
- Ecommerce Value - `ecommerce.value`
- Ecommerce Currency - `ecommerce.currency`
- Ecommerce Coupon - `ecommerce.coupon`
- Ecommerce Payment Type - `ecommerce.payment_type`

- Event Parameters (Parameter Name - Value):

- `items` - `{{Ecommerce Items}}`
- `value` - `{{Ecommerce Value}}`
- `currency` - `{{Ecommerce Currency}}`
- `coupon` - `{{Ecommerce Coupon}}`
- `payment_type` - `{{Ecommerce Payment Type}}`

- Trigger: event equals `add_payment_info`

Trigger configuration:

- Trigger Type: Custom Event
- Event Name: `add_payment_info`
- This trigger fires on: All Custom Events

```
dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
dataLayer.push({
  event: "add_payment_info",
  ecommerce: {
    currency: "USD",
    value: 30.03,
    coupon: "SUMMER_FUN",
    payment_type: "Credit Card",
    items: [
    {
      item_id: "SKU_12345",
      item_name: "Stan and Friends Tee",
      affiliation: "Google Merchandise Store",
      coupon: "SUMMER_FUN",
      discount: 2.22,
      index: 0,
      item_brand: "Google",
      item_category: "Apparel",
      item_category2: "Adult",
      item_category3: "Shirts",
      item_category4: "Crew",
      item_category5: "Short sleeve",
      item_list_id: "related_products",
      item_list_name: "Related Products",
      item_variant: "green",
      location_id: "ChIJIQBpAG2ahYAR_6128GcTUEo",
      price: 10.01,
      google_business_vertical: "retail",
      quantity: 3
    }
    ]
  }
});
```

## Make a purchase or issue a refund

Measure a purchase by sending a `purchase` event with one or more items defined with the relevant fields. For details on the parameters to send, see the [Events reference](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#purchase).

**Note:** The [Send Ecommerce data](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtm#send_ecommerce) option can be used as an alternative to the following tag configuration.

#### Show me the tag configuration

Tag configuration:

- Tag type: **Google Analytics: GA4 Event**
- Event Name: `purchase`
- Data Layer Variables (Name - Data Layer Variable Name):

- Ecommerce Items - `ecommerce.items`
- Ecommerce Transaction ID - `ecommerce.transaction_id`
- Ecommerce Value - `ecommerce.value`
- Ecommerce Tax - `ecommerce.tax`
- Ecommerce Shipping - `ecommerce.shipping`
- Ecommerce Currency - `ecommerce.currency`
- Ecommerce Coupon - `ecommerce.coupon`

- Event Parameters (Parameter Name - Value):

- `items` - `{{Ecommerce Items}}`
- `transaction_id` - `{{Ecommerce Transaction ID}}`
- `value` - `{{Ecommerce Value}}`
- `tax` - `{{Ecommerce Tax}}`
- `shipping` - `{{Ecommerce Shipping}}`
- `currency` - `{{Ecommerce Currency}}`
- `coupon` - `{{Ecommerce Coupon}}`

- Trigger: event equals `purchase`

Trigger configuration:

- Trigger Type: Custom Event
- Event Name: `purchase`
- This trigger fires on: All Custom Events

```
dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
dataLayer.push({
  event: "purchase",
  ecommerce: {
    transaction_id: "T_12345",
    // Sum of (price * quantity) for all items.
    value: 72.05,
    tax: 3.60,
    shipping: 5.99,
    currency: "USD",
    coupon: "SUMMER_SALE",
    customer_type: "new",
    items: [
    {
      item_id: "SKU_12345",
      item_name: "Stan and Friends Tee",
      affiliation: "Google Merchandise Store",
      coupon: "SUMMER_FUN",
      discount: 2.22,
      index: 0,
      item_brand: "Google",
      item_category: "Apparel",
      item_category2: "Adult",
      item_category3: "Shirts",
      item_category4: "Crew",
      item_category5: "Short sleeve",
      item_list_id: "related_products",
      item_list_name: "Related Products",
      item_variant: "green",
      location_id: "ChIJIQBpAG2ahYAR_6128GcTUEo",
      price: 10.01,
      quantity: 3
    },
    {
      item_id: "SKU_12346",
      item_name: "Google Grey Women's Tee",
      affiliation: "Google Merchandise Store",
      coupon: "SUMMER_FUN",
      discount: 3.33,
      index: 1,
      item_brand: "Google",
      item_category: "Apparel",
      item_category2: "Adult",
      item_category3: "Shirts",
      item_category4: "Crew",
      item_category5: "Short sleeve",
      item_list_id: "related_products",
      item_list_name: "Related Products",
      item_variant: "gray",
      location_id: "ChIJIQBpAG2ahYAR_6128GcTUEo",
      price: 21.01,
      promotion_id: "P_12345",
      promotion_name: "Summer Sale",
      quantity: 2
    }]
  }
});
```

**Note:** The `purchase` event replaces ecommerce\_purchase and is different from the in\_app\_purchase event, which is reported automatically.

Measure refunds by sending a `refund` event with the relevant `transaction_id` specified and one or more items defined with `item_id` and `quantity`. We recommend that you include item information in your `refund` event to see item-level refund metrics in Analytics.

For details on the parameters to send, see the [Events reference](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#refund).

**Note:** The [Send Ecommerce data](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtm#send_ecommerce) option can be used as an alternative to the following tag configuration.

#### Show me the tag configuration

Tag configuration:

- Tag type: **Google Analytics: GA4 Event**
- Event Name: `refund`
- Data Layer Variables (Name - Data Layer Variable Name):

- Ecommerce Items - `ecommerce.items`
- Ecommerce Transaction ID - `ecommerce.transaction_id`
- Ecommerce Value - `ecommerce.value`
- Ecommerce Tax - `ecommerce.tax`
- Ecommerce Shipping - `ecommerce.shipping`
- Ecommerce Currency - `ecommerce.currency`
- Ecommerce Coupon - `ecommerce.coupon`

- Event Parameters (Parameter Name - Value):

- `items` - `{{Ecommerce Items}}`
- `transaction_id` - `{{Ecommerce Transaction ID}}`
- `value` - `{{Ecommerce Value}}`
- `tax` - `{{Ecommerce Tax}}`
- `shipping` - `{{Ecommerce Shipping}}`
- `currency` - `{{Ecommerce Currency}}`
- `coupon` - `{{Ecommerce Coupon}}`

- Trigger: event equals `refund`

Trigger configuration:

- Trigger Type: Custom Event
- Event Name: `refund`
- This trigger fires on: All Custom Events

```
dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
dataLayer.push({
  event: "refund",
  ecommerce: {
    currency: "USD",
    transaction_id: "T_12345", // Transaction ID. Required for purchases and refunds.
    value: 30.03,
    coupon: "SUMMER_FUN",
    shipping: 3.33,
    tax: 1.11,
    items: [
    {
      item_id: "SKU_12345",
      item_name: "Stan and Friends Tee",
      affiliation: "Google Merchandise Store",
      coupon: "SUMMER_FUN",
      discount: 2.22,
      index: 0,
      item_brand: "Google",
      item_category: "Apparel",
      item_category2: "Adult",
      item_category3: "Shirts",
      item_category4: "Crew",
      item_category5: "Short sleeve",
      item_list_id: "related_products",
      item_list_name: "Related Products",
      item_variant: "green",
      location_id: "ChIJIQBpAG2ahYAR_6128GcTUEo",
      price: 10.01,
      google_business_vertical: "retail",
      quantity: 3
    }
    ]
  }
});
```

**Note:** The refund event replaces `ecommerce_refund`.

## Apply promotions

Ecommerce includes support for measuring impressions and clicks of internal promotions, such as banners displayed to promote a sale.

Promotion impressions are typically measured with the initial screen view by sending the `view_promotion` event with an items parameter to specify the promoted item. For details on the parameters to send, see the [Events reference](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#view_promotion).

**Note:** The [Send Ecommerce data](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtm#send_ecommerce) option can be used as an alternative to the following tag configuration.

#### Show me the tag configuration

Tag configuration:

- Tag type: **Google Analytics: GA4 Event**
- Event Name: `view_promotion`
- Data Layer Variables (Name - Data Layer Variable Name):

- Ecommerce Creative Name - `ecommerce.creative_name`
- Ecommerce Creative Slot - `ecommerce.creative_slot`
- Ecommerce Promotion ID - `ecommerce.promotion_id`
- Ecommerce Promotion Name - `ecommerce.promotion_name`
- Ecommerce Items - `ecommerce.items`

- Event Parameters (Parameter Name - Value):

- `creative_name` - `{{Ecommerce Creative Name}}`
- `creative_slot` - `{{Ecommerce Creative Slot}}`
- `promotion_id` - `{{Ecommerce Promotion ID}}`
- `promotion_name` - `{{Ecommerce Promotion Name}}`
- `items` - `{{Ecommerce Items}}`

- Trigger: event equals `view_promotion`

Trigger configuration:

- Trigger Type: Custom Event
- Event Name: `view_promotion`
- This trigger fires on: All Custom Events

```
dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
dataLayer.push({
  event: "view_promotion",
  ecommerce: {
    currency: "USD",
    creative_name: "Summer Banner",
    creative_slot: "featured_app_1",
    promotion_id: "P_12345",
    promotion_name: "Summer Sale",
    items: [
    {
      item_id: "SKU_12345",
      item_name: "Stan and Friends Tee",
      affiliation: "Google Merchandise Store",
      coupon: "SUMMER_FUN",
      discount: 2.22,
      index: 0,
      item_brand: "Google",
      item_category: "Apparel",
      item_category2: "Adult",
      item_category3: "Shirts",
      item_category4: "Crew",
      item_category5: "Short sleeve",
      item_list_id: "related_products",
      item_list_name: "Related Products",
      item_variant: "green",
      location_id: "ChIJIQBpAG2ahYAR_6128GcTUEo",
      price: 10.01,
      google_business_vertical: "retail",
      quantity: 3
    }
    ]
  }
});
```

To indicate a user clicked on a promotion, send a `select_promotion` event with that item as an item parameter. For details on the parameters to send, see the [Events reference](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#select_promotion).

**Note:** The [Send Ecommerce data](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtm#send_ecommerce) option can be used as an alternative to the following tag configuration.

#### Show me the tag configuration

Tag configuration:

- Tag type: **Google Analytics: GA4 Event**
- Data Layer Variables (Name - Data Layer Variable Name):

- Ecommerce Creative Name - `ecommerce.creative_name`
- Ecommerce Creative Slot - `ecommerce.creative_slot`
- Ecommerce Promotion ID - `ecommerce.promotion_id`
- Ecommerce Promotion Name - `ecommerce.promotion_name`
- Ecommerce Items - `ecommerce.items`

- Event Parameters (Parameter Name - Value):

- `creative_name` - `{{Ecommerce Creative Name}}`
- `creative_slot` - `{{Ecommerce Creative Slot}}`
- `promotion_id` - `{{Ecommerce Promotion ID}}`
- `promotion_name` - `{{Ecommerce Promotion Name}}`
- `items` - `{{Ecommerce Items}}`

- Variable Type: data layer Variable - 'ecommerce.items'
- Trigger: event equals `select_promotion`

Trigger configuration:

- Trigger Type: Custom Event
- Event Name: `select_promotion`
- This trigger fires on: All Custom Events

```
dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
dataLayer.push({
  event: "select_promotion",
  ecommerce: {
    currency: "USD",
    creative_name: "Summer Banner",
    creative_slot: "featured_app_1",
    promotion_id: "P_12345",
    promotion_name: "Summer Sale",
    items: [
    {
      item_id: "SKU_12345",
      item_name: "Stan and Friends Tee",
      affiliation: "Google Merchandise Store",
      coupon: "SUMMER_FUN",
      discount: 2.22,
      index: 0,
      item_brand: "Google",
      item_category: "Apparel",
      item_category2: "Adult",
      item_category3: "Shirts",
      item_category4: "Crew",
      item_category5: "Short sleeve",
      item_list_id: "related_products",
      item_list_name: "Related Products",
      item_variant: "green",
      location_id: "ChIJIQBpAG2ahYAR_6128GcTUEo",
      price: 10.01,
      google_business_vertical: "retail",
      quantity: 3
    }
    ]
  }
});
```

## Use a Custom JavaScript Variable

If your website does not support a data layer, you can use a Custom JavaScript Variable to call a function that returns the ecommerce data object. This object should use the data layer syntax shown earlier in this guide; for example:

```
// A Custom JavaScript Variable that returns an ecommerceData object
// that follows the data layer syntax.
function getEcommerceData() {
  var ecommerceProductData = [
    {
      item_name: "Stan and Friends Tee",
      item_id: "SKU_12345",  // ID is required.
      // Rest of the product data should follow the data layer syntax.
    },
    // Multiple products may be included.
  ];
  return ecommerceProductData;
}
```

If you choose to use a [Custom JavaScript Variable](https://support.google.com/tagmanager/answer/7683362#custom_javascript), then you can use it in the same manner as you would [the data layer](https://developers.google.com/tag-platform/tag-manager/web/datalayer) — you can supply the value from the `items` parameter as an event parameter in your tag configuration.

Tag configuration:

- Tag type: GA4 Event
- Event Name: any
- Read data from Variable: `{{gaEcommerceData}}`
- Trigger: event equals `gtm.dom`

`{{gaEcommerceData}}` variable settings:

- Variable type: Custom JavaScript
- Function body: Use the preceding example

**Note:** The example tag configuration uses [DOM Ready](https://support.google.com/tagmanager/answer/7679319) (`gtm.dom`) to trigger the Google Analytics: GA4 Event tag. You should use DOM Ready when you want to load all the elements on a page before sending an event so you can retrieve values from the Document Object Model (DOM). For example, you could use DOM Ready for the `view_item_list` event so the items someone views load before sending the event.
