import React, { useState } from "react";
import { Zap, Star, MapPin } from "lucide-react";
import { AIBadge, AITip } from "../components/AIBadge";

const allStations = [
  { id: 1, name: "EVIDA Robinsons Galleria", operator: "EVIDA", location: "Ortigas, QC", region: "NCR", type: "DC Fast", hours: "24/7", price: 14.00 },
  { id: 2, name: "ChargePoint SM North EDSA", operator: "ChargePoint", location: "QC", region: "NCR", type: "AC Level 2", hours: "8am–10pm", price: 14.50 },
  { id: 3, name: "MECQ SM Aura", operator: "MECQ", location: "Taguig", region: "NCR", type: "DC Fast", hours: "24/7", price: 16.00 },
  { id: 4, name: "Recharge Power SM Megamall", operator: "Recharge", location: "Mandaluyong", region: "NCR", type: "AC Level 2", hours: "10am–10pm", price: 17.50 },
  { id: 5, name: "EVIDA Ayala Malls Circuit", operator: "EVIDA", location: "Makati", region: "NCR", type: "DC Fast", hours: "24/7", price: 18.00 },
  { id: 6, name: "BPPC Petron Station", operator: "BPPC", location: "Manila", region: "NCR", type: "AC Level 2", hours: "6am–10pm", price: 20.00 },
  { id: 7, name: "EVIDA Robinsons Antipolo", operator: "EVIDA", location: "Antipolo", region: "CALABARZON", type: "DC Fast", hours: "24/7", price: 14.50 },
  { id: 8, name: "ChargePoint SM Calamba", operator: "ChargePoint", location: "Calamba, Laguna", region: "CALABARZON", type: "AC Level 2", hours: "8am–10pm", price: 15.00 },
  { id: 9, name: "Recharge Imus Cavite", operator: "Recharge", location: "Imus, Cavite", region: "CALABARZON", type: "DC Fast", hours: "24/7", price: 16.50 },
  { id: 10, name: "EVIDA SM Clark", operator: "EVIDA", location: "Clark, Pampanga", region: "Central Luzon", type: "DC Fast", hours: "24/7", price: 14.20 },
  { id: 11, name: "ChargePoint Olongapo", operator: "ChargePoint", location: "Olongapo City", region: "Central Luzon", type: "AC Level 2", hours: "9am–9pm", price: 15.50 },
  { id: 12, name: "MECQ SM Cebu", operator: "MECQ", location: "Cebu City", region: "Central Visayas", type: "DC Fast", hours: "24/7", price: 15.80 },
  { id: 13, name: "EVIDA Ayala Center Cebu", operator: "EVIDA", location: "Cebu City", region: "Central Visayas", type: "DC Fast", hours: "7am–11pm", price: 16.20 },
  { id: 14, name: "ChargePoint Laoag", operator: "ChargePoint", location: "Laoag, Ilocos Norte", region: "Ilocos", type: "AC Level 2", hours: "8am–8pm", price: 17.00 },
  { id: 15, name: "EVIDA Iloilo City", operator: "EVIDA", location: "Iloilo City", region: "Western Visayas", type: "DC Fast", hours: "24/7", price: 15.50 },
  { id: 16, name: "Recharge SM Davao", operator: "Recharge", location: "Davao City", region: "Davao", type: "DC Fast", hours: "24/7", price: 16.00 },
  { id: 17, name: "ChargePoint Davao", operator: "ChargePoint", location: "Davao City", region: "Davao", type: "AC Level 2", hours: "9am–10pm", price: 17.00 },
  { id: 18, name: "EVIDA Baguio City", operator: "EVIDA", location: "Baguio City", region: "CAR", type: "DC Fast", hours: "7am–10pm", price: 16.80 },
];

const regionOptions = ["NCR", "CALABARZON", "Central Luzon", "Central Visayas", "Ilocos", "Western Visayas", "Davao", "CAR"];

