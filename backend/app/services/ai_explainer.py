from groq import Groq

from app.core.config import GROQ_API_KEY
from app.services.retriever import KnowledgeRetriever

client = Groq(api_key=GROQ_API_KEY)

retriever = KnowledgeRetriever()


def generate_ai_summary(findings, risk_score, risk_level):

    if not findings:
        return (
            f"No security issues were detected. "
            f"Overall Security Score: {risk_score}/100 "
            f"({risk_level} Risk)."
        )
    critical_count = sum(1 for f in findings if f.severity == "Critical")
    high_count = sum(1 for f in findings if f.severity == "High")
    medium_count = sum(1 for f in findings if f.severity == "Medium")
    low_count = sum(1 for f in findings if f.severity == "Low")

    findings_text = ""

    for finding in findings:
        findings_text += f"""
Rule ID: {finding.rule_id}
Severity: {finding.severity}
Title: {finding.title}
Description: {finding.description}

"""

    # Retrieve relevant knowledge
    knowledge_context = retriever.build_context(
        findings_text,
        top_k=3
    )

    prompt = f"""
You are a Senior AWS Cloud Security Engineer.

You are analyzing an Amazon S3 Bucket Policy.

===========================
Retrieved Security Knowledge
===========================

{knowledge_context}

===========================
Detected Findings
===========================

Security Score: {risk_score}/100
Risk Level: {risk_level}

Severity Summary:
- Critical: {critical_count}
- High: {high_count}
- Medium: {medium_count}
- Low: {low_count}

{findings_text}

===========================
Instructions
===========================

Use the retrieved security knowledge as the primary reference.

Do not invent AWS recommendations.

Do not discuss findings that are not provided.
Use the Severity Summary exactly as provided. Do not change the number of findings in each severity category. Never describe High or Medium findings as Critical findings.

Generate a professional report with exactly these sections:

1. Overall Security Assessment

2. Critical Findings

3. Security Impact

4. Recommendations

Write between 200 and 300 words.
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        temperature=0.2,
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content