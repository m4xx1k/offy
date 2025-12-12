"use client";

import { useCallback } from "react";
import { useVacancies } from "@/entities/vacancy";
import type { IVacancy, PaginatedResult } from "@/entities/vacancy";
import { useVacanciesQueryFilters } from "@/features/vacancy-filters/";
import { useIntersectionObserver } from "@/shared/lib/intersection-observer";

interface UseVacancyFeedOptions {
  initialData?: PaginatedResult<IVacancy>;
}

export function useVacanciesFeed(options?: UseVacancyFeedOptions) {
  const { initialData } = options ?? {};

  const { queryFilters } = useVacanciesQueryFilters();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useVacancies({ filters: queryFilters, initialData });

  const vacancies = data?.pages.flatMap((p) => p.items) ?? [];

  const loadMoreRef = useIntersectionObserver({
    threshold: 0.1,
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    enabled: hasNextPage,
  });

  return {
    vacancies,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    loadMoreRef,
  } as const;
}
