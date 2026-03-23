import React, { createContext, useContext, useState, ReactNode, useRef } from "react";

export interface BasketItem {
  id: string;
  emoji: string;
  name: string;
  price: number;
  usualPrice: number;
  quantity: number;
  unit: string;
}

interface AppContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  basket: BasketItem[];
  addToBasket: (item: Omit<BasketItem, "quantity">) => void;
  removeFromBasket: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  basketCount: number;
  totalCost: number;
  basketToastVisible: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialBasket: BasketItem[] = [
  { id: "broccoli", emoji: "🥦", name: "Broccoli", price: 87, usualPrice: 100, quantity: 1, unit: "kg" },
  { id: "chicken", emoji: "🍗", name: "Chicken (Whole)", price: 165, usualPrice: 175, quantity: 1, unit: "kg" },
  { id: "tomato", emoji: "🍅", name: "Tomato", price: 45, usualPrice: 50, quantity: 0.5, unit: "kg" },
  { id: "onion", emoji: "🧅", name: "Red Onion", price: 120, usualPrice: 100, quantity: 0.5, unit: "kg" },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);
  const [basket, setBasket] = useState<BasketItem[]>(initialBasket);
  const [basketToastVisible, setBasketToastVisible] = useState(false);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggleDarkMode = () => {
    setDarkMode((d) => {
      const next = !d;
      if (next) document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
      return next;
    });
  };

  const addToBasket = (item: Omit<BasketItem, "quantity">) => {
    setBasket((prev) => {
      const exists = prev.find((b) => b.id === item.id);
      if (exists) return prev.map((b) => b.id === item.id ? { ...b, quantity: b.quantity + 1 } : b);
      return [...prev, { ...item, quantity: 1 }];
    });
    // Show toast
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setBasketToastVisible(true);
    toastTimerRef.current = setTimeout(() => setBasketToastVisible(false), 1500);
  };

  const removeFromBasket = (id: string) => {
    setBasket((prev) => prev.filter((b) => b.id !== id));
  };

  const updateQuantity = (id: string, qty: number) => {
    if (qty <= 0) { removeFromBasket(id); return; }
    setBasket((prev) => prev.map((b) => b.id === id ? { ...b, quantity: qty } : b));
  };

  const basketCount = basket.reduce((sum, b) => sum + b.quantity, 0);
  const totalCost = basket.reduce((sum, b) => sum + b.price * b.quantity, 0);

  return (
    <AppContext.Provider value={{ darkMode, toggleDarkMode, basket, addToBasket, removeFromBasket, updateQuantity, basketCount, totalCost, basketToastVisible }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
