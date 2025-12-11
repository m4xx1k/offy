"use client";

import { cn } from "@/shared/lib/utils";
import type { Payload } from "recharts/types/component/DefaultTooltipContent";

// ============================================
// GlassTooltip - Базовий тултіп з glass ефектом
// ============================================

export interface GlassTooltipProps {
  className?: string;
  children: React.ReactNode;
}

function GlassTooltip({ className, children }: GlassTooltipProps) {
  return (
    <div
      className={cn(
        "bg-slate-900/95 backdrop-blur-xl border border-glass-border rounded-xl shadow-2xl shadow-black/50",
        className
      )}
    >
      {children}
    </div>
  );
}

// ============================================
// ChartTooltip - Тултіп для чартів (детальний)
// ============================================

export interface ChartTooltipProps {
  active?: boolean;
  payload?: Payload<number, string>[];
  label?: string;
  formatValue?: (value: number) => string;
  formatLabel?: (label: string) => string;
}

function ChartTooltip({
  active,
  payload,
  label,
  formatValue = (v) => v.toLocaleString("uk-UA"),
  formatLabel = (l) => l,
}: ChartTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <GlassTooltip className="p-3">
      <p className="text-sm font-medium text-glass-text mb-2 pb-2 border-b border-glass-border">
        {formatLabel(label || "")}
      </p>
      <div className="space-y-1.5">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs text-glass-text-muted">{entry.name}:</span>
            <span className="text-sm font-semibold text-glass-text ml-auto">
              {formatValue(entry.value as number)}
            </span>
          </div>
        ))}
      </div>
    </GlassTooltip>
  );
}

// ============================================
// SimpleChartTooltip - Простий тултіп для чартів
// ============================================

export interface SimpleChartTooltipProps {
  active?: boolean;
  payload?: Payload<number, string>[];
  label?: string;
  suffix?: string;
}

function SimpleChartTooltip({
  active,
  payload,
  label,
  suffix = "",
}: SimpleChartTooltipProps) {
  if (!active || !payload?.length) return null;

  const data = payload[0];

  return (
    <GlassTooltip className="px-3 py-2">
      <p className="text-xs text-glass-text-muted mb-1">{label}</p>
      <p className="text-base font-bold text-glass-text">
        {(data.value as number).toLocaleString("uk-UA")}
        {suffix}
      </p>
    </GlassTooltip>
  );
}

export { ChartTooltip, GlassTooltip, SimpleChartTooltip };
