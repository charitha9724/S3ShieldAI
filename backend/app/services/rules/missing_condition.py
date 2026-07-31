from app.core.constants import MEDIUM
from app.core.rule_ids import S3_MISSING_CONDITION

from app.services.finding_factory import create_finding

from app.services.utils.policy_utils import (
    get_condition,
    get_statements,
    is_allow
)


def check_missing_condition(policy):

    findings = []

    for statement in get_statements(policy):

        if not is_allow(statement):
            continue

        if get_condition(statement):
            continue

        findings.append(
            create_finding(
                S3_MISSING_CONDITION,
                MEDIUM,
                "Missing Condition",
                "Allow statement does not contain a Condition block."
            )
        )

    return findings