import React, { useState, useMemo } from "react";
import { Link } from "react-router";
import { TrendingDown, TrendingUp, Bell, Plus, Heart, ChevronRight } from "lucide-react";
import { AIBadge, AITip } from "../components/AIBadge";
import { useApp } from "../context/AppContext";
import { ProductDetailModal } from "../components/ProductDetailModal";
import { AddToBasketButton } from "../components/AddToBasketButton";
import { Toast } from "../components/Toast";

// Mock data with categories and drop periods for 7D/30D/90D filtering
const allBestDeals = [
  // 7D Best Deals
  { id: "galunggong-7d", emoji: "🐟", name: "Local Round Scad (Galunggong)", price: 293, usual: 315, savings: 22, unit: "kg", period: "7D" },
  { id: "alumahan-7d", emoji: "🐟", name: "Alumahan", price: 333, usual: 356, savings: 23, unit: "kg", period: "7D" },
  { id: "red-onion-7d", emoji: "🧅", name: "Imported Red Onion (Medium size)", price: 92, usual: 96, savings: 4, unit: "kg", period: "7D" },
  // 30D Best Deals
  { id: "lettuce-romaine-30d", emoji: "🥬", name: "Lettuce (Romaine)", price: 147, usual: 171, savings: 24, unit: "kg", period: "30D" },
  { id: "galunggong-30d", emoji: "🐟", name: "Local Round Scad (Galunggong)", price: 293, usual: 326, savings: 33, unit: "kg", period: "30D" },
  { id: "red-onion-30d", emoji: "🧅", name: "Imported Red Onion (Medium size)", price: 92, usual: 101, savings: 9, unit: "kg", period: "30D" },
  { id: "white-onion-30d", emoji: "🧅", name: "Imported White Onion (Medium size)", price: 104, usual: 114, savings: 10, unit: "kg", period: "30D" },
  { id: "avocado-30d", emoji: "🥑", name: "Avocado", price: 270, usual: 291, savings: 21, unit: "kg", period: "30D" },
  { id: "broccoli-30d", emoji: "🥦", name: "Broccoli", price: 136, usual: 145, savings: 9, unit: "kg", period: "30D" },
  { id: "chili-30d", emoji: "🌶️", name: "Chili (Siling Labuyo)", price: 163, usual: 173, savings: 10, unit: "kg", period: "30D" },
  { id: "alumahan-30d", emoji: "🐟", name: "Alumahan", price: 333, usual: 353, savings: 20, unit: "kg", period: "30D" },
  { id: "cabbage-30d", emoji: "🥬", name: "Cabbage Repolyo (Wonder Ball)", price: 69, usual: 73, savings: 4, unit: "kg", period: "30D" },
  { id: "tomato-30d", emoji: "🍅", name: "Tomato (Kamatis)", price: 63, usual: 66, savings: 3, unit: "kg", period: "30D" },
  // 90D Best Deals
  { id: "chili-90d", emoji: "🌶️", name: "Chili (Siling Labuyo)", price: 163, usual: 378, savings: 215, unit: "kg", period: "90D" },
  { id: "tomato-90d", emoji: "🍅", name: "Tomato (Kamatis)", price: 63, usual: 108, savings: 45, unit: "kg", period: "90D" },
  { id: "lettuce-romaine-90d", emoji: "🥬", name: "Lettuce (Romaine)", price: 147, usual: 243, savings: 96, unit: "kg", period: "90D" },
  { id: "red-onion-90d", emoji: "🧅", name: "Imported Red Onion (Medium size)", price: 92, usual: 133, savings: 41, unit: "kg", period: "90D" },
  { id: "local-red-onion-90d", emoji: "🧅", name: "Local Red Onion (Pulang Sibuyas)", price: 110, usual: 155, savings: 45, unit: "kg", period: "90D" },
  { id: "broccoli-90d", emoji: "🥦", name: "Broccoli", price: 136, usual: 188, savings: 52, unit: "kg", period: "90D" },
  { id: "lettuce-green-ice-90d", emoji: "🥬", name: "Lettuce (Green Ice)", price: 149, usual: 204, savings: 55, unit: "kg", period: "90D" },
  { id: "lettuce-iceberg-90d", emoji: "🥬", name: "Lettuce (Iceberg)", price: 206, usual: 273, savings: 67, unit: "kg", period: "90D" },
  { id: "potato-90d", emoji: "🥔", name: "White Potato (Patatas)", price: 102, usual: 130, savings: 28, unit: "kg", period: "90D" },
  { id: "avocado-90d", emoji: "🥑", name: "Avocado", price: 270, usual: 329, savings: 59, unit: "kg", period: "90D" },
];

