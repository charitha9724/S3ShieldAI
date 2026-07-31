from app.services.rules.public_read import check_public_read
from app.services.rules.public_write import check_public_write
from app.services.rules.wildcard_action import check_wildcard_action
from app.services.rules.wildcard_principal import check_wildcard_principal
from app.services.rules.full_admin import check_full_admin
from app.services.rules.wildcard_resource import check_wildcard_resource
from app.services.rules.sensitive_actions import check_sensitive_actions
from app.services.rules.root_account_access import check_root_account_access
from app.services.rules.insecure_transport import check_insecure_transport
from app.services.rules.bucket_acl_actions import check_bucket_acl_actions
from app.services.rules.policy_version import check_policy_version
from app.services.rules.duplicate_statements import check_duplicate_statements
from app.services.rules.missing_explicit_deny import check_missing_explicit_deny
from app.services.rules.not_principal import check_not_principal
from app.services.rules.invalid_resource_arn import check_invalid_resource_arn


RULES = [
    check_public_read,
    check_public_write,
    check_wildcard_action,
    check_wildcard_principal,
    check_full_admin,
    check_wildcard_resource,
    check_sensitive_actions,
    check_root_account_access,
    check_insecure_transport,
    check_bucket_acl_actions,
    check_policy_version,
    check_duplicate_statements,
    check_missing_explicit_deny,
    check_not_principal,
    check_invalid_resource_arn
]


def analyze_policy(policy):

    findings = []

    for rule in RULES:
        findings.extend(rule(policy))

    return findings