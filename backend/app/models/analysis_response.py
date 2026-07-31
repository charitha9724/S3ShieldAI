from pydantic import BaseModel

from app.models.finding import Finding
from app.models.remediation import Remediation

class AnalysisResponse(BaseModel):
    message: str
    policy: dict
    secure_policy: dict
    risk_score: int
    risk_level: str
    summary: str
    findings: list[Finding]
    remediations: list[Remediation]