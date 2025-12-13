// entities/ingest-audit/model/use-ingest-query.ts
import { useMemo } from "react";
import { endOfDay, format, startOfDay } from "date-fns";
import { useIngestFilter } from "./store"; // Імпорт вашого стору

export function useIngestFiltersQuery() {
  const date = useIngestFilter((state) => state.date);

  const queryParams = useMemo(() => {
    if (!date?.from) return {};

    return {
      from: startOfDay(date.from).toISOString(),

      // to: Кінець дня (23:59:59), якщо дата обрана
      to: date.to ? endOfDay(date.to).toISOString() : undefined,
    };
  }, [date]);

  return queryParams;
}
