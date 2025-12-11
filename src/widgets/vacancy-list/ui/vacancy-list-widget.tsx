"use client";

import type { IVacancy, PaginatedResult } from "@/entities/vacancy";
import { VacancyCard, VacancySkeleton, useVacancies } from "@/entities/vacancy";
import { useVacancyFiltersStore } from "@/features/vacancy-filters";
import { useCallback, useEffect, useMemo, useRef } from "react";

interface VacancyListWidgetProps {
  initialData?: PaginatedResult<IVacancy>;
}

export function VacancyListWidget({ initialData }: VacancyListWidgetProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Отримуємо окремі значення зі store
  const search = useVacancyFiltersStore((s) => s.search);
  const skills = useVacancyFiltersStore((s) => s.skills);
  const workFormat = useVacancyFiltersStore((s) => s.workFormat);
  const location = useVacancyFiltersStore((s) => s.location);
  const salaryMin = useVacancyFiltersStore((s) => s.salaryMin);
  const salaryMax = useVacancyFiltersStore((s) => s.salaryMax);

  // Мемоізуємо об'єкт фільтрів
  const filters = useMemo(
    () => ({
      search,
      skills,
      workFormat,
      location,
      salaryMin,
      salaryMax,
    }),
    [search, skills, workFormat, location, salaryMin, salaryMax]
  );

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useVacancies({
      filters: {
        search: filters.search || undefined,
        skills: filters.skills.length > 0 ? filters.skills : undefined,
        workFormat: filters.workFormat || undefined,
        location: filters.location || undefined,
        salaryMin: filters.salaryMin || undefined,
        salaryMax: filters.salaryMax || undefined,
      },
      initialData,
    });

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const element = loadMoreRef.current;
    if (!element) return;

    observerRef.current = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
    });

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver]);

  const vacancies = data?.pages.flatMap((page) => page.items) ?? [];

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <VacancySkeleton key={i} />
        ))}
      </div>
    );
  }

  if (vacancies.length === 0) {
    return (
      <div className="text-center py-12 text-glass-text-muted">
        Вакансій не знайдено. Спробуйте змінити фільтри.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {vacancies.map((vacancy) => (
        <VacancyCard key={vacancy.id} vacancy={vacancy} />
      ))}

      {/* Load more trigger */}
      <div ref={loadMoreRef} className="h-10">
        {isFetchingNextPage && (
          <div className="flex justify-center">
            <VacancySkeleton />
          </div>
        )}
      </div>
    </div>
  );
}
