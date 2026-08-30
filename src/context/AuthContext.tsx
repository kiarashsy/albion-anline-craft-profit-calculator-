import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserStats, Achievement } from '../types';
import { evaluateAchievements } from '../lib/achievements';
import { initAuth, googleSignIn, logoutGoogle, getAccessToken } from '../lib/firebase';
import type { User as FirebaseUser } from 'firebase/auth';

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
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  updateStats: (update: StatUpdate) => void;
  updateFullStats: (stats: UserStats, achievements: Achievement[]) => void;
  getDriveToken: () => Promise<string | null>;
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
    const unsubscribe = initAuth(
      (fbUser, token) => {
        syncFirebaseUser(fbUser);
      },
      () => {
        // Only load local storage if not signed in with Google
        const stored = localStorage.getItem('acmp_user');
        if (stored) {
          setUser(JSON.parse(stored));
        }
      }
    );
    return () => unsubscribe();
  }, []);

  const syncFirebaseUser = (fbUser: FirebaseUser) => {
    const stored = localStorage.getItem(`acmp_user_${fbUser.uid}`);
    if (stored) {
      setUser(JSON.parse(stored));
    } else {
      const newUser: User = {
        id: fbUser.uid,
        email: fbUser.email || '',
        name: fbUser.displayName || fbUser.email?.split('@')[0] || 'Crafter',
        stats: defaultStats,
        achievements: []
      };
      setUser(newUser);
      localStorage.setItem(`acmp_user_${fbUser.uid}`, JSON.stringify(newUser));
    }
  };

  const loginWithGoogle = async () => {
    try {
      const result = await googleSignIn();
      if (result) {
        syncFirebaseUser(result.user);
      }
    } catch (error) {
      console.error('Google Sign In failed:', error);
      throw error;
    }
  };

  const login = (email: string) => {
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

  const logout = async () => {
    await logoutGoogle();
    setUser(null);
    localStorage.removeItem('acmp_user'); // Clear legacy local user
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
      
      // Save locally
      if (updatedUser.id.startsWith('usr_')) {
        localStorage.setItem('acmp_user', JSON.stringify(updatedUser));
      } else {
        localStorage.setItem(`acmp_user_${updatedUser.id}`, JSON.stringify(updatedUser));
      }

      return updatedUser;
    });
  };

  const updateFullStats = (stats: UserStats, achievements: Achievement[]) => {
    setUser(prev => {
      if (!prev) return prev;
      const updatedUser = { ...prev, stats, achievements };
      if (updatedUser.id.startsWith('usr_')) {
        localStorage.setItem('acmp_user', JSON.stringify(updatedUser));
      } else {
        localStorage.setItem(`acmp_user_${updatedUser.id}`, JSON.stringify(updatedUser));
      }
      return updatedUser;
    });
  };

  const getDriveToken = async () => {
    return await getAccessToken();
  };

  return (
    <AuthContext.Provider value={{ user, login, loginWithGoogle, logout, updateStats, updateFullStats, getDriveToken }}>
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
