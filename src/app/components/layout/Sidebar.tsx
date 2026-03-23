import React from "react";
import { NavLink } from "react-router";
import { Home, ShoppingCart, Fuel, Zap, ShoppingBasket, CalendarDays, Users, Recycle, Wallet, LayoutDashboard } from "lucide-react";

const navItems = [
  { to: "/", label: "Home", icon: Home, emoji: "🏠" },
  { to: "/sm-markets", label: "SM Markets", icon: ShoppingCart, emoji: "🛒" },
  { to: "/fuel", label: "Fuel", icon: Fuel, emoji: "⛽" },
  { to: "/ev", label: "EV Stations", icon: Zap, emoji: "⚡" },
  { to: "/basket", label: "My Basket", icon: ShoppingBasket, emoji: "🧺" },
];

const moreItems = [
  { to: "/seasonal", label: "Seasonal Calendar", icon: CalendarDays, emoji: "🌱" },
  { to: "/community", label: "Community", icon: Users, emoji: "👥" },
  { to: "/waste", label: "Waste Reduction", icon: Recycle, emoji: "♻️" },
  { to: "/budget", label: "Budget Planner", icon: Wallet, emoji: "💰" },
  { to: "/dashboard", label: "Smart Dashboard", icon: LayoutDashboard, emoji: "📊" },
];

interface SidebarProps {
  mobile?: boolean;
  onClose?: () => void;
}

export function Sidebar({ mobile, onClose }: SidebarProps) {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-medium group ${
      isActive
        ? "bg-green-700 text-white shadow-sm"
        : "text-gray-600 dark:text-[#E0E0E0] hover:bg-green-50 dark:hover:bg-[#4CAF50]/10 hover:text-green-800 dark:hover:text-[#66BB6A]"
    }`;

  return (
    <aside className={`${mobile ? "w-full" : "w-56 fixed left-0 top-16 bottom-0 overflow-y-auto"} bg-white dark:bg-[#121212] border-r border-gray-100 dark:border-[#121212] flex flex-col py-4 px-3`}>
      <div className="mb-1">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">Main</p>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === "/"} className={linkClass} onClick={onClose}>
              <span className="text-base">{item.emoji}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">More</p>
        <nav className="flex flex-col gap-1">
          {moreItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass} onClick={onClose}>
              <span className="text-base">{item.emoji}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto px-3 py-4">
        <div className="rounded-xl p-3 text-xs text-gray-500 dark:text-[#9E9E9E]"
          style={{ background: "repeating-linear-gradient(45deg, #f0fdf4, #f0fdf4 3px, #dcfce7 3px, #dcfce7 6px)" }}>
          <p className="font-semibold text-green-700 mb-1">📡 Data Sources</p>
          <p>DA, SM Markets, DOE</p>
          <p className="mt-1 text-gray-400 dark:text-[#9E9E9E]">Updated: {new Date().toLocaleDateString("en-PH")}</p>
        </div>
      </div>
    </aside>
  );
}
