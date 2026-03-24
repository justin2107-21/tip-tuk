import React, { useState, useMemo } from "react";
import { Trash2, Share2, Sparkles, Plus, Minus, X, Check, ShoppingCart } from "lucide-react";
import { AIBadge, AITip } from "../components/AIBadge";
import { useApp } from "../context/AppContext";

interface RecipeIngredient {
  id: string;
  name: string;
  emoji: string;
}

interface Recipe {
  id: string;
  name: string;
  emoji: string;
  ingredients: RecipeIngredient[];
  cost: number;
  servings: number;
  cookTime: string;
  instructions: string[];
}

const recipes: Recipe[] = [
  {
    id: "sinigang-manok",
    name: "Sinigang na Manok",
    emoji: "🍲",
    ingredients: [
      { id: "chicken", name: "Chicken", emoji: "🍗" },
      { id: "tomato", name: "Tomato", emoji: "🍅" },
      { id: "onion", name: "Onions", emoji: "🧅" },
      { id: "kangkong", name: "Kangkong", emoji: "🥬" },
      { id: "sampaloc-mix", name: "Sampaloc Mix", emoji: "🌳" },
    ],
    cost: 125,
    servings: 4,
    cookTime: "45 min",
    instructions: [
      "1. Boil chicken in 6 cups of water with onion until tender (about 20 min).",
      "2. Add sampaloc soup mix and stir to dissolve.",
      "3. Add tomatoes and season with fish sauce to taste.",
      "4. Bring to a boil, then add kangkong last.",
      "5. Cook for 2 minutes, then serve hot with rice.",
    ],
  },
  {
    id: "chopsuey",
    name: "Mixed Vegetables Stir-fry (Chopsuey)",
    emoji: "🥦",
    ingredients: [
      { id: "broccoli", name: "Broccoli", emoji: "🥦" },
      { id: "carrot", name: "Carrot", emoji: "🥕" },
      { id: "onion", name: "Onions", emoji: "🧅" },
      { id: "cabbage", name: "Cabbage", emoji: "🥬" },
    ],
    cost: 85,
    servings: 3,
    cookTime: "20 min",
    instructions: [
      "1. Heat oil in a wok or large pan over high heat.",
      "2. Sauté garlic and onion for 1 minute.",
      "3. Add harder vegetables first (carrots, broccoli).",
      "4. Stir continuously for 3-4 minutes.",
      "5. Season with oyster sauce and soy sauce, then serve hot.",
    ],
  },
  {
    id: "tortang-talong",
    name: "Tortang Talong (Eggplant Omelette)",
    emoji: "🍆",
    ingredients: [
      { id: "eggplant", name: "Eggplant", emoji: "🍆" },
      { id: "eggs", name: "Eggs", emoji: "🥚" },
      { id: "onion", name: "Onions", emoji: "🧅" },
    ],
    cost: 45,
    servings: 2,
    cookTime: "15 min",
    instructions: [
      "1. Grill eggplant over an open flame until charred on all sides.",
      "2. Let cool slightly, then peel off the charred skin gently.",
      "3. Beat eggs with salt and pepper.",
      "4. Dip each eggplant in the beaten egg mixture.",
      "5. Pan-fry in oil until golden on both sides.",
    ],
  },
  {
    id: "broccoli-chicken",
    name: "Chicken Broccoli Stir-fry",
    emoji: "🍗",
    ingredients: [
      { id: "chicken", name: "Chicken", emoji: "🍗" },
      { id: "broccoli", name: "Broccoli", emoji: "🥦" },
      { id: "onion", name: "Onions", emoji: "🧅" },
      { id: "garlic", name: "Garlic", emoji: "🧄" },
    ],
    cost: 110,
    servings: 3,
    cookTime: "25 min",
    instructions: [
      "1. Cut chicken into bite-sized pieces.",
      "2. Heat oil in a wok, sauté garlic for 30 seconds.",
      "3. Add chicken and cook until golden.",
      "4. Add broccoli and onions, stir fry for 5 minutes.",
      "5. Season with soy sauce and serve hot.",
    ],
  },
];

