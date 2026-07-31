# Rule ID
S3-001

# Title
Public Read Access

# Description
The bucket policy grants anonymous users permission to read objects.

# Why It Is Dangerous
Anyone on the internet can access objects stored in the bucket if they know or discover the object URL.

# Real-World Impact
Sensitive information such as customer data, backups, logs, or application assets may become publicly accessible.

# AWS Recommendation
Restrict read access to trusted IAM users or roles. Enable Amazon S3 Block Public Access unless the bucket is intentionally public.

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

Amazon S3 Security Best Practices
Amazon S3 Block Public Access
