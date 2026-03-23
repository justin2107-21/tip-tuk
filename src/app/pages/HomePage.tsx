import React, { useState, useMemo } from "react";
import { Link } from "react-router";
import { TrendingDown, TrendingUp, Bell, Plus, Heart, ChevronRight } from "lucide-react";
import { AIBadge, AITip } from "../components/AIBadge";
import { useApp } from "../context/AppContext";

// Mock data with categories and drop periods for 7D/30D/90D filtering
const allBestDeals = [
  { id: "kangkong", emoji: "🥬", name: "Kangkong", price: 25, usual: 40, savings: 15, unit: "kg", period: "7D" },
  { id: "broccoli", emoji: "🥦", name: "Broccoli", price: 87, usual: 100, savings: 13, unit: "kg", period: "7D" },
  { id: "ampalaya", emoji: "🥒", name: "Ampalaya", price: 40, usual: 60, savings: 20, unit: "kg", period: "7D" },
  { id: "banana", emoji: "🍌", name: "Lakatan Banana", price: 65, usual: 80, savings: 15, unit: "kg", period: "30D" },
  { id: "papaya", emoji: "🍈", name: "Papaya", price: 30, usual: 45, savings: 15, unit: "kg", period: "30D" },
  { id: "sitaw", emoji: "🫘", name: "Sitaw", price: 35, usual: 50, savings: 15, unit: "kg", period: "30D" },
  { id: "pechay", emoji: "🥬", name: "Pechay", price: 28, usual: 45, savings: 17, unit: "kg", period: "90D" },
  { id: "tilapia", emoji: "🐟", name: "Tilapia", price: 115, usual: 140, savings: 25, unit: "kg", period: "90D" },
  { id: "camote", emoji: "🍠", name: "Kamote", price: 22, usual: 35, savings: 13, unit: "kg", period: "90D" },
];

const expensiveItems = [
  { id: "garlic", emoji: "🧄", name: "Bawang (Garlic)", price: 280, usual: 180, increase: 55 },
  { id: "onion", emoji: "🧅", name: "Red Onion", price: 120, usual: 80, increase: 50 },
  { id: "pork", emoji: "🥩", name: "Pork Liempo", price: 290, usual: 250, increase: 16 },
  { id: "lemon", emoji: "🍋", name: "Calamansi", price: 90, usual: 60, increase: 50 },
];

// Full Bantay Presyo list with categories
const fullItemList = [
  { id: "chicken", emoji: "🍗", name: "Chicken (Whole)", price: 165, usual: 175, status: "MURA", category: "Meats" },
  { id: "eggs", emoji: "🥚", name: "Itlog (Eggs)", price: 8, usual: 8, status: "STABLE", unit: "pc", category: "Meats" },
  { id: "rice", emoji: "🍚", name: "Sinandomeng Rice", price: 52, usual: 50, status: "MAHAL", category: "Rice" },
  { id: "tilapia2", emoji: "🐟", name: "Tilapia", price: 120, usual: 130, status: "MURA", category: "Fish" },
  { id: "tomato", emoji: "🍅", name: "Kamatis (Tomato)", price: 45, usual: 50, status: "MURA", category: "Vegetables" },
  { id: "eggplant", emoji: "🍆", name: "Talong (Eggplant)", price: 35, usual: 35, status: "STABLE", category: "Vegetables" },
  { id: "potato", emoji: "🥔", name: "Patatas (Potato)", price: 75, usual: 65, status: "MAHAL", category: "Vegetables" },
  { id: "carrot", emoji: "🥕", name: "Karot (Carrot)", price: 55, usual: 60, status: "MURA", category: "Vegetables" },
  { id: "pechay2", emoji: "🥬", name: "Pechay", price: 30, usual: 35, status: "MURA", category: "Vegetables" },
  { id: "mango", emoji: "🥭", name: "Carabao Mango", price: 95, usual: 85, status: "MAHAL", category: "Fruits" },
  { id: "garlic2", emoji: "🧄", name: "Bawang (Garlic)", price: 280, usual: 180, status: "MAHAL", category: "Spices" },
  { id: "onion2", emoji: "🧅", name: "Sibuyas (Onion)", price: 120, usual: 80, status: "MAHAL", category: "Spices" },
  { id: "ginger", emoji: "🫚", name: "Luya (Ginger)", price: 90, usual: 80, status: "MAHAL", category: "Spices" },
  { id: "bangus", emoji: "🐟", name: "Bangus (Milkfish)", price: 155, usual: 165, status: "MURA", category: "Fish" },
  { id: "pork2", emoji: "🥩", name: "Pork Liempo", price: 290, usual: 250, status: "MAHAL", category: "Meats" },
  { id: "beef", emoji: "🥩", name: "Beef Brisket", price: 450, usual: 420, status: "MAHAL", category: "Meats" },
  { id: "kangkong2", emoji: "🥬", name: "Kangkong", price: 25, usual: 40, status: "MURA", category: "Vegetables" },
  { id: "broccoli2", emoji: "🥦", name: "Broccoli", price: 87, usual: 100, status: "MURA", category: "Vegetables" },
  { id: "banana2", emoji: "🍌", name: "Lakatan Banana", price: 65, usual: 80, status: "MURA", category: "Fruits" },
  { id: "papaya2", emoji: "🍈", name: "Papaya", price: 30, usual: 45, status: "MURA", category: "Fruits" },
];

