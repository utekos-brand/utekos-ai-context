1. Enable the Data Manager API and generate credentials.

Here's how to set up access to the Data Manager API with an SDK or REST.

## Prerequisites

Before you can use the Data API, make sure you have the following:

1. A [Google Cloud
   project](https://cloud.google.com/resource-manager/docs/creating-managing-projects).
   You can use an existing project or create a new project specifically for the
   Data Manager API.

2. A Google Account that has the `serviceusage.services.enable` permission on
   your Google Cloud project, or has a role that includes that
   permission. For example, `roles/owner` and
   `roles/serviceusage.serviceUsageAdmin` both include the
   `serviceusage.services.enable` permission. To check your permissions, see
   [View current
   access](https://cloud.google.com/iam/docs/granting-changing-revoking-access#view-access).

3. The Google Cloud CLI [installed](https://cloud.google.com/sdk/docs/install).

## Enable the API

If you haven't already, enable the Data Manager API by clicking **Enable the
Data Manager API** or follow the
[instructions](https://support.google.com/googleapi/answer/6158841) to perform this
step manually.
Enable the Data Manager API

If you can't find the Data Manager API or **Enable the Data Manager API** fails, verify
your Google Account meets the [prerequisites](https://developers.google.com/data-manager/api/devguides/quickstart/set-up-access#prerequisites).

## Set up authentication

You can use any of the [Authentication methods at Google](https://cloud.google.com/docs/authentication) besides API keys. We
recommend reviewing how to [Choose the right authentication method for your use
case](https://cloud.google.com/docs/authentication#auth-decision-tree) to decide which
approach is appropriate for your use case.

Two common authentication methods are [user accounts](https://cloud.google.com/docs/authentication#user-accounts) and [service accounts](https://cloud.google.com/docs/authentication#service-accounts):

- **User accounts**: Represent people who interact with Google APIs and services directly.
- **Service accounts**: Represent apps, not people, as the users. They let your apps manage authentication and authorization. For example, if an app needs to access Google Cloud resources.

Your integration can use [Application Default Credentials (ADC)](https://cloud.google.com/docs/authentication/application-default-credentials) to
automatically find credentials from the environment so you don't have to change
the client code to authenticate.

Choose **User account** or **Service account** to set up ADC:

### User account

Here are the steps to authenticate with [user account
credentials](https://cloud.google.com/docs/authentication#user-accounts):

1. Configure the [Google Auth Platform](https://support.google.com/cloud/topic/15540269) settings for your project.

   > [!IMPORTANT]
   > **Important:** Any Google Cloud app used to obtain user credentials for the Data Manager API scope must undergo [Google OAuth
   > verification](https://support.google.com/cloud/answer/7454865#verification) to avoid an [unverified UI screen](https://support.google.com/cloud/answer/7454865) for its users. Google OAuth verification isn't required for service accounts.

   1. Open the
      [Branding page](https://console.developers.google.com/auth/branding)
      in the Google Cloud Console.

   2. Select your project.

   3. Fill out the form and click **Create**.

2. Since the Data Manager API scope is a [sensitive scope](https://support.google.com/cloud/answer/13463073), the following
   steps are required:

   1. Go to the [Data Access](https://console.cloud.google.com/auth/scopes) settings for your project.

   2. Click **Add or remove scopes**.

   3. Check the box next to **Data Manager API** in the list of scopes, and
      click **Update**.

   4. Click **Save**.

   5. Go to [Audience](https://console.developers.google.com/auth/audience) in
      the Google Cloud Console and update the **Publishing
      status** and **User type** . Learn more about these settings in
      [Manage App Audience](https://support.google.com/cloud/answer/15549945).

3. Click **Create OAuth2 client** to create an OAuth2
   client in the project, or follow the
   [instructions](https://support.google.com/cloud/answer/15549257)
   to create a **Desktop** OAuth2 client. You can skip this step if you
   already have a **Desktop** OAuth2 client that you want to use for the
   Data Manager API.

   If you click **Create OAuth2 client** , select **Desktop app** when
   prompted to **Configure your OAuth client** so you can use the client in
   the remaining steps.

   > [!NOTE]
   > **Note:** If you are a data partner and want an OAuth client specifically for obtaining credentials from advertisers to create [partner links](https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.partnerLinks), select **Web server** or **Web
   > browser** when prompted to **Configure your OAuth client** , and follow the instructions to [Get credentials for the advertiser account](https://developers.google.com/data-manager/api/devguides/accounts/partner-links#get-credentials).


   Create OAuth2 client

   In the last step, click **DOWNLOAD CLIENT CONFIGURATION** and note the
   download location you choose.
4. Generate a local ADC file by running the following command. This command
   launches a web flow where you are prompted to login to the Google
   Account you're using with the API.

   Replace <var translate="no">PATH_TO_CLIENT_JSON</var> with name of the JSON file you
   downloaded.

       gcloud auth application-default login \
         --scopes="https://www.googleapis.com/auth/datamanager,https://www.googleapis.com/auth/cloud-platform" \
         --client-id-file="PATH_TO_CLIENT_JSON"

   If you want to use the same credentials for the Data Manager API and the
   [Google Ads API](https://developers.google.com/google-ads/api), include the Google Ads API scope in the
   `--scopes` list:

       gcloud auth application-default login \
         --scopes="https://www.googleapis.com/auth/datamanager,https://www.googleapis.com/auth/adwords,https://www.googleapis.com/auth/cloud-platform" \
         --client-id-file="PATH_TO_CLIENT_JSON"

   If you want to use the same credentials for the Data Manager API and the
   [Display \& Video 360 API](https://developers.google.com/display-video/api), include the Display \& Video 360 API scope in the
   `--scopes` list:

       gcloud auth application-default login \
         --scopes="https://www.googleapis.com/auth/datamanager,https://www.googleapis.com/auth/display-video,https://www.googleapis.com/auth/cloud-platform" \
         --client-id-file="PATH_TO_CLIENT_JSON"

5. Confirm credentials are setup correctly using the following command.
   If successful, the command prints an access token to the console.

   <br />

       gcloud auth application-default print-access-token

### Service account

Here are the steps to [Use service account
impersonation](https://cloud.google.com/docs/authentication/use-service-account-impersonation) to authenticate. These steps
use impersonation instead of service account keys because [service account
keys can become a security risk if not managed
carefully](https://cloud.google.com/iam/docs/best-practices-for-managing-service-account-keys).

1. Click the following **Create service account** button or follow the
   [instructions](https://cloud.google.com/iam/docs/service-accounts-create) to
   select or create a service account.


   Create service account
2. Grant the service account the [Service Usage Consumer](https://docs.cloud.google.com/iam/docs/roles-permissions/serviceusage#serviceusage.serviceUsageConsumer) IAM role
   (`roles/serviceusage.serviceUsageConsumer`), which includes the
   [`serviceusage.services.use` permission](https://docs.cloud.google.com/iam/docs/roles-permissions/serviceusage#serviceusage.services.use) that allows the
   service account to send API requests for the project.

       gcloud projects add-iam-policy-binding PROJECT_ID \
         --member="serviceAccount:SERVICE_ACCOUNT_EMAIL" \
         --role="roles/serviceusage.serviceUsageConsumer"

3. [Grant your Google Account](https://cloud.google.com/iam/docs/manage-access-service-accounts#grant-single-role) the [Service Account Token
   Creator](https://docs.cloud.google.com/iam/docs/roles-permissions/iam#iam.serviceAccountTokenCreator) IAM role (`roles/iam.serviceAccountTokenCreator`) on the
   service account.

   > [!NOTE]
   > **Note:** This step is required even when your Google Account is an owner of the project.

       gcloud iam service-accounts add-iam-policy-binding SERVICE_ACCOUNT_EMAIL \
         --member="user:USER_EMAIL" \
         --role="roles/iam.serviceAccountTokenCreator"

4. Configure your ADC by running the following command:

       gcloud auth application-default login \
         --impersonate-service-account=SERVICE_ACCOUNT_EMAIL \
         --scopes="https://www.googleapis.com/auth/datamanager,https://www.googleapis.com/auth/cloud-platform"

   If you want to use the same credentials for the Data Manager API and the
   [Google Ads API](https://developers.google.com/google-ads/api), include the Google Ads API scope in the
   `--scopes` list:

       gcloud auth application-default login \
         --impersonate-service-account=SERVICE_ACCOUNT_EMAIL \
         --scopes="https://www.googleapis.com/auth/datamanager,https://www.googleapis.com/auth/adwords,https://www.googleapis.com/auth/cloud-platform"

   If you want to use the same credentials for the Data Manager API and the
   [Display \& Video 360 API](https://developers.google.com/display-video/api), include the Display \& Video 360 API scope in the
   `--scopes` list:

       gcloud auth application-default login \
         --impersonate-service-account=SERVICE_ACCOUNT_EMAIL \
         --scopes="https://www.googleapis.com/auth/datamanager,https://www.googleapis.com/auth/display-video,https://www.googleapis.com/auth/cloud-platform"

   When prompted to sign in, login as your Google Account that has the
   Service Account Token Creator role.
5. Confirm credentials are setup correctly using the following command. If
   successful, the command prints an access token to the console.

       gcloud auth application-default print-access-token --scopes="https://www.googleapis.com/auth/datamanager"

> [!NOTE]
> **Note:** The scope `https://www.googleapis.com/auth/datamanager` is required for all services in the Data Manager API.

To learn more about authentication and credentials for your app, see
[Authentication methods at Google](https://cloud.google.com/docs/authentication) and [How Application Default Credentials
works](https://cloud.google.com/docs/authentication/application-default-credentials).

## Set up account access

### User account

Select the tab that corresponds to your use case.

- Select **Advertiser** if you're using credentials for a Google Account that is a user in the advertiser accounts you want to manage.
- Select **Data Partner** if you're using credentials for a Google Account that is a user in a data partner account, and you want to manage advertiser accounts that have a [partner
  link](https://developers.google.com/data-manager/api/devguides/accounts/partner-links) to the data partner account.

<br />

### Advertiser

Grant the email associated with the user access to the
[`Destination`](https://developers.google.com/data-manager/api/devguides/concepts/destinations).

### Google Ads

[Follow the instructions](https://support.google.com/google-ads/answer/6372672)
to add the email of the user to the Google Ads account or a parent
Google Ads manager account.

### Display \& Video 360

[Follow the instructions](https://support.google.com/displayvideo/answer/2723011)
to add the email of the user to the account.

### Google Analytics

[Follow the instructions](https://support.google.com/analytics/answer/9305788)
to add the email of the user to the account.

### Data Partner

Grant the email associated with the user access to your **data partner
account**. Commonly, data partners use a service account for API access.
However, if you use a user account for testing or other purposes, you
must grant your user account access to the data partner account.

Add the user's email to the data partner account through the Google Ads UI
by [following these
instructions](https://support.google.com/google-ads/answer/6372672).

### Service account

Select the tab that corresponds to your use case.

- Select **Advertiser** if you're using credentials for a Google Account that is a user in the advertiser accounts you want to manage.
- Select **Data Partner** if you're using credentials for a Google Account that is a user in a data partner account, and you want to manage advertiser accounts that have a [partner
  link](https://developers.google.com/data-manager/api/devguides/accounts/partner-links) to the data partner account.

<br />

### Advertiser

Grant the email associated with your service account access to the
[`Destination`](https://developers.google.com/data-manager/api/devguides/concepts/destinations).

### Google Ads

Complete [Account access setup](https://developers.google.com/google-ads/api/docs/oauth/service-accounts#account_access_setup)
to add the service account to the Google Ads account or a parent
Google Ads manager account.

### Display \& Video 360

[Follow the instructions](https://support.google.com/displayvideo/answer/2723011)
to create a Display \& Video 360 user that's associated with the service
account.

### Google Analytics

[Follow the instructions](https://support.google.com/analytics/answer/9305788)
to add the email of the service account to the account.

### Data Partner

Grant the email associated with your service account access to your
**data partner account**.

Data partner account access is managed through the Google Ads UI. To add
the service account and set its access level, follow the steps in
[Account access setup](https://developers.google.com/google-ads/api/docs/oauth/service-accounts#account_access_setup).

## Next steps

[Install a client library](https://developers.google.com/data-manager/api/devguides/quickstart/install-library) and run
code samples to try your first Data Manager API request.

2. [Install a client library](https://developers.google.com/data-manager/api/devguides/quickstart/install-library).

3. Use [Field mappings](https://developers.google.com/data-manager/api/devguides/events/analytics/measurement-protocol/upgrade/field-mappings) to convert your Measurement Protocol requests to
   Data Manager API requests.

4. [Send events](https://developers.google.com/data-manager/api/devguides/events/send-events) to your Google Analytics property using the Data Manager API.


   > [!NOTE]
   > **Note:** The Data Manager API uses a [fast-fail
   > model](https://developers.google.com/data-manager/api/devguides/concepts/understand-errors#fast-fail), where *all* records in a request fail if *any* record has an error. The fast-fail model of the Data Manager API differs from the error model of the Measurement Protocol, which only reports errors for test requests sent to the [validation server](https://developers.google.com/analytics/devguides/collection/protocol/ga4/validating-events).

   <br />

5. Verify the results using [diagnostics](https://developers.google.com/data-manager/api/devguides/diagnostics) or in Google Analytics using
   one of the following methods:

   - Check the [Realtime report](https://support.google.com/analytics/answer/9271392).
   - Monitor the events in [DebugView](https://support.google.com/analytics/answer/7201382).
