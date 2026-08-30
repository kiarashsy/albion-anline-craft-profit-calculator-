export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export interface UserStats {
  totalCalculations: number;
  totalItemsCalculated: number;
  totalProfitCalculated: number;
  citiesSourced: string[];
  focusUses: number;
  tier8Calculations: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  stats: UserStats;
  achievements: Achievement[];
}

export interface AlbionItem {
  id: string;
  name: string;
  tier: number;
  enchantment: number;
  category: string;
  itemValue: number; // Base nutrition/value weight
  ingredients: {
    id: string;
    name: string;
    quantity: number;
  }[];
}

export interface PriceData {
  item_id: string;
  city: string;
  quality: number;
  sell_price_min: number;
  sell_price_min_date: string;
  sell_price_max: number;
  sell_price_max_date: string;
  buy_price_min: number;
  buy_price_min_date: string;
  buy_price_max: number;
  buy_price_max_date: string;
}

export interface SourcingRecommendation {
  ingredientId: string;
  ingredientName: string;
  quantityNeeded: number;
  bestCity: string;
  unitPrice: number;
  totalCost: number;
}

export interface ProfitAnalytics {
  totalSourcingCost: number;
  totalStationFee: number;
  totalTaxes: number;
  bestSellCity: string;
  grossRevenue: number;
  netProfit: number;
  roi: number; // percentage
  focusProfit: number | null; // profit per point if focus used
}
