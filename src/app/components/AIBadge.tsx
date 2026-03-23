import React from "react";

interface AIBadgeProps {
  label?: string;
  size?: "sm" | "md";
}

export function AIBadge({ label, size = "sm" }: AIBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-semibold bg-purple-100 text-purple-700 border border-purple-200 ${
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm"
      }`}
    >
      🤖 {label || "AI"}
    </span>
  );
}

export function AITip({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 p-3 rounded-xl bg-purple-50 border border-purple-100 text-purple-800 text-sm">
      <span className="text-base flex-shrink-0">🤖</span>
      <span>{children}</span>
    </div>
  );
}
