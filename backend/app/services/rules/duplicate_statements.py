import json

from app.core.constants import LOW
from app.core.rule_ids import S3_DUPLICATE_STATEMENTS

from app.services.finding_factory import create_finding
from app.services.utils.policy_utils import get_statements


def check_duplicate_statements(policy):

    findings = []

    seen = set()

    for statement in get_statements(policy):

        normalized = json.dumps(statement, sort_keys=True)

        if normalized in seen:

            findings.append(
                create_finding(
                    S3_DUPLICATE_STATEMENTS,
                    LOW,
                    "Duplicate Statement",
                    "Policy contains duplicate statements."
                )
            )

            break

        seen.add(normalized)

    return findings