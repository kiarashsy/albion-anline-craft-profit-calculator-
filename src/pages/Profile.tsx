import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { ACHIEVEMENTS_DEF } from '../lib/achievements';
import { Hammer, Coins, Globe, Zap, Star, Trophy } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

const ICON_MAP: Record<string, React.ReactNode> = {
  Hammer: <Hammer className="w-6 h-6" />,
  Coins: <Coins className="w-6 h-6" />,
  Globe: <Globe className="w-6 h-6" />,
  Zap: <Zap className="w-6 h-6" />,
  Star: <Star className="w-6 h-6" />,
};

export default function Profile() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const { stats, achievements } = user;
  const unlockedIds = achievements.map(a => a.id);

  return (
    <div className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-8 overflow-hidden">
      
      <header className="flex items-center gap-4 pb-6 border-b border-[#1e293b]">
        <div className="w-16 h-16 rounded-full border-2 border-cyan-500/30 bg-[#1e293b] flex items-center justify-center">
          <span className="text-2xl font-black text-white">{user.name.charAt(0).toUpperCase()}</span>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white uppercase">{user.name}</h2>
          <p className="text-xs text-slate-400 mt-1 font-mono uppercase tracking-widest">{user.email}</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Stats Panel */}
        <section className="bg-[#151c2c] border border-[#1e293b] rounded-xl p-6 flex flex-col gap-6">
          <div className="flex items-center gap-2 text-slate-300">
            <Trophy className="w-5 h-5 text-amber-500" />
            <h3 className="text-sm font-black uppercase tracking-widest">Lifetime Statistics</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <StatCard label="Calculations Run" value={stats.totalCalculations.toLocaleString()} />
            <StatCard label="Total Items Crafted" value={stats.totalItemsCalculated.toLocaleString()} />
            <StatCard label="Projected Profit (S)" value={stats.totalProfitCalculated.toLocaleString()} valueColor="text-green-400" />
            <StatCard label="Cities Sourced" value={stats.citiesSourced.length.toString()} />
            <StatCard label="Focus Uses" value={stats.focusUses.toLocaleString()} valueColor="text-cyan-400" />
            <StatCard label="T8 Scans" value={stats.tier8Calculations.toLocaleString()} />
          </div>
        </section>

        {/* Achievements Panel */}
        <section className="bg-[#151c2c] border border-[#1e293b] rounded-xl p-6 flex flex-col gap-6">
          <div className="flex items-center justify-between text-slate-300">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-cyan-400" />
              <h3 className="text-sm font-black uppercase tracking-widest">Achievements</h3>
            </div>
            <span className="text-xs font-mono text-slate-500">{unlockedIds.length} / {ACHIEVEMENTS_DEF.length} Unlocked</span>
          </div>

          <div className="flex flex-col gap-4 overflow-y-auto pr-2">
            {ACHIEVEMENTS_DEF.map((def, i) => {
              const isUnlocked = unlockedIds.includes(def.id);
              const unlockedData = achievements.find(a => a.id === def.id);

              return (
                <motion.div 
                  key={def.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-lg border transition-all duration-300",
                    isUnlocked 
                      ? "bg-[#0b0f19] border-cyan-500/30 shadow-[0_0_15px_rgba(0,245,255,0.05)]" 
                      : "bg-[#0b0f19]/50 border-[#1e293b] opacity-60 grayscale"
                  )}
                >
                  <div className={cn(
                    "w-12 h-12 rounded-lg flex items-center justify-center shrink-0 border",
                    isUnlocked ? "bg-cyan-900/30 border-cyan-500/50 text-cyan-400" : "bg-[#151c2c] border-[#1e293b] text-slate-500"
                  )}>
                    {ICON_MAP[def.icon] || <Trophy className="w-6 h-6" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className={cn("text-sm font-bold truncate", isUnlocked ? "text-white" : "text-slate-400")}>
                      {def.name}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {def.description}
                    </p>
                  </div>
                  {isUnlocked && (
                    <div className="shrink-0 text-right hidden sm:block">
                      <p className="text-[10px] font-mono text-cyan-500/80 uppercase">Unlocked</p>
                      <p className="text-[10px] font-mono text-slate-500">
                        {unlockedData?.unlockedAt ? new Date(unlockedData.unlockedAt).toLocaleDateString() : ''}
                      </p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}

function StatCard({ label, value, valueColor = "text-white" }: { label: string, value: string, valueColor?: string }) {
  return (
    <div className="bg-[#0b0f19] border border-[#1e293b] rounded p-4">
      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">{label}</p>
      <p className={cn("text-xl font-mono font-bold", valueColor)}>{value}</p>
    </div>
  );
}
