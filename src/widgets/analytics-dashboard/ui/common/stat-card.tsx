"use client";

import { cn } from "@/shared/lib/utils";
import { GlassCard, GlassCardDecorations } from "@/shared/ui";
import type { LucideIcon } from "lucide-react";

export interface StatCardProps {
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

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  className,
}: StatCardProps) {
  return (
    <GlassCard
      variant="interactive"
      hoverable
      padding="md"
      rounded="2xl"
      className={cn("overflow-hidden group", className)}
    >
      <GlassCardDecorations variant="gradient" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <span className="text-sm text-glass-text-muted font-medium">
            {title}
          </span>
          {Icon && (
            <div className="p-2 rounded-xl bg-glass-bg border border-glass-border">
              <Icon className="w-4 h-4 text-glass-accent" />
            </div>
          )}
        </div>

        <div className="flex items-end gap-2">
          <span className="text-3xl font-bold text-glass-text tracking-tight">
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

        {subtitle && (
          <p className="text-xs text-glass-text-subtle mt-2">{subtitle}</p>
        )}
      </div>
    </GlassCard>
  );
}
