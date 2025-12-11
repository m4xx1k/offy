"use client";

import { ArrowUpDown, FileText, Maximize2, Minimize2 } from "lucide-react";
import { useDescriptionStats } from "@/entities/analytics";
import { SOURCE_LABELS } from "@/shared/config/constants";
import { formatLength } from "@/shared/lib/formatters";
import { ChartCard, ChartCardSkeleton } from "../common";

export function DescriptionStats() {
  const { data, isLoading, error } = useDescriptionStats();

  if (error) {
    return (
      <ChartCard title="Статистика описів">
        <div className="text-rose-400 text-center py-8">
          Помилка завантаження даних
        </div>
      </ChartCard>
    );
  }

  if (isLoading) {
    return <ChartCardSkeleton height="h-48" />;
  }

  return (
    <ChartCard title="Статистика описів" subtitle="Довжина тексту вакансій">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data?.map((item) => (
          <div
            key={item.source}
            className="p-4 rounded-xl bg-glass-bg border border-glass-border hover:bg-glass-hover transition-colors"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-glass-border">
                <FileText className="w-4 h-4 text-glass-accent" />
              </div>
              <h4 className="font-medium text-glass-text">
                {SOURCE_LABELS[item.source] || item.source}
              </h4>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-lg bg-glass-bg text-center">
                <div className="flex items-center justify-center gap-1 text-glass-text-subtle text-[10px] uppercase tracking-wider mb-1">
                  <ArrowUpDown className="w-2.5 h-2.5" />
                  <span>Середня</span>
                </div>
                <p className="text-lg font-bold text-indigo-400">
                  {formatLength(item.avgLength)}
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-glass-bg text-center">
                <div className="flex items-center justify-center gap-1 text-glass-text-subtle text-[10px] uppercase tracking-wider mb-1">
                  <ArrowUpDown className="w-2.5 h-2.5" />
                  <span>Медіана</span>
                </div>
                <p className="text-lg font-bold text-purple-400">
                  {formatLength(item.medianLength)}
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-glass-bg text-center">
                <div className="flex items-center justify-center gap-1 text-glass-text-subtle text-[10px] uppercase tracking-wider mb-1">
                  <Minimize2 className="w-2.5 h-2.5" />
                  <span>Мін</span>
                </div>
                <p className="text-base font-semibold text-glass-text">
                  {formatLength(item.minLength)}
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-glass-bg text-center">
                <div className="flex items-center justify-center gap-1 text-glass-text-subtle text-[10px] uppercase tracking-wider mb-1">
                  <Maximize2 className="w-2.5 h-2.5" />
                  <span>Макс</span>
                </div>
                <p className="text-base font-semibold text-emerald-400">
                  {formatLength(item.maxLength)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}

