import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Globe, Activity } from 'lucide-react';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
    document.dir = i18n.dir(); // Handle RTL for Persian
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#1e293b] bg-[#151c2c] shadow-2xl">
      <div className="flex h-16 w-full items-center justify-between px-6">
        
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 bg-gradient-to-br from-[#00f5ff] to-[#0066cc] rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(0,245,255,0.3)]">
            <span className="text-white font-black text-xl">A</span>
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white leading-none uppercase">
              ALBION CRAFT MASTER PRO
            </h1>
            <p className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase mt-1">
              Enterprise Grade Sourcing & ROI
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          
          <div className="flex items-center gap-2 bg-[#0b0f19] px-3 py-1.5 rounded border border-[#1e293b] hidden sm:flex">
            <span className="text-[10px] font-bold text-slate-500 uppercase">Server</span>
            <span className="text-xs font-semibold text-white">Americas</span>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          </div>

          {/* Language Switcher */}
          <div className="flex gap-3 text-[11px] font-bold text-slate-400">
            {['en', 'fa', 'de', 'ru'].map((lang) => (
              <span 
                key={lang}
                onClick={() => handleLanguageChange({ target: { value: lang } } as any)}
                className={`cursor-pointer uppercase ${i18n.language === lang ? 'text-cyan-400 underline' : 'hover:text-white'}`}
              >
                {lang}
              </span>
            ))}
          </div>

          {/* Auth / Profile */}
          {user ? (
            <div className="flex items-center gap-4 border-l border-[#1e293b] pl-6">
              <Link to="/dashboard" className="text-[11px] font-bold text-slate-400 hover:text-white transition-colors uppercase">
                {t('nav.dashboard')}
              </Link>
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <Link to="/profile" className="text-xs font-bold text-white leading-none hover:text-cyan-400 transition-colors block">{user.name}</Link>
                  <button 
                    onClick={() => { logout(); navigate('/'); }}
                    className="text-[10px] text-amber-500 hover:text-red-400 transition-colors uppercase font-mono mt-1"
                  >
                    {t('nav.logout')}
                  </button>
                </div>
                <Link to="/profile" className="w-9 h-9 rounded-full border-2 border-cyan-500/30 bg-[#1e293b] flex items-center justify-center overflow-hidden hover:border-cyan-400 transition-colors">
                  <User className="h-5 w-5 text-slate-500 hover:text-cyan-400 transition-colors" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4 border-l border-[#1e293b] pl-6">
              <Link 
                to="/auth" 
                className="rounded text-[11px] font-bold text-cyan-400 hover:text-white transition-colors uppercase"
              >
                {t('nav.login')}
              </Link>
            </div>
          )}

        </div>
      </div>
    </nav>
  );
}
