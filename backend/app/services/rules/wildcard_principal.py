from app.core.constants import HIGH
from app.core.rule_ids import S3_WILDCARD_PRINCIPAL

from app.services.finding_factory import create_finding

from app.services.utils.policy_utils import (
    get_statements,
    is_public_principal,
    is_allow
)


def check_wildcard_principal(policy):

    findings = []

    for statement in get_statements(policy):

        if (
            is_allow(statement)
            and is_public_principal(statement)
        ):
            findings.append(
                create_finding(
                    S3_WILDCARD_PRINCIPAL,
                    HIGH,
                    "Wildcard Principal",
                    "Policy grants access to everyone."
                )
            )

    return findings