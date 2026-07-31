# Rule ID
S3-011

# Title
Unsupported Policy Version

# Description
The bucket policy uses an outdated or unsupported policy version.

# Why It Is Dangerous
Older policy versions may not support the latest IAM features and security improvements.

# Real-World Impact
Using outdated policy versions can reduce compatibility with AWS security best practices.

# AWS Recommendation
Use the latest supported policy version (2012-10-17).

# Example Secure Policy

{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::123456789012:role/ApplicationRole"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::my-bucket/*"
        }
    ]
}

# References

AWS IAM JSON Policy Reference
