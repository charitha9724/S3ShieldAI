from app.core.constants import HIGH
from app.core.rule_ids import S3_WILDCARD_RESOURCE

from app.services.finding_factory import create_finding

from app.services.utils.policy_utils import (
    get_resources,
    get_statements,
    is_allow
)


def check_wildcard_resource(policy):

    findings = []

    for statement in get_statements(policy):

        resources = get_resources(statement)

        if (
            is_allow(statement)
            and "*" in resources
        ):
            findings.append(
                create_finding(
                    S3_WILDCARD_RESOURCE,
                    HIGH,
                    "Wildcard Resource",
                    "Policy grants access to every resource."
                )
            )

    return findings