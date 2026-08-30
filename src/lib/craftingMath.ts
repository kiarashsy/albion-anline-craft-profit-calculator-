import { AlbionItem, PriceData, ProfitAnalytics, SourcingRecommendation } from '../types';

interface CalcParams {
  item: AlbionItem;
  batchSize: number;
  useFocus: boolean;
  hasPremium: boolean;
  stationFee: number;
  marketPrices: PriceData[];
}

// Return rate constants (standardized for Royal Cities with crafting bonuses)
// Normally, this depends heavily on the specific item and city.
// We'll use standard generalized values for a crafting bonus city:
const RRR_NO_FOCUS = 0.152; // 15.2% without focus in bonus city
const RRR_WITH_FOCUS = 0.435; // 43.5% with focus in bonus city
const FOCUS_COST_PER_ITEM = 250; // Mock average focus cost

export function calculateProfit(params: CalcParams): { recommendations: SourcingRecommendation[], analytics: ProfitAnalytics } {
  const { item, batchSize, useFocus, hasPremium, stationFee, marketPrices } = params;
  
  const rrr = useFocus ? RRR_WITH_FOCUS : RRR_NO_FOCUS;
  const recommendations: SourcingRecommendation[] = [];
  
  let totalSourcingCost = 0;

  // 1. Sourcing Ingredients
  item.ingredients.forEach(ing => {
    // Exact material saving calculation: Needs = required * (1 - rrr)
    // For Albion, you buy the full amount upfront, and return materials on craft.
    // Over many batches, net consumption approaches (1 - RRR).
    const netQuantityNeeded = Math.ceil(ing.quantity * batchSize * (1 - rrr));
    
    // Find best city to buy
    const ingPrices = marketPrices.filter(p => p.item_id === ing.id && p.sell_price_min > 0);
    let bestCity = "Any";
    let unitPrice = 0;

    if (ingPrices.length > 0) {
      const bestPriceObj = ingPrices.reduce((prev, curr) => prev.sell_price_min < curr.sell_price_min ? prev : curr);
      bestCity = bestPriceObj.city;
      unitPrice = bestPriceObj.sell_price_min;
    } else {
      // Fallback
      unitPrice = 500; 
      bestCity = "Unknown (Mock)";
    }

    const cost = unitPrice * netQuantityNeeded;
    totalSourcingCost += cost;

    recommendations.push({
      ingredientId: ing.id,
      ingredientName: ing.name,
      quantityNeeded: netQuantityNeeded,
      bestCity,
      unitPrice,
      totalCost: cost
    });
  });

  // 2. Station Fees (Usage Fee is per 100 nutrition)
  // Nutrition = itemValue * batchSize. Real Albion uses slightly different formulas but this is an acceptable approximation.
  const totalNutrition = item.itemValue * batchSize;
  const totalStationFee = Math.ceil((totalNutrition / 100) * stationFee);

  // 3. Selling & Taxes
  const productPrices = marketPrices.filter(p => p.item_id === item.id && p.sell_price_min > 0);
  let bestSellCity = "Any";
  let grossRevenue = 0;

  if (productPrices.length > 0) {
    const bestSellObj = productPrices.reduce((prev, curr) => prev.sell_price_min > curr.sell_price_min ? prev : curr);
    bestSellCity = bestSellObj.city;
    grossRevenue = bestSellObj.sell_price_min * batchSize;
  } else {
    grossRevenue = 1500 * batchSize;
    bestSellCity = "Unknown (Mock)";
  }

  // Premium Tax: 4% Setup + 4% Sale (8% total) vs Non-Premium: 2.5% Setup + 8% Sale (10.5% total)
  // Current real rates slightly vary, typically 4% vs 8%. Let's use 4% premium, 8% non-premium, plus 2.5% setup.
  const setupFee = grossRevenue * 0.025;
  const saleTax = hasPremium ? (grossRevenue * 0.04) : (grossRevenue * 0.08);
  const totalTaxes = setupFee + saleTax;

  // 4. Final Math
  const totalCost = totalSourcingCost + totalStationFee + totalTaxes;
  const netProfit = grossRevenue - totalCost;
  const roi = (totalCost > 0) ? (netProfit / totalCost) * 100 : 0;
  
  let focusProfit: number | null = null;
  if (useFocus) {
    focusProfit = netProfit / (FOCUS_COST_PER_ITEM * batchSize);
  }

  return {
    recommendations,
    analytics: {
      totalSourcingCost,
      totalStationFee,
      totalTaxes,
      bestSellCity,
      grossRevenue,
      netProfit,
      roi,
      focusProfit
    }
  };
}
