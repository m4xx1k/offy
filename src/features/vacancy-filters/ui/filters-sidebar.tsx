"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { GlassCard, GlassButton } from "@/shared/ui";
import { useVacancyFiltersStore } from "../model/filters.store";
import { useFiltersData } from "../model/use-filters-data";
import { FiltersSkeleton } from "./filters-skeleton";
import { SalaryFilter } from "./salary-filter";
import { WorkFormatFilter } from "./work-format-filter";
import { SkillsFilter } from "./skills-filter";
import { LocationFilter } from "./location-filter";

interface FiltersSidebarProps {
  className?: string;
}

export function FiltersSidebar({ className }: FiltersSidebarProps) {
  const resetFilters = useVacancyFiltersStore((state) => state.resetFilters);
  const { data: filtersData, isLoading } = useFiltersData();

  return (
    <aside className={cn("w-full shrink-0", className)}>
      <GlassCard padding="md" rounded="3xl" className="space-y-8">
        <div className="flex items-center justify-between pb-4 border-b border-glass-border">
          <div className="flex items-center gap-2 text-glass-text">
            <SlidersHorizontal className="w-5 h-5 text-glass-accent" />
            <span className="font-semibold">Фільтри</span>
          </div>
          <GlassButton
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="text-xs text-glass-text-muted hover:text-glass-text gap-1"
          >
            <X className="w-3 h-3" /> Скинути
          </GlassButton>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <WorkFormatFilter />
          <SalaryFilter />

          {isLoading ? (
            <FiltersSkeleton />
          ) : (
            <>
              <LocationFilter options={filtersData?.locations ?? []} />
              <SkillsFilter options={filtersData?.skills ?? []} />
            </>
          )}
        </div>
      </GlassCard>
    </aside>
  );
}
