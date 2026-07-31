from pathlib import Path
import pickle

import faiss
from sentence_transformers import SentenceTransformer

# -------------------------------
# Paths
# -------------------------------

BASE_DIR = Path(__file__).resolve().parent.parent

KNOWLEDGE_BASE_DIR = BASE_DIR / "knowledge_base"
VECTOR_DB_DIR = BASE_DIR / "vector_db"

VECTOR_DB_DIR.mkdir(exist_ok=True)

print("Knowledge Base Path:", KNOWLEDGE_BASE_DIR)
print("Exists:", KNOWLEDGE_BASE_DIR.exists())

# -------------------------------
# Load model
# -------------------------------

model = SentenceTransformer("all-MiniLM-L6-v2")

# -------------------------------
# Read documents
# -------------------------------

documents = []

for file in sorted(KNOWLEDGE_BASE_DIR.glob("*.md")):

    print("Found:", file.name)

    documents.append(
        {
            "filename": file.name,
            "content": file.read_text(encoding="utf-8")
        }
    )

print(f"\nLoaded {len(documents)} documents.")

if not documents:
    raise RuntimeError("No markdown files found.")

# -------------------------------
# Generate embeddings
# -------------------------------

embeddings = model.encode(
    [doc["content"] for doc in documents],
    convert_to_numpy=True
)

print(f"Generated {len(embeddings)} embeddings.")
print("Embedding Dimension:", embeddings.shape[1])

# -------------------------------
# Build FAISS index
# -------------------------------

dimension = embeddings.shape[1]

index = faiss.IndexFlatL2(dimension)

index.add(embeddings)

print(f"Indexed {index.ntotal} vectors.")

# -------------------------------
# Save index
# -------------------------------

faiss.write_index(
    index,
    str(VECTOR_DB_DIR / "knowledge.index")
)

# -------------------------------
# Save metadata
# -------------------------------

with open(VECTOR_DB_DIR / "metadata.pkl", "wb") as f:
    pickle.dump(documents, f)

print("\nVector database created successfully.")