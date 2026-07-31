from app.models.remediation import Remediation

def get_statements(policy: dict) -> list:
    """
    Always return the policy statements as a list.
    """

    statements = policy.get("Statement", [])

    if isinstance(statements, dict):
        return [statements]

    return statements
def normalize_actions(statement: dict) -> list:
    """
    Always return the Action field as a list.
    """

    actions = statement.get("Action", [])

    if isinstance(actions, str):
        return [actions]

    return actions

def remove_public_actions(
    secure_policy: dict,
    remediations: list[Remediation],
    actions_to_remove: set[str],
    rule_id: str,
    title: str,
    description: str,
    restricted_title: str,
    restricted_description: str,
):
    """
    Remove specified actions from anonymous public access statements.
    """

    statements = get_statements(secure_policy)
    updated_statements = []

    for statement in statements:

        if (
            statement.get("Effect") == "Allow"
            and statement.get("Principal") == "*"
        ):

            actions = normalize_actions(statement)

            filtered_actions = [
                action
                for action in actions
                if action not in actions_to_remove
            ]

            if not filtered_actions:

                remediations.append(
                    Remediation(
                        rule_id=rule_id,
                        title=title,
                        description=description,
                    )
                )

                continue

            if filtered_actions != actions:

                statement["Action"] = filtered_actions

                remediations.append(
                    Remediation(
                        rule_id=rule_id,
                        title=restricted_title,
                        description=restricted_description,
                    )
                )

        updated_statements.append(statement)

    secure_policy["Statement"] = updated_statements