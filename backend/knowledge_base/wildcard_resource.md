# Rule ID
S3-006

# Title
Wildcard Resource

# Description
The policy grants permissions on all S3 resources using a wildcard resource.

# Why It Is Dangerous
Wildcard resources may unintentionally expose multiple buckets or objects.

# Real-World Impact
Permissions intended for one bucket may apply to many resources, increasing the attack surface.

# AWS Recommendation
Restrict permissions to the exact bucket or object ARNs required.

# Example Secure Policy

{
    "Effect": "Allow",
    "Principal": {
        "AWS": "arn:aws:iam::123456789012:role/ApplicationRole"
    },
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::my-bucket/*"
}

# References

AWS IAM Best Practices
Amazon S3 Security Best Practices
