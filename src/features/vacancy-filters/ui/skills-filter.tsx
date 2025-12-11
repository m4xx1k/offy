"use client";

import { useState } from "react";
import { GlassCheckbox, GlassInput } from "@/shared/ui";
import { useVacancyFiltersStore } from "../model/filters.store";
import { FilterSection } from "./filter-section";
import type { FiltersData } from "@/entities/vacancy";

interface SkillsFilterProps {
  options: FiltersData["skills"];
}

export function SkillsFilter({ options }: SkillsFilterProps) {
  const selectedSkills = useVacancyFiltersStore((state) => state.skills);
  const toggleSkill = useVacancyFiltersStore((state) => state.toggleSkill);

  const [localSearch, setLocalSearch] = useState("");

  const filteredOptions = options.filter((s) =>
    s.name.toLowerCase().includes(localSearch.toLowerCase())
  );

  return (
    <FilterSection
      title="Навички"
      className="flex flex-col h-full max-h-[200px]"
    >
      <GlassInput
        placeholder="Фільтр навичок..."
        inputSize="sm"
        className="mb-2"
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
      />
      <div className="overflow-y-auto pr-2 space-y-2 scrollbar-thin scrollbar-thumb-glass-border scrollbar-track-transparent">
        {filteredOptions.length > 0 ? (
          filteredOptions.map((skill) => (
            <GlassCheckbox
              key={skill.id}
              label={skill.name}
              checked={selectedSkills.includes(skill.name)}
              onCheckedChange={() => toggleSkill(skill.name)}
            />
          ))
        ) : (
          <p className="text-xs text-glass-text-subtle text-center py-2">
            Не знайдено
          </p>
        )}
      </div>
    </FilterSection>
  );
}