const PAGE_SIZE = 10;
const categories = ["All", "Meats", "Fish", "Vegetables", "Fruits", "Rice", "Spices"];
const periods = ["7D", "30D", "90D"];

const carousel = [
  { emoji: "🥬", name: "Kangkong", price: 25, savings: 15 },
  { emoji: "🥦", name: "Broccoli", price: 87, savings: 13 },
  { emoji: "🥒", name: "Ampalaya", price: 40, savings: 20 },
];

export function HomePage() {
  const [activePeriod, setActivePeriod] = useState("7D");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Best Deal");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const { addToBasket } = useApp();

  const toggleFav = (id: string) => setFavorites((f) => f.includes(id) ? f.filter((x) => x !== id) : [...f, id]);

  const statusColor = (s: string) => s === "MURA" ? "bg-green-100 text-green-700" : s === "MAHAL" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700";
  const statusDot = (s: string) => s === "MURA" ? "🟢" : s === "MAHAL" ? "🔴" : "🟡";

  // Filter best deals by period (7D = only 7D items, 30D = 7D + 30D, 90D = all)
  const filteredDeals = useMemo(() => {
    if (activePeriod === "7D") return allBestDeals.filter((i) => i.period === "7D");
    if (activePeriod === "30D") return allBestDeals.filter((i) => i.period === "7D" || i.period === "30D");
    return allBestDeals;
  }, [activePeriod]);

  // Filter and sort Bantay Presyo items
  const filteredItems = useMemo(() => {
    let items = activeCategory === "All" ? fullItemList : fullItemList.filter((i) => i.category === activeCategory);
    if (sortBy === "Name") items = [...items].sort((a, b) => a.name.localeCompare(b.name));
    else if (sortBy === "Price ↑") items = [...items].sort((a, b) => a.price - b.price);
    else if (sortBy === "Price ↓") items = [...items].sort((a, b) => b.price - a.price);
    else if (sortBy === "Best Deal") items = [...items].sort((a, b) => (b.usual - b.price) - (a.usual - a.price));
    return items;
  }, [activeCategory, sortBy]);

  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  const loadMore = () => setVisibleCount((c) => c + PAGE_SIZE);

  return (
    <div className="space-y-6">
      {/* Hero / Carousel */}
      <div className="rounded-2xl overflow-hidden shadow-md" style={{ background: "linear-gradient(135deg, #1B5E20, #2E7D32)" }}>
        <div className="p-6 md:p-8">
          <h1 className="text-white text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
            Ano ang mura ngayon? 🛒
          </h1>
          <p className="text-green-100 text-base mb-6">Find the best prices for your pamilihan needs today.</p>

          {/* Carousel card */}
          <div className="bg-white/15 backdrop-blur rounded-xl p-4 mb-4 flex items-center gap-4">
            <div className="text-5xl">{carousel[carouselIdx].emoji}</div>
            <div className="flex-1">
              <p className="text-white font-semibold text-lg">{carousel[carouselIdx].name}</p>
              <p className="text-green-200 text-sm">Current price</p>
              <p className="text-yellow-300 text-2xl font-bold">₱{carousel[carouselIdx].price}/kg</p>
            </div>
            <div className="text-right">
              <span className="inline-block bg-green-400 text-green-900 font-bold px-3 py-1 rounded-full text-sm">
                Save ₱{carousel[carouselIdx].savings}/kg
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {carousel.map((_, i) => (
              <button key={i} onClick={() => setCarouselIdx(i)}
                className={`h-2 rounded-full transition-all ${i === carouselIdx ? "bg-white w-6" : "bg-white/40 w-2"}`} />
            ))}
            <Link to="/sm-markets" className="ml-auto flex items-center gap-1 bg-white text-green-800 font-semibold px-4 py-2 rounded-full text-sm hover:bg-green-50 transition-colors">
              View All Best Deals <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* Best Deals Section */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-gray-800 dark:text-[#FFFFFF] flex items-center gap-2">
            🔥 Best Deals
          </h2>
          <div className="flex gap-1">
            {periods.map((p) => (
              <button key={p} onClick={() => setActivePeriod(p)}
                className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors ${
                  activePeriod === p ? "bg-green-600 text-white" : "bg-gray-100 dark:bg-[#1E1E1E] text-gray-600 dark:text-gray-300 hover:bg-green-50"
                }`}>{p}</button>
            ))}
          </div>
        </div>

        {filteredDeals.length === 0 ? (
          <p className="text-gray-400 text-sm py-6 text-center">No deals found for this period.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredDeals.map((item) => (
              <div key={item.id} className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-[#2D2D2D] hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">{item.emoji}</span>
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-[#FFFFFF]">{item.name}</p>
                      <p className="text-gray-400 text-xs">per {item.unit || "kg"}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-2 py-1 rounded-full bg-green-100 text-green-700">🟢 MURA</span>
                </div>
                <div className="flex items-end gap-2 mb-3">
                  <span className="text-2xl font-bold text-green-700">₱{item.price}</span>
                  <span className="text-sm text-gray-400 line-through">₱{item.usual}</span>
                  <span className="text-xs text-green-600 font-medium ml-auto flex items-center gap-0.5">
                    <TrendingDown size={13} /> Save ₱{item.savings}/kg
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => addToBasket({ id: item.id, emoji: item.emoji, name: item.name, price: item.price, usualPrice: item.usual, unit: item.unit || "kg" })}
                    className="flex-1 flex items-center justify-center gap-1 bg-green-600 text-white py-2 rounded-xl text-sm font-medium hover:bg-green-700 transition-colors"
                  >
                    <Plus size={14} /> Add to Basket
                  </button>
                  <button className="flex items-center gap-1 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-600 text-orange-500 text-sm hover:bg-orange-50 transition-colors">
                    <Bell size={14} /> <AIBadge size="sm" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Getting Expensive */}
      <section>
        <h2 className="text-xl font-bold text-gray-800 dark:text-[#FFFFFF] flex items-center gap-2 mb-3">
          ⚠️ Getting Expensive
        </h2>
        <div className="space-y-2">
          {expensiveItems.map((item) => (
            <div key={item.id} className="bg-white dark:bg-[#1E1E1E] rounded-xl px-4 py-3 shadow-sm border border-red-50 dark:border-[#2D2D2D] flex items-center gap-3">
              <span className="text-2xl">{item.emoji}</span>
              <div className="flex-1">
                <p className="font-semibold text-gray-800 dark:text-[#FFFFFF]">{item.name}</p>
                <p className="text-xs text-gray-400">Usual: ₱{item.usual}/kg</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-red-600 text-lg">₱{item.price}</p>
                <span className="text-xs font-bold text-red-500 flex items-center justify-end gap-0.5">
                  <TrendingUp size={12} /> +{item.increase}%
                </span>
              </div>
              <span className="text-xs font-bold px-2 py-1 rounded-full bg-red-100 text-red-700">🔴 MAHAL</span>
            </div>
          ))}
        </div>
      </section>

      {/* AI Price Predictor Teaser */}
      <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-2xl p-4 flex items-center gap-4">
        <div className="text-4xl">🤖</div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-semibold text-purple-800 dark:text-purple-300">AI Price Predictor</p>
            <AIBadge />
          </div>
          <p className="text-sm text-purple-700 dark:text-purple-400">
            Broccoli price predicted to <strong>drop ₱15/kg</strong> next week. Sitaw expected to rise soon.
          </p>
        </div>
        <Link to="/seasonal" className="flex-shrink-0 px-4 py-2 bg-purple-600 text-white rounded-xl text-sm font-medium hover:bg-purple-700 transition-colors">
          View Forecast
        </Link>
      </div>

      {/* Bantay Presyo */}
      <section>
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <h2 className="text-xl font-bold text-gray-800 dark:text-[#FFFFFF]">📊 Bantay Presyo</h2>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-1.5 bg-white dark:bg-[#1E1E1E] text-gray-700 dark:text-[#E0E0E0] outline-none"
          >
            <option>Best Deal</option>
            <option>Name</option>
            <option>Price ↑</option>
            <option>Price ↓</option>
          </select>
        </div>

        {/* Category filter chips */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-3">
          {categories.map((cat) => (
            <button key={cat} onClick={() => { setActiveCategory(cat); setVisibleCount(PAGE_SIZE); }}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat ? "bg-green-600 text-white" : "bg-white dark:bg-[#1E1E1E] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:bg-green-50"
              }`}>{cat}</button>
          ))}
        </div>

        <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-sm border border-gray-100 dark:border-[#2D2D2D] overflow-hidden">
          {visibleItems.length === 0 ? (
            <p className="text-center text-gray-400 py-8 text-sm">No items found.</p>
          ) : (
            visibleItems.map((item, idx) => (
              <div key={item.id} className={`flex items-center gap-3 px-4 py-3 ${idx !== visibleItems.length - 1 ? "border-b border-gray-50 dark:border-[#2D2D2D]" : ""} hover:bg-gray-50 dark:hover:bg-[#2D2D2D]/50 transition-colors`}>
                <span className="text-2xl">{item.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 dark:text-[#FFFFFF] truncate">{item.name}</p>
                  <p className="text-xs text-gray-400">Usual: ₱{item.usual}/kg</p>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${statusColor(item.status)}`}>
                  {statusDot(item.status)} {item.status}
                </span>
                <span className="font-bold text-gray-800 dark:text-[#FFFFFF] text-base w-16 text-right">₱{item.price}</span>
                <button onClick={() => toggleFav(item.id)} className="text-gray-300 hover:text-red-400 transition-colors">
                  <Heart size={16} fill={favorites.includes(item.id) ? "#f87171" : "none"} stroke={favorites.includes(item.id) ? "#f87171" : "currentColor"} />
                </button>
                <button
                  onClick={() => addToBasket({ id: item.id, emoji: item.emoji, name: item.name, price: item.price, usualPrice: item.usual, unit: "kg" })}
                  className="w-8 h-8 rounded-full bg-green-100 text-green-700 hover:bg-green-600 hover:text-white flex items-center justify-center transition-colors"
                >
                  <Plus size={15} />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="flex justify-center mt-4">
          {hasMore ? (
            <button
              onClick={loadMore}
              className="px-6 py-2 rounded-full border-2 border-green-600 text-green-700 font-semibold text-sm hover:bg-green-50 transition-colors"
            >
              Load More Items ({filteredItems.length - visibleCount} remaining)
            </button>
          ) : (
            <p className="text-xs text-gray-400 py-2">All {filteredItems.length} items shown</p>
          )}
        </div>
      </section>

      {/* Page Disclaimer */}
      <div className="border-t border-gray-200 dark:border-[#2D2D2D] pt-4 mt-4">
        <p className="text-xs text-gray-400 text-center">
          📋 Source: DA Bantay Presyo official price monitoring (90 commodities). Not a government app.
        </p>
      </div>
    </div>
  );
}