import React, { useState } from "react";
import { Bell, Star, X, TrendingDown, TrendingUp } from "lucide-react";
import { AIBadge } from "../components/AIBadge";

const fuelTypeOptions = ["RON 95", "RON 91", "Diesel", "RON 97", "RON 100", "Diesel+", "Kerosene"];
const areaOptions = ["Quezon City", "Taguig City", "Pasig City", "Caloocan City", "Muntinlupa City", "Parañaque City", "Manila City", "Pasay City", "Makati City"];

// Brand data with location-based pricing variations
const brandData = [
  {
    brand: "Flying V",
    logo: "✈️",
    prices: {
      "Quezon City": { ron95: 63.90, ron91: 61.30, diesel: 65.00, ron97: 68.30, ron100: 73.80, dieselPlus: 66.60, kerosene: 56.30 },
      "Taguig City": { ron95: 64.50, ron91: 61.80, diesel: 65.60, ron97: 68.80, ron100: 74.30, dieselPlus: 67.10, kerosene: 56.70 },
      "Pasig City": { ron95: 64.20, ron91: 61.60, diesel: 65.30, ron97: 68.60, ron100: 74.10, dieselPlus: 66.90, kerosene: 56.50 },
      "Caloocan City": { ron95: 64.30, ron91: 61.70, diesel: 65.40, ron97: 68.70, ron100: 74.20, dieselPlus: 67.00, kerosene: 56.60 },
      "Muntinlupa City": { ron95: 64.40, ron91: 61.80, diesel: 65.50, ron97: 68.80, ron100: 74.30, dieselPlus: 67.10, kerosene: 56.70 },
      "Parañaque City": { ron95: 64.35, ron91: 61.75, diesel: 65.45, ron97: 68.75, ron100: 74.25, dieselPlus: 67.05, kerosene: 56.65 },
      "Manila City": { ron95: 64.60, ron91: 62.00, diesel: 65.70, ron97: 69.00, ron100: 74.50, dieselPlus: 67.30, kerosene: 56.90 },
      "Pasay City": { ron95: 64.65, ron91: 62.05, diesel: 65.75, ron97: 69.05, ron100: 74.55, dieselPlus: 67.35, kerosene: 56.95 },
      "Makati City": { ron95: 64.70, ron91: 62.10, diesel: 65.80, ron97: 69.10, ron100: 74.60, dieselPlus: 67.40, kerosene: 57.00 },
    },
  },
  {
    brand: "Independent",
    logo: "🏪",
    prices: {
      "Quezon City": { ron95: 65.10, ron91: 62.00, diesel: 66.30, ron97: 69.60, ron100: 75.30, dieselPlus: 67.90, kerosene: 57.00 },
      "Taguig City": { ron95: 65.70, ron91: 62.50, diesel: 66.90, ron97: 70.20, ron100: 75.90, dieselPlus: 68.50, kerosene: 57.60 },
      "Pasig City": { ron95: 65.40, ron91: 62.30, diesel: 66.60, ron97: 69.90, ron100: 75.60, dieselPlus: 68.20, kerosene: 57.30 },
      "Caloocan City": { ron95: 65.50, ron91: 62.40, diesel: 66.70, ron97: 70.00, ron100: 75.70, dieselPlus: 68.30, kerosene: 57.40 },
      "Muntinlupa City": { ron95: 65.60, ron91: 62.50, diesel: 66.80, ron97: 70.10, ron100: 75.80, dieselPlus: 68.40, kerosene: 57.50 },
      "Parañaque City": { ron95: 65.55, ron91: 62.45, diesel: 66.75, ron97: 70.05, ron100: 75.75, dieselPlus: 68.35, kerosene: 57.45 },
      "Manila City": { ron95: 65.80, ron91: 62.70, diesel: 67.00, ron97: 70.30, ron100: 76.00, dieselPlus: 68.60, kerosene: 57.70 },
      "Pasay City": { ron95: 65.85, ron91: 62.75, diesel: 67.05, ron97: 70.35, ron100: 76.05, dieselPlus: 68.65, kerosene: 57.75 },
      "Makati City": { ron95: 65.90, ron91: 62.80, diesel: 67.10, ron97: 70.40, ron100: 76.10, dieselPlus: 68.70, kerosene: 57.80 },
    },
  },
  {
    brand: "Petron",
    logo: "🔷",
    prices: {
      "Quezon City": { ron95: 69.80, ron91: 64.80, diesel: 71.30, ron97: 74.30, ron100: 79.80, dieselPlus: 72.80, kerosene: 59.60 },
      "Taguig City": { ron95: 70.40, ron91: 65.30, diesel: 71.90, ron97: 74.90, ron100: 80.40, dieselPlus: 73.40, kerosene: 60.20 },
      "Pasig City": { ron95: 70.10, ron91: 65.10, diesel: 71.60, ron97: 74.60, ron100: 80.10, dieselPlus: 73.10, kerosene: 59.90 },
      "Caloocan City": { ron95: 70.20, ron91: 65.20, diesel: 71.70, ron97: 74.70, ron100: 80.20, dieselPlus: 73.20, kerosene: 60.00 },
      "Muntinlupa City": { ron95: 70.30, ron91: 65.30, diesel: 71.80, ron97: 74.80, ron100: 80.30, dieselPlus: 73.30, kerosene: 60.10 },
      "Parañaque City": { ron95: 70.25, ron91: 65.25, diesel: 71.75, ron97: 74.75, ron100: 80.25, dieselPlus: 73.25, kerosene: 60.05 },
      "Manila City": { ron95: 70.50, ron91: 65.50, diesel: 72.00, ron97: 75.00, ron100: 80.50, dieselPlus: 73.50, kerosene: 60.30 },
      "Pasay City": { ron95: 70.55, ron91: 65.55, diesel: 72.05, ron97: 75.05, ron100: 80.55, dieselPlus: 73.55, kerosene: 60.35 },
      "Makati City": { ron95: 70.60, ron91: 65.60, diesel: 72.10, ron97: 75.10, ron100: 80.60, dieselPlus: 73.60, kerosene: 60.40 },
    },
  },
  {
    brand: "Unioil",
    logo: "🟦",
    prices: {
      "Quezon City": { ron95: 71.80, ron91: 66.30, diesel: 73.00, ron97: 76.00, ron100: 81.80, dieselPlus: 74.60, kerosene: 61.00 },
      "Taguig City": { ron95: 72.40, ron91: 66.80, diesel: 73.60, ron97: 76.60, ron100: 82.40, dieselPlus: 75.20, kerosene: 61.60 },
      "Pasig City": { ron95: 72.10, ron91: 66.60, diesel: 73.30, ron97: 76.30, ron100: 82.10, dieselPlus: 74.90, kerosene: 61.30 },
      "Caloocan City": { ron95: 72.20, ron91: 66.70, diesel: 73.40, ron97: 76.40, ron100: 82.20, dieselPlus: 75.00, kerosene: 61.40 },
      "Muntinlupa City": { ron95: 72.30, ron91: 66.80, diesel: 73.50, ron97: 76.50, ron100: 82.30, dieselPlus: 75.10, kerosene: 61.50 },
      "Parañaque City": { ron95: 72.25, ron91: 66.75, diesel: 73.45, ron97: 76.45, ron100: 82.25, dieselPlus: 75.05, kerosene: 61.45 },
      "Manila City": { ron95: 72.50, ron91: 67.00, diesel: 73.70, ron97: 76.70, ron100: 82.50, dieselPlus: 75.30, kerosene: 61.70 },
      "Pasay City": { ron95: 72.55, ron91: 67.05, diesel: 73.75, ron97: 76.75, ron100: 82.55, dieselPlus: 75.35, kerosene: 61.75 },
      "Makati City": { ron95: 72.60, ron91: 67.10, diesel: 73.80, ron97: 76.80, ron100: 82.60, dieselPlus: 75.40, kerosene: 61.80 },
    },
  },
  {
    brand: "Caltex",
    logo: "⭐",
    prices: {
      "Quezon City": { ron95: 73.10, ron91: 67.30, diesel: 74.30, ron97: 77.30, ron100: 82.80, dieselPlus: 75.80, kerosene: 61.80 },
      "Taguig City": { ron95: 73.70, ron91: 67.80, diesel: 74.90, ron97: 77.90, ron100: 83.40, dieselPlus: 76.40, kerosene: 62.40 },
      "Pasig City": { ron95: 73.40, ron91: 67.60, diesel: 74.60, ron97: 77.60, ron100: 83.10, dieselPlus: 76.10, kerosene: 62.10 },
      "Caloocan City": { ron95: 73.50, ron91: 67.70, diesel: 74.70, ron97: 77.70, ron100: 83.20, dieselPlus: 76.20, kerosene: 62.20 },
      "Muntinlupa City": { ron95: 73.60, ron91: 67.80, diesel: 74.80, ron97: 77.80, ron100: 83.30, dieselPlus: 76.30, kerosene: 62.30 },
      "Parañaque City": { ron95: 73.55, ron91: 67.75, diesel: 74.75, ron97: 77.75, ron100: 83.25, dieselPlus: 76.25, kerosene: 62.25 },
      "Manila City": { ron95: 73.80, ron91: 68.00, diesel: 75.00, ron97: 78.00, ron100: 83.50, dieselPlus: 76.50, kerosene: 62.50 },
      "Pasay City": { ron95: 73.85, ron91: 68.05, diesel: 75.05, ron97: 78.05, ron100: 83.55, dieselPlus: 76.55, kerosene: 62.55 },
      "Makati City": { ron95: 73.90, ron91: 68.10, diesel: 75.10, ron97: 78.10, ron100: 83.60, dieselPlus: 76.60, kerosene: 62.60 },
    },
  },
  {
    brand: "Phoenix",
    logo: "🔥",
    prices: {
      "Quezon City": { ron95: 73.45, ron91: 67.60, diesel: 74.60, ron97: 77.60, ron100: 83.30, dieselPlus: 76.00, kerosene: 62.10 },
      "Taguig City": { ron95: 74.05, ron91: 68.10, diesel: 75.20, ron97: 78.20, ron100: 83.90, dieselPlus: 76.60, kerosene: 62.70 },
      "Pasig City": { ron95: 73.75, ron91: 67.90, diesel: 74.90, ron97: 77.90, ron100: 83.60, dieselPlus: 76.30, kerosene: 62.40 },
      "Caloocan City": { ron95: 73.85, ron91: 68.00, diesel: 75.00, ron97: 78.00, ron100: 83.70, dieselPlus: 76.40, kerosene: 62.50 },
      "Muntinlupa City": { ron95: 73.95, ron91: 68.10, diesel: 75.10, ron97: 78.10, ron100: 83.80, dieselPlus: 76.50, kerosene: 62.60 },
      "Parañaque City": { ron95: 73.90, ron91: 68.05, diesel: 75.05, ron97: 78.05, ron100: 83.75, dieselPlus: 76.45, kerosene: 62.55 },
      "Manila City": { ron95: 74.15, ron91: 68.30, diesel: 75.30, ron97: 78.30, ron100: 84.00, dieselPlus: 76.70, kerosene: 62.80 },
      "Pasay City": { ron95: 74.20, ron91: 68.35, diesel: 75.35, ron97: 78.35, ron100: 84.05, dieselPlus: 76.75, kerosene: 62.85 },
      "Makati City": { ron95: 74.25, ron91: 68.40, diesel: 75.40, ron97: 78.40, ron100: 84.10, dieselPlus: 76.80, kerosene: 62.90 },
    },
  },
  {
    brand: "Shell",
    logo: "🐚",
    prices: {
      "Quezon City": { ron95: 73.85, ron91: 67.80, diesel: 74.90, ron97: 77.80, ron100: 83.80, dieselPlus: 76.30, kerosene: 62.30 },
      "Taguig City": { ron95: 74.45, ron91: 68.30, diesel: 75.50, ron97: 78.40, ron100: 84.40, dieselPlus: 76.90, kerosene: 62.90 },
      "Pasig City": { ron95: 74.15, ron91: 68.10, diesel: 75.20, ron97: 78.10, ron100: 84.10, dieselPlus: 76.60, kerosene: 62.60 },
      "Caloocan City": { ron95: 74.25, ron91: 68.20, diesel: 75.30, ron97: 78.20, ron100: 84.20, dieselPlus: 76.70, kerosene: 62.70 },
      "Muntinlupa City": { ron95: 74.35, ron91: 68.30, diesel: 75.40, ron97: 78.30, ron100: 84.30, dieselPlus: 76.80, kerosene: 62.80 },
      "Parañaque City": { ron95: 74.30, ron91: 68.25, diesel: 75.35, ron97: 78.25, ron100: 84.25, dieselPlus: 76.75, kerosene: 62.75 },
      "Manila City": { ron95: 74.55, ron91: 68.50, diesel: 75.60, ron97: 78.50, ron100: 84.50, dieselPlus: 77.00, kerosene: 63.00 },
      "Pasay City": { ron95: 74.60, ron91: 68.55, diesel: 75.65, ron97: 78.55, ron100: 84.55, dieselPlus: 77.05, kerosene: 63.05 },
      "Makati City": { ron95: 74.65, ron91: 68.60, diesel: 75.70, ron97: 78.60, ron100: 84.60, dieselPlus: 77.10, kerosene: 63.10 },
    },
  },
];

