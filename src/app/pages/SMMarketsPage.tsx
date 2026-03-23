import React, { useState, useMemo } from "react";
import { Heart, Plus } from "lucide-react";
import { AIBadge, AITip } from "../components/AIBadge";
import { useApp } from "../context/AppContext";

const branches = [
  "SM Hypermarket Cubao",
  "SM Hypermarket North EDSA",
  "SM Hypermarket Southmall",
  "SM Supermarket Makati",
  "SM Supermarket QC",
];

const categories = ["All", "Chicken", "Pork", "Beef", "Seafood", "Vegetables", "Fruits"];

// Pack size in grams for sorting
const products: Record<string, Array<{ id: string; emoji: string; name: string; pack: string; packSizeG: number; packPrice: number; pricePerKg: number; aiTip?: string }>> = {
  All: [
    { id: "sm-chicken-whole", emoji: "🍗", name: "SM Chicken Whole", pack: "800g-1kg", packSizeG: 900, packPrice: 155, pricePerKg: 165, aiTip: "15% cheaper than wet market!" },
    { id: "sm-pork-belly", emoji: "🥩", name: "SM Pork Liempo", pack: "500g-550g", packSizeG: 525, packPrice: 145, pricePerKg: 290 },
    { id: "sm-beef-brisket", emoji: "🥩", name: "SM Beef Brisket", pack: "400g-450g", packSizeG: 425, packPrice: 195, pricePerKg: 450 },
    { id: "sm-bangus", emoji: "🐟", name: "SM Bangus (Whole)", pack: "600g-700g", packSizeG: 650, packPrice: 95, pricePerKg: 148 },
    { id: "sm-shrimp", emoji: "🦐", name: "SM Suahe Shrimp", pack: "500g", packSizeG: 500, packPrice: 195, pricePerKg: 390, aiTip: "Flash sale today only!" },
    { id: "sm-broccoli", emoji: "🥦", name: "SM Broccoli", pack: "300g", packSizeG: 300, packPrice: 45, pricePerKg: 150 },
    { id: "sm-tomato", emoji: "🍅", name: "SM Tomato Pack", pack: "500g", packSizeG: 500, packPrice: 35, pricePerKg: 70 },
    { id: "sm-mango", emoji: "🥭", name: "SM Carabao Mango", pack: "1kg", packSizeG: 1000, packPrice: 89, pricePerKg: 89 },
  ],
  Chicken: [
    { id: "sm-chicken-whole", emoji: "🍗", name: "SM Chicken Whole", pack: "800g-1kg", packSizeG: 900, packPrice: 155, pricePerKg: 165, aiTip: "15% cheaper than wet market!" },
    { id: "sm-chicken-breast", emoji: "🍗", name: "SM Chicken Breast", pack: "500g-550g", packSizeG: 525, packPrice: 99, pricePerKg: 185 },
    { id: "sm-chicken-legs", emoji: "🍗", name: "SM Chicken Legs", pack: "700g-800g", packSizeG: 750, packPrice: 115, pricePerKg: 155 },
  ],
  Pork: [
    { id: "sm-pork-belly", emoji: "🥩", name: "SM Pork Liempo", pack: "500g-550g", packSizeG: 525, packPrice: 145, pricePerKg: 290 },
    { id: "sm-pork-kasim", emoji: "🥩", name: "SM Pork Kasim", pack: "500g", packSizeG: 500, packPrice: 120, pricePerKg: 240 },
  ],
  Beef: [
    { id: "sm-beef-brisket", emoji: "🥩", name: "SM Beef Brisket", pack: "400g-450g", packSizeG: 425, packPrice: 195, pricePerKg: 450 },
    { id: "sm-beef-bulalo", emoji: "🥩", name: "SM Bulalo Cut", pack: "500g", packSizeG: 500, packPrice: 250, pricePerKg: 500 },
  ],
  Seafood: [
    { id: "sm-bangus", emoji: "🐟", name: "SM Bangus (Whole)", pack: "600g-700g", packSizeG: 650, packPrice: 95, pricePerKg: 148 },
    { id: "sm-shrimp", emoji: "🦐", name: "SM Suahe Shrimp", pack: "500g", packSizeG: 500, packPrice: 195, pricePerKg: 390, aiTip: "Flash sale today only!" },
    { id: "sm-tilapia", emoji: "🐟", name: "SM Tilapia (Cleaned)", pack: "500g", packSizeG: 500, packPrice: 65, pricePerKg: 130 },
  ],
  Vegetables: [
    { id: "sm-broccoli", emoji: "🥦", name: "SM Broccoli", pack: "300g", packSizeG: 300, packPrice: 45, pricePerKg: 150 },
    { id: "sm-tomato", emoji: "🍅", name: "SM Tomato Pack", pack: "500g", packSizeG: 500, packPrice: 35, pricePerKg: 70 },
    { id: "sm-sayote", emoji: "🥬", name: "SM Sayote", pack: "2 pcs", packSizeG: 400, packPrice: 25, pricePerKg: 50 },
  ],
  Fruits: [
    { id: "sm-mango", emoji: "🥭", name: "SM Carabao Mango", pack: "1kg", packSizeG: 1000, packPrice: 89, pricePerKg: 89 },
    { id: "sm-banana", emoji: "🍌", name: "SM Lakatan Banana", pack: "1kg", packSizeG: 1000, packPrice: 65, pricePerKg: 65 },
  ],
};

