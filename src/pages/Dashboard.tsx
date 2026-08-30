import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { ITEM_DATABASE } from '../lib/itemDatabase';
import { fetchLivePrices } from '../lib/albionApi';
import { calculateProfit } from '../lib/craftingMath';
import { PriceData, AlbionItem, SourcingRecommendation, ProfitAnalytics } from '../types';
import { Calculator, Settings, Coins, Map, Loader2, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { t } = useTranslation();
  const { updateStats } = useAuth();
  
  const [selectedItemId, setSelectedItemId] = useState<string>(ITEM_DATABASE[0].id);
  const [batchSize, setBatchSize] = useState<number>(10);
  const [useFocus, setUseFocus] = useState<boolean>(false);
  const [hasPremium, setHasPremium] = useState<boolean>(true);
  const [stationFee, setStationFee] = useState<number>(350); // fee per 100 nutrition
  
  const [loading, setLoading] = useState(false);
  const [prices, setPrices] = useState<PriceData[]>([]);
  const [results, setResults] = useState<{ recommendations: SourcingRecommendation[], analytics: ProfitAnalytics } | null>(null);

  const selectedItem = useMemo(() => ITEM_DATABASE.find(i => i.id === selectedItemId) as AlbionItem, [selectedItemId]);

  const handleCalculate = async () => {
    setLoading(true);
    // Needs prices for the product itself and all ingredients
    const idsToFetch = [selectedItem.id, ...selectedItem.ingredients.map(i => i.id)];
    
    const livePrices = await fetchLivePrices(idsToFetch);
    setPrices(livePrices);
    
    const calculation = calculateProfit({
      item: selectedItem,
      batchSize,
      useFocus,
      hasPremium,
      stationFee,
      marketPrices: livePrices
    });

    setResults(calculation);

    const validCities = calculation.recommendations
      .map(r => r.bestCity)
      .filter(c => c !== "Unknown (Mock)" && c !== "Any");

    updateStats({
      batchSize,
      netProfit: calculation.analytics.netProfit,
      cities: validCities,
      usedFocus: useFocus,
      tier: selectedItem.tier
    });

    setLoading(false);
  };

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 flex flex-col gap-6 overflow-hidden">
      
      {/* Header Panel */}
      <header className="flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-[#151c2c] border border-cyan-500/40 rounded-lg flex items-center justify-center p-2 relative shadow-[0_0_20px_rgba(0,245,255,0.1)]">
             <div className="absolute top-1 left-1 px-1 bg-white/10 rounded text-[8px] font-bold text-white">T{selectedItem.tier}</div>
             <Settings className="w-8 h-8 text-amber-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{selectedItem.name}</h2>
            <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-semibold italic">
              Tier {selectedItem.tier} • Enchantment {selectedItem.enchantment}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleCalculate}
            disabled={loading}
            className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-2 rounded-md text-xs font-bold shadow-[0_0_15px_rgba(8,145,178,0.4)] transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin h-4 w-4" /> : null}
            {t('calc.calculate').toUpperCase()}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 flex-1 min-h-0">
        
        {/* Configuration Panel */}
        <section className="xl:col-span-3 flex flex-col gap-4 min-h-0">
          <div className="bg-[#151c2c] p-5 border border-[#1e293b] rounded-xl flex flex-col gap-5">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Parameters</h3>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-1.5">{t('calc.item').toUpperCase()}</label>
                <select 
                  value={selectedItemId}
                  onChange={(e) => setSelectedItemId(e.target.value)}
                  className="w-full bg-[#0b0f19] border border-[#1e293b] rounded px-3 py-2 text-white text-sm font-semibold outline-none focus:border-cyan-500 transition-colors"
                >
                  {ITEM_DATABASE.map(item => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-1.5">{t('calc.batch').toUpperCase()}</label>
                <input 
                  type="number" 
                  min="1"
                  value={batchSize}
                  onChange={(e) => setBatchSize(Number(e.target.value))}
                  className="w-full bg-[#0b0f19] border border-[#1e293b] rounded px-3 py-2 text-white text-sm font-mono focus:border-cyan-500 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-1.5">{t('calc.station').toUpperCase()}</label>
                <input 
                  type="number" 
                  min="0"
                  value={stationFee}
                  onChange={(e) => setStationFee(Number(e.target.value))}
                  className="w-full bg-[#0b0f19] border border-[#1e293b] rounded px-3 py-2 text-white text-sm font-mono outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div 
                className={cn("flex items-center justify-between p-3 rounded border cursor-pointer select-none transition-colors", hasPremium ? "bg-[#0b0f19] border-cyan-500/20" : "bg-[#0b0f19] border-[#1e293b]")}
                onClick={() => setHasPremium(!hasPremium)}
              >
                <label className={cn("text-[10px] font-bold pointer-events-none transition-colors", hasPremium ? "text-cyan-400" : "text-slate-500")}>PREMIUM STATUS</label>
                <div className={cn("w-10 h-5 rounded-full flex items-center px-1 relative transition-colors", hasPremium ? "bg-cyan-600" : "bg-[#1e293b]")}>
                  <div className={cn("w-3 h-3 bg-white rounded-full absolute transition-all duration-200", hasPremium ? "right-1" : "left-1")} />
                </div>
              </div>

              <div 
                className={cn("flex items-center justify-between p-3 rounded border cursor-pointer select-none transition-colors", useFocus ? "bg-[#0b0f19] border-amber-500/20" : "bg-[#0b0f19] border-[#1e293b]")}
                onClick={() => setUseFocus(!useFocus)}
              >
                <label className={cn("text-[10px] font-bold pointer-events-none transition-colors", useFocus ? "text-amber-400" : "text-slate-500")}>CRAFT WITH FOCUS</label>
                <div className={cn("w-10 h-5 rounded-full flex items-center px-1 relative transition-colors", useFocus ? "bg-amber-600" : "bg-[#1e293b]")}>
                  <div className={cn("w-3 h-3 bg-white rounded-full absolute transition-all duration-200", useFocus ? "right-1" : "left-1")} />
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-[#151c2c] p-5 border border-[#1e293b] rounded-xl flex-1 flex flex-col justify-between overflow-hidden">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Net Profit Forecast</h3>
            <div className="py-4">
              <p className="text-4xl font-mono font-bold text-white">
                {results ? results.analytics.netProfit.toLocaleString() : '---'}
                <span className="text-xs text-slate-500 ml-1">S</span>
              </p>
              <p className={cn("text-xs font-bold mt-1", results && results.analytics.roi > 0 ? "text-green-400" : "text-slate-500")}>
                {results ? `${results.analytics.roi > 0 ? '+' : ''}${results.analytics.roi.toFixed(1)}% ROI` : '0% ROI'}
              </p>
            </div>
            <div className="space-y-3 pt-4 border-t border-[#1e293b]">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-400">Cost of Sourcing</span>
                <span className="text-white font-mono">{results ? results.analytics.totalSourcingCost.toLocaleString() : '--'}</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-400">Estimated Revenue</span>
                <span className="text-white font-mono">{results ? results.analytics.grossRevenue.toLocaleString() : '--'}</span>
              </div>
              {useFocus && (
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Prof / Focus Pt</span>
                  <span className="text-cyan-400 font-mono">{results?.analytics.focusProfit ? results.analytics.focusProfit.toFixed(1) : '--'}</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Results Panel */}
        <section className="xl:col-span-9 bg-[#151c2c] border border-[#1e293b] rounded-xl flex flex-col overflow-hidden min-h-0">
          <div className="p-4 border-b border-[#1e293b] flex items-center justify-between bg-[#1e293b]/20">
            <h3 className="text-xs font-black text-slate-300 uppercase tracking-widest">{t('matrix.title')}</h3>
            <span className="text-[10px] text-cyan-400 italic font-mono uppercase animate-pulse">Live Market Sync Active</span>
          </div>
          
          <div className="flex-1 overflow-auto p-4">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[10px] font-bold text-slate-500 uppercase border-b border-[#1e293b]">
                  <th className="pb-3 pl-2">Material</th>
                  <th className="pb-3">Qty</th>
                  <th className="pb-3">{t('matrix.bestBuy')}</th>
                  <th className="pb-3">{t('matrix.unitPrice')}</th>
                  <th className="pb-3">{t('matrix.totalCost')}</th>
                </tr>
              </thead>
              <tbody className="text-xs font-mono divide-y divide-[#1e293b]/50">
                {results ? (
                  results.recommendations.map((rec, i) => (
                    <motion.tr 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="hover:bg-white/[0.02]"
                    >
                      <td className="py-4 pl-2 flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#0b0f19] border border-[#1e293b] rounded p-1">
                           <div className="w-full h-full bg-cyan-900/40 rounded-sm"></div>
                        </div>
                        <span className="text-white font-bold">{rec.ingredientName}</span>
                      </td>
                      <td className="py-4 text-slate-300">{rec.quantityNeeded.toLocaleString()}</td>
                      <td className="py-4">
                        <span className="bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/20 font-sans font-bold text-[10px] uppercase">
                          {rec.bestCity}
                        </span>
                      </td>
                      <td className="py-4 text-slate-300">{rec.unitPrice.toLocaleString()}</td>
                      <td className="py-4 text-white">{rec.totalCost.toLocaleString()}</td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-500 font-sans">
                      Select parameters and calculate to see sourcing recommendations.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 bg-[#0b0f19]/30 flex justify-between items-center text-[11px] font-bold uppercase tracking-wider text-slate-500 flex-shrink-0">
             <span>Estimated Sourcing Duration: 2-3 Hours Route Run</span>
             <span className="text-amber-500">Caution: Check Market Volume Before Transporting</span>
          </div>
        </section>

      </div>
    </div>
  );
}