// Forecast data with daily predictions
const forecastData = [
  { day: "Today", temp: "Current", ron95: 64.10, ron91: 61.50, diesel: 65.20, trend: "→ Stable" },
  { day: "Tomorrow", temp: "Clear", ron95: 63.95, ron91: 61.40, diesel: 65.10, trend: "↓ Slight drop" },
  { day: "Wed", temp: "Partly Cloudy", ron95: 62.80, ron91: 60.50, diesel: 64.30, trend: "📉 Drop (Best time!)" },
  { day: "Thu", temp: "Sunny", ron95: 62.95, ron91: 60.65, diesel: 64.45, trend: "↑ Slight rise" },
  { day: "Fri", temp: "Clear", ron95: 63.50, ron91: 61.00, diesel: 64.85, trend: "↑ Rising" },
  { day: "Sat", temp: "Rainy", ron95: 64.20, ron91: 61.60, diesel: 65.40, trend: "↑ Rise continues" },
  { day: "Sun", temp: "Cloudy", ron95: 64.40, ron91: 61.75, diesel: 65.60, trend: "→ Leveling off" },
];

// Helper functions
const getPriceForType = (brand: typeof brandData[0], fuelType: string, area: string): number => {
  const locationPrices = brand.prices[area as keyof typeof brand.prices];
  if (!locationPrices) return 0;
  
  const fuelKey = fuelType === "RON 95" ? "ron95" 
    : fuelType === "RON 91" ? "ron91"
    : fuelType === "Diesel" ? "diesel"
    : fuelType === "RON 97" ? "ron97"
    : fuelType === "RON 100" ? "ron100"
    : fuelType === "Diesel+" ? "dieselPlus"
    : "kerosene" as keyof typeof locationPrices;
  
  return locationPrices[fuelKey] || 0;
};

