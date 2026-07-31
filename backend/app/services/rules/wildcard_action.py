from app.core.constants import HIGH
from app.core.rule_ids import S3_WILDCARD_ACTION

from app.services.finding_factory import create_finding

from app.services.utils.policy_utils import (
    get_actions,
    get_statements,
    is_allow
)


def check_wildcard_action(policy):

    findings = []

    for statement in get_statements(policy):

        actions = get_actions(statement)

        if (
            is_allow(statement)
            and "s3:*" in actions
        ):
            findings.append(
                create_finding(
                    S3_WILDCARD_ACTION,
                    HIGH,
                    "Wildcard Action",
                    "Policy grants all S3 actions."
                )
            )

    return findings