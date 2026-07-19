The Data Manager API supports data encryption using the following key management services:

- [Google Cloud Key Management Service](https://developers.google.com/data-manager/api/devguides/concepts/encryption#setup_kms)
- [AWS Key Management Service](https://developers.google.com/data-manager/api/devguides/concepts/encryption#aws_setup_kms)

Support for specific use cases varies by key management service (KMS):

| Category                                                                        | Use case                                                                   | Google Cloud KMS | AWS KMS |
| ------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ---------------- | ------- |
| [Audiences](https://developers.google.com/data-manager/api/devguides/audiences) | Send audience members                                                      | Yes              | Yes     |
| [Events](https://developers.google.com/data-manager/api/devguides/events)       | Offline conversions or enhanced conversions for leads                      | Yes              | No      |
| [Events](https://developers.google.com/data-manager/api/devguides/events)       | Google Ads store sales conversions                                         | Yes              | No      |
| [Events](https://developers.google.com/data-manager/api/devguides/events)       | Events sent as an additional data source to a Google Ads destination       | Yes              | Yes     |
| [Events](https://developers.google.com/data-manager/api/devguides/events)       | Events sent as an additional data source to a Google Analytics destination | Yes              | No      |

## Set up Google Cloud KMS

Follow these steps to configure Google Cloud KMS resources for encryption.

### Set up the Google Cloud CLI

1. [Install and initialize](https://cloud.google.com/sdk/docs/install-sdk) the Google Cloud CLI.

2. Select or create a Google Cloud project and enable [Cloud Key Management Service](https://cloud.google.com/kms/docs/key-management-service).

   > **Tip:** Use a dedicated project for Cloud KMS resources that does not contain other resources.

3. Set your project in the environment:

   ```
   gcloud config set project PROJECT_ID
   ```

   To verify the current project:

   ```
   gcloud config list
   ```

### Create a key

1. Create a key ring:

   ```
   gcloud kms keyrings create KEY_RING_NAME \
       --location KEY_RING_LOCATION
   ```

2. Create a key within the key ring:

   ```
   gcloud kms keys create KEY_NAME \
       --keyring KEY_RING_NAME \
       --location KEY_RING_LOCATION \
       --purpose encryption \
       --rotation-period ROTATION_PERIOD \
       --next-rotation-time "NEXT_ROTATION_TIME"
   ```

   Example:

   - `ROTATION_PERIOD`: `30d`
   - `NEXT_ROTATION_TIME`: `$(date --utc --date="next week" --iso-8601=seconds)`

### Create a workload identity pool provider

1. Create a workload identity pool:

   ```
   gcloud iam workload-identity-pools create WIP_ID \
       --location=global \
       --display-name="WIP_DISPLAY_NAME" \
       --description="WIP_DESCRIPTION"
   ```

2. Create a workload identity pool provider:

   ```
   gcloud iam workload-identity-pools providers create-oidc PROVIDER_ID \
       --location=global \
       --workload-identity-pool=WIP_ID \
       --display-name="PROVIDER_DISPLAY_NAME" \
       --description="PROVIDER_DESCRIPTION" \
       --attribute-mapping="google.subject=assertion.sub,google.groups=[\"PROVIDER_ID\"]" \
       --attribute-condition="assertion.swname == 'CONFIDENTIAL_SPACE' && 'STABLE' in assertion.submods.confidential_space.support_attributes && ['cfm-services@admcloud-cfm-services.iam.gserviceaccount.com'].exists(a, a in assertion.google_service_accounts) && 'ECDSA_P256_SHA256:6b1f357b59e9407fb017ca0e3e783b2bd5acbfea6c83dd82971a4150df5b25f9' in assertion.submods.container.image_signatures.map(sig, sig.signature_algorithm+':'+sig.key_id)" \
       --issuer-uri="https://confidentialcomputing.googleapis.com" \
       --allowed-audiences="https://sts.googleapis.com"
   ```

3. Grant the key decrypter role to the provider:

   ```
   gcloud kms keys add-iam-policy-binding KEY_NAME \
       --keyring KEY_RING_NAME \
       --location KEY_RING_LOCATION \
       --member "principalSet://iam.googleapis.com/projects/PROJECT_ID/locations/global/workloadIdentityPools/WIP_ID/group/PROVIDER_ID" \
       --role roles/cloudkms.cryptoKeyDecrypter
   ```

4. (Optional) Grant access for event data encryption:

   ```
   gcloud kms keys add-iam-policy-binding KEY_NAME \
       --keyring KEY_RING_NAME \
       --location KEY_RING_LOCATION \
       --member "serviceAccount:datamanager-api@datamanager-ga.iam.gserviceaccount.com" \
       --role roles/cloudkms.cryptoKeyDecrypter
   ```

Proceed to the [Encrypt data](https://developers.google.com/data-manager/api/devguides/concepts/encryption#encrypt_data) section.

## Set up AWS KMS

Follow these steps to configure AWS KMS resources.

### Set up the AWS CLI

1. [Install the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html#cliv2-linux-install).
2. Verify installation:
   ```
   aws --version
   ```

### Set up an AWS user

1. Complete [AWS CLI prerequisites](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-prereqs.html).
2. [Sign in](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-sso.html) using IAM Identity Center.

### Create a key

1. Create a symmetric KMS key:

   ```
   aws kms create-key \
     --key-usage ENCRYPT_DECRYPT \
     --key-spec SYMMETRIC_DEFAULT \
     --description "KEK for Confidential Matching Data Encryption"
   ```

   Save the `Arn` as `AWS_KEY_ARN`.

2. (Optional) Create an alias:

   ```
   aws kms create-alias \
     --alias-name "alias/AWS_KEY_ALIAS" \
     --target-key-id AWS_KEY_ARN
   ```

### Create an OpenID Connect provider

```
aws iam create-open-id-connect-provider \
  --url https://confidentialcomputing.googleapis.com \
  --client-id-list AUDIENCE \
  --thumbprint-list "08745487e891c19e3078c1f2a07e452950ef36f6"
```

Save the output as `AWS_OIDC_PROVIDER_ARN`.

### Create an IAM policy

1. Create `kms-decrypt-policy.json`:

   ```
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Action": "kms:Decrypt",
         "Resource": "AWS_KEY_ARN"
       }
     ]
   }
   ```

2. Create the policy:

   ```
   aws iam create-policy \
     --policy-name "AWS_POLICY_NAME" \
     --policy-document file://kms-decrypt-policy.json
   ```

Save the ARN as `AWS_IAM_POLICY_ARN`.

### Create and attach an IAM role

1. Create `role-trust-policy.json`:

   ```
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Principal": {
           "Federated": "AWS_OIDC_PROVIDER_ARN"
         },
         "Action": [
           "sts:AssumeRoleWithWebIdentity",
           "sts:TagSession"
         ],
         "Condition": {
           "StringEquals": {
             "confidentialcomputing.googleapis.com:aud": "cfm-awsresource",
             "aws:RequestTag/swname": "CONFIDENTIAL_SPACE",
             "aws:RequestTag/container.signatures.key_ids": "6b1f357b59e9407fb017ca0e3e783b2bd5acbfea6c83dd82971a4150df5b25f9"
           },
           "StringLike": {
             "aws:RequestTag/confidential_space.support_attributes": "*STABLE*"
           }
         }
       }
     ]
   }
   ```

2. Create the role:

   ```
   aws iam create-role \
     --role-name "AWS_IAM_ROLE_NAME" \
     --assume-role-policy-document file://role-trust-policy.json
   ```

3. Attach the policy:

   ```
   aws iam attach-role-policy \
     --role-name "AWS_IAM_ROLE_NAME" \
     --policy-arn "AWS_IAM_POLICY_ARN"
   ```

## Encrypt data

Encryption requires a data encryption key (DEK), which is encrypted using a KMS key encryption key (KEK). You must include the encrypted DEK, KEK URI, and WIP provider in your request.

> **Important:** The Data Manager API sends requests to your KMS, consuming quota. Ensure sufficient quota or reuse DEKs to reduce requests.

### Encryption steps

1. Format and hash data according to [guidelines](https://developers.google.com/data-manager/api/devguides/concepts/formatting).

2. Do not encrypt unhashed values (e.g., `region_code`, `postal_code`).

3. For each field:

   - Base64 encode the hash
   - Encrypt using the DEK
   - Encode the result (hex or Base64)
   - Use the encoded value

4. Set:

   - [`encryption_info`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#encryptioninfo)
   - [`encoding`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#encoding)

> **Tip:** Use [Tink](https://developers.google.com/tink) for secure encryption implementation.

### Example request

```
{
  ...
  "encryptionInfo": {
    "gcpWrappedKeyInfo": {
      "kekUri": "gcp-kms://projects/PROJECT_ID/locations/KEY_RING_LOCATION/keyRings/KEY_RING_NAME/cryptoKeys/KEY_NAME",
      "wipProvider": "projects/PROJECT_ID/locations/global/workloadIdentityPools/WIP_ID/providers/PROVIDER_ID",
      "keyType": "XCHACHA20_POLY1305",
      "encryptedDek": "ENCRYPTED_DEK"
    }
  },
  "encoding": "ENCODING"
}
```

See code samples:

- [Java](https://github.com/googleads/data-manager-java/blob/main/data-manager-samples/src/main/java/com/google/ads/datamanager/samples/IngestAudienceMembers.java)
- [Python](https://github.com/googleads/data-manager-python/blob/main/samples/audiences/ingest_audience_members.py)

## Check diagnostics

After uploading encrypted data, use [diagnostics](https://developers.google.com/data-manager/api/devguides/diagnostics) to identify issues such as:

- `PROCESSING_WARNING_REASON_KEK_PERMISSION_DENIED`
- `PROCESSING_WARNING_REASON_DEK_DECRYPTION_ERROR`

Resolve any warnings and resend requests until diagnostics no longer report issues.
