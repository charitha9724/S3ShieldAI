from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.health import router as health_router
from app.api.routes.upload import router as upload_router

app = FastAPI(
    title="S3ShieldAI",
    description="AI-powered AWS S3 Bucket Policy Security Checker",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(upload_router)


@app.get("/")
def home():
    return {
        "message": "Welcome to S3ShieldAI 🚀"
    }