from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Sancoré Church SaaS"
    DATABASE_URL: str = "postgresql://sancore_admin:sancore_password123@localhost:5432/sancore_saas"
    SECRET_KEY: str = "SUPER_SECRET_KEY_REPLACE_IN_PRODUCTION"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7 # 1 semana

    class Config:
        env_file = ".env"

settings = Settings()
