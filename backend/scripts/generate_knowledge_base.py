from pathlib import Path
from app.data.knowledge_base_data import RULES

OUTPUT_DIR = Path("../knowledge_base")

OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

TEMPLATE = """# Rule ID
{rule_id}

# Title
{title}

# Description
{description}

# Why It Is Dangerous
{danger}

# Real-World Impact
{impact}

# AWS Recommendation
{recommendation}

# Example Secure Policy

{example}

# References

{references}
"""

for rule in RULES:

    content = TEMPLATE.format(
        rule_id=rule["rule_id"],
        title=rule["title"],
        description=rule["description"],
        danger=rule["danger"],
        impact=rule["impact"],
        recommendation=rule["recommendation"],
        example=rule["example"],
        references="\n".join(rule["references"])
    )

    output_file = OUTPUT_DIR / rule["filename"]

    with open(output_file, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"Generated: {output_file.name}")

print("\nKnowledge base generated successfully!")