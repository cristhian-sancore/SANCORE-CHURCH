import { Building2, DollarSign, Activity, UsersRound } from "lucide-react";

export default function SaasOverviewPage() {
  const kpis = [
    { title: "MRR (Receita Recorrente)", value: "R$ 15.450,00", change: "+12.5%", positive: true, icon: DollarSign },
    { title: "Igrejas Ativas", value: "128", change: "+4", positive: true, icon: Building2 },
    { title: "Usuários Totais (Membros)", value: "14.290", change: "+840", positive: true, icon: UsersRound },
    { title: "Taxa de Churn", value: "1.2%", change: "-0.5%", positive: true, icon: Activity },
  ];

  const recentChurches = [
    { name: "Igreja Batista Nacional Sede", subdomain: "ibnsede", plan: "PRO", status: "active", date: "Hoje" },
    { name: "Comunidade da Graça", subdomain: "graca", plan: "PREMIUM", status: "active", date: "Ontem" },
    { name: "Igreja Videira SP", subdomain: "videirasp", plan: "FREE", status: "pending", date: "24/06/2026" },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Painel de Controle SaaS</h2>
        <p className="text-gray-400">Visão global das métricas, assinaturas do Mercado Pago e domínios da Cloudflare.</p>
      </div>

      {/* SaaS KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <div key={index} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl p-6 flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400">
                <kpi.icon className="w-6 h-6" />
              </div>
              <span className={`text-sm font-semibold ${kpi.positive ? "text-green-400" : "text-red-400"}`}>
                {kpi.change}
              </span>
            </div>
            <div>
              <p className="text-gray-400 text-sm font-medium">{kpi.title}</p>
              <h3 className="text-2xl font-bold text-white mt-1">{kpi.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Lista de Igrejas Recentes */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white">Novas Igrejas Cadastradas</h3>
            <button className="text-sm text-purple-400 hover:text-purple-300 font-medium">Ver Todas</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 text-gray-400 text-sm">
                  <th className="pb-3 font-medium">Igreja</th>
                  <th className="pb-3 font-medium">Subdomínio (Cloudflare)</th>
                  <th className="pb-3 font-medium">Plano</th>
                  <th className="pb-3 font-medium">Status Pagamento</th>
                </tr>
              </thead>
              <tbody>
                {recentChurches.map((church, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4">
                      <p className="font-semibold text-white">{church.name}</p>
                      <p className="text-xs text-gray-500">Adicionado {church.date}</p>
                    </td>
                    <td className="py-4 text-blue-400 text-sm">{church.subdomain}.sancore.com.br</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        church.plan === 'PRO' ? 'bg-blue-500/20 text-blue-400' : 
                        church.plan === 'PREMIUM' ? 'bg-amber-500/20 text-amber-400' : 
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {church.plan}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${church.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                        <span className="text-sm text-gray-300 capitalize">
                          {church.status === 'active' ? 'Pago (Ativo)' : 'Aguardando Pix'}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Integrações Status */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl p-6">
          <h3 className="text-xl font-bold text-white mb-6">Status dos Serviços</h3>
          <div className="flex flex-col gap-5">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00adef]/10 flex items-center justify-center">
                  <span className="font-bold text-[#00adef]">MP</span>
                </div>
                <div>
                  <p className="font-semibold text-white">Mercado Pago</p>
                  <p className="text-xs text-green-400">Webhooks Ativos</p>
                </div>
              </div>
              <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)] animate-pulse"></div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#f38020]/10 flex items-center justify-center">
                  <span className="font-bold text-[#f38020]">CF</span>
                </div>
                <div>
                  <p className="font-semibold text-white">Cloudflare API</p>
                  <p className="text-xs text-green-400">DNS Automático Ativo</p>
                </div>
              </div>
              <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)] animate-pulse"></div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <span className="font-bold text-green-500">EV</span>
                </div>
                <div>
                  <p className="font-semibold text-white">Evolution API</p>
                  <p className="text-xs text-green-400">WhatsApp Conectado</p>
                </div>
              </div>
              <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)] animate-pulse"></div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
