"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, CreditCard, Settings, Globe, ShieldAlert } from "lucide-react";

export default function SaasAdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuItems = [
    { name: "SaaS Overview", icon: LayoutDashboard, path: "/saas-admin" },
    { name: "Igrejas (Clientes)", icon: Users, path: "/saas-admin/churches" },
    { name: "Assinaturas & MRR", icon: CreditCard, path: "/saas-admin/billing" },
    { name: "Domínios (Cloudflare)", icon: Globe, path: "/saas-admin/domains" },
    { name: "Configurações SaaS", icon: Settings, path: "/saas-admin/settings" },
  ];

  return (
    <div className="min-h-screen bg-[#09090b] flex overflow-hidden selection:bg-purple-500/30">
      {/* Sidebar Super Admin (Roxa/Diferenciada do App da Igreja) */}
      <aside className="w-64 bg-black/40 border-r border-white/10 flex flex-col backdrop-blur-xl z-20">
        <div className="h-20 flex items-center px-6 border-b border-white/10">
          <div className="w-8 h-8 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3 shadow-lg shadow-purple-500/20">
            <ShieldAlert className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg text-white tracking-tight">Super Admin</span>
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
                  ? "bg-purple-500/10 text-purple-400 font-medium" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? "text-purple-400" : ""}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        
        {/* Fundo Decorativo Roxo para o Super Admin */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

        {/* Topbar */}
        <header className="h-20 border-b border-white/10 bg-black/20 backdrop-blur-md flex items-center justify-between px-8 z-10">
          <h1 className="text-xl font-semibold text-white">Gestão Global Sancoré SaaS</h1>
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-sm font-medium text-white">Cristhian Sancore</p>
              <p className="text-xs text-purple-400">CEO / Founder</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-purple-900 border-2 border-purple-500 flex items-center justify-center text-white font-bold">
              CEO
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-8 z-10 relative">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
