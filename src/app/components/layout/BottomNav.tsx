import React from "react";
import { NavLink } from "react-router";
import { useApp } from "../../context/AppContext";

const navItems = [
  { to: "/", label: "Home", emoji: "🏠" },
  { to: "/sm-markets", label: "Markets", emoji: "🛒" },
  { to: "/fuel", label: "Fuel", emoji: "⛽" },
  { to: "/ev", label: "EV", emoji: "⚡" },
  { to: "/basket", label: "Basket", emoji: "🧺" },
];

export function BottomNav() {
  const { basketCount } = useApp();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[999] bg-white dark:bg-[#121212] border-t border-gray-200 dark:border-[#2D2D2D] flex md:hidden">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === "/"}
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center justify-center py-2 gap-0.5 text-xs font-medium transition-colors ${
              isActive ? "text-green-700" : "text-gray-500"
            }`
          }
        >
          <div className="relative">
            <span className="text-xl">{item.emoji}</span>
            {item.to === "/basket" && basketCount > 0 && (
              <span className="absolute -top-1 -right-2 min-w-4 h-4 rounded-full bg-orange-400 text-white text-xs flex items-center justify-center font-bold px-0.5">
                {Math.round(basketCount)}
              </span>
            )}
          </div>
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
