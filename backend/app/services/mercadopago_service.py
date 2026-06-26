import mercadopago
from fastapi import HTTPException
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)

# Inicializa o SDK do Mercado Pago
if settings.MP_ACCESS_TOKEN:
    sdk = mercadopago.SDK(settings.MP_ACCESS_TOKEN)
else:
    sdk = None
    logger.warning("MP_ACCESS_TOKEN não configurado no .env")

def create_checkout_preference(tenant_name: str, plan_name: str, price: float, email: str) -> str:
    """
    Gera um link de pagamento (Preference) no Mercado Pago para a igreja assinar o SaaS.
    Retorna a URL de checkout.
    """
    if not sdk:
        raise HTTPException(status_code=500, detail="Gateway de pagamento não configurado.")

    preference_data = {
        "items": [
            {
                "id": f"plan_{plan_name.lower()}",
                "title": f"Assinatura Sancoré Church - Plano {plan_name}",
                "description": f"Sistema de Gestão para a igreja: {tenant_name}",
                "quantity": 1,
                "currency_id": "BRL",
                "unit_price": price
            }
        ],
        "payer": {
            "email": email
        },
        "back_urls": {
            "success": f"https://{settings.SAAS_DOMAIN}/checkout/success",
            "failure": f"https://{settings.SAAS_DOMAIN}/checkout/failure",
            "pending": f"https://{settings.SAAS_DOMAIN}/checkout/pending"
        },
        "auto_return": "approved",
    }
    
    preference_response = sdk.preference().create(preference_data)
    preference = preference_response.get("response", {})
    
    init_point = preference.get("init_point")
    if not init_point:
        logger.error(f"Erro ao gerar preferência no MP: {preference_response}")
        raise HTTPException(status_code=500, detail="Falha ao gerar link de pagamento.")
        
    return init_point
