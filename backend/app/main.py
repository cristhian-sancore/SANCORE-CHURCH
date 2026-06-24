from fastapi import FastAPI
from app.core.config import settings
from app.core.database import engine, Base
from app.models import tenant, user # Carregar os models
from app.routers import auth

# Cria as tabelas iniciais
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="SaaS Multi-tenant para Gestão de Igrejas",
    version="2.0.0"
)

app.include_router(auth.router)

@app.get("/")
def read_root():
    return {"message": "Sancoré Church V2 - Backend Ativo"}
