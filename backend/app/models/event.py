from sqlalchemy import Column, Integer, String, DateTime
from app.models.base import TimestampBase, TenantBase

class Event(TimestampBase, TenantBase):
    __tablename__ = "events"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    start_time = Column(DateTime, nullable=False)
    end_time = Column(DateTime, nullable=True)
    
    # Controle do Banner gerado automaticamente
    banner_url = Column(String, nullable=True) 
    
    # Se for um evento Ao Vivo
    is_live = Column(Integer, default=False)
    youtube_live_url = Column(String, nullable=True)
