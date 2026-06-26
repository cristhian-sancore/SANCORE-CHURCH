import httpx
from fastapi import HTTPException
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)

async def create_subdomain(subdomain: str, target_ip: str = "127.0.0.1") -> bool:
    """
    Cria um registro A (ou CNAME) na Cloudflare para o novo tenant.
    Ex: Se subdomain='ibnsede', cria ibnsede.sancore.com.br apontando para o IP do servidor SaaS.
    """
    if not settings.CLOUDFLARE_API_TOKEN or not settings.CLOUDFLARE_ZONE_ID:
        logger.warning("Cloudflare credentials missing. Subdomain not created.")
        return False
        
    url = f"https://api.cloudflare.com/client/v4/zones/{settings.CLOUDFLARE_ZONE_ID}/dns_records"
    headers = {
        "Authorization": f"Bearer {settings.CLOUDFLARE_API_TOKEN}",
        "Content-Type": "application/json"
    }
    
    # Vamos criar um registro A apontando para o IP do seu servidor (target_ip)
    # Na produção, esse target_ip seria o IP estático do servidor Portainer
    data = {
        "type": "A",
        "name": f"{subdomain}.{settings.SAAS_DOMAIN}",
        "content": target_ip,
        "ttl": 1, # Auto
        "proxied": True # Habilita o proxy/SSL gratuito da Cloudflare
    }
    
    async with httpx.AsyncClient() as client:
        response = await client.post(url, headers=headers, json=data)
        
        if response.status_code in [200, 201]:
            logger.info(f"Subdomínio {subdomain}.{settings.SAAS_DOMAIN} criado com sucesso!")
            return True
        else:
            logger.error(f"Erro ao criar subdomínio na Cloudflare: {response.text}")
            raise HTTPException(status_code=500, detail="Erro ao provisionar domínio da Igreja.")
