# Rule ID
S3-007

# Title
Sensitive S3 Actions

# Description
The policy grants sensitive S3 actions such as bucket deletion, policy modification, or ACL changes.

# Why It Is Dangerous
Sensitive actions can be abused to destroy data or weaken bucket security.

# Real-World Impact
Attackers may delete buckets, modify policies, or grant themselves additional access.

# AWS Recommendation
Grant sensitive administrative actions only to trusted administrators following least privilege.

# Example Secure Policy

{
    "Effect": "Allow",
    "Principal": {
        "AWS": "arn:aws:iam::123456789012:role/S3Admin"
    },
    "Action": [
        "s3:PutBucketPolicy",
        "s3:DeleteBucketPolicy"
    ],
    "Resource": "arn:aws:s3:::my-bucket"
}

# References

Amazon S3 Security Best Practices
AWS IAM Best Practices
