"use client";

import { DollarSign, Percent, TrendingDown, TrendingUp } from "lucide-react";
import { useSalaryStats } from "@/entities/analytics";
import { SOURCE_LABELS } from "@/shared/config/constants";
import { formatSalaryValue } from "@/entities/vacancy";
import { ChartCard, ChartCardSkeleton } from "../common";

export function SalaryStats() {
  const { data, isLoading, error } = useSalaryStats();

  if (error) {
    return (
      <ChartCard title="Статистика зарплат">
        <div className="text-rose-400 text-center py-8">
          Помилка завантаження даних
        </div>
      </ChartCard>
    );
  }

  if (isLoading) {
    return <ChartCardSkeleton height="h-64" />;
  }

  return (
    <ChartCard title="Статистика зарплат" subtitle="Аналіз по джерелах">
      <div className="space-y-4">
        {data?.map((item) => {
          const salaryPercentage = Math.round(
            (item.vacanciesWithSalary / item.totalVacancies) * 100
          );

          return (
            <div
              key={item.source}
              className="p-4 h-36 rounded-xl bg-glass-bg border border-glass-border hover:bg-glass-hover transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-base font-medium text-glass-text">
                  {SOURCE_LABELS[item.source] || item.source}
                </h4>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-glass-bg text-xs text-glass-text-muted">
                  <Percent className="w-3 h-3" />
                  <span>
                    {salaryPercentage}% з зарплатою ({item.vacanciesWithSalary}/
                    {item.totalVacancies})
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3 rounded-lg bg-glass-bg space-y-1">
                  <div className="flex items-center gap-1.5 text-glass-text-subtle text-[10px] uppercase tracking-wider">
                    <DollarSign className="w-3 h-3" />
                    <span>Середня (від)</span>
                  </div>
                  <p className="text-xl font-bold text-indigo-400">
                    {formatSalaryValue(item.avgSalaryFrom)}
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-glass-bg space-y-1">
                  <div className="flex items-center gap-1.5 text-glass-text-subtle text-[10px] uppercase tracking-wider">
                    <DollarSign className="w-3 h-3" />
                    <span>Середня (до)</span>
                  </div>
                  <p className="text-xl font-bold text-purple-400">
                    {formatSalaryValue(item.avgSalaryTo)}
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-glass-bg space-y-1">
                  <div className="flex items-center gap-1.5 text-glass-text-subtle text-[10px] uppercase tracking-wider">
                    <TrendingDown className="w-3 h-3" />
                    <span>Мінімальна</span>
                  </div>
                  <p className="text-xl font-bold text-glass-text">
                    {formatSalaryValue(item.minSalary)}
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-glass-bg space-y-1">
                  <div className="flex items-center gap-1.5 text-glass-text-subtle text-[10px] uppercase tracking-wider">
                    <TrendingUp className="w-3 h-3" />
                    <span>Максимальна</span>
                  </div>
                  <p className="text-xl font-bold text-emerald-400">
                    {formatSalaryValue(item.maxSalary)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </ChartCard>
  );
}
