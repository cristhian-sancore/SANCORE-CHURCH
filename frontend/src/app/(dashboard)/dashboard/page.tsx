import { Users, TrendingUp, TrendingDown, Network } from "lucide-react";

export default function DashboardOverview() {
  const kpis = [
    { title: "Total de Membros", value: "1.240", change: "+12%", positive: true, icon: Users },
    { title: "Entradas (Mês)", value: "R$ 45.200,00", change: "+5%", positive: true, icon: TrendingUp },
    { title: "Saídas (Mês)", value: "R$ 12.400,00", change: "-2%", positive: true, icon: TrendingDown },
    { title: "Células Ativas", value: "32", change: "+2", positive: true, icon: Network },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Visão Geral</h2>
        <p className="text-gray-400">Acompanhe o crescimento e a saúde da sua igreja.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <div key={index} className="glass-panel p-6 flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div className={`p-3 rounded-xl ${
                index === 0 ? "bg-blue-500/20 text-blue-400" :
                index === 1 ? "bg-green-500/20 text-green-400" :
                index === 2 ? "bg-red-500/20 text-red-400" :
                "bg-purple-500/20 text-purple-400"
              }`}>
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

      {/* Recentes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Últimas Transações */}
        <div className="glass-panel p-6">
          <h3 className="text-xl font-bold text-white mb-6">Últimas Movimentações</h3>
          <div className="flex flex-col gap-4">
            {[
              { desc: "Dízimo - João Silva", val: "R$ 500,00", type: "in", date: "Hoje, 10:30" },
              { desc: "Pagamento Aluguel", val: "R$ 3.500,00", type: "out", date: "Ontem, 14:00" },
              { desc: "Oferta - Culto Domingo", val: "R$ 1.250,00", type: "in", date: "24/06/2026" },
            ].map((tx, i) => (
              <div key={i} className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'in' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {tx.type === 'in' ? <TrendingUp className="w-5 h-5"/> : <TrendingDown className="w-5 h-5"/>}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{tx.desc}</p>
                    <p className="text-xs text-gray-400">{tx.date}</p>
                  </div>
                </div>
                <span className={`font-bold ${tx.type === 'in' ? 'text-green-400' : 'text-red-400'}`}>
                  {tx.type === 'in' ? '+' : '-'}{tx.val}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Próximos Eventos */}
        <div className="glass-panel p-6">
          <h3 className="text-xl font-bold text-white mb-6">Próximos Eventos</h3>
          <div className="flex flex-col gap-4">
            {[
              { title: "Culto de Celebração", date: "Domingo, 19:00", tag: "Principal" },
              { title: "Reunião de Jovens", date: "Sábado, 20:00", tag: "Jovens" },
              { title: "Culto de Ensino", date: "Quarta, 20:00", tag: "Ensino" },
            ].map((ev, i) => (
              <div key={i} className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5 hover:border-blue-500/30 transition-colors">
                <div>
                  <h4 className="font-semibold text-white">{ev.title}</h4>
                  <p className="text-sm text-gray-400 mt-1">{ev.date}</p>
                </div>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-semibold">
                  {ev.tag}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
