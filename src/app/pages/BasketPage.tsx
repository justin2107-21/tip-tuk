import React, { useState } from "react";
import { Trash2, Share2, Sparkles, Plus, Minus, X } from "lucide-react";
import { AIBadge, AITip } from "../components/AIBadge";
import { useApp } from "../context/AppContext";

const recipes = [
  {
    name: "Sinigang na Manok",
    emoji: "🍲",
    items: ["🍗 Chicken", "🍅 Tomato", "🥬 Kangkong"],
    cost: 125,
    servings: 4,
    cookTime: "45 min",
    instructions: "1. Boil chicken with sampaloc. 2. Add tomatoes and onions. 3. Add kangkong last and season to taste.",
  },
  {
    name: "Chopsuey",
    emoji: "🥦",
    items: ["🥦 Broccoli", "🥬 Pechay", "🥕 Carrot"],
    cost: 85,
    servings: 3,
    cookTime: "20 min",
    instructions: "1. Sauté garlic and onion. 2. Add veggies in order of hardness. 3. Season with oyster sauce and serve.",
  },
  {
    name: "Tortang Talong",
    emoji: "🍆",
    items: ["🍆 Eggplant", "🥚 Eggs"],
    cost: 45,
    servings: 2,
    cookTime: "15 min",
    instructions: "1. Grill eggplant until charred. 2. Peel skin gently. 3. Dip in beaten egg and pan-fry until golden.",
  },
];

export function BasketPage() {
  const { basket, removeFromBasket, updateQuantity, totalCost } = useApp();
  const [recipeOpen, setRecipeOpen] = useState(false);

  const savings = basket.reduce((sum, b) => sum + Math.max(0, b.usualPrice - b.price) * b.quantity, 0);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Estimated Total</p>
        <p className="text-4xl font-bold text-green-700 mb-1">₱{totalCost.toFixed(2)}</p>
        {savings > 0 && (
          <p className="text-sm text-green-600 font-medium mb-3">🎉 You're saving ₱{savings.toFixed(2)} from usual prices!</p>
        )}
        <div className="flex flex-wrap gap-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Share2 size={15} /> Share Basket
          </button>
          <button
            onClick={() => setRecipeOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium transition-colors"
            style={{ background: "linear-gradient(135deg, #7B1FA2, #9C27B0)" }}
          >
            <Sparkles size={15} /> 🤖 Generate Tipid Recipe
            <AIBadge size="sm" />
          </button>
        </div>
      </div>

      {/* AI Tips */}
      <div className="space-y-2">
        <AITip>3 items in your basket have price alerts active. Broccoli 🥦 is ₱13 cheaper than usual!</AITip>
        <AITip>Switching to local onions could save ₱120 this month.</AITip>
      </div>

      {/* Basket items */}
      {basket.length === 0 ? (
        <div className="text-center py-16">
          <span className="text-6xl">🧺</span>
          <p className="text-gray-500 mt-3 text-lg">Your basket is empty!</p>
          <p className="text-gray-400 text-sm">Add items from the Home page to get started.</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          {basket.map((item, idx) => {
            const priceDiff = item.price - item.usualPrice;
            return (
              <div key={item.id} className={`flex items-center gap-3 px-4 py-4 ${idx !== basket.length - 1 ? "border-b border-gray-50 dark:border-gray-700" : ""}`}>
                <span className="text-3xl">{item.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 dark:text-gray-100">{item.name}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-500">₱{item.price}/{item.unit}</p>
                    {priceDiff < 0 && (
                      <span className="text-xs text-green-600 font-medium">↓₱{Math.abs(priceDiff)} from usual</span>
                    )}
                    {priceDiff > 0 && (
                      <span className="text-xs text-red-500 font-medium">↑₱{priceDiff} from usual</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 0.5)}
                    className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    <Minus size={14} />
                  </button>
                  <span className="w-10 text-center font-semibold text-gray-800 dark:text-gray-100 text-sm">{item.quantity}{item.unit}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 0.5)}
                    className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    <Plus size={14} />
                  </button>
                </div>
                <p className="font-bold text-gray-800 dark:text-gray-100 w-20 text-right">₱{(item.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => removeFromBasket(item.id)} className="text-gray-300 hover:text-red-400 transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>
            );
          })}
          <div className="px-4 py-4 bg-green-50 dark:bg-green-900/20 flex items-center justify-between">
            <p className="font-bold text-gray-700 dark:text-gray-200 text-lg">Total</p>
            <p className="font-bold text-green-700 text-2xl">₱{totalCost.toFixed(2)}</p>
          </div>
        </div>
      )}

      {/* Recipe Modal */}
      {recipeOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setRecipeOpen(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full shadow-2xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between sticky top-0 bg-white dark:bg-gray-800 z-10">
              <div>
                <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">🤖 Tipid Recipes from Your Basket</h3>
                <p className="text-xs text-gray-400 mt-0.5">Generated using your basket items + best deals</p>
              </div>
              <div className="flex items-center gap-2">
                <AIBadge />
                <button
                  onClick={() => setRecipeOpen(false)}
                  className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-400"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
            <div className="p-5 space-y-4">
              {recipes.map((r) => (
                <div key={r.name} className="border border-gray-100 dark:border-gray-700 rounded-xl p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-4xl">{r.emoji}</span>
                    <div>
                      <p className="font-bold text-gray-800 dark:text-gray-100">{r.name}</p>
                      <div className="flex gap-3 text-sm text-gray-500 mt-0.5 flex-wrap">
                        <span>₱{r.cost} total</span>
                        <span>·</span>
                        <span>~₱{(r.cost / r.servings).toFixed(0)}/serving</span>
                        <span>·</span>
                        <span>{r.servings} servings</span>
                        <span>·</span>
                        <span>⏱ {r.cookTime}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {r.items.map((item) => (
                      <span key={item} className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 font-medium">{item}</span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{r.instructions}</p>
                  <button className="w-full py-2 rounded-xl bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors">
                    🍳 Cook Now
                  </button>
                </div>
              ))}
            </div>
            <div className="px-5 pb-5">
              <button onClick={() => setRecipeOpen(false)} className="w-full py-2 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
