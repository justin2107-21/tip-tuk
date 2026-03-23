import React, { useState } from "react";
import { Bell, Star, TrendingDown, TrendingUp, X } from "lucide-react";
import { AIBadge, AITip } from "../components/AIBadge";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";

const fuelTypeOptions = ["RON 95", "RON 91", "Diesel", "RON 97", "RON 100", "Diesel+", "Kerosene"];
const areas = ["Quezon City", "Taguig", "Makati", "Manila", "Mandaluyong", "Pasig"];

const brandData = [
  { brand: "Seaoil", logo: "🟦", ron95: 67.65, ron91: 62.45, diesel: 70.10, ron97: 72.50, ron100: 78.20, dieselPlus: 71.80, kerosene: 58.00, savings: 4.20 },
  { brand: "CleanFuel", logo: "🟩", ron95: 68.10, ron91: 63.20, diesel: 70.85, ron97: 73.10, ron100: 79.00, dieselPlus: 72.30, kerosene: 58.50, savings: 3.75 },
  { brand: "Phoenix", logo: "🟥", ron95: 69.80, ron91: 64.00, diesel: 72.10, ron97: 74.20, ron100: 80.50, dieselPlus: 73.50, kerosene: 59.20, savings: 2.05 },
  { brand: "Petron", logo: "🔷", ron95: 71.00, ron91: 65.50, diesel: 73.00, ron97: 75.80, ron100: 82.00, dieselPlus: 74.80, kerosene: 60.00, savings: 0.85 },
  { brand: "Shell", logo: "🐚", ron95: 71.25, ron91: 65.75, diesel: 73.50, ron97: 76.00, ron100: 82.50, dieselPlus: 75.20, kerosene: 60.50, savings: 0.60 },
  { brand: "Caltex", logo: "⭐", ron95: 71.85, ron91: 66.00, diesel: 74.00, ron97: 76.50, ron100: 83.00, dieselPlus: 75.80, kerosene: 61.00, savings: 0 },
];

const areaData = [
  { area: "Quezon City", min: 67.65, max: 71.85, common: 69.50 },
  { area: "Taguig", min: 68.00, max: 72.00, common: 70.00 },
  { area: "Makati", min: 68.50, max: 72.50, common: 70.50 },
  { area: "Manila", min: 67.80, max: 71.50, common: 69.80 },
  { area: "Mandaluyong", min: 68.20, max: 71.90, common: 70.10 },
  { area: "Pasig", min: 68.00, max: 72.10, common: 70.00 },
];

const sparkData = [
  [{ v: 72 }, { v: 71.5 }, { v: 71 }, { v: 70.5 }, { v: 70.8 }, { v: 71.2 }, { v: 71.85 }],
  [{ v: 65 }, { v: 64.5 }, { v: 64 }, { v: 63.5 }, { v: 64 }, { v: 65.2 }, { v: 66 }],
  [{ v: 74 }, { v: 73.5 }, { v: 73 }, { v: 72.5 }, { v: 73 }, { v: 73.5 }, { v: 74 }],
];

// Only show 3 sparkline cards (RON 95, RON 91, Diesel)
const sparkFuelTypes = ["RON 95", "RON 91", "Diesel"];

function getPriceForType(b: typeof brandData[0], fuelType: string): number {
  if (fuelType === "RON 95") return b.ron95;
  if (fuelType === "RON 91") return b.ron91;
  if (fuelType === "Diesel") return b.diesel;
  if (fuelType === "RON 97") return b.ron97;
  if (fuelType === "RON 100") return b.ron100;
  if (fuelType === "Diesel+") return b.dieselPlus;
  if (fuelType === "Kerosene") return b.kerosene;
  return b.ron95;
}

