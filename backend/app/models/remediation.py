from pydantic import BaseModel


class Remediation(BaseModel):
    rule_id: str
    title: str
    description: str