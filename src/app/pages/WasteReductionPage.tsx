import React, { useState } from "react";
import { Bell, Clock } from "lucide-react";
import { AIBadge, AITip } from "../components/AIBadge";

const surplusStores = [
  {
    id: 1,
    store: "SM Hypermarket Cubao",
    address: "EDSA corner Main Ave, Cubao, QC",
    distance: "1.5 km",
    items: [
      { name: "Pork Liempo", emoji: "🥩", original: 290, discounted: 200, expiry: "Expires tomorrow" },
      { name: "Chicken Whole", emoji: "🍗", original: 175, discounted: 120, expiry: "Best before today" },
      { name: "Broccoli", emoji: "🥦", original: 120, discounted: 75, expiry: "Best before today" },
    ],
  },
  {
    id: 2,
    store: "Landmark Trinoma",
    address: "EDSA cor. North Ave, QC",
    distance: "2.3 km",
    items: [
      { name: "Beef Brisket", emoji: "🥩", original: 450, discounted: 300, expiry: "Expires in 2 days" },
      { name: "Bangus (Whole)", emoji: "🐟", original: 160, discounted: 100, expiry: "Best before today" },
    ],
  },
  {
    id: 3,
    store: "Robinsons Magnolia",
    address: "Aurora Blvd, QC",
    distance: "3.1 km",
    items: [
      { name: "Pechay Bundle", emoji: "🥬", original: 45, discounted: 25, expiry: "Best before today" },
      { name: "Tomatoes (500g)", emoji: "🍅", original: 55, discounted: 35, expiry: "Expires tomorrow" },
      { name: "Lakatan Banana", emoji: "🍌", original: 80, discounted: 50, expiry: "Best before today" },
    ],
  },
];

const markdownSchedule = [
  { day: "Monday", time: "7:00 PM", store: "SM Cubao", category: "Meats", predicted: true },
  { day: "Tuesday", time: "6:30 PM", store: "Landmark Trinoma", category: "Bakery", predicted: true },
  { day: "Wednesday", time: "7:00 PM", store: "SM Cubao", category: "Seafood", predicted: true },
  { day: "Thursday", time: "6:00 PM", store: "Robinsons Magnolia", category: "Vegetables", predicted: false },
  { day: "Friday", time: "8:00 PM", store: "All SM Branches", category: "Meats + Veggies", predicted: true },
];

const flashSales = [
  { store: "SM Cubao", item: "🥩 Pork Kasim", discount: 45, timeLeft: "2h 15m" },
  { store: "Landmark Trinoma", item: "🍗 Chicken Legs", discount: 38, timeLeft: "45m" },
];

