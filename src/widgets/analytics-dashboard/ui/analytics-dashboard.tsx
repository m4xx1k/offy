"use client";

import { GlassButton, GlassCard } from "@/shared/ui";
import { analyticsKeys } from "@/entities/analytics";
import { useQueryClient } from "@tanstack/react-query";
import { BarChart3, RefreshCw } from "lucide-react";
import { useState } from "react";

import {
  OverviewSection,
  SalaryStats,
  DescriptionStats,
  IngestAuditSection,
} from "./sections";
import {
  DailyStatsChart,
  EnglishLevelChart,
  ExperienceChart,
  SourceStatsChart,
  WorkFormatChart,
} from "./charts";
import { TopCompaniesTable, TopLocationsTable } from "./tables";

export function AnalyticsDashboard() {
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
          <GlassCard
            padding="sm"
            rounded="2xl"
            className="p-3 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 shadow-lg shadow-indigo-500/10"
          >
            <BarChart3 className="w-8 h-8 text-glass-accent" />
          </GlassCard>
          <div>
            <h1 className="text-3xl font-bold text-glass-text tracking-tight">
              Аналітика
            </h1>
            <p className="text-glass-text-subtle mt-1">
              Огляд системи збору вакансій
            </p>
          </div>
        </div>

        <GlassButton
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="gap-2"
        >
          <RefreshCw
            className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
          />
          <span>Оновити</span>
        </GlassButton>
      </div>

      {/* Overview Stats */}
      <section className="mb-8">
        <OverviewSection />
      </section>

      {/* Latest Ingest Audit */}
      <section className="mb-8">
        {/* fetch just the most recent item using cursor pagination with limit=1 */}
        <IngestAuditSection />
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
