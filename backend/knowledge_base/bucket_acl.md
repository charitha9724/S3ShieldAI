# Rule ID
S3-010

# Title
Bucket ACL Actions

# Description
The policy allows actions that modify bucket or object ACLs.

# Why It Is Dangerous
ACL modifications can unintentionally expose buckets or objects to unauthorized users.

# Real-World Impact
Misconfigured ACLs may override expected access controls and lead to data exposure.

# AWS Recommendation
Avoid using ACLs where possible and rely on bucket policies and IAM policies instead.

# Example Secure Policy

{
    "Effect": "Allow",
    "Principal": {
        "AWS": "arn:aws:iam::123456789012:role/S3Admin"
    },
    "Action": [
        "s3:PutBucketAcl"
    ],
    "Resource": "arn:aws:s3:::my-bucket"
}

# References

Amazon S3 Object Ownership
Amazon S3 Security Best Practices
