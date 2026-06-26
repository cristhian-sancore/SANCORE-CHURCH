"use client";

import { useState } from "react";
import { LogIn, Heart, Calendar, Users, MapPin, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ChurchLandingPage() {
  // Mock State: Altere para "true" para ver o player do YouTube substituindo o banner
  const [isLive, setIsLive] = useState(false);

  return (
    <main className="min-h-screen bg-[#09090b] relative overflow-hidden flex flex-col items-center">
      
      {/* Background Decorativo */}
      <div className="absolute top-0 w-full h-[500px] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none -translate-y-1/2"></div>

      {/* Header / Nav */}
      <header className="w-full max-w-6xl mx-auto p-6 flex justify-between items-center z-10">
        <div className="flex items-center gap-2">
          {/* Logo Placeholder */}
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <span className="font-bold text-xl text-white">S</span>
          </div>
          <span className="font-bold text-2xl tracking-tight">Sancoré Church</span>
        </div>

        <Link href="/login" className="glass-button px-5 py-2.5 flex items-center gap-2 text-sm font-medium">
          <LogIn className="w-4 h-4 text-blue-400" />
          <span>Área de Membros</span>
        </Link>
      </header>

      <div className="w-full max-w-6xl mx-auto px-6 py-12 flex flex-col gap-16 z-10">
        
        {/* HERO SECTION: Banner ou Transmissão Ao Vivo */}
        <section className="w-full rounded-3xl overflow-hidden glass-panel relative group">
          {isLive ? (
            <div className="aspect-video w-full bg-black relative">
              <iframe
                className="w-full h-full absolute inset-0"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1" 
                title="Culto Ao Vivo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div className="absolute top-4 left-4 bg-red-600 animate-pulse text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider flex items-center gap-2 shadow-lg shadow-red-600/30">
                <span className="w-2 h-2 bg-white rounded-full"></span> AO VIVO
              </div>
            </div>
          ) : (
            <div className="aspect-[16/6] w-full relative bg-gray-900">
              {/* Utilizando o Gerador de Banners Automático Satori via /api/og */}
              <Image 
                src="/api/og?title=Culto de Celebração&date=Neste Domingo&time=19:00&church=Sancoré Church"
                alt="Próximo Evento"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                unoptimized
              />
            </div>
          )}
        </section>

        {/* QUICK ACTIONS (Dízimos e Ofertas) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
          <button className="glass-panel p-8 flex flex-col items-center justify-center gap-4 hover:-translate-y-2 transition-all duration-300 group border-blue-500/30 hover:border-blue-400/60 bg-blue-500/5">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Heart className="w-8 h-8 text-blue-400" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold">Dízimos e Ofertas</h3>
              <p className="text-gray-400 text-sm mt-1">Contribua via PIX ou Cartão</p>
            </div>
          </button>

          <button className="glass-panel p-8 flex flex-col items-center justify-center gap-4 hover:-translate-y-2 transition-all duration-300 group border-indigo-500/30 hover:border-indigo-400/60 bg-indigo-500/5">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Users className="w-8 h-8 text-indigo-400" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold">Sou Visitante</h3>
              <p className="text-gray-400 text-sm mt-1">Preencha sua ficha rápida</p>
            </div>
          </button>
        </section>

        {/* PROGRAMAÇÃO DA IGREJA */}
        <section className="w-full flex flex-col md:flex-row gap-8">
          
          <div className="glass-panel p-8 flex-1">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold">Nossos Cultos</h2>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                <div>
                  <h4 className="font-semibold text-lg">Culto de Celebração</h4>
                  <p className="text-gray-400 text-sm">Domingo</p>
                </div>
                <div className="flex items-center gap-2 text-blue-300">
                  <Clock className="w-4 h-4" /> 19:00
                </div>
              </div>
              <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                <div>
                  <h4 className="font-semibold text-lg">Culto de Ensino</h4>
                  <p className="text-gray-400 text-sm">Quarta-feira</p>
                </div>
                <div className="flex items-center gap-2 text-blue-300">
                  <Clock className="w-4 h-4" /> 20:00
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel p-8 flex-1">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-6 h-6 text-indigo-400" />
              <h2 className="text-2xl font-bold">Células</h2>
            </div>
            <p className="text-gray-400 mb-6">
              Encontre um grupo pequeno perto de você. Temos células para jovens, casais e adultos durante toda a semana.
            </p>
            <button className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 font-bold transition-all shadow-lg shadow-blue-500/25">
              Encontrar uma Célula
            </button>
          </div>

        </section>

      </div>
    </main>
  );
}
