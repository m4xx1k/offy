"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useSourceStats } from "@/entities/analytics";
import { SOURCE_LABELS } from "@/shared/config/constants";
import { ChartTooltip } from "@/shared/ui";
import { ChartCard, ChartCardSkeleton } from "../common";

export function SourceStatsChart() {
  const { data, isLoading, error } = useSourceStats();

  if (error) {
    return (
      <ChartCard title="Статистика по джерелах">
        <div className="text-rose-400 text-center py-8">
          Помилка завантаження даних
        </div>
      </ChartCard>
    );
  }

  if (isLoading || !data) {
    return <ChartCardSkeleton height="h-72" />;
  }

  const chartData = data.map((item) => ({
    name: SOURCE_LABELS[item.source] || item.source,
    source: item.source,
    Всього: item.totalCount,
    Оброблено: item.processedCount,
    "В черзі": item.pendingCount,
  }));

  return (
    <ChartCard
      title="Статистика по джерелах"
      subtitle="Розбивка по DOU та Djinni"
    >
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.06)"
          />
          <XAxis
            dataKey="name"
            stroke="#64748b"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#64748b"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => value.toLocaleString()}
          />
          <Tooltip
            content={<ChartTooltip />}
            cursor={{ fill: "rgba(255,255,255,0.03)" }}
          />
          <Legend
            wrapperStyle={{ paddingTop: "16px" }}
            formatter={(value) => (
              <span className="text-slate-400 text-xs">{value}</span>
            )}
          />
          <Bar
            dataKey="Всього"
            fill="#6366f1"
            radius={[6, 6, 0, 0]}
            className="drop-shadow-[0_0_8px_rgba(99,102,241,0.3)]"
          />
          <Bar
            dataKey="Оброблено"
            fill="#22c55e"
            radius={[6, 6, 0, 0]}
            className="drop-shadow-[0_0_8px_rgba(34,197,94,0.3)]"
          />
          <Bar
            dataKey="В черзі"
            fill="#f59e0b"
            radius={[6, 6, 0, 0]}
            className="drop-shadow-[0_0_8px_rgba(245,158,11,0.3)]"
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

