"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { vacancyApi, type VacanciesQuery } from "../api/vacancy.api";
import { vacancyKeys } from "./query-keys";

interface UseVacanciesOptions {
  filters?: VacanciesQuery;
  initialData?: Awaited<ReturnType<typeof vacancyApi.getList>>;
}

export function useVacancies(options?: UseVacanciesOptions) {
  const { filters = {}, initialData } = options ?? {};

  return useInfiniteQuery({
    queryKey: vacancyKeys.list(filters),
    queryFn: ({ pageParam = 0 }) =>
      vacancyApi.getList({ ...filters, skip: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasMore) return undefined;
      return (lastPage.skip ?? 0) + (lastPage.take ?? 10);
    },
    initialData: initialData
      ? { pages: [initialData], pageParams: [0] }
      : undefined,
    staleTime: 60 * 1000, // 1 хвилина
  });
}

