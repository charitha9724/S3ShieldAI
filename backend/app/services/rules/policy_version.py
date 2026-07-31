from app.core.constants import LOW
from app.core.rule_ids import S3_UNSUPPORTED_POLICY_VERSION

from app.services.finding_factory import create_finding


def check_policy_version(policy):

    version = policy.get("Version")

    if version == "2012-10-17":
        return []

    return [
        create_finding(
            S3_UNSUPPORTED_POLICY_VERSION,
            LOW,
            "Unsupported Policy Version",
            f"Policy uses '{version}' instead of the recommended '2012-10-17'."
        )
    ]