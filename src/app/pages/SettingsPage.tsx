import React, { useState } from "react";
import { RotateCcw } from "lucide-react";

export function SettingsPage() {
  const [visibleTabs, setVisibleTabs] = useState({
    Home: true,
    "SM Markets": false,
    Fuel: false,
    "My Basket": false,
    EV: false,
  });

  const toggleTab = (tab: string) => {
    setVisibleTabs((prev) => ({ ...prev, [tab]: !prev[tab] }));
  };

  const resetAll = () => {
    setVisibleTabs({
      Home: true,
      "SM Markets": false,
      Fuel: false,
      "My Basket": false,
      EV: false,
    });
  };

  const tabs = [
    { id: "Home", emoji: "🏠", name: "Home", description: "Main dashboard with market updates", icon: "📊" },
    { id: "SM Markets", emoji: "🛒", name: "SM Markets", description: "Store prices and products", icon: "🏬" },
    { id: "Fuel", emoji: "⛽", name: "Fuel", description: "Gas station locations and pricing", icon: "⛽" },
    { id: "My Basket", emoji: "🛍️", name: "My Basket", description: "Shopping cart and checkout", icon: "🛍️" },
    { id: "EV", emoji: "🔌", name: "EV", description: "Electric vehicle charging stations", icon: "🔌" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 dark:from-[#0A0A0A] dark:to-[#1A1A1A] pb-32 pt-24">
      {/* Container */}
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">⚙️ Preferences</h1>
            <button
              onClick={resetAll}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-sm font-medium hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors"
            >
              <RotateCcw size={14} /> Reset all
            </button>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Choose which features to display on your dashboard</p>
        </div>

        {/* Tab Toggles */}
        <div className="grid grid-cols-1 gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => toggleTab(tab.id)}
              className={`p-4 rounded-xl border-2 transition-all text-left flex items-center justify-between ${
                visibleTabs[tab.id as keyof typeof visibleTabs]
                  ? "border-green-500 bg-green-50 dark:bg-green-900/10"
                  : "border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1E1E1E]"
              } hover:border-green-400 dark:hover:border-green-500 cursor-pointer`}
            >
              <div className="flex items-start gap-3 flex-1">
                <div className="text-2xl">{tab.emoji}</div>
                <div>
                  <p className={`font-semibold text-sm ${visibleTabs[tab.id as keyof typeof visibleTabs] ? "text-green-700 dark:text-green-300" : "text-gray-800 dark:text-gray-200"}`}>
                    {tab.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{tab.description}</p>
                </div>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                visibleTabs[tab.id as keyof typeof visibleTabs]
                  ? "border-green-500 bg-green-500"
                  : "border-gray-300 dark:border-gray-500"
              }`}>
                {visibleTabs[tab.id as keyof typeof visibleTabs] && (
                  <span className="text-white text-xs font-bold">✓</span>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Status Summary */}
        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
          <p className="text-sm text-blue-900 dark:text-blue-200">
            <strong>Enabled:</strong> {Object.values(visibleTabs).filter(Boolean).length} of {tabs.length} features
          </p>
        </div>

        {/* Info */}
        <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            💡 <strong>Tip:</strong> Toggle features on and off to customize your dashboard. Changes are saved automatically.
          </p>
        </div>
      </div>
    </div>
  );
}
