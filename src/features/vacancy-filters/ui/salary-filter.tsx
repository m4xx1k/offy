"use client";

import { GlassInput } from "@/shared/ui";
import { useVacancyFiltersStore } from "../model/filters.store";
import { FilterSection } from "./filter-section";

export function SalaryFilter() {
  const { salaryMin, salaryMax, setSalaryMin, setSalaryMax } =
    useVacancyFiltersStore();

  return (
    <FilterSection title="Зарплата ($)">
      <div className="flex gap-2 items-center">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-glass-text-subtle text-xs">
            від
          </span>
          <GlassInput
            type="number"
            min={0}
            value={salaryMin || ""}
            onChange={(e) =>
              setSalaryMin(e.target.value ? Number(e.target.value) : null)
            }
            className="pl-8 text-right"
          />
        </div>
        <span className="text-glass-text-subtle">-</span>
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-glass-text-subtle text-xs">
            до
          </span>
          <GlassInput
            type="number"
            min={0}
            value={salaryMax || ""}
            onChange={(e) =>
              setSalaryMax(e.target.value ? Number(e.target.value) : null)
            }
            className="pl-8 text-right"
          />
        </div>
      </div>
    </FilterSection>
  );
}

