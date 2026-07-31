from app.services.remediation import remediate_policy
from app.models.finding import Finding


def test_fix_public_read():

    policy = {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "PublicRead",
                "Effect": "Allow",
                "Principal": "*",
                "Action": "s3:GetObject",
                "Resource": "arn:aws:s3:::my-bucket/*"
            }
        ]
    }

    findings = [
        Finding(
            rule_id="S3-001",
            severity="High",
            title="Public Read Access",
            description="Bucket allows public read access."
        )
    ]

    secure_policy, remediations = remediate_policy(policy, findings)

    secure_policy, remediations = remediate_policy(policy, findings)

    assert secure_policy["Statement"] == []
    assert len(remediations) == 1
    assert remediations[0].rule_id == "S3-001"

def test_fix_public_write():

    policy = {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "PublicRead",
                "Effect": "Allow",
                "Principal": "*",
                "Action": "s3:PutObject",
                "Resource": "arn:aws:s3:::my-bucket/*"
            }
        ]
    }

    findings = [
        Finding(
            rule_id="S3-002",
            severity="High",
            title="Public Read Access",
            description="Bucket allows public read access."
        )
    ]

    secure_policy, remediations = remediate_policy(policy, findings)

    secure_policy, remediations = remediate_policy(policy, findings)

    assert secure_policy["Statement"] == []
    assert len(remediations) == 1
    assert remediations[0].rule_id == "S3-002"