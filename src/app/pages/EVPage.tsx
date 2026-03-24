import React, { useState } from "react";
import { Zap, Star, MapPin } from "lucide-react";
import { AIBadge, AITip } from "../components/AIBadge";
import { LeafletMap } from "../components/maps/LeafletMap";

const allStations = [
  { id: 1, name: "EVIDA Robinsons Galleria", operator: "EVIDA", location: "Ortigas, QC", region: "NCR", type: "DC Fast", hours: "24/7", price: 14.00, lat: 14.5890, lng: 121.0477 },
  { id: 2, name: "ChargePoint SM North EDSA", operator: "ChargePoint", location: "QC", region: "NCR", type: "AC Level 2", hours: "8am–10pm", price: 14.50, lat: 14.6145, lng: 121.0477 },
  { id: 3, name: "MECQ SM Aura", operator: "MECQ", location: "Taguig", region: "NCR", type: "DC Fast", hours: "24/7", price: 16.00, lat: 14.5506, lng: 121.0595 },
  { id: 4, name: "Recharge Power SM Megamall", operator: "Recharge", location: "Mandaluyong", region: "NCR", type: "AC Level 2", hours: "10am–10pm", price: 17.50, lat: 14.5742, lng: 121.0278 },
  { id: 5, name: "EVIDA Ayala Malls Circuit", operator: "EVIDA", location: "Makati", region: "NCR", type: "DC Fast", hours: "24/7", price: 18.00, lat: 14.5570, lng: 121.0305 },
  { id: 6, name: "BPPC Petron Station", operator: "BPPC", location: "Manila", region: "NCR", type: "AC Level 2", hours: "6am–10pm", price: 20.00, lat: 14.5870, lng: 120.9749 },
  { id: 7, name: "EVIDA Robinsons Antipolo", operator: "EVIDA", location: "Antipolo", region: "CALABARZON", type: "DC Fast", hours: "24/7", price: 14.50, lat: 14.5985, lng: 121.1761 },
  { id: 8, name: "ChargePoint SM Calamba", operator: "ChargePoint", location: "Calamba, Laguna", region: "CALABARZON", type: "AC Level 2", hours: "8am–10pm", price: 15.00, lat: 14.2032, lng: 121.1780 },
  { id: 9, name: "Recharge Imus Cavite", operator: "Recharge", location: "Imus, Cavite", region: "CALABARZON", type: "DC Fast", hours: "24/7", price: 16.50, lat: 14.2847, lng: 120.8239 },
  { id: 10, name: "EVIDA SM Clark", operator: "EVIDA", location: "Clark, Pampanga", region: "Central Luzon", type: "DC Fast", hours: "24/7", price: 14.20, lat: 15.1860, lng: 120.5506 },
  { id: 11, name: "ChargePoint Olongapo", operator: "ChargePoint", location: "Olongapo City", region: "Central Luzon", type: "AC Level 2", hours: "9am–9pm", price: 15.50, lat: 14.8239, lng: 120.2755 },
  { id: 12, name: "MECQ SM Cebu", operator: "MECQ", location: "Cebu City", region: "Central Visayas", type: "DC Fast", hours: "24/7", price: 15.80, lat: 10.3157, lng: 123.8854},
  { id: 13, name: "EVIDA Ayala Center Cebu", operator: "EVIDA", location: "Cebu City", region: "Central Visayas", type: "DC Fast", hours: "7am–11pm", price: 16.20, lat: 10.3194, lng: 123.8835 },
  { id: 14, name: "ChargePoint Laoag", operator: "ChargePoint", location: "Laoag, Ilocos Norte", region: "Ilocos", type: "AC Level 2", hours: "8am–8pm", price: 17.00, lat: 18.1913, lng: 120.5889 },
  { id: 15, name: "EVIDA Iloilo City", operator: "EVIDA", location: "Iloilo City", region: "Western Visayas", type: "DC Fast", hours: "24/7", price: 15.50, lat: 10.7202, lng: 122.5621 },
  { id: 16, name: "Recharge SM Davao", operator: "Recharge", location: "Davao City", region: "Davao", type: "DC Fast", hours: "24/7", price: 16.00, lat: 7.0731, lng: 125.6121 },
  { id: 17, name: "ChargePoint Davao", operator: "ChargePoint", location: "Davao City", region: "Davao", type: "AC Level 2", hours: "9am–10pm", price: 17.00, lat: 7.0731, lng: 125.6032 },
  { id: 18, name: "EVIDA Baguio City", operator: "EVIDA", location: "Baguio City", region: "CAR", type: "DC Fast", hours: "7am–10pm", price: 16.80, lat: 16.4023, lng: 120.5960 },
];

