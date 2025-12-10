"use client"

import { useWorkFormatStats } from "@/hooks/analytics/use-analytics"
import { useMemo } from "react"
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from "recharts"
import { ChartCardSkeleton, GlassChartCard } from "../ui"
import { useState } from "react"

const FORMAT_LABELS: Record<string, string> = {
	REMOTE: "Віддалено",
	OFFICE: "Офіс",
	HYBRID: "Гібрид",
	null: "Не вказано",
}

const FORMAT_COLORS: Record<string, string> = {
	REMOTE: "#22c55e",
	OFFICE: "#6366f1",
	HYBRID: "#f59e0b",
	null: "#64748b",
}

// Кастомний active shape для красивого hover
const renderActiveShape = (props: any) => {
	const {
		cx,
		cy,
		innerRadius,
		outerRadius,
		startAngle,
		endAngle,
		fill,
		payload,
		percent,
		value,
	} = props

	return (
		<g>
			{/* Glow ефект */}
			<Sector
				cx={cx}
				cy={cy}
				innerRadius={innerRadius - 4}
				outerRadius={outerRadius + 8}
				startAngle={startAngle}
				endAngle={endAngle}
				fill={fill}
				opacity={0.3}
				style={{ filter: "blur(8px)" }}
			/>
			{/* Основний сектор */}
			<Sector
				cx={cx}
				cy={cy}
				innerRadius={innerRadius}
				outerRadius={outerRadius + 6}
				startAngle={startAngle}
				endAngle={endAngle}
				fill={fill}
			/>
			{/* Внутрішнє кільце */}
			<Sector
				cx={cx}
				cy={cy}
				startAngle={startAngle}
				endAngle={endAngle}
				innerRadius={innerRadius - 4}
				outerRadius={innerRadius - 2}
				fill={fill}
			/>
			{/* Центральний текст */}
			<text
				x={cx}
				y={cy - 8}
				textAnchor="middle"
				fill="#fff"
				className="text-lg font-bold"
			>
				{payload.name}
			</text>
			<text
				x={cx}
				y={cy + 14}
				textAnchor="middle"
				fill="#94a3b8"
				className="text-sm"
			>
				{`${(percent * 100).toFixed(0)}% (${value.toLocaleString()})`}
			</text>
		</g>
	)
}

export function WorkFormatChart() {
	const { data, isLoading, error } = useWorkFormatStats()
	const [activeIndex, setActiveIndex] = useState(0)

	const chartData = useMemo(() => {
		if (!data) return []

		// Агрегуємо по формату роботи (об'єднуємо джерела)
		const aggregated = new Map<string | null, number>()

		for (const item of data) {
			const key = item.workFormat
			const current = aggregated.get(key) || 0
			aggregated.set(key, current + item.count)
		}

		return Array.from(aggregated.entries()).map(([format, count]) => ({
			name: FORMAT_LABELS[String(format)] || format || "Не вказано",
			value: count,
			format: format,
		}))
	}, [data])

	const total = chartData.reduce((acc, item) => acc + item.value, 0)

	if (error) {
		return (
			<GlassChartCard title="Формати роботи">
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
		<GlassChartCard
			title="Формати роботи"
			subtitle="Розподіл по типах зайнятості"
		>
			<div className="flex flex-col md:flex-row items-center gap-6">
				<ResponsiveContainer width="100%" height={260} className="md:w-1/2">
					<PieChart>
						<Pie
							data={chartData}
							cx="50%"
							cy="50%"
							innerRadius={65}
							outerRadius={95}
							paddingAngle={4}
							dataKey="value"
							activeIndex={activeIndex}
							activeShape={renderActiveShape}
							onMouseEnter={(_, index) => setActiveIndex(index)}
						>
							{chartData.map((entry, index) => (
								<Cell
									key={`cell-${index}`}
									fill={FORMAT_COLORS[String(entry.format)] || "#64748b"}
									stroke="transparent"
									className="transition-all duration-300 cursor-pointer"
								/>
							))}
						</Pie>
					</PieChart>
				</ResponsiveContainer>

				<div className="flex-1 space-y-3 w-full md:w-auto">
					{chartData.map((item, index) => {
						const percentage = Math.round((item.value / total) * 100)
						const isActive = index === activeIndex
						return (
							<div
								key={item.name}
								className={`flex items-center gap-3 p-2 rounded-lg transition-all cursor-pointer ${
									isActive ? "bg-white/5" : "hover:bg-white/5"
								}`}
								onMouseEnter={() => setActiveIndex(index)}
							>
								<div
									className={`w-3 h-3 rounded-full transition-transform ${
										isActive ? "scale-125" : ""
									}`}
									style={{
										backgroundColor:
											FORMAT_COLORS[String(item.format)] || "#64748b",
										boxShadow: isActive
											? `0 0 12px ${FORMAT_COLORS[String(item.format)] || "#64748b"}`
											: "none",
									}}
								/>
								<div className="flex-1">
									<div className="flex justify-between items-center mb-1">
										<span
											className={`text-sm ${isActive ? "text-white font-medium" : "text-slate-300"}`}
										>
											{item.name}
										</span>
										<span className="text-sm font-medium text-white">
											{percentage}%
										</span>
									</div>
									<div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
										<div
											className="h-full rounded-full transition-all duration-500"
											style={{
												width: `${percentage}%`,
												backgroundColor:
													FORMAT_COLORS[String(item.format)] || "#64748b",
											}}
										/>
									</div>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</GlassChartCard>
	)
}

