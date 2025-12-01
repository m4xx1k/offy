// src/components/ui/glass-badge.tsx
import React from "react";
import { cn } from "@/lib/utils"; // Якщо у тебе є cn, або просто template literals

interface GlassBadgeProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md";
  variant?: "default" | "success" | "accent"; // Додав варіанти для акцентів
}

export const GlassBadge = ({
  children,
  className = "",
  size = "md",
  variant = "default",
}: GlassBadgeProps) => {
  const sizeStyles = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  };

  const variantStyles = {
    default: "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10",
    success: "bg-emerald-500/10 border-emerald-500/20 text-emerald-300",
    accent: "bg-indigo-500/10 border-indigo-500/20 text-indigo-300",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium border backdrop-blur-md transition-colors duration-200",
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
