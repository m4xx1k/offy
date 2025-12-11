"use client";

import type { Payload } from "recharts/types/component/DefaultTooltipContent";

interface ChartTooltipProps {
  active?: boolean;
  payload?: Payload<number, string>[];
  label?: string;
  formatValue?: (value: number) => string;
  formatLabel?: (label: string) => string;
}

export function ChartTooltip({
  active,
  payload,
  label,
  formatValue = (v) => v.toLocaleString("uk-UA"),
  formatLabel = (l) => l,
}: ChartTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl p-3 shadow-2xl shadow-black/50">
      <p className="text-sm font-medium text-white mb-2 pb-2 border-b border-white/10">
        {formatLabel(label || "")}
      </p>
      <div className="space-y-1.5">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs text-slate-400">{entry.name}:</span>
            <span className="text-sm font-semibold text-white ml-auto">
              {formatValue(entry.value as number)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface SimpleChartTooltipProps {
  active?: boolean;
  payload?: Payload<number, string>[];
  label?: string;
  suffix?: string;
}

export function SimpleChartTooltip({
  active,
  payload,
  label,
  suffix = "",
}: SimpleChartTooltipProps) {
  if (!active || !payload?.length) return null;

  const data = payload[0];

  return (
    <div className="bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl px-3 py-2 shadow-2xl shadow-black/50">
      <p className="text-xs text-slate-400 mb-1">{label}</p>
      <p className="text-base font-bold text-white">
        {(data.value as number).toLocaleString("uk-UA")}
        {suffix}
      </p>
    </div>
  );
}

