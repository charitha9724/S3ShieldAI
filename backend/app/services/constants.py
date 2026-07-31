PUBLIC_READ_ACTIONS = {
    "s3:GetObject",
    "s3:GetObjectVersion",
}

PUBLIC_WRITE_ACTIONS = {
    "s3:PutObject",
    "s3:DeleteObject",
    "s3:DeleteObjectVersion",
}

SENSITIVE_ACTIONS = {
    "s3:PutBucketPolicy",
    "s3:DeleteBucketPolicy",
    "s3:PutBucketAcl",
    "s3:PutBucketPublicAccessBlock",
}