"use client"

import { useDailyStats } from "@/hooks/analytics/use-analytics"
import { format, parseISO, subDays } from "date-fns"
import { uk } from "date-fns/locale"
import { useMemo, useState } from "react"
import {
	Area,
	AreaChart,
	CartesianGrid,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts"
import { ChartCardSkeleton, ChartTooltip, GlassChartCard } from "../ui"

type Period = "7d" | "14d" | "30d" | "all"

const PERIODS: { value: Period; label: string }[] = [
	{ value: "7d", label: "7 днів" },
	{ value: "14d", label: "14 днів" },
	{ value: "30d", label: "30 днів" },
	{ value: "all", label: "Все" },
]

export function DailyStatsChart() {
	const [period, setPeriod] = useState<Period>("14d")

	const query = useMemo(() => {
		if (period === "all") return undefined

		const days = parseInt(period)
		const startDate = format(subDays(new Date(), days), "yyyy-MM-dd")

		return { startDate }
	}, [period])

	const { data, isLoading, error } = useDailyStats(query)

	const chartData = useMemo(() => {
		if (!data) return []

		// Групуємо по даті, об'єднуючи джерела
		const grouped = new Map<string, Record<string, number>>()

		for (const item of data) {
			if (!grouped.has(item.date)) {
				grouped.set(item.date, {})
			}
			const entry = grouped.get(item.date)!
			entry[item.source] = item.rawCount
			entry[`${item.source}_processed`] = item.processedCount
		}

		return Array.from(grouped.entries())
			.map(([date, values]) => ({
				date,
				dateFormatted: format(parseISO(date), "d MMM", { locale: uk }),
				...values,
			}))
			.sort((a, b) => a.date.localeCompare(b.date))
	}, [data])

	if (error) {
		return (
			<GlassChartCard title="Щоденна статистика">
				<div className="text-rose-400 text-center py-8">
					Помилка завантаження даних
				</div>
			</GlassChartCard>
		)
	}

	if (isLoading) {
		return <ChartCardSkeleton height="h-80" />
	}

	return (
		<GlassChartCard
			title="Щоденна статистика"
			subtitle="Кількість вакансій по днях"
			action={
				<div className="flex gap-1 p-1 bg-white/5 rounded-xl border border-white/5">
					{PERIODS.map((p) => (
						<button
							key={p.value}
							onClick={() => setPeriod(p.value)}
							className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
								period === p.value
									? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shadow-lg shadow-indigo-500/10"
									: "text-slate-500 hover:text-slate-300 hover:bg-white/5"
							}`}
						>
							{p.label}
						</button>
					))}
				</div>
			}
		>
			<ResponsiveContainer width="100%" height={320}>
				<AreaChart
					data={chartData}
					margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
				>
					<defs>
						<linearGradient id="colorDou" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stopColor="#6366f1" stopOpacity={0.4} />
							<stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
						</linearGradient>
						<linearGradient id="colorDjinni" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.4} />
							<stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
						</linearGradient>
						{/* Glow filters */}
						<filter id="glow-indigo" x="-20%" y="-20%" width="140%" height="140%">
							<feGaussianBlur stdDeviation="3" result="coloredBlur" />
							<feMerge>
								<feMergeNode in="coloredBlur" />
								<feMergeNode in="SourceGraphic" />
							</feMerge>
						</filter>
					</defs>
					<CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
					<XAxis
						dataKey="dateFormatted"
						stroke="#64748b"
						fontSize={11}
						tickLine={false}
						axisLine={false}
					/>
					<YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
					<Tooltip
						content={
							<ChartTooltip
								formatLabel={(label) => label}
								formatValue={(value) => value.toLocaleString("uk-UA")}
							/>
						}
					/>
					<Legend
						formatter={(value) => (
							<span className="text-slate-400 text-xs">
								{value === "dou" ? "DOU" : value === "djinni" ? "Djinni" : value}
							</span>
						)}
					/>
					<Area
						type="monotone"
						dataKey="dou"
						name="dou"
						stroke="#6366f1"
						fill="url(#colorDou)"
						strokeWidth={2.5}
						dot={false}
						activeDot={{
							r: 6,
							fill: "#6366f1",
							stroke: "#fff",
							strokeWidth: 2,
							filter: "url(#glow-indigo)",
						}}
					/>
					<Area
						type="monotone"
						dataKey="djinni"
						name="djinni"
						stroke="#8b5cf6"
						fill="url(#colorDjinni)"
						strokeWidth={2.5}
						dot={false}
						activeDot={{
							r: 6,
							fill: "#8b5cf6",
							stroke: "#fff",
							strokeWidth: 2,
						}}
					/>
				</AreaChart>
			</ResponsiveContainer>
		</GlassChartCard>
	)
}

