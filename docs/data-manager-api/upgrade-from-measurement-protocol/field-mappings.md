# Data manager: Field mappings

Use the field mappings to upgrade each step of your Customer Match workflow from the Google Ads API to the Data Manager API:

- [Audience management field mappings](https://developers.google.com/data-manager/api/devguides/audiences/google-ads/customer-match/upgrade/field-mappings#manage) contains field mappings for creating, updating, and retrieving audiences.
- [Ingestion field mappings](https://developers.google.com/data-manager/api/devguides/audiences/google-ads/customer-match/upgrade/field-mappings#ingestion) contains field mappings for adding or removing audience members.

## Audience management field mappings

Use the mappings in the tables to map a [**`UserList`**](https://developers.google.com/google-ads/api/reference/rpc/latest/UserList) in the Google Ads API to its [**`UserList`**](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#userlist) equivalent in the Data Manager API.

| [**`UserList`**](https://developers.google.com/google-ads/api/reference/rpc/latest/UserList)[** (Google Ads API)**](https://developers.google.com/google-ads/api/reference/rpc/latest/UserList)[**`UserList`**](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#userlist)[** (Data Manager API)**](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#userlist)**Notes** |                           |                                                                                                                                                                       |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`resource_name`**                                                                                                                                                                                                                                                                                                                                                                                                                                 | **`name`**                | See [Resource names](https://developers.google.com/data-manager/api/devguides/audiences/google-ads/customer-match/upgrade/field-mappings#resource-names) for details. |
| **`id`**                                                                                                                                                                                                                                                                                                                                                                                                                                            | **`id`**                  |                                                                                                                                                                       |
| **`read_only`**                                                                                                                                                                                                                                                                                                                                                                                                                                     | **`read_only`**           |                                                                                                                                                                       |
| **`name`**                                                                                                                                                                                                                                                                                                                                                                                                                                          | **`display_name`**        | **Required**                                                                                                                                                          |
| **`description`**                                                                                                                                                                                                                                                                                                                                                                                                                                   | **`description`**         | **Required**                                                                                                                                                          |
| **`membership_status`**                                                                                                                                                                                                                                                                                                                                                                                                                             | **`membership_status`**   |                                                                                                                                                                       |
| **`integration_code`**                                                                                                                                                                                                                                                                                                                                                                                                                              | **`integration_code`**    |                                                                                                                                                                       |
| **`membership_life_span`**                                                                                                                                                                                                                                                                                                                                                                                                                          | **`membership_duration`** |                                                                                                                                                                       |

The duration an audience member remains in the list after added. The value must correspond to whole days. If not set, defaults to the maximum.

Format the value using the [Timestamp format](https://developers.google.com/data-manager/api/devguides/concepts/formatting#timestamp_format).

| **`size_for_display`**         | **`size_info.display_network_members_count`**                       |                                                                                                                                                                                             |
| ------------------------------ | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`size_range_for_display`**   | No equivalent.                                                      | Use the **`size_info.display_network_members_count`** for size information.                                                                                                                 |
| **`size_for_search`**          | **`size_info.search_network_members_count`**                        |                                                                                                                                                                                             |
| **`size_range_for_search`**    | No equivalent.                                                      | Use the **`size_info.search_network_members_count`** for size information.                                                                                                                  |
| **`type`**                     | No equivalent.                                                      |                                                                                                                                                                                             |
| **`access_reason`**            | **`access_reason`**                                                 |                                                                                                                                                                                             |
| **`account_user_list_status`** | **`account_access_status`**                                         |                                                                                                                                                                                             |
| **`closing_reason`**           | **`closing_reason`**                                                |                                                                                                                                                                                             |
| **`eligible_for_search`**      | **`target_network_info.eligible_for_search`**                       |                                                                                                                                                                                             |
| **`eligible_for_display`**     | **`target_network_info.eligible_for_display`**                      |                                                                                                                                                                                             |
| **`match_rate_percentage`**    | **`ingested_user_list_info.contact_id_info.match_rate_percentage`** |                                                                                                                                                                                             |
| **`basic_user_list`**          | **`ingested_user_list_info.pseudonymous_id_info`**                  | Not used for Customer Match.                                                                                                                                                                |
| **`crm_based_user_list`**      | **`ingested_user_list_info`**                                       | **Required.** See [Customer Match audience information](https://developers.google.com/data-manager/api/devguides/audiences/google-ads/customer-match/upgrade/field-mappings#audience-info). |
| No equivalent.                 | **`ingested_user_list_info.pair_id_info`**                          | Not used for Customer Match.                                                                                                                                                                |
| No equivalent.                 | **`ingested_user_list_info.partner_audience_info`**                 | Not used for Customer Match.                                                                                                                                                                |
| **`logical_user_list`**        | No equivalent.                                                      | Not used for Customer Match.                                                                                                                                                                |
| **`logical_user_list`**        | No equivalent.                                                      | Not used for Customer Match.                                                                                                                                                                |
| **`lookalike_user_list`**      | No equivalent.                                                      | Not used for Customer Match.                                                                                                                                                                |
| **`rule_based_user_list`**     | No equivalent.                                                      | Not used for Customer Match.                                                                                                                                                                |
| **`similar_user_list`**        | No equivalent.                                                      | Not used for Customer Match.                                                                                                                                                                |

### Customer Match audience information

In the Google Ads API, you must set the **`crm_based_user_list`** field to a [**`CrmBasedUserListInfo`**](https://developers.google.com/google-ads/api/reference/rpc/latest/CrmBasedUserListInfo) when creating a Customer Match audience.

In the Data Manager API, set the equivalent attributes by setting the **`ingested_user_list_info`** field to an [**`IngestedUserListInfo`**](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#ingesteduserlistinfo), then set the required fields for Customer Match and the type of user data.

[**Mobile IDs**](https://developers.google.com/data-manager/api/devguides/audiences/google-ads/customer-match/upgrade/field-mappings#mobile-ids)

**`upload_key_types`**

Set to a list containing **`MOBILE_ID`**. This is equivalent to setting the **`upload_key_type`** to **`MOBILE_ADVERTISING_ID`** in the Google Ads API.

**`mobile_id_info`**

Set to a [**`MobileIdInfo`**](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#mobileidinfo).

- Set **`data_source_type`** to **`DATA_SOURCE_TYPE_FIRST_PARTY`**. This is equivalent to setting the **`data_source_type`** to **`FIRST_PARTY`** in the Google Ads API.
- Set **`key_space`** to **`IOS`** or **`ANDROID`**. The Data Manager API requires this value. This differs from the Google Ads API, where the key space is inferred from the **`app_id`**.
- Set **`app_id`** to the string that uniquely identifies the mobile application from which the data was collected. Use the same format you use for the **`app_id`** in the Google Ads API.

[**User IDs**](https://developers.google.com/data-manager/api/devguides/audiences/google-ads/customer-match/upgrade/field-mappings#user-ids)

**`upload_key_types`**

Set to a list containing **`USER_ID`**. This is equivalent to setting the **`upload_key_type`** to **`CRM_ID`** in the Google Ads API.

**`user_id_info`**

Set to a [**`UserIdInfo`**](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#useridinfo).

Set **`data_source_type`** to **`DATA_SOURCE_TYPE_FIRST_PARTY`**. This is equivalent to setting the **`data_source_type`** to **`FIRST_PARTY`** in the Google Ads API.

[**Contact information**](https://developers.google.com/data-manager/api/devguides/audiences/google-ads/customer-match/upgrade/field-mappings#contact-information)

**`upload_key_types`**

Set to a list containing **`CONTACT_ID`**. This is equivalent to setting the **`upload_key_type`** to **`CONTACT_INFO`** in the Google Ads API.

**`contact_id_info`**

Set to a [**`ContactIdInfo`**](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#contactidinfo).

Set **`data_source_type`** to **`DATA_SOURCE_TYPE_FIRST_PARTY`**. This is equivalent to setting the **`data_source_type`** to **`FIRST_PARTY`** in the Google Ads API.
