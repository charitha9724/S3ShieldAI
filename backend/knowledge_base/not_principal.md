# Rule ID
S3-014

# Title
NotPrincipal Usage

# Description
The bucket policy uses the NotPrincipal element.

# Why It Is Dangerous
NotPrincipal policies are more difficult to understand and can unintentionally grant or deny access.

# Real-World Impact
Policy misconfiguration may expose resources or block legitimate users.

# AWS Recommendation
Prefer explicit Principal definitions whenever possible.

# Example Secure Policy

{
    "Effect": "Deny",
    "NotPrincipal": {
        "AWS": "arn:aws:iam::123456789012:role/ApplicationRole"
    },
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::my-bucket/*"
}

# References

AWS IAM Policy Elements Reference
