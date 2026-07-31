from copy import deepcopy
from app.models.remediation import Remediation
from app.services.constants import (
    PUBLIC_READ_ACTIONS,
    PUBLIC_WRITE_ACTIONS,
)
from app.services.remediation_utils import (
    get_statements,
    remove_public_actions,
)
import json

def remediate_policy(policy: dict, findings: list) -> tuple[dict, list[Remediation]]:
    """
    Generate a remediated version of an S3 bucket policy.
    """

    secure_policy = deepcopy(policy)
    remediations: list[Remediation] = []
    remediation_map = {
        # Rule ID -> Remediation Function
        "S3-001": fix_public_read,
        "S3-002": fix_public_write,
        "S3-003": recommend_wildcard_action,
        "S3-004": recommend_wildcard_principal,
        "S3-005": recommend_full_admin_access,
        "S3-006": recommend_wildcard_resource,
        "S3-007": recommend_sensitive_actions,
        "S3-008": recommend_root_account_access,
        "S3-009": fix_https_not_enforced,
        "S3-010": recommend_bucket_acl_actions,
        "S3-011": fix_unsupported_policy_version,
        "S3-012": fix_duplicate_statements,
        "S3-013": recommend_explicit_deny,
        "S3-014": recommend_not_principal_usage,
        "S3-015": fix_invalid_s3_resource_arn,
    }

    for finding in findings:

        remediation_function = remediation_map.get(finding.rule_id)

        if remediation_function:
            remediation_function(
                secure_policy,
                remediations
            )

    return secure_policy, remediations

def fix_public_read(
    secure_policy: dict,
    remediations: list[Remediation]
):
    """
    Remove anonymous public read access from the bucket policy.
    """

    remove_public_actions(
        secure_policy=secure_policy,
        remediations=remediations,
        actions_to_remove=PUBLIC_READ_ACTIONS,
        rule_id="S3-001",
        title="Removed Public Read Access",
        description="Removed anonymous public read permissions.",
        restricted_title="Restricted Public Read Access",
        restricted_description="Removed public read actions while preserving other allowed actions.",
    )

def fix_public_write(
    secure_policy: dict,
    remediations: list[Remediation]
):
    """
    Remove anonymous public write access from the bucket policy.
    """

    remove_public_actions(
        secure_policy=secure_policy,
        remediations=remediations,
        actions_to_remove=PUBLIC_WRITE_ACTIONS,
        rule_id="S3-002",
        title="Removed Public Write Access",
        description="Removed anonymous public write permissions.",
        restricted_title="Restricted Public Write Access",
        restricted_description="Removed public write actions while preserving other allowed actions.",
    )

def fix_https_not_enforced(
    secure_policy: dict,
    remediations: list[Remediation]
):
    """
    Adds a Deny statement to enforce HTTPS-only access.
    """

    statements = get_statements(secure_policy)

    # Don't add it twice
    for statement in statements:

        if statement.get("Effect") != "Deny":
            continue

        condition = statement.get("Condition", {})
        bool_condition = condition.get("Bool", {})

        if bool_condition.get("aws:SecureTransport") == "false":
            return

    # Collect all bucket resources already present
    resources = set()

    for statement in statements:

        statement_resources = statement.get("Resource", [])

        if isinstance(statement_resources, str):
            statement_resources = [statement_resources]

        for resource in statement_resources:
            resources.add(resource)

    https_statement = {
        "Sid": "EnforceHTTPS",
        "Effect": "Deny",
        "Principal": "*",
        "Action": "s3:*",
        "Resource": sorted(resources),
        "Condition": {
            "Bool": {
                "aws:SecureTransport": "false"
            }
        }
    }

    statements.append(https_statement)

    remediations.append(
        Remediation(
            rule_id="S3-009",
            title="HTTPS Enforced",
            description="Added a Deny statement to block insecure HTTP requests."
        )
    )

def fix_unsupported_policy_version(
    secure_policy: dict,
    remediations: list[Remediation]
):
    """
    Replace unsupported AWS policy versions with the latest supported version.
    """

    if secure_policy.get("Version") == "2012-10-17":
        return

    secure_policy["Version"] = "2012-10-17"

    remediations.append(
        Remediation(
            rule_id="S3-011",
            title="Updated Policy Version",
            description="Updated the policy version to AWS supported version 2012-10-17."
        )
    )

def fix_duplicate_statements(
    secure_policy: dict,
    remediations: list[Remediation]
):
    """
    Remove duplicate statements from the bucket policy.
    """

    statements = get_statements(secure_policy)

    unique_statements = []
    seen = set()

    for statement in statements:

        statement_key = json.dumps(statement, sort_keys=True)

        if statement_key not in seen:
            seen.add(statement_key)
            unique_statements.append(statement)

    if len(unique_statements) == len(statements):
        return

    secure_policy["Statement"] = unique_statements

    remediations.append(
        Remediation(
            rule_id="S3-012",
            title="Removed Duplicate Statements",
            description="Removed duplicate policy statements."
        )
    )

