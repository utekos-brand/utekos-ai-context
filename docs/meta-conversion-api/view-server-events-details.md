# View server event details in Meta Events Manager

These event breakdowns are available for website events sent through the Conversions API, and may not be available for other types of events sent through the Conversions API or events sent through the Meta Pixel.

In Meta Events Manager, you can see detailed breakdowns of each website event shared using the [Conversions API](https://www.facebook.com/business/help/2041148702652965).

These event details can help you improve your Conversions API setup by helping you to:

-   Monitor your event volume and make sure you’re sharing events redundantly (**Event Overview** tab).
    
-   Improve event coverage (**Event Coverage** tab).
    
-   Improve your event match quality (**Event Quality** tab).
    
-   Improve deduplication (**Event Deduplication** tab).
    
-   Share events with Meta in real time (**Data Freshness** tab).
    

Learn more about [best practices for the Conversions API](https://www.facebook.com/business/help/308855623839366).

## View your server event details

To see your server event details in Events Manager:

1.  Go to [Events Manager](https://business.facebook.com/events_manager2/list).
2.  Select the name and ID of your data.
3.  Find the event you want to see details for and click View details.
4.  Select a tab to view detailed information about the event:

### Event overview

The **Event Overview** tab shows the events received metric for both the Meta Pixel and the Conversions API. Browser events come through the Meta Pixel, while server events come via the Conversions API. This information can help you monitor your event volume and check if you’re sending redundant events.

Additionally, a visual trendline for additional conversions reported is available. This metric indicates the impact of data quality on conversions. By observing this trendline, you can understand how changes in data quality affect conversion rates over time.

**Events Received:** Total events from your Conversions API or pixel before processing. When using both, this is the sum from both sources, not deduplicated.

**Redundancy Check:** Events from the Conversions API should match or exceed those from the Meta Pixel. Ensure deduplication. If pixel events are higher, adjust your Conversions API setup.

![](https://scontent.fosl1-1.fna.fbcdn.net/v/t39.8562-6/146597050_455534749152435_1802453867954835002_n.svg?_nc_cat=107&ccb=1-7&_nc_sid=f537c7&_nc_ohc=QxRQxlVuS0UQ7kNvwGJSgii&_nc_oc=AdqzDALFvLEKUugvBFSeR7Nj-IobcJKM3CR7r096pY4HsAoGOIRSmP2BO-iU1nD0iEo&_nc_zt=14&_nc_ht=scontent.fosl1-1.fna&_nc_gid=FFPuMXwHEzmM4goA5PYDTA&_nc_ss=7b2a8&oh=00_AQBsajwE3oyVUjgsxav6CMvASUFfq2CpTQqPY1nSb2YhPA&oe=6A616F58)

### Event coverage

Event coverage reflects the total browser and server events sent to Meta. This tab shows the percentage of events received from your Conversions API compared to unique browser events from the Meta Pixel. You'll receive personalized recommendations to improve event coverage, which you can share with your developer for better conversion measurement.

Advertisers should aim for a 75% event coverage ratio of Conversions API to Meta Pixel events. This ensures reporting accuracy and helps achieve performance goals.

### Event matching

The **Event Matching** tab assesses how well your server event's customer information parameters match events. Better matching may result in an increase in your [additional conversions reported](https://www.facebook.com/business/help/453888373437795).

**Customer Information**: Review the percentage of events with complete customer data. More data typically means better matching.

-   **Improvement tips:** Sending a customer information parameter doesn’t guarantee that your event will be matched to a Meta account. For example, a single customer information parameter on its own may not be enough information to match an event to a Meta account, or the event may have come from someone who doesn’t have a Meta account. As a result, you could have a high percentage of events sent, but your event match quality score may still be low if the events aren’t matched. Follow recommendations in the event matching window or our [best practices guide.](https://www.facebook.com/business/help/308855623839366)

### Event deduplication

The Event deduplication tab can help you determine if you need to improve your setup for better event deduplication. Learn more [about deduplication](https://www.facebook.com/business/help/823677331451951).

The Deduplication keys table shows the percentages of events from the pixel and the Conversions API that were received with each deduplication key. We recommend sharing deduplication keys for all of your events. The higher the percentage, the better.

-   Overlap refers to the percentage of events with a given deduplication key that are received by both the Conversions API and the pixel. The higher the percentage, the better we’re able to identify and discard duplicate events, which helps provide a more complete view of your events.
    
### Data freshness

The Data freshness tab shows the delay between the time the event occurred and when we received it. Best practice is to share your events in real time, or as close to real time as possible. Learn [about event delay times](https://www.facebook.com/business/help/379226453470947).

**Note:** This article explains one of several ways to monitor your events shared through the Conversions API. See more ways to [monitor and improve your Conversions API setup](https://www.facebook.com/business/help/586304118741779).

**Note**: This article explains one of several ways to monitor your events shared through the Conversions API. See more ways to [monitor and improve your Conversions API setup](https://www.facebook.com/business/help/586304118741779).