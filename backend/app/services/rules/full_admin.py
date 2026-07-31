from app.core.constants import CRITICAL
from app.core.rule_ids import S3_FULL_ADMIN

from app.services.finding_factory import create_finding

from app.services.utils.policy_utils import (
    get_actions,
    get_resources,
    get_statements,
    is_allow
)


def check_full_admin(policy):

    findings = []

    for statement in get_statements(policy):

        actions = get_actions(statement)
        resources = get_resources(statement)

        if (
            is_allow(statement)
            and "*" in actions
            and "*" in resources
        ):

            findings.append(
                create_finding(
                    S3_FULL_ADMIN,
                    CRITICAL,
                    "Full Administrative Access",
                    "Policy grants unrestricted administrative access."
                )
            )

    return findings