export function FuelPage() {
  const [fuelType, setFuelType] = useState("RON 95");
  const [area, setArea] = useState("Quezon City");
  const [viewBy, setViewBy] = useState<"brand" | "area">("brand");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [alertTarget, setAlertTarget] = useState("");
  const [alertArea, setAlertArea] = useState("Quezon City");
  const [alertSaved, setAlertSaved] = useState(false);

  const toggleFav = (brand: string) => setFavorites((f) => f.includes(brand) ? f.filter((x) => x !== brand) : [...f, brand]);

  const sorted = [...brandData].sort((a, b) => getPriceForType(a, fuelType) - getPriceForType(b, fuelType));
  const ncrAvg = brandData.reduce((sum, b) => sum + getPriceForType(b, fuelType), 0) / brandData.length;

  const handleSaveAlert = () => {
    setAlertSaved(true);
    setTimeout(() => {
      setAlertSaved(false);
      setAlertModalOpen(false);
      setAlertTarget("");
    }, 1500);
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">⛽ Fuel Prices</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Real-time fuel prices by brand and area</p>
      </div>

      {/* Filters — now both dropdowns */}
      <div className="flex flex-wrap gap-3 items-center">
        <select
          value={fuelType}
          onChange={(e) => setFuelType(e.target.value)}
          className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 outline-none text-sm font-semibold"
        >
          {fuelTypeOptions.map((ft) => <option key={ft}>{ft}</option>)}
        </select>

        <select value={area} onChange={(e) => setArea(e.target.value)}
          className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 outline-none text-sm">
          {areas.map((a) => <option key={a}>{a}</option>)}
        </select>

        {/* Toggle */}
        <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full p-1 gap-1">
          <button onClick={() => setViewBy("brand")} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${viewBy === "brand" ? "bg-white dark:bg-gray-700 shadow-sm text-gray-800 dark:text-gray-100" : "text-gray-500"}`}>By Brand</button>
          <button onClick={() => setViewBy("area")} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${viewBy === "area" ? "bg-white dark:bg-gray-700 shadow-sm text-gray-800 dark:text-gray-100" : "text-gray-500"}`}>By Area</button>
        </div>
      </div>

      {/* Summary Card */}
      <div className="rounded-2xl p-5" style={{ background: "linear-gradient(135deg, #E65100, #F57C00)" }}>
        <p className="text-orange-100 text-sm mb-1">NCR Average Price – {fuelType}</p>
        <p className="text-white text-4xl font-bold">₱{ncrAvg.toFixed(2)}/L</p>
        <p className="text-orange-100 text-sm mt-1">Range: ₱{sorted[0] ? getPriceForType(sorted[0], fuelType).toFixed(2) : "--"} – ₱{sorted[sorted.length-1] ? getPriceForType(sorted[sorted.length-1], fuelType).toFixed(2) : "--"}</p>
        <p className="text-orange-200 text-xs mt-2">Last updated: {new Date().toLocaleString("en-PH")}</p>
      </div>

      {/* Sparklines (only for RON 95, RON 91, Diesel) */}
      <div className="grid grid-cols-3 gap-3">
        {sparkFuelTypes.map((ft, i) => {
          const data = sparkData[i];
          const last = data[data.length - 1].v;
          const prev = data[data.length - 2].v;
          const rising = last > prev;
          return (
            <div key={ft} className="bg-white dark:bg-gray-800 rounded-xl p-3 shadow-sm border border-gray-100 dark:border-gray-700">
              <p className="text-xs text-gray-500 font-medium mb-1">{ft}</p>
              <p className="font-bold text-gray-800 dark:text-gray-100">₱{last.toFixed(2)}</p>
              <div className="flex items-center gap-1 text-xs mb-2">
                {rising ? <TrendingUp size={12} className="text-red-500" /> : <TrendingDown size={12} className="text-green-500" />}
                <span className={rising ? "text-red-500" : "text-green-500"}>7-day trend</span>
              </div>
              <ResponsiveContainer width="100%" height={40}>
                <LineChart data={data.map((d) => ({ v: d.v }))}>
                  <Line type="monotone" dataKey="v" stroke={rising ? "#ef4444" : "#22c55e"} strokeWidth={2} dot={false} />
                  <Tooltip formatter={(v: number) => `₱${v.toFixed(2)}`} contentStyle={{ fontSize: 10 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          );
        })}
      </div>

      {/* AI Fuel Forecast */}
      <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-2xl p-4 flex items-center gap-4">
        <span className="text-3xl">🤖</span>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-semibold text-purple-800 dark:text-purple-300">AI Fuel Forecast</p>
            <AIBadge />
          </div>
          <p className="text-sm text-purple-700 dark:text-purple-400">
            Based on global oil trends, {fuelType} prices may <strong>drop ₱1.50–₱2.00/L next week</strong>. Consider filling up then for maximum savings.
          </p>
        </div>
        <button
          onClick={() => setAlertModalOpen(true)}
          className="flex-shrink-0 flex items-center gap-1 px-3 py-2 bg-purple-600 text-white rounded-xl text-sm font-medium hover:bg-purple-700 transition-colors"
        >
          <Bell size={14} /> Set Alert
        </button>
      </div>

      {/* Brand / Area list */}
      {viewBy === "brand" ? (
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">Ranked by Price – {fuelType}</h2>
          {sorted.map((b, i) => (
            <div key={b.brand} className="bg-white dark:bg-gray-800 rounded-xl px-4 py-3 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-3">
              <span className="font-bold text-gray-400 text-sm w-5">#{i + 1}</span>
              <span className="text-xl">{b.logo}</span>
              <p className="flex-1 font-semibold text-gray-800 dark:text-gray-100">{b.brand}</p>
              {i < 3 && (
                <span className="text-xs font-bold px-2 py-1 rounded-full bg-green-100 text-green-700">
                  Save ₱{(getPriceForType(sorted[sorted.length - 1], fuelType) - getPriceForType(b, fuelType)).toFixed(2)}
                </span>
              )}
              <span className="font-bold text-orange-600 text-lg">₱{getPriceForType(b, fuelType).toFixed(2)}</span>
              <button onClick={() => toggleFav(b.brand)} className="text-gray-300 hover:text-yellow-400 transition-colors">
                <Star size={16} fill={favorites.includes(b.brand) ? "#facc15" : "none"} stroke={favorites.includes(b.brand) ? "#facc15" : "currentColor"} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">By Area – {fuelType}</h2>
          {areaData.map((a) => (
            <div key={a.area} className="bg-white dark:bg-gray-800 rounded-xl px-4 py-3 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-3">
              <span className="text-xl">📍</span>
              <div className="flex-1">
                <p className="font-semibold text-gray-800 dark:text-gray-100">{a.area}</p>
                <p className="text-xs text-gray-400">Range: ₱{a.min.toFixed(2)} – ₱{a.max.toFixed(2)}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">Common price</p>
                <p className="font-bold text-orange-600 text-lg">₱{a.common.toFixed(2)}</p>
              </div>
              <button className="text-blue-400 hover:text-blue-600 transition-colors text-sm">🗺️</button>
            </div>
          ))}
        </div>
      )}

      {/* Page Disclaimer */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
        <p className="text-xs text-gray-400 text-center">
          Source: DOE — Oil Industry Management Bureau • Updates weekly
        </p>
      </div>

      {/* Set Alert Modal */}
      {alertModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setAlertModalOpen(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-sm w-full p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">🔔 Set Price Alert</h3>
              <button onClick={() => setAlertModalOpen(false)} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-400">
                <X size={18} />
              </button>
            </div>

            {alertSaved ? (
              <div className="text-center py-6">
                <span className="text-5xl">✅</span>
                <p className="font-bold text-green-700 mt-3">Alert saved!</p>
                <p className="text-sm text-gray-500 mt-1">We'll notify you when {fuelType} drops below ₱{alertTarget}/L</p>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-200 block mb-1">Fuel Type</label>
                  <div className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm">
                    {fuelType}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-200 block mb-1">Target Price (₱/L)</label>
                  <input
                    type="number"
                    value={alertTarget}
                    onChange={(e) => setAlertTarget(e.target.value)}
                    placeholder="e.g. 65.00"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 outline-none focus:border-green-400 text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-200 block mb-1">Area</label>
                  <select
                    value={alertArea}
                    onChange={(e) => setAlertArea(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 outline-none text-sm"
                  >
                    {areas.map((a) => <option key={a}>{a}</option>)}
                  </select>
                </div>
                <button
                  onClick={handleSaveAlert}
                  disabled={!alertTarget}
                  className="w-full py-2.5 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save Alert
                </button>
                <button onClick={() => setAlertModalOpen(false)} className="w-full py-2 text-sm text-gray-400 hover:text-gray-600 transition-colors">
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
