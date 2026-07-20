# Dynamic remarketing events and parameters

To provide a comprehensive and consolidated view of your Audiences and make audience management and optimization simpler, you’ll find the following improvements in Google Ads:

- **New audience reporting**: Go to [**Audiences**](https://ads.google.com/aw/audiences/summary) within the **Campaigns** menu ![Campaigns Icon](//storage.googleapis.com/support-kms-prod/zdCbAPrGfII6HokxlaYTF9m3yViEk6LFMdGA) for detailed reporting about audience demographics, segments, and exclusions. You can also easily manage your audiences from this report page. Learn more [About Audience reporting](https://support.google.com/google-ads/answer/10566573).
- **New terms**: We’re using new terms on your audience report and throughout Google Ads. For example, “audience types” (these include custom, in-market, and affinity) are now referred to as audience segments and “remarketing” is now referred to as “your data”. Learn more about the [Updates to Audience terms and phrases](https://support.google.com/google-ads/answer/10566701).

---

Dynamic remarketing allows you to automatically tailor your ads based on the products or services your users have interacted with during previous visits to your website. This article explains how to use the Google tag to track relevant user events for your business type and the associated parameters you should set. Learn more about [Tagging your website for dynamic remarketing](https://support.google.com/google-ads/answer/3103357).

## Before you begin

To enable this feature, you’ll need to integrate the Google tag on your website, which sends data about the products or services viewed by your visitors. This data is then matched against your business data or Google Merchant center feed to retrieve information such as price, image, headline, and landing page URL, which is then dynamically inserted into your ads. Learn about [Creating a feed for dynamic remarketing](https://support.google.com/google-ads/answer/6053288).

### Anatomy of a dynamic remarketing event

Dynamic remarketing events are meaningful actions taken by your website visitors when they visit your site. For example, these may include searching for airline tickets on a travel website, adding a product to an online shopping cart or completing a transaction. When such events occur, you should use the Google Ads event snippet to register the event and send information about the event to Google Ads.
Below is an example of how you should populate the event snippet if you were to track the view of two products on an eCommerce website.

<table class="nice-table wide"><tbody><tr><td><code>&lt;script&gt;<br>gtag('event','view_item', {<br>&nbsp; 'value': <span class="red-text">998.55</span>,<br>&nbsp; 'items': [<br>&nbsp; &nbsp; {<br>&nbsp; &nbsp; &nbsp; 'id': <span class="red-text">1234</span>,<br>&nbsp; &nbsp; &nbsp; 'google_business_vertical': 'retail'<br>&nbsp; &nbsp; },<br>&nbsp; &nbsp; {<br>&nbsp; &nbsp; &nbsp; 'id': <span class="red-text">45678</span>,&nbsp;<br>&nbsp; &nbsp; &nbsp; 'google_business_vertical': 'retail'<br>&nbsp; &nbsp; }<br>&nbsp; ]<br>});<br>&lt;/script&gt;</code><br>&nbsp;</td></tr></tbody></table>

The event snippet calls the Google Ads event function, and passes two arguments which must be dynamically populated based on the type of event you are measuring.

- Event name: A string which describes the event being measured. It is used by the Google Ads system to assign users to one of several automatically generated user lists. We recommend that you use a specific set of event names from the list of recommended events described below. Learn more [About your data segments](https://support.google.com/google-ads/answer/2472738).

<table class="nice-table wide"><tbody><tr><td><strong>Event name</strong></td><td><strong>Description</strong></td></tr><tr><td><code>view_search_results</code></td><td>This event measures when a user visits a search results page.</td></tr><tr><td><code>view_item_list</code></td><td>This event measures when a user visits a category page.</td></tr><tr><td><code>view_item</code></td><td>This event measures when a user visits a product page.</td></tr><tr><td><code>add_to_cart</code></td><td>This event measures when a user adds an item to the shopping cart.</td></tr><tr><td><code>purchase</code></td><td>This event measures purchases.</td></tr></tbody></table>

- Event parameters: A Javascript object containing data about the event you are tracking. The event parameter object should always have an `items` parameter that’s populated with one or more `item` objects. These `item` objects contain information about the product or service with which the user has interacted. Optionally, the event parameter object can also have a `value` parameter which represents the total value of the products or services.

You should always pass at least one item object when calling the event snippet to track dynamic remarketing events. You may pass more if the user interacts with multiple items, such as when checking out a shopping cart, or searching for a multi-city travel itinerary.

**Note:** Google Ads customizes your ad content using data about the items with which the user has most recently interacted. In cases where multiple products have been viewed by the user, such as on a category page or a page of product search results, we recommend passing data to the event snippet for the most relevant items you want to promote, rather than data for the entire product list viewed by the user.

The content of the item object will vary depending on the type of product or service your site features. Refer to the section below to find the item specification for your business type. In any case, the item object should have a key that corresponds to the primary identifier of the product or service (such as `ID` or `destination`) and the `google_business_vertical` key that represents the type of feed the identifier should be matched against.

Depending on your business type, Google Ads will use data from one or more item parameters to create feed keys, which are used to retrieve information about your products or services from your Google Merchant Center or business data feeds. The entries in your feed attributes and the corresponding parameters in the event snippet should always match. Learn about [Creating a feed for dynamic remarketing](https://support.google.com/google-ads/answer/6053288).

For example, if you have a travel site, you may set the value of the origin ID for Paris to “PAR,” and the destination ID for London to “LON,” in your Flights business data feed. When a user searches for flights from Paris to London, you should also have the origin parameter set to PAR and destination parameter set to LON in the item object passed to the event snippet. Google Ads will then take the feed key “PAR+LON”, and match it with the Origin ID and Destination ID columns in the flights feed. Once the feed key is matched to your feed, Google Ads can show the user ads for flights from Paris to London. See the sample script below:

<table class="nice-table wide"><tbody><tr><td><code>&lt;script&gt;<br>gtag('event','purchase', {<br>&nbsp; &nbsp; &nbsp; 'value': <span class="red-text">639.74</span>,<br>&nbsp; &nbsp; &nbsp; 'items':[{<br>&nbsp; &nbsp; &nbsp; 'origin': 'LHR',<br>&nbsp; &nbsp; &nbsp; 'destination': 'LAX',<br>&nbsp; &nbsp; &nbsp; 'start_date': '2019-04-20',<br>&nbsp; &nbsp; &nbsp; 'end_date': '2019-04-21',<br>&nbsp; &nbsp; &nbsp; 'google_business_vertical': 'flights'<br>}]<br>});<br>&lt;/script&gt;</code><br>&nbsp;</td></tr></tbody></table>

In the following sections you will find information about the required and optional item parameters for each business type. For parameters that are used to create feed keys, the corresponding feed attributes to be matched will be indicated. Business type is automatically set and you won't be able to manually select a type.

## Item parameters

When entering event parameters, use only valid unicode characters. Avoid invalid characters like control, function, or private area characters.

## Retail

These events apply to websites that sell products online. Note that data passed via retail events and parameters can only be used in conjunction with a [Merchant Center product feed](https://support.google.com/google-ads/answer/6053288). If you want to promote an eCommerce website but are unable to set up a [Google Merchant Center product feed](https://support.google.com/merchants/answer/7439058), you may consider using the custom business type instead.

### Retail item parameters

<table class="nice-table"><tbody><tr><td><strong>Parameter name</strong></td><td><strong>Description</strong></td><td><strong>Is this parameter required?</strong></td></tr><tr><td><code>id</code></td><td><p>A unique product identifier. The parameter value must match one of the following attributes from your Google Merchant Center Product Feed: <code>id, item_group_id, or display_ads_id</code>.</p></td><td>Required</td></tr><tr><td><code>google_business_vertical</code></td><td>Specifies the type of feed used to lookup the product. Value must be set to "retail".</td><td>Recommended</td></tr></tbody></table>

#### Sample event snippet for retail

<table class="wide nice-table"><tbody><tr><td><code>&lt;script&gt;<br>gtag('event','view_item', {<br>&nbsp; 'value': <span class="red-text">998.55</span>,<br>&nbsp; 'items': [<br>&nbsp; &nbsp; {<br>&nbsp; &nbsp; &nbsp; 'id': <span class="red-text">1234</span>,&nbsp;<br>&nbsp; &nbsp; &nbsp; 'google_business_vertical': 'retail'<br>&nbsp; &nbsp; }]<br>});<br>&lt;/script&gt;</code></td></tr></tbody></table>
