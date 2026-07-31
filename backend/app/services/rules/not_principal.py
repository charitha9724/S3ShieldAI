from app.core.constants import MEDIUM
from app.core.rule_ids import S3_NOT_PRINCIPAL

from app.services.finding_factory import create_finding
from app.services.utils.policy_utils import get_statements


def check_not_principal(policy):

    findings = []

    for statement in get_statements(policy):

        if "NotPrincipal" in statement:

            findings.append(
                create_finding(
                    S3_NOT_PRINCIPAL,
                    MEDIUM,
                    "NotPrincipal Usage",
                    "Policy uses NotPrincipal, which can make access control difficult to reason about."
                )
            )

            break

    return findings