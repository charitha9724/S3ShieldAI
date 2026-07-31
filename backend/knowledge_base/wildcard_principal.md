# Rule ID
S3-004

# Title
Wildcard Principal

# Description
The bucket policy grants permissions to every AWS account or anonymous users using Principal '*'.

# Why It Is Dangerous
Granting permissions to everyone removes identity-based access control.

# Real-World Impact
Unauthorized users may gain access to bucket resources.

# AWS Recommendation
Replace wildcard principals with specific IAM users, IAM roles, or AWS services.

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