export function SMMarketsPage() {
  const [search, setSearch] = useState("");
  const [branch, setBranch] = useState(branches[0]);
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("₱/kg ↑");
  const [favorites, setFavorites] = useState<string[]>([]);
  const { addToBasket } = useApp();

  const toggleFav = (id: string) => setFavorites((f) => f.includes(id) ? f.filter((x) => x !== id) : [...f, id]);

  const sortedFiltered = useMemo(() => {
    const items = products[category] || products["All"];
    let result = items.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()));
    if (sort === "₱/kg ↑") result = [...result].sort((a, b) => a.pricePerKg - b.pricePerKg);
    else if (sort === "₱/kg ↓") result = [...result].sort((a, b) => b.pricePerKg - a.pricePerKg);
    else if (sort === "Pack ↑") result = [...result].sort((a, b) => a.packSizeG - b.packSizeG);
    else if (sort === "Name") result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    return result;
  }, [category, search, sort]);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">🛒 SM Markets</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Compare prices across SM branches</p>
      </div>

      {/* Search + Branch */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search SM items..."
          className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 outline-none focus:border-green-400 text-sm"
        />
        <select
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 outline-none text-sm min-w-0 sm:min-w-56"
        >
          {branches.map((b) => <option key={b}>{b}</option>)}
        </select>
      </div>

      {/* Last updated + Sort */}
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>📡 Last updated: {new Date().toLocaleDateString("en-PH", { month: "long", day: "numeric", year: "numeric" })}</span>
        <select value={sort} onChange={(e) => setSort(e.target.value)}
          className="px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 outline-none">
          {["₱/kg ↑", "₱/kg ↓", "Pack ↑", "Name"].map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setCategory(cat)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              category === cat ? "bg-green-600 text-white" : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:bg-green-50"
            }`}>{cat}</button>
        ))}
      </div>

      {/* AI Tip */}
      <AITip>
        Prices at <strong>{branch}</strong> are on average <strong>8% cheaper</strong> than nearby wet markets for chicken and pork. Best shopping day: <strong>Tuesday morning</strong>.
      </AITip>

      {/* Product grid */}
      {sortedFiltered.length === 0 ? (
        <div className="text-center py-12">
          <span className="text-5xl">🔍</span>
          <p className="text-gray-500 mt-3">No results found for "{search}"</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sortedFiltered.map((item) => (
            <div key={item.id} className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all">
              {item.aiTip && (
                <div className="flex items-center gap-1 mb-2 text-xs text-purple-700 bg-purple-50 dark:bg-purple-900/30 rounded-lg px-2 py-1">
                  🤖 <span>{item.aiTip}</span>
                </div>
              )}
              <div className="flex items-start justify-between mb-2">
                <span className="text-4xl">{item.emoji}</span>
                <button onClick={() => toggleFav(item.id)} className="text-gray-300 hover:text-red-400 transition-colors">
                  <Heart size={18} fill={favorites.includes(item.id) ? "#f87171" : "none"} stroke={favorites.includes(item.id) ? "#f87171" : "currentColor"} />
                </button>
              </div>
              <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm mb-1">{item.name}</p>
              <p className="text-xs text-gray-400 mb-2">Pack: {item.pack}</p>
              <div className="flex items-end justify-between mb-3">
                <div>
                  <p className="text-gray-400 text-xs">Pack price</p>
                  <p className="font-bold text-gray-700 dark:text-gray-200">₱{item.packPrice}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-xs">Per kg</p>
                  <p className="font-bold text-green-700 text-lg">₱{item.pricePerKg}</p>
                </div>
              </div>
              <button
                onClick={() => addToBasket({ id: item.id, emoji: item.emoji, name: item.name, price: item.pricePerKg, usualPrice: item.pricePerKg * 1.1, unit: "kg" })}
                className="w-full flex items-center justify-center gap-1 bg-green-600 text-white py-2 rounded-xl text-sm font-medium hover:bg-green-700 transition-colors"
              >
                <Plus size={14} /> Add to Basket
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Page Disclaimer */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
        <p className="text-xs text-gray-400 text-center">
          Prices from smmarkets.ph. Actual prices may vary in-store.
        </p>
      </div>
    </div>
  );
}
