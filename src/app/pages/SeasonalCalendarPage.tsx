import React, { useState } from "react";
import { ChevronDown, Plus, Check } from "lucide-react";
import { useApp } from "../context/AppContext";

interface SeasonalItem {
  emoji: string;
  name: string;
  priceRange: string;
  status: "peak" | "starting" | "ending";
}

interface SeasonalSection {
  months: string;
  items: SeasonalItem[];
}

const seasonalSections: SeasonalSection[] = [
  {
    months: "JANUARY – FEBRUARY",
    items: [
      { emoji: "🥦", name: "Broccoli", priceRange: "₱75–₱120/kg", status: "peak" },
      { emoji: "🥕", name: "Carrot", priceRange: "₱50–₱85/kg", status: "peak" },
      { emoji: "🍅", name: "Tomato", priceRange: "₱45–₱90/kg", status: "peak" },
      { emoji: "🥬", name: "Kangkong", priceRange: "₱20–₱35/kg", status: "peak" },
      { emoji: "🍓", name: "Strawberry", priceRange: "₱200–₱280/kg", status: "peak" },
      { emoji: "🧄", name: "Bawang (Garlic)", priceRange: "₱250–₱380/kg", status: "peak" },
    ]
  },
  {
    months: "MARCH – APRIL",
    items: [
      { emoji: "🥭", name: "Mango", priceRange: "₱60–₱120/kg", status: "peak" },
      { emoji: "🍅", name: "Tomato", priceRange: "₱35–₱70/kg", status: "peak" },
      { emoji: "🥒", name: "Ampalaya (Bitter Gourd)", priceRange: "₱30–₱60/kg", status: "peak" },
      { emoji: "🌿", name: "Spring Onion", priceRange: "₱40–₱65/kg", status: "peak" },
      { emoji: "🍍", name: "Pineapple", priceRange: "₱35–₱75/kg", status: "starting" },
      { emoji: "🌽", name: "Corn", priceRange: "₱40–₱70/kg", status: "starting" },
    ]
  },
  {
    months: "MAY – JUNE",
    items: [
      { emoji: "🍉", name: "Watermelon", priceRange: "₱20–₱40/kg", status: "peak" },
      { emoji: "🍍", name: "Pineapple", priceRange: "₱30–₱60/kg", status: "peak" },
      { emoji: "🌽", name: "Corn", priceRange: "₱35–₱65/kg", status: "peak" },
      { emoji: "🍌", name: "Banana", priceRange: "₱50–₱100/kg", status: "peak" },
      { emoji: "🥭", name: "Mango", priceRange: "₱50–₱90/kg", status: "ending" },
      { emoji: "🧅", name: "Onion", priceRange: "₱60–₱110/kg", status: "starting" },
    ]
  },
  {
    months: "JULY – AUGUST",
    items: [
      { emoji: "🍌", name: "Banana", priceRange: "₱45–₱90/kg", status: "peak" },
      { emoji: "🌽", name: "Corn", priceRange: "₱30–₱60/kg", status: "peak" },
      { emoji: "🥬", name: "Kangkong", priceRange: "₱20–₱40/kg", status: "peak" },
      { emoji: "🧅", name: "Onion", priceRange: "₱50–₱100/kg", status: "peak" },
      { emoji: "🥔", name: "Potato", priceRange: "₱40–₱80/kg", status: "starting" },
      { emoji: "🥕", name: "Carrot", priceRange: "₱45–₱85/kg", status: "starting" },
    ]
  },
  {
    months: "SEPTEMBER – OCTOBER",
    items: [
      { emoji: "🥔", name: "Potato", priceRange: "₱35–₱75/kg", status: "peak" },
      { emoji: "🍠", name: "Sweet Potato", priceRange: "₱30–₱70/kg", status: "peak" },
      { emoji: "🧅", name: "Onion", priceRange: "₱45–₱95/kg", status: "peak" },
      { emoji: "🥕", name: "Carrot", priceRange: "₱40–₱80/kg", status: "peak" },
      { emoji: "🍊", name: "Orange", priceRange: "₱50–₱100/kg", status: "starting" },
      { emoji: "🥬", name: "Kangkong", priceRange: "₱25–₱45/kg", status: "ending" },
    ]
  },
  {
    months: "NOVEMBER – DECEMBER",
    items: [
      { emoji: "🍊", name: "Orange", priceRange: "₱40–₱90/kg", status: "peak" },
      { emoji: "🥦", name: "Broccoli", priceRange: "₱70–₱115/kg", status: "peak" },
      { emoji: "🍅", name: "Tomato", priceRange: "₱40–₱85/kg", status: "peak" },
      { emoji: "🥕", name: "Carrot", priceRange: "₱50–₱85/kg", status: "peak" },
      { emoji: "🍓", name: "Strawberry", priceRange: "₱190–₱270/kg", status: "starting" },
      { emoji: "🥬", name: "Kangkong", priceRange: "₱25–₱40/kg", status: "peak" },
    ]
  },
];

