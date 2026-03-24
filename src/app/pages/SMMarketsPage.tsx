import React, { useState, useMemo } from "react";
import { Heart, ChevronDown, Search } from "lucide-react";
import { AddToBasketButton } from "../components/AddToBasketButton";
import { ProductDetailModal } from "../components/ProductDetailModal";
import { Toast } from "../components/Toast";
import { AIBadge } from "../components/AIBadge";
import { useApp } from "../context/AppContext";

const stores = [
  "SM Hypermarket Cubao",
  "SM Hypermarket Fairview",
  "SM Hypermarket Mall of Asia",
  "SM Supermarket Fairview",
  "SM Supermarket Makati",
  "SM Supermarket Megamall",
  "SM Supermarket North Edsa",
];

// Base product data (Cubao reference prices) with per-store multipliers for realistic price variations
const baseProducts = {
  "Chicken": [
    { id: "bounty-whole", emoji: "🍗", name: "Bounty Fresh Chicken Young And Tender", packPrice: 220, packSize: "800g-1000g", pricePerKg: 220 },
    { id: "mag-ground", emoji: "🍗", name: "Magnolia Chicken Lean Ground", packPrice: 173.80, packSize: "500g-550g", pricePerKg: 316 },
    { id: "mag-adobo", emoji: "🍗", name: "Magnolia Chicken Adobo Cut", packPrice: 130.90, packSize: "500g-550g", pricePerKg: 238 },
    { id: "mag-bones", emoji: "🍗", name: "Magnolia Chicken Bones", packPrice: 35.75, packSize: "500g-550g", pricePerKg: 65 },
    { id: "mag-breast", emoji: "🍗", name: "Magnolia Chicken Breast", packPrice: 145.75, packSize: "500g-550g", pricePerKg: 265 },
    { id: "mag-breast-fillet", emoji: "🍗", name: "Magnolia Chicken Breast Fillet", packPrice: 185.90, packSize: "500g-550g", pricePerKg: 338 },
    { id: "mag-drumstick", emoji: "🍗", name: "Magnolia Chicken Drumstick", packPrice: 144.65, packSize: "500g-550g", pricePerKg: 263 },
    { id: "mag-gizzard", emoji: "🍗", name: "Magnolia Chicken Gizzard", packPrice: 48.30, packSize: "250g-300g", pricePerKg: 161 },
    { id: "mag-liver", emoji: "🍗", name: "Magnolia Chicken Liver", packPrice: 70.20, packSize: "250g-300g", pricePerKg: 234 },
    { id: "mag-lollipop", emoji: "🍗", name: "Magnolia Chicken Lollipop", packPrice: 142.45, packSize: "500g-550g", pricePerKg: 259 },
    { id: "mag-skin", emoji: "🍗", name: "Magnolia Chicken Skin", packPrice: 57.60, packSize: "250g-300g", pricePerKg: 192 },
    { id: "mag-thigh-fillet", emoji: "🍗", name: "Magnolia Chicken Thigh Fillet", packPrice: 197.45, packSize: "500g-550g", pricePerKg: 359 },
    { id: "mag-thighs", emoji: "🍗", name: "Magnolia Chicken Thighs", packPrice: 150.15, packSize: "500g-550g", pricePerKg: 273 },
    { id: "mag-wings", emoji: "🍗", name: "Magnolia Chicken Wings", packPrice: 144.10, packSize: "500g-550g", pricePerKg: 262 },
    { id: "mag-quarter", emoji: "🍗", name: "Magnolia CS Chicken Quarter Cut", packPrice: 147.40, packSize: "500g-550g", pricePerKg: 268 },
    { id: "mag-whole", emoji: "🍗", name: "Magnolia Fresh Chilled Whole Chicken", packPrice: 276.00, packSize: "800g-1200g", pricePerKg: 230 },
    { id: "sm-bonus-breast", emoji: "🍗", name: "SM Bonus Chicken Breast", packPrice: 97.90, packSize: "500g-550g", pricePerKg: 178 },
    { id: "sm-bonus-breast-fillet", emoji: "🍗", name: "SM Bonus Chicken Breast Fillet", packPrice: 167.75, packSize: "500g-550g", pricePerKg: 305 },
    { id: "sm-bonus-drumstick", emoji: "🍗", name: "SM Bonus Chicken Drumstick", packPrice: 103.95, packSize: "500g-550g", pricePerKg: 189 },
    { id: "sm-bonus-leg", emoji: "🍗", name: "SM Bonus Chicken Leg Quarter", packPrice: 101.75, packSize: "500g-550g", pricePerKg: 185 },
  ],
  "Pork": [
    { id: "sm-adobo", emoji: "🛒", name: "SM Bonus Adobo Cut", packPrice: 163.35, packSize: "500g-550g", pricePerKg: 297 },
    { id: "sm-ground-pork", emoji: "🍖", name: "SM Bonus C Lean Ground Pork", packPrice: 146.30, packSize: "500g-550g", pricePerKg: 266 },
    { id: "sm-lechon", emoji: "🛒", name: "SM Bonus C Lechon Kawali", packPrice: 222.20, packSize: "500g-550g", pricePerKg: 404 },
    { id: "sm-menudo", emoji: "🛒", name: "SM Bonus C Menudo Lean", packPrice: 191.40, packSize: "500g-550g", pricePerKg: 348 },
    { id: "sm-ribs", emoji: "🍖", name: "SM Bonus C Pork American Ribs", packPrice: 824.00, packSize: "1500g-2000g", pricePerKg: 412 },
    { id: "sm-sirloin", emoji: "🍖", name: "SM Bonus C Pork Sirloin Cut", packPrice: 169.95, packSize: "500g-550g", pricePerKg: 309 },
    { id: "sm-chop", emoji: "🍖", name: "SM Bonus C Pork Chop Skinless", packPrice: 185.35, packSize: "500g-550g", pricePerKg: 337 },
    { id: "sm-ear", emoji: "🍖", name: "SM Bonus C Pork Ear", packPrice: 111.65, packSize: "500g-550g", pricePerKg: 203 },
    { id: "sm-head", emoji: "🍖", name: "SM Bonus C Pork Head Meat", packPrice: 127.60, packSize: "500g-550g", pricePerKg: 232 },
    { id: "sm-pork-liver", emoji: "🍖", name: "SM Bonus C Pork Liver", packPrice: 49.50, packSize: "250g-300g", pricePerKg: 165 },
  ],
  "Beef": [
    { id: "sm-brisket", emoji: "🥩", name: "SM Bonus Beef Brisket", packPrice: 242.00, packSize: "500g-550g", pricePerKg: 440 },
    { id: "sm-short-ribs", emoji: "🥩", name: "SM Bonus Beef Short Ribs", packPrice: 196.00, packSize: "400g-500g", pricePerKg: 392 },
    { id: "sm-breakfast-steak", emoji: "🛒", name: "SM Bonus Breakfast Steak", packPrice: 255.75, packSize: "500g-550g", pricePerKg: 465 },
    { id: "sm-shank", emoji: "🥩", name: "SM Bonus C Beef Shank", packPrice: 218.35, packSize: "500g-550g", pricePerKg: 397 },
    { id: "sm-round", emoji: "🛒", name: "SM Bonus C Ground Round", packPrice: 201.30, packSize: "500g-550g", pricePerKg: 366 },
    { id: "sm-kalitiran", emoji: "🛒", name: "SM Bonus C Kalitiran", packPrice: 244.75, packSize: "500g-550g", pricePerKg: 445 },
    { id: "sm-knee", emoji: "🛒", name: "SM Bonus C Knee Cap", packPrice: 93.50, packSize: "500g-550g", pricePerKg: 170 },
    { id: "sm-tripe", emoji: "🛒", name: "SM Bonus C Ox Tripe", packPrice: 160.60, packSize: "500g-550g", pricePerKg: 292 },
    { id: "sm-sirloin-steak", emoji: "🛒", name: "SM Bonus C Sirloin Steak", packPrice: 255.75, packSize: "500g-550g", pricePerKg: 465 },
    { id: "sm-ground-beef", emoji: "🥩", name: "SM Bonus Ground Beef", packPrice: 171.60, packSize: "500g-550g", pricePerKg: 312 },
  ],
  "Seafood": [
    { id: "llm-alamang", emoji: "🛒", name: "LLM Alamang", packPrice: 53.00, packSize: "350g-500g", pricePerKg: 106 },
    { id: "llm-alimasag", emoji: "🛒", name: "LLM Alimasag", packPrice: 500.00, packSize: "800g-1000g", pricePerKg: 500 },
    { id: "llm-alumahan", emoji: "🛒", name: "LLM Alumahan", packPrice: 181.00, packSize: "450g-500g", pricePerKg: 362 },
    { id: "llm-shell", emoji: "🛒", name: "LLM Assorted Shell", packPrice: 83.50, packSize: "400g-500g", pricePerKg: 167 },
    { id: "llm-asuhos", emoji: "🛒", name: "LLM Asuhos", packPrice: 178.00, packSize: "450g-500g", pricePerKg: 356 },
    { id: "llm-bangus-large", emoji: "🐟", name: "LLM Bangus Large", packPrice: 177.75, packSize: "600g-750g", pricePerKg: 237 },
    { id: "llm-dilis", emoji: "🛒", name: "LLM Dilis", packPrice: 78.00, packSize: "350g-500g", pricePerKg: 156 },
    { id: "llm-tilapia-large", emoji: "🐟", name: "LLM Tilapia Large", packPrice: 79.00, packSize: "350g-500g", pricePerKg: 158 },
    { id: "mq-bangus", emoji: "🐟", name: "MQ Bangus Boneless", packPrice: 224.40, packSize: "480g-600g", pricePerKg: 374 },
    { id: "mq-salmon-belly", emoji: "🛒", name: "MQ Salmon Belly", packPrice: 206.00, packSize: "450g-500g", pricePerKg: 412 },
  ],
  "Vegetables": [
    { id: "global-beans", emoji: "🫘", name: "Global Baguio Beans", packPrice: 51.60, packSize: "250g-300g", pricePerKg: 172 },
    { id: "global-calamansi", emoji: "🍋", name: "Global Calamansi", packPrice: 78.00, packSize: "350g-400g", pricePerKg: 195 },
    { id: "global-carrot", emoji: "🥕", name: "Global Carrots", packPrice: 82.50, packSize: "450g-500g", pricePerKg: 218 },
    { id: "global-cucumber", emoji: "🛒", name: "Global Cucumber", packPrice: 71.00, packSize: "400g-500g", pricePerKg: 158 },
    { id: "global-eggplant", emoji: "🥚", name: "Global Eggplant", packPrice: 78.00, packSize: "500g-600g", pricePerKg: 130 },
    { id: "global-garlic", emoji: "🧄", name: "Global Garlic", packPrice: 94.40, packSize: "350g-400g", pricePerKg: 236 },
    { id: "global-ginger", emoji: "🫚", name: "Global Ginger", packPrice: 85.40, packSize: "300g-350g", pricePerKg: 244 },
    { id: "global-kangkong", emoji: "🥬", name: "Global Kangkong", packPrice: 38.00, packSize: "350g-400g", pricePerKg: 95 },
    { id: "global-okra", emoji: "🛒", name: "Global Okra", packPrice: 75.60, packSize: "350g-400g", pricePerKg: 189 },
    { id: "global-onion", emoji: "🧅", name: "Global Onion Red Loc", packPrice: 66.00, packSize: "350g-400g", pricePerKg: 146 },
  ],
  "Fruits": [
    { id: "ch-mango-green", emoji: "🥭", name: "CH Mango Green Large", packPrice: 216.00, packSize: "900g-1000g", pricePerKg: 216 },
    { id: "ch-banana-lacatan", emoji: "🍌", name: "Choice Harvest Banana Lacatan", packPrice: 162.50, packSize: "1100g-1300g", pricePerKg: 125 },
    { id: "ch-grapes", emoji: "🍌", name: "Choice Harvest Flames Seedless Grapes", packPrice: 289.60, packSize: "700g-800g", pricePerKg: 362 },
    { id: "ch-apple", emoji: "🍌", name: "Choice Harvest Green Apple Big", packPrice: 233.60, packSize: "700g-800g", pricePerKg: 292 },
    { id: "ch-lemon", emoji: "🍌", name: "Choice Harvest Imported Lemon Sale", packPrice: 75.00, packSize: "400g-500g", pricePerKg: 150 },
    { id: "dizon-watermelon", emoji: "🍉", name: "Dizon Green Watermelon Sugarbaby", packPrice: 252.00, packSize: "1000g-3000g", pricePerKg: 84 },
    { id: "dizon-papaya", emoji: "🥭", name: "Dizon Solo Papaya Air Freight", packPrice: 91.00, packSize: "500g-700g", pricePerKg: 130 },
    { id: "nvd-avocado", emoji: "🥑", name: "NVD Avocado", packPrice: 265.00, packSize: "900g-1000g", pricePerKg: 265 },
    { id: "nvd-banana-lakatan", emoji: "🍌", name: "NVD Banana Lakatan", packPrice: 162.50, packSize: "1100g-1300g", pricePerKg: 125 },
    { id: "nvd-guyabano", emoji: "🍌", name: "NVD Guyabano", packPrice: 112.00, packSize: "500g-1000g", pricePerKg: 112 },
  ],
};

