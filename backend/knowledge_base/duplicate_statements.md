# Rule ID
S3-012

# Title
Duplicate Statements

# Description
The bucket policy contains duplicate statements.

# Why It Is Dangerous
Duplicate statements increase policy complexity and make reviews more difficult.

# Real-World Impact
Redundant policy entries can lead to configuration mistakes and maintenance issues.

# AWS Recommendation
Remove duplicate statements and keep the policy concise.

# Example Secure Policy

{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::123456789012:user/AppUser"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::my-bucket/*"
        }
    ]
}

# References

AWS IAM Best Practices