const expensiveItems = [
  { id: "carrot", emoji: "🥕", name: "Carrot (Karot)", price: 165, usual: 113, increase: 46 },
  { id: "squash", emoji: "🎃", name: "Squash (Kalabasa)", price: 76, usual: 62, increase: 23 },
  { id: "beans", emoji: "🫘", name: "Baguio Beans (Habitchuelas)", price: 144, usual: 121, increase: 19 },
  { id: "watermelon", emoji: "🍉", name: "Watermelon", price: 89, usual: 80, increase: 11 },
  { id: "egg-brown-xl", emoji: "🥚", name: "Chicken Egg (Brown, Extra Large)", price: 11, usual: 10, increase: 10 },
  { id: "papaya", emoji: "🥭", name: "Papaya", price: 79, usual: 72, increase: 10 },
  { id: "rice-premium", emoji: "🍚", name: "Imported Premium", price: 59, usual: 54, increase: 9 },
  { id: "rice-milled", emoji: "🍚", name: "Imported Regular Milled", price: 44, usual: 41, increase: 7 },
  { id: "rice-local-milled", emoji: "🍚", name: "Local Well Milled", price: 48, usual: 45, increase: 7 },
  { id: "palm-oil", emoji: "🫒", name: "Palm Oil - 350ml", price: 38, usual: 36, increase: 6 },
];

