# ErrorReason

Error reasons for Data Manager API. NOTE: This enum is not frozen and new values may be added in the future.

| Enums ||
|---|---|
| `ERROR_REASON_UNSPECIFIED` | Do not use this default value. |
| `INTERNAL_ERROR` | An internal error has occurred. |
| `DEADLINE_EXCEEDED` | The request took too long to respond. |
| `RESOURCE_EXHAUSTED` | Too many requests. |
| `NOT_FOUND` | Resource not found. |
| `PERMISSION_DENIED` | The user does not have permission or the resource is not found. |
| `INVALID_ARGUMENT` | There was a problem with the request. |
| `REQUIRED_FIELD_MISSING` | Required field is missing. |
| `INVALID_FORMAT` | Format is invalid. |
| `INVALID_HEX_ENCODING` | The HEX encoded value is malformed. |
| `INVALID_BASE64_ENCODING` | The base64 encoded value is malformed. |
| `INVALID_SHA256_FORMAT` | The SHA256 encoded value is malformed. |
| `INVALID_POSTAL_CODE` | Postal code is not valid. |
| `INVALID_COUNTRY_CODE` | Deprecated: Enum is unused in the Data Manager API. > [!WARNING] > This item is deprecated! |
| `INVALID_ENUM_VALUE` | Enum value cannot be used. |
| `INVALID_USER_LIST_TYPE` | Type of the user list is not applicable for this request. |
| `INVALID_AUDIENCE_MEMBER` | This audience member is not valid. |
| `TOO_MANY_AUDIENCE_MEMBERS` | Maximum number of audience members allowed per request is 10,000. |
| `TOO_MANY_USER_IDENTIFIERS` | Maximum number of user identifiers allowed per audience member is 10. |
| `TOO_MANY_DESTINATIONS` | Maximum number of destinations allowed per request is 10. |
| `INVALID_DESTINATION` | This Destination is not valid. |
| `DATA_PARTNER_USER_LIST_MUTATE_NOT_ALLOWED` | Data Partner does not have access to the operating account owned userlist. |
| `INVALID_MOBILE_ID_FORMAT` | Mobile ID format is not valid. |
| `INVALID_USER_LIST_ID` | User list is not valid. |
| `MULTIPLE_DATA_TYPES_NOT_ALLOWED` | Multiple data types are not allowed to be ingested in a single request. |
| `DIFFERENT_LOGIN_ACCOUNTS_NOT_ALLOWED_FOR_DATA_PARTNER` | Destination configs containing a DataPartner login account must have the same login account across all destination configs. |
| `TERMS_AND_CONDITIONS_NOT_SIGNED` | Required terms and conditions are not accepted. |
| `INVALID_NUMBER_FORMAT` | Invalid number format. |
| `INVALID_CONVERSION_ACTION_ID` | Conversion action ID is not valid. |
| `INVALID_CONVERSION_ACTION_TYPE` | The conversion action type is not valid. |
| `INVALID_CURRENCY_CODE` | The currency code is not supported. |
| `INVALID_EVENT` | This event is not valid. |
| `TOO_MANY_EVENTS` | Maximum number of events allowed per request is 10,000. |
| `DESTINATION_ACCOUNT_NOT_ENABLED_ENHANCED_CONVERSIONS_FOR_LEADS` | The destination account is not enabled for enhanced conversions for leads. |
| `DESTINATION_ACCOUNT_DATA_POLICY_PROHIBITS_ENHANCED_CONVERSIONS` | Enhanced conversions can't be used for the destination account because of Google customer data policies. Contact your Google representative.. |
| `DESTINATION_ACCOUNT_ENHANCED_CONVERSIONS_TERMS_NOT_SIGNED` | The destination account hasn't agreed to the terms for enhanced conversions. |
| `DUPLICATE_DESTINATION_REFERENCE` | Two or more destinations in the request have the same reference. |
| `UNSUPPORTED_OPERATING_ACCOUNT_FOR_DATA_PARTNER` | Unsupported operating account for data partner authorization. |
| `UNSUPPORTED_LINKED_ACCOUNT_FOR_DATA_PARTNER` | Unsupported linked account for data partner authorization. |
| `NO_IDENTIFIERS_PROVIDED` | Events data contains no user identifiers or ad identifiers. For Floodlight Event ingestion this error indicates requests contains no ad identifiers. |
| `INVALID_PROPERTY_TYPE` | The property type is not supported. |
| `INVALID_STREAM_TYPE` | The stream type is not supported. |
| `LINKED_ACCOUNT_ONLY_ALLOWED_WITH_DATA_PARTNER_LOGIN_ACCOUNT` | Linked account is only supported when the login account is a `DATA_PARTNER` account. |
| `OPERATING_ACCOUNT_LOGIN_ACCOUNT_MISMATCH` | The login account must be the same as the operating account for the given use case. |
| `EVENT_TIME_INVALID` | Event did not occur within the acceptable time window. |
| `RESERVED_NAME_USED` | Parameter uses a reserved name. |
| `INVALID_EVENT_NAME` | The event name is not supported. |
| `NOT_ALLOWLISTED` | The account is not allowlisted for the given feature. |
| `INVALID_REQUEST_ID` | The request ID used to retrieve the status of a request is not valid. Status can only be retrieved for requests that succeed and don't have `validateOnly=true`. |
| `MULTIPLE_DESTINATIONS_FOR_GOOGLE_ANALYTICS_EVENT` | An event had 2 or more Google Analytics destinations. |
| `FIELD_VALUE_TOO_LONG` | Length of the field value is too long. |
| `FIELD_VALUE_TOO_SHORT` | Length of the field value is too short. |
| `TOO_MANY_ELEMENTS` | Too many elements in a list in the request. |
| `TOO_FEW_ELEMENTS` | Too few elements in a list in the request. |
| `ALREADY_EXISTS` | The resource already exists. |
| `IMMUTABLE_FIELD_FOR_UPDATE` | Attempted to set an immutable field for an update request. |
| `INVALID_RESOURCE_NAME` | The resource name is invalid. |
| `INVALID_FILTER` | The query filter is invalid. |
| `INVALID_UPDATE_MASK` | The update mask is invalid. |
| `INVALID_PAGE_TOKEN` | The page token is invalid. |
| `CANNOT_UPDATE_DISABLED_LICENSE` | Cannot update a license that has been disabled. |
| `CANNOT_CREATE_LICENSE_FOR_SENSITIVE_USERLIST` | Sensitive user lists cannot be licensed to this client. |
| `INSUFFICIENT_COST` | Cost too low for this license. |
| `CANNOT_DISABLE_LICENSE` | Reseller license cannot be disabled since it is in use. |
| `INVALID_CLIENT_ACCOUNT_ID` | Invalid client account id. |
| `PRICING_ONLY_ZERO_COST_ALLOWED` | Non-zero cost not allowed for this client account. |
| `PRICE_TOO_HIGH` | Cost too high for this license. |
| `CUSTOMER_NOT_ALLOWED_TO_CREATE_LICENSE` | Customer not allowed to create license. |
| `INVALID_PRICING_END_DATE` | Pricing end date is invalid for this license. |
| `CANNOT_LICENSE_LOGICAL_LIST_WITH_LICENSED_OR_SHARED_SEGMENT` | Logical user list with shared or licensed segment cannot be licensed. |
| `MISMATCHED_ACCOUNT_TYPE` | Client customer's account type in the request does not match the customer's actual account type. |
| `MEDIA_SHARE_COST_NOT_ALLOWED_FOR_LICENSE_TYPE` | License type does not support media share cost. |
| `MEDIA_SHARE_COST_NOT_ALLOWED_FOR_CLIENT_CUSTOMER` | Client customer type does not support media share cost. |
| `INVALID_MEDIA_SHARE_COST` | Invalid media share cost. |
| `INVALID_COST_TYPE` | Invalid cost type. |
| `MEDIA_SHARE_COST_NOT_ALLOWED_FOR_NON_COMMERCE_USER_LIST` | UserList type does not support media share cost. |
| `MAX_COST_NOT_ALLOWED` | Max cost is only allowed for costType MEDIA_SHARE. |
| `COMMERCE_AUDIENCE_CAN_ONLY_BE_DIRECTLY_LICENSED` | Commerce audience can only be directly licensed. |
| `INVALID_DESCRIPTION` | The description is not valid. |
| `INVALID_DISPLAY_NAME` | The display name is not valid. |
| `DISPLAY_NAME_ALREADY_USED` | The display name is already being used for another user list for the account. |
| `OWNERSHIP_REQUIRED_FOR_UPDATE` | Ownership is required to modify the user list. |
| `USER_LIST_MUTATION_NOT_SUPPORTED` | The user list type is read-only and does not support mutation. |
| `SENSITIVE_USER_LIST_IMMUTABLE` | A user list which is privacy sensitive or legal rejected cannot be mutated by external users. |
| `BILLABLE_RECORD_COUNT_IMMUTABLE` | The remarketing user list's billable record field cannot be modified once it is set. |
| `USER_LIST_NAME_RESERVED` | The user list name is reserved for system lists. |
| `ADVERTISER_NOT_ALLOWLISTED_FOR_UPLOADED_DATA` | The advertiser needs to be allowlisted to use remarketing lists created from advertiser uploaded data. |
| `UNSUPPORTED_PARTNER_AUDIENCE_SOURCE` | The partner audience source is not supported for the user list type. |
| `COMMERCE_PARTNER_NOT_ALLOWED` | Setting the `commercePartner` field is only supported if the `partnerAudienceSource` is `COMMERCE_AUDIENCE`. |
| `UNSUPPORTED_PARTNER_AUDIENCE_INFO` | The `partnerAudienceInfo` field is not supported for the user list type. |
| `PARTNER_MATCH_FOR_MANAGER_ACCOUNT_DISALLOWED` | Partner Match user lists cannot be created by manager accounts. |
| `DATA_PARTNER_NOT_ALLOWLISTED_FOR_THIRD_PARTY_PARTNER_DATA` | The data partner is not allowlisted for THIRD_PARTY_PARTNER_DATA. |
| `ADVERTISER_TOS_NOT_ACCEPTED` | The advertiser has not accepted the partner's terms of service. |
| `ADVERTISER_NOT_ALLOWLISTED_FOR_THIRD_PARTY_PARTNER_DATA` | The advertiser is not allowlisted for THIRD_PARTY_PARTNER_DATA. |
| `USER_LIST_TYPE_NOT_SUPPORTED_FOR_ACCOUNT` | This user list type is not supported for this account. |
| `INVALID_COMMERCE_PARTNER` | The `commercePartner` field is invalid. |
| `CUSTOMER_NOT_ALLOWLISTED_FOR_COMMERCE_AUDIENCE` | The data provider is not allowlisted to create commerce audiences. |
| `UNSUPPORTED_USER_LIST_UPLOAD_KEY_TYPES` | The user list upload key types are not supported. |
| `UNSUPPORTED_INGESTED_USER_LIST_INFO_CONFIG` | The ingested user list info config is not supported. |
| `UNSUPPORTED_ACCOUNT_TYPES_FOR_USER_LIST_TYPE` | The account types are not supported for the user list type. |
| `UNSUPPORTED_ACCOUNT_TYPE_FOR_PARTNER_LINK` | The account types are not supported for the partner link. |
| `MEMBERSHIP_DURATION_TOO_LONG` | The user list membership duration is too long. |
| `INVALID_MERCHANT_ID` | The `merchantId` field is not valid. |
| `EU_POLITICAL_ADVERTISING_DECLARATION_REQUIRED` | The customer contains non-exempt campaigns without the EU political advertising declaration. |
| `ACCOUNT_INELIGIBLE_FOR_STORE_SALES` | Account is not eligible for Store Sales. |
| `INVALID_MERCHANT_FEED_LANGUAGE_CODE` | The merchant feed language code is not valid. |
| `INVALID_REGION_CODE` | The region code is not valid. |
| `INVALID_SUBDIVISION_CODE` | The subdivision code is not valid. |
| `INVALID_SUBCONTINENT_CODE` | The subcontinent code is not valid. |
| `INVALID_CONTINENT_CODE` | The continent code is not valid. |
| `INVALID_DEVICE_CATEGORY` | The device category is not valid. |
| `BOTH_CLIENT_ID_AND_APP_INSTANCE_ID_NOT_ALLOWED` | Both appInstanceId and clientId are set. |
| `GOOGLE_ANALYTICS_SUBPROPERTY_OR_ROLLUP_PROPERTY_NOT_ALLOWED` | The Google Analytics property is a subproperty or rollup property. |
| `THIRD_PARTY_USER_DATA_NOT_ALLOWED` | Third party user data can only be set by data partners. |
| `INVALID_COUPON_CODE` | The coupon code is not valid. |
| `EVENT_SOURCE_AND_DESTINATION_MISMATCH` | The event source type does not match the destination type. |
| `DESTINATION_ACCOUNT_TYPE_MISMATCH` | The destination account type does not match the specified account id. |
| `CUSTOM_VARIABLE_VALUE_CONTAINS_PII` | The custom variable value contains personally identifiable information (PII). |
| `CUSTOM_VARIABLE_NOT_ENABLED` | The custom variable is not enabled. |
| `INVALID_CUSTOM_VARIABLE_VALUE` | The custom variable's value is invalid. |
| `CUSTOM_VARIABLE_NOT_FOUND` | The destination does not have a custom variable with a name that matches the specified `variable`. |
| `BASELINE_LOCATION_AUTO_DETECTION_FAILED` | The `https://developers.google.com/data-manager/api/reference/rest/v1/accountTypes.accounts.insights/retrieve#Baseline.FIELDS.location_auto_detection_enabled` field of the request was set to `true`, but auto detection of baseline location failed. |
| `INSIGHTS_MISSING_FOR_DIMENSION` | Insights missing for this dimension. |
