import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserStats } from '../types';
import { evaluateAchievements } from '../lib/achievements';

export interface StatUpdate {
  batchSize: number;
  netProfit: number;
  cities: string[];
  usedFocus: boolean;
  tier: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
  updateStats: (update: StatUpdate) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const defaultStats: UserStats = {
  totalCalculations: 0,
  totalItemsCalculated: 0,
  totalProfitCalculated: 0,
  citiesSourced: [],
  focusUses: 0,
  tier8Calculations: 0
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('acmp_user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const login = (email: string) => {
    // Mock user login
    const newUser: User = { 
      id: 'usr_' + Date.now(), 
      email, 
      name: email.split('@')[0],
      stats: defaultStats,
      achievements: []
    };
    setUser(newUser);
    localStorage.setItem('acmp_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('acmp_user');
  };

  const updateStats = (update: StatUpdate) => {
    setUser(prev => {
      if (!prev) return prev;
      
      const newStats = { ...prev.stats };
      newStats.totalCalculations += 1;
      newStats.totalItemsCalculated += update.batchSize;
      if (update.netProfit > 0) newStats.totalProfitCalculated += update.netProfit;
      
      const newCities = new Set(newStats.citiesSourced || []);
      update.cities.forEach(c => newCities.add(c));
      newStats.citiesSourced = Array.from(newCities);
      
      if (update.usedFocus) newStats.focusUses += 1;
      if (update.tier === 8) newStats.tier8Calculations += 1;

      const newAchievements = evaluateAchievements(newStats, prev.achievements || []);

      const updatedUser: User = { ...prev, stats: newStats, achievements: newAchievements };
      localStorage.setItem('acmp_user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateStats }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
