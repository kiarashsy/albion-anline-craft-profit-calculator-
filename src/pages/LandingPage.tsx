import React from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Calculator, BarChart3, TrendingUp, Shield } from 'lucide-react';

export default function LandingPage() {
  const { t } = useTranslation();

  return (
    <div className="flex-1 w-full flex flex-col items-center justify-center relative px-4">
      
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl w-full text-center z-10 py-20"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
          {t('hero.title')}
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto">
          {t('hero.subtitle')}
        </p>
        
        <Link 
          to="/auth"
          className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg shadow-[0_0_15px_rgba(8,145,178,0.4)] transition-all hover:scale-105"
        >
          {t('hero.cta')}
        </Link>
      </motion.div>

      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-3 gap-6 py-20 z-10">
        <FeatureCard 
          icon={<Calculator className="w-8 h-8 text-cyan-400" />}
          title="Smart Calculator"
          description="Accurately compute Resource Return Rates, taxes, and station fees for any batch size."
        />
        <FeatureCard 
          icon={<TrendingUp className="w-8 h-8 text-amber-500" />}
          title="Multi-City Matrix"
          description="Real-time price scanning across all Royal Cities to build the optimal sourcing list."
        />
        <FeatureCard 
          icon={<Shield className="w-8 h-8 text-green-400" />}
          title="ROI Analytics"
          description="Protect your capital. See precise profit margins and focus efficiency before you craft."
        />
      </div>

    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-6 rounded-xl bg-[#151c2c] border border-[#1e293b] backdrop-blur-sm relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-slate-400 text-sm font-medium">{description}</p>
    </motion.div>
  );
}