// Full Bantay Presyo list with categories - comprehensive market data
const fullItemList = [
  // Fish - MURA
  { id: "galunggong", emoji: "🐟", name: "Local Round Scad (Galunggong)", price: 293.02, usual: 315, status: "MURA", category: "Fish" },
  { id: "alumahan", emoji: "🐟", name: "Alumahan", price: 332.69, usual: 356, status: "MURA", category: "Fish" },
  { id: "imported-galunggong", emoji: "🐟", name: "Imported Round Scad (Galunggong)", price: 292, usual: 295, status: "STABLE", category: "Fish" },
  { id: "milkfish", emoji: "🐟", name: "Milkfish (Bangus)", price: 228.25, usual: 235, status: "STABLE", category: "Fish" },
  { id: "sardines", emoji: "🐟", name: "Sardines (Tamban)", price: 153.57, usual: 158, status: "STABLE", category: "Fish" },
  { id: "tilapia", emoji: "🐟", name: "Tilapia", price: 154.05, usual: 154, status: "STABLE", category: "Fish" },
  
  // Vegetables - MURA
  { id: "red-onion-imported", emoji: "🧅", name: "Imported Red Onion (Medium size)", price: 91.75, usual: 96, status: "MURA", category: "Vegetables" },
  
  // Vegetables - STABLE
  { id: "white-onion-imported", emoji: "🧅", name: "Imported White Onion (Medium size)", price: 103.75, usual: 107, status: "STABLE", category: "Vegetables" },
  { id: "cabbage-wonder", emoji: "🥬", name: "Cabbage Repolyo (Wonder Ball)", price: 69.29, usual: 71, status: "STABLE", category: "Vegetables" },
  { id: "cabbage-rare", emoji: "🥬", name: "Cabbage Repolyo (Rare Ball)", price: 71.10, usual: 72, status: "STABLE", category: "Vegetables" },
  { id: "cabbage-scorpio", emoji: "🥬", name: "Cabbage Repolyo (Scorpio)", price: 81.45, usual: 82, status: "STABLE", category: "Vegetables" },
  { id: "celery", emoji: "🥬", name: "Celery", price: 157.61, usual: 159, status: "STABLE", category: "Vegetables" },
  { id: "potato", emoji: "🥔", name: "White Potato (Patatas)", price: 102.18, usual: 103, status: "STABLE", category: "Vegetables" },
  { id: "carrot", emoji: "🥕", name: "Carrot (Karot)", price: 164.89, usual: 165, status: "STABLE", category: "Vegetables" },
  { id: "pechay-tagalog", emoji: "🥬", name: "Pechay Tagalog", price: 73.26, usual: 74, status: "STABLE", category: "Vegetables" },
  { id: "pechay-baguio", emoji: "🥬", name: "Pechay Baguio", price: 78.49, usual: 79, status: "STABLE", category: "Vegetables" },
  { id: "lettuce-romaine", emoji: "🥬", name: "Lettuce (Romaine)", price: 146.89, usual: 146, status: "STABLE", category: "Vegetables" },
  { id: "lettuce-green-ice", emoji: "🥬", name: "Lettuce (Green Ice)", price: 149.29, usual: 146, status: "STABLE", category: "Vegetables" },
  { id: "broccoli", emoji: "🥦", name: "Broccoli", price: 135.71, usual: 135, status: "STABLE", category: "Vegetables" },
  { id: "chayote", emoji: "🥒", name: "Chayote (Sayote)", price: 58.71, usual: 58, status: "STABLE", category: "Vegetables" },
  { id: "bittergourd", emoji: "🥒", name: "Bittergourd (Ampalaya)", price: 132.18, usual: 129, status: "STABLE", category: "Vegetables" },
  { id: "tomato", emoji: "🍅", name: "Tomato (Kamatis)", price: 63.18, usual: 61, status: "STABLE", category: "Vegetables" },
  { id: "eggplant", emoji: "🍆", name: "Eggplant (Talong)", price: 94.89, usual: 90, status: "STABLE", category: "Vegetables" },
  { id: "ginger", emoji: "🫚", name: "Ginger (Luya)", price: 156.80, usual: 155, status: "STABLE", category: "Vegetables" },
  
  // Vegetables - MAHAL
  { id: "lettuce-iceberg", emoji: "🥬", name: "Lettuce (Iceberg)", price: 206.22, usual: 196, status: "MAHAL", category: "Vegetables" },
  { id: "squash", emoji: "🎃", name: "Squash (Kalabasa)", price: 76.43, usual: 72, status: "MAHAL", category: "Vegetables" },
  { id: "cauliflower", emoji: "🥦", name: "Cauliflower", price: 133.67, usual: 124, status: "MAHAL", category: "Vegetables" },
  { id: "bell-pepper-green", emoji: "🫑", name: "Bell Pepper (Green)", price: 298.57, usual: 252, status: "MAHAL", category: "Vegetables" },
  { id: "bell-pepper-red", emoji: "🫑", name: "Bell Pepper (Red)", price: 305.19, usual: 245, status: "MAHAL", category: "Vegetables" },
  
  // Fruits
  { id: "avocado", emoji: "🥑", name: "Avocado", price: 270.36, usual: 274, status: "STABLE", category: "Fruits" },
  { id: "watermelon", emoji: "🍉", name: "Watermelon", price: 89.38, usual: 84, status: "MAHAL", category: "Fruits" },
  { id: "papaya", emoji: "🥭", name: "Papaya", price: 79.39, usual: 74, status: "MAHAL", category: "Fruits" },
  { id: "banana-lakatan", emoji: "🍌", name: "Banana (Lakatan)", price: 99.63, usual: 99, status: "STABLE", category: "Fruits" },
  { id: "banana-latundan", emoji: "🍌", name: "Banana (Latundan)", price: 75.98, usual: 75, status: "STABLE", category: "Fruits" },
  { id: "banana-saba", emoji: "🍌", name: "Banana (Saba)", price: 56.97, usual: 56, status: "STABLE", category: "Fruits" },
  { id: "pomelo", emoji: "🍊", name: "Pomelo", price: 189.64, usual: 186, status: "STABLE", category: "Fruits" },
  { id: "melon", emoji: "🍈", name: "Melon", price: 107.09, usual: 105, status: "STABLE", category: "Fruits" },
  { id: "mango-carabao", emoji: "🥭", name: "Mango (Carabao)", price: 181.69, usual: 175, status: "STABLE", category: "Fruits" },
  
  // Rice
  { id: "rice-basmati", emoji: "🍚", name: "Basmati", price: 202.78, usual: 206, status: "STABLE", category: "Rice" },
  { id: "rice-imported-premium", emoji: "🍚", name: "Imported Premium", price: 58.83, usual: 59, status: "STABLE", category: "Rice" },
  { id: "rice-imported-special", emoji: "🍚", name: "Imported Other Special Rice", price: 60.68, usual: 61, status: "STABLE", category: "Rice" },
  { id: "rice-imported-glutinous", emoji: "🍚", name: "Imported Glutinous", price: 61.75, usual: 61, status: "STABLE", category: "Rice" },
  { id: "rice-imported-well-milled", emoji: "🍚", name: "Imported Well Milled", price: 47.85, usual: 48, status: "STABLE", category: "Rice" },
  { id: "rice-imported-milled", emoji: "🍚", name: "Imported Regular Milled", price: 43.57, usual: 43, status: "STABLE", category: "Rice" },
  { id: "rice-jasponica", emoji: "🍚", name: "Jasponica/Japonica", price: 63.70, usual: 63, status: "STABLE", category: "Rice" },
  { id: "rice-local-premium", emoji: "🍚", name: "Local Premium", price: 54.59, usual: 54, status: "STABLE", category: "Rice" },
  { id: "rice-local-special", emoji: "🍚", name: "Local Other Special Rice", price: 60.25, usual: 60, status: "STABLE", category: "Rice" },
  { id: "rice-local-glutinous", emoji: "🍚", name: "Local Glutinous", price: 73.98, usual: 75, status: "STABLE", category: "Rice" },
  { id: "rice-local-well-milled", emoji: "🍚", name: "Local Well Milled", price: 48.14, usual: 48, status: "STABLE", category: "Rice" },
  { id: "rice-local-milled", emoji: "🍚", name: "Local Regular Milled", price: 42.37, usual: 42, status: "STABLE", category: "Rice" },
  { id: "rice-benteng", emoji: "🍚", name: "P20 Benteng Bigas Meron Na", price: 20, usual: 20, status: "STABLE", category: "Rice" },
  
  // Spices
  { id: "garlic-local", emoji: "🧄", name: "Local Garlic (Bawang)", price: 384, usual: 390, status: "STABLE", category: "Spices" },
  { id: "garlic-imported", emoji: "🧄", name: "Imported Garlic (Bawang)", price: 149.93, usual: 149, status: "STABLE", category: "Spices" },
  { id: "onion-red-local", emoji: "🧅", name: "Local Red Onion (Pulang Sibuyas)", price: 109.57, usual: 109, status: "STABLE", category: "Spices" },
  { id: "onion-white-local", emoji: "🧅", name: "Local White Onion (Puting Sibuyas)", price: 95.82, usual: 95, status: "STABLE", category: "Spices" },
  { id: "calamansi", emoji: "🍋", name: "Calamansi", price: 129.14, usual: 131, status: "STABLE", category: "Spices" },
  { id: "chili-siling-labuyo", emoji: "🌶️", name: "Chili (Siling Labuyo)", price: 163, usual: 163, status: "STABLE", category: "Spices" },
  { id: "chili-green", emoji: "🌶️", name: "Chili (Green)", price: 95.98, usual: 98, status: "STABLE", category: "Spices" },
  { id: "sugar-washed", emoji: "🍬", name: "Sugar (Washed)", price: 75.02, usual: 75, status: "STABLE", category: "Spices" },
  { id: "sugar-brown", emoji: "🍬", name: "Sugar (Brown)", price: 73.63, usual: 74, status: "STABLE", category: "Spices" },
  { id: "sugar-refined", emoji: "🍬", name: "Sugar (Refined)", price: 82.46, usual: 82, status: "STABLE", category: "Spices" },
  
  // Eggs & Others
  { id: "egg-white-pewee", emoji: "🥚", name: "Chicken Egg (White, Pewee)", price: 6.63, usual: 7, status: "STABLE", category: "Others" },
  { id: "egg-white-extra-small", emoji: "🥚", name: "Chicken Egg (White, Extra Small)", price: 7.14, usual: 7, status: "STABLE", category: "Others" },
  { id: "egg-white-small", emoji: "🥚", name: "Chicken Egg (White, Small)", price: 7.61, usual: 8, status: "STABLE", category: "Others" },
  { id: "egg-white-medium", emoji: "🥚", name: "Chicken Egg (White, Medium)", price: 8.19, usual: 8, status: "STABLE", category: "Others" },
  { id: "egg-white-large", emoji: "🥚", name: "Chicken Egg (White, Large)", price: 8.72, usual: 9, status: "STABLE", category: "Others" },
  { id: "egg-white-extra-large", emoji: "🥚", name: "Chicken Egg (White, Extra Large)", price: 9.29, usual: 9, status: "STABLE", category: "Others" },
  { id: "egg-white-jumbo", emoji: "🥚", name: "Chicken Egg (White, Jumbo)", price: 9.95, usual: 10, status: "STABLE", category: "Others" },
  { id: "egg-brown-medium", emoji: "🥚", name: "Chicken Egg (Brown, Medium)", price: 11.33, usual: 11, status: "STABLE", category: "Others" },
  { id: "egg-brown-large", emoji: "🥚", name: "Chicken Egg (Brown, Large)", price: 12.50, usual: 13, status: "STABLE", category: "Others" },
  { id: "egg-brown-extra-large", emoji: "🥚", name: "Chicken Egg (Brown, Extra Large)", price: 11, usual: 11, status: "STABLE", category: "Others" },
  
  // Meats & Proteins
  { id: "whole-chicken", emoji: "🍗", name: "Whole Chicken", price: 197.64, usual: 196, status: "STABLE", category: "Meats" },
  { id: "beef-rump", emoji: "🥩", name: "Beef Rump", price: 488.24, usual: 487, status: "STABLE", category: "Meats" },
  { id: "beef-brisket", emoji: "🥩", name: "Beef Brisket", price: 434.71, usual: 431, status: "STABLE", category: "Meats" },
  { id: "pork-ham", emoji: "🍖", name: "Pork Ham", price: 334.32, usual: 331, status: "STABLE", category: "Meats" },
  { id: "pork-belly", emoji: "🥓", name: "Pork Belly", price: 388.17, usual: 383, status: "STABLE", category: "Meats" },
  { id: "frozen-liempo", emoji: "🍖", name: "Frozen Liempo", price: 312.90, usual: 312, status: "STABLE", category: "Meats" },
  { id: "frozen-kasim", emoji: "🍖", name: "Frozen Kasim", price: 255.18, usual: 255, status: "STABLE", category: "Meats" },
  { id: "squid", emoji: "🦑", name: "Squid (Pusit Bisaya)", price: 471.11, usual: 466, status: "STABLE", category: "Fish" },
  
  // Oils & Condiments
  { id: "palm-oil-1l", emoji: "🫒", name: "Palm Oil - 1L", price: 94.59, usual: 95, status: "STABLE", category: "Others" },
  { id: "palm-oil-350ml", emoji: "🫒", name: "Palm Oil - 350ml", price: 38.34, usual: 38, status: "STABLE", category: "Others" },
  { id: "coconut-oil-1l", emoji: "🥥", name: "Coconut Oil - 1L", price: 159.36, usual: 161, status: "STABLE", category: "Others" },
  { id: "coconut-oil-350ml", emoji: "🥥", name: "Coconut Oil - 350ml", price: 58.95, usual: 59, status: "STABLE", category: "Others" },
  
  // Legumes & Grains
  { id: "string-beans", emoji: "🫘", name: "String Beans (Sitao)", price: 134.11, usual: 134, status: "STABLE", category: "Vegetables" },
  { id: "mung-bean", emoji: "🫘", name: "Mung Bean", price: 135.89, usual: 132, status: "STABLE", category: "Vegetables" },
  { id: "baguio-beans", emoji: "🫘", name: "Baguio Beans (Habitchuelas)", price: 144.25, usual: 140, status: "STABLE", category: "Vegetables" },
  
  // Corn & Feed
  { id: "yellow-corn-cob", emoji: "🌽", name: "Yellow Sweet Corn (Cob)", price: 72.34, usual: 73, status: "STABLE", category: "Others" },
  { id: "corn-white", emoji: "🌽", name: "Corn (White)", price: 83.64, usual: 84, status: "STABLE", category: "Others" },
  { id: "corn-cracked", emoji: "🌽", name: "Corn Cracked (Yellow, Feed Grade)", price: 50, usual: 50, status: "STABLE", category: "Others" },
  { id: "corn-grits", emoji: "🌽", name: "Corn Grits (Feed Grade)", price: 46.67, usual: 47, status: "STABLE", category: "Others" },
];

