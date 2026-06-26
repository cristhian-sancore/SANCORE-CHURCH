from sqlalchemy import Column, Integer, String, Float, ForeignKey, Date
from app.models.base import TimestampBase, TenantBase

class Cell(TimestampBase, TenantBase):
    __tablename__ = "cells"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    address = Column(String, nullable=True)
    day_of_week = Column(String, nullable=True) # Ex: "Sexta-feira"
    time = Column(String, nullable=True) # Ex: "19:30"
    
    leader_id = Column(Integer, ForeignKey("users.id"), nullable=True)

class CellMeeting(TimestampBase, TenantBase):
    __tablename__ = "cell_meetings"
    
    id = Column(Integer, primary_key=True, index=True)
    cell_id = Column(Integer, ForeignKey("cells.id"), nullable=False)
    date = Column(Date, nullable=False)
    
    # O líder não precisa fazer a lista completa, apenas registra quantos visitantes e as ofertas
    visitors_count = Column(Integer, default=0)
    visitor_names = Column(String, nullable=True) # Pode ser salvo como JSON ou texto separado por vírgula
    
    # Ofertas recolhidas na célula (para gerar o PIX)
    offering_amount = Column(Float, default=0.0)
    
    # Se a oferta já foi transferida/confirmada no financeiro da igreja
    is_offering_confirmed = Column(Integer, default=False)
