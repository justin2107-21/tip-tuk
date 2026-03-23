import React, { useState } from "react";
import { Outlet } from "react-router";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { BottomNav } from "./BottomNav";
import { AIChat } from "../AIChat";
import { CheckCircle } from "lucide-react";
import { useApp } from "../../context/AppContext";

export function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { basketToastVisible } = useApp();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#121212]">
      <Navbar onMobileMenuToggle={() => setMobileMenuOpen((v) => !v)} mobileMenuOpen={mobileMenuOpen} />

      {/* Mobile overlay menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute left-0 top-16 bottom-0 w-72 z-50">
            <Sidebar mobile onClose={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main content */}
      <main className="pt-16 md:pl-56 pb-20 md:pb-4 min-h-screen">
        <div className="max-w-6xl mx-auto p-4 md:p-6">
          <Outlet />
        </div>
      </main>

      <BottomNav />
      <AIChat />

      {/* Add to Basket Toast */}
      <div
        className={`fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-[200] transition-all duration-300 ${
          basketToastVisible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-2 bg-green-700 text-white px-5 py-3 rounded-full shadow-xl">
          <CheckCircle size={18} className="flex-shrink-0" />
          <span className="font-semibold">Added to My Basket</span>
        </div>
      </div>
    </div>
  );
}
