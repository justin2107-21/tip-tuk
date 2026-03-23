import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Bell, Search, Sun, Moon, User, ShoppingBasket, Menu, X } from "lucide-react";
import { useApp } from "../../context/AppContext";

const notifications = [
  { id: 1, icon: "📉", title: "Broccoli dropped 5%", body: "Now ₱87/kg at Kamuning Market", time: "2 min ago", type: "price" },
  { id: 2, icon: "🤖", title: "AI Tip: Buy chicken tomorrow", body: "Prices expected to drop ₱10–15/kg on Wednesday", time: "1 hr ago", type: "ai" },
  { id: 3, icon: "🔴", title: "Bawang still above target", body: "Garlic is ₱280/kg, your target is ₱200", time: "3 hrs ago", type: "alert" },
  { id: 4, icon: "🎉", title: "Sitaw on sale!", body: "Sitaw dropped ₱15/kg at SM Hypermarket Cubao", time: "5 hrs ago", type: "deal" },
  { id: 5, icon: "🤖", title: "AI Forecast: Rice stable this week", body: "Sinandomeng expected to stay at ₱52/kg", time: "6 hrs ago", type: "ai" },
];

interface NavbarProps {
  onMobileMenuToggle: () => void;
  mobileMenuOpen: boolean;
}

export function Navbar({ onMobileMenuToggle, mobileMenuOpen }: NavbarProps) {
  const { darkMode, toggleDarkMode, basketCount } = useApp();
  const [searchVal, setSearchVal] = useState("");
  const [bellOpen, setBellOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) navigate("/");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-4 gap-3 shadow-md"
        style={{ background: "linear-gradient(135deg, #1B5E20 0%, #2E7D32 60%, #388E3C 100%)" }}>
        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          onClick={onMobileMenuToggle}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <img src="/favicon1.ico" alt="Anopresyo" className="w-14 h-14 rounded-full shadow-sm" />
          <div className="hidden sm:block">
            <span className="text-white font-bold text-xl" style={{ fontFamily: "Poppins, sans-serif" }}>
              Ano<span style={{ color: "#FFB300" }}>presyo</span>
            </span>
          </div>
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-2">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="Search items, fuel, or stations..."
              className="w-full pl-9 pr-4 py-2 rounded-full bg-white/90 text-gray-800 text-sm outline-none focus:ring-2 focus:ring-yellow-300 placeholder:text-gray-400"
            />
          </div>
        </form>

        {/* Right actions */}
        <div className="flex items-center gap-1 ml-auto">
          <button
            onClick={() => setBellOpen(true)}
            className="relative p-2 rounded-full text-white hover:bg-white/10 transition-colors"
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-orange-400"></span>
            {/* AI robot badge */}
            <span className="absolute -bottom-0.5 -right-0.5 text-xs">🤖</span>
          </button>

          <Link to="/basket" className="relative p-2 rounded-full text-white hover:bg-white/10 transition-colors" aria-label="Basket">
            <ShoppingBasket size={20} />
            {basketCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-5 h-5 rounded-full bg-orange-400 text-white text-xs flex items-center justify-center font-bold px-1">
                {Math.round(basketCount)}
              </span>
            )}
          </Link>

          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <Link to="/dashboard" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 text-white hover:bg-white/25 transition-colors text-sm ml-1">
            <User size={16} />
            <span className="hidden sm:inline">Maria</span>
          </Link>
        </div>
      </nav>

      {/* Notification Bell Modal */}
      {bellOpen && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-start justify-end p-4 pt-20" onClick={() => setBellOpen(false)}>
          <div
            className="bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-[#2D2D2D]">
              <div className="flex items-center gap-2">
                <Bell size={18} className="text-green-700 dark:text-[#4CAF50]" />
                <h3 className="font-bold text-gray-800 dark:text-[#FFFFFF]">Price Alerts & AI Tips</h3>
                <span className="text-xs bg-orange-400 text-white px-2 py-0.5 rounded-full font-semibold">{notifications.length}</span>
              </div>
              <button
                onClick={() => setBellOpen(false)}
                className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-[#2D2D2D] transition-colors text-gray-400"
              >
                <X size={18} />
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto divide-y divide-gray-50 dark:divide-[#2D2D2D]">
              {notifications.map((n) => (
                <div key={n.id} className="flex items-start gap-3 px-5 py-3.5 hover:bg-gray-50 dark:hover:bg-[#2D2D2D]/50 transition-colors">
                  <span className="text-xl flex-shrink-0 mt-0.5">{n.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 dark:text-[#FFFFFF] text-sm">{n.title}</p>
                    <p className="text-xs text-gray-500 dark:text-[#E0E0E0] mt-0.5">{n.body}</p>
                    <p className="text-xs text-gray-400 dark:text-[#9E9E9E] mt-1">{n.time}</p>
                  </div>
                  {n.type === "ai" && (
                    <span className="flex-shrink-0 text-xs px-1.5 py-0.5 rounded-full bg-purple-100 dark:bg-[#7B1FA2]/30 text-purple-700 dark:text-[#CE93D8] font-medium">AI</span>
                  )}
                </div>
              ))}
            </div>
            <div className="px-5 py-3 border-t border-gray-100 dark:border-[#2D2D2D]">
              <button
                onClick={() => setBellOpen(false)}
                className="w-full py-2 text-sm text-green-700 dark:text-[#4CAF50] font-semibold hover:bg-green-50 dark:hover:bg-[#4CAF50]/10 rounded-xl transition-colors"
              >
                Mark all as read
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
