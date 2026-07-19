The Data Manager API supports encrypting data using the following key management
services:

- [Google Cloud Key Management Service](https://developers.google.com/data-manager/api/devguides/concepts/encryption#setup_kms)
- [AWS Key Management Service](https://developers.google.com/data-manager/api/devguides/concepts/encryption#aws_setup_kms)

Support for some use cases differs by key management service (KMS):

| Category | Use case | Google Cloud KMS | AWS KMS |
|---|---|---|---|
| [Audiences](https://developers.google.com/data-manager/api/devguides/audiences) | Send audience members | Yes | Yes |
| [Events](https://developers.google.com/data-manager/api/devguides/events) | Offline conversions or enhanced conversions for leads | Yes | No |
| [Events](https://developers.google.com/data-manager/api/devguides/events) | Google Ads store sales conversions | Yes | No |
| [Events](https://developers.google.com/data-manager/api/devguides/events) | Events sent as an additional data source to a Google Ads destination | Yes | Yes |
| [Events](https://developers.google.com/data-manager/api/devguides/events) | Events sent as an additional data source to a Google Analytics destination | Yes | No |

## Set up Google Cloud KMS

Here are the steps to set up Google Cloud KMS resources for encryption.

### Set up the Google Cloud command line interface

1. [Install and
   initialize](https://cloud.google.com/sdk/docs/install-sdk) the Google Cloud command line interface.

2. To select or create a new Google Cloud project and enable the
   [Cloud Key Management Service](https://cloud.google.com/kms/docs/key-management-service), click **Enable Cloud KMS**.

   > [!TIP]
   > **Tip:** We recommend using a separate project for your Cloud KMS resources that doesn't contain any other Google Cloud resources.


   Enable Cloud KMS
3. To set your project in your environment, use the [`gcloud config set`](https://cloud.google.com/sdk/gcloud/reference/config/set)
   command. To check if the project is already set in your environment, run
   `gcloud config list`.

   If no `project` is set, or you want to use a different project for your key,
   run `gcloud config set`:

       gcloud config set project PROJECT_ID

### Create a key

For more information, see the [Cloud Key Management Service overview](https://cloud.google.com/kms/docs/key-management-service).

1. Create a key ring.

       gcloud kms keyrings create KEY_RING_NAME \
           --location KEY_RING_LOCATION

   For more information, see [Create a key ring](https://cloud.google.com/kms/docs/create-key-ring).
2. Create a key in the key ring. The <var translate="no">ROTATION_PERIOD</var> indicates the
   interval to rotate the key, and the <var translate="no">NEXT_ROTATION_TIME</var> indicates
   the date and time when the first rotation should occur.

   For example, to rotate the key every 30 days and perform the first rotation
   in 1 week, set <var translate="no">ROTATION_PERIOD</var> to `30d` and
   <var translate="no">NEXT_ROTATION_TIME</var> to
   `$(date --utc --date="next week" --iso-8601=seconds)`.

       gcloud kms keys create KEY_NAME \
           --keyring KEY_RING_NAME \
           --location KEY_RING_LOCATION \
           --purpose "encryption" \
           --rotation-period ROTATION_PERIOD \
           --next-rotation-time "NEXT_ROTATION_TIME"

   For more information, see [Create a key](https://cloud.google.com/kms/docs/create-key).

### Create a workload identity pool provider

This section is a short overview of Workload Identity Federation. For more
information, see [Workload Identity Federation](https://cloud.google.com/iam/docs/workload-identity-federation).

1. Create a workload identity pool (WIP). The `location` for the pool must be
   `global`.

       gcloud iam workload-identity-pools create WIP_ID \
          --location=global \
          --display-name="WIP_DISPLAY_NAME" \
          --description="WIP_DESCRIPTION"

   For more information, see [Manage workload identity pools and
   providers](https://cloud.google.com/iam/docs/manage-workload-identity-pools-providers).
2. Create a workload identity pool provider. The `--attribute-condition`
   argument verifies that the caller is a confidential match service account.

       gcloud iam workload-identity-pools providers create-oidc PROVIDER_ID \
          --location=global \
          --workload-identity-pool=WIP_ID \
          --display-name="PROVIDER_DISPLAY_NAME" \
          --description="PROVIDER_DESCRIPTION" \
          --attribute-mapping="google.subject=assertion.sub,google.groups=[\"PROVIDER_ID\"]" \
          --attribute-condition="assertion.swname == 'CONFIDENTIAL_SPACE' &&
            'STABLE' in assertion.submods.confidential_space.support_attributes &&
            ['cfm-services@admcloud-cfm-services.iam.gserviceaccount.com'].exists(
                a, a in assertion.google_service_accounts) &&
            'ECDSA_P256_SHA256:6b1f357b59e9407fb017ca0e3e783b2bd5acbfea6c83dd82971a4150df5b25f9'
            in assertion.submods.container.image_signatures.map(sig, sig.signature_algorithm+':'+sig.key_id)" \
          --issuer-uri="https://confidentialcomputing.googleapis.com" \
          --allowed-audiences="https://sts.googleapis.com"

3. Grant the key decrypter role to the WIP provider.

       # Grants the role to the WIP provider.
       gcloud kms keys add-iam-policy-binding KEY_NAME \
           --keyring KEY_RING_NAME \
           --location KEY_RING_LOCATION \
           --member "principalSet://iam.googleapis.com/projects/PROJECT_ID/locations/global/workloadIdentityPools/WIP_ID/group/PROVIDER_ID" \
           --role "roles/cloudkms.cryptoKeyDecrypter"

4. If you want to encrypt [event data](https://developers.google.com/data-manager/api/devguides/events) for offline conversions and
   enhanced conversions for leads, grant the key decrypter role to the Google

   service account `datamanager-api@datamanager-ga.iam.gserviceaccount.com`.

       # Grants the role to the Google service account.
       gcloud kms keys add-iam-policy-binding KEY_NAME \
           --keyring KEY_RING_NAME \
           --location KEY_RING_LOCATION \
           --member "serviceAccount:datamanager-api@datamanager-ga.iam.gserviceaccount.com" \
           --role "roles/cloudkms.cryptoKeyDecrypter"

   <br />

Proceed to the [Encrypt data](https://developers.google.com/data-manager/api/devguides/concepts/encryption#encrypt_data) section.

## Set up AWS KMS

Here are the steps to set up [AWS KMS](https://docs.aws.amazon.com/kms/) resources for encryption.

### Set up the AWS Command Line Interface

1. [Install the AWS Command Line Interface](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html#cliv2-linux-install).
2. Run the following command to verify the installation:

       aws --version

   Here's a snippet of the output for a successful installation:

       aws-cli/2.31.12 Python/3.13.7 ...

### Set up an AWS user and sign in

1. Complete the [prerequisites for using the AWS Command Line Interface](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-prereqs.html).
2. [Sign in](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-sso.html) to an IAM Identity Center session.

### Create a key

1. Create a [symmetric KMS key (KEK)](https://docs.aws.amazon.com/cli/latest/reference/kms/create-key.html).

       aws kms create-key \
         --key-usage ENCRYPT_DECRYPT \
         --key-spec SYMMETRIC_DEFAULT \
         --description "KEK for Confidential Matching Data Encryption"

   Note the `Arn` under `KeyMetadata` in the output. You'll need this [Amazon
   Resource Name](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference-arns.html) (ARN) in other steps.

       AWS_KEY_ARN

2. Optional: Create a [key alias](https://docs.aws.amazon.com/cli/latest/reference/kms/create-alias.html) using an alias name
   of your choice.

       aws kms create-alias \
         --alias-name "alias/AWS_KEY_ALIAS" \
         --target-key-id AWS_KEY_ARN

   An alias isn't required, but it's useful for constructing AWS Command Line
   Interface commands. For example, you can retrieve the key ARN using the
   alias:

       aws kms describe-key --key-id "alias/AWS_KEY_ALIAS" \
         --query 'KeyMetadata.Arn' \
         --output text

### Create an OpenID Connect identity provider

[Create an OpenID Connect (OIDC) identity provider](https://docs.aws.amazon.com/cli/latest/reference/iam/create-open-id-connect-provider.html). You only
need to perform this step once per AWS account.

    aws iam create-open-id-connect-provider \
      --url https://confidentialcomputing.googleapis.com \
      --client-id-list AUDIENCE \
      --thumbprint-list "08745487e891c19e3078c1f2a07e452950ef36f6"

Note the OIDC provider ARN from the output. You'll need this in other steps.

    AWS_OIDC_PROVIDER_ARN

### Create an IAM policy

1. Create a JSON file named `kms-decrypt-policy.json` with the following
   contents:

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

2. [Create an IAM policy](https://docs.aws.amazon.com/cli/latest/reference/iam/create-policy.html) using the JSON file and a
   policy name of your choosing.

       aws iam create-policy \
         --policy-name "AWS_POLICY_NAME" \
         --policy-document file://kms-decrypt-policy.json

   Note the IAM policy ARN in the output. You'll need this in other steps.

       AWS_IAM_POLICY_ARN

### Create and attach an IAM role

1. Create a JSON file named `role-trust-policy.json` with the following
   contents and the OIDC provider ARN from the earlier step:

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

2. [Create an IAM role](https://docs.aws.amazon.com/cli/latest/reference/iam/create-role.html) with a role name of your choosing.

       aws iam create-role \
         --role-name "AWS_IAM_ROLE_NAME" \
         --assume-role-policy-document file://role-trust-policy.json

3. [Attach the role policy](https://docs.aws.amazon.com/cli/latest/reference/iam/attach-role-policy.html) to the IAM policy.

       aws iam attach-role-policy \
         --role-name "AWS_IAM_ROLE_NAME" \
         --policy-arn "AWS_IAM_POLICY_ARN"

## Encrypt data

Encryption in the Data Manager API requires a data encryption key (DEK). A DEK is a
symmetric key that you use to encrypt data. Your DEK is encrypted using
your Google Cloud or AWS KMS key encryption key (KEK). You send the encrypted
DEK, KEK URI, and WIP provider as part of the request.

> [!IMPORTANT]
> **Important:** To process encrypted data, the Data Manager API sends requests to your key management service (Google Cloud or AWS). These requests consume quota from your KMS project. To avoid quota errors, make sure your project has sufficient KMS quota. You can also choose to use the same data encryption key (DEK) for multiple requests to reduce the number of KMS requests made by the Data Manager API.

To prepare the data in the request for encryption, follow the same [formatting
and hashing guidelines](https://developers.google.com/data-manager/api/devguides/concepts/formatting) you'd use for unencrypted data.

Don't encrypt unhashed values. For example, the `region_code` or `postal_code`
of an [`AddressInfo`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#addressinfo).

Once the data for each field is formatted and hashed, encrypt the hashed value
using the following steps:

1. Encode the hash bytes using Base64 encoding.
2. Encrypt the Base64-encoded hash using your DEK.
3. Encode the output from the encryption process using either hex or Base64 encoding.
4. Use the encoded value for the field.
5. Set the [`encryption_info`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#encryptioninfo) and [`encoding`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#encoding) on the request.

> [!TIP]
> **Tip:** We recommend using [Tink](https://developers.google.com/tink) to implement encryption. Tink helps users without a cryptography background safely implement common cryptographic tasks.

To complete the last step, modify the
[`IngestAudienceMembersRequest`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#ingestaudiencemembersrequest) or
[`IngestEventsRequest`](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#ingesteventsrequest)
to indicate you encrypted
your data:

- Set the `encryption_info` field.
- Set the `encoding` field to the encoding used to encode the encrypted field values.

Here's a snippet of a request using a Google Cloud KMS key and with the
encryption and encoding fields set:

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

To use the Data Manager API [library and
utilities](https://developers.google.com/data-manager/api/devguides/quickstart/install-library) to construct and send a
request, see the
[`IngestAudienceMembers` code sample](https://github.com/googleads/data-manager-java/blob/main/data-manager-samples/src/main/java/com/google/ads/datamanager/samples/IngestAudienceMembers.java)
for Java or the
[`ingest_audience_members` code sample](https://github.com/googleads/data-manager-python/blob/main/samples/audiences/ingest_audience_members.py)
for Python.

## Check diagnostics for encryption issues

After uploading encrypted data, use [diagnostics](https://developers.google.com/data-manager/api/devguides/diagnostics) to check
for any [warnings related to encryption](https://developers.google.com/data-manager/api/reference/rpc/google.ads.datamanager.v1#processingwarningreason), such as
`PROCESSING_WARNING_REASON_KEK_PERMISSION_DENIED` or
`PROCESSING_WARNING_REASON_DEK_DECRYPTION_ERROR`. Address any warnings in
diagnostics, send requests again, and verify that diagnostics no longer returns
warnings after your changes.