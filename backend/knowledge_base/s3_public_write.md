# Rule ID
S3-002

# Title
Public Write Access

# Description
The bucket policy allows anonymous users to upload, modify, or delete objects.

# Why It Is Dangerous
Public write access allows anyone on the internet to modify the contents of the bucket.

# Real-World Impact
Attackers may upload malicious files, overwrite existing objects, or delete critical data.

# AWS Recommendation
Grant write permissions only to trusted IAM identities and follow the principle of least privilege.

# Example Secure Policy

{
    "Effect": "Allow",
    "Principal": {
        "AWS": "arn:aws:iam::123456789012:user/Developer"
    },
    "Action": [
        "s3:PutObject"
    ],
    "Resource": "arn:aws:s3:::my-bucket/*"
}

# References

Amazon S3 Security Best Practices
AWS IAM Best Practices
