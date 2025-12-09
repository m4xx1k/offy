import { useVacancyFiltersStrore } from "@/hooks/vacancy-filters";
import { useEffect, useState } from "react";
import {
  FilterOptionsState,
  LocationFilter,
  SalaryFilter,
  SearchFilter,
  SkillsFilter,
  WorkFormatFilter,
} from "./vacancy-filters";
import { vacancyService } from "@/services/vacancies.service";
import { cn } from "@/lib/utils";
import { SlidersHorizontal, X } from "lucide-react";

export const VacancyFiltersSidebar = ({
  className,
}: {
  className?: string;
}) => {
  const resetFilters = useVacancyFiltersStrore((state) => state.resetFilters);

  const [options, setOptions] = useState<FilterOptionsState>({
    skills: [],
    locations: [],
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const data = await vacancyService.getFiltersData();
        setOptions(data);
      } catch (error) {
        console.error("Failed to load filters:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFilters();
  }, []);

  return (
    <aside className={cn("w-[300px] shrink-0 space-y-6", className)}>
      <div className="glass-panel p-6 rounded-3xl space-y-8 sticky top-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/5">
          <div className="flex items-center gap-2 text-white">
            <SlidersHorizontal className="w-5 h-5 text-indigo-400" />
            <span className="font-semibold">Фільтри</span>
          </div>
          <button
            onClick={resetFilters}
            className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1"
          >
            <X className="w-3 h-3" /> Скинути
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <SearchFilter />

          <WorkFormatFilter />

          <SalaryFilter />

          {/* Динамічні фільтри з лоадером або контентом */}
          {isLoading ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-4 w-20 bg-white/5 rounded" />
              <div className="h-8 w-full bg-white/5 rounded-xl" />
              <div className="h-20 w-full bg-white/5 rounded-xl" />
            </div>
          ) : (
            <>
              <LocationFilter options={options.locations} />
              <SkillsFilter options={options.skills} />
            </>
          )}
        </div>

        {/* Mobile Apply Button (Optional, if used in drawer) */}
        <button
          className="w-full glass-button py-3 rounded-xl mt-4 md:hidden"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Застосувати
        </button>
      </div>
    </aside>
  );
};
