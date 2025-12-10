"use client"

import { useEnglishLevelStats } from "@/hooks/analytics/use-analytics"
import { useMemo } from "react"
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts"
import { ChartCardSkeleton, GlassChartCard, SimpleChartTooltip } from "../ui"

const LEVEL_COLORS: Record<string, string> = {
	Beginner: "#94a3b8",
	Elementary: "#64748b",
	"Pre-Intermediate": "#6366f1",
	Intermediate: "#8b5cf6",
	"Upper-Intermediate": "#a855f7",
	Advanced: "#22c55e",
	Fluent: "#10b981",
	null: "#475569",
}

const LEVEL_ORDER = [
	"Beginner",
	"Elementary",
	"Pre-Intermediate",
	"Intermediate",
	"Upper-Intermediate",
	"Advanced",
	"Fluent",
	null,
]

export function EnglishLevelChart() {
	const { data, isLoading, error } = useEnglishLevelStats()

	const chartData = useMemo(() => {
		if (!data) return []

		return data
			.map((item) => ({
				name: item.level || "Не вказано",
				count: item.count,
				percentage: item.percentage,
				level: item.level,
			}))
			.sort((a, b) => {
				const aIndex = LEVEL_ORDER.indexOf(a.level)
				const bIndex = LEVEL_ORDER.indexOf(b.level)
				return aIndex - bIndex
			})
	}, [data])

	if (error) {
		return (
			<GlassChartCard title="Рівні англійської">
				<div className="text-rose-400 text-center py-8">
					Помилка завантаження даних
				</div>
			</GlassChartCard>
		)
	}

	if (isLoading) {
		return <ChartCardSkeleton height="h-72" />
	}

	return (
		<GlassChartCard title="Рівні англійської" subtitle="Розподіл вимог до мови">
			<ResponsiveContainer width="100%" height={280}>
				<BarChart
					data={chartData}
					layout="vertical"
					margin={{ top: 5, right: 30, left: 90, bottom: 5 }}
				>
					<CartesianGrid
						strokeDasharray="3 3"
						stroke="rgba(255,255,255,0.04)"
						horizontal={false}
					/>
					<XAxis
						type="number"
						stroke="#64748b"
						fontSize={11}
						tickLine={false}
						axisLine={false}
					/>
					<YAxis
						type="category"
						dataKey="name"
						stroke="#94a3b8"
						fontSize={11}
						tickLine={false}
						axisLine={false}
						width={85}
					/>
					<Tooltip
						content={<SimpleChartTooltip suffix=" вакансій" />}
						cursor={{ fill: "rgba(255,255,255,0.03)" }}
					/>
					<Bar dataKey="count" radius={[0, 6, 6, 0]}>
						{chartData.map((entry, index) => (
							<Cell
								key={`cell-${index}`}
								fill={LEVEL_COLORS[String(entry.level)] || "#64748b"}
								className="transition-all duration-200 hover:brightness-125"
								style={{
									filter: `drop-shadow(0 0 6px ${LEVEL_COLORS[String(entry.level)] || "#64748b"}40)`,
								}}
							/>
						))}
					</Bar>
				</BarChart>
			</ResponsiveContainer>
		</GlassChartCard>
	)
}

