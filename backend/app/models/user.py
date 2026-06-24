from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from app.models.base import TimestampBase

class User(TimestampBase):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    
    # 0 = Super Admin, 1 = Pastor, 2 = Tesoureiro, 3 = Líder, 4 = Membro
    access_level = Column(Integer, default=4)
    
    is_active = Column(Boolean, default=True)
    
    # Relação com a igreja (SaaS). Super Admins podem ter church_id = None ou 0
    church_id = Column(Integer, index=True, nullable=True)