const statusBadgeConfig = {
  peak: { emoji: "🟢", label: "Peak", color: "bg-green-100 dark:bg-[#1B5E20]/30 text-green-700 dark:text-[#81C784]" },
  starting: { emoji: "🟡", label: "Starting", color: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400" },
  ending: { emoji: "🟠", label: "Ending", color: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400" },
};

export function SeasonalCalendarPage() {
  const { darkMode, addToBasket } = useApp();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());

  const toggleSection = (months: string) => {
    setExpandedSections(prev => ({ ...prev, [months]: !prev[months] }));
  };

  const handleAddToBasket = (item: SeasonalItem, sectionMonths: string) => {
    const itemKey = `${sectionMonths}-${item.name}`;
    
    // Get average price from range
    const prices = item.priceRange.match(/₱(\d+)/g) || [];
    const avgPrice = prices.length >= 2 
      ? (parseInt(prices[0].replace("₱", "")) + parseInt(prices[1].replace("₱", ""))) / 2
      : parseInt(prices[0]?.replace("₱", "") || "50");

    // Add to basket
    addToBasket({
      name: `${item.emoji} ${item.name}`,
      price: Math.round(avgPrice),
      quantity: 1,
    });

    // Mark as added
    setAddedItems(prev => new Set(prev).add(itemKey));

    // Reset after 2 seconds
    setTimeout(() => {
      setAddedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(itemKey);
        return newSet;
      });
    }, 2000);
  };

  const isItemAdded = (item: SeasonalItem, sectionMonths: string) => {
    return addedItems.has(`${sectionMonths}-${item.name}`);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          🌱 Seasonal Calendar
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          Choose what's in season to buy cheaper, fresher produce
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(statusBadgeConfig).map(([key, config]) => (
          <span key={key} className={`text-xs px-3 py-1.5 rounded-full font-medium ${config.color}`}>
            {config.emoji} {config.label}
          </span>
        ))}
      </div>

      {/* Seasonal Sections */}
      <div className="space-y-3">
        {seasonalSections.map(section => (
          <div key={section.months} className={`rounded-2xl border overflow-hidden ${darkMode ? "bg-[#1E1E1E] border-[#2D2D2D]" : "bg-white border-gray-100"}`}>
            {/* Section Header */}
            <button
              onClick={() => toggleSection(section.months)}
              className={`w-full px-6 py-4 flex items-center justify-between hover:opacity-80 transition-opacity ${
                darkMode ? "hover:bg-[#2D2D2D]" : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{section.items[0]?.emoji || "🌱"}</span>
                <h3 className={`text-lg font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>
                  📅 {section.months}
                </h3>
              </div>
              <ChevronDown 
                size={20} 
                className={`transition-transform ${expandedSections[section.months] ? "rotate-180" : ""} ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              />
            </button>

            {/* Section Content */}
            {expandedSections[section.months] && (
              <div className={`border-t ${darkMode ? "border-[#2D2D2D]" : "border-gray-100"} overflow-x-auto`}>
                <table className="w-full">
                  <thead className={darkMode ? "bg-[#2D2D2D]" : "bg-gray-50"}>
                    <tr>
                      <th className={`px-6 py-3 text-left text-sm font-semibold ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}>Type</th>
                      <th className={`px-6 py-3 text-left text-sm font-semibold ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}>Item</th>
                      <th className={`px-6 py-3 text-left text-sm font-semibold ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}>Price Range</th>
                      <th className={`px-6 py-3 text-center text-sm font-semibold ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}>Status</th>
                      <th className={`px-6 py-3 text-center text-sm font-semibold ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.items.map((item, idx) => {
                      const isAdded = isItemAdded(item, section.months);
                      return (
                        <tr 
                          key={idx}
                          className={`border-t transition-colors ${
                            darkMode 
                              ? `border-[#2D2D2D] hover:bg-[#252525]` 
                              : `border-gray-100 hover:bg-gray-50`
                          }`}
                        >
                          <td className={`px-6 py-4 text-2xl`}>
                            {item.emoji}
                          </td>
                          <td className={`px-6 py-4 font-medium ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}>
                            {item.name}
                          </td>
                          <td className={`px-6 py-4 text-sm ${
                            darkMode ? "text-gray-400" : "text-gray-600"
                          }`}>
                            {item.priceRange}
                          </td>
                          <td className={`px-6 py-4 text-center`}>
                            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                              statusBadgeConfig[item.status].color
                            }`}>
                              {statusBadgeConfig[item.status].emoji} {statusBadgeConfig[item.status].label}
                            </span>
                          </td>
                          <td className={`px-6 py-4 text-center`}>
                            <button
                              onClick={() => handleAddToBasket(item, section.months)}
                              disabled={isAdded}
                              className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all min-h-[36px] ${
                                isAdded
                                  ? darkMode
                                    ? "bg-green-900/30 text-green-400"
                                    : "bg-green-100 text-green-700"
                                  : "bg-green-600 hover:bg-green-700 text-white"
                              }`}
                            >
                              {isAdded ? (
                                <>
                                  <Check size={16} />
                                  <span>In Basket</span>
                                </>
                              ) : (
                                <>
                                  <Plus size={16} />
                                  <span>Add</span>
                                </>
                              )}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className={`text-center text-xs p-3 rounded-lg ${
        darkMode ? "text-gray-500 bg-[#2D2D2D]" : "text-gray-500 bg-gray-100"
      }`}>
        💡 Pro tip: Buy during peak season for the best prices and freshest produce!
      </div>
    </div>
  );
}
