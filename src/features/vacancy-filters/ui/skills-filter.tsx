"use client";

import { useState } from "react";
import { GlassCheckbox, GlassInput, ScrollArea } from "@/shared/ui";
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
    <FilterSection title="Навички" className="flex flex-col h-full max-h-64">
      <GlassInput
        placeholder="Фільтр навичок..."
        inputSize="sm"
        className="mb-2"
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
      />
      <ScrollArea className="h-44 px-2">
        {filteredOptions.length > 0 ? (
          filteredOptions.map((skill) => (
            <GlassCheckbox
              className="mt-2"
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
      </ScrollArea>
    </FilterSection>
  );
}
