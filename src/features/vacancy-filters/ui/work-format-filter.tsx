"use client";

import { GlassCheckbox } from "@/shared/ui";
import { WORK_FORMAT_OPTIONS, type WorkFormatType } from "@/shared/config/constants";
import { useVacancyFiltersStore } from "../model/filters.store";
import { FilterSection } from "./filter-section";

export function WorkFormatFilter() {
  const selectedFormat = useVacancyFiltersStore((state) => state.workFormat);
  const setWorkFormat = useVacancyFiltersStore((state) => state.setWorkFormat);

  return (
    <FilterSection title="Формат роботи">
      <div className="space-y-2">
        {WORK_FORMAT_OPTIONS.map((fmt) => (
          <GlassCheckbox
            key={fmt.value}
            label={fmt.label}
            checked={selectedFormat === fmt.value}
            onCheckedChange={(checked) =>
              setWorkFormat(checked ? (fmt.value as WorkFormatType) : null)
            }
          />
        ))}
      </div>
    </FilterSection>
  );
}

