from app.services.retriever import KnowledgeRetriever

retriever = KnowledgeRetriever()

context = retriever.build_context("Public Read Access")

print(context)