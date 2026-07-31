# Rule ID
S3-015

# Title
Invalid S3 Resource ARN

# Description
The bucket policy references an invalid or malformed S3 ARN.

# Why It Is Dangerous
Invalid resource ARNs may cause permissions to be applied incorrectly or not at all.

# Real-World Impact
Applications may fail to access S3 resources or policies may not behave as expected.

# AWS Recommendation
Use valid S3 bucket and object ARN formats when defining resources.

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

Amazon S3 ARN Format
AWS IAM Policy Reference
