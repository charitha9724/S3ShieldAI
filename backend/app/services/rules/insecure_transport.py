from app.core.constants import HIGH
from app.core.rule_ids import S3_INSECURE_TRANSPORT

from app.services.finding_factory import create_finding

from app.services.utils.policy_utils import (
    get_condition,
    get_statements,
    is_deny
)


def check_insecure_transport(policy):

    """
    Reports a finding if the policy does NOT enforce HTTPS
    using aws:SecureTransport.
    """

    secure_transport_enforced = False

    for statement in get_statements(policy):

        if not is_deny(statement):
            continue

        condition = get_condition(statement)

        if not isinstance(condition, dict):
            continue

        bool_condition = condition.get("Bool", {})

        if bool_condition.get("aws:SecureTransport") == "false":
            secure_transport_enforced = True
            break

    if secure_transport_enforced:
        return []

    return [
        create_finding(
            S3_INSECURE_TRANSPORT,
            HIGH,
            "HTTPS Not Enforced",
            "Bucket policy does not explicitly deny insecure (HTTP) requests."
        )
    ]