# Rule ID
S3-003

# Title
Wildcard Action

# Description
The policy uses a wildcard (*) in the Action element.

# Why It Is Dangerous
Wildcard actions grant more permissions than necessary and increase the attack surface.

# Real-World Impact
Users may gain unintended permissions, including access to sensitive S3 operations.

# AWS Recommendation
Specify only the exact S3 actions required instead of using wildcard actions.

# Example Secure Policy

{
    "Effect": "Allow",
    "Principal": {
        "AWS": "arn:aws:iam::123456789012:role/AppRole"
    },
    "Action": [
        "s3:GetObject",
        "s3:ListBucket"
    ],
    "Resource": [
        "arn:aws:s3:::my-bucket",
        "arn:aws:s3:::my-bucket/*"
    ]
}

# References

AWS IAM Policy Best Practices
Principle of Least Privilege