export function BasketPage() {
  const { basket, removeFromBasket, updateQuantity, totalCost, addToBasket } = useApp();
  const [recipeOpen, setRecipeOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showCookModal, setShowCookModal] = useState(false);

  const savings = basket.reduce((sum, b) => sum + Math.max(0, b.usualPrice - b.price) * b.quantity, 0);

  // Function to check if an ingredient is in the basket
  const isIngredientInBasket = (ingredientId: string): boolean => {
    return basket.some((item) => item.id === ingredientId);
  };

  // Function to get the basket item for an ingredient
  const getBasketItem = (ingredientId: string) => {
    return basket.find((item) => item.id === ingredientId);
  };

  // Filter recipes based on criteria: at least 2 ingredients OR 50% of ingredients in basket
  const matchedRecipes = useMemo(() => {
    return recipes
      .map((recipe) => {
        const matchingIngredients = recipe.ingredients.filter((ing) => isIngredientInBasket(ing.id));
        const matchPercentage = (matchingIngredients.length / recipe.ingredients.length) * 100;
        const matchCount = matchingIngredients.length;

        // Show recipe if: at least 2 ingredients match OR 50% or more ingredients match
        if (matchCount >= 2 || matchPercentage >= 50) {
          return { recipe, matchCount, matchPercentage, matchingIngredients };
        }
        return null;
      })
      .filter((item) => item !== null) as Array<{
        recipe: Recipe;
        matchCount: number;
        matchPercentage: number;
        matchingIngredients: RecipeIngredient[];
      }>;
  }, [basket]);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-[#2D2D2D]">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-gray-500 dark:text-[#9E9E9E] text-sm">🛒 MY BASKET</p>
            <p className="text-4xl font-bold text-green-700 mt-1">₱{totalCost.toFixed(2)}</p>
          </div>
          {savings > 0 && (
            <div className="text-right">
              <p className="text-sm text-green-600 font-medium">🎉 Saving</p>
              <p className="text-2xl font-bold text-green-700">₱{savings.toFixed(2)}</p>
            </div>
          )}
        </div>

        {/* Recipe availability indicator */}
        {matchedRecipes.length > 0 && (
          <p className="text-sm text-green-600 font-medium mb-3">
            🍳 {matchedRecipes.length} recipe{matchedRecipes.length !== 1 ? "s" : ""} available using your basket items
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-[#2D2D2D] transition-colors">
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

      {/* AI Tips - Recipe focused */}
      {matchedRecipes.length > 0 ? (
        <div className="space-y-2">
          <AITip>
            🤖 AI Tip: With {basket.slice(0, 2).map((b) => b.name).join(" and ")} in your basket, try our{" "}
            {matchedRecipes[0].recipe.name}! Save ₱45 vs buying takeout.
          </AITip>
          {basket.some((b) => b.price < b.usualPrice) && (
            <AITip>
              {basket
                .filter((b) => b.price < b.usualPrice)
                .slice(0, 1)
                .map(
                  (b) =>
                    `${b.name} is ₱${Math.abs(b.usualPrice - b.price)} cheaper than usual! Buy now.`
                )[0]}
            </AITip>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <AITip>3 items in your basket have price alerts active. Broccoli 🥦 is ₱13 cheaper than usual!</AITip>
          <AITip>Switching to local onions could save ₱120 this month.</AITip>
        </div>
      )}

      {/* Basket items */}
      {basket.length === 0 ? (
        <div className="text-center py-16">
          <span className="text-6xl">🧺</span>
          <p className="text-gray-500 mt-3 text-lg">Your basket is empty!</p>
          <p className="text-gray-400 text-sm">Add items from the Home page to get started.</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-sm border border-gray-100 dark:border-[#2D2D2D] overflow-hidden">
          {basket.map((item, idx) => {
            const priceDiff = item.price - item.usualPrice;
            return (
              <div key={item.id} className={`flex items-center gap-3 px-4 py-4 ${idx !== basket.length - 1 ? "border-b border-gray-50 dark:border-[#2D2D2D]" : ""}`}>
                <span className="text-3xl">{item.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 dark:text-[#FFFFFF]">{item.name}</p>
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
                    className="w-8 h-8 rounded-full bg-gray-100 dark:bg-[#2D2D2D] flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#1E1E1E] transition-colors">
                    <Minus size={14} />
                  </button>
                  <span className="w-10 text-center font-semibold text-gray-800 dark:text-[#FFFFFF] text-sm">{item.quantity}{item.unit}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 0.5)}
                    className="w-8 h-8 rounded-full bg-gray-100 dark:bg-[#2D2D2D] flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#1E1E1E] transition-colors">
                    <Plus size={14} />
                  </button>
                </div>
                <p className="font-bold text-gray-800 dark:text-[#FFFFFF] w-20 text-right">₱{(item.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => removeFromBasket(item.id)} className="text-gray-300 hover:text-red-400 transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>
            );
          })}
          <div className="px-4 py-4 bg-green-50 dark:bg-[#4CAF50]/10 flex items-center justify-between">
            <p className="font-bold text-gray-700 dark:text-[#E0E0E0] text-lg">Total</p>
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
            className="bg-white dark:bg-[#1E1E1E] rounded-2xl max-w-2xl w-full shadow-2xl max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-gray-100 dark:border-[#2D2D2D] flex items-center justify-between sticky top-0 bg-white dark:bg-[#1E1E1E] z-10">
              <div>
                <h3 className="font-bold text-lg text-gray-800 dark:text-[#FFFFFF]">🤖 Tipid Recipes from Your Basket</h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  {matchedRecipes.length} recipe{matchedRecipes.length !== 1 ? "s" : ""} available based on your items
                </p>
              </div>
              <button
                onClick={() => setRecipeOpen(false)}
                className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-[#2D2D2D] transition-colors text-gray-400"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5 space-y-4">
              {matchedRecipes.length > 0 ? (
                matchedRecipes.map(({ recipe, matchCount, matchPercentage }) => (
                  <div
                    key={recipe.id}
                    className="border border-gray-100 dark:border-[#2D2D2D] rounded-xl p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-4xl">{recipe.emoji}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-bold text-gray-800 dark:text-[#FFFFFF]">{recipe.name}</p>
                          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded font-medium">
                            🤖 AI Suggested
                          </span>
                        </div>
                        <div className="flex gap-3 text-sm text-gray-500 flex-wrap">
                          <span>₱{recipe.cost} total</span>
                          <span>·</span>
                          <span>~₱{(recipe.cost / recipe.servings).toFixed(0)}/serving</span>
                          <span>·</span>
                          <span>{recipe.servings} servings</span>
                          <span>·</span>
                          <span>⏱ {recipe.cookTime}</span>
                        </div>
                      </div>
                    </div>

                    {/* Ingredients with status */}
                    <div className="mb-3 space-y-2">
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">INGREDIENTS:</p>
                      {recipe.ingredients.map((ing) => {
                        const inBasket = isIngredientInBasket(ing.id);
                        const basketItem = getBasketItem(ing.id);
                        return (
                          <div
                            key={ing.id}
                            className="flex items-center gap-2 text-sm py-1.5 px-2 rounded bg-gray-50 dark:bg-[#2D2D2D]"
                          >
                            {inBasket ? (
                              <>
                                <Check size={16} className="text-green-600" />
                                <span className="text-green-600 font-medium">
                                  {ing.emoji} {ing.name}
                                </span>
                                <span className="text-xs text-gray-500">(in basket)</span>
                              </>
                            ) : (
                              <>
                                <ShoppingCart size={16} className="text-orange-500" />
                                <span className="text-gray-700 dark:text-gray-300">
                                  {ing.emoji} {ing.name}
                                </span>
                                <button
                                  onClick={() => {
                                    if (!basketItem) {
                                      addToBasket({
                                        id: ing.id,
                                        emoji: ing.emoji,
                                        name: ing.name,
                                        price: 50,
                                        usualPrice: 60,
                                        unit: "pcs",
                                      });
                                    }
                                  }}
                                  className="ml-auto text-xs px-2 py-0.5 rounded bg-orange-100 text-orange-700 font-medium hover:bg-orange-200 transition-colors"
                                >
                                  Add
                                </button>
                              </>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => {
                        setSelectedRecipe(recipe);
                        setShowCookModal(true);
                      }}
                      className="w-full py-2.5 rounded-xl bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors"
                    >
                      🍳 Cook Now
                    </button>
                  </div>
                ))
              ) : (
                /* No recipes found state */
                <div className="text-center py-8">
                  <span className="text-5xl mb-3 block">🍳</span>
                  <p className="font-bold text-lg text-gray-800 dark:text-[#FFFFFF] mb-2">
                    No matching recipes found
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Try adding these best deals to your basket to unlock recipes:
                  </p>
                  <div className="space-y-2 mb-4">
                    {[
                      { emoji: "🥦", name: "Broccoli", price: "87/kg" },
                      { emoji: "🧅", name: "Onions", price: "94/kg" },
                      { emoji: "🥚", name: "Eggs", price: "12 each" },
                    ].map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between p-2 rounded bg-gray-50 dark:bg-[#2D2D2D]"
                      >
                        <span className="text-sm">
                          {item.emoji} {item.name} (₱{item.price})
                        </span>
                        <button className="text-xs px-2 py-1 rounded bg-green-100 text-green-700 font-medium hover:bg-green-200 transition-colors">
                          Add to Basket
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => setRecipeOpen(false)}
                      className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-[#2D2D2D] transition-colors text-sm"
                    >
                      Browse All Recipes
                    </button>
                    <button
                      onClick={() => setRecipeOpen(false)}
                      className="px-4 py-2 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition-colors text-sm"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="px-5 pb-5 border-t border-gray-100 dark:border-[#2D2D2D]">
              <button
                onClick={() => setRecipeOpen(false)}
                className="w-full py-2 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-[#2D2D2D] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detailed Recipe Modal (Cook Now) */}
      {showCookModal && selectedRecipe && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowCookModal(false)}
        >
          <div
            className="bg-white dark:bg-[#1E1E1E] rounded-2xl max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-gray-100 dark:border-[#2D2D2D] flex items-center justify-between sticky top-0 bg-white dark:bg-[#1E1E1E] z-10">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{selectedRecipe.emoji}</span>
                <div>
                  <h3 className="font-bold text-lg text-gray-800 dark:text-[#FFFFFF]">{selectedRecipe.name}</h3>
                  <p className="text-xs text-gray-400">
                    {selectedRecipe.cost} pesos • {selectedRecipe.servings} servings • {selectedRecipe.cookTime}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowCookModal(false)}
                className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-[#2D2D2D] transition-colors text-gray-400"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5 space-y-5">
              {/* Ingredients Checklist */}
              <div>
                <h4 className="font-bold text-gray-800 dark:text-[#FFFFFF] mb-3">Ingredients</h4>
                <div className="space-y-2">
                  {selectedRecipe.ingredients.map((ing) => (
                    <div
                      key={ing.id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-[#2D2D2D]"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4"
                        defaultChecked={isIngredientInBasket(ing.id)}
                      />
                      <span className="text-lg">{ing.emoji}</span>
                      <span className="flex-1 text-gray-700 dark:text-gray-300">{ing.name}</span>
                      {!isIngredientInBasket(ing.id) && (
                        <button className="text-xs px-2 py-1 rounded bg-orange-100 text-orange-700 font-medium hover:bg-orange-200 transition-colors">
                          Add to Basket
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructions */}
              <div>
                <h4 className="font-bold text-gray-800 dark:text-[#FFFFFF] mb-3">Cooking Instructions</h4>
                <div className="space-y-2">
                  {selectedRecipe.instructions.map((instruction, idx) => (
                    <p
                      key={idx}
                      className="text-sm text-gray-700 dark:text-gray-300 p-2 rounded bg-gray-50 dark:bg-[#2D2D2D]"
                    >
                      {instruction}
                    </p>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div>
                <h4 className="font-bold text-gray-800 dark:text-[#FFFFFF] mb-3">Actions</h4>
                <div className="space-y-2">
                  <button className="w-full py-2 rounded-xl bg-orange-100 text-orange-700 text-sm font-medium hover:bg-orange-200 transition-colors">
                    ➕ Add Missing Ingredients to Basket
                  </button>
                  <button className="w-full py-2 rounded-xl bg-purple-100 text-purple-700 text-sm font-medium hover:bg-purple-200 transition-colors">
                    ❤️ Save Recipe to Favorites
                  </button>
                </div>
              </div>
            </div>

            <div className="px-5 pb-5 border-t border-gray-100 dark:border-[#2D2D2D]">
              <button
                onClick={() => setShowCookModal(false)}
                className="w-full py-2 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-[#2D2D2D] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
