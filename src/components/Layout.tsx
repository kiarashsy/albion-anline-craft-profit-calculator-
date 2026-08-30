import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className="flex flex-col h-screen w-full bg-[#0b0f19] text-[#e0e7ff] overflow-hidden font-sans select-none">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 flex flex-col overflow-y-auto">
          <Outlet />
        </main>
      </div>

      <footer className="h-10 bg-[#151c2c] border-t border-[#1e293b] flex items-center px-6 overflow-hidden flex-shrink-0">
        <div className="flex gap-8 animate-scroll-marquee whitespace-nowrap min-w-full">
          <div className="flex items-center gap-2"><span className="text-[10px] font-bold text-slate-500 uppercase">T8.4 PLANK</span><span className="text-[11px] font-mono text-green-400">2,142 ↑</span></div>
          <div className="flex items-center gap-2"><span className="text-[10px] font-bold text-slate-500 uppercase">T8.4 LEATHER</span><span className="text-[11px] font-mono text-red-400">3,810 ↓</span></div>
          <div className="flex items-center gap-2"><span className="text-[10px] font-bold text-slate-500 uppercase">T8.4 CLOTH</span><span className="text-[11px] font-mono text-slate-300">1,822 •</span></div>
          <div className="flex items-center gap-2"><span className="text-[10px] font-bold text-slate-500 uppercase">GOLD PRICE</span><span className="text-[11px] font-mono text-amber-500">5,422 ↑</span></div>
          <div className="flex items-center gap-2 ml-10"><span className="text-[10px] font-bold text-slate-500 uppercase">T8.4 ORE</span><span className="text-[11px] font-mono text-green-400">2,950 ↑</span></div>
          <div className="flex items-center gap-2"><span className="text-[10px] font-bold text-slate-500 uppercase">T8.4 BAR</span><span className="text-[11px] font-mono text-slate-300">4,110 •</span></div>
          <div className="flex items-center gap-2"><span className="text-[10px] font-bold text-slate-500 uppercase">ELDER RELIC</span><span className="text-[11px] font-mono text-red-400">8,155 ↓</span></div>
        </div>
      </footer>
    </div>
  );
}
