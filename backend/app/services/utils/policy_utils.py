def get_statements(policy):
    """
    Always returns a list of statements.
    """
    return policy.get("Statement", [])


def get_actions(statement):
    """
    Returns Action as a list.
    """
    actions = statement.get("Action", [])

    if isinstance(actions, str):
        actions = [actions]

    return actions


def get_resources(statement):
    """
    Returns Resource as a list.
    """
    resources = statement.get("Resource", [])

    if isinstance(resources, str):
        resources = [resources]

    return resources


def get_principal(statement):
    """
    Returns the Principal field.
    """
    return statement.get("Principal")


def get_effect(statement):
    """
    Returns Allow or Deny.
    """
    return statement.get("Effect")


def get_condition(statement):
    """
    Returns the Condition block.
    """
    return statement.get("Condition")


def is_allow(statement):
    return get_effect(statement) == "Allow"


def is_deny(statement):
    return get_effect(statement) == "Deny"


def is_public_principal(statement):
    """
    Detect wildcard principals.

    Handles:
    Principal: "*"
    Principal:
        AWS: "*"
    """

    principal = get_principal(statement)

    if principal == "*":
        return True

    if isinstance(principal, dict):
        return "*" in principal.values()

    return False