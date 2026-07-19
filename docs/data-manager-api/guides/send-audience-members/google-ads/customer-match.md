# About Customer Match

Understand How Customer Match Works

Customer Match lets you use your first-party data to reach customers across Search, YouTube, and Gmail. It targets ads to your existing customers and similar audiences while integrating with Smart Bidding to help optimize your campaign performance based on conversions.

How do I set up the Google Data Manager API?

What are the requirements to use Customer Match?

How does the Data Manager API improve Customer Match?

Use [the Data Manager API](https://developers.google.com/data-manager/api/devguides/audiences/google-ads/customer-match) for your Customer Match workflows for an improved developer experience and access to additional features. It is recommended that you avoid implementing new Customer Match workflows using the Google Ads API.

Starting early March 2024, Customer Match lists activated on Google Partner Inventory or third-party exchange websites in the European Economic Area (EEA), including UK and Switzerland, will no longer be available for web and app. Google Ads and Display & Video 360 will continue to enable advertisers to use their own first-party data (as well as custom and expanded audiences) across Google’s owned & operated (O&O) properties.

Customer Match lets you use your online and offline data to reach and re-engage with your customers across Search, the Shopping tab, Gmail, YouTube, and Display. Using information that your customers have shared with you, Customer Match will target ads to those customers and other customers like them.

Customer Match is a useful advertising tool for many business goals, from increasing brand awareness to driving conversions. Here are a few examples of different audiences you can target with Customer Match:

- On the Search Network and the Shopping tab, you can optimize your campaigns by adjusting your bid based on what you know about your customers’ activities.
- On Gmail, you can reach your customers or new potential customers with similar interests using personalized ads at the top of their inbox tabs.
- On YouTube, you can reach new segments, by targeting segments similar to your most valuable customers.
- On Display, you can reach your customers or new potential customers with similar interests using personalized ads on the Google Display Network.

This article explains how Customer Match works. You can also read more in [Your guide to Customer Match](https://support.google.com/google-ads/answer/10550383). There are several recent updates that impact how Customer Match works. You can read more about those updates [below](https://support.google.com/google-ads/answer/6379332#Updates).

---

## Before you begin

Campaigns using Smart Bidding and optimized targeting automatically include all the Customer Match lists in your account to enhance your ad campaign performance for your goals, such as conversions. If you don’t want your Customer Match lists to be automatically used to improve your campaign's performance, you can either:

- Opt out of auto-including unapplied Customer Match lists that are accessible to your account by following these [steps](https://support.google.com/google-ads/answer/10550383#opt_out_steps).
- Remove specific lists that you don’t want to use in Smart Bidding and optimized targeting from your account.

Keep in mind that:

- This will not affect the targeting settings for your campaign. For example, if your campaign uses optimized targeting, your ads will be shown to users who are more likely to convert.
- Even if your Customer Match lists aren’t relevant to all your campaigns, Smart Bidding and optimized targeting will automatically learn which Customer Match lists are helpful to your campaign's performance and continuously optimize list application in real-time.
- Customer Match lists won’t be used if you’re using manual bidding strategies.
- Customer Match lists have a maximum membership duration of 540 days. Any list memberships added or refreshed more than 540 days ago will no longer be eligible. To stay eligible, a list must have at least 100 members added or updated within the last 540 days. We recommend regularly refreshing your Customer Match lists. You can refresh your Customer Match lists through several methods, including continuous syncing with third-party CRMs or manual uploads.
- Auto-inclusion of unapplied Customer Match lists in Smart Bidding or optimized targeting is available for YouTube, YouTube Video Action campaign, and will soon be available for in-feed ads and Search ads.

If you’re ready to upload your Customer Match data, learn how to [create a customer list](https://support.google.com/google-ads/answer/6276125).

Learn more [About the customer matching process](https://support.google.com/google-ads/answer/7474263).

---

## How it works

Let's say you want to advertise a new loyalty program to your existing customers with Google ads. Here's how it works:

<table class="nice-table"><tbody><tr><td class="align-center"><img src="//storage.googleapis.com/support-kms-prod/Lqn87u8yoXab3NvtMYC58WwYvAWuz065pCoR" width="25px" height="auto" alt="Step 1" data-mime-type="image/svg+xml"></td><td class="align-center"><img src="//storage.googleapis.com/support-kms-prod/sXXE8ayMzITWqMQhoFgSh1dUY1YFF37QlfLJ" width="25px" height="auto" alt="Step 2" data-mime-type="image/svg+xml"></td><td class="align-center"><img src="//storage.googleapis.com/support-kms-prod/6I3N1DqgqPOh1AlVl23AWQZNRzCIZEh6gocw" width="25px" height="auto" alt="Step 3" data-mime-type="image/svg+xml"></td></tr><tr><td class="narrow">You create and upload a <a href="https://support.google.com/google-ads/answer/6276125">customer list</a> data file of contact information your customers have given you. <a href="https://g.co/wudy8r" target="_blank" rel="noopener">Use this template</a> and <a href="https://support.google.com/google-ads/answer/7659867">check this article</a> for formatting instructions.</td><td class="narrow">You create or update a campaign to target your Customer Match segment — customers from your uploaded data file who are Google users.</td><td class="narrow">When those users are signed in to their Google account, they come across your ads when they use the Search Network, YouTube, and Gmail or when they browse on the Google Display Network.</td></tr></tbody></table>

For more information about how Google uses the data files you upload for Customer Match and how the matching process works, read [How Google uses Customer Match data](https://support.google.com/google-ads/answer/6334160).

Customer Match is currently available on Search, the Shopping tab, YouTube, Gmail, and Display. However, third-party ad serving creatives aren’t supported with Customer Match.

### User choice and control

Google users can control the ads they see on Google services, including Customer Match ads, in their [Google Ads Settings](https://www.google.ca/settings/ads/anonymous?sig=ACi0TChDJ3dySHeYIvR6YLm3wOMavprsBWMqYE37LPee_dIVY1uHyoEGqsJE1nAZW8-51j6mTk-QiNnDUMQV80R_SE-k_qVwFxmpEcWvoD1THvWAdWnx8ts&).

## EU user consent policy for Customer Match upload partners

As a part of Google’s ongoing commitment to a privacy-centric digital advertising ecosystem, we are strengthening the enforcement of our [EU user consent policy](https://www.google.com/about/company/user-consent-policy/).

If you are using a [Customer Match partner to upload data](https://support.google.com/google-ads/answer/7361372) for users in the EEA, you’ll need to work with your Customer Match partner to ensure you are passing the required consent signals to Google. [Learn more about the EU user consent policy for Customer Match upload partners](https://support.google.com/google-ads/answer/14310715).

### Recent updates to Customer Match

To provide a comprehensive and consolidated view of your Audiences and make audience management and optimization simpler, you’ll find the following improvements in Google Ads:

- **New audience reporting**: Go to [**Audiences**](https://ads.google.com/aw/audiences/summary) within the **Campaigns** menu ![Campaigns Icon](//storage.googleapis.com/support-kms-prod/zdCbAPrGfII6HokxlaYTF9m3yViEk6LFMdGA) for detailed reporting about audience demographics, segments, and exclusions. You can also easily manage your audiences from this report page. Learn more [About Audience reporting](https://support.google.com/google-ads/answer/10566573).
- **New terms**: We’re using new terms on your audience report and throughout Google Ads. For example, “audience types” (these include custom, in-market, and affinity) are now referred to as audience segments and “remarketing” is now referred to as “your data”. Learn more about the [Updates to Audience terms and phrases](https://support.google.com/google-ads/answer/10566701).

As [Apple’s App Tracking Transparency (ATT) policies](https://developer.apple.com/app-store/user-privacy-and-data-use/) go into effect, [your data segments](https://support.google.com/google-ads/answer/2472738) (especially [website](https://support.google.com/google-ads/answer/2454064), [app](https://support.google.com/google-ads/answer/9595938) and [automatically created](https://support.google.com/google-ads/answer/6335506) segments) and [Customer Match segments](https://support.google.com/google-ads/answer/6379332) may be impacted on iOS 14 traffic (including the use of these segments for exclusions). Campaigns promoting web-based conversion goals - particularly those using Customer Match and your other data segments - may also find performance fluctuations. During this time we will be expanding [modeled conversions](https://support.google.com/google-ads/answer/10081327) to more iOS 14 traffic.