// Price multipliers for different locations - realistic variations
const storeMultipliers: Record<string, number> = {
  "SM Hypermarket Cubao": 1.0,
  "SM Hypermarket Fairview": 0.98,
  "SM Hypermarket Mall of Asia": 1.02,
  "SM Supermarket Fairview": 1.05,
  "SM Supermarket Makati": 1.06,
  "SM Supermarket Megamall": 1.04,
  "SM Supermarket North Edsa": 1.03,
};

// Generate store products with price variations
const generateStoreProducts = () => {
  const generated: Record<string, Record<string, any[]>> = {};
  
  stores.forEach(store => {
    const multiplier = storeMultipliers[store] || 1.0;
    generated[store] = {};
    
    Object.entries(baseProducts).forEach(([category, products]) => {
      generated[store][category] = products.map(product => ({
        ...product,
        packPrice: Math.round(product.packPrice * multiplier * 100) / 100,
        pricePerKg: Math.round(product.pricePerKg * multiplier * 100) / 100,
      }));
    });
  });
  
  return generated;
};

const storeProducts = generateStoreProducts();

const categories = ["🐔 Chicken", "🐷 Pork", "🥩 Beef", "🐟 Seafood", "🥬 Vegetables", "🍌 Fruits"];
const sortOptions = ["₱/kg ↑", "₱/kg ↓", "Pack ↑", "Name"];

