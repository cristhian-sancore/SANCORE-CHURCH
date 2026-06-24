from sqlalchemy import Column, Integer, String, Boolean
from app.models.base import TimestampBase

class Tenant(TimestampBase):
    __tablename__ = "tenants"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True) # Nome da Igreja
    subdomain = Column(String, unique=True, index=True) # Ex: ibnsede
    is_active = Column(Boolean, default=True)
    plan = Column(String, default="free") # free, pro, premium
    
    # Cloudflare / Mercado Pago references
    mp_subscription_id = Column(String, nullable=True)
