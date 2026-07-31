from app.core.constants import HIGH
from app.core.rule_ids import S3_SENSITIVE_ACTIONS

from app.services.finding_factory import create_finding

from app.services.utils.policy_utils import (
    get_actions,
    get_statements,
    is_allow
)

SENSITIVE_ACTIONS = {
    "s3:DeleteBucket",
    "s3:DeleteObject",
    "s3:PutBucketPolicy",
    "s3:DeleteBucketPolicy",
    "s3:PutBucketAcl",
}


def check_sensitive_actions(policy):

    findings = []

    for statement in get_statements(policy):

        if not is_allow(statement):
            continue

        actions = get_actions(statement)

        matched_actions = [
            action for action in actions if action in SENSITIVE_ACTIONS
        ]

        if matched_actions:

            findings.append(
                create_finding(
                    S3_SENSITIVE_ACTIONS,
                    HIGH,
                    "Sensitive S3 Actions",
                    f"Policy grants sensitive actions: {', '.join(matched_actions)}."
                )
            )

    return findings