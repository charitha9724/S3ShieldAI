RULES = [
    {
        "rule_id": "S3-001",
        "filename": "s3_public_read.md",
        "title": "Public Read Access",
        "description": "The bucket policy grants anonymous users permission to read objects.",
        "danger": "Anyone on the internet can access objects stored in the bucket if they know or discover the object URL.",
        "impact": "Sensitive information such as customer data, backups, logs, or application assets may become publicly accessible.",
        "recommendation": "Restrict read access to trusted IAM users or roles. Enable Amazon S3 Block Public Access unless the bucket is intentionally public.",
        "example": """{
    "Effect": "Allow",
    "Principal": {
        "AWS": "arn:aws:iam::123456789012:role/ApplicationRole"
    },
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::my-bucket/*"
}""",
        "references": [
            "Amazon S3 Security Best Practices",
            "Amazon S3 Block Public Access"
        ]
    },

    {
        "rule_id": "S3-002",
        "filename": "s3_public_write.md",
        "title": "Public Write Access",
        "description": "The bucket policy allows anonymous users to upload, modify, or delete objects.",
        "danger": "Public write access allows anyone on the internet to modify the contents of the bucket.",
        "impact": "Attackers may upload malicious files, overwrite existing objects, or delete critical data.",
        "recommendation": "Grant write permissions only to trusted IAM identities and follow the principle of least privilege.",
        "example": """{
    "Effect": "Allow",
    "Principal": {
        "AWS": "arn:aws:iam::123456789012:user/Developer"
    },
    "Action": [
        "s3:PutObject"
    ],
    "Resource": "arn:aws:s3:::my-bucket/*"
}""",
        "references": [
            "Amazon S3 Security Best Practices",
            "AWS IAM Best Practices"
        ]
    },

    {
        "rule_id": "S3-003",
        "filename": "wildcard_action.md",
        "title": "Wildcard Action",
        "description": "The policy uses a wildcard (*) in the Action element.",
        "danger": "Wildcard actions grant more permissions than necessary and increase the attack surface.",
        "impact": "Users may gain unintended permissions, including access to sensitive S3 operations.",
        "recommendation": "Specify only the exact S3 actions required instead of using wildcard actions.",
        "example": """{
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
}""",
        "references": [
            "AWS IAM Policy Best Practices",
            "Principle of Least Privilege"
        ]
    },

    {
        "rule_id": "S3-004",
        "filename": "wildcard_principal.md",
        "title": "Wildcard Principal",
        "description": "The bucket policy grants permissions to every AWS account or anonymous users using Principal '*'.",
        "danger": "Granting permissions to everyone removes identity-based access control.",
        "impact": "Unauthorized users may gain access to bucket resources.",
        "recommendation": "Replace wildcard principals with specific IAM users, IAM roles, or AWS services.",
        "example": """{
    "Effect": "Allow",
    "Principal": {
        "AWS": "arn:aws:iam::123456789012:role/ApplicationRole"
    },
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::my-bucket/*"
}""",
        "references": [
            "AWS IAM Best Practices",
            "Amazon S3 Security Best Practices"
        ]
    },

    {
        "rule_id": "S3-005",
        "filename": "full_admin.md",
        "title": "Full Administrative Access",
        "description": "The policy grants full administrative permissions over the S3 bucket.",
        "danger": "Administrative permissions allow complete control over bucket contents and configuration.",
        "impact": "Attackers or compromised identities may delete data, change policies, or disable security controls.",
        "recommendation": "Grant administrative privileges only to trusted administrators and avoid excessive permissions.",
        "example": """{
    "Effect": "Allow",
    "Principal": {
        "AWS": "arn:aws:iam::123456789012:role/S3Admin"
    },
    "Action": [
        "s3:GetBucketPolicy",
        "s3:PutBucketPolicy"
    ],
    "Resource": "arn:aws:s3:::my-bucket"
}""",
        "references": [
            "AWS IAM Best Practices",
            "Amazon S3 Security Best Practices"
        ]
    },
        {
        "rule_id": "S3-006",
        "filename": "wildcard_resource.md",
        "title": "Wildcard Resource",
        "description": "The policy grants permissions on all S3 resources using a wildcard resource.",
        "danger": "Wildcard resources may unintentionally expose multiple buckets or objects.",
        "impact": "Permissions intended for one bucket may apply to many resources, increasing the attack surface.",
        "recommendation": "Restrict permissions to the exact bucket or object ARNs required.",
        "example": """{
    "Effect": "Allow",
    "Principal": {
        "AWS": "arn:aws:iam::123456789012:role/ApplicationRole"
    },
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::my-bucket/*"
}""",
        "references": [
            "AWS IAM Best Practices",
            "Amazon S3 Security Best Practices"
        ]
    },

    {
        "rule_id": "S3-007",
        "filename": "sensitive_actions.md",
        "title": "Sensitive S3 Actions",
        "description": "The policy grants sensitive S3 actions such as bucket deletion, policy modification, or ACL changes.",
        "danger": "Sensitive actions can be abused to destroy data or weaken bucket security.",
        "impact": "Attackers may delete buckets, modify policies, or grant themselves additional access.",
        "recommendation": "Grant sensitive administrative actions only to trusted administrators following least privilege.",
        "example": """{
    "Effect": "Allow",
    "Principal": {
        "AWS": "arn:aws:iam::123456789012:role/S3Admin"
    },
    "Action": [
        "s3:PutBucketPolicy",
        "s3:DeleteBucketPolicy"
    ],
    "Resource": "arn:aws:s3:::my-bucket"
}""",
        "references": [
            "Amazon S3 Security Best Practices",
            "AWS IAM Best Practices"
        ]
    },

    {
        "rule_id": "S3-008",
        "filename": "root_account.md",
        "title": "Root Account Access",
        "description": "The bucket policy grants permissions directly to an AWS account root user.",
        "danger": "Root accounts have unrestricted privileges and should not be used for routine access.",
        "impact": "Compromise of the root account can lead to complete control over AWS resources.",
        "recommendation": "Grant permissions to IAM roles instead of root users whenever possible.",
        "example": """{
    "Effect": "Allow",
    "Principal": {
        "AWS": "arn:aws:iam::123456789012:role/ApplicationRole"
    },
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::my-bucket/*"
}""",
        "references": [
            "AWS Root User Best Practices",
            "AWS IAM Best Practices"
        ]
    },

    {
        "rule_id": "S3-009",
        "filename": "https_enforcement.md",
        "title": "HTTPS Not Enforced",
        "description": "The bucket policy does not explicitly deny requests made over insecure HTTP.",
        "danger": "Traffic sent over HTTP can be intercepted or modified by attackers.",
        "impact": "Sensitive data transferred to or from S3 may be exposed during transit.",
        "recommendation": "Add a Deny statement using aws:SecureTransport = false to enforce HTTPS-only access.",
        "example": """{
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
}""",
        "references": [
            "AWS Secure Transport",
            "Amazon S3 Security Best Practices"
        ]
    },

    {
        "rule_id": "S3-010",
        "filename": "bucket_acl.md",
        "title": "Bucket ACL Actions",
        "description": "The policy allows actions that modify bucket or object ACLs.",
        "danger": "ACL modifications can unintentionally expose buckets or objects to unauthorized users.",
        "impact": "Misconfigured ACLs may override expected access controls and lead to data exposure.",
        "recommendation": "Avoid using ACLs where possible and rely on bucket policies and IAM policies instead.",
        "example": """{
    "Effect": "Allow",
    "Principal": {
        "AWS": "arn:aws:iam::123456789012:role/S3Admin"
    },
    "Action": [
        "s3:PutBucketAcl"
    ],
    "Resource": "arn:aws:s3:::my-bucket"
}""",
        "references": [
            "Amazon S3 Object Ownership",
            "Amazon S3 Security Best Practices"
        ]
    },
        {
        "rule_id": "S3-011",
        "filename": "policy_version.md",
        "title": "Unsupported Policy Version",
        "description": "The bucket policy uses an outdated or unsupported policy version.",
        "danger": "Older policy versions may not support the latest IAM features and security improvements.",
        "impact": "Using outdated policy versions can reduce compatibility with AWS security best practices.",
        "recommendation": "Use the latest supported policy version (2012-10-17).",
        "example": """{
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
}""",
        "references": [
            "AWS IAM JSON Policy Reference"
        ]
    },

    {
        "rule_id": "S3-012",
        "filename": "duplicate_statements.md",
        "title": "Duplicate Statements",
        "description": "The bucket policy contains duplicate statements.",
        "danger": "Duplicate statements increase policy complexity and make reviews more difficult.",
        "impact": "Redundant policy entries can lead to configuration mistakes and maintenance issues.",
        "recommendation": "Remove duplicate statements and keep the policy concise.",
        "example": """{
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
}""",
        "references": [
            "AWS IAM Best Practices"
        ]
    },

    {
        "rule_id": "S3-013",
        "filename": "missing_explicit_deny.md",
        "title": "Missing Explicit Deny",
        "description": "The bucket policy does not contain any explicit Deny statements.",
        "danger": "Important security controls such as HTTPS enforcement often rely on explicit Deny statements.",
        "impact": "The policy may not effectively prevent insecure or unintended access patterns.",
        "recommendation": "Add explicit Deny statements where appropriate, such as denying insecure transport or unauthorized access scenarios.",
        "example": """{
    "Effect": "Deny",
    "Principal": "*",
    "Action": "s3:*",
    "Resource": [
        "arn:aws:s3:::my-bucket",
        "arn:aws:s3:::my-bucket/*"
    ]
}""",
        "references": [
            "Amazon S3 Security Best Practices"
        ]
    },

    {
        "rule_id": "S3-014",
        "filename": "not_principal.md",
        "title": "NotPrincipal Usage",
        "description": "The bucket policy uses the NotPrincipal element.",
        "danger": "NotPrincipal policies are more difficult to understand and can unintentionally grant or deny access.",
        "impact": "Policy misconfiguration may expose resources or block legitimate users.",
        "recommendation": "Prefer explicit Principal definitions whenever possible.",
        "example": """{
    "Effect": "Deny",
    "NotPrincipal": {
        "AWS": "arn:aws:iam::123456789012:role/ApplicationRole"
    },
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::my-bucket/*"
}""",
        "references": [
            "AWS IAM Policy Elements Reference"
        ]
    },

    {
        "rule_id": "S3-015",
        "filename": "invalid_resource_arn.md",
        "title": "Invalid S3 Resource ARN",
        "description": "The bucket policy references an invalid or malformed S3 ARN.",
        "danger": "Invalid resource ARNs may cause permissions to be applied incorrectly or not at all.",
        "impact": "Applications may fail to access S3 resources or policies may not behave as expected.",
        "recommendation": "Use valid S3 bucket and object ARN formats when defining resources.",
        "example": """{
    "Effect": "Allow",
    "Principal": {
        "AWS": "arn:aws:iam::123456789012:role/ApplicationRole"
    },
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::my-bucket/*"
}""",
        "references": [
            "Amazon S3 ARN Format",
            "AWS IAM Policy Reference"
        ]
    }
]