const operators = [
  { name: "EVIDA", stations: 45, avgPrice: 16.00 },
  { name: "ChargePoint", stations: 32, avgPrice: 14.50 },
  { name: "MECQ", stations: 28, avgPrice: 17.20 },
  { name: "Recharge Power", stations: 21, avgPrice: 17.50 },
  { name: "BPPC", stations: 15, avgPrice: 19.80 },
  { name: "Orbits EV", stations: 9, avgPrice: null },
];

const medals = ["🥇", "🥈", "🥉"];

export function EVPage() {
  const [tab, setTab] = useState<"stations" | "operators" | "compare">("stations");
  const [chargerType, setChargerType] = useState("All");
  const [location, setLocation] = useState("NCR");
  const [kmMonth, setKmMonth] = useState(1500);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [routeModalOpen, setRouteModalOpen] = useState(false);

  const toggleFav = (id: number) => setFavorites((f) => f.includes(id) ? f.filter((x) => x !== id) : [...f, id]);

  const filteredStations = allStations
    .filter((s) => s.region === location)
    .filter((s) => chargerType === "All" || s.type.includes(chargerType))
    .sort((a, b) => a.price - b.price);

  // Cost comparison
  const evRate = 28.90; const evEff = 0.15;
  const gasPrice = 71.85; const gasEff = 10;
  const dieselPrice = 81.75; const dieselEff = 12;
  const evCostPerKm = evRate * evEff;
  const gasCostPerKm = gasPrice / gasEff;
  const dieselCostPerKm = dieselPrice / dieselEff;
  const evMonthly = evCostPerKm * kmMonth;
  const gasMonthly = gasCostPerKm * kmMonth;
  const dieselMonthly = dieselCostPerKm * kmMonth;
  const savingsVsGas = ((gasMonthly - evMonthly) / gasMonthly * 100).toFixed(1);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-[#FFFFFF] flex items-center gap-2">⚡ EV Charging Stations</h1>
        <p className="text-gray-500 dark:text-[#9E9E9E] text-sm mt-1">Find cheapest EV chargers near you</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-gray-100 dark:bg-[#1E1E1E] p-1 rounded-2xl w-fit">
        {(["stations", "operators", "compare"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
              tab === t ? "bg-white dark:bg-[#2D2D2D] shadow-sm text-gray-800 dark:text-[#FFFFFF]" : "text-gray-500 dark:text-[#9E9E9E]"
            }`}>
            {t === "stations" ? "⚡ Cheapest" : t === "operators" ? "🏢 Operators" : "⚡ vs ⛽ Compare"}
          </button>
        ))}
      </div>

      {tab === "stations" && (
        <>
          <div className="flex flex-wrap gap-3">
            {/* Region dropdown */}
            <select value={location} onChange={(e) => setLocation(e.target.value)}
              className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1E1E1E] text-gray-700 dark:text-[#E0E0E0] text-sm outline-none font-medium">
              {regionOptions.map((r) => <option key={r}>{r}</option>)}
            </select>
            {["All", "AC", "DC"].map((t) => (
              <button key={t} onClick={() => setChargerType(t)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                  chargerType === t ? "bg-green-600 text-white border-green-600" : "bg-white dark:bg-[#1E1E1E] border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300"
                }`}>{t === "All" ? "All Types" : t === "AC" ? "🔌 AC" : "⚡ DC Fast"}</button>
            ))}
          </div>

          <AITip>Based on usage patterns, EVIDA stations tend to have low wait times on weekday mornings.</AITip>

          {/* Mock map */}
          <div className="rounded-2xl overflow-hidden h-36 relative" style={{ background: "linear-gradient(135deg, #e8f5e9, #c8e6c9)" }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-green-700 font-medium flex items-center gap-2"><MapPin size={18} /> Interactive Map – {location} (Preview)</p>
            </div>
            {filteredStations.slice(0, 4).map((s, i) => (
              <div key={s.id} className="absolute w-7 h-7 rounded-full bg-green-600 flex items-center justify-center text-white text-xs font-bold shadow-md"
                style={{ left: `${15 + i * 22}%`, top: `${25 + (i % 2) * 30}%` }}>⚡</div>
            ))}
          </div>

          {filteredStations.length === 0 ? (
            <div className="text-center py-10">
              <span className="text-5xl">⚡</span>
              <p className="text-gray-500 mt-3">No charging stations found in {location}.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredStations.map((s, i) => (
                <div key={s.id} className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-[#2D2D2D] flex items-center gap-3">
                  <span className="text-xl">{medals[i] || "🔵"}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 dark:text-[#FFFFFF] truncate">{s.name}</p>
                    <p className="text-xs text-gray-400">{s.operator} · {s.location} · {s.hours}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.type.includes("DC") ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}>{s.type}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-700 text-xl">₱{s.price.toFixed(2)}</p>
                    <p className="text-xs text-gray-400">per kWh</p>
                    {i === 0 && <span className="text-xs text-purple-600 flex items-center gap-0.5">🤖 Low wait</span>}
                  </div>
                  <button onClick={() => toggleFav(s.id)} className="text-gray-300 hover:text-yellow-400 transition-colors">
                    <Star size={18} fill={favorites.includes(s.id) ? "#facc15" : "none"} stroke={favorites.includes(s.id) ? "#facc15" : "currentColor"} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <button onClick={() => setRouteModalOpen(true)} className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-dashed border-purple-300 text-purple-700 dark:text-purple-400 font-semibold hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
            🤖 Plan Your EV Route <AIBadge />
          </button>

          {routeModalOpen && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setRouteModalOpen(false)}>
              <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <h3 className="font-bold text-lg text-gray-800 dark:text-[#FFFFFF] mb-3">🤖 AI EV Route Planner</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-[#4CAF50]/10 rounded-xl">
                    <span className="text-xl">📍</span>
                    <div>
                      <p className="font-medium text-gray-700 dark:text-[#E0E0E0] text-sm">Starting Point: QC Circle</p>
                      <p className="text-xs text-gray-400">Estimated: 120km range remaining</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                    <span className="text-xl">⚡</span>
                    <div>
                      <p className="font-medium text-gray-700 dark:text-[#E0E0E0] text-sm">Recommended Stop: EVIDA Robinsons</p>
                      <p className="text-xs text-gray-400">₱14.00/kWh · ~20 min charge · Low wait predicted</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                    <span className="text-xl">🏁</span>
                    <div>
                      <p className="font-medium text-gray-700 dark:text-[#E0E0E0] text-sm">Destination: Makati CBD</p>
                      <p className="text-xs text-gray-400">Total cost: ₱43.00 · Savings vs gas: ₱68.00</p>
                    </div>
                  </div>
                </div>
                <button onClick={() => setRouteModalOpen(false)} className="mt-4 w-full py-2 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors">Close</button>
              </div>
            </div>
          )}
        </>
      )}

      {tab === "operators" && (
        <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-sm border border-gray-100 dark:border-[#2D2D2D] overflow-hidden">
          <div className="grid grid-cols-3 gap-2 px-4 py-3 bg-gray-50 dark:bg-[#2D2D2D] text-xs font-semibold text-gray-500 dark:text-[#9E9E9E]">
            <span>Operator</span>
            <span className="text-center">Stations</span>
            <span className="text-right">Avg ₱/kWh</span>
          </div>
          {operators.sort((a, b) => (a.avgPrice || 999) - (b.avgPrice || 999)).map((op, i) => (
            <div key={op.name} className="grid grid-cols-3 gap-2 px-4 py-3 border-t border-gray-100 dark:border-[#2D2D2D] items-center hover:bg-gray-50 dark:hover:bg-[#2D2D2D]/50 transition-colors">
              <div className="flex items-center gap-2">
                <span className="text-base">{medals[i] || "🔵"}</span>
                <span className="font-medium text-gray-800 dark:text-[#FFFFFF] text-sm">{op.name}</span>
              </div>
              <p className="text-center text-gray-600 dark:text-gray-300 text-sm font-semibold">{op.stations}</p>
              <p className="text-right font-bold text-green-700 text-sm">
                {op.avgPrice ? `₱${op.avgPrice.toFixed(2)}` : <span className="text-gray-400 font-normal">No pricing</span>}
              </p>
            </div>
          ))}
        </div>
      )}

      {tab === "compare" && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-[#2D2D2D]">
            <h3 className="font-bold text-gray-800 dark:text-[#FFFFFF] mb-4">Monthly km slider</h3>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm text-gray-500">500 km</span>
              <input type="range" min={500} max={5000} step={100} value={kmMonth} onChange={(e) => setKmMonth(Number(e.target.value))}
                className="flex-1 accent-green-600" />
              <span className="text-sm text-gray-500">5,000 km</span>
            </div>
            <p className="text-center font-bold text-gray-800 dark:text-[#FFFFFF] text-lg mb-4">{kmMonth.toLocaleString()} km/month</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl p-5 text-center" style={{ background: "linear-gradient(135deg, #1B5E20, #2E7D32)" }}>
              <p className="text-green-200 text-sm mb-1">⚡ Electric Vehicle</p>
              <p className="text-white text-xs mb-1">₱{evRate}/kWh × {evEff} kWh/km</p>
              <p className="text-yellow-300 text-2xl font-bold">₱{evCostPerKm.toFixed(2)}/km</p>
              <p className="text-green-200 text-sm mt-2">Monthly: <span className="text-white font-bold">₱{evMonthly.toFixed(0)}</span></p>
            </div>
            <div className="rounded-2xl p-5 text-center bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800">
              <p className="text-orange-600 text-sm mb-1">⛽ Gasoline</p>
              <p className="text-gray-500 text-xs mb-1">₱{gasPrice}/L ÷ {gasEff} km/L</p>
              <p className="text-orange-700 text-2xl font-bold">₱{gasCostPerKm.toFixed(2)}/km</p>
              <p className="text-orange-500 text-sm mt-2">Monthly: <span className="text-orange-700 font-bold">₱{gasMonthly.toFixed(0)}</span></p>
            </div>
            <div className="rounded-2xl p-5 text-center bg-gray-50 dark:bg-[#2D2D2D] border border-gray-200 dark:border-gray-600">
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">🛢️ Diesel</p>
              <p className="text-gray-500 text-xs mb-1">₱{dieselPrice}/L ÷ {dieselEff} km/L</p>
              <p className="text-gray-700 dark:text-[#E0E0E0] text-2xl font-bold">₱{dieselCostPerKm.toFixed(2)}/km</p>
              <p className="text-gray-500 text-sm mt-2">Monthly: <span className="text-gray-700 dark:text-[#E0E0E0] font-bold">₱{dieselMonthly.toFixed(0)}</span></p>
            </div>
          </div>

          <div className="rounded-2xl p-5 text-center" style={{ background: "linear-gradient(135deg, #1B5E20, #388E3C)" }}>
            <p className="text-green-200 mb-1">⚡ vs ⛽ Monthly Savings</p>
            <p className="text-5xl font-bold text-white mb-1">₱{(gasMonthly - evMonthly).toFixed(0)}</p>
            <p className="text-yellow-300 font-bold text-xl">Save {savingsVsGas}% vs Gasoline</p>
            <p className="text-green-200 text-sm mt-1">at {kmMonth.toLocaleString()} km/month</p>
          </div>
        </div>
      )}

      {/* Page Disclaimer */}
      <div className="border-t border-gray-200 dark:border-[#2D2D2D] pt-4 mt-4">
        <p className="text-xs text-gray-400 text-center">
          Source: DOE — evindustry.ph EVCS Registry • Updates weekly
        </p>
      </div>
    </div>
  );
}
