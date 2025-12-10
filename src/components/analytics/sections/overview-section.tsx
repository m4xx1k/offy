"use client"

import { useOverview } from "@/hooks/analytics/use-analytics"
import {
	Building2,
	CheckCircle2,
	Clock,
	Database,
	FileText,
	MapPin,
} from "lucide-react"
import { GlassStatCard, StatCardSkeleton } from "../ui"

export function OverviewSection() {
	const { data, isLoading, error } = useOverview()

	if (error) {
		return (
			<div className="glass-panel rounded-2xl p-6 text-rose-400">
				Помилка завантаження даних
			</div>
		)
	}

	if (isLoading || !data) {
		return (
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
				{Array.from({ length: 6 }).map((_, i) => (
					<StatCardSkeleton key={i} />
				))}
			</div>
		)
	}

	const processedPercentage =
		data.totalRawVacancies > 0
			? Math.round((data.totalProcessedVacancies / data.totalRawVacancies) * 100)
			: 0

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
			<GlassStatCard
				title="Всього Raw"
				value={data.totalRawVacancies}
				icon={Database}
				subtitle="Сирі вакансії"
			/>
			<GlassStatCard
				title="Оброблено"
				value={data.totalProcessedVacancies}
				icon={CheckCircle2}
				subtitle={`${processedPercentage}% від загального`}
				trend={{ value: processedPercentage, isPositive: true }}
			/>
			<GlassStatCard
				title="В черзі"
				value={data.totalPendingVacancies}
				icon={Clock}
				subtitle="Очікують обробки"
			/>
			<GlassStatCard
				title="Нормалізовано"
				value={data.totalNormalizedVacancies}
				icon={FileText}
				subtitle="Готові вакансії"
			/>
			<GlassStatCard
				title="Компанії"
				value={data.totalCompanies}
				icon={Building2}
				subtitle="Унікальних"
			/>
			<GlassStatCard
				title="Локації"
				value={data.totalLocations}
				icon={MapPin}
				subtitle="Унікальних міст"
			/>
		</div>
	)
}

