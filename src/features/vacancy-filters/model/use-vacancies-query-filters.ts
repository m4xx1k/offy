import { useEffect, useMemo, useState } from "react";
import { useVacancyFiltersStore } from "./filters.store";
const debounceMs = 1_000;

export function useVacanciesQueryFilters() {
  // subscribe to store fields individually (low coupling to store shape)
  const search = useVacancyFiltersStore((s) => s.search);
  const skills = useVacancyFiltersStore((s) => s.skills);
  const workFormat = useVacancyFiltersStore((s) => s.workFormat);
  const location = useVacancyFiltersStore((s) => s.location);
  const salaryMin = useVacancyFiltersStore((s) => s.salaryMin);
  const salaryMax = useVacancyFiltersStore((s) => s.salaryMax);

  const filters = useMemo(
    () => ({ search, skills, workFormat, location, salaryMin, salaryMax }),
    [search, skills, workFormat, location, salaryMin, salaryMax]
  );

  // debounce filters to avoid excessive refetches
  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedFilters(filters), debounceMs);
    return () => clearTimeout(t);
  }, [filters, debounceMs]);

  const queryFilters = useMemo(
    () => ({
      search: debouncedFilters.search || undefined,
      skills:
        debouncedFilters.skills && debouncedFilters.skills.length > 0
          ? debouncedFilters.skills
          : undefined,
      workFormat: debouncedFilters.workFormat || undefined,
      location: debouncedFilters.location || undefined,
      salaryMin: debouncedFilters.salaryMin || undefined,
      salaryMax: debouncedFilters.salaryMax || undefined,
    }),
    [debouncedFilters]
  );
  return { filters, debouncedFilters, queryFilters };
}