const PAGE_SIZE = 10;
const categories = ["All", "Fish", "Vegetables", "Fruits", "Rice", "Spices", "Meats", "Others"];
const periods = ["7D", "30D", "90D"];

const carousel = [
  { emoji: "🐟", name: "Local Round Scad (Galunggong)", price: 293, savings: 22 },
  { emoji: "🥬", name: "Lettuce (Romaine)", price: 147, savings: 24 },
  { emoji: "🌶️", name: "Chili (Siling Labuyo)", price: 163, savings: 215 },
];

export function HomePage() {
  const [activePeriod, setActivePeriod] = useState("7D");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Best Deal");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showToast, setShowToast] = useState(false);
  const { basketToastVisible } = useApp();

  const toggleFav = (id: string) => setFavorites((f) => f.includes(id) ? f.filter((x) => x !== id) : [...f, id]);

  const statusColor = (s: string) => s === "MURA" ? "bg-green-100 text-green-700" : s === "MAHAL" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700";
  const statusDot = (s: string) => s === "MURA" ? "🟢" : s === "MAHAL" ? "🔴" : "🟡";

  // Filter best deals by period (7D = only 7D items, 30D = 7D + 30D, 90D = all)
  const filteredDeals = useMemo(() => {
    if (activePeriod === "7D") return allBestDeals.filter((i) => i.period === "7D");
    if (activePeriod === "30D") return allBestDeals.filter((i) => i.period === "7D" || i.period === "30D");
    return allBestDeals;
  }, [activePeriod]);

  // Filter and sort Bantay Presyo items
  const filteredItems = useMemo(() => {
    let items = activeCategory === "All" ? fullItemList : fullItemList.filter((i) => i.category === activeCategory);
    if (sortBy === "Name") items = [...items].sort((a, b) => a.name.localeCompare(b.name));
    else if (sortBy === "Price ↑") items = [...items].sort((a, b) => a.price - b.price);
    else if (sortBy === "Price ↓") items = [...items].sort((a, b) => b.price - a.price);
    else if (sortBy === "Best Deal") items = [...items].sort((a, b) => (b.usual - b.price) - (a.usual - a.price));
    return items;
  }, [activeCategory, sortBy]);

  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  const loadMore = () => setVisibleCount((c) => c + PAGE_SIZE);

  return (
    <div className="space-y-6">
      {/* Hero / Carousel */}
      <div className="rounded-2xl overflow-hidden shadow-md" style={{ background: "linear-gradient(135deg, #1B5E20, #2E7D32)" }}>
        <div className="p-6 md:p-8">
          <h1 className="text-white text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
            Ano ang mura ngayon? 🛒
          </h1>
          <p className="text-green-100 text-base mb-6">Find the best prices for your pamilihan needs today.</p>

          {/* Carousel card */}
          <div className="bg-white/15 backdrop-blur rounded-xl p-4 mb-4 flex items-center gap-4">
            <div className="text-5xl">{carousel[carouselIdx].emoji}</div>
            <div className="flex-1">
              <p className="text-white font-semibold text-lg">{carousel[carouselIdx].name}</p>
              <p className="text-green-200 text-sm">Current price</p>
              <p className="text-yellow-300 text-2xl font-bold">₱{carousel[carouselIdx].price}/kg</p>
            </div>
            <div className="text-right">
              <span className="inline-block bg-green-400 text-green-900 font-bold px-3 py-1 rounded-full text-sm">
                Save ₱{carousel[carouselIdx].savings}/kg
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {carousel.map((_, i) => (
              <button key={i} onClick={() => setCarouselIdx(i)}
                className={`h-2 rounded-full transition-all ${i === carouselIdx ? "bg-white w-6" : "bg-white/40 w-2"}`} />
            ))}
            <Link to="/sm-markets" className="ml-auto flex items-center gap-1 bg-white text-green-800 font-semibold px-4 py-2 rounded-full text-sm hover:bg-green-50 transition-colors">
              View All Best Deals <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* Best Deals Section */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-gray-800 dark:text-[#FFFFFF] flex items-center gap-2">
            🔥 Best Deals
          </h2>
          <div className="flex gap-1">
            {periods.map((p) => (
              <button key={p} onClick={() => setActivePeriod(p)}
                className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors ${
                  activePeriod === p ? "bg-green-600 text-white" : "bg-gray-100 dark:bg-[#1E1E1E] text-gray-600 dark:text-gray-300 hover:bg-green-50"
                }`}>{p}</button>
            ))}
          </div>
        </div>

        {filteredDeals.length === 0 ? (
          <p className="text-gray-400 text-sm py-6 text-center">No deals found for this period.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredDeals.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedProduct({ id: item.id, emoji: item.emoji, name: item.name, price: item.price, usualPrice: item.usual, status: "MURA", category: "Produce" })}
                className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-[#2D2D2D] hover:shadow-md transition-all cursor-pointer active:scale-95"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">{item.emoji}</span>
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-[#FFFFFF]">{item.name}</p>
                      <p className="text-gray-400 text-xs">per {item.unit || "kg"}</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-[#81C784]">🟢 MURA</span>
                </div>
                <div className="flex items-end gap-2 mb-3">
                  <span className="text-2xl font-bold text-green-700">₱{item.price}</span>
                  <span className="text-sm text-gray-400 line-through">₱{item.usual}</span>
                  <span className="text-xs text-green-600 font-medium ml-auto flex items-center gap-0.5">
                    <TrendingDown size={13} /> Save ₱{item.savings}/kg
                  </span>
                </div>
                <div className="flex gap-2">
                  <AddToBasketButton
                    productId={item.id}
                    productData={{
                      emoji: item.emoji,
                      name: item.name,
                      price: item.price,
                      usualPrice: item.usual,
                      unit: item.unit || "kg",
                    }}
                    variant="default"
                    className="flex-1"
                  />
                  <button className="flex items-center gap-1 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-600 text-orange-500 text-sm hover:bg-orange-50 transition-colors">
                    <Bell size={14} /> <AIBadge size="sm" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Getting Expensive */}
      <section>
        <h2 className="text-xl font-bold text-gray-800 dark:text-[#FFFFFF] flex items-center gap-2 mb-3">
          ⚠️ Getting Expensive
        </h2>
        <div className="space-y-2">
          {expensiveItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedProduct({ id: item.id, emoji: item.emoji, name: item.name, price: item.price, usualPrice: item.usual, status: "MAHAL", category: "Produce" })}
              className="bg-white dark:bg-[#1E1E1E] rounded-xl px-4 py-3 shadow-sm border border-red-50 dark:border-[#2D2D2D] flex items-center gap-3 cursor-pointer hover:shadow-md transition-all active:scale-95"
            >
              <span className="text-2xl">{item.emoji}</span>
              <div className="flex-1">
                <p className="font-semibold text-gray-800 dark:text-[#FFFFFF]">{item.name}</p>
                <p className="text-xs text-gray-400">Usual: ₱{item.usual}/kg</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-red-600 text-lg">₱{item.price}</p>
                <span className="text-xs font-bold text-red-500 flex items-center justify-end gap-0.5">
                  <TrendingUp size={12} /> +{item.increase}%
                </span>
              </div>
              <span className="text-xs font-bold px-2 py-1 rounded-full bg-red-100 text-red-700">🔴 MAHAL</span>
            </div>
          ))}
        </div>
      </section>

      {/* AI Price Predictor Teaser */}
      <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-2xl p-4 flex items-center gap-4">
        <div className="text-4xl">🤖</div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-semibold text-purple-800 dark:text-purple-300">AI Price Predictor</p>
            <AIBadge />
          </div>
          <p className="text-sm text-purple-700 dark:text-purple-400">
            Broccoli price predicted to <strong>drop ₱15/kg</strong> next week. Sitaw expected to rise soon.
          </p>
        </div>
        <Link to="/seasonal" className="flex-shrink-0 px-4 py-2 bg-purple-600 text-white rounded-xl text-sm font-medium hover:bg-purple-700 transition-colors">
          View Forecast
        </Link>
      </div>

      {/* Bantay Presyo */}
      <section>
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <h2 className="text-xl font-bold text-gray-800 dark:text-[#FFFFFF]">📊 Bantay Presyo</h2>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-1.5 bg-white dark:bg-[#1E1E1E] text-gray-700 dark:text-[#E0E0E0] outline-none"
          >
            <option>Best Deal</option>
            <option>Name</option>
            <option>Price ↑</option>
            <option>Price ↓</option>
          </select>
        </div>

        {/* Category filter chips */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-3">
          {categories.map((cat) => (
            <button key={cat} onClick={() => { setActiveCategory(cat); setVisibleCount(PAGE_SIZE); }}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat ? "bg-green-600 text-white" : "bg-white dark:bg-[#1E1E1E] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:bg-green-50"
              }`}>{cat}</button>
          ))}
        </div>

        <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-sm border border-gray-100 dark:border-[#2D2D2D] overflow-hidden">
          {visibleItems.length === 0 ? (
            <p className="text-center text-gray-400 py-8 text-sm">No items found.</p>
          ) : (
            visibleItems.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setSelectedProduct({ id: item.id, emoji: item.emoji, name: item.name, category: item.category, price: item.price, usualPrice: item.usual, status: item.status })}
                className={`flex items-center gap-3 px-4 py-3 ${idx !== visibleItems.length - 1 ? "border-b border-gray-50 dark:border-[#2D2D2D]" : ""} hover:bg-gray-50 dark:hover:bg-[#2D2D2D]/50 transition-colors cursor-pointer`}
              >
                <span className="text-2xl">{item.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 dark:text-[#FFFFFF] truncate">{item.name}</p>
                  <p className="text-xs text-gray-400">Usual: ₱{item.usual}/kg</p>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${statusColor(item.status)}`}>
                  {statusDot(item.status)} {item.status}
                </span>
                <span className="font-bold text-gray-800 dark:text-[#FFFFFF] text-base w-16 text-right">₱{item.price}</span>
                <button onClick={(e) => { e.stopPropagation(); toggleFav(item.id); }} className="text-gray-300 hover:text-red-400 transition-colors">
                  <Heart size={16} fill={favorites.includes(item.id) ? "#f87171" : "none"} stroke={favorites.includes(item.id) ? "#f87171" : "currentColor"} />
                </button>
                <div onClick={(e) => e.stopPropagation()}>
                  <AddToBasketButton
                    productId={item.id}
                    productData={{
                      emoji: item.emoji,
                      name: item.name,
                      price: item.price,
                      usualPrice: item.usual,
                      unit: "kg",
                    }}
                    variant="icon"
                  />
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex justify-center mt-4">
          {hasMore ? (
            <button
              onClick={loadMore}
              className="px-6 py-2 rounded-full border-2 border-green-600 text-green-700 font-semibold text-sm hover:bg-green-50 transition-colors"
            >
              Load More Items ({filteredItems.length - visibleCount} remaining)
            </button>
          ) : (
            <p className="text-xs text-gray-400 py-2">All {filteredItems.length} items shown</p>
          )}
        </div>
      </section>

      {/* Page Disclaimer */}
      <div className="border-t border-gray-200 dark:border-[#2D2D2D] pt-4 mt-4">
        <p className="text-xs text-gray-400 text-center">
          📋 Source: DA Bantay Presyo official price monitoring (90 commodities). Not a government app.
        </p>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          isOpen={!!selectedProduct}
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Toast Notification */}
      <Toast isVisible={basketToastVisible} onDismiss={() => {}} message="✅ Added to My Basket!" type="success" />
    </div>
  );
}