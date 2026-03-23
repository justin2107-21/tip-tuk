import React, { useState } from "react";
import { Search } from "lucide-react";
import { AIBadge, AITip } from "../components/AIBadge";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const seasonalData: Record<string, Array<{ item: string; emoji: string; priceRange: string; status: "peak" | "starting" | "ending" | "off"; forecast?: string }>> = {
  Mar: [
    { item: "Mangga (Mango)", emoji: "🥭", priceRange: "₱80–₱120/kg", status: "peak", forecast: "Expected to drop 10% in 2 weeks" },
    { item: "Sibuyas Dahon (Spring Onion)", emoji: "🌿", priceRange: "₱40–₱60/kg", status: "peak", forecast: "Prices stable" },
    { item: "Kamatis (Tomato)", emoji: "🍅", priceRange: "₱40–₱70/kg", status: "starting", forecast: "Peak season next month" },
    { item: "Ampalaya (Bitter Gourd)", emoji: "🥒", priceRange: "₱35–₱60/kg", status: "peak", forecast: "Good time to buy and preserve" },
    { item: "Kangkong", emoji: "🥬", priceRange: "₱20–₱35/kg", status: "peak", forecast: "Abundant supply expected" },
    { item: "Broccoli", emoji: "🥦", priceRange: "₱80–₱120/kg", status: "ending", forecast: "Price rising soon – buy now!" },
    { item: "Strawberry", emoji: "🍓", priceRange: "₱180–₱250/kg", status: "ending", forecast: "Last month of season" },
  ],
  Apr: [
    { item: "Mangga (Mango)", emoji: "🥭", priceRange: "₱60–₱90/kg", status: "peak", forecast: "Peak season – best prices" },
    { item: "Pakwan (Watermelon)", emoji: "🍉", priceRange: "₱25–₱40/kg", status: "starting", forecast: "Great summer deal incoming" },
    { item: "Kamatis (Tomato)", emoji: "🍅", priceRange: "₱35–₱65/kg", status: "peak", forecast: "Very good supply" },
    { item: "Pinya (Pineapple)", emoji: "🍍", priceRange: "₱40–₱70/kg", status: "peak", forecast: "Peak harvest month" },
  ],
  May: [
    { item: "Pakwan (Watermelon)", emoji: "🍉", priceRange: "₱20–₱35/kg", status: "peak" },
    { item: "Pinya (Pineapple)", emoji: "🍍", priceRange: "₱35–₱60/kg", status: "peak" },
    { item: "Mangga (Mango)", emoji: "🥭", priceRange: "₱50–₱80/kg", status: "ending" },
  ],
};

const monthProduce: Record<string, string[]> = {
  Jan: ["🥦", "🥕", "🍅"],
  Feb: ["🥦", "🍓", "🥬"],
  Mar: ["🥭", "🥒", "🍅", "🥬"],
  Apr: ["🥭", "🍉", "🍍", "🍅"],
  May: ["🍉", "🍍", "🥭"],
  Jun: ["🍌", "🥭", "🌽"],
  Jul: ["🍌", "🌽", "🥬"],
  Aug: ["🌽", "🥔", "🥬"],
  Sep: ["🥔", "🍠", "🥬"],
  Oct: ["🍠", "🥦", "🍊"],
  Nov: ["🥦", "🍊", "🍅"],
  Dec: ["🥦", "🍊", "🍓"],
};

const statusColors = { peak: "bg-green-100 text-green-700", starting: "bg-yellow-100 text-yellow-700", ending: "bg-orange-100 text-orange-700", off: "bg-gray-100 text-gray-400" };
const statusLabel = { peak: "🟢 Peak Season", starting: "🟡 Starting", ending: "🟠 Ending Soon", off: "⬜ Off Season" };

export function SeasonalCalendarPage() {
  const [selectedMonth, setSelectedMonth] = useState("Mar");
  const [search, setSearch] = useState("");

  const items = seasonalData[selectedMonth] || seasonalData["Mar"];
  const filtered = items.filter((i) => i.item.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-[#FFFFFF] flex items-center gap-2">🌱 Seasonal Calendar</h1>
        <p className="text-gray-500 dark:text-[#9E9E9E] text-sm mt-1">Know what's in season to buy cheaper, fresher produce</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search produce..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1E1E1E] text-sm outline-none focus:border-green-400"
        />
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-2">
        {months.map((m) => (
          <button key={m} onClick={() => setSelectedMonth(m)}
            className={`flex flex-col items-center p-2 rounded-xl transition-all ${
              selectedMonth === m ? "bg-green-600 text-white shadow-md" : "bg-white dark:bg-[#1E1E1E] border border-gray-100 dark:border-[#2D2D2D] text-gray-600 dark:text-gray-300 hover:bg-green-50"
            }`}>
            <span className="text-xs font-semibold mb-1">{m}</span>
            <div className="flex flex-wrap gap-0.5 justify-center">
              {(monthProduce[m] || []).slice(0, 3).map((emoji, i) => (
                <span key={i} className="text-sm leading-none">{emoji}</span>
              ))}
            </div>
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(statusLabel).map(([k, v]) => (
          <span key={k} className={`text-xs px-3 py-1 rounded-full font-medium ${statusColors[k as keyof typeof statusColors]}`}>{v}</span>
        ))}
      </div>

      {/* AI Forecast */}
      <AITip>
        Based on DA historical data + AI predictions: <strong>Mango</strong> will be at peak cheapest mid-April. <strong>Broccoli</strong> price rising – buy this week!
      </AITip>

      {/* Selected month items */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 dark:text-[#FFFFFF] mb-3">
          {selectedMonth} {new Date().getFullYear()} – In Season Now
        </h2>
        <div className="space-y-3">
          {filtered.map((item) => (
            <div key={item.item} className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-[#2D2D2D]">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{item.emoji}</span>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 dark:text-[#FFFFFF]">{item.item}</p>
                  <p className="text-sm text-gray-500">{item.priceRange}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[item.status]}`}>
                  {statusLabel[item.status]}
                </span>
              </div>
              {item.forecast && (
                <div className="flex items-center gap-2 mt-2 text-sm text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 rounded-lg px-3 py-1.5">
                  <span>🤖</span>
                  <span>{item.forecast}</span>
                  <AIBadge size="sm" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-gray-400 text-center">📡 Based on DA historical data and AI predictions</p>
    </div>
  );
}
