from pydantic import BaseModel

from app.models.knowledge import Knowledge


class Finding(BaseModel):
    rule_id: str
    severity: str
    title: str
    description: str
    knowledge: Knowledge | None = None
    remediation_status: str = "Not Remediated"