const getRankBadge = (rank: number): string => {
  if (rank === 0) return "🥇";
  if (rank === 1) return "🥈";
  if (rank === 2) return "🥉";
  return `#${rank + 1}`;
};

const calculatePriceChange = (current: number, previous: number): string => {
  const change = ((current - previous) / previous) * 100;
  if (change > 0) return `+${change.toFixed(1)}%`;
  if (change < 0) return `${change.toFixed(1)}%`;
  return "Stable";
};

export function FuelPage() {
  const [selectedFuelType, setSelectedFuelType] = useState("RON 95");
  const [selectedArea, setSelectedArea] = useState("Quezon City");
  const [viewMode, setViewMode] = useState<"brand" | "area">("brand");
  const [priceAlertOpen, setPriceAlertOpen] = useState(false);
  const [forecastModalOpen, setForecastModalOpen] = useState(false);
  const [alertSettings, setAlertSettings] = useState({ method: "sms", threshold: 5, fuelType: "RON 95" });

  // Get sorted brands by price for current selection
  const sortedBrands = [...brandData].sort((a, b) => {
    const priceA = getPriceForType(a, selectedFuelType, selectedArea);
    const priceB = getPriceForType(b, selectedFuelType, selectedArea);
    return priceA - priceB;
  });

  // Get average price for current selection
  const avgPrice = sortedBrands.reduce((sum, brand) => sum + getPriceForType(brand, selectedFuelType, selectedArea), 0) / sortedBrands.length;
  
  // Savings vs most expensive
  const cheapestPrice = getPriceForType(sortedBrands[0], selectedFuelType, selectedArea);
  const expensivePrice = getPriceForType(sortedBrands[sortedBrands.length - 1], selectedFuelType, selectedArea);
  const maxSavings = expensivePrice - cheapestPrice;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-[#FFFFFF] flex items-center gap-2">⛽ Fuel Prices</h1>
        <p className="text-gray-500 dark:text-[#9E9E9E] text-sm mt-1">Real-time prices by location • Compare brands instantly</p>
      </div>

      {/* Controls Row */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <select
          value={selectedFuelType}
          onChange={(e) => setSelectedFuelType(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1E1E1E] text-gray-700 dark:text-[#E0E0E0] outline-none text-sm font-semibold"
        >
          {fuelTypeOptions.map((ft) => <option key={ft}>{ft}</option>)}
        </select>

        <select
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1E1E1E] text-gray-700 dark:text-[#E0E0E0] outline-none text-sm"
        >
          {areaOptions.map((a) => <option key={a}>{a}</option>)}
        </select>

        {/* View Toggle */}
        <div className="flex items-center bg-gray-100 dark:bg-[#1E1E1E] rounded-full p-1 gap-1 ml-auto">
          <button
            onClick={() => setViewMode("brand")}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              viewMode === "brand"
                ? "bg-white dark:bg-[#2D2D2D] shadow-sm text-gray-800 dark:text-[#FFFFFF]"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            🏪 By Brand
          </button>
          <button
            onClick={() => setViewMode("area")}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              viewMode === "area"
                ? "bg-white dark:bg-[#2D2D2D] shadow-sm text-gray-800 dark:text-[#FFFFFF]"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            📍 By Area
          </button>
        </div>
      </div>

      {/* Summary Card */}
      <div className="rounded-xl p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="text-orange-100 text-xs font-medium">📊 {selectedArea.toUpperCase()} AVG</p>
            <p className="text-3xl font-bold mt-0.5">₱{avgPrice.toFixed(2)}</p>
          </div>
          <p className="text-xs text-orange-100">{selectedFuelType}</p>
        </div>
        <div className="border-t border-orange-400 pt-2 flex items-center justify-between text-xs">
          <span>₱{cheapestPrice.toFixed(2)} – ₱{expensivePrice.toFixed(2)}</span>
          <span>•</span>
          <span>Save up to ₱{maxSavings.toFixed(2)}</span>
        </div>
      </div>

      {/* AI Forecast Widget */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl flex-shrink-0">🤖</span>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <p className="font-bold text-purple-900 dark:text-purple-300 text-sm">AI Fuel Forecast</p>
              <AIBadge />
            </div>
            <p className="text-xs text-purple-800 dark:text-purple-300 mb-2">
              {selectedFuelType} expected to <strong>drop ₱1.50 by Wednesday</strong>. Best fill-up: <strong>Wed morning 6-8am</strong>.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPriceAlertOpen(true)}
                className="flex items-center gap-1 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-medium transition-colors"
              >
                <Bell size={12} /> Price Alert
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* By Brand View - Compact */}
      {viewMode === "brand" && (
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-bold text-gray-800 dark:text-[#FFFFFF]">🏪 Ranked by Price - {selectedFuelType}</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">{sortedBrands.length} brands</p>
          </div>
          
          {sortedBrands.map((brand, i) => {
            const price = getPriceForType(brand, selectedFuelType, selectedArea);
            const savings = expensivePrice - price;
            const rank = getRankBadge(i);
            
            return (
              <div key={brand.brand} className="bg-white dark:bg-[#1E1E1E] rounded-lg p-2.5 border border-gray-100 dark:border-[#2D2D2D] hover:border-orange-300 dark:hover:border-orange-700 transition-colors flex items-center justify-between">
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-base font-bold text-gray-400 dark:text-gray-600 w-6 text-center text-sm">{rank}</span>
                  <span className="text-xl">{brand.logo}</span>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-[#FFFFFF] text-sm">{brand.brand}</p>
                    {savings > 0 && <p className="text-green-600 dark:text-[#81C784] text-xs">Save ₱{savings.toFixed(2)}</p>}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-800 dark:text-white">₱{price.toFixed(2)}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* By Area View - Compact */}
      {viewMode === "area" && (
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-bold text-gray-800 dark:text-[#FFFFFF]">📍 Ranked by Price - {selectedFuelType}</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">{areaOptions.length} areas</p>
          </div>
          
          {areaOptions.map((area, i) => {
            const avgAreaPrice = brandData.reduce((sum, brand) => sum + getPriceForType(brand, selectedFuelType, area), 0) / brandData.length;
            const cheapestForArea = Math.min(...brandData.map(b => getPriceForType(b, selectedFuelType, area)));
            const mostExpensiveForArea = Math.max(...brandData.map(b => getPriceForType(b, selectedFuelType, area)));
            
            return (
              <div key={area} className="bg-white dark:bg-[#1E1E1E] rounded-lg p-2.5 border border-gray-100 dark:border-[#2D2D2D] hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full font-semibold">#{i + 1}</span>
                    <p className="font-semibold text-gray-800 dark:text-[#FFFFFF] text-sm">{area}</p>
                  </div>
                  <p className="text-lg font-bold text-gray-800 dark:text-white">₱{avgAreaPrice.toFixed(2)}</p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Range: ₱{cheapestForArea.toFixed(2)} – ₱{mostExpensiveForArea.toFixed(2)}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* DOE Disclaimer */}
      <div className="text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800 pt-3">
        <p>📌 Data source: Department of Energy (DOE) • Updated hourly</p>
        <p>💡 Prices vary by location and may change without notice</p>
      </div>

      {/* Price Alert Modal */}
      {priceAlertOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#1E1E1E] rounded-xl max-w-sm w-full">
            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-gray-800 dark:text-white">Set Price Alert</h3>
              <button
                onClick={() => setPriceAlertOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Fuel Type</label>
                <select
                  value={alertSettings.fuelType}
                  onChange={(e) => setAlertSettings({...alertSettings, fuelType: e.target.value})}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#2D2D2D] text-gray-800 dark:text-white text-sm"
                >
                  {fuelTypeOptions.map((ft) => <option key={ft}>{ft}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Alert when price drops by ₱{alertSettings.threshold}</label>
                <input
                  type="range"
                  min="0.5"
                  max="10"
                  step="0.5"
                  value={alertSettings.threshold}
                  onChange={(e) => setAlertSettings({...alertSettings, threshold: parseFloat(e.target.value)})}
                  className="w-full"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Threshold: ₱{alertSettings.threshold}</p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Notification Method</label>
                <select
                  value={alertSettings.method}
                  onChange={(e) => setAlertSettings({...alertSettings, method: e.target.value})}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#2D2D2D] text-gray-800 dark:text-white text-sm"
                >
                  <option>SMS</option>
                  <option>Email</option>
                  <option>In-App Notification</option>
                  <option>All of the above</option>
                </select>
              </div>
              <button
                onClick={() => {
                  setPriceAlertOpen(false);
                  alert(`✅ Alert set! You'll be notified via ${alertSettings.method} when ${alertSettings.fuelType} drops by ₱${alertSettings.threshold}`);
                }}
                className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Save Alert
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Forecast Modal */}
      {forecastModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#1E1E1E] rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800 sticky top-0 bg-white dark:bg-[#1E1E1E]">
              <h3 className="font-bold text-gray-800 dark:text-white">7-Day Fuel Price Forecast</h3>
              <button
                onClick={() => setForecastModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-4 space-y-3">
              {forecastData.map((day, i) => (
                <div key={i} className="border border-gray-100 dark:border-gray-800 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white text-sm">{day.day} • {day.temp}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{day.trend}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-800 dark:text-white text-sm">₱{getPriceForType(brandData[0], selectedFuelType, selectedArea) + (i - 2) * 0.2}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 text-xs">
                    <div className="flex-1">
                      <p className="text-gray-500 dark:text-gray-400">RON 95</p>
                      <p className="font-semibold text-gray-800 dark:text-white">₱{day.ron95.toFixed(2)}</p>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-500 dark:text-gray-400">RON 91</p>
                      <p className="font-semibold text-gray-800 dark:text-white">₱{day.ron91.toFixed(2)}</p>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-500 dark:text-gray-400">Diesel</p>
                      <p className="font-semibold text-gray-800 dark:text-white">₱{day.diesel.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mt-4">
                <p className="text-xs font-semibold text-blue-900 dark:text-blue-300 mb-1">💡 Forecast Insights</p>
                <p className="text-xs text-blue-800 dark:text-blue-400">
                  Prices are expected to dip mid-week due to lower global crude oil prices. Wednesday morning shows the best opportunity to refuel with potential savings of ₱1.50-2.00 per liter.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
