from pprint import pprint

from app.services.knowledge_service import KnowledgeService


service = KnowledgeService()

knowledge = service.get_by_rule("S3-009")

if knowledge:
    pprint(knowledge)
else:
    print("Rule not found.")