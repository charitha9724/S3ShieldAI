# Rule ID
S3-009

# Title
HTTPS Not Enforced

# Description
The bucket policy does not explicitly deny requests made over insecure HTTP.

# Why It Is Dangerous
Traffic sent over HTTP can be intercepted or modified by attackers.

# Real-World Impact
Sensitive data transferred to or from S3 may be exposed during transit.

# AWS Recommendation
Add a Deny statement using aws:SecureTransport = false to enforce HTTPS-only access.

# Example Secure Policy

{
    "Effect": "Deny",
    "Principal": "*",
    "Action": "s3:*",
    "Resource": [
        "arn:aws:s3:::my-bucket",
        "arn:aws:s3:::my-bucket/*"
    ],
    "Condition": {
        "Bool": {
            "aws:SecureTransport": "false"
        }
    }
}

# References

AWS Secure Transport
Amazon S3 Security Best Practices
