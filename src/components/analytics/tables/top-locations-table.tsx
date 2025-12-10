"use client"

import { useTopLocations } from "@/hooks/analytics/use-analytics"
import { LocationStats } from "@/shared/types/analytics.types"
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table"
import { Globe, MapPin } from "lucide-react"
import { useMemo } from "react"
import { GlassChartCard, TableSkeleton } from "../ui"
import { ScrollArea } from "@/components/ui/scroll-area"

const columnHelper = createColumnHelper<LocationStats & { rank: number }>()

export function TopLocationsTable() {
	const { data, isLoading, error } = useTopLocations({ limit: 15 })

	const tableData = useMemo(() => {
		if (!data) return []
		return data.map((item, index) => ({
			...item,
			rank: index + 1,
		}))
	}, [data])

	const maxCount = tableData[0]?.vacancyCount || 1

	const columns = useMemo(
		() => [
			columnHelper.accessor("rank", {
				header: "#",
				cell: (info) => (
					<span className="text-slate-500 font-mono text-sm tabular-nums">
						{String(info.getValue()).padStart(2, "0")}
					</span>
				),
				size: 40,
			}),
			columnHelper.accessor("city", {
				header: "Місто",
				cell: (info) => (
					<div className="flex items-center gap-2.5">
						<div className="p-1.5 rounded-lg bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-white/5">
							<MapPin className="w-3.5 h-3.5 text-emerald-400" />
						</div>
						<span className="font-medium text-slate-200">{info.getValue()}</span>
					</div>
				),
			}),
			columnHelper.accessor("country", {
				header: "Країна",
				cell: (info) => (
					<div className="flex items-center gap-1.5 text-slate-500 text-xs">
						<Globe className="w-3 h-3" />
						<span>{info.getValue()}</span>
					</div>
				),
				size: 110,
			}),
			columnHelper.accessor("vacancyCount", {
				header: "Вакансій",
				cell: (info) => {
					const count = info.getValue()
					const percentage = Math.round((count / maxCount) * 100)

					return (
						<div className="flex items-center gap-2 min-w-[100px]">
							<div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
								<div
									className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
									style={{ width: `${percentage}%` }}
								/>
							</div>
							<span className="font-semibold text-white text-sm tabular-nums min-w-[35px] text-right">
								{count}
							</span>
						</div>
					)
				},
				size: 140,
			}),
		],
		[maxCount]
	)

	const table = useReactTable({
		data: tableData,
		columns,
		getCoreRowModel: getCoreRowModel(),
	})

	if (error) {
		return (
			<GlassChartCard title="Топ локацій">
				<div className="text-rose-400 text-center py-8">
					Помилка завантаження даних
				</div>
			</GlassChartCard>
		)
	}

	if (isLoading) {
		return <TableSkeleton rows={10} />
	}

	return (
		<GlassChartCard title="Топ локацій" subtitle="Популярні міста">
			<ScrollArea className="h-[360px] -mx-2 px-2">
				<table className="w-full">
					<thead className="sticky top-0 bg-slate-900/80 backdrop-blur-sm z-10">
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id} className="border-b border-white/10">
								{headerGroup.headers.map((header) => (
									<th
										key={header.id}
										className="text-left py-2.5 px-2 text-[10px] font-semibold text-slate-500 uppercase tracking-wider"
										style={{ width: header.getSize() }}
									>
										{flexRender(
											header.column.columnDef.header,
											header.getContext()
										)}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody>
						{table.getRowModel().rows.map((row) => (
							<tr
								key={row.id}
								className="border-b border-white/5 hover:bg-white/[0.03] transition-colors"
							>
								{row.getVisibleCells().map((cell) => (
									<td key={cell.id} className="py-2.5 px-2">
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</ScrollArea>
		</GlassChartCard>
	)
}

