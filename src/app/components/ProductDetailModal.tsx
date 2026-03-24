import React, { useMemo } from "react";
import { X, ArrowLeft, Share2, TrendingDown } from "lucide-react";
import { useApp } from "../context/AppContext";

interface PricePoint {
  date: string;
  price: number;
}

interface ProductDetailModalProps {
  isOpen: boolean;
  product: {
    id: string;
    emoji: string;
    name: string;
    category?: string;
    price: number;
    usualPrice: number;
    status?: "MURA" | "STABLE" | "MAHAL";
    priceHistory?: PricePoint[];
  };
  onClose: () => void;
}

export function ProductDetailModal({ isOpen, product, onClose }: ProductDetailModalProps) {
  const { basket, addToBasket } = useApp();
  const [timePeriod, setTimePeriod] = React.useState<"7D" | "30D" | "90D">("7D");

  // Check if item is already in basket
  const isInBasket = useMemo(() => basket.some((b) => b.id === product.id), [basket, product.id]);

  // Generate mock price history if not provided
  const priceHistory = useMemo(() => {
    if (product.priceHistory) return product.priceHistory;
    const days = timePeriod === "7D" ? 7 : timePeriod === "30D" ? 30 : 90;
    const basePrice = product.price;
    const variation = 15;
    
    return Array.from({ length: days }).map((_, i) => ({
      date: new Date(Date.now() - (days - i - 1) * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      price: basePrice + (Math.random() - 0.5) * variation,
    }));
  }, [product, timePeriod]);

  // Calculate statistics
  const stats = useMemo(() => {
    const prices = priceHistory.map((p) => p.price);
    const low = Math.min(...prices);
    const high = Math.max(...prices);
    const avg = prices.reduce((a, b) => a + b, 0) / prices.length;
    const prevailing = product.usualPrice;
    return {
      low: low.toFixed(2),
      high: high.toFixed(2),
      prevailing: prevailing.toFixed(2),
      average: avg.toFixed(2),
    };
  }, [priceHistory, product.usualPrice]);

  if (!isOpen) return null;

  const priceDiff = product.price - product.usualPrice;
  const percentageChangeNum = (priceDiff / product.usualPrice) * 100;
  const percentageChange = percentageChangeNum.toFixed(1);
  const statusColor = (s: string) =>
    s === "MURA" ? "bg-green-100 text-green-700" : s === "MAHAL" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700";
  const statusDot = (s: string) => (s === "MURA" ? "🟢" : s === "MAHAL" ? "🔴" : "🟡");

  return (
    <div className="fixed inset-0 bg-black/50 z-[1050] flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white dark:bg-[#1E1E1E] rounded-2xl w-full max-w-md max-h-[85vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-[#1E1E1E] border-b border-gray-100 dark:border-[#2D2D2D] px-5 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3 flex-1">
            <button onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-[#2D2D2D]">
              <ArrowLeft size={20} className="text-gray-600 dark:text-gray-300" />
            </button>
            <div>
              <p className="font-bold text-lg text-gray-800 dark:text-[#FFFFFF]">{product.name}</p>
              {product.category && <p className="text-xs text-gray-400">{product.category}</p>}
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-[#2D2D2D]">
            <X size={20} className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-6">
          {/* Product Header with Price */}
          <div className="flex items-start gap-4">
            <span className="text-6xl">{product.emoji}</span>
            <div className="flex-1">
              <div className="flex items-baseline gap-2 mb-2">
                <p className="text-4xl font-bold text-green-700">₱{product.price.toFixed(2)}</p>
                <span className="text-sm text-gray-500">/kg</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Usually ₱{product.usualPrice.toFixed(2)} — {priceDiff >= 0 ? "+" : ""}₱{priceDiff.toFixed(2)}/kg</p>
              {product.status && (
                <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${statusColor(product.status)}`}>
                  {statusDot(product.status)} {product.status}
                </span>
              )}
            </div>
          </div>

          {/* Price Trend Chart */}
          <div className="border border-gray-100 dark:border-[#2D2D2D] rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800 dark:text-[#FFFFFF]">📈 Price Trend ({timePeriod})</h3>
              <div className="flex gap-1">
                {(["7D", "30D", "90D"] as const).map((period) => (
                  <button
                    key={period}
                    onClick={() => setTimePeriod(period)}
                    className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                      timePeriod === period
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 dark:bg-[#2D2D2D] text-gray-600 dark:text-gray-300 hover:bg-green-50"
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive line chart visualization */}
            <div className="border border-gray-100 dark:border-[#2D2D2D] rounded-lg p-4 bg-gray-50 dark:bg-[#0A0A0A]">
              <svg width="100%" height="200" viewBox="0 0 100 100" preserveAspectRatio="none" className="mb-2">
                {/* Grid lines */}
                <line x1="0" y1="25" x2="100" y2="25" stroke="#e5e7eb" strokeWidth="0.3" />
                <line x1="0" y1="50" x2="100" y2="50" stroke="#e5e7eb" strokeWidth="0.3" />
                <line x1="0" y1="75" x2="100" y2="75" stroke="#e5e7eb" strokeWidth="0.3" />

                {/* Calculate line path */}
                {(() => {
                  const minPrice = Math.min(...priceHistory.map((p) => p.price));
                  const maxPrice = Math.max(...priceHistory.map((p) => p.price));
                  const range = maxPrice - minPrice || 1;
                  const points = priceHistory
                    .map((point, i) => {
                      const x = (i / (priceHistory.length - 1 || 1)) * 100;
                      const y = 100 - ((point.price - minPrice) / range) * 80 - 10;
                      return { x, y, price: point.price };
                    });
                  const pathData = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
                  return (
                    <>
                      {/* Line path */}
                      <path d={pathData} fill="none" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      {/* Points/dots */}
                      {points.map((point, i) => (
                        <circle key={i} cx={point.x} cy={point.y} r="1" fill="#16a34a" />
                      ))}
                    </>
                  );
                })()}
              </svg>

              {/* Date labels */}
              <div className="flex justify-between text-xs text-gray-500 px-1">
                <span>{priceHistory[0]?.date}</span>
                {priceHistory.length > 2 && <span>{priceHistory[Math.floor(priceHistory.length / 2)]?.date}</span>}
                <span>{priceHistory[priceHistory.length - 1]?.date}</span>
              </div>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="border border-gray-100 dark:border-[#2D2D2D] rounded-xl p-4">
            <h3 className="font-semibold text-gray-800 dark:text-[#FFFFFF] mb-3">Price Breakdown</h3>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Low:</span>
                <span className="font-semibold text-gray-800 dark:text-[#FFFFFF]">₱{stats.low}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">High:</span>
                <span className="font-semibold text-gray-800 dark:text-[#FFFFFF]">₱{stats.high}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Prevailing:</span>
                <span className="font-semibold text-gray-800 dark:text-[#FFFFFF]">₱{stats.prevailing}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-[#2D2D2D]">
                <span className="text-sm text-gray-600 dark:text-gray-400">{timePeriod}-Day Average:</span>
                <span className="font-semibold text-gray-800 dark:text-[#FFFFFF]">₱{stats.average}</span>
              </div>
            </div>
          </div>

          {/* Status Message */}
          <div className={`p-3 rounded-lg ${percentageChangeNum > 0 ? "bg-red-50 dark:bg-red-900/20" : "bg-green-50 dark:bg-green-900/20"}`}>
            <p className={`text-sm font-medium ${percentageChangeNum > 0 ? "text-red-700 dark:text-red-400" : "text-green-700 dark:text-green-400"}`}>
              {percentageChangeNum > 0 ? "⚠️" : "✅"} {Math.abs(percentageChangeNum).toFixed(1)}% {percentageChangeNum > 0 ? "above" : "below"} {timePeriod}-day average
            </p>
          </div>

          {/* Data Source Info */}
          <div className="bg-gray-50 dark:bg-[#2D2D2D] rounded-lg p-3 space-y-1">
            <p className="text-xs text-gray-600 dark:text-gray-400">
              📋 Source: DA.gov.ph Bantay Presyo
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              🕐 Updated yesterday
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              📊 {priceHistory.length} data points tracked
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => {
                navigator.share({
                  title: product.name,
                  text: `Check out ${product.name} at ₱${product.price.toFixed(2)}/kg - Available at Bantay Presyo`,
                }).catch(() => {
                  // Fallback for browsers that don't support share
                  const text = `${product.name} - ₱${product.price.toFixed(2)}/kg\nUsually ₱${product.usualPrice.toFixed(2)}/kg`;
                  navigator.clipboard.writeText(text);
                });
              }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-[#2D2D2D] transition-colors"
            >
              <Share2 size={18} />
              Share This Price
            </button>
            <button
              onClick={() => {
                if (!isInBasket) {
                  addToBasket({
                    id: product.id,
                    emoji: product.emoji,
                    name: product.name,
                    price: product.price,
                    usualPrice: product.usualPrice,
                    unit: "kg",
                  });
                  setTimeout(onClose, 300);
                }
              }}
              disabled={isInBasket}
              className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
                isInBasket
                  ? "bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300 cursor-not-allowed opacity-50"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {isInBasket ? "✓ In My Basket" : "Add to My Basket"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
