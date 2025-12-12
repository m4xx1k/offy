"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import {
  PaginatedResult,
  vacancyApi,
  type VacanciesQuery,
} from "../api/vacancy.api";
import { vacancyKeys } from "./query-keys";
import { IVacancy } from "./types";

interface UseVacanciesOptions {
  filters?: VacanciesQuery;
  initialData?: PaginatedResult<IVacancy>;
}

export function useVacancies(options?: UseVacanciesOptions) {
  const { filters = {}, initialData } = options ?? {};

  const activeFilters = Object.keys(filters).length > 0;

  return useInfiniteQuery({
    queryKey: vacancyKeys.list(filters),

    queryFn: ({ pageParam }) =>
      vacancyApi.getList({
        ...filters,
        cursor: pageParam,
      }),

    initialPageParam: undefined as string | undefined,

    getNextPageParam: (lastPage) => {
      if (!lastPage.metadata?.hasMore || !lastPage.metadata?.nextCursor) {
        return undefined;
      }
      return lastPage.metadata.nextCursor;
    },

    initialData:
      initialData && !activeFilters
        ? {
            pages: [initialData],
            pageParams: [undefined],
          }
        : undefined,

    refetchOnMount: false,
    staleTime: 1000 * 60 * 5,
  });
}
