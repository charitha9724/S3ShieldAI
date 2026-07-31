# Rule ID
S3-005

# Title
Full Administrative Access

# Description
The policy grants full administrative permissions over the S3 bucket.

# Why It Is Dangerous
Administrative permissions allow complete control over bucket contents and configuration.

# Real-World Impact
Attackers or compromised identities may delete data, change policies, or disable security controls.

# AWS Recommendation
Grant administrative privileges only to trusted administrators and avoid excessive permissions.

# Example Secure Policy

{
    "Effect": "Allow",
    "Principal": {
        "AWS": "arn:aws:iam::123456789012:role/S3Admin"
    },
    "Action": [
        "s3:GetBucketPolicy",
        "s3:PutBucketPolicy"
    ],
    "Resource": "arn:aws:s3:::my-bucket"
}

# References

AWS IAM Best Practices
Amazon S3 Security Best Practices