export function WasteReductionPage() {
  const [alerts, setAlerts] = useState<number[]>([]);
  const toggleAlert = (id: number) => setAlerts((a) => a.includes(id) ? a.filter((x) => x !== id) : [...a, id]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-[#FFFFFF] flex items-center gap-2">♻️ Waste Reduction Alerts</h1>
        <p className="text-gray-500 dark:text-[#9E9E9E] text-sm mt-1">Surplus markdown alerts to save money & reduce food waste</p>
      </div>

      {/* Flash Sales */}
      {flashSales.length > 0 && (
        <div className="rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, #E65100, #F57C00)" }}>
          <div className="px-4 py-3 bg-black/10">
            <p className="text-white font-bold flex items-center gap-2">⚡ FLASH SALES – Happening Now!</p>
          </div>
          <div className="p-4 space-y-2">
            {flashSales.map((sale, i) => (
              <div key={i} className="bg-white/15 rounded-xl px-4 py-3 flex items-center gap-3">
                <span className="text-2xl">{sale.item.split(" ")[0]}</span>
                <div className="flex-1">
                  <p className="text-white font-semibold">{sale.item} at {sale.store}</p>
                  <p className="text-orange-100 text-sm">{sale.discount}% off · Ends in {sale.timeLeft}</p>
                </div>
                <Clock size={16} className="text-orange-200" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Markdown Predictor */}
      <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">🤖</span>
          <p className="font-semibold text-purple-800 dark:text-purple-300">AI Markdown Predictor</p>
          <AIBadge />
        </div>
        <div className="space-y-2">
          {markdownSchedule.map((m, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-white dark:bg-[#1E1E1E] rounded-xl">
              <div className="w-14 text-center">
                <p className="text-xs text-gray-400">{m.day}</p>
                <p className="text-sm font-bold text-purple-700">{m.time}</p>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700 dark:text-[#E0E0E0]">{m.store}</p>
                <p className="text-xs text-gray-400">{m.category} markdown</p>
              </div>
              {m.predicted && <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">🤖 Predicted</span>}
              <button className="p-1.5 rounded-lg bg-orange-50 text-orange-500 hover:bg-orange-100 transition-colors">
                <Bell size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Nearby Surplus */}
      <h2 className="text-lg font-bold text-gray-800 dark:text-[#FFFFFF]">🏪 Nearby Surplus Items</h2>

      <div className="space-y-4">
        {surplusStores.map((store) => (
          <div key={store.id} className="bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-sm border border-gray-100 dark:border-[#2D2D2D] overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 dark:border-[#2D2D2D] flex items-start justify-between">
              <div>
                <p className="font-bold text-gray-800 dark:text-[#FFFFFF]">{store.store}</p>
                <p className="text-xs text-gray-400 mt-0.5">📍 {store.address} · {store.distance}</p>
              </div>
              <button
                onClick={() => toggleAlert(store.id)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-sm font-medium transition-colors ${
                  alerts.includes(store.id)
                    ? "bg-orange-500 text-white"
                    : "bg-orange-50 dark:bg-orange-900/20 text-orange-600 border border-orange-200"
                }`}
              >
                <Bell size={13} /> {alerts.includes(store.id) ? "Alert On" : "Get Alert"}
              </button>
            </div>
            <div className="divide-y divide-gray-50 dark:divide-gray-700">
              {store.items.map((item) => {
                const discount = Math.round((1 - item.discounted / item.original) * 100);
                return (
                  <div key={item.name} className="px-4 py-3 flex items-center gap-3">
                    <span className="text-2xl">{item.emoji}</span>
                    <div className="flex-1">
                      <p className="font-medium text-gray-700 dark:text-[#E0E0E0] text-sm">{item.name}</p>
                      <p className="text-xs text-orange-500 flex items-center gap-1"><Clock size={10} /> {item.expiry}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400 line-through">₱{item.original}</p>
                      <p className="font-bold text-green-700">₱{item.discounted}</p>
                    </div>
                    <span className="text-xs font-bold px-2 py-1 rounded-full bg-green-100 text-green-700">-{discount}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Recipe suggestions */}
      <AITip>
        Use soon-to-expire <strong>Chicken</strong> and <strong>Broccoli</strong> from SM Cubao to make Chicken Chopsuey – saves ₱85 vs buying fresh!
      </AITip>

      {/* STEP 5: AI Recipe Suggestion */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-5 border border-amber-200 dark:border-amber-800">
        <div className="flex items-start gap-3 mb-3">
          <span className="text-2xl">🍳</span>
          <div className="flex-1">
            <p className="font-semibold text-gray-800 dark:text-white text-sm flex items-center gap-2">STEP 5: AI Recipe Suggestion – Use What You Buy <AIBadge /></p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-[#2D2D2D] rounded-xl p-4 border border-amber-100 dark:border-amber-800">
          <p className="text-xs text-gray-600 dark:text-gray-300 mb-3 leading-relaxed">
            At the bottom of the page, we have an AI Recipe Suggestion that ties everything together:
          </p>
          <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-3 mb-3 border-l-4 border-amber-500">
            <p className="font-semibold text-amber-900 dark:text-amber-100 text-sm">✨ AI Recipe: Chicken Chop Suey</p>
            <p className="text-xs text-amber-700 dark:text-amber-200 mt-1">Use soon-to-expire Chicken and Broccoli from SM Cubao to make Chicken Chopsuey – <span className="font-bold">saves ₱85 vs buying fresh!</span></p>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-300 mb-2 font-semibold">How does this work? The AI looks at:</p>
          <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1 mb-3 list-disc list-inside">
            <li>Surplus items available near the user</li>
            <li>Items already in the user's basket</li>
            <li>Matches them with recipes from our database</li>
          </ul>
          <p className="text-xs text-gray-600 dark:text-gray-300">
            <strong>Why is this valuable?</strong> It solves a common problem: "I bought discounted items, but now I don't know what to cook with them." Our AI gives users a ready-made meal plan using the discounted items they just bought.
          </p>
        </div>

        {/* Recipe Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          <div className="bg-white dark:bg-[#2D2D2D] rounded-lg p-3 border border-amber-100 dark:border-amber-800">
            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">🛒 Ingredients from Surplus</p>
            <div className="space-y-1 text-xs">
              <p className="text-gray-600 dark:text-gray-400">✓ Chicken - ₱120 (was ₱175)</p>
              <p className="text-gray-600 dark:text-gray-400">✓ Broccoli - ₱75 (was ₱120)</p>
              <p className="text-gray-600 dark:text-gray-400">• Garlic, Soy sauce, Oil - ₱30</p>
              <p className="font-semibold text-green-700 dark:text-green-400 mt-2">Total: ₱225</p>
            </div>
          </div>
          <div className="bg-white dark:bg-[#2D2D2D] rounded-lg p-3 border border-amber-100 dark:border-amber-800">
            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">💰 Money Saved</p>
            <div className="space-y-1 text-xs">
              <p className="text-gray-600 dark:text-gray-400">Normal price: ₱310</p>
              <p className="text-gray-600 dark:text-gray-400">Your price: ₱225</p>
              <p className="font-bold text-green-700 dark:text-green-400 mt-2">Savings: ₱85 (27%)</p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-2 mt-4">
          <button className="flex-1 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold text-sm transition-colors">
            📖 View Full Recipe
          </button>
          <button className="flex-1 py-2.5 bg-amber-100 dark:bg-amber-900/40 hover:bg-amber-200 dark:hover:bg-amber-800/60 text-amber-700 dark:text-amber-300 rounded-lg font-semibold text-sm transition-colors">
            🛒 Add to Basket
          </button>
        </div>
      </div>
    </div>
  );
}
