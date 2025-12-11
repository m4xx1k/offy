"use client";

import { DollarSign, Percent, TrendingDown, TrendingUp } from "lucide-react";

import { useSalaryStats } from "../../hooks";
import { SOURCE_LABELS } from "../../lib/constants";
import { formatSalary } from "../../lib/formatters";
import { ChartCardSkeleton, GlassChartCard } from "../ui";

export function SalaryStats() {
  const { data, isLoading, error } = useSalaryStats();

  if (error) {
    return (
      <GlassChartCard title="Статистика зарплат">
        <div className="text-rose-400 text-center py-8">
          Помилка завантаження даних
        </div>
      </GlassChartCard>
    );
  }

  if (isLoading) {
    return <ChartCardSkeleton height="h-64" />;
  }

  return (
    <GlassChartCard title="Статистика зарплат" subtitle="Аналіз по джерелах">
      <div className="space-y-4">
        {data?.map((item) => {
          const salaryPercentage = Math.round(
            (item.vacanciesWithSalary / item.totalVacancies) * 100
          );

          return (
            <div
              key={item.source}
              className="p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-base font-medium text-white">
                  {SOURCE_LABELS[item.source] || item.source}
                </h4>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 text-xs text-slate-400">
                  <Percent className="w-3 h-3" />
                  <span>
                    {salaryPercentage}% з зарплатою ({item.vacanciesWithSalary}/
                    {item.totalVacancies})
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3 rounded-lg bg-white/[0.03] space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-500 text-[10px] uppercase tracking-wider">
                    <DollarSign className="w-3 h-3" />
                    <span>Середня (від)</span>
                  </div>
                  <p className="text-xl font-bold text-indigo-400">
                    {formatSalary(item.avgSalaryFrom)}
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-white/[0.03] space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-500 text-[10px] uppercase tracking-wider">
                    <DollarSign className="w-3 h-3" />
                    <span>Середня (до)</span>
                  </div>
                  <p className="text-xl font-bold text-purple-400">
                    {formatSalary(item.avgSalaryTo)}
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-white/[0.03] space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-500 text-[10px] uppercase tracking-wider">
                    <TrendingDown className="w-3 h-3" />
                    <span>Мінімальна</span>
                  </div>
                  <p className="text-xl font-bold text-slate-300">
                    {formatSalary(item.minSalary)}
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-white/[0.03] space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-500 text-[10px] uppercase tracking-wider">
                    <TrendingUp className="w-3 h-3" />
                    <span>Максимальна</span>
                  </div>
                  <p className="text-xl font-bold text-emerald-400">
                    {formatSalary(item.maxSalary)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </GlassChartCard>
  );
}