export function SMMarketsPage() {
  const [selectedStore, setSelectedStore] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [activeCategory, setActiveCategory] = useState("🐔 Chicken");
  const [sortBy, setSortBy] = useState("₱/kg ↑");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { basketToastVisible } = useApp();

  // Wet market average prices for comparison
  const wetMarketAverages: { [key: string]: number } = {
    "Chicken": 220, "Pork": 280, "Beef": 380, "Seafood": 300,
    "Broccoli": 120, "Kangkong": 60, "Tomato": 110, "Garlic": 280,
  };

  const toggleFav = (id: string) => setFavorites((f) => f.includes(id) ? f.filter((x) => x !== id) : [...f, id]);

  const storeData = selectedStore ? storeProducts[selectedStore as keyof typeof storeProducts] : null;
  const categoryKey = activeCategory.split(" ")[1];
  const categoryProducts = storeData ? storeData[categoryKey as keyof typeof storeData] || [] : [];

  const sortedProducts = useMemo(() => {
    let result = [...categoryProducts];
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(query));
    }
    
    // Apply sorting
    if (sortBy === "₱/kg ↑") result.sort((a, b) => a.pricePerKg - b.pricePerKg);
    else if (sortBy === "₱/kg ↓") result.sort((a, b) => b.pricePerKg - a.pricePerKg);
    else if (sortBy === "Pack ↑") result.sort((a, b) => {
      const aSize = parseInt(a.packSize.split("g")[0]);
      const bSize = parseInt(b.packSize.split("g")[0]);
      return aSize - bSize;
    });
    else if (sortBy === "Name") result.sort((a, b) => a.name.localeCompare(b.name));
    return result;
  }, [categoryProducts, sortBy, searchQuery]);

  const getAISavings = (pricePerKg: number, category: string) => {
    const refCategory = category.split(" ")[1];
    const avgPrice = wetMarketAverages[refCategory] || pricePerKg * 1.15;
    const savings = ((avgPrice - pricePerKg) / avgPrice * 100).toFixed(0);
    return { savings: parseInt(savings), avgPrice, isCheaper: pricePerKg < avgPrice };
  };

  return (
    <div className="space-y-5">
      {/* Store Selector */}
      <div className="relative">
        <button
          onClick={() => setOpenDropdown(!openDropdown)}
          className="w-full px-4 py-3 bg-white dark:bg-[#1E1E1E] rounded-xl border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold flex items-center justify-between hover:border-green-400 transition-colors"
        >
          <span>📍 {selectedStore ? selectedStore : "SELECT SM STORE"}</span>
          <ChevronDown size={18} className={`transition-transform ${openDropdown ? "rotate-180" : ""}`} />
        </button>

        {/* Dropdown Menu */}
        {openDropdown && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#1E1E1E] rounded-xl border border-gray-200 dark:border-gray-600 shadow-lg z-50 max-h-72 overflow-y-auto">
            {stores.map((store) => (
              <button
                key={store}
                onClick={() => {
                  setSelectedStore(store);
                  setOpenDropdown(false);
                  setActiveCategory("🐔 Chicken");
                  setSortBy("₱/kg ↑");
                }}
                className={`w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-[#2D2D2D] border-b border-gray-100 dark:border-[#2D2D2D] last:border-b-0 transition-colors ${selectedStore === store ? "bg-green-50 dark:bg-green-900/20" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <span className={`${selectedStore === store ? "text-green-600 dark:text-green-400 font-semibold" : "text-gray-700 dark:text-gray-300"}`}>
                    📍 {store}
                  </span>
                  {selectedStore === store && <span className="text-green-600">✓</span>}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedStore && (
        <>
          {/* Store Header */}
          <div className="bg-white dark:bg-[#1E1E1E] rounded-xl p-4 border border-gray-100 dark:border-[#2D2D2D]">
            <p className="font-bold text-lg text-gray-800 dark:text-[#FFFFFF]">📍 {selectedStore}</p>
            <p className="text-xs text-gray-500">Updated: 3/24/2026</p>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search chicken breast, pork, beef, vegetables..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-white dark:bg-[#2D2D2D] border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white text-sm outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? "bg-green-600 text-white"
                    : "bg-white dark:bg-[#1E1E1E] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:border-green-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">{sortedProducts.length} items</p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-lg text-sm border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1E1E1E] text-gray-700 dark:text-gray-300 outline-none"
            >
              {sortOptions.map((opt) => (
                <option key={opt} value={opt}>
                  Sort: {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Product Grid */}
          {sortedProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-3xl mb-3">🛒</p>
              <p className="text-gray-600 dark:text-gray-400 font-medium">No products found</p>
              <p className="text-sm text-gray-500 mt-1">Try selecting a different category or store.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {sortedProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => setSelectedProduct({ id: product.id, emoji: product.emoji, name: product.name, price: product.pricePerKg, usualPrice: product.pricePerKg * 1.1, status: "STABLE", category: activeCategory })}
                  className="bg-white dark:bg-[#1E1E1E] rounded-xl p-3 shadow-sm border border-gray-100 dark:border-[#2D2D2D] hover:shadow-md transition-all cursor-pointer active:scale-95"
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-3xl">{product.emoji}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFav(product.id);
                      }}
                      className="text-gray-300 hover:text-red-400 transition-colors"
                    >
                      <Heart size={16} fill={favorites.includes(product.id) ? "#f87171" : "none"} stroke={favorites.includes(product.id) ? "#f87171" : "currentColor"} />
                    </button>
                  </div>

                  <p className="font-semibold text-gray-800 dark:text-[#FFFFFF] text-sm mb-1 line-clamp-2">{product.name}</p>
                  <p className="text-xs text-gray-400 mb-2">Pack: {product.packSize}</p>
                  {/* AI Comparison Badge */}
                  {(() => {
                    const aiData = getAISavings(product.pricePerKg, activeCategory);
                    return aiData.isCheaper && (
                      <div className="mb-2 p-2 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                        <p className="text-xs text-green-700 dark:text-green-400 font-semibold">🤖 AI tip: {aiData.savings}% cheaper than wet market!</p>
                      </div>
                    );
                  })()}
                  <div className="flex items-end justify-between mb-3">
                    <div>
                      <p className="text-gray-400 text-xs">₱{product.packPrice}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-700 text-sm">₱{product.pricePerKg}/kg</p>
                    </div>
                  </div>

                  <div onClick={(e) => e.stopPropagation()}>
                    <AddToBasketButton
                      productId={product.id}
                      productData={{
                        emoji: product.emoji,
                        name: product.name,
                        price: product.pricePerKg,
                        usualPrice: product.pricePerKg * 1.1,
                        unit: "kg",
                      }}
                      variant="default"
                      className="w-full text-xs py-1.5"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Product Detail Modal */}
          {selectedProduct && (
            <ProductDetailModal
              isOpen={!!selectedProduct}
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
            />
          )}

          {/* Toast Notification */}
          <Toast isVisible={basketToastVisible} onDismiss={() => {}} message="Added to My Basket!" type="success" />

          {/* Footer Disclaimer */}
          <div className="border-t border-gray-200 dark:border-[#2D2D2D] pt-4 mt-6">
            <p className="text-xs text-gray-400 text-center">
              📋 Prices from smmarkets.ph. Actual prices may vary in-store.
            </p>
            <p className="text-xs text-gray-400 text-center mt-1">
              Updated: 3/24/2026
            </p>
          </div>
        </>
      )}
    </div>
  );
}
