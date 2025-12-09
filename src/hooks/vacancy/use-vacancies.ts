"use client";

import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { vacancyService } from "@/services/vacancies.service";
import { useVacancyFiltersStrore } from "../vacancy-filters";
import { useDebounce } from "../use-debounce";
import { IPaginatedResult } from "@/shared/types/pagination.types";
import { IVacancy } from "@/shared/types/vacancies.types";

export function useVacancies(initialData: IPaginatedResult<IVacancy>) {
  const { skills, search, location, workFormat, salaryMax, salaryMin } =
    useVacancyFiltersStrore();

  const debouncedSearch = useDebounce(search, 500);

  // 1) Фільтри в ключі. Це головне.
  const filtersKey = {
    skills,
    search: debouncedSearch,
    location,
    workFormat,
    salaryMin,
    salaryMax,
  };

  // 2) Реальні параметри для бекенда
  const params = {
    take: 10,
    ...(skills && { skills }),
    ...(debouncedSearch && { search: debouncedSearch }),
    ...(location && { location }),
    ...(workFormat && { workFormat }),
    ...(salaryMin && { salaryMin }),
    ...(salaryMax && { salaryMax }),
  };

  // 3) Infinite query
  const query = useInfiniteQuery({
    queryKey: ["vacancies", filtersKey],

    queryFn: ({ pageParam }) =>
      vacancyService.getPaginated({
        ...params,
        cursor: pageParam ?? null,
      }),

    initialPageParam: null,
    placeholderData: keepPreviousData,
    getNextPageParam: (page) =>
      page.metadata.hasMore ? page.metadata.nextCursor : null,

    // initialData працює тільки при пустих фільтрах
    initialData:
      !skills?.length &&
      !search &&
      !location &&
      !workFormat &&
      !salaryMin &&
      !salaryMax
        ? {
            pages: [initialData],
            pageParams: [] as string[],
          }
        : undefined,
  });

  // 4) Склеюємо всі сторінки в один масив
  const vacancies = query.data?.pages.flatMap((p) => p.items) ?? [];
  const total = query.data?.pages?.at(0)?.total;
  return {
    total,
    vacancies,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    isLoading: query.isLoading,
  };
}
