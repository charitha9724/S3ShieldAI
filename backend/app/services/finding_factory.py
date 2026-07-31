from app.models.finding import Finding


def create_finding(
    rule_id: str,
    severity: str,
    title: str,
    description: str
) -> Finding:

    return Finding(
        rule_id=rule_id,
        severity=severity,
        title=title,
        description=description
    )