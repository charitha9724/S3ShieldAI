from app.core.constants import MEDIUM
from app.core.rule_ids import S3_BUCKET_ACL_ACTIONS

from app.services.finding_factory import create_finding

from app.services.utils.policy_utils import (
    get_actions,
    get_statements,
    is_allow
)

ACL_ACTIONS = {
    "s3:PutBucketAcl",
    "s3:PutObjectAcl",
}


def check_bucket_acl_actions(policy):

    findings = []

    for statement in get_statements(policy):

        if not is_allow(statement):
            continue

        actions = get_actions(statement)

        matched = [
            action for action in actions
            if action in ACL_ACTIONS
        ]

        if matched:

            findings.append(
                create_finding(
                    S3_BUCKET_ACL_ACTIONS,
                    MEDIUM,
                    "Bucket ACL Actions Detected",
                    f"Policy grants ACL-related permissions: {', '.join(matched)}."
                )
            )

    return findings