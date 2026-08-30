import { AlbionItem } from '../types';

// For brevity, we define a robust subset of popular items rather than 10,000+
// In a true enterprise app, this would be fetched from a database.
export const ITEM_DATABASE: AlbionItem[] = [
  {
    id: "T4_HEAD_CLOTH_SET1",
    name: "Adept's Scholar Cowl",
    tier: 4,
    enchantment: 0,
    category: "armor",
    itemValue: 24, // approx weight/nutrition
    ingredients: [
      { id: "T4_CLOTH", name: "Adept's Fine Cloth", quantity: 8 }
    ]
  },
  {
    id: "T4_HEAD_CLOTH_SET1@1",
    name: "Adept's Scholar Cowl .1",
    tier: 4,
    enchantment: 1,
    category: "armor",
    itemValue: 48,
    ingredients: [
      { id: "T4_CLOTH_LEVEL1@1", name: "Uncommon Adept's Fine Cloth", quantity: 8 }
    ]
  },
  {
    id: "T5_MAIN_SWORD",
    name: "Expert's Broadsword",
    tier: 5,
    enchantment: 0,
    category: "weapon",
    itemValue: 96,
    ingredients: [
      { id: "T5_METALBAR", name: "Expert's Titanium Steel Bar", quantity: 16 },
      { id: "T5_LEATHER", name: "Expert's Cured Leather", quantity: 8 }
    ]
  },
  {
    id: "T6_ARMOR_LEATHER_SET1",
    name: "Master's Mercenary Jacket",
    tier: 6,
    enchantment: 0,
    category: "armor",
    itemValue: 128,
    ingredients: [
      { id: "T6_LEATHER", name: "Master's Robust Leather", quantity: 16 }
    ]
  },
  {
    id: "T8_MAIN_NATURESTAFF",
    name: "Elder's Nature Staff",
    tier: 8,
    enchantment: 0,
    category: "weapon",
    itemValue: 512,
    ingredients: [
      { id: "T8_WOOD", name: "Elder's Ghost Plank", quantity: 16 },
      { id: "T8_CLOTH", name: "Elder's Starfall Cloth", quantity: 8 }
    ]
  }
];

export const CITIES = [
  "Martlock",
  "Thetford",
  "Fort Sterling",
  "Lymhurst",
  "Bridgewatch",
  "Caerleon",
  "Brecilien"
];
