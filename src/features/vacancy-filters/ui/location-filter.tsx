"use client";

import { GlassSelect } from "@/shared/ui";
import { useVacancyFiltersStore } from "../model/filters.store";
import { FilterSection } from "./filter-section";
import type { FiltersData } from "@/entities/vacancy";

interface LocationFilterProps {
  options: FiltersData["locations"];
}

export function LocationFilter({ options }: LocationFilterProps) {
  const selectedLocation = useVacancyFiltersStore((state) => state.location);
  const setLocation = useVacancyFiltersStore((state) => state.setLocation);

  const selectOptions = options.map((loc) => ({
    value: loc.city,
    label: `${loc.city}, ${loc.country}`,
  }));

  return (
    <FilterSection title="Локація">
      <GlassSelect
        options={selectOptions}
        placeholder="Будь-яка"
        value={selectedLocation || ""}
        onChange={(e) => setLocation(e.target.value)}
      />
    </FilterSection>
  );
}

