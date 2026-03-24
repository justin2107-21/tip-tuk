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

export interface User {
  name: string;
  email: string;
  avatar: string;
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
  loginToastVisible: boolean;
  user: User | null;
  isLoggedIn: boolean;
  login: (name: string, email: string) => void;
  logout: () => void;
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
  const [loginToastVisible, setLoginToastVisible] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loginTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggleDarkMode = () => {
    setDarkMode((d) => {
      const next = !d;
      if (next) document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
      return next;
    });
  };

  const login = (name: string, email: string) => {
    const avatar = name.charAt(0).toUpperCase();
    setUser({ name, email, avatar });
    // Show login success toast
    if (loginTimerRef.current) clearTimeout(loginTimerRef.current);
    setLoginToastVisible(true);
    loginTimerRef.current = setTimeout(() => setLoginToastVisible(false), 2000);
  };

  const logout = () => {
    setUser(null);
  };

  const addToBasket = (item: Omit<BasketItem, "quantity">) => {
    setBasket((prev) => {
      const exists = prev.find((b) => b.id === item.id);
      if (exists) return prev.map((b) => b.id === item.id ? { ...b, quantity: b.quantity + 1 } : b);
      return [...prev, { ...item, quantity: 1 }];
    });
    // Show basket toast
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
    <AppContext.Provider value={{ darkMode, toggleDarkMode, basket, addToBasket, removeFromBasket, updateQuantity, basketCount, totalCost, basketToastVisible, loginToastVisible, user, isLoggedIn: !!user, login, logout }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
