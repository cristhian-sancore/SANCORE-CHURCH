from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, DateTime
from datetime import datetime

Base = declarative_base()

class TenantBase(Base):
    __abstract__ = True
    
    # Todos os models que herdam de TenantBase terão a coluna church_id
    # Isso garante o isolamento lógico das tabelas
    church_id = Column(Integer, index=True, nullable=False)
    
class TimestampBase(Base):
    __abstract__ = True
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
