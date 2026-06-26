from sqlalchemy import Column, Integer, String, Float, ForeignKey, Date
from app.models.base import TimestampBase, TenantBase

class BankAccount(TimestampBase, TenantBase):
    __tablename__ = "bank_accounts"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False) # Ex: Conta Nubank, Caixa Físico
    balance = Column(Float, default=0.0)

class Transaction(TimestampBase, TenantBase):
    __tablename__ = "transactions"
    
    id = Column(Integer, primary_key=True, index=True)
    account_id = Column(Integer, ForeignKey("bank_accounts.id"), nullable=False)
    
    type = Column(String, nullable=False) # IN (Entrada) ou OUT (Saída)
    category = Column(String, nullable=False) # Dízimo, Oferta, Aluguel, etc.
    amount = Column(Float, nullable=False)
    description = Column(String, nullable=True)
    date = Column(Date, nullable=False)
    
    # Se for Dízimo, podemos atrelar ao Membro
    member_id = Column(Integer, ForeignKey("members.id"), nullable=True)
