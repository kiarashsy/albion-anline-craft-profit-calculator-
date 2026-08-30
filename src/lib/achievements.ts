import { UserStats, Achievement } from '../types';

export const ACHIEVEMENTS_DEF: Omit<Achievement, 'unlockedAt'>[] = [
  { id: 'master_crafter', name: 'Master Crafter', description: 'Calculate crafting for 1,000 items cumulatively.', icon: 'Hammer' },
  { id: 'profit_magnate', name: 'Profit Magnate', description: 'Accumulate over 10,000,000 silver in projected net profit.', icon: 'Coins' },
  { id: 'sourcing_specialist', name: 'Sourcing Specialist', description: 'Source materials from all 7 Royal Cities.', icon: 'Globe' },
  { id: 'focus_optimizer', name: 'Focus Optimizer', description: 'Utilize Focus Crafting in 10 different calculations.', icon: 'Zap' },
  { id: 'elder_artisan', name: 'Elder Artisan', description: 'Analyze the profitability of a Tier 8 item.', icon: 'Star' }
];

export function evaluateAchievements(stats: UserStats, currentAchievements: Achievement[]): Achievement[] {
  const newAchievements = [...currentAchievements];
  const hasAchievement = (id: string) => newAchievements.some(a => a.id === id);
  const unlock = (id: string) => {
    const def = ACHIEVEMENTS_DEF.find(a => a.id === id);
    if (def && !hasAchievement(id)) {
      newAchievements.push({ ...def, unlockedAt: new Date().toISOString() });
    }
  };

  if (stats.totalItemsCalculated >= 1000) unlock('master_crafter');
  if (stats.totalProfitCalculated >= 10000000) unlock('profit_magnate');
  if (stats.citiesSourced.length >= 7) unlock('sourcing_specialist');
  if (stats.focusUses >= 10) unlock('focus_optimizer');
  if (stats.tier8Calculations >= 1) unlock('elder_artisan');

  return newAchievements;
}
