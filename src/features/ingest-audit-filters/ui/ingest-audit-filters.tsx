// entities/ingest-audit/ui/ingest-audit-filters.tsx
"use client";

import { DatePickerWithRange } from "@/shared/ui/shadcn/date-range-picker";
import { useIngestFilter } from "../modal/store";

export function IngestAuditFilters() {
  const { date, setDate } = useIngestFilter();

  return (
    <div className="flex items-center gap-2">
      {/* Тут у майбутньому можна додати Dropdown для статусу або пошук по ID */}
      <DatePickerWithRange date={date} setDate={setDate} />
    </div>
  );
}
