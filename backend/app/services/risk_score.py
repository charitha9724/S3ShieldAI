SEVERITY_PENALTIES = {
    "Critical": 25,
    "High": 15,
    "Medium": 8,
    "Low": 3,
}


def calculate_risk(findings):

    security_score = 100

    for finding in findings:
        security_score -= SEVERITY_PENALTIES.get(
            finding.severity,
            0
        )

    security_score = max(security_score, 0)

    if security_score >= 90:
        risk_level = "Low"

    elif security_score >= 70:
        risk_level = "Medium"

    elif security_score >= 40:
        risk_level = "High"

    else:
        risk_level = "Critical"

    return {
        # Keep these response keys unchanged so the frontend
        # doesn't break.
        "risk_score": security_score,
        "risk_level": risk_level,
    }