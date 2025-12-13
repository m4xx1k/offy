"use client";

import { useMemo } from "react";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  IIngestAudit,
  IIngestSourceStat,
  useAuditHistory,
} from "@/entities/ingest-audit";
import { ChartCard, TableSkeleton } from "../common";
import { formatDuration, DataTable, SourceBadge } from "@/shared";
import { VacancySource } from "@/entities";
import { format } from "date-fns";
import { uk } from "date-fns/locale";
import { IngestStatusBadge } from "@/entities/ingest-audit/ui/ingest-status-badge";
import { useIngestFiltersQuery } from "@/features/ingest-audit-filters/modal/use-ingest-filters-query";
import { IngestAuditFilters } from "@/features/ingest-audit-filters/ui/ingest-audit-filters";

const columnHelper = createColumnHelper<IIngestAudit>();

export function IngestAuditTable() {
  const queryParams = useIngestFiltersQuery();
  const { data, isLoading } = useAuditHistory(queryParams);

  const audits = useMemo(
    () => data?.pages.flatMap((p) => p.items) || [],
    [data]
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: "ID",
        cell: (info) => (
          <span className="font-mono text-xs text-glass-text-subtle">
            {info.getValue().slice(0, 8)}...
          </span>
        ),
        size: 80,
      }),
      columnHelper.accessor("status", {
        header: "Статус",
        cell: (info) => (
          <span className="text-glass-text-subtle font-medium">
            <IngestStatusBadge status={info.getValue()} />
          </span>
        ),
        size: 100,
      }),
      columnHelper.accessor("startedAt", {
        header: "Час",
        cell: (info) => (
          <div className="flex flex-col gap-0.5">
            <span className="text-glass-text">
              {format(info.getValue(), "dd.MM.yy HH:mm", { locale: uk })}
            </span>
            <span className="text-xs text-slate-500">
              {formatDuration(info.row.original.durationMs)}
            </span>
          </div>
        ),
        size: 120,
      }),
      // Об'єднана статистика (Загальна)
      columnHelper.display({
        id: "totalStats",
        header: () => <div className="text-right">Вакансії</div>,
        cell: (info) => {
          const stats = info.row.original.sourceStats;
          const totalFound = stats.reduce(
            (s, it) => s + (it.itemsFound ?? 0),
            0
          );
          const totalSaved = stats.reduce(
            (s, it) => s + (it.itemsSaved ?? 0),
            0
          );

          return (
            <div className="text-right font-mono tabular-nums">
              <span className="text-indigo-300">{totalFound}</span>
              <span className="text-slate-600 mx-1">/</span>
              <span className="text-emerald-300">{totalSaved}</span>
            </div>
          );
        },
        size: 4 * 44,
      }),
      // Нова колонка "Деталі" замість розгортання
      columnHelper.accessor("sourceStats", {
        header: "Джерела",
        cell: (info) => (
          <div className="flex gap-2 ">
            {info.getValue().map((s: IIngestSourceStat) => (
              <div
                key={s.source}
                className=" w-32 flex items-center gap-1.5 bg-slate-800/50 border border-white/5 rounded px-1.5 py-1"
                title={`${s.source}: Found ${s.itemsFound} / Saved ${s.itemsSaved}`}
              >
                <VacancySource source={s.source} size="sm" />
                <div className="text-[10px] font-mono leading-none text-slate-400">
                  {s.itemsFound}/{s.itemsSaved}
                </div>
              </div>
            ))}
          </div>
        ),
      }),
    ],
    []
  );

  const table = useReactTable({
    data: audits,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <TableSkeleton rows={8} />;
  }

  return (
    <ChartCard
      action={<IngestAuditFilters />}
      title="Аудит інджеста"
      subtitle="Історія запусків та статистика"
    >
      <DataTable table={table} />
    </ChartCard>
  );
}

export default IngestAuditTable;
