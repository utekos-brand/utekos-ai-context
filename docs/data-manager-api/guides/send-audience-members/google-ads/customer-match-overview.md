# Customer Match overview

The Data Manager API supports the following
[Customer Match](https://support.google.com/google-ads/answer/6379332) features for Google Ads:

- Customer Match using contact information such as email address, phone number,
  and address information.

- Customer Match using mobile IDs.

- Customer Match using user IDs.

Here are the steps for creating and populating a Customer Match audience in a Google Ads
account:

1. If you want a new Customer Match audience, follow the steps to
   [Create an audience](https://developers.google.com/data-manager/api/devguides/audiences/google-ads/customer-match/create-audience)
   and note the value for its [`id`](https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.userLists) field.

   If you already have a Customer Match audience, use the
   [`List`](https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.userLists/list) method to retrieve the value of its `id`.
2. [Add user data to the audience](https://developers.google.com/data-manager/api/devguides/audiences/google-ads/customer-match/upload-data).

3. [Check upload results and list size](https://developers.google.com/data-manager/api/devguides/audiences/google-ads/customer-match/check-results).

If you're upgrading from the [Google Ads API](https://developers.google.com/google-ads/api), check out [Upgrade
from the Google Ads
API](https://developers.google.com/data-manager/api/devguides/audiences/google-ads/customer-match/upgrade) for
instructions.
