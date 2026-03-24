import React, { useState } from "react";
import { Link } from "react-router";
import { Bell, TrendingDown, MapPin, ChevronRight, X } from "lucide-react";
import { AIBadge, AITip } from "../components/AIBadge";
import { LeafletMap } from "../components/maps/LeafletMap";
import { useApp } from "../context/AppContext";

const personalizedDeals = [
  { id: "broccoli", emoji: "🥦", name: "Broccoli", price: 87, drop: 13 },
  { id: "bangus", emoji: "🐟", name: "Bangus", price: 130, drop: 20 },
  { id: "sitaw", emoji: "🫘", name: "Sitaw", price: 35, drop: 15 },
  { id: "papaya", emoji: "🍈", name: "Papaya", price: 30, drop: 15 },
];

const watchedItems = [
  { emoji: "🧄", name: "Bawang (Garlic)", price: 280, alert: "🔴 Above target ₱200" },
  { emoji: "🥩", name: "Pork Liempo", price: 290, alert: "🟡 Near target ₱280" },
  { emoji: "🍗", name: "Chicken (Whole)", price: 165, alert: "🟢 Price dropped ₱10!" },
];

const nearbyReports = [
  { id: "broccoli-kamuning", emoji: "🥦", item: "Broccoli", price: 87, market: "Kamuning Market", time: "2h ago", verified: true, lat: 14.6326, lng: 121.0227 },
  { id: "tomato-farmers", emoji: "🍅", item: "Tomato", price: 40, market: "Farmer's Market", time: "4h ago", verified: true, lat: 14.6235, lng: 121.0389 },
  { id: "garlic-cubao", emoji: "🧄", item: "Garlic", price: 260, market: "Cubao Market", time: "6h ago", verified: false, lat: 14.5887, lng: 121.0472 },
];

const quickActions = [
  { to: "/basket", emoji: "🧺", label: "My Basket", color: "#2E7D32" },
  { to: "/budget", emoji: "💰", label: "Budget", color: "#1565C0" },
  { to: "/community", emoji: "📢", label: "Alerts", color: "#E65100" },
  { to: "/community", emoji: "👥", label: "Community", color: "#7B1FA2" },
];

const featuredRecipe = {
  name: "Sinigang na Manok",
  emoji: "🥘",
  cost: 125,
  servings: 4,
  cookTime: "45 min",
  items: ["🍗 Chicken (1kg)", "🍅 Tomato (200g)", "🥬 Kangkong (1 bundle)", "🧅 Onion (2 pcs)", "🍋 Sampaloc mix (1 pack)"],
  instructions: [
    "1. Boil chicken in 6 cups of water with onion until tender (about 20 min).",
    "2. Add sampaloc soup mix and stir to dissolve.",
    "3. Add tomatoes and season with fish sauce to taste.",
    "4. Bring to a boil, then add kangkong last.",
    "5. Cook for 2 minutes, then serve hot with rice.",
  ],
};

