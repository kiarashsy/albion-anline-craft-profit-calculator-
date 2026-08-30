import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail } from 'lucide-react';

export default function AuthPage() {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      login(email);
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 relative">
      
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-[#151c2c] border border-[#1e293b] rounded-2xl shadow-2xl overflow-hidden z-10"
      >
        <div className="p-8">
          <h2 className="text-3xl font-bold text-white mb-2 text-center">
            {isLogin ? t('nav.login') : t('auth.signup')}
          </h2>
          <p className="text-gray-400 text-center mb-8">
            Access the ultimate crafting intelligence.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-300">{t('auth.email')}</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-500" />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0b0f19] border border-[#1e293b] rounded-lg py-2.5 pl-10 pr-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="crafter@albion.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-300">{t('auth.password')}</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-500" />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0b0f19] border border-[#1e293b] rounded-lg py-2.5 pl-10 pr-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-3 px-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg mt-6 shadow-[0_0_15px_rgba(8,145,178,0.4)] transition-all hover:scale-[1.02]"
            >
              {isLogin ? t('auth.login') : t('auth.signup')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button 
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
