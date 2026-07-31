from app.core.constants import MEDIUM
from app.core.rule_ids import S3_ROOT_ACCOUNT_ACCESS

from app.services.finding_factory import create_finding

from app.services.utils.policy_utils import (
    get_principal,
    get_statements,
    is_allow
)


def check_root_account_access(policy):

    findings = []

    for statement in get_statements(policy):

        if not is_allow(statement):
            continue

        principal = get_principal(statement)

        principals = []

        if isinstance(principal, str):
            principals = [principal]

        elif isinstance(principal, dict):
            for value in principal.values():
                if isinstance(value, list):
                    principals.extend(value)
                else:
                    principals.append(value)

        for p in principals:
            if isinstance(p, str) and p.endswith(":root"):
                findings.append(
                    create_finding(
                        S3_ROOT_ACCOUNT_ACCESS,
                        MEDIUM,
                        "Root Account Access",
                        f"Policy grants access to AWS root account: {p}"
                    )
                )
                break

    return findings