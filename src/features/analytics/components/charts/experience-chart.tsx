"use client";

import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useExperienceStats } from "../../hooks";
import { getExperienceColor, getExperienceLabel } from "../../lib/formatters";
import {
  ChartCardSkeleton,
  GlassChartCard,
  SimpleChartTooltip,
} from "../ui";

export function ExperienceChart() {
  const { data, isLoading, error } = useExperienceStats();

  const chartData = useMemo(() => {
    if (!data) return [];

    return data
      .map((item) => ({
        name: getExperienceLabel(item.years),
        count: item.count,
        percentage: item.percentage,
        years: item.years,
      }))
      .sort((a, b) => {
        if (a.years === null) return 1;
        if (b.years === null) return -1;
        return a.years - b.years;
      });
  }, [data]);

  if (error) {
    return (
      <GlassChartCard title="Досвід роботи">
        <div className="text-rose-400 text-center py-8">
          Помилка завантаження даних
        </div>
      </GlassChartCard>
    );
  }

  if (isLoading) {
    return <ChartCardSkeleton height="h-72" />;
  }

  return (
    <GlassChartCard title="Досвід роботи" subtitle="Розподіл вимог по рокам">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.04)"
          />
          <XAxis
            dataKey="name"
            stroke="#64748b"
            fontSize={10}
            tickLine={false}
            axisLine={false}
            angle={-35}
            textAnchor="end"
            height={65}
          />
          <YAxis
            stroke="#64748b"
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            content={<SimpleChartTooltip suffix=" вакансій" />}
            cursor={{ fill: "rgba(255,255,255,0.03)" }}
          />
          <Bar dataKey="count" radius={[6, 6, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={getExperienceColor(entry.years)}
                className="transition-all duration-200"
                style={{
                  filter: `drop-shadow(0 0 8px ${getExperienceColor(entry.years)}50)`,
                }}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </GlassChartCard>
  );
}

