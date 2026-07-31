from app.core.constants import MEDIUM
from app.core.rule_ids import S3_INVALID_RESOURCE_ARN

from app.services.finding_factory import create_finding
from app.services.utils.policy_utils import (
    get_resources,
    get_statements
)


def check_invalid_resource_arn(policy):

    findings = []

    for statement in get_statements(policy):

        resources = get_resources(statement)

        for resource in resources:

            if resource == "*":
                continue

            if not isinstance(resource, str):
                continue

            if not resource.startswith("arn:aws:s3:::"):

                findings.append(
                    create_finding(
                        S3_INVALID_RESOURCE_ARN,
                        MEDIUM,
                        "Invalid S3 Resource ARN",
                        f"Invalid S3 resource ARN: {resource}"
                    )
                )

                return findings

    return findings