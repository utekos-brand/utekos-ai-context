# Best practices for User-ID

[Next: Using first-party data to power durable and accurate measurement](https://support.google.com/analytics/answer/14299607?hl=en\&ref_topic=14272008)

## Best practices

- Do not register a User ID as a custom dimension.
- Avoid creating unnecessary [high-cardinality custom dimensions](https://support.google.com/analytics/answer/12226705), such as User ID, as they can negatively impact reports and explorations.
- High-cardinality dimensions may cause data to be grouped under [the (other) row](https://support.google.com/analytics/answer/9309767).
- Instead, use the [User-ID feature](https://support.google.com/analytics/answer/9213390).

## Analyze user-based data

Below are features you can use to interact with and analyze user-based data:

| Use case                                                                                                                                                   | Feature                                                                                                                                                    |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| I want to explore segments of users and drill into individual user activities.                                                                             | [User Exploration](https://support.google.com/analytics/answer/9283607)                                                                                    |
| I want to monitor user properties as they are collected, troubleshoot issues, and understand user behavior in real time.                                   | [DebugView](https://support.google.com/analytics/answer/7201382)                                                                                           |
| I want de-duplicated reporting based on User ID.                                                                                                           | [Verify the reporting identity](https://support.google.com/analytics/answer/9213390#verify_the_reporting_identity)                                         |
| I want to compare users who are signed in with those who are not.                                                                                          | [Compare signed in with non-signed in users](https://support.google.com/analytics/answer/9213390#compare)                                                  |
| I want to create remarketing audiences based on User IDs.                                                                                                  | [Create remarketing audiences based on User-ID data](https://support.google.com/analytics/answer/9213390#remarketing-audiences)                            |
| I want to see user-level data by User ID.                                                                                                                  | [BigQuery Export](https://developers.google.com/analytics/bigquery/)                                                                                       |
| I want to join Analytics data with first-party data (e.g., CRM data) to measure offline [key events](https://support.google.com/analytics/answer/9355848). | [BigQuery Export](https://developers.google.com/analytics/bigquery/)                                                                                       |
| I want to run additional analysis on GA4 data (e.g., ML models) and import insights back into Google Analytics.                                            | [BigQuery Export](https://developers.google.com/analytics/bigquery/) and [Offline Event Data Import](https://support.google.com/analytics/answer/10325025) |

**Note:**\
In GA4, when User-ID is included in the reporting identity, de-duplication is applied across all reports.\
GA4 BigQuery Export includes both Client ID (`user_pseudo_id`) and User ID (`user_id`) in the schema.

---

Give feedback about this article

## Was this helpful?
