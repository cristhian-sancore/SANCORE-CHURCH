"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Wallet, CalendarRange, Network, Settings, LogOut } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuItems = [
    { name: "Visão Geral", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Membros", icon: Users, path: "/members" },
    { name: "Financeiro", icon: Wallet, path: "/finance" },
    { name: "Células", icon: Network, path: "/cells" },
    { name: "Eventos", icon: CalendarRange, path: "/events" },
    { name: "Configurações", icon: Settings, path: "/settings" },
  ];

  return (
    <div className="min-h-screen bg-[#09090b] flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white/5 border-r border-white/10 flex flex-col backdrop-blur-md">
        <div className="h-20 flex items-center px-6 border-b border-white/10">
          <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3 shadow-lg shadow-blue-500/20">
            <span className="font-bold text-white text-sm">S</span>
          </div>
          <span className="font-bold text-lg text-white tracking-tight">Sancoré Admin</span>
        </div>

        <nav className="flex-1 py-6 px-3 flex flex-col gap-2 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                  isActive 
                  ? "bg-blue-500/10 text-blue-400 font-medium" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? "text-blue-400" : ""}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 w-full transition-all">
            <LogOut className="w-5 h-5" />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Topbar */}
        <header className="h-20 border-b border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-between px-8">
          <h1 className="text-xl font-semibold text-white">Painel da Igreja</h1>
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-sm font-medium text-white">Pr. Cristhian Sancore</p>
              <p className="text-xs text-blue-400">Administrador</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-900 border-2 border-blue-500 flex items-center justify-center text-white font-bold">
              CS
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-8 relative">
          {/* Fundo Decorativo para a área de conteúdo */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/10 blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
