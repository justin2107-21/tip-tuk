import React from "react";
import { X } from "lucide-react";

interface ToastProps {
  isVisible: boolean;
  onDismiss: () => void;
  message?: string;
  type?: "success" | "error" | "info";
}

export function Toast({ isVisible, onDismiss, message = "Added to My Basket!", type = "success" }: ToastProps) {
  const bgColor = type === "success" ? "bg-green-600" : type === "error" ? "bg-red-600" : "bg-blue-600";
  const icon = type === "success" ? "✅" : type === "error" ? "❌" : "ℹ️";

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-auto z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className={`${bgColor} text-white rounded-lg px-4 py-3 flex items-center gap-3 shadow-lg`}>
        <span className="text-lg">{icon}</span>
        <span className="text-sm font-medium flex-1">{message}</span>
        <button 
          onClick={onDismiss}
          className="p-1 hover:bg-white/20 rounded transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
