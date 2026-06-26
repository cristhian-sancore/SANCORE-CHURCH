from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.tenant import Tenant
from app.models.user import User
from app.schemas.tenant import TenantCreate, TenantResponse
from app.core.security import get_password_hash
from app.services.mercadopago_service import create_checkout_preference
from app.services.cloudflare_service import create_subdomain

router = APIRouter(prefix="/saas", tags=["SaaS Management"])

def provision_cloudflare_background(subdomain: str):
    import asyncio
    # Chama a função async do cloudflare
    asyncio.run(create_subdomain(subdomain))

@router.post("/subscribe", response_model=TenantResponse)
def subscribe_new_church(tenant_data: TenantCreate, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    # 1. Verifica se subdomínio já existe
    if db.query(Tenant).filter(Tenant.subdomain == tenant_data.subdomain).first():
        raise HTTPException(status_code=400, detail="Subdomínio já está em uso.")
    
    if db.query(User).filter(User.email == tenant_data.admin_email).first():
        raise HTTPException(status_code=400, detail="E-mail de admin já cadastrado.")

    # 2. Gera Link de Pagamento MP (Ex: R$ 99.90 para plano PRO, senão 0)
    price = 99.90 if tenant_data.plan == "pro" else 0.0
    checkout_url = None
    if price > 0:
        checkout_url = create_checkout_preference(tenant_data.name, tenant_data.plan, price, tenant_data.admin_email)

    # 3. Cria a Igreja (Tenant) no Banco (Inativa até o webhook confirmar, ou Ativa se for free)
    is_active = True if price == 0 else False
    
    new_tenant = Tenant(
        name=tenant_data.name,
        subdomain=tenant_data.subdomain,
        plan=tenant_data.plan,
        is_active=is_active
    )
    db.add(new_tenant)
    db.commit()
    db.refresh(new_tenant)

    # 4. Cria o usuário Pastor/Admin vinculado a essa igreja
    hashed_password = get_password_hash(tenant_data.admin_password)
    new_admin = User(
        name=tenant_data.admin_name,
        email=tenant_data.admin_email,
        password_hash=hashed_password,
        access_level=1, # 1 = Pastor/Admin
        church_id=new_tenant.id,
        is_active=is_active
    )
    db.add(new_admin)
    db.commit()

    # 5. Se for plano gratuito, já provisiona a Cloudflare em Background
    if is_active:
        background_tasks.add_task(provision_cloudflare_background, tenant_data.subdomain)

    # 6. Prepara o response
    response_data = TenantResponse.model_validate(new_tenant)
    response_data.checkout_url = checkout_url
    
    return response_data
