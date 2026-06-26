from sqlalchemy import Column, Integer, String, Boolean, Date
from app.models.base import TimestampBase, TenantBase

class Member(TimestampBase, TenantBase):
    __tablename__ = "members"
    
    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, index=True, nullable=False)
    email = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    birth_date = Column(Date, nullable=True)
    is_active = Column(Boolean, default=True)
    
    # Endereço
    zip_code = Column(String, nullable=True)
    street = Column(String, nullable=True)
    city = Column(String, nullable=True)
    state = Column(String, nullable=True)
    
    # Status na igreja
    role = Column(String, default="member") # member, visitor, leader, pastor
    
    # Chave estrangeira implícita pela lógica do TenantBase (church_id)
