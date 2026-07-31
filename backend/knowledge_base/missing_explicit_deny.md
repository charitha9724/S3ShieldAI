# Rule ID
S3-013

# Title
Missing Explicit Deny

# Description
The bucket policy does not contain any explicit Deny statements.

# Why It Is Dangerous
Important security controls such as HTTPS enforcement often rely on explicit Deny statements.

# Real-World Impact
The policy may not effectively prevent insecure or unintended access patterns.

# AWS Recommendation
Add explicit Deny statements where appropriate, such as denying insecure transport or unauthorized access scenarios.

# Example Secure Policy

{
    "Effect": "Deny",
    "Principal": "*",
    "Action": "s3:*",
    "Resource": [
        "arn:aws:s3:::my-bucket",
        "arn:aws:s3:::my-bucket/*"
    ]
}

# References

Amazon S3 Security Best Practices
