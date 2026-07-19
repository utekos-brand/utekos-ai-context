# Improve measurement for events with a transaction ID

Use the Data Manager API to send Google Analytics

[events with a transaction ID as an additional data source for your tag or
Google Analytics for Firebase (GA4F)
events](https://support.google.com/analytics/answer/16391665), to maximize ad
interaction signals and strengthen your data and overall performance.

This feature is only available to accounts on an allowlist. [Fill out the
form](https://forms.gle/PUT2AsLVM1krd5zm6) if you're interested in adding your Google Analytics
property.

> [!NOTE]
> **Note:** If you're bidding to Google Analytics conversions in Google Ads, data from the additional data source you connect won't flow to your conversion bidding for a 14-day trial period. This doesn't apply to your existing Google tag data source.

Check out [Get started](https://developers.google.com/data-manager/api/devguides/events/send-events) for details.

# About improving measurement for purchase events

You can collect data through the Google tag as well as Data Manager API, Measurement Protocol and data import features using Google Analytics. This will make sure you have a comprehensive view of all of your purchase events, including the ones that weren’t collected by tag or viewable before. You can import user-provided data directly from the Google Analytics client ID. With this new data, you can improve measurement insights across important events and campaign performance. You can collect all of your web purchase events through the “Event Data Import” feature in Google Analytics.

**Note**: This feature is currently in closed beta. If eligible and interested in gaining access, [sign up here](https://docs.google.com/forms/d/e/1FAIpQLSe5zyi34S40-aVm12D-5bUxFodoBKAu1KViw6ahDqaTFZxnXw/viewform). You can collect data about events as long as you have provided a valid unique transaction ID, as well as at least one of the following identifiers: user ID, client ID or GCLID (though sending as many as possible is recommended).

### Supported source types

The following import sources are supported for web import into Google Analytics:

1. [BigQuery](https://support.google.com/google-ads-data-manager/answer/13763054)
2. [Google Cloud Storage](https://support.google.com/google-ads-data-manager/answer/14176182)
3. [MySQL](https://support.google.com/google-ads-data-manager/answer/14176591)
4. [PostgreSQL](https://support.google.com/google-ads-data-manager/answer/14273371)
5. [Amazon Redshift](https://support.google.com/google-ads-data-manager/answer/14273683)
6. [Amazon S3](https://support.google.com/google-ads-data-manager/answer/14186731)
7. [Google Sheets](https://support.google.com/google-ads-data-manager/answer/15146000)
8. [HTTPS](https://support.google.com/google-ads-data-manager/answer/14605515)
9. [Oracle](https://support.google.com/google-ads-data-manager/answer/16044634)
10. [Snowflake](https://support.google.com/google-ads-data-manager/answer/14186945)
11. [HubSpot](https://support.google.com/google-ads-data-manager/answer/15293735)
12. [Salesforce](https://support.google.com/google-ads-data-manager/answer/14006189)
13. [Zoho](https://support.google.com/google-ads-data-manager/answer/16318464)

## How to import data using purchase events

1. In **[Admin](https://analytics.google.com/analytics/web/#/?pagename=admin&utm_source=gahc&utm_medium=dlinks)**, under "Data collection and modification", click **Data import**.
    
    **Note**: The previous link opens to the last Analytics property you accessed. You must be signed in to a Google Account to open the property. You can [change the property](https://support.google.com/analytics/answer/12813202) using the property selector. You must be an [Editor or above](https://support.google.com/analytics/answer/9305587) on the Analytics accountat the property level to view data source details.
    
2. Create a new data source or select an existing data source.
3. Click **Create data source**, to create a new source of data.
4. Enter a name for your data source in the Data source name field.
5. Under “Data type”, select **Events**.
6. Select **Web**.
7. Toggle on the “Improve measurement for purchase events” option.
    - (Optional) Select a data stream. If your property has multiple web streams, you’ll have the option to select one data stream. If your property only has one web data stream, it will be pre-selected.
8. Navigate to the “Upload data for import” section.
9. Select your import source from the drop down.
10. Click **Connect**.
11. In the “Select web purchase data to use” section under the “Set up connection” window, fill all the required fields under the “Data selection” section.
    - **Optional**: You can create filters by adding conditions by selecting fields for your required conditions under the “Optional data enhancements” section. These filters ensure only web purchase events are collected, requiring all other events to be filtered out.
12. Click **Next**.
13. In the “Map fields” page of the “Set up connection” window, complete the fields in each step to get more details from web purchase reports. The more information you provide, the more accurate your reports will be.
    1. **Purchase event identification**: For accurate measurement, complete the required information in the table or click **Next** to accept the recommended suggestions. The data in these fields should be in the same data being sent from your Google tag.
    2. **User identifiers**: To accurately match your data to purchase events, select at least one field or click **Next** to automatically accept suggestions.
    3. **Purchase value**: Specify the value of the purchase. Select at least one field or click **Next** to automatically accept suggestions.
    4. **Consent**: Specify consent values per data row. Select at least one field or click **Next** to automatically accept suggestions.
    5. **Optional improvements**: Add fields to improve accuracy. Select at least one field or click **Next** to automatically accept suggestions.
    6. **Optional parameters**: Select any additional parameters that you’d like to include with the purchase events. Select a parameter or property and click **Add** to choose from a list of known parameters and registered dimensions in the property.

> Learn more about these fields in the “[Data-source details](https://support.google.com/analytics/answer/16391665#Data_source_details)” section.

14. Click **Next**.
15. In the Set up connection window, in the Review page, review your connection and set up a schedule for when you want to import your data
16. Click **Done**.
17. Click **Done** again and follow the next steps.

**Note**: Imports can take up to 30 minutes to complete and up to 24 hours for the data to be available in the reports. Make sure that you’re using valid purchase events.

## Data-source details

<table class="nice-table"><tbody><tr><td><p><strong>Field type</strong></p></td><td><p><strong>Field name</strong></p></td><td><p><strong>Data type</strong></p></td><td><p><strong>Description</strong></p></td></tr><tr><td rowspan="2"><p><strong>Purchase event identification fields</strong></p><p><span><strong>Note</strong>: These are required fields.</span></p></td><td><p>Conversion date/time</p></td><td><p>String</p></td><td><p>Used to know when the event occurred.</p></td></tr><tr><td><p>Transaction ID</p></td><td><p>String</p></td><td><p>Used to identify and deduplicate purchase events.</p></td></tr><tr><td rowspan="3"><p><strong>User identifier fields</strong></p><p><span><strong>Note</strong>: You must provide at least one of these fields.</span></p></td><td><p>Client ID</p></td><td><p>String</p></td><td><p>Used to find and match the event and to count unique users appropriately.</p></td></tr><tr><td><p>User ID</p></td><td><p>String</p></td><td><p>Used to find and match the event to look up advertising identifiers and to count unique users appropriately.</p></td></tr><tr><td><p>GCLID</p></td><td><p>String</p></td><td><p>Used as an advertising identifier and to count unique users appropriately.</p></td></tr><tr><td rowspan="2"><p><strong>Purchase value fields</strong></p><p><strong>Note</strong>: These fields are optional.</p></td><td><p>Conversion value</p></td><td><p>Double</p></td><td><p>Used as the value of the conversion.</p></td></tr><tr><td><p>Currency code</p></td><td><p>String</p></td><td><p>Used to currency convert the value parameter.</p></td></tr><tr><td rowspan="2"><p><strong>Consent fields</strong></p><p><span><strong>Note</strong>: These fields are optional.</span></p></td><td><p>Ad personalization consent (ad_personalization)</p></td><td><p>String</p></td><td><p>Sets consent for personalized advertising.</p></td></tr><tr><td><p>Ad measurement consent (ad_user_data)</p></td><td><p>String</p></td><td><p>Sets consent for sending user data related to advertising to Google. The ad_user_data consent type is required for measurement use cases, such as enhanced conversions and tag-based conversion tracking.</p></td></tr><tr><td rowspan="10"><p><strong>Optional improvements</strong></p><p><span><strong>Note</strong>: These fields are optional.</span></p></td><td><p>User agent</p></td><td><p>String</p></td><td><p>Used for device information.</p></td></tr><tr><td><p>IP address</p></td><td>String</td><td>Used with IP Override to derive event GEO fields - IP is then discarded.</td></tr><tr><td><p>GBRAID</p></td><td><p>String</p></td><td><p>Used for campaign attribution.</p></td></tr><tr><td><p>WBRAID</p></td><td><p>String</p></td><td><p>Used for campaign attribution.</p></td></tr><tr><td><p>Email address</p></td><td><p>Hash</p></td><td><p>User-provided data, used for identification and activation in the trusted execution environment (TEE).</p></td></tr><tr><td><p>Phone number</p></td><td><p>Hash</p></td><td><p>User-provided data, used for identification and activation in the trusted execution environment (TEE).</p></td></tr><tr><td><p>First name</p></td><td><p>Hash</p></td><td><p>User-provided data, used for identification and activation in the trusted execution environment (TEE).</p></td></tr><tr><td><p>Last name</p></td><td><p>Hash</p></td><td><p>User-provided data, used for identification and activation in the trusted execution environment (TEE).</p></td></tr><tr><td><p>Postal code</p></td><td><p>String</p></td><td><p>Non-sensitive address information.</p></td></tr><tr><td><p>Country</p></td><td><p>String</p></td><td><p>Non-sensitive address information.</p></td></tr><tr><td rowspan="3"><p><strong>Optional parameters</strong></p><p><span><strong>Note</strong>: These fields are optional.</span></p></td><td><p>Standard event parameters and or event-scoped custom parameters</p></td><td><p>String</p></td><td><p><span>Additional pieces of data about an event.</span></p><p>Event-scoped custom parameters must be pre-registered as a custom dimension in the property. Learn more about <a href="https://support.google.com/analytics/answer/14239696"><u>creating event-scoped custom dimensions</u></a>.</p></td></tr><tr><td><p>Standard user properties and or user-scoped custom parameters</p></td><td><p>String</p></td><td><p>Attributes that describe a user.</p><p><span>User-scoped custom parameters must be pre-registered as a custom dimension in the property. Learn more about <a href="https://support.google.com/analytics/answer/14239696"><u>creating event-scoped custom dimensions</u></a>.</span></p></td></tr><tr><td><p>Standard item parameters and or item-scoped custom parameters</p></td><td><p>String</p></td><td><p>Attributes that can describe the products or services.</p><p>Item-scoped custom parameters must be pre-registered as a custom dimension in the property. Learn more about <a href="https://support.google.com/analytics/answer/14239696"><u>creating event-scoped custom dimensions</u></a>.</p><p>Check the section below to learn how to format item parameters for import.</p></td></tr></tbody></table>

## How to format item parameters

You can add item parameters and map them to your source fields. If your purchase events have multiple products in a single transaction, you must arrange your item parameters in arrays. The items array should contain information about items included in the event and is repeated for each item.

**Note**: The sequence of the arrays must be consistent across all fields and must be comma-separated lists.

#### **Example**

A customer purchased a $10 blue shirt, $5 red shorts, and a $20 orange t-shirt in a single transaction.

<table class="nice-table"><tbody><tr><td><p>item_price</p></td><td><p>item_color</p></td><td><p>item_category</p></td></tr><tr><td><p>10, 5, 20</p></td><td><p>blue, red, orange</p></td><td><p>shirt, shorts, t-shirt</p></td></tr></tbody></table>

### Deduplication of purchase events

Accurate deduplication of events can only be done when transaction\_id for purchase events is collected. Make sure that you’re collecting the same value across tag, Data Manager API, Measurement Protocol and Data Import, so that deduplication of events is carried out.

You can also import your copy of the transaction log using to deduplicate with your website measured purchases to improve your purchase measurement. You can add additional item parameters to include details about items sold in your purchases.

**Note**: While you can import data without any time limit, only events with a time stamp from the previous 2 calendar days, plus today will be collected and processed. Learn more about the timing of importing events.

The calendar day is based on the reporting time zone that you have set in the “Property details” page under your “Property settings.” Learn more about [editing a property](https://support.google.com/analytics/answer/9304776).

#### **Example**

If events are imported at 1:00 AM today, any event with a timestamp originating from 2 days prior up to 1:00 AM today will be processed. Similarly, if events are imported at 11:00 PM today, the processing will involve all events bearing a timestamp from 2 days prior until 11:00 PM today.
