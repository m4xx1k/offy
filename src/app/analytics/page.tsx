"use client";

import {
  analyticsKeys,
  DailyStatsChart,
  DescriptionStats,
  EnglishLevelChart,
  ExperienceChart,
  OverviewSection,
  SalaryStats,
  SourceStatsChart,
  TopCompaniesTable,
  TopLocationsTable,
  WorkFormatChart,
} from "@/features/analytics";
import { useQueryClient } from "@tanstack/react-query";
import { BarChart3, RefreshCw } from "lucide-react";
import { useState } from "react";

export default function AnalyticsPage() {
  const queryClient = useQueryClient();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await queryClient.invalidateQueries({ queryKey: analyticsKeys.all });
    setTimeout(() => setIsRefreshing(false), 500);
  };

  return (
    <div className="min-h-screen py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10 shadow-lg shadow-indigo-500/10">
            <BarChart3 className="w-8 h-8 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Аналітика
            </h1>
            <p className="text-slate-500 mt-1">Огляд системи збору вакансій</p>
          </div>
        </div>

        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="glass-button px-4 py-2.5 rounded-xl flex items-center gap-2 disabled:opacity-50 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <RefreshCw
            className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
          />
          <span>Оновити</span>
        </button>
      </div>

      {/* Overview Stats */}
      <section className="mb-8">
        <OverviewSection />
      </section>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <SourceStatsChart />
        <WorkFormatChart />
      </div>

      {/* Daily Stats - Full Width */}
      <section className="mb-6">
        <DailyStatsChart />
      </section>

      {/* Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <TopCompaniesTable />
        <TopLocationsTable />
      </div>

      {/* More Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <EnglishLevelChart />
        <ExperienceChart />
      </div>

      {/* Salary and Description Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalaryStats />
        <DescriptionStats />
      </div>
    </div>
  );
}