def fix_invalid_s3_resource_arn(
    secure_policy: dict,
    remediations: list[Remediation]
):
    """
    Remove invalid S3 resource ARNs from the policy.
    """

    statements = get_statements(secure_policy)

    valid_statements = []
    removed_any = False

    for statement in statements:

        resources = statement.get("Resource", [])

        if isinstance(resources, str):
            resources = [resources]

        valid_resources = []

        for resource in resources:

            if (
                resource.startswith("arn:aws:s3:::")
                and len(resource) > len("arn:aws:s3:::")
            ):
                valid_resources.append(resource)
            else:
                removed_any = True

        if not valid_resources:
            continue

        new_statement = deepcopy(statement)

        if len(valid_resources) == 1:
            new_statement["Resource"] = valid_resources[0]
        else:
            new_statement["Resource"] = valid_resources

        valid_statements.append(new_statement)

    if not removed_any:
        return

    secure_policy["Statement"] = valid_statements

    remediations.append(
        Remediation(
            rule_id="S3-015",
            title="Removed Invalid Resource ARNs",
            description="Removed invalid S3 resource ARNs from the policy."
        )
    )

def recommend_wildcard_action(
    secure_policy: dict,
    remediations: list[Remediation]
):
    """
    Recommend replacing wildcard actions with least-privilege actions.
    """

    remediations.append(
        Remediation(
            rule_id="S3-003",
            title="Manual Review Required",
            description=(
                "Replace 's3:*' or other wildcard actions with only the "
                "specific S3 actions required by your application."
            )
        )
    )

def recommend_wildcard_principal(
    secure_policy: dict,
    remediations: list[Remediation]
):
    """
    Recommend replacing wildcard principals with specific AWS identities.
    """

    remediations.append(
        Remediation(
            rule_id="S3-004",
            title="Manual Review Required",
            description=(
                "Replace wildcard principals ('*') with specific IAM users, "
                "roles, or AWS accounts that require access."
            )
        )
    )

def recommend_full_admin_access(
    secure_policy: dict,
    remediations: list[Remediation]
):
    """
    Recommend replacing full administrative permissions with least privilege.
    """

    remediations.append(
        Remediation(
            rule_id="S3-005",
            title="Manual Review Required",
            description=(
                "Avoid granting full administrative access. Replace broad "
                "permissions with only the specific S3 actions required by "
                "the application or user."
            )
        )
    )

def recommend_wildcard_resource(
    secure_policy: dict,
    remediations: list[Remediation]
):
    """
    Recommend replacing wildcard resources with specific bucket ARNs.
    """

    remediations.append(
        Remediation(
            rule_id="S3-006",
            title="Manual Review Required",
            description=(
                "Replace wildcard resources with specific S3 bucket or object "
                "ARNs to follow the principle of least privilege."
            )
        )
    )

def recommend_sensitive_actions(
    secure_policy: dict,
    remediations: list[Remediation]
):
    """
    Recommend reviewing sensitive S3 actions.
    """

    remediations.append(
        Remediation(
            rule_id="S3-007",
            title="Manual Review Required",
            description=(
                "Review sensitive S3 actions such as DeleteBucket, "
                "DeleteObject, PutBucketPolicy, PutBucketAcl, and "
                "PutBucketPublicAccessBlock. Grant them only when "
                "absolutely necessary."
            )
        )
    )

def recommend_root_account_access(
    secure_policy: dict,
    remediations: list[Remediation]
):
    """
    Recommend replacing root account access with IAM roles or users.
    """

    remediations.append(
        Remediation(
            rule_id="S3-008",
            title="Manual Review Required",
            description=(
                "Avoid granting permissions directly to the AWS account root user. "
                "Prefer IAM roles or IAM users with the minimum required permissions."
            )
        )
    )

def recommend_bucket_acl_actions(
    secure_policy: dict,
    remediations: list[Remediation]
):
    """
    Recommend reviewing bucket and object ACL permissions.
    """

    remediations.append(
        Remediation(
            rule_id="S3-010",
            title="Manual Review Required",
            description=(
                "Review bucket and object ACL permissions. "
                "Grant ACL-related actions only when required and "
                "prefer IAM policies or S3 Bucket Policies instead of ACLs "
                "whenever possible."
            )
        )
    )

def recommend_explicit_deny(
    secure_policy: dict,
    remediations: list[Remediation]
):
    """
    Recommend adding explicit Deny statements where appropriate.
    """

    remediations.append(
        Remediation(
            rule_id="S3-013",
            title="Manual Review Required",
            description=(
                "Consider adding explicit Deny statements for critical "
                "security requirements such as enforcing HTTPS, restricting "
                "public access, or limiting access to specific principals."
            )
        )
    )

def recommend_not_principal_usage(
    secure_policy: dict,
    remediations: list[Remediation]
):
    """
    Recommend reviewing the use of NotPrincipal.
    """

    remediations.append(
        Remediation(
            rule_id="S3-014",
            title="Manual Review Required",
            description=(
                "Review the use of NotPrincipal carefully. "
                "Ensure it correctly implements the intended access control "
                "logic and does not unintentionally grant or deny access."
            )
        )
    )