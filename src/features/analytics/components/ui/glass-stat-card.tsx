"use client";

import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface GlassStatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function GlassStatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  className,
}: GlassStatCardProps) {
  return (
    <div
      className={cn(
        "glass-card rounded-2xl p-5 relative overflow-hidden group",
        className
      )}
    >
      {/* Декоративний елемент */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-indigo-500/20 to-purple-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <span className="text-sm text-slate-400 font-medium">{title}</span>
          {Icon && (
            <div className="p-2 rounded-xl bg-white/5 border border-white/10">
              <Icon className="w-4 h-4 text-indigo-400" />
            </div>
          )}
        </div>

        <div className="flex items-end gap-2">
          <span className="text-3xl font-bold text-white tracking-tight">
            {typeof value === "number" ? value.toLocaleString("uk-UA") : value}
          </span>
          {trend && (
            <span
              className={cn(
                "text-sm font-medium mb-1",
                trend.isPositive ? "text-emerald-400" : "text-rose-400"
              )}
            >
              {trend.isPositive ? "+" : ""}
              {trend.value}%
            </span>
          )}
        </div>

        {subtitle && <p className="text-xs text-slate-500 mt-2">{subtitle}</p>}
      </div>
    </div>
  );
}

