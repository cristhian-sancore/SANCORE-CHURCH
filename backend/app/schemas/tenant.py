from pydantic import BaseModel, EmailStr
from typing import Optional

class TenantBase(BaseModel):
    name: str
    subdomain: str
    plan: str = "free"

class TenantCreate(TenantBase):
    admin_email: EmailStr
    admin_name: str
    admin_password: str

class TenantResponse(TenantBase):
    id: int
    is_active: bool
    mp_subscription_id: Optional[str] = None
    checkout_url: Optional[str] = None

    class Config:
        from_attributes = True
