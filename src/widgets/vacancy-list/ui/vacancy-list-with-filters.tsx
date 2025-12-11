"use client";

import { FiltersSidebar } from "@/features/vacancy-filters";
import { VacancyListWidget } from "./vacancy-list-widget";
import type { PaginatedResult, IVacancy } from "@/entities/vacancy";

interface VacancyListWithFiltersProps {
  initialData?: PaginatedResult<IVacancy>;
}

export function VacancyListWithFilters({
  initialData,
}: VacancyListWithFiltersProps) {
  return (
    <div className="flex gap-8">
      {/* Sidebar */}
      <FiltersSidebar className="hidden lg:block" />

      {/* Main content */}
      <div className="flex-1 min-w-0">
        <VacancyListWidget initialData={initialData} />
      </div>
    </div>
  );
}

