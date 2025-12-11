"use client";

import { ArrowUpDown, FileText, Maximize2, Minimize2 } from "lucide-react";

import { useDescriptionStats } from "../../hooks";
import { SOURCE_LABELS } from "../../lib/constants";
import { formatLength } from "../../lib/formatters";
import { ChartCardSkeleton, GlassChartCard } from "../ui";

export function DescriptionStats() {
  const { data, isLoading, error } = useDescriptionStats();

  if (error) {
    return (
      <GlassChartCard title="Статистика описів">
        <div className="text-rose-400 text-center py-8">
          Помилка завантаження даних
        </div>
      </GlassChartCard>
    );
  }

  if (isLoading) {
    return <ChartCardSkeleton height="h-48" />;
  }

  return (
    <GlassChartCard
      title="Статистика описів"
      subtitle="Довжина тексту вакансій"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data?.map((item) => (
          <div
            key={item.source}
            className="p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-colors"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/5">
                <FileText className="w-4 h-4 text-indigo-400" />
              </div>
              <h4 className="font-medium text-white">
                {SOURCE_LABELS[item.source] || item.source}
              </h4>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-lg bg-white/[0.03] text-center">
                <div className="flex items-center justify-center gap-1 text-slate-500 text-[10px] uppercase tracking-wider mb-1">
                  <ArrowUpDown className="w-2.5 h-2.5" />
                  <span>Середня</span>
                </div>
                <p className="text-lg font-bold text-indigo-400">
                  {formatLength(item.avgLength)}
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-white/[0.03] text-center">
                <div className="flex items-center justify-center gap-1 text-slate-500 text-[10px] uppercase tracking-wider mb-1">
                  <ArrowUpDown className="w-2.5 h-2.5" />
                  <span>Медіана</span>
                </div>
                <p className="text-lg font-bold text-purple-400">
                  {formatLength(item.medianLength)}
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-white/[0.03] text-center">
                <div className="flex items-center justify-center gap-1 text-slate-500 text-[10px] uppercase tracking-wider mb-1">
                  <Minimize2 className="w-2.5 h-2.5" />
                  <span>Мін</span>
                </div>
                <p className="text-base font-semibold text-slate-300">
                  {formatLength(item.minLength)}
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-white/[0.03] text-center">
                <div className="flex items-center justify-center gap-1 text-slate-500 text-[10px] uppercase tracking-wider mb-1">
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
    </GlassChartCard>
  );
}

