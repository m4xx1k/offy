"use client";

import { DataTable, ScrollArea } from "@/shared/ui";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Globe, MapPin } from "lucide-react";
import { useMemo } from "react";

import { useTopLocations, type LocationStats } from "@/entities/analytics";
import { ChartCard, TableSkeleton } from "../common";

type TableData = LocationStats & { rank: number };

const columnHelper = createColumnHelper<TableData>();

export function TopLocationsTable() {
  const { data, isLoading, error } = useTopLocations({ limit: 15 });

  const tableData = useMemo(() => {
    if (!data) return [];
    return data.map((item, index) => ({
      ...item,
      rank: index + 1,
    }));
  }, [data]);

  const maxCount = tableData[0]?.vacancyCount || 1;

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
            <span className="font-medium text-slate-200">
              {info.getValue()}
            </span>
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
          const count = info.getValue();
          const percentage = Math.round((count / maxCount) * 100);

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
          );
        },
        size: 140,
      }),
    ],
    [maxCount]
  );

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (error) {
    return (
      <ChartCard title="Топ локацій">
        <div className="text-rose-400 text-center py-8">
          Помилка завантаження даних
        </div>
      </ChartCard>
    );
  }

  if (isLoading) {
    return <TableSkeleton rows={10} />;
  }

  return (
    <ChartCard title="Топ локацій" subtitle="Популярні міста">
      <DataTable table={table} />
    </ChartCard>
  );
}
