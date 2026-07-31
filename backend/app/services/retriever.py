from pathlib import Path
import pickle

import faiss
from sentence_transformers import SentenceTransformer


BASE_DIR = Path(__file__).resolve().parent.parent.parent

VECTOR_DB_DIR = BASE_DIR / "vector_db"

INDEX_PATH = VECTOR_DB_DIR / "knowledge.index"
METADATA_PATH = VECTOR_DB_DIR / "metadata.pkl"


class KnowledgeRetriever:

    def __init__(self):

        self.model = SentenceTransformer("all-MiniLM-L6-v2")

        self.index = faiss.read_index(str(INDEX_PATH))

        with open(METADATA_PATH, "rb") as f:
            self.documents = pickle.load(f)

    def search(self, query: str, top_k: int = 3):

        embedding = self.model.encode(
            [query],
            convert_to_numpy=True
        )

        distances, indices = self.index.search(
            embedding,
            top_k
        )

        results = []

        for idx in indices[0]:

            if idx == -1:
                continue

            results.append(self.documents[idx])

        return results

    def build_context(self, query: str, top_k: int = 3):

        documents = self.search(query, top_k)

        context = ""

        for doc in documents:

            context += f"""

Document: {doc['filename']}

{doc['content']}

----------------------------------------
"""

        return context