export function SmartDashboardPage() {
  const { basket, totalCost } = useApp();
  const [recipeOpen, setRecipeOpen] = useState(false);

  const budget = 5000;
  const spent = 724; // Consistent with BudgetPlannerPage transactions total
  const progress = (spent / budget) * 100;

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Magandang umaga" : hour < 18 ? "Magandang hapon" : "Magandang gabi";

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="rounded-2xl p-6 text-white" style={{ background: "linear-gradient(135deg, #1B5E20, #2E7D32, #388E3C)" }}>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-3xl">👩</div>
          <div>
            <p className="text-green-200 text-sm">{greeting},</p>
            <h1 className="text-2xl font-bold">Maria Santos! 👋</h1>
            <p className="text-green-200 text-sm mt-0.5">Here's your personalized price snapshot</p>
          </div>
          <button className="ml-auto relative p-2 rounded-full bg-white/15 hover:bg-white/25 transition-colors">
            <Bell size={20} />
            <span className="absolute top-0.5 right-0.5 w-2.5 h-2.5 rounded-full bg-orange-400 border-2 border-green-700"></span>
          </button>
        </div>

        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Basket Items", value: basket.length, emoji: "🛒" },
            { label: "Basket Total", value: `₱${totalCost.toFixed(0)}`, emoji: "💵" },
            { label: "Budget Left", value: `₱${(budget - spent).toLocaleString()}`, emoji: "💰" },
            { label: "Savings Today", value: "₱128", emoji: "🎉" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/15 rounded-xl px-3 py-3 text-center">
              <p className="text-lg">{stat.emoji}</p>
              <p className="text-white font-bold text-lg">{stat.value}</p>
              <p className="text-green-200 text-xs">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-3">
        {quickActions.map((a) => (
          <Link key={a.to + a.label} to={a.to}
            className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-white dark:bg-[#1E1E1E] shadow-sm border border-gray-100 dark:border-[#2D2D2D] hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl" style={{ background: a.color + "20" }}>
              {a.emoji}
            </div>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300 text-center">{a.label}</span>
          </Link>
        ))}
      </div>

      {/* Personalized Deals */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-gray-800 dark:text-[#FFFFFF]">⭐ Your Personalized Deals</h2>
          <Link to="/" className="text-green-600 text-sm font-medium flex items-center gap-0.5">See all <ChevronRight size={15} /></Link>
        </div>
        <p className="text-sm text-gray-500 dark:text-[#9E9E9E] mb-3">Based on your favorites, these items are on sale:</p>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {personalizedDeals.map((d) => (
            <div key={d.id} className="flex-shrink-0 w-36 bg-white dark:bg-[#1E1E1E] rounded-2xl p-3 shadow-sm border border-gray-100 dark:border-[#2D2D2D]">
              <span className="text-4xl block mb-2">{d.emoji}</span>
              <p className="font-semibold text-gray-800 dark:text-[#FFFFFF] text-sm">{d.name}</p>
              <p className="text-green-700 font-bold text-lg">₱{d.price}</p>
              <p className="text-green-600 text-xs flex items-center gap-0.5"><TrendingDown size={11} /> -₱{d.drop}/kg</p>
            </div>
          ))}
        </div>
      </section>

      {/* Watched items */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 dark:text-[#FFFFFF] mb-3">🔔 Price Drops on Your Watch List</h2>
        <div className="space-y-2">
          {watchedItems.map((w) => (
            <div key={w.name} className="bg-white dark:bg-[#1E1E1E] rounded-xl px-4 py-3 shadow-sm border border-gray-100 dark:border-[#2D2D2D] flex items-center gap-3">
              <span className="text-2xl">{w.emoji}</span>
              <div className="flex-1">
                <p className="font-medium text-gray-700 dark:text-[#E0E0E0] text-sm">{w.name}</p>
                <p className="text-xs text-gray-400">{w.alert}</p>
              </div>
              <p className="font-bold text-gray-800 dark:text-[#FFFFFF]">₱{w.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Community Reports Nearby */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-gray-800 dark:text-[#FFFFFF] flex items-center gap-2"><MapPin size={18} /> Nearby Reports</h2>
          <Link to="/community" className="text-green-600 text-sm font-medium flex items-center gap-0.5">See all <ChevronRight size={15} /></Link>
        </div>
        
        {/* Leaflet Map - Nearby Reports */}
        <div className="mb-3 rounded-2xl overflow-hidden" style={{ position: "relative", zIndex: 1 }}>
          <LeafletMap
            markers={nearbyReports.map((r) => ({
              id: r.id,
              lat: r.lat,
              lng: r.lng,
              label: r.market,
              item: r.item,
              price: `₱${r.price}`,
              verified: r.verified,
              icon: r.emoji,
              color: r.verified ? "#2E7D32" : "#F59E0B",
            }))}
            center={[14.5995, 120.9842]}
            zoom={12}
            height="300px"
            darkMode={false}
          />
        </div>

        <div className="space-y-2">
          {nearbyReports.map((r) => (
            <div key={r.id} className="bg-white dark:bg-[#1E1E1E] rounded-xl px-4 py-3 shadow-sm border border-gray-100 dark:border-[#2D2D2D] flex items-center gap-3">
              <span className="text-xl">{r.emoji}</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700 dark:text-[#E0E0E0]">{r.item} at {r.market}</p>
                <p className="text-xs text-gray-400">{r.time} · {r.verified ? "✅ AI Verified" : "⚠️ Unverified"}</p>
              </div>
              <p className="font-bold text-green-700">₱{r.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AI Recipe + Budget Snapshot */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-[#2D2D2D]">
          <div className="flex items-center gap-2 mb-3">
            <p className="font-bold text-gray-800 dark:text-[#FFFFFF]">🍲 AI Recipe Suggestion</p>
            <AIBadge />
          </div>
          <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-[#4CAF50]/10 rounded-xl mb-3">
            <span className="text-4xl">{featuredRecipe.emoji}</span>
            <div>
              <p className="font-semibold text-gray-800 dark:text-[#FFFFFF]">{featuredRecipe.name}</p>
              <p className="text-xs text-gray-500">Uses 3 items from your basket · ₱{featuredRecipe.cost} total · ⏱ {featuredRecipe.cookTime}</p>
            </div>
          </div>
          <button
            onClick={() => setRecipeOpen(true)}
            className="w-full block text-center py-2 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition-colors"
          >
            See Full Recipe
          </button>
        </div>

        <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-[#2D2D2D]">
          <div className="flex items-center justify-between mb-3">
            <p className="font-bold text-gray-800 dark:text-[#FFFFFF]">💰 Budget Snapshot</p>
            <Link to="/budget" className="text-green-600 text-xs font-medium">Details →</Link>
          </div>
          <div className="mb-3">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-500">₱{spent.toLocaleString()} spent</span>
              <span className="text-gray-500">₱{budget.toLocaleString()} budget</span>
            </div>
            <div className="h-3 rounded-full bg-gray-100 dark:bg-[#2D2D2D] overflow-hidden">
              <div className="h-full rounded-full bg-green-600 transition-all" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-right text-xs text-green-600 mt-1">{(100 - progress).toFixed(0)}% remaining</p>
          </div>
          <AITip>On track to save ₱2,660 this month if spending continues at this pace.</AITip>
        </div>
      </div>

      {/* Recipe Detail Modal */}
      {recipeOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setRecipeOpen(false)}>
          <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl max-w-md w-full shadow-2xl max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-100 dark:border-[#2D2D2D] flex items-center justify-between sticky top-0 bg-white dark:bg-[#1E1E1E] z-10">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{featuredRecipe.emoji}</span>
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-[#FFFFFF]">{featuredRecipe.name}</h3>
                  <p className="text-xs text-gray-400">₱{featuredRecipe.cost} · {featuredRecipe.servings} servings · ⏱ {featuredRecipe.cookTime}</p>
                </div>
              </div>
              <button onClick={() => setRecipeOpen(false)} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-[#2D2D2D] transition-colors text-gray-400">
                <X size={18} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <p className="font-semibold text-gray-800 dark:text-[#FFFFFF] mb-2">🛒 Ingredients</p>
                <div className="space-y-1">
                  {featuredRecipe.items.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-gray-700 dark:text-[#E0E0E0]">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0"></span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-semibold text-gray-800 dark:text-[#FFFFFF] mb-2">👨‍🍳 Instructions</p>
                <div className="space-y-2">
                  {featuredRecipe.instructions.map((step) => (
                    <p key={step} className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{step}</p>
                  ))}
                </div>
              </div>
              <div className="bg-green-50 dark:bg-[#4CAF50]/10 rounded-xl p-3">
                <p className="text-sm text-green-700 dark:text-[#4CAF50] font-medium">💡 AI Tip: All ingredients are currently at their best prices this week!</p>
              </div>
            </div>
            <div className="px-5 pb-5">
              <button onClick={() => setRecipeOpen(false)} className="w-full py-2.5 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors">
                🍳 Start Cooking!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
