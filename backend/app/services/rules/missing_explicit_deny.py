from app.core.constants import LOW
from app.core.rule_ids import S3_MISSING_EXPLICIT_DENY

from app.services.finding_factory import create_finding
from app.services.utils.policy_utils import (
    get_statements,
    is_deny
)


def check_missing_explicit_deny(policy):

    for statement in get_statements(policy):
        if is_deny(statement):
            return []

    return [
        create_finding(
            S3_MISSING_EXPLICIT_DENY,
            LOW,
            "Missing Explicit Deny",
            "Policy does not contain any explicit Deny statements."
        )
    ]