const regionOptions = ["NCR", "CALABARZON", "Central Luzon", "Central Visayas", "Ilocos", "Western Visayas", "Davao", "CAR"];

const operators = [
  { name: "ACMobility", stations: 167, avgPrice: 30.37 },
  { name: "Solarius", stations: 46, avgPrice: 25.27 },
  { name: "Evro", stations: 8, avgPrice: 28.88 },
  { name: "GET PHILIPPINES INC", stations: 8, avgPrice: null },
  { name: "Department of Energy", stations: 6, avgPrice: null },
  { name: "Gogoro Philippines Inc.", stations: 6, avgPrice: null },
  { name: "Sysnet Integrators Inc.", stations: 6, avgPrice: 31.73 },
  { name: "SMI", stations: 4, avgPrice: null },
  { name: "ACMobility Power On Wheels Hub", stations: 3, avgPrice: 35.00 },
];

const medals = ["🥇", "🥈", "🥉"];

export function EVPage() {
  const [tab, setTab] = useState<"stations" | "operators" | "compare">("stations");
  const [chargerType, setChargerType] = useState("All");
  const [location, setLocation] = useState("NCR");
  const [kmMonth, setKmMonth] = useState(1500);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [routeModalOpen, setRouteModalOpen] = useState(false);
  const [routePlanning, setRoutePlanning] = useState(false);
  const [plannerStep, setPlannerStep] = useState<"input" | "results">("input");
  const [routeResults, setRouteResults] = useState<any>(null);
  
  // Route planner form state
  const [startPoint, setStartPoint] = useState("QC Circle");
  const [destination, setDestination] = useState("Makati CBD");
  const [currentBattery, setCurrentBattery] = useState(75);
  const [vehicleModel, setVehicleModel] = useState("BYD Atto 3");
  const [chargerPref, setChargerPref] = useState("Fast Charger Only");
  const [selectedRoute, setSelectedRoute] = useState(0);

  const toggleFav = (id: number) => setFavorites((f) => f.includes(id) ? f.filter((x) => x !== id) : [...f, id]);

  // Vehicle data
  const vehicleData: { [key: string]: { range: number; efficiency: number } } = {
    "BYD Atto 3": { range: 401, efficiency: 0.17 },
    "Tesla Model 3": { range: 560, efficiency: 0.16 },
    "Nissan Leaf": { range: 389, efficiency: 0.18 },
    "MG ZS EV": { range: 460, efficiency: 0.17 },
  };

  // Mock route options
  const routeOptions = [
    {
      name: "Fastest Route",
      totalDistance: 220,
      chargingStops: [
        { name: "V-Green Caloocan Depot", distance: 85, batteryArrival: 25, charger: "DC Fast (150kW)", price: 17.00, waitTime: 5, chargeTime: 20, lat: 14.6345, lng: 121.0234 },
        { name: "Destination", distance: 220, batteryArrival: 35, charger: "Arrival", price: 0, waitTime: 0, chargeTime: 0, lat: 14.5570, lng: 121.0305 }
      ],
      totalTime: 320,
      totalCost: 245,
      confidence: 94,
    },
    {
      name: "Cheapest Route",
      totalDistance: 235,
      chargingStops: [
        { name: "Solarius EV - Shaw Blvd", distance: 45, batteryArrival: 52, charger: "AC (7kW)", price: 25.27, waitTime: 15, chargeTime: 45, lat: 14.5850, lng: 121.0250 },
        { name: "Pacific Plaza Towers", distance: 150, batteryArrival: 28, charger: "AC (7kW)", price: 17.84, waitTime: 10, chargeTime: 35, lat: 14.5506, lng: 121.0595 },
        { name: "Destination", distance: 235, batteryArrival: 42, charger: "Arrival", price: 0, waitTime: 0, chargeTime: 0, lat: 14.5570, lng: 121.0305 }
      ],
      totalTime: 420,
      totalCost: 178,
      confidence: 89,
    },
    {
      name: "Most Chargers",
      totalDistance: 225,
      chargingStops: [
        { name: "EVIDA Robinsons Galleria", distance: 75, batteryArrival: 32, charger: "DC Fast (150kW)", price: 14.00, waitTime: 8, chargeTime: 22, lat: 14.5890, lng: 121.0477 },
        { name: "Recharge Power SM Megamall", distance: 160, batteryArrival: 45, charger: "AC Level 2 (7kW)", price: 17.50, waitTime: 12, chargeTime: 30, lat: 14.5742, lng: 121.0278 },
        { name: "Destination", distance: 225, batteryArrival: 38, charger: "Arrival", price: 0, waitTime: 0, chargeTime: 0, lat: 14.5570, lng: 121.0305 }
      ],
      totalTime: 380,
      totalCost: 215,
      confidence: 96,
    },
  ];

  const handlePlanRoute = (e: React.FormEvent) => {
    e.preventDefault();
    setRoutePlanning(true);
    // Simulate API call
    setTimeout(() => {
      setRouteResults(routeOptions);
      setPlannerStep("results");
      setRoutePlanning(false);
    }, 1500);
  };

  const handleSaveRoute = () => {
    alert(`✅ Route saved! You can find it in "My Saved Routes"`);
  };

  const handleShareRoute = () => {
    alert(`✅ Link copied! Share this route: ${window.location.href}?route=${selectedRoute}`);
  };

  const filteredStations = allStations
    .filter((s) => s.region === location)
    .filter((s) => chargerType === "All" || s.type.includes(chargerType))
    .sort((a, b) => a.price - b.price);

  // Cost comparison
  const evRate = 28.90; const evEff = 0.15;
  const gasPrice = 86.52; const gasEff = 10;
  const dieselPrice = 103.56; const dieselEff = 12;
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

          {/* Leaflet Map */}
          <div className="rounded-2xl overflow-hidden mb-4 touch-none select-none" style={{ pointerEvents: "auto" }}>
            <LeafletMap
              markers={filteredStations.map((s) => ({
                id: s.id.toString(),
                lat: s.lat,
                lng: s.lng,
                label: s.name,
                item: `${s.type} - ${s.operator}`,
                price: `₱${s.price.toFixed(2)}/kWh`,
                verified: true,
                icon: "⚡",
                color: s.type.includes("DC") ? "#2E7D32" : "#1565C0",
              }))}
              center={location === "NCR" ? [14.5995, 120.9842] : location === "CALABARZON" ? [14.2500, 121.1000] : [10.0, 120.0]}
              zoom={location === "NCR" ? 11 : 8}
              height="350px"
              darkMode={false}
            />
          </div>

          {filteredStations.length === 0 ? (
            <div className="text-center py-10">
              <span className="text-5xl">⚡</span>
              <p className="text-gray-500 mt-3">No charging stations found in {location}.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredStations.map((s, i) => (
                <div key={s.id} className="bg-white dark:bg-[#1E1E1E] rounded-lg p-2.5 border border-gray-100 dark:border-[#2D2D2D] flex items-start gap-2.5">
                  <span className="text-base flex-shrink-0">{medals[i] || `#${i+1}`}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 dark:text-[#FFFFFF] text-sm">{s.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase">{s.location}</p>
                    <div className="flex gap-2 mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded font-medium ${s.type.includes("DC") ? "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400" : "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"}`}>{s.type.includes("DC") ? "DC" : "AC"}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium">{s.hours}</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-green-700 dark:text-green-400 text-base">₱{s.price.toFixed(2)}</p>
                    <p className="text-xs text-gray-400 font-medium">/kWh</p>
                  </div>
                  <button onClick={() => toggleFav(s.id)} className="text-gray-300 hover:text-yellow-400 transition-colors flex-shrink-0">
                    <Star size={16} fill={favorites.includes(s.id) ? "#facc15" : "none"} stroke={favorites.includes(s.id) ? "#facc15" : "currentColor"} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <button onClick={() => setRouteModalOpen(true)} className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-dashed border-purple-300 text-purple-700 dark:text-purple-400 font-semibold hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
            🤖 Plan Your EV Route <AIBadge />
          </button>

          {routeModalOpen && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={() => setRouteModalOpen(false)}>
              <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl max-w-2xl w-full shadow-2xl my-10" onClick={(e) => e.stopPropagation()}>
                
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800 sticky top-0 bg-white dark:bg-[#1E1E1E] z-10">
                  <h3 className="font-bold text-lg text-gray-800 dark:text-[#FFFFFF] flex items-center gap-2">🤖 AI EV Route Planner <AIBadge /></h3>
                  <button onClick={() => { setRouteModalOpen(false); setPlannerStep("input"); }} className="text-gray-400 hover:text-gray-600">✕</button>
                </div>

                <div className="p-5 max-h-[70vh] overflow-y-auto">
                  
                  {/* INPUT FORM */}
                  {plannerStep === "input" && (
                    <form onSubmit={handlePlanRoute} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">📍 Starting Point</label>
                        <input type="text" value={startPoint} onChange={(e) => setStartPoint(e.target.value)} placeholder="Enter starting location" 
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#2D2D2D] text-gray-800 dark:text-white text-sm outline-none" />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">🏁 Destination</label>
                        <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Enter destination" 
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#2D2D2D] text-gray-800 dark:text-white text-sm outline-none" />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">🔋 Current Battery</label>
                        <div className="flex items-center gap-3">
                          <input type="range" min="10" max="100" step="5" value={currentBattery} onChange={(e) => setCurrentBattery(Number(e.target.value))}
                            className="flex-1" />
                          <span className="text-sm font-bold text-gray-800 dark:text-white w-12">{currentBattery}%</span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Est. range: {Math.round((currentBattery / 100) * (vehicleData[vehicleModel]?.range || 401))} km</p>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">🚗 Vehicle Model</label>
                        <select value={vehicleModel} onChange={(e) => setVehicleModel(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#2D2D2D] text-gray-800 dark:text-white text-sm outline-none">
                          <option>BYD Atto 3</option>
                          <option>Tesla Model 3</option>
                          <option>Nissan Leaf</option>
                          <option>MG ZS EV</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">⚡ Charger Preference</label>
                        <select value={chargerPref} onChange={(e) => setChargerPref(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#2D2D2D] text-gray-800 dark:text-white text-sm outline-none">
                          <option>Fast Charger Only</option>
                          <option>Any Charger</option>
                          <option>Cheapest Charger</option>
                        </select>
                      </div>

                      <button type="submit" disabled={routePlanning}
                        className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity">
                        {routePlanning ? "Planning Route..." : "Plan My Route"}
                      </button>
                    </form>
                  )}

                  {/* RESULTS */}
                  {plannerStep === "results" && routeResults && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-800 dark:text-white">Route Options</h3>
                        <button onClick={() => setPlannerStep("input")} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600">Edit</button>
                      </div>

                      {/* Route Options Tabs */}
                      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                        {routeResults.map((route, idx) => (
                          <button key={idx} onClick={() => setSelectedRoute(idx)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                              selectedRoute === idx 
                                ? "bg-purple-600 text-white" 
                                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                            }`}>
                            {route.name}
                          </button>
                        ))}
                      </div>

                      {/* Selected Route Details */}
                      {routeResults[selectedRoute] && (
                        <div className="space-y-3">
                          {/* Summary Cards */}
                          <div className="grid grid-cols-3 gap-2">
                            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                              <p className="text-xs text-blue-600 dark:text-blue-400">Distance</p>
                              <p className="text-lg font-bold text-blue-700 dark:text-blue-300">{routeResults[selectedRoute].totalDistance} km</p>
                            </div>
                            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                              <p className="text-xs text-green-600 dark:text-green-400">Total Time</p>
                              <p className="text-lg font-bold text-green-700 dark:text-green-300">{Math.round(routeResults[selectedRoute].totalTime / 60)} min</p>
                            </div>
                            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3">
                              <p className="text-xs text-orange-600 dark:text-orange-400">Total Cost</p>
                              <p className="text-lg font-bold text-orange-700 dark:text-orange-300">₱{routeResults[selectedRoute].totalCost}</p>
                            </div>
                          </div>

                          {/* Confidence Score */}
                          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-3 border border-purple-200 dark:border-purple-800">
                            <div className="flex items-center justify-between mb-2">
                              <p className="font-semibold text-gray-800 dark:text-white">🎯 Route Confidence</p>
                              <p className="text-xl font-bold text-purple-600 dark:text-purple-400">{routeResults[selectedRoute].confidence}%</p>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full" style={{ width: `${routeResults[selectedRoute].confidence}%` }}></div>
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">✓ Multiple chargers available • ✓ Backup stations nearby</p>
                          </div>

                          {/* Charging Stops */}
                          <div>
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-3">⚡ Charging Stops</h4>
                            <div className="space-y-2">
                              {routeResults[selectedRoute].chargingStops.map((stop, idx) => (
                                <div key={idx} className="bg-gray-50 dark:bg-[#2D2D2D] rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                                  <div className="flex items-start justify-between mb-2">
                                    <div>
                                      <p className="font-semibold text-gray-800 dark:text-white text-sm">{stop.name}</p>
                                      <p className="text-xs text-gray-500 dark:text-gray-400">📍 {stop.distance}km from start</p>
                                    </div>
                                    {stop.charger !== "Arrival" && <span className="text-xs bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 px-2 py-1 rounded">{stop.charger}</span>}
                                  </div>
                                  {stop.charger !== "Arrival" && (
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                      <div>
                                        <p className="text-gray-500 dark:text-gray-400">💰 Price</p>
                                        <p className="font-semibold text-gray-800 dark:text-white">₱{stop.price.toFixed(2)}/kWh</p>
                                      </div>
                                      <div>
                                        <p className="text-gray-500 dark:text-gray-400">⏱️ Wait Time</p>
                                        <p className="font-semibold text-gray-800 dark:text-white">{stop.waitTime} min</p>
                                      </div>
                                      <div>
                                        <p className="text-gray-500 dark:text-gray-400">🔋 Battery at arrival</p>
                                        <p className="font-semibold text-gray-800 dark:text-white">{stop.batteryArrival}%</p>
                                      </div>
                                      <div>
                                        <p className="text-gray-500 dark:text-gray-400">⏳ Charge Time</p>
                                        <p className="font-semibold text-gray-800 dark:text-white">{stop.chargeTime} min</p>
                                      </div>
                                    </div>
                                  )}
                                  {stop.charger === "Arrival" && (
                                    <p className="text-xyz font-semibold text-green-600 dark:text-green-400">🎉 Arrival! Battery: {stop.batteryArrival}%</p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2 pt-3">
                            <button onClick={handleSaveRoute} className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors">
                              💾 Save Route
                            </button>
                            <button onClick={handleShareRoute} className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium text-sm transition-colors">
                              🔗 Share
                            </button>
                            <button className="flex-1 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium text-sm transition-colors">
                              📍 Navigate
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
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
