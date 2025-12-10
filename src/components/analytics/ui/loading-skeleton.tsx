"use client"

import { cn } from "@/lib/utils"

interface SkeletonProps {
	className?: string
}

export function Skeleton({ className }: SkeletonProps) {
	return <div className={cn("animate-pulse bg-white/5 rounded-lg", className)} />
}

export function StatCardSkeleton() {
	return (
		<div className="glass-card rounded-2xl p-5">
			<div className="flex items-start justify-between mb-3">
				<Skeleton className="h-4 w-24" />
				<Skeleton className="h-8 w-8 rounded-xl" />
			</div>
			<Skeleton className="h-9 w-32" />
			<Skeleton className="h-3 w-20 mt-2" />
		</div>
	)
}

export function ChartCardSkeleton({ height = "h-64" }: { height?: string }) {
	return (
		<div className="glass-panel rounded-2xl p-6">
			<div className="flex items-start justify-between mb-6">
				<div>
					<Skeleton className="h-5 w-40" />
					<Skeleton className="h-4 w-24 mt-2" />
				</div>
			</div>
			<Skeleton className={cn("w-full rounded-xl", height)} />
		</div>
	)
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
	return (
		<div className="glass-panel rounded-2xl p-6">
			<Skeleton className="h-5 w-40 mb-6" />
			<div className="space-y-3">
				<div className="flex gap-4 pb-3 border-b border-white/10">
					<Skeleton className="h-4 w-8" />
					<Skeleton className="h-4 flex-1" />
					<Skeleton className="h-4 w-20" />
				</div>
				{Array.from({ length: rows }).map((_, i) => (
					<div key={i} className="flex gap-4 py-2">
						<Skeleton className="h-4 w-8" />
						<Skeleton className="h-4 flex-1" />
						<Skeleton className="h-4 w-20" />
					</div>
				))}
			</div>
		</div>
	)
}

