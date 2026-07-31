from app.core.constants import CRITICAL
from app.core.rule_ids import S3_PUBLIC_WRITE

from app.services.finding_factory import create_finding

from app.services.utils.policy_utils import (
    get_actions,
    get_statements,
    is_allow,
    is_public_principal
)


def check_public_write(policy):

    findings = []

    for statement in get_statements(policy):

        actions = get_actions(statement)

        if (
            is_allow(statement)
            and is_public_principal(statement)
            and "s3:PutObject" in actions
        ):

            findings.append(
                create_finding(
                    S3_PUBLIC_WRITE,
                    CRITICAL,
                    "Public Write Access",
                    "Bucket allows anyone to upload or overwrite objects."
                )
            )

    return findings