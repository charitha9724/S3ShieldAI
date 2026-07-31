# Rule ID
S3-008

# Title
Root Account Access

# Description
The bucket policy grants permissions directly to an AWS account root user.

# Why It Is Dangerous
Root accounts have unrestricted privileges and should not be used for routine access.

# Real-World Impact
Compromise of the root account can lead to complete control over AWS resources.

# AWS Recommendation
Grant permissions to IAM roles instead of root users whenever possible.

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

AWS Root User Best Practices
AWS IAM Best Practices
