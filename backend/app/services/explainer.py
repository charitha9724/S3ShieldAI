def generate_summary(findings, risk_score, risk_level):

    if not findings:
        return (
            f"No security issues were detected. "
            f"Overall Risk Score: {risk_score}/100 "
            f"({risk_level} Risk)."
        )

    summary = (
        f"The uploaded S3 bucket policy has "
        f"{len(findings)} security finding(s). "
        f"The overall risk score is {risk_score}/100 "
        f"which corresponds to a {risk_level} risk level.\n\n"
    )

    summary += "Detected Issues:\n"

    for finding in findings:
        summary += (
            f"- {finding.title} "
            f"({finding.severity})\n"
        )

    return summary