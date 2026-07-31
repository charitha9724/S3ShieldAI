from pydantic import BaseModel


class Knowledge(BaseModel):
    rule_id: str
    title: str
    description: str
    why_it_is_dangerous: str
    real_world_impact: str
    aws_recommendation: str
    example_secure_policy: str
    references: list[str]