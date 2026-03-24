import React, { useMemo } from "react";
import { Plus } from "lucide-react";
import { useApp } from "../context/AppContext";

interface AddToBasketButtonProps {
  productId: string;
  productData: {
    emoji: string;
    name: string;
    price: number;
    usualPrice: number;
    unit?: string;
  };
  variant?: "default" | "icon" | "compact";
  className?: string;
}

export function AddToBasketButton({
  productId,
  productData,
  variant = "default",
  className = "",
}: AddToBasketButtonProps) {
  const { basket, addToBasket } = useApp();

  // Check if item is already in basket
  const isInBasket = useMemo(() => basket.some((b) => b.id === productId), [basket, productId]);

  const handleClick = () => {
    if (!isInBasket) {
      addToBasket({
        id: productId,
        emoji: productData.emoji,
        name: productData.name,
        price: productData.price,
        usualPrice: productData.usualPrice,
        unit: productData.unit || "kg",
      });
    }
  };

  // Default variant
  if (variant === "default") {
    return (
      <button
        onClick={handleClick}
        disabled={isInBasket}
        className={`flex items-center justify-center gap-1 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
          isInBasket
            ? "bg-green-700 text-white opacity-60 cursor-not-allowed"
            : "bg-green-600 text-white hover:bg-green-700 active:scale-95"
        } ${className}`}
      >
        {isInBasket ? (
          <>
            <span>✓</span> In My Basket
          </>
        ) : (
          <>
            <Plus size={14} /> Add to Basket
          </>
        )}
      </button>
    );
  }

  // Icon variant (small circular button)
  if (variant === "icon") {
    return (
      <button
        onClick={handleClick}
        disabled={isInBasket}
        title={isInBasket ? "Already in basket" : "Add to basket"}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
          isInBasket
            ? "bg-green-700 text-white opacity-60"
            : "bg-green-100 text-green-700 hover:bg-green-600 hover:text-white"
        } ${className}`}
      >
        {isInBasket ? <span className="text-sm">✓</span> : <Plus size={15} />}
      </button>
    );
  }

  // Compact variant (smaller)
  if (variant === "compact") {
    return (
      <button
        onClick={handleClick}
        disabled={isInBasket}
        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
          isInBasket
            ? "bg-green-700 text-white opacity-60 cursor-not-allowed"
            : "bg-green-600 text-white hover:bg-green-700"
        } ${className}`}
      >
        {isInBasket ? "✓ Added" : "+ Add"}
      </button>
    );
  }

  return null;
}
