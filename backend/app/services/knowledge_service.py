from pathlib import Path
import pickle
import re
from app.models.knowledge import Knowledge

BASE_DIR = Path(__file__).resolve().parent.parent.parent

VECTOR_DB_DIR = BASE_DIR / "vector_db"
METADATA_PATH = VECTOR_DB_DIR / "metadata.pkl"


class KnowledgeService:

    def __init__(self):

        with open(METADATA_PATH, "rb") as f:
            documents = pickle.load(f)

        self.rule_map = {}

        for document in documents:

            content = document["content"]

            match = re.search(r"# Rule ID\s+([A-Z0-9-]+)", content)

            if match:
                rule_id = match.group(1)
                self.rule_map[rule_id] = document

    def _extract_section(self, content: str, heading: str) -> str:
        """
        Extracts the text under a markdown heading until the next heading.
        """
        pattern = rf"# {re.escape(heading)}\n(.*?)(?=\n# |\Z)"
        match = re.search(pattern, content, re.DOTALL)

        if match:
            return match.group(1).strip()

        return ""

    def _parse_document(self, content: str):

        references = self._extract_section(content, "References")

        return Knowledge(
            rule_id=self._extract_section(content, "Rule ID"),
            title=self._extract_section(content, "Title"),
            description=self._extract_section(content, "Description"),
            why_it_is_dangerous=self._extract_section(content, "Why It Is Dangerous"),
            real_world_impact=self._extract_section(content, "Real-World Impact"),
            aws_recommendation=self._extract_section(content, "AWS Recommendation"),
            example_secure_policy=self._extract_section(content, "Example Secure Policy"),
            references=[
                line.strip()
                for line in references.splitlines()
                if line.strip()
            ],
        )

    def get_by_rule(self, rule_id: str):

        document = self.rule_map.get(rule_id)

        if not document:
            return None

        return self._parse_document(